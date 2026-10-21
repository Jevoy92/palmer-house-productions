import {
  getCookie,
  setCookie,
  getRequestIP,
  getRequestHeader,
  getRequestUrl,
} from "@tanstack/react-start/server";

export type DemoKind = "chat" | "research" | "campaign" | "image";
export const demoSessionCaps: Record<DemoKind, number> = {
  chat: 40,
  research: 6,
  campaign: 4,
  image: 8,
};
// Conservative reservations, not a claim about a provider's actual invoice.
const reservationCents: Record<DemoKind, number> = {
  chat: 5,
  research: 1,
  campaign: 25,
  image: 50,
};
export function positiveLimit(value: string | undefined, fallback: number, maximum: number) {
  if (value === undefined || value === "") return fallback;
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 1 || parsed > maximum)
    throw new Error("The demo usage limits are not configured correctly.");
  return parsed;
}
async function sign(value: string) {
  const secret =
    process.env.EXPO_DEMO_IDENTITY_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY;
  if (!secret) throw new Error("The free demo is temporarily unavailable.");
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`palmer-demo-v1:${value}`),
  );
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}
export async function demoIdentity() {
  const now = Date.now();
  const cookie = getCookie("ph_demo_budget") || "";
  const [id, issued, signature] = cookie.split(".");
  const valid =
    /^[\da-f-]{36}$/.test(id || "") &&
    /^\d{13}$/.test(issued || "") &&
    Number(issued) <= now &&
    now - Number(issued) < 86400000 &&
    signature === (await sign(`${id}.${issued}`));
  const sessionId = valid ? id : crypto.randomUUID();
  if (!valid) {
    const payload = `${sessionId}.${now}`;
    setCookie("ph_demo_budget", `${payload}.${await sign(payload)}`, {
      httpOnly: true,
      secure: getRequestUrl().protocol === "https:",
      sameSite: "lax",
      path: "/",
      maxAge: 86400,
    });
  }
  // Forwarded headers are trusted only when the deployment explicitly confirms its edge strips them.
  const ip =
    (process.env.EXPO_DEMO_TRUST_CF_IP === "true"
      ? getRequestHeader("cf-connecting-ip")
      : undefined) ||
    getRequestIP({ xForwardedFor: false }) ||
    "unverified-edge";
  return { sessionId, networkHash: await sign(`network:${ip}`) };
}
export function demoLimits(kind: DemoKind) {
  return {
    sessionCap: demoSessionCaps[kind],
    dailyCap: positiveLimit(process.env.EXPO_DEMO_DAILY_CAP, 600, 10000),
    networkCap: positiveLimit(process.env.EXPO_DEMO_NETWORK_CAP, 100, 1000),
    budgetCents: positiveLimit(process.env.EXPO_DEMO_BUDGET_CENTS, 1000, 100000),
    costCents: positiveLimit(
      process.env[`EXPO_DEMO_${kind.toUpperCase()}_RESERVATION_CENTS`],
      reservationCents[kind],
      10000,
    ),
  };
}

/** Reject unknown routes and requests whose estimated maximum exceeds the reserved allowance. */
export async function assertDemoProviderBudget(
  kind: DemoKind,
  model: string,
  input: string,
  outputTokens: number,
  images = 0,
) {
  const { studioModelRates } = await import("./studio-model-rates");
  const rates = studioModelRates[model];
  const inputTokens = new TextEncoder().encode(input).length + 1000;
  if (!rates || (images && !rates.image2k))
    throw new Error("This demo model needs an approved cost profile before it can run.");
  if (inputTokens > 20000)
    throw new Error(
      "This conversation is too long for the free demo. Start a shorter brief or explore a prepared example.",
    );
  const cents =
    ((inputTokens * rates.input + outputTokens * rates.output) / 1000000 +
      images * (rates.image2k || 0)) *
    125;
  if (cents > demoLimits(kind).costCents)
    throw new Error("This request exceeds the demo's reserved allowance. No AI request was sent.");
}
