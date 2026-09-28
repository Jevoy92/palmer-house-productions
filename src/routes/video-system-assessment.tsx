import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, Copy, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PageHero, PageShell, Section } from "@/components/site/PageShell";
import { PalCallout, Scene } from "@/components/site/PalVisuals";
import { useHydratedReducedMotion } from "@/hooks/use-hydrated-reduced-motion";
import {
  assessmentRecommendation,
  assessmentBrief,
  type AssessmentAnswers,
} from "@/lib/public-resources";
import { createSeo } from "@/lib/seo";
const EMPTY: AssessmentAnswers = {
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
          "Organize onboarding, training and repeatable processes",
          "Share our expertise through longer educational videos",
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

function AssessmentPage() {
  const reduce = useHydratedReducedMotion();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>(EMPTY);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState("");
  const mounted = useRef(false);
  const previousStep = useRef({ step, done });
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (previousStep.current.step === step && previousStep.current.done === done) return;
    previousStep.current = { step, done };
    const heading = document.getElementById(done ? "assessment-result" : "assessment-step");
    heading?.focus();
    heading?.scrollIntoView({ block: "start", behavior: reduce ? "instant" : "smooth" });
  }, [step, done, reduce]);
  const complete = STEPS[step].fields.every((f) => Boolean(answers[f.key]));
  const rec = assessmentRecommendation(answers);
  async function copy() {
    try {
      await navigator.clipboard.writeText(assessmentBrief(answers));
      setCopied("Your brief is copied. Paste it into Studio or share it with your team.");
    } catch {
      setCopied("Copy is unavailable. Select the summary text below to copy it.");
    }
  }
  function reset() {
    setAnswers(EMPTY);
    setStep(0);
    setDone(false);
    setCopied("");
  }
  return (
    <PageShell>
      {done ? (
        <>
          <PageHero
            eyebrow="Your video starting point"
            title="A clearer next step."
            subtitle="Here’s a suggested path based on your goal and what is getting in the way. Keep the brief to continue with our team or in Studio."
            ctas={false}
            lane={rec.lane}
          />
          <Section>
            <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
              <article className="surface-card p-6 sm:p-9">
                <img
                  src={`/packages/lanes/${rec.lane}.png`}
                  width={64}
                  height={64}
                  alt=""
                  className="mb-5"
                />
                <h2
                  id="assessment-result"
                  tabIndex={-1}
                  className="scroll-mt-32 text-3xl font-bold"
                >
                  {rec.title}
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{rec.body}</p>
                <p className="mt-5 text-sm font-semibold">
                  Video category to explore: {rec.category}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={rec.path}
                    search={rec.intent === "production" ? { lane: rec.lane } : {}}
                    className="primary-action"
                  >
                    {rec.intent === "preparation"
                      ? "Explore preparation help"
                      : rec.intent === "studio"
                        ? "Explore Studio"
                        : "See relevant packages"}
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link
                    to="/contact"
                    search={{ intent: rec.intent, context: assessmentBrief(answers) }}
                    className="secondary-action"
                  >
                    Discuss this with the team
                  </Link>
                </div>
                <p className="mt-5 text-sm text-muted-foreground">
                  This is a guide based on what you told us. It does not measure your business or
                  commit you to a service.
                </p>
              </article>
              <article className="surface-card p-6 sm:p-9">
                <h3 className="text-xl font-bold">Your brief</h3>
                <dl className="mt-5 space-y-4">
                  {[
                    ["Business", answers.businessType],
                    ["Team", answers.teamSize],
                    ["Current video use", answers.videoHabits],
                    ["Goal", answers.goal],
                    ["Main obstacle", answers.bottleneck],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="mt-1 text-sm">{value}</dd>
                    </div>
                  ))}
                </dl>
                <button type="button" onClick={() => void copy()} className="secondary-action mt-6">
                  <Copy className="size-4" />
                  Copy your brief
                </button>
                {copied && (
                  <p role="status" className="mt-3 text-sm">
                    {copied}
                  </p>
                )}
              </article>
            </div>
            <button type="button" onClick={reset} className="secondary-action mt-6">
              <RotateCcw className="size-4" />
              Start again
            </button>
          </Section>
        </>
      ) : (
        <>
          <PageHero
            eyebrow="A short guide to your next step"
            title="What would make"
            highlight="video easier for you?"
            subtitle="Answer five questions about your business, goal and what is getting in the way. We’ll suggest where to start. Your answers stay on this page unless you choose to share them."
            ctas={false}
            lane="system"
            visual={
              <Scene
                name="assessment"
                tags={["Your goal", "Your obstacle", "A useful next step"]}
              />
            }
          />
          <Section>
            <div className="mx-auto max-w-3xl surface-card p-6 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Step {step + 1} of {STEPS.length}
              </p>
              <div
                className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary"
                aria-hidden="true"
              >
                <div
                  className="h-full bg-ink motion-safe:transition-all"
                  style={{ width: `${(step / STEPS.length) * 100}%` }}
                />
              </div>
              <h2
                id="assessment-step"
                tabIndex={-1}
                className="mt-7 scroll-mt-32 text-3xl font-bold"
              >
                {STEPS[step].title}
              </h2>
              <div className="mt-6 space-y-7">
                {STEPS[step].fields.map((field) => (
                  <fieldset key={field.key}>
                    <legend className="mb-3 font-semibold">{field.label}</legend>
                    <div className="grid gap-2">
                      {field.options.map((option) => (
                        <label
                          key={option}
                          className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border p-4 ${answers[field.key] === option ? "border-ink bg-secondary" : "border-border bg-card"}`}
                        >
                          <input
                            type="radio"
                            name={field.key}
                            value={option}
                            checked={answers[field.key] === option}
                            onChange={() => setAnswers((a) => ({ ...a, [field.key]: option }))}
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ))}
              </div>
              <div className="mt-8 flex justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="secondary-action disabled:opacity-40"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </button>
                <button
                  type="button"
                  disabled={!complete}
                  onClick={() =>
                    step === STEPS.length - 1 ? setDone(true) : setStep((s) => s + 1)
                  }
                  className="primary-action disabled:opacity-40"
                >
                  {step === STEPS.length - 1 ? "See my starting point" : "Continue"}
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
            <div className="mx-auto mt-7 max-w-3xl">
              <PalCallout
                pal="samira"
                quote="You don’t need to know the name of a package. Start with the part that would make your day easier."
              />
            </div>
          </Section>
        </>
      )}
    </PageShell>
  );
}
export const Route = createFileRoute("/video-system-assessment")({
  head: () =>
    createSeo({
      title: "Find Your Video Starting Point | Palmer House Productions",
      description:
        "Answer five questions to find a useful next step: production, Studio tools, or planning and shoot preparation. No score or booking required.",
      pathname: "/video-system-assessment",
    }),
  component: AssessmentPage,
});
