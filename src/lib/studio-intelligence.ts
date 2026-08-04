import type { StudioLane } from "./studio-model";

export type VideoLibraryItem = {
  key: string;
  title: string;
  lane: StudioLane;
  category: string;
  problem: string;
  outcome: string;
  prompt: string;
  prioritySignals: Array<
    "trust" | "education" | "visibility" | "operations" | "sales" | "onboarding"
  >;
};

export const universalVideoLibrary: VideoLibraryItem[] = [
  {
    key: "homepage-hero",
    title: "Homepage clarity video",
    lane: "spotlight",
    category: "Trust foundation",
    problem: "Visitors cannot quickly tell what you do or why it matters.",
    outcome: "A clear first impression that helps the right customer keep reading.",
    prompt: "Explain who you help, what changes, and the clearest next step in under 60 seconds.",
    prioritySignals: ["trust", "sales"],
  },
  {
    key: "founder-story",
    title: "Founder or leadership story",
    lane: "spotlight",
    category: "Trust foundation",
    problem: "The business feels anonymous or interchangeable.",
    outcome: "A human reason to trust the people behind the offer.",
    prompt: "Tell the moment the problem became personal and why the company had to exist.",
    prioritySignals: ["trust"],
  },
  {
    key: "why-choose-us",
    title: "Why choose us",
    lane: "spotlight",
    category: "Trust foundation",
    problem: "Customers compare you on price because the difference is invisible.",
    outcome: "A specific, provable reason to choose you.",
    prompt: "Name the decision criteria that matter and show how your process protects them.",
    prioritySignals: ["trust", "sales"],
  },
  {
    key: "testimonial-proof",
    title: "Customer proof story",
    lane: "spotlight",
    category: "Proof library",
    problem: "You have results but customers cannot see themselves in them.",
    outcome: "Proof that makes the outcome believable without invented claims.",
    prompt:
      "Capture the before, the turning point, and the specific after in the customer’s words.",
    prioritySignals: ["trust", "sales"],
  },
  {
    key: "process-overview",
    title: "How the process works",
    lane: "evergreen",
    category: "Buying clarity",
    problem: "People hesitate because they do not know what happens after they say yes.",
    outcome: "A predictable buying experience with fewer anxious questions.",
    prompt: "Walk through the process, decision points, timing, and what the customer needs to do.",
    prioritySignals: ["education", "sales"],
  },
  {
    key: "keystone-question",
    title: "The keystone question",
    lane: "evergreen",
    category: "Buying clarity",
    problem: "The most important pre-purchase question is answered differently every time.",
    outcome: "One durable answer that supports sales, search, and follow-up.",
    prompt: "Answer the question your best customer asks immediately before they buy.",
    prioritySignals: ["education", "sales"],
  },
  {
    key: "pricing-explainer",
    title: "Pricing and value explainer",
    lane: "evergreen",
    category: "Buying clarity",
    problem: "Price arrives before customers understand the value or variables.",
    outcome: "Better-fit conversations and fewer avoidable pricing objections.",
    prompt: "Explain what changes the investment, what is included, and how to choose responsibly.",
    prioritySignals: ["education", "sales"],
  },
  {
    key: "faq-series",
    title: "Frequently asked question series",
    lane: "evergreen",
    category: "Education library",
    problem: "Your team repeats the same education on every call.",
    outcome: "A searchable answer library that works before and after the sale.",
    prompt:
      "List the questions your team has answered twice this month and record one clear answer each.",
    prioritySignals: ["education", "sales"],
  },
  {
    key: "myth-busters",
    title: "Myths and costly mistakes",
    lane: "evergreen",
    category: "Education library",
    problem: "Bad assumptions delay the right decision.",
    outcome: "Authority built by helping the audience avoid preventable mistakes.",
    prompt:
      "Correct one common belief, explain the consequence, and offer a practical alternative.",
    prioritySignals: ["education", "trust"],
  },
  {
    key: "before-after",
    title: "Before-and-after proof",
    lane: "reel",
    category: "Visibility rhythm",
    problem: "Good work happens, but the transformation disappears after delivery.",
    outcome: "Visible proof packaged for platform-native attention.",
    prompt: "Pair the before and after with the decision or process that created the change.",
    prioritySignals: ["visibility", "trust"],
  },
  {
    key: "quick-wins",
    title: "Tips and quick wins",
    lane: "reel",
    category: "Visibility rhythm",
    problem: "The business only posts when it has a major announcement.",
    outcome: "A repeatable rhythm of genuinely useful short-form content.",
    prompt: "Share one small decision the audience can make today and why it matters.",
    prioritySignals: ["visibility", "education"],
  },
  {
    key: "behind-scenes",
    title: "Behind the scenes",
    lane: "reel",
    category: "Visibility rhythm",
    problem: "Customers see the result but not the care or expertise behind it.",
    outcome: "A more human, credible view of how the work gets done.",
    prompt: "Show one overlooked step and explain the customer benefit it protects.",
    prioritySignals: ["visibility", "trust"],
  },
  {
    key: "customer-welcome",
    title: "New-customer welcome",
    lane: "system",
    category: "Customer operations",
    problem: "Customers arrive unsure what to do next.",
    outcome: "A confident handoff from purchase to the first successful step.",
    prompt: "Welcome them, name the next three steps, and explain where to get help.",
    prioritySignals: ["onboarding", "operations"],
  },
  {
    key: "employee-onboarding",
    title: "Employee onboarding foundation",
    lane: "system",
    category: "Team operations",
    problem: "New team members learn through inconsistent shadowing and scattered notes.",
    outcome: "A repeatable first-week learning path.",
    prompt: "Document the context, standards, tools, and first successful outcomes for the role.",
    prioritySignals: ["onboarding", "operations"],
  },
  {
    key: "sop-library",
    title: "Core process walkthroughs",
    lane: "system",
    category: "Team operations",
    problem: "Critical processes live in one person’s head.",
    outcome: "Institutional knowledge the team can find and reuse.",
    prompt:
      "Record the trigger, steps, quality checks, exceptions, and owner for one repeated process.",
    prioritySignals: ["operations"],
  },
  {
    key: "support-library",
    title: "Customer support answer library",
    lane: "system",
    category: "Customer operations",
    problem: "Support answers are repeated manually and vary by team member.",
    outcome: "Faster, more consistent customer help.",
    prompt: "Turn the most repeated support requests into short, task-specific walkthroughs.",
    prioritySignals: ["operations", "education"],
  },
];

