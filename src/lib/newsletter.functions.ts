import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const PublicSchema = z.object({
  email: z.string().trim().min(5).max(254),
  firstName: z.string().trim().max(80).optional(),
  consent: z.literal(true),
  website: z.string().max(200).optional(), // honeypot
  startedAt: z.number().int(),
});

const OK = { ok: true, message: "You're on the list. Look for The Palmer House Letter next month." };

export const subscribeMonthlyNewsletter = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => PublicSchema.parse(d))
  .handler(async ({ data }) => {
    const n = await import("./newsletter.server");
    const { getRequest } = await import("@tanstack/react-start/server");
    // Spam protection: honeypot and minimum fill time quietly succeed without saving.
    if (data.website) return OK;
    const elapsed = Date.now() - data.startedAt;
    if (elapsed < 2500 || elapsed > 6 * 3600_000) return OK;
    const email = n.normalizeEmail(data.email);
    if (!n.EMAIL_RE.test(email)) throw new Error("Please enter a valid email address.");
    const req = getRequest();
    const ip = req?.headers.get("cf-connecting-ip") || req?.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const ipHash = await n.sha256(`php-newsletter:${ip}`);
    const ua = req?.headers.get("user-agent") ?? null;
    const db = n.admin();
    const hourAgo = new Date(Date.now() - 3600_000).toISOString();
    const dayAgo = new Date(Date.now() - 86400_000).toISOString();
    const [byIp, byEmail] = await Promise.all([
      db.from("newsletter_consent_events").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash).gte("created_at", hourAgo),
      db.from("newsletter_consent_events").select("id", { count: "exact", head: true }).eq("email", email).gte("created_at", dayAgo),
    ]);
    if ((byIp.count ?? 0) >= 5) throw new Error("Too many signups from this connection. Please try again later.");
    if ((byEmail.count ?? 0) >= 3) return OK;

    const existing = await db.from("newsletter_subscribers").select("*").eq("email", email).maybeSingle();
    let sub = existing.data as import("./newsletter.server").Subscriber | null;
    // A global unsubscribe is never overridden from the public form.
    if (sub?.unsubscribed_all) return OK;
    if (sub?.monthly) return OK;
    if (!sub) {
      const ins = await db.from("newsletter_subscribers").insert({ email, first_name: data.firstName || null, monthly: true }).select("*").single();
      if (ins.error) throw new Error("We couldn't save your signup. Please try again.");
      sub = ins.data as typeof sub;
    } else {
      await n.markPending(db, sub.id, { monthly: true, first_name: sub.first_name || data.firstName || null });
    }
    await n.recordConsent(db, sub!, "monthly", "opt_in", "website", { consent_text: n.MONTHLY_CONSENT_TEXT, ip_hash: ipHash, user_agent: ua });
    await n.syncSubscriber(db, sub!.id);
    await n.retryPending(db);
    return OK;
  });

const Auth = z.object({ accessToken: z.string().min(20) });

async function member(accessToken: string) {
  const { createUserScopedSupabase } = await import("./supabase/client");
  const { data, error } = await createUserScopedSupabase(accessToken).auth.getUser(accessToken);
  if (error || !data.user?.email) throw new Error("Your session has expired. Please sign in again.");
  return data.user;
}

async function ensureRow(db: ReturnType<typeof import("./newsletter.server")["admin"]>, user: Awaited<ReturnType<typeof member>>) {
  const n = await import("./newsletter.server");
  const email = n.normalizeEmail(user.email!);
  const byUser = await db.from("newsletter_subscribers").select("*").eq("user_id", user.id).maybeSingle();
  if (byUser.data) return byUser.data as import("./newsletter.server").Subscriber;
  const byEmail = await db.from("newsletter_subscribers").select("*").eq("email", email).maybeSingle();
  const firstName = String(user.user_metadata?.full_name || "").split(" ")[0] || null;
  if (byEmail.data) {
    // Link only when the verified account email matches; consent is not changed.
    const up = await db.from("newsletter_subscribers").update({ user_id: user.id }).eq("id", byEmail.data.id).select("*").single();
    return up.data as import("./newsletter.server").Subscriber;
  }
  const ins = await db.from("newsletter_subscribers").insert({ email, user_id: user.id, first_name: firstName, sync_state: "synced" }).select("*").single();
  if (ins.error) throw new Error("Preferences could not be loaded.");
  return ins.data as import("./newsletter.server").Subscriber;
}

