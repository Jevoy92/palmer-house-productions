import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { webcrypto } from "node:crypto";
import ts from "typescript";
import { PDFDocument } from "pdf-lib";

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");
const workspaceId = "c439cd54-5a21-49c8-a7a1-0c710402b097";
const otherWorkspaceId = "20d5c7ab-3fef-4bc5-987f-7adab009b10d";
const assetId = "c871bd0c-c3f5-4230-9c72-83308a8f9d16";
const userId = "8244e810-0e1f-4dce-b931-74b7548179ad";
const authInput = { workspaceId, accessToken: "test-access-token-no-real-secret" };

// Run the actual server handlers and helpers; isolate auth, network and storage.
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

const helpers = loader()("src/lib/studio-recovery.ts");
test("custom Pal inputs are bounded; personality never changes the common capability type", () => {
  assert.equal(
    helpers.PalProfileInputSchema.parse({
      name: "  Nova  ",
      basePal: "kiana",
      personality: "Warm and precise",
    }).name,
    "Nova",
  );
  for (const input of [
    { name: " ", basePal: "kiana", personality: "Warm" },
    { name: "Nova", basePal: "imaginary-admin", personality: "Warm" },
    { name: "Nova", basePal: "kiana", personality: "x".repeat(1601) },
  ])
    assert.throws(() => helpers.PalProfileInputSchema.parse(input));
  assert.throws(() =>
    helpers.ArtifactInputSchema.parse({ kind: "video", title: "Video", prompt: "Make a video" }),
  );
});

test("private file paths reject cross-workspace and traversal references", () => {
  assert.equal(
    helpers.assertWorkspaceStoragePath(workspaceId, `${workspaceId}/generated/a.pdf`),
    `${workspaceId}/generated/a.pdf`,
  );
  for (const value of [
    `${otherWorkspaceId}/a.png`,
    `${workspaceId}/../a.pdf`,
    `${workspaceId}/a?secret=1`,
    `${workspaceId}/a\\b`,
  ])
    assert.throws(() => helpers.assertWorkspaceStoragePath(workspaceId, value));
});

test("feed citations retain only real supplied sources and canonical labels", () => {
  const result = helpers.validatedFeedSources(
    [
      { label: "Fake discovery", url: "https://invented.example/research" },
      { label: "Changed label", url: "/studio/campaigns/real" },
      { label: "Duplicate", url: "/studio/campaigns/real" },
    ],
    [{ label: "Actual campaign", url: "/studio/campaigns/real" }],
  );
  assert.equal(result.length, 1);
  assert.equal(result[0].label, "Actual campaign");
});

test("workspace memory recognizes database complete and historic done", () => {
  assert.equal(helpers.isCompletedRoadmapStatus("complete"), true);
  assert.equal(helpers.isCompletedRoadmapStatus("done"), true);
  assert.equal(helpers.isCompletedRoadmapStatus("editing"), false);
});

test("PDF export creates readable, paginated PDF bytes and fails for unsupported glyphs", async () => {
  const { renderStudioPdf } = await import("../src/lib/studio-artifact.server.ts");
  const bytes = await renderStudioPdf(
    "Campaign plan",
    ("A real, editable campaign note with measured wrapping. ".repeat(12) + "\n\n").repeat(24),
  );
  const document = await PDFDocument.load(bytes);
  assert.ok(document.getPageCount() > 1);
  assert.equal(document.getTitle(), "Campaign plan");
  const { extractText } = await import("unpdf");
  const extracted = await extractText(bytes.slice(), { mergePages: true });
  assert.match(extracted.text, /Campaign plan/);
  assert.match(extracted.text, /real, editable campaign note/);
  assert.equal(Buffer.from(bytes).subarray(0, 5).toString(), "%PDF-");
  await assert.rejects(renderStudioPdf("Plan", "Unsupported symbol 🦊"), /cannot display/);
});

