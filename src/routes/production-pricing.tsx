import { createFileRoute } from "@tanstack/react-router";
import { QuoteBuilder } from "@/components/pricing/QuoteBuilder";
import { PageShell } from "@/components/site/PageShell";
import { FaqList, Section } from "@/components/site/PageShell";
import { PAL_GROUPS } from "@/lib/pricing-catalog";

const PRICING_FAQS = [
  {
    q: "Is this the final price?",
    a: "It is a transparent working estimate using the published Palmer House pricing model. Scope, tax, travel, schedule, and the final deposit are confirmed before payment.",
  },
  {
    q: "Can I mix more than one Pal?",
    a: "Yes. The best video systems often combine lanes—for example Spotlight proof with Reel distribution or Evergreen education with System onboarding.",
  },
  {
    q: "Do I own the footage and finished work?",
    a: "Upon final payment, you own the footage, finished videos, and source files.",
  },
  {
    q: "Can this become a monthly plan?",
    a: "Yes. Choose a monthly rhythm in the shop. The exact recurring deliverables are scoped first, then connected to Stripe Billing rather than charging a guessed subscription.",
  },
];

function ProductionPricingPage() {
  return (
    <PageShell>
      <main className="pricing-page">
        <section className="pricing-hero">
          <h1 className="pricing-title">Build the video system your business actually needs.</h1>
          <p className="pricing-lede">
            Choose the problems you want to solve, see your working estimate update in real time,
            and bring the plan to a free strategy call.
          </p>
          <div className="pricing-proof" aria-label="Pricing highlights">
            <span>Start with one Pal</span>
            <span>Mix lanes as needed</span>
            <span>Own the final assets</span>
          </div>
        </section>
        <QuoteBuilder />
        <Section
          title="Compare the four ways video can work."
          subtitle="Every lane begins with a different business bottleneck. Mix them when the problem crosses lanes."
          muted
        >
          <div className="grid gap-px overflow-hidden rounded-[2rem] bg-border md:grid-cols-2 lg:grid-cols-4">
            {PAL_GROUPS.map((group) => (
              <article key={group.id} className="min-h-64 bg-white p-6">
                <span
                  className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: `var(--${group.accent})` }}
                >
                  {group.role}
                </span>
                <h2 className="mt-5 text-2xl font-bold">{group.tagline}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{group.pitch}</p>
                <p className="mt-7 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {group.items.length} preset missions · fully customizable
                </p>
              </article>
            ))}
          </div>
        </Section>
        <Section title="Pricing questions, answered before the call.">
          <FaqList items={PRICING_FAQS} />
        </Section>
      </main>
    </PageShell>
  );
}

export const Route = createFileRoute("/production-pricing")({
  head: () => ({
    meta: [
      { title: "Build Your Video Package | Palmer House Productions" },
      {
        name: "description",
        content:
          "Build a working Palmer House video estimate by choosing the Pal lanes and missions that match your business problems.",
      },
      { property: "og:title", content: "Build Your Video Package | Palmer House Productions" },
      {
        property: "og:description",
        content: "Choose your Pals, build an estimate, and bring the plan to a free strategy call.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductionPricingPage,
});
