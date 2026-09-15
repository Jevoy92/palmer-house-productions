import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, CirclePlay, FileText, Video } from "lucide-react";
import { motion, useInView } from "motion/react";
import {
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/components/studio/PlatformIcons";
import samira from "@/assets/pals-optimized/samira.webp";
import silas from "@/assets/pals-optimized/silas.webp";
import { useHydratedReducedMotion } from "@/hooks/use-hydrated-reduced-motion";

type OutputKind = "social" | "website" | "sales" | "training";

/** Third-party platform colours — intentionally off-palette, kept for brand recognition. */
const PLATFORM_BRAND = {
  instagram: "#D62976",
  tiktok: "#111111",
  youtube: "#FF0033",
} as const;

const outputs = [
  { kind: "social", label: "Social reels", detail: "Vertical cuts for the feed" },
  { kind: "website", label: "Website video", detail: "Proof where buyers decide" },
  { kind: "sales", label: "Sales follow-up", detail: "Useful assets for the next step" },
  { kind: "training", label: "Training library", detail: "Repeatable lessons for the team" },
] as const satisfies ReadonlyArray<{ kind: OutputKind; label: string; detail: string }>;

function SocialVisual({ active }: { active: boolean }) {
  const frames = [
    { x: 0, y: 0, rotate: -5, shape: "circle" },
    { x: 30, y: -4, rotate: 0, shape: "wave" },
    { x: 60, y: 1, rotate: 5, shape: "bars" },
  ];

  return (
    <div className="relative h-24">
      <div className="absolute left-1 top-1 h-20 w-28">
        {frames.map((frame, index) => (
          <motion.div
            key={frame.shape}
            animate={
              active
                ? {
                    transform: [
                      `translate3d(${frame.x}px, ${frame.y}px, 0) rotate(${frame.rotate}deg)`,
                      `translate3d(${frame.x}px, ${frame.y - 6}px, 0) rotate(${frame.rotate}deg)`,
                      `translate3d(${frame.x}px, ${frame.y}px, 0) rotate(${frame.rotate}deg)`,
                    ],
                  }
                : {
                    transform: `translate3d(${frame.x}px, ${frame.y}px, 0) rotate(${frame.rotate}deg)`,
                  }
            }
            transition={
              active
                ? {
                    duration: 2.6,
                    repeat: Infinity,
                    repeatDelay: 1.4,
                    delay: index * 0.12,
                    times: [0, 0.18, 1],
                    ease: "easeInOut",
                  }
                : { duration: 0 }
            }
            className="absolute left-0 top-0 h-20 w-12 overflow-hidden rounded-lg border-2 border-white bg-white shadow-sm"
          >
            <div className="relative size-full overflow-hidden bg-system-soft">
              {frame.shape === "circle" && (
                <>
                  <motion.span
                    animate={
                      active ? { transform: ["scale(0.8)", "scale(1.08)", "scale(0.8)"] } : {}
                    }
                    transition={
                      active ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" } : {}
                    }
                    className="absolute left-2 top-2 size-7 rounded-full border-[5px] border-system/55"
                  />
                  <span className="absolute bottom-3 left-2 h-1.5 w-7 rounded-full bg-ink" />
                  <span className="absolute bottom-1.5 left-2 h-1 w-5 rounded-full bg-system" />
                </>
              )}
              {frame.shape === "wave" && (
                <>
                  <motion.svg
                    viewBox="0 0 48 80"
                    className="absolute inset-0 size-full text-system"
                    aria-hidden
                  >
                    <motion.path
                      d="M4 46 C12 18 18 65 25 37 S38 18 44 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      animate={
                        active
                          ? { pathLength: [0.15, 1, 1], opacity: [0.4, 1, 1] }
                          : { pathLength: 1, opacity: 1 }
                      }
                      transition={
                        active
                          ? {
                              duration: 2.6,
                              repeat: Infinity,
                              repeatDelay: 0.8,
                              times: [0, 0.58, 1],
                            }
                          : { duration: 0 }
                      }
                    />
                  </motion.svg>
                  <span className="absolute bottom-2 left-2 h-1 w-7 rounded-full bg-ink" />
                </>
              )}
              {frame.shape === "bars" && (
                <div className="absolute inset-x-2 bottom-2 top-3 flex items-end gap-1">
                  {[48, 76, 58, 90].map((height, barIndex) => (
                    <motion.span
                      key={height}
                      style={{ height: `${height}%` }}
                      animate={
                        active
                          ? { transform: ["scaleY(0.45)", "scaleY(1)", "scaleY(0.45)"] }
                          : { transform: "scaleY(1)" }
                      }
                      transition={
                        active
                          ? {
                              duration: 1.6,
                              repeat: Infinity,
                              delay: barIndex * 0.12,
                              ease: "easeInOut",
                            }
                          : { duration: 0 }
                      }
                      className="w-1.5 origin-bottom rounded-full bg-system"
                    />
                  ))}
                </div>
              )}
              <span className="absolute right-1 top-1 grid size-3 place-items-center rounded-full bg-white text-[5px] font-black text-system">
                ▶
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="absolute bottom-1 right-1 flex items-center gap-1.5">
        <span
          className="grid size-6 place-items-center rounded-full bg-white shadow-sm"
          style={{ color: PLATFORM_BRAND.instagram }}
        >
          <InstagramIcon className="size-3.5" />
        </span>
        <span
          className="grid size-6 place-items-center rounded-full bg-white shadow-sm"
          style={{ color: PLATFORM_BRAND.tiktok }}
        >
          <TikTokIcon className="size-3.5" />
        </span>
        <span
          className="grid size-6 place-items-center rounded-full bg-white shadow-sm"
          style={{ color: PLATFORM_BRAND.youtube }}
        >
          <YouTubeIcon className="size-3.5" />
        </span>
      </div>
    </div>
  );
}

function WebsiteVisual({ active }: { active: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <div className="flex h-5 items-center gap-1 border-b border-border px-2">
        <span className="size-1.5 rounded-full bg-border" />
        <span className="size-1.5 rounded-full bg-border" />
        <span className="size-1.5 rounded-full bg-border" />
        <span className="ml-2 h-1.5 w-12 rounded-full bg-mist" />
      </div>
      <div className="grid grid-cols-[1.3fr_0.7fr] gap-2 p-2">
        <div className="relative h-16 overflow-hidden rounded-lg bg-system-soft">
          <motion.svg viewBox="0 0 100 64" className="absolute inset-0 size-full" aria-hidden>
            <motion.circle
              cx="30"
              cy="31"
              r="18"
              fill="none"
              stroke="var(--color-system)"
              strokeWidth="6"
              className="origin-center [transform-box:fill-box]"
              animate={active ? { scale: [0.78, 1.06, 0.78] } : { scale: 1 }}
              transition={
                active ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }
              }
            />
            <motion.path
              d="M56 18 H90 M56 31 H82 M56 44 H72"
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth="5"
              strokeLinecap="round"
              animate={active ? { pathLength: [0, 1, 1] } : { pathLength: 1 }}
              transition={
                active
                  ? { duration: 2.8, repeat: Infinity, repeatDelay: 1, times: [0, 0.55, 1] }
                  : { duration: 0 }
              }
            />
          </motion.svg>
          <motion.span
            animate={
              active
                ? {
                    transform: [
                      "translate(-50%, -50%) scale(1)",
                      "translate(-50%, -50%) scale(1.14)",
                      "translate(-50%, -50%) scale(1)",
                    ],
                  }
                : { transform: "translate(-50%, -50%) scale(1)" }
            }
            transition={
              active
                ? { duration: 1.8, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }
                : { duration: 0 }
            }
            className="absolute left-1/2 top-1/2 grid size-7 place-items-center rounded-full bg-white/95 text-system shadow-sm"
          >
            <CirclePlay className="size-4" />
          </motion.span>
        </div>
        <div className="space-y-2 pt-1">
          <span className="block h-2 w-full rounded-full bg-ink" />
          <span className="block h-1.5 w-4/5 rounded-full bg-border" />
          <span className="block h-1.5 w-full rounded-full bg-border" />
          <span className="block h-4 w-14 rounded-full bg-system" />
        </div>
      </div>
    </div>
  );
}

function SalesVisual({ active }: { active: boolean }) {
  return (
    <div className="grid h-24 grid-cols-[0.78fr_1.22fr] gap-2 rounded-xl border border-border bg-white p-2 shadow-sm">
      <div className="relative overflow-hidden rounded-lg bg-system-soft">
        <motion.svg viewBox="0 0 72 84" className="absolute inset-0 size-full" aria-hidden>
          <rect x="13" y="12" width="46" height="58" rx="8" fill="white" />
          <motion.path
            d="M22 30 H50 M22 40 H44 M22 50 H48"
            fill="none"
            stroke="var(--color-system)"
            strokeWidth="4"
            strokeLinecap="round"
            animate={active ? { pathLength: [0, 1, 1] } : { pathLength: 1 }}
            transition={
              active
                ? { duration: 2.4, repeat: Infinity, repeatDelay: 1, times: [0, 0.55, 1] }
                : { duration: 0 }
            }
          />
          <motion.circle
            cx="50"
            cy="62"
            r="9"
            fill="var(--color-system)"
            animate={active ? { scale: [0.75, 1.1, 1] } : { scale: 1 }}
            transition={
              active
                ? { duration: 1.8, repeat: Infinity, repeatDelay: 1.5, ease: "easeOut" }
                : { duration: 0 }
            }
          />
          <path d="m46 62 3 3 6-7" fill="none" stroke="white" strokeWidth="2.5" />
        </motion.svg>
        <span className="absolute bottom-1 left-1 rounded-full bg-white/95 px-1.5 py-1 font-mono text-[5px] font-bold uppercase tracking-[0.12em] text-ink">
          Video proof
        </span>
      </div>
      <div className="flex min-w-0 flex-col">
        <div className="flex items-center gap-1.5 text-[7px] font-bold text-ink">
          <FileText className="size-3 text-system" />
          Follow-up ready
        </div>
        <span className="mt-2 block h-1.5 w-full rounded-full bg-border" />
        <span className="mt-1.5 block h-1.5 w-3/4 rounded-full bg-border" />
        <div className="mt-auto h-1.5 overflow-hidden rounded-full bg-system-soft">
          <motion.span
            animate={
              active
                ? { transform: ["scaleX(0.18)", "scaleX(1)", "scaleX(1)"] }
                : { transform: "scaleX(1)" }
            }
            transition={
              active
                ? {
                    duration: 3.2,
                    repeat: Infinity,
                    repeatDelay: 1.1,
                    times: [0, 0.55, 1],
                    ease: "easeInOut",
                  }
                : { duration: 0 }
            }
            className="block size-full origin-left bg-system"
          />
        </div>
        <div className="mt-2 flex items-center gap-1 text-[6px] font-semibold uppercase tracking-[0.08em] text-system">
          <LinkedInIcon className="size-2.5" /> Ready to send
        </div>
      </div>
    </div>
  );
}

function TrainingVisual({ active }: { active: boolean }) {
  return (
    <div className="grid h-24 grid-cols-[1.15fr_0.85fr] gap-2 rounded-xl border border-border bg-white p-2 shadow-sm">
      <div className="relative overflow-hidden rounded-lg bg-system-soft">
        <motion.svg viewBox="0 0 100 76" className="absolute inset-0 size-full" aria-hidden>
          <rect x="10" y="12" width="80" height="50" rx="8" fill="white" />
          <motion.path
            d="M20 50 34 36 45 43 62 25 80 38"
            fill="none"
            stroke="var(--color-system)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={active ? { pathLength: [0, 1, 1] } : { pathLength: 1 }}
            transition={
              active
                ? { duration: 2.7, repeat: Infinity, repeatDelay: 1.1, times: [0, 0.56, 1] }
                : { duration: 0 }
            }
          />
          <motion.circle
            cx="62"
            cy="25"
            r="6"
            fill="var(--color-ink)"
            animate={active ? { scale: [0.6, 1.15, 1] } : { scale: 1 }}
            transition={
              active
                ? { duration: 2.7, repeat: Infinity, repeatDelay: 1.1, times: [0.45, 0.65, 1] }
                : { duration: 0 }
            }
          />
        </motion.svg>
        <span className="absolute left-1 top-1 rounded-full bg-white/95 px-1.5 py-1 font-mono text-[5px] font-bold uppercase tracking-[0.12em] text-ink">
          Lesson 03
        </span>
      </div>
      <div className="space-y-1.5 pt-1">
        {["Welcome", "Process", "Handoff"].map((label, index) => (
          <div key={label} className="flex items-center gap-1.5">
            <motion.span
              animate={
                active
                  ? { transform: ["scale(0.65)", "scale(1)", "scale(1)"], opacity: [0.25, 1, 1] }
                  : { transform: "scale(1)", opacity: 1 }
              }
              transition={
                active
                  ? {
                      duration: 2.8,
                      repeat: Infinity,
                      repeatDelay: 1.2,
                      delay: index * 0.22,
                      times: [0, 0.24, 1],
                    }
                  : { duration: 0 }
              }
              className="grid size-3.5 shrink-0 place-items-center rounded-full bg-system text-white"
            >
              <Check className="size-2" strokeWidth={3} />
            </motion.span>
            <span className="truncate text-[6px] font-semibold text-ink">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OutputVisual({ kind, active }: { kind: OutputKind; active: boolean }) {
  if (kind === "social") return <SocialVisual active={active} />;
  if (kind === "website") return <WebsiteVisual active={active} />;
  if (kind === "sales") return <SalesVisual active={active} />;
  return <TrainingVisual active={active} />;
}

function OutputCard({
  item,
  index,
  reduce,
  active,
}: {
  item: (typeof outputs)[number];
  index: number;
  reduce: boolean;
  active: boolean;
}) {
  return (
    <motion.article
      initial={false}
      animate={{
        opacity: 1,
        transform: "perspective(800px) translate3d(0, 0px, 0) rotateX(0deg) scale(1)",
      }}
      transition={{
        duration: reduce ? 0 : 0.55,
        delay: reduce ? 0 : 0.18 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative min-h-[11.5rem] overflow-hidden rounded-[1.35rem] border border-border bg-mist p-3 sm:min-h-[12.5rem] sm:p-4"
    >
      <OutputVisual kind={item.kind} active={active} />
      <p className="mt-3 text-base font-extrabold leading-none tracking-[-0.035em] text-ink">
        {item.label}
      </p>
      <p className="mt-1 text-[11px] font-medium text-muted-foreground">{item.detail}</p>
    </motion.article>
  );
}

function MasterFootage({ active, reduce }: { active: boolean; reduce: boolean }) {
  return (
    <div className="relative z-10 flex min-h-64 flex-col overflow-hidden rounded-[1.6rem] border border-border bg-cream p-4 sm:min-h-72 sm:p-5 lg:h-[25rem] lg:min-h-0">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Shoot 01 · Master footage
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-1 font-mono text-[7px] font-bold uppercase tracking-[0.12em] text-ink">
          <motion.span
            animate={active ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
            transition={active ? { duration: 1.1, repeat: Infinity } : { duration: 0 }}
            className="size-1.5 rounded-full bg-system"
          />
          Recording
        </span>
      </div>

      <div className="mt-3 grid min-h-0 flex-1 grid-cols-[1.35fr_0.65fr] gap-2">
        <div className="relative min-h-0 overflow-hidden rounded-xl bg-system-soft">
          <motion.svg viewBox="0 0 280 240" className="absolute inset-0 size-full" aria-hidden>
            <rect x="18" y="18" width="244" height="204" rx="22" fill="white" />
            <motion.circle
              cx="140"
              cy="110"
              r="68"
              fill="none"
              stroke="var(--color-system)"
              strokeWidth="14"
              opacity="0.18"
              className="origin-center [transform-box:fill-box]"
              animate={active ? { scale: [0.85, 1.06, 0.85] } : { scale: 1 }}
              transition={
                active ? { duration: 3.6, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }
              }
            />
            <circle cx="140" cy="88" r="28" fill="var(--color-system)" />
            <path d="M86 181c8-38 28-59 54-59s46 21 54 59" fill="var(--color-ink)" />
            <motion.path
              d="M42 58V40h18 M238 40h18v18 M42 182v18h18 M256 182v18h-18"
              fill="none"
              stroke="var(--color-system)"
              strokeWidth="6"
              strokeLinecap="round"
              animate={{ pathLength: 1 }}
              transition={{ duration: 0 }}
            />
            <motion.path
              d="M104 205c14-9 26 9 39 0s25 9 38 0 25 8 38 0"
              fill="none"
              stroke="var(--color-system)"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{ pathLength: 1 }}
              transition={{ duration: 0 }}
            />
          </motion.svg>
          <motion.span
            animate={
              active
                ? {
                    transform: [
                      "translate3d(0, 0, 0)",
                      "translate3d(0, -5px, 0)",
                      "translate3d(0, 0, 0)",
                    ],
                  }
                : { transform: "translate3d(0, 0, 0)" }
            }
            transition={
              active
                ? { duration: 2.4, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }
                : { duration: 0 }
            }
            className="absolute right-3 top-3 rounded-full bg-white px-2 py-1 font-mono text-[6px] font-bold uppercase tracking-[0.12em] text-system shadow-sm"
          >
            Subject locked
          </motion.span>
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2 py-1 text-[7px] font-bold text-ink shadow-sm">
            <Video className="size-2.5 text-system" /> Primary take
          </span>
        </div>
        <div className="grid min-h-0 grid-rows-2 gap-2 overflow-hidden">
          <div className="relative overflow-hidden rounded-xl bg-white">
            <span className="absolute left-3 top-3 font-mono text-[6px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Story beats
            </span>
            {[0, 1, 2].map((index) => (
              <motion.span
                key={index}
                animate={
                  active && index === 0
                    ? {
                        transform: [
                          `translate3d(${index * 7}px, ${index * 10}px, 0) rotate(${index * 2 - 2}deg)`,
                          `translate3d(${index * 7 + 4}px, ${index * 10 - 5}px, 0) rotate(${index * 2}deg)`,
                          `translate3d(${index * 7}px, ${index * 10}px, 0) rotate(${index * 2 - 2}deg)`,
                        ],
                      }
                    : {
                        transform: `translate3d(${index * 7}px, ${index * 10}px, 0) rotate(${index * 2 - 2}deg)`,
                      }
                }
                transition={
                  active && index === 0
                    ? {
                        duration: 2.8,
                        repeat: Infinity,
                        repeatDelay: 1,
                        delay: index * 0.14,
                        ease: "easeInOut",
                      }
                    : { duration: 0 }
                }
                className="absolute bottom-5 left-4 h-14 w-20 rounded-lg border border-border bg-system-soft p-2 shadow-sm"
              >
                <span className="block h-1.5 w-8 rounded-full bg-system" />
                <span className="mt-2 block h-1 w-full rounded-full bg-border" />
                <span className="mt-1 block h-1 w-3/4 rounded-full bg-border" />
              </motion.span>
            ))}
          </div>
          <div className="relative overflow-hidden rounded-xl bg-system-soft">
            <span className="absolute left-3 top-3 font-mono text-[6px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Clean audio
            </span>
            <div className="absolute inset-x-3 bottom-4 top-8 flex items-center justify-center gap-1">
              {[34, 66, 92, 54, 80, 44, 70].map((height, index) => (
                <motion.span
                  key={`${height}-${index}`}
                  style={{ height: `${height}%` }}
                  animate={
                    active && index === 0
                      ? { transform: ["scaleY(0.35)", "scaleY(1)", "scaleY(0.35)"] }
                      : { transform: "scaleY(1)" }
                  }
                  transition={
                    active && index === 0
                      ? {
                          duration: 1.3,
                          repeat: Infinity,
                          delay: index * 0.09,
                          ease: "easeInOut",
                        }
                      : { duration: 0 }
                  }
                  className="w-1.5 origin-center rounded-full bg-system"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-10 rounded-full bg-system" />
          <span className="h-1.5 w-16 rounded-full bg-border" />
          <span className="h-1.5 w-8 rounded-full bg-border" />
          <span className="h-1.5 flex-1 rounded-full bg-border" />
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white">
          <motion.span
            initial={false}
            animate={
              reduce
                ? { transform: "scaleX(1)" }
                : active
                  ? { transform: ["scaleX(0.12)", "scaleX(1)", "scaleX(1)"] }
                  : { transform: "scaleX(0.12)" }
            }
            transition={
              active && !reduce
                ? {
                    duration: 3.4,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    times: [0, 0.58, 1],
                    ease: "easeInOut",
                  }
                : { duration: 0.25 }
            }
            className="block size-full origin-left bg-system"
          />
        </div>
      </div>
    </div>
  );
}

export function ContentLibraryDesk() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [desktopMotion, setDesktopMotion] = useState(false);
  const reduce = useHydratedReducedMotion();
  const isInView = useInView(sectionRef, { margin: "160px 0px" });
  const active = !reduce && isInView && desktopMotion;

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktopMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="mx-auto mt-20 max-w-7xl px-4 sm:mt-28 sm:px-6"
      aria-label="One production day transforming into a reusable content library"
    >
      <div className="relative min-h-[63rem] overflow-hidden rounded-[2.5rem] border border-border bg-mist sm:min-h-[63rem] sm:rounded-[3rem] lg:min-h-[46rem]">
        <div className="absolute left-6 top-7 z-20 sm:left-10 sm:top-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-system shadow-sm">
            — System lane · Build once —
          </div>
          <h3 className="mt-4 max-w-md text-[clamp(1.75rem,3.5vw,3rem)] font-extrabold leading-[0.98] tracking-[-0.025em] text-ink">
            One shoot enters. A useful library leaves.
          </h3>
          <div className="mt-4 flex w-fit items-center gap-2 rounded-full bg-white px-3 py-2 text-xs shadow-sm">
            <span className="text-muted-foreground line-through">Scattered files</span>
            <ArrowRight className="size-3.5 text-system" />
            <strong className="text-system">Reusable library</strong>
          </div>
        </div>

        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: 1, transform: "translate3d(0px, 0px, 0) scale(1)" }}
          transition={{
            duration: reduce ? 0 : 0.65,
            delay: reduce ? 0 : 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="pointer-events-none absolute right-1 top-32 z-10 h-56 w-52 sm:right-8 sm:top-20 sm:h-72 sm:w-72 lg:right-16 lg:top-6 lg:h-80 lg:w-80"
        >
          <span className="absolute bottom-2 left-1/2 h-8 w-4/5 -translate-x-1/2 rounded-[50%] bg-system/15" />
          <img
            src={silas}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute bottom-0 left-0 h-[92%] w-auto object-contain mix-blend-multiply"
          />
          <img
            src={samira}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute bottom-0 right-0 h-full w-auto object-contain mix-blend-multiply"
          />
        </motion.div>

        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: 1, transform: "translate3d(0px, 0px, 0) scale(1)" }}
          transition={{
            duration: reduce ? 0 : 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-x-3 bottom-3 z-20 overflow-hidden rounded-[2rem] border border-white bg-white p-4 shadow-[0_28px_80px_-44px_rgb(16_32_74_/_0.4)] sm:inset-x-6 sm:bottom-6 sm:rounded-[2.4rem] sm:p-6 lg:inset-x-10 lg:grid lg:grid-cols-[0.88fr_1.12fr] lg:gap-7 lg:p-7"
        >
          <div
            className="pointer-events-none absolute inset-y-0 left-0 right-0 z-30 overflow-hidden lg:left-[39%]"
            aria-hidden
          >
            <motion.div
              animate={
                active
                  ? {
                      transform: ["translate3d(-100%, 0, 0)", "translate3d(0%, 0, 0)"],
                      opacity: [0, 0.75, 0],
                    }
                  : { transform: "translate3d(-100%, 0, 0)", opacity: 0 }
              }
              transition={
                active
                  ? {
                      duration: 3.2,
                      repeat: Infinity,
                      repeatDelay: 1.25,
                      times: [0, 0.14, 1],
                      ease: "easeInOut",
                    }
                  : { duration: 0 }
              }
              className="absolute inset-y-0 w-full"
            >
              <span className="absolute inset-y-0 right-0 w-6 border-r border-system/50 bg-system/10" />
            </motion.div>
          </div>

          <motion.div
            initial={false}
            animate={{ transform: "translate3d(0%, 0px, 0) rotate(0deg) scale(1)" }}
            transition={{
              duration: reduce ? 0 : 0.72,
              delay: reduce ? 0 : 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <MasterFootage active={active} reduce={reduce} />
          </motion.div>

          <div className="relative mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-0">
            <svg
              viewBox="0 0 32 400"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -left-7 inset-y-0 hidden w-8 overflow-visible text-system lg:block"
              aria-hidden
            >
              <motion.path
                d="M0 200 H13 V96 H32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                initial={false}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: reduce ? 0 : 0.7,
                  delay: reduce ? 0 : 0.2,
                  ease: "easeOut",
                }}
              />
              <motion.path
                d="M13 200 V304 H32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                initial={false}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: reduce ? 0 : 0.7,
                  delay: reduce ? 0 : 0.28,
                  ease: "easeOut",
                }}
              />
            </svg>
            {outputs.map((item, index) => (
              <OutputCard
                key={item.label}
                item={item}
                index={index}
                reduce={reduce}
                active={active && index === 0}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
