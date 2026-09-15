import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");

// Load the actual TypeScript modules, with browser storage and Stripe isolated.
// No payment or network request can escape this fixture.
function fixture(initial = {}) {
  const storage = new Map(Object.entries(initial));
  const stripeCalls = [];
  const verifiedSession = {
    mode: "payment",
    metadata: { quote_reference: "PH-TEST12" },
    client_reference_id: "PH-TEST12",
    status: "complete",
    payment_status: "paid",
    amount_total: 3800,
    currency: "usd",
  };
  const cache = new Map();
  const window = {
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
    },
    addEventListener() {},
    removeEventListener() {},
  };
  class FakeStripe {
    checkout = {
      sessions: {
        create: async (input) => {
          stripeCalls.push(input);
          return { url: "https://checkout.stripe.test/session" };
        },
        retrieve: async () => verifiedSession,
      },
    };
  }
  function load(name) {
    const filename = path.resolve(root, "src/lib", name.endsWith(".ts") ? name : `${name}.ts`);
    if (cache.has(filename)) return cache.get(filename).exports;
    const module = { exports: {} };
    cache.set(filename, module);
    const result = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    });
    const localRequire = (specifier) => {
      if (specifier.startsWith("./")) return load(specifier.slice(2));
      if (specifier.startsWith("@/assets/")) return specifier;
      if (specifier === "react") return { useSyncExternalStore: (_, getSnapshot) => getSnapshot() };
      if (specifier === "stripe") return FakeStripe;
      if (specifier === "@tanstack/react-start/server")
        return { getRequestUrl: () => new URL("https://example.test/checkout") };
      if (specifier === "@tanstack/react-start")
        return {
          createServerFn: () => ({
            validator(schema) {
              return {
                handler: (callback) => (input) => callback({ data: schema.parse(input.data) }),
              };
            },
          }),
        };
      return require(specifier);
    };
    vm.runInNewContext(
      result.outputText,
      {
        module,
        exports: module.exports,
        require: localRequire,
        window,
        queueMicrotask,
        console,
        URL,
        process: { env: { STRIPE_SECRET_KEY: "test-fixture-no-real-payments" } },
      },
      { filename },
    );
    return module.exports;
  }
  return { load, storage, stripeCalls, verifiedSession };
}
const selected = (id, overrides = {}) => ({
  id,
  qty: 1,
  cadence: "one-time",
  addOnIds: [],
  ...overrides,
});

test("ten canonical packages expose approved metadata and prices", () => {
  const { load } = fixture();
  const c = load("pricing-catalog");
  const packages = c.PAL_GROUPS.flatMap((g) => g.items);
  assert.equal(packages.length, 10);
  assert.equal(new Set(packages.map((p) => p.id)).size, 10);
  const expected = {
    "social-content": 1350,
    commercials: 1050,
    "product-demos": 1050,
    "customer-stories": 1050,
    "employee-spotlights": 1050,
    onboarding: 1350,
    "safety-training": 1350,
    "sales-training": 1350,
    "video-sops": 1650,
    "educational-videos": 1050,
  };
  for (const p of packages) {
    assert.equal(p.slug, p.id);
    assert.equal(c.computePackagePrice(p), expected[p.id]);
    assert.equal(p.price, expected[p.id]);
    assert.equal(p.learn.length, 3);
    assert.ok(p.format && p.outcome && p.icon.endsWith(".png"));
    assert.ok(fs.existsSync(path.join(root, "public", p.icon)), p.icon);
  }
  assert.equal(c.computePackagePrice(c.getPackageById("social-content"), 4, 2), 1500);
  assert.deepEqual(
    [0, 1, 2].map((n) => c.computePackagePrice(c.getPackageById("educational-videos"), n)),
    [1050, 1650, 2250],
  );
  assert.equal(c.PACKAGE_PRICING_BASIS, "finished-video");
  assert.equal(
    c.getPackageScope(c.getPackageById("social-content"), 4, 2),
    "2 filming sessions · 4 finished videos",
  );
});

