import { z } from "zod";

export const studioGoals = [
  "Create consistent social content",
  "Build authority with long-form content",
  "Promote an offer",
  "Create website videos",
  "Document FAQs",
  "Plan a launch",
  "Organize an internal content team",
] as const;

export const anchorFormats = [
  { value: "authority_video", label: "Authority video", detail: "Teach one useful idea clearly." },
  {
    value: "service_explainer",
    label: "Service explainer",
    detail: "Make the value easy to understand.",
  },
  { value: "faq_series", label: "FAQ series", detail: "Answer objections before the call." },
  {
    value: "campaign_story",
    label: "Campaign story",
    detail: "Give the launch a memorable spine.",
  },
  {
    value: "internal_training",
    label: "Internal training",
    detail: "Document it once. Reuse it forever.",
  },
] as const;

export const studioPlans = {
  creator: {
    name: "Studio",
    price: 99,
    annualPrice: 990,
    campaigns: 2,
    strategySessions: 0,
    strategyMinutes: 0,
    audience: "Build a clear, repeatable content system with the full toolkit.",
    features: [
      "2 complete campaigns",
      "Brand DNA + Pal guidance",
      "Personalized video roadmap",
      "Content calendar",
      "Member help desk",
    ],
  },
  business: {
    name: "Guided",
    price: 499,
    annualPrice: 4990,
    campaigns: 5,
    strategySessions: 1,
    strategyMinutes: 60,
    audience: "Get the tools plus a monthly hour with Palmer House to find the next clear move.",
    features: [
      "5 complete campaigns",
      "Everything in Studio",
      "1 private strategy hour / month",
      "Project and campaign review queue",
      "Preferred production pricing",
    ],
  },
  partner: {
    name: "Partner",
    price: 999,
    annualPrice: 9990,
    campaigns: 12,
    strategySessions: 4,
    strategyMinutes: 240,
    audience: "Work through campaigns, bigger decisions, and production questions every week.",
    features: [
      "12 complete campaigns",
      "Everything in Guided",
      "4 private strategy hours / month",
      "Priority project feedback",
      "Preferred production pricing",
    ],
  },
} as const;

export const studioConsultingOffer = {
  name: "Clarity Intensive",
  price: 450,
  duration: 75,
  includedPlan: "Studio",
  includedDays: 30,
  description:
    "A focused working session for a campaign, filming space, offer, or content system—with 30 days of Studio access included.",
} as const;

export type StudioPlanKey = keyof typeof studioPlans;
export type StudioView =
  | "engine"
  | "home"
  | "assistant"
  | "roadmap"
  | "success"
  | "onboarding"
  | "brand"
  | "ideas"
  | "approvals"
  | "campaigns"
  | "campaign"
  | "library"
  | "calendar"
  | "settings"
  | "billing";

export const palNames = [
  "kareem",
  "kiana",
  "ryder",
  "raquel",
  "cyrus",
  "clara",
  "silas",
  "samira",
] as const;

export type PalName = (typeof palNames)[number];
export type StudioLane = "spotlight" | "reel" | "evergreen" | "system";

export const AssistantRequestSchema = z.object({
  workspaceId: z.string().uuid(),
  accessToken: z.string().min(20),
  question: z.string().min(3).max(3000),
  pal: z.enum(palNames),
  recentMessages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), body: z.string().max(6000) }))
    .max(12),
});

export const AssistantResponseSchema = z.object({
  reply: z.string(),
  lane: z.enum(["spotlight", "reel", "evergreen", "system"]),
  problem: z.string(),
  recommendations: z
    .array(
      z.object({
        title: z.string(),
        reason: z.string(),
        nextStep: z.string(),
        videoKey: z.string().optional(),
      }),
    )
    .min(1)
    .max(3),
  memorySuggestions: z
    .array(
      z.object({
        field: z.enum([
          "description",
          "primary_audience",
          "preferred_language",
          "offers",
          "proof_points",
          "calls_to_action",
        ]),
        value: z.string(),
        reason: z.string(),
      }),
    )
    .max(3),
});

export type AssistantResponse = z.infer<typeof AssistantResponseSchema>;

export const contentPlatforms = [
  "youtube",
  "instagram",
  "tiktok",
  "linkedin",
  "facebook",
  "threads",
] as const;

export const contentFormats = [
  "video",
  "short",
  "reel",
  "story",
  "carousel",
  "image",
  "document",
  "poll",
  "quiz",
  "thread",
] as const;

