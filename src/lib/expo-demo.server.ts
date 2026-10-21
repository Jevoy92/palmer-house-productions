/** Server-only helpers for the free Expo guest demo. No guest content is stored;
 * only an anonymous usage count so the demo has its own spending cap. */
import { studioAIConfig } from "./studio-ai-config.server";

import {
  demoIdentity,
  demoLimits,
  assertDemoProviderBudget,
  type DemoKind,
} from "./expo-demo-limits.server";

async function admin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

/** Reserve one unit of the Expo demo's own budget. Never touches member credits. */
export async function reserveExpoDemo(_clientSessionId: string, kind: DemoKind) {
  const { sessionId, networkHash } = await demoIdentity();
  const limits = demoLimits(kind);
  const db = await admin();
  const { data, error } = await db.rpc("reserve_expo_demo", {
    p_session_id: sessionId,
    p_network_hash: networkHash,
    p_kind: kind,
    p_session_cap: limits.sessionCap,
    p_daily_cap: limits.dailyCap,
    p_network_cap: limits.networkCap,
    p_budget_cents: limits.budgetCents,
    p_cost_cents: limits.costCents,
  });
  if (error || !data) {
    // Database outages, missing migrations and rejected reservations all stop provider calls.
    const message = error?.message || "";
    throw new Error(
      message.includes("allowance")
        ? message
        : "The free demo is temporarily unavailable. Explore a prepared example instead.",
    );
  }
}

export async function gatewayJSON<T>(
  system: string,
  user: string,
  timeoutMs = 60000,
  kind: "chat" | "campaign" = "chat",
): Promise<T> {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured.");
  const model =
    process.env.EXPO_DEMO_MODEL ||
    (kind === "campaign" ? studioAIConfig().buildModel : studioAIConfig().chatModel);
  const maxOutput = kind === "campaign" ? 8000 : 2500;
  await assertDemoProviderBudget(kind, model, system + user, maxOutput);
  const res = await fetch(`${studioAIConfig().baseURL.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      max_tokens: maxOutput,
      response_format: { type: "json_object" },
    }),
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (res.status === 429)
    throw new Error("The AI is busy for a moment. Try again in a few seconds.");
  if (res.status === 402) throw new Error("The demo's AI allowance is used up. Ask our team.");
  if (!res.ok) throw new Error("The AI could not answer just now. Please try again.");
  const body = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const raw = body.choices?.[0]?.message?.content ?? "";
  const cleaned = raw.replace(/^```(?:json)?\s*|\s*```$/g, "");
  return JSON.parse(cleaned) as T;
}

export async function gatewayImage(prompt: string, aspect: string) {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured.");
  await assertDemoProviderBudget("image", studioAIConfig().imageModel, prompt, 4000, 1);
  const res = await fetch(`${studioAIConfig().baseURL.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: studioAIConfig().imageModel,
      modalities: ["image", "text"],
      max_tokens: 4000,
      image_config: { image_size: "2K", aspect_ratio: aspect },
      messages: [
        {
          role: "user",
          content: `${prompt.slice(0, 1500)}\nAspect ratio ${aspect}. Photographic, natural light, editorial. No text, no logos, no watermarks, no people's faces in close-up.`,
        },
      ],
    }),
    signal: AbortSignal.timeout(90000),
  });
  if (!res.ok) throw new Error("Image generation is unavailable right now.");
  const body = (await res.json()) as {
    choices?: Array<{ message?: { images?: Array<{ image_url?: { url?: string } }> } }>;
  };
  const url = body.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  if (!url || !/^data:image\/(png|jpeg|webp);base64,/.test(url))
    throw new Error("No usable image came back.");
  return url;
}

/** Read an untrusted public page through a DNS-pinned, bounded transport. */
export async function fetchPublicPage(raw: string) {
  const { publicPageURL, fetchPinnedPublicPage } = await import("./public-page-fetch.server");
  let url = publicPageURL(raw);
  for (let hop = 0; hop < 3; hop++) {
    const res = await fetchPinnedPublicPage(url);
    if (res.status >= 300 && res.status < 400 && res.location) {
      url = publicPageURL(new URL(res.location, url).toString());
      continue;
    }
    if (res.status < 200 || res.status >= 300)
      throw new Error(`The site answered with ${res.status}.`);
    const html = res.html;
    const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? url.hostname;
    const desc =
      html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i)?.[1] ?? "";
    const text = html
      .replace(
        /<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<noscript[\s\S]*?<\/noscript>/gi,
        " ",
      )
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 6000);
    return { url: url.toString(), title, description: desc, text };
  }
  throw new Error("That site redirected too many times.");
}
