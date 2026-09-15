import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  PageShell,
  PageHero,
  Section,
  Card,
  CardGrid,
  FaqList,
  CtaBand,
  InView,
} from "@/components/site/PageShell";
import {
  FeatureSplit,
  GraphicFrame,
  PalCallout,
  ProcessTimeline,
  StatBand,
} from "@/components/site/PalVisuals";
import { Glyph, GlyphBadge, type GlyphName } from "@/components/site/Glyphs";
import { locations, locationList, type Location } from "@/data/locations";
import { laneById, laneVar } from "@/lib/pal-lanes";
import type { PalAccent } from "@/lib/pricing-catalog";
import {
  breadcrumbSchema,
  BUSINESS_CONTACT,
  createSeo,
  faqSchema,
  jsonLdScript,
  schemaGraph,
  serviceSchema,
} from "@/lib/seo";

const LANE_CYCLE: PalAccent[] = ["system", "spotlight", "evergreen", "reel"];
const PLANNING_GLYPHS: GlyphName[] = ["pin", "clock", "mic", "calendar", "light", "shield"];
const SERVICE_GLYPHS: GlyphName[] = ["camera", "reel", "library", "workflow", "mic", "play"];
const WHY_GLYPHS: GlyphName[] = ["bulb", "handshake", "clock", "layers", "spark", "chart"];

function locationLane(slug: string): PalAccent {
  const index = locationList.findIndex((l) => l.slug === slug);
  return LANE_CYCLE[(index < 0 ? 0 : index) % LANE_CYCLE.length];
}

export const Route = createFileRoute("/locations/$slug")({
  loader: ({ params }) => {
    const location = locations[params.slug];
    if (!location) throw notFound();
    return location;
  },
  head: ({ params }) => {
    const location = locations[params.slug];
    if (!location) return {};

    const pathname = `/locations/${location.slug}`;
    const title = `${location.title} | Palmer House Productions`;

    return {
      ...createSeo({
        title,
        description: location.subtitle,
        pathname,
      }),
      scripts: [
        jsonLdScript(
          schemaGraph(
            serviceSchema({
              name: `${location.city}, ${location.state} video production`,
              description: location.subtitle,
              pathname,
              serviceType: "Video production and reusable content systems",
              areaServed: location.serviceAreas,
            }),
            faqSchema(location.faqs),
            breadcrumbSchema([
              { name: "Home", pathname: "/" },
              { name: "Locations", pathname: "/locations" },
              { name: `${location.city}, ${location.state}`, pathname },
            ]),
          ),
        ),
      ],
    };
  },
  component: LocationPage,
  notFoundComponent: () => (
    <PageShell>
      <Section title="Location not found" subtitle="We don't have a page for that location yet.">
        <div className="text-center">
          <Link
            to="/locations/$slug"
            params={{ slug: "seattle-wa" }}
            className="font-semibold text-brand"
          >
            View Seattle, WA →
          </Link>
        </div>
      </Section>
    </PageShell>
  ),
});

