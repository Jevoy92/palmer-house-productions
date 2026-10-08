import { createClient } from "@supabase/supabase-js";
import { studioBillingAdmin } from "./studio-credit-runtime.server";
import { filmingBenefits, FILMING_SESSION_FEE, type StudioPlanKey } from "./studio-model";

export type MemberBenefit = {
  workspaceId: string;
  plan: StudioPlanKey;
  /** Dollars off the session fee for this booking. */
  discount: number;
  label: string;
  redemptionId?: string;
};

const monthKey = () => {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-01`;
};

/** Verifies the caller's active membership server-side and, for Partner, reserves this month's included session. */
export async function resolveFilmingBenefit(
  accessToken: string | undefined,
  workspaceId: string | undefined,
  reference: string,
): Promise<MemberBenefit | null> {
  if (!accessToken) return null;
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  const userClient = createClient(url, key, { auth: { persistSession: false } });
  const { data: u } = await userClient.auth.getUser(accessToken);
  if (!u.user) return null;
  const admin = studioBillingAdmin();
  if (!workspaceId) {
    // Public checkout: use the caller's best active membership.
    const ms = await admin.from("workspace_members").select("workspace_id").eq("user_id", u.user.id);
    const ids = (ms.data || []).map((m) => m.workspace_id);
    if (!ids.length) return null;
    const subs = await admin.from("workspace_subscriptions").select("workspace_id,plan").in("workspace_id", ids).eq("status", "active");
    const rank: Record<string, number> = { partner: 3, business: 2, creator: 1 };
    const best = (subs.data || []).sort((a, b) => (rank[b.plan] ?? 0) - (rank[a.plan] ?? 0))[0];
    if (!best) return null;
    workspaceId = best.workspace_id;
  }
  const ws: string = workspaceId;
  const [member, sub] = await Promise.all([
    admin.from("workspace_members").select("role").eq("workspace_id", ws).eq("user_id", u.user.id).maybeSingle(),
    admin.from("workspace_subscriptions").select("plan,status,current_period_end,billing_hold").eq("workspace_id", ws).maybeSingle(),
  ]);
  const s = sub.data;
  if (!member.data || !s || s.status !== "active" || s.billing_hold) return null;
  if (new Date(s.current_period_end) < new Date()) return null;
  const plan = s.plan as StudioPlanKey;
  const benefit = filmingBenefits[plan];
  if (!benefit) return null;
  if (benefit.kind === "discount")
    return { ws, plan, discount: (FILMING_SESSION_FEE * benefit.percent) / 100, label: `Member filming benefit (${benefit.percent}% off session)` };
  // Partner: one included session per calendar month. Release abandoned reservations older than 1h.
  const period = monthKey();
  await admin
    .from("filming_benefit_redemptions")
    .update({ status: "released", updated_at: new Date().toISOString() })
    .eq("workspace_id", ws)
    .eq("status", "reserved")
    .lt("created_at", new Date(Date.now() - 3600_000).toISOString());
  const ins = await admin
    .from("filming_benefit_redemptions")
    .insert({ workspace_id: ws, period_month: period, quote_reference: reference })
    .select("id")
    .single();
  if (ins.error || !ins.data)
    return { ws, plan, discount: FILMING_SESSION_FEE * 0.5, label: "Member filming benefit (50% off — this month's included session is used)" };
  return { ws, plan, discount: FILMING_SESSION_FEE, label: "Member filming benefit (included monthly session)", redemptionId: ins.data.id };
}

export async function markRedemption(id: string, status: "redeemed" | "released", sessionId?: string) {
  await studioBillingAdmin()
    .from("filming_benefit_redemptions")
    .update({ status, checkout_session_id: sessionId ?? null, updated_at: new Date().toISOString() })
    .eq("id", id);
}

export async function getFilmingBenefitStatus(ws: string) {
  const r = await studioBillingAdmin()
    .from("filming_benefit_redemptions")
    .select("id")
    .eq("workspace_id", ws)
    .eq("period_month", monthKey())
    .in("status", ["reserved", "redeemed"])
    .maybeSingle();
  return { usedThisMonth: !!r.data };
}
