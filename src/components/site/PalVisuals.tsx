import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/use-hydrated-reduced-motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { palDirectory, palList } from "@/lib/pal-directory";
import type { PalName } from "@/lib/studio-model";
import type { PalAccent } from "@/lib/pricing-catalog";
import { LANES, PAL_CREW, PAL_HEADSHOTS, PAL_PORTRAITS, laneById, laneVar } from "@/lib/pal-lanes";
import { PAL_SCENES, type PalSceneName } from "@/lib/pal-scenes";
import { Glyph, type GlyphName } from "./Glyphs";

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* PalFigure — a single Pal standing on a lane-colored disc            */
/* ------------------------------------------------------------------ */

const figureSizes = {
  sm: "w-40 sm:w-44",
  md: "w-56 sm:w-64",
  lg: "w-72 sm:w-80",
  xl: "w-80 sm:w-[26rem]",
} as const;

export function PalFigure({
  pal,
  size = "md",
  lane,
  className = "",
  caption,
  tags = [],
}: {
  pal: PalName;
  size?: keyof typeof figureSizes;
  lane?: PalAccent;
  className?: string;
  caption?: string;
  tags?: string[];
}) {
  const reduce = useHydratedReducedMotion();
  const profile = palDirectory[pal];
  const accent = lane ?? (profile.lane as PalAccent);
  return (
    <div className={`site-pal-art ${className}`}>
      <div className="site-visual-frame relative flex items-end justify-center overflow-hidden">
        <motion.img
          src={PAL_PORTRAITS[pal]}
          alt={`${profile.name}, ${profile.role}`}
          loading="lazy"
          decoding="async"
          className={`h-auto max-w-full object-contain ${figureSizes[size]}`}
          initial={reduce ? false : { y: 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.35 }}
        />
      </div>
      {!!tags.length && (
        <div className="site-scene-tags">
          {tags.map((tag) => (
            <span key={tag} style={{ color: laneVar(accent, "-text") }}>
              {tag}
            </span>
          ))}
        </div>
      )}
      {caption && <p className="site-visual-caption">{caption}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PalDuo — both Pals from a lane with floating output labels          */
/* ------------------------------------------------------------------ */

export function PalDuo({
  lane,
  labels,
  className = "",
  minHeight = "",
}: {
  lane: PalAccent;
  labels?: string[];
  className?: string;
  minHeight?: string;
}) {
  const reduce = useHydratedReducedMotion();
  const info = laneById[lane];
  const tags = labels ?? info.outputs;
  return (
    <div className={`site-pal-art ${className}`}>
      <div
        className={`site-visual-frame relative grid grid-cols-2 overflow-hidden ${minHeight}`}
        style={{ aspectRatio: "16/9" }}
      >
        {info.pals.map((pal, index) => (
          <motion.img
            key={pal}
            src={PAL_PORTRAITS[pal]}
            alt={`${palDirectory[pal].name}, ${palDirectory[pal].role}`}
            loading="lazy"
            decoding="async"
            className="size-full min-h-0 object-cover object-top"
            initial={reduce ? false : { y: 12 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : index * 0.08 }}
          />
        ))}
      </div>
      {!!tags.length && (
        <div className="site-scene-tags">
          {tags.map((tag) => (
            <span key={tag} style={{ color: laneVar(lane, "-text") }}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PalCrew — the four-Pal group shot                                   */
/* ------------------------------------------------------------------ */

export function PalCrew({ className = "" }: { className?: string }) {
  const reduce = useHydratedReducedMotion();
  return (
    <motion.div
      className={`relative isolate ${className}`}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        aria-hidden
        className="absolute inset-x-[8%] bottom-0 -z-10 h-[70%] rounded-[3rem] bg-spotlight-soft"
      />
      <img
        src={PAL_CREW}
        alt="The Palmer House Pals on set with camera and lights"
        loading="lazy"
        decoding="async"
        className="relative mx-auto w-full max-w-3xl object-contain"
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* PalCallout — a Pal speaks. Sintra-style companion aside.            */
/* ------------------------------------------------------------------ */

export function PalCallout({
  pal,
  quote,
  label,
  compact = false,
  className = "",
  action,
}: {
  pal: PalName;
  quote: string;
  label?: string;
  compact?: boolean;
  className?: string;
  action?: { label: string; to: string; search?: Record<string, string | undefined> };
}) {
  const reduce = useHydratedReducedMotion();
  const profile = palDirectory[pal];
  const lane = profile.lane as PalAccent;
  return (
    <motion.aside
      className={`relative flex items-start gap-4 ${compact ? "" : "sm:gap-6"} ${className}`}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <span
        className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full ${
          compact ? "size-14" : "size-16 sm:size-20"
        }`}
        style={{ background: laneVar(lane, "-soft") }}
      >
        <img
          src={PAL_HEADSHOTS[pal]}
          alt={`${profile.name}, ${profile.role}`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover mix-blend-multiply"
        />
      </span>
      <motion.div
        className="relative flex-1 rounded-[1.5rem] rounded-tl-md border bg-white p-4 shadow-soft sm:p-5"
        style={{ borderColor: `color-mix(in srgb, ${laneVar(lane)} 30%, white)` }}
        initial={reduce ? false : { opacity: 0, scale: 0.96, transformOrigin: "left top" }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <p
          className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
          style={{ color: laneVar(lane, "-text") }}
        >
          {label ?? `${profile.name} · ${profile.role}`}
        </p>
        <p
          className={`mt-2 font-semibold leading-snug text-ink ${compact ? "text-sm" : "text-base sm:text-lg"}`}
        >
          {quote}
        </p>
        {action && (
          <Link
            to={action.to}
            search={action.search}
            className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-bold underline underline-offset-4"
            style={{ color: laneVar(lane, "-text") }}
          >
            {action.label} <ArrowRight className="size-4" />
          </Link>
        )}
      </motion.div>
    </motion.aside>
  );
}

/* ------------------------------------------------------------------ */
/* LaneTiles — the four lanes with headshots. Replaces ad-hoc grids.   */
/* ------------------------------------------------------------------ */

export function LaneTiles({
  variant = "cards",
  className = "",
  ctaLabel = "Explore",
}: {
  variant?: "cards" | "compact";
  className?: string;
  ctaLabel?: string;
}) {
  const reduce = useHydratedReducedMotion();
  if (variant === "compact") {
    return (
      <div className={`grid grid-cols-2 gap-3 ${className}`}>
        {LANES.map((lane, i) => (
          <motion.div
            key={lane.id}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
          >
            <Link
              to={lane.to}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/80 bg-white p-4 shadow-soft transition-transform hover:-translate-y-1 motion-reduce:transition-none"
            >
              <div className="flex items-center justify-between">
                <span className="flex -space-x-3">
                  {lane.pals.map((pal) => (
                    <img
                      key={pal}
                      src={PAL_HEADSHOTS[pal]}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-10 rounded-full border-2 border-white object-cover mix-blend-multiply"
                      style={{ background: laneVar(lane.id, "-soft") }}
                    />
                  ))}
                </span>
                <Glyph name={lane.glyph} lane={lane.id} className="size-8" />
              </div>
              <p
                className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{ color: laneVar(lane.id, "-text") }}
              >
                {lane.problem}
              </p>
              <p className="mt-1 text-sm font-extrabold">{lane.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{lane.duo}</p>
              <ArrowRight className="mt-3 size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
            </Link>
          </motion.div>
        ))}
      </div>
    );
  }
  return (
    <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {LANES.map((lane, i) => (
        <motion.div
          key={lane.id}
          className="h-full"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
        >
          <Link
            to={lane.to}
            className="group surface-card flex h-full flex-col overflow-hidden transition-transform hover:-translate-y-1 motion-reduce:transition-none"
          >
            <div
              className="relative flex h-44 items-end justify-center overflow-hidden"
              style={{ background: laneVar(lane.id, "-soft") }}
            >
              <span
                aria-hidden
                className="absolute left-1/2 top-4 aspect-square w-[64%] -translate-x-1/2 rounded-full"
                style={{ background: `color-mix(in srgb, ${laneVar(lane.id)} 20%, white)` }}
              />
              {lane.pals.map((pal, idx) => (
                <img
                  key={pal}
                  src={PAL_PORTRAITS[pal]}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`relative h-40 w-auto max-w-[60%] object-contain object-bottom transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none ${
                    idx === 0 ? "-mr-6" : "-ml-6"
                  }`}
                />
              ))}
              <span
                className="absolute left-4 top-4 rounded-full bg-white px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] shadow-sm"
                style={{ color: laneVar(lane.id, "-text") }}
              >
                {lane.problem}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-xl font-extrabold">{lane.label}</h3>
              <p className="mt-1 text-xs font-semibold text-muted-foreground">{lane.duo}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{lane.promise}</p>
              <p
                className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-bold"
                style={{ color: laneVar(lane.id, "-text") }}
              >
                {ctaLabel} {lane.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* StatBand — count-up numbers on lane tiles                           */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, play: boolean, duration = 1100) {
  const [value, setValue] = useState(play ? 0 : target);
  useEffect(() => {
    if (!play) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, play, duration]);
  return value;
}

export type Stat = {
  value: number | string;
  prefix?: string;
  suffix?: string;
  label: string;
  lane?: PalAccent;
};

function StatTile({ stat, index, lane }: { stat: Stat; index: number; lane: PalAccent }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useHydratedReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const numeric = typeof stat.value === "number" ? stat.value : null;
  const count = useCountUp(numeric ?? 0, !!inView && !reduce && numeric !== null);
  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-[1.25rem] border border-border p-5 sm:p-6"
      style={{ background: "var(--site-raised)" }}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
    >
      <p
        className="relative flex flex-wrap items-baseline gap-x-1.5 font-mono text-[clamp(2rem,4vw,3rem)] font-extrabold leading-none tracking-[-0.04em]"
        style={{ color: laneVar(lane, "-text") }}
      >
        <span>
          {stat.prefix}
          {numeric !== null ? count.toLocaleString() : stat.value}
          {/* Short symbolic suffixes (%, ★, +) stay inline at full size. */}
          {stat.suffix && stat.suffix.trim().length <= 1 ? stat.suffix : null}
        </span>
        {stat.suffix && stat.suffix.trim().length > 1 && (
          <span className="font-sans text-[0.42em] font-bold tracking-[0.02em] text-ink-soft">
            {stat.suffix.trim()}
          </span>
        )}
      </p>
      <p className="relative mt-1 text-sm font-semibold text-ink-soft">{stat.label}</p>
    </motion.div>
  );
}

export function StatBand({ stats, className = "" }: { stats: Stat[]; className?: string }) {
  const lanesCycle: PalAccent[] = ["reel", "spotlight", "evergreen", "system"];
  return (
    <div
      className={`grid gap-4 ${stats.length === 3 ? "sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-4"} ${className}`}
    >
      {stats.map((s, i) => (
        <StatTile key={s.label} stat={s} index={i} lane={s.lane ?? lanesCycle[i % 4]} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FeatureSplit — Holo-style alternating story row                     */
/* ------------------------------------------------------------------ */

export function FeatureSplit({
  eyebrow,
  title,
  body,
  bullets = [],
  visual,
  reverse = false,
  lane = "spotlight",
  action,
  children,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  bullets?: string[];
  visual: ReactNode;
  reverse?: boolean;
  lane?: PalAccent;
  action?: { label: string; to: string; search?: Record<string, string | undefined> };
  children?: ReactNode;
}) {
  const reduce = useHydratedReducedMotion();
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      <motion.div
        className={reverse ? "lg:order-2" : ""}
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {eyebrow && (
          <p
            className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{ color: laneVar(lane, "-text") }}
          >
            <span className="size-2 rounded-full" style={{ background: laneVar(lane) }} />
            {eyebrow}
          </p>
        )}
        <h3 className="mt-3 text-[clamp(1.75rem,3.6vw,2.9rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-balance">
          {title}
        </h3>
        {body && (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{body}</p>
        )}
        {bullets.length > 0 && (
          <ul className="mt-5 space-y-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm font-semibold sm:text-base">
                <span
                  className="mt-1.5 size-2.5 shrink-0 rounded-full"
                  style={{ background: laneVar(lane) }}
                />
                {b}
              </li>
            ))}
          </ul>
        )}
        {children}
        {action && (
          <Link
            to={action.to}
            search={action.search}
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold underline underline-offset-4"
            style={{ color: laneVar(lane, "-text") }}
          >
            {action.label} <ArrowRight className="size-4" />
          </Link>
        )}
      </motion.div>
      <motion.div
        className={`min-w-0 ${reverse ? "lg:order-1" : ""}`}
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {visual}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* GraphicFrame — soft lane panel that stages children in view         */
/* ------------------------------------------------------------------ */

export function GraphicFrame({
  lane = "spotlight",
  children,
  className = "",
  label,
  minHeight = "min-h-[18rem]",
}: {
  lane?: PalAccent;
  children: ReactNode;
  className?: string;
  label?: string;
  minHeight?: string;
}) {
  return (
    <div
      className={`site-visual-frame relative isolate overflow-hidden rounded-[2.25rem] border border-white/75 p-6 sm:p-8 ${minHeight} ${className}`}
      style={{ background: laneVar(lane, "-soft") }}
    >
      {label && (
        <span
          className="site-visual-tag absolute left-5 top-5 rounded-full bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] shadow-sm"
          style={{ color: laneVar(lane, "-text") }}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scene — a custom Pal scene in a seamless lane-tinted frame          */
/* ------------------------------------------------------------------ */

export function Scene({
  name,
  className = "",
  tags = [],
  caption,
  priority = false,
}: {
  name: PalSceneName;
  className?: string;
  tags?: string[];
  caption?: string;
  /** Set for above-the-fold hero usage so the image is not lazy-loaded. */
  priority?: boolean;
}) {
  const reduce = useHydratedReducedMotion();
  const scene = PAL_SCENES[name];
  return (
    <div className={className}>
      <div className="site-visual-frame overflow-hidden" style={{ aspectRatio: scene.ratio }}>
        <motion.img
          src={scene.src}
          alt={scene.alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : undefined}
          className="size-full object-cover"
          initial={reduce ? false : { scale: 1.015 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.4 }}
        />
      </div>
      {!!tags.length && (
        <div className="site-scene-tags">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}
      {caption && <p className="site-visual-caption">{caption}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SceneCard — image-led card for generated Pal scenes                 */
/* ------------------------------------------------------------------ */

export function SceneCard({
  src,
  alt,
  lane,
  eyebrow,
  title,
  body,
  to,
  index = 0,
}: {
  src: string;
  alt: string;
  lane: PalAccent;
  eyebrow?: string;
  title: string;
  body?: string;
  to?: string;
  index?: number;
}) {
  const reduce = useHydratedReducedMotion();
  const inner = (
    <>
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{ background: laneVar(lane, "-soft") }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transition-none"
        />
      </div>
      <div className="p-5 sm:p-6">
        {eyebrow && (
          <p
            className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{ color: laneVar(lane, "-text") }}
          >
            {eyebrow}
          </p>
        )}
        <h3 className="mt-2 text-xl font-extrabold">{title}</h3>
        {body && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>}
        {to && (
          <p
            className="mt-4 flex items-center gap-1.5 text-sm font-bold"
            style={{ color: laneVar(lane, "-text") }}
          >
            Explore{" "}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
          </p>
        )}
      </div>
    </>
  );
  const cls =
    "group surface-card flex h-full flex-col overflow-hidden transition-transform hover:-translate-y-1 motion-reduce:transition-none";
  return (
    <motion.div
      className="h-full"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
    >
      {to ? (
        <Link to={to} className={cls}>
          {inner}
        </Link>
      ) : (
        <article className={cls}>{inner}</article>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* ProcessTimeline — numbered steps, Pal per step, drawn connector     */
/* ------------------------------------------------------------------ */

export type ProcessStep = {
  title: string;
  body: string;
  pal?: PalName;
  glyph?: GlyphName;
  lane?: PalAccent;
};

export function ProcessTimeline({
  steps,
  className = "",
}: {
  steps: ProcessStep[];
  className?: string;
}) {
  const reduce = useHydratedReducedMotion();
  const cycle: PalAccent[] = ["reel", "spotlight", "evergreen", "system"];
  const cols =
    steps.length <= 3 ? "lg:grid-cols-3" : steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-5";
  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-border lg:block">
        <motion.span
          className="block h-px origin-left bg-ink"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <ol className={`relative grid gap-5 sm:grid-cols-2 ${cols}`}>
        {steps.map((step, i) => {
          const lane =
            step.lane ?? (step.pal ? (palDirectory[step.pal].lane as PalAccent) : cycle[i % 4]);
          return (
            <motion.li
              key={step.title}
              className="surface-card relative flex h-full flex-col p-5"
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="grid size-10 place-items-center rounded-full font-mono text-sm font-extrabold text-white"
                  style={{ background: laneVar(lane) }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step.pal ? (
                  <span
                    className="grid size-14 place-items-center overflow-hidden rounded-full"
                    style={{ background: laneVar(lane, "-soft") }}
                  >
                    <img
                      src={PAL_HEADSHOTS[step.pal]}
                      alt={`${palDirectory[step.pal].name}`}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover mix-blend-multiply"
                    />
                  </span>
                ) : step.glyph ? (
                  <Glyph name={step.glyph} lane={lane} className="size-12" />
                ) : null}
              </div>
              <h3 className="mt-5 text-lg font-extrabold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              {step.pal && (
                <p
                  className="mt-auto pt-4 font-mono text-[10px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: laneVar(lane, "-text") }}
                >
                  Guided by {palDirectory[step.pal].name}
                </p>
              )}
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PalRoster — all eight Pals, compact                                 */
/* ------------------------------------------------------------------ */

export function PalRoster({ className = "" }: { className?: string }) {
  const reduce = useHydratedReducedMotion();
  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-4 ${className}`}>
      {palList.map((pal, i) => {
        const lane = pal.lane as PalAccent;
        return (
          <motion.div
            key={pal.key}
            className="h-full"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
          >
            <Link
              to={laneById[lane].to}
              className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-soft transition-transform hover:-translate-y-1 motion-reduce:transition-none"
            >
              <div
                className="relative flex h-44 items-end justify-center overflow-hidden"
                style={{ background: laneVar(lane, "-soft") }}
              >
                <span
                  aria-hidden
                  className="absolute left-1/2 top-4 size-28 -translate-x-1/2 rounded-full"
                  style={{ background: `color-mix(in srgb, ${laneVar(lane)} 14%, white)` }}
                />
                <img
                  src={PAL_PORTRAITS[pal.key]}
                  alt={`${pal.name}, ${pal.role}`}
                  loading="lazy"
                  decoding="async"
                  className="relative h-[11.5rem] w-auto max-w-none -mb-6 object-contain object-top transition-transform duration-500 group-hover:-translate-y-1.5 motion-reduce:transition-none"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-extrabold">{pal.name}</h3>
                <p
                  className="mt-0.5 text-xs font-semibold"
                  style={{ color: laneVar(lane, "-text") }}
                >
                  {pal.role}
                </p>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
