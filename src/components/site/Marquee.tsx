import type { ReactNode } from "react";
import { useRef } from "react";
import { useInView, usePageInView } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/use-hydrated-reduced-motion";

export function Marquee({
  children,
  duration = "40s",
  reverse = false,
}: {
  children: ReactNode;
  duration?: string;
  reverse?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rootRef, { margin: "300px 0px" });
  const isPageInView = usePageInView();
  const reduce = useHydratedReducedMotion();
  const paused = reduce || !isInView || !isPageInView;

  return (
    <div ref={rootRef} className="relative overflow-hidden">
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
    </div>
  );
}
