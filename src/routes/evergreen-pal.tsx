import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, Card, CardGrid, FaqList, CtaBand, Eyebrow } from "@/components/site/PageShell";
import scene from "@/assets/evergreen-pal-studio.webp.asset.json";
import { MissionComparison } from "@/components/site/MissionComparison";
import cyrus from "@/assets/Cyrus_standing_full.png.asset.json";
import clara from "@/assets/Clara_standing_full.png.asset.json";

const PACKAGES = [
  { title: "FAQ Deep Dive", pain: "We answer the same questions over and over." },
  { title: "How It Works", pain: "Prospects don't understand our process." },
  { title: "Myth vs Reality", pain: "Our industry is full of misconceptions." },
  { title: "Case Study Breakdown", pain: "We have great results but no detailed proof." },
  { title: "Founder POV", pain: "People don't know what we stand for." },
];

const INCLUDED = [
  "Full Script Development & Research",
  "Professional Multi-Camera Setup",
  "SEO-Optimized Titles & Descriptions",
  "Custom Thumbnails & Graphics",
  "Full Post-Production & Color Grade",
];

const STEPS = [
  { step: "1. Plan", body: "We map your expertise into a structured content series." },
  { step: "2. Script", body: "Full scripts and research prepared before filming day." },
  { step: "3. Film", body: "Multi-camera production with professional direction." },
  { step: "4. Publish", body: "Fully edited, SEO-optimized episodes ready to grow." },
];

const FAQS = [
  { q: "How long is the production cycle?", a: "Typically 2–3 weeks from script to final delivery." },
  { q: "Can I repurpose the footage?", a: "Yes! Long-form content can be cut into shorts and clips." },
];

function EvergreenPalPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Long-Form Video Packages"
        title="Build Authority With"
        highlight="Evergreen Content"
        subtitle="Cyrus turns scattered expertise into structured video series. Long-form content packages that compound in value over time."
      />

      <Section>
        <img
          src={scene.url}
          alt="Evergreen Pal library studio where Cyrus and Clara record long-form content"
          loading="lazy"
          className="mx-auto w-full max-w-4xl"
        />
      </Section>

      <Section muted>
        <div className="grid items-center gap-8 sm:grid-cols-2">
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <img src={cyrus.url} alt="Cyrus, the Evergreen Pal strategy character" className="mx-auto h-56 w-auto object-contain" />
              <p className="mt-2 font-display font-bold">Cyrus</p>
              <p className="text-xs text-muted-foreground">Strategy</p>
            </div>
            <div className="text-center">
              <img src={clara.url} alt="Clara, the Evergreen Pal clarity character" className="mx-auto h-56 w-auto object-contain" />
              <p className="mt-2 font-display font-bold">Clara</p>
              <p className="text-xs text-muted-foreground">Clarity</p>
            </div>
          </div>
          <div>
            <Eyebrow>Evergreen Pal</Eyebrow>
            <p className="mt-4 italic text-muted-foreground">
              "Trendy content dies in 48 hours. I build video libraries that compound — assets that drive leads for years, not days." — Cyrus
            </p>
            <p className="mt-4 italic text-muted-foreground">
              "Great ideas get buried under rambling. I structure your knowledge into clear, repeatable video assets that educate once and scale forever." — Clara
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Packages" title="Missions Built for Every Authority Gap">
        <CardGrid cols={3}>
          {PACKAGES.map((p, i) => (
            <Card key={p.title} index={i + 1} title={p.title} body={`"${p.pain}"`} />
          ))}
        </CardGrid>
      </Section>

      <Section eyebrow="Pricing" title="How the Evergreen Pal Session Works">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-soft">
          <p className="text-sm font-semibold text-muted-foreground">FAQ Deep Dive — 1 of 5</p>
          <h3 className="mt-1 font-display text-xl font-bold">
            Answer your top 3-5 questions in depth so you never repeat yourself—one video that works 24/7.
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            2-hour filming session, topic planning, on-camera direction, final edit + Self-Clip Kit.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-secondary/50 p-4 text-center">
              <p className="text-xs font-bold uppercase text-muted-foreground">Episode Length: 5 min</p>
              <p className="text-gradient-brand font-display text-2xl font-extrabold">$1,050</p>
            </div>
            <div className="rounded-xl bg-secondary/50 p-4 text-center">
              <p className="text-xs font-bold uppercase text-muted-foreground">Episode Length: 10 min</p>
              <p className="text-gradient-brand font-display text-2xl font-extrabold">$1,650</p>
            </div>
            <div className="rounded-xl bg-secondary/50 p-4 text-center">
              <p className="text-xs font-bold uppercase text-muted-foreground">Episode Length: 15 min</p>
              <p className="text-gradient-brand font-display text-2xl font-extrabold">$2,250</p>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">Only 5 spots left this month</p>
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

      <Section eyebrow="What's Included" title="Every Evergreen Pal Session Includes" muted>
        <CardGrid cols={3}>
          {INCLUDED.map((item, i) => (
            <Card key={item} index={i + 1} title={item} />
          ))}
        </CardGrid>
      </Section>

      <MissionComparison />

      <Section eyebrow="How It Works" title="From Expertise to Authority">
        <CardGrid cols={4}>
          {STEPS.map((s) => (
            <Card key={s.step} title={s.step} body={s.body} />
          ))}
        </CardGrid>
      </Section>

      <Section muted>
        <blockquote className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
          <p className="text-lg italic text-muted-foreground">
            "The evergreen video series they built for us continues to drive organic traffic months later. It's the gift that keeps giving."
          </p>
          <footer className="mt-4 font-display font-bold">David R. — Client Review</footer>
        </blockquote>
      </Section>

      <Section eyebrow="FAQ" title="Common Questions">
        <FaqList items={FAQS} />
      </Section>

      <CtaBand title="Ready to Build Lasting Authority?" subtitle="Stop creating content that expires. Build a video library that compounds in value and drives organic growth for years." primaryLabel="Book Evergreen Pal Now" />
    </PageShell>
  );
}

export const Route = createFileRoute("/evergreen-pal")({
  head: () => ({
    meta: [
      { title: "Evergreen Pal | Long-Form Authority Content | Palmer House Productions" },
      {
        name: "description",
        content: "Cyrus and Clara build structured, long-form video series that compound into organic traffic and lasting authority.",
      },
      { property: "og:title", content: "Evergreen Pal | Palmer House Productions" },
      { property: "og:description", content: "Long-form video content packages that compound in value over time." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EvergreenPalPage,
});
