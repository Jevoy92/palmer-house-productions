import { zodResponseFormat } from "openai/helpers/zod";
import type { z } from "zod";

type ImagePart = { type: "input_image"; image_url: string; detail?: "low" | "high" | "auto" };
type TextPart = { type: "input_text"; text: string };
type StudioInput =
  | string
  | Array<{ role: "user"; content: Array<TextPart | ImagePart> }>;

/**
 * Structured AI generation through the Lovable AI Gateway.
 * Uses the OpenAI-compatible chat completions endpoint, so no external API key is needed.
 */
export async function parseStructured<T extends z.ZodTypeAny>(
  schema: T,
  schemaName: string,
  instructions: string,
  input: StudioInput,
): Promise<z.infer<T>> {
  const key = process.env['LOVABLE_API_KEY'];
  if (!key) throw new Error("AI is not configured for this project.");
  const { default: OpenAI } = await import("openai");
  const client = new OpenAI({
    apiKey: key,
    baseURL: process.env['AI_GATEWAY_URL'] || "https://ai.gateway.lovable.dev/v1",
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
    model: process.env['STUDIO_AI_MODEL'] || "openai/gpt-5-mini",
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
