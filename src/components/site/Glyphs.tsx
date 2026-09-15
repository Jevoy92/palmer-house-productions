import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { PalAccent } from "@/lib/pricing-catalog";

/**
 * Animated brand glyphs. Flat fills in lane colors, ink strokes, one
 * ambient motion each. Strokes draw in once when the glyph enters view;
 * ambient loops only run while visible, on desktop, and without
 * prefers-reduced-motion.
 */

export type GlyphName =
  | "reel"
  | "camera"
  | "library"
  | "workflow"
  | "script"
  | "calendar"
  | "mic"
  | "chart"
  | "chat"
  | "play"
  | "pin"
  | "shield"
  | "clock"
  | "spark"
  | "gift"
  | "cart"
  | "search"
  | "layers"
  | "handshake"
  | "edit"
  | "publish"
  | "bulb"
  | "teleprompter"
  | "light";

type Palette = { fill: string; soft: string; deep: string; ink: string; paper: string };

function palette(lane: PalAccent): Palette {
  return {
    fill: `var(--${lane})`,
    soft: `var(--${lane}-soft)`,
    deep: `var(--${lane}-text)`,
    ink: "var(--ink)",
    paper: "#ffffff",
  };
}

function useGlyphMotion(ref: React.RefObject<SVGSVGElement | null>) {
  const reduce = useReducedMotion();
  const inView = useInView(ref, { margin: "60px 0px" });
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return { reduce: !!reduce, play: !reduce && inView && desktop };
}

