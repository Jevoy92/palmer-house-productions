import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  Card,
  CardGrid,
  CtaBand,
  IncludedPanel,
} from "@/components/site/PageShell";
import {
  FeatureSplit,
  GraphicFrame,
  PalCallout,
  ProcessTimeline,
  Scene,
  StatBand,
} from "@/components/site/PalVisuals";
import { Glyph, type GlyphName } from "@/components/site/Glyphs";
import {
  SAME_SESSION_ADDITIONAL_MINUTE_PRICE,
  SESSION_PRICE,
  type PalAccent,
} from "@/lib/pricing-catalog";
import { createServiceSeo } from "@/lib/seo";

export const Route = createFileRoute("/startups")({
  head: () => ({
    ...createServiceSeo({
      title: "Startup Video Production Seattle — Palmer House Productions",
      description:
        "Seattle startup video production for pitch videos, product demos, and growth content built for Pacific Northwest startups.",
      pathname: "/startups",
      serviceName: "Startup video production",
      serviceType: "Startup pitch, product demo, and brand video production",
    }),
  }),
  component: StartupsPage,
});

const outcomes: { stat: string; label: string; body: string; lane: PalAccent }[] = [
  {
    stat: "Funding Clarity",
    label: "Explain the opportunity",
    body: "Give investors a concise story they can understand before the next meeting.",
    lane: "spotlight",
  },
  {
    stat: "Product Understanding",
    label: "Show the product",
    body: "Demonstrate the workflow, customer problem, and value without a long explanation.",
    lane: "evergreen",
  },
  {
    stat: "Repeatable Onboarding",
    label: "Scale the knowledge",
    body: "Turn repeated founder and team explanations into a reusable onboarding library.",
    lane: "system",
  },
  {
    stat: "Reusable Distribution",
    label: "Build the campaign",
    body: "Plan one production around web, pitch, sales, and social delivery from the start.",
    lane: "reel",
  },
];

const specialties: { title: string; body: string; lane: PalAccent; glyph: GlyphName }[] = [
  {
    title: "Investor Pitch Videos",
    body: "Compelling narratives that capture attention and communicate traction.",
    lane: "spotlight",
    glyph: "chart",
  },
  {
    title: "Product Demonstrations",
    body: "Clear showcases of features, benefits, and competitive advantages.",
    lane: "evergreen",
    glyph: "play",
  },
  {
    title: "Growth Marketing",
    body: "Viral-ready social content that drives customer acquisition.",
    lane: "reel",
    glyph: "reel",
  },
  {
    title: "Brand Storytelling",
    body: "Authentic stories that build emotional connections with customers.",
    lane: "spotlight",
    glyph: "mic",
  },
];

const services: {
  title: string;
  eyebrow: string;
  body: string;
  items: string[];
  lane: PalAccent;
  glyph: GlyphName;
}[] = [
  {
    title: "Investor Videos",
    eyebrow: "Pitch & Funding",
    body: "Compelling pitch videos and investor presentations that communicate your vision and traction.",
    items: ["Pitch deck videos", "Demo day content", "Investor updates"],
    lane: "spotlight",
    glyph: "chart",
  },
  {
    title: "Product Demos",
    eyebrow: "Product",
    body: "Clear, engaging product demonstrations that showcase features and convert prospects.",
    items: ["Feature demos", "Explainer videos", "Onboarding content"],
    lane: "evergreen",
    glyph: "teleprompter",
  },
  {
    title: "Marketing Content",
    eyebrow: "Growth",
    body: "High-impact social content that drives viral growth and builds community.",
    items: ["Social media reels", "Customer stories", "Brand content"],
    lane: "reel",
    glyph: "publish",
  },
];

function StartupsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Startup Solutions"
        title="Seattle Startup Video Production That Accelerates Growth & Funding"
        subtitle="From South Lake Union SaaS companies to Eastside deep-tech startups and Pioneer Square accelerator cohorts — we create pitch videos, product demos, and growth content that helps Pacific Northwest startups raise more capital and build stronger brands."
        lane="reel"
        visual={
          <Scene
            name="startups"
            priority
            tags={["Pitch videos", "Product demos", "Growth reels"]}
          />
        }
      />

      <Section
        eyebrow="Four jobs, four lanes"
        title="Outcomes That Matter"
        subtitle="Four jobs a startup video system needs to do — each one mapped to a Pal lane."
        lane="reel"
      >
        <CardGrid cols={4}>
          {outcomes.map((o) => (
            <Card
              key={o.label}
              lane={o.lane}
              glyph="spark"
              index={o.stat}
              title={o.label}
              body={o.body}
            />
          ))}
        </CardGrid>
      </Section>

      <Section
        tone="mist"
        eyebrow="Discovery to delivery"
        title="Our Process"
        subtitle="From discovery to delivery, a proven system for startup video"
        lane="reel"
      >
        <ProcessTimeline
          steps={[
            {
              title: "Discovery",
              body: "Understanding your startup's vision, target market, and growth goals through detailed consultation.",
              pal: "kiana",
            },
            {
              title: "Planning",
              body: "Developing compelling scripts and storyboards that communicate your unique value proposition.",
              pal: "clara",
            },
            {
              title: "Production",
              body: "Professional filming that captures your team's passion and showcases your product's potential.",
              pal: "kareem",
            },
            {
              title: "Delivery",
              body: "Optimized videos ready for pitches, social media, websites, and investor presentations.",
              pal: "ryder",
            },
          ]}
        />
        <div className="mt-10">
          <PalCallout
            pal="ryder"
            quote="Momentum beats perfection. If you are staring at a blank week before demo day, throw me one sentence and I will hand you three things you could film today."
            action={{ label: "Explore Reel Pal", to: "/reel-pal" }}
          />
        </div>
      </Section>

      <Section
        eyebrow="Specialties"
        title="Startup Video Specialties"
        subtitle="We understand the unique challenges startups face at every stage, from pre-seed to Series A and beyond."
        lane="reel"
      >
        <CardGrid cols={4}>
          {specialties.map((s) => (
            <Card key={s.title} lane={s.lane} glyph={s.glyph} title={s.title} body={s.body} />
          ))}
        </CardGrid>
      </Section>

      <Section
        tone="reel"
        eyebrow="Services"
        title="Our Startup Video Services"
        subtitle="Comprehensive video production solutions tailored for startups at every stage, designed to help you raise capital, acquire customers, and scale operations."
      >
        <StatBand
          className="mb-16"
          stats={[
            { value: SESSION_PRICE, prefix: "$", label: "per production session", lane: "reel" },
            {
              value: 2,
              suffix: " hrs",
              label: "on-location filming per session",
              lane: "spotlight",
            },
            {
              value: 1,
              suffix: " min",
              label: "edited output included, split 60/30/15",
              lane: "evergreen",
            },
            {
              value: SAME_SESSION_ADDITIONAL_MINUTE_PRICE,
              prefix: "$",
              label: "per added same-session minute",
              lane: "system",
            },
          ]}
        />
        <div className="space-y-16">
          {services.map((s, i) => (
            <FeatureSplit
              key={s.title}
              reverse={i % 2 === 1}
              lane={s.lane}
              eyebrow={s.eyebrow}
              title={s.title}
              body={s.body}
              bullets={s.items}
              action={{ label: "Build this into a package", to: "/production-pricing" }}
              visual={
                <GraphicFrame lane={s.lane}>
                  <div className="grid h-full place-items-center">
                    <Glyph name={s.glyph} lane={s.lane} className="size-40 sm:size-52" />
                  </div>
                </GraphicFrame>
              }
            />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Spotlight Pal for startups"
        title="How Spotlight Pal Serves Startups"
        subtitle="Every startup stage needs different video solutions. Our specialized Pals deliver exactly what you need—from pitch videos to product demos to growth content."
        lane="spotlight"
      >
        <IncludedPanel
          title="Investor & Brand Stories"
          items={[
            "Investor pitch videos and demo day content",
            "Founder story and mission films",
            "Brand identity and culture videos",
            "Customer testimonial productions",
          ]}
          lane="spotlight"
          glyph="camera"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <PalCallout
            pal="kiana"
            quote="Cinematic pitch videos, founder stories, and brand films that capture investor attention and build emotional connections with your audience — that is my corner."
            action={{ label: "Explore Spotlight Pal", to: "/spotlight-pal" }}
          />
          <PalCallout
            pal="samira"
            quote="Founders repeat the same onboarding explanation to every hire and every customer. Record it once and the team scales without you in every room."
            action={{ label: "Explore System Pal", to: "/system-pal" }}
          />
        </div>
      </Section>

      <CtaBand
        title="Ready to Accelerate Your Startup's Growth?"
        subtitle="Let's create video content that helps you raise more capital, grow faster, and build a stronger brand."
        primaryLabel="Book a Discovery Call"
        lane="reel"
      />
    </PageShell>
  );
}
