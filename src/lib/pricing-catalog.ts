import silas from "@/assets/pals-optimized/silas.webp";
import kareem from "@/assets/pals-optimized/kareem.webp";
import clara from "@/assets/pals-optimized/clara.webp";
import raquel from "@/assets/pals-optimized/raquel.webp";

// =============================================================================
// Real pricing constants — pulled directly from
// palmerhouseproductions.com production bundle (ProductionPricing).
// =============================================================================
export const SESSION_PRICE = 450;
export const ADDITIONAL_VIDEO_PRICE = 150;
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
  "customers" | "leads" | "employees" | "managers" | "sales" | "investors" | "community" | "social";
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
  items: ServiceItem[];
  defaults: GroupDefaults;
};

/** Build a session-based mission (Reel / Spotlight / System) with editable videos. */
const sessionPack = (sessions: number, videos: number) => {
  const fixedBase = sessions * SESSION_PRICE;
  return {
    price: fixedBase + videos * ADDITIONAL_VIDEO_PRICE,
    editable: {
      fixedBase,
      baseLabel: `${sessions} session${sessions > 1 ? "s" : ""} · $${fixedBase.toLocaleString()}`,
      unitLabel: "video",
      unitLabelPlural: "videos",
      unitPrice: ADDITIONAL_VIDEO_PRICE,
      unitPriceLabel: `+ $${ADDITIONAL_VIDEO_PRICE} per video`,
      defaultCount: videos,
      min: 1,
      max: 20,
      step: 1,
    } satisfies Editable,
  };
};

/** Build an evergreen long-form mission with editable runtime blocks. */
const EVERGREEN_BLOCK_PRICE = 600; // delta between successive tiers (1050→1650→2250)
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
  if (!item.editable) return item.price;
  const c = count ?? item.editable.defaultCount;
  return item.editable.fixedBase + c * item.editable.unitPrice;
}

/**
 * "What's always included" — the production guarantees that ship with every
 * mission in a Pal lane. Surfaced inside each pack's expand panel so buyers
 * see the value baked into the base session, not just the unit math.
 */
const BASE_INCLUDED = [
  "2-hour on-location filming session",
  "Pre-shoot planning, strategy & on-set direction",
  "Professional editing, color & sound mix",
  "Professional lighting & broadcast-grade audio",
];

