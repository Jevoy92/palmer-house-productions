import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, Card, CardGrid, CtaBand } from "@/components/site/PageShell";

const framework = [
  {
    step: "Discovery",
    title: "Content as Business Asset",
    body: "Treat content like a system: repeatable, scalable, optimized for ROI. Not views — business outcomes. We don't create content for likes or followers. Every video we produce is designed to solve a specific business problem: onboarding new customers, reducing support calls, closing sales, or training your team.",
  },
  {
    step: "Identity Mapping",
    title: "Workshop",
    body: "We map your brand identity, audience, and voice so every video sounds like you — not a generic script.",
  },
  {
    step: "Roadmap",
    title: "Content Roadmap",
    body: "A prioritized production plan that sequences the right videos in the right order for maximum impact.",
  },
  {
    step: "Optimization",
    title: "Ongoing Optimization",
    body: "We revisit performance and refine the system so your content keeps compounding over time.",
  },
];

const differentiators = [
  {
    title: "Solve Operational Bottlenecks",
    body: "We don't chase viral trends—we identify where video can eliminate repetitive work, confusing onboarding, or endless customer questions.",
  },
  {
    title: "Video as Infrastructure",
    body: "Build a communication system that replaces repetitive explanations, speeds up training, and automates your most common answers.",
  },
  {
    title: "Real Business Metrics",
    body: "Fewer support tickets. Faster onboarding. More booked jobs. We measure success by how much time and friction we remove from your business.",
  },
];

function ContentStrategyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Strategic Content Planning"
        title="Build a Content Engine"
        highlight="That Works While You Sleep"
        subtitle="Not random posts. Not marketing fluff. A strategic content system aligned with your business goals, your personality, and your long-term success."
      />

      <Section
        eyebrow="The Framework"
        title="Our Strategic Framework"
        subtitle="A proven system for turning your expertise into a content library that drives results."
      >
        <CardGrid cols={2}>
          {framework.map((f, i) => (
            <Card key={f.title} index={`0${i + 1}`} title={`${f.step}: ${f.title}`} body={f.body} />
          ))}
        </CardGrid>
      </Section>

      <Section muted eyebrow="Differentiation" title="What Makes Our Strategy Different">
        <CardGrid cols={3}>
          {differentiators.map((d) => (
            <Card key={d.title} title={d.title} body={d.body} />
          ))}
        </CardGrid>
      </Section>

      <Section
        eyebrow="Who It's For"
        title="No Camera Needed"
        subtitle="Just your brain, your goals, and your biggest problems. Let's turn your expertise into a content system that works."
      >
        <p className="mx-auto max-w-2xl text-center text-muted-foreground">
          Business owners, operators, and founders who are tired of answering the same questions,
          retraining new hires from scratch, or posting content with no strategy behind it.
        </p>
      </Section>

      <CtaBand
        title="Ready to Build Your Content Strategy?"
        subtitle="No camera needed — just your brain, your goals, and your biggest problems."
        primaryLabel="Book Strategy Session"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/content-strategy")({
  head: () => ({
    meta: [
      { title: "Content Strategy | Palmer House Productions" },
      {
        name: "description",
        content:
          "A strategic content system aligned with your business goals — build a content engine that solves operational bottlenecks and drives real ROI.",
      },
      { property: "og:title", content: "Content Strategy | Palmer House Productions" },
      {
        property: "og:description",
        content:
          "Build a content engine that works while you sleep with our proven strategic framework.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContentStrategyPage,
});