test("image provider failures never return a placeholder artifact", async () => {
  const ai = (fetch) =>
    loader(
      {},
      { process: { env: { LOVABLE_API_KEY: "fixture-not-a-key" } }, fetch },
    )("src/lib/ai.server.ts");
  await assert.rejects(
    ai(async () => ({ ok: false, status: 429 })).generateStudioImage("A scene"),
    /busy/,
  );
  await assert.rejects(
    ai(async () => ({
      ok: true,
      json: async () => ({ choices: [{ message: { content: "No image" } }] }),
    })).generateStudioImage("A scene"),
    /no usable image/,
  );
  await assert.rejects(
    ai(async () => ({
      ok: true,
      json: async () => ({
        choices: [
          { message: { images: [{ image_url: { url: "https://untrusted.example/image.png" } }] } },
        ],
      }),
    })).generateStudioImage("A scene"),
    /no usable image/,
  );
});

function backendFixture(options = {}) {
  const writes = [];
  const stored = new Map();
  let imageCalls = 0;
  const author = { kind: "pal", pal: "kiana", name: "Nova", profileId: assetId };
  const client = {
    storage: {
      from(bucket) {
        assert.equal(bucket, "campaign-assets");
        return {
          async upload(file, bytes, settings) {
            writes.push({ action: "upload", file, settings });
            if (options.uploadError) return { error: { message: "offline" } };
            stored.set(file, bytes);
            return { error: null };
          },
          async remove(files) {
            files.forEach((file) => stored.delete(file));
            writes.push({ action: "remove", files });
            return { error: null };
          },
          async createSignedUrl(file) {
            return {
              data: { signedUrl: `https://private.example/${file}?expires=3600` },
              error: null,
            };
          },
        };
      },
    },
    from(table) {
      const query = { table, action: "select", filters: [], values: undefined };
      const builder = {
        select() {
          return builder;
        },
        insert(values) {
          query.action = "insert";
          query.values = values;
          return builder;
        },
        update(values) {
          query.action = "update";
          query.values = values;
          return builder;
        },
        upsert(values, opts) {
          query.action = "upsert";
          query.values = values;
          query.options = opts;
          return builder;
        },
        delete() {
          query.action = "delete";
          return builder;
        },
        eq(key, value) {
          query.filters.push([key, value]);
          return builder;
        },
        async single() {
          return execute();
        },
        async maybeSingle() {
          return execute();
        },
        then(resolve, reject) {
          return execute().then(resolve, reject);
        },
      };
      async function execute() {
        writes.push(query);
        if (table === "campaigns" || table === "conversations")
          return {
            data: options.missingOwner ? null : { id: assetId, title: "Real campaign" },
            error: null,
          };
        if (table === "campaign_assets" && query.action === "insert")
          return options.libraryError
            ? { error: { message: "write failed" }, data: null }
            : { data: { id: query.values.id }, error: null };
        if (table === "campaign_assets" && query.action === "select")
          return {
            data: {
              id: assetId,
              kind: "document",
              metadata: { storagePath: `${workspaceId}/original.pdf`, mimeType: "application/pdf" },
            },
            error: null,
          };
        if (table === "campaign_assets" && query.action === "update")
          return { data: options.staleEdit ? null : query.values, error: null };
        if (table === "assistant_messages")
          return options.messageError
            ? { error: { message: "write failed" } }
            : { data: { id: assetId }, error: null };
        return { data: { id: assetId }, error: null };
      }
      return builder;
    },
  };
  const load = loader({
    "./studio-auth.server": {
      async authorizedStudioClient() {
        return { client, user: { id: userId }, role: "member" };
      },
      async resolveStudioAuthor() {
        return { author, personality: "Warm" };
      },
      async studioMemberAuthor() {
        return { kind: "member", name: "A member", userId };
      },
    },
    "./studio-knowledge": {
      async loadWorkspaceKnowledge() {
        return "Actual workspace memory";
      },
    },
    "./ai.server": {
      async generateStudioImage() {
        imageCalls++;
        return { bytes: new Uint8Array([1, 2, 3]), mimeType: "image/png", extension: "png" };
      },
    },
    "./studio-artifact.server": {
      async renderStudioPdf() {
        return new Uint8Array([37, 80, 68, 70]);
      },
    },
  });
  return {
    server: load("src/lib/studio-recovery-server.ts"),
    writes,
    stored,
    imageCalls: () => imageCalls,
  };
}

