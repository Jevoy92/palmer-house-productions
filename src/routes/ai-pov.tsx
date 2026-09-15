import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { InView, PageHero, PageShell, Section } from "@/components/site/PageShell";
import { FeatureSplit, GraphicFrame, PalCallout } from "@/components/site/PalVisuals";
import { Glyph, type GlyphName } from "@/components/site/Glyphs";
import type { PalAccent } from "@/lib/pricing-catalog";
import { createSeo } from "@/lib/seo";

const PRINCIPLES: {
  n: string;
  title: string;
  body: string;
  lane: PalAccent;
  glyph: GlyphName;
  frame: string;
}[] = [
  {
    n: "01",
    title: "AI should remove blank-page friction.",
    body: "Use it to structure options, surface patterns, and turn raw thinking into a draft you can challenge.",
    lane: "system",
    glyph: "bulb",
    frame: "Drafts you can challenge",
  },
  {
    n: "02",
    title: "The human point of view stays in charge.",
    body: "A fast generic answer is not a brand. Your experience, judgment, proof, and delivery are the material.",
    lane: "spotlight",
    glyph: "chat",
    frame: "Your voice, not a template",
  },
  {
    n: "03",
    title: "Automation must tell the truth.",
    body: "No fake people, fake proof, fake live feeds, or invisible charges. The interface should say what is generated, stored, or sent.",
    lane: "evergreen",
    glyph: "shield",
    frame: "Honest by default",
  },
  {
    n: "04",
    title: "Better systems create more room for craft.",
    body: "When planning, repurposing, and handoffs become repeatable, the team can spend its energy on direction and story.",
    lane: "reel",
    glyph: "workflow",
    frame: "Repeatable handoffs",
  },
];

function AiPovPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our point of view on AI"
        title="Generic speed is not the goal."
        highlight="Useful judgment is."
        subtitle="Palmer House uses AI to accelerate the parts that should be easier—not to manufacture trust, replace direction, or sand every voice into the same answer."
        lane="system"
        pal="system"
        palTags={["Machine speed", "Human judgment", "More useful human work"]}
      />

      <Section
        eyebrow="Four operating principles"
        title="The guardrails matter as much as the tool."
        subtitle="Each principle shapes how the Studio drafts, what it stores, and where a person stays in the loop."
        lane="system"
      >
        <div className="space-y-16">
          {PRINCIPLES.map((item, index) => (
            <FeatureSplit
              key={item.n}
              reverse={index % 2 === 1}
              lane={item.lane}
              eyebrow={`Principle ${item.n}`}
              title={item.title}
              body={item.body}
              visual={
                <GraphicFrame lane={item.lane} label={item.frame}>
                  <div className="grid h-full place-items-center pt-8">
                    <Glyph name={item.glyph} lane={item.lane} className="size-40 sm:size-52" />
                  </div>
                </GraphicFrame>
              }
            />
          ))}
        </div>
      </Section>

      <Section
        tone="system"
        eyebrow="The Pals' take"
        title="Machine speed. Human material."
        subtitle="Silas and Samira run the System lane — the part of Palmer House where automation earns its keep."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <PalCallout
            pal="silas"
            quote="Think in systems: one anchor, many outputs. The machine is good at the many. The anchor still has to come from you."
            action={{ label: "Open Palmer House Studio", to: "/studio" }}
          />
          <PalCallout
            pal="samira"
            quote="Write down the answers you repeat — that is your knowledge base. Drafting from it is fast. Deciding what is true is still your job."
            action={{ label: "Build the human strategy", to: "/content-strategy" }}
          />
        </div>
      </Section>

      <section className="bg-mist px-4 py-20 sm:py-28">
        <InView className="mx-auto grid max-w-6xl overflow-hidden rounded-[2.5rem] bg-ink text-white lg:grid-cols-2">
          <div className="p-8 sm:p-12">
            <Glyph name="spark" lane="system" className="size-16" />
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
              The practical version
            </p>
            <h2 className="mt-4 text-4xl font-extrabold sm:text-6xl">
              Use the machine to make the human work more useful.
            </h2>
          </div>
          <div className="grid content-center gap-3 bg-white/5 p-8 sm:p-12">
            <Link
              to="/studio"
              className="flex min-h-14 items-center justify-between rounded-2xl bg-white px-5 font-semibold text-ink"
            >
              Open Palmer House Studio <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/content-strategy"
              className="flex min-h-14 items-center justify-between rounded-2xl border border-white/25 px-5 font-semibold"
            >
              Build the human strategy <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/contact"
              className="flex min-h-14 items-center justify-between rounded-2xl border border-white/25 px-5 font-semibold"
            >
              Talk through your system <ArrowRight className="size-4" />
            </Link>
          </div>
        </InView>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute("/ai-pov")({
  head: () => ({
    ...createSeo({
      title: "Our View on AI | Palmer House Productions",
      description:
        "Palmer House uses AI to reduce friction while keeping human judgment, proof, direction, and brand voice in charge.",
      pathname: "/ai-pov",
    }),
  }),
  component: AiPovPage,
});
