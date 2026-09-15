import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import {
  CtaBand,
  Eyebrow,
  IncludedPanel,
  PageHero,
  PageShell,
  Section,
} from "@/components/site/PageShell";
import { PalCallout, PalDuo, Scene, StatBand } from "@/components/site/PalVisuals";
import type { PalAccent } from "@/lib/pricing-catalog";
import { createSeo } from "@/lib/seo";

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
    ...createSeo({
      title: "Free Video System Assessment | Palmer House Productions",
      description:
        "Answer a few quick questions and get a personalized readiness score, strategic breakdown, and tailored video system recommendation in under 2 minutes.",
      pathname: "/video-system-assessment",
    }),
  }),
  component: AssessmentPage,
});

function AssessmentPage() {
  const reduce = useReducedMotion();
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
    const laneKey = rec.pal.split(" ")[0].toLowerCase() as PalAccent;
    return (
      <PageShell>
        <PageHero
          eyebrow="Your assessment result"
          title={`You’re ${tier.label.toLowerCase()}.`}
          highlight={`${score}/100 ready.`}
          subtitle={tier.body}
          ctas={false}
          lane={laneKey}
        >
          <div className="rounded-[2.5rem] border border-white/80 bg-white p-7 shadow-soft sm:p-9">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Video-system readiness
                </p>
                <p className="mt-2 text-7xl font-extrabold tracking-[-0.06em]">{score}</p>
              </div>
              <span
                className="grid size-14 place-items-center rounded-full text-white"
                style={{ background: `var(--${laneKey})` }}
              >
                <Sparkles className="size-6" />
              </span>
            </div>
            <div
              className="mt-6 h-3 overflow-hidden rounded-full bg-secondary"
              role="progressbar"
              aria-label="Readiness score"
              aria-valuenow={score}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                initial={reduce ? false : { transform: "scaleX(0)" }}
                animate={{ transform: `scaleX(${score / 100})` }}
                transition={{ duration: reduce ? 0 : 0.7, ease: "easeOut" }}
                className="h-full origin-left rounded-full"
                style={{ background: `var(--${laneKey})` }}
              />
            </div>
            <p className="mt-3 text-sm font-bold">{tier.label}</p>
          </div>
        </PageHero>

        <Section
          eyebrow="Your strongest next move"
          title={`${rec.pal} matches the outcome you chose.`}
          subtitle="This recommendation is a practical starting point based on your answers—not a fixed diagnosis."
        >
          <StatBand
            stats={[
              { value: score, suffix: "/100", label: "readiness score", lane: laneKey },
              { value: tier.label, label: "system tier", lane: "evergreen" },
              { value: rec.pal, label: "recommended lane", lane: laneKey },
              { value: 5, label: "questions answered", lane: "system" },
            ]}
          />
          <div className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-[1.1fr_.9fr]">
            <div
              className="rounded-[2.25rem] border p-7 shadow-soft sm:p-9"
              style={{
                borderColor: `color-mix(in srgb, var(--${laneKey}) 25%, var(--border))`,
                background: `color-mix(in srgb, var(--${laneKey}-soft) 60%, white)`,
              }}
            >
              <Eyebrow lane={laneKey}>Recommended Lane</Eyebrow>
              <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.045em]">{rec.pal}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{rec.body}</p>
              <Link
                to={rec.path}
                className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full px-6 text-sm font-bold text-white shadow-soft"
                style={{ background: `var(--${laneKey})` }}
              >
                Explore {rec.pal} <ArrowRight className="size-4" />
              </Link>
            </div>
            <PalDuo lane={laneKey} />
          </div>
        </Section>

        <Section tone="mist" eyebrow="What you told us" title="Your answers, in one place.">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <PalCallout
              pal="silas"
              quote="A score is a starting point, not a verdict. Bring these answers to a call and we will pressure-test the lane, the scope, and the timing together."
              action={{ label: "Book a discovery call", to: "/contact" }}
            />
            <div className="rounded-[2.25rem] border border-border bg-card p-7 shadow-soft">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Your answers
              </p>
              <dl className="mt-5 space-y-4">
                {[
                  ["Business", answers.businessType],
                  ["Team", answers.teamSize],
                  ["Current use", answers.videoHabits],
                  ["Priority", answers.goal],
                  ["Bottleneck", answers.bottleneck],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-border pb-3 last:border-0">
                    <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="primary-action">
              Book a Discovery Call
            </Link>
            <button onClick={restart} type="button" className="secondary-action">
              <RotateCcw className="size-4" /> Retake Assessment
            </button>
          </div>
        </Section>

        <CtaBand
          title="Turn the recommendation into a production plan."
          subtitle="Bring your result to a discovery call and we’ll pressure-test the lane, scope, and timing with you."
          primaryLabel="Book a Discovery Call"
          lane={laneKey}
        />
      </PageShell>
    );
  }

  const current = STEPS[step];

  return (
    <PageShell>
      <PageHero
        eyebrow="Free two-minute assessment"
        title="How ready is your business"
        highlight="for a video system?"
        subtitle="Answer five practical questions to get a readiness score, a plain-language breakdown, and the Palmer House lane that best matches your goal."
        ctas={false}
        lane="system"
        visual={
          <Scene
            name="assessment"
            priority
            tags={["Readiness score", "System tier", "Recommended Pal"]}
          />
        }
      />

      <Section tone="system">
        <IncludedPanel
          headingLevel={2}
          title="What you’ll get in under two minutes."
          items={["Readiness score", "System tier", "Recommended Pal", "Clear next step"]}
          lane="system"
          glyph="search"
          tone="paper"
        />
      </Section>

      <Section
        eyebrow="Your assessment"
        title="Choose the answer that is true today."
        subtitle="There are no perfect answers. The score is only useful when it reflects how your team actually works."
      >
        <div className="mx-auto max-w-3xl">
          <ol className="mb-6 grid grid-cols-4 gap-2" aria-label="Assessment progress">
            {STEPS.map((item, index) => (
              <li
                key={item.key}
                aria-current={index === step ? "step" : undefined}
                className={`h-2 rounded-full transition-colors ${
                  index < step ? "bg-evergreen" : index === step ? "bg-system" : "bg-secondary"
                }`}
              >
                <span className="sr-only">
                  {item.title}:{" "}
                  {index < step ? "complete" : index === step ? "current" : "upcoming"}
                </span>
              </li>
            ))}
          </ol>
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
            <span>
              Step {step + 1} of {totalSteps}
            </span>
            <span>{percent}% complete</span>
          </div>
          <div
            className="mb-8 h-2 overflow-hidden rounded-full bg-secondary"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <motion.div
              className="h-full origin-left rounded-full"
              animate={{ transform: `scaleX(${percent / 100})` }}
              transition={{ duration: reduce ? 0 : 0.35, ease: "easeOut" }}
              style={{ backgroundColor: "var(--system)" }}
            />
          </div>

          <p className="sr-only" aria-live="polite">
            Step {step + 1} of {totalSteps}: {current.title}
          </p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.key}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -18 }}
              transition={{ duration: reduce ? 0 : 0.22 }}
              className="rounded-[2.25rem] border border-border bg-card p-6 shadow-soft sm:p-9"
            >
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-system-text">
                Step {step + 1}
              </p>
              <h2 className="mt-2 text-2xl font-extrabold">{current.title}</h2>
              <div className="mt-7 space-y-8">
                {current.fields.map((field) => (
                  <fieldset key={field.key}>
                    <legend id={`assessment-${field.key}-label`} className="text-base font-bold">
                      {field.label}
                    </legend>
                    <div
                      className="mt-3 grid gap-3 sm:grid-cols-2"
                      role="radiogroup"
                      aria-labelledby={`assessment-${field.key}-label`}
                    >
                      {field.options.map((opt) => {
                        const active = answers[field.key] === opt;
                        return (
                          <button
                            type="button"
                            key={opt}
                            role="radio"
                            aria-checked={active}
                            tabIndex={active || !answers[field.key] ? 0 : -1}
                            onClick={() => select(field.key, opt)}
                            onKeyDown={(event) => {
                              if (
                                ![
                                  "ArrowLeft",
                                  "ArrowRight",
                                  "ArrowUp",
                                  "ArrowDown",
                                  "Home",
                                  "End",
                                ].includes(event.key)
                              )
                                return;
                              event.preventDefault();
                              const options = field.options;
                              const currentIndex = options.indexOf(opt);
                              const forward =
                                event.key === "ArrowRight" || event.key === "ArrowDown";
                              const nextIndex =
                                event.key === "Home"
                                  ? 0
                                  : event.key === "End"
                                    ? options.length - 1
                                    : (currentIndex + (forward ? 1 : -1) + options.length) %
                                      options.length;
                              select(field.key, options[nextIndex]);
                              event.currentTarget.parentElement
                                ?.querySelectorAll<HTMLButtonElement>('[role="radio"]')
                                [nextIndex]?.focus();
                            }}
                            className={`min-h-14 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                              active
                                ? "border-system bg-system-soft text-foreground shadow-soft"
                                : "border-border bg-background text-foreground hover:border-system/50"
                            }`}
                          >
                            <span className="flex items-center justify-between gap-3">
                              {opt}
                              {active && (
                                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-system text-white">
                                  <Check className="size-3.5" />
                                </span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
              </div>

              <div className="mt-8 border-t border-border pt-6">
                {!currentStepComplete() && (
                  <p className="mb-3 text-right text-xs font-semibold text-muted-foreground">
                    Choose {current.fields.length === 1 ? "an answer" : "both answers"} to continue.
                  </p>
                )}
                <div className="flex justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={step === 0}
                    className="secondary-action disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleContinue}
                    disabled={!currentStepComplete()}
                    className="primary-action disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    {step === totalSteps - 1 ? "See My Results" : "Continue"}{" "}
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-10">
            <PalCallout
              pal="silas"
              compact
              quote="Answer for how the team actually works today, not how you hope it will work next quarter. The honest score is the useful one."
            />
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
