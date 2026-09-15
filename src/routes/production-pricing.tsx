import { createFileRoute } from "@tanstack/react-router";
import { QuoteBuilder } from "@/components/pricing/QuoteBuilder";
import {
  Card,
  CardGrid,
  FaqList,
  IncludedPanel,
  PageHero,
  PageShell,
  Section,
} from "@/components/site/PageShell";
import { PalCallout, StatBand } from "@/components/site/PalVisuals";
import { MONTHLY_DISCOUNT_RATE } from "@/lib/cart-store";
import { laneById } from "@/lib/pal-lanes";
import {
  BASE_INCLUDED,
  INCLUDED_EDITED_MINUTES_PER_SESSION,
  PAL_GROUPS,
  SESSION_PRICE,
} from "@/lib/pricing-catalog";
import { createSeo, faqSchema, jsonLdScript, schemaGraph } from "@/lib/seo";

const PRICING_FAQS = [
  {
    q: "Is this the final price?",
    a: "It is a transparent working estimate using the published Palmer House pricing model. Scope, tax, travel, schedule, and the final deposit are confirmed before payment.",
  },
  {
    q: "Can I mix more than one Pal?",
    a: "Yes. The best video systems often combine lanes—for example Spotlight proof with Reel distribution or Evergreen education with System onboarding.",
  },
  {
    q: "Do I own the footage and finished work?",
    a: "Upon final payment, you own the footage, finished videos, and source files.",
  },
  {
    q: "Can this become a monthly plan?",
    a: "Yes. Choose a monthly rhythm in the shop. The exact recurring deliverables are scoped first, then connected to Stripe Billing rather than charging a guessed subscription.",
  },
];

function ProductionPricingPage() {
  return (
    <PageShell>
      <div className="pricing-page">
        <PageHero
          eyebrow="Build your package"
          title="Build the video system your business"
          highlight="actually needs."
          subtitle="Choose the problems you want to solve, see your working estimate update in real time, and bring the plan to a free strategy call."
          lane="system"
          pal="system"
          palTags={["Start with one Pal", "Mix lanes as needed", "Own the final assets"]}
          primary={{ label: "Book a Discovery Call", to: "/contact" }}
          secondary={{ label: "Find Your Pal", to: "/find-your-pal" }}
        />

        <QuoteBuilder />

        <Section
          tone="mist"
          eyebrow="The baseline"
          title="Every package starts from the same numbers."
          subtitle="Sessions are priced the same way in every lane, so the estimate above is only ever moving because of what you add."
        >
          <StatBand
            stats={[
              {
                value: SESSION_PRICE,
                prefix: "$",
                label: "per production session",
                lane: "spotlight",
              },
              { value: 2, suffix: " hrs", label: "on-location filming per session", lane: "reel" },
              {
                value: INCLUDED_EDITED_MINUTES_PER_SESSION,
                suffix: " min",
                label: "edited output included per session",
                lane: "evergreen",
              },
              {
                value: Math.round(MONTHLY_DISCOUNT_RATE * 100),
                suffix: "%",
                label: "saved on a monthly rhythm",
                lane: "system",
              },
            ]}
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <PalCallout
              pal="silas"
              quote="Build the estimate around the problem, not the format. Sessions cost the same in every lane — what changes is how many edited minutes you need and how often you want them."
              action={{ label: "See current offers", to: "/offers" }}
            />
          </div>
        </Section>

        <Section
          eyebrow="Included every time"
          title="The production standard never changes with the price."
          subtitle="One-time or monthly, every session ships with the same crew, gear, and finishing."
        >
          <IncludedPanel
            title="Included in every production, one-time or monthly."
            items={BASE_INCLUDED}
            lane="spotlight"
            glyph="light"
          />
        </Section>

        <Section
          tone="system"
          eyebrow="Four lanes"
          title="Compare the four ways video can work."
          subtitle="Every lane begins with a different business bottleneck. Mix them when the problem crosses lanes."
        >
          <CardGrid cols={4}>
            {PAL_GROUPS.map((group) => (
              <Card
                key={group.id}
                lane={group.accent}
                glyph={laneById[group.id].glyph}
                index={group.role}
                title={group.tagline}
                body={group.pitch}
                to={laneById[group.id].to}
              >
                <p className="relative mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {group.items.length} preset missions · fully customizable
                </p>
              </Card>
            ))}
          </CardGrid>
        </Section>

        <Section
          eyebrow="Pricing questions"
          title="Pricing questions, answered before the call."
          subtitle="Samira keeps the scope honest so the estimate you build is the estimate you bring to the conversation."
        >
          <FaqList items={PRICING_FAQS} lane="system" pal="samira" />
        </Section>
      </div>
    </PageShell>
  );
}

export const Route = createFileRoute("/production-pricing")({
  head: () => ({
    ...createSeo({
      title: "Build Your Video Package | Palmer House Productions",
      description:
        "Build a working Palmer House video estimate by choosing the Pal lanes and missions that match your business problems.",
      pathname: "/production-pricing",
    }),
    scripts: [jsonLdScript(schemaGraph(faqSchema(PRICING_FAQS)))],
  }),
  component: ProductionPricingPage,
});
