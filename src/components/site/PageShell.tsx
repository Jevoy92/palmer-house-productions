import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { Glyph, GlyphBadge, type GlyphName } from "./Glyphs";
import { PalDuo, PalFigure } from "./PalVisuals";
import { PAL_CREW, PAL_HEADSHOTS, laneVar } from "@/lib/pal-lanes";
import { palDirectory } from "@/lib/pal-directory";
import type { PalName } from "@/lib/studio-model";
import type { PalAccent } from "@/lib/pricing-catalog";

export type Tone = "paper" | "mist" | "ink" | PalAccent;

const LANE_SET: ReadonlySet<string> = new Set(["reel", "spotlight", "evergreen", "system"]);
const isLane = (v: unknown): v is PalAccent => typeof v === "string" && LANE_SET.has(v);

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-soft transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

export function Eyebrow({
  children,
  lane,
  className = "",
}: {
  children: ReactNode;
  lane?: PalAccent;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex min-h-8 items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] shadow-sm ${className}`}
      style={{ color: lane ? laneVar(lane, "-text") : undefined }}
    >
      {lane && (
        <span aria-hidden className="size-2 rounded-full" style={{ background: laneVar(lane) }} />
      )}
      {!lane && <span className="text-muted-foreground">{children}</span>}
      {lane && children}
    </span>
  );
}

/**
 * PageHero — the split hero used on every non-home page.
 *
 * Visual resolution order: explicit `children` → `visual` → `pal`
 * (PalName renders one Pal, a lane id renders that lane's duo) → text-only.
 * `lane` tints the backdrop, highlight, and eyebrow.
 */
export function PageHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  ctas = true,
  lane,
  pal,
  palTags,
  visual,
  primary,
  secondary,
  children,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  ctas?: boolean;
  lane?: PalAccent;
  pal?: PalName | PalAccent;
  palTags?: string[];
  visual?: ReactNode;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
  children?: ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(sectionRef, { margin: "100px 0px" });
  const play = !reduce && inView;
  const heroPromote = useEntrancePromotion(!!reduce);

  const resolvedLane: PalAccent | undefined =
    lane ?? (isLane(pal) ? pal : pal ? (palDirectory[pal].lane as PalAccent) : undefined);

  // Right-column visual: explicit `visual` wins, then a Pal figure/duo, and —
  // for backwards compatibility — `children` when nothing else is supplied.
  // When a visual or pal is present, `children` renders under the copy column.
  const palVisual: ReactNode = pal ? (
    isLane(pal) ? (
      <PalDuo lane={pal} labels={palTags} />
    ) : (
      <PalFigure pal={pal} size="xl" tags={palTags} className="min-h-[22rem]" />
    )
  ) : null;
  const resolvedVisual: ReactNode = visual ?? palVisual ?? children ?? null;
  const below: ReactNode = visual || palVisual ? children : null;

  const blobA = resolvedLane ? laneVar(resolvedLane, "-soft") : "var(--spotlight-soft)";
  const blobB = resolvedLane
    ? `color-mix(in srgb, ${laneVar(resolvedLane)} 14%, white)`
    : "var(--reel-soft)";
  const highlightColor = resolvedLane ? laneVar(resolvedLane, "-text") : "var(--spotlight)";
  const split = !!resolvedVisual;
  // Long SEO-style headlines (industry/location pages) step down a size so
  // they stay at 3-4 lines instead of stacking six and dwarfing the visual.
  const titleLength = title.length + (highlight?.length ?? 0);
  const titleSize =
    titleLength > 48
      ? split
        ? "text-[clamp(2.1rem,4.2vw,4rem)]"
        : "text-[clamp(2.4rem,5.2vw,4.8rem)]"
      : split
        ? "text-[clamp(2.5rem,5.6vw,5.4rem)]"
        : "text-[clamp(2.75rem,7vw,6.4rem)]";

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden px-4 pb-4 pt-8 sm:pb-6 sm:pt-12"
    >
      <div className="pointer-events-none absolute inset-x-4 inset-y-0 -z-10 mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-mist sm:rounded-[3.5rem]">
        <motion.span
          aria-hidden
          className="absolute -right-16 -top-20 size-64 rounded-full sm:size-80"
          style={{ background: blobA }}
          animate={
            play
              ? {
                  transform: [
                    "translate3d(0px, 0px, 0)",
                    "translate3d(-12px, 10px, 0)",
                    "translate3d(0px, 0px, 0)",
                  ],
                }
              : { transform: "translate3d(0px, 0px, 0)" }
          }
          transition={
            play ? { duration: 12, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 }
          }
        />
        <motion.span
          aria-hidden
          className="absolute -bottom-28 -left-16 size-72 rounded-full sm:size-96"
          style={{ background: blobB }}
          animate={
            play
              ? {
                  transform: [
                    "translate3d(0px, 0px, 0)",
                    "translate3d(14px, -8px, 0)",
                    "translate3d(0px, 0px, 0)",
                  ],
                }
              : { transform: "translate3d(0px, 0px, 0)" }
          }
          transition={
            play ? { duration: 14, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 }
          }
        />
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, transform: "translate3d(0,24px,0)" }}
        animate={{ opacity: 1, transform: "translate3d(0,0,0)" }}
        transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={heroPromote.settle}
        style={heroPromote.style}
        className={`mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-10 sm:py-20 ${
          split ? "lg:grid-cols-[1.05fr_.95fr] lg:text-left" : "text-center"
        }`}
      >
        <div className={split ? "" : "mx-auto max-w-4xl"}>
          {eyebrow && <Eyebrow lane={resolvedLane}>{eyebrow}</Eyebrow>}
          <h1
            className={`mt-5 font-extrabold leading-[0.94] tracking-[-0.055em] text-balance ${titleSize}`}
          >
            {title}
            {highlight && (
              <>
                {" "}
                <span style={{ color: highlightColor }}>{highlight}</span>
              </>
            )}
          </h1>
          {subtitle && (
            <p
              className={`mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg ${
                split ? "" : "mx-auto"
              }`}
            >
              {subtitle}
            </p>
          )}
          {ctas && (
            <div className={`mt-8 flex flex-wrap gap-3 ${split ? "" : "justify-center"}`}>
              <Link to={primary?.to ?? "/contact"} className="primary-action">
                {primary?.label ?? "Book a Discovery Call"}
              </Link>
              <Link to={secondary?.to ?? "/production-pricing"} className="secondary-action">
                {secondary?.label ?? "Build Your Package"}
              </Link>
            </div>
          )}
          {below}
        </div>
        {split && <div className="min-w-0">{resolvedVisual}</div>}
      </motion.div>
    </section>
  );
}

export function InView({
  children,
  className = "",
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  const promote = useEntrancePromotion(!!reduce);
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, transform: "translate3d(0,24px,0)" }}
      whileInView={{ opacity: 1, transform: "translate3d(0,0,0)" }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : delay, ease: "easeOut" }}
      onAnimationComplete={promote.settle}
      className={className}
      style={{ ...style, ...promote.style }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Promotes a large surface to its own compositor layer only while its
 * entrance runs, so translate/opacity reveals skip per-frame repaints.
 * The hint is released afterwards to keep GPU memory flat.
 */
function useEntrancePromotion(skip: boolean) {
  const [settled, setSettled] = useState(skip);
  return {
    style: settled ? undefined : ({ willChange: "transform, opacity" } as CSSProperties),
    settle: () => setSettled(true),
  };
}

/** Staggers direct children in when the group enters view. */
export function Stagger({
  children,
  className = "",
  step = 0.07,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step } } }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  lane,
  onDark = false,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
  lane?: PalAccent;
  onDark?: boolean;
}) {
  if (!eyebrow && !title && !subtitle) return null;
  return (
    <div className={`mb-10 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow lane={lane}>{eyebrow}</Eyebrow>}
      {title && (
        <h2
          className={`mt-4 text-[clamp(2rem,4.5vw,3.8rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-balance ${
            onDark ? "text-white" : ""
          }`}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            onDark ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

function toneClass(tone: Tone) {
  switch (tone) {
    case "mist":
      return "bg-mist";
    case "ink":
      return "bg-ink text-white";
    default:
      return "";
  }
}

export function Section({
  eyebrow,
  title,
  subtitle,
  children,
  muted = false,
  tone,
  lane,
  align = "center",
  id,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  muted?: boolean;
  tone?: Tone;
  lane?: PalAccent;
  align?: "left" | "center";
  id?: string;
  className?: string;
}) {
  const resolvedTone: Tone = tone ?? (muted ? "mist" : "paper");
  const laneTone = isLane(resolvedTone) ? resolvedTone : undefined;
  const dark = resolvedTone === "ink";
  return (
    <section
      id={id}
      className={`relative px-4 py-16 sm:py-24 ${toneClass(resolvedTone)} ${className}`}
      style={laneTone ? { background: laneVar(laneTone, "-soft") } : undefined}
    >
      <InView className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          align={align}
          lane={lane ?? laneTone}
          onDark={dark}
        />
        {children}
      </InView>
    </section>
  );
}

export function Card({
  title,
  body,
  index,
  lane,
  glyph,
  pal,
  icon,
  to,
  children,
}: {
  title: string;
  body?: string;
  index?: number | string;
  lane?: PalAccent;
  glyph?: GlyphName;
  pal?: PalName;
  icon?: ReactNode;
  to?: string;
  children?: ReactNode;
}) {
  const accent: PalAccent = lane ?? (pal ? (palDirectory[pal].lane as PalAccent) : "spotlight");
  const content = (
    <>
      <span
        aria-hidden
        className="absolute -right-12 -top-12 size-28 rounded-full transition-transform duration-500 group-hover:scale-125 motion-reduce:transition-none"
        style={{ background: laneVar(accent, "-soft") }}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {glyph && <GlyphBadge name={glyph} lane={accent} size="sm" />}
          {icon && (
            <span
              className="grid size-12 shrink-0 place-items-center rounded-[1rem]"
              style={{ background: laneVar(accent, "-soft"), color: laneVar(accent, "-text") }}
            >
              {icon}
            </span>
          )}
          {index !== undefined && !glyph && !icon && (
            <span
              className="grid size-10 place-items-center rounded-full font-mono text-sm font-extrabold text-white"
              style={{ background: laneVar(accent) }}
            >
              {index}
            </span>
          )}
        </div>
        {pal && (
          <span
            className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full"
            style={{ background: laneVar(accent, "-soft") }}
          >
            <img
              src={PAL_HEADSHOTS[pal]}
              alt={palDirectory[pal].name}
              loading="lazy"
              decoding="async"
              className="size-full object-cover mix-blend-multiply"
            />
          </span>
        )}
      </div>
      {index !== undefined && (glyph || icon) && (
        <span
          className="relative mt-4 block font-mono text-xs font-bold"
          style={{ color: laneVar(accent, "-text") }}
        >
          {index}
        </span>
      )}
      <h3 className="relative mt-4 text-xl font-bold tracking-[-0.025em]">{title}</h3>
      {body && (
        <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
      )}
      {children}
      {to && (
        <p
          className="relative mt-5 flex items-center gap-1.5 text-sm font-bold"
          style={{ color: laneVar(accent, "-text") }}
        >
          Learn more{" "}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
        </p>
      )}
    </>
  );
  const cls =
    "surface-card group relative flex h-full flex-col overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none";
  return to ? (
    <Link to={to} className={cls}>
      {content}
    </Link>
  ) : (
    <article className={cls}>{content}</article>
  );
}

export function CardGrid({ children, cols = 3 }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  const cls =
    cols === 2
      ? "sm:grid-cols-2"
      : cols === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";
  return <div className={`grid gap-5 ${cls}`}>{children}</div>;
}

export function FaqList({
  items,
  lane = "spotlight",
  pal,
}: {
  items: { q: string; a: string }[];
  lane?: PalAccent;
  pal?: PalName;
}) {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      <div className="space-y-3">
        {items.map((it, i) => (
          <details key={it.q} className="surface-card group p-5 sm:p-6">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-4 text-base font-bold sm:text-lg">
              <span
                aria-hidden
                className="hidden size-8 shrink-0 place-items-center rounded-full font-mono text-[11px] font-bold sm:grid"
                style={{ background: laneVar(lane, "-soft"), color: laneVar(lane, "-text") }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">{it.q}</span>
              <span
                aria-hidden
                className="grid size-9 shrink-0 place-items-center rounded-full text-xl transition-transform group-open:rotate-45 motion-reduce:transition-none"
                style={{ background: laneVar(lane, "-soft"), color: laneVar(lane, "-text") }}
              >
                +
              </span>
            </summary>
            <p className="mt-3 pr-10 text-sm leading-relaxed text-muted-foreground sm:pl-12 sm:text-base">
              {it.a}
            </p>
          </details>
        ))}
      </div>
      {pal && (
        <aside className="hidden lg:sticky lg:top-28 lg:block">
          <PalFigure
            pal={pal}
            size="lg"
            lane={lane}
            className="min-h-[22rem]"
            caption="Ask me anything"
            tags={["Straight answers", "No pressure"]}
          />
          <div
            className="mt-4 rounded-[1.75rem] border border-white/80 p-5"
            style={{ background: laneVar(lane, "-soft") }}
          >
            <p className="text-sm font-bold">Still have a question?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {palDirectory[pal].name} and the team answer within one business day.
            </p>
            <Link
              to="/contact"
              className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white"
            >
              Ask the team <ArrowRight className="size-4" />
            </Link>
          </div>
        </aside>
      )}
    </div>
  );
}

export function CtaBand({
  title,
  subtitle,
  primaryLabel = "Book a Discovery Call",
  primaryTo = "/contact",
  secondaryLabel = "Find Your Pal",
  secondaryTo = "/find-your-pal",
  lane = "spotlight",
  crew = true,
}: {
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  lane?: PalAccent;
  crew?: boolean;
}) {
  const reduce = useReducedMotion();
  const dark = lane === "spotlight" || lane === "system";
  const bg = laneVar(lane, "-deep");
  return (
    <section className="px-4 py-16 sm:py-24">
      <InView
        className={`relative mx-auto grid max-w-6xl overflow-hidden rounded-[2.5rem] px-6 py-14 text-white shadow-glow sm:px-10 sm:py-16 ${
          crew ? "lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:text-left" : "text-center"
        }`}
        style={{ background: bg }}
      >
        <span aria-hidden className="absolute -left-16 -top-20 size-56 rounded-full bg-white/10" />
        <span
          aria-hidden
          className="absolute -bottom-24 -right-12 size-64 rounded-full"
          style={{
            background: dark
              ? "color-mix(in srgb, var(--reel) 35%, transparent)"
              : "color-mix(in srgb, var(--paper) 14%, transparent)",
          }}
        />
        <div className="relative pb-2 lg:pb-6">
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.045em] text-balance">
            {title}
          </h2>
          {subtitle && (
            <p
              className={`mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg ${
                crew ? "" : "mx-auto"
              }`}
            >
              {subtitle}
            </p>
          )}
          <div className={`mt-8 flex flex-wrap gap-3 ${crew ? "" : "justify-center"}`}>
            <Link
              to={primaryTo}
              className="inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] motion-reduce:transition-none"
            >
              {primaryLabel}
            </Link>
            <Link
              to={secondaryTo}
              className="inline-flex min-h-12 items-center rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
        {crew && (
          <motion.img
            src={PAL_CREW}
            alt="The Palmer House Pals on set"
            loading="lazy"
            decoding="async"
            className="relative mx-auto mt-8 w-full max-w-md object-contain lg:-mb-16 lg:mt-0 lg:max-w-none"
            initial={reduce ? false : { opacity: 0, transform: "translate3d(0,30px,0)" }}
            whileInView={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </InView>
    </section>
  );
}

/** Checklist with lane glyph header — for "what's included" style content. */
export function IncludedPanel({
  title,
  items,
  lane = "spotlight",
  glyph = "spark",
  tone = "ink",
  headingLevel = 3,
}: {
  title: string;
  items: string[];
  lane?: PalAccent;
  glyph?: GlyphName;
  tone?: "ink" | "paper";
  /** Use 2 when the panel is the first titled block after the page h1. */
  headingLevel?: 2 | 3;
}) {
  const dark = tone === "ink";
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div
      className={`grid gap-8 rounded-[2.5rem] p-7 sm:p-12 lg:grid-cols-[.8fr_1.2fr] ${
        dark ? "bg-ink text-white" : "surface-card"
      }`}
    >
      <div>
        <Glyph name={glyph} lane={lane} className="size-16" />
        <Heading className="mt-5 text-3xl font-extrabold sm:text-4xl">{title}</Heading>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className={`flex min-h-16 items-center gap-3 rounded-[1.25rem] p-4 ${
              dark ? "bg-white/8" : "bg-mist"
            }`}
          >
            <span
              className="grid size-8 shrink-0 place-items-center rounded-full text-white"
              style={{ background: laneVar(lane) }}
            >
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
                <path
                  d="m3 8 3.5 3.5L13 5"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-sm font-semibold sm:text-base">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
