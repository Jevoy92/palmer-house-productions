import silas from "@/assets/pals-optimized/silas.webp";
import kareem from "@/assets/pals-optimized/kareem.webp";
import clara from "@/assets/pals-optimized/clara.webp";
import raquel from "@/assets/pals-optimized/raquel.webp";

// =============================================================================
// Approved production pricing. Legacy edited-minute constants remain exported
// for standalone editing products and historical cart migration.
// =============================================================================
export type PackagePricingBasis = "edited-minute" | "finished-video";
/** Approved production pricing: sessions plus finished videos; episode bundles for Evergreen. */
export const PACKAGE_PRICING_BASIS = "finished-video" as PackagePricingBasis;
export const FINISHED_VIDEO_PRICE = 150;
export const MAX_PACKAGE_SESSIONS = 4;
export function isFinishedVideoPricing(): boolean {
  return PACKAGE_PRICING_BASIS === "finished-video";
}
export const SESSION_PRICE = 450;
export const INCLUDED_EDITED_MINUTES_PER_SESSION = 1;
export const SAME_SESSION_ADDITIONAL_MINUTE_PRICE = 100;
export const STANDALONE_EDITED_MINUTE_PRICE = 150;
/** Backwards-compatible alias for standalone à-la-carte output. */
export const ADDITIONAL_VIDEO_PRICE = STANDALONE_EDITED_MINUTE_PRICE;
export const EVERGREEN_LENGTH_PRICE: Record<5 | 10 | 15, number> = {
  5: 1050,
  10: 1650,
  15: 2250,
};

export type PalAccent = "system" | "spotlight" | "evergreen" | "reel";

/** Editable component on a mission — the part the user can dial up or down. */
export type Editable = {
  /** Fixed cost that always ships with the mission (sessions / base episode). */
  fixedBase: number;
  baseLabel: string;
  unitLabel: string; // singular noun, e.g. "video"
  unitLabelPlural: string; // plural noun, e.g. "videos"
  unitPrice: number;
  unitPriceLabel: string; // "+ $150 per video"
  /** Units already covered by fixedBase before unit pricing begins. */
  includedCount?: number;
  defaultCount: number;
  min: number;
  max: number;
  step: number;
};

// =============================================================================
// Problem-first taxonomy — users filter by the business pain they're solving,
// not by production format. Each item carries the problems it solves; group
// defaults supply speed / effort / vibe / audience / automation tags.
// =============================================================================
export type Problem =
  | "leads"
  | "trust"
  | "explain-offer"
  | "train-employees"
  | "reduce-repetition"
  | "improve-sales"
  | "look-premium"
  | "build-authority"
  | "social-visibility"
  | "shorten-onboarding"
  | "educate-customers"
  | "improve-hiring"
  | "clarify-process"
  | "launch"
  | "consistent-content"
  | "replace-meetings"
  | "client-experience";

export const PROBLEMS: { id: Problem; label: string }[] = [
  { id: "leads", label: "Generate Leads" },
  { id: "trust", label: "Build Trust" },
  { id: "explain-offer", label: "Explain Our Offer" },
  { id: "train-employees", label: "Train Employees" },
  { id: "reduce-repetition", label: "Reduce Repetitive Questions" },
  { id: "improve-sales", label: "Improve Sales Calls" },
  { id: "look-premium", label: "Look More Premium" },
  { id: "build-authority", label: "Build Authority" },
  { id: "social-visibility", label: "Increase Social Visibility" },
  { id: "shorten-onboarding", label: "Shorten Onboarding" },
  { id: "educate-customers", label: "Educate Customers" },
  { id: "improve-hiring", label: "Improve Hiring" },
  { id: "clarify-process", label: "Clarify Process" },
  { id: "launch", label: "Launch Something" },
  { id: "consistent-content", label: "Consistent Content" },
  { id: "replace-meetings", label: "Replace Meetings" },
  { id: "client-experience", label: "Improve Client Experience" },
];

