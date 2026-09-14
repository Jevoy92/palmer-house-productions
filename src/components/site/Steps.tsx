import { motion } from "motion/react";
import { useSiteMotion } from "./site-motion";
import { Lightbulb, Map, Clapperboard, Rocket } from "lucide-react";

import clara from "@/assets/pal-headshots/clara-192.webp";
import samira from "@/assets/pal-headshots/samira-192.webp";
import kiana from "@/assets/pal-headshots/kiana-192.webp";
import ryder from "@/assets/pal-headshots/ryder-192.webp";

const steps = [
  {
    n: "01",
    title: "Share Your Vision",
    body: "Tell us your goals and we'll craft the perfect video strategy for your business.",
    icon: Lightbulb,
    pal: clara,
    palName: "Clara",
    lane: "evergreen",
  },
  {
    n: "02",
    title: "Custom Strategy",
    body: "Our team designs a tailored video content plan that aligns with your brand.",
    icon: Map,
    pal: samira,
    palName: "Samira",
    lane: "system",
  },
  {
    n: "03",
    title: "Professional Production",
    body: "We handle everything from filming to editing with cinematic quality.",
    icon: Clapperboard,
    pal: kiana,
    palName: "Kiana",
    lane: "spotlight",
  },
  {
    n: "04",
    title: "Launch & Optimize",
    body: "Publish your content and watch your engagement soar. We're with you every step.",
    icon: Rocket,
    pal: ryder,
    palName: "Ryder",
    lane: "reel",
  },
] as const;

const laneStyles: Record<string, { bg: string; text: string; ring: string; dot: string }> = {
  evergreen: {
    bg: "bg-evergreen-soft",
    text: "text-evergreen",
    ring: "group-hover:border-evergreen/40",
    dot: "bg-evergreen",
  },
  system: {
    bg: "bg-system-soft",
    text: "text-system",
    ring: "group-hover:border-system/40",
    dot: "bg-system",
  },
  spotlight: {
    bg: "bg-spotlight-soft",
    text: "text-spotlight",
    ring: "group-hover:border-spotlight/40",
    dot: "bg-spotlight",
  },
  reel: {
    bg: "bg-reel-soft",
    text: "text-reel",
    ring: "group-hover:border-reel/40",
    dot: "bg-reel",
  },
};

export function Steps() {
  const { enter, transition } = useSiteMotion();

  return (
    <section className="overflow-hidden px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={enter}
          whileInView={{ opacity: 1, transform: "translateY(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={transition}
        >
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            The Palmer House way
          </p>
          <h2 className="mt-3 max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)]">
            How Palmer House Productions Works
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Four decisions move every project from a business problem to a published, reusable video
            system. A Pal guides each handoff so the work stays clear.
          </p>
        </motion.div>

        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="absolute top-[92px] right-0 left-0 hidden h-px bg-spotlight/30 lg:block"
          />
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => {
              const lane = laneStyles[s.lane];
              const Icon = s.icon;
              return (
                <article
                  key={s.n}
                  className={`group surface-card relative overflow-hidden border p-6 transition-colors ${lane.ring}`}
                >
                  <div
                    className={`relative flex h-28 items-center justify-center rounded-xl ${lane.bg}`}
                  >
                    <img
                      src={s.pal}
                      alt={`${s.palName}, guide for ${s.title}`}
                      loading="lazy"
                      decoding="async"
                      width={96}
                      height={96}
                      className="size-24 rounded-full object-cover drop-shadow-sm"
                    />
                    <span
                      className={`absolute top-3 left-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background text-xs font-bold ${lane.text}`}
                    >
                      {s.n}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${lane.text}`} aria-hidden="true" />
                    <span
                      className={`font-mono text-[0.7rem] tracking-widest uppercase ${lane.text}`}
                    >
                      Step {s.n}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>

                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 h-1 w-full origin-left ${lane.dot}`}
                  />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
