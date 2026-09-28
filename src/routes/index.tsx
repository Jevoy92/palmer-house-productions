import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { HomePackages, HomeStudio, PublicPalGuide, WaysToWork } from "@/components/site/PublicHome";
import { CtaBand, FaqList, PageShell, Section } from "@/components/site/PageShell";
import { HOME_FAQS } from "@/data/site-faqs";
import { createSeo, faqSchema, jsonLdScript, schemaGraph, SITE_DESCRIPTION } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    ...createSeo({
      title: "Palmer House — Video Production, Planning & Studio",
      description: SITE_DESCRIPTION,
      pathname: "/",
    }),
    scripts: [jsonLdScript(schemaGraph(faqSchema(HOME_FAQS)))],
  }),
  component: Index,
});
function Index() {
  return (
    <PageShell>
      <Hero />
      <WaysToWork />
      <HomePackages />
      <HomeStudio />
      <div className="ph-home-section">
        <PublicPalGuide />
      </div>
      <section className="ph-home-section ph-home-proof" aria-label="Client experience">
        <p className="ph-kicker">On the other side of the camera</p>
        <blockquote>
          “Jevoy has a gift of helping his clients become grounded and comfortable.”
        </blockquote>
        <p>Athan Seyler · Palmer House client</p>
        <a href="/resources/reviews" className="ph-inline-link">
          Read client experiences <span aria-hidden>↗</span>
        </a>
      </section>
      <Section eyebrow="Before you start" title="A few useful answers.">
        <FaqList items={HOME_FAQS} />
      </Section>
      <CtaBand
        title="You don’t need a finished brief."
        subtitle="Tell us what you’re making, what’s getting in the way, or what you’d like to try. We’ll help you choose the next step."
        primaryLabel="Talk to the team"
        secondaryLabel="Compare ways to work"
        secondaryTo="/pricing"
        crew={false}
      />
    </PageShell>
  );
}
