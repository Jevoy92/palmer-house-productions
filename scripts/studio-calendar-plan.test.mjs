import test from "node:test";
import assert from "node:assert/strict";
import {
  buildMonthPlan,
  shiftCalendarPeriod,
  channelForAsset,
} from "../src/lib/studio-calendar-plan.ts";
const assets = Array.from({ length: 10 }, (_, i) => ({
  id: `draft-${i}`,
  kind: "caption",
  title: `Post ${i}`,
  campaign_id: "campaign",
  metadata: { platform: "Instagram" },
}));

test("month planning uses remaining future days without spilling into the next month", () => {
  const now = new Date(2026, 8, 27, 22);
  const plan = buildMonthPlan(assets, [], now, now);
  assert.equal(plan.items.length, 3);
  assert.deepEqual(
    plan.items.map((item) => new Date(item.publishAt).getDate()),
    [28, 29, 30],
  );
  assert(plan.items.every((item) => new Date(item.publishAt) > now));
});
test("past months and a completed final publishing day cannot generate backdated posts", () => {
  const now = new Date(2026, 8, 30, 18);
  assert.equal(buildMonthPlan(assets, [], new Date(2026, 7, 1), now).reason, "past");
  assert.equal(buildMonthPlan(assets, [], now, now).reason, "past");
});
test("future plans span the selected month and omit already scheduled drafts", () => {
  const plan = buildMonthPlan(
    assets,
    [{ asset_id: "draft-0", publish_at: new Date(2026, 9, 4).toISOString() }],
    new Date(2026, 9, 31),
    new Date(2026, 8, 27),
  );
  assert.equal(plan.items.length, 8);
  assert(!plan.items.some((item) => item.asset.id === "draft-0"));
  assert.equal(new Date(plan.items.at(-1).publishAt).getDate(), 31);
  assert(plan.items.every((item) => new Date(item.publishAt).getMonth() === 9));
});
test("month navigation from January 31 does not skip February", () => {
  const next = shiftCalendarPeriod(new Date(2026, 0, 31), 1, "month");
  assert.equal(next.getMonth(), 1);
  assert.equal(next.getDate(), 1);
});
test("platform-less posts and standalone media are not silently assigned to Facebook", () => {
  assert.equal(channelForAsset({ kind: "caption", metadata: {} }), null);
  assert.equal(channelForAsset({ kind: "image", metadata: { platform: "Instagram" } }), null);
  assert.equal(channelForAsset({ kind: "document", metadata: {} }), null);
  assert.equal(channelForAsset({ kind: "anchor_script", metadata: {} }), "YouTube");
});
