import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const catalog = {};
const compile = (source) =>
  ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
    },
  }).outputText;
vm.runInNewContext(
  compile(readFileSync(new URL("../src/lib/pricing-catalog.ts", import.meta.url), "utf8")),
  { exports: catalog, require: () => ({ default: "fixture-asset" }) },
);
let visibleVerification;
const exports = {};
const modules = {
  react: React,
  "react/jsx-runtime": require("react/jsx-runtime"),
  "lucide-react": require("lucide-react"),
  "@tanstack/react-router": {
    createFileRoute: () => (config) => ({
      ...config,
      useSearch: () => ({ session_id: "cs_test_paid_session" }),
      useLoaderData: () => visibleVerification,
    }),
    Link: ({ to, children, ...props }) =>
      React.createElement("a", { href: to, ...props }, children),
  },
  "@/lib/pricing-catalog": catalog,
  "@/components/collection/CollectionShell": {
    CollectionShell: ({ children }) => React.createElement("main", {}, children),
  },
  "@/lib/cart-store": {
    cartStore: {
      reset: () => {
        throw new Error("Cart reset is forbidden");
      },
      reconcileDigitalPurchase: () => {
        throw new Error("Reconciliation must be mocked");
      },
    },
  },
  "@/lib/stripe-checkout": {
    verifyDepositCheckout: () => {
      throw new Error("Live payment verification is forbidden in tests");
    },
  },
};
vm.runInNewContext(
  compile(readFileSync(new URL("../src/routes/checkout-success.tsx", import.meta.url), "utf8")),
  {
    exports,
    require: (id) => {
      if (!(id in modules)) throw new Error(`Unexpected import: ${id}`);
      return modules[id];
    },
  },
);
const { loadCheckoutReceipt, reconcileVerifiedReceipt, Route } = exports;
const paidDigital = {
  status: "paid",
  purchaseKind: "digital",
  reference: "PH-ABC234",
  purchasedItems: [{ id: catalog.DIY_DOWNLOADS[0].id, qty: 2 }],
  amountTotal: 9999,
  currency: "usd",
};

test("missing and malformed session IDs never call payment verification", async () => {
  let calls = 0;
  for (const id of [null, "", "  ", "short", "a".repeat(256)]) {
    const result = await loadCheckoutReceipt(id, async () => {
      calls += 1;
      return paidDigital;
    });
    assert.equal(result.status, "invalid");
  }
  assert.equal(calls, 0);
});

test("verification failure stays unavailable and pending never becomes paid", async () => {
  const unavailable = await loadCheckoutReceipt("cs_test_paid_session", async () => {
    throw new Error("unavailable");
  });
  assert.equal(unavailable.status, "unavailable");
  const pending = await loadCheckoutReceipt("cs_test_paid_session", async () => ({
    status: "pending",
  }));
  assert.equal(pending.status, "pending");
  const verified = await loadCheckoutReceipt("  cs_test_paid_session  ", async ({ data }) => {
    assert.equal(data.sessionId, "cs_test_paid_session");
    return paidDigital;
  });
  assert.equal(verified, paidDigital);
});

test("only verified digital receipts hand their exact purchased items to guarded reconciliation", () => {
  const calls = [];
  const reconcile = (...args) => calls.push(args);
  for (const result of [
    { status: "invalid" },
    { status: "unavailable" },
    { status: "pending" },
    { ...paidDigital, purchaseKind: "legacy", purchasedItems: [] },
  ]) {
    reconcileVerifiedReceipt("cs_test_paid_session", result, reconcile);
  }
  reconcileVerifiedReceipt("", paidDigital, reconcile);
  assert.equal(calls.length, 0);
  reconcileVerifiedReceipt("cs_test_paid_session", paidDigital, reconcile);
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0], ["cs_test_paid_session", "PH-ABC234", paidDigital.purchasedItems]);
});

test("digital receipt renders actual paid amount and download support without a production/deposit promise", () => {
  visibleVerification = paidDigital;
  const html = renderToStaticMarkup(React.createElement(Route.component));
  assert.match(html, /Thanks for your purchase/);
  assert.match(html, /Your digital order/);
  assert.match(html, /Qty 2/);
  assert.match(html, /\$99\.99/);
  assert.match(html, /PH-ABC234/);
  assert.match(html, /Get help with downloads/);
  assert.doesNotMatch(html, /booking|deposit|schedule|production-ready|scope confirmed/i);
});

test("legacy payments are neutral receipts and do not claim the whole project is paid in full", () => {
  visibleVerification = { ...paidDigital, purchaseKind: "legacy", purchasedItems: [] };
  const html = renderToStaticMarkup(React.createElement(Route.component));
  assert.match(html, /Your payment is confirmed/);
  assert.match(html, /Amount paid/);
  assert.doesNotMatch(html, /Paid in full|digital order|production-ready|booking/i);
});

test("unverified status never displays a paid receipt", () => {
  for (const status of ["pending", "unavailable", "invalid"]) {
    visibleVerification = { status };
    const html = renderToStaticMarkup(React.createElement(Route.component));
    assert.match(html, /cart is still saved/);
    assert.doesNotMatch(html, /Payment confirmed|Paid in full|Your digital order/);
  }
});
