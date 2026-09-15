import { createFileRoute, notFound } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  Card,
  CardGrid,
  FaqList,
  CtaBand,
} from "@/components/site/PageShell";
import {
  FeatureSplit,
  GraphicFrame,
  PalCallout,
  ProcessTimeline,
} from "@/components/site/PalVisuals";
import { Glyph, type GlyphName } from "@/components/site/Glyphs";
import { industries, industryList } from "@/data/industries";
import { laneById } from "@/lib/pal-lanes";
import type { PalAccent } from "@/lib/pricing-catalog";
import {
  breadcrumbSchema,
  createSeo,
  faqSchema,
  jsonLdScript,
  schemaGraph,
  serviceSchema,
} from "@/lib/seo";

const LANE_CYCLE: PalAccent[] = ["evergreen", "system", "spotlight", "reel"];

const INDUSTRY_GLYPHS: Record<string, GlyphName> = {
  healthcare: "shield",
  manufacturing: "workflow",
  technology: "layers",
  "professional-services": "handshake",
  education: "library",
  government: "pin",
};

const PAIN_GLYPHS: GlyphName[] = ["clock", "chat", "search", "shield", "chart", "bulb"];
const SOLUTION_GLYPHS: GlyphName[] = ["library", "workflow", "camera", "play", "script", "mic"];
const USE_CASE_GLYPHS: GlyphName[] = ["handshake", "pin", "light", "layers", "calendar", "publish"];

function industryLane(slug: string): PalAccent {
  const index = industryList.findIndex((i) => i.slug === slug);
  return LANE_CYCLE[(index < 0 ? 0 : index) % LANE_CYCLE.length];
}

function industryGlyph(slug: string, index: number): GlyphName {
  return INDUSTRY_GLYPHS[slug] ?? SOLUTION_GLYPHS[index % SOLUTION_GLYPHS.length];
}

export const Route = createFileRoute("/industries/$slug")({
  head: ({ params }) => {
    const industry = industries[params.slug];
    if (!industry) {
      return { meta: [{ title: "Industry Not Found — Palmer House Productions" }] };
    }

    const pathname = `/industries/${industry.slug}`;

    return {
      ...createSeo({
        title: `${industry.name} Video Production | Palmer House Productions`,
        description: industry.metaDescription,
        pathname,
      }),
      scripts: [
        jsonLdScript(
          schemaGraph(
            serviceSchema({
              name: `${industry.name} video production`,
              description: industry.metaDescription,
              pathname,
              serviceType: `${industry.name} video production and reusable content systems`,
              areaServed: ["Washington", "Oregon", "Pacific Northwest"],
            }),
            faqSchema(industry.faqs),
            breadcrumbSchema([
              { name: "Home", pathname: "/" },
              { name: `${industry.name} video production`, pathname },
            ]),
          ),
        ),
      ],
    };
  },
  component: IndustryPage,
});