const draw = (reduce: boolean, delay = 0) => ({
  initial: reduce ? false : { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const pop = (reduce: boolean, delay = 0) => ({
  initial: reduce ? false : { opacity: 0, scale: 0.7 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/**
 * Ambient loop. When `play` is false the element settles to its resting frame
 * with a finite transition, so no JS animation stays alive off-screen.
 */
const loop = (
  play: boolean,
  frames: string[],
  duration: number,
  opts: { ease?: "easeInOut" | "linear"; delay?: number } = {},
) => ({
  animate: play ? { transform: frames } : { transform: frames[0] },
  transition: play
    ? { duration, repeat: Infinity, ease: opts.ease ?? ("easeInOut" as const), delay: opts.delay }
    : { duration: 0.4, ease: "easeOut" as const },
});

const stroke = {
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Glyph({
  name,
  lane = "spotlight",
  className = "size-16",
  title,
}: {
  name: GlyphName;
  lane?: PalAccent;
  className?: string;
  title?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const { reduce, play } = useGlyphMotion(ref);
  const p = palette(lane);
  const Body = GLYPHS[name];
  return (
    <svg
      ref={ref}
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
    >
      <Body p={p} reduce={reduce} play={play} />
    </svg>
  );
}

type G = React.FC<{ p: Palette; reduce: boolean; play: boolean }>;

const Reel: G = ({ p, reduce, play }) => (
  <>
    <motion.rect x="18" y="6" width="28" height="52" rx="7" fill={p.fill} {...pop(reduce)} />
    <motion.rect x="22" y="12" width="20" height="36" rx="3" fill={p.paper} {...pop(reduce, 0.1)} />
    <motion.path d="M29 24l10 6-10 6z" fill={p.fill} {...pop(reduce, 0.2)} />
    <motion.g
      style={{ transformOrigin: "52px 20px" }}
      {...loop(play, ["translate3d(0,0,0)", "translate3d(0,-4px,0)", "translate3d(0,0,0)"], 3)}
    >
      <motion.path d="M50 14l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill={p.deep} {...pop(reduce, 0.3)} />
    </motion.g>
    <motion.circle cx="32" cy="53" r="2" fill={p.paper} {...pop(reduce, 0.25)} />
  </>
);

const Camera: G = ({ p, reduce, play }) => (
  <>
    <motion.rect x="8" y="20" width="36" height="28" rx="6" fill={p.fill} {...pop(reduce)} />
    <motion.path d="M44 30l12-7v18l-12-7z" fill={p.deep} {...pop(reduce, 0.12)} />
    <motion.circle cx="24" cy="34" r="8" fill={p.paper} {...pop(reduce, 0.2)} />
    <motion.circle cx="24" cy="34" r="4" fill={p.ink} {...pop(reduce, 0.28)} />
    <motion.g
      style={{ transformOrigin: "36px 24px" }}
      {...loop(play, ["scale(1)", "scale(0.4)", "scale(1)"], 1.6)}
    >
      <motion.circle cx="36" cy="25" r="2.2" fill="#e8492b" {...pop(reduce, 0.35)} />
    </motion.g>
    <motion.path d="M16 20v-4a4 4 0 014-4h8" stroke={p.ink} {...stroke} {...draw(reduce, 0.2)} />
  </>
);

const Library: G = ({ p, reduce, play }) => (
  <>
    <motion.rect x="8" y="14" width="10" height="40" rx="2.5" fill={p.fill} {...pop(reduce)} />
    <motion.rect
      x="21"
      y="20"
      width="10"
      height="34"
      rx="2.5"
      fill={p.deep}
      {...pop(reduce, 0.08)}
    />
    <motion.rect
      x="34"
      y="10"
      width="10"
      height="44"
      rx="2.5"
      fill={p.fill}
      {...pop(reduce, 0.16)}
    />
    <motion.g
      style={{ transformOrigin: "51px 54px" }}
      {...loop(play, ["rotate(0deg)", "rotate(6deg)", "rotate(0deg)"], 3.2)}
    >
      <motion.rect
        x="46"
        y="18"
        width="10"
        height="36"
        rx="2.5"
        fill={p.deep}
        transform="rotate(-8 51 54)"
        {...pop(reduce, 0.24)}
      />
    </motion.g>
    <motion.path d="M6 56h52" stroke={p.ink} {...stroke} {...draw(reduce, 0.3)} />
    {[13, 26, 39].map((x, i) => (
      <motion.rect
        key={x}
        x={x - 2.5}
        y="30"
        width="5"
        height="2.5"
        rx="1"
        fill={p.paper}
        {...pop(reduce, 0.3 + i * 0.05)}
      />
    ))}
  </>
);

const Workflow: G = ({ p, reduce, play }) => (
  <>
    <motion.path
      d="M20 16h24M32 16v10M14 40v-6h36v6"
      stroke={p.ink}
      {...stroke}
      {...draw(reduce)}
    />
    <motion.rect x="24" y="6" width="16" height="12" rx="4" fill={p.fill} {...pop(reduce, 0.1)} />
    <motion.rect x="6" y="40" width="16" height="14" rx="4" fill={p.deep} {...pop(reduce, 0.3)} />
    <motion.rect x="24" y="40" width="16" height="14" rx="4" fill={p.fill} {...pop(reduce, 0.38)} />
    <motion.rect x="42" y="40" width="16" height="14" rx="4" fill={p.deep} {...pop(reduce, 0.46)} />
    <motion.g
      {...loop(play, ["translate3d(0,0,0)", "translate3d(0,14px,0)", "translate3d(0,14px,0)"], 2.4)}
    >
      <motion.circle
        cx="32"
        cy="26"
        r="3"
        fill={p.paper}
        stroke={p.ink}
        strokeWidth="2"
        {...pop(reduce, 0.5)}
      />
    </motion.g>
  </>
);

const Script: G = ({ p, reduce }) => (
  <>
    <motion.rect x="14" y="8" width="36" height="48" rx="6" fill={p.fill} {...pop(reduce)} />
    <motion.rect x="19" y="13" width="26" height="38" rx="3" fill={p.paper} {...pop(reduce, 0.1)} />
    {[21, 27, 33, 39].map((y, i) => (
      <motion.path
        key={y}
        d={`M24 ${y}h${i === 3 ? 10 : 16}`}
        stroke={i === 0 ? p.deep : p.ink}
        strokeOpacity={i === 0 ? 1 : 0.35}
        {...stroke}
        {...draw(reduce, 0.25 + i * 0.1)}
      />
    ))}
    <motion.path d="M40 44l6-6 4 4-6 6h-4z" fill={p.deep} {...pop(reduce, 0.6)} />
  </>
);

const Calendar: G = ({ p, reduce, play }) => (
  <>
    <motion.rect
      x="8"
      y="12"
      width="48"
      height="44"
      rx="7"
      fill={p.paper}
      stroke={p.ink}
      strokeWidth="2.4"
      {...pop(reduce)}
    />
    <motion.rect x="8" y="12" width="48" height="12" rx="7" fill={p.fill} {...pop(reduce, 0.1)} />
    <motion.path d="M20 8v8M44 8v8" stroke={p.ink} {...stroke} {...draw(reduce, 0.15)} />
    {[0, 1, 2].map((r) =>
      [0, 1, 2, 3].map((c) => (
        <motion.rect
          key={`${r}${c}`}
          x={15 + c * 10}
          y={29 + r * 8}
          width="6"
          height="5"
          rx="1.5"
          fill={r === 1 && c === 2 ? p.fill : p.soft}
          {...pop(reduce, 0.25 + (r * 4 + c) * 0.03)}
        />
      )),
    )}
    <motion.g
      style={{ transformOrigin: "38px 39px" }}
      {...loop(play, ["scale(1)", "scale(1.25)", "scale(1)"], 2.2)}
    >
      <motion.circle cx="38" cy="39.5" r="4.5" fill={p.deep} {...pop(reduce, 0.7)} />
    </motion.g>
  </>
);

const Mic: G = ({ p, reduce, play }) => (
  <>
    <motion.rect x="24" y="6" width="16" height="30" rx="8" fill={p.fill} {...pop(reduce)} />
    <motion.path
      d="M16 28a16 16 0 0032 0M32 44v10M22 54h20"
      stroke={p.ink}
      {...stroke}
      {...draw(reduce, 0.15)}
    />
    {[0, 1, 2].map((i) => (
      <motion.g
        key={i}
        style={{ transformOrigin: "32px 20px" }}
        {...loop(play, ["scale(1)", `scale(${1.25 + i * 0.1})`, "scale(1)"], 1.4 + i * 0.3)}
      >
        <motion.path
          d={
            i === 0
              ? "M46 14a10 10 0 010 12"
              : i === 1
                ? "M52 10a16 16 0 010 20"
                : "M18 14a10 10 0 000 12"
          }
          stroke={p.deep}
          {...stroke}
          {...draw(reduce, 0.3 + i * 0.1)}
        />
      </motion.g>
    ))}
  </>
);

const Chart: G = ({ p, reduce }) => (
  <>
    <motion.path d="M8 54h48M8 10v44" stroke={p.ink} {...stroke} {...draw(reduce)} />
    {[
      { x: 14, h: 14 },
      { x: 24, h: 24 },
      { x: 34, h: 20 },
      { x: 44, h: 34 },
    ].map((b, i) => (
      <motion.rect
        key={b.x}
        x={b.x}
        y={52 - b.h}
        width="7"
        height={b.h}
        rx="2"
        fill={i === 3 ? p.deep : p.fill}
        style={{ transformOrigin: `${b.x + 3.5}px 52px` }}
        initial={reduce ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      />
    ))}
    <motion.path d="M17 34l10-8 10 4 10-14" stroke={p.ink} {...stroke} {...draw(reduce, 0.6)} />
    <motion.circle
      cx="47"
      cy="16"
      r="3"
      fill={p.paper}
      stroke={p.ink}
      strokeWidth="2"
      {...pop(reduce, 1)}
    />
  </>
);

const Chat: G = ({ p, reduce, play }) => (
  <>
    <motion.path
      d="M8 14a6 6 0 016-6h24a6 6 0 016 6v14a6 6 0 01-6 6H22l-10 8v-8h-4V14z"
      fill={p.fill}
      {...pop(reduce)}
    />
    <motion.path
      d="M26 30a6 6 0 016-6h18a6 6 0 016 6v12a6 6 0 01-6 6h-4v8l-9-8H32a6 6 0 01-6-6V30z"
      fill={p.paper}
      stroke={p.ink}
      strokeWidth="2.4"
      {...pop(reduce, 0.15)}
    />
    {[0, 1, 2].map((i) => (
      <motion.g
        key={i}
        {...loop(play, ["translate3d(0,0,0)", "translate3d(0,-3px,0)", "translate3d(0,0,0)"], 1.2, {
          delay: i * 0.15,
        })}
      >
        <motion.circle
          cx={34 + i * 6}
          cy="36"
          r="2"
          fill={p.deep}
          {...pop(reduce, 0.35 + i * 0.08)}
        />
      </motion.g>
    ))}
  </>
);

const Play: G = ({ p, reduce, play }) => (
  <>
    <motion.g
      style={{ transformOrigin: "32px 32px" }}
      {...loop(play, ["scale(1)", "scale(1.06)", "scale(1)"], 2.6)}
    >
      <motion.circle cx="32" cy="32" r="24" fill={p.fill} {...pop(reduce)} />
    </motion.g>
    <motion.circle cx="32" cy="32" r="24" stroke={p.ink} strokeWidth="2.4" {...draw(reduce, 0.1)} />
    <motion.path d="M27 22l14 10-14 10z" fill={p.paper} {...pop(reduce, 0.25)} />
  </>
);

const Pin: G = ({ p, reduce, play }) => (
  <>
    <motion.ellipse cx="32" cy="54" rx="14" ry="3" fill={p.soft} {...pop(reduce, 0.3)} />
    <motion.g
      style={{ transformOrigin: "32px 54px" }}
      {...loop(play, ["translate3d(0,0,0)", "translate3d(0,-5px,0)", "translate3d(0,0,0)"], 2.4)}
    >
      <motion.path
        d="M32 52S14 34 14 24a18 18 0 0136 0c0 10-18 28-18 28z"
        fill={p.fill}
        {...pop(reduce)}
      />
      <motion.circle cx="32" cy="24" r="7" fill={p.paper} {...pop(reduce, 0.15)} />
      <motion.circle cx="32" cy="24" r="3" fill={p.deep} {...pop(reduce, 0.25)} />
    </motion.g>
  </>
);

const Shield: G = ({ p, reduce }) => (
  <>
    <motion.path
      d="M32 6l20 8v16c0 12-8 22-20 28C20 52 12 42 12 30V14z"
      fill={p.fill}
      {...pop(reduce)}
    />
    <motion.path
      d="M32 6l20 8v16c0 12-8 22-20 28C20 52 12 42 12 30V14z"
      stroke={p.ink}
      strokeWidth="2.4"
      {...draw(reduce, 0.1)}
    />
    <motion.path
      d="M22 32l7 7 13-14"
      stroke={p.paper}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...draw(reduce, 0.5)}
    />
  </>
);

const Clock: G = ({ p, reduce, play }) => (
  <>
    <motion.circle cx="32" cy="34" r="22" fill={p.fill} {...pop(reduce)} />
    <motion.circle cx="32" cy="34" r="16" fill={p.paper} {...pop(reduce, 0.1)} />
    <motion.path d="M24 8h16" stroke={p.ink} {...stroke} {...draw(reduce, 0.15)} />
    <motion.path d="M32 34V24" stroke={p.ink} {...stroke} {...draw(reduce, 0.3)} />
    <motion.g
      style={{ transformOrigin: "32px 34px" }}
      {...loop(play, ["rotate(0deg)", "rotate(360deg)"], 6, { ease: "linear" })}
    >
      <motion.path
        d="M32 34l8 4"
        stroke={p.deep}
        strokeWidth="3"
        strokeLinecap="round"
        {...draw(reduce, 0.4)}
      />
    </motion.g>
    <motion.circle cx="32" cy="34" r="2.2" fill={p.ink} {...pop(reduce, 0.5)} />
  </>
);

const Spark: G = ({ p, reduce, play }) => (
  <>
    <motion.g
      style={{ transformOrigin: "30px 34px" }}
      {...loop(
        play,
        ["rotate(0deg) scale(1)", "rotate(8deg) scale(1.05)", "rotate(0deg) scale(1)"],
        3,
      )}
    >
      <motion.path d="M30 10l6 16 16 6-16 6-6 16-6-16-16-6 16-6z" fill={p.fill} {...pop(reduce)} />
    </motion.g>
    <motion.path d="M50 8l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill={p.deep} {...pop(reduce, 0.2)} />
    <motion.path
      d="M12 46l1.5 3.5L17 51l-3.5 1.5L12 56l-1.5-3.5L7 51l3.5-1.5z"
      fill={p.deep}
      {...pop(reduce, 0.3)}
    />
  </>
);

const Gift: G = ({ p, reduce, play }) => (
  <>
    <motion.rect x="10" y="26" width="44" height="30" rx="5" fill={p.fill} {...pop(reduce)} />
    <motion.rect x="28" y="26" width="8" height="30" fill={p.deep} {...pop(reduce, 0.15)} />
    <motion.g
      style={{ transformOrigin: "32px 26px" }}
      {...loop(play, ["rotate(0deg)", "rotate(-4deg)", "rotate(0deg)"], 2.8)}
    >
      <motion.rect
        x="6"
        y="16"
        width="52"
        height="12"
        rx="4"
        fill={p.fill}
        stroke={p.ink}
        strokeWidth="2.4"
        {...pop(reduce, 0.2)}
      />
      <motion.rect x="28" y="16" width="8" height="12" fill={p.deep} {...pop(reduce, 0.25)} />
      <motion.path
        d="M32 16c-4-8-14-8-12-2s10 2 12 2zm0 0c4-8 14-8 12-2s-10 2-12 2z"
        stroke={p.ink}
        {...stroke}
        fill={p.paper}
        {...draw(reduce, 0.35)}
      />
    </motion.g>
  </>
);

const Cart: G = ({ p, reduce, play }) => (
  <>
    <motion.path d="M6 10h8l6 28h28l6-20H18" stroke={p.ink} {...stroke} {...draw(reduce)} />
    <motion.path d="M20 18h32l-4.5 14H23z" fill={p.fill} {...pop(reduce, 0.2)} />
    <motion.circle cx="24" cy="50" r="4" fill={p.deep} {...pop(reduce, 0.4)} />
    <motion.circle cx="44" cy="50" r="4" fill={p.deep} {...pop(reduce, 0.45)} />
    <motion.g
      {...loop(play, ["translate3d(0,0,0)", "translate3d(0,-4px,0)", "translate3d(0,0,0)"], 2.2)}
    >
      <motion.path
        d="M46 4l1.5 3.5L51 9l-3.5 1.5L46 14l-1.5-3.5L41 9l3.5-1.5z"
        fill={p.deep}
        {...pop(reduce, 0.5)}
      />
    </motion.g>
  </>
);

const Search: G = ({ p, reduce, play }) => (
  <>
    <motion.g
      style={{ transformOrigin: "28px 28px" }}
      {...loop(play, ["translate3d(0,0,0)", "translate3d(3px,-3px,0)", "translate3d(0,0,0)"], 3)}
    >
      <motion.circle cx="28" cy="28" r="17" fill={p.fill} {...pop(reduce)} />
      <motion.circle cx="28" cy="28" r="10" fill={p.paper} {...pop(reduce, 0.12)} />
      <motion.circle
        cx="28"
        cy="28"
        r="17"
        stroke={p.ink}
        strokeWidth="2.4"
        {...draw(reduce, 0.1)}
      />
      <motion.path
        d="M41 41l14 14"
        stroke={p.ink}
        strokeWidth="5"
        strokeLinecap="round"
        {...draw(reduce, 0.4)}
      />
    </motion.g>
    <motion.path d="M24 28l3 3 6-6" stroke={p.deep} {...stroke} {...draw(reduce, 0.6)} />
  </>
);

const Layers: G = ({ p, reduce, play }) => (
  <>
    <motion.path
      d="M32 44L8 32l24-12 24 12z"
      fill={p.soft}
      stroke={p.ink}
      strokeWidth="2.4"
      {...pop(reduce)}
    />
    <motion.g
      {...loop(play, ["translate3d(0,0,0)", "translate3d(0,-3px,0)", "translate3d(0,0,0)"], 2.6)}
    >
      <motion.path
        d="M32 34L8 22l24-12 24 12z"
        fill={p.fill}
        stroke={p.ink}
        strokeWidth="2.4"
        {...pop(reduce, 0.15)}
      />
    </motion.g>
    <motion.g
      {...loop(play, ["translate3d(0,0,0)", "translate3d(0,-6px,0)", "translate3d(0,0,0)"], 2.6)}
    >
      <motion.path
        d="M32 24L8 12 32 0l24 12z"
        transform="translate(0 6)"
        fill={p.deep}
        stroke={p.ink}
        strokeWidth="2.4"
        {...pop(reduce, 0.3)}
      />
    </motion.g>
    <motion.path d="M8 44l24 12 24-12" stroke={p.ink} {...stroke} {...draw(reduce, 0.4)} />
  </>
);

const Handshake: G = ({ p, reduce }) => (
  <>
    <motion.path
      d="M6 24l12-8 14 6-8 8a4 4 0 005 6l10-8"
      stroke={p.ink}
      {...stroke}
      fill={p.fill}
      {...draw(reduce)}
    />
    <motion.path d="M58 24l-12-8-8 4" stroke={p.ink} {...stroke} {...draw(reduce, 0.2)} />
    <motion.path
      d="M14 40l6 6M20 36l6 6M26 32l6 6"
      stroke={p.ink}
      {...stroke}
      {...draw(reduce, 0.5)}
    />
    <motion.circle cx="12" cy="44" r="4" fill={p.deep} {...pop(reduce, 0.7)} />
    <motion.circle cx="52" cy="44" r="4" fill={p.deep} {...pop(reduce, 0.75)} />
  </>
);

const Edit: G = ({ p, reduce, play }) => (
  <>
    <motion.rect
      x="6"
      y="18"
      width="52"
      height="28"
      rx="5"
      fill={p.soft}
      stroke={p.ink}
      strokeWidth="2.4"
      {...pop(reduce)}
    />
    {[10, 26, 42].map((x, i) => (
      <motion.rect
        key={x}
        x={x}
        y="24"
        width={i === 1 ? "12" : "12"}
        height="16"
        rx="2"
        fill={i === 1 ? p.deep : p.fill}
        {...pop(reduce, 0.15 + i * 0.1)}
      />
    ))}
    <motion.g
      {...loop(play, ["translate3d(0,0,0)", "translate3d(28px,0,0)", "translate3d(0,0,0)"], 4)}
    >
      <motion.path d="M16 12v40" stroke={p.ink} {...stroke} {...draw(reduce, 0.4)} />
      <motion.path d="M11 8h10l-5 6z" fill={p.ink} {...pop(reduce, 0.5)} />
    </motion.g>
  </>
);

const Publish: G = ({ p, reduce, play }) => (
  <>
    <motion.path d="M10 46h44" stroke={p.ink} {...stroke} {...draw(reduce)} />
    <motion.rect x="14" y="50" width="36" height="6" rx="3" fill={p.soft} {...pop(reduce, 0.1)} />
    <motion.g
      {...loop(play, ["translate3d(0,0,0)", "translate3d(0,-6px,0)", "translate3d(0,0,0)"], 2.4)}
    >
      <motion.path
        d="M32 8l14 16H38v14h-12V24h-8z"
        fill={p.fill}
        stroke={p.ink}
        strokeWidth="2.4"
        {...pop(reduce, 0.2)}
      />
    </motion.g>
    <motion.path d="M50 14l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill={p.deep} {...pop(reduce, 0.5)} />
  </>
);

const Bulb: G = ({ p, reduce, play }) => (
  <>
    <motion.g
      style={{ transformOrigin: "32px 26px" }}
      {...loop(play, ["scale(1)", "scale(1.05)", "scale(1)"], 2.4)}
    >
      <motion.path
        d="M32 6a18 18 0 00-10 33c2 2 3 4 3 7h14c0-3 1-5 3-7A18 18 0 0032 6z"
        fill={p.fill}
        {...pop(reduce)}
      />
    </motion.g>
    <motion.path d="M26 50h12M28 56h8" stroke={p.ink} {...stroke} {...draw(reduce, 0.25)} />
    <motion.path
      d="M26 26l6 6 6-6"
      stroke={p.paper}
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...draw(reduce, 0.45)}
    />
    <motion.path
      d="M32 32v12"
      stroke={p.paper}
      strokeWidth="3.2"
      strokeLinecap="round"
      {...draw(reduce, 0.55)}
    />
    <motion.path
      d="M8 20l5 2M56 20l-5 2M32 2v-1"
      stroke={p.deep}
      {...stroke}
      {...draw(reduce, 0.7)}
    />
  </>
);

const Teleprompter: G = ({ p, reduce, play }) => (
  <>
    <motion.rect x="8" y="10" width="48" height="34" rx="6" fill={p.ink} {...pop(reduce)} />
    <motion.rect x="12" y="14" width="40" height="26" rx="3" fill={p.fill} {...pop(reduce, 0.1)} />
    <motion.g
      {...loop(play, ["translate3d(0,6px,0)", "translate3d(0,-8px,0)"], 4, { ease: "linear" })}
    >
      {[20, 26, 32].map((y, i) => (
        <motion.path
          key={y}
          d={`M18 ${y}h${i === 2 ? 18 : 28}`}
          stroke={p.paper}
          {...stroke}
          {...draw(reduce, 0.2 + i * 0.1)}
        />
      ))}
    </motion.g>
    <motion.rect x="12" y="14" width="40" height="4" fill={p.fill} {...pop(reduce, 0.1)} />
    <motion.rect x="12" y="36" width="40" height="4" fill={p.fill} {...pop(reduce, 0.1)} />
    <motion.path d="M32 44v8M22 56h20" stroke={p.ink} {...stroke} {...draw(reduce, 0.4)} />
  </>
);

const Light: G = ({ p, reduce, play }) => (
  <>
    <motion.path d="M16 10h32v22H16z" fill={p.ink} {...pop(reduce)} />
    <motion.g
      style={{ transformOrigin: "32px 21px" }}
      {...loop(play, ["scale(1)", "scale(1.04)", "scale(1)"], 2)}
    >
      <motion.rect
        x="20"
        y="14"
        width="24"
        height="14"
        rx="2"
        fill="#fff4cc"
        {...pop(reduce, 0.12)}
      />
    </motion.g>
    <motion.path
      d="M10 6l8 6M54 6l-8 6M10 36l8-4M54 36l-8-4"
      stroke={p.ink}
      {...stroke}
      {...draw(reduce, 0.2)}
    />
    <motion.path d="M32 32v18M24 56l8-6 8 6" stroke={p.ink} {...stroke} {...draw(reduce, 0.35)} />
    <motion.path d="M14 40l18 14 18-14" fill={p.fill} fillOpacity="0.35" {...pop(reduce, 0.5)} />
  </>
);

const GLYPHS: Record<GlyphName, G> = {
  reel: Reel,
  camera: Camera,
  library: Library,
  workflow: Workflow,
  script: Script,
  calendar: Calendar,
  mic: Mic,
  chart: Chart,
  chat: Chat,
  play: Play,
  pin: Pin,
  shield: Shield,
  clock: Clock,
  spark: Spark,
  gift: Gift,
  cart: Cart,
  search: Search,
  layers: Layers,
  handshake: Handshake,
  edit: Edit,
  publish: Publish,
  bulb: Bulb,
  teleprompter: Teleprompter,
  light: Light,
};

/** A glyph on a soft lane disc — the standard way to give a plain card a visual. */
export function GlyphBadge({
  name,
  lane = "spotlight",
  size = "md",
  className = "",
}: {
  name: GlyphName;
  lane?: PalAccent;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const box = size === "sm" ? "size-12" : size === "lg" ? "size-24" : "size-16";
  const glyph = size === "sm" ? "size-8" : size === "lg" ? "size-16" : "size-11";
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-[1.25rem] ${box} ${className}`}
      style={{ background: `var(--${lane}-soft)` }}
    >
      <Glyph name={name} lane={lane} className={glyph} />
    </span>
  );
}
