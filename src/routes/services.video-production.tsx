import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, Card, CardGrid, CtaBand } from "@/components/site/PageShell";

import { LaneTag } from "@/components/site/LaneTag";
import ryder from "@/assets/pal-headshots/ryder.png";
import kiana from "@/assets/pal-headshots/kiana.png";
import clara from "@/assets/pal-headshots/clara.png";
import samira from "@/assets/pal-headshots/samira.png";

const pals = [
  {
    tag: "REEL",
    lane: "reel" as const,
    image: ryder,
    name: "Reel Pal",
    duo: "Ryder & Raquel",
    quote: "Stop the scroll. Start the conversation.",
    body: "Short-form video content engineered for social media impact. Hook-first storytelling that captures attention in the first 3 seconds.",
    tags: ["Instagram Reels", "TikTok Content", "YouTube Shorts"],
    to: "/reel-pal",
  },
  {
    tag: "SPOTLIGHT",
    lane: "spotlight" as const,
    image: kiana,
    name: "Spotlight Pal",
    duo: "Kareem & Kiana",
    quote: "Craft cinematic stories that captivate.",
    body: "High-production brand films and testimonials that position your company as the industry leader. Cinematic quality, strategic storytelling.",
    tags: ["Brand Films", "Customer Testimonials", "Case Study Videos"],
    to: "/spotlight-pal",
  },
  {
    tag: "EVERGREEN",
    lane: "evergreen" as const,
    image: clara,
    name: "Evergreen Pal",
    duo: "Cyrus & Clara",
    quote: "Build content that compounds forever.",
    body: "Long-form educational content designed for permanent value. SEO-optimized videos that attract traffic and establish thought leadership.",
    tags: ["Educational Series", "How-To Tutorials", "FAQ Libraries"],
    to: "/evergreen-pal",
  },
  {
    tag: "SYSTEM",
    lane: "system" as const,
    image: samira,
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
        <CardGrid cols={2}>
          {pals.map((p) => (
            <article
              key={p.name}
              data-lane={p.lane}
              className="marketing-lane flex flex-col rounded-3xl border border-transparent bg-[var(--lane-soft)] p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-display text-sm font-extrabold uppercase tracking-widest text-[var(--lane-ink)]">
                    {p.tag}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold">{p.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-muted-foreground">{p.duo}</p>
                </div>
                <img
                  src={p.image}
                  alt={p.name + " guide"}
                  width={512}
                  height={512}
                  loading="lazy"
                  className="size-20 rounded-2xl bg-white object-cover sm:size-24"
                />
              </div>
              <p className="mt-5 text-base font-medium text-[var(--lane-ink)]">"{p.quote}"</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <LaneTag key={t} lane={p.lane}>
                    {t}
                  </LaneTag>
                ))}
              </div>
              <Link
                to={p.to}
                className="mt-auto inline-flex min-h-12 items-center pt-6 text-sm font-bold text-[var(--lane-ink)]"
              >
                Learn more →
              </Link>
            </article>
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
        primaryTo="/find-your-pal"
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
