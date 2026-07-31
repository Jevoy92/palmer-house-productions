import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import reelScene from "@/assets/dioramas/reel-factory-web.jpg";
import spotlightScene from "@/assets/dioramas/spotlight-stage-web.jpg";
import evergreenScene from "@/assets/dioramas/evergreen-garden-web.jpg";
import systemScene from "@/assets/dioramas/system-brain-web.jpg";
import ryder from "@/assets/pals-optimized/ryder.webp";
import raquel from "@/assets/pals-optimized/raquel.webp";
import kareem from "@/assets/pals-optimized/kareem.webp";
import kiana from "@/assets/pals-optimized/kiana.webp";
import cyrus from "@/assets/pals-optimized/cyrus.webp";
import clara from "@/assets/pals-optimized/clara.webp";
import silas from "@/assets/pals-optimized/silas.webp";
import samira from "@/assets/pals-optimized/samira.webp";

const intro = {
  hidden: { opacity: 0, transform: "translateY(26px)" },
  show: { opacity: 1, transform: "translateY(0px)" },
};

const palLanes = [
  {
    name: "Reel Pal",
    promise: "Get seen",
    color: "#E8720C",
    scene: reelScene,
    pals: [ryder, raquel],
  },
  {
    name: "Spotlight Pal",
    promise: "Build trust",
    color: "#3D1A66",
    scene: spotlightScene,
    pals: [kareem, kiana],
  },
  {
    name: "Evergreen Pal",
    promise: "Teach once",
    color: "#5B8A2D",
    scene: evergreenScene,
    pals: [cyrus, clara],
  },
  {
    name: "System Pal",
    promise: "Scale the know-how",
    color: "#0A9B8F",
    scene: systemScene,
    pals: [silas, samira],
  },
] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-20 pt-20 sm:pb-24 sm:pt-28 lg:min-h-svh"
    >
      <motion.div
        initial={reduce ? false : "hidden"}
        animate="show"
        transition={{ staggerChildren: 0.09 }}
        className="mx-auto flex max-w-6xl flex-col items-center text-center"
      >
        <motion.div variants={intro} transition={{ duration: 0.6, ease: "easeOut" }}>
          <span className="inline-flex rounded-full border border-spotlight/30 bg-white px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-spotlight shadow-soft">
            Strategic video content production
          </span>
        </motion.div>

        <motion.h1
          variants={intro}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-7 max-w-5xl text-[clamp(3.2rem,8.5vw,8.3rem)] font-extrabold leading-[0.88] tracking-[-0.07em]"
        >
          Build your video library, one shoot at a time.
        </motion.h1>

        <motion.p
          variants={intro}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          We don&apos;t just make videos; we solve business problems with them. One production day
          delivers weeks of useful content across social, web, sales, and training.
        </motion.p>

        <motion.div
          variants={intro}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-9 flex flex-wrap justify-center gap-3"
        >
          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-spotlight px-7 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
          >
            Book a Discovery Call <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/pals"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border bg-white px-7 py-3 text-sm font-semibold shadow-soft transition-colors hover:bg-secondary"
          >
            <Play className="size-3.5 fill-current" /> Explore the Pals
          </Link>
        </motion.div>

        <motion.div
          variants={intro}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-evergreen-soft font-mono text-[10px] font-bold text-evergreen">
              PNW
            </span>
            <span className="text-sm">
              <strong className="block font-semibold">
                Proudly based in the Pacific Northwest
              </strong>
              <span className="text-muted-foreground">Seattle · Bellevue · Tacoma · Portland</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-reel-soft text-lg">
              🎬
            </span>
            <span className="text-sm">
              <strong className="block font-semibold">Maximum output, minimal effort</strong>
              <span className="text-muted-foreground">One shoot · Every useful format</span>
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={intro}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-12 grid w-full max-w-6xl grid-cols-2 gap-2 rounded-[2rem] border border-border bg-mist p-2 shadow-soft lg:grid-cols-4"
        >
          {palLanes.map((lane, index) => (
            <motion.figure
              key={lane.name}
              className="group relative min-h-56 overflow-hidden rounded-[1.5rem] border bg-white sm:min-h-72"
              style={{ borderColor: lane.color }}
              animate={
                reduce
                  ? undefined
                  : { transform: ["translateY(0px)", "translateY(-7px)", "translateY(0px)"] }
              }
              transition={{ duration: 5.5 + index * 0.65, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={lane.scene}
                alt=""
                className="absolute inset-0 size-full object-cover opacity-55 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-3 top-3 z-10 rounded-2xl bg-white/90 px-3 py-2 text-left backdrop-blur-sm">
                <figcaption
                  className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: lane.color }}
                >
                  {lane.name}
                </figcaption>
                <p className="mt-0.5 text-xs font-bold sm:text-sm">{lane.promise}</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex h-[76%] items-end justify-center">
                {lane.pals.map((pal) => (
                  <img
                    key={pal}
                    src={pal}
                    alt=""
                    className="-mx-2 h-[78%] w-auto object-contain object-bottom drop-shadow-md transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105"
                  />
                ))}
              </div>
            </motion.figure>
          ))}
        </motion.div>

        <motion.p variants={intro} className="mt-2 text-sm text-muted-foreground">
          Eight Pals. Four lanes. One connected system built around the problem you need to solve.
        </motion.p>
      </motion.div>
    </section>
  );
}
