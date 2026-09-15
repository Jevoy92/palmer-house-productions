import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Pause, Play } from "lucide-react";
import { AnimatePresence, motion, useInView, usePageInView } from "motion/react";
import iconLibrary from "@/assets/hero/icon-library.webp";
import iconProduction from "@/assets/hero/icon-production.webp";
import iconPublish from "@/assets/hero/icon-publish.webp";
import iconStory from "@/assets/hero/icon-story.webp";
import slideEvergreen from "@/assets/hero/slide-evergreen.webp";
import slideReel from "@/assets/hero/slide-reel.webp";
import slideSpotlight from "@/assets/hero/slide-spotlight.webp";
import slideSystem from "@/assets/hero/slide-system.webp";
import { useHydratedReducedMotion } from "@/hooks/use-hydrated-reduced-motion";
import { laneVar } from "@/lib/pal-lanes";

const intro = {
  hidden: { opacity: 0, transform: "translateY(24px)" },
  show: { opacity: 1, transform: "translateY(0px)" },
};

const slides = [
  {
    id: "spotlight",
    phrase: "library",
    color: laneVar("spotlight"),
    accent: laneVar("reel"),
    accentText: "var(--paper)",
    image: slideSpotlight,
    alt: "Kareem and Kiana producing a polished brand film with cinema lighting and sound gear",
  },
  {
    id: "reel",
    phrase: "content",
    color: laneVar("reel"),
    accent: "var(--ink)",
    accentText: "var(--paper)",
    image: slideReel,
    alt: "Ryder and Raquel creating vertical social videos with a phone gimbal and ring light",
  },
  {
    id: "evergreen",
    phrase: "lessons",
    color: laneVar("evergreen"),
    accent: "var(--cream)",
    accentText: "var(--ink)",
    image: slideEvergreen,
    alt: "Clara and Cyrus recording a reusable lesson with a teaching board and camera",
  },
  {
    id: "system",
    phrase: "systems",
    color: laneVar("system"),
    accent: "var(--ink)",
    accentText: "var(--paper)",
    image: slideSystem,
    alt: "Silas and Samira organizing a reusable video workflow for training and onboarding",
  },
] as const;

const cards = [
  {
    title: "Strategy & Story",
    body: "Find the bottleneck. Plan the right video system.",
    to: "/spotlight-pal" as const,
    tone: "bg-spotlight-soft",
    arrow: "bg-spotlight",
    icon: iconStory,
    scene: "story",
  },
  {
    title: "Production Day",
    body: "One shoot. Useful cuts for every channel.",
    to: "/services/video-production" as const,
    tone: "bg-reel-soft",
    arrow: "bg-reel",
    icon: iconProduction,
    scene: "production",
  },
  {
    title: "Content Library",
    body: "A reusable library that keeps working.",
    to: "/evergreen-pal" as const,
    tone: "bg-evergreen-soft",
    arrow: "bg-evergreen",
    icon: iconLibrary,
    scene: "library",
  },
  {
    title: "Ready to Publish",
    body: "Edited, formatted, and ready to launch.",
    to: "/reel-pal" as const,
    tone: "bg-system-soft",
    arrow: "bg-system",
    icon: iconPublish,
    scene: "publish",
  },
] as const;

const word = {
  initial: { opacity: 0, transform: "translateY(18px)" },
  animate: { opacity: 1, transform: "translateY(0px)" },
  exit: { opacity: 0, transform: "translateY(-18px)" },
};

type CardSceneProps = {
  icon: string;
  kind: (typeof cards)[number]["scene"];
  active: boolean;
};

const sceneImage = {
  rest: { x: 0, y: 0, rotate: 0, scale: 1 },
  hover: { x: -3, y: -3, rotate: -1.5, scale: 1.045 },
};

