import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, Card, CardGrid, FaqList, CtaBand, Eyebrow } from "@/components/site/PageShell";
import scene from "@/assets/system-pal-lab.webp.asset.json";
import { MissionComparison } from "@/components/site/MissionComparison";
import silas from "@/assets/Silas_standing_full.webp.asset.json";
import samira from "@/assets/Samira_standing_full.webp.asset.json";

const PACKAGES = [
  { title: "Onboarding Kit", pain: "New hires take forever to get up to speed." },
  { title: "SOP Walkthrough Kit", pain: "Nobody knows how to do things the right way." },
  { title: "Training Kit", pain: "We keep explaining the same tools over and over." },
  { title: "Client Handoff System", pain: "Client handoffs are messy and inconsistent." },
  { title: "Sales Enablement Library", pain: "Sales team isn't equipped with the right content." },
  { title: "Tool Tutorial Pack", pain: "Everyone uses our tools differently." },
];

const INCLUDED = [
  "Professional Lighting & Audio Setup",
  "Screen Recording Integration",
  "Structured Script Templates",
  "Searchable Video Library Setup",
  "1 Revision Round per Video",
];

const STEPS = [
  { step: "1. Audit", body: "We identify your repeat loops and knowledge gaps." },
  { step: "2. Blueprint", body: "We design the video system architecture for your team." },
  { step: "3. Film", body: "Record once—SOPs, onboarding, and training walkthroughs." },
  { step: "4. Deploy", body: "Organized, searchable video library ready for your team." },
];

const FAQS = [
  { q: "Can we film on-site?", a: "Yes! We come to your location for authentic workplace training content." },
  { q: "How do teams access the videos?", a: "We deliver organized for your LMS, Notion, or any internal platform." },
];

function SystemPalPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Internal Video Systems"
        title="Eliminate Chaos With"
        highlight="Video Systems"
        subtitle="Silas builds the machine. Internal video packages that turn tribal knowledge into searchable, reusable training libraries."
      />

      <Section>
        <img
          src={scene.url}
          alt="System Pal lab where Silas and Samira build automated video systems"
          loading="lazy"
          className="mx-auto w-full max-w-4xl"
        />
      </Section>

      <Section muted>
        <div className="grid items-center gap-8 sm:grid-cols-2">
          <div className="flex justify-center gap-6">
            <div className="text-center">
              <img src={silas.url} alt="Silas, the System Pal automation character" className="mx-auto h-56 w-auto object-contain" />
              <p className="mt-2 font-display font-bold">Silas</p>
              <p className="text-xs text-muted-foreground">Automation</p>
            </div>
            <div className="text-center">
              <img src={samira.url} alt="Samira, the System Pal architecture character" className="mx-auto h-56 w-auto object-contain" />
              <p className="mt-2 font-display font-bold">Samira</p>
              <p className="text-xs text-muted-foreground">Architecture</p>
            </div>
          </div>
          <div>
            <Eyebrow>System Pal</Eyebrow>
            <p className="mt-4 italic text-muted-foreground">
              "Chaos punishes everyone — especially the most responsible person in the room." — Silas
            </p>
            <p className="mt-4 italic text-muted-foreground">
              "Samira became competent because she had to. She's the one who makes systems feel human — accountable without shame." — Samira
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Packages" title="Missions Built for Every Operational Gap">
        <CardGrid cols={3}>
          {PACKAGES.map((p, i) => (
            <Card key={p.title} index={i + 1} title={p.title} body={`"${p.pain}"`} />
          ))}
        </CardGrid>
      </Section>

      <Section eyebrow="Pricing" title="How the System Pal Session Works">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-soft">
          <p className="text-sm font-semibold text-muted-foreground">Onboarding Kit — 1 of 6</p>
          <h3 className="mt-1 font-display text-xl font-bold">
            Training videos so new hires get up to speed without repeating yourself for the 47th time.
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">2-hour filming session, onboarding walkthrough videos.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-secondary/50 p-4">
              <p className="text-xs font-bold uppercase text-muted-foreground">Production Session</p>
              <p className="text-gradient-brand font-display text-2xl font-extrabold">$450</p>
              <p className="mt-1 text-xs text-muted-foreground">Covers setup, lighting, audio, and direction</p>
            </div>
            <div className="rounded-xl bg-secondary/50 p-4">
              <p className="text-xs font-bold uppercase text-muted-foreground">Additional Videos (6)</p>
              <p className="text-gradient-brand font-display text-2xl font-extrabold">$900</p>
              <p className="mt-1 text-xs text-muted-foreground">1 min each • $150 each. Same session, already set up</p>
            </div>
            <div className="rounded-xl p-4 text-white" style={{ backgroundColor: "var(--spotlight)" }}>
              <p className="text-xs font-bold uppercase text-white/80">Package Total</p>
              <p className="font-display text-2xl font-extrabold">$1,350</p>
              <p className="mt-1 text-xs text-white/80">Only 5 spots left this month</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/contact"
              className="rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow"
              style={{ backgroundColor: "var(--spotlight)" }}
            >
              Customize This Package
            </Link>
          </div>
        </div>
      </Section>

      <Section eyebrow="What's Included" title="Every System Pal Session Includes" muted>
        <CardGrid cols={3}>
          {INCLUDED.map((item, i) => (
            <Card key={item} index={i + 1} title={item} />
          ))}
        </CardGrid>
      </Section>

      <MissionComparison />

      <Section eyebrow="How It Works" title="From Chaos to System">
        <CardGrid cols={4}>
          {STEPS.map((s) => (
            <Card key={s.step} title={s.step} body={s.body} />
          ))}
        </CardGrid>
      </Section>

      <Section muted>
        <blockquote className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
          <p className="text-lg italic text-muted-foreground">
            "We cut our onboarding time in half. New hires watch the video library and hit the ground running instead of shadowing for weeks."
          </p>
          <footer className="mt-4 font-display font-bold">Jessica T. — Operations Director</footer>
        </blockquote>
      </Section>

      <Section eyebrow="FAQ" title="Common Questions">
        <FaqList items={FAQS} />
      </Section>

      <CtaBand title="Ready to Systemize Your Operations?" subtitle="Stop explaining things twice. Build a video system that trains, onboards, and scales without you in the room." primaryLabel="Book System Pal Now" />
    </PageShell>
  );
}

export const Route = createFileRoute("/system-pal")({
  head: () => ({
    meta: [
      { title: "System Pal | Internal Video Systems | Palmer House Productions" },
      {
        name: "description",
        content: "Silas and Samira turn tribal knowledge into searchable, reusable video training libraries that eliminate chaos.",
      },
      { property: "og:title", content: "System Pal | Palmer House Productions" },
      { property: "og:description", content: "Internal video systems that trade heroic effort for operational clarity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SystemPalPage,
});
