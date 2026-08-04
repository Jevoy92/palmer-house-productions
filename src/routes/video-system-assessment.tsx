import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, Section, Eyebrow } from "@/components/site/PageShell";

type Answers = {
  businessType: string;
  teamSize: string;
  videoHabits: string;
  goal: string;
  bottleneck: string;
};

const EMPTY: Answers = {
  businessType: "",
  teamSize: "",
  videoHabits: "",
  goal: "",
  bottleneck: "",
};

const STEPS = [
  {
    title: "Business Profile",
    key: "profile",
    fields: [
      {
        key: "businessType" as const,
        label: "What best describes your business?",
        options: ["Services", "Products", "Both", "Other"],
      },
      {
        key: "teamSize" as const,
        label: "How large is your team?",
        options: ["Just me", "2–5 people", "6–25 people", "26–100 people", "100+"],
      },
    ],
  },
  {
    title: "Current Video Habits",
    key: "habits",
    fields: [
      {
        key: "videoHabits" as const,
        label: "How does your business currently use video?",
        options: [
          "We don't use video at all",
          "We post occasionally, with no real plan",
          "We post consistently but it feels scattered",
          "We have a working system already",
        ],
      },
    ],
  },
  {
    title: "Your Goals",
    key: "goals",
    fields: [
      {
        key: "goal" as const,
        label: "What's the outcome you care about most right now?",
        options: [
          "Get more visibility on social media",
          "Build trust and authority with prospects",
          "Stop repeating the same explanations to customers or staff",
          "Tie everything into one measurable system",
        ],
      },
    ],
  },
  {
    title: "Bottlenecks",
    key: "bottlenecks",
    fields: [
      {
        key: "bottleneck" as const,
        label: "What's slowing you down the most?",
        options: [
          "No time to plan or shoot",
          "No confidence on camera",
          "No idea what to say or script",
          "No system to organize or reuse what we make",
        ],
      },
    ],
  },
];

const POINTS: Record<keyof Answers, Record<string, number>> = {
  businessType: { Services: 5, Products: 5, Both: 8, Other: 3 },
  teamSize: { "Just me": 3, "2–5 people": 6, "6–25 people": 9, "26–100 people": 10, "100+": 10 },
  videoHabits: {
    "We don't use video at all": 2,
    "We post occasionally, with no real plan": 5,
    "We post consistently but it feels scattered": 8,
    "We have a working system already": 10,
  },
  goal: {
    "Get more visibility on social media": 6,
    "Build trust and authority with prospects": 6,
    "Stop repeating the same explanations to customers or staff": 6,
    "Tie everything into one measurable system": 8,
  },
  bottleneck: {
    "No time to plan or shoot": 5,
    "No confidence on camera": 5,
    "No idea what to say or script": 5,
    "No system to organize or reuse what we make": 4,
  },
};

const MAX_POINTS = 10 + 10 + 10 + 8 + 5;

const RECOMMENDATIONS = [
  {
    match: (a: Answers) => a.goal === "Get more visibility on social media",
    pal: "Reel Pal",
    path: "/reel-pal",
    body: "You need momentum and reach. Reel Pal builds short-form content engineered for the platforms your audience already scrolls — hooks, cuts, and calls-to-action that convert attention into action.",
  },
  {
    match: (a: Answers) => a.goal === "Build trust and authority with prospects",
    pal: "Spotlight Pal",
    path: "/spotlight-pal",
    body: "You need proof, not more noise. Spotlight Pal produces professional brand stories that showcase your team, culture, and expertise to build lasting trust.",
  },
  {
    match: (a: Answers) => a.goal === "Stop repeating the same explanations to customers or staff",
    pal: "Evergreen Pal",
    path: "/evergreen-pal",
    body: "You need reusable assets. Evergreen Pal turns your FAQs, onboarding, and training into timeless videos that work 24/7 without repeating yourself.",
  },
  {
    match: (a: Answers) => a.goal === "Tie everything into one measurable system",
    pal: "System Pal",
    path: "/system-pal",
    body: "You need an ecosystem, not a one-off. System Pal ties production, distribution, and measurement into a scalable content machine.",
  },
];

function recommendationFor(answers: Answers) {
  return RECOMMENDATIONS.find((r) => r.match(answers)) ?? RECOMMENDATIONS[3];
}

function scoreFor(answers: Answers) {
  let total = 0;
  (Object.keys(answers) as (keyof Answers)[]).forEach((key) => {
    const value = answers[key];
    if (value) total += POINTS[key][value] ?? 0;
  });
  return Math.round((total / MAX_POINTS) * 100);
}