test("artifact ownership is verified before any billable image generation", async () => {
  const f = backendFixture({ missingOwner: true });
  await assert.rejects(
    f.server.generateStudioArtifact({
      data: {
        ...authInput,
        artifact: {
          kind: "image",
          title: "Test image",
          prompt: "Render a landscape",
          campaignId: assetId,
        },
      },
    }),
    /not in the active workspace/,
  );
  assert.equal(f.imageCalls(), 0);
  assert.equal(f.stored.size, 0);
});

test("generated image saves canonical private library metadata and the originating identity", async () => {
  const f = backendFixture();
  const result = await f.server.generateStudioArtifact({
    data: {
      ...authInput,
      artifact: {
        kind: "image",
        title: "Test image",
        prompt: "Render a landscape",
        conversationId: assetId,
      },
    },
  });
  assert.equal(f.stored.size, 1);
  const asset = f.writes.find(
    (item) => item.table === "campaign_assets" && item.action === "insert",
  ).values;
  assert.equal(asset.campaign_id, null);
  assert.equal(asset.kind, "image");
  assert.equal(asset.metadata.generated, true);
  assert.equal(asset.metadata.storagePath, result.storagePath);
  const message = f.writes.find((item) => item.table === "assistant_messages").values;
  assert.equal(message.metadata.assetIds[0], result.assetId);
  assert.equal(message.metadata.originatingPal.name, "Nova");
});

test("failed library persistence cleans up the private upload; chat failure retains saved file", async () => {
  const f = backendFixture({ libraryError: true });
  await assert.rejects(
    f.server.generateStudioArtifact({
      data: {
        ...authInput,
        artifact: { kind: "image", title: "Test image", prompt: "Render a landscape" },
      },
    }),
    /library/,
  );
  assert.equal(f.stored.size, 0);
  const chat = backendFixture({ messageError: true });
  const result = await chat.server.generateStudioArtifact({
    data: {
      ...authInput,
      artifact: {
        kind: "image",
        title: "Test image",
        prompt: "Render a landscape",
        conversationId: assetId,
      },
    },
  });
  assert.equal(chat.stored.size, 1);
  assert.match(result.warning, /saved in Library/);
});

test("stale document edit removes its new file and preserves the original", async () => {
  const f = backendFixture({ staleEdit: true });
  f.stored.set(`${workspaceId}/original.pdf`, "original bytes");
  await assert.rejects(
    f.server.reviseStudioDocument({
      data: {
        ...authInput,
        assetId,
        title: "Revised PDF",
        content: "A revised complete document",
        expectedUpdatedAt: "2026-09-27T10:00:00.000Z",
      },
    }),
    /changed while you were editing/,
  );
  assert.equal(f.stored.size, 1);
  assert.equal(f.stored.get(`${workspaceId}/original.pdf`), "original bytes");
  assert.ok(
    f.writes.find((row) => row.action === "update").filters.some(([key]) => key === "updated_at"),
  );
});

test("reaction updates use explicit unique identity and delete only the current member's row", async () => {
  const f = backendFixture();
  await Promise.all(
    [true, true, false].map((active) =>
      f.server.reactToStudioFeed({
        data: { ...authInput, postId: assetId, reaction: "helpful", active },
      }),
    ),
  );
  const adds = f.writes.filter((row) => row.action === "upsert");
  assert.equal(adds.length, 2);
  assert.equal(adds[0].options.ignoreDuplicates, true);
  assert.equal(adds[0].options.onConflict, "post_id,user_id,reaction");
  const deletion = f.writes.find((row) => row.action === "delete");
  assert.ok(deletion.filters.some(([key, value]) => key === "user_id" && value === userId));
  assert.ok(
    deletion.filters.some(([key, value]) => key === "workspace_id" && value === workspaceId),
  );
});

