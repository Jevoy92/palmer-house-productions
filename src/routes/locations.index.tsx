import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  Card,
  CardGrid,
  CtaBand,
  FaqList,
  PageHero,
  PageShell,
  Section,
} from "@/components/site/PageShell";
import { PalCallout, Scene } from "@/components/site/PalVisuals";
import { GlyphBadge } from "@/components/site/Glyphs";
import { locationList } from "@/data/locations";
import { laneVar } from "@/lib/pal-lanes";
import type { PalAccent } from "@/lib/pricing-catalog";
import {
  breadcrumbSchema,
  createSeo,
  faqSchema,
  jsonLdScript,
  schemaGraph,
  serviceSchema,
} from "@/lib/seo";

const DESCRIPTION =
  "Explore Palmer House Productions video production service areas across Seattle, Bellevue, Tacoma, Portland, and the surrounding Pacific Northwest.";

const LANE_CYCLE: PalAccent[] = ["system", "spotlight", "evergreen", "reel"];

const FAQS = [
  {
    q: "Where does Palmer House Productions film?",
    a: "We plan on-location productions across the Seattle metro, the Eastside, Tacoma and the South Sound, and the Portland metro. Travel outside these areas can be discussed for the right project.",
  },
  {
    q: "Do you have to be in the same city as our whole team?",
    a: "No. We can film local participants on location and use a shared review process so distributed stakeholders can give feedback and approve edits.",
  },
  {
    q: "What should we prepare before an on-location shoot?",
    a: "We confirm the goals, participants, schedule, building access, sound conditions, power, parking or loading instructions, and any site-specific permissions before production day.",
  },
];

export const Route = createFileRoute("/locations/")({
  head: () => ({
    ...createSeo({
      title: "Pacific Northwest Video Production Locations | Palmer House Productions",
      description: DESCRIPTION,
      pathname: "/locations",
    }),
    scripts: [
      jsonLdScript(
        schemaGraph(
          serviceSchema({
            name: "Pacific Northwest video production",
            description: DESCRIPTION,
            pathname: "/locations",
            serviceType: "On-location video production and reusable content systems",
            areaServed: locationList.map((location) => `${location.city}, ${location.state}`),
          }),
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: "Home", pathname: "/" },
            { name: "Locations", pathname: "/locations" },
          ]),
        ),
      ),
    ],
  }),
  component: LocationsPage,
});

function LocationsPage() {
  const reduce = useReducedMotion();
  return (
    <PageShell>
      <PageHero
        eyebrow="Pacific Northwest Service Areas"
        title="Video Production, Planned for Your Location"
        subtitle="We produce reusable video systems on location across Puget Sound and the Portland metro, with practical planning for access, schedules, sound, and distributed review."
        lane="system"
        visual={
          <Scene name="locations" priority tags={["Seattle", "Bellevue", "Tacoma", "Portland"]} />
        }
      />

      <Section
        eyebrow="Choose your area"
        title="Local production guidance"
        subtitle="Start with the city closest to your team. Each guide covers the surrounding service area, common production logistics, and the video assets we can build there."
        lane="system"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {locationList.map((location, index) => {
            const lane = LANE_CYCLE[index % LANE_CYCLE.length];
            return (
              <motion.div
                key={location.slug}
                className="h-full"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease: "easeOut" }}
              >
                <Link
                  to="/locations/$slug"
                  params={{ slug: location.slug }}
                  className="surface-card group relative flex h-full flex-col overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none"
                >
                  <span
                    aria-hidden
                    className="absolute -right-14 -top-14 size-40 rounded-full transition-transform duration-500 group-hover:scale-125 motion-reduce:transition-none"
                    style={{ background: laneVar(lane, "-soft") }}
                  />
                  <div className="relative flex items-center gap-4">
                    <GlyphBadge name="pin" lane={lane} />
                    <span
                      className="font-mono text-xs font-bold uppercase tracking-[0.16em]"
                      style={{ color: laneVar(lane, "-text") }}
                    >
                      {String(index + 1).padStart(2, "0")} · {location.city}, {location.state}
                    </span>
                  </div>
                  <h3 className="relative mt-4 text-2xl font-extrabold tracking-[-0.035em]">
                    {location.title}
                  </h3>
                  <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {location.intro}
                  </p>
                  <p
                    className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: laneVar(lane, "-text") }}
                  >
                    Explore {location.city} production details
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <Section
        tone="system"
        eyebrow="One regional process"
        title="What stays consistent"
        subtitle="Wherever we film, the project is organized around useful business outcomes and a production day that respects your team."
      >
        <CardGrid cols={3}>
          <Card
            lane="evergreen"
            glyph="bulb"
            title="Plan the system first"
            body="We define audiences, questions, channels, and deliverables before deciding what belongs on the shot list."
          />
          <Card
            lane="system"
            glyph="pin"
            title="Confirm location details"
            body="Access, parking or loading, sound, power, permissions, room setup, and schedule constraints are checked before the crew arrives."
          />
          <Card
            lane="spotlight"
            glyph="publish"
            title="Deliver reusable assets"
            body="The footage is organized into practical edits for social, web, sales, onboarding, training, or internal communication."
          />
        </CardGrid>
        <div className="mt-10">
          <PalCallout
            pal="silas"
            quote="One production day should feed a month of publishing. Wherever the crew parks, the plan is the same: plan the shoot once, harvest it for a month."
            action={{ label: "See how sessions stack", to: "/production-pricing" }}
          />
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Planning a Pacific Northwest Shoot" lane="system">
        <FaqList items={FAQS} lane="system" pal="samira" />
      </Section>

      <CtaBand
        title="Tell Us Where Your Team Is"
        subtitle="We’ll help scope the location, production day, and content system that fit your goals."
        lane="system"
      />
    </PageShell>
  );
}
