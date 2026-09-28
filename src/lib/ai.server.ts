import { zodResponseFormat } from "openai/helpers/zod";
import type { z } from "zod";
import { studioAIConfig } from "./studio-ai-config.server";

type ImagePart = { type: "input_image"; image_url: string; detail?: "low" | "high" | "auto" };
type TextPart = { type: "input_text"; text: string };
type StudioInput = string | Array<{ role: "user"; content: Array<TextPart | ImagePart> }>;

/** Structured generation uses server credentials and an OpenAI-compatible endpoint.
 * Model configuration is separate from the workspace's durable knowledge store.
 */
export const STUDIO_CHAT_MODEL = studioAIConfig().chatModel;
export const STUDIO_BUILD_MODEL = studioAIConfig().buildModel;

export async function parseStructured<T extends z.ZodTypeAny>(
  schema: T,
  schemaName: string,
  instructions: string,
  input: StudioInput,
  options?: { model?: string },
): Promise<z.infer<T>> {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured for this project.");
  const { default: OpenAI } = await import("openai");
  const client = new OpenAI({
    apiKey: key,
    baseURL: studioAIConfig().baseURL,
  });

  const userContent =
    typeof input === "string"
      ? input
      : input.flatMap((message) =>
          message.content.map((part) =>
            part.type === "input_text"
              ? ({ type: "text", text: part.text } as const)
              : ({
                  type: "image_url",
                  image_url: { url: part.image_url, detail: part.detail ?? "low" },
                } as const),
          ),
        );

  const completion = await client.chat.completions.create({
    model: options?.model || studioAIConfig().chatModel,
    messages: [
      { role: "system", content: instructions },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { role: "user", content: userContent as any },
    ],
    response_format: zodResponseFormat(schema, schemaName),
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) throw new Error("The AI returned an empty response. Please try again.");
  return schema.parse(JSON.parse(raw)) as z.infer<T>;
}

/** Gateway image output stays on the server; callers receive validated bytes. */
export async function generateStudioImage(prompt: string) {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("Image generation is not configured for this project.");
  const response = await fetch(`${studioAIConfig().baseURL.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: studioAIConfig().imageModel,
      modalities: ["image", "text"],
      messages: [{ role: "user", content: prompt }],
    }),
    signal: AbortSignal.timeout(120000),
  });
  if (!response.ok) {
    if (response.status === 429)
      throw new Error("Image generation is busy. Please try again shortly.");
    if (response.status === 402)
      throw new Error("Image generation credits are unavailable. Contact your workspace owner.");
    throw new Error("The image provider could not generate this image. Please try again.");
  }
  const result = (await response.json()) as {
    choices?: Array<{ message?: { images?: Array<{ image_url?: { url?: string } }> } }>;
  };
  const image = result.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  const match = image?.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=\r\n]+)$/);
  if (!match)
    throw new Error("The image provider returned no usable image. No artifact was saved.");
  const bytes = Buffer.from(match[2], "base64");
  if (!bytes.length || bytes.length > 20 * 1024 * 1024)
    throw new Error("The generated image has an unsupported size.");
  const { validateImageBytes } = await import("./studio-artifact.server");
  const mimeType = `image/${match[1]}`;
  validateImageBytes(bytes, mimeType);
  return { bytes, mimeType, extension: match[1] === "jpeg" ? "jpg" : match[1] };
}
