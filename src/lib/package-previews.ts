/** Animated format previews. Pure graphics, no generated footage. */
export type LoopLayout = "phone" | "chat" | "timeline" | "callouts" | "checklist" | "card" | "steps";

export type PackagePreview = {
  title: string;
  summary: string;
  lane: "reel" | "spotlight" | "evergreen" | "system";
  layout: LoopLayout;
  heading: string;
  beats: string[];
};

export const packagePreviews: Record<string, PackagePreview> = {
  "social-content": {
    title: "Short social videos",
    summary: "Vertical videos with a strong hook, captions, and a clear next step.",
    lane: "reel",
    layout: "phone",
    heading: "Stop scrolling.",
    beats: ["Hook in 2 seconds", "Captions on", "One clear next step"],
  },
  "sales-training": {
    title: "Sales training role-plays",
    summary: "Real objections, practiced responses your team can replay.",
    lane: "system",
    layout: "chat",
    heading: "Price objection",
    beats: ["“Your quote is higher.”", "“What does theirs include?”", "Clarify before defending"],
  },
  commercials: {
    title: "30-second commercials",
    summary: "A tight story from problem to call to action.",
    lane: "spotlight",
    layout: "timeline",
    heading: "0:30",
    beats: ["Problem", "Promise", "Proof", "Book today"],
  },
  "product-demos": {
    title: "Product demonstrations",
    summary: "Show the product working, feature by feature.",
    lane: "evergreen",
    layout: "callouts",
    heading: "Your product",
    beats: ["Easy setup", "Key feature", "Why it matters"],
  },
  "customer-stories": {
    title: "Customer stories",
    summary: "Your customers explain the before, the after, and why they chose you.",
    lane: "spotlight",
    layout: "card",
    heading: "“They made it simple.”",
    beats: ["Before", "After", "★★★★★"],
  },
  "employee-spotlights": {
    title: "Employee spotlights",
    summary: "Introduce the people behind the work and what they stand for.",
    lane: "spotlight",
    layout: "card",
    heading: "Meet the team",
    beats: ["Care", "Craft", "Follow-through"],
  },
  onboarding: {
    title: "Onboarding videos",
    summary: "Welcome new hires with the same clear message every time.",
    lane: "system",
    layout: "checklist",
    heading: "Welcome aboard",
    beats: ["Day 1", "Week 1", "Month 1"],
  },
  "safety-training": {
    title: "Safety training",
    summary: "Clear steps, the risks, and the right way to do it.",
    lane: "system",
    layout: "steps",
    heading: "Before you start",
    beats: ["Spot the risk", "Gear up", "Do it safely"],
  },
  "video-sops": {
    title: "Video SOPs",
    summary: "Turn repeated processes into short, numbered walkthroughs.",
    lane: "system",
    layout: "steps",
    heading: "Process",
    beats: ["Step 1", "Step 2", "Step 3", "Done"],
  },
  "educational-videos": {
    title: "Educational videos",
    summary: "Chaptered lessons that answer your customers' questions.",
    lane: "evergreen",
    layout: "checklist",
    heading: "Lesson plan",
    beats: ["Chapter 1", "Chapter 2", "Chapter 3"],
  },
};
