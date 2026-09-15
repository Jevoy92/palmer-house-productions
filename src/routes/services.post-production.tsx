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
  PalCallout,
  PalDuo,
  ProcessTimeline,
  Scene,
} from "@/components/site/PalVisuals";
import { Glyph, type GlyphName } from "@/components/site/Glyphs";
import type { PalAccent } from "@/lib/pricing-catalog";
import { createServiceSeo } from "@/lib/seo";

const services: {
  title: string;
  body: string;
  tags: string[];
  lane: PalAccent;
  glyph: GlyphName;
}[] = [
  {
    title: "Video Editing & Assembly",
    body: "Expert editing that transforms raw footage into polished, engaging content. We craft narratives that capture attention and maintain viewer interest from start to finish.",
    tags: ["Multi-cam Editing", "Narrative Flow", "Pacing Optimization", "Transitions & Effects"],
    lane: "spotlight",
    glyph: "edit",
  },
  {
    title: "Color Grading & Correction",
    body: "Professional color grading that establishes mood, ensures brand consistency, and creates a cinematic look that elevates your content above standard video.",
    tags: ["Color Matching", "Mood Creation", "Brand Consistency", "Cinematic Grading"],
    lane: "reel",
    glyph: "light",
  },
  {
    title: "Audio Engineering & Sound Design",
    body: "Crystal-clear audio mixing, sound effects, and music integration that enhances emotional impact and ensures professional broadcast-quality sound.",
    tags: ["Audio Mixing", "Noise Reduction", "Sound Effects", "Music Licensing"],
    lane: "evergreen",
    glyph: "mic",
  },
  {
    title: "Motion Graphics & Animation",
    body: "Eye-catching motion graphics, lower thirds, title animations, and visual effects that reinforce your brand and explain complex concepts clearly.",
    tags: ["Animated Titles", "Infographics", "Logo Animation", "Visual Effects"],
    lane: "system",
    glyph: "spark",
  },
  {
    title: "Format Optimization & Delivery",
    body: "Multi-platform optimization ensuring your video looks perfect whether it's on YouTube, LinkedIn, Instagram, or your website—formatted for maximum engagement.",
    tags: [
      "Platform-Specific Edits",
      "Aspect Ratio Variants",
      "Compression Optimization",
      "Subtitle Integration",
    ],
    lane: "spotlight",
    glyph: "layers",
  },
  {
    title: "Revision & Refinement",
    body: "Collaborative revision process that ensures the final product perfectly aligns with your vision, brand standards, and business objectives.",
    tags: ["Structured Feedback", "Unlimited Revisions", "Version Control", "Final Delivery"],
    lane: "reel",
    glyph: "publish",
  },
];

const steps = [
  {
    title: "Review & Assessment",
    body: "We review all raw footage, identify the best takes, and create a detailed editing plan aligned with your goals.",
    pal: "kareem",
    lane: "spotlight",
  },
  {
    title: "First Cut Assembly",
    body: "Rough cut assembly establishing narrative flow, pacing, and structure for your approval before detail work begins.",
    glyph: "edit",
    lane: "spotlight",
  },
  {
    title: "Refinement & Polish",
    body: "Color grading, audio mixing, motion graphics, and visual effects are added to create a professional, polished product.",
    glyph: "layers",
    lane: "spotlight",
  },
  {
    title: "Final Delivery",
    body: "Optimized final files delivered in all required formats for seamless deployment across your chosen platforms.",
    glyph: "publish",
    lane: "spotlight",
  },
] as const;

const deliverables = [
  "Audio Restoration",
  "Subtitle & Caption Creation",
  "Archive & Asset Management",
  "Platform-Specific Edits",
  "Aspect Ratio Variants",
  "Compression Optimization",
  "Structured Feedback",
  "Version Control",
];

