import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  Card,
  CardGrid,
  CtaBand,
  Eyebrow,
  InView,
} from "@/components/site/PageShell";
import {
  PalCallout,
  PalRoster,
  ProcessTimeline,
  Scene,
  StatBand,
} from "@/components/site/PalVisuals";
import type { GlyphName } from "@/components/site/Glyphs";
import type { PalAccent } from "@/lib/pricing-catalog";
import { createSeo } from "@/lib/seo";

const TRANSFORMATIONS = [
  { from: "Messy thoughts", to: "Clear messages" },
  { from: "Invisible value", to: "Living proof" },
  { from: "Repetition", to: "Reusable assets" },
  { from: "Chaos", to: "Systems" },
];

const PILLARS: {
  title: string;
  body: string;
  index: string;
  lane: PalAccent;
  glyph: GlyphName;
  to: string;
}[] = [
  {
    title: "Spotlight",
    body: "Professional brand stories that showcase your team, culture, and expertise to the world.",
    index: "Brand Trust",
    lane: "spotlight",
    glyph: "camera",
    to: "/spotlight-pal",
  },
  {
    title: "Reel",
    body: "Short-form content engineered for social platforms — hooks, cuts, and calls-to-action that convert.",
    index: "Social Reach",
    lane: "reel",
    glyph: "reel",
    to: "/reel-pal",
  },
  {
    title: "Evergreen",
    body: "Timeless assets — FAQs, onboarding, training — that work 24/7 without repeating yourself.",
    index: "Time Saved",
    lane: "evergreen",
    glyph: "library",
    to: "/evergreen-pal",
  },
  {
    title: "System",
    body: "Full content ecosystems that tie everything together into a measurable, scalable machine.",
    index: "Efficiency",
    lane: "system",
    glyph: "workflow",
    to: "/system-pal",
  },
];

const APPROACH = [
  {
    title: "Discovery",
    body: "We listen before we film. Map your goals, audience, and bottlenecks.",
    pal: "clara",
  },
  {
    title: "Strategy",
    body: "Design a video system that solves problems — not just fills a feed.",
    pal: "cyrus",
  },
  {
    title: "Production",
    body: "Professional shoots with a team that makes you feel confident on camera.",
    pal: "kareem",
  },
  {
    title: "Launch",
    body: "Delivery, optimization, and ongoing support to keep your system sharp.",
    pal: "ryder",
  },
] as const;

const VALUES: {
  title: string;
  body: string;
  line: string;
  lane: PalAccent;
  glyph: GlyphName;
}[] = [
  {
    title: "Systems over Shortcuts",
    body: "We don't follow trends — we build systems. Anyone can post a video. We build assets that answer questions, close sales, train teams, and keep working long after they're published.",
    line: "Templates create noise. Systems create results.",
    lane: "system",
    glyph: "workflow",
  },
  {
    title: "Clarity over Clicks",
    body: "We don't make content for algorithms. We create videos that solve real business problems — confused customers, slow sales calls, repetitive onboarding, and untrained staff.",
    line: "Trends disappear. Clear communication compounds.",
    lane: "evergreen",
    glyph: "bulb",
  },
  {
    title: "Efficiency over Excess",
    body: "Most businesses waste time explaining the same things over and over. We turn those answers into video assets — once, clearly — so they can be used again and again.",
    line: "Clarity drives action. Efficiency drives profit.",
    lane: "reel",
    glyph: "clock",
  },
  {
    title: "Connection over Performance",
    body: "People don't buy the best company — they buy the one they trust the most. That trust doesn't come from perfect scripts. It comes from honesty, presence, and proof.",
    line: "Vulnerability builds loyalty. Humanity builds brands.",
    lane: "spotlight",
    glyph: "handshake",
  },
];

export const Route = createFileRoute("/about-us")({
  head: () => ({
    ...createSeo({
      title: "About Us | Palmer House Productions",
      description:
        "Palmer House Productions is a translation company that uses cameras and editing as tools — turning messy thoughts into clear messages and chaos into systems.",
      pathname: "/about-us",
    }),
  }),
  component: AboutUsPage,
});

function AboutUsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="The company behind the camera"
        title="Your expertise is valuable."
        highlight="It should be easier to see."
        subtitle="When customers do not understand the value, teams repeat the same answers, and good ideas stay trapped in meetings, we turn that friction into a clear video system."
        lane="spotlight"
        visual={
          <Scene
            name="aboutCrew"
            priority
            tags={["Translation company", "Cameras as tools"]}
            caption="The Pals on set"
          />
        }
      />

      <section className="px-4 py-16 sm:py-24">
        <InView className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow lane="spotlight">Our mission</Eyebrow>
            <h2 className="mt-5 text-[clamp(2.4rem,5vw,4.8rem)] font-extrabold leading-[0.96] tracking-[-0.05em]">
              Make the invisible work visible.
            </h2>
            <div className="mt-8 space-y-3">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                The Palmer House translation
              </p>
              {TRANSFORMATIONS.map((item, index) => {
                const accents = ["reel", "spotlight", "evergreen", "system"] as const;
                const accent = accents[index];
                return (
                  <div
                    key={item.from}
                    className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-2xl p-3"
                    style={{ background: `var(--${accent}-soft)` }}
                  >
                    <span className="text-sm font-semibold text-muted-foreground">{item.from}</span>
                    <span
                      aria-hidden
                      className="grid size-8 place-items-center rounded-full text-white"
                      style={{ background: `var(--${accent})` }}
                    >
                      →
                    </span>
                    <span className="text-right text-sm font-extrabold">{item.to}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-[2.5rem] bg-ink p-7 text-white sm:p-10">
              <p className="text-xl leading-relaxed text-white/85 sm:text-3xl">
                Palmer House Productions is a translation company that uses cameras and editing as
                tools.
              </p>
              <p className="mt-6 max-w-2xl leading-relaxed text-white/60">
                We turn invisible expertise into visible proof, one-time explanations into evergreen
                assets, and scattered ideas into cohesive video systems.
              </p>
              <Link
                to="/process"
                className="mt-8 inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-bold text-ink"
              >
                See how we work →
              </Link>
            </div>
            <PalCallout
              pal="kiana"
              quote="I look for the story underneath the service description. Most businesses already have the proof — it just has not been made visible yet."
              action={{ label: "Meet the Pals", to: "/meet-the-pals" }}
            />
          </div>
        </InView>
      </section>

      <Section
        eyebrow="Four problem-solving lanes"
        title="Start with what is not working."
        subtitle="Each Palmer lane gives a different business problem a clear job, audience, and useful shelf life."
        tone="mist"
      >
        <CardGrid cols={2}>
          {PILLARS.map((pillar) => (
            <Card
              key={pillar.title}
              title={pillar.title}
              body={pillar.body}
              index={pillar.index}
              lane={pillar.lane}
              glyph={pillar.glyph}
              to={pillar.to}
            />
          ))}
        </CardGrid>
      </Section>

      <Section
        eyebrow="Our approach"
        title="A workshop, not an assembly line."
        subtitle="Understanding comes before production. The sequence keeps every deliverable tied to a useful outcome."
        tone="evergreen"
      >
        <ProcessTimeline steps={[...APPROACH]} />
      </Section>

      <section className="bg-ink px-4 py-20 text-white sm:py-28">
        <InView className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_.75fr] lg:items-end">
          <blockquote className="text-[clamp(2rem,5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.045em]">
            “I grew up knowing that stories could change lives — but only if told with truth,
            courage, and soul.”
          </blockquote>
          <div className="border-l border-white/20 pl-6">
            <p className="font-bold">Jevoy Palmer</p>
            <p className="mt-1 text-sm text-white/55">Founder &amp; Lead Creative Guide</p>
            <p className="mt-5 leading-relaxed text-white/70">
              A filmmaker, strategist, and storyteller known for helping camera-shy clients feel
              confident while turning complex ideas into cinematic clarity.
            </p>
          </div>
        </InView>
      </section>

      <Section
        eyebrow="What we stand for"
        title="Clear principles. Useful work."
        subtitle="These choices shape the strategy, the set, and every client relationship."
        tone="mist"
      >
        <CardGrid cols={2}>
          {VALUES.map((v) => (
            <Card key={v.title} title={v.title} body={v.body} lane={v.lane} glyph={v.glyph}>
              <p
                className="relative mt-4 border-t border-border pt-4 text-sm font-bold"
                style={{ color: `var(--${v.lane}-text)` }}
              >
                {v.line}
              </p>
            </Card>
          ))}
        </CardGrid>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <PalCallout
            pal="kareem"
            quote="I care about how the work looks and sounds when a stranger meets it first. Proof points do more for quality than adjectives ever will."
          />
          <PalCallout
            pal="kiana"
            quote="Write the way you talk to a client you like. One clear story beats five clever posts."
            action={{ label: "See how we work", to: "/process" }}
          />
        </div>
      </Section>

      <Section
        eyebrow="Meet the team"
        title="Eight Pals. Four specialist lanes."
        subtitle="Every lane is guided by two Pals who bring a different strength to the same business problem."
      >
        <StatBand
          stats={[
            { value: 8, label: "Pals across the crew", lane: "spotlight" },
            { value: 4, label: "specialist lanes, one per business problem", lane: "evergreen" },
            { value: 1, label: "shoot becomes a reusable, multi-format library", lane: "system" },
          ]}
        />
        <PalRoster className="mt-10" />
        <div className="mt-10">
          <CardGrid cols={2}>
            <Card
              lane="system"
              glyph="handshake"
              title="Meet the Pals"
              body="Eight Pals. Four specialist lanes. See who guides each part of the work."
              to="/meet-the-pals"
            />
            <Card
              lane="spotlight"
              glyph="chat"
              title="Trust the proof"
              body="Hear how the work felt to clients — in their own words."
              to="/resources/reviews"
            />
          </CardGrid>
        </div>
      </Section>

      <CtaBand
        title="Ready to make the value easier to see?"
        subtitle="Bring us the repeated question, unclear offer, or invisible expertise. We will map the first useful asset."
      />
    </PageShell>
  );
}
