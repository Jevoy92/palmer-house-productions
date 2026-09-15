import { createFileRoute } from "@tanstack/react-router";
import { AwakeningSequence } from "@/components/process/AwakeningSequence";
import {
  CtaBand,
  Eyebrow,
  IncludedPanel,
  InView,
  PageHero,
  PageShell,
  Section,
} from "@/components/site/PageShell";
import {
  FeatureSplit,
  GraphicFrame,
  PalCallout,
  ProcessTimeline,
  Scene,
} from "@/components/site/PalVisuals";
import { Glyph, type GlyphName } from "@/components/site/Glyphs";
import type { PalName } from "@/lib/studio-model";
import type { PalAccent } from "@/lib/pricing-catalog";
import { createSeo } from "@/lib/seo";

const steps: {
  number: string;
  title: string;
  short: string;
  headline: string;
  body: string;
  pal: PalName;
  lane: PalAccent;
  glyph: GlyphName;
  frame: string;
}[] = [
  {
    number: "01",
    title: "Discovery",
    short: "Map the audience, the bottleneck, and the questions your team keeps answering.",
    headline: "We listen before we film.",
    body: "We map the audience, the business bottleneck, and the questions your team keeps answering.",
    pal: "clara",
    lane: "evergreen",
    glyph: "search",
    frame: "Listen first",
  },
  {
    number: "02",
    title: "Strategy",
    short: "Choose the right Pal lanes and design the system around measurable outcomes.",
    headline: "Choose the lanes. Design around outcomes.",
    body: "We choose the right Pal lanes and design a video system around measurable business outcomes.",
    pal: "samira",
    lane: "system",
    glyph: "workflow",
    frame: "Build the system",
  },
  {
    number: "03",
    title: "Production",
    short: "Our crew handles planning, direction, cameras, lighting, and sound.",
    headline: "You focus on being yourself.",
    body: "Our crew handles the planning, direction, cameras, lighting, and sound so you can focus on being yourself.",
    pal: "kareem",
    lane: "spotlight",
    glyph: "camera",
    frame: "Cameras on",
  },
  {
    number: "04",
    title: "Launch",
    short: "Receive a reusable library built for social, web, sales, onboarding, and training.",
    headline: "A library built to be used.",
    body: "You receive a reusable library built for social, web, sales, onboarding, training, and support.",
    pal: "ryder",
    lane: "reel",
    glyph: "publish",
    frame: "Publish everywhere",
  },
  {
    number: "05",
    title: "Expand",
    short: "The system grows without rebuilding everything from scratch.",
    headline: "The system keeps compounding.",
    body: "The system can expand without rebuilding everything from scratch.",
    pal: "silas",
    lane: "system",
    glyph: "layers",
    frame: "Keep compounding",
  },
];

const promises = [
  "The business problem is defined before the shot list.",
  "Every video has a job, an audience, and a useful shelf life.",
  "Camera-shy founders get clear direction without sounding scripted.",
  "One production day is planned for maximum useful output.",
  "The final library is organized so your team can actually use it.",
  "The system can expand without rebuilding everything from scratch.",
];

function ProcessPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="From bottleneck to useful library"
        title="Production is not the first step."
        highlight="Clarity is."
        subtitle="If your team is posting randomly, repeating answers, or filming without a plan, the Palmer House process connects every video to a business problem before the cameras turn on."
        lane="evergreen"
        visual={
          <Scene
            name="processPlanning"
            priority
            tags={["Discovery", "Strategy", "Production", "Launch"]}
            caption="One connected system"
          />
        }
      />

      <AwakeningSequence />

      <section id="how-it-works" className="scroll-mt-24 px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <InView className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <div className="max-w-3xl">
              <Eyebrow lane="evergreen">How Palmer House works</Eyebrow>
              <h2 className="mt-4 text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-[0.96] tracking-[-0.055em]">
                Listen first. Build the system. Then turn on the cameras.
              </h2>
            </div>
            <div className="flex gap-5 rounded-[2rem] bg-system-soft p-6">
              <Glyph name="bulb" lane="system" className="size-16 shrink-0 sm:size-20" />
              <div>
                <p className="text-sm font-bold text-system-text">The useful-output test</p>
                <p className="mt-3 text-2xl font-extrabold">
                  Who needs this, what should it change, and where will it live?
                </p>
              </div>
            </div>
          </InView>

          <ProcessTimeline
            className="mt-16"
            steps={steps.map((step) => ({
              title: step.title,
              body: step.short,
              pal: step.pal,
              lane: step.lane,
            }))}
          />
        </div>
      </section>

      <Section
        tone="mist"
        eyebrow="Each step, explained"
        title="Every stage has a job before the next one starts."
        subtitle="Each stage hands the next one something concrete, so nothing is filmed without a reason."
      >
        <div className="space-y-16">
          {steps.slice(0, 4).map((step, index) => (
            <FeatureSplit
              key={step.number}
              reverse={index % 2 === 1}
              lane={step.lane}
              eyebrow={`Step ${step.number} · ${step.title}`}
              title={step.headline}
              body={step.body}
              visual={
                <GraphicFrame lane={step.lane} label={step.frame}>
                  <div className="grid h-full place-items-center pt-8">
                    <Glyph name={step.glyph} lane={step.lane} className="size-40 sm:size-52" />
                  </div>
                </GraphicFrame>
              }
            />
          ))}
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <PalCallout
            pal="clara"
            quote="If a customer has to ask twice, that is a video waiting to be made. Give me the steps in order — I will handle the shape."
          />
          <PalCallout
            pal="silas"
            quote="Plan the shoot once, harvest it for a month. One anchor, many outputs."
            action={{ label: "Build a package", to: "/production-pricing" }}
          />
        </div>
      </Section>

      <Section
        eyebrow="Before the camera turns on"
        title="Six promises that keep the work useful."
        subtitle="Production is the easy part. Knowing what to film, who it is for, and how it keeps working is the real job."
      >
        <IncludedPanel
          title="What every project is held to."
          items={promises}
          lane="system"
          glyph="shield"
        />
      </Section>

      <CtaBand
        lane="spotlight"
        title="Ready to stop explaining the same thing twice?"
        subtitle="Book a free 30-minute strategy call and we will map the first version of your video system together."
        primaryLabel="Book a Discovery Call"
        primaryTo="/contact"
        secondaryLabel="Build a package"
        secondaryTo="/production-pricing"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/process")({
  head: () => ({
    ...createSeo({
      title: "Our Process | Palmer House Productions",
      description:
        "Discovery, strategy, production, and launch: the Palmer House process for turning repeated business problems into reusable video systems.",
      pathname: "/process",
    }),
  }),
  component: ProcessPage,
});
