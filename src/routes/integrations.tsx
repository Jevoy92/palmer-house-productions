import { createFileRoute } from "@tanstack/react-router";
import { Card, CardGrid, CtaBand, PageHero, PageShell, Section } from "@/components/site/PageShell";
import { createSeo } from "@/lib/seo";

/** Capability guide, not a public claim about private deployment credentials. */
function IntegrationsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Working with your existing tools"
        title="Keep your workflow."
        highlight="Bring the useful parts together."
        subtitle="Create and organize in Studio, then take your work to the channels and tools you already use."
        primary={{ label: "Explore Studio", to: "/membership" }}
        secondary={{ label: "Ask the team", to: "/contact" }}
      />
      <Section title="A clear handoff at each step." align="left">
        <CardGrid cols={3}>
          <Card
            glyph="library"
            title="Copy and export"
            body="Review drafts in your Library, copy captions and scripts, and download saved images or PDFs. You publish content through your own accounts."
            lane="system"
          />
          <Card
            glyph="cart"
            title="Manage your membership"
            body="Your Studio billing page shows plan and credit options. Payment and account changes are confirmed in the checkout or billing portal before taking effect."
            lane="reel"
          />
          <Card
            glyph="chat"
            title="Bring us your production plan"
            body="Package selections and your working estimate carry into the project request. The Palmer House team confirms the scope before production payment."
            lane="spotlight"
          />
        </CardGrid>
      </Section>
      <CtaBand
        title="Need a particular workflow?"
        subtitle="Tell us what you use and where you need the handoff. We will confirm what is supported."
        primaryLabel="Talk to the team"
        primaryTo="/contact"
        secondaryLabel="Explore Studio"
        secondaryTo="/membership"
        crew={false}
      />
    </PageShell>
  );
}
export const Route = createFileRoute("/integrations")({
  head: () =>
    createSeo({
      title: "Your Workflow & Palmer House Studio",
      description:
        "How Studio drafts, exports, billing, and production requests fit your workflow.",
      pathname: "/integrations",
      noIndex: true,
    }),
  component: IntegrationsPage,
});
