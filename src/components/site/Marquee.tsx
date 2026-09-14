import type { ReactNode } from "react";

export function Marquee({ children }: { children: ReactNode }) {
  return (
    <div
      role="region"
      aria-label="Selected productions. Scroll horizontally to browse."
      tabIndex={0}
      className="relative overflow-x-auto overscroll-x-contain px-4 pb-5"
    >
      <div className="flex w-max gap-4">{children}</div>
    </div>
  );
}
