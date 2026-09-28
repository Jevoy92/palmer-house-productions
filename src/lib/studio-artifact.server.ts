import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export function validateImageBytes(bytes: Uint8Array, mimeType: string) {
  const header = Buffer.from(bytes.subarray(0, 12));
  const valid =
    mimeType === "image/png"
      ? header.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
      : mimeType === "image/jpeg"
        ? header[0] === 255 && header[1] === 216 && header[2] === 255
        : mimeType === "image/webp"
          ? header.toString("ascii", 0, 4) === "RIFF" && header.toString("ascii", 8, 12) === "WEBP"
          : false;
  if (!valid) throw new Error("Use a valid PNG, JPEG, or WebP image.");
}

/** A real paginated PDF, with measured line wrapping and a text layer. */
export async function renderStudioPdf(title: string, content: string) {
  const pdf = await PDFDocument.create();
  pdf.setTitle(title);
  pdf.setCreator("Palmer House Studio");
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const normalize = (value: string) =>
    value
      .replace(/\t/g, "  ")
      .replace(/\r/g, "")
      .replace(/[\u200b-\u200d\ufeff]/g, "")
      .replace(/\u202f|\u00a0/g, " ");
  const source = normalize(`${title}\n\n${content}`);
  // Standard PDF fonts support Latin text and typographic punctuation. Fail
  // honestly rather than silently corrupting a member's unsupported script.
  try {
    regular.encodeText(source.replace(/\n/g, " "));
  } catch {
    throw new Error(
      "This PDF uses characters the document font cannot display. Export Latin-script text or remove unsupported symbols and try again.",
    );
  }
  let page = pdf.addPage([612, 792]);
  let y = 732;
  const addPage = () => {
    page = pdf.addPage([612, 792]);
    y = 732;
  };
  const paragraphs = source.split("\n");
  for (let index = 0; index < paragraphs.length; index += 1) {
    const paragraph = paragraphs[index];
    if (!paragraph.trim()) {
      y -= 10;
      continue;
    }
    const heading = index === 0 || /^#{1,3}\s/.test(paragraph);
    const text = paragraph.replace(/^#{1,6}\s/, "").replace(/\*\*(.*?)\*\*/g, "$1");
    const font = heading ? bold : regular;
    const size = index === 0 ? 22 : heading ? 14 : 11;
    const height = size * 1.5;
    const lines: string[] = [];
    let line = "";
    for (const word of text.split(/\s+/)) {
      const candidate = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) <= 492) {
        line = candidate;
        continue;
      }
      if (line) lines.push(line);
      line = "";
      for (const char of word) {
        if (font.widthOfTextAtSize(line + char, size) > 492) {
          lines.push(line);
          line = "";
        }
        line += char;
      }
    }
    if (line) lines.push(line);
    for (const next of lines) {
      if (y - height < 60) addPage();
      page.drawText(next, { x: 60, y, size, font, color: rgb(0.13, 0.14, 0.18) });
      y -= height;
    }
    y -= heading ? 10 : 5;
  }
  pdf.getPages().forEach((p, index) =>
    p.drawText(`Palmer House Studio  /  ${index + 1}`, {
      x: 60,
      y: 30,
      size: 9,
      font: regular,
      color: rgb(0.45, 0.45, 0.48),
    }),
  );
  return pdf.save();
}
