import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { MissionComparison } from "@/components/site/MissionComparison";
import { Card, CardGrid, CtaBand, PageHero, PageShell, Section } from "@/components/site/PageShell";
import { PalCallout, PalCrew, PalDuo, PalRoster } from "@/components/site/PalVisuals";
import { GlyphBadge } from "@/components/site/Glyphs";
import { laneById, laneVar } from "@/lib/pal-lanes";
import { PAL_GROUPS } from "@/lib/pricing-catalog";
import { createSeo } from "@/lib/seo";

const outcomes = {
  reel: "Get seen with a reliable short-form publishing rhythm.",
  spotlight: "Build trust with founder stories, client proof, and premium presence.",
  evergreen: "Explain clearly with long-form content that keeps answering.",
  system: "Train and scale with onboarding, SOP, and internal knowledge libraries.",
} as const;

function PalsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Pal Lane Guide"
        title="Four lanes."
        highlight="One problem-first system."
        subtitle="This guide explains how each Pal lane works. If you want to browse the eight specialists directly, visit Meet the Pals."
        lane="spotlight"
        primary={{ label: "Meet the Pals", to: "/meet-the-pals" }}
        secondary={{ label: "Find Your Pal", to: "/find-your-pal" }}
        visual={<PalCrew className="w-full" />}
      />

      <Section
        eyebrow="Choose an outcome"
        title="The lane is the strategy. The Pals are your guides."
        subtitle="Every package, recommendation, and add-on maps back to one of these four jobs."
        lane="spotlight"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {PAL_GROUPS.map((group, index) => {
            const lane = laneById[group.accent];
            return (
              <article
                key={group.id}
                className="surface-card group grid min-h-72 overflow-hidden lg:grid-cols-[1fr_16rem]"
              >
                <div className="flex flex-col p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <GlyphBadge name={lane.glyph} lane={group.accent} size="sm" />
                    <p
                      className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: laneVar(group.accent, "-text") }}
                    >
                      Lane {String(index + 1).padStart(2, "0")} · {group.role}
                    </p>
                  </div>
                  <h3 className="mt-4 text-3xl font-extrabold">{group.tagline}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{outcomes[group.id]}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
                    <Link
                      to={`/${group.id}-pal`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white"
                    >
                      Explore {group.role} <ArrowRight className="size-4" />
                    </Link>
                    <span className="text-sm font-semibold text-muted-foreground">
                      {group.palName}
                    </span>
                  </div>
                </div>
                <PalDuo
                  lane={group.accent}
                  labels={lane.outputs.slice(0, 2)}
                  minHeight="min-h-[16rem]"
                  className="m-4 lg:ml-0"
                />
              </article>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link to="/meet-the-pals" className="secondary-action">
            Meet all eight Pals <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      <Section
        tone="mist"
        eyebrow="How to choose"
        title="Match the lane to the friction, not the format."
        subtitle="Start with what keeps happening in the business. The format follows."
        lane="evergreen"
      >
        <CardGrid cols={4}>
          <Card
            lane="reel"
            glyph="reel"
            title="People don’t know we exist"
            body="Visibility is the bottleneck. Reel Pal builds a short-form rhythm that keeps you in front of the right audience."
            to="/reel-pal"
          />
          <Card
            lane="spotlight"
            glyph="camera"
            title="We look smaller than we are"
            body="Perception is the bottleneck. Spotlight Pal makes quality visible before the first call."
            to="/spotlight-pal"
          />
          <Card
            lane="evergreen"
            glyph="library"
            title="We explain the same thing weekly"
            body="Repeated explanation is the bottleneck. Evergreen Pal answers it once and keeps it working."
            to="/evergreen-pal"
          />
          <Card
            lane="system"
            glyph="workflow"
            title="Knowledge lives in people’s heads"
            body="Internal chaos is the bottleneck. System Pal turns onboarding and SOPs into a library."
            to="/system-pal"
          />
        </CardGrid>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <PalCallout
            pal="clara"
            quote="If a customer has to ask twice, that is a video waiting to be made."
            action={{ label: "Explore Evergreen Pal", to: "/evergreen-pal" }}
          />
          <PalCallout
            pal="ryder"
            quote="Momentum beats perfection. Publish something this week."
            action={{ label: "Explore Reel Pal", to: "/reel-pal" }}
          />
        </div>
      </Section>

      <Section
        eyebrow="The specialists"
        title="Two Pals per lane. Eight ways to help."
        subtitle="Each pair covers the strategy and the craft their lane needs."
        lane="system"
      >
        <PalRoster />
      </Section>

      <MissionComparison />

      <CtaBand
        title="Still deciding between two lanes?"
        subtitle="Use the Pal finder for a recommendation or book a call and we will shape the package around the actual problem."
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/pals")({
  head: () => ({
    ...createSeo({
      title: "Pal Video Lane Guide | Palmer House Productions",
      description:
        "Compare Reel, Spotlight, Evergreen, and System Pal video lanes for visibility, trust, authority, onboarding, and training.",
      pathname: "/pals",
    }),
  }),
  component: PalsPage,
});
