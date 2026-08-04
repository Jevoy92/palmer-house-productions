import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clapperboard, FileStack, Gauge, Sparkles } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";

const sprint = [
  {
    days: "Day 1",
    title: "Teach the Studio your business.",
    body: "Add the audience, offer, voice, approved proof, calls to action, and language to avoid.",
    icon: Gauge,
    color: "var(--spotlight)",
  },
  {
    days: "Day 2",
    title: "Build one complete campaign.",
    body: "Choose the business job and one useful idea. Generate the strategy, scripts, production plan, and calendar together.",
    icon: Sparkles,
    color: "var(--reel)",
  },
  {
    days: "Days 3–5",
    title: "Make the work true to you.",
    body: "Edit scripts, copy assets into existing workflows, get teammate approval, and adjust publishing dates.",
    icon: FileStack,
    color: "var(--system)",
  },
  {
    days: "Days 6–7",
    title: "Decide how it gets produced.",
    body: "Film from the shot plan, hand it to your crew, or request Palmer House support from the campaign.",
    icon: Clapperboard,
    color: "var(--evergreen)",
  },
];
function SprintPage() {
  return (
    <PageShell>
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-system">
              Seven-day guided sprint
            </p>
            <h1 className="mx-auto mt-5 max-w-[12ch] text-5xl font-extrabold leading-[.92] tracking-[-.065em] sm:text-7xl">
              Leave with a campaign, not a tour.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              The free sprint gives you one complete campaign and the whole workflow around it. No
              card is required to begin.
            </p>
            <Link to="/studio" className="primary-action mt-8 min-h-13 rounded-full px-7">
              Start the sprint <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {sprint.map((item, index) => (
              <article
                key={item.days}
                className="min-h-80 rounded-[2rem] border border-border bg-white p-7"
              >
                <span
                  className="grid size-12 place-items-center rounded-2xl text-white"
                  style={{ background: item.color }}
                >
                  <item.icon className="size-5" />
                </span>
                <p className="mt-12 font-mono text-[9px] uppercase tracking-[.17em] text-muted-foreground">
                  {item.days} · 0{index + 1}
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-[-.045em]">{item.title}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 rounded-[2.5rem] bg-ink p-8 text-white sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-center">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[.2em] text-white/45">
                  What you keep
                </p>
                <h2 className="mt-5 text-4xl font-extrabold tracking-[-.05em]">
                  Your work remains yours.
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-white/60">
                  Download the scripts, campaign plan, and calendar before the sprint ends. Upgrade
                  only if the connected workspace is worth keeping.
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  "One complete campaign system",
                  "Editable scripts and written assets",
                  "A filmable production plan",
                  "An exportable publishing calendar",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="size-5 text-system" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
export const Route = createFileRoute("/membership/sprint")({
  head: () => ({
    meta: [
      { title: "Seven-Day Studio Sprint — Palmer House" },
      {
        name: "description",
        content:
          "Build a complete, production-ready campaign during a guided seven-day Palmer House Studio sprint.",
      },
    ],
  }),
  component: SprintPage,
});
