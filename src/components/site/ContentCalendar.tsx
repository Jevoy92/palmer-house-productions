import { motion, useReducedMotion } from "motion/react";
import transformationEngine from "@/assets/transformation-engine.webp";
import { Marquee } from "./Marquee";

const ideas = [
  "Product Demos",
  "Team Stories",
  "Training Videos",
  "Testimonials",
  "Brand Stories",
  "Social Content",
  "Event Coverage",
];
const ideas2 = [
  "Explainer Videos",
  "Before & After",
  "Client Success",
  "How-To Guides",
  "Company Culture",
  "Industry Insights",
  "Behind the Scenes",
];

const businesses = [
  "Small businesses",
  "Startups",
  "Healthcare systems",
  "Manufacturers",
  "Government agencies",
];

function Pill({ label }: { label: string }) {
  return (
    <span className="whitespace-nowrap rounded-full border border-border bg-card px-6 py-3 text-base font-medium shadow-soft">
      {label}
    </span>
  );
}

export function ContentCalendar() {
  const reduce = useReducedMotion();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-gradient-brand text-sm font-semibold uppercase tracking-widest">
          One shoot day, weeks of content
        </p>
        <h2 className="mt-4 max-w-3xl text-[clamp(1.9rem,4.5vw,3rem)]">
          Fill out your content calendar, months in advance
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          From one raw master we generate a YouTube longform cut, three Reels and TikToks, a
          LinkedIn teaser, and an email newsletter asset — so your channels stay fed long after the
          crew packs up.
        </p>

        <div className="surface-card mt-10 grid items-center gap-8 p-8 sm:p-12 md:grid-cols-2">
          <motion.img
            src={transformationEngine}
            alt="The Palmer House transformation engine turning one shoot into many useful content formats"
            width={800}
            height={800}
            loading="lazy"
            className="mx-auto w-64 mix-blend-darken"
            animate={reduce ? undefined : { rotate: [-2, 2, -2], y: [0, -7, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div>
            <h3 className="text-2xl">Maximum output, minimal effort.</h3>
            <p className="mt-3 text-muted-foreground">
              One shoot day delivers weeks of content across all your channels.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-border bg-background px-4 py-2">
                Raw Master.mov
              </span>
              <span className="bg-gradient-brand rounded-full px-4 py-2 font-semibold text-primary-foreground shadow-glow">
                1 Shoot Day
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="px-4 text-center text-2xl">
          Every type of video content your business needs
        </h3>
        <div className="mt-8 space-y-4">
          <Marquee duration="38s">
            {ideas.map((i) => (
              <Pill key={i} label={i} />
            ))}
          </Marquee>
          <Marquee duration="44s" reverse>
            {ideas2.map((i) => (
              <Pill key={i} label={i} />
            ))}
          </Marquee>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-6xl px-4">
        <h2 className="text-center text-[clamp(1.9rem,4.5vw,3rem)]">Works for any business type</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {businesses.map((b) => (
            <Pill key={b} label={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
