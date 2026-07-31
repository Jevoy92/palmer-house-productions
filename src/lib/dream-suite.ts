import ryder from "@/assets/pals-optimized/ryder.webp";
import raquel from "@/assets/pals-optimized/raquel.webp";
import kareem from "@/assets/pals-optimized/kareem.webp";
import kiana from "@/assets/pals-optimized/kiana.webp";
import cyrus from "@/assets/pals-optimized/cyrus.webp";
import clara from "@/assets/pals-optimized/clara.webp";
import silas from "@/assets/pals-optimized/silas.webp";
import samira from "@/assets/pals-optimized/samira.webp";

export type LaneKey = "reel" | "spotlight" | "evergreen" | "system";

export type PalLane = {
  key: LaneKey;
  label: string;
  problem: string;
  promise: string;
  path: string;
  color: string;
  soft: string;
  people: { name: string; role: string; image: string }[];
  signals: string[];
  starterId: string;
};

export const PAL_LANES: PalLane[] = [
  {
    key: "reel",
    label: "Reel Pal",
    problem: "Our content feels random and nothing moves.",
    promise: "Turn one clear point of view into short-form momentum.",
    path: "/reel-pal",
    color: "var(--reel)",
    soft: "var(--reel-soft)",
    people: [
      { name: "Ryder", role: "Momentum engine", image: ryder },
      { name: "Raquel", role: "Engagement anchor", image: raquel },
    ],
    signals: ["reels", "social", "posting", "hooks", "visibility", "short form"],
    starterId: "reel-services",
  },
  {
    key: "spotlight",
    label: "Spotlight Pal",
    problem: "We do great work, but nobody can see the proof.",
    promise: "Turn invisible quality into visible trust.",
    path: "/spotlight-pal",
    color: "var(--spotlight)",
    soft: "var(--spotlight-soft)",
    people: [
      { name: "Kareem", role: "Production quality", image: kareem },
      { name: "Kiana", role: "Creative direction", image: kiana },
    ],
    signals: ["trust", "premium", "testimonial", "brand", "camera", "proof", "stiff"],
    starterId: "spotlight-brand-presence",
  },
  {
    key: "evergreen",
    label: "Evergreen Pal",
    problem: "We keep explaining the same expertise from scratch.",
    promise: "Turn deep knowledge into an authority library that compounds.",
    path: "/evergreen-pal",
    color: "var(--evergreen)",
    soft: "var(--evergreen-soft)",
    people: [
      { name: "Cyrus", role: "Long-term strategy", image: cyrus },
      { name: "Clara", role: "Clarity specialist", image: clara },
    ],
    signals: ["authority", "youtube", "education", "expertise", "faq", "long form"],
    starterId: "evergreen-faq-deep-dive",
  },
  {
    key: "system",
    label: "System Pal",
    problem: "Our team repeats itself and knowledge lives in people's heads.",
    promise: "Turn tribal knowledge into a repeatable video system.",
    path: "/system-pal",
    color: "var(--system)",
    soft: "var(--system-soft)",
    people: [
      { name: "Silas", role: "Workflow automation", image: silas },
      { name: "Samira", role: "Knowledge architecture", image: samira },
    ],
    signals: ["onboarding", "training", "team", "process", "sop", "repeating", "meetings"],
    starterId: "system-onboarding",
  },
];

export function recommendLane(input: string): PalLane {
  const words = input.toLowerCase();
  let best = PAL_LANES[1];
  let bestScore = 0;
  for (const lane of PAL_LANES) {
    const score = lane.signals.reduce(
      (total, signal) => total + (words.includes(signal) ? 2 : 0),
      0,
    );
    if (score > bestScore) {
      best = lane;
      bestScore = score;
    }
  }
  return best;
}

export const PAL_FEED = [
  {
    lane: "reel",
    pal: "Ryder",
    text: "Your first sentence is not an introduction. It is the reason to keep watching.",
  },
  {
    lane: "spotlight",
    pal: "Kiana",
    text: "Camera confidence starts when you stop talking to an audience and talk to one person.",
  },
  {
    lane: "system",
    pal: "Samira",
    text: "If a teammate has answered it three times, the answer deserves a reusable home.",
  },
  {
    lane: "evergreen",
    pal: "Clara",
    text: "Clarity is not making the idea smaller. It is giving the idea a clean path.",
  },
  {
    lane: "reel",
    pal: "Raquel",
    text: "A hook earns attention. A human moment earns the relationship.",
  },
  {
    lane: "spotlight",
    pal: "Kareem",
    text: "Premium is not more effects. It is fewer things left to chance.",
  },
  {
    lane: "system",
    pal: "Silas",
    text: "Document the decision once, then let the system carry it.",
  },
  {
    lane: "evergreen",
    pal: "Cyrus",
    text: "Build the episode your best customer will still need a year from now.",
  },
] as const;

export const MISSION_GOALS = {
  trust: {
    label: "Build trust",
    lane: "Spotlight Pal",
    hook: "You should not have to take our word for it.",
    cta: "See what changed for our clients.",
    shots: [
      "Client arriving",
      "Hands at work",
      "One specific result",
      "Founder listening",
      "Proof on screen",
    ],
  },
  visibility: {
    label: "Create momentum",
    lane: "Reel Pal",
    hook: "Most businesses do not have a content problem. They have a starting problem.",
    cta: "Save this and film the first one today.",
    shots: [
      "Direct-to-camera hook",
      "Fast working detail",
      "Pattern interrupt",
      "On-screen example",
      "Clear final beat",
    ],
  },
  authority: {
    label: "Build authority",
    lane: "Evergreen Pal",
    hook: "Here is the part most advice skips.",
    cta: "Watch the full breakdown when you are ready to go deeper.",
    shots: [
      "Problem diagram",
      "Founder explanation",
      "Real example",
      "Myth correction",
      "Three-step recap",
    ],
  },
  operations: {
    label: "Save team time",
    lane: "System Pal",
    hook: "If this question keeps coming back, the answer needs a system.",
    cta: "Put this where the next teammate will find it.",
    shots: [
      "Current bottleneck",
      "Screen walkthrough",
      "Correct handoff",
      "Common mistake",
      "Where the asset lives",
    ],
  },
} as const;

export type MissionGoal = keyof typeof MISSION_GOALS;