type BrandSignals = {
  description?: string | null;
  primary_audience?: string | null;
  offers?: unknown;
  proof_points?: string[] | null;
  completion?: number | null;
};

export function diagnoseVideoLibrary(brand: BrandSignals, campaignLanes: string[]) {
  const text = `${brand.description || ""} ${brand.primary_audience || ""}`.toLowerCase();
  const signals = new Set<VideoLibraryItem["prioritySignals"][number]>(["trust", "sales"]);
  if (/team|employee|staff|process|training|onboard|operation/.test(text)) {
    signals.add("operations");
    signals.add("onboarding");
  }
  if (/expert|educat|consult|service|complex|question/.test(text)) signals.add("education");
  if (/social|audience|community|local|visibility|reach/.test(text)) signals.add("visibility");
  if (!brand.proof_points?.length) signals.add("trust");

  return universalVideoLibrary
    .map((item) => {
      const signalScore = item.prioritySignals.reduce(
        (total, signal) => total + (signals.has(signal) ? 2 : 0),
        0,
      );
      const laneCoverage = campaignLanes.filter((lane) => lane === item.lane).length;
      const proofBoost =
        !brand.proof_points?.length && item.problem.toLowerCase().includes("proof") ? 3 : 0;
      return { ...item, score: signalScore + proofBoost - Math.min(laneCoverage, 2) };
    })
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}
