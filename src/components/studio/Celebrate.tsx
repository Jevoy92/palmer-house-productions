import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Brand-native celebration layer. Fires a burst of Pal-lane confetti plus a
 * short banner so finishing something inside Studio feels like a real moment
 * instead of a silent state change.
 */

const LANE_COLORS = ["#3d1a66", "#e8720c", "#5b8a2d", "#0a9b8f"];

export type CelebrationDetail = {
  title: string;
  detail?: string;
  colors?: string[];
};

type Burst = CelebrationDetail & { id: number };

const EVENT = "phs:celebrate";

let counter = 0;

/** Fire a celebration from anywhere in Studio. */
export function celebrate(detail: CelebrationDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<CelebrationDetail>(EVENT, { detail }));
}

/**
 * Fires a celebration only the first time a milestone happens per workspace.
 * Keeps repeat visits quiet instead of confetti on every page load.
 */
export function celebrateOnce(key: string, detail: CelebrationDetail) {
  if (typeof window === "undefined") return;
  const storageKey = `phs.celebrated.${key}`;
  if (window.localStorage.getItem(storageKey) === "1") return;
  window.localStorage.setItem(storageKey, "1");
  celebrate(detail);
}

function Confetti({ colors }: { colors: string[] }) {
  const pieces = Array.from({ length: 54 }, (_, index) => {
    const angle = (index / 54) * Math.PI * 2 + Math.random() * 0.4;
    const distance = 140 + Math.random() * 340;
    return {
      id: index,
      color: colors[index % colors.length],
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance * 0.75 - 60,
      rotate: Math.random() * 720 - 360,
      delay: Math.random() * 0.12,
      round: index % 3 === 0,
      size: 7 + Math.random() * 7,
    };
  });

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[38%] z-[95] grid place-items-center">
      <div className="relative size-0">
        {pieces.map((piece) => (
          <motion.span
            key={piece.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.4, rotate: 0 }}
            animate={{
              opacity: [1, 1, 0],
              x: piece.x,
              y: [0, piece.y, piece.y + 260],
              scale: 1,
              rotate: piece.rotate,
            }}
            transition={{ duration: 1.5 + Math.random() * 0.5, ease: "easeOut", delay: piece.delay }}
            className="absolute block"
            style={{
              width: piece.size,
              height: piece.round ? piece.size : piece.size * 0.45,
              borderRadius: piece.round ? 9999 : 2,
              background: piece.color,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function CelebrationLayer() {
  const reduce = useReducedMotion();
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    function onCelebrate(event: Event) {
      const detail = (event as CustomEvent<CelebrationDetail>).detail;
      if (!detail?.title) return;
      counter += 1;
      const burst: Burst = { ...detail, id: counter };
      setBursts((current) => [...current, burst]);
      window.setTimeout(
        () => setBursts((current) => current.filter((item) => item.id !== burst.id)),
        3200,
      );
    }
    window.addEventListener(EVENT, onCelebrate);
    return () => window.removeEventListener(EVENT, onCelebrate);
  }, []);

  const latest = bursts[bursts.length - 1];

  return (
    <>
      {!reduce
        ? bursts.map((burst) => (
            <Confetti key={burst.id} colors={burst.colors?.length ? burst.colors : LANE_COLORS} />
          ))
        : null}

      <AnimatePresence>
        {latest ? (
          <motion.div
            key={latest.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="pointer-events-none fixed inset-x-0 top-6 z-[96] flex justify-center px-4"
            role="status"
            aria-live="polite"
          >
            <div className="flex max-w-md items-center gap-3 rounded-2xl border border-border bg-white px-5 py-3.5 shadow-[0_30px_90px_-40px_rgba(31,35,40,.8)]">
              <span className="flex shrink-0 gap-1">
                {(latest.colors?.length ? latest.colors : LANE_COLORS).slice(0, 4).map((color) => (
                  <span
                    key={color}
                    className="size-2.5 rounded-full"
                    style={{ background: color }}
                  />
                ))}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-black tracking-[-.02em]">{latest.title}</span>
                {latest.detail ? (
                  <span className="block text-xs text-muted-foreground">{latest.detail}</span>
                ) : null}
              </span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