function IndustryPage() {
  const { slug } = Route.useParams();
  const industry = industries[slug];
  if (!industry) throw notFound();

  const others = industryList.filter((i) => i.slug !== slug);
  const lane = industryLane(slug);
  const glyph = industryGlyph(slug, 0);
  const [leadPal, secondPal] = laneById[lane].pals;

  return (
    <PageShell>
      <PageHero
        eyebrow={industry.eyebrow}
        title={industry.title}
        subtitle={industry.subtitle}
        lane={lane}
        pal={lane}
        palTags={industry.solutions.slice(0, 3).map((s) => s.title)}
      />

      <Section
        tone="mist"
        eyebrow="Quick answer"
        title={`What we create for ${industry.name.toLowerCase()} teams`}
        lane={lane}
      >
        <FeatureSplit
          lane={lane}
          eyebrow={`Why video for ${industry.name.toLowerCase()}`}
          title={`Built for how ${industry.name.toLowerCase()} teams actually work.`}
          body={industry.intro[0]}
          visual={
            <GraphicFrame lane={lane} label={industry.name} minHeight="min-h-[20rem]">
              <div className="grid h-full place-items-center pt-8">
                <Glyph name={glyph} lane={lane} className="size-40 sm:size-52" />
              </div>
            </GraphicFrame>
          }
        >
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {industry.intro[1]}
          </p>
        </FeatureSplit>
        <div className="mt-12">
          <PalCallout
            pal="clara"
            quote={`Every ${industry.name.toLowerCase()} team has a handful of explanations it repeats daily. Make each one once, get it approved once, and let the video answer from then on.`}
            action={{ label: "Explore Evergreen Pal", to: "/evergreen-pal" }}
          />
        </div>
      </Section>

      <Section
        title="Understanding the Challenges"
        subtitle="What we solve for organizations like yours"
        lane={lane}
      >
        <CardGrid cols={2}>
          {industry.painPoints.map((p, i) => (
            <Card
              key={p}
              index={String(i + 1).padStart(2, "0")}
              lane={LANE_CYCLE[(LANE_CYCLE.indexOf(lane) + i) % LANE_CYCLE.length]}
              glyph={PAIN_GLYPHS[i % PAIN_GLYPHS.length]}
              title={p}
            />
          ))}
        </CardGrid>
      </Section>

      <Section
        tone={lane}
        title={`Our ${industry.name} Video Services`}
        subtitle="Production options designed around recurring communication, training, education, and trust-building needs."
      >
        <CardGrid cols={3}>
          {industry.solutions.map((s, i) => (
            <Card
              key={s.title}
              lane={lane}
              glyph={SOLUTION_GLYPHS[i % SOLUTION_GLYPHS.length]}
              title={s.title}
              body={s.body}
            />
          ))}
        </CardGrid>
      </Section>

      <Section
        title="Who We Serve"
        subtitle={`${industry.name} specialties across the Pacific Northwest`}
        lane={lane}
      >
        <CardGrid cols={2}>
          {industry.useCases.map((u, i) => (
            <Card
              key={u}
              lane={LANE_CYCLE[(LANE_CYCLE.indexOf(lane) + i + 1) % LANE_CYCLE.length]}
              glyph={USE_CASE_GLYPHS[i % USE_CASE_GLYPHS.length]}
              title={u}
            />
          ))}
        </CardGrid>
      </Section>

      <Section
        tone="mist"
        title="Outcomes to Design For"
        subtitle="Practical ways a reusable video system can support your organization."
        lane={lane}
      >
        <CardGrid cols={4}>
          {industry.outcomes.map((o, i) => (
            <Card
              key={o.label}
              lane={LANE_CYCLE[i % LANE_CYCLE.length]}
              glyph={i % 2 === 0 ? "chart" : "spark"}
              index={o.stat}
              title={o.label}
              body={o.body}
            />
          ))}
        </CardGrid>
      </Section>

      <Section
        eyebrow="How we work with your team"
        title="A production process built for review chains"
        subtitle="Your legal, compliance, safety, clinical, or accessibility owners stay the final authority on regulated content."
        lane={lane}
      >
        <ProcessTimeline
          steps={[
            {
              title: "Map the environment",
              body: "Audience, workflow, privacy requirements, and internal review process are documented first.",
              pal: leadPal,
            },
            {
              title: "Draft for approval",
              body: "Scripts, production plans, and delivery formats are prepared for your team to approve before filming.",
              pal: secondPal,
            },
            {
              title: "Film around operations",
              body: "Crew size, equipment, and production windows are planned around the access and safety rules you provide.",
              pal: "kareem",
            },
            {
              title: "Deliver for reuse",
              body: "Finished videos are organized so training, education, and trust content keep working after launch.",
              pal: "silas",
            },
          ]}
        />
      </Section>

      <Section tone="mist" title="Frequently Asked Questions" lane={lane}>
        <FaqList items={industry.faqs} lane={lane} pal={leadPal} />
      </Section>

      <Section title="Explore Other Industries" lane={lane}>
        <CardGrid cols={3}>
          {others.map((i) => {
            const otherLane = industryLane(i.slug);
            return (
              <Card
                key={i.slug}
                lane={otherLane}
                glyph={industryGlyph(i.slug, 0)}
                title={i.name}
                body={i.subtitle}
                to={`/industries/${i.slug}`}
              />
            );
          })}
        </CardGrid>
      </Section>

      <CtaBand
        title={`Ready to Elevate ${industry.name}?`}
        subtitle={`Let's discuss how video can help your ${industry.name.toLowerCase()} organization achieve its goals.`}
        lane={lane}
      />
    </PageShell>
  );
}