const INCLUDED_BY_LANE: Record<PalAccent, string[]> = {
  reel: [...BASE_INCLUDED, "Platform-native short-form edits (9:16, captions-ready)"],
  spotlight: [
    ...BASE_INCLUDED,
    "Cinematic look — premium framing, color & b-roll",
    "Polished 1-minute deliverables",
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
  // Reel Momentum is the only mission that books two sessions.
  if (item.id === "reel-momentum") {
    return [
      "2 filming sessions (2 hrs each) with direction",
      ...base.slice(1),
      "30-day posting calendar built around your videos",
    ];
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
    name: "Additional Edited Video",
    description: "One more fully edited video from the same production session",
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
    price: 100,
    category: "universal",
  },
  {
    id: "brand-kit",
    name: "Brand Kit Integration",
    description: "Lower thirds, fonts, colors, branding overlays",
    price: 150,
    category: "universal",
  },
  {
    id: "rush-delivery",
    name: "Rush Delivery",
    description: "48-hour turnaround on editing",
    price: 200,
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
        id: "reel-services",
        name: "Service Pack",
        description: "Punchy reels that explain exactly what you do · 1 session + 6 videos",
        ...sessionPack(1, 6),
        recommended: true,
        tags: { problems: ["explain-offer", "social-visibility", "leads"] },
      },
      {
        id: "reel-objection",
        name: "Objection Pack",
        description: "Reels that answer buyer hesitations · 1 session + 6 videos",
        ...sessionPack(1, 6),
        tags: { problems: ["improve-sales", "leads", "trust"], vibe: "bold" },
      },
      {
        id: "reel-proof",
        name: "Proof Pack",
        description: "Results, wins, testimonials in reel form · 1 session + 6 videos",
        ...sessionPack(1, 6),
        tags: { problems: ["trust", "leads", "build-authority"] },
      },
      {
        id: "reel-day-in-life",
        name: "Day-in-the-Life Pack",
        description: "Authentic BTS reels · 1 session + 4 videos",
        ...sessionPack(1, 4),
        tags: {
          problems: ["trust", "social-visibility", "consistent-content"],
          vibe: "documentary",
        },
      },
      {
        id: "reel-pov",
        name: "POV / Hot Take Pack",
        description: "Opinion-driven reels with edge · 1 session + 6 videos",
        ...sessionPack(1, 6),
        tags: {
          problems: ["build-authority", "social-visibility"],
          vibe: "bold",
          stages: ["personal-brand", "coach", "solo"],
        },
      },
      {
        id: "reel-momentum",
        name: "30-Day Momentum Pack",
        description: "Full month of reels + posting calendar · 2 sessions + 12 videos",
        ...sessionPack(2, 12),
        tags: {
          problems: ["consistent-content", "social-visibility", "leads"],
          speed: "medium",
        },
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
        id: "spotlight-brand-presence",
        name: "Brand Presence Kit",
        description: "Polished 1-min brand videos · 1 cinematic session + 4 videos",
        ...sessionPack(1, 4),
        recommended: true,
        tags: { problems: ["look-premium", "trust", "build-authority"] },
      },
      {
        id: "spotlight-proof-builder",
        name: "Proof Builder Kit",
        description: "Client testimonial 1-min videos with b-roll · 1 session + 4 videos",
        ...sessionPack(1, 4),
        tags: { problems: ["trust", "improve-sales", "leads"] },
      },
      {
        id: "spotlight-offer-clarity",
        name: "Offer Clarity Kit",
        description: "Explainer 1-min videos for your offer · 1 session + 4 videos",
        ...sessionPack(1, 4),
        tags: { problems: ["explain-offer", "improve-sales", "launch"] },
      },
      {
        id: "spotlight-objection-crusher",
        name: "Objection Crusher Set",
        description: "In-depth 1-min objection videos · 1 session + 3 videos",
        ...sessionPack(1, 3),
        tags: { problems: ["improve-sales", "trust", "reduce-repetition"] },
      },
      {
        id: "spotlight-bts",
        name: "BTS Credibility Pack",
        description: "Premium BTS 1-min videos with production value · 1 session + 4 videos",
        ...sessionPack(1, 4),
        tags: {
          problems: ["trust", "look-premium", "build-authority"],
          vibe: "documentary",
        },
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
        id: "system-onboarding",
        name: "Onboarding Kit",
        description: "Training videos so new hires get up to speed · 1 session + 6 videos",
        ...sessionPack(1, 6),
        recommended: true,
        tags: {
          problems: [
            "shorten-onboarding",
            "train-employees",
            "reduce-repetition",
            "improve-hiring",
          ],
          audiences: ["employees"],
          automation: ["train-faster", "self-service"],
        },
      },
      {
        id: "system-sop",
        name: "SOP Walkthrough Kit",
        description: "Step-by-step process documentation · 1 session + 8 videos",
        ...sessionPack(1, 8),
        tags: {
          problems: ["clarify-process", "train-employees", "reduce-repetition"],
          audiences: ["employees", "managers"],
          automation: ["improve-handoffs", "self-service"],
        },
      },
      {
        id: "system-training",
        name: "Training Kit",
        description: "Tool / software training videos · 1 session + 6 videos",
        ...sessionPack(1, 6),
        tags: {
          problems: ["train-employees", "reduce-repetition"],
          audiences: ["employees"],
          automation: ["train-faster"],
        },
      },
      {
        id: "system-client-handoff",
        name: "Client Handoff System",
        description: "Client-facing handoff videos · 1 session + 4 videos",
        ...sessionPack(1, 4),
        tags: {
          problems: ["client-experience", "reduce-repetition", "replace-meetings"],
          audiences: ["customers"],
          automation: ["reduce-meetings", "improve-handoffs"],
        },
      },
      {
        id: "system-sales-enablement",
        name: "Sales Enablement Library",
        description: "Internal sales support videos · 1 session + 6 videos",
        ...sessionPack(1, 6),
        tags: {
          problems: ["improve-sales", "train-employees"],
          audiences: ["sales"],
          automation: ["train-faster", "scale-knowledge"],
        },
      },
      {
        id: "system-tool-tutorial",
        name: "Tool Tutorial Pack",
        description: '"How we use X" videos for your tech stack · 1 session + 6 videos',
        ...sessionPack(1, 6),
        tags: {
          problems: ["train-employees", "reduce-repetition", "clarify-process"],
          audiences: ["employees", "customers"],
          automation: ["self-service", "replace-explanations"],
        },
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
        id: "evergreen-faq-deep-dive",
        name: "FAQ Deep Dive",
        description: "Answer your top 3-5 questions in depth · 5-min episode",
        ...evergreenPack(5),
        recommended: true,
        tags: {
          problems: ["reduce-repetition", "educate-customers", "build-authority"],
          automation: ["replace-explanations", "self-service"],
        },
      },
      {
        id: "evergreen-how-it-works",
        name: "How It Works",
        description: "Walk through your process step-by-step · 5-min episode",
        ...evergreenPack(5),
        tags: {
          problems: ["explain-offer", "build-authority", "educate-customers", "clarify-process"],
        },
      },
      {
        id: "evergreen-myth-vs-reality",
        name: "Myth vs Reality",
        description: "Bust industry myths · 5-min episode",
        ...evergreenPack(5),
        tags: {
          problems: ["build-authority", "educate-customers"],
          vibe: "bold",
        },
      },
      {
        id: "evergreen-case-study",
        name: "Case Study Breakdown",
        description: "Break down a real client win · 5-min episode",
        ...evergreenPack(5),
        tags: { problems: ["trust", "leads", "build-authority"] },
      },
      {
        id: "evergreen-founder-pov",
        name: "Founder POV",
        description: "Share your unique industry perspective · 5-min episode",
        ...evergreenPack(5),
        tags: {
          problems: ["build-authority", "trust"],
          stages: ["personal-brand", "coach", "solo"],
          vibe: "personality",
        },
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

export function getItemById(id: string): ServiceItem | undefined {
  for (const g of PAL_GROUPS) {
    const it = g.items.find((x) => x.id === id);
    if (it) return it;
  }
  return ADD_ONS.find((a) => a.id === id) ?? DIY_DOWNLOADS.find((d) => d.id === id);
}

/** Add-ons available given the user's currently-selected pal groups. */
export function relevantAddOns(activePals: Set<PalAccent>): AddOn[] {
  return ADD_ONS.filter((a) => {
    if (a.category === "universal") return activePals.size > 0;
    return a.applicablePals?.some((p) => activePals.has(p)) ?? false;
  });
}
