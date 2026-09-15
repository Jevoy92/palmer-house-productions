import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useInView, usePageInView } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/use-hydrated-reduced-motion";

/**
 * Auto-scrolling strip that respects WCAG 2.2.2: it pauses off-screen, on hover,
 * while anything inside has focus, under reduced motion, and via an explicit
 * pause/play control. `label` names the strip for assistive tech.
 */
export function Marquee({
  children,
  duration = "40s",
  reverse = false,
  label = "Scrolling gallery",
}: {
  children: ReactNode;
  duration?: string;
  reverse?: boolean;
  label?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rootRef, { margin: "300px 0px" });
  const isPageInView = usePageInView();
  const reduce = useHydratedReducedMotion();
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const paused = reduce || userPaused || hovering || focused || !isInView || !isPageInView;

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label={label}
      className="relative overflow-hidden"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div
        className="animate-marquee flex w-max gap-4"
        style={{
          ["--marquee-duration" as string]: duration,
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState: paused ? "paused" : undefined,
        }}
      >
        <div className="flex shrink-0 gap-4">{children}</div>
        <div className="flex shrink-0 gap-4" aria-hidden>
          {children}
        </div>
      </div>
      {!reduce && (
        <button
          type="button"
          onClick={() => setUserPaused((v) => !v)}
          aria-pressed={userPaused}
          aria-label={userPaused ? "Play scrolling gallery" : "Pause scrolling gallery"}
          className="absolute bottom-3 right-3 z-10 grid size-11 place-items-center rounded-full border border-white/70 bg-white/90 text-ink shadow-soft backdrop-blur transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotlight/40"
        >
          {userPaused ? (
            <Play className="size-4" aria-hidden />
          ) : (
            <Pause className="size-4" aria-hidden />
          )}
        </button>
      )}
    </div>
  );
}
