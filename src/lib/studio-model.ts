import { z } from "zod";

export const studioAudienceTypes = [
  "Business",
  "Creator",
  "Author",
  "Musician / Band",
  "Influencer",
  "Podcaster",
  "Streamer",
  "Gamer",
  "Nonprofit",
  "Agency",
  "Coach / Speaker",
  "Other",
] as const;

export const studioPrimaryGoals = [
  "Grow an audience",
  "Sell products",
  "Sell services",
  "Build authority",
  "Educate",
  "Entertain",
  "Build community",
  "Recruit",
  "Improve internal communication",
] as const;

export const studioGoals = [
  "Create consistent social content",
  "Build authority with long-form content",
  "Promote an offer",
  "Create website videos",
  "Document FAQs",
  "Plan a launch",
  "Organize an internal content team",
] as const;

export const studioVisualStyles = [
  {
    id: "palmer-clay",
    name: "Palmer Clay 3D",
    detail: "Soft dimensional objects, paper-white space, and one confident lane color.",
  },
  {
    id: "premium-editorial",
    name: "Premium Editorial",
    detail: "Big type, intentional crops, and magazine-like pacing.",
  },
  {
    id: "minimal-swiss",
    name: "Minimal Swiss",
    detail: "Precise hierarchy, crisp alignment, and restrained graphic marks.",
  },
  {
    id: "bold-type",
    name: "Bold Type",
    detail: "Typography leads; graphic punctuation keeps each slide moving.",
  },
  {
    id: "soft-illustration",
    name: "Soft Illustration",
    detail: "Friendly simplified scenes that make abstract ideas easier to understand.",
  },
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
    price: 1199,
    annualPrice: 11990,
    campaigns: 12,
    strategySessions: 4,
    strategyMinutes: 240,
    audience: "Keep a standing weekly room for campaigns, decisions, and production questions.",
    features: [
      "12 complete campaigns",
      "Everything in Guided",
      "1 private strategy session / week",
      "Priority project feedback",
      "Preferred production pricing",
    ],
  },
} as const;

export const studioConsultingOffer = {
  name: "Clarity Intensive",
  price: 500,
  duration: 75,
  includedPlan: "Studio",
  includedDays: 30,
  description:
    "A focused working session for a campaign, filming space, offer, or content system—with 30 days of Studio access included.",
} as const;

export const studioAdvisoryOffer = {
  name: "90-Day Video Leverage Partnership",
  price: 25000,
  duration: "90 days",
  description:
    "A close working partnership to turn positioning, brand memory, campaigns, and filming decisions into one operating system.",
  features: [
    "Weekly private strategy room",
    "Complete Brand Guide and 90-day video roadmap",
    "Campaign and script review throughout the engagement",
    "Filming-environment audit by Zoom or on-site request",
    "Partner Studio access for the full engagement",
  ],
} as const;

export type StudioPlanKey = keyof typeof studioPlans;

/** Live Stripe recurring price IDs for Studio membership access. */
export const studioPlanPrices = {
  creator: {
    month: "price_1U1u0JGcAcCB6YlQd2cJUG37",
    year: "price_1U1u3OGcAcCB6YlQjFvqLx3F",
  },
  business: {
    month: "price_1U1u0pGcAcCB6YlQTmre9d6I",
    year: "price_1U1u5UGcAcCB6YlQO2VFHPE2",
  },
  partner: {
    month: "price_1U1u2iGcAcCB6YlQ8BsDctg5",
    year: "price_1U1u5tGcAcCB6YlQn1JfwLux",
  },
} as const satisfies Record<StudioPlanKey, { month: string; year: string }>;
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
        videoKey: z.string().nullable(),
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

export const ContentSourceAnalysisRequestSchema = z
  .object({
    workspaceId: z.string().uuid(),
    accessToken: z.string().min(20),
    sourceType: z.enum(["link", "image"]),
    sourceUrl: z.string().url().max(2048).optional(),
    sourceDataUrl: z
      .string()
      .max(8_000_000)
      .regex(/^data:image\/(jpeg|png|webp);base64,/, "Use a JPEG, PNG, or WebP image.")
      .optional(),
    context: z.string().max(2000).default(""),
    brand: z.object({
      businessName: z.string().max(180),
      description: z.string().max(1600),
      audience: z.string().max(800),
      offers: z.array(z.string()).max(20),
      proof: z.array(z.string()).max(20),
    }),
  })
  .superRefine((value, context) => {
    if (value.sourceType === "link" && !value.sourceUrl) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["sourceUrl"],
        message: "Add a link.",
      });
    }
    if (value.sourceType === "image" && !value.sourceDataUrl) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["sourceDataUrl"],
        message: "Add an image.",
      });
    }
  });

