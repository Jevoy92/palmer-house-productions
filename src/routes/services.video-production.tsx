import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardGrid,
  CtaBand,
  IncludedPanel,
  PageHero,
  PageShell,
  Section,
} from "@/components/site/PageShell";
import {
  FeatureSplit,
  GraphicFrame,
  LaneTiles,
  PalCallout,
  ProcessTimeline,
  StatBand,
} from "@/components/site/PalVisuals";
import { Glyph } from "@/components/site/Glyphs";
import { MONTHLY_DISCOUNT_RATE } from "@/lib/cart-store";
import { BASE_INCLUDED, FINISHED_VIDEO_PRICE, SESSION_PRICE } from "@/lib/pricing-catalog";
import { createServiceSeo } from "@/lib/seo";

const steps = [
  {
    title: "Match your Pal",
    body: "A quick, problem-first assessment pairs you with the lane whose approach fits the job the video needs to do.",
    pal: "clara",
  },
  {
    title: "Plan the package",
    body: "Deliverables, script help, wardrobe guidance, and creative direction are locked before anyone picks up a camera.",
    pal: "samira",
  },
  {
    title: "Production day",
    body: "Two focused hours on location with professional camera, lighting, audio, teleprompter, and on-set direction.",
    pal: "kareem",
  },
  {
    title: "Polished delivery",
    body: "Editing, color, sound, and platform-ready exports — organized so your team can publish immediately.",
    pal: "ryder",
  },
] as const;

function VideoProductionPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Pal-guided video production"
        title="Stop buying videos without a job."
        highlight="Choose the business outcome."
        subtitle="Whether the problem is low visibility, weak trust, repeated explanations, or slow training, our Pal system matches production to the work the video needs to do."
        lane="spotlight"
        pal="spotlight"
        palTags={["Visibility", "Trust", "Education", "Operations"]}
      />

      <Section
        eyebrow="Four production lanes"
        title="Name the friction. Then meet the specialist."
        subtitle="Each lane is designed around a different communication problem, with a real package path when you are ready to scope it."
      >
        <LaneTiles ctaLabel="Meet" />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <PalCallout
            pal="kiana"
            quote="Tell me what a video is supposed to change for your business and I can tell you which lane it belongs in — before we talk about cameras."
            action={{ label: "Find your Pal", to: "/find-your-pal" }}
          />
          <PalCallout
            pal="silas"
            quote="Plan the videos together so one filming session can support several useful finished pieces."
            action={{ label: "See how sessions stack", to: "/production-pricing" }}
          />
        </div>
      </Section>

      <Section
        tone="mist"
        eyebrow="Production process"
        title="Strategy keeps the shoot efficient."
        subtitle="The business problem, audience, and deliverables are clear before production day."
      >
        <ProcessTimeline steps={[...steps]} />
      </Section>

      <Section
        eyebrow="What one session produces"
        title="Two hours on set. A library to publish."
        subtitle="Every session is priced the same way and includes the same production standard, no matter which lane you choose."
      >
        <StatBand
          stats={[
            {
              value: 2,
              suffix: " hrs",
              label: "on-location filming per session",
              lane: "spotlight",
            },
            {
              value: SESSION_PRICE,
              prefix: "$",
              label: "per filming session",
              lane: "reel",
            },
            {
              value: FINISHED_VIDEO_PRICE,
              prefix: "$",
              label: "per finished video",
              lane: "evergreen",
            },
            {
              value: Math.round(MONTHLY_DISCOUNT_RATE * 100),
              suffix: "%",
              label: "saved on monthly cadence",
              lane: "system",
            },
          ]}
        />
        <div className="mt-12">
          <IncludedPanel
            title="Included in every production, one-time or monthly."
            items={BASE_INCLUDED}
            lane="spotlight"
            glyph="light"
          />
        </div>
      </Section>

      <Section
        tone="mist"
        eyebrow="Built for reuse"
        title="One shoot, many outputs."
        subtitle="Production is designed so the footage keeps paying you back across channels."
      >
        <div className="space-y-16">
          <FeatureSplit
            lane="reel"
            eyebrow="Plan the finished pieces"
            title="One filming session. Several clear ideas."
            body="Choose how many finished videos you need. We agree on the length, framing, and topic of each piece before filming, so the scope is clear from the start."
            bullets={[
              "One clear idea per video",
              "Finished-video pricing",
              "Formats agreed in your scope",
            ]}
            action={{ label: "Explore Social Content", to: "/packages/social-content" }}
            visual={
              <GraphicFrame lane="reel" label="Social content ideas">
                <div className="grid h-full grid-cols-4 items-end gap-3 pt-10">
                  {["Hook", "Answer", "Demo", "Story"].map((label, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <Glyph name="reel" lane="reel" className="size-14 sm:size-20" />
                      <span className="rounded-full bg-white px-2.5 py-1 font-mono text-[10px] font-bold text-reel-text shadow-sm">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </GraphicFrame>
            }
          />
          <FeatureSplit
            reverse
            lane="evergreen"
            eyebrow="Long-form when it matters"
            title="Some answers deserve ten minutes, not fifteen seconds."
            body="Evergreen episodes use their own pricing because they take deeper planning and a more involved edit — and they keep earning search traffic for years."
            bullets={["Pricing explainers", "Process walkthroughs", "Expert Q&A series"]}
            action={{ label: "Explore Evergreen Pal", to: "/evergreen-pal" }}
            visual={
              <GraphicFrame lane="evergreen" label="Compounding library">
                <div className="grid h-full place-items-center pt-8">
                  <Glyph name="library" lane="evergreen" className="size-40 sm:size-52" />
                </div>
              </GraphicFrame>
            }
          />
        </div>
      </Section>

      <Section
        eyebrow="Need a narrower next step?"
        title="Choose support by where you are stuck."
        subtitle="Production can start with strategy, existing footage, or a problem-first assessment."
      >
        <CardGrid cols={3}>
          <Card
            lane="evergreen"
            glyph="bulb"
            title="The plan is unclear"
            body="Map the audience, message, and useful video sequence first."
            to="/content-strategy"
          />
          <Card
            lane="spotlight"
            glyph="edit"
            title="The footage already exists"
            body="Turn raw media into polished, platform-ready deliverables."
            to="/services/post-production"
          />
          <Card
            lane="system"
            glyph="search"
            title="The right lane is unclear"
            body="Answer a few problem-first questions and meet your Pal."
            to="/find-your-pal"
          />
        </CardGrid>
      </Section>

      <CtaBand
        title="Ready to give every video a clear job?"
        subtitle="Bring us the bottleneck. We will match it to the right Pal lane, production plan, and working package."
        primaryLabel="Book a Discovery Call"
        secondaryLabel="Find your Pal"
        secondaryTo="/find-your-pal"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/services/video-production")({
  head: () => ({
    ...createServiceSeo({
      title: "Video Production Services | Palmer House Productions",
      description:
        "Pal-guided video production for reels, brand films, evergreen education, and internal training — matched to your goals.",
      pathname: "/services/video-production",
      serviceName: "Video production services",
      serviceType: "Commercial video production",
    }),
  }),
  component: VideoProductionPage,
});
