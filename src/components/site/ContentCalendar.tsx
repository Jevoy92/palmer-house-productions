import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { InView, Section, Stagger } from "@/components/site/PageShell";
import { Glyph, GlyphBadge, type GlyphName } from "@/components/site/Glyphs";
import { laneVar } from "@/lib/pal-lanes";
import { staggerItem } from "@/lib/motion-presets";
import type { PalAccent } from "@/lib/pricing-catalog";

/** What one production day turns into, by lane. */
const OUTPUTS: { lane: PalAccent; label: string; detail: string; glyph: GlyphName }[] = [
  { lane: "spotlight", label: "Your main story", detail: "Website · Brand film", glyph: "camera" },
  { lane: "reel", label: "Short social cuts", detail: "Reels · TikTok · Shorts", glyph: "reel" },
  { lane: "evergreen", label: "Useful explainers", detail: "YouTube · Education", glyph: "play" },
  { lane: "system", label: "Reusable know-how", detail: "Training · Onboarding", glyph: "library" },
];

/** Every format we shoot, tagged with the lane that usually owns it. */
const FORMATS: { label: string; lane: PalAccent }[] = [
  { label: "Product demos", lane: "spotlight" },
  { label: "Team stories", lane: "spotlight" },
  { label: "Training videos", lane: "system" },
  { label: "Testimonials", lane: "spotlight" },
  { label: "Brand stories", lane: "spotlight" },
  { label: "Social content", lane: "reel" },
  { label: "Event coverage", lane: "reel" },
  { label: "Explainer videos", lane: "evergreen" },
  { label: "Before & after", lane: "spotlight" },
  { label: "Client stories", lane: "spotlight" },
  { label: "How-to guides", lane: "evergreen" },
  { label: "Company culture", lane: "system" },
  { label: "Industry insights", lane: "evergreen" },
  { label: "Behind the scenes", lane: "reel" },
];

const BUSINESSES = [
  "Small businesses",
  "Startups",
  "Healthcare systems",
  "Manufacturers",
  "Government agencies",
];

function LaneChip({ label, lane }: { label: string; lane: PalAccent }) {
  return (
    <span
      className="inline-flex min-h-9 items-center gap-2 rounded-full border px-3.5 text-sm font-semibold"
      style={{
        background: laneVar(lane, "-soft"),
        color: laneVar(lane, "-text"),
        borderColor: `color-mix(in srgb, ${laneVar(lane)} 24%, transparent)`,
      }}
    >
      <span aria-hidden className="size-1.5 rounded-full" style={{ background: laneVar(lane) }} />
      {label}
    </span>
  );
}

export function ContentCalendar() {
  return (
    <Section
      tone="cream"
      eyebrow="From the shoot to the places you show up"
      title="Plan the content together. Make every format useful."
      subtitle="Start with your story and the channels you need. We plan what to capture, then shape the footage into the formats agreed for your project."
      align="left"
    >
      <div className="grid items-center gap-5 lg:grid-cols-[0.8fr_auto_1.5fr]">
        <InView className="rounded-[2rem] bg-ink p-8 text-white sm:p-10">
          <Glyph name="camera" lane="reel" className="size-16" />
          <p className="mt-7 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white/65">
            The starting point
          </p>
          <h3 className="mt-2 text-3xl font-extrabold leading-tight tracking-[-0.03em]">
            One focused production day.
          </h3>
          <p className="mt-4 leading-relaxed text-white/80">
            Your people, your expertise, and the details that make your business yours.
          </p>
          <p className="mt-6 border-t border-white/20 pt-5 text-sm text-white/70">
            Planned together · Captured with purpose
          </p>
        </InView>
        <ArrowRight aria-hidden className="mx-auto size-6 rotate-90 text-spotlight lg:rotate-0" />
        <Stagger className="grid gap-3 sm:grid-cols-2">
          {OUTPUTS.map((output) => (
            <motion.div
              key={output.lane}
              variants={staggerItem}
              className="rounded-[1.5rem] border p-6"
              style={{
                background: laneVar(output.lane, "-soft"),
                borderColor: `color-mix(in srgb, ${laneVar(output.lane)} 20%, transparent)`,
              }}
            >
              <GlyphBadge name={output.glyph} lane={output.lane} size="sm" />
              <h3 className="mt-5 text-xl font-bold tracking-[-0.02em]">{output.label}</h3>
              <p
                className="mt-2 text-sm font-semibold"
                style={{ color: laneVar(output.lane, "-text") }}
              >
                {output.detail}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>

      <InView className="mt-14 border-t border-ink/10 pt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h3 className="max-w-lg text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
            A format for the story you need to tell.
          </h3>
          <Link
            to="/services/video-production"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-spotlight underline-offset-4 hover:underline"
          >
            Explore video services <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Video formats we produce">
          {FORMATS.map((format) => (
            <li key={format.label}>
              <LaneChip label={format.label} lane={format.lane} />
            </li>
          ))}
        </ul>
      </InView>

      <InView className="mt-10 flex flex-col gap-5 rounded-[1.5rem] border border-ink/10 bg-white/75 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <h3 className="shrink-0 text-xl font-bold tracking-[-0.02em]">
          Built around your business.
        </h3>
        <ul className="flex flex-wrap gap-2" aria-label="Who we work with">
          {BUSINESSES.map((b) => (
            <li
              key={b}
              className="inline-flex min-h-9 items-center rounded-full border border-border bg-white px-3.5 text-sm font-medium"
            >
              {b}
            </li>
          ))}
        </ul>
      </InView>
    </Section>
  );
}
