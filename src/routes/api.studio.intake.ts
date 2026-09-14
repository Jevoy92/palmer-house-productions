import { createFileRoute } from "@tanstack/react-router";
import { createUserScopedSupabase } from "@/lib/supabase/client";

const BUCKET = "campaign-assets";

function fail(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

async function handleIntake({ request }: { request: Request }) {
  const authorization = request.headers.get("authorization") || "";
  const accessToken = authorization.replace(/^Bearer\s+/i, "").trim();
  if (accessToken.length < 20) return fail("Please sign in again.", 401);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("That upload could not be read.");
  }

  const file = form.get("file");
  const workspaceId = String(form.get("workspaceId") || "");
  const conversationId = String(form.get("conversationId") || "") || null;
  if (!(file instanceof File) || !file.size) return fail("No file was received.");
  if (!/^[0-9a-f-]{36}$/i.test(workspaceId)) return fail("Missing workspace.");

  const client = createUserScopedSupabase(accessToken);
  const auth = await client.auth.getUser(accessToken);
  if (auth.error || !auth.data.user) return fail("Your session has expired.", 401);
  const membership = await client
    .from("workspace_members")
    .select("role")
    .eq("workspace_id", workspaceId)
    .eq("user_id", auth.data.user.id)
    .maybeSingle();
  if (membership.error || !membership.data) return fail("You do not have access here.", 403);

  const intake = await import("@/lib/intake.server");
  const mime = (file.type || "").split(";")[0].toLowerCase();
  const name = file.name || "upload";
  const lower = name.toLowerCase();

  const isAudio =
    intake.AUDIO_MIME.has(mime) || /\.(wav|mp3|m4a|aac|ogg|webm|mp4|mov)$/.test(lower);
  const isImage = intake.IMAGE_MIME.has(mime) || /\.(jpe?g|png|webp|heic|heif|gif)$/.test(lower);
  const isDocument =
    intake.DOCUMENT_MIME.has(mime) || /\.(pdf|docx?|txt|md|csv|json)$/.test(lower);

  if (!isAudio && !isImage && !isDocument)
    return fail("We can read voice notes, audio, video, images, PDFs, Word files and text files.");
  if (isImage && file.size > intake.MAX_IMAGE_BYTES) return fail("Images must be under 10 MB.");
  if (isAudio && file.size > intake.MAX_AUDIO_BYTES)
    return fail("Recordings must be under 200 MB.");
  if (isDocument && !isAudio && !isImage && file.size > intake.MAX_DOCUMENT_BYTES)
    return fail("Documents must be under 25 MB.");

  // PDF parsing transfers (detaches) the buffer it reads, so snapshot the file
  // for storage as a Blob first and hand the parser a throwaway copy.
  const stored = new Blob([file], { type: mime || "application/octet-stream" });
  const bytes = new Uint8Array(await file.arrayBuffer());
  let kind: "voice" | "audio" | "document" | "image" = "document";
  let text = "";
  let summary = "";
  const metadata: Record<string, string | number> = { originalName: name };

  try {
    if (isAudio) {
      kind = form.get("kind") === "voice" ? "voice" : "audio";
      const result = await intake.transcribeAudio(bytes, mime || "audio/wav");
      text = result.text;
      metadata.chunks = result.chunks;
      summary = `${kind === "voice" ? "Voice note" : "Recording"}: ${text.slice(0, 160)}`;
    } else if (isImage) {
      kind = "image";
      summary = `Image shared: ${name}`;
    } else {
      const result = await intake.extractDocumentText(bytes, mime, name);
      if (result.needsImageReading)
        return fail("That PDF looks scanned, so there is no text to read. Send a text PDF.");
      text = result.text;
      metadata.pages = result.pages;
      summary = `Document ${name}: ${text.slice(0, 160)}`;
    }
  } catch (error) {
    return fail(error instanceof Error ? error.message : "We could not read that file.", 422);
  }

  const safeName = name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${workspaceId}/conversation/${crypto.randomUUID()}-${safeName}`;
  const upload = await client.storage
    .from(BUCKET)
    .upload(path, stored, {
      upsert: false,
      contentType: mime || "application/octet-stream",
    });

  const row = await client
    .from("conversation_attachments")
    .insert({
      workspace_id: workspaceId,
      conversation_id: conversationId,
      created_by: auth.data.user.id,
      kind,
      label: name,
      mime_type: mime,
      byte_size: file.size,
      storage_path: upload.error ? null : upload.data.path,
      extracted_text: intake.budgetText(text, 40_000),
      summary,
      metadata,
    })
    .select("id, kind, label, summary, byte_size")
    .single();

  if (row.error) return fail("We read the file but could not save it. Please try again.", 500);

  return Response.json({
    attachment: row.data,
    text: intake.budgetText(text),
  });
}

export const Route = createFileRoute("/api/studio/intake")({
  server: { handlers: { POST: handleIntake } },
});
