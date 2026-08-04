import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  Card,
  CardGrid,
  CtaBand,
  Eyebrow,
} from "@/components/site/PageShell";

const TRANSFORMATIONS = [
  { from: "Messy thoughts", to: "Clear messages" },
  { from: "Invisible value", to: "Living proof" },
  { from: "Repetition", to: "Reusable assets" },
  { from: "Chaos", to: "Systems" },
];

const PILLARS = [
  {
    title: "Spotlight",
    body: "Professional brand stories that showcase your team, culture, and expertise to the world.",
    index: "Brand Trust",
  },
  {
    title: "Reel",
    body: "Short-form content engineered for social platforms — hooks, cuts, and calls-to-action that convert.",
    index: "Social Reach",
  },
  {
    title: "Evergreen",
    body: "Timeless assets — FAQs, onboarding, training — that work 24/7 without repeating yourself.",
    index: "Time Saved",
  },
  {
    title: "System",
    body: "Full content ecosystems that tie everything together into a measurable, scalable machine.",
    index: "Efficiency",
  },
];

const APPROACH = [
  {
    n: "01",
    title: "Discovery",
    body: "We listen before we film. Map your goals, audience, and bottlenecks.",
  },
  {
    n: "02",
    title: "Strategy",
    body: "Design a video system that solves problems — not just fills a feed.",
  },
  {
    n: "03",
    title: "Production",
    body: "Professional shoots with a team that makes you feel confident on camera.",
  },
  {
    n: "04",
    title: "Launch",
    body: "Delivery, optimization, and ongoing support to keep your system sharp.",
  },
];

const VALUES = [
  {
    title: "Systems over Shortcuts",
    body: "We don't follow trends — we build systems. Anyone can post a video. We build assets that answer questions, close sales, train teams, and keep working long after they're published.",
    line: "Templates create noise. Systems create results.",
  },
  {
    title: "Clarity over Clicks",
    body: "We don't make content for algorithms. We create videos that solve real business problems — confused customers, slow sales calls, repetitive onboarding, and untrained staff.",
    line: "Trends disappear. Clear communication compounds.",
  },
  {
    title: "Efficiency over Excess",
    body: "Most businesses waste time explaining the same things over and over. We turn those answers into video assets — once, clearly — so they can be used again and again.",
    line: "Clarity drives action. Efficiency drives profit.",
  },
  {
    title: "Connection over Performance",
    body: "People don't buy the best company — they buy the one they trust the most. That trust doesn't come from perfect scripts. It comes from honesty, presence, and proof.",
    line: "Vulnerability builds loyalty. Humanity builds brands.",
  },
];

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us | Palmer House Productions" },
      {
        name: "description",
        content:
          "Palmer House Productions is a translation company that uses cameras and editing as tools — turning messy thoughts into clear messages and chaos into systems.",
      },
      { property: "og:title", content: "About Us | Palmer House Productions" },
      {
        property: "og:description",
        content: "We don't make videos. We transform how your business communicates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutUsPage,
});

function AboutUsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Palmer House"
        title="We Don't Make Videos."
        highlight="We Transform."
        subtitle="Messy thoughts into clear messages. Invisible value into proof. Repetitive explanations into reusable assets. Chaos into systems."
      />

      <Section muted>
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {TRANSFORMATIONS.map((t) => (
            <div
              key={t.from}
              className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-soft"
            >
              <span className="text-sm font-semibold text-muted-foreground">{t.from}</span>
              <span className="text-muted-foreground">→</span>
              <span className="font-display text-sm font-bold text-gradient-brand">{t.to}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Our Mission"
        title="Your Business Has a Story. We Make Sure It's Heard."
        subtitle="Palmer House Productions is a translation company that uses cameras and editing as tools. We turn invisible expertise into visible proof, one-time explanations into evergreen assets, and scattered ideas into cohesive video systems."
      />

      <Section
        eyebrow="What We Build"
        title="Four Pillars of Video Strategy"
        subtitle="Every project maps to one of four strategic outcomes — designed to solve real business problems."
        muted
      >
        <CardGrid cols={4}>
          {PILLARS.map((p) => (
            <Card key={p.title} title={p.title} body={p.body} index={p.index} />
          ))}
        </CardGrid>
      </Section>

      <Section
        eyebrow="Our Approach"
        title="Built Like a Workshop, Not an Assembly Line"
        subtitle="Every project starts with understanding — not a template. We map your pain points, design the system, produce with precision, and launch with confidence."
      >
        <CardGrid cols={4}>
          {APPROACH.map((a) => (
            <Card key={a.n} title={a.title} body={a.body} index={a.n} />
          ))}
        </CardGrid>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>From the Founder</Eyebrow>
          <p className="mt-6 font-display text-2xl font-semibold italic leading-snug sm:text-3xl">
            "I grew up knowing that stories could change lives — but only if told with truth,
            courage, and soul."
          </p>
          <p className="mt-4 text-sm font-semibold text-muted-foreground">
            Jevoy Palmer, Founder &amp; Lead Creative Guide
          </p>
        </div>
      </Section>

      <Section
        eyebrow="Our Team"
        title="The Palmer House Team"
        subtitle="Meet the video production professionals who bring your stories to life."
      >
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
          <h3 className="font-display text-xl font-bold">Jevoy Palmer</h3>
          <p className="mt-1 text-sm font-semibold text-muted-foreground">Founder &amp; CEO</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Jevoy is the visionary behind Palmer House Productions. A filmmaker, strategist, and
            storyteller at heart, he leads with the belief that video isn't just content — it's a
            business tool. Known for making even the most camera-shy clients feel confident on set,
            he's passionate about turning complex ideas into cinematic clarity.
          </p>
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/pals"
            className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow"
            style={{ backgroundColor: "var(--spotlight)" }}
          >
            Meet the Pals
          </Link>
        </div>
      </Section>

      <Section
        eyebrow="Our Values"
        title="What We Stand For"
        subtitle="These principles guide every project and client relationship."
        muted
      >
        <CardGrid cols={2}>
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              <p className="mt-3 text-sm font-semibold text-gradient-brand">{v.line}</p>
            </div>
          ))}
        </CardGrid>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
            Our Work Doesn't Shout. It Echoes.
          </h2>
          <p className="mt-3 text-muted-foreground">
            We don't make noise. We make movement — video content that feels aligned, moves like
            strategy, and leaves a lasting emotional fingerprint long after the scroll.
          </p>
        </div>
      </Section>

      <CtaBand
        title="Ready to Tell Your Story?"
        subtitle="Let's turn your expertise into an asset that works for you every day."
      />
    </PageShell>
  );
}
