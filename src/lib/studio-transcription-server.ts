import { createServerFn } from "@tanstack/react-start";
import { StudioAuthSchema } from "./studio-recovery";
import { authorizedStudioClient } from "./studio-auth.server";
import { studioBillingAdmin } from "./studio-credit-runtime.server";
import { studioTranscriptionConfigured } from "./studio-transcription.server";

export const getStudioTranscriptionStatus = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema)
  .handler(async ({ data }) => {
    await authorizedStudioClient(data.accessToken, data.workspaceId);
    if (!studioTranscriptionConfigured())
      return {
        enabled: false,
        reason:
          "Voice is not connected yet. You can still paste text or attach documents and images.",
      };
    try {
      const check = await studioBillingAdmin()
        .from("studio_voice_requests")
        .select("request_key")
        .eq("workspace_id", data.workspaceId)
        .limit(1);
      if (check.error) throw check.error;
      return { enabled: true, reason: "" };
    } catch {
      return {
        enabled: false,
        reason: "Voice usage protection needs setup. Paste text or attach a document for now.",
      };
    }
  });
