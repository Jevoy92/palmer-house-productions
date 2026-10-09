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
const bookingLinks = {};
vm.runInNewContext(
  compile(readFileSync(new URL("../src/lib/booking-links.ts", import.meta.url), "utf8")),
  { exports: bookingLinks, Intl, Date, Number, Set, String },
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
      useLoaderData: () =>
        visibleVerification?.mode ? visibleVerification : { mode: "receipt", result: visibleVerification },
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
    verifyCoveredBooking: () => {
      throw new Error("Live booking verification is forbidden in tests");
    },
  },
  "@/lib/honeybook": { HONEYBOOK_LEAD_FORM_URL: "https://honeybook.test/form" },
  "@/lib/booking-links": bookingLinks,
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
const { loadCheckoutReceipt, loadCoveredBooking, reconcileVerifiedReceipt, Route } = exports;
const render = () => renderToStaticMarkup(React.createElement(Route.component));
const deposit = {
  status: "paid",
  purchaseKind: "production_deposit",
  reference: "PH-DEP234",
  purchasedItems: [],
  amountTotal: 22500,
  currency: "usd",
  paidAt: Date.UTC(2026, 9, 1, 18),
};
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

test("verified deposit shows the planning call next to intake and receipt", () => {
  visibleVerification = deposit;
  const html = render();
  assert.match(html, /Book your planning call/);
  assert.match(html, /calendar\.google\.com\/calendar\/u\/0\/appointments\/schedules\/AcZssZ3U/);
  assert.match(html, /does not reserve a filming date/);
  assert.match(html, /book by October 8, 2026; meet by October 15, 2026/);
  assert.match(html, /Complete your project intake/);
  assert.match(html, /\$225\.00/);
  assert.doesNotMatch(html, /AcZssZ2V/); // never the Studio onboarding link
  assert.doesNotMatch(html, /zoom\.us/i);
});

test("unpaid, pending or digital receipts never show the planning call", () => {
  for (const v of [{ status: "pending" }, { status: "invalid" }, { status: "unavailable" }, paidDigital]) {
    visibleVerification = v;
    assert.doesNotMatch(render(), /Book your planning call/);
  }
});

test("covered Partner bookings require a server-verified redemption", async () => {
  let calls = 0;
  for (const id of [null, "1", "included", "not-a-uuid"]) {
    const r = await loadCoveredBooking(id, async () => (calls++, { status: "covered" }));
    assert.equal(r.status, "invalid");
  }
  assert.equal(calls, 0);
  const failed = await loadCoveredBooking("7a1f2c3d-1111-4222-8333-944455556666", async () => {
    throw new Error("down");
  });
  assert.equal(failed.status, "unavailable");

  visibleVerification = { mode: "covered", result: { status: "invalid" } };
  let html = render();
  assert.doesNotMatch(html, /filming session is booked|Book your planning call/);
  assert.match(html, /cart is still saved/);

  visibleVerification = {
    mode: "covered",
    result: { status: "covered", reference: "PH-COV234", confirmedAt: Date.UTC(2026, 9, 1, 18) },
  };
  html = render();
  assert.match(html, /Your filming session is booked/);
  assert.match(html, /Book your planning call/);
  assert.match(html, /PH-COV234/);
});

test("paid onboarding eligibility excludes free, trial, held and lapsed members", () => {
  const now = Date.UTC(2026, 9, 9);
  const ok = { plan: "creator", status: "active", billing_hold: false, current_period_end: "2026-11-01" };
  assert.equal(bookingLinks.isActivePaidMember(ok, now), true);
  assert.equal(bookingLinks.isActivePaidMember({ ...ok, plan: "partner" }, now), true);
  for (const bad of [
    null,
    { ...ok, plan: "free" },
    { ...ok, plan: "trial" },
    { ...ok, status: "canceled" },
    { ...ok, status: "past_due" },
    { ...ok, billing_hold: true },
    { ...ok, current_period_end: "2026-10-01" },
  ])
    assert.equal(bookingLinks.isActivePaidMember(bad, now), false);
});
