import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  Card,
  CardGrid,
  FaqList,
  CtaBand,
  Eyebrow,
} from "@/components/site/PageShell";
import { MissionComparison } from "@/components/site/MissionComparison";
import ryder from "@/assets/pal-headshots/ryder.png";
import raquel from "@/assets/pal-headshots/raquel.png";

const PACKAGES = [
  { title: "Services Pack", pain: "People don't know what we actually do." },
  { title: "Objection Pack", pain: "Leads keep asking the same hesitant questions." },
  { title: "Proof Pack", pain: "We have results but no video proof." },
  { title: "Day-in-the-Life Pack", pain: "Our content feels too corporate." },
  { title: "POV / Hot Take Pack", pain: "We blend in with everyone else." },
  { title: "30-Day Momentum Pack", pain: "We never know what to post next." },
];

const INCLUDED = [
  "Professional Lighting & Audio Setup",
  "Platform-Optimized Formatting",
  "Trend-Informed Creative Direction",
  "Licensed Background Music",
  "1 Revision Round per Video",
];

const STEPS = [
  { step: "1. Book", body: "Select your package and schedule your session online." },
  { step: "2. Prepare", body: "We send you hooks, scripts, and a content shot list." },
  { step: "3. Film", body: "Our pro team films 6–14 short-form videos in one session." },
  { step: "4. Launch", body: "Receive edited, platform-ready reels within days." },
];

const FAQS = [
  {
    q: "How many videos per session?",
    a: "Typically 6–14 short-form videos in a single 2-hour session.",
  },
  {
    q: "What platforms do you optimize for?",
    a: "Instagram Reels, TikTok, YouTube Shorts, and LinkedIn.",
  },
];

function ReelPalPage() {
  return (
    <PageShell lane="reel">
      <PageHero
        eyebrow="Short-Form Video Packages"
        title="Stop the Scroll With"
        highlight="Relentless Momentum"
        subtitle="Ryder engineers the first 3 seconds. Punchy, platform-native video packages built for brands that need to be seen."
      />

      <Section muted eyebrow="Your Reel guides" title="Meet Ryder and Raquel">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-2xl bg-white p-3 text-center">
              <img
                src={ryder}
                alt="Ryder, the Reel Pal momentum character"
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover"
              />
              <p className="mt-3 font-display text-lg font-bold">Ryder</p>
              <p className="text-sm font-medium text-[var(--lane-ink)]">Momentum</p>
            </div>
            <div className="overflow-hidden rounded-2xl bg-white p-3 text-center">
              <img
                src={raquel}
                alt="Raquel, the Reel Pal engagement character"
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover"
              />
              <p className="mt-3 font-display text-lg font-bold">Raquel</p>
              <p className="text-sm font-medium text-[var(--lane-ink)]">Engagement</p>
            </div>
          </div>
          <div>
            <Eyebrow>Reel Pal</Eyebrow>
            <p className="mt-4 border-l-2 border-[var(--lane)] pl-5 text-base leading-relaxed text-ink-soft">
              "If you don't catch attention fast, you don't get a second chance. I learned that
              early. Now I make brands feel alive in 10 seconds." — Ryder
            </p>
            <p className="mt-4 border-l-2 border-[var(--lane)] pl-5 text-base leading-relaxed text-ink-soft">
              "Ryder lights the match. I make sure the fire doesn't burn the house down. People
              don't listen when they feel judged — I make them feel safe enough to show up." —
              Raquel
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Packages" title="Missions Built for Every Visibility Problem">
        <CardGrid cols={3}>
          {PACKAGES.map((p, i) => (
            <Card key={p.title} index={i + 1} title={p.title} body={`"${p.pain}"`} />
          ))}
        </CardGrid>
      </Section>

      <Section eyebrow="Pricing" title="How the Reel Pal Session Works">
        <div className="mx-auto max-w-4xl rounded-3xl border border-[var(--lane-soft)] border-t-4 border-t-[var(--lane)] bg-white p-6 shadow-soft sm:p-9">
          <p className="text-sm font-semibold text-muted-foreground">Services Pack — 1 of 6</p>
          <h3 className="mt-1 font-display text-xl font-bold">
            Punchy reels that explain exactly what you do—so prospects stop asking "wait, what do
            you actually do?"
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            2-hour filming session with direction, edited short-form videos ready to post.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-[var(--lane-soft)] p-5">
              <p className="text-xs font-bold uppercase text-muted-foreground">
                Production Session
              </p>
              <p className="font-display text-3xl font-extrabold tabular-nums text-[var(--lane-ink)]">
                $450
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Covers setup, lighting, audio, and direction
              </p>
            </div>
            <div className="rounded-2xl bg-[var(--lane-soft)] p-5">
              <p className="text-xs font-bold uppercase text-muted-foreground">
                Additional Videos (6)
              </p>
              <p className="font-display text-3xl font-extrabold tabular-nums text-[var(--lane-ink)]">
                $900
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                1 min each • $150 each. Same session, already set up
              </p>
            </div>
            <div
              className="rounded-2xl p-5 text-white"
              style={{ backgroundColor: "var(--lane-ink)" }}
            >
              <p className="text-xs font-bold uppercase text-white/80">Package Total</p>
              <p className="font-display text-2xl font-extrabold">$1,350</p>
              <p className="mt-1 text-xs text-white/80">
                Final scope confirmed on the strategy call
              </p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--lane-ink)" }}
            >
              Customize This Package
            </Link>
          </div>
        </div>
      </Section>

      <Section eyebrow="What's Included" title="Every Reel Pal Session Includes" muted>
        <CardGrid cols={3}>
          {INCLUDED.map((item, i) => (
            <Card key={item} index={i + 1} title={item} />
          ))}
        </CardGrid>
      </Section>

      <MissionComparison />

      <Section eyebrow="How It Works" title="From Hook to Post">
        <CardGrid cols={4}>
          {STEPS.map((s) => (
            <Card key={s.step} title={s.step} body={s.body} />
          ))}
        </CardGrid>
      </Section>

      <Section muted>
        <blockquote className="mx-auto max-w-3xl border-l-4 border-[var(--lane)] bg-white px-6 py-8 text-left sm:px-9">
          <p className="text-lg italic text-muted-foreground">
            "Jevoy and the Palmer House Team were fantastic! Getting in front of the camera for
            photos is one stressor, but jumping in front of the camera to make a video is even more
            stressful. Jevoy has a gift of helping his clients become grounded and comfortable."
          </p>
          <footer className="mt-4 font-display font-bold">Athan Seyler — Google Review</footer>
        </blockquote>
      </Section>

      <Section eyebrow="FAQ" title="Common Questions">
        <FaqList items={FAQS} />
      </Section>

      <CtaBand
        title="Ready to Own the Feed?"
        subtitle="Stop scrolling past your own potential. Book your session and start creating content that stops thumbs."
        primaryLabel="Book Reel Pal Now"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/reel-pal")({
  head: () => ({
    meta: [
      { title: "Reel Pal | Short-Form Video Packages | Palmer House Productions" },
      {
        name: "description",
        content:
          "Ryder and Raquel engineer punchy, platform-native short-form videos built for brands that need to stop the scroll.",
      },
      { property: "og:title", content: "Reel Pal | Palmer House Productions" },
      {
        property: "og:description",
        content: "Short-form video packages engineered for momentum and visibility.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReelPalPage,
});