test("server auth rejects expired sessions and non-members before returning a scoped client", async () => {
  for (const mode of ["expired", "nonmember"]) {
    const client = {
      auth: {
        getUser: async () =>
          mode === "expired"
            ? { data: {}, error: {} }
            : { data: { user: { id: userId } }, error: null },
      },
      from: () => {
        const query = {
          select() {
            return query;
          },
          eq() {
            return query;
          },
          maybeSingle: async () => ({ data: null, error: null }),
        };
        return query;
      },
    };
    const actual = loader({ "./supabase/client": { createUserScopedSupabase: () => client } })(
      "src/lib/studio-auth.server.ts",
    );
    await assert.rejects(
      actual.authorizedStudioClient("fixture-token", workspaceId),
      mode === "expired" ? /session has expired/ : /access to this workspace/,
    );
  }
});

test("every generation sees existing asset text and complete roadmap work; query errors stop generation", async () => {
  const rows = {
    campaigns: [],
    content_ideas: [],
    calendar_items: [],
    workspace_settings: { ai_memory: {} },
    workspace_video_items: [{ item_key: "customer-proof", status: "complete" }],
    brand_profiles: { business_name: "Actual business", description: "Real work" },
    campaign_assets: [
      {
        id: assetId,
        title: "Existing brochure",
        kind: "document",
        content: "Existing approved copy",
        status: "draft",
      },
    ],
    conversation_attachments: [],
  };
  function client(fail) {
    return {
      from(table) {
        const query = {
          select() {
            return query;
          },
          eq() {
            return query;
          },
          order() {
            return query;
          },
          limit() {
            return query;
          },
          maybeSingle() {
            return query;
          },
          then(resolve) {
            return Promise.resolve({ data: rows[table], error: table === fail ? {} : null }).then(
              resolve,
            );
          },
        };
        return query;
      },
    };
  }
  const actual = loader({
    "./studio-voice.ts": { buildBrandVoiceContext: () => "Grounded voice" },
  })("src/lib/studio-knowledge.ts");
  const digest = await actual.loadWorkspaceKnowledge(client(), workspaceId);
  assert.match(digest, /Existing approved copy/);
  assert.match(digest, /customer-proof/);
  assert.match(digest, /Actual business/);
  await assert.rejects(
    actual.loadWorkspaceKnowledge(client("campaign_assets"), workspaceId),
    /shared workspace context/,
  );
});

test("stored feed sources cannot execute scripts or expose credentials", () => {
  const result = helpers.safeFeedSources([
    { label: "Bad", url: "javascript:alert(1)" },
    { label: "Bad", url: "//untrusted.example" },
    { label: "Bad", url: "https://user:password@example.com" },
    { label: "Campaign", url: "/studio/campaigns/example" },
    { label: "Reference", url: "https://example.com/article" },
  ]);
  assert.equal(result.length, 2);
  assert.equal(result[0].label, "Campaign");
});

test("stored author snapshots stay stable and malformed or cross-workspace avatars are sanitized", () => {
  const original = {
    kind: "pal",
    pal: "kiana",
    name: "Original Nova",
    profileId: assetId,
    avatarPath: `${workspaceId}/pals/original.png`,
  };
  assert.equal(helpers.safeStudioAuthor(original, userId, workspaceId).name, "Original Nova");
  assert.equal(
    helpers.safeStudioAuthor(
      { ...original, avatarPath: `${otherWorkspaceId}/secret.png` },
      userId,
      workspaceId,
    ).avatarPath,
    null,
  );
  assert.equal(
    helpers.safeStudioAuthor({ unexpected: true }, userId, workspaceId).name,
    "Workspace member",
  );
  assert.equal(
    helpers.safeStudioAuthor(
      { kind: "member", name: "Member", userId: "forged" },
      userId,
      workspaceId,
    ).userId,
    userId,
  );
});
