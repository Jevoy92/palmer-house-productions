import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { webcrypto } from "node:crypto";
import ts from "typescript";
import { z } from "zod";
import {
  loadWorkspaceMemory,
  buildWorkspaceMemoryContext,
  MemoryInputSchema,
} from "../src/lib/studio-memory.ts";
import { loadWorkspaceKnowledge } from "../src/lib/studio-knowledge.ts";
import { palNames } from "../src/lib/studio-model.ts";
const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");
const workspaceId = "11111111-1111-4111-8111-111111111111",
  otherWorkspaceId = "22222222-2222-4222-8222-222222222222";
const userId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
  memoryId = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";
const auth = { workspaceId, accessToken: "synthetic-token-not-a-credential" };
function loader(overrides = {}, globals = {}) {
  const cache = new Map();
  function load(filename) {
    filename = path.resolve(root, filename);
    if (!filename.endsWith(".ts")) filename += ".ts";
    if (cache.has(filename)) return cache.get(filename).exports;
    const module = { exports: {} };
    cache.set(filename, module);
    const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    }).outputText;
    vm.runInNewContext(
      output,
      {
        module,
        exports: module.exports,
        Buffer,
        Uint8Array,
        URL,
        AbortSignal,
        crypto: webcrypto,
        console,
        process: { env: {} },
        ...globals,
        require(name) {
          if (name in overrides) return overrides[name];
          if (name === "@tanstack/react-start")
            return {
              createServerFn() {
                return {
                  validator(schema) {
                    return {
                      handler(fn) {
                        return ({ data }) => fn({ data: schema.parse(data) });
                      },
                    };
                  },
                };
              },
            };
          if (name.startsWith("./")) return load(path.resolve(path.dirname(filename), name));
          return require(name);
        },
      },
      { filename },
    );
    return module.exports;
  }
  return load;
}
function fixture() {
  const state = {
    entries: [
      {
        id: memoryId,
        workspace_id: workspaceId,
        title: "Audience",
        content: "REMEMBER_EARLY_COMMUTERS",
        revision: 1,
        created_by: userId,
        created_at: "2026-09-27T10:00:00Z",
        updated_at: "2026-09-27T10:00:00Z",
      },
    ],
    legacy: { older: "UNREVIEWED_NOTE" },
    error: null,
    calls: [],
    messages: [
      {
        id: "msg-user",
        workspace_id: workspaceId,
        conversation_id: "thread-one",
        role: "user",
        pal: "kiana",
        body: "USER_SHARED_FACT",
        created_at: "2026-09-27T10:00:00Z",
        conversations: { title: "Coffee mornings", archived: false },
      },
      {
        id: "msg-ai",
        workspace_id: workspaceId,
        conversation_id: "thread-two",
        role: "assistant",
        pal: "ryder",
        body: "ASSISTANT_GUESS",
        created_at: "2026-09-27T10:01:00Z",
        conversations: { title: "Draft ideas", archived: false },
      },
      {
        id: "msg-archived",
        workspace_id: workspaceId,
        role: "user",
        body: "ARCHIVED_NOTE",
        conversations: { title: "Closed", archived: true },
      },
    ],
  };
  const brand = {
    business_name: "Fixture",
    voice_traits: [],
    avoid_language: [],
    offers: [],
    proof_points: [],
    calls_to_action: [],
    platforms: [],
  };
  const client = {
    auth: { getUser: async () => ({ data: { user: { id: userId } }, error: null }) },
    from(table) {
      const filters = [];
      let limit = Infinity;
      const call = { table, filters };
      state.calls.push(call);
      const chain = {
        select() {
          return chain;
        },
        eq(key, value) {
          filters.push([key, value]);
          return chain;
        },
        order() {
          return chain;
        },
        limit(value) {
          limit = value;
          return chain;
        },
        maybeSingle() {
          return chain;
        },
        single() {
          return chain;
        },
        then(resolve, reject) {
          let data =
            table === "workspace_memories"
              ? state.entries
                  .filter((entry) => filters.every(([key, value]) => entry[key] === value))
                  .slice(0, limit)
              : table === "workspace_settings"
                ? { ai_memory: state.legacy }
                : table === "assistant_messages"
                  ? state.messages
                      .filter((entry) => filters.every(([key, value]) => entry[key] === value))
                      .slice(0, limit)
                  : table === "brand_profiles"
                    ? brand
                    : table === "workspace_members"
                      ? { role: "owner" }
                      : [];
          return Promise.resolve({
            data,
            error: table === "workspace_memories" ? state.error : null,
          }).then(resolve, reject);
        },
      };
      return chain;
    },
    async rpc(name, args) {
      if (name === "forget_workspace_memory") {
        const index = state.entries.findIndex(
          (entry) =>
            entry.workspace_id === args.target_workspace_id &&
            entry.id === args.memory_id &&
            entry.revision === args.expected_revision,
        );
        if (index < 0)
          return {
            error: { message: "Memory changed or was forgotten. Reload before forgetting." },
            data: null,
          };
        state.entries.splice(index, 1);
        return { error: null, data: null };
      }
      throw new Error("Unexpected RPC " + name);
    },
  };
  return { state, client };
}
test("memory input bounds require a revision for edits", () => {
  assert.equal(MemoryInputSchema.parse({ title: " A fact ", content: " A note " }).title, "A fact");
  assert.throws(() => MemoryInputSchema.parse({ id: memoryId, title: "Fact", content: "Content" }));
  assert.throws(() => MemoryInputSchema.parse({ title: "Fact", content: "x".repeat(2001) }));
});
test("switching provider/model reconstructs identical memory for actual structured requests", async () => {
  const { client } = fixture(),
    calls = [];
  const env = {
    LOVABLE_API_KEY: "synthetic-not-a-key",
    STUDIO_CHAT_MODEL: "provider-a/model-a",
    AI_GATEWAY_URL: "https://provider-a.invalid/v1",
  };
  class FakeOpenAI {
    constructor(config) {
      this.chat = {
        completions: {
          create: async (request) => {
            calls.push({ config, request });
            return { choices: [{ message: { content: '{"ok":true}' } }] };
          },
        },
      };
    }
  }
  const ai = loader({ openai: FakeOpenAI }, { process: { env } })("src/lib/ai.server.ts");
  const before = await loadWorkspaceKnowledge(client, workspaceId);
  await ai.parseStructured(z.object({ ok: z.boolean() }), "check", "Use workspace context", before);
  env.STUDIO_CHAT_MODEL = "provider-b/model-b";
  env.AI_GATEWAY_URL = "https://provider-b.invalid/v1";
  const after = await loadWorkspaceKnowledge(client, workspaceId);
  await ai.parseStructured(z.object({ ok: z.boolean() }), "check", "Use workspace context", after);
  assert.equal(calls[0].request.model, "provider-a/model-a");
  assert.equal(calls[1].request.model, "provider-b/model-b");
  assert.notEqual(calls[0].config.baseURL, calls[1].config.baseURL);
  assert.equal(calls[0].request.messages[1].content, calls[1].request.messages[1].content);
  assert.match(after, /REMEMBER_EARLY_COMMUTERS/);
  assert.ok(!after.includes("provider-b"));
});
test("every built-in Pal receives the same durable facts and cross-Pal conversation provenance", async () => {
  const { client } = fixture(),
    prompts = [];
  const server = loader({
    "./supabase/client": { createUserScopedSupabase: () => client },
    "@tanstack/react-start/server": { getRequestUrl: () => new URL("https://example.invalid") },
    "./ai.server": {
      parseStructured: async (_schema, _name, _instructions, input) => {
        prompts.push(input);
        return {
          reply: "Useful response",
          lane: "reel",
          problem: "Need a next step",
          recommendations: [
            { title: "Draft", reason: "Useful", nextStep: "Write it", videoKey: null },
          ],
          memorySuggestions: [],
        };
      },
    },
  })("src/lib/studio-server.ts");
  for (const pal of palNames)
    await server.askStudioPal({
      data: { ...auth, pal, question: "What next?", recentMessages: [] },
    });
  assert.equal(prompts.length, 8);
  for (const prompt of prompts) {
    assert.match(prompt, /REMEMBER_EARLY_COMMUTERS/);
    assert.match(prompt, /Member statement \| Coffee mornings/);
    assert.match(prompt, /Assistant draft \(ryder\)/);
    assert.match(prompt, /unverified drafts/);
    assert.ok(!prompt.includes("ARCHIVED_NOTE"));
    assert.ok(!prompt.includes("Approved AI memory"));
  }
});
test("forget handler removes memory from subsequent retrieval and export without erasing original chat", async () => {
  const { client, state } = fixture();
  const server = loader({
    "./studio-auth.server": {
      authorizedStudioClient: async () => ({ client, user: { id: userId } }),
    },
  })("src/lib/studio-memory-server.ts");
  await server.forgetStudioMemory({ data: { ...auth, id: memoryId, expectedRevision: 1 } });
  const context = await loadWorkspaceKnowledge(client, workspaceId);
  assert.ok(!context.includes("REMEMBER_EARLY_COMMUTERS"));
  assert.match(context, /USER_SHARED_FACT/);
  const exported = await server.exportStudioMemory({ data: auth });
  assert.equal(exported.format, "palmer-house-workspace-memory");
  assert.equal(exported.entries.length, 0);
  assert.equal(exported.legacyUnreviewedNotes.older, "UNREVIEWED_NOTE");
  assert.equal(state.entries.length, 0);
  await assert.rejects(
    server.forgetStudioMemory({ data: { ...auth, id: memoryId, expectedRevision: 1 } }),
    /Memory changed/,
  );
});
test("legacy notes retain unknown provenance and never gain an approval label", async () => {
  const { client } = fixture();
  const snapshot = await loadWorkspaceMemory(client, workspaceId);
  const context = buildWorkspaceMemoryContext(snapshot);
  assert.match(context, /approval provenance is unknown/);
  assert.match(context, /not independently verified evidence/);
  assert.match(context, /UNREVIEWED_NOTE/);
});
test("memory retrieval filters workspace and fails on genuine read errors", async () => {
  const { client, state } = fixture();
  assert.equal((await loadWorkspaceMemory(client, otherWorkspaceId)).entries.length, 0);
  state.error = { code: "42501", message: "No permission" };
  await assert.rejects(loadWorkspaceKnowledge(client, workspaceId), /Could not load shared memory/);
  state.entries = [];
  state.error = { code: "42P01", message: "Not installed" };
  const snapshot = await loadWorkspaceMemory(client, workspaceId);
  assert.equal(snapshot.available, false);
  assert.match(buildWorkspaceMemoryContext(snapshot), /UNREVIEWED_NOTE/);
  assert.ok(
    state.calls
      .filter((call) => call.table === "workspace_memories")
      .every((call) => call.filters.some(([key]) => key === "workspace_id")),
  );
});
test("retrieval never silently truncates approved entries beyond the declared memory budget", async () => {
  const { client, state } = fixture();
  state.entries = Array.from({ length: 51 }, (_, index) => ({
    ...state.entries[0],
    id: String(index),
  }));
  await assert.rejects(loadWorkspaceMemory(client, workspaceId), /exceeds its context limit/);
});

test("Unicode memory budget matches PostgreSQL character counting", async () => {
  const { client, state } = fixture();
  state.entries = Array.from({ length: 16 }, (_, index) => ({
    ...state.entries[0],
    id: String(index),
    content: "🌱".repeat(1000),
  }));
  const snapshot = await loadWorkspaceMemory(client, workspaceId);
  assert.equal(snapshot.entries.length, 16);
  assert.equal(snapshot.entries[0].content, "🌱".repeat(1000));
});
