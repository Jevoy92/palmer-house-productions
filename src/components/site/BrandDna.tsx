import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Eyebrow, InView, Section, Stagger } from "@/components/site/PageShell";
import { PalDuo } from "@/components/site/PalVisuals";
import { laneVar } from "@/lib/pal-lanes";
import { staggerItem } from "@/lib/motion-presets";
import { motion } from "motion/react";

/** Plain-language outcomes of a Reel Pal shoot. No frameworks, no engines. */
const FEATURES = [
  {
    title: "Built for the platform",
    body: "Short-form cuts shaped for the pace, framing, and captions of the channel where they will appear.",
    tag: "TikTok · Reels · Shorts",
  },
  {
    title: "A rhythm you can maintain",
    body: "Leave the shoot with a practical sequence of content and a clear idea of what to share next.",
    tag: "Plan · Film · Share",
  },
  {
    title: "A reason to join in",
    body: "Useful questions, clear hooks, and relevant next steps give people something to respond to.",
    tag: "Hooks · Questions · Conversation",
  },
  {
    title: "A recognizable point of view",
    body: "Keep the voice and ideas consistent as each piece takes a different shape.",
    tag: "Your voice, across every format",
  },
];

const PILLARS: { label: string; lane: "spotlight" | "evergreen" | "system" | "reel" }[] = [
  { label: "Video", lane: "spotlight" },
  { label: "Photo", lane: "evergreen" },
  { label: "Training", lane: "system" },
  { label: "Social", lane: "reel" },
];

export function BrandDna() {
  return (
    <Section
      eyebrow="A library with a purpose"
      title="One shoot. More ways to tell your story."
      subtitle="Plan the formats together, then capture what each one needs. Your content can work across social, your website, sales, and training."
      lane="reel"
    >
      <InView className="flex flex-wrap justify-center gap-2">
        {PILLARS.map((p) => (
          <span
            key={p.label}
            className="inline-flex min-h-9 items-center gap-2 rounded-full border px-4 text-sm font-semibold"
            style={{
              background: laneVar(p.lane, "-soft"),
              color: laneVar(p.lane, "-text"),
              borderColor: `color-mix(in srgb, ${laneVar(p.lane)} 24%, transparent)`,
            }}
          >
            <span
              aria-hidden
              className="size-1.5 rounded-full"
              style={{ background: laneVar(p.lane) }}
            />
            {p.label}
          </span>
        ))}
      </InView>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.15fr] lg:gap-14">
        <InView
          className="self-start overflow-hidden rounded-[2.25rem] p-6 sm:p-8"
          style={{ background: laneVar("reel", "-soft") }}
        >
          <Eyebrow lane="reel">Guided by Reel Pal</Eyebrow>
          <h3 className="mt-5 max-w-sm text-3xl font-extrabold leading-[1.04] tracking-[-0.04em] sm:text-4xl">
            Give a good idea more places to go.
          </h3>
          <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
            Raquel and Ryder bring the focus to short-form content: how it opens, why people stay,
            and what comes next.
          </p>
          <PalDuo
            lane="reel"
            labels={["Hook first", "Caption-ready", "Post-ready cuts"]}
            className="mt-6"
            minHeight="min-h-[18rem]"
          />
          <Link
            to="/reel-pal"
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold underline-offset-4 hover:underline"
            style={{ color: laneVar("reel", "-text") }}
          >
            Explore Reel Pal <ArrowRight className="size-4" aria-hidden />
          </Link>
        </InView>

        <Stagger className="divide-y divide-border border-t border-border">
          {FEATURES.map((feature, index) => (
            <motion.article
              key={feature.title}
              variants={staggerItem}
              className="flex gap-5 py-7 first:pt-6 sm:gap-6"
            >
              <span
                aria-hidden
                className="mt-1 grid size-10 shrink-0 place-items-center rounded-xl font-mono text-sm font-bold"
                style={{ background: laneVar("reel", "-soft"), color: laneVar("reel", "-text") }}
              >
                0{index + 1}
              </span>
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.03em]">{feature.title}</h3>
                <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">
                  {feature.body}
                </p>
                <p
                  className="mt-4 text-sm font-semibold"
                  style={{ color: laneVar("reel", "-text") }}
                >
                  {feature.tag}
                </p>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