export const ContentSourceAnalysisSchema = z.object({
  suggestedIdea: z.string(),
  businessProblem: z.string(),
  audienceDecision: z.string(),
  observedEvidence: z.array(z.string()).min(1).max(4),
  lane: z.enum(["spotlight", "reel", "evergreen", "system"]),
});

export type ContentSourceAnalysis = z.infer<typeof ContentSourceAnalysisSchema>;

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
    creatorType: z.string().max(80).default("Business"),
    primaryGoal: z.string().max(180).default("Sell services"),
    description: z.string().max(1600),
    industry: z.string().max(180).default(""),
    primaryAudience: z.string().max(800).default(""),
    offers: z.array(z.string()).max(20).default([]),
    platforms: z.array(z.string()).max(20).default([]),
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
    creatorType: z.string().max(80).default("Business"),
    primaryGoal: z.string().max(180).default("Sell services"),
    description: z.string().max(1600),
    industry: z.string().max(180).default(""),
    primaryAudience: z.string().max(800).default(""),
    offers: z.array(z.string()).max(20).default([]),
    platforms: z.array(z.string()).max(20).default([]),
    voice: z.array(z.string()).max(12),
    proof: z.array(z.string()).max(20),
    callsToAction: z.array(z.string()).max(20),
    avoidLanguage: z.array(z.string()).max(20),
  }),

});

// NOTE: the model provider ignores JSON-Schema minItems, so array minimums are
// intentionally loose here — counts are requested in the prompt instead. Hard
// minimums caused otherwise-valid campaigns to fail parsing after generation.
export const CampaignOutputSchema = z.object({
  title: z.string(),
  primaryLane: z.enum(["spotlight", "reel", "evergreen", "system"]),
  strategy: z.object({
    bigIdea: z.string(),
    audienceInsight: z.string(),
    promise: z.string(),
    messagePillars: z.array(z.string()).min(1).max(6),
    channelPlan: z
      .array(z.object({ channel: z.string(), role: z.string() }))
      .min(1)
      .max(8),
  }),
  anchor: z.object({
    title: z.string(),
    hook: z.string(),
    script: z.string(),
    callToAction: z.string(),
    scenes: z
      .array(
        z.object({
          beat: z.string(),
          visual: z.string(),
          spoken: z.string(),
          onScreenText: z.string(),
          broll: z.array(z.string()).max(8).default([]),
        }),
      )
      .max(12)
      .default([]),
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
    .min(1)
    .max(8),
  captions: z
    .array(z.object({ platform: z.string(), copy: z.string() }))
    .min(1)
    .max(8),
  faq: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .min(1)
    .max(10),
  newsletter: z.object({ subject: z.string(), body: z.string() }),
  carousel: z.object({ title: z.string(), slides: z.array(z.string()).min(1).max(12) }),
  platformPosts: z.array(PlatformPostSchema).min(1).max(20),
  productionPlan: z.object({
    objective: z.string(),
    estimatedMinutes: z.number().int().min(5).max(960),
    location: z.string(),
    wardrobe: z.array(z.string()).max(8),
    props: z.array(z.string()).max(12),
    deliveryNotes: z.array(z.string()).max(10),
    shots: z
      .array(z.object({ shot: z.string(), framing: z.string(), purpose: z.string() }))
      .min(1)
      .max(16),
    broll: z.array(z.string()).min(1).max(16),
    checklist: z.array(z.string()).min(1).max(20),
  }),
  schedule: z
    .array(
      z.object({
        title: z.string(),
        channel: z.string(),
        dayOffset: z.number().int().min(0).max(365),
      }),
    )
    .min(1)
    .max(20),
});

export type CampaignOutput = z.infer<typeof CampaignOutputSchema>;
export type CampaignBrief = z.infer<typeof CampaignBriefSchema>;
export type ContentDirection = z.infer<typeof ContentDirectionSchema>;
export type PlatformPost = z.infer<typeof PlatformPostSchema>;
export type ContentPlatform = (typeof contentPlatforms)[number];
export type ContentFormat = (typeof contentFormats)[number];
