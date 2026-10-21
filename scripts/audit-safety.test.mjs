import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";
const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");
function fixture(env = {}, overrides = {}, extra = {}) {
  const cache = new Map();
  function load(file) {
    file = path.resolve(root, file.endsWith(".ts") ? file : `${file}.ts`);
    if (cache.has(file)) return cache.get(file).exports;
    const module = { exports: {} };
    cache.set(file, module);
    const code = ts.transpileModule(readFileSync(file, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    }).outputText;
    vm.runInNewContext(
      code,
      {
        module,
        exports: module.exports,
        process: { env },
        crypto: globalThis.crypto,
        TextEncoder,
        URL,
        Response,
        Request,
        Buffer,
        AbortSignal,
        setTimeout,
        console,
        ...extra,
        require(name) {
          if (name in overrides) return overrides[name];
          if (name.startsWith("@/")) return load(path.resolve(root, "src", name.slice(2)));
          if (name.startsWith("./")) return load(path.resolve(path.dirname(file), name));
          return require(name);
        },
      },
      { filename: file },
    );
    return module.exports;
  }
  return load;
}
test("test mode cannot fall back to a live key or signing secret", () => {
  const api = fixture({
    STRIPE_USE_TEST: "true",
    STRIPE_SECRET_KEY: "live-sentinel",
    STRIPE_WEBHOOK_SECRET: "live-signing-sentinel",
  })("src/lib/stripe-env");
  assert.equal(api.stripeTestMode(), true);
  assert.equal(api.stripeSecretKey(), undefined);
  assert.equal(api.stripeWebhookSecrets().length, 0);
  assert.equal(api.stripeEventMatchesMode(true), false);
});
test("billing modes select only their own signing secret", () => {
  for (const testMode of [true, false]) {
    const api = fixture({
      STRIPE_USE_TEST: String(testMode),
      STRIPE_TEST_API_KEY: "sk_test_fixture",
      STRIPE_SECRET_KEY: "sk_live_fixture",
      STRIPE_WEBHOOK_SECRET: "live-hook",
      STRIPE_TEST_WEBHOOK_SECRET: "test-hook",
    })("src/lib/stripe-env");
    assert.equal(api.stripeSecretKey(), testMode ? "sk_test_fixture" : "sk_live_fixture");
    assert.equal(api.stripeWebhookSecrets().join(), testMode ? "test-hook" : "live-hook");
    assert.equal(api.stripeEventMatchesMode(!testMode), true);
  }
});
test("wrong-mode webhook cannot reach billing or create a database client", async () => {
  let clients = 0,
    applied = 0;
  const load = fixture(
    {
      STRIPE_USE_TEST: "true",
      STRIPE_TEST_API_KEY: "sk_test_fixture",
      STRIPE_TEST_WEBHOOK_SECRET: "fake",
      SUPABASE_SECRET_KEY: "fake",
    },
    {
      "@tanstack/react-router": { createFileRoute: () => (config) => config },
      "@supabase/supabase-js": {
        createClient: () => {
          clients++;
          return {};
        },
      },
      "@/lib/supabase/client": { SUPABASE_URL: "https://invalid.test" },
      "@/lib/studio-billing-webhook.server": {
        applyStudioBillingEvent: async () => {
          applied++;
        },
      },
      stripe: class {
        webhooks = { constructEventAsync: async () => ({ livemode: true, id: "evt_fake" }) };
      },
    },
  );
  const { Route } = load("src/routes/api.stripe-webhook");
  const response = await Route.server.handlers.POST({
    request: new Request("https://example.test/api/stripe-webhook", {
      method: "POST",
      headers: { "stripe-signature": "fake" },
      body: "{}",
    }),
  });
  assert.equal(response.status, 400);
  assert.equal(clients, 0);
  assert.equal(applied, 0);
});
function identityFixture() {
  let cookie = "",
    options;
  const env = { EXPO_DEMO_IDENTITY_SECRET: "local-test-only-secret" };
  const load = fixture(env, {
    "@tanstack/react-start/server": {
      getCookie: () => cookie,
      setCookie: (_name, value, config) => {
        cookie = value;
        options = config;
      },
      getRequestIP: () => "203.0.113.1",
      getRequestHeader: () => "spoofed",
      getRequestUrl: () => new URL("https://example.test"),
    },
  });
  return {
    api: load("src/lib/expo-demo-limits.server"),
    env,
    get cookie() {
      return cookie;
    },
    set cookie(v) {
      cookie = v;
    },
    get options() {
      return options;
    },
  };
}
test("guest identity is server-issued, signed, stable and tamper-resistant", async () => {
  const f = identityFixture(),
    a = await f.api.demoIdentity(),
    b = await f.api.demoIdentity();
  assert.equal(a.sessionId, b.sessionId);
  assert.equal(a.networkHash.length, 64);
  assert.equal(f.options.httpOnly, true);
  assert.equal(f.options.secure, true);
  f.cookie = f.cookie.replace(a.sessionId, crypto.randomUUID());
  const c = await f.api.demoIdentity();
  assert.notEqual(c.sessionId, a.sessionId);
  assert.equal(c.networkHash, a.networkHash);
});
test("invalid configured limits fail closed and expensive/unpriced requests cannot call AI", async () => {
  const f = identityFixture();
  for (const value of ["NaN", "0", "-1", "Infinity", "1.5", "100001"])
    assert.throws(() => f.api.positiveLimit(value, 10, 100000));
  await assert.rejects(
    f.api.assertDemoProviderBudget("chat", "unknown", "hello", 2500),
    /cost profile/,
  );
  await assert.rejects(
    f.api.assertDemoProviderBudget("chat", "openai/gpt-6-sol", "x".repeat(18000), 2500),
    /allowance/,
  );
  await assert.rejects(
    f.api.assertDemoProviderBudget("chat", "openai/gpt-6-luna", "x".repeat(21000), 2500),
    /too long/,
  );
  await f.api.assertDemoProviderBudget(
    "image",
    "google/gemini-3.1-flash-image",
    "a short business image brief",
    4000,
    1,
  );
});
test("database failure or missing reservation rejects generation; client identity is ignored", async () => {
  for (const response of [
    { error: { message: "database unavailable" } },
    { data: null },
    { error: { message: "This demo has reached its allowance." } },
  ]) {
    let args;
    const api = fixture(
      {},
      {
        "./expo-demo-limits.server": {
          demoIdentity: async () => ({ sessionId: "server-id", networkHash: "server-network" }),
          demoLimits: () => ({
            sessionCap: 4,
            dailyCap: 20,
            networkCap: 10,
            budgetCents: 100,
            costCents: 25,
          }),
        },
        "@/integrations/supabase/client.server": {
          supabaseAdmin: {
            rpc: async (_name, a) => {
              args = a;
              return response;
            },
          },
        },
      },
    )("src/lib/expo-demo.server");
    await assert.rejects(
      api.reserveExpoDemo("forged-client-id", "campaign"),
      /unavailable|allowance/,
    );
    assert.equal(args.p_session_id, "server-id");
    assert.equal(args.p_cost_cents, 25);
  }
});
test("public page policy blocks private/reserved IPv4 and unsafe URL forms", () => {
  const api = fixture()("src/lib/public-page-fetch.server");
  for (const ip of [
    "127.0.0.1",
    "10.1.2.3",
    "169.254.169.254",
    "192.168.1.1",
    "172.20.1.1",
    "100.64.0.1",
    "198.18.0.1",
    "224.0.0.1",
    "0.0.0.0",
    "::1",
  ])
    assert.equal(api.isPublicIPv4(ip), false, ip);
  assert.equal(api.isPublicIPv4("1.1.1.1"), true);
  for (const url of [
    "http://example.com",
    "https://user:pass@example.com",
    "https://example.com:8443",
    "https://127.0.0.1",
    "https://service.internal",
  ])
    assert.throws(() => api.publicPageURL(url));
});
test("DNS resolving to an internal address is rejected before connecting", async () => {
  let connections = 0;
  const api = fixture(
    {},
    {
      "node:dns/promises": { resolve4: async () => ["127.0.0.1"] },
      "node:https": {
        request: () => {
          connections++;
        },
      },
    },
  )("src/lib/public-page-fetch.server");
  await assert.rejects(
    api.fetchPinnedPublicPage(new URL("https://public-looking.example")),
    /public address/,
  );
  assert.equal(connections, 0);
});

test("misplaced live/test API keys fail closed", () => {
  for (const [mode, key] of [
    ["true", "sk_live_fixture"],
    ["false", "sk_test_fixture"],
    ["true", "invalid"],
  ]) {
    const api = fixture({
      STRIPE_USE_TEST: mode,
      STRIPE_TEST_API_KEY: key,
      STRIPE_SECRET_KEY: key,
    })("src/lib/stripe-env");
    assert.equal(api.stripeSecretKey(), undefined);
  }
});