/** Emotional, plain-language version of the problem filter. */
export const PAIN_POINTS: { id: Problem; label: string }[] = [
  { id: "explain-offer", label: "Nobody gets what we do" },
  { id: "reduce-repetition", label: "I'm tired of repeating myself" },
  { id: "consistent-content", label: "Our content feels random" },
  { id: "improve-sales", label: "Sales calls take too long" },
  { id: "trust", label: "Clients ghost after discovery" },
  { id: "build-authority", label: "We need more authority" },
  { id: "shorten-onboarding", label: "We have no onboarding system" },
  { id: "look-premium", label: "We look smaller than we are" },
];

export type Stage =
  | "solo"
  | "small-team"
  | "growing"
  | "multi-location"
  | "established"
  | "personal-brand"
  | "agency"
  | "coach"
  | "product";
export const STAGES: { id: Stage; label: string }[] = [
  { id: "solo", label: "Solo Founder" },
  { id: "small-team", label: "Small Team" },
  { id: "growing", label: "Growing Company" },
  { id: "multi-location", label: "Multi-Location" },
  { id: "established", label: "Established Brand" },
  { id: "personal-brand", label: "Personal Brand" },
  { id: "agency", label: "Agency / Service" },
  { id: "coach", label: "Coach / Consultant" },
  { id: "product", label: "Product Brand" },
];

export type Speed = "fast" | "medium" | "long";
export const SPEEDS: { id: Speed; label: string }[] = [
  { id: "fast", label: "Fast Wins" },
  { id: "medium", label: "Medium-Term Growth" },
  { id: "long", label: "Long-Term Asset" },
];

export type Effort = "minimal" | "guided" | "collaborative" | "full-support";
export const EFFORTS: { id: Effort; label: string }[] = [
  { id: "minimal", label: "Minimal Involvement" },
  { id: "guided", label: "Guided Recording" },
  { id: "collaborative", label: "Collaborative Strategy" },
  { id: "full-support", label: "Full Production Support" },
];

export type Vibe =
  | "educational"
  | "cinematic"
  | "bold"
  | "personality"
  | "documentary"
  | "professional"
  | "funny"
  | "calm";
export const VIBES: { id: Vibe; label: string }[] = [
  { id: "educational", label: "Educational" },
  { id: "cinematic", label: "Cinematic" },
  { id: "bold", label: "Bold Opinions" },
  { id: "personality", label: "Personality-Driven" },
  { id: "documentary", label: "Documentary Style" },
  { id: "professional", label: "Professional & Clean" },
  { id: "funny", label: "Funny / Entertaining" },
  { id: "calm", label: "Calm & Trustworthy" },
];

export type Audience =
  | "customers"
  | "leads"
  | "employees"
  | "managers"
  | "sales"
  | "investors"
  | "community"
  | "social";
export const AUDIENCES: { id: Audience; label: string }[] = [
  { id: "customers", label: "Customers" },
  { id: "leads", label: "Leads" },
  { id: "employees", label: "Employees" },
  { id: "managers", label: "Managers" },
  { id: "sales", label: "Sales Team" },
  { id: "investors", label: "Investors" },
  { id: "community", label: "Community" },
  { id: "social", label: "Social Audience" },
];

export type Automation =
  | "reduce-meetings"
  | "replace-explanations"
  | "train-faster"
  | "improve-handoffs"
  | "self-service"
  | "scale-knowledge";
export const AUTOMATIONS: { id: Automation; label: string }[] = [
  { id: "reduce-meetings", label: "Reduce Meetings" },
  { id: "replace-explanations", label: "Replace Repetitive Explanations" },
  { id: "train-faster", label: "Train Faster" },
  { id: "improve-handoffs", label: "Improve Handoffs" },
  { id: "self-service", label: "Self-Service Education" },
  { id: "scale-knowledge", label: "Scale Founder Knowledge" },
];

export type ItemTags = {
  problems?: Problem[];
  stages?: Stage[];
  speed?: Speed;
  effort?: Effort;
  vibe?: Vibe;
  audiences?: Audience[];
  automation?: Automation[];
};

export type ServiceItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  priceSuffix?: string;
  recommended?: boolean;
  editable?: Editable;
  tags?: ItemTags;
};

export type PackageItem = ServiceItem & {
  slug: string;
  lane: PalAccent;
  icon: string;
  formats: string[];
  format: string;
  learn: string[];
  outcome: string;
  /** Zero for a bundled Evergreen episode; otherwise default filming sessions. */
  sessions: number;
};
export type PackageConfiguration = { count: number; sessions: number };