function view(sub: import("./newsletter.server").Subscriber, eligible: boolean) {
  return {
    monthly: sub.monthly && !sub.unsubscribed_all,
    weekly: sub.weekly && !sub.unsubscribed_all,
    unsubscribedAll: sub.unsubscribed_all,
    weeklyEligible: eligible,
    syncState: sub.sync_state,
  };
}

export const getNewsletterPrefs = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Auth.parse(d))
  .handler(async ({ data }) => {
    const n = await import("./newsletter.server");
    const user = await member(data.accessToken);
    const db = n.admin();
    const sub = await ensureRow(db, user);
    return view(sub, await n.computeEligibility(db, user.id));
  });

export const saveNewsletterPrefs = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Auth.extend({ monthly: z.boolean(), weekly: z.boolean() }).parse(d))
  .handler(async ({ data }) => {
    const n = await import("./newsletter.server");
    const { getRequest } = await import("@tanstack/react-start/server");
    const user = await member(data.accessToken);
    const db = n.admin();
    const sub = await ensureRow(db, user);
    const eligible = await n.computeEligibility(db, user.id);
    // Weekly opt-in requires an active paid plan; opting out is always allowed.
    const weekly = data.weekly && (eligible || sub.weekly);
    if (data.weekly && !weekly) throw new Error("The Studio Brief is for active Studio, Guided and Partner members.");
    const ua = getRequest()?.headers.get("user-agent") ?? null;
    const patch: Record<string, unknown> = { monthly: data.monthly, weekly };
    const wasMonthly = sub.monthly && !sub.unsubscribed_all;
    const wasWeekly = sub.weekly && !sub.unsubscribed_all;
    if (sub.unsubscribed_all && (data.monthly || weekly)) {
      patch.unsubscribed_all = false; // explicit re-opt-in by the signed-in owner
      await n.recordConsent(db, sub, "all", "resubscribe_all", "settings", { user_agent: ua });
    }
    if (data.monthly !== wasMonthly)
      await n.recordConsent(db, sub, "monthly", data.monthly ? "opt_in" : "opt_out", "settings", { consent_text: data.monthly ? n.MONTHLY_CONSENT_TEXT : undefined, user_agent: ua });
    if (weekly !== wasWeekly)
      await n.recordConsent(db, sub, "weekly", weekly ? "opt_in" : "opt_out", "settings", { consent_text: weekly ? n.WEEKLY_CONSENT_TEXT : undefined, user_agent: ua });
    await n.markPending(db, sub.id, patch);
    await n.syncSubscriber(db, sub.id);
    await n.retryPending(db);
    const fresh = await db.from("newsletter_subscribers").select("*").eq("id", sub.id).single();
    return view(fresh.data as typeof sub, eligible);
  });

/** Applies the monthly opt-in ticked at email signup, exactly once per account. */
export const applySignupNewsletterConsent = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Auth.parse(d))
  .handler(async ({ data }) => {
    const n = await import("./newsletter.server");
    const user = await member(data.accessToken);
    const meta = user.user_metadata ?? {};
    if (meta.newsletter_monthly !== true || !meta.newsletter_consent_at) return { applied: false };
    const db = n.admin();
    const sub = await ensureRow(db, user);
    const prior = await db.from("newsletter_consent_events").select("id").eq("subscriber_id", sub.id).eq("source", "signup").limit(1);
    if ((prior.data ?? []).length || sub.unsubscribed_all) return { applied: false };
    await n.recordConsent(db, sub, "monthly", "opt_in", "signup", { consent_text: n.MONTHLY_CONSENT_TEXT });
    if (!sub.monthly) {
      await n.markPending(db, sub.id, { monthly: true });
      await n.syncSubscriber(db, sub.id);
    }
    return { applied: true };
  });
