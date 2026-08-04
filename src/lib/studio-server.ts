import { createServerFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import {
  createUserScopedSupabase,
  SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_URL,
} from "./supabase/client";
import { CampaignBriefSchema, CampaignOutputSchema, studioPlans } from "./studio-model";
import type { Json } from "./supabase/database.types";

const AuthorizedSchema = z.object({
  accessToken: z.string().min(20),
  workspaceId: z.string().uuid(),
});

async function authorizedClient(accessToken: string, workspaceId: string) {
  const client = createUserScopedSupabase(accessToken);
  const { data, error } = await client.auth.getUser(accessToken);
  if (error || !data.user) throw new Error("Your session has expired. Please sign in again.");
  const membership = await client
    .from("workspace_members")
    .select("role")
    .eq("workspace_id", workspaceId)
    .eq("user_id", data.user.id)
    .maybeSingle();
  if (membership.error || !membership.data)
    throw new Error("You do not have access to this workspace.");
  return { client, user: data.user, role: membership.data.role };
}

function assetsFromOutput(output: z.infer<typeof CampaignOutputSchema>) {
  const rows: Array<{
    kind:
      | "anchor_script"
      | "short_script"
      | "caption"
      | "newsletter"
      | "faq"
      | "carousel"
      | "production_note";
    title: string;
    content: string;
    metadata?: Json;
    sort_order: number;
  }> = [];
  rows.push({
    kind: "anchor_script",
    title: output.anchor.title,
    content: `${output.anchor.hook}\n\n${output.anchor.script}\n\nCTA: ${output.anchor.callToAction}`,
    sort_order: 0,
  });
  output.shorts.forEach((item, index) =>
    rows.push({
      kind: "short_script",
      title: item.title,
      content: `${item.hook}\n\n${item.script}\n\nCTA: ${item.callToAction}`,
      sort_order: 10 + index,
    }),
  );
  output.captions.forEach((item, index) =>
    rows.push({
      kind: "caption",
      title: `${item.platform} caption`,
      content: item.copy,
      metadata: { platform: item.platform },
      sort_order: 20 + index,
    }),
  );
  output.faq.forEach((item, index) =>
    rows.push({ kind: "faq", title: item.question, content: item.answer, sort_order: 30 + index }),
  );
  rows.push({
    kind: "newsletter",
    title: output.newsletter.subject,
    content: output.newsletter.body,
    sort_order: 40,
  });
  rows.push({
    kind: "carousel",
    title: output.carousel.title,
    content: output.carousel.slides.join("\n\n"),
    metadata: { slides: output.carousel.slides },
    sort_order: 50,
  });
  rows.push({
    kind: "production_note",
    title: "Production plan",
    content: JSON.stringify(output.productionPlan),
    metadata: output.productionPlan as Json,
    sort_order: 60,
  });
  return rows;
}

export const generateStudioCampaign = createServerFn({ method: "POST" })
  .validator(CampaignBriefSchema)
  .handler(async ({ data }) => {
    const { client } = await authorizedClient(data.accessToken, data.workspaceId);
    const requestKey = `campaign:${data.campaignId}:${crypto.randomUUID()}`;
    const reservation = await client.rpc("reserve_campaign_usage", {
      target_workspace_id: data.workspaceId,
      target_campaign_id: data.campaignId,
      request_key: requestKey,
    });
    if (reservation.error || !reservation.data)
      throw new Error(reservation.error?.message || "Campaign allowance reached.");

    try {
      const key = process.env.OPENAI_API_KEY;
      if (!key) throw new Error("OPENAI_API_KEY is not configured.");
      const { default: OpenAI } = await import("openai");
      const openai = new OpenAI({ apiKey: key });
      const response = await openai.responses.parse({
        model: process.env.OPENAI_STUDIO_MODEL || "gpt-5-mini",
        instructions:
          "You are the Palmer House Campaign Architect. Build useful, specific campaigns from one business idea. Write with calm confidence, concrete language, and no hype. The production plan must be genuinely filmable by a small business team. Never invent proof or results. Use the Four Pals as an internal lane system: spotlight for trust and authority, reel for short-form attention, evergreen for durable education, system for internal clarity. Return only the requested structured result.",
        input: `Business: ${data.brand.businessName}\nDescription: ${data.brand.description}\nVoice: ${data.brand.voice.join(", ")}\nVerified proof only: ${data.brand.proof.join(" | ") || "None supplied—do not invent any"}\nPreferred CTAs: ${data.brand.callsToAction.join(" | ")}\nAvoid: ${data.brand.avoidLanguage.join(" | ")}\n\nGoal: ${data.goal}\nTopic: ${data.topic}\nOffer: ${data.offer}\nAudience: ${data.audience}\nAnchor format: ${data.anchorFormat}\nPlanning depth: ${data.depth}`,
        text: { format: zodTextFormat(CampaignOutputSchema, "palmer_house_campaign") },
      });
      const output = CampaignOutputSchema.parse(response.output_parsed);

      const campaignUpdate = await client
        .from("campaigns")
        .update({
          title: output.title,
          status: "ready",
          primary_lane: output.primaryLane,
          strategy: output.strategy,
          production_plan: output.productionPlan,
        })
        .eq("id", data.campaignId)
        .eq("workspace_id", data.workspaceId);
      if (campaignUpdate.error) throw campaignUpdate.error;

      await client.from("campaign_assets").delete().eq("campaign_id", data.campaignId);
      const assetInsert = await client.from("campaign_assets").insert(
        assetsFromOutput(output).map((row) => ({
          ...row,
          campaign_id: data.campaignId,
          workspace_id: data.workspaceId,
        })),
      );
      if (assetInsert.error) throw assetInsert.error;

      await client.from("calendar_items").delete().eq("campaign_id", data.campaignId);
      const now = new Date();
      const calendarInsert = await client.from("calendar_items").insert(
        output.schedule.map((item) => ({
          workspace_id: data.workspaceId,
          campaign_id: data.campaignId,
          title: item.title,
          channel: item.channel,
          publish_at: new Date(now.getTime() + item.dayOffset * 86_400_000).toISOString(),
        })),
      );
      if (calendarInsert.error) throw calendarInsert.error;
      await client.rpc("finish_campaign_usage", {
        target_event_id: reservation.data,
        outcome: "completed",
      });
      return { ok: true as const, output };
    } catch (error) {
      await client.rpc("finish_campaign_usage", {
        target_event_id: reservation.data,
        outcome: "failed",
      });
      await client.from("campaigns").update({ status: "draft" }).eq("id", data.campaignId);
      throw error;
    }
  });

const AnalyzeWebsiteSchema = AuthorizedSchema.extend({ website: z.string().url().max(500) });
function isUnsafeHost(hostname: string) {
  const host = hostname.toLowerCase();
  return (
    host === "localhost" ||
    host.endsWith(".local") ||
    host === "0.0.0.0" ||
    host === "::1" ||
    /^127\./.test(host) ||
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^169\.254\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host)
  );
}

