/**
 * Intake helpers: turn whatever a member drops into the Studio — a voice note,
 * a PDF, a Word doc, a recorded call — into plain text the Pals can read.
 *
 * Server-only. Runs inside the Worker runtime, so every parser here is pure JS.
 */

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

/** Audio cannot contact a paid model until duration pricing is metered. */
export async function transcribeAudio(
  ..._input: [Uint8Array, string]
): Promise<{ text: string; chunks: number }> {
  throw new Error(
    "Audio transcription is being connected to prepaid usage. Paste a transcript or upload a text document for now. No AI credits were used.",
  );
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
