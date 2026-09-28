type PlanAsset = {
  id: string;
  kind: string;
  title: string;
  campaign_id: string | null;
  metadata: unknown;
};
type PlannedItem = { asset_id: string | null; publish_at: string };

export function channelForAsset(asset: Pick<PlanAsset, "kind" | "metadata">): string | null {
  if (["image", "document"].includes(asset.kind)) return null;
  const metadata =
    asset.metadata && typeof asset.metadata === "object" && !Array.isArray(asset.metadata)
      ? (asset.metadata as Record<string, unknown>)
      : {};
  if (typeof metadata.platform === "string" && metadata.platform.trim())
    return metadata.platform.trim();
  const channels: Record<string, string> = {
    newsletter: "Email",
    anchor_script: "YouTube",
    short_script: "Instagram",
    article: "Website",
  };
  return channels[asset.kind] ?? null;
}

/** Spread saved, usable drafts over the remaining days. Never schedule into the past. */
export function buildMonthPlan(
  assets: PlanAsset[],
  calendar: PlannedItem[],
  focus: Date,
  now = new Date(),
) {
  const year = focus.getFullYear(),
    month = focus.getMonth();
  const end = new Date(year, month + 1, 0, 10);
  const start = new Date(year, month, 1, 10);
  if (start <= now) {
    start.setDate(now.getDate());
    if (start <= now) start.setDate(start.getDate() + 1);
  }
  if (new Date(year, month + 1, 1) <= now || start > end)
    return { items: [], reason: "past" as const };
  const used = new Set(
    calendar
      .filter((item) => {
        const date = new Date(item.publish_at);
        return date.getFullYear() === year && date.getMonth() === month;
      })
      .map((item) => item.asset_id),
  );
  const available = assets.filter((asset) => !used.has(asset.id) && channelForAsset(asset));
  const dayCount = end.getDate() - start.getDate() + 1;
  const chosen = available.slice(0, Math.min(8, dayCount));
  const items = chosen.map((asset, index) => {
    const date = new Date(start);
    date.setDate(
      start.getDate() +
        (chosen.length > 1 ? Math.floor((index * (dayCount - 1)) / (chosen.length - 1)) : 0),
    );
    return { asset, channel: channelForAsset(asset)!, publishAt: date.toISOString() };
  });
  return { items, reason: items.length ? ("ready" as const) : ("empty" as const) };
}

export function shiftCalendarPeriod(
  focus: Date,
  direction: number,
  mode: "month" | "week" | "list",
) {
  const next = new Date(focus);
  if (mode === "week") next.setDate(next.getDate() + direction * 7);
  else {
    next.setDate(1);
    next.setMonth(next.getMonth() + direction);
  }
  return next;
}
