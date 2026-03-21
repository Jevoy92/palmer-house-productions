export type PalId = "reel" | "spotlight" | "system" | "evergreen";

export interface Pal {
  id: PalId;
  name: string;
  displayName: string;
  tagline: string;
  description: string;
  maleChar: string;
  femaleChar: string;
  icon: string;
}

export const PALS: Record<PalId, Pal> = {
  reel: {
    id: "reel",
    name: "Reel Pal",
    displayName: "Ryder & Raquel",
    tagline: "Visibility + Momentum",
    description:
      "Short-form content that builds visibility and momentum with strategic reels.",
    maleChar: "Ryder",
    femaleChar: "Raquel",
    icon: "smartphone",
  },
  spotlight: {
    id: "spotlight",
    name: "Spotlight Pal",
    displayName: "Kareem & Kiana",
    tagline: "Trust Assets + Founder Presence",
    description:
      "Premium trust-building content that establishes credibility and founder presence.",
    maleChar: "Kareem",
    femaleChar: "Kiana",
    icon: "film",
  },
  system: {
    id: "system",
    name: "System Pal",
    displayName: "Silas & Samira",
    tagline: "Internal Video Systems",
    description:
      "Internal video systems that eliminate repetition and streamline operations.",
    maleChar: "Silas",
    femaleChar: "Samira",
    icon: "settings",
  },
  evergreen: {
    id: "evergreen",
    name: "Evergreen Pal",
    displayName: "Cyrus & Clara",
    tagline: "Authority + Long-Form",
    description:
      "Authority-building content that compounds over time and establishes expertise.",
    maleChar: "Cyrus",
    femaleChar: "Clara",
    icon: "play-circle",
  },
};

export const PAL_ORDER: PalId[] = ["reel", "system", "evergreen", "spotlight"];

export const PRICING = {
  SESSION: 450,
  ADDITIONAL_VIDEO: 150,
  EVERGREEN: {
    5: 1050,
    10: 1650,
    15: 2250,
  } as Record<number, number>,
  EVERGREEN_ADDITIONAL: {
    5: 525,
    10: 825,
    15: 1125,
  } as Record<number, number>,
};

export type MissionPricingType = "session-based" | "length-based";

export interface BaseMission {
  id: string;
  palId: PalId;
  name: string;
  problemStatement: string;
  description: string;
  includes: string;
  pricingType: MissionPricingType;
}

export interface SessionBasedMission extends BaseMission {
  pricingType: "session-based";
  defaultSessions: number;
  defaultAdditionalVideos: number;
}

export interface LengthBasedMission extends BaseMission {
  pricingType: "length-based";
}

export type Mission = SessionBasedMission | LengthBasedMission;

export const REEL_MISSIONS: SessionBasedMission[] = [
  {
    id: "reel-services",
    palId: "reel",
    name: "Services Pack",
    problemStatement: "People don't know what we actually do.",
    description:
      'Punchy reels that explain exactly what you do\u2014so prospects stop asking "wait, what do you actually do?"',
    includes:
      "2-hour filming session with direction, edited short-form videos ready to post.",
    pricingType: "session-based",
    defaultSessions: 1,
    defaultAdditionalVideos: 6,
  },
  {
    id: "reel-objection",
    palId: "reel",
    name: "Objection Pack",
    problemStatement: "Leads keep asking the same hesitant questions.",
    description:
      'Reels that answer your buyers\' biggest hesitations before they even ask\u2014"Is it worth it?" "What if it doesn\'t work?"',
    includes:
      "2-hour filming session with direction, objection-crushing short-form videos.",
    pricingType: "session-based",
    defaultSessions: 1,
    defaultAdditionalVideos: 6,
  },
  {
    id: "reel-proof",
    palId: "reel",
    name: "Proof Pack",
    problemStatement: "We have results but no video proof.",
    description:
      'Reels featuring results, wins, and testimonials that make "trust me" unnecessary.',
    includes:
      "2-hour filming session, social proof videos showcasing real results.",
    pricingType: "session-based",
    defaultSessions: 1,
    defaultAdditionalVideos: 6,
  },
  {
    id: "reel-day-in-life",
    palId: "reel",
    name: "Day-in-the-Life Pack",
    problemStatement: "Our content feels too corporate.",
    description:
      "Behind-the-scenes reels that show the human side of your brand\u2014relatable, not rehearsed.",
    includes: "2-hour filming session, authentic BTS short-form videos.",
    pricingType: "session-based",
    defaultSessions: 1,
    defaultAdditionalVideos: 4,
  },
  {
    id: "reel-pov",
    palId: "reel",
    name: "POV / Hot Take Pack",
    problemStatement: "We blend in with everyone else.",
    description:
      "Opinion-driven reels that position you as someone with a real perspective\u2014not another vanilla brand.",
    includes: "2-hour filming session, point-of-view videos with edge.",
    pricingType: "session-based",
    defaultSessions: 1,
    defaultAdditionalVideos: 6,
  },
  {
    id: "reel-momentum",
    palId: "reel",
    name: "30-Day Momentum Pack",
    problemStatement: "We never know what to post next.",
    description:
      'A full month of reels + posting calendar for consistent visibility. No more "what should I post today?"',
    includes:
      "Two 2-hour filming sessions, videos, and a 30-day posting schedule.",
    pricingType: "session-based",
    defaultSessions: 2,
    defaultAdditionalVideos: 12,
  },
];