type GroupDefaults = {
  speed: Speed;
  effort: Effort;
  vibe: Vibe;
  audiences: Audience[];
  automation: Automation[];
  stages: Stage[];
};

export type PalGroup = {
  id: PalAccent;
  palName: string;
  role: string;
  tagline: string;
  pitch: string;
  image: string;
  accent: PalAccent;
  items: PackageItem[];
  defaults: GroupDefaults;
};

/** Build a session mission where each session includes one edited minute. */
const sessionPack = (sessions: number, editedMinutes: number) => {
  const fixedBase = sessions * SESSION_PRICE;
  const includedCount = isFinishedVideoPricing()
    ? 0
    : sessions * INCLUDED_EDITED_MINUTES_PER_SESSION;
  const unitPrice = isFinishedVideoPricing()
    ? FINISHED_VIDEO_PRICE
    : SAME_SESSION_ADDITIONAL_MINUTE_PRICE;
  const additionalMinutes = Math.max(0, editedMinutes - includedCount);
  return {
    price: fixedBase + additionalMinutes * unitPrice,
    editable: {
      fixedBase,
      baseLabel: `${sessions} session${sessions > 1 ? "s" : ""} · $${fixedBase.toLocaleString()}`,
      unitLabel: isFinishedVideoPricing() ? "finished video" : "edited min",
      unitLabelPlural: isFinishedVideoPricing() ? "finished videos" : "edited min",
      unitPrice,
      unitPriceLabel: isFinishedVideoPricing()
        ? `$${unitPrice} per finished video`
        : `${includedCount} min included · + $${unitPrice} per added min`,
      includedCount,
      defaultCount: editedMinutes,
      min: Math.max(1, includedCount),
      max: 20,
      step: 1,
    } satisfies Editable,
  };
};

/** Build an evergreen long-form mission with editable runtime blocks. */
export const EVERGREEN_BLOCK_PRICE = EVERGREEN_LENGTH_PRICE[10] - EVERGREEN_LENGTH_PRICE[5];
const evergreenPack = (mins: 5 | 10 | 15) => {
  const fixedBase = EVERGREEN_LENGTH_PRICE[5];
  const extraBlocks = ((mins - 5) / 5) as 0 | 1 | 2;
  return {
    price: fixedBase + extraBlocks * EVERGREEN_BLOCK_PRICE,
    editable: {
      fixedBase,
      baseLabel: `Base 5-min episode · $${fixedBase.toLocaleString()}`,
      unitLabel: "+5-min block",
      unitLabelPlural: "+5-min blocks",
      unitPrice: EVERGREEN_BLOCK_PRICE,
      unitPriceLabel: `+ $${EVERGREEN_BLOCK_PRICE} per 5 min`,
      defaultCount: extraBlocks,
      min: 0,
      max: 2,
      step: 1,
    } satisfies Editable,
  };
};

/** Compute the live total for an item given the user's chosen component count. */
export function computeItemPrice(item: ServiceItem, count?: number): number {
  if ("lane" in item) return computePackagePrice(item as PackageItem, count);
  if (!item.editable) return item.price;
  const c = count ?? item.editable.defaultCount;
  const billable = Math.max(0, c - (item.editable.includedCount ?? 0));
  return item.editable.fixedBase + billable * item.editable.unitPrice;
}

/**
 * "What's always included" — the production guarantees that ship with every
 * mission in a Pal lane. Surfaced inside each pack's expand panel so buyers
 * see the value baked into the base session, not just the unit math.
 */
export const BASE_INCLUDED = [
  "2-hour on-location filming session",
  "Setup, breakdown, teleprompter & on-set direction",
  "Pre-shoot planning, script help & wardrobe guidance",
  ...(isFinishedVideoPricing()
    ? []
    : ["1 edited minute included per session — split into 60s, 2×30s, or 4×15s"]),
  "Professional editing, color & sound mix",
  "Professional lighting & broadcast-grade audio",
];

