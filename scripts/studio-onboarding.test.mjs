import test from "node:test";
import assert from "node:assert/strict";
import {
  studioSetupSteps,
  hasEstablishedStudio,
  parseStudioGuidePreference,
  studioGuideStorageKey,
} from "../src/lib/studio-onboarding.ts";
import { palActivityCopy } from "../src/lib/pal-activity.ts";
const empty = { references: 0, assets: 0, campaigns: 0, calendar: 0 };
test("new member checklist uses actual saved work and no click-to-complete state", () => {
  assert.equal(studioSetupSteps(empty).filter((s) => s.done).length, 0);
  const facts = {
    ...empty,
    brand: { description: "A bakery", primary_audience: "Neighbors" },
    references: 1,
    assets: 1,
    calendar: 1,
  };
  assert.equal(studioSetupSteps(facts).filter((s) => s.done).length, 4);
  assert.equal(
    studioSetupSteps({ ...empty, brand: { description: "   ", primary_audience: "Neighbors" } })[0]
      .done,
    false,
  );
  assert.equal(hasEstablishedStudio(empty), false);
  assert.equal(hasEstablishedStudio({ ...empty, campaigns: 1 }), true);
});
test("guide preferences are versioned per member and workspace and malformed values fail safely", () => {
  assert.notEqual(studioGuideStorageKey("one", "a"), studioGuideStorageKey("one", "b"));
  assert.notEqual(studioGuideStorageKey("one", "a"), studioGuideStorageKey("two", "a"));
  for (const raw of [
    null,
    "oops",
    '{"version":1,"dismissedWelcome":true}',
    '{"version":2,"dismissedWelcome":"yes"}',
  ])
    assert.equal(parseStudioGuidePreference(raw).dismissedWelcome, false);
  assert.equal(
    parseStudioGuidePreference('{"version":2,"dismissedWelcome":true,"viewedTour":true}')
      .viewedTour,
    true,
  );
});
test("each real task has its own visual motif and all eight Pals retain distinct language", () => {
  const pals = ["kiana", "kareem", "ryder", "raquel", "cyrus", "clara", "silas", "samira"];
  const shapes = new Set();
  for (const task of ["reply", "image", "campaign", "pdf"]) {
    const outputs = pals.map((pal) => palActivityCopy(pal, task));
    assert.equal(new Set(outputs.map((v) => v.voice)).size, 8);
    for (const output of outputs)
      assert.doesNotMatch(
        output.voice + output.detail + output.next,
        /\b\d+%|researched|browsing|already saved|complete/i,
      );
    shapes.add(outputs[0].shape);
  }
  assert.equal(shapes.size, 4);
});
