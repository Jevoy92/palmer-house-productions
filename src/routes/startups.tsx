import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section, Card, CardGrid, CtaBand } from "@/components/site/PageShell";

export const Route = createFileRoute("/startups")({
  head: () => ({
    meta: [
      { title: "Startup Video Production Seattle — Palmer House Productions" },
      {
        name: "description",
        content:
          "Seattle startup video production that accelerates growth and funding — pitch videos, product demos, and growth content for Pacific Northwest startups.",
      },
      {
        property: "og:title",
        content: "Seattle Startup Video Production That Accelerates Growth & Funding",
      },
      {
        property: "og:description",
        content:
          "From South Lake Union SaaS companies to Eastside deep-tech startups and Pioneer Square accelerator cohorts — we create pitch videos, product demos, and growth content that helps Pacific Northwest startups raise more capital and build stronger brands.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StartupsPage,
});

const outcomes = [
  { stat: "2x More Likely", label: "Increase Funding", body: "Startups with pitch videos raise significantly more capital." },
  { stat: "5x Conversion", label: "Accelerate Growth", body: "Video content converts visitors to customers faster." },
  { stat: "60% Time Saved", label: "Scale Faster", body: "Video training systems enable rapid team scaling." },
  { stat: "10x Reach", label: "Boost Engagement", body: "Social video content increases brand awareness." },
];

const specialties = [
  { title: "Investor Pitch Videos", body: "Compelling narratives that capture attention and communicate traction." },
  { title: "Product Demonstrations", body: "Clear showcases of features, benefits, and competitive advantages." },
  { title: "Growth Marketing", body: "Viral-ready social content that drives customer acquisition." },
  { title: "Brand Storytelling", body: "Authentic stories that build emotional connections with customers." },
];

const services = [
  {
    title: "Investor Videos",
    eyebrow: "Pitch & Funding",
    body: "Compelling pitch videos and investor presentations that communicate your vision and traction.",
    items: ["Pitch deck videos", "Demo day content", "Investor updates"],
  },
  {
    title: "Product Demos",
    eyebrow: "Product",
    body: "Clear, engaging product demonstrations that showcase features and convert prospects.",
    items: ["Feature demos", "Explainer videos", "Onboarding content"],
  },
  {
    title: "Marketing Content",
    eyebrow: "Growth",
    body: "High-impact social content that drives viral growth and builds community.",
    items: ["Social media reels", "Customer stories", "Brand content"],
  },
];

function StartupsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Startup Solutions"
        title="Seattle Startup Video Production That Accelerates Growth & Funding"
        subtitle="From South Lake Union SaaS companies to Eastside deep-tech startups and Pioneer Square accelerator cohorts — we create pitch videos, product demos, and growth content that helps Pacific Northwest startups raise more capital and build stronger brands."
      />

      <Section title="Outcomes That Matter">
        <CardGrid cols={4}>
          {outcomes.map((o) => (
            <div key={o.label} className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
              <div className="text-gradient-brand font-display text-2xl font-extrabold">{o.stat}</div>
              <h3 className="mt-2 font-display text-sm font-bold">{o.label}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{o.body}</p>
            </div>
          ))}
        </CardGrid>
      </Section>

      <Section
        muted
        title="Our Process"
        subtitle="From discovery to delivery, a proven system for startup video"
      >
        <CardGrid cols={4}>
          <Card index={1} title="Discovery" body="Understanding your startup's vision, target market, and growth goals through detailed consultation." />
          <Card index={2} title="Planning" body="Developing compelling scripts and storyboards that communicate your unique value proposition." />
          <Card index={3} title="Production" body="Professional filming that captures your team's passion and showcases your product's potential." />
          <Card index={4} title="Delivery" body="Optimized videos ready for pitches, social media, websites, and investor presentations." />
        </CardGrid>
      </Section>

      <Section
        title="Startup Video Specialties"
        subtitle="We understand the unique challenges startups face at every stage, from pre-seed to Series A and beyond."
      >
        <CardGrid cols={4}>
          {specialties.map((s) => (
            <Card key={s.title} title={s.title} body={s.body} />
          ))}
        </CardGrid>
      </Section>

      <Section
        muted
        title="Our Startup Video Services"
        subtitle="Comprehensive video production solutions tailored for startups at every stage, designed to help you raise capital, acquire customers, and scale operations."
      >
        <CardGrid cols={3}>
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{s.eyebrow}</span>
              <h3 className="mt-2 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                {s.items.map((it) => (
                  <li key={it}>• {it}</li>
                ))}
              </ul>
            </div>
          ))}
        </CardGrid>
      </Section>

      <Section
        title="How Spotlight Pal Serves Startups"
        subtitle="Every startup stage needs different video solutions. Our specialized Pals deliver exactly what you need—from pitch videos to product demos to growth content."
      >
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-soft">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Spotlight Pal</span>
          <h3 className="mt-2 font-display text-xl font-bold">Investor & Brand Stories</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Cinematic pitch videos, founder stories, and brand films that capture investor attention and build emotional
            connections with your audience.
          </p>
          <p className="mt-4 text-sm font-semibold">Essential Solutions:</p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>• Investor pitch videos and demo day content</li>
            <li>• Founder story and mission films</li>
            <li>• Brand identity and culture videos</li>
            <li>• Customer testimonial productions</li>
          </ul>
        </div>
      </Section>

      <CtaBand
        title="Ready to Accelerate Your Startup's Growth?"
        subtitle="Let's create video content that helps you raise more capital, grow faster, and build a stronger brand."
        primaryLabel="Schedule Startup Consultation"
      />
    </PageShell>
  );
}
