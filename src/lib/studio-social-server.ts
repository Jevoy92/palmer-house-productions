import { createServerFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";
import { z } from "zod";
import { StudioAuthSchema } from "./studio-recovery";
import { authorizedStudioClient } from "./studio-auth.server";
import { studioBillingAdmin, isStudioOperator } from "./studio-credit-runtime.server";
import { stripeSecretKey } from "@/lib/stripe-env";

const BUNDLE = "https://api.bundle.social/api/v1";
const PLATFORMS = ["INSTAGRAM", "FACEBOOK"] as const;
type Platform = (typeof PLATFORMS)[number];
export const SOCIAL_FREE_POSTS = 20;
export const SOCIAL_ADDON_POSTS = 100;
export const SOCIAL_ADDON_PRICE_USD = 19;

async function bundle<T = any>(path: string, init: RequestInit = {}): Promise<T> {
  const key = process.env.BUNDLE_SOCIAL_API_KEY;
  if (!key) throw new Error("Social posting isn't connected yet.");
  const res = await fetch(`${BUNDLE}${path}`, {
    ...init,
    headers: { "x-api-key": key, "Content-Type": "application/json", Accept: "application/json", ...(init.headers || {}) },
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`bundle.social ${path} [${res.status}]: ${text}`);
    let msg = text;
    try { msg = JSON.parse(text).message ?? text; } catch {}
    throw new Error(`The posting service said: ${String(msg).slice(0, 200)}`);
  }
  return (text ? JSON.parse(text) : null) as T;
}

async function access(data: { accessToken: string; workspaceId: string }) {
  const auth = await authorizedStudioClient(data.accessToken, data.workspaceId);
  const enabled = process.env.STUDIO_SOCIAL_POSTING_ENABLED === "true" || isStudioOperator(auth.user.id);
  return { ...auth, enabled, admin: studioBillingAdmin() };
}

async function ensureTeam(admin: ReturnType<typeof studioBillingAdmin>, workspaceId: string) {
  const row = await admin.from("social_teams").select("bundle_team_id").eq("workspace_id", workspaceId).maybeSingle();
  if (row.data?.bundle_team_id) return row.data.bundle_team_id as string;
  const ws = await admin.from("workspaces").select("name").eq("id", workspaceId).single();
  const team = await bundle<{ id: string }>("/team/", {
    method: "POST",
    body: JSON.stringify({ name: `${ws.data?.name || "Studio"} · ${workspaceId.slice(0, 8)}` }),
  });
  const ins = await admin.from("social_teams").insert({ workspace_id: workspaceId, bundle_team_id: team.id });
  if (ins.error) {
    const again = await admin.from("social_teams").select("bundle_team_id").eq("workspace_id", workspaceId).single();
    return again.data!.bundle_team_id as string;
  }
  return team.id;
}

function monthStart() {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)).toISOString();
}

