import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CtaBand, PageHero, PageShell, Section } from "@/components/site/PageShell";
import { laneVar } from "@/lib/pal-lanes";
import type { PalAccent } from "@/lib/pricing-catalog";
import { studioPlans } from "@/lib/studio-model";
import { createSeo } from "@/lib/seo";

const TITLE = "Pricing | Palmer House Productions";
const DESCRIPTION =
  "Three clear ways to work with Palmer House: a production estimate for filming, monthly Studio plans, and ready-made video packages.";

const options: Array<{
  lane: PalAccent;
  eyebrow: string;
  title: string;
  from: string;
  note: string;
  body: string;
  bullets: string[];
  to: string;
  cta: string;
}> = [
  {
    lane: "spotlight",
    eyebrow: "Production work",
    title: "We film it for you",
    from: "$450",
    note: "base session, $150 per additional video",
    body: "A filming session with our team plus the finished videos you take home. Build an editable estimate in a few minutes.",
    bullets: [
      "Strategy call, shoot day, and edits",
      "Add videos, locations, or extra days",
      "Request a project plan when it looks right",
    ],
    to: "/production-pricing",
    cta: "Build an estimate",
  },
  {
    lane: "system",
    eyebrow: "Studio plans",
    title: "We help you make it",
    from: `$${studioPlans.creator.price}`,
    note: "per month, 17% off annually",
    body: "Your Pal, your Brand DNA, and a content system that turns one idea into a month of content.",
    bullets: [
      `${studioPlans.creator.campaigns} complete campaigns to start`,
      "Personalized video roadmap and calendar",
      "Private Palmer House time on higher plans",
    ],
    to: "/membership/pricing",
    cta: "Compare plans",
  },
  {
    lane: "reel",
    eyebrow: "Packages",
    title: "Pick something ready-made",
    from: "$1,050",
    note: "ten packages, example included",
    body: "Social content, commercials, product demos, customer stories, training, onboarding, and more — each with scope and price up front.",
    bullets: [
      "See a real example for every package",
      "Clear scope, no custom quoting",
      "Add to your plan and check out",
    ],
    to: "/shop",
    cta: "Browse packages",
  },
];

export const Route = createFileRoute("/pricing")({
  head: () => createSeo({ title: TITLE, description: DESCRIPTION, pathname: "/pricing" }),
  component: PricingHub,
});

function PricingHub() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Pricing"
        title="Three ways to work"
        highlight="with Palmer House"
        subtitle="Hire us to film it, use the Studio to make it yourself, or pick a ready-made package. Every price is on this page."
        lane="spotlight"
        pal="spotlight"
        primary={{ label: "Build an estimate", to: "/production-pricing" }}
        secondary={{ label: "Find your Pal", to: "/find-your-pal" }}
      />

      <Section
        eyebrow="Choose a path"
        title="Pick the one that matches where you are"
        subtitle="Not sure? Find your Pal answers it in two choices."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {options.map((option) => (
            <article
              key={option.to}
              className="surface-card flex flex-col p-6 transition-transform hover:-translate-y-1 motion-reduce:transition-none"
            >
              <span
                className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em]"
                style={{ color: laneVar(option.lane, "-text") }}
              >
                <span
                  aria-hidden
                  className="size-2 rounded-full"
                  style={{ background: laneVar(option.lane) }}
                />
                {option.eyebrow}
              </span>
              <h3 className="mt-3 text-2xl font-extrabold leading-tight tracking-[-0.03em]">
                {option.title}
              </h3>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-[-0.04em]">{option.from}</span>
                <span className="text-xs text-muted-foreground">{option.note}</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{option.body}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {option.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 rounded-full"
                      style={{ background: laneVar(option.lane) }}
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={option.to}
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] motion-reduce:transition-none"
                style={{ background: laneVar(option.lane, "-deep") }}
              >
                {option.cta}
                <ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Running a bundle or a seasonal deal?{" "}
          <Link to="/offers" className="font-semibold text-foreground underline">
            See current offers
          </Link>
          .
        </p>
      </Section>

      <CtaBand
        title="Still not sure what you need?"
        subtitle="Tell us the problem you are trying to solve and we will point you at the right path — no pressure, no quote maze."
        primaryLabel="Book a Discovery Call"
        primaryTo="/contact"
        secondaryLabel="Find Your Pal"
        secondaryTo="/find-your-pal"
        lane="spotlight"
      />
    </PageShell>
  );
}
