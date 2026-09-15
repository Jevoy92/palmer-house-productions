import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, MessageCircle, RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Card, CardGrid, CtaBand, PageHero, PageShell, Section } from "@/components/site/PageShell";
import { PalCallout, Scene } from "@/components/site/PalVisuals";
import { Glyph, GlyphBadge, type GlyphName } from "@/components/site/Glyphs";
import { PAL_HEADSHOTS, laneVar } from "@/lib/pal-lanes";
import type { PalName } from "@/lib/studio-model";
import type { PalAccent } from "@/lib/pricing-catalog";
import {
  MISSION_GOALS,
  PAL_FEED,
  PAL_LANES,
  recommendLane,
  type MissionGoal,
} from "@/lib/dream-suite";
import { createSeo } from "@/lib/seo";

type Tool = "mission" | "camera" | "ask";
const TOOL_TABS: { id: Tool; label: string; glyph: GlyphName; lane: PalAccent }[] = [
  { id: "mission", label: "Mission Spinner", glyph: "spark", lane: "reel" },
  { id: "camera", label: "Camera-Ready Check", glyph: "play", lane: "spotlight" },
  { id: "ask", label: "Ask the Pals", glyph: "chat", lane: "system" },
];
const QUIZ = [
  "I can explain my offer in one clean sentence.",
  "I know exactly who one video is meant to help.",
  "I can name a real example instead of speaking in generalities.",
  "I have a quiet place with light in front of me.",
  "I can speak to one person instead of performing for everyone.",
];

const resources: { to: string; title: string; body: string; lane: PalAccent; glyph: GlyphName }[] =
  [
    {
      to: "/video-system-assessment",
      title: "Score your current system",
      body: "Get a readiness tier and lane recommendation.",
      lane: "system",
      glyph: "chart",
    },
    {
      to: "/production-guide",
      title: "Prepare for the shoot",
      body: "Turn camera readiness into a practical day-of checklist.",
      lane: "spotlight",
      glyph: "camera",
    },
    {
      to: "/blog",
      title: "Learn the next skill",
      body: "Browse practical guides from every Pal lane.",
      lane: "evergreen",
      glyph: "library",
    },
  ];

