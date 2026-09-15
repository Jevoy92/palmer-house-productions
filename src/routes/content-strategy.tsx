import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Card, CardGrid, CtaBand, PageHero, PageShell, Section } from "@/components/site/PageShell";
import {
  FeatureSplit,
  GraphicFrame,
  PalCallout,
  PalFigure,
  Scene,
} from "@/components/site/PalVisuals";
import { Glyph, type GlyphName } from "@/components/site/Glyphs";
import type { PalAccent } from "@/lib/pricing-catalog";
import { createServiceSeo } from "@/lib/seo";

const framework: {
  step: string;
  title: string;
  body: string;
  lane: PalAccent;
  glyph: GlyphName;
  label: string;
}[] = [
  {
    step: "Discovery",
    title: "Content as Business Asset",
    body: "Treat content like a system: repeatable, scalable, optimized for ROI. Not views — business outcomes. We don't create content for likes or followers. Every video we produce is designed to solve a specific business problem: onboarding new customers, reducing support calls, closing sales, or training your team.",
    lane: "reel",
    glyph: "bulb",
    label: "Problem first",
  },
  {
    step: "Identity Mapping",
    title: "Workshop",
    body: "We map your brand identity, audience, and voice so every video sounds like you — not a generic script.",
    lane: "spotlight",
    glyph: "script",
    label: "Voice + audience",
  },
  {
    step: "Roadmap",
    title: "Content Roadmap",
    body: "A prioritized production plan that sequences the right videos in the right order for maximum impact.",
    lane: "evergreen",
    glyph: "calendar",
    label: "Sequenced plan",
  },
  {
    step: "Optimization",
    title: "Ongoing Optimization",
    body: "We revisit performance and refine the system so your content keeps compounding over time.",
    lane: "system",
    glyph: "chart",
    label: "Compounding",
  },
];

const differentiators: { title: string; body: string; lane: PalAccent; glyph: GlyphName }[] = [
  {
    title: "Solve Operational Bottlenecks",
    body: "We don't chase viral trends—we identify where video can eliminate repetitive work, confusing onboarding, or endless customer questions.",
    lane: "system",
    glyph: "search",
  },
  {
    title: "Video as Infrastructure",
    body: "Build a communication system that replaces repetitive explanations, speeds up training, and automates your most common answers.",
    lane: "evergreen",
    glyph: "library",
  },
  {
    title: "Real Business Metrics",
    body: "Fewer support tickets. Faster onboarding. More booked jobs. We measure success by how much time and friction we remove from your business.",
    lane: "spotlight",
    glyph: "chart",
  },
];

const problems = [
  "We answer the same questions every week.",
  "New hires start from scratch.",
  "Our content has no clear sequence.",
  "The founder is the only source of truth.",
];

const nextLevel: {
  label: string;
  title: string;
  body: string;
  to: string;
  lane: PalAccent;
  glyph: GlyphName;
}[] = [
  {
    label: "Start solo",
    title: "Use a DIY blueprint.",
    body: "A low-cost structure for choosing the first useful videos.",
    to: "/services/diy-downloads",
    lane: "evergreen",
    glyph: "gift",
  },
  {
    label: "Build together",
    title: "Map the strategy with us.",
    body: "Bring the bottlenecks and turn them into a prioritized roadmap.",
    to: "/contact",
    lane: "spotlight",
    glyph: "handshake",
  },
  {
    label: "Produce the system",
    title: "Match with a Pal lane.",
    body: "Carry the roadmap into production, post, and organized delivery.",
    to: "/services/video-production",
    lane: "system",
    glyph: "camera",
  },
];

function ContentStrategyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Strategic content planning"
        title="Random content is expensive."
        highlight="Build the map first."
        subtitle="If the team is guessing what to publish, repeating the same explanations, or measuring views without business impact, content strategy gives every asset a problem, audience, and place to live."
        lane="evergreen"
        visual={
          <Scene
            name="contentStrategy"
            priority
            tags={["Business friction", "Message + audience", "Useful roadmap"]}
          />
        }
      />

      <Section
        eyebrow="The framework"
        title="Turn the bottleneck into a production roadmap."
        subtitle="The strategy sequence moves from business context to a prioritized system your team can produce, use, and improve."
      >
        <div className="space-y-16">
          {framework.map((item, index) => (
            <FeatureSplit
              key={item.title}
              reverse={index % 2 === 1}
              lane={item.lane}
              eyebrow={`0${index + 1} · ${item.step}`}
              title={item.title}
              body={item.body}
              visual={
                <GraphicFrame lane={item.lane} label={item.label}>
                  <div className="grid h-full place-items-center pt-8">
                    <Glyph name={item.glyph} lane={item.lane} className="size-36 sm:size-48" />
                  </div>
                </GraphicFrame>
              }
            />
          ))}
        </div>
      </Section>

      <Section
        tone="mist"
        eyebrow="What makes it different"
        title="The metric is less friction—not more content."
        subtitle="The strategy stays anchored to the job the content needs to do inside the business."
      >
        <CardGrid cols={3}>
          {differentiators.map((d) => (
            <Card key={d.title} title={d.title} body={d.body} lane={d.lane} glyph={d.glyph} />
          ))}
        </CardGrid>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <PalCallout
            pal="cyrus"
            quote="If you can tell me the question your team answers most often, I can tell you the first video on your roadmap."
            action={{ label: "Meet Evergreen Pal", to: "/evergreen-pal" }}
          />
          <PalCallout
            pal="clara"
            quote="Strategy is not a bigger content calendar. It is fewer, better videos in the right order — each one with a job."
            action={{ label: "Book a strategy session", to: "/contact" }}
          />
        </div>
      </Section>

      <Section
        tone="ink"
        eyebrow="No camera needed"
        title="Bring your brain, goals, and biggest problems."
        align="left"
      >
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <PalFigure
            pal="clara"
            size="lg"
            lane="evergreen"
            className="min-h-[20rem]"
            caption="Bring the problem, not a script"
            tags={["Strategy first", "No camera yet"]}
          />
          <div className="grid content-start gap-3 sm:grid-cols-2">
            {problems.map((problem) => (
              <div key={problem} className="flex gap-3 rounded-2xl bg-white/8 p-5">
                <Check className="size-5 shrink-0 text-evergreen-soft" />
                <p className="text-sm font-semibold text-white/75">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Choose the next level"
        title="Strategy can stand alone or lead into production."
        subtitle="Start with the amount of support that matches the current problem."
      >
        <CardGrid cols={3}>
          {nextLevel.map((item) => (
            <Card
              key={item.label}
              index={item.label}
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
        title="Ready to stop guessing what to make?"
        subtitle="Bring the repeated question, slow handoff, unclear offer, or scattered content calendar. We will map the useful sequence."
        primaryLabel="Book a Strategy Session"
        lane="evergreen"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/content-strategy")({
  head: () => ({
    ...createServiceSeo({
      title: "Content Strategy | Palmer House Productions",
      description:
        "A strategic content system aligned with your business goals — build a content engine that solves operational bottlenecks and drives real ROI.",
      pathname: "/content-strategy",
      serviceName: "Video content strategy",
      serviceType: "Video content strategy consulting",
    }),
  }),
  component: ContentStrategyPage,
});