export const getStudioSocial = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema)
  .handler(async ({ data }) => {
    const { enabled, admin, role } = await access(data);
    if (!enabled) return { enabled: false as const };
    const [addon, team, posts] = await Promise.all([
      admin.from("social_publishing_addons").select("*").eq("workspace_id", data.workspaceId).maybeSingle(),
      admin.from("social_teams").select("bundle_team_id").eq("workspace_id", data.workspaceId).maybeSingle(),
      admin.from("social_posts").select("*").eq("workspace_id", data.workspaceId).order("created_at", { ascending: false }).limit(30),
    ]);
    const active = addon.data?.status === "active" && (!addon.data.current_period_end || new Date(addon.data.current_period_end) > new Date());
    let accounts: { type: Platform; name: string }[] = [];
    if (team.data?.bundle_team_id) {
      const t = await bundle<any>(`/team/${team.data.bundle_team_id}`);
      accounts = (t?.socialAccounts || [])
        .filter((a: any) => PLATFORMS.includes(a.type) && !a.deletedAt)
        .map((a: any) => ({ type: a.type, name: a.displayName || a.username || a.type }));
    }
    // Refresh in-flight statuses from the provider.
    const list = posts.data || [];
    await Promise.all(
      list
        .filter((p) => p.status === "scheduled" && p.bundle_post_id && new Date(p.scheduled_at) <= new Date())
        .slice(0, 10)
        .map(async (p) => {
          try {
            const remote = await bundle<any>(`/post/${p.bundle_post_id}`);
            const s = String(remote?.status || "").toUpperCase();
            const next = s === "POSTED" ? "posted" : s === "ERROR" || s === "FAILED" ? "failed" : null;
            if (next) {
              const err = next === "failed" ? JSON.stringify(remote?.errors || remote?.error || "Post failed").slice(0, 300) : null;
              await admin.from("social_posts").update({ status: next, error: err, updated_at: new Date().toISOString() }).eq("id", p.id);
              p.status = next;
              p.error = err;
            }
          } catch {}
        }),
    );
    const since = monthStart();
    const used = list
      .filter((p) => p.created_at >= since && p.status !== "failed" && p.status !== "canceled")
      .reduce((n, p) => n + p.destinations, 0);
    return {
      enabled: true as const,
      addonActive: active,
      allowance: active ? SOCIAL_ADDON_POSTS : SOCIAL_FREE_POSTS,
      used,
      accounts,
      canManageBilling: role === "owner" || role === "admin",
      posts: list.map((p) => ({
        id: p.id, platforms: p.platforms as string[], caption: p.caption, mediaUrl: p.media_url,
        scheduledAt: p.scheduled_at, status: p.status, error: p.error, destinations: p.destinations,
      })),
    };
  });

export const connectStudioSocial = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema)
  .handler(async ({ data }) => {
    const { enabled, admin } = await access(data);
    if (!enabled) throw new Error("Social posting isn't available yet.");
    const teamId = await ensureTeam(admin, data.workspaceId);
    const origin = process.env.PUBLIC_SITE_URL || getRequestUrl().origin;
    const link = await bundle<{ url: string }>("/social-account/create-portal-link", {
      method: "POST",
      body: JSON.stringify({ teamId, redirectUrl: `${origin}/studio/settings?social=connected`, socialAccountTypes: PLATFORMS }),
    });
    return { url: link.url };
  });

export const disconnectStudioSocial = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema.extend({ type: z.enum(PLATFORMS) }))
  .handler(async ({ data }) => {
    const { admin } = await access(data);
    const team = await admin.from("social_teams").select("bundle_team_id").eq("workspace_id", data.workspaceId).single();
    if (!team.data) return { ok: true };
    await bundle("/social-account/disconnect", { method: "DELETE", body: JSON.stringify({ type: data.type, teamId: team.data.bundle_team_id }) });
    return { ok: true };
  });

