import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { buildVoiceImport, runImport } from "./natureworks-voice-import.mjs";

const fixture = JSON.parse(
  await readFile(new URL("../docs/clients/natureworks/howard-voice.json", import.meta.url), "utf8"),
);
const workspaceId = "10000000-0000-4000-8000-000000000001";
const userId = "20000000-0000-4000-8000-000000000002";
const row = () => ({
  id: "30000000-0000-4000-8000-000000000003",
  workspace_id: workspaceId,
  business_name: "NatureWorks",
  website: "https://www.gonatureworks.com",
  updated_at: "2026-09-14T12:00:00.000Z",
  voice_traits: ["Clear"],
  avoid_language: ["Unsupported promises"],
  content_examples: ["An existing writing sample."],
  brand_details: {
    aiRules: "Keep the existing instruction.",
    mission: "Existing mission",
    photography: "Existing photo direction",
    custom: { retained: true },
  },
  colors: { primary: "original-color" },
  fonts: { primary: "original-font" },
  visual_style: "original-style",
  offers: ["Existing service"],
  proof_points: ["Existing proof"],
  calls_to_action: ["Existing CTA"],
  personal_story: "Existing story",
});

test("voice import preserves existing identity, proof, offers and all other brand details", () => {
  const original = row();
  const snapshot = structuredClone(original);
  const { patch } = buildVoiceImport(original, fixture, workspaceId);
  assert.deepEqual(Object.keys(patch).sort(), [
    "avoid_language",
    "brand_details",
    "content_examples",
    "voice_traits",
  ]);
  assert.deepEqual(original, snapshot, "input must never be mutated");
  const merged = { ...original, ...patch };
  for (const key of [
    "colors",
    "fonts",
    "visual_style",
    "offers",
    "proof_points",
    "calls_to_action",
    "personal_story",
    "website",
    "business_name",
    "workspace_id",
  ]) {
    assert.deepEqual(merged[key], snapshot[key]);
  }
  for (const key of ["mission", "photography", "custom"])
    assert.deepEqual(patch.brand_details[key], original.brand_details[key]);
  assert.ok(patch.brand_details.aiRules.startsWith(original.brand_details.aiRules));
  assert.equal(patch.content_examples[0], original.content_examples[0]);
  assert.equal(patch.content_examples.length, 7);
});

test("repeating the exact import produces no changes or duplicate examples", () => {
  const original = row();
  const first = buildVoiceImport(original, fixture, workspaceId);
  const repeated = buildVoiceImport({ ...original, ...first.patch }, fixture, workspaceId);
  assert.deepEqual(repeated.changedFields, []);
  assert.deepEqual(repeated.patch, first.patch);
});

test("import rejects missing, different or ambiguous client identity", () => {
  assert.throws(
    () => buildVoiceImport({ ...row(), workspace_id: userId }, fixture, workspaceId),
    /selected workspace/,
  );
  assert.throws(
    () => buildVoiceImport({ ...row(), business_name: "Another client" }, fixture, workspaceId),
    /brand name/,
  );
  assert.throws(
    () =>
      buildVoiceImport(
        { ...row(), website: "https://gonatureworks.com.example.test" },
        fixture,
        workspaceId,
      ),
    /must already identify/,
  );
  assert.throws(
    () => buildVoiceImport({ ...row(), id: "" }, fixture, workspaceId),
    /existing brand/,
  );
});

test("a locally edited voice section or script is never overwritten", () => {
  const original = row();
  const { patch } = buildVoiceImport(original, fixture, workspaceId);
  const edited = {
    ...original,
    ...patch,
    brand_details: {
      ...patch.brand_details,
      aiRules: patch.brand_details.aiRules.replace("Character:", "Edited character:"),
    },
  };
  assert.throws(() => buildVoiceImport(edited, fixture, workspaceId), /edited after import/);
  const editedSample = {
    ...original,
    ...patch,
    content_examples: patch.content_examples.map((sample, index) =>
      index === 1 ? `${sample} Edited.` : sample,
    ),
  };
  assert.throws(() => buildVoiceImport(editedSample, fixture, workspaceId), /edited after import/);
});

test("field capacity conflicts and malformed saved details fail without truncation", () => {
  assert.throws(
    () =>
      buildVoiceImport(
        { ...row(), voice_traits: Array.from({ length: 12 }, (_, i) => `Existing ${i}`) },
        fixture,
        workspaceId,
      ),
    /exceed 12/,
  );
  assert.throws(
    () =>
      buildVoiceImport(
        { ...row(), avoid_language: Array.from({ length: 20 }, (_, i) => `Existing ${i}`) },
        fixture,
        workspaceId,
      ),
    /exceed 20/,
  );
  assert.throws(
    () => buildVoiceImport({ ...row(), brand_details: [] }, fixture, workspaceId),
    /must be an object/,
  );
  assert.throws(
    () => buildVoiceImport({ ...row(), content_examples: null }, fixture, workspaceId),
    /text array/,
  );
});