test("all legacy links resolve without exposing duplicate catalog packages", () => {
  const { load } = fixture();
  const c = load("pricing-catalog");
  assert.equal(Object.keys(c.LEGACY_PACKAGE_IDS).length, 22);
  for (const [oldId, canonical] of Object.entries(c.LEGACY_PACKAGE_IDS)) {
    assert.equal(c.resolvePackageId(oldId), canonical);
    assert.equal(c.getItemById(oldId).id, canonical);
    assert.ok(c.LEGACY_PACKAGE_DEFAULTS[oldId]);
  }
});

test("configuration upserts one package, preserves other lines, and persists sessions", () => {
  const f = fixture();
  const cart = f.load("cart-store");
  cart.cartStore.add("diy-strategy-blueprint", 2);
  cart.cartStore.configurePackage("social-content", { count: 6, sessions: 1 });
  cart.cartStore.configurePackage("onboarding", { count: 4, sessions: 2 });
  cart.cartStore.configurePackage("social-content", { count: 8, sessions: 2 });
  const state = cart.cartStore.getSnapshot();
  assert.equal(state.selected["social-content"], 1);
  assert.equal(state.selected.onboarding, 1);
  assert.equal(state.selected["diy-strategy-blueprint"], 2);
  assert.equal(cart.getKitSessionCount(state.counts, "social-content"), 2);
  assert.equal(cart.buildReceiptLines(state).find((l) => l.id === "social-content").price, 2100);
  const reloaded = fixture(Object.fromEntries(f.storage))
    .load("cart-store")
    .cartStore.getSnapshot();
  assert.equal(reloaded.counts["social-content"], 8);
  assert.equal(reloaded.counts["kit-sessions:social-content"], 2);
});

test("v1 edited-minute plans migrate once using their saved duration, preserving the original", () => {
  const original = JSON.stringify({
    selected: { "reel-services": 1, "diy-25-reels": 1 },
    counts: { "reel-services": 6, "kit-duration:reel-services": 30 },
    cadence: "one-time",
  });
  const f = fixture({ "ph.quote.cart.v1": original });
  const cart = f.load("cart-store");
  const state = cart.cartStore.getSnapshot();
  assert.equal(state.counts["social-content"], 12);
  assert.equal(state.selected["diy-25-reels"], 1);
  assert.match(state.migrationNotice, /converted to finished-video counts/);
  assert.equal(f.storage.get("ph.quote.cart.v1"), original);
  const again = fixture(Object.fromEntries(f.storage)).load("cart-store").cartStore.getSnapshot();
  assert.equal(again.counts["social-content"], 12, "migration must not convert again");
});

test("colliding legacy scopes remain saved for review rather than silently overwriting", () => {
  const { load } = fixture({
    "ph.quote.cart.v1": JSON.stringify({
      selected: { "reel-services": 1, "reel-momentum": 1 },
      counts: {},
      cadence: "one-time",
    }),
  });
  const cart = load("cart-store");
  const state = cart.cartStore.getSnapshot();
  assert.equal(state.selected["social-content"], 1);
  assert.equal(state.counts["social-content"], 6);
  assert.equal(state.migrationReview[0].id, "reel-momentum");
  assert.equal(state.migrationReview[0].sessions, 2);
  assert.equal(state.migrationReview[0].count, 12);
});

test("server pricing agrees with receipt for sessions, add-ons, offers and digital products", () => {
  const { load } = fixture();
  const cart = load("cart-store");
  const q = load("quote-engine");
  cart.cartStore.configurePackage("social-content", { count: 8, sessions: 2 });
  cart.cartStore.configurePackage("commercials", { count: 4, sessions: 1 });
  cart.cartStore.setCount(cart.kitAddOnCountKey("social-content", "caption-pack"), 1);
  cart.cartStore.add("diy-strategy-blueprint", 2);
  cart.cartStore.applyOffer("STARTERDUO");
  const snapshot = q.buildQuoteSnapshot({
    cart: cart.cartStore.getSnapshot(),
    reference: "PH-TEST12",
  });
  const priced = q.priceCheckoutItems(snapshot.items, snapshot.offerCode);
  assert.equal(
    snapshot.subtotal,
    priced.reduce((sum, line) => sum + line.total, 0),
  );
  assert.equal(snapshot.subtotal, 2948);
  assert.equal(snapshot.deposit, 329);
  assert.equal(snapshot.items.find((i) => i.id === "social-content").sessions, 2);
});

