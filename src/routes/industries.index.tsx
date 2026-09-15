import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { CtaBand, PageHero, PageShell, Section } from "@/components/site/PageShell";
import { PalCallout, ProcessTimeline, Scene } from "@/components/site/PalVisuals";
import { GlyphBadge, type GlyphName } from "@/components/site/Glyphs";
import { industryList } from "@/data/industries";
import { laneVar } from "@/lib/pal-lanes";
import type { PalAccent } from "@/lib/pricing-catalog";
import { breadcrumbSchema, createSeo, jsonLdScript, schemaGraph } from "@/lib/seo";

const DESCRIPTION =
  "Explore Palmer House Productions video systems for healthcare, manufacturing, technology, professional services, education, and government teams.";

const LANE_CYCLE: PalAccent[] = ["evergreen", "system", "spotlight", "reel"];

const INDUSTRY_GLYPHS: Record<string, GlyphName> = {
  healthcare: "shield",
  manufacturing: "workflow",
  technology: "layers",
  "professional-services": "handshake",
  education: "library",
  government: "pin",
};

const FALLBACK_GLYPHS: GlyphName[] = ["camera", "chart", "light", "script"];

export const Route = createFileRoute("/industries/")({
  head: () => ({
    ...createSeo({
      title: "Industry Video Production | Palmer House Productions",
      description: DESCRIPTION,
      pathname: "/industries",
    }),
    scripts: [
      jsonLdScript(
        schemaGraph(
          breadcrumbSchema([
            { name: "Home", pathname: "/" },
            { name: "Industries", pathname: "/industries" },
          ]),
        ),
      ),
    ],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  const reduce = useReducedMotion();
  return (
    <PageShell>
      <PageHero
        eyebrow="Industry Video Systems"
        title="Start With the Communication Problem"
        subtitle="Different industries carry different approval paths, audiences, access needs, and operational risks. Explore the video system built around your environment."
        lane="evergreen"
        visual={
          <Scene
            name="industries"
            priority
            tags={["Training", "Patient & client education", "Trust stories"]}
          />
        }
      />

      <Section
        eyebrow="Industry guides"
        title="Production planned for how your organization works"
        subtitle="Each guide connects common communication challenges to practical video services, use cases, and questions to resolve before production."
        lane="evergreen"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {industryList.map((industry, index) => {
            const lane = LANE_CYCLE[index % LANE_CYCLE.length];
            const glyph =
              INDUSTRY_GLYPHS[industry.slug] ?? FALLBACK_GLYPHS[index % FALLBACK_GLYPHS.length];
            return (
              <motion.div
                key={industry.slug}
                className="h-full"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease: "easeOut" }}
              >
                <Link
                  to="/industries/$slug"
                  params={{ slug: industry.slug }}
                  className="surface-card group relative flex h-full min-h-72 flex-col overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8 motion-reduce:transition-none"
                >
                  <span
                    aria-hidden
                    className="absolute -right-14 -top-14 size-40 rounded-full transition-transform duration-500 group-hover:scale-125 motion-reduce:transition-none"
                    style={{ background: laneVar(lane, "-soft") }}
                  />
                  <div className="relative flex items-center gap-4">
                    <GlyphBadge name={glyph} lane={lane} />
                    <span
                      className="font-mono text-xs font-bold uppercase tracking-[0.16em]"
                      style={{ color: laneVar(lane, "-text") }}
                    >
                      {String(index + 1).padStart(2, "0")} · {industry.name}
                    </span>
                  </div>
                  <h3 className="relative mt-5 text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
                    {industry.title}
                  </h3>
                  <p className="relative mt-4 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {industry.metaDescription}
                  </p>
                  <span
                    className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold"
                    style={{ color: laneVar(lane, "-text") }}
                  >
                    Explore {industry.name.toLowerCase()} video production
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <Section
        tone="evergreen"
        eyebrow="Shared process"
        title="Your subject-matter experts stay in control"
        subtitle="We plan around your audience, access rules, review chain, and delivery needs. Your legal, compliance, safety, clinical, or accessibility owners approve regulated requirements and final content."
      >
        <ProcessTimeline
          steps={[
            {
              title: "Map the environment",
              body: "Audience, access rules, privacy requirements, and the internal review chain are documented before scripting.",
              pal: "clara",
            },
            {
              title: "Draft for approval",
              body: "Scripts, production plans, and delivery formats are prepared for your subject-matter owners to approve.",
              pal: "samira",
            },
            {
              title: "Film around operations",
              body: "Crew size, equipment, locations, and production windows are planned around your facility's workflow.",
              pal: "kareem",
            },
            {
              title: "Deliver for reuse",
              body: "Finished videos are organized for training, education, onboarding, and trust-building so they keep working.",
              pal: "silas",
            },
          ]}
        />
        <div className="mt-10">
          <PalCallout
            pal="clara"
            quote="If a customer has to ask twice, that is a video waiting to be made. Regulated industries just have more of those questions — and more people who need to approve the answer."
            action={{ label: "Talk through your review chain", to: "/contact" }}
          />
        </div>
      </Section>

      <CtaBand
        title="Bring Us the Repeated Question"
        subtitle="We’ll help turn the training gap, unclear service, slow handoff, or trust problem into a reusable video plan."
        lane="evergreen"
      />
    </PageShell>
  );
}
