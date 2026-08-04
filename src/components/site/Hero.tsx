import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import clara from "@/assets/pal-headshots/clara.png";
import kiana from "@/assets/pal-headshots/kiana.png";
import ryder from "@/assets/pal-headshots/ryder.png";
import samira from "@/assets/pal-headshots/samira.png";
import guidedLanes from "@/assets/studio-visuals/guided-lanes.png";

const intro = {
  hidden: { opacity: 0, transform: "translateY(26px)" },
  show: { opacity: 1, transform: "translateY(0px)" },
};

const palLanes = [
  {
    name: "Reel Pal",
    promise: "Get seen",
    color: "#E8720C",
    guide: ryder,
  },
  {
    name: "Spotlight Pal",
    promise: "Build trust",
    color: "#3D1A66",
    guide: kiana,
  },
  {
    name: "Evergreen Pal",
    promise: "Teach once",
    color: "#5B8A2D",
    guide: clara,
  },
  {
    name: "System Pal",
    promise: "Scale the know-how",
    color: "#0A9B8F",
    guide: samira,
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

        <motion.figure
          variants={intro}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mt-12 w-full max-w-6xl overflow-hidden rounded-[2.25rem] border border-border bg-white shadow-soft"
        >
          <motion.img
            src={guidedLanes}
            alt="A business owner choosing among four Palmer House video solution paths"
            className="w-full object-cover"
            animate={reduce ? undefined : { transform: ["scale(1)", "scale(1.018)", "scale(1)"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.figure>

        <motion.div
          variants={intro}
          className="mt-4 grid w-full max-w-6xl gap-2 sm:grid-cols-2 lg:grid-cols-4"
        >
          {palLanes.map((lane) => (
            <Link
              key={lane.name}
              to="/find-your-pal"
              className="group flex min-h-20 items-center gap-3 rounded-2xl border border-border bg-white px-4 text-left transition hover:-translate-y-1 hover:shadow-soft"
            >
              <img src={lane.guide} alt="" className="size-12 rounded-xl object-cover" />
              <span>
                <span
                  className="block font-mono text-[8px] font-semibold uppercase tracking-[.15em]"
                  style={{ color: lane.color }}
                >
                  {lane.name}
                </span>
                <span className="mt-1 block text-sm font-bold">{lane.promise}</span>
              </span>
              <ArrowRight className="ml-auto size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
