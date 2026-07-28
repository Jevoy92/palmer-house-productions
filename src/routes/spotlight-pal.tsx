import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, Card, CardGrid, FaqList, CtaBand, Eyebrow } from "@/components/site/PageShell";
import scene from "@/assets/spotlight-pal-stage.webp.asset.json";
import { MissionComparison } from "@/components/site/MissionComparison";
import kareem from "@/assets/Kareem_standing_full.webp.asset.json";
import kiana from "@/assets/Kiana_standing_full.webp.asset.json";

const PACKAGES = [
  { title: "Brand Presence Kit", pain: "People don't know who we really are." },
  { title: "Proof Builder Kit", pain: "We need clients to sell for us." },
  { title: "Offer Clarity Kit", pain: "People don't understand our offer." },
  { title: "Objection Crusher Set", pain: "Buyers keep hesitating at the same point." },
  { title: "BTS Credibility Pack", pain: "We need to show we're legit." },
];

const INCLUDED = [
  "Professional Lighting & Audio Setup",
  "Script Consultation & Storyboarding",
  "4K Resolution Export",
  "Licensed Background Music",
  "1 Revision Round per Video",
];

const STEPS = [
  { step: "1. Book", body: "Select your package and schedule your session online." },
  { step: "2. Prepare", body: "We send you a prep guide and script templates." },
  { step: "3. Film", body: "Our pro team films you in our studio or on location." },
  { step: "4. Launch", body: "Receive your polished videos ready for social media." },
];

const FAQS = [
  { q: "How long does editing take?", a: "Usually 5-7 business days after the shoot." },
  { q: "Can I add more videos later?", a: "Yes, footage is kept for 6 months." },
];

function SpotlightPalPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Video Production Packages"
        title="Elevate Your Brand With"
        highlight="Cinematic Precision"
        subtitle="Kareem obsesses over every frame. Premium video packages built for brands that demand polished, high-production storytelling."
      />

      <Section>
        <img
          src={scene.url}
          alt="Spotlight Pal stage set with Kareem and Kiana filming a live audience session"
          loading="lazy"
          className="mx-auto w-full max-w-4xl"
        />
      </Section>

      <Section muted>
        <div className="grid items-center gap-8 sm:grid-cols-2">
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <img src={kareem.url} alt="Kareem, the Spotlight Pal production quality character" className="mx-auto h-56 w-auto object-contain" />
              <p className="mt-2 font-display font-bold">Kareem</p>
              <p className="text-xs text-muted-foreground">Production Quality</p>
            </div>
            <div className="text-center">
              <img src={kiana.url} alt="Kiana, the Spotlight Pal creative direction character" className="mx-auto h-56 w-auto object-contain" />
              <p className="mt-2 font-display font-bold">Kiana</p>
              <p className="text-xs text-muted-foreground">Creative Direction</p>
            </div>
          </div>
          <div>
            <Eyebrow>Spotlight Pal</Eyebrow>
            <p className="mt-4 italic text-muted-foreground">
              "People will judge you before they understand you. I learned that the hard way. Now I make 'good' become 'credible' — first impressions that decide outcomes." — Kareem
            </p>
            <p className="mt-4 italic text-muted-foreground">
              "Most people don't need more takes — they need better direction. I make the founder feel like themselves instead of a nervous robot." — Kiana
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Packages" title="Missions Built for Every Trust Gap">
        <CardGrid cols={3}>
          {PACKAGES.map((p, i) => (
            <Card key={p.title} index={i + 1} title={p.title} body={`"${p.pain}"`} />
          ))}
        </CardGrid>
      </Section>

      <Section eyebrow="Pricing" title="How the Spotlight Pal Session Works">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-soft">
          <p className="text-sm font-semibold text-muted-foreground">Brand Presence Kit — 1 of 5</p>
          <h3 className="mt-1 font-display text-xl font-bold">
            Premium 1-minute videos that answer "who are you?"—founder story, company overview, and mission.
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            2-hour cinematic filming session, polished 1-minute brand videos.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-secondary/50 p-4">
              <p className="text-xs font-bold uppercase text-muted-foreground">Production Session</p>
              <p className="text-gradient-brand font-display text-2xl font-extrabold">$450</p>
              <p className="mt-1 text-xs text-muted-foreground">Covers setup, lighting, audio, and direction</p>
            </div>
            <div className="rounded-xl bg-secondary/50 p-4">
              <p className="text-xs font-bold uppercase text-muted-foreground">Additional Videos (4)</p>
              <p className="text-gradient-brand font-display text-2xl font-extrabold">$600</p>
              <p className="mt-1 text-xs text-muted-foreground">1 min each • $150 each. Same session, already set up</p>
            </div>
            <div className="rounded-xl p-4 text-white" style={{ backgroundColor: "var(--spotlight)" }}>
              <p className="text-xs font-bold uppercase text-white/80">Package Total</p>
              <p className="font-display text-2xl font-extrabold">$1,050</p>
              <p className="mt-1 text-xs text-white/80">Only 4 spots left this month</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/contact"
              className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow"
              style={{ backgroundColor: "var(--spotlight)" }}
            >
              Customize This Package
            </Link>
          </div>
        </div>
      </Section>

      <Section eyebrow="What's Included" title="Every Spotlight Pal Session Includes" muted>
        <CardGrid cols={3}>
          {INCLUDED.map((item, i) => (
            <Card key={item} index={i + 1} title={item} />
          ))}
        </CardGrid>
      </Section>

      <MissionComparison />

      <Section eyebrow="How It Works" title="From Concept to Final Cut">
        <CardGrid cols={4}>
          {STEPS.map((s) => (
            <Card key={s.step} title={s.step} body={s.body} />
          ))}
        </CardGrid>
      </Section>

      <Section muted>
        <blockquote className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
          <p className="text-lg italic text-muted-foreground">
            "Jevoy and his team did an amazing job with pictures & videos of our team and stores. Our management was blown away by the quality, professionalism, and speed at which their media was produced."
          </p>
          <footer className="mt-4 font-display font-bold">Isabella Johnstun — Google Review</footer>
        </blockquote>
      </Section>

      <Section eyebrow="FAQ" title="Common Questions">
        <FaqList items={FAQS} />
      </Section>

      <CtaBand title="Ready to Step Into the Spotlight?" subtitle="Don't let your story go unheard. Book your session today and start connecting with your audience on a deeper level." primaryLabel="Book Spotlight Pal Now" />
    </PageShell>
  );
}

export const Route = createFileRoute("/spotlight-pal")({
  head: () => ({
    meta: [
      { title: "Spotlight Pal | Trust & Presence Video | Palmer House Productions" },
      {
        name: "description",
        content: "Kareem and Kiana craft cinematic, trust-building video assets that make your brand feel credible, premium, and real.",
      },
      { property: "og:title", content: "Spotlight Pal | Palmer House Productions" },
      { property: "og:description", content: "Premium video packages built for brands that demand polished, high-production storytelling." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SpotlightPalPage,
});