export const publishStudioSocial = createServerFn({ method: "POST" })
  .validator(
    StudioAuthSchema.extend({
      platforms: z.array(z.enum(PLATFORMS)).min(1).max(2),
      caption: z.string().trim().min(1).max(2200),
      imageUrl: z.string().url().max(2000).optional(),
      assetId: z.string().uuid().optional(),
      scheduledAt: z.string().datetime().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { enabled, admin, user } = await access(data);
    if (!enabled) throw new Error("Social posting isn't available yet.");
    if (data.platforms.includes("INSTAGRAM") && !data.imageUrl)
      throw new Error("Instagram needs a photo. Pick a piece with an image.");
    if (data.imageUrl && /\.(mp4|mov|webm)(\?|$)/i.test(data.imageUrl))
      throw new Error("Video posting isn't available yet.");
    const teamId = await ensureTeam(admin, data.workspaceId);
    const reserved = await admin.rpc("reserve_social_posts", {
      target_workspace_id: data.workspaceId, actor: user.id, asset: data.assetId ?? null,
      platform_list: data.platforms, post_caption: data.caption, post_media: data.imageUrl ?? null,
      post_at: data.scheduledAt ?? new Date().toISOString(),
    });
    if (reserved.error) throw new Error("Could not check your posting allowance.");
    const r = reserved.data as { ok: boolean; id?: string; used: number; allowance: number };
    if (!r.ok) return { ok: false as const, code: "LIMIT" as const, used: r.used, allowance: r.allowance };
    try {
      const uploadIds: string[] = [];
      if (data.imageUrl) {
        const up = await bundle<{ id: string }>("/upload/from-url", { method: "POST", body: JSON.stringify({ teamId, url: data.imageUrl }) });
        uploadIds.push(up.id);
      }
      const body: Record<string, unknown> = {};
      for (const p of data.platforms) body[p] = { type: "POST", text: data.caption, uploadIds };
      const post = await bundle<{ id: string }>("/post/", {
        method: "POST",
        body: JSON.stringify({
          teamId, title: data.caption.slice(0, 80), referenceKey: r.id,
          postDate: data.scheduledAt ?? new Date().toISOString(), status: "SCHEDULED",
          socialAccountTypes: data.platforms, data: body,
        }),
      });
      await admin.from("social_posts").update({ status: "scheduled", bundle_post_id: post.id, updated_at: new Date().toISOString() }).eq("id", r.id!);
      return { ok: true as const, id: r.id!, used: r.used, allowance: r.allowance };
    } catch (e) {
      // Failed sends return the allowance.
      await admin.from("social_posts").update({ status: "failed", error: (e as Error).message.slice(0, 300) }).eq("id", r.id!);
      throw e;
    }
  });

export const cancelStudioSocialPost = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema.extend({ postId: z.string().uuid() }))
  .handler(async ({ data }) => {
    const { admin } = await access(data);
    const p = await admin.from("social_posts").select("*").eq("id", data.postId).eq("workspace_id", data.workspaceId).single();
    if (!p.data || !["scheduled", "reserved"].includes(p.data.status)) throw new Error("This post can't be cancelled.");
    if (new Date(p.data.scheduled_at) <= new Date()) throw new Error("This post has already gone out.");
    if (p.data.bundle_post_id) await bundle(`/post/${p.data.bundle_post_id}`, { method: "DELETE" });
    await admin.from("social_posts").update({ status: "canceled", updated_at: new Date().toISOString() }).eq("id", data.postId);
    return { ok: true };
  });

export const startSocialAddonCheckout = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema)
  .handler(async ({ data }) => {
    const { role, user, admin } = await access(data);
    if (role !== "owner" && role !== "admin") throw new Error("Only a workspace owner or admin can add this.");
    if (!stripeSecretKey()) throw new Error("Payments aren't connected.");
    const sub = await admin.from("workspace_subscriptions").select("stripe_customer_id").eq("workspace_id", data.workspaceId).maybeSingle();
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(stripeSecretKey()!);
    const origin = process.env.PUBLIC_SITE_URL || getRequestUrl().origin;
    const meta = { purchase_kind: "social_publishing", workspace_id: data.workspaceId };
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      ...(sub.data?.stripe_customer_id ? { customer: sub.data.stripe_customer_id } : { customer_email: user.email }),
      client_reference_id: data.workspaceId,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "usd", unit_amount: SOCIAL_ADDON_PRICE_USD * 100, recurring: { interval: "month" },
          product_data: { name: "Palmer House Studio · Social Publishing", description: `${SOCIAL_ADDON_POSTS} Instagram/Facebook posts per month.` },
        },
      }],
      metadata: meta,
      subscription_data: { metadata: meta },
      success_url: `${origin}/studio/settings?social=added`,
      cancel_url: `${origin}/studio/settings?social=canceled`,
    });
    if (!session.url) throw new Error("Stripe did not return a checkout link.");
    return { url: session.url };
  });
