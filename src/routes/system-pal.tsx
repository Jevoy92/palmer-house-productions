import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  Card,
  CardGrid,
  FaqList,
  CtaBand,
  Eyebrow,
} from "@/components/site/PageShell";
import { MissionComparison } from "@/components/site/MissionComparison";
import silas from "@/assets/pal-headshots/silas.png";
import samira from "@/assets/pal-headshots/samira.png";

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
  {
    q: "Can we film on-site?",
    a: "Yes! We come to your location for authentic workplace training content.",
  },
  {
    q: "How do teams access the videos?",
    a: "We deliver organized for your LMS, Notion, or any internal platform.",
  },
];

function SystemPalPage() {
  return (
    <PageShell lane="system">
      <PageHero
        eyebrow="Internal Video Systems"
        title="Eliminate Chaos With"
        highlight="Video Systems"
        subtitle="Silas builds the machine. Internal video packages that turn tribal knowledge into searchable, reusable training libraries."
      />

      <Section muted eyebrow="Your System guides" title="Meet Silas and Samira">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-2xl bg-white p-3 text-center">
              <img
                src={silas}
                alt="Silas, the System Pal automation character"
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover"
              />
              <p className="mt-3 font-display text-lg font-bold">Silas</p>
              <p className="text-sm font-medium text-[var(--lane-ink)]">Automation</p>
            </div>
            <div className="overflow-hidden rounded-2xl bg-white p-3 text-center">
              <img
                src={samira}
                alt="Samira, the System Pal architecture character"
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover"
              />
              <p className="mt-3 font-display text-lg font-bold">Samira</p>
              <p className="text-sm font-medium text-[var(--lane-ink)]">Architecture</p>
            </div>
          </div>
          <div>
            <Eyebrow>System Pal</Eyebrow>
            <p className="mt-4 border-l-2 border-[var(--lane)] pl-5 text-base leading-relaxed text-ink-soft">
              "Chaos punishes everyone — especially the most responsible person in the room." —
              Silas
            </p>
            <p className="mt-4 border-l-2 border-[var(--lane)] pl-5 text-base leading-relaxed text-ink-soft">
              "Samira became competent because she had to. She's the one who makes systems feel
              human — accountable without shame." — Samira
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
        <div className="mx-auto max-w-4xl rounded-3xl border border-[var(--lane-soft)] border-t-4 border-t-[var(--lane)] bg-white p-6 shadow-soft sm:p-9">
          <p className="text-sm font-semibold text-muted-foreground">Onboarding Kit — 1 of 6</p>
          <h3 className="mt-1 font-display text-xl font-bold">
            Training videos so new hires get up to speed without repeating yourself for the 47th
            time.
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            2-hour filming session, onboarding walkthrough videos.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-[var(--lane-soft)] p-5">
              <p className="text-xs font-bold uppercase text-muted-foreground">
                Production Session
              </p>
              <p className="font-display text-3xl font-extrabold tabular-nums text-[var(--lane-ink)]">
                $450
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Covers setup, lighting, audio, and direction
              </p>
            </div>
            <div className="rounded-2xl bg-[var(--lane-soft)] p-5">
              <p className="text-xs font-bold uppercase text-muted-foreground">
                Additional Videos (6)
              </p>
              <p className="font-display text-3xl font-extrabold tabular-nums text-[var(--lane-ink)]">
                $900
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                1 min each • $150 each. Same session, already set up
              </p>
            </div>
            <div
              className="rounded-2xl p-5 text-white"
              style={{ backgroundColor: "var(--lane-ink)" }}
            >
              <p className="text-xs font-bold uppercase text-white/80">Package Total</p>
              <p className="font-display text-2xl font-extrabold">$1,350</p>
              <p className="mt-1 text-xs text-white/80">
                Final scope confirmed on the strategy call
              </p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--lane-ink)" }}
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
        <blockquote className="mx-auto max-w-3xl border-l-4 border-[var(--lane)] bg-white px-6 py-8 text-left sm:px-9">
          <p className="text-lg italic text-muted-foreground">
            "We cut our onboarding time in half. New hires watch the video library and hit the
            ground running instead of shadowing for weeks."
          </p>
          <footer className="mt-4 font-display font-bold">Jessica T. — Operations Director</footer>
        </blockquote>
      </Section>

      <Section eyebrow="FAQ" title="Common Questions">
        <FaqList items={FAQS} />
      </Section>

      <CtaBand
        title="Ready to Systemize Your Operations?"
        subtitle="Stop explaining things twice. Build a video system that trains, onboards, and scales without you in the room."
        primaryLabel="Book System Pal Now"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/system-pal")({
  head: () => ({
    meta: [
      { title: "System Pal | Internal Video Systems | Palmer House Productions" },
      {
        name: "description",
        content:
          "Silas and Samira turn tribal knowledge into searchable, reusable video training libraries that eliminate chaos.",
      },
      { property: "og:title", content: "System Pal | Palmer House Productions" },
      {
        property: "og:description",
        content: "Internal video systems that trade heroic effort for operational clarity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SystemPalPage,
});
