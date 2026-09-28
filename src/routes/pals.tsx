import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CtaBand, PageHero, PageShell, Section } from "@/components/site/PageShell";
import { PalDuo } from "@/components/site/PalVisuals";
import { laneById, laneVar } from "@/lib/pal-lanes";
import { PAL_GROUPS } from "@/lib/pricing-catalog";
import { createSeo } from "@/lib/seo";

const outcomes = {
  reel: {
    title: "Stay visible",
    body: "Short social videos to introduce your business, answer questions, and give people a reason to keep watching.",
  },
  spotlight: {
    title: "Show what makes you worth choosing",
    body: "Commercials, product demos, customer stories, and employee spotlights built around real people and work.",
  },
  evergreen: {
    title: "Share what you know",
    body: "Longer educational videos that give an important question the time and detail it needs.",
  },
  system: {
    title: "Help people do the work",
    body: "Onboarding, safety training, sales training, and video SOPs your team can return to.",
  },
} as const;

function PalsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="A guide to our video packages"
        title="Start with what your"
        highlight="video needs to do."
        subtitle="We group our production packages into four goals. You’ll see a pair of Pals beside each one to help explain the choice. Palmer House’s human crew plans, films, and edits the work."
        primary={{ label: "Browse video packages", to: "/shop" }}
        secondary={{ label: "Help me choose", to: "/find-your-pal" }}
      />
      <Section
        eyebrow="Four video goals"
        title="Find the job. Then choose the scope."
        subtitle="You can combine packages in one plan. We confirm the filming needs, final scope, and quote with you before payment."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {PAL_GROUPS.map((group) => {
            const lane = laneById[group.accent];
            return (
              <article key={group.id} className="surface-card flex flex-col overflow-hidden">
                <div className="p-6 sm:p-8">
                  <p
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: laneVar(group.accent, "-text") }}
                  >
                    {group.role}
                  </p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
                    {outcomes[group.id].title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {outcomes[group.id].body}
                  </p>
                  <Link
                    to="/shop"
                    search={{ lane: group.accent }}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4"
                  >
                    See the packages <ArrowRight className="size-4" />
                  </Link>
                </div>
                <PalDuo
                  lane={group.accent}
                  labels={lane.outputs.slice(0, 2)}
                  minHeight="min-h-[13rem]"
                  className="mx-5 mb-5 mt-auto"
                />
              </article>
            );
          })}
        </div>
      </Section>
      <Section
        tone="mist"
        eyebrow="The same Pals, inside Studio"
        title="A personality, not a limit."
        subtitle="In Studio, every Pal can help with the same writing, planning, campaign, image, and PDF tools. Choose the voice you like; you won’t lose access to other kinds of work."
      >
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/meet-the-pals" className="primary-action">
            Meet the eight Pals <ArrowRight className="size-4" />
          </Link>
          <Link to="/membership" className="secondary-action">
            Explore Studio <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>
      <CtaBand
        title="You don’t need a finished brief."
        subtitle="Bring the idea or the question you keep hearing. We can help you plan it before you decide how to produce it."
        primaryLabel="Planning and preparation"
        primaryTo="/content-strategy"
        secondaryLabel="Find a video package"
        secondaryTo="/find-your-pal"
      />
    </PageShell>
  );
}

export const Route = createFileRoute("/pals")({
  head: () => ({
    ...createSeo({
      title: "Choose Your Video Goal | Palmer House Productions",
      description:
        "Compare social content, brand stories, educational videos, and team training. Choose a production package by the job you need your video to do.",
      pathname: "/pals",
    }),
  }),
  component: PalsPage,
});