const INCLUDED_BY_LANE: Record<PalAccent, string[]> = {
  reel: [...BASE_INCLUDED, "Platform-native short-form edits (9:16, captions-ready)"],
  spotlight: [
    ...BASE_INCLUDED,
    "Cinematic look — premium framing, color & b-roll",
    "Polished finished videos — length agreed in scope",
  ],
  system: [
    ...BASE_INCLUDED,
    "Process-mapped scripting & SOP-style structure",
    "Internal-distribution ready (Loom/Notion/LMS friendly)",
  ],
  evergreen: [
    "Pre-shoot topic planning & narrative architecture",
    "Long-form filming session with full crew",
    "Professional editing, color, sound mix & motion graphics",
    "Professional lighting & broadcast-grade audio",
    "Self-Clip Kit — keep filming after the shoot",
  ],
};

export function getIncluded(item: ServiceItem, group: PalGroup): string[] {
  const base = INCLUDED_BY_LANE[group.id];
  if ("sessions" in item && Number(item.sessions) > 1) {
    return [`${item.sessions} filming sessions (2 hrs each) with direction`, ...base.slice(1)];
  }
  return base;
}

/** Add-on add-ons (price-tagged à-la-carte). Universal unless `applicablePals`. */
export type AddOn = ServiceItem & {
  applicablePals?: PalAccent[];
  category: "universal" | "pal-specific";
};

export const ADD_ONS: AddOn[] = [
  // Universal
  {
    id: "extra-edited-video",
    name: "Standalone Edited Minute",
    description:
      "One standalone edited minute using existing footage; separate from a finished-video production package",
    price: ADDITIONAL_VIDEO_PRICE,
    category: "universal",
  },
  {
    id: "caption-pack",
    name: "Caption Pack",
    description: "Professional captions for all videos",
    price: 75,
    category: "universal",
  },
  {
    id: "thumbnail-set",
    name: "Thumbnail Set",
    description: "Custom thumbnails for each video",
    price: 50,
    category: "universal",
    recommended: true,
  },
  {
    id: "posting-plan",
    name: "30-Day Posting Plan",
    description: "Strategic posting schedule with optimal times",
    price: 125,
    category: "universal",
  },
  {
    id: "brand-kit",
    name: "Brand Kit Integration",
    description: "Lower thirds, fonts, colors, branding overlays",
    price: 200,
    category: "universal",
  },
  {
    id: "rush-delivery",
    name: "Rush Delivery",
    description: "48-hour turnaround on editing",
    price: 300,
    category: "universal",
  },
  // Pal-specific
  {
    id: "repurpose-pack-6",
    name: "Repurpose Pack (6 shorts)",
    description: "6 short-form clips from your long-form content",
    price: 250,
    category: "pal-specific",
    applicablePals: ["evergreen"],
  },
  {
    id: "repurpose-pack-12",
    name: "Repurpose Pack (12 shorts)",
    description: "12 short-form clips from your long-form content",
    price: 400,
    category: "pal-specific",
    applicablePals: ["evergreen"],
  },
  {
    id: "spotlight-proof-clips",
    name: "Spotlight Proof Clips",
    description: "Premium credibility clips from Spotlight Pal",
    price: 300,
    category: "pal-specific",
    applicablePals: ["reel", "evergreen"],
  },
  {
    id: "reel-proof-pack",
    name: "Reel Proof Pack",
    description: "Short-form proof distribution from Reel Pal",
    price: 250,
    category: "pal-specific",
    applicablePals: ["spotlight", "system"],
  },
  {
    id: "evergreen-how-it-works-addon",
    name: "Evergreen How-It-Works",
    description: "Authority content explaining your process",
    price: 1050,
    category: "pal-specific",
    applicablePals: ["spotlight"],
  },
];

/** DIY digital downloads — sold standalone, no Pal selection required. */
export type DiyDownload = ServiceItem & { format: "PDF" };

export const DIY_DOWNLOADS: DiyDownload[] = [
  {
    id: "diy-strategy-blueprint",
    name: "Video Strategy Blueprint",
    description: "The strategic foundation every video brand needs",
    price: 19,
    format: "PDF",
  },
  {
    id: "diy-25-reels",
    name: "25 DIY Reels From Home",
    description: "Plug-and-play reel concepts you can shoot solo",
    price: 47,
    format: "PDF",
  },
  {
    id: "diy-script-bundle",
    name: "Owner/Founder Script Bundle",
    description: "Battle-tested scripts for founder-led content",
    price: 47,
    format: "PDF",
  },
];

