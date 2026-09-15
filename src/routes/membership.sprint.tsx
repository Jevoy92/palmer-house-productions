import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { InView, PageHero, PageShell, Section } from "@/components/site/PageShell";
import { PalCallout, ProcessTimeline } from "@/components/site/PalVisuals";
import { Glyph } from "@/components/site/Glyphs";
import { createSeo } from "@/lib/seo";

const sprint = [
  {
    title: "Day 1 — Teach the Studio your business.",
    body: "Add the audience, offer, voice, approved proof, calls to action, and language to avoid.",
    glyph: "bulb",
    lane: "spotlight",
  },
  {
    title: "Day 2 — Build one complete campaign.",
    body: "Choose the business job and one useful idea. Generate the strategy, scripts, production plan, and calendar together.",
    glyph: "spark",
    lane: "reel",
  },
  {
    title: "Days 3–5 — Make the work true to you.",
    body: "Edit scripts, copy assets into existing workflows, get teammate approval, and adjust publishing dates.",
    glyph: "edit",
    lane: "system",
  },
  {
    title: "Days 6–7 — Decide how it gets produced.",
    body: "Film from the shot plan, hand it to your crew, or request Palmer House support from the campaign.",
    glyph: "camera",
    lane: "evergreen",
  },
] as const;

function SprintPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Palmer House Studio · seven-day sprint"
        title="Leave with a campaign,"
        highlight="not a tour."
        subtitle="The free sprint gives you one complete campaign and the whole workflow around it. No card is required to begin."
        lane="system"
        pal="system"
        palTags={["One complete campaign", "Filmable production plan", "Exportable calendar"]}
        primary={{ label: "Start your free sprint", to: "/studio" }}
        secondary={{ label: "Compare Studio plans", to: "/membership/pricing" }}
      />

      <Section
        tone="mist"
        eyebrow="Seven days, four moves"
        title="Every day hands something finished to the next."
        subtitle="Samira guides the sprint so the campaign is real by the end of the week — not a demo you toured."
      >
        <ProcessTimeline steps={[...sprint]} />
        <div className="mx-auto mt-12 max-w-3xl">
          <PalCallout
            pal="samira"
            quote="Set up the brand memory once, build one complete campaign, and edit it with your team. By day seven you have a production-ready plan — whether or not you upgrade."
            action={{ label: "Start your free sprint", to: "/studio" }}
          />
        </div>
      </Section>

      <Section
        lane="system"
        eyebrow="What you keep"
        title="Your work remains yours."
        subtitle="Download the scripts, campaign plan, and calendar before the sprint ends. Upgrade only if the connected workspace is worth keeping."
      >
        <InView className="rounded-[2.5rem] bg-ink p-8 text-white sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div className="flex flex-col items-start">
              <Glyph name="library" lane="system" className="size-20" />
              <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[.16em] text-white/60">
                Yours to export
              </p>
              <h3 className="mt-3 text-3xl font-extrabold tracking-[-.05em] sm:text-4xl">
                Everything the sprint produced leaves with you.
              </h3>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                "One complete campaign system",
                "Editable scripts and written assets",
                "A filmable production plan",
                "An exportable publishing calendar",
              ].map((item) => (
                <li
                  key={item}
                  className="flex min-h-16 items-center gap-3 rounded-[1.25rem] bg-white/8 p-4"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-system text-white">
                    <Check className="size-4" />
                  </span>
                  <span className="text-sm font-semibold sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-9 flex flex-wrap gap-3 border-t border-white/15 pt-8">
            <Link
              to="/studio"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-bold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Start your free sprint <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/membership/pricing"
              className="inline-flex min-h-12 items-center rounded-full border border-white/30 px-6 font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              Compare Studio plans
            </Link>
          </div>
        </InView>
      </Section>
    </PageShell>
  );
}
export const Route = createFileRoute("/membership/sprint")({
  head: () => ({
    ...createSeo({
      title: "Seven-Day Studio Sprint — Palmer House",
      description:
        "Build a complete, production-ready campaign during a guided seven-day Palmer House Studio sprint.",
      pathname: "/membership/sprint",
    }),
  }),
  component: SprintPage,
});
