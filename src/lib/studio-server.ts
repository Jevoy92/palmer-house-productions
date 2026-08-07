import { createServerFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";
import { z } from "zod";
import {
  createUserScopedSupabase,
  SUPABASE_PUBLISHABLE_KEY,
  SUPABASE_URL,
} from "./supabase/client";
import {
  AssistantRequestSchema,
  AssistantResponseSchema,
  CampaignBriefSchema,
  CampaignOutputSchema,
  ContentSourceAnalysisRequestSchema,
  ContentSourceAnalysisSchema,
  ContentDirectionRequestSchema,
  ContentDirectionsSchema,
  studioPlanPrices,
} from "./studio-model";
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
      | "platform_post"
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
  output.platformPosts.forEach((item, index) =>
    rows.push({
      kind: "platform_post",
      title: item.title,
      content: item.body,
      metadata: item as Json,
      sort_order: 70 + index,
    }),
  );
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
    const { parseStructured } = await import("./ai.server");
      const response = await parseStructured(
      CampaignOutputSchema,
      "palmer_house_campaign",
      [
        "You are the Palmer House Campaign Architect building one campaign for one specific business. Everything you write must be usable by that business tomorrow with the people, tools, and location they already have.",
        "Ground every line in the supplied category, services, and customers. Use the vocabulary of that trade or field. If a sentence could be pasted onto a different company without changing a word, rewrite it.",
        "Write with calm confidence and concrete language. No hype, no filler, no marketing abstractions like 'leverage', 'authority positioning', or 'value proposition'. Never restate the brief back to the reader.",
        "Never invent proof, results, statistics, awards, or testimonials. If proof was not supplied, build around what can be filmed truthfully.",
        "The anchor must be a complete word-for-word script someone can read on camera, not an outline. Break it into 3-8 filmable scenes; every scene needs a beat, a visible action or framing direction, the exact spoken words, concise on-screen text, and achievable b-roll from this business's real work.",
        "The production plan must be genuinely filmable by the person or team described, using ordinary gear.",
        "Use the Four Pals as an internal lane system: spotlight for trust and authority, reel for short-form attention, evergreen for durable education, system for internal clarity.",
        "For platformPosts, write genuinely platform-native work for YouTube, Instagram, TikTok, LinkedIn, Facebook, and Threads — not one caption copied six ways. Each post needs its own hook written in that platform's rhythm. Use native interaction patterns only when they support the stated goal. Include at least one poll and one carousel or document.",
        "Required counts, follow them exactly: 8 to 12 platformPosts covering all six platforms; 3 to 5 shorts; 3 to 5 captions; 3 to 6 faq entries; 5 to 8 carousel slides; 3 to 5 messagePillars; 2 to 6 channelPlan entries; 4 to 8 anchor scenes; 4 to 10 production shots; 3 to 8 production b-roll items; 4 to 10 checklist items; 2 to 6 delivery notes; 1 to 4 wardrobe notes; 4 to 10 schedule entries.",
        "Return only the requested structured result.",
      ].join(" "),
      `Business: ${data.brand.businessName}\nCategory / industry: ${data.brand.industry || "Not supplied"}\nWhat they do: ${data.brand.description || "Not supplied"}\nWhat they sell: ${data.brand.offers.join(" | ") || "Not supplied"}\nWho they serve: ${data.brand.primaryAudience || data.audience}\nCreator type: ${data.brand.creatorType}\nPrimary goal: ${data.brand.primaryGoal}\nActive platforms: ${data.brand.platforms.join(" | ") || "Not supplied"}\nVoice: ${data.brand.voice.join(", ")}\nVerified proof only: ${data.brand.proof.join(" | ") || "None supplied — do not invent any"}\nPreferred CTAs: ${data.brand.callsToAction.join(" | ")}\nAvoid: ${data.brand.avoidLanguage.join(" | ")}\n\nCampaign goal: ${data.goal}\nTopic and chosen direction: ${data.topic}\nOffer or next step: ${data.offer}\nAudience for this campaign: ${data.audience}\nAnchor format: ${data.anchorFormat}\nPlanning depth: ${data.depth}`,

    );
      const output = CampaignOutputSchema.parse(response);

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

export const generateContentDirections = createServerFn({ method: "POST" })
  .validator(ContentDirectionRequestSchema)
  .handler(async ({ data }) => {
    await authorizedClient(data.accessToken, data.workspaceId);
    const { parseStructured } = await import("./ai.server");
    const response = await parseStructured(
      ContentDirectionsSchema,
      "palmer_house_directions",
      [
        "You are a Palmer House strategist writing for one specific business. Return exactly three materially different content directions for the supplied idea.",
        "Ground every direction in this business: use its category, its actual services, its real customers, and the words a customer in that category would use. Never write advice that could be pasted onto any other company.",
        "Each direction must map to one Palmer House lane: spotlight for proof/trust, reel for attention/momentum, evergreen for durable education, system for repeatability/internal clarity. Use three different lanes when the idea allows.",
        "title: 4-8 words, plain English, names the actual piece of content. No jargon, no colons stacked with buzzwords.",
        "angle: 2-3 short sentences, maximum 45 words total. Say what gets filmed or shown, and what the viewer decides afterward. Write it as prose. Never use labels like 'Business problem:' or 'Audience decision:'. Never restate the brief back to the user.",
        "whyItWorks: one sentence, maximum 25 words, naming the specific objection or hesitation this removes for this business's customers.",
        "Be concrete: name the job, the season, the location type, the product, or the customer situation. Do not invent proof, statistics, testimonials, or results that were not supplied.",
      ].join(" "),
      `Business: ${data.brand.businessName}\nCategory / industry: ${data.brand.industry || "Not supplied"}\nWhat they do: ${data.brand.description || "Not supplied"}\nWhat they sell: ${data.brand.offers.join(" | ") || "Not supplied"}\nWho they serve: ${data.brand.primaryAudience || data.audience}\nCreator type: ${data.brand.creatorType}\nPrimary goal: ${data.brand.primaryGoal}\nActive platforms: ${data.brand.platforms.join(" | ") || "Not supplied"}\nVoice: ${data.brand.voice.join(", ")}\nVerified proof only: ${data.brand.proof.join(" | ") || "None supplied — do not invent any"}\nPreferred CTAs: ${data.brand.callsToAction.join(" | ")}\nAvoid: ${data.brand.avoidLanguage.join(" | ")}\n\nCampaign goal: ${data.goal}\nAudience for this campaign: ${data.audience}\nIdea in the owner's words: ${data.idea}`,

    );
    return { ok: true as const, ...ContentDirectionsSchema.parse(response) };
  });

export const askStudioPal = createServerFn({ method: "POST" })
  .validator(AssistantRequestSchema)
  .handler(async ({ data }) => {
    const { client } = await authorizedClient(data.accessToken, data.workspaceId);
    const [brandResult, campaignsResult, calendarResult, settingsResult] = await Promise.all([
      client.from("brand_profiles").select("*").eq("workspace_id", data.workspaceId).single(),
      client
        .from("campaigns")
        .select("title, goal, topic, primary_lane, status, updated_at")
        .eq("workspace_id", data.workspaceId)
        .order("updated_at", { ascending: false })
        .limit(8),
      client
        .from("calendar_items")
        .select("title, channel, publish_at, status")
        .eq("workspace_id", data.workspaceId)
        .order("publish_at")
        .limit(12),
      client
        .from("workspace_settings")
        .select("ai_memory")
        .eq("workspace_id", data.workspaceId)
        .single(),
    ]);
    if (brandResult.error || !brandResult.data)
      throw new Error("Finish Brand DNA before asking for personalized guidance.");
    const { parseStructured } = await import("./ai.server");
    const brand = brandResult.data;
    const response = await parseStructured(
      AssistantResponseSchema,
      "palmer_house_assistant",
      "You are a Palmer House strategic guide inside a private creative workspace for someone who uses video as leverage. Treat Brand DNA as the source of truth. Adapt recommendations to the person's creator type, audience, and primary goal. Use recent campaigns, calendar work, approved proof, and conversation context to give a dynamic next-best recommendation. Lead with the real problem or opportunity, not a video format. Never invent proof. Ask for clarification only when it prevents a materially wrong recommendation. Map the response to one Palmer House lane: Spotlight for proof and trust, Reel for visibility and momentum, Evergreen for durable education, System for repeatability and internal clarity. The selected Pal changes tone and lens, not the facts. Recommend at most three concrete next steps. Only propose a Brand DNA memory update when the user clearly supplied durable information; the user must approve it before saving.",
      `Selected Pal: ${data.pal}\n\nBrand DNA:\nBrand / project: ${brand.business_name}\nCreator type: ${brand.creator_type}\nPrimary goal: ${brand.primary_goal}\nDescription: ${brand.description}\nCategory / genre: ${brand.industry}\nAudience: ${brand.primary_audience}\nOffers: ${JSON.stringify(brand.offers)}\nVoice: ${brand.voice_traits.join(", ")}\nPreferred language: ${brand.preferred_language}\nAvoid: ${brand.avoid_language.join(" | ")}\nVerified proof only: ${brand.proof_points.join(" | ") || "None supplied"}\nPreferred CTAs: ${brand.calls_to_action.join(" | ")}\nPlatforms: ${brand.platforms.join(" | ")}\nBrand Guide details: ${JSON.stringify(brand.brand_details || {})}\n\nApproved AI memory: ${JSON.stringify(settingsResult.data?.ai_memory || {})}\nRecent campaigns: ${JSON.stringify(campaignsResult.data || [])}\nUpcoming work: ${JSON.stringify(calendarResult.data || [])}\nRecent conversation: ${JSON.stringify(data.recentMessages)}\n\nUser: ${data.question}`,
    );
    return { ok: true as const, response: AssistantResponseSchema.parse(response) };
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

async function fetchPublicPage(initialUrl: URL) {
  let currentUrl = initialUrl;
  for (let redirectCount = 0; redirectCount <= 4; redirectCount += 1) {
    if (
      !/^https?:$/.test(currentUrl.protocol) ||
      currentUrl.username ||
      currentUrl.password ||
      isUnsafeHost(currentUrl.hostname)
    ) {
      throw new Error("Use a public http or https link.");
    }
    const response = await fetch(currentUrl, {
      signal: AbortSignal.timeout(8_000),
      redirect: "manual",
      headers: { "User-Agent": "PalmerHouseStudio/1.0" },
    });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      if (!location) throw new Error("That link redirected without a usable destination.");
      currentUrl = new URL(location, currentUrl);
      continue;
    }
    return response;
  }
  throw new Error("That link redirected too many times.");
}

const WebsiteProfileSchema = z.object({
  businessName: z.string(),
  industry: z.string(),
  description: z.string(),
  primaryAudience: z.string(),
  customers: z.string(),
  competitors: z.string(),
  mission: z.string(),
  values: z.string(),
  taglines: z.string(),
  offers: z.array(z.string()).max(8),
  voiceTraits: z.array(z.string()).max(6),
  avoidLanguage: z.array(z.string()).max(6),
  proofPoints: z.array(z.string()).max(8),
  callsToAction: z.array(z.string()).max(6),
  platforms: z.array(z.string()).max(8),
  socialLinks: z.array(z.string()).max(10),
  visual: z.object({
    primaryColor: z.string(),
    secondaryColor: z.string(),
    accentColor: z.string(),
    primaryFont: z.string(),
    typography: z.string(),
    photography: z.string(),
    imageStyle: z.string(),
    visualStyle: z.string(),
  }),
});

export type WebsiteBrandProfile = z.infer<typeof WebsiteProfileSchema>;

/** Cheap structural signals so the model grounds the visual system in real markup. */
function visualSignals(html: string) {
  const colors = new Map<string, number>();
  for (const match of html.matchAll(/#([0-9a-fA-F]{6})\b/g)) {
    const value = `#${match[1].toLowerCase()}`;
    if (["#ffffff", "#000000"].includes(value)) continue;
    colors.set(value, (colors.get(value) || 0) + 1);
  }
  const fonts = new Set<string>();
  for (const match of html.matchAll(/font-family\s*:\s*([^;"'}]+)/gi)) {
    match[1]
      .split(",")
      .map((item) => item.trim().replace(/["']/g, ""))
      .filter((item) => item && !/^(inherit|initial|sans-serif|serif|monospace|system-ui)$/i.test(item))
      .slice(0, 2)
      .forEach((item) => fonts.add(item));
  }
  for (const match of html.matchAll(/fonts\.googleapis\.com\/css2?\?family=([^&"'\s]+)/gi)) {
    fonts.add(decodeURIComponent(match[1].split(":")[0]).replace(/\+/g, " "));
  }
  const socials = new Set<string>();
  for (const match of html.matchAll(
    /https?:\/\/(?:www\.)?(youtube\.com|instagram\.com|tiktok\.com|linkedin\.com|facebook\.com|threads\.net|x\.com|twitter\.com)\/[^\s"'<>)]+/gi,
  )) {
    socials.add(match[0].replace(/[),.]+$/, ""));
  }
  const ranked = [...colors.entries()].sort((a, b) => b[1] - a[1]).map(([value]) => value);
  return {
    colors: ranked.slice(0, 6),
    fonts: [...fonts].slice(0, 6),
    socials: [...socials].slice(0, 10),
  };
}

export const analyzeStudioWebsite = createServerFn({ method: "POST" })
  .validator(AnalyzeWebsiteSchema)
  .handler(async ({ data }) => {
    await authorizedClient(data.accessToken, data.workspaceId);
    const url = new URL(data.website);
    const response = await fetchPublicPage(url);
    if (!response.ok) throw new Error("That website could not be read.");
    const length = Number(response.headers.get("content-length") || "0");
    if (length > 1_500_000) throw new Error("That page is too large to analyze.");
    const html = (await response.text()).slice(0, 1_500_000);
    const signals = visualSignals(html);
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .slice(0, 45_000);
    const { parseStructured } = await import("./ai.server");
    const analyzed = await parseStructured(
      WebsiteProfileSchema,
      "website_brand_profile",
      "You are reading one company website to fill in a brand guide. Extract only what the page clearly supports. Never invent proof, statistics, customers, awards, or offers — return an empty string or empty array when the page does not say. For the visual system, use the supplied color and font signals from the markup: pick the most brand-like hex colors (skip pure greys and near-white/near-black chrome) and the real typeface names. Describe typography, photography, and image style in one short practical sentence each, based on what the page actually looks like and says. visualStyle must be one of: Palmer Clay 3D, Premium Editorial, Minimal Swiss, Bold Type, Soft Illustration — choose the closest fit. Voice traits and avoid-language should be single words or short phrases.",
      `Site URL: ${url.origin}\nColor signals (most frequent first): ${signals.colors.join(", ") || "none found"}\nFont signals: ${signals.fonts.join(", ") || "none found"}\nSocial links found: ${signals.socials.join(", ") || "none found"}\n\nPage text:\n${text}`,
    );
    const profile = WebsiteProfileSchema.parse(analyzed);
    return {
      ok: true as const,
      profile: {
        ...profile,
        socialLinks: profile.socialLinks.length ? profile.socialLinks : signals.socials,
      },
    };
  });

export const analyzeStudioContentSource = createServerFn({ method: "POST" })
  .validator(ContentSourceAnalysisRequestSchema)
  .handler(async ({ data }) => {
    await authorizedClient(data.accessToken, data.workspaceId);

    const brandContext = `Business: ${data.brand.businessName}\nDescription: ${data.brand.description}\nAudience: ${data.brand.audience}\nOffers: ${data.brand.offers.join(" | ")}\nVerified proof only: ${data.brand.proof.join(" | ") || "None supplied"}\nUser context: ${data.context || "None supplied"}`;
    let sourceText = "";
    if (data.sourceType === "link") {
      const url = new URL(data.sourceUrl!);
      const response = await fetchPublicPage(url);
      if (!response.ok) throw new Error("That link could not be read.");
      const length = Number(response.headers.get("content-length") || "0");
      if (length > 1_500_000) throw new Error("That page is too large to analyze.");
      sourceText = (await response.text())
        .slice(0, 1_500_000)
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .slice(0, 45_000);
    }

    const { parseStructured } = await import("./ai.server");
    const instructions =
      "You are Palmer House Productions' content intake strategist. Turn supplied source material into one useful, campaign-ready idea for someone who uses video as leverage. Lead with the real problem or opportunity and the audience decision that needs to change. Map it to exactly one Palmer House lane: Spotlight for trust/proof, Reel for attention/momentum, Evergreen for durable education, or System for repeatability/internal clarity. For images, describe only visible evidence and clearly separate user-supplied context. Never infer identities, results, audience response, before/after improvement, or claims that are not visibly supported. For links, use only the supplied page text. Return concise, concrete language a creator or team can understand.";
    const input =
      data.sourceType === "image"
        ? [
            {
              role: "user" as const,
              content: [
                {
                  type: "input_text" as const,
                  text: `${brandContext}\n\nRead this image as possible campaign evidence. Identify what is visibly useful, what business problem it could help explain, and the safest campaign angle.`,
                },
                {
                  type: "input_image" as const,
                  image_url: data.sourceDataUrl!,
                  detail: "low" as const,
                },
              ],
            },
          ]
        : `${brandContext}\n\nSource URL: ${data.sourceUrl}\nSource page text:\n${sourceText}`;
    const analyzed = await parseStructured(
      ContentSourceAnalysisSchema,
      "content_source_analysis",
      instructions,
      input,
    );
    return {
      ok: true as const,
      analysis: ContentSourceAnalysisSchema.parse(analyzed),
    };
  });

const SubscriptionSchema = AuthorizedSchema.extend({
  plan: z.enum(["creator", "business", "partner"]),
  interval: z.enum(["month", "year"]),
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
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: user.email,
      client_reference_id: data.workspaceId,
      line_items: [{ quantity: 1, price: studioPlanPrices[data.plan][data.interval] }],
      allow_promotion_codes: true,
      success_url: `${siteOrigin}/studio/billing?checkout=success`,
      cancel_url: `${siteOrigin}/studio/billing?checkout=canceled`,
      subscription_data: {
        metadata: { workspace_id: data.workspaceId, plan: data.plan, interval: data.interval },
      },
      metadata: {
        workspace_id: data.workspaceId,
        plan: data.plan,
        interval: data.interval,
      },
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