export const PAL_GROUPS: PalGroup[] = [
  {
    id: "reel",
    palName: "Ryder & Raquel",
    role: "Reel Pal",
    tagline: "Visibility + Momentum",
    pitch: "Short-form content that builds visibility and momentum with strategic reels.",
    image: raquel,
    accent: "reel",
    defaults: {
      speed: "fast",
      effort: "guided",
      vibe: "personality",
      audiences: ["leads", "social"],
      automation: ["replace-explanations"],
      stages: ["solo", "small-team", "growing", "personal-brand", "coach"],
    },
    items: [
      {
        id: "social-content",
        slug: "social-content",
        lane: "reel",
        name: "Social Content",
        description:
          "Short videos that introduce your business, answer questions, and keep your channels active.",
        sessions: 1,
        icon: "/packages/icons/reel-services.png",
        formats: ["9:16", "1:1", "16:9"],
        format: "Social short-form · framing agreed in scope",
        learn: [
          "Service introductions and product highlights",
          "Hot takes, objection answers, and behind the scenes",
          "Customer proof and day-to-day updates",
        ],
        outcome: "A set of short videos built around the topics your audience cares about.",
        recommended: true,
        tags: {
          problems: ["social-visibility", "consistent-content", "leads"],
        },
        ...sessionPack(1, 6),
      },
    ],
  },
  {
    id: "spotlight",
    palName: "Kareem & Kiana",
    role: "Spotlight Pal",
    tagline: "Trust Assets + Founder Presence",
    pitch: "Premium trust-building content that establishes credibility and founder presence.",
    image: kareem,
    accent: "spotlight",
    defaults: {
      speed: "medium",
      effort: "collaborative",
      vibe: "cinematic",
      audiences: ["leads", "customers", "investors"],
      automation: ["scale-knowledge"],
      stages: ["growing", "established", "agency", "product"],
    },
    items: [
      {
        id: "commercials",
        slug: "commercials",
        lane: "spotlight",
        name: "Commercials",
        description:
          "A polished introduction to your business, your offer, and why people should choose you.",
        sessions: 1,
        icon: "/packages/icons/spotlight-brand-presence.png",
        formats: ["16:9", "9:16"],
        format: "Landscape or vertical · agreed in scope",
        learn: [
          "Business and brand introductions",
          "Service, offer, and campaign promotions",
          "A clear message and call to action",
        ],
        outcome: "A focused introduction that connects your offer to the people it is for.",
        recommended: true,
        tags: {
          problems: ["look-premium", "trust", "leads"],
        },
        ...sessionPack(1, 4),
      },
      {
        id: "product-demos",
        slug: "product-demos",
        lane: "spotlight",
        name: "Product Demos",
        description:
          "Show how your product or service works, with the details people need to understand it.",
        sessions: 1,
        icon: "/packages/icons/spotlight-offer-clarity.png",
        formats: ["16:9", "9:16"],
        format: "Landscape or vertical · agreed in scope",
        learn: [
          "Product features shown in use",
          "Service walkthroughs and customer handoffs",
          "Practical answers to common product questions",
        ],
        outcome: "A clear demonstration of what your product or service does and how to use it.",
        recommended: false,
        tags: {
          problems: ["explain-offer", "educate-customers"],
        },
        ...sessionPack(1, 4),
      },
      {
        id: "customer-stories",
        slug: "customer-stories",
        lane: "spotlight",
        name: "Customer Stories",
        description:
          "Let customers describe their experience and what changed after working with you.",
        sessions: 1,
        icon: "/packages/icons/spotlight-proof-builder.png",
        formats: ["16:9", "9:16"],
        format: "Landscape or vertical · agreed in scope",
        learn: [
          "Customer interviews",
          "The challenge, experience, and outcome",
          "Supporting footage that gives the story context",
        ],
        outcome:
          "Customer experiences told in their own words, with the context that makes them useful.",
        recommended: false,
        tags: {
          problems: ["trust", "improve-sales"],
        },
        ...sessionPack(1, 4),
      },
      {
        id: "employee-spotlights",
        slug: "employee-spotlights",
        lane: "spotlight",
        name: "Employee Spotlights",
        description: "Introduce the people behind the work and show what they bring to your team.",
        sessions: 1,
        icon: "/packages/icons/evergreen-founder-pov.png",
        formats: ["16:9", "9:16"],
        format: "Landscape or vertical · agreed in scope",
        learn: [
          "Team member introductions",
          "A look at their role and day-to-day work",
          "People stories for recruiting and company culture",
        ],
        outcome: "A human introduction to the people who make your business work.",
        recommended: false,
        tags: {
          problems: ["improve-hiring", "trust"],
        },
        ...sessionPack(1, 4),
      },
    ],
  },
  {
    id: "system",
    palName: "Silas & Samira",
    role: "System Pal",
    tagline: "Internal Video Systems",
    pitch: "Internal video systems that eliminate repetition and streamline operations.",
    image: silas,
    accent: "system",
    defaults: {
      speed: "long",
      effort: "collaborative",
      vibe: "educational",
      audiences: ["employees", "customers", "sales", "managers"],
      automation: ["reduce-meetings", "replace-explanations", "train-faster", "scale-knowledge"],
      stages: ["growing", "multi-location", "established", "agency"],
    },
    items: [
      {
        id: "onboarding",
        slug: "onboarding",
        lane: "system",
        name: "Onboarding",
        description: "Help new hires understand the team, the tools, and their first steps.",
        sessions: 1,
        icon: "/packages/icons/system-onboarding.png",
        formats: ["16:9"],
        format: "16:9 · internal learning",
        learn: [
          "A welcome and team overview",
          "Tools, routines, and first steps",
          "Answers new hires can revisit",
        ],
        outcome: "A repeatable introduction that helps new team members find their footing.",
        recommended: true,
        tags: {
          problems: ["shorten-onboarding", "train-employees"],
        },
        ...sessionPack(1, 6),
      },
      {
        id: "safety-training",
        slug: "safety-training",
        lane: "system",
        name: "Safety Training",
        description: "Show your team the safety procedures and checks they need to follow.",
        sessions: 1,
        icon: "/packages/icons/spotlight-objection-crusher.png",
        formats: ["16:9"],
        format: "16:9 · internal training",
        learn: [
          "Your workplace safety procedures",
          "Equipment checks and protective practices",
          "Clear demonstrations of the steps to follow",
        ],
        outcome: "Visual instruction for the safety practices you want your team to understand.",
        recommended: false,
        tags: {
          problems: ["train-employees", "clarify-process"],
        },
        ...sessionPack(1, 6),
      },
      {
        id: "sales-training",
        slug: "sales-training",
        lane: "system",
        name: "Sales Training",
        description:
          "Help your sales team explain the offer and handle common sales conversations.",
        sessions: 1,
        icon: "/packages/icons/system-sales-enablement.png",
        formats: ["16:9"],
        format: "16:9 · internal training",
        learn: [
          "Offer and product knowledge",
          "Common questions and sales conversations",
          "Demonstrations your team can learn from",
        ],
        outcome: "A shared reference that helps your team explain the offer consistently.",
        recommended: false,
        tags: {
          problems: ["improve-sales", "train-employees"],
        },
        ...sessionPack(1, 6),
      },
      {
        id: "video-sops",
        slug: "video-sops",
        lane: "system",
        name: "Video SOPs",
        description: "Turn repeatable tasks into clear, step-by-step videos your team can revisit.",
        sessions: 1,
        icon: "/packages/icons/system-sop.png",
        formats: ["16:9"],
        format: "16:9 · step-by-step instruction",
        learn: [
          "Standard operating procedures",
          "Tool and software walkthroughs",
          "Repeatable tasks, checks, and handoffs",
        ],
        outcome: "Clear visual procedures your team can follow and return to when needed.",
        recommended: false,
        tags: {
          problems: ["reduce-repetition", "clarify-process", "replace-meetings"],
        },
        ...sessionPack(1, 8),
      },
    ],
  },
  {
    id: "evergreen",
    palName: "Cyrus & Clara",
    role: "Evergreen Pal",
    tagline: "Authority + Long-Form",
    pitch:
      "Authority-building long-form content that compounds over time. Priced at a 5-minute episode default — upgrade on the call.",
    image: clara,
    accent: "evergreen",
    defaults: {
      speed: "long",
      effort: "full-support",
      vibe: "educational",
      audiences: ["leads", "customers", "community"],
      automation: ["self-service", "scale-knowledge", "replace-explanations"],
      stages: ["established", "personal-brand", "coach", "agency", "growing"],
    },
    items: [
      {
        id: "educational-videos",
        slug: "educational-videos",
        lane: "evergreen",
        name: "Educational Videos",
        description:
          "Teach a useful topic in depth, with clear explanations and practical examples.",
        sessions: 0,
        icon: "/packages/icons/evergreen-how-it-works.png",
        formats: ["16:9"],
        format: "16:9 · long-form education",
        learn: [
          "In-depth answers to common questions",
          "Practical explanations and demonstrations",
          "Case studies, industry topics, and expert perspectives",
        ],
        outcome: "A useful episode that teaches one topic clearly and in depth.",
        recommended: true,
        tags: {
          problems: ["build-authority", "educate-customers"],
        },
        ...evergreenPack(5),
      },
    ],
  },
];

