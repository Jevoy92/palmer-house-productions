import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const root = path.resolve(import.meta.dirname, "..");

// Execute the actual helper, cart, catalog and server pricing functions. Only
// browser storage and the React subscription are isolated; no network is used.
function fixture(initialStorage = {}) {
  const storage = new Map(Object.entries(initialStorage));
  const cache = new Map();
  const window = {
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
    },
    addEventListener() {},
    removeEventListener() {},
  };
  function load(relativePath) {
    const filename = path.resolve(root, relativePath);
    if (cache.has(filename)) return cache.get(filename).exports;
    const module = { exports: {} };
    cache.set(filename, module);
    const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    });
    vm.runInNewContext(
      compiled.outputText,
      {
        module,
        exports: module.exports,
        require(specifier) {
          if (specifier.startsWith("@/assets/")) return specifier;
          if (specifier.startsWith("@/")) return load(`src/${specifier.slice(2)}.ts`);
          if (specifier.startsWith("./"))
            return load(path.resolve(path.dirname(filename), `${specifier}.ts`));
          if (specifier === "react")
            return { useSyncExternalStore: (_, getSnapshot) => getSnapshot() };
          throw new Error(`Unexpected dependency in package estimate fixture: ${specifier}`);
        },
        window,
        queueMicrotask,
        console,
      },
      { filename },
    );
    return module.exports;
  }
  return {
    storage,
    cart: load("src/lib/cart-store.ts"),
    catalog: load("src/lib/pricing-catalog.ts"),
    quote: load("src/lib/quote-engine.ts"),
    estimate: load("src/components/collection/package-estimate.ts").packageEstimate,
  };
}

function assertCheckoutTotal(f, estimate, expected) {
  const snapshot = f.quote.buildQuoteSnapshot({
    cart: estimate.cart,
    reference: "PH-TEST12",
  });
  const serverLine = f.quote
    .priceCheckoutItems(snapshot.items, snapshot.offerCode)
    .find((line) => line.configuration.id === estimate.line.id);
  assert.ok(serverLine, "the estimate must reach the server quote as the same package");
  assert.equal(serverLine.total, expected);
  assert.equal(estimate.total, expected);
  assert.equal(estimate.total, estimate.line.price * estimate.line.qty);
}

function saveProjection(cart, estimate) {
  // The detail and pricing pages commit these two projected maps.
  cart.cartStore.setSelected(estimate.cart.selected);
  cart.cartStore.setCounts(estimate.cart.counts);
}

function freezeDeep(value) {
  for (const child of Object.values(value))
    if (child && typeof child === "object") freezeDeep(child);
  return Object.freeze(value);
}

test("a saved extra and quantity are included in the displayed line total and scope", () => {
  const f = fixture();
  const { cartStore, kitAddOnCountKey } = f.cart;
  const item = f.catalog.getPackageById("social-content");
  cartStore.configurePackage(item.id, { count: 10, sessions: 1 });
  cartStore.setCount(kitAddOnCountKey(item.id, "caption-pack"), 1);
  cartStore.changeQty(item.id, 3);
  const original = freezeDeep(cartStore.getSnapshot());
  const before = JSON.stringify(original);

  const estimate = f.estimate(original, item);

  // Three copies of ($450 filming + 10 × $150 videos + $75 captions).
  assertCheckoutTotal(f, estimate, 6075);
  assert.equal(estimate.line.price, 2025);
  assert.match(estimate.scope, /3 packages/);
  assert.match(estimate.scope, /10 finished videos each/);
  assert.match(estimate.scope, /Includes Caption Pack/);
  assert.equal(JSON.stringify(original), before, "rendering must not mutate the saved plan");
});

test("monthly savings apply to saved extras before multiplying by quantity", () => {
  const f = fixture();
  const { cartStore, kitAddOnCountKey, kitCadenceCountKey } = f.cart;
  const item = f.catalog.getPackageById("social-content");
  cartStore.configurePackage(item.id, { count: 10, sessions: 1 });
  cartStore.setCount(kitAddOnCountKey(item.id, "caption-pack"), 1);
  cartStore.setCount(kitCadenceCountKey(item.id), 1);
  cartStore.changeQty(item.id, 3);

  const estimate = f.estimate(cartStore.getSnapshot(), item);

  assertCheckoutTotal(f, estimate, 4860);
  assert.equal(estimate.line.price, 1620);
  assert.match(estimate.scope, /Monthly/);
  assert.match(estimate.scope, /Caption Pack/);
  assert.doesNotMatch(estimate.scope, /Offer applied/);
});

