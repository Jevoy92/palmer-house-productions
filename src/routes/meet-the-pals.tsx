import { createFileRoute } from "@tanstack/react-router";
import { MissionComparison } from "@/components/site/MissionComparison";
import { CtaBand, PageHero, PageShell, Section } from "@/components/site/PageShell";
import { PalBookingStrip } from "@/components/site/PalBookingStrip";
import { LaneTiles, PalCallout, PalCrew, PalRoster } from "@/components/site/PalVisuals";
import { createSeo } from "@/lib/seo";

function MeetThePals() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Meet the Palmer House Pals"
        title="Start with the problem."
        highlight="Meet the right pair."
        subtitle="Eight specialists. Four video lanes. Choose what your business needs to solve, then build the package around it."
        lane="spotlight"
        primary={{ label: "Find Your Pal", to: "/find-your-pal" }}
        secondary={{ label: "Build Your Package", to: "/production-pricing" }}
      >
        <div className="relative min-h-[22rem]">
          <span className="absolute left-2 top-2 z-10 rounded-full bg-white px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-spotlight-text shadow-soft">
            8 specialists · 4 lanes
          </span>
          <PalCrew className="pt-10" />
        </div>
      </PageHero>

      <Section
        eyebrow="Four lanes"
        title="Every Pal pair owns one business problem."
        subtitle="Pick the friction you feel most, then meet the two specialists built to remove it."
        lane="spotlight"
      >
        <LaneTiles ctaLabel="Meet" />
      </Section>

      <div className="bg-mist px-4">
        <div className="mx-auto max-w-6xl">
          <PalBookingStrip embedded />
        </div>
      </div>

      <Section
        eyebrow="The roster"
        title="Eight specialists, one shared production standard."
        subtitle="Every Pal works from the same session pricing and the same included production kit. What changes is the job the video is asked to do."
        lane="evergreen"
      >
        <PalRoster />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <PalCallout
            pal="kiana"
            quote="Tell me what a video is supposed to change for your business and I can tell you which lane it belongs in — before we talk about cameras."
            action={{ label: "Find your Pal", to: "/find-your-pal" }}
          />
          <PalCallout
            pal="silas"
            quote="One production day should feed a month of publishing. Plan it that way and the price per finished video drops fast."
            action={{ label: "See how sessions stack", to: "/production-pricing" }}
          />
        </div>
      </Section>

      <MissionComparison />

      <CtaBand
        title="Not sure which lane fits?"
        subtitle="Answer a few problem-first questions and get a Pal recommendation connected to a real starter package."
        primaryLabel="Find your Pal"
        primaryTo="/find-your-pal"
        secondaryLabel="Book a Discovery Call"
        secondaryTo="/contact"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/meet-the-pals")({
  head: () => ({
    ...createSeo({
      title: "Meet the Pals | Palmer House Productions",
      description:
        "Meet the eight Palmer House Pals and choose the video lane built for visibility, trust, clear explanations, or training and scale.",
      pathname: "/meet-the-pals",
    }),
  }),
  component: MeetThePals,
});
