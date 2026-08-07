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
  {
    key: "offer-explainer",
    title: "Signature offer explainer",
    lane: "spotlight",
    category: "Trust foundation",
    problem: "People like the brand but cannot tell what buying actually looks like.",
    outcome: "A clear picture of the offer, the steps, and what is included.",
    prompt:
      "Walk through your main offer: who it is for, what happens in each stage, and what the buyer ends up with.",
    prioritySignals: ["sales", "trust"],
  },
  {
    key: "objection-answer",
    title: "The honest objection answer",
    lane: "spotlight",
    category: "Trust foundation",
    problem: "The same hesitation stalls deals and nobody addresses it directly.",
    outcome: "A straight answer that removes the biggest reason people stall.",
    prompt:
      "Name the objection you hear most, agree with the fair part of it, then show how you actually handle it.",
    prioritySignals: ["sales", "trust"],
  },
  {
    key: "hook-first-tip",
    title: "Hook-first tip",
    lane: "reel",
    category: "Attention",
    problem: "Posts open too slowly and lose people in the first two seconds.",
    outcome: "One sharp, useful tip that earns the rest of the watch.",
    prompt:
      "Lead with the sharpest sentence you know about your work, then deliver one specific tip in under 30 seconds.",
    prioritySignals: ["visibility", "education"],
  },
  {
    key: "day-in-the-life",
    title: "Day in the life",
    lane: "reel",
    category: "Attention",
    problem: "Customers cannot picture what the work actually involves.",
    outcome: "Familiarity that makes the first conversation easier.",
    prompt:
      "Follow one real working day in short beats: the first task, the hard part, and how it ends.",
    prioritySignals: ["visibility", "trust"],
  },
  {
    key: "customer-question",
    title: "Answer a real customer question",
    lane: "reel",
    category: "Attention",
    problem: "Good questions get answered privately and never reach a wider audience.",
    outcome: "Useful short content that already has proven demand.",
    prompt:
      "Read one real question you were asked this month, then answer it plainly in under 60 seconds.",
    prioritySignals: ["education", "visibility"],
  },
  {
    key: "results-breakdown",
    title: "Results breakdown",
    lane: "evergreen",
    category: "Authority",
    problem: "Claims about outcomes are stated but never shown.",
    outcome: "Evidence a careful buyer can check before they commit.",
    prompt:
      "Take one project from starting condition to finished result and explain what changed and why.",
    prioritySignals: ["trust", "sales"],
  },
  {
    key: "partner-referral",
    title: "Partner and referral brief",
    lane: "system",
    category: "Customer operations",
    problem: "Partners describe your work inaccurately because nobody gave them the words.",
    outcome: "Referrals that arrive already qualified.",
    prompt:
      "Explain who you are the right fit for, who you are not, and how a partner should introduce you.",
    prioritySignals: ["operations", "sales"],
  },
  {
    key: "annual-recap",
    title: "Season or annual recap",
    lane: "system",
    category: "Customer operations",
    problem: "Progress happens but nobody sees the shape of it.",
    outcome: "A record that builds trust and gives the team something to point at.",
    prompt:
      "Summarize the period: what changed, what you learned, and what is next for customers.",
    prioritySignals: ["trust", "operations"],
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
