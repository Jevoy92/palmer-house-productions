import assert from "node:assert/strict";
import { test } from "node:test";
import { parseDemoCampaign } from "./expo-demo-validation.ts";

function campaign(): Record<string, unknown> & { artifacts: Record<string, unknown>[] } {
  const common = {
    title: "A local story",
    cta: "Visit us",
    strategy: "Invite a first visit",
    caption: "",
  };
  return {
    headline: "An afternoon well spent",
    centralIdea: "Invite neighbors in for an afternoon coffee.",
    audience: "Neighbors",
    goal: "Afternoon visits",
    artifacts: [
      {
        ...common,
        id: "ig",
        type: "instagram",
        stage: "stop",
        caption: "Come by this afternoon",
        imagePrompt: "A cup of coffee",
      },
      {
        ...common,
        id: "reel",
        type: "reel",
        stage: "stop",
        caption: "See the cafe",
        hook: "Take a break",
        beats: Array.from({ length: 5 }, () => ({
          visual: "Coffee being poured",
          voice: "Take a moment",
          onScreen: "A quiet afternoon",
        })),
      },
      {
        ...common,
        id: "carousel",
        type: "carousel",
        stage: "matter",
        caption: "Find your afternoon",
        slides: Array.from({ length: 5 }, () => ({
          heading: "A moment to pause",
          body: "Visit the cafe this afternoon.",
        })),
      },
      { ...common, id: "linkedin", type: "linkedin", stage: "matter", body: "Meet the cafe." },
      {
        ...common,
        id: "youtube",
        type: "youtube",
        stage: "invite",
        body: "Welcome inside.",
        thumbnailText: "Your afternoon",
      },
      {
        ...common,
        id: "extra",
        type: "extra",
        stage: "invite",
        body: "What to expect on a first visit.",
      },
    ],
  };
}

const incompleteMessage = /The campaign came back incomplete.*example campaign/;

test("accepts a complete campaign, including empty captions on text pieces", () => {
  assert.deepEqual(parseDemoCampaign(campaign()), campaign());
});

test("rejects non-object and incomplete campaign responses with a useful error", () => {
  for (const value of [null, undefined, [], {}, { artifacts: [] }, { artifacts: [{}] }]) {
    assert.throws(() => parseDemoCampaign(value), incompleteMessage);
  }
});

test("requires all six supported artifact types exactly once", () => {
  const missing = campaign();
  missing.artifacts.pop();
  assert.throws(() => parseDemoCampaign(missing), incompleteMessage);
  const duplicate = campaign();
  duplicate.artifacts[5] = { ...duplicate.artifacts[0], id: "another" };
  assert.throws(() => parseDemoCampaign(duplicate), incompleteMessage);
  const unknown = campaign();
  unknown.artifacts[0].type = "facebook";
  assert.throws(() => parseDemoCampaign(unknown), incompleteMessage);
});

test("rejects duplicate or blank artifact IDs and invalid stages", () => {
  for (const [field, value] of [
    ["id", "ig"],
    ["id", "  "],
    ["stage", "unknown"],
  ]) {
    const invalid = campaign();
    invalid.artifacts[1][field!] = value;
    assert.throws(() => parseDemoCampaign(invalid), incompleteMessage);
  }
});

test("requires the content each artifact renders", () => {
  for (const [index, field] of [
    [0, "imagePrompt"],
    [0, "caption"],
    [1, "hook"],
    [3, "body"],
    [4, "thumbnailText"],
    [5, "body"],
  ] as const) {
    const invalid = campaign();
    delete invalid.artifacts[index][field];
    assert.throws(() => parseDemoCampaign(invalid), incompleteMessage);
  }
  const invalid = campaign();
  invalid.headline = { unsafe: "React cannot render this" };
  assert.throws(() => parseDemoCampaign(invalid), incompleteMessage);
});

test("rejects malformed and incomplete reel beats or carousel slides", () => {
  for (const [index, field] of [
    [1, "beats"],
    [2, "slides"],
  ] as const) {
    for (const value of [
      "not an array",
      [],
      [{ wrong: "shape" }],
      (campaign().artifacts[index][field] as unknown[]).slice(0, 4),
    ]) {
      const invalid = campaign();
      invalid.artifacts[index][field] = value;
      assert.throws(() => parseDemoCampaign(invalid), incompleteMessage);
    }
  }
  const invalid = campaign();
  (invalid.artifacts[1].beats as Record<string, unknown>[])[0].voice = { unsafe: "object" };
  assert.throws(() => parseDemoCampaign(invalid), incompleteMessage);
});

test("strips unexpected fields so they cannot reach generic artifact rendering", () => {
  const input = campaign();
  input.artifacts[0].beats = { unexpected: "not a reel" };
  assert.equal(parseDemoCampaign(input).artifacts[0].beats, undefined);
});