function CardScene({ icon, kind, active }: CardSceneProps) {
  const image = (
    <motion.img
      src={icon}
      alt=""
      variants={sceneImage}
      transition={{ type: "spring", bounce: 0.18, duration: 0.45 }}
      className="pointer-events-none absolute bottom-1 right-1 z-20 h-[72%] w-[78%] object-contain object-bottom-right"
    />
  );

  if (kind === "story") {
    return (
      <div className="pointer-events-none absolute inset-y-3 right-3 w-[43%] overflow-hidden rounded-[1.2rem] border border-white/60 bg-white/25">
        <motion.div
          variants={{
            rest: { x: 12, opacity: 0.45 },
            hover: { x: 0, opacity: 0.9 },
          }}
          transition={{ type: "spring", bounce: 0.12, duration: 0.42 }}
          className="absolute right-3 top-3 h-8 w-[72%] rounded-lg border border-white/80 bg-white/55 p-2 shadow-sm"
        >
          <span className="block h-1 w-8 rounded-full bg-spotlight/25" />
          <span className="mt-1 block h-1 w-12 rounded-full bg-spotlight/15" />
        </motion.div>
        <motion.div
          className="absolute right-5 top-[3.1rem] h-1 w-[48%] origin-left rounded-full bg-spotlight/25"
          animate={
            active
              ? {
                  scaleX: [0.15, 1, 1, 0.15],
                  opacity: [0.25, 0.8, 0.8, 0.25],
                }
              : { scaleX: 1, opacity: 0.4 }
          }
          transition={
            active
              ? { duration: 3.8, repeat: Infinity, times: [0, 0.35, 0.72, 1] }
              : { duration: 0 }
          }
        />
        <motion.span
          className="absolute right-4 top-[3.85rem] size-2 rounded-full bg-spotlight"
          animate={
            active
              ? { scale: [0.7, 1.2, 0.7], opacity: [0.45, 1, 0.45] }
              : { scale: 1, opacity: 0.6 }
          }
          transition={
            active ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }
          }
        />
        {image}
      </div>
    );
  }

  if (kind === "production") {
    return (
      <div className="pointer-events-none absolute inset-y-3 right-3 w-[43%] overflow-hidden rounded-[1.2rem] border border-white/60 bg-white/25">
        <div className="absolute right-3 top-3 z-30 flex items-center gap-1.5 rounded-full bg-white/70 px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-reel">
          <motion.span
            className="size-1.5 rounded-full bg-reel"
            animate={
              active ? { opacity: [1, 0.25, 1], scale: [1, 0.75, 1] } : { opacity: 1, scale: 1 }
            }
            transition={
              active ? { duration: 1.25, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }
            }
          />
          Rec
        </div>
        <motion.div
          className="absolute bottom-3 left-3 right-3 z-30 h-1 overflow-hidden rounded-full bg-white/55"
          variants={{
            rest: { opacity: 0.65 },
            hover: { opacity: 1 },
          }}
        >
          <motion.span
            className="block h-full origin-left rounded-full bg-reel"
            animate={active ? { scaleX: [0.18, 1, 0.18] } : { scaleX: 0.6 }}
            transition={
              active ? { duration: 4.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }
            }
          />
        </motion.div>
        <motion.div
          className="absolute -top-5 z-10 h-[130%] w-3 rotate-[18deg] bg-white/60 blur-sm"
          animate={
            active
              ? {
                  transform: ["translateX(-28px)", "translateX(170px)"],
                  opacity: [0, 0.7, 0],
                }
              : { transform: "translateX(-28px)", opacity: 0 }
          }
          transition={
            active
              ? { duration: 1.1, repeat: Infinity, repeatDelay: 3.6, ease: "easeInOut" }
              : { duration: 0 }
          }
        />
        {image}
      </div>
    );
  }

  if (kind === "library") {
    return (
      <div className="pointer-events-none absolute inset-y-3 right-3 w-[43%] overflow-hidden rounded-[1.2rem] border border-white/60 bg-white/25">
        {[
          { className: "right-11 top-5 bg-evergreen/15", x: -16, rotate: -12 },
          { className: "right-7 top-4 bg-white/70", x: -7, rotate: -5 },
          { className: "right-3 top-5 bg-system/15", x: 0, rotate: 6 },
        ].map((item) => (
          <motion.div
            key={item.className}
            className={`absolute h-14 w-10 rounded-xl border border-white/80 shadow-sm ${item.className}`}
            variants={{
              rest: { x: 0, y: 8, rotate: 0, opacity: 0.55 },
              hover: { x: item.x, y: 0, rotate: item.rotate, opacity: 1 },
            }}
            transition={{ type: "spring", bounce: 0.16, duration: 0.5 }}
          >
            <span className="mx-auto mt-3 block size-3 rounded-full bg-evergreen/35" />
            <span className="mx-auto mt-2 block h-1 w-5 rounded-full bg-evergreen/20" />
          </motion.div>
        ))}
        <motion.div
          className="absolute bottom-3 left-4 z-30 flex gap-1"
          variants={{ rest: { opacity: 0.4 }, hover: { opacity: 1 } }}
        >
          {[0, 1, 2, 3].map((step) => (
            <motion.span
              key={step}
              className="h-1 w-3 rounded-full bg-evergreen"
              animate={active ? { opacity: [0.25, 1, 0.25] } : { opacity: 0.5 }}
              transition={
                active ? { duration: 1.8, repeat: Infinity, delay: step * 0.18 } : { duration: 0 }
              }
            />
          ))}
        </motion.div>
        {image}
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-y-3 right-3 w-[43%] overflow-hidden rounded-[1.2rem] border border-white/60 bg-white/25">
      <motion.div
        className="absolute right-[14%] top-[15%] size-[72%] rounded-full border border-system/25"
        animate={active ? { transform: "rotate(360deg)" } : { transform: "rotate(0deg)" }}
        transition={active ? { duration: 8, repeat: Infinity, ease: "linear" } : { duration: 0 }}
      >
        <span className="absolute -right-1 top-1/2 size-2 rounded-full bg-system shadow-sm" />
        <span className="absolute left-1/2 top-0 size-1.5 rounded-full bg-spotlight shadow-sm" />
        <span className="absolute bottom-1 left-2 size-1.5 rounded-full bg-reel shadow-sm" />
      </motion.div>
      <motion.div
        className="absolute bottom-4 right-[27%] h-3 w-8 rounded-full bg-reel/35 blur-[3px]"
        animate={
          active
            ? { scaleX: [0.65, 1.15, 0.65], opacity: [0.35, 0.85, 0.35] }
            : { scaleX: 1, opacity: 0.5 }
        }
        transition={
          active ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }
        }
      />
      {image}
    </div>
  );
}