test("server rejects malformed scope, duplicate lines, old IDs and incompatible add-ons", () => {
  const q = fixture().load("quote-engine");
  for (const item of [
    selected("social-content", { count: 6, sessions: 0 }),
    selected("social-content", { count: 21, sessions: 1 }),
    selected("social-content", { count: 1.5, sessions: 1 }),
    selected("social-content", { count: NaN }),
    selected("educational-videos", { count: 3 }),
    selected("educational-videos", { sessions: 1 }),
    selected("educational-videos", { durationSeconds: 30 }),
    selected("social-content", { addOnIds: ["caption-pack", "caption-pack"] }),
    selected("social-content", { addOnIds: ["repurpose-pack-6"] }),
    selected("diy-25-reels", { count: 2 }),
    selected("diy-25-reels", { cadence: "monthly" }),
    selected("reel-services"),
    selected("unknown"),
  ])
    assert.throws(() => q.priceCheckoutItems([item]), JSON.stringify(item));
  assert.throws(() => q.priceCheckoutItems([selected("commercials"), selected("commercials")]));
});

test("two-for-one uses exact aggregate pricing for odd quantities", () => {
  const q = fixture().load("quote-engine");
  assert.equal(
    q.priceCheckoutItems([selected("extra-edited-video", { qty: 7 })], "EDIT2FOR1")[0].total,
    600,
  );
});

test("production payment is gated, legitimate DIY checkout remains server-priced", async () => {
  const f = fixture();
  const stripe = f.load("stripe-checkout");
  const base = { email: "buyer@example.test", name: "Buyer", reference: "PH-TEST12" };
  const production = await stripe.createDepositCheckout({
    data: { ...base, items: [selected("social-content", { count: 6, sessions: 2 })] },
  });
  assert.equal(production.code, "PRODUCTION_REQUIRES_CONFIRMED_QUOTE");
  assert.equal(f.stripeCalls.length, 0);
  const digital = await stripe.createDepositCheckout({
    data: { ...base, items: [selected("diy-strategy-blueprint", { qty: 2 })] },
  });
  assert.equal(digital.ok, true);
  assert.equal(f.stripeCalls[0].line_items[0].price_data.unit_amount, 1900);
  assert.equal(f.stripeCalls[0].line_items[0].quantity, 2);
  assert.equal(JSON.parse(f.stripeCalls[0].metadata.item_0).qty, 2);
  assert.equal(
    (await stripe.verifyDepositCheckout({ data: { sessionId: "cs_test_fixture" } })).status,
    "paid",
  );
});

test("global cadence and per-package cadence still behave independently", () => {
  const { load } = fixture();
  const cart = load("cart-store");
  const q = load("quote-engine");
  cart.cartStore.configurePackage("social-content", { count: 6, sessions: 1 });
  cart.cartStore.configurePackage("commercials", { count: 4, sessions: 1 });
  cart.cartStore.add("diy-strategy-blueprint");
  cart.cartStore.setCadence("monthly");
  let lines = cart.buildReceiptLines(cart.cartStore.getSnapshot());
  assert.equal(lines.find((l) => l.id === "social-content").price, 1080);
  assert.equal(lines.find((l) => l.id === "diy-strategy-blueprint").price, 19);
  cart.cartStore.setCount(cart.kitCadenceCountKey("commercials"), 0);
  const state = cart.cartStore.getSnapshot();
  const items = q.cartToCheckoutItems(state);
  assert.equal(q.getCadenceMix(items), "mixed");
  const priced = q.priceCheckoutItems(items, "STARTERDUO");
  assert.equal(
    priced.find((l) => l.configuration.id === "commercials").unitPrice,
    1050,
    "Duo requires both packages one-time",
  );
  assert.equal(
    cart.cartSubtotal(cart.buildReceiptLines({ ...state, offerCode: "STARTERDUO" })),
    priced.reduce((sum, l) => sum + l.total, 0),
  );
});

