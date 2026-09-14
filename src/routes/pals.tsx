import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, CtaBand, Eyebrow } from "@/components/site/PageShell";
import ryder from "@/assets/pals-optimized/ryder.webp";
import raquel from "@/assets/pals-optimized/raquel.webp";
import silas from "@/assets/pals-optimized/silas.webp";
import samira from "@/assets/pals-optimized/samira.webp";
import cyrus from "@/assets/pals-optimized/cyrus.webp";
import clara from "@/assets/pals-optimized/clara.webp";
import kareem from "@/assets/pals-optimized/kareem.webp";
import kiana from "@/assets/pals-optimized/kiana.webp";

const LANES = [
  {
    key: "reel",
    path: "/reel-pal",
    tag: "REEL — SHORT-FORM OUTPUT. MOMENTUM. DISTRIBUTION ENERGY.",
    title: "Stop Scrolling. Start Watching.",
    quotes: [
      {
        text: "If you don't catch attention fast, you don't get a second chance. I learned that early. Now I make brands feel alive in 10 seconds.",
        who: "Ryder",
      },
      {
        text: "Ryder lights the match. I make sure the fire doesn't burn the house down. People don't listen when they feel judged — I make them feel safe enough to show up.",
        who: "Raquel",
      },
    ],
    problem:
      "You post but nothing moves. You don't know what to film next. You have long videos but no clips.",
    solution:
      "Short-form content engineered for the platforms your people actually use. Hooks that stop scrolls. Clips that sound like you.",
    offerings: [
      { title: "The Hook Punch", quote: "One line, instant watch time. — Ryder" },
      { title: "Platform-Native Reels", quote: "Edits for identity — not just trends. — Raquel" },
      { title: "Consistent Cadence", quote: "Your clips finally sound like you. — Raquel" },
    ],
    signature: "The Hook Punch — one line, instant watch time.",
    cta: "Start Creating",
    a: ryder,
    b: raquel,
    aAlt: "Ryder, the Reel Pal momentum character",
    bAlt: "Raquel, the Reel Pal engagement character",
  },
  {
    key: "system",
    path: "/system-pal",
    tag: "SYSTEM — INTERNAL CLARITY. REPEATABILITY. OPERATIONAL SANITY.",
    title: "Make It Run Without Heroic Effort",
    quotes: [
      {
        text: "Chaos punishes everyone — especially the most responsible person in the room.",
        who: "Silas",
      },
      {
        text: "Samira became competent because she had to. She's the one who makes systems feel human — accountable without shame.",
        who: "Samira",
      },
    ],
    problem:
      "Your team answers the same questions. Onboarding is different every time. Processes exist only in people's heads.",
    solution:
      "Video systems that document once, scale forever, and don't require heroic effort to maintain.",
    offerings: [
      { title: "Training Videos", quote: "If we can't repeat it, we can't scale it. — Silas" },
      {
        title: "Onboarding Flows",
        quote: "Tell me what you need. Tell me what you can actually do. — Samira",
      },
      { title: "FAQ Buildouts", quote: "We're not rushing — we're aligning. — Samira" },
    ],
    signature: "The System Blueprint — one framework that makes video chaos disappear.",
    cta: "Build Your System",
    a: silas,
    b: samira,
    aAlt: "Silas, the System Pal automation character",
    bAlt: "Samira, the System Pal architecture character",
  },
  {
    key: "evergreen",
    path: "/evergreen-pal",
    tag: "EVERGREEN — LONG-FORM AUTHORITY. EDUCATION. COMPOUNDING ASSETS.",
    title: "Content That Compounds, Not Expires",
    quotes: [
      {
        text: "Trendy content dies in 48 hours. I build video libraries that compound — assets that drive leads for years, not days.",
        who: "Cyrus",
      },
      {
        text: "Great ideas get buried under rambling. I structure your knowledge into clear, repeatable video assets that educate once and scale forever.",
        who: "Clara",
      },
    ],
    problem:
      "Your expertise isn't organized on video. Sales calls keep repeating the same education. Your message changes every video.",
    solution:
      "Structured video series that make endless content feel obvious. Scripts with clarity — no fluff, no tangents.",
    offerings: [
      { title: "The Topic Ladder", quote: "Let's define the real problem first. — Cyrus" },
      {
        title: "YouTube & Podcast Systems",
        quote: "Finished and useful beats perfect and hidden. — Cyrus",
      },
      {
        title: "The Clean Cut Outline",
        quote: "We can keep the emotion. We're removing the fog. — Clara",
      },
    ],
    signature: "The Topic Ladder — structured series that never runs out of ideas.",
    cta: "Build Authority",
    a: cyrus,
    b: clara,
    aAlt: "Cyrus, the Evergreen Pal strategy character",
    bAlt: "Clara, the Evergreen Pal clarity character",
  },
  {
    key: "spotlight",
    path: "/spotlight-pal",
    tag: "SPOTLIGHT — TRUST ASSETS. PROOF. PRESENCE.",
    title: "Credibility You Can See",
    quotes: [
      {
        text: "People will judge you before they understand you. I learned that the hard way. Now I make 'good' become 'credible' — first impressions that decide outcomes.",
        who: "Kareem",
      },
      {
        text: "Most people don't need more takes — they need better direction. I make the founder feel like themselves instead of a nervous robot.",
        who: "Kiana",
      },
    ],
    problem:
      "You have results but no video proof. You look stiff on camera. You don't sound premium.",
    solution:
      "Trust-building video assets that convert. Testimonials that feel authentic, not cringe. Direction that unlocks natural presence.",
    offerings: [
      { title: "The Mirror Line", quote: "We're not doing extra. We're doing exact. — Kareem" },
      {
        title: "On-Camera Confidence",
        quote: "Stop performing. Start talking to one person. — Kiana",
      },
      { title: "The One-Take Setup", quote: "We fix the environment, not the person. — Kiana" },
    ],
    signature: "The Mirror Line — precision direction that builds instant credibility.",
    cta: "Create Cinematic Content",
    a: kareem,
    b: kiana,
    aAlt: "Kareem, the Spotlight Pal production quality character",
    bAlt: "Kiana, the Spotlight Pal creative direction character",
  },
];

function PalsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Meet the Pals"
        title="Messy Thoughts. Invisible Value."
        highlight="We Turn Them Into Clarity."
        subtitle="Four mission lanes, eight characters, one system. We translate confusion into video assets you can actually use."
      />

      <section className="px-4 pb-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-5 rounded-[2rem] bg-ink p-6 text-center text-white sm:flex-row sm:text-left">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
              Problem-first doorway
            </p>
            <p className="mt-2 text-xl font-bold">
              Tell the Pals what keeps happening. They will point you toward a lane.
            </p>
          </div>
          <Link
            to="/find-your-pal"
            className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink"
          >
            Find your Pal
          </Link>
        </div>
      </section>

      <Section
        eyebrow="Choose Your Lane"
        title="Meet the Team That Turns Confusion Into Clarity"
        subtitle="Every lane is built around a real business problem — pick the one that matches yours."
      >
        <div className="space-y-10">
          {LANES.map((lane) => (
            <div
              key={lane.key}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10"
            >
              <Eyebrow>{lane.tag}</Eyebrow>
              <h3 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">
                {lane.title}
              </h3>

              <div className="mt-6 grid gap-8 lg:grid-cols-[auto,1fr]">
                <div className="flex justify-center gap-4 lg:justify-start">
                  <img
                    src={lane.a}
                    alt={lane.aAlt}
                    className="h-40 w-auto object-contain sm:h-52"
                  />
                  <img
                    src={lane.b}
                    alt={lane.bAlt}
                    className="h-40 w-auto object-contain sm:h-52"
                  />
                </div>

                <div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {lane.quotes.map((q) => (
                      <blockquote
                        key={q.who}
                        className="rounded-xl border border-border bg-secondary/40 p-4 text-sm italic text-muted-foreground"
                      >
                        "{q.text}"
                        <footer className="mt-2 not-italic font-semibold text-foreground">
                          — {q.who}
                        </footer>
                      </blockquote>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        The Problem
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{lane.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        The Solution
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{lane.solution}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {lane.offerings.map((o) => (
                      <div
                        key={o.title}
                        className="rounded-xl border border-border bg-background p-4"
                      >
                        <p className="font-display text-sm font-bold">{o.title}</p>
                        <p className="mt-1 text-xs italic text-muted-foreground">"{o.quote}"</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-secondary/50 p-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        Signature Move
                      </p>
                      <p className="mt-1 text-sm font-semibold">{lane.signature}</p>
                    </div>
                    <Link
                      to={lane.path}
                      className="rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
                      style={{ backgroundColor: `var(--${lane.key})` }}
                    >
                      {lane.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Not Sure Which Pal Is Yours?"
        subtitle="Book a discovery call and we'll help you pick the mission lane that solves your actual problem."
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/pals")({
  head: () => ({
    meta: [
      { title: "Meet the Pals | Palmer House Productions" },
      {
        name: "description",
        content:
          "Reel, System, Evergreen, and Spotlight — the four Palmer House Pal mission lanes that turn messy thoughts and invisible value into video assets you can actually use.",
      },
      { property: "og:title", content: "Meet the Pals | Palmer House Productions" },
      {
        property: "og:description",
        content:
          "Four mission lanes, eight characters, one system for turning confusion into clarity on camera.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PalsPage,
});