export type SelectedMap = Record<string, number>; // itemId -> qty

/** Resolve effective tags for an item, merging group defaults with overrides. */
export function getItemTags(
  item: ServiceItem,
  group: PalGroup,
): Required<Omit<ItemTags, "problems">> & { problems: Problem[] } {
  const t = item.tags ?? {};
  return {
    problems: t.problems ?? [],
    stages: t.stages ?? group.defaults.stages,
    speed: t.speed ?? group.defaults.speed,
    effort: t.effort ?? group.defaults.effort,
    vibe: t.vibe ?? group.defaults.vibe,
    audiences: t.audiences ?? group.defaults.audiences,
    automation: t.automation ?? group.defaults.automation,
  };
}

/** Shared aliases keep existing links and saved plans readable after consolidation. */
export const LEGACY_PACKAGE_IDS: Readonly<Record<string, string>> = {
  "reel-services": "social-content",
  "reel-objection": "social-content",
  "reel-proof": "social-content",
  "reel-day-in-life": "social-content",
  "reel-pov": "social-content",
  "reel-momentum": "social-content",
  "spotlight-objection-crusher": "social-content",
  "spotlight-bts": "social-content",
  "spotlight-brand-presence": "commercials",
  "spotlight-offer-clarity": "product-demos",
  "spotlight-proof-builder": "customer-stories",
  "system-onboarding": "onboarding",
  "system-sop": "video-sops",
  "system-training": "video-sops",
  "system-tool-tutorial": "video-sops",
  "system-sales-enablement": "sales-training",
  "system-client-handoff": "product-demos",
  "evergreen-faq-deep-dive": "educational-videos",
  "evergreen-how-it-works": "educational-videos",
  "evergreen-myth-vs-reality": "educational-videos",
  "evergreen-case-study": "educational-videos",
  "evergreen-founder-pov": "educational-videos",
};
export const LEGACY_PACKAGE_DEFAULTS: Readonly<Record<string, PackageConfiguration>> = {
  "reel-services": {
    count: 6,
    sessions: 1,
  },
  "reel-objection": {
    count: 6,
    sessions: 1,
  },
  "reel-proof": {
    count: 6,
    sessions: 1,
  },
  "reel-day-in-life": {
    count: 4,
    sessions: 1,
  },
  "reel-pov": {
    count: 6,
    sessions: 1,
  },
  "reel-momentum": {
    count: 12,
    sessions: 2,
  },
  "spotlight-brand-presence": {
    count: 4,
    sessions: 1,
  },
  "spotlight-proof-builder": {
    count: 4,
    sessions: 1,
  },
  "spotlight-offer-clarity": {
    count: 4,
    sessions: 1,
  },
  "spotlight-objection-crusher": {
    count: 3,
    sessions: 1,
  },
  "spotlight-bts": {
    count: 4,
    sessions: 1,
  },
  "system-onboarding": {
    count: 6,
    sessions: 1,
  },
  "system-sop": {
    count: 8,
    sessions: 1,
  },
  "system-training": {
    count: 6,
    sessions: 1,
  },
  "system-client-handoff": {
    count: 4,
    sessions: 1,
  },
  "system-sales-enablement": {
    count: 6,
    sessions: 1,
  },
  "system-tool-tutorial": {
    count: 6,
    sessions: 1,
  },
  "evergreen-faq-deep-dive": {
    count: 0,
    sessions: 0,
  },
  "evergreen-how-it-works": {
    count: 0,
    sessions: 0,
  },
  "evergreen-myth-vs-reality": {
    count: 0,
    sessions: 0,
  },
  "evergreen-case-study": {
    count: 0,
    sessions: 0,
  },
  "evergreen-founder-pov": {
    count: 0,
    sessions: 0,
  },
};

