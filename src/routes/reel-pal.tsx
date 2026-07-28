import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, Card, CardGrid, FaqList, CtaBand, Eyebrow } from "@/components/site/PageShell";
import { MissionComparison } from "@/components/site/MissionComparison";
import ryder from "@/assets/Ryder_standing_full.webp.asset.json";
import raquel from "@/assets/Raquel_standing_full.png.asset.json";

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
  { q: "How many videos per session?", a: "Typically 6–14 short-form videos in a single 2-hour session." },
  { q: "What platforms do you optimize for?", a: "Instagram Reels, TikTok, YouTube Shorts, and LinkedIn." },
];

function ReelPalPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Short-Form Video Packages"
        title="Stop the Scroll With"
        highlight="Relentless Momentum"
        subtitle="Ryder engineers the first 3 seconds. Punchy, platform-native video packages built for brands that need to be seen."
      />

      <Section muted>
        <div className="grid items-center gap-8 sm:grid-cols-2">
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <img src={ryder.url} alt="Ryder, the Reel Pal momentum character" className="mx-auto h-56 w-auto object-contain" />
              <p className="mt-2 font-display font-bold">Ryder</p>
              <p className="text-xs text-muted-foreground">Momentum</p>
            </div>
            <div className="text-center">
              <img src={raquel.url} alt="Raquel, the Reel Pal engagement character" className="mx-auto h-56 w-auto object-contain" />
              <p className="mt-2 font-display font-bold">Raquel</p>
              <p className="text-xs text-muted-foreground">Engagement</p>
            </div>
          </div>
          <div>
            <Eyebrow>Reel Pal</Eyebrow>
            <p className="mt-4 italic text-muted-foreground">
              "If you don't catch attention fast, you don't get a second chance. I learned that early. Now I make brands feel alive in 10 seconds." — Ryder
            </p>
            <p className="mt-4 italic text-muted-foreground">
              "Ryder lights the match. I make sure the fire doesn't burn the house down. People don't listen when they feel judged — I make them feel safe enough to show up." — Raquel
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
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-soft">
          <p className="text-sm font-semibold text-muted-foreground">Services Pack — 1 of 6</p>
          <h3 className="mt-1 font-display text-xl font-bold">
            Punchy reels that explain exactly what you do—so prospects stop asking "wait, what do you actually do?"
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            2-hour filming session with direction, edited short-form videos ready to post.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-secondary/50 p-4">
              <p className="text-xs font-bold uppercase text-muted-foreground">Production Session</p>
              <p className="text-gradient-brand font-display text-2xl font-extrabold">$450</p>
              <p className="mt-1 text-xs text-muted-foreground">Covers setup, lighting, audio, and direction</p>
            </div>
            <div className="rounded-xl bg-secondary/50 p-4">
              <p className="text-xs font-bold uppercase text-muted-foreground">Additional Videos (6)</p>
              <p className="text-gradient-brand font-display text-2xl font-extrabold">$900</p>
              <p className="mt-1 text-xs text-muted-foreground">1 min each • $150 each. Same session, already set up</p>
            </div>
            <div className="rounded-xl p-4 text-white" style={{ backgroundImage: "var(--gradient-brand)" }}>
              <p className="text-xs font-bold uppercase text-white/80">Package Total</p>
              <p className="font-display text-2xl font-extrabold">$1,350</p>
              <p className="mt-1 text-xs text-white/80">Only 4 spots left this month</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/contact"
              className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow"
              style={{ backgroundImage: "var(--gradient-brand)" }}
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
        <blockquote className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
          <p className="text-lg italic text-muted-foreground">
            "Palmer House helped us create a month's worth of social content in a single afternoon. The quality and turnaround blew us away."
          </p>
          <footer className="mt-4 font-display font-bold">Martin K. — Google Review</footer>
        </blockquote>
      </Section>

      <Section eyebrow="FAQ" title="Common Questions">
        <FaqList items={FAQS} />
      </Section>

      <CtaBand title="Ready to Own the Feed?" subtitle="Stop scrolling past your own potential. Book your session and start creating content that stops thumbs." primaryLabel="Book Reel Pal Now" />
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
      { property: "og:description", content: "Short-form video packages engineered for momentum and visibility." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReelPalPage,
});
