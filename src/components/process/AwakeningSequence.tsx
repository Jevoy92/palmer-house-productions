import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import ryder from "@/assets/pals-optimized/ryder.webp";
import raquel from "@/assets/pals-optimized/raquel.webp";
import kareem from "@/assets/pals-optimized/kareem.webp";
import kiana from "@/assets/pals-optimized/kiana.webp";
import cyrus from "@/assets/pals-optimized/cyrus.webp";
import clara from "@/assets/pals-optimized/clara.webp";
import silas from "@/assets/pals-optimized/silas.webp";
import samira from "@/assets/pals-optimized/samira.webp";

type Lane = {
  id: "reel" | "spotlight" | "evergreen" | "system";
  label: string;
  pals: string;
  outcome: string;
  color: string;
  soft: string;
  corner: string;
  start: number;
  end: number;
  rail: string;
  images: [string, string];
};

const lanes: Lane[] = [
  {
    id: "reel",
    label: "Reel",
    pals: "Ryder + Raquel",
    outcome: "Turn scattered ideas into consistent visibility.",
    color: "#E8720C",
    soft: "rgba(232,114,12,.1)",
    corner: "left-[4vw] top-[14vh]",
    start: 0.28,
    end: 0.43,
    rail: "M 140 180 C 430 235, 620 350, 760 440",
    images: [ryder, raquel],
  },
  {
    id: "spotlight",
    label: "Spotlight",
    pals: "Kareem + Kiana",
    outcome: "Turn invisible value into proof people trust.",
    color: "#3D1A66",
    soft: "rgba(61,26,102,.1)",
    corner: "right-[4vw] top-[14vh]",
    start: 0.4,
    end: 0.55,
    rail: "M 1460 180 C 1170 235, 980 350, 840 440",
    images: [kareem, kiana],
  },
  {
    id: "evergreen",
    label: "Evergreen",
    pals: "Cyrus + Clara",
    outcome: "Turn repeated explanations into lasting authority.",
    color: "#5B8A2D",
    soft: "rgba(91,138,45,.1)",
    corner: "left-[4vw] bottom-[12vh]",
    start: 0.52,
    end: 0.67,
    rail: "M 140 720 C 430 665, 620 550, 760 460",
    images: [cyrus, clara],
  },
  {
    id: "system",
    label: "System",
    pals: "Silas + Samira",
    outcome: "Turn tribal knowledge into a system that scales.",
    color: "#0A9B8F",
    soft: "rgba(10,155,143,.1)",
    corner: "right-[4vw] bottom-[12vh]",
    start: 0.64,
    end: 0.79,
    rail: "M 1460 720 C 1170 665, 980 550, 840 460",
    images: [silas, samira],
  },
];

const stageCopy = [
  {
    label: "Dormant",
    title: "More effort is not always the answer.",
    body: "When the knowledge stays in your head, the business keeps asking you to repeat it.",
  },
  {
    label: "Engaging",
    title: "Start with the bottleneck.",
    body: "We map the audience, the repeated questions, and the proof your business is missing.",
  },
  {
    label: "Activating",
    title: "Give every problem the right Pal.",
    body: "Visibility, trust, authority, and operations come online as one connected content system.",
  },
  {
    label: "Unified",
    title: "One shoot. A system that keeps working.",
    body: "Your videos launch as reusable business assets across social, sales, training, and support.",
  },
];