const WebsiteProfileSchema = z.object({
  description: z.string(),
  primaryAudience: z.string(),
  offers: z.array(z.string()).max(8),
  voiceTraits: z.array(z.string()).max(6),
  proofPoints: z.array(z.string()).max(8),
  callsToAction: z.array(z.string()).max(6),
});

export const analyzeStudioWebsite = createServerFn({ method: "POST" })
  .validator(AnalyzeWebsiteSchema)
  .handler(async ({ data }) => {
    await authorizedClient(data.accessToken, data.workspaceId);
    const url = new URL(data.website);
    if (!/^https?:$/.test(url.protocol) || isUnsafeHost(url.hostname))
      throw new Error("Use a public http or https website.");
    const response = await fetch(url, {
      signal: AbortSignal.timeout(8_000),
      redirect: "follow",
      headers: { "User-Agent": "PalmerHouseStudio/1.0" },
    });
    if (!response.ok) throw new Error("That website could not be read.");
    const length = Number(response.headers.get("content-length") || "0");
    if (length > 1_500_000) throw new Error("That page is too large to analyze.");
    const html = (await response.text()).slice(0, 1_500_000);
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .slice(0, 45_000);
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error("OPENAI_API_KEY is not configured.");
    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: key });
    const analyzed = await openai.responses.parse({
      model: process.env.OPENAI_STUDIO_MODEL || "gpt-5-mini",
      instructions:
        "Extract only what the supplied website clearly supports. Never invent proof, claims, customers, or offers. Write concise proposed brand-profile fields.",
      input: text,
      text: { format: zodTextFormat(WebsiteProfileSchema, "website_brand_profile") },
    });
    return { ok: true as const, profile: WebsiteProfileSchema.parse(analyzed.output_parsed) };
  });

const SubscriptionSchema = AuthorizedSchema.extend({
  plan: z.enum(["creator", "business", "partner"]),
});
export const createStudioSubscriptionCheckout = createServerFn({ method: "POST" })
  .validator(SubscriptionSchema)
  .handler(async ({ data }) => {
    const { user, role } = await authorizedClient(data.accessToken, data.workspaceId);
    if (role !== "owner" && role !== "admin")
      throw new Error("Only a workspace admin can change billing.");
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return { ok: false as const, code: "STRIPE_NOT_CONFIGURED" as const };
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(secret);
    const requestOrigin = getRequestUrl().origin;
    const siteOrigin = process.env.PUBLIC_SITE_URL || requestOrigin;
    const plan = studioPlans[data.plan];
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: user.email,
      client_reference_id: data.workspaceId,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            recurring: { interval: "month" },
            unit_amount: plan.price * 100,
            product_data: {
              name: `Palmer House Studio — ${plan.name}`,
              description: `${plan.campaigns} complete campaign systems each month.`,
            },
          },
        },
      ],
      allow_promotion_codes: true,
      success_url: `${siteOrigin}/studio/billing?checkout=success`,
      cancel_url: `${siteOrigin}/studio/billing?checkout=canceled`,
      subscription_data: { metadata: { workspace_id: data.workspaceId, plan: data.plan } },
      metadata: { workspace_id: data.workspaceId, plan: data.plan },
    });
    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    return { ok: true as const, url: session.url };
  });

export const createStudioBillingPortal = createServerFn({ method: "POST" })
  .validator(AuthorizedSchema)
  .handler(async ({ data }) => {
    const { role } = await authorizedClient(data.accessToken, data.workspaceId);
    if (role !== "owner" && role !== "admin")
      throw new Error("Only a workspace admin can manage billing.");
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return { ok: false as const, code: "STRIPE_NOT_CONFIGURED" as const };
    const { client } = await authorizedClient(data.accessToken, data.workspaceId);
    const subscription = await client
      .from("workspace_subscriptions")
      .select("stripe_customer_id")
      .eq("workspace_id", data.workspaceId)
      .single();
    if (!subscription.data?.stripe_customer_id)
      return { ok: false as const, code: "NO_STRIPE_CUSTOMER" as const };
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(secret);
    const portal = await stripe.billingPortal.sessions.create({
      customer: subscription.data.stripe_customer_id,
      return_url: `${process.env.PUBLIC_SITE_URL || getRequestUrl().origin}/studio/billing`,
    });
    return { ok: true as const, url: portal.url };
  });

export { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY };
