/** Server-only helpers for the free Expo guest demo. No guest content is stored;
 * only an anonymous usage count so the demo has its own spending cap. */
import { studioAIConfig } from "./studio-ai-config.server";

type Kind = "chat" | "research" | "campaign" | "image";
const sessionCaps: Record<Kind, number> = { chat: 40, research: 6, campaign: 4, image: 8 };

async function admin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

/** Reserve one unit of the Expo demo's own budget. Never touches member credits. */
export async function reserveExpoDemo(sessionId: string, kind: Kind) {
  const db = await admin();
  const dailyCap = Number(process.env.EXPO_DEMO_DAILY_CAP || "600");
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const [{ count: day }, { count: mine }] = await Promise.all([
    db.from("expo_demo_usage").select("id", { count: "exact", head: true }).gte("created_at", since),
    db
      .from("expo_demo_usage")
      .select("id", { count: "exact", head: true })
      .eq("session_id", sessionId)
      .eq("kind", kind),
  ]);
  if ((day ?? 0) >= dailyCap)
    throw new Error("The free demo has reached today's limit. Ask our team to show you Studio.");
  if ((mine ?? 0) >= sessionCaps[kind])
    throw new Error("This guest session has used its demo allowance. Tap Next guest to start fresh.");
  await db.from("expo_demo_usage").insert({ session_id: sessionId, kind });
}

export async function gatewayJSON<T>(system: string, user: string, timeoutMs = 60000): Promise<T> {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured.");
  const res = await fetch(`${studioAIConfig().baseURL.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.EXPO_DEMO_MODEL || studioAIConfig().buildModel,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    }),
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (res.status === 429) throw new Error("The AI is busy for a moment. Try again in a few seconds.");
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
  const res = await fetch(`${studioAIConfig().baseURL.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: studioAIConfig().imageModel,
      modalities: ["image", "text"],
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

function privateHost(host: string) {
  const h = host.toLowerCase();
  if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal")) return true;
  if (/^(10|127|0)\./.test(h) || /^192\.168\./.test(h) || /^169\.254\./.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
  if (h.includes(":") || h === "[::1]") return true;
  return false;
}

/** Fetch one public page as untrusted text. Bounded time, size, and redirects. */
export async function fetchPublicPage(raw: string) {
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    throw new Error("That doesn't look like a website address.");
  }
  for (let hop = 0; hop < 3; hop++) {
    if (!/^https?:$/.test(url.protocol) || privateHost(url.hostname))
      throw new Error("That address can't be opened from the demo.");
    const res = await fetch(url, {
      redirect: "manual",
      headers: { "User-Agent": "PalmerHouseStudioDemo/1.0", Accept: "text/html" },
      signal: AbortSignal.timeout(8000),
    });
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      url = new URL(res.headers.get("location")!, url);
      continue;
    }
    if (!res.ok) throw new Error(`The site answered with ${res.status}.`);
    const reader = res.body?.getReader();
    let html = "";
    const dec = new TextDecoder();
    while (reader && html.length < 400_000) {
      const { done, value } = await reader.read();
      if (done) break;
      html += dec.decode(value, { stream: true });
    }
    reader?.cancel().catch(() => {});
    const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? url.hostname;
    const desc =
      html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i)?.[1] ?? "";
    const text = html
      .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<noscript[\s\S]*?<\/noscript>/gi, " ")
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
