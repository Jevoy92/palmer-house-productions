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
    name: "Creator",
    price: 99,
    campaigns: 2,
    audience: "Solo owners building a consistent content rhythm.",
    features: ["2 complete campaigns", "Brand Studio", "Production plans", "Content calendar"],
  },
  business: {
    name: "Business",
    price: 249,
    campaigns: 5,
    audience: "Small teams managing several offers or platforms.",
    features: [
      "5 complete campaigns",
      "Team workspace",
      "Website content audit",
      "Advanced planning",
    ],
  },
  partner: {
    name: "Partner",
    price: 499,
    campaigns: 12,
    audience: "Businesses pairing software with Palmer House guidance.",
    features: [
      "12 complete campaigns",
      "Monthly strategy session",
      "Priority support",
      "Preferred production pricing",
    ],
  },
} as const;

export type StudioPlanKey = keyof typeof studioPlans;
export type StudioView =
  | "engine"
  | "home"
  | "onboarding"
  | "brand"
  | "campaigns"
  | "campaign"
  | "library"
  | "calendar"
  | "settings"
  | "billing";

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
