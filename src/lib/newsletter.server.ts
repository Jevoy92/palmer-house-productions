// Resend newsletter sync. Local tables are the source of truth for consent;
// Resend mirrors it. Consent (topics) and paid eligibility (segment) are separate.
import { studioBillingAdmin } from "./studio-credit-runtime.server";

const API = "https://api.resend.com";
export const MONTHLY_TOPIC = "37c789d5-8b13-4af3-a7ae-e035adc9002e"; // The Palmer House Letter
export const WEEKLY_TOPIC = "68caa885-2d32-44cd-9dee-3865f5eef1e5"; // The Studio Brief
const SEGMENT_NAME = "Active paid members (Studio Brief)";
const PAID_PLANS = ["creator", "business", "partner"];
export const MONTHLY_CONSENT_TEXT =
  "Yes, send me The Palmer House Letter, a free monthly email from Palmer House Productions. Unsubscribe anytime.";
export const WEEKLY_CONSENT_TEXT =
  "Yes, send me The Studio Brief, a weekly email for active paid Studio members. Unsubscribe anytime.";

type Admin = ReturnType<typeof studioBillingAdmin>;
export type Subscriber = {
  id: string;
  email: string;
  user_id: string | null;
  first_name: string | null;
  monthly: boolean;
  weekly: boolean;
  unsubscribed_all: boolean;
  paid_eligible: boolean;
  resend_contact_id: string | null;
  sync_state: string;
  sync_attempts: number;
};

export const admin = () => studioBillingAdmin();
export const normalizeEmail = (e: string) => e.trim().toLowerCase();
export const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,24}$/i;

class ResendError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}
async function resend<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new ResendError(0, "Resend API key is not configured.");
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...(init.headers || {}) },
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`Resend ${init.method || "GET"} ${path} [${res.status}]: ${text}`);
    throw new ResendError(res.status, `Resend [${res.status}]: ${text.slice(0, 300)}`);
  }
  return (text ? JSON.parse(text) : null) as T;
}