export const SPOTLIGHT_MISSIONS: SessionBasedMission[] = [
  {
    id: "spotlight-brand-presence",
    palId: "spotlight",
    name: "Brand Presence Kit",
    problemStatement: "People don't know who we really are.",
    description:
      'Premium 1-minute videos that answer "who are you?"\u2014founder story, company overview, and mission.',
    includes:
      "2-hour cinematic filming session, polished 1-minute brand videos.",
    pricingType: "session-based",
    defaultSessions: 1,
    defaultAdditionalVideos: 4,
  },
  {
    id: "spotlight-proof-builder",
    palId: "spotlight",
    name: "Proof Builder Kit",
    problemStatement: "We need clients to sell for us.",
    description:
      "Testimonial 1-minute videos that let your clients do the selling for you.",
    includes:
      "2-hour filming session, client testimonial videos with b-roll.",
    pricingType: "session-based",
    defaultSessions: 1,
    defaultAdditionalVideos: 4,
  },
  {
    id: "spotlight-offer-clarity",
    palId: "spotlight",
    name: "Offer Clarity Kit",
    problemStatement: "People don't understand our offer.",
    description:
      "Explainer 1-minute videos that make your offer crystal clear\u2014what it is, who it's for, how it works.",
    includes: "2-hour filming session, offer breakdown videos.",
    pricingType: "session-based",
    defaultSessions: 1,
    defaultAdditionalVideos: 4,
  },
  {
    id: "spotlight-objection-crusher",
    palId: "spotlight",
    name: "Objection Crusher Set",
    problemStatement: "Buyers keep hesitating at the same point.",
    description:
      "In-depth 1-minute videos tackling your top buyer objections with authority.",
    includes:
      "2-hour filming session, premium objection-handling videos.",
    pricingType: "session-based",
    defaultSessions: 1,
    defaultAdditionalVideos: 3,
  },
  {
    id: "spotlight-bts",
    palId: "spotlight",
    name: "BTS Credibility Pack",
    problemStatement: "We need to show we're legit.",
    description:
      "Behind-the-scenes 1-minute videos that show your process\u2014proof that you're the real deal.",
    includes:
      "2-hour filming session, premium BTS videos with production value.",
    pricingType: "session-based",
    defaultSessions: 1,
    defaultAdditionalVideos: 4,
  },
];

export const SYSTEM_MISSIONS: SessionBasedMission[] = [
  {
    id: "system-onboarding",
    palId: "system",
    name: "Onboarding Kit",
    problemStatement: "New hires take forever to get up to speed.",
    description:
      "Training videos so new hires get up to speed without repeating yourself for the 47th time.",
    includes: "2-hour filming session, onboarding walkthrough videos.",
    pricingType: "session-based",
    defaultSessions: 1,
    defaultAdditionalVideos: 6,
  },
  {
    id: "system-sop",
    palId: "system",
    name: "SOP Walkthrough Kit",
    problemStatement: "Nobody knows how to do things the right way.",
    description:
      'Step-by-step videos documenting your key processes\u2014stops "how do we do this again?" forever.',
    includes: "2-hour filming session, SOP walkthrough videos.",
    pricingType: "session-based",
    defaultSessions: 1,
    defaultAdditionalVideos: 8,
  },
  {
    id: "system-training",
    palId: "system",
    name: "Training Kit",
    problemStatement: "We keep explaining the same tools over and over.",
    description:
      'Tool/software training videos that eliminate "can you show me how to use this?" Slack messages.',
    includes: "2-hour filming session, tool training videos.",
    pricingType: "session-based",
    defaultSessions: 1,
    defaultAdditionalVideos: 6,
  },
  {
    id: "system-client-handoff",
    palId: "system",
    name: "Client Handoff System",
    problemStatement: "Client handoffs are messy and inconsistent.",
    description:
      "Client-facing videos for smooth handoffs\u2014onboarding, expectations, and delivery flow.",
    includes: "2-hour filming session, client handoff videos.",
    pricingType: "session-based",
    defaultSessions: 1,
    defaultAdditionalVideos: 4,
  },
  {
    id: "system-sales-enablement",
    palId: "system",
    name: "Sales Enablement Library",
    problemStatement: "Sales team isn't equipped with the right content.",
    description:
      "Internal videos that arm your sales team with pitches, objection handling, and product knowledge.",
    includes: "2-hour filming session, sales support videos.",
    pricingType: "session-based",
    defaultSessions: 1,
    defaultAdditionalVideos: 6,
  },
  {
    id: "system-tool-tutorial",
    palId: "system",
    name: "Tool Tutorial Pack",
    problemStatement: "Everyone uses our tools differently.",
    description:
      '"How we use X" videos for your tech stack\u2014Notion, Slack, CRM, whatever you run on.',
    includes: "2-hour filming session, tool walkthrough videos.",
    pricingType: "session-based",
    defaultSessions: 1,
    defaultAdditionalVideos: 6,
  },
];