test("a bundle discounts the package base, retains full-price extras, and counts other eligible lines", () => {
  const f = fixture();
  const { cartStore, kitAddOnCountKey } = f.cart;
  const item = f.catalog.getPackageById("social-content");
  cartStore.configurePackage(item.id, { count: 10, sessions: 1 });
  cartStore.configurePackage("commercials", { count: 4, sessions: 1 });
  cartStore.setCount(kitAddOnCountKey(item.id, "caption-pack"), 1);
  cartStore.changeQty(item.id, 3);
  cartStore.applyOffer("STARTERDUO");

  const estimate = f.estimate(cartStore.getSnapshot(), item, { count: 12 });

  // Three copies of ($2,250 × 90% + $75), not 90% of the extras too.
  assertCheckoutTotal(f, estimate, 6300);
  assert.equal(estimate.line.price, 2100);
  assert.match(estimate.scope, /Offer applied/);
  assert.equal(estimate.cart.selected.commercials, 1);
  assert.equal(estimate.cart.counts.commercials, 4);
});

test("scope and extra edits preserve saved quantity, cadence, other lines and persisted sessions", () => {
  const f = fixture();
  const { cartStore, kitAddOnCountKey, kitCadenceCountKey, kitSessionCountKey } = f.cart;
  const item = f.catalog.getPackageById("social-content");
  cartStore.configurePackage(item.id, { count: 6, sessions: 1 });
  cartStore.setCount(kitAddOnCountKey(item.id, "caption-pack"), 1);
  cartStore.setCount(kitCadenceCountKey(item.id), 1);
  cartStore.changeQty(item.id, 2);
  cartStore.add("diy-strategy-blueprint", 2);
  const original = cartStore.getSnapshot();
  const before = JSON.stringify(original);

  const estimate = f.estimate(original, item, {
    count: 8,
    sessions: 2,
    extras: { "caption-pack": false, "thumbnail-set": true },
  });

  // Two monthly copies of ($900 filming + $1,200 videos + $50 thumbnails).
  assertCheckoutTotal(f, estimate, 3440);
  assert.equal(estimate.cart.selected[item.id], 2);
  assert.equal(estimate.cart.selected["diy-strategy-blueprint"], 2);
  assert.equal(estimate.cart.counts[kitCadenceCountKey(item.id)], 1);
  assert.match(estimate.scope, /2 filming sessions/);
  assert.match(estimate.scope, /Thumbnail Set/);
  assert.doesNotMatch(estimate.scope, /Caption Pack/);
  assert.equal(JSON.stringify(original), before);

  saveProjection(f.cart, estimate);
  const reloaded = fixture(Object.fromEntries(f.storage));
  const saved = reloaded.cart.cartStore.getSnapshot();
  assert.equal(saved.counts[kitSessionCountKey(item.id)], 2);
  assert.equal(saved.counts[kitAddOnCountKey(item.id, "caption-pack")] || 0, 0);
  assert.equal(saved.counts[kitAddOnCountKey(item.id, "thumbnail-set")], 1);
  assertCheckoutTotal(
    reloaded,
    reloaded.estimate(saved, reloaded.catalog.getPackageById(item.id)),
    3440,
  );
});

test("Evergreen preserves eligible saved add-ons while changing episode length", () => {
  const f = fixture();
  const { cartStore, kitAddOnCountKey } = f.cart;
  const item = f.catalog.getPackageById("educational-videos");
  cartStore.configurePackage(item.id, { count: 0, sessions: 0 });
  cartStore.setCount(kitAddOnCountKey(item.id, "repurpose-pack-6"), 1);
  cartStore.changeQty(item.id, 2);

  const estimate = f.estimate(cartStore.getSnapshot(), item, { count: 1 });

  assertCheckoutTotal(f, estimate, 3800);
  assert.match(estimate.scope, /10-minute episode/);
  assert.match(estimate.scope, /Repurpose Pack \(6 shorts\)/);
  assert.doesNotMatch(estimate.scope, /0 filming sessions/);
});

test("new packages keep approved one-time defaults without changing other monthly lines", () => {
  const f = fixture();
  const { cartStore, buildReceiptLines, kitCadenceCountKey } = f.cart;
  cartStore.configurePackage("onboarding", { count: 6, sessions: 1 });
  cartStore.setCadence("monthly");
  const item = f.catalog.getPackageById("social-content");

  const estimate = f.estimate(cartStore.getSnapshot(), item);

  assertCheckoutTotal(f, estimate, 1350);
  assert.equal(estimate.line.qty, 1);
  assert.equal(estimate.line.cadence, "one-time");
  assert.equal(estimate.cart.counts[kitCadenceCountKey(item.id)], 0);
  assert.doesNotMatch(estimate.scope, /Monthly|Includes|Offer applied/);
  saveProjection(f.cart, estimate);
  const receipt = buildReceiptLines(cartStore.getSnapshot());
  assert.equal(receipt.find((line) => line.id === item.id).price, 1350);
  assert.equal(receipt.find((line) => line.id === item.id).cadence, "one-time");
  assert.equal(receipt.find((line) => line.id === "onboarding").cadence, "monthly");
  assert.equal(receipt.find((line) => line.id === "onboarding").price, 1080);
});