export function resolvePackageId(id: string): string {
  return Object.prototype.hasOwnProperty.call(LEGACY_PACKAGE_IDS, id) ? LEGACY_PACKAGE_IDS[id] : id;
}

export function getPackageById(id: string): PackageItem | undefined {
  const canonical = resolvePackageId(id);
  return PAL_GROUPS.flatMap((group) => group.items).find((item) => item.id === canonical);
}

export function getItemById(id: string): ServiceItem | undefined {
  return (
    getPackageById(id) ??
    ADD_ONS.find((item) => item.id === id) ??
    DIY_DOWNLOADS.find((item) => item.id === id)
  );
}

/** UI normalization. Server entry points also call the strict validator below. */
export function normalizePackageConfiguration(
  item: PackageItem,
  count?: number,
  sessions?: number,
): PackageConfiguration {
  const filmingSessions =
    item.lane === "evergreen"
      ? 0
      : Math.max(
          1,
          Math.min(
            MAX_PACKAGE_SESSIONS,
            Number.isFinite(sessions) ? Math.trunc(sessions!) : item.sessions,
          ),
        );
  const minimum =
    item.lane === "evergreen"
      ? 0
      : isFinishedVideoPricing()
        ? 1
        : filmingSessions * INCLUDED_EDITED_MINUTES_PER_SESSION;
  return {
    count: Math.max(
      minimum,
      Math.min(
        item.editable!.max,
        Number.isFinite(count) ? Math.trunc(count!) : item.editable!.defaultCount,
      ),
    ),
    sessions: filmingSessions,
  };
}