test("legacy runtime exceeding supported video count stays available for review", () => {
  const { load } = fixture({
    "ph.quote.cart.v1": JSON.stringify({
      selected: { "reel-services": 1, "diy-25-reels": 1 },
      counts: { "reel-services": 6, "kit-duration:reel-services": 15 },
      cadence: "one-time",
    }),
  });
  const cart = load("cart-store");
  const state = cart.cartStore.getSnapshot();
  assert.equal(state.selected["social-content"], undefined);
  assert.equal(state.migrationReview[0].count, 24);
  assert.equal(cart.cartItemCount(state), 1);
  assert.equal(cart.buildReceiptLines(state)[0].id, "diy-25-reels");
});

test("every supported package scope matches client receipts and server arithmetic", () => {
  const { load } = fixture();
  const c = load("pricing-catalog"),
    cart = load("cart-store"),
    q = load("quote-engine");
  for (const p of c.PAL_GROUPS.flatMap((g) => g.items)) {
    for (const sessions of p.lane === "evergreen" ? [0] : [1, 2, 3, 4]) {
      for (let count = p.editable.min; count <= p.editable.max; count++) {
        const expected = p.lane === "evergreen" ? 1050 + count * 600 : sessions * 450 + count * 150;
        const state = {
          selected: { [p.id]: 1 },
          counts: { [p.id]: count, [cart.kitSessionCountKey(p.id)]: sessions },
          cadence: "one-time",
          pricingBasis: "finished-video",
        };
        assert.equal(c.computePackagePrice(p, count, sessions), expected);
        assert.equal(cart.cartSubtotal(cart.buildReceiptLines(state)), expected);
        assert.equal(q.priceCheckoutItems(q.cartToCheckoutItems(state))[0].total, expected);
      }
    }
  }
});

test("legacy add-ons that no longer fit the new lane remain in the saved review", () => {
  const f = fixture({
    "ph.quote.cart.v1": JSON.stringify({
      selected: { "spotlight-bts": 1 },
      counts: {
        "kit-addon:spotlight-bts:evergreen-how-it-works-addon": 1,
        "kit-addon:spotlight-bts:caption-pack": 1,
      },
      cadence: "monthly",
    }),
  });
  const state = f.load("cart-store").cartStore.getSnapshot();
  assert.equal(state.selected["social-content"], undefined);
  assert.equal(state.migrationReview[0].cadence, "monthly");
  assert.deepEqual(Array.from(state.migrationReview[0].addOnIds), [
    "caption-pack",
    "evergreen-how-it-works-addon",
  ]);
});

test("over-limit legacy scope keeps cadence, add-ons, and saved video length for review", () => {
  const f = fixture({
    "ph.quote.cart.v1": JSON.stringify({
      selected: { "reel-services": 1 },
      counts: {
        "reel-services": 6,
        "kit-duration:reel-services": 15,
        "kit-addon:reel-services:caption-pack": 1,
      },
      cadence: "monthly",
    }),
  });
  const pending = f.load("cart-store").cartStore.getSnapshot().migrationReview[0];
  assert.equal(pending.count, 24);
  assert.equal(pending.durationSeconds, 15);
  assert.equal(pending.cadence, "monthly");
  assert.deepEqual(Array.from(pending.addOnIds), ["caption-pack"]);
});

test("valid unselected drafts migrate units and corrupted v2 data preserves a valid legacy plan", () => {
  const legacy = JSON.stringify({
    selected: { "diy-25-reels": 1 },
    counts: { "reel-momentum": 6, "kit-duration:reel-momentum": 30 },
    cadence: "one-time",
  });
  const f = fixture({ "ph.quote.cart.v2": "broken JSON", "ph.quote.cart.v1": legacy });
  const cart = f.load("cart-store"),
    state = cart.cartStore.getSnapshot();
  assert.equal(state.selected["diy-25-reels"], 1);
  assert.equal(state.counts["social-content"], 12);
  assert.equal(cart.getKitSessionCount(state.counts, "social-content"), 2);
  assert.equal(f.storage.get("ph.quote.cart.v1"), legacy);
});