function tierFor(score: number) {
  if (score >= 80)
    return {
      label: "System-Ready",
      body: "You're primed to build a full video ecosystem right now.",
    };
  if (score >= 55)
    return {
      label: "Building Momentum",
      body: "You have real traction — a focused system will multiply it.",
    };
  return {
    label: "Early Stage",
    body: "You're at the perfect point to build the right foundation before scaling.",
  };
}

export const Route = createFileRoute("/video-system-assessment")({
  head: () => ({
    meta: [
      { title: "Free Video System Assessment | Palmer House Productions" },
      {
        name: "description",
        content:
          "Answer a few quick questions and get a personalized readiness score, strategic breakdown, and tailored video system recommendation in under 2 minutes.",
      },
      { property: "og:title", content: "How Ready Is Your Business for a Video System?" },
      {
        property: "og:description",
        content: "Take the free 4-step Palmer House video system assessment.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssessmentPage,
});

function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [done, setDone] = useState(false);

  const totalSteps = STEPS.length;
  const percent = Math.round(((step + 1) / totalSteps) * 100);

  function select(key: keyof Answers, value: string) {
    setAnswers((a) => ({ ...a, [key]: value }));
  }

  function currentStepComplete() {
    return STEPS[step].fields.every((f) => answers[f.key]);
  }

  function handleContinue() {
    if (!currentStepComplete()) return;
    if (step === totalSteps - 1) {
      setDone(true);
    } else {
      setStep((s) => s + 1);
    }
  }

  function handleBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function restart() {
    setAnswers(EMPTY);
    setStep(0);
    setDone(false);
  }

  if (done) {
    const score = scoreFor(answers);
    const tier = tierFor(score);
    const rec = recommendationFor(answers);
    return (
      <PageShell>
        <Section
          eyebrow="Your Results"
          title="How Ready Is Your Business for a Video System?"
          subtitle="Here's your personalized readiness score and recommendation."
        >
          <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 text-center shadow-soft sm:p-10">
            <p className="font-display text-6xl font-extrabold text-gradient-brand">{score}</p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Readiness Score / 100
            </p>
            <div className="mx-auto mt-4 h-2 max-w-sm overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full"
                style={{ width: `${score}%`, backgroundColor: "var(--spotlight)" }}
              />
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold">{tier.label}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{tier.body}</p>

            <div className="mt-8 rounded-2xl border border-border bg-background p-6 text-left">
              <Eyebrow>Recommended Lane</Eyebrow>
              <h4 className="mt-3 font-display text-xl font-bold">{rec.pal}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{rec.body}</p>
              <Link
                to={rec.path}
                className="mt-5 inline-block rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow"
                style={{ backgroundColor: "var(--spotlight)" }}
              >
                Explore {rec.pal}
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold shadow-soft"
              >
                Book a Discovery Call
              </Link>
              <button
                onClick={restart}
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-muted-foreground"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        </Section>
      </PageShell>
    );
  }

  const current = STEPS[step];

  return (
    <PageShell>
      <Section
        eyebrow="Free Assessment"
        title="How Ready Is Your Business for a Video System?"
        subtitle="Answer a few quick questions and get a personalized readiness score, a strategic breakdown, and tailored recommendations — all in under 2 minutes."
      >
        <div className="mx-auto max-w-2xl">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>
              Step {step + 1} of {totalSteps}
            </span>
            <span>{percent}% complete</span>
          </div>
          <div className="mb-8 h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${percent}%`, backgroundColor: "var(--spotlight)" }}
            />
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <h2 className="font-display text-xl font-bold">{current.title}</h2>
            <div className="mt-6 space-y-8">
              {current.fields.map((field) => (
                <div key={field.key}>
                  <p className="text-sm font-semibold">{field.label}</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {field.options.map((opt) => {
                      const active = answers[field.key] === opt;
                      return (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => select(field.key, opt)}
                          className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                            active
                              ? "border-transparent text-white shadow-glow"
                              : "border-border bg-background text-foreground hover:border-primary/50"
                          }`}
                          style={active ? { backgroundColor: "var(--spotlight)" } : undefined}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between gap-3">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-muted-foreground disabled:opacity-40"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleContinue}
                disabled={!currentStepComplete()}
                className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-40"
                style={{ backgroundColor: "var(--spotlight)" }}
              >
                {step === totalSteps - 1 ? "See My Results" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
