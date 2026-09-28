import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { webcrypto } from "node:crypto";
import ts from "typescript";
import {
  buildAssetImageBrief,
  assetImagePrompt,
  palAvatarPrompt,
} from "../src/lib/studio-image-brief.ts";
const require = createRequire(import.meta.url),
  root = path.resolve(import.meta.dirname, "..");
const workspaceId = "11111111-1111-4111-8111-111111111111",
  otherWorkspaceId = "22222222-2222-4222-8222-222222222222";
const assetId = "33333333-3333-4333-8333-333333333333",
  imageId = "44444444-4444-4444-8444-444444444444",
  campaignId = "55555555-5555-4555-8555-555555555555",
  userId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
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
        TextEncoder,
        AbortSignal,
        crypto: webcrypto,
        console,
        process: { env: {} },
        ...globals,
        require(name) {
          // Billing and cost enforcement have dedicated integration/SQL tests.
          // These fixtures focus on saved-work behavior with a successful reservation.
          if (name === "./studio-credit-runtime.server")
            return {
              withStudioCredits: async (_auth, _operation, work) => work(),
              beginStudioProviderCall: () => () => {},
              studioCallLimits: () => ({
                maxInputTokens: 20000,
                maxOutputTokens: 4000,
                imageSize: "2K",
              }),
            };

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
function fixture(options = {}) {
  const writes = [],
    prompts = [],
    files = new Map();
  const source = {
    id: assetId,
    workspace_id: workspaceId,
    campaign_id: campaignId,
    kind: "article",
    title: "Rye fermentation",
    content: "Explain a 24-hour rye fermentation with a flour jar and a clock.",
    updated_at: "2026-09-27T10:00:00Z",
    metadata: {
      storagePath: `${workspaceId}/article.pdf`,
      mimeType: "application/pdf",
      mediaAssetId: imageId,
    },
  };
  const linked = {
    id: imageId,
    workspace_id: workspaceId,
    campaign_id: campaignId,
    kind: "image",
    metadata: {
      targetAssetId: assetId,
      storagePath: `${workspaceId}/generated/cover.png`,
      mimeType: "image/png",
    },
  };
  if (options.foreignSource) source.workspace_id = otherWorkspaceId;
  if (options.wrongTarget) linked.metadata.targetAssetId = campaignId;
  if (options.foreignImage) linked.workspace_id = otherWorkspaceId;
  const rows = [source, linked];
  const client = {
    from(table) {
      let filters = [],
        action = "select",
        values;
      const chain = {
        select() {
          return chain;
        },
        eq(k, v) {
          filters.push([k, v]);
          return chain;
        },
        order() {
          return chain;
        },
        limit() {
          return chain;
        },
        insert(v) {
          action = "insert";
          values = v;
          return chain;
        },
        maybeSingle() {
          return execute();
        },
        single() {
          return execute();
        },
        then(resolve, reject) {
          return execute().then(resolve, reject);
        },
      };
      async function execute() {
        writes.push({ table, action, filters, values });
        if (action === "insert") return { data: { id: values.id || imageId }, error: null };
        if (table === "campaign_assets")
          return {
            data: rows.find((row) => filters.every(([k, v]) => row[k] === v)) || null,
            error: null,
          };
        if (table === "brand_references")
          return {
            data: [{ label: "Actual saved source", source_url: "https://example.org/saved" }],
            error: null,
          };
        if (table === "campaigns")
          return { data: [{ id: campaignId, title: "The rye story" }], error: null };
        if (table === "studio_feed_posts")
          return {
            data: options.duplicate
              ? [{ body: "A concrete new angle grounded in the actual saved workspace." }]
              : [],
            error: null,
          };
        return { data: { id: assetId }, error: null };
      }
      return chain;
    },
    async rpc(name, args) {
      writes.push({ rpc: name, args });
      if (name === "reserve_studio_feed_generation")
        return {
          data: options.deferred
            ? {
                status: "deferred",
                reason: "Already preparing",
                nextAttemptAt: "2026-09-28T00:00:00Z",
              }
            : { status: "claimed", token: assetId },
          error: null,
        };
      if (name === "complete_studio_feed_generation")
        return { data: imageId, error: options.commitFails ? { message: "DB unavailable" } : null };
      if (name === "associate_studio_asset_image")
        return { data: null, error: options.staleSource ? { message: "Source changed" } : null };
      return { data: null, error: null };
    },
    storage: {
      from() {
        return {
          async upload(path, bytes, settings) {
            files.set(path, bytes);
            writes.push({ upload: path, settings });
            return { error: null };
          },
          async createSignedUrl(path) {
            return { data: { signedUrl: `https://private.example/${path}` }, error: null };
          },
          async remove(paths) {
            paths.forEach((path) => files.delete(path));
            return { error: null };
          },
        };
      },
    },
  };
  const load = loader(
    {
      "./studio-auth.server": {
        authorizedStudioClient: async () => {
          if (options.denied) throw new Error("Workspace access required");
          return { client, user: { id: userId } };
        },
        resolveStudioAuthor: async () => ({
          author: { kind: "pal", name: "Kiana", pal: "kiana" },
          personality: "Direct",
        }),
      },
      "./studio-knowledge": {
        loadWorkspaceKnowledge: async () => "Persisted shared workspace memory",
      },
      "./ai.server": {
        generateStudioImage: async (prompt) => {
          prompts.push(prompt);
          if (options.providerFails) throw new Error("Provider unavailable");
          return {
            bytes: new Uint8Array(options.oversized ? 5 * 1024 * 1024 + 1 : 3),
            mimeType: "image/png",
            extension: "png",
          };
        },
        parseStructured: async (_schema, _name, instructions, input) => {
          prompts.push({ instructions, input });
          if (options.providerFails) throw new Error("Provider unavailable");
          return {
            title: "A specific next step",
            body: "A concrete new angle grounded in the actual saved workspace.",
            pal: "kiana",
            lane: "reel",
            sources: [
              { label: "Fabricated link", url: "https://invented.invalid" },
              { label: "Wrong label", url: "https://example.org/saved" },
            ],
            discussion: [
              { pal: "ryder", body: "Try the opening customer question first." },
              { pal: "clara", body: "Then choose one practical follow-up." },
            ],
          };
        },
      },
    },
    { process: { env: options.noCredential ? {} : { LOVABLE_API_KEY: "synthetic-no-secret" } } },
  );
  return {
    writes,
    prompts,
    files,
    source,
    media: load("src/lib/studio-media-server.ts"),
    recovery: load("src/lib/studio-recovery-server.ts"),
    feed: load("src/lib/studio-proactive.server.ts"),
  };
}
test("asset image briefs follow each output's actual subject, format and aspect ratio", () => {
  const article = buildAssetImageBrief({
    id: assetId,
    kind: "article",
    title: "Fermentation",
    content: "A rye starter in a glass jar.",
  });
  const reel = buildAssetImageBrief({
    id: imageId,
    kind: "short_script",
    title: "Coffee pour",
    content: "A barista pours milk into espresso.",
    metadata: { platform: "tiktok" },
  });
  assert.notEqual(article.sourceExcerpt, reel.sourceExcerpt);
  assert.equal(article.aspectRatio, "16:9");
  assert.equal(reel.aspectRatio, "9:16");
  assert.equal(reel.sourceAssetId, imageId);
  assert.match(assetImagePrompt(reel, "Soft light", "Actual memory"), /Coffee pour/);
  assert.match(
    assetImagePrompt(reel, "Soft light", "Actual memory"),
    /Do not reuse a generic campaign hero/,
  );
});
test("per-output generation persists a unique media ID, exact source brief and association", async () => {
  const f = fixture();
  const result = await f.recovery.generateStudioArtifact({
    data: {
      ...auth,
      artifact: {
        kind: "image",
        title: "Specific rye image",
        prompt: "Show the starter at sunrise",
        targetAssetId: assetId,
        imagePurpose: "cover",
      },
    },
  });
  assert.match(f.prompts[0], /24-hour rye fermentation/);
  assert.match(f.prompts[0], /Persisted shared workspace memory/);
  const row = f.writes.find(
    (write) => write.table === "campaign_assets" && write.action === "insert",
  ).values;
  assert.equal(row.campaign_id, campaignId);
  assert.equal(row.metadata.targetAssetId, assetId);
  assert.equal(row.metadata.imageBrief.sourceAssetId, assetId);
  assert.equal(result.assetId, row.id);
  assert.notEqual(result.assetId, assetId);
  const association = f.writes.find((write) => write.rpc === "associate_studio_asset_image");
  assert.equal(association.args.image_asset_id, result.assetId);
  assert.equal(association.args.source_asset_id, assetId);
  assert.equal(association.args.expected_source_updated_at, f.source.updated_at);
});
test("foreign source asset is rejected before billable image work", async () => {
  const f = fixture({ foreignSource: true });
  await assert.rejects(
    f.recovery.generateStudioArtifact({
      data: {
        ...auth,
        artifact: {
          kind: "image",
          title: "No access",
          prompt: "Draw a scene",
          targetAssetId: assetId,
        },
      },
    }),
    /not in the active workspace/,
  );
  assert.equal(f.prompts.length, 0);
  assert.equal(f.files.size, 0);
});
test("stale source association keeps the generated library file and gives an honest warning", async () => {
  const f = fixture({ staleSource: true });
  const result = await f.recovery.generateStudioArtifact({
    data: {
      ...auth,
      artifact: {
        kind: "image",
        title: "Specific image",
        prompt: "Draw the rye starter",
        targetAssetId: assetId,
      },
    },
  });
  assert.match(result.warning, /source changed/);
  assert.equal(f.files.size, 1);
});
test("image resolver keeps document downloads separate and rejects borrowed/cross-tenant media IDs", async () => {
  const f = fixture();
  assert.match(
    await f.media.getStudioAssetImageUrl({ data: { ...auth, assetId } }),
    /generated\/cover.png/,
  );
  assert.match(
    await f.recovery.getStudioArtifactUrl({ data: { ...auth, assetId } }),
    /article.pdf/,
  );
  for (const option of [{ wrongTarget: true }, { foreignImage: true }])
    await assert.rejects(
      fixture(option).media.getStudioAssetImageUrl({ data: { ...auth, assetId } }),
      /not associated/,
    );
});
test("avatar generation applies server-owned 3D style and stores only a private portrait", async () => {
  const f = fixture();
  const result = await f.media.generateStudioPalAvatar({
    data: {
      ...auth,
      name: "Nova",
      description: "An adult with wavy silver hair and green glasses",
      basePal: "clara",
    },
  });
  assert.match(f.prompts[0], /sculpted 3D character style/);
  assert.match(f.prompts[0], /wavy silver hair/);
  assert.match(result.storagePath, new RegExp(`^${workspaceId}/pals/`));
  assert.equal(result.styleVersion, "palmer-sculpted-portrait-v1");
  assert.equal(f.writes.filter((write) => write.table === "campaign_assets").length, 0);
  assert.match(palAvatarPrompt("Nova", "A red scarf"), /No lettering/);
});
test("unauthorized or oversized portraits never reach private storage", async () => {
  const denied = fixture({ denied: true });
  await assert.rejects(
    denied.media.generateStudioPalAvatar({
      data: { ...auth, description: "An adult with silver hair" },
    }),
    /Workspace access/,
  );
  assert.equal(denied.prompts.length, 0);
  const large = fixture({ oversized: true });
  await assert.rejects(
    large.media.generateStudioPalAvatar({
      data: { ...auth, description: "An adult with silver hair" },
    }),
    /too large/,
  );
  assert.equal(large.files.size, 0);
});
test("a deferred feed lease makes no provider call or discussion write", async () => {
  const f = fixture({ deferred: true });
  const result = await f.feed.generateProactiveFeed({ ...auth, mode: "automatic" });
  assert.equal(result.status, "deferred");
  assert.equal(f.prompts.length, 0);
  assert.equal(
    f.writes.filter((write) => write.rpc === "complete_studio_feed_generation").length,
    0,
  );
});
test("automatic feed generation uses saved context, real sources and one atomic discussion", async () => {
  const f = fixture();
  const result = await f.feed.generateProactiveFeed({ ...auth, mode: "automatic" });
  assert.equal(result.status, "generated");
  assert.match(f.prompts[0].input, /Persisted shared workspace memory/);
  const saved = f.writes.find((write) => write.rpc === "complete_studio_feed_generation");
  assert.equal(saved.args.replies_value.length, 2);
  assert.deepEqual(JSON.parse(JSON.stringify(saved.args.post_value.sources)), [
    { label: "Actual saved source", url: "https://example.org/saved" },
  ]);
  assert.match(f.prompts[0].instructions, /never newly researched/);
});
test("provider failure or duplicate output releases the lease without fake feed posts", async () => {
  for (const options of [{ providerFails: true }, { duplicate: true }]) {
    const f = fixture(options);
    await assert.rejects(f.feed.generateProactiveFeed({ ...auth, mode: "automatic" }));
    assert.ok(f.writes.some((write) => write.rpc === "release_studio_feed_generation"));
    assert.ok(!f.writes.some((write) => write.rpc === "complete_studio_feed_generation"));
  }
});
test("unconfigured AI leaves the saved feed untouched and does not reserve work", async () => {
  const f = fixture({ noCredential: true });
  const result = await f.feed.generateProactiveFeed({ ...auth, mode: "automatic" });
  assert.equal(result.status, "unavailable");
  assert.equal(f.writes.length, 0);
  assert.equal(f.prompts.length, 0);
});
test("context fingerprints are deterministic and change when workspace facts change", async () => {
  const f = fixture();
  assert.equal(
    await f.feed.feedContextHash("actual context"),
    await f.feed.feedContextHash("actual context"),
  );
  assert.notEqual(
    await f.feed.feedContextHash("actual context"),
    await f.feed.feedContextHash("updated context"),
  );
});