test("verified digital metadata supplies factual receipt details, malformed metadata never clears a cart", async () => {
  const f = fixture();
  f.verifiedSession.metadata = {
    quote_reference: "PH-TEST12",
    configuration_version: "2",
    item_count: "1",
    item_0: JSON.stringify({ id: "diy-strategy-blueprint", qty: 2 }),
  };
  const stripe = f.load("stripe-checkout");
  const paid = await stripe.verifyDepositCheckout({ data: { sessionId: "cs_test_receipt" } });
  assert.equal(paid.purchaseKind, "digital");
  assert.equal(paid.reference, "PH-TEST12");
  assert.equal(paid.purchasedItems[0].id, "diy-strategy-blueprint");
  assert.equal(paid.purchasedItems[0].qty, 2);
  assert.equal(paid.amountTotal, 3800);
  assert.equal(paid.currency, "usd");
  f.verifiedSession.metadata.item_0 = '{"id":"social-content","qty":1}';
  const invalid = await stripe.verifyDepositCheckout({ data: { sessionId: "cs_test_receipt" } });
  assert.equal(invalid.purchaseKind, "legacy");
  assert.equal(invalid.purchasedItems.length, 0);
});

test("digital reconciliation keeps new units and unrelated plans and survives receipt revisits", () => {
  const f = fixture();
  const cart = f.load("cart-store");
  const bought = [{ id: "diy-strategy-blueprint", qty: 2 }];
  cart.cartStore.add("diy-strategy-blueprint", 2);
  cart.cartStore.rememberDigitalCheckout("PH-TEST12", bought);
  cart.cartStore.add("diy-strategy-blueprint", 1);
  cart.cartStore.add("diy-25-reels", 1);
  cart.cartStore.configurePackage("onboarding", { count: 4, sessions: 2 });
  cart.cartStore.reconcileDigitalPurchase("cs_test_receipt", "PH-TEST12", bought);
  const state = cart.cartStore.getSnapshot();
  assert.equal(state.selected["diy-strategy-blueprint"], 1);
  assert.equal(state.selected["diy-25-reels"], 1);
  assert.equal(state.selected.onboarding, 1);
  const refreshed = fixture(Object.fromEntries(f.storage)).load("cart-store");
  refreshed.cartStore.reconcileDigitalPurchase("cs_test_receipt", "PH-TEST12", bought);
  assert.equal(refreshed.cartStore.getSnapshot().selected["diy-strategy-blueprint"], 1);
  refreshed.cartStore.reset();
  refreshed.cartStore.add("diy-strategy-blueprint", 2);
  refreshed.cartStore.reconcileDigitalPurchase("cs_test_receipt", "PH-TEST12", bought);
  assert.equal(refreshed.cartStore.getSnapshot().selected["diy-strategy-blueprint"], 2);
});

test("removed-and-readded digital selections and unremembered receipts remain untouched", () => {
  const { load } = fixture();
  const cart = load("cart-store"),
    bought = [{ id: "diy-strategy-blueprint", qty: 2 }];
  cart.cartStore.add("diy-strategy-blueprint", 2);
  cart.cartStore.rememberDigitalCheckout("PH-TEST12", bought);
  cart.cartStore.changeQty("diy-strategy-blueprint", 0);
  cart.cartStore.add("diy-strategy-blueprint", 2);
  cart.cartStore.reconcileDigitalPurchase("cs_test_first", "PH-TEST12", bought);
  assert.equal(cart.cartStore.getSnapshot().selected["diy-strategy-blueprint"], 2);
  cart.cartStore.reconcileDigitalPurchase("cs_test_old_link", "PH-UNKNOWN", bought);
  assert.equal(cart.cartStore.getSnapshot().selected["diy-strategy-blueprint"], 2);
});
