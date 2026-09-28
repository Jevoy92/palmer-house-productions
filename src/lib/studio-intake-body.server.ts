import { STUDIO_VOICE_SOURCE_MAX_BYTES } from "./studio-transcription";
/** Bound total multipart bytes even when Content-Length is absent or dishonest. */
export async function readBoundedIntakeForm(request: Request) {
  const limit = STUDIO_VOICE_SOURCE_MAX_BYTES + 64 * 1024;
  if (Number(request.headers.get("content-length") || 0) > limit)
    throw new Error("Uploads must be under 25 MB. Voice notes must be five minutes or less.");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("No upload was received.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const next = await reader.read();
    if (next.done) break;
    size += next.value.byteLength;
    if (size > limit) {
      await reader.cancel();
      throw new Error("This upload is too large. The limit is 25 MB.");
    }
    chunks.push(next.value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return new Response(bytes, {
    headers: { "Content-Type": request.headers.get("content-type") || "" },
  }).formData();
}
