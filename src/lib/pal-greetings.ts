import type { PalName } from "./studio-model";

/** Only facts already loaded for this workspace belong in an opening. */
export type PalOpeningContext = {
  memberName?: string;
  businessName?: string;
  threadTitle?: string;
  latestQuestion?: string;
  campaignTitle?: string;
  upcomingTitle?: string;
  memoryTitle?: string;
  ideaTitle?: string;
  draftCount?: number;
  customName?: string;
};
export type PalOpening = {
  headline: string;
  body: string;
  contextLabel: string;
  suggestions: string[];
};

const clean = (text?: string, limit = 100) => {
  const value = (text || "").replace(/\s+/g, " ").trim();
  return value.length > limit ? `${value.slice(0, limit - 1).trimEnd()}…` : value;
};
const voices: Record<PalName, { hello: string[]; start: string; question: string; next: string }> =
  {
    kareem: {
      hello: [
        "Let’s make this feel finished.",
        "Good work starts with one clear choice.",
        "Let’s give this your best finish.",
      ],
      start: "Bring me the rough version. We’ll find the detail that makes it feel considered.",
      question: "What should someone notice first? I can help make that the strongest part.",
      next: "Help me sharpen the first impression",
    },
    kiana: {
      hello: [
        "Hey. What’s the story today?",
        "There you are. Let’s find the good part.",
        "A new day, a new little story.",
      ],
      start:
        "Tell me one real thing about your business — a person, a win, or a moment you keep thinking about.",
      question: "There’s a human detail in here somewhere. Want to find it together?",
      next: "Help me find the human story",
    },
    ryder: {
      hello: [
        "Ready when you are. Let’s make something.",
        "One good idea. Let’s get it moving.",
        "Alright. What are we shipping?",
      ],
      start:
        "A rough idea is plenty. Give me one sentence and we’ll turn it into something you can use.",
      question:
        "Let’s pick one useful next move. Sharper hook, fresh image, or a draft ready to go?",
      next: "Give me the fastest useful next step",
    },
    raquel: {
      hello: [
        "Let’s give people a reason to stay.",
        "Hi. Who are we talking to today?",
        "Let’s make room for a real connection.",
      ],
      start:
        "What has someone asked you lately? That’s often where the most useful content begins.",
      question: "Who should feel understood by this? Let’s start with what they need from you.",
      next: "Make this more useful to my audience",
    },
    cyrus: {
      hello: [
        "Let’s build something that keeps working.",
        "A little perspective before the next move.",
        "What should still be useful a year from now?",
      ],
      start:
        "Bring me a question your best customer asks. We can turn one thoughtful answer into a lasting resource.",
      question: "There may be more value here than one post. Shall we give the idea a longer life?",
      next: "Turn this into a lasting resource",
    },
    clara: {
      hello: [
        "Hi. We can make this simple.",
        "One clear step at a time.",
        "Let’s untangle the next thing.",
      ],
      start:
        "Start wherever you are. Tell me what you need someone to understand, and we’ll put it in order.",
      question:
        "First, let’s choose the point. Then we can shape the words, picture, or document around it.",
      next: "Make the next step clear",
    },
    silas: {
      hello: [
        "Let’s put what you have to work.",
        "One strong starting point. Plenty of possibilities.",
        "Ready to make the pieces connect?",
      ],
      start:
        "Show me what you already have. We can build something useful without starting every piece from zero.",
      question:
        "Let’s connect this to the next useful output. A post, a document, an image, or a full campaign?",
      next: "Find useful ways to reuse this",
    },
    samira: {
      hello: [
        "Hi. Let’s make the handoff easier.",
        "A little clarity can save a lot of explaining.",
        "What would help someone feel ready?",
      ],
      start:
        "Tell me what a customer or teammate needs to know. We can give that answer a clear, useful home.",
      question:
        "What question comes next for the person reading this? We can make that answer easy to find.",
      next: "Make this easier to understand and use",
    },
  };

/** A local welcome, never presented as an AI research result or a saved assistant reply. */
export function composePalOpening(
  pal: PalName,
  context: PalOpeningContext,
  variant = 0,
): PalOpening {
  const voice = voices[pal];
  const firstName = clean(context.memberName?.split(/\s+/)[0], 30);
  const customName = clean(context.customName, 60);
  const headline = customName
    ? `${firstName ? `Hi ${firstName}. ` : "Hi. "}I’m ${customName}.`
    : voice.hello[Math.abs(variant) % voice.hello.length];
  const thread = clean(context.threadTitle);
  const upcoming = clean(context.upcomingTitle);
  const campaign = clean(context.campaignTitle);
  const idea = clean(context.ideaTitle);
  const memory = clean(context.memoryTitle);
  const business = clean(context.businessName);
  const subject = thread || upcoming || campaign || idea || memory;
  const contextLabel = thread
    ? "Your conversation"
    : upcoming
      ? "On your calendar"
      : campaign
        ? "Your current work"
        : idea
          ? "From your saved ideas"
          : memory
            ? "From shared memory"
            : business
              ? business
              : "A fresh start";
  const fact = thread
    ? `We’re picking up “${thread}”.`
    : upcoming
      ? `“${upcoming}” is on your calendar.`
      : campaign
        ? `“${campaign}” is in your campaigns.`
        : idea
          ? `You’ve saved “${idea}”.`
          : memory
            ? `Your shared memory includes “${memory}”.`
            : "";
  const nameLead = firstName && !customName ? `${firstName}, ` : "";
  const body = fact
    ? `${fact} ${voice.question}`
    : `${nameLead}${nameLead ? voice.start[0].toLowerCase() + voice.start.slice(1) : voice.start}${business ? ` We’ll make it sound like ${business}.` : ""}`;
  const brand = business || "my business";
  // Proactive starters: members always get three ready angles, never a blank box.
  const suggestions = [
    subject ? `${voice.next} for “${subject}”.` : `${voice.next} for ${brand}.`,
    `Pitch me a business angle for ${brand} this week — the problem we solve and a clear next step.`,
    `Pitch me a personal angle that mixes my story with ${brand}.`,
    `Pitch me a playful, scroll-stopping idea for ${brand}.`,
    ...(context.draftCount
      ? [`Help me choose the next step for my ${context.draftCount} saved drafts.`]
      : []),
  ];
  return { headline, body, contextLabel, suggestions };
}