const related: { title: string; body: string; to: string; lane: PalAccent; glyph: GlyphName }[] = [
  {
    title: "Video Production",
    body: "Professional filming services for all your video content needs.",
    to: "/services/video-production",
    lane: "spotlight",
    glyph: "camera",
  },
  {
    title: "Consulting & Strategy",
    body: "Strategic planning to maximize your video content ROI.",
    to: "/content-strategy",
    lane: "evergreen",
    glyph: "bulb",
  },
  {
    title: "DIY Tools & Downloads",
    body: "Templates and resources for self-service video creation.",
    to: "/services/diy-downloads",
    lane: "reel",
    glyph: "gift",
  },
];

function PostProductionPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Professional post-production"
        title="Raw footage is not the finish line."
        highlight="Make it useful everywhere."
        subtitle="When the story is buried, the sound distracts, or one master file cannot serve every platform, post-production turns the raw material into polished, usable content."
        lane="spotlight"
        visual={
          <Scene
            name="postProduction"
            priority
            tags={["Raw media", "Story + polish", "Ready to use"]}
          />
        }
      />

      <Section
        eyebrow="Where footage gets stuck"
        title="Fix the part keeping the story from landing."
        subtitle="Post-production can solve a single technical gap or carry the entire project from selects to organized final delivery."
      >
        <CardGrid cols={3}>
          {services.map((service, index) => (
            <Card
              key={service.title}
              index={`0${index + 1}`}
              lane={service.lane}
              glyph={service.glyph}
              title={service.title}
              body={service.body}
            >
              <div className="relative mt-5 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </CardGrid>
      </Section>

      <Section
        tone="mist"
        eyebrow="Workflow"
        title="A clear path from handoff to final files."
        subtitle="You stay involved at the decisions that shape the story without having to manage every technical detail."
      >
        <ProcessTimeline steps={[...steps]} />
        <div className="mx-auto mt-10 max-w-3xl">
          <PalCallout
            pal="kareem"
            quote="Send me everything — the good takes, the bad takes, the B-roll you forgot about. The edit finds the story; you just have to approve the cut."
            action={{ label: "Meet Spotlight Pal", to: "/spotlight-pal" }}
          />
        </div>
      </Section>

      <Section
        eyebrow="Capabilities"
        title="The polish should solve a real delivery need."
        subtitle="Choose the capabilities that make the work clearer, more accessible, easier to reuse, and ready for the right channels."
      >
        <div className="space-y-16">
          <FeatureSplit
            lane="spotlight"
            eyebrow="Advanced Color Grading"
            title="Create stunning visual consistency and mood."
            body="Professional-grade color correction and grading techniques establish mood, keep every clip on brand, and give the footage a cinematic look."
            bullets={["Color Matching", "Mood Creation", "Brand Consistency", "Cinematic Grading"]}
            visual={
              <GraphicFrame lane="spotlight" label="Grade + match">
                <div className="grid h-full grid-cols-3 items-center gap-3 pt-8">
                  {(["reel", "spotlight", "evergreen"] as const).map((lane) => (
                    <div
                      key={lane}
                      className="flex aspect-[3/4] flex-col items-center justify-end rounded-[1.5rem] bg-white p-3 shadow-sm"
                    >
                      <span
                        className="mb-3 block h-16 w-full rounded-[1rem]"
                        style={{ background: `var(--${lane})` }}
                      />
                      <Glyph name="light" lane={lane} className="size-10" />
                    </div>
                  ))}
                </div>
              </GraphicFrame>
            }
          />
          <FeatureSplit
            reverse
            lane="system"
            eyebrow="Motion Graphics"
            title="Reinforce the brand. Explain the complex."
            body="Custom animated elements that reinforce your brand identity and explain complex information visually — lower thirds, titles, infographics, and effects."
            bullets={["Animated Titles", "Infographics", "Logo Animation", "Visual Effects"]}
            visual={
              <GraphicFrame lane="system" label="Titles + graphics">
                <div className="grid h-full place-items-center pt-8">
                  <div className="flex items-center gap-6">
                    <Glyph name="spark" lane="system" className="size-24 sm:size-32" />
                    <div className="space-y-2">
                      <span className="block h-3 w-28 rounded-full bg-system" />
                      <span className="block h-3 w-20 rounded-full bg-white" />
                      <span className="block h-3 w-24 rounded-full bg-white/70" />
                    </div>
                  </div>
                </div>
              </GraphicFrame>
            }
          />
          <FeatureSplit
            lane="reel"
            eyebrow="Multi-Format Optimization"
            title="One master. Every platform."
            body="Deliver platform-specific versions optimized for Instagram, YouTube, LinkedIn, Facebook, and web — 9:16, 16:9, and 1:1."
            bullets={["Platform-Specific Edits", "Aspect Ratio Variants", "Subtitle Integration"]}
            visual={
              <GraphicFrame lane="reel" label="9:16 · 16:9 · 1:1">
                <div className="grid h-full grid-cols-3 items-end gap-4 pt-10">
                  {[
                    { ratio: "9/16", label: "9:16" },
                    { ratio: "16/9", label: "16:9" },
                    { ratio: "1/1", label: "1:1" },
                  ].map((f) => (
                    <div key={f.label} className="flex flex-col items-center gap-2">
                      <div
                        className="grid w-full place-items-center rounded-[1rem] bg-white shadow-sm"
                        style={{ aspectRatio: f.ratio }}
                      >
                        <Glyph name="layers" lane="reel" className="size-9" />
                      </div>
                      <span className="rounded-full bg-white px-2.5 py-1 font-mono text-[10px] font-bold text-reel-text shadow-sm">
                        {f.label}
                      </span>
                    </div>
                  ))}
                </div>
              </GraphicFrame>
            }
          />
        </div>
      </Section>

      <Section
        tone="spotlight"
        eyebrow="Deliverables"
        title="Organized final delivery, every time."
        subtitle="Beyond the headline edit, every project ships with the pieces that make it accessible, reusable, and easy to update later."
      >
        <IncludedPanel
          title="Included with every post-production handoff."
          items={deliverables}
          lane="spotlight"
          glyph="publish"
        />
      </Section>

      <Section
        eyebrow="Meet your post-production lane"
        title="Spotlight Pal brings the finish into focus."
        subtitle="Kareem and Kiana specialize in transforming raw footage into polished, professional content."
      >
        <FeatureSplit
          lane="spotlight"
          eyebrow="Spotlight Pal"
          title="Editing, color, sound, and motion — with one team accountable for the finish."
          body="Spotlight Pal specializes in transforming raw footage into polished, professional content through editing, color grading, audio post-production, and motion graphics."
          bullets={["Expert Editing", "Color Grading", "Audio Mixing", "Motion Graphics"]}
          action={{ label: "Meet Spotlight Pal", to: "/spotlight-pal" }}
          visual={<PalDuo lane="spotlight" />}
        />
      </Section>

      <Section tone="mist" eyebrow="Related" title="Related Video Services">
        <CardGrid cols={3}>
          {related.map((r) => (
            <Card
              key={r.title}
              title={r.title}
              body={r.body}
              to={r.to}
              lane={r.lane}
              glyph={r.glyph}
            />
          ))}
        </CardGrid>
      </Section>

      <CtaBand
        title="Have footage that is not working hard enough?"
        subtitle="Tell us what exists, where it needs to live, and what is getting in the way. We will map the right post-production path."
        primaryLabel="Book a Discovery Call"
        lane="spotlight"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/services/post-production")({
  head: () => ({
    ...createServiceSeo({
      title: "Post-Production Services | Palmer House Productions",
      description:
        "Professional editing, color grading, audio engineering, and motion graphics that elevate raw footage into captivating brand content.",
      pathname: "/services/post-production",
      serviceName: "Post-production services",
      serviceType: "Video editing and post-production",
    }),
  }),
  component: PostProductionPage,
});
