import { createFileRoute } from "@tanstack/react-router";
import { QuoteBuilder } from "@/components/pricing/QuoteBuilder";
import { PageShell } from "@/components/site/PageShell";

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
