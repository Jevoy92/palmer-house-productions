import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, Card, CardGrid, FaqList, CtaBand } from "@/components/site/PageShell";

const pals = [
  { name: "Spotlight Pal", quote: "\u201cPeople don't know who we really are.\u201d", tags: ["Story", "Identity"] },
  { name: "Reel Pal", quote: "\u201cPeople don't know what we actually do.\u201d", tags: ["Reels", "Momentum"] },
  { name: "Evergreen Pal", quote: "\u201cWe answer the same questions over and over.\u201d", tags: ["Authority", "SEO"] },
  { name: "System Pal", quote: "\u201cNew hires take forever to get up to speed.\u201d", tags: ["Training", "SOPs"] },
];

const lanes = [
  { name: "Production Session", price: "$450", body: "One professional shoot session at your location or ours — includes crew, equipment, and direction for a single day of filming." },
  { name: "Additional Videos", price: "$150 each", body: "Add extra finished videos to any production session once you're already set up and rolling." },
];

const evergreenTiers = [
  { name: "Evergreen Starter", price: "$1,050", body: "A focused batch of long-form, SEO-optimized educational videos to start building your authority library." },
  { name: "Evergreen Growth", price: "$1,650", body: "An expanded content batch for brands ready to cover more topics and build out a fuller FAQ library." },
  { name: "Evergreen Authority", price: "$2,250", body: "Our most comprehensive evergreen package for brands going all-in on long-term organic content and thought leadership." },
];

const faqs = [
  { q: "How does the session pricing work?", a: "Each Production Session is a flat $450 and includes a full shoot day with our crew. Additional finished videos from that same session are $150 each." },
  { q: "Can I mix content from different Pals?", a: "Yes. Many clients combine Reel Pal short-form content with Spotlight Pal brand films or System Pal training videos in the same engagement." },
  { q: "What happens after I checkout?", a: "You'll receive a confirmation email with our Production Day Guide and a scheduling link to lock in your session date." },
  { q: "How long does post-production take?", a: "Standard turnaround is 1-2 weeks depending on the number and complexity of videos in your package." },
  { q: "What if I need more videos later?", a: "You can always book another Production Session or add Additional Videos at $150 each to an upcoming session." },
  { q: "Do I need to provide a script?", a: "No. Your Pal will help you prepare talking points, or you can use one of our DIY script bundles ahead of time." },
  { q: "What's included in a production session?", a: "Professional crew, camera and lighting equipment, on-set direction, and raw footage capture for the day's shoot." },
];

function ProductionPricingPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Build Your Package"
        title="Production"
        highlight="Pricing"
        subtitle="Customize your content needs in three simple steps: choose your Pal, pick a mission, and check out."
      />

      <Section eyebrow="Step 1" title="Choose a Pal" subtitle="Each Pal solves a different business problem. Pick the one that matches yours.">
        <CardGrid cols={4}>
          {pals.map((p) => (
            <div key={p.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold">{p.name}</h3>
              <p className="mt-2 text-sm italic text-muted-foreground">{p.quote}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </CardGrid>
      </Section>

      <Section muted eyebrow="Core Pricing" title="Production Session Lanes" subtitle="A simple, flat-rate model for standard production sessions.">
        <CardGrid cols={2}>
          {lanes.map((l) => (
            <div key={l.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg font-bold">{l.name}</h3>
                <span className="text-gradient-brand font-display text-2xl font-extrabold">{l.price}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{l.body}</p>
            </div>
          ))}
        </CardGrid>
      </Section>

      <Section eyebrow="Evergreen Pal" title="Evergreen Content Tiers" subtitle="For brands investing in long-form, SEO-optimized authority content, choose the tier that fits your library goals.">
        <CardGrid cols={3}>
          {evergreenTiers.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg font-bold">{t.name}</h3>
                <span className="text-gradient-brand font-display text-2xl font-extrabold">{t.price}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </CardGrid>
      </Section>

      <Section muted eyebrow="Compare" title="Lane Comparison Summary">
        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-4">Lane</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-5 py-4 font-semibold">Production Session</td>
                <td className="px-5 py-4">$450</td>
                <td className="px-5 py-4 text-muted-foreground">A single shoot day with any Pal</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-5 py-4 font-semibold">Additional Videos</td>
                <td className="px-5 py-4">$150 each</td>
                <td className="px-5 py-4 text-muted-foreground">Extending an existing session</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-5 py-4 font-semibold">Evergreen Starter</td>
                <td className="px-5 py-4">$1,050</td>
                <td className="px-5 py-4 text-muted-foreground">Kicking off an authority library</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-5 py-4 font-semibold">Evergreen Growth</td>
                <td className="px-5 py-4">$1,650</td>
                <td className="px-5 py-4 text-muted-foreground">Covering more topics and FAQs</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-semibold">Evergreen Authority</td>
                <td className="px-5 py-4">$2,250</td>
                <td className="px-5 py-4 text-muted-foreground">Full-scale long-term content investment</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="Builder FAQ" title="Common Questions">
        <FaqList items={faqs} />
      </Section>

      <CtaBand title="Ready to Build Your Package?" subtitle="Choose your Pal, pick a mission, and let's get your session on the calendar." />
    </PageShell>
  );
}

export const Route = createFileRoute("/production-pricing")({
  head: () => ({
    meta: [
      { title: "Production Pricing | Palmer House Productions" },
      { name: "description", content: "Transparent production pricing: $450 Production Sessions, $150 additional videos, and Evergreen content tiers from $1,050 to $2,250." },
      { property: "og:title", content: "Production Pricing | Palmer House Productions" },
      { property: "og:description", content: "Build your custom video package by choosing a Pal, picking a mission, and checking out." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductionPricingPage,
});
