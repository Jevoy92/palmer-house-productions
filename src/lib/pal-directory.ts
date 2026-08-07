import kareemAvatar from "@/assets/pal-avatars/kareem.png";
import kianaAvatar from "@/assets/pal-avatars/kiana.png";
import ryderAvatar from "@/assets/pal-avatars/ryder.png";
import raquelAvatar from "@/assets/pal-avatars/raquel.png";
import cyrusAvatar from "@/assets/pal-avatars/cyrus.png";
import claraAvatar from "@/assets/pal-avatars/clara.png";
import silasAvatar from "@/assets/pal-avatars/silas.png";
import samiraAvatar from "@/assets/pal-avatars/samira.png";
import type { PalName, StudioLane } from "./studio-model";

export type PalProfile = {
  key: PalName;
  name: string;
  role: string;
  lane: StudioLane;
  avatar: string;
  color: string;
  soft: string;
  /** Short line used when the guide introduces themselves. */
  intro: string;
  /** Contextual hints keyed by studio surface. */
  tips: Record<string, string>;
  /** First-run note this Pal leaves in the member's notifications. */
  welcome: string;
};

const laneTokens: Record<StudioLane, { color: string; soft: string; label: string }> = {
  spotlight: { color: "var(--spotlight)", soft: "var(--spotlight-soft)", label: "Spotlight" },
  reel: { color: "var(--reel)", soft: "var(--reel-soft)", label: "Reel" },
  evergreen: { color: "var(--evergreen)", soft: "var(--evergreen-soft)", label: "Evergreen" },
  system: { color: "var(--system)", soft: "var(--system-soft)", label: "System" },
};

export const laneMeta = laneTokens;

export const laneDescriptions: Record<StudioLane, string> = {
  spotlight: "Spotlight — trust and first impressions",
  reel: "Reel — short social attention",
  evergreen: "Evergreen — authority that keeps working",
  system: "System — operations and onboarding",
};

function build(
  key: PalName,
  name: string,
  role: string,
  lane: StudioLane,
  avatar: string,
  intro: string,
  tips: Record<string, string>,
  welcome: string,
): PalProfile {
  return { key, name, role, lane, avatar, ...laneTokens[lane], intro, tips, welcome };
}

