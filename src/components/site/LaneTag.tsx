import type { ReactNode } from "react";

export type MarketingLane = "reel" | "spotlight" | "evergreen" | "system";

export function LaneTag({
  children,
  lane = "spotlight",
}: {
  children: ReactNode;
  lane?: MarketingLane;
}) {
  return (
    <span
      data-lane={lane}
      className="marketing-lane inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold"
      style={{
        backgroundColor: "var(--lane-soft)",
        color: "var(--lane-ink)",
        borderColor: "color-mix(in srgb, var(--lane) 24%, transparent)",
      }}
    >
      <span
        className="size-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: "var(--lane)" }}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