export const EVERGREEN_MISSIONS: LengthBasedMission[] = [
  {
    id: "evergreen-faq-deep-dive",
    palId: "evergreen",
    name: "FAQ Deep Dive",
    problemStatement: "We answer the same questions over and over.",
    description:
      "Answer your top 3-5 questions in depth so you never repeat yourself\u2014one video that works 24/7.",
    includes:
      "2-hour filming session, topic planning, on-camera direction, final edit + Self-Clip Kit.",
    pricingType: "length-based",
  },
  {
    id: "evergreen-how-it-works",
    palId: "evergreen",
    name: "How It Works",
    problemStatement: "Prospects don't understand our process.",
    description:
      "Walk through your process step-by-step\u2014builds trust and pre-sells before the call.",
    includes:
      "2-hour filming session, process mapping, on-camera direction, final edit + Self-Clip Kit.",
    pricingType: "length-based",
  },
  {
    id: "evergreen-myth-vs-reality",
    palId: "evergreen",
    name: "Myth vs Reality",
    problemStatement: "Our industry is full of misconceptions.",
    description:
      "Bust industry myths and position yourself as the truth-teller\u2014thought leadership that differentiates.",
    includes:
      "2-hour filming session, myth identification, on-camera direction, final edit + Self-Clip Kit.",
    pricingType: "length-based",
  },
  {
    id: "evergreen-case-study",
    palId: "evergreen",
    name: "Case Study Breakdown",
    problemStatement: "We have great results but no detailed proof.",
    description:
      "Break down a real client win with specifics that sell\u2014the story behind the success.",
    includes:
      "2-hour filming session, case prep, on-camera direction, final edit + Self-Clip Kit.",
    pricingType: "length-based",
  },
  {
    id: "evergreen-founder-pov",
    palId: "evergreen",
    name: "Founder POV",
    problemStatement: "People don't know what we stand for.",
    description:
      "Share your unique perspective on the industry\u2014thought leadership that attracts aligned clients.",
    includes:
      "2-hour filming session, perspective framing, on-camera direction, final edit + Self-Clip Kit.",
    pricingType: "length-based",
  },
];

export function getMissionsForPal(palId: PalId): Mission[] {
  switch (palId) {
    case "reel":
      return REEL_MISSIONS;
    case "spotlight":
      return SPOTLIGHT_MISSIONS;
    case "system":
      return SYSTEM_MISSIONS;
    case "evergreen":
      return EVERGREEN_MISSIONS;
  }
}

export function calculateSessionPrice(
  sessions: number,
  additionalVideos: number
): number {
  return sessions * PRICING.SESSION + additionalVideos * PRICING.ADDITIONAL_VIDEO;
}

export function calculateEvergreenPrice(
  episodeLength: number,
  additionalEpisodes: number = 0
): number {
  const base = PRICING.EVERGREEN[episodeLength] ?? PRICING.EVERGREEN[5];
  const additional =
    additionalEpisodes * (PRICING.EVERGREEN_ADDITIONAL[episodeLength] ?? PRICING.EVERGREEN_ADDITIONAL[5]);
  return base + additional;
}

export const ADDONS = [
  { id: "caption-pack", name: "Caption Pack", price: 75, description: "Captions for all videos" },
  { id: "thumbnail-set", name: "Thumbnail Set", price: 50, description: "Custom thumbnails" },
  { id: "posting-plan", name: "30-Day Posting Plan", price: 100, description: "Content calendar" },
  { id: "brand-kit", name: "Brand Kit Integration", price: 150, description: "Brand asset alignment" },
  { id: "rush-delivery", name: "Rush Delivery", price: 200, description: "Priority turnaround" },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "We listen before we film. Map your goals, audience, and bottlenecks.",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Design a video system that solves problems\u2014not just fills a feed.",
  },
  {
    number: "03",
    title: "Production",
    description: "Professional shoots with a team that makes you feel confident on camera.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Delivery, optimization, and ongoing support to keep your system sharp.",
  },
];
