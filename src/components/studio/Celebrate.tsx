import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useStudioMotion } from "./studio-motion";

const LANE_COLORS = ["#3d1a66", "#e8720c", "#5b8a2d", "#0a9b8f"];

export type CelebrationDetail = {
  title: string;
  detail?: string;
  colors?: string[];
};

type Milestone = CelebrationDetail & { id: number };
const EVENT = "phs:celebrate";
let counter = 0;

/** Announce a completed action without interrupting the work. */
export function celebrate(detail: CelebrationDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<CelebrationDetail>(EVENT, { detail }));
}

/** Announce a milestone only once per workspace. */
export function celebrateOnce(key: string, detail: CelebrationDetail) {
  if (typeof window === "undefined") return;
  const storageKey = `phs.celebrated.${key}`;
  try {
    if (window.localStorage.getItem(storageKey) === "1") return;
    window.localStorage.setItem(storageKey, "1");
  } catch {
    // Completion feedback still works if local storage is unavailable.
  }
  celebrate(detail);
}

export function CelebrationLayer() {
  const { enter, exit, transition } = useStudioMotion();
  const [latest, setLatest] = useState<Milestone | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    function onCelebrate(event: Event) {
      const detail = (event as CustomEvent<CelebrationDetail>).detail;
      if (!detail?.title) return;
      clearTimeout(timeout);
      counter += 1;
      setLatest({ ...detail, id: counter });
      timeout = setTimeout(() => setLatest(null), 3200);
    }
    window.addEventListener(EVENT, onCelebrate);
    return () => {
      window.removeEventListener(EVENT, onCelebrate);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {latest ? (
        <motion.div
          key={latest.id}
          initial={enter}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          exit={exit}
          transition={transition}
          className="pointer-events-none fixed inset-x-0 top-6 z-[96] flex justify-center px-4"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="flex max-w-md items-center gap-3 rounded-2xl border border-border bg-white px-5 py-3.5 shadow-soft">
            <span className="flex shrink-0 gap-1" aria-hidden="true">
              {(latest.colors?.length ? latest.colors : LANE_COLORS)
                .slice(0, 4)
                .map((color, index) => (
                  <span
                    key={color + index}
                    className="size-2.5 rounded-full"
                    style={{ background: color }}
                  />
                ))}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold">{latest.title}</span>
              {latest.detail ? (
                <span className="block text-xs text-muted-foreground">{latest.detail}</span>
              ) : null}
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
