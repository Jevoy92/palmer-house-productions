import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  Card,
  CardGrid,
  FaqList,
  CtaBand,
  IncludedPanel,
} from "@/components/site/PageShell";
import {
  FeatureSplit,
  GraphicFrame,
  PalCallout,
  PalFigure,
  ProcessTimeline,
  Scene,
} from "@/components/site/PalVisuals";
import { Glyph, type GlyphName } from "@/components/site/Glyphs";
import type { PalAccent } from "@/lib/pricing-catalog";
import { createSeo, faqSchema, jsonLdScript, schemaGraph } from "@/lib/seo";

const doThis = [
  "Wear solid, muted colors — navy, charcoal, olive, burgundy, cream work great",
  "Bring 2-3 outfit options so we can pick the best one for the set",
  "Iron or steam your clothes beforehand — wrinkles show up on camera",
  "Wear layers that can be added or removed for visual variety",
  "Keep jewelry simple and minimal — no jingling bracelets",
  "Hair should be clean and styled how you normally wear it",
];

const avoidThis = [
  "Busy patterns, thin stripes, or small checkers — they create a moiré effect on camera",
  "Bright white or neon colors — they blow out under studio lighting",
  "All black — it can look flat and lose depth on screen",
  "Large logos or branded clothing (unless intentional)",
  "New shoes that might squeak on hard floors",
  "Heavy cologne or perfume — you'll be in close quarters with the crew",
];

const environment: { title: string; body: string; lane: PalAccent; glyph: GlyphName }[] = [
  {
    title: "Natural Light",
    body: "A room with large windows is ideal. If shooting indoors, turn off overhead lights to avoid mixed color temperatures.",
    lane: "spotlight",
    glyph: "light",
  },
  {
    title: "Quiet Atmosphere",
    body: "Ensure AC is off or quiet, windows are closed to street noise, and coworkers know you are recording.",
    lane: "evergreen",
    glyph: "mic",
  },
  {
    title: "Depth & Space",
    body: "Avoid standing directly against a wall. We need at least 6-8 feet of depth to create that professional blurred background.",
    lane: "system",
    glyph: "camera",
  },
];

const planning: { title: string; body: string; lane: PalAccent; glyph: GlyphName }[] = [
  {
    title: "Bullet Points > Scripts",
    body: "Reading a script makes you look like a robot. Know your key bullets and speak naturally.",
    lane: "spotlight",
    glyph: "script",
  },
  {
    title: 'The "Pause" Trick',
    body: "Mess up? Don't apologize. Just stop, take a breath, smile, and start the sentence over. We'll cut the bad take.",
    lane: "reel",
    glyph: "teleprompter",
  },
  {
    title: "Energy Levels",
    body: "The camera eats energy. Aim for 10-15% more enthusiasm than your normal conversation level.",
    lane: "evergreen",
    glyph: "spark",
  },
];

const schedule = [
  { time: "9:00 AM", item: "Crew Arrival & Setup", glyph: "clock" },
  { time: "9:45 AM", item: "Sound & Light Check", glyph: "mic" },
  { time: "10:00 AM", item: "First Take / Warm-up", glyph: "camera" },
  { time: "12:00 PM", item: "Wrap Up", glyph: "publish" },
] as const;

const dayOf: { title: string; body: string; lane: PalAccent; glyph: GlyphName }[] = [
  {
    title: "Hydrate & Rest",
    body: "Drink plenty of water the day before. Avoid salty foods to prevent puffiness. Get a good night's sleep.",
    lane: "evergreen",
    glyph: "spark",
  },
  {
    title: "Emergency Kit",
    body: "Bring a comb, translucent powder (for shine), lip balm, and lint roller. We have some, but personal is best.",
    lane: "reel",
    glyph: "gift",
  },
  {
    title: "Guests",
    body: "Keep the set clear. Only essential personnel in the room to maintain focus and audio quality.",
    lane: "system",
    glyph: "shield",
  },
];

const resources: { title: string; body: string; to: string; lane: PalAccent; glyph: GlyphName }[] =
  [
    {
      to: "/blog/audio-quality-business-video",
      title: "Understand clean audio",
      body: "Learn why sound quality changes how professional a video feels.",
      lane: "evergreen",
      glyph: "mic",
    },
    {
      to: "/blog/professional-lighting-budget",
      title: "Plan better lighting",
      body: "See how location and light placement shape the final image.",
      lane: "spotlight",
      glyph: "light",
    },
    {
      to: "/faq",
      title: "Read production FAQs",
      body: "Get direct answers about process, ownership, support, and results.",
      lane: "system",
      glyph: "chat",
    },
  ];

const faqs = [
  {
    q: "What if I have a blemish on the day of?",
    a: "Don't worry — our crew can help minimize it on camera, and we can also lightly touch it up in post-production.",
  },
  {
    q: "Can I wear glasses?",
    a: "Yes. We'll adjust lighting angles to avoid glare, but let us know ahead of time so we can plan accordingly.",
  },
  {
    q: "How long does setup take?",
    a: "Typically 30-45 minutes for our crew to set up lighting, sound, and camera before we begin filming.",
  },
];

function ProductionGuidePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="You’re booked — let’s prep"
        title="Production day,"
        highlight="without the guesswork."
        subtitle="The practical wardrobe, location, content, and day-of checklist for showing up confident and camera-ready."
        ctas={false}
        lane="spotlight"
        visual={
          <Scene
            name="productionGuide"
            priority
            tags={["Wardrobe", "Location", "Talking points"]}
          />
        }
      />

      <Section tone="mist">
        <IncludedPanel
          headingLevel={2}
          title="Wear something comfortable and camera-safe, bring options, arrive early, and know your key points—not a memorized script."
          items={[
            "2–3 outfit options",
            "Quiet room with depth",
            "HVAC and street noise off",
            "Arrive 15 minutes early",
          ]}
          lane="spotlight"
          glyph="camera"
        />
      </Section>

      <Section
        eyebrow="Look polished on camera"
        title="What to Wear & Grooming"
        subtitle="Your wardrobe plays a bigger role on camera than you'd think. Here's how to look polished without overthinking it."
      >
        <div className="space-y-16">
          <FeatureSplit
            lane="evergreen"
            eyebrow="Do this"
            title="Solid colors, clean lines, a few options."
            bullets={doThis}
            visual={
              <PalFigure
                pal="kiana"
                size="lg"
                lane="evergreen"
                className="min-h-[22rem]"
                tags={["Solid, muted colors", "2–3 outfit options", "Simple jewelry"]}
              />
            }
          />
          <FeatureSplit
            reverse
            lane="reel"
            eyebrow="Avoid this"
            title="Skip what fights the camera and the lights."
            bullets={avoidThis}
            visual={
              <GraphicFrame lane="reel" label="Moiré, glare, and squeaks">
                <div className="grid h-full grid-cols-3 items-center gap-3 pt-8">
                  <Glyph name="camera" lane="reel" className="size-16 sm:size-24" />
                  <Glyph name="light" lane="reel" className="size-16 sm:size-24" />
                  <Glyph name="mic" lane="reel" className="size-16 sm:size-24" />
                </div>
              </GraphicFrame>
            }
          />
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          If you're doing multiple videos, plan outfits that look noticeably different so content
          feels fresh across videos.
        </p>
      </Section>

      <Section
        tone="mist"
        eyebrow="Set the scene"
        title="Location & Environment"
        subtitle="We'll handle the lighting and camera angles, but the environment sets the mood. Here's what we need from the space."
      >
        <CardGrid cols={3}>
          {environment.map((e) => (
            <Card key={e.title} title={e.title} body={e.body} lane={e.lane} glyph={e.glyph} />
          ))}
        </CardGrid>
      </Section>

      <Section
        eyebrow="Content Planning"
        title="Content Planning"
        subtitle="Preparation is 90% of the work. Come ready with your key talking points, but don't worry about memorizing a script word-for-word."
      >
        <CardGrid cols={3}>
          {planning.map((p, i) => (
            <Card
              key={p.title}
              index={`0${i + 1}`}
              title={p.title}
              body={p.body}
              lane={p.lane}
              glyph={p.glyph}
            />
          ))}
        </CardGrid>
        <div className="mx-auto mt-10 max-w-2xl">
          <PalCallout pal="kareem" quote="Authenticity wins over perfection every time." />
        </div>
      </Section>

      <Section
        tone="spotlight"
        eyebrow="Day-Of Logistics"
        title="Sample Schedule"
        subtitle="Please arrive 15 mins early."
      >
        <ProcessTimeline
          steps={schedule.map((s) => ({
            title: s.time,
            body: s.item,
            glyph: s.glyph,
            lane: "spotlight",
          }))}
        />
        <div className="mt-10">
          <CardGrid cols={3}>
            {dayOf.map((d) => (
              <Card key={d.title} title={d.title} body={d.body} lane={d.lane} glyph={d.glyph} />
            ))}
          </CardGrid>
        </div>
      </Section>

      <Section eyebrow="Common Questions" title="Frequently Asked Questions">
        <FaqList items={faqs} lane="spotlight" pal="kareem" />
      </Section>

      <Section
        tone="mist"
        eyebrow="Useful before and after the shoot"
        title="Keep the production moving."
      >
        <CardGrid cols={3}>
          {resources.map((item) => (
            <Card
              key={item.title}
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
        title="Have a shoot-day question that is not covered here?"
        subtitle="Reply to your confirmation email for project-specific help, or contact the Palmer House team."
        primaryLabel="Contact Support"
        lane="spotlight"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/production-guide")({
  head: () => ({
    ...createSeo({
      title: "Production Day Guide | Palmer House Productions",
      description:
        "Everything you need to prep for your video shoot: wardrobe tips, environment setup, content planning, and day-of logistics.",
      pathname: "/production-guide",
    }),
    scripts: [jsonLdScript(schemaGraph(faqSchema(faqs)))],
  }),
  component: ProductionGuidePage,
});
