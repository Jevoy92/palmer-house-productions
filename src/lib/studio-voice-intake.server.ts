import { authorizedStudioClient } from "./studio-auth.server";
import {
  studioBillingAdmin,
  withStudioCredits,
  currentStudioUsageId,
  StudioCreditReconciliationError,
} from "./studio-credit-runtime.server";
import { inspectStudioVoiceWav } from "./studio-transcription";
import {
  studioTranscriptionConfigured,
  transcribeStudioVoice,
} from "./studio-transcription.server";
import { budgetText } from "./intake.server";

/** Stores once, charges once, and reopens an already saved transcript after a network retry. */
export async function intakeStudioVoice(input: {
  accessToken: string;
  workspaceId: string;
  conversationId: string | null;
  requestId: string;
  name: string;
  bytes: Uint8Array;
}) {
  const { client, user } = await authorizedStudioClient(input.accessToken, input.workspaceId);
  const quote = inspectStudioVoiceWav(input.bytes);
  const admin = studioBillingAdmin();
  const digest = await crypto.subtle.digest("SHA-256", input.bytes as unknown as BufferSource);
  const hash = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
  const identity = {
    target_workspace_id: input.workspaceId,
    actor: user.id,
    request_id: input.requestId,
  };
  const claim = await admin.rpc("claim_studio_voice", {
    ...identity,
    content_hash: hash,
    conversation: input.conversationId,
  });
  if (claim.error || !claim.data)
    throw new Error(
      claim.error?.message ||
        "Voice usage protection is not connected yet. No transcription was started.",
    );
  const readSaved = async (id: string) => {
    const saved = await admin
      .from("conversation_attachments")
      .select("id,kind,label,summary,byte_size,extracted_text")
      .eq("workspace_id", input.workspaceId)
      .eq("id", id)
      .single();
    if (saved.error || !saved.data)
      throw new StudioCreditReconciliationError(
        "This transcript was saved but could not be reopened. Do not submit a new recording; retry this one or contact Palmer House.",
      );
    const { extracted_text, ...attachment } = saved.data;
    return { attachment, text: budgetText(extracted_text) };
  };
  if (claim.data.status === "completed") {
    if (!claim.data.attachmentId)
      throw new Error(
        "This recording was already transcribed and has since been deleted. Record a new note to start again.",
      );
    return readSaved(claim.data.attachmentId);
  }
  if (!claim.data.claimed)
    throw new Error(
      "This recording is still processing. Keep it here and retry shortly. If it stays pending, contact Palmer House; do not submit a new copy.",
    );
  const token = claim.data.token;
  let storedPath: string | null = null;
  let completed = false;
  try {
    if (!studioTranscriptionConfigured())
      throw new Error(
        "Voice transcription is not connected yet. Your recording is kept here; no credits were used.",
      );
    return await withStudioCredits(
      input,
      "transcription",
      async () => {
        const bound = await admin.rpc("bind_studio_voice_usage", {
          ...identity,
          token,
          usage: currentStudioUsageId(),
        });
        if (bound.error)
          throw new Error(
            "Could not protect this recording against duplicate requests. No transcription was started.",
          );
        const result = await transcribeStudioVoice(input.bytes);
        const path = `${input.workspaceId}/conversation/${crypto.randomUUID()}-voice-note.wav`;
        const upload = await client.storage
          .from("campaign-assets")
          .upload(path, new Blob([input.bytes as unknown as BlobPart], { type: "audio/wav" }), {
            upsert: false,
            contentType: "audio/wav",
          });
        if (upload.error)
          throw new Error(
            "Your transcript could not be saved. Your recording is kept here and its credits will be released.",
          );
        storedPath = path;
        let saved: { data: unknown; error: unknown };
        try {
          saved = await admin.rpc("complete_studio_voice", {
            ...identity,
            token,
            saved_path: path,
            file_label: input.name,
            file_bytes: input.bytes.byteLength,
            transcript: result.text,
            details: {
              durationSeconds: quote.seconds,
              credits: quote.credits,
              model: result.model,
            },
          });
        } catch {
          saved = { data: null, error: true };
        }
        if (
          saved.error &&
          typeof saved.error === "object" &&
          "code" in saved.error &&
          saved.error.code === "P0001"
        ) {
          // A deliberate PostgreSQL validation exception confirms the transaction rolled back.
          throw new Error(
            "This conversation is no longer available. Your recording is kept here and its credits will be released.",
          );
        }
        if (saved.error || !saved.data) {
          // An RPC timeout is ambiguous: the transaction may already have committed.
          const status = await Promise.resolve(
            admin
              .from("studio_voice_requests")
              .select("status,attachment_id")
              .eq("workspace_id", input.workspaceId)
              .eq("actor_id", user.id)
              .eq("request_key", input.requestId)
              .single(),
          ).catch(() => ({ data: null, error: true }));
          if (status.data?.status === "completed" && status.data.attachment_id) {
            completed = true;
            return readSaved(status.data.attachment_id);
          }
          // Never refund/delete a possibly committed attachment or retry a paid request automatically.
          throw new StudioCreditReconciliationError(
            "Saving is still being confirmed. Keep this recording and retry it shortly. Your credits remain reserved while Palmer House verifies the result.",
          );
        }
        completed = true;
        return readSaved(String(saved.data));
      },
      { audioSeconds: quote.seconds },
    );
  } catch (error) {
    if (!(error instanceof StudioCreditReconciliationError) && !completed) {
      if (storedPath)
        await client.storage
          .from("campaign-assets")
          .remove([storedPath])
          .catch(() => undefined);
      await Promise.resolve(admin.rpc("fail_studio_voice", { ...identity, token })).catch(
        () => undefined,
      );
    }
    throw error;
  }
}