export function AwakeningSequence() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const switchProgress = useTransform(scrollYProgress, [0.14, 0.3], [0, 1]);
  const unified = useTransform(scrollYProgress, [0.78, 0.96], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = value < 0.18 ? 0 : value < 0.39 ? 1 : value < 0.78 ? 2 : 3;
    setStage((current) => (current === next ? current : next));
  });

  return (
    <section ref={containerRef} aria-label="How the Palmer House system comes online">
      <div className="md:hidden">
        <MobileSequence />
      </div>

      <div
        className="relative hidden bg-[#fbfbfb] md:block"
        style={{ height: reduce ? "auto" : "380vh" }}
      >
        <div className="sticky top-0 h-svh min-h-[700px] overflow-hidden">
          <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-8 py-7 lg:px-14">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              The Palmer House system
            </p>
            <ol className="flex items-center gap-5" aria-label="Process progress">
              {stageCopy.map((item, index) => (
                <li key={item.label} className="flex items-center gap-2">
                  <span
                    className="size-1.5 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: index <= stage ? "#1F2328" : "#d9dadd" }}
                  />
                  <span
                    className={`font-mono text-[9px] uppercase tracking-[0.18em] transition-opacity ${
                      index === stage ? "opacity-100" : "opacity-35"
                    }`}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <RailField progress={scrollYProgress} reduce={Boolean(reduce)} />

          {lanes.map((lane) => (
            <LaneCard
              key={lane.id}
              lane={lane}
              progress={scrollYProgress}
              reduce={Boolean(reduce)}
            />
          ))}

          <div className="absolute left-1/2 top-1/2 z-20 flex w-[min(42rem,48vw)] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 size-[min(42vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-system/10"
              style={{
                opacity: reduce ? 0.7 : unified,
                boxShadow: "0 0 120px rgba(10,155,143,.16)",
              }}
            />
            <SystemSwitch progress={switchProgress} reduce={Boolean(reduce)} />
            <div className="mt-10 min-h-52" aria-live="polite">
              <motion.p
                key={`label-${stage}`}
                initial={reduce ? false : { opacity: 0, transform: "translateY(10px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground"
              >
                Stage {String(stage + 1).padStart(2, "0")} · {stageCopy[stage].label}
              </motion.p>
              <motion.h2
                key={`title-${stage}`}
                initial={reduce ? false : { opacity: 0, transform: "translateY(16px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="mt-4 text-[clamp(2rem,3.25vw,3.7rem)] font-extrabold leading-[1.02] tracking-[-0.05em]"
              >
                {stageCopy[stage].title}
              </motion.h2>
              <motion.p
                key={`body-${stage}`}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.08 }}
                className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg"
              >
                {stageCopy[stage].body}
              </motion.p>
            </div>
          </div>

          <p className="absolute bottom-7 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground/60">
            Scroll to bring the system online
          </p>
        </div>
      </div>
    </section>
  );
}

function MobileSequence() {
  return (
    <div className="bg-[#fbfbfb] px-4 py-20">
      <div className="mx-auto max-w-lg">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          The Palmer House system
        </p>
        <h2 className="mt-4 text-4xl font-extrabold leading-[1.02] tracking-[-0.045em]">
          Bring every part of your content system online.
        </h2>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          We start with the bottleneck, assign the right Pal, and turn one production day into
          assets your business can keep using.
        </p>

        <div className="relative mt-12 space-y-4 before:absolute before:bottom-6 before:left-[23px] before:top-6 before:w-px before:bg-border">
          {lanes.map((lane, index) => (
            <motion.article
              key={lane.id}
              initial={{ opacity: 0, transform: "translateY(18px)" }}
              whileInView={{ opacity: 1, transform: "translateY(0px)" }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="relative ml-12 rounded-3xl border bg-white p-6 shadow-soft"
              style={{ borderColor: lane.color }}
            >
              <span
                className="absolute -left-[38px] top-6 grid size-7 place-items-center rounded-full border-4 border-[#fbfbfb] text-[10px] font-bold text-white"
                style={{ backgroundColor: lane.color }}
              >
                {index + 1}
              </span>
              <p
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: lane.color }}
              >
                {lane.label} Pal
              </p>
              <PalPair lane={lane} className="absolute right-4 top-4" />
              <h3 className="mt-2 text-xl font-bold">{lane.pals}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{lane.outcome}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-ink p-7 text-white">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
            System online
          </p>
          <p className="mt-3 text-2xl font-bold leading-tight">
            One shoot. A connected library that keeps working.
          </p>
        </div>
      </div>
    </div>
  );
}

function LaneCard({
  lane,
  progress,
  reduce,
}: {
  lane: Lane;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const fill = useTransform(progress, [lane.start, lane.end], [0, 1]);
  const opacity = useTransform(progress, [lane.start - 0.08, lane.end], [0.34, 1]);
  const y = useTransform(progress, [lane.start - 0.08, lane.end], [10, 0]);

  return (
    <motion.article
      className={`absolute z-10 w-[clamp(13rem,18vw,16.5rem)] rounded-3xl border bg-white p-5 shadow-soft ${lane.corner}`}
      style={{ borderColor: lane.color, opacity: reduce ? 1 : opacity, y: reduce ? 0 : y }}
    >
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: lane.color }}
        >
          {lane.label} Pal
        </span>
        <PalPair lane={lane} />
      </div>
      <h3 className="mt-3 text-base font-bold">{lane.pals}</h3>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{lane.outcome}</p>
      <div className="mt-4 h-1 overflow-hidden rounded-full" style={{ backgroundColor: lane.soft }}>
        <motion.div
          className="h-full origin-left rounded-full"
          style={{ backgroundColor: lane.color, scaleX: reduce ? 1 : fill }}
        />
      </div>
    </motion.article>
  );
}

function PalPair({ lane, className = "" }: { lane: Lane; className?: string }) {
  return (
    <span className={`flex -space-x-2 ${className}`} aria-hidden="true">
      {lane.images.map((src) => (
        <span
          key={src}
          className="grid size-8 place-items-end overflow-hidden rounded-full border-2 border-white"
          style={{ backgroundColor: lane.soft }}
        >
          <img src={src} alt="" className="h-9 w-auto max-w-none object-contain object-bottom" />
        </span>
      ))}
    </span>
  );
}

function SystemSwitch({ progress, reduce }: { progress: MotionValue<number>; reduce: boolean }) {
  const knobX = useTransform(progress, [0, 1], [0, 42]);
  const backgroundColor = useTransform(progress, [0, 1], ["#e6e6e7", "#0A9B8F"]);
  return (
    <div className="relative flex items-center gap-4">
      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        Plan
      </span>
      <motion.div
        className="flex h-10 w-20 items-center rounded-full p-1"
        style={{ backgroundColor: reduce ? "#0A9B8F" : backgroundColor }}
      >
        <motion.span
          className="size-8 rounded-full bg-white shadow-md"
          style={{ x: reduce ? 42 : knobX }}
        />
      </motion.div>
      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        Launch
      </span>
    </div>
  );
}

function RailField({ progress, reduce }: { progress: MotionValue<number>; reduce: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="none"
    >
      {lanes.map((lane) => (
        <Rail key={lane.id} lane={lane} progress={progress} reduce={reduce} />
      ))}
    </svg>
  );
}

function Rail({
  lane,
  progress,
  reduce,
}: {
  lane: Lane;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const pathLength = useTransform(progress, [lane.start, lane.end], [0, 1]);
  const opacity = useTransform(progress, [lane.start - 0.05, lane.end], [0.12, 0.9]);
  return (
    <>
      <path d={lane.rail} fill="none" stroke="#e9eaec" strokeWidth="1" />
      <motion.path
        d={lane.rail}
        fill="none"
        stroke={lane.color}
        strokeLinecap="round"
        strokeWidth="2"
        style={{ pathLength: reduce ? 1 : pathLength, opacity: reduce ? 0.9 : opacity }}
      />
    </>
  );
}
