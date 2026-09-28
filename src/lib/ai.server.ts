import { zodResponseFormat } from "openai/helpers/zod";
import type { z } from "zod";
import { studioAIConfig } from "./studio-ai-config.server";
import { beginStudioProviderCall, studioCallLimits } from "./studio-credit-runtime.server";

/** UTF-8 bytes conservatively bound text tokens, including non-Latin text. */
function clipPrompt(value: string, bytes: number) {
  if (Buffer.byteLength(value) <= bytes) return value;
  const marker =
    "\n[Older context shortened for this request. Saved workspace memory remains intact.]\n";
  const budget = Math.max(0, bytes - Buffer.byteLength(marker));
  const source = Buffer.from(value);
  return (
    source.subarray(0, Math.floor(budget * 0.55)).toString("utf8") +
    marker +
    source.subarray(source.length - Math.floor(budget * 0.45)).toString("utf8")
  );
}

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
  options?: { model?: string; timeoutMs?: number },
): Promise<z.infer<T>> {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured for this project.");
  const { default: OpenAI } = await import("openai");
  const client = new OpenAI({
    apiKey: key,
    baseURL: studioAIConfig().baseURL,
    timeout: Math.min(options?.timeoutMs || 120000, 120000),
    maxRetries: 0,
  });

  const limits = studioCallLimits();
  const responseFormat = zodResponseFormat(schema, schemaName);
  const overhead =
    Buffer.byteLength(instructions) + Buffer.byteLength(JSON.stringify(responseFormat)) + 600;
  const imageCount =
    typeof input === "string"
      ? 0
      : input.flatMap((row) => row.content).filter((part) => part.type === "input_image").length;
  const textBudget = limits.maxInputTokens - overhead - imageCount * 2048;
  if (textBudget < 1000)
    throw new Error("This document format exceeds the reserved context budget.");
  const textParts =
    typeof input === "string"
      ? 1
      : Math.max(
          1,
          input.flatMap((row) => row.content).filter((part) => part.type === "input_text").length,
        );
  const userContent =
    typeof input === "string"
      ? clipPrompt(input, textBudget)
      : input.flatMap((message) =>
          message.content.map((part) =>
            part.type === "input_text"
              ? ({
                  type: "text",
                  text: clipPrompt(part.text, Math.floor(textBudget / textParts)),
                } as const)
              : ({
                  type: "image_url",
                  image_url: { url: part.image_url, detail: part.detail ?? "low" },
                } as const),
          ),
        );

  const model = options?.model || studioAIConfig().chatModel;
  const reported = beginStudioProviderCall(model, limits.maxInputTokens, limits.maxOutputTokens);
  const completion = await client.chat.completions.create({
    model,
    max_completion_tokens: limits.maxOutputTokens,
    messages: [
      { role: "system", content: instructions },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { role: "user", content: userContent as any },
    ],
    response_format: responseFormat,
  });

  reported(completion.usage);
  const raw = completion.choices[0]?.message?.content;
  if (!raw) throw new Error("The AI returned an empty response. Please try again.");
  return schema.parse(JSON.parse(raw)) as z.infer<T>;
}

/** Gateway image output stays on the server; callers receive validated bytes. */
export async function generateStudioImage(prompt: string) {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("Image generation is not configured for this project.");
  const limits = studioCallLimits();
  const model = studioAIConfig().imageModel;
  const boundedPrompt = clipPrompt(prompt, 8000);
  const reported = beginStudioProviderCall(model, 8000, 2048, 1);
  const response = await fetch(`${studioAIConfig().baseURL.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      max_completion_tokens: 2048,
      image_config: { image_size: limits.imageSize },
      modalities: ["image", "text"],
      messages: [{ role: "user", content: boundedPrompt }],
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
    usage?: { prompt_tokens?: number; completion_tokens?: number };
    choices?: Array<{ message?: { images?: Array<{ image_url?: { url?: string } }> } }>;
  };
  reported(result.usage);
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
