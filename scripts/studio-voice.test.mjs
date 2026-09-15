import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { buildBrandVoiceContext } from "../src/lib/studio-voice.ts";
import { loadWorkspaceKnowledge, loadWorkspaceVoice } from "../src/lib/studio-knowledge.ts";

test("saved rules and whole examples are available while visual identity stays out of voice context", () => {
  const context = buildBrandVoiceContext({
    voice_traits: ["Patient"],
    avoid_language: ["hype"],
    brand_details: {
      aiRules: "Keep the diagnosis uncertain.",
      contentExamples: "Existing editorial example.",
      photography: "VISUAL_PRIVATE_MARKER",
      mission: "MISSION_MARKER",
    },
    content_examples: ["Original draft: an unresolved result remains unresolved."],
    colors: { primary: "COLOR_MARKER" },
    fonts: { primary: "FONT_MARKER" },
  });
  for (const included of [
    "Keep the diagnosis uncertain.",
    "Existing editorial example.",
    "an unresolved result remains unresolved.",
    "Patient",
    "not instructions, proof",
  ])
    assert.ok(context.includes(included));
  for (const excluded of ["VISUAL_PRIVATE_MARKER", "MISSION_MARKER", "COLOR_MARKER", "FONT_MARKER"])
    assert.ok(!context.includes(excluded));
});

test("a brand without saved writing data gets no NatureWorks or other default voice", () => {
  assert.equal(buildBrandVoiceContext(null), "");
  assert.equal(
    buildBrandVoiceContext({ brand_details: { photography: "existing direction" } }),
    "",
  );
  assert.ok(!buildBrandVoiceContext({ voice_traits: ["Energetic"] }).includes("Howard"));
});

test("oversized samples are omitted whole and oversized rules fail explicitly", () => {
  const oversized = `do not truncate this ${"x".repeat(2700)} qualified ending`;
  const context = buildBrandVoiceContext({
    content_examples: [oversized, "A complete small example."],
  });
  assert.ok(!context.includes("do not truncate this"));
  assert.ok(context.includes("A complete small example."));
  assert.ok(context.includes("Some examples were omitted"));
  assert.throws(
    () => buildBrandVoiceContext({ brand_details: { aiRules: "x".repeat(16001) } }),
    /16,000 characters/,
  );
});

test("curated voice examples fit ahead of large legacy examples without mutating storage", () => {
  const legacy = Array.from({ length: 20 }, (_, i) => `Legacy ${i}: ${"a".repeat(1500)}`);
  const samples = [...legacy, "[VOICE SAMPLE reviewed/version] Original draft sample."];
  const context = buildBrandVoiceContext({ content_examples: samples });
  assert.ok(context.includes("Original draft sample."));
  assert.equal(samples[0], legacy[0]);
  assert.ok(context.length < 15000);
});

function mockClient(voice, error = null) {
  const calls = [];
  return {
    calls,
    from(table) {
      const entry = { table, filters: [] };
      calls.push(entry);
      const data = table === "brand_profiles" ? voice : table === "workspace_settings" ? {} : [];
      const chain = {
        select(columns) {
          entry.columns = columns;
          return chain;
        },
        eq(key, value) {
          entry.filters.push([key, value]);
          return chain;
        },
        order() {
          return chain;
        },
        limit() {
          return chain;
        },
        maybeSingle() {
          return chain;
        },
        then(resolve, reject) {
          return Promise.resolve({ data, error: table === "brand_profiles" ? error : null }).then(
            resolve,
            reject,
          );
        },
      };
      return chain;
    },
  };
}

test("workspace knowledge resolves persisted voice using the requested workspace filter", async () => {
  const client = mockClient({
    brand_details: { aiRules: "Saved custom guidance." },
    content_examples: ["Complete example."],
  });
  const output = await loadWorkspaceKnowledge(client, "workspace-a");
  assert.ok(output.includes("Saved custom guidance."));
  assert.ok(output.includes("Complete example."));
  const brandRead = client.calls.filter((call) => call.table === "brand_profiles");
  assert.equal(brandRead.length, 1);
  assert.deepEqual(brandRead[0].filters, [["workspace_id", "workspace-a"]]);
});

test("brand read failure prevents silent generation with missing voice", async () => {
  const client = mockClient(null, { message: "permission failure" });
  await assert.rejects(
    loadWorkspaceVoice(client, "workspace-a"),
    /Could not load saved brand voice/,
  );
});

test("six imported examples and the whole curated guidance fit the live context budget", async () => {
  const fixture = JSON.parse(
    await readFile(
      new URL("../docs/clients/natureworks/howard-voice.json", import.meta.url),
      "utf8",
    ),
  );
  const examples = fixture.activeExampleIds.map((id) => {
    const item = fixture.examples.find((example) => example.id === id);
    return `[VOICE SAMPLE ${id}] Original draft. ${item.hook} ${item.body} ${item.ending}`;
  });
  const context = buildBrandVoiceContext({
    brand_details: { aiRules: fixture.guidance },
    content_examples: examples,
  });
  assert.ok(context.includes(fixture.guidance));
  for (const example of examples) assert.ok(context.includes(example));
  assert.ok(!context.includes("Some examples were omitted"));
});