/** Reject malformed, out-of-range or noncanonical scope before accepting a quote or payment. */
export function validatePackageConfiguration(
  item: PackageItem,
  count?: number,
  sessions?: number,
): PackageConfiguration {
  const rawCount = count ?? item.editable!.defaultCount;
  const rawSessions = sessions ?? item.sessions;
  const normalized = normalizePackageConfiguration(item, rawCount, rawSessions);
  if (
    !Number.isInteger(rawCount) ||
    !Number.isInteger(rawSessions) ||
    rawCount !== normalized.count ||
    rawSessions !== normalized.sessions
  ) {
    throw new Error(`Invalid configuration for package: ${item.id}`);
  }
  return normalized;
}

export function computePackagePrice(item: PackageItem, count?: number, sessions?: number): number {
  const config = normalizePackageConfiguration(item, count, sessions);
  if (item.lane === "evergreen")
    return EVERGREEN_LENGTH_PRICE[5] + config.count * EVERGREEN_BLOCK_PRICE;
  const included = isFinishedVideoPricing()
    ? 0
    : config.sessions * INCLUDED_EDITED_MINUTES_PER_SESSION;
  const unitPrice = isFinishedVideoPricing()
    ? FINISHED_VIDEO_PRICE
    : SAME_SESSION_ADDITIONAL_MINUTE_PRICE;
  return config.sessions * SESSION_PRICE + Math.max(0, config.count - included) * unitPrice;
}

export function getPackageScope(item: PackageItem, count?: number, sessions?: number): string {
  const config = normalizePackageConfiguration(item, count, sessions);
  if (item.lane === "evergreen") return `${5 + config.count * 5}-minute episode`;
  const noun = isFinishedVideoPricing()
    ? `finished video${config.count === 1 ? "" : "s"}`
    : `edited minute${config.count === 1 ? "" : "s"}`;
  return `${config.sessions} filming session${config.sessions === 1 ? "" : "s"} · ${config.count} ${noun}`;
}

/** Add-ons available given the user's currently-selected pal groups. */
export function relevantAddOns(activePals: Set<PalAccent>): AddOn[] {
  return ADD_ONS.filter((a) => {
    if (a.category === "universal") return activePals.size > 0;
    return a.applicablePals?.some((p) => activePals.has(p)) ?? false;
  });
}