export const palDirectory: Record<PalName, PalProfile> = {
  kareem: build(
    "kareem",
    "Kareem",
    "Production quality",
    "spotlight",
    kareemAvatar,
    "I care about how the work looks and sounds when a stranger meets it first.",
    {
      home: "Before you make more, make one thing look undeniable.",
      engine: "Give me the moment you want people to remember. I will build around it.",
      brand: "Proof points do more for quality than adjectives ever will.",
      roadmap: "Start with the videos a first-time visitor sees.",
      library: "Approve the strong ones, cut the rest. A tight library sells better.",
    },
    "Welcome in. When you want one thing to look genuinely good — the lighting, the sound, the way it opens — that is my corner. Bring me the piece strangers will judge you on.",
  ),
  kiana: build(
    "kiana",
    "Kiana",
    "Story and presence",
    "spotlight",
    kianaAvatar,
    "I look for the story underneath the service description.",
    {
      home: "One clear story beats five clever posts.",
      engine: "Tell me what changed for a real customer. That is the campaign.",
      brand: "Write the way you talk to a client you like.",
      roadmap: "Founder story first — it makes everything after it easier.",
      library: "Keep the pieces that sound like a person, not a brochure.",
    },
    "Hi. I am the one who asks what actually happened. Tell me about a customer, a hard week, a fix you are proud of, and I will turn it into something people feel.",
  ),
  ryder: build(
    "ryder",
    "Ryder",
    "Hooks and momentum",
    "reel",
    ryderAvatar,
    "I am here to stop the scroll and keep you shipping.",
    {
      home: "Momentum beats perfection. Publish something this week.",
      engine: "Lead with the sharpest sentence you have.",
      brand: "Short phrases travel. Save the long ones for the article.",
      roadmap: "Batch three short videos in one sitting.",
      library: "If it does not earn the first two seconds, rework the open.",
    },
    "Hey. My whole job is momentum. If you are staring at a blank week, throw me one sentence and I will hand you three things you could film today.",
  ),
  raquel: build(
    "raquel",
    "Raquel",
    "Retention and connection",
    "reel",
    raquelAvatar,
    "I watch what keeps people around after the hook.",
    {
      home: "Answer one real question your customers keep asking.",
      engine: "Say who this is for in the first line so the right people stay.",
      brand: "The language your audience uses matters more than the language you prefer.",
      roadmap: "Behind the scenes builds more trust than another ad.",
      library: "Reply to your comments — it is free content research.",
    },
    "Hello. I watch what keeps people around after the hook. Tell me the question your customers keep asking and we will make it worth staying for.",
  ),
  cyrus: build(
    "cyrus",
    "Cyrus",
    "Authority strategy",
    "evergreen",
    cyrusAvatar,
    "I build the pieces that keep earning long after you post them.",
    {
      home: "Pick the question you answer most and make it permanent.",
      engine: "Depth wins here. Give me the reasoning, not just the claim.",
      brand: "Specific numbers and named outcomes make authority believable.",
      roadmap: "A pricing explainer removes more friction than any ad.",
      library: "Update the evergreen pieces before making new ones.",
    },
    "Good to meet you. I build the pieces that still work a year from now. When you are tired of explaining the same thing, bring it here and we will make it permanent.",
  ),
  clara: build(
    "clara",
    "Clara",
    "Clarity and structure",
    "evergreen",
    claraAvatar,
    "I make complicated work easy to follow.",
    {
      home: "If a customer has to ask twice, that is a video waiting to be made.",
      engine: "Give me the steps in order — I will handle the shape.",
      brand: "Plain words. Fewer of them.",
      roadmap: "Process walkthroughs shorten your sales calls.",
      library: "Structure first, polish second.",
    },
    "Hi there. I take the complicated parts of your work and make them easy to follow. If a customer ever had to ask you twice, that is exactly what I want to hear about.",
  ),
  silas: build(
    "silas",
    "Silas",
    "Workflow and scale",
    "system",
    silasAvatar,
    "I turn one production day into weeks of finished work.",
    {
      home: "Plan the shoot once, harvest it for a month.",
      engine: "Think in systems: one anchor, many outputs.",
      brand: "Document the offer once so every draft can reuse it.",
      roadmap: "Record the repeated process — it pays for itself.",
      library: "Schedule what is approved before you make anything new.",
    },
    "Welcome. I think in production days: plan once, harvest for a month. When you want one shoot to become weeks of finished work, that is what I am for.",
  ),
  samira: build(
    "samira",
    "Samira",
    "Knowledge and onboarding",
    "system",
    samiraAvatar,
    "I make sure nothing important lives only in someone's head.",
    {
      home: "New customers and new staff need the same clarity.",
      engine: "What do people always need explaining after they say yes?",
      brand: "Write down the answers you repeat — that is your knowledge base.",
      roadmap: "Welcome and onboarding videos reduce support work immediately.",
      library: "Keep the how-to pieces current; they get watched the longest.",
    },
    "Hi. I care about what lives only in someone's head — onboarding, the answers you repeat, what new customers always need. I turn that into content that saves you time.",
  ),
};

export const neutralGuide = {
  key: null,
  name: "Palmer House",
  role: "Your studio",
  lane: "system" as StudioLane,
  avatar: "",
  color: "var(--system)",
  soft: "var(--system-soft)",
  intro: "Straight guidance, no character required.",
  tips: {
    home: "Your next useful move is always one step, not ten.",
    engine: "One strong idea produces the whole campaign.",
    brand: "The more your Brand DNA knows, the more specific every draft gets.",
    roadmap: "Work the checklist lane by lane.",
    library: "Approve, schedule, publish. Then make more.",
  },
  welcome:
    "Your studio is ready. Everything you tell it — your brand, your interests, the work you have already made — stays in memory so you never start from a blank page twice.",
} satisfies Omit<PalProfile, "key"> & { key: null };

export type GuideProfile = PalProfile | typeof neutralGuide;

export function resolveGuide(value?: string | null): GuideProfile {
  if (!value || value === "none") return neutralGuide;
  return palDirectory[value as PalName] || neutralGuide;
}

export const palList = Object.values(palDirectory);