function GamesPage() {
  const [tool, setTool] = useState<Tool>("mission");
  const [goal, setGoal] = useState<MissionGoal>("trust");
  const [answers, setAnswers] = useState<boolean[]>(() => QUIZ.map(() => false));
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState("");
  const [feed, setFeed] = useState([...PAL_FEED].slice(0, 4));
  const result = MISSION_GOALS[goal];
  const score = answers.filter(Boolean).length;
  const activeTab = TOOL_TABS.find((item) => item.id === tool) ?? TOOL_TABS[0];

  useEffect(() => {
    const key = "ph.pals-feed.visit";
    const visit = Number(window.sessionStorage.getItem(key) ?? "0") + 1;
    window.sessionStorage.setItem(key, String(visit));
    const offset = visit % PAL_FEED.length;
    setFeed(Array.from({ length: 4 }, (_, index) => PAL_FEED[(offset + index) % PAL_FEED.length]));
  }, []);

  const recommendation = useMemo(() => (asked ? recommendLane(asked) : null), [asked]);

  return (
    <PageShell>
      <PageHero
        eyebrow="Guided tools"
        title="Play with a real problem."
        highlight="Leave with a useful next step."
        subtitle="These are not arcade games. They are small decision tools for finding a hook, checking shoot readiness, or choosing the right Pal lane."
        ctas={false}
        lane="reel"
        visual={<Scene name="games" priority tags={["Hook", "Ready?", "Pal"]} />}
      />

      <section className="px-4 pb-8 pt-4">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <div>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Start with the tool that matches your question. Nothing is saved or sent; your choices
              only shape the answer on this page.
            </p>
            <div
              className="mt-6 flex gap-2 overflow-x-auto pb-2"
              role="tablist"
              aria-label="Guided tools"
            >
              {TOOL_TABS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={tool === item.id}
                  aria-controls={`${item.id}-tool-panel`}
                  id={`${item.id}-tool-tab`}
                  tabIndex={tool === item.id ? 0 : -1}
                  onClick={() => setTool(item.id)}
                  onKeyDown={(event) => {
                    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                    event.preventDefault();
                    const nextIndex =
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? TOOL_TABS.length - 1
                          : (index + (event.key === "ArrowRight" ? 1 : -1) + TOOL_TABS.length) %
                            TOOL_TABS.length;
                    setTool(TOOL_TABS[nextIndex].id);
                    event.currentTarget.parentElement
                      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
                      [nextIndex]?.focus();
                  }}
                  className={`inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full pl-2 pr-5 font-semibold transition-colors ${tool === item.id ? "bg-ink text-white" : "border border-border bg-card text-muted-foreground hover:text-foreground"}`}
                >
                  <span className="grid size-8 place-items-center rounded-full bg-white">
                    <Glyph name={item.glyph} lane={item.lane} className="size-5" />
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <PalCallout
            pal="ryder"
            compact
            quote="Pick the tool that matches the question you actually have today. A hook, a checklist, or a lane — you only need one to start."
          />
        </div>
      </section>

      <section className="px-4 pb-20">
        <div
          className="mx-auto max-w-6xl rounded-[2.5rem] border border-white/75 p-5 sm:p-10"
          style={{ background: laneVar(activeTab.lane, "-soft") }}
        >
          <div className="mb-6 flex items-center gap-3">
            <GlyphBadge name={activeTab.glyph} lane={activeTab.lane} size="sm" />
            <span
              className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]"
              style={{ color: laneVar(activeTab.lane, "-text") }}
            >
              {activeTab.label}
            </span>
          </div>
          {tool === "mission" && (
            <div
              id="mission-tool-panel"
              role="tabpanel"
              aria-labelledby="mission-tool-tab"
              className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Pick a goal
                </p>
                <div className="mt-4 grid gap-2">
                  {(Object.keys(MISSION_GOALS) as MissionGoal[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setGoal(key)}
                      aria-pressed={goal === key}
                      className={`min-h-14 rounded-2xl px-5 text-left font-semibold ${goal === key ? "bg-white shadow-soft" : "hover:bg-white/60"}`}
                    >
                      {MISSION_GOALS[key].label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-[2rem] bg-white p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-reel-text">
                    Mission generated by {result.lane}
                  </p>
                  <Glyph name="play" lane="reel" className="size-10" />
                </div>
                <h2 className="mt-5 text-3xl font-extrabold">“{result.hook}”</h2>
                <div className="mt-7 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      Shot list
                    </p>
                    <ol className="mt-3 space-y-2">
                      {result.shots.map((shot, index) => (
                        <li key={shot} className="flex gap-3 text-sm">
                          <span className="font-mono text-muted-foreground">0{index + 1}</span>
                          {shot}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      Finish with
                    </p>
                    <p className="mt-3 text-lg font-semibold">{result.cta}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const keys = Object.keys(MISSION_GOALS) as MissionGoal[];
                    setGoal(keys[(keys.indexOf(goal) + 1) % keys.length]);
                  }}
                  className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-semibold"
                >
                  <RefreshCw className="size-4" /> Spin again
                </button>
              </div>
            </div>
          )}

          {tool === "camera" && (
            <div
              id="camera-tool-panel"
              role="tabpanel"
              aria-labelledby="camera-tool-tab"
              className="mx-auto max-w-3xl"
            >
              <h2 className="text-3xl font-extrabold sm:text-5xl">
                Are you ready to press record?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Check what is true today. This is preparation, not a personality test.
              </p>
              <div className="mt-8 divide-y divide-border border-y border-border">
                {QUIZ.map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={answers[index]}
                    onClick={() =>
                      setAnswers((current) =>
                        current.map((value, itemIndex) => (itemIndex === index ? !value : value)),
                      )
                    }
                    className="flex min-h-16 w-full items-center gap-4 py-3 text-left"
                  >
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-full border ${answers[index] ? "border-evergreen bg-evergreen text-white" : "border-border bg-white"}`}
                    >
                      {answers[index] && <Check className="size-4" />}
                    </span>
                    <span className="font-medium">{item}</span>
                  </button>
                ))}
              </div>
              <div className="mt-8 rounded-[2rem] bg-white p-6" aria-live="polite">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    Your readiness · {score}/5
                  </p>
                  <Glyph name="chart" lane="spotlight" className="size-10" />
                </div>
                <h3 className="mt-3 text-2xl font-bold">
                  {score >= 4
                    ? "You are ready. Stop rehearsing and make the first useful take."
                    : score >= 2
                      ? "You are close. Fix the missing conditions before asking for confidence."
                      : "Start with clarity, not a camera. The Pals can help you shape the message first."}
                </h3>
                <Link
                  to={score >= 4 ? "/production-guide" : "/find-your-pal"}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4"
                >
                  Take the next step <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          )}

          {tool === "ask" && (
            <div
              id="ask-tool-panel"
              role="tabpanel"
              aria-labelledby="ask-tool-tab"
              className="grid gap-8 lg:grid-cols-[1fr_0.85fr]"
            >
              <div>
                <h2 className="text-3xl font-extrabold sm:text-5xl">
                  Ask the team, not a blank chatbot.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  This guided matcher listens for the business problem and points you to the right
                  expert lane. It does not pretend to be a human or generative AI.
                </p>
                <label className="mt-8 block">
                  <span className="sr-only">Your question</span>
                  <textarea
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    rows={6}
                    className="w-full rounded-[2rem] border border-border bg-white p-5"
                    placeholder="What keeps happening in your business?"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setAsked(question.trim())}
                  disabled={!question.trim()}
                  className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Ask the Pals <ArrowRight className="size-4" />
                </button>
              </div>
              <div className="rounded-[2rem] bg-white p-6" aria-live="polite">
                {recommendation ? (
                  <>
                    <div className="flex items-end justify-center">
                      {recommendation.people.map((person) => (
                        <img
                          key={person.name}
                          src={person.image}
                          alt={person.name}
                          loading="lazy"
                          decoding="async"
                          className="h-44 w-auto object-contain"
                        />
                      ))}
                    </div>
                    <p
                      className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em]"
                      style={{ color: recommendation.color }}
                    >
                      {recommendation.label} is listening
                    </p>
                    <h3 className="mt-3 text-2xl font-bold">{recommendation.promise}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Start here because: {recommendation.problem}
                    </p>
                    <Link
                      to={recommendation.path}
                      className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4"
                    >
                      Open this lane <ArrowRight className="size-4" />
                    </Link>
                  </>
                ) : (
                  <div className="grid min-h-80 place-items-center text-center text-muted-foreground">
                    <div>
                      <Glyph name="chat" lane="system" className="mx-auto size-20" />
                      <p className="mt-4 inline-flex items-center gap-2">
                        <MessageCircle className="size-4" /> Your Pal match will appear here.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-ink px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
                Fresh from the Pals
              </p>
              <h2 className="mt-2 text-3xl font-extrabold sm:text-5xl">
                A different field note each visit.
              </h2>
            </div>
            <button
              type="button"
              onClick={() =>
                setFeed((current) => [
                  ...current.slice(1),
                  PAL_FEED[Math.floor(Math.random() * PAL_FEED.length)],
                ])
              }
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-semibold"
            >
              <RefreshCw className="size-4" /> Refresh feed
            </button>
          </div>
          <div className="mt-8 grid gap-px overflow-hidden rounded-[2rem] bg-white/15 sm:grid-cols-2">
            {feed.map((item, index) => {
              const lane = PAL_LANES.find((candidate) => candidate.key === item.lane)!;
              const palKey = item.pal.toLowerCase() as PalName;
              return (
                <article key={`${item.pal}-${index}`} className="flex min-h-52 gap-5 bg-ink p-6">
                  <span
                    className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-full"
                    style={{ background: lane.soft }}
                  >
                    <img
                      src={PAL_HEADSHOTS[palKey]}
                      alt={item.pal}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover mix-blend-multiply"
                    />
                  </span>
                  <div>
                    <span
                      className="font-mono text-[11px] uppercase tracking-[0.18em]"
                      style={{ color: lane.color }}
                    >
                      {item.pal} · {lane.label}
                    </span>
                    <p className="mt-4 text-xl font-semibold leading-snug">“{item.text}”</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Section
        tone="mist"
        eyebrow="Use the answer"
        title="Continue with the resource that fits."
        align="left"
      >
        <CardGrid cols={3}>
          {resources.map((item) => (
            <Card
              key={item.to}
              title={item.title}
              body={item.body}
              to={item.to}
              lane={item.lane}
              glyph={item.glyph}
            />
          ))}
        </CardGrid>
      </Section>

      <CtaBand
        title="Want a human read on the problem?"
        subtitle="Bring your result—or the messier version behind it—to a discovery call. We’ll help you choose the next useful move."
        primaryLabel="Book a Discovery Call"
        lane="reel"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/games")({
  head: () => ({
    ...createSeo({
      title: "Games & Guided Tools | Palmer House Productions",
      description:
        "Use the Palmer House mission spinner, camera-ready check, Pal matcher, and fresh field-note feed.",
      pathname: "/games",
    }),
  }),
  component: GamesPage,
});
