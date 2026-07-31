import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Lightbulb, Map, Clapperboard, Rocket } from "lucide-react";

import clara from "@/assets/pals-optimized/clara.webp";
import samira from "@/assets/pals-optimized/samira.webp";
import kiana from "@/assets/pals-optimized/kiana.webp";
import ryder from "@/assets/pals-optimized/ryder.webp";

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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 26 } },
};

export function Steps() {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className="overflow-hidden px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            The Palmer House way
          </p>
          <h2 className="mt-3 max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)]">
            How Palmer House Productions Works
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Four steps, four Pals. Every project moves down the same track — from first idea to
            published, optimized video.
          </p>
        </motion.div>

        <div ref={trackRef} className="relative mt-14">
          {/* animated progress track */}
          <div className="absolute top-[92px] right-0 left-0 hidden h-px bg-border lg:block">
            <motion.div
              className="bg-spotlight h-px origin-left"
              style={{ scaleX: reduce ? 1 : lineScale }}
            />
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((s) => {
              const lane = laneStyles[s.lane];
              const Icon = s.icon;
              return (
                <motion.article
                  key={s.n}
                  variants={reduce ? undefined : item}
                  whileHover={reduce ? undefined : { y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={`group surface-card relative overflow-hidden border p-6 transition-colors ${lane.ring}`}
                >
                  {/* pal illustration */}
                  <div
                    className={`relative flex h-40 items-end justify-center rounded-xl ${lane.bg}`}
                  >
                    <motion.img
                      src={s.pal}
                      alt={`${s.palName}, the Palmer House Pal for ${s.title}`}
                      loading="lazy"
                      className="h-36 w-auto object-contain drop-shadow-sm"
                      animate={reduce ? undefined : { y: [0, -6, 0] }}
                      transition={{
                        duration: 4 + Number(s.n) * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
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

                  <motion.span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 h-1 w-full origin-left ${lane.dot}`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
