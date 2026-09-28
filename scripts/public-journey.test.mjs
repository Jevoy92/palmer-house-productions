import test from "node:test";
import assert from "node:assert/strict";
import {
  parseInquiryIntent,
  inquiryIntents,
  parseStudioPurchaseIntent,
  readStoredStudioIntent,
  productionDraft,
  currentStudioIntent,
  studioAuthReturnUrl,
  clearStudioIntent,
  studioIntentKey,
} from "../src/lib/public-journey.ts";
test("only supported inquiry and plan choices carry through public routes", () => {
  for (const intent of Object.keys(inquiryIntents))
    assert.equal(parseInquiryIntent(intent), intent);
  for (const bad of ["__proto__", "constructor", "unknown", {}, null])
    assert.equal(parseInquiryIntent(bad), undefined);
  assert.deepEqual(parseStudioPurchaseIntent({ plan: "business", interval: "year" }), {
    plan: "business",
    interval: "year",
  });
  for (const bad of [
    { plan: ["business"], interval: "year" },
    { plan: "business", interval: "weekly" },
    { plan: "admin", interval: "month" },
    {},
  ])
    assert.equal(parseStudioPurchaseIntent(bad), null);
});
test("saved purchase choices expire and never become arbitrary redirects", () => {
  const now = 100000;
  const value = { plan: "partner", interval: "month", expiresAt: now + 86400000 };
  assert.deepEqual(readStoredStudioIntent(JSON.stringify(value), now), {
    plan: "partner",
    interval: "month",
  });
  for (const raw of [
    null,
    "bad",
    JSON.stringify({ ...value, expiresAt: now }),
    JSON.stringify({ ...value, expiresAt: now + 86400001 }),
    JSON.stringify({ ...value, plan: "https://elsewhere.example" }),
  ])
    assert.equal(readStoredStudioIntent(raw, now), null);
});
test("production draft validates count/session bounds without altering cart", () => {
  assert.deepEqual(productionDraft({ count: "12", sessions: "3" }), { count: 12, sessions: 3 });
  assert.deepEqual(productionDraft({ count: 0, sessions: 4 }), { count: 0, sessions: 4 });
  for (const bad of [true, -1, 21, 1.5, "", "bad"])
    assert.equal(productionDraft({ count: bad }).count, undefined);
  for (const bad of [true, 0, 5, 1.5, "bad"])
    assert.equal(productionDraft({ sessions: bad }).sessions, undefined);
});
test("auth retains selected plan and term for review, and explicit clear removes them", () => {
  const data = new Map();
  let replaced = "";
  global.window = {
    location: {
      origin: "https://palmer.example",
      search: "?plan=business&interval=year",
      href: "https://palmer.example/studio/billing?plan=business&interval=year",
    },
    localStorage: {
      setItem: (k, v) => data.set(k, v),
      getItem: (k) => data.get(k) ?? null,
      removeItem: (k) => data.delete(k),
    },
    history: {
      state: {},
      replaceState: (_state, _title, url) => {
        replaced = String(url);
      },
    },
  };
  assert.deepEqual(currentStudioIntent(), { plan: "business", interval: "year" });
  assert.equal(
    studioAuthReturnUrl(),
    "https://palmer.example/studio/billing?plan=business&interval=year",
  );
  assert.ok(data.has(studioIntentKey));
  window.location.search = "";
  assert.deepEqual(currentStudioIntent(), { plan: "business", interval: "year" });
  clearStudioIntent();
  assert.equal(data.has(studioIntentKey), false);
  assert.equal(replaced, "https://palmer.example/studio/billing");
  assert.equal(studioAuthReturnUrl(), "https://palmer.example/studio");
  delete global.window;
});