export const ContentDirectionRequestSchema = z.object({
  workspaceId: z.string().uuid(),
  accessToken: z.string().min(20),
  idea: z.string().min(8).max(1200),
  goal: z.string().min(3).max(180),
  audience: z.string().min(3).max(800),
  brand: z.object({
    businessName: z.string().max(180),
    description: z.string().max(1600),
    voice: z.array(z.string()).max(12),
    proof: z.array(z.string()).max(20),
    callsToAction: z.array(z.string()).max(20),
    avoidLanguage: z.array(z.string()).max(20),
  }),
});

export const ContentDirectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  angle: z.string(),
  whyItWorks: z.string(),
  lane: z.enum(["spotlight", "reel", "evergreen", "system"]),
});

export const ContentDirectionsSchema = z.object({
  directions: z.array(ContentDirectionSchema).length(3),
});

export const PlatformPostSchema = z.object({
  id: z.string(),
  platform: z.enum(contentPlatforms),
  format: z.enum(contentFormats),
  title: z.string(),
  hook: z.string(),
  body: z.string(),
  callToAction: z.string(),
  hashtags: z.array(z.string()).max(12),
  nativeFeature: z.string(),
  publishNotes: z.string(),
  slides: z.array(z.string()).max(10).default([]),
  poll: z
    .object({ question: z.string(), options: z.array(z.string()).min(2).max(4) })
    .nullable()
    .default(null),
  quiz: z
    .object({
      question: z.string(),
      options: z.array(z.string()).min(2).max(4),
      correctIndex: z.number().int().min(0).max(3),
    })
    .nullable()
    .default(null),
});

export const CampaignBriefSchema = z.object({
  workspaceId: z.string().uuid(),
  campaignId: z.string().uuid(),
  accessToken: z.string().min(20),
  goal: z.string().min(3).max(180),
  topic: z.string().min(8).max(1200),
  offer: z.string().max(500).default(""),
  audience: z.string().min(3).max(800),
  anchorFormat: z.string().min(2).max(80),
  depth: z.enum(["quick", "strategic", "deep"]),
  brand: z.object({
    businessName: z.string().max(180),
    description: z.string().max(1600),
    voice: z.array(z.string()).max(12),
    proof: z.array(z.string()).max(20),
    callsToAction: z.array(z.string()).max(20),
    avoidLanguage: z.array(z.string()).max(20),
  }),
});

export const CampaignOutputSchema = z.object({
  title: z.string(),
  primaryLane: z.enum(["spotlight", "reel", "evergreen", "system"]),
  strategy: z.object({
    bigIdea: z.string(),
    audienceInsight: z.string(),
    promise: z.string(),
    messagePillars: z.array(z.string()).min(3).max(5),
    channelPlan: z
      .array(z.object({ channel: z.string(), role: z.string() }))
      .min(2)
      .max(6),
  }),
  anchor: z.object({
    title: z.string(),
    hook: z.string(),
    script: z.string(),
    callToAction: z.string(),
  }),
  shorts: z
    .array(
      z.object({
        title: z.string(),
        hook: z.string(),
        script: z.string(),
        callToAction: z.string(),
      }),
    )
    .min(3)
    .max(5),
  captions: z
    .array(z.object({ platform: z.string(), copy: z.string() }))
    .min(2)
    .max(5),
  faq: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .min(3)
    .max(6),
  newsletter: z.object({ subject: z.string(), body: z.string() }),
  carousel: z.object({ title: z.string(), slides: z.array(z.string()).min(5).max(9) }),
  platformPosts: z.array(PlatformPostSchema).min(8).max(14),
  productionPlan: z.object({
    objective: z.string(),
    estimatedMinutes: z.number().int().min(15).max(480),
    location: z.string(),
    wardrobe: z.array(z.string()).min(1).max(6),
    props: z.array(z.string()).max(8),
    deliveryNotes: z.array(z.string()).min(2).max(8),
    shots: z
      .array(z.object({ shot: z.string(), framing: z.string(), purpose: z.string() }))
      .min(4)
      .max(12),
    broll: z.array(z.string()).min(3).max(12),
    checklist: z.array(z.string()).min(4).max(14),
  }),
  schedule: z
    .array(
      z.object({
        title: z.string(),
        channel: z.string(),
        dayOffset: z.number().int().min(0).max(90),
      }),
    )
    .min(4)
    .max(14),
});

export type CampaignOutput = z.infer<typeof CampaignOutputSchema>;
export type CampaignBrief = z.infer<typeof CampaignBriefSchema>;
export type ContentDirection = z.infer<typeof ContentDirectionSchema>;
export type PlatformPost = z.infer<typeof PlatformPostSchema>;
export type ContentPlatform = (typeof contentPlatforms)[number];
export type ContentFormat = (typeof contentFormats)[number];