export function Hero() {
  const reduce = useHydratedReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "240px 0px" });
  const isPageInView = usePageInView();
  const active = !reduce && isInView && isPageInView;
  const [allowAmbientMotion, setAllowAmbientMotion] = useState(false);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const slide = slides[index];
  const rotating = active && !paused && !hovering;

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const sync = () => setAllowAmbientMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [rotating]);

  useEffect(() => {
    const next = new Image();
    next.src = slides[(index + 1) % slides.length].image;
  }, [index]);

  return (
    <section ref={sectionRef} id="top" className="px-4 pb-2 pt-6 sm:px-6 sm:pt-8">
      <motion.div
        initial={reduce ? false : "hidden"}
        animate="show"
        transition={{ staggerChildren: 0.08 }}
        className="mx-auto max-w-7xl"
      >
        <motion.div
          variants={intro}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2.25rem] text-white sm:rounded-[2.75rem]"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovering(false);
          }}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={slide.id}
              className="absolute inset-0"
              style={{ backgroundColor: slide.color }}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.55, ease: "easeInOut" }}
              aria-hidden
            />
          </AnimatePresence>

          <div className="relative grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:items-end">
            <div className="relative z-20 flex flex-col justify-center px-7 py-10 sm:px-12 lg:px-16 lg:py-16">
              <h1 className="max-w-[13ch] text-[clamp(2.25rem,11vw,3.15rem)] font-extrabold leading-[0.92] tracking-[-0.06em] sm:max-w-[14ch] sm:text-[clamp(2.75rem,6.2vw,5.6rem)]">
                <span className="sr-only">
                  Build your video library, content, lessons, and systems, one shoot at a time.
                </span>
                <span aria-hidden>
                  Build your video{" "}
                  <span className="relative inline-grid overflow-hidden align-baseline sm:min-w-[7.9ch]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={slide.phrase}
                        variants={word}
                        initial={reduce ? false : "initial"}
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="col-start-1 row-start-1 inline-block"
                        style={{ color: slide.accent }}
                      >
                        {slide.phrase},
                      </motion.span>
                    </AnimatePresence>
                  </span>{" "}
                  one shoot at a time.
                </span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
                We don&apos;t just make videos; we solve business problems with them.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold shadow-glow transition-transform hover:scale-[1.03]"
                  style={{ backgroundColor: slide.accent, color: slide.accentText }}
                >
                  Book a Discovery Call <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/meet-the-pals"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
                >
                  <Play className="size-3.5 fill-current" /> Explore the Pals
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-2" role="group" aria-label="Hero slides">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setIndex(i);
                      setPaused(true);
                    }}
                    aria-label={`Show slide ${i + 1}: video ${s.phrase}`}
                    aria-current={i === index ? "true" : undefined}
                    className="grid size-11 place-items-center rounded-full"
                  >
                    <span
                      aria-hidden
                      className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none ${
                        i === index ? "w-7 bg-white" : "w-1.5 bg-white/45"
                      }`}
                    />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-pressed={paused}
                  aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                  className="ml-1 grid size-11 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/15 motion-reduce:transition-none"
                >
                  {paused ? (
                    <Play className="size-3.5 fill-current" />
                  ) : (
                    <Pause className="size-3.5 fill-current" />
                  )}
                </button>
              </div>
            </div>

            <div className="relative aspect-[3/2] w-full self-end">
              <div className="absolute inset-0 origin-bottom scale-[1.08] sm:scale-[1.12] lg:scale-[1.18]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={slide.id}
                    src={slide.image}
                    alt={slide.alt}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 size-full object-contain object-bottom"
                    initial={reduce ? false : { opacity: 0, transform: "translateY(24px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    exit={reduce ? undefined : { opacity: 0, transform: "translateY(-16px)" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
          }}
          className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={intro}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <motion.div initial="rest" animate="rest" whileHover={reduce ? undefined : "hover"}>
                <Link
                  to={card.to}
                  className={`group relative flex min-h-[11.5rem] overflow-hidden rounded-[1.6rem] p-5 sm:min-h-[11rem] lg:min-h-[10.5rem] ${card.tone}`}
                >
                  <div className="relative z-10 flex w-[57%] flex-col pr-3">
                    <h2 className="text-[1.15rem] font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-[1.25rem] lg:text-[1.15rem] xl:text-[1.2rem]">
                      {card.title}
                    </h2>
                    <p className="mt-2 text-sm leading-[1.4] text-ink/70">{card.body}</p>
                    <span
                      className={`mt-auto grid size-9 place-items-center rounded-full text-white transition duration-300 group-hover:scale-105 group-hover:bg-ink ${card.arrow}`}
                    >
                      <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                  <CardScene
                    icon={card.icon}
                    kind={card.scene}
                    active={active && allowAmbientMotion}
                  />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
