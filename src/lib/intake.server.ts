/**
 * Intake helpers: turn whatever a member drops into the Studio — a voice note,
 * a PDF, a Word doc, a recorded call — into plain text the Pals can read.
 *
 * Server-only. Runs inside the Worker runtime, so every parser here is pure JS.
 */

const GATEWAY = process.env["AI_GATEWAY_URL"] || "https://ai.gateway.lovable.dev/v1";

/** Gemini transcription caps a single request at 14 MB. */
export const TRANSCRIBE_CHUNK_BYTES = 13_000_000;
export const MAX_AUDIO_BYTES = 200 * 1024 * 1024;
export const MAX_DOCUMENT_BYTES = 25 * 1024 * 1024;
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export const AUDIO_MIME = new Set([
  "audio/wav",
  "audio/x-wav",
  "audio/wave",
  "audio/mpeg",
  "audio/mp3",
  "audio/mp4",
  "audio/m4a",
  "audio/x-m4a",
  "audio/aac",
  "audio/webm",
  "audio/ogg",
  "video/mp4",
  "video/quicktime",
  "video/webm",
]);

export const DOCUMENT_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/markdown",
  "text/csv",
  "application/json",
]);

export const IMAGE_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "image/gif",
]);

function apiKey() {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("Transcription is not configured for this project.");
  return key;
}

function extensionFor(mime: string) {
  const base = mime.split(";")[0];
  const map: Record<string, string> = {
    "audio/wav": "wav",
    "audio/x-wav": "wav",
    "audio/wave": "wav",
    "audio/mpeg": "mp3",
    "audio/mp3": "mp3",
    "audio/mp4": "mp4",
    "audio/m4a": "m4a",
    "audio/x-m4a": "m4a",
    "audio/aac": "aac",
    "audio/webm": "webm",
    "audio/ogg": "ogg",
    "video/mp4": "mp4",
    "video/quicktime": "mov",
    "video/webm": "webm",
  };
  return map[base] || "wav";
}

/**
 * Split a WAV file on sample boundaries so every chunk stays a complete,
 * decodable file. Non-WAV audio is sent whole (the recorder always sends WAV).
 */
function splitWav(bytes: Uint8Array, limit: number): Uint8Array[] {
  if (bytes.byteLength <= limit) return [bytes];
  const header = bytes.subarray(0, 44);
  const isWav =
    String.fromCharCode(...bytes.subarray(0, 4)) === "RIFF" &&
    String.fromCharCode(...bytes.subarray(8, 12)) === "WAVE";
  if (!isWav) return [bytes];

  const body = bytes.subarray(44);
  const view = new DataView(header.buffer, header.byteOffset, header.byteLength);
  const blockAlign = view.getUint16(32, true) || 2;
  const perChunk = Math.floor((limit - 44) / blockAlign) * blockAlign;
  const chunks: Uint8Array[] = [];

  for (let offset = 0; offset < body.byteLength; offset += perChunk) {
    const slice = body.subarray(offset, Math.min(offset + perChunk, body.byteLength));
    const out = new Uint8Array(44 + slice.byteLength);
    out.set(header, 0);
    out.set(slice, 44);
    const outView = new DataView(out.buffer);
    outView.setUint32(4, 36 + slice.byteLength, true);
    outView.setUint32(40, slice.byteLength, true);
    chunks.push(out);
  }
  return chunks;
}

async function transcribeOne(bytes: Uint8Array, mime: string) {
  const form = new FormData();
  form.append("model", process.env["STUDIO_TRANSCRIBE_MODEL"] || "google/gemini-3.5-transcribe");
  form.append(
    "file",
    new Blob([bytes as unknown as BlobPart], { type: mime }),
    `recording.${extensionFor(mime)}`,
  );

  const response = await fetch(`${GATEWAY}/audio/transcriptions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey()}` },
    body: form,
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    if (response.status === 402)
      throw new Error("The workspace is out of AI credits, so this recording was not transcribed.");
    if (response.status === 429)
      throw new Error("Too many recordings at once. Wait a few seconds and try again.");
    throw new Error(
      detail.includes("corrupted")
        ? "That recording could not be read. Try recording it again."
        : "Transcription failed. Please try again.",
    );
  }

  const payload = (await response.json()) as { text?: string };
  return (payload.text || "").trim();
}

/** Transcribe a recording of any length, chunking when it exceeds the model cap. */
export async function transcribeAudio(bytes: Uint8Array, mime: string) {
  if (!bytes.byteLength) throw new Error("That recording was empty. Please record it again.");
  if (bytes.byteLength > MAX_AUDIO_BYTES)
    throw new Error("That file is over 200 MB. Split it into shorter pieces first.");

  const chunks = splitWav(bytes, TRANSCRIBE_CHUNK_BYTES);
  const parts: string[] = [];
  for (const chunk of chunks) {
    parts.push(await transcribeOne(chunk, mime));
  }
  const text = parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  if (!text) throw new Error("We could not hear any speech in that recording.");
  return { text, chunks: chunks.length };
}

function cleanText(value: string) {
  return value
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function readPdf(bytes: Uint8Array) {
  const { extractText, getDocumentProxy } = await import("unpdf");
  const pdf = await getDocumentProxy(bytes);
  const { text, totalPages } = await extractText(pdf, { mergePages: true });
  return { text: cleanText(String(text)), pages: totalPages };
}

async function readDocx(bytes: Uint8Array) {
  const { unzipSync, strFromU8 } = await import("fflate");
  const files = unzipSync(bytes);
  const doc = files["word/document.xml"];
  if (!doc) throw new Error("That Word file could not be read. Save it as PDF and try again.");
  const xml = strFromU8(doc);
  const text = xml
    .replace(/<w:p[ >]/g, "\n<w:p ")
    .replace(/<w:tab\/>/g, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
  return { text: cleanText(text), pages: 0 };
}

/** Pull readable text out of a PDF, Word file, or plain-text document. */
export async function extractDocumentText(bytes: Uint8Array, mime: string, name: string) {
  if (!bytes.byteLength) throw new Error("That file was empty.");
  if (bytes.byteLength > MAX_DOCUMENT_BYTES)
    throw new Error("That file is over 25 MB. Please send a smaller one.");

  const base = mime.split(";")[0];
  const lower = name.toLowerCase();

  if (base === "application/pdf" || lower.endsWith(".pdf")) {
    const result = await readPdf(bytes);
    if (result.text.length < 40) {
      return {
        text: "",
        pages: result.pages,
        needsImageReading: true,
      };
    }
    return { ...result, needsImageReading: false };
  }

  if (
    base === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    lower.endsWith(".docx")
  ) {
    return { ...(await readDocx(bytes)), needsImageReading: false };
  }

  const decoded = cleanText(new TextDecoder().decode(bytes));
  if (!decoded) throw new Error("We could not find any text in that file.");
  return { text: decoded, pages: 0, needsImageReading: false };
}

/** Keep a single attachment's contribution to prompts bounded — this is the cost control. */
export const ATTACHMENT_BUDGET = 6_000;

export function budgetText(value: string, budget = ATTACHMENT_BUDGET) {
  const text = value.trim();
  if (text.length <= budget) return text;
  return `${text.slice(0, budget)}\n\n[Trimmed — the full file is saved in this workspace.]`;
}