function LocationPage() {
  const location = Route.useLoaderData() as Location;
  const otherLocations = locationList.filter((l) => l.slug !== location.slug);
  const lane = locationLane(location.slug);
  const [leadPal, secondPal] = laneById[lane].pals;

  return (
    <PageShell>
      <PageHero
        eyebrow={location.heroEyebrow}
        title={location.title}
        subtitle={location.subtitle}
        lane={lane}
        pal={lane}
        palTags={location.serviceAreas.slice(0, 3)}
      />

      <Section
        tone="mist"
        eyebrow="Quick answer"
        title={`Video production in ${location.city}, at a glance`}
        subtitle={location.intro}
        lane={lane}
      >
        <CardGrid cols={3}>
          {location.localPlanning.map((item, i) => (
            <Card
              key={item.title}
              lane={lane}
              glyph={PLANNING_GLYPHS[i % PLANNING_GLYPHS.length]}
              title={item.title}
              body={item.body}
            />
          ))}
        </CardGrid>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:items-start">
          <PalCallout
            pal="silas"
            quote={`A ${location.city} production day should feed a month of publishing. We confirm the location details once so the crew's time goes into footage, not logistics.`}
            action={{ label: "See how sessions stack", to: "/production-pricing" }}
          />
          <address
            className="rounded-[1.5rem] border bg-white p-5 text-center text-sm not-italic text-muted-foreground shadow-soft"
            style={{ borderColor: `color-mix(in srgb, ${laneVar(lane)} 30%, white)` }}
          >
            <span className="font-semibold text-foreground">{BUSINESS_CONTACT.name}</span>
            <span className="mt-2 block">
              <a
                className="underline-offset-4 hover:underline"
                href={`tel:${BUSINESS_CONTACT.phone}`}
              >
                {BUSINESS_CONTACT.displayPhone}
              </a>
              {" · "}
              <a
                className="underline-offset-4 hover:underline"
                href={`mailto:${BUSINESS_CONTACT.email}`}
              >
                {BUSINESS_CONTACT.email}
              </a>
            </span>
          </address>
        </div>
      </Section>

      <Section
        title={`${location.city} Video Production Services`}
        subtitle="Choose the assets your team needs now, then organize them into a system you can keep using."
        lane={lane}
      >
        <CardGrid cols={4}>
          {location.services.map((s, i) => (
            <Card
              key={s.title}
              lane={LANE_CYCLE[(LANE_CYCLE.indexOf(lane) + i) % LANE_CYCLE.length]}
              glyph={SERVICE_GLYPHS[i % SERVICE_GLYPHS.length]}
              index={String(i + 1).padStart(2, "0")}
              title={s.title}
              body={s.body}
            />
          ))}
        </CardGrid>
      </Section>

      <Section
        tone={lane}
        title={`Why ${location.city} Businesses Choose Palmer House`}
        subtitle="A practical production process built around clear goals, efficient shoot days, and reusable deliverables."
      >
        <CardGrid cols={4}>
          {location.whyLocal.map((w, i) => (
            <Card
              key={w.title}
              lane={lane}
              glyph={WHY_GLYPHS[i % WHY_GLYPHS.length]}
              title={w.title}
              body={w.body}
            />
          ))}
        </CardGrid>
        <StatBand
          className="mt-10"
          stats={location.stats.map((stat, i) => ({
            value: stat.value,
            label: stat.label,
            lane: LANE_CYCLE[(LANE_CYCLE.indexOf(lane) + i) % LANE_CYCLE.length],
          }))}
        />
      </Section>

      <Section title={location.serviceAreasTitle} lane={lane}>
        <FeatureSplit
          lane={lane}
          eyebrow="Service area"
          title={`On location across the ${location.city} area.`}
          body="We plan the production day around where your team already works, then confirm access, sound, power, and parking before the crew arrives."
          visual={
            <GraphicFrame lane={lane} label={`${location.city}, ${location.state}`}>
              <div className="grid h-full place-items-center pt-8">
                <Glyph name="pin" lane={lane} className="size-40 sm:size-52" />
              </div>
            </GraphicFrame>
          }
        >
          <div className="mt-6 flex flex-wrap gap-2.5">
            {location.serviceAreas.map((area) => (
              <span
                key={area}
                className="inline-flex min-h-9 items-center gap-2 rounded-full border bg-white px-3.5 py-1.5 text-sm font-semibold shadow-sm"
                style={{ borderColor: `color-mix(in srgb, ${laneVar(lane)} 30%, white)` }}
              >
                <span
                  aria-hidden
                  className="size-2 rounded-full"
                  style={{ background: laneVar(lane) }}
                />
                {area}
              </span>
            ))}
          </div>
        </FeatureSplit>
      </Section>

      <Section tone="mist" eyebrow="Client Stories" title="What Clients Say" lane={lane}>
        <CardGrid cols={2}>
          {location.testimonials.map((t, i) => (
            <InView key={t.name} delay={i * 0.08} className="h-full">
              <figure className="surface-card relative flex h-full flex-col overflow-hidden p-6">
                <span
                  aria-hidden
                  className="absolute -right-12 -top-12 size-28 rounded-full"
                  style={{ background: laneVar(lane, "-soft") }}
                />
                <GlyphBadge name="chat" lane={lane} size="sm" className="relative" />
                <blockquote className="relative mt-4 text-base leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="relative mt-4 text-sm font-bold">
                  {t.name}
                  {t.role && <span className="font-normal text-muted-foreground"> — {t.role}</span>}
                </figcaption>
              </figure>
            </InView>
          ))}
        </CardGrid>
      </Section>

      <Section
        eyebrow="Production day, planned"
        title={`How a ${location.city} shoot comes together`}
        subtitle="The goals, participants, and location details are settled before anyone unpacks a case."
        lane={lane}
      >
        <ProcessTimeline
          steps={[
            {
              title: "Plan the system",
              body: "Audiences, questions, channels, and deliverables are defined before the shot list.",
              pal: leadPal,
            },
            {
              title: "Confirm the location",
              body: "Access, parking or loading, sound, power, permissions, and schedule constraints are checked in advance.",
              pal: secondPal,
            },
            {
              title: "Film on site",
              body: "A focused production day with professional camera, lighting, audio, teleprompter, and direction.",
              pal: "kareem",
            },
            {
              title: "Deliver reusable assets",
              body: "Footage becomes practical edits for social, web, sales, onboarding, training, or internal communication.",
              pal: "ryder",
            },
          ]}
        />
      </Section>

      <Section tone="mist" eyebrow="FAQ" title={`${location.city} Questions, Answered`} lane={lane}>
        <FaqList items={location.faqs} lane={lane} pal={secondPal} />
      </Section>

      <Section title="We Also Serve" lane={lane}>
        <CardGrid cols={3}>
          {otherLocations.map((l) => (
            <Card
              key={l.slug}
              lane={locationLane(l.slug)}
              glyph="pin"
              title={`${l.city}, ${l.state}`}
              body={l.intro}
              to={`/locations/${l.slug}`}
            />
          ))}
        </CardGrid>
        <div className="mt-8 text-center">
          <Link to="/locations" className="secondary-action">
            View all locations <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      <CtaBand title={location.ctaTitle} subtitle={location.ctaSubtitle} lane={lane} />
    </PageShell>
  );
}
