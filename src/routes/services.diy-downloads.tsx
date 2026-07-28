import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, CardGrid, CtaBand } from "@/components/site/PageShell";

const downloads = [
  {
    title: "25 DIY Reels You Can Film From Home",
    price: "$47",
    format: "PDF + sample scripts",
    body: "Talking-head style reels for solo founders, coaches, and service providers who want fast content ideas. Platform breakdowns included.",
  },
  {
    title: "The Video Strategy Blueprint",
    price: "$19",
    format: "PDF",
    body: "A step-by-step guide to choosing the right videos for your brand's growth stage and audience behavior.",
  },
  {
    title: "Owner/Founder Script Bundle",
    price: "$47",
    format: "PDF",
    body: "Prewritten, plug-and-play scripts for: About Me, Social Proof, CTA, and FAQ videos.",
  },
];

function DiyDownloadsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="DIY Downloads"
        title="Start Your Video Journey"
        highlight="Today"
        subtitle="Instant access to professional video resources that help you create compelling content on your own timeline."
      />

      <Section eyebrow="Who It's For" title="Built for Doers" subtitle="If you'd rather film it yourself than book a crew, these resources give you the scripts, strategy, and structure a Pal would normally build for you.">
        <CardGrid cols={3}>
          {downloads.map((d) => (
            <div key={d.title} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-lg font-bold">{d.title}</h3>
                <span className="text-gradient-brand font-display text-xl font-extrabold">{d.price}</span>
              </div>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{d.format}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
              <Link
                to="/contact"
                className="mt-5 rounded-full px-5 py-2.5 text-center text-sm font-semibold text-white shadow-glow"
                style={{ backgroundImage: "var(--gradient-brand)" }}
              >
                Buy Now
              </Link>
            </div>
          ))}
        </CardGrid>
      </Section>

      <Section muted eyebrow="Not Sure This Is Enough?" title="Ready to Take the Next Step?" subtitle="Need more personalized guidance? Explore our coaching and production services.">
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/content-strategy" className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold shadow-soft">Explore DIY Coaching</Link>
          <Link
            to="/contact"
            className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow"
            style={{ backgroundImage: "var(--gradient-brand)" }}
          >
            Book Strategy Call
          </Link>
        </div>
      </Section>

      <CtaBand
        title="Prefer a Fully Produced Video?"
        subtitle="Skip the DIY route and let a Pal handle production, editing, and strategy for you."
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/services/diy-downloads")({
  head: () => ({
    meta: [
      { title: "DIY Downloads | Palmer House Productions" },
      { name: "description", content: "Instant-access video scripts, strategy guides, and templates for founders and creators who want to create compelling content on their own." },
      { property: "og:title", content: "DIY Downloads | Palmer House Productions" },
      { property: "og:description", content: "Professional video resources you can put to work today — scripts, blueprints, and templates." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DiyDownloadsPage,
});