export async function sha256(value: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function paidSegmentId(db: Admin) {
  if (process.env.RESEND_PAID_SEGMENT_ID) return process.env.RESEND_PAID_SEGMENT_ID;
  const row = await db.from("newsletter_config").select("value").eq("key", "paid_segment_id").maybeSingle();
  if (row.data?.value) return row.data.value as string;
  const list = await resend<{ data: { id: string; name: string }[] }>("/segments");
  let id = list.data?.find((s) => s.name === SEGMENT_NAME)?.id;
  if (!id) id = (await resend<{ id: string }>("/segments", { method: "POST", body: JSON.stringify({ name: SEGMENT_NAME }) })).id;
  await db.from("newsletter_config").upsert({ key: "paid_segment_id", value: id, updated_at: new Date().toISOString() });
  return id;
}

/** Paid eligibility = member of a workspace with an active, non-held Studio/Guided/Partner plan. */
export async function computeEligibility(db: Admin, userId: string | null) {
  if (!userId) return false;
  const ws = await db.from("workspace_members").select("workspace_id").eq("user_id", userId);
  const ids = (ws.data ?? []).map((r: { workspace_id: string }) => r.workspace_id);
  if (!ids.length) return false;
  const subs = await db
    .from("workspace_subscriptions")
    .select("plan,status,billing_hold")
    .in("workspace_id", ids)
    .eq("status", "active")
    .eq("billing_hold", false)
    .in("plan", PAID_PLANS);
  return (subs.data ?? []).length > 0;
}

export async function recordConsent(
  db: Admin,
  sub: Pick<Subscriber, "id" | "email" | "user_id">,
  topic: "monthly" | "weekly" | "all",
  action: "opt_in" | "opt_out" | "unsubscribe_all" | "resubscribe_all",
  source: "website" | "signup" | "settings" | "resend",
  extra: { consent_text?: string; ip_hash?: string | null; user_agent?: string | null } = {},
) {
  const r = await db.from("newsletter_consent_events").insert({
    subscriber_id: sub.id,
    email: sub.email,
    user_id: sub.user_id,
    topic,
    action,
    source,
    consent_text: extra.consent_text ?? null,
    ip_hash: extra.ip_hash ?? null,
    user_agent: extra.user_agent?.slice(0, 300) ?? null,
  });
  if (r.error) throw new Error("Consent could not be recorded.");
}

/** Push one subscriber's local state to Resend. Never throws; failures stay pending for retry. */
export async function syncSubscriber(db: Admin, id: string) {
  const got = await db.from("newsletter_subscribers").select("*").eq("id", id).maybeSingle();
  const sub = got.data as Subscriber | null;
  if (!sub) return;
  try {
    const eligible = await computeEligibility(db, sub.user_id);
    const topics = [
      { id: MONTHLY_TOPIC, subscription: sub.monthly ? "opt_in" : "opt_out" },
      { id: WEEKLY_TOPIC, subscription: sub.weekly ? "opt_in" : "opt_out" },
    ];
    let contactId = sub.resend_contact_id;
    const wantsAny = sub.monthly || sub.weekly;
    if (!contactId && !wantsAny) {
      await db.from("newsletter_subscribers").update({ paid_eligible: eligible, sync_state: "synced", sync_error: null, last_synced_at: new Date().toISOString() }).eq("id", id);
      return;
    }
    const segment = await paidSegmentId(db);
    const ref = encodeURIComponent(sub.email);
    if (!contactId) {
      try {
        const created = await resend<{ id: string }>("/contacts", {
          method: "POST",
          body: JSON.stringify({
            email: sub.email,
            first_name: sub.first_name ?? undefined,
            unsubscribed: sub.unsubscribed_all,
            topics,
            segments: eligible ? [{ id: segment }] : [],
          }),
        });
        contactId = created.id;
      } catch (e) {
        if (!(e instanceof ResendError) || ![409, 422].includes(e.status)) throw e;
        contactId = (await resend<{ id: string }>(`/contacts/${ref}`)).id; // already exists
        await updateExisting();
      }
    } else {
      await updateExisting();
    }
    async function updateExisting() {
      await resend(`/contacts/${ref}`, { method: "PATCH", body: JSON.stringify({ unsubscribed: sub!.unsubscribed_all, first_name: sub!.first_name ?? undefined }) });
      await resend(`/contacts/${ref}/topics`, { method: "PATCH", body: JSON.stringify({ topics }) });
      try {
        await resend(`/contacts/${ref}/segments/${segment}`, { method: eligible ? "POST" : "DELETE" });
      } catch (e) {
        // Already in / not in the segment is fine.
        if (!(e instanceof ResendError) || ![404, 409, 422].includes(e.status)) throw e;
      }
    }
    await db
      .from("newsletter_subscribers")
      .update({ resend_contact_id: contactId, paid_eligible: eligible, sync_state: "synced", sync_attempts: 0, sync_error: null, last_synced_at: new Date().toISOString() })
      .eq("id", id);
  } catch (e) {
    const attempts = sub.sync_attempts + 1;
    await db
      .from("newsletter_subscribers")
      .update({ sync_state: attempts >= 8 ? "error" : "pending", sync_attempts: attempts, sync_error: String((e as Error).message).slice(0, 500) })
      .eq("id", id);
  }
}

/** Opportunistic retry of stale pending rows (called on every newsletter write and webhook). */
export async function retryPending(db: Admin, limit = 5) {
  const cutoff = new Date(Date.now() - 60_000).toISOString();
  const rows = await db.from("newsletter_subscribers").select("id").eq("sync_state", "pending").lt("updated_at", cutoff).order("updated_at").limit(limit);
  for (const r of rows.data ?? []) await syncSubscriber(db, r.id);
}

export async function markPending(db: Admin, id: string, patch: Record<string, unknown> = {}) {
  const r = await db.from("newsletter_subscribers").update({ ...patch, sync_state: "pending", updated_at: new Date().toISOString() }).eq("id", id);
  if (r.error) throw new Error("Preferences could not be saved.");
}

/** After billing changes, re-evaluate weekly eligibility for every member of the workspace. Consent untouched. */
export async function refreshWorkspaceEligibility(workspaceId: string) {
  try {
    const db = admin();
    const members = await db.from("workspace_members").select("user_id").eq("workspace_id", workspaceId);
    const ids = (members.data ?? []).map((m: { user_id: string }) => m.user_id);
    if (!ids.length) return;
    const subs = await db.from("newsletter_subscribers").select("id").in("user_id", ids);
    for (const s of subs.data ?? []) {
      await markPending(db, s.id);
      await syncSubscriber(db, s.id);
    }
  } catch (e) {
    console.error("Newsletter eligibility refresh failed", (e as Error).message);
  }
}

/** Fetch Resend's view of a contact's topic subscriptions. */
export async function fetchContactTopics(contactId: string) {
  const res = await resend<{ data: { id: string; subscription: string }[] }>(`/contacts/${contactId}/topics`);
  const m = res.data?.find((t) => t.id === MONTHLY_TOPIC)?.subscription;
  const w = res.data?.find((t) => t.id === WEEKLY_TOPIC)?.subscription;
  return { monthly: m === "opt_in", weekly: w === "opt_in" };
}
