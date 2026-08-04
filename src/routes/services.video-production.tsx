import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, Card, CardGrid, CtaBand } from "@/components/site/PageShell";

const pals = [
  {
    tag: "REEL",
    name: "Reel Pal",
    duo: "Ryder & Raquel",
    quote: "Stop the scroll. Start the conversation.",
    body: "Short-form video content engineered for social media impact. Hook-first storytelling that captures attention in the first 3 seconds.",
    tags: ["Instagram Reels", "TikTok Content", "YouTube Shorts"],
    to: "/reel-pal",
  },
  {
    tag: "SPOTLIGHT",
    name: "Spotlight Pal",
    duo: "Kareem & Kiana",
    quote: "Craft cinematic stories that captivate.",
    body: "High-production brand films and testimonials that position your company as the industry leader. Cinematic quality, strategic storytelling.",
    tags: ["Brand Films", "Customer Testimonials", "Case Study Videos"],
    to: "/spotlight-pal",
  },
  {
    tag: "EVERGREEN",
    name: "Evergreen Pal",
    duo: "Cyrus & Clara",
    quote: "Build content that compounds forever.",
    body: "Long-form educational content designed for permanent value. SEO-optimized videos that attract traffic and establish thought leadership.",
    tags: ["Educational Series", "How-To Tutorials", "FAQ Libraries"],
    to: "/evergreen-pal",
  },
  {
    tag: "SYSTEM",
    name: "System Pal",
    duo: "Silas & Samira",
    quote: "Automate your content machine.",
    body: "Training and process documentation videos that scale your operations. Reduce repetitive explanations and build institutional knowledge.",
    tags: ["Employee Onboarding", "Process SOPs", "Safety Training"],
    to: "/system-pal",
  },
];

const steps = [
  {
    title: "Match Your Pal",
    body: "Take our quick assessment to discover which Pal's approach matches your video needs and goals.",
  },
  {
    title: "Plan Your Mission",
    body: "Work with your Pal to define deliverables, timeline, and creative direction for your project.",
  },
  {
    title: "Production Day",
    body: "Our crew captures everything in a streamlined session—professional equipment, expert direction, efficient workflow.",
  },
  {
    title: "Polished Delivery",
    body: "Receive your finished videos with editing, graphics, and optimization for your target platforms.",
  },
];

function VideoProductionPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Pal-Guided Production"
        title="Video Production"
        highlight="Matched to Your Mission"
        subtitle="Every video has a purpose. Our Pal system matches you to the right approach — whether you need reels, cinematic branding, or brand films."
      />

      <Section
        eyebrow="The Four Pals"
        title="Four Approaches. One Perfect Match."
        subtitle="Each Pal specializes in a different type of video content. Find the one that fits your goals."
      >
        <CardGrid cols={4}>
          {pals.map((p) => (
            <div key={p.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="text-gradient-brand font-display text-xs font-extrabold uppercase tracking-widest">
                {p.tag}
              </span>
              <h3 className="mt-2 font-display text-lg font-bold">{p.name}</h3>
              <p className="text-xs font-semibold text-muted-foreground">{p.duo}</p>
              <p className="mt-3 text-sm italic text-muted-foreground">"{p.quote}"</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Link
                to={p.to}
                className="mt-4 inline-block text-sm font-semibold text-gradient-brand"
              >
                Learn more →
              </Link>
            </div>
          ))}
        </CardGrid>
      </Section>

      <Section
        muted
        eyebrow="Process"
        title="How It Works"
        subtitle="A streamlined workflow that delivers professional video content on time and on budget."
      >
        <CardGrid cols={4}>
          {steps.map((s, i) => (
            <Card key={s.title} index={i + 1} title={s.title} body={s.body} />
          ))}
        </CardGrid>
      </Section>

      <CtaBand
        title="Ready to Find Your Perfect Match?"
        subtitle="Take our quick assessment to discover which Pal's approach fits your video needs — or jump straight to pricing."
        primaryLabel="Take the Assessment"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/services/video-production")({
  head: () => ({
    meta: [
      { title: "Video Production Services | Palmer House Productions" },
      {
        name: "description",
        content:
          "Pal-guided video production for reels, brand films, evergreen education, and internal training — matched to your goals.",
      },
      { property: "og:title", content: "Video Production Services | Palmer House Productions" },
      {
        property: "og:description",
        content:
          "Every video has a purpose. Our Pal system matches you to the right production approach.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VideoProductionPage,
});