test("all 16 scripts retain draft attribution, provenance and complete spoken text", () => {
  assert.equal(fixture.examples.length, 16);
  assert.match(fixture.exampleAttribution, /Original drafts.*not quotations/);
  assert.equal(new Set(fixture.examples.map((item) => item.id)).size, 16);
  for (const item of fixture.examples) {
    assert.ok(item.hook && item.body && item.ending && item.sourceParagraphs.length);
    const spoken = [item.hook, item.body, item.ending].join(" ");
    const count = (spoken.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) ?? []).length;
    assert.equal(count, item.spokenWordCount, `${item.id} word count`);
  }
  assert.equal(fixture.scope, "voice-only");
  for (const key of ["colors", "fonts", "logo", "visual_style", "websiteDesign", "transcript"])
    assert.ok(!(key in fixture));
});

function environment() {
  return {
    STUDIO_WORKSPACE_ID: workspaceId,
    STUDIO_SUPABASE_URL: "https://studio.example.test",
    STUDIO_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test_only",
    STUDIO_USER_ACCESS_TOKEN: "test-only-user-token",
  };
}
function fakeBackend({
  role = "admin",
  profiles = [row()],
  update = [{ id: row().id, updated_at: "later" }],
} = {}) {
  const calls = [];
  return {
    calls,
    fetchImpl: async (url, options) => {
      calls.push({ url: new URL(url), ...options });
      let result;
      if (options.method === "PATCH") result = update;
      else if (url.pathname === "/auth/v1/user") result = { id: userId };
      else if (url.pathname === "/rest/v1/workspace_members") result = [{ role }];
      else if (url.pathname === "/rest/v1/brand_profiles") result = profiles;
      else throw new Error("Unexpected request");
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
  };
}

test("default preview only reads and prints no current private fields or credentials", async () => {
  const backend = fakeBackend();
  const printed = [];
  const result = await runImport({
    env: environment(),
    fetchImpl: backend.fetchImpl,
    print: (value) => printed.push(value),
  });
  assert.equal(result.status, "preview");
  assert.ok(backend.calls.every((call) => !call.method));
  const output = printed.join("\n");
  for (const excluded of [
    "original-color",
    "Existing mission",
    "Existing story",
    "test-only-user-token",
  ])
    assert.ok(!output.includes(excluded));
});

test("apply uses only the selected row and workspace with compare-and-swap revision", async () => {
  const backend = fakeBackend();
  const result = await runImport({
    env: { ...environment(), STUDIO_EXPECTED_UPDATED_AT: row().updated_at },
    args: ["--apply"],
    fetchImpl: backend.fetchImpl,
    print: () => {},
  });
  assert.equal(result.status, "applied");
  const update = backend.calls.find((call) => call.method === "PATCH");
  assert.equal(update.url.searchParams.get("id"), `eq.${row().id}`);
  assert.equal(update.url.searchParams.get("workspace_id"), `eq.${workspaceId}`);
  assert.equal(update.url.searchParams.get("updated_at"), `eq.${row().updated_at}`);
  assert.deepEqual(Object.keys(JSON.parse(update.body)).sort(), [
    "avoid_language",
    "brand_details",
    "content_examples",
    "voice_traits",
  ]);
});

test("member role, duplicate rows and stale preview cannot produce a write", async () => {
  for (const options of [{ role: "member" }, { profiles: [row(), row()] }, {}]) {
    const backend = fakeBackend(options);
    await assert.rejects(
      runImport({
        env: { ...environment(), STUDIO_EXPECTED_UPDATED_AT: "stale" },
        args: ["--apply"],
        fetchImpl: backend.fetchImpl,
        print: () => {},
      }),
    );
    assert.ok(backend.calls.every((call) => call.method !== "PATCH"));
  }
});

test("a concurrent update causing zero matched rows is not reported as success", async () => {
  const backend = fakeBackend({ update: [] });
  await assert.rejects(
    runImport({
      env: { ...environment(), STUDIO_EXPECTED_UPDATED_AT: row().updated_at },
      args: ["--apply"],
      fetchImpl: backend.fetchImpl,
      print: () => {},
    }),
    /changed or access was denied/,
  );
});

test("service-role credentials are rejected before any network call", async () => {
  const credential = `header.${Buffer.from(JSON.stringify({ role: "service_role" })).toString("base64url")}.signature`;
  await assert.rejects(
    runImport({
      env: { ...environment(), STUDIO_USER_ACCESS_TOKEN: credential },
      fetchImpl: () => {
        throw new Error("must not fetch");
      },
    }),
    /Service-role/,
  );
});
