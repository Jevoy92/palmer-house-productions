import type { ReactNode } from "react";

export function Marquee({
  children,
  duration = "40s",
  reverse = false,
}: {
  children: ReactNode;
  duration?: string;
  reverse?: boolean;
}) {
  return (
    <div className="relative overflow-hidden">
      <div
        className="animate-marquee flex w-max gap-4"
        style={{
          ["--marquee-duration" as string]: duration,
          animationDirection: reverse ? "reverse" : "normal",
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
