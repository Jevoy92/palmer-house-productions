import { beginStudioTranscriptionCall } from "./studio-credit-runtime.server";
import { inspectStudioVoiceWav } from "./studio-transcription";

export function studioTranscriptionConfigured() {
  return (
    process.env.STUDIO_TRANSCRIPTION_ENABLED !== "false" && Boolean(process.env.LOVABLE_API_KEY)
  );
}
/** Fixed trusted endpoint: no member-supplied URL, remote media fetch, or redirect. */
export async function transcribeStudioVoice(bytes: Uint8Array) {
  if (!studioTranscriptionConfigured())
    throw new Error(
      "Voice transcription is not connected yet. Your recording is kept here; no credits were used.",
    );
  const quote = inspectStudioVoiceWav(bytes);
  const model = "google/gemini-3.5-transcribe";
  const form = new FormData();
  form.append("model", model);
  form.append(
    "file",
    new Blob([bytes as unknown as BlobPart], { type: "audio/wav" }),
    "voice-note.wav",
  );
  beginStudioTranscriptionCall(model, quote.seconds);
  const response = await fetch("https://ai.gateway.lovable.dev/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      "Lovable-API-Key": process.env.LOVABLE_API_KEY!,
      Authorization: `Bearer ${process.env.LOVABLE_API_KEY}`,
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: form,
    redirect: "error",
    signal: AbortSignal.timeout(120000),
  });
  if (!response.ok) {
    if (response.status === 402)
      throw new Error("Studio AI credits are paused. Your recording is kept here; no credits were used.");
    if (response.status === 429)
      throw new Error("Transcription is busy. Your recording is kept here; try again shortly.");
    throw new Error(
      "The transcription service could not finish. Your recording is kept here; please retry.",
    );
  }
  const size = Number(response.headers.get("content-length") || 0);
  if (size > 256000)
    throw new Error(
      "The transcription response was too large. Please retry with a shorter recording.",
    );
  const reader = response.body?.getReader();
  if (!reader) throw new Error("The transcription service returned an empty response.");
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const next = await reader.read();
    if (next.done) break;
    total += next.value.byteLength;
    if (total > 256000) {
      await reader.cancel();
      throw new Error("The transcription response was too large.");
    }
    chunks.push(next.value);
  }
  const buffer = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    buffer.set(chunk, offset);
    offset += chunk.byteLength;
  }
  const payload = JSON.parse(new TextDecoder().decode(buffer)) as { text?: unknown };
  if (typeof payload.text !== "string" || !payload.text.trim())
    throw new Error(
      "We could not hear any speech. Your recording is kept here; try a clearer voice note.",
    );
  if (payload.text.length > 40000)
    throw new Error("The transcript is too long to save safely. Please use a shorter recording.");
  return { text: payload.text.trim(), ...quote, model };
}
