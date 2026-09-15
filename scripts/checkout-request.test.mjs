import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const source = readFileSync(
  new URL("../src/components/collection/CheckoutPage.tsx", import.meta.url),
  "utf8",
);
// Exercise the actual checkout adapter with module imports stubbed; no UI is rendered
// and no configured endpoint is reachable from this isolated context.
const compiled = ts.transpileModule(source.replaceAll("import.meta.env", "({})"), {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.ReactJSX,
  },
}).outputText;
const exports = {};
const catalog = {};
vm.runInNewContext(
  ts.transpileModule(
    readFileSync(new URL("../src/lib/pricing-catalog.ts", import.meta.url), "utf8"),
    {
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
    },
  ).outputText,
  { exports: catalog, require: () => ({ default: "fixture-asset" }) },
);
vm.runInNewContext(compiled, {
  exports,
  require: (id) => (id === "@/lib/pricing-catalog" ? catalog : {}),
  AbortController,
  URL,
  setTimeout,
  clearTimeout,
  fetch: () => {
    throw new Error("Real network is forbidden in these tests");
  },
});
const {
  submitPlanRequest,
  submitCheckoutRequest,
  isDigitalOnly,
  planHandoff,
  planEmailUrl,
  validatePlanDetails,
} = exports;
const request = Object.freeze({
  name: "Taylor & Co",
  email: "taylor@example.test",
  company: "",
  city: "Seattle, WA",
  timing: "Next month",
  ongoing: false,
  source: "palmerhouseproductions.com",
  projectType: "Video production plan",
  message:
    "Name: Taylor & Co\nEmail: taylor@example.test\nFilming city: Seattle, WA\nSocial Content × 1 — $1,350\n1 filming session · 6 finished videos\nDIY Workbook × 2 — $38\nEstimate only; tax and travel to be confirmed.",
  quote: Object.freeze({
    reference: "PH-ABC234",
    items: [
      { id: "social-content", qty: 1, count: 6, sessions: 1, cadence: "one-time", addOnIds: [] },
      { id: "diy-workbook", qty: 2, cadence: "one-time", addOnIds: [] },
    ],
    subtotal: 1388,
    cadenceMix: "one-time",
  }),
});

test("only a successful intake response confirms receipt and preserves all cart lines", async () => {
  let observed;
  const result = await submitPlanRequest(request, {
    endpoint: "/configured-intake",
    honeyBookUrl: "https://example.test/honeybook",
    fetcher: async (url, options) => {
      observed = { url, options };
      return { ok: true, status: 201 };
    },
  });
  assert.equal(result.kind, "received");
  assert.equal(observed.url, "/configured-intake");
  assert.equal(observed.options.method, "POST");
  assert.equal(observed.options.headers["content-type"], "application/json");
  assert.deepEqual(JSON.parse(observed.options.body), request);
  assert.equal("deposit" in JSON.parse(observed.options.body).quote, false);
  assert.equal(JSON.parse(observed.options.body).quote.items[1].qty, 2);
});

test("non-2xx and rejected requests stay retryable without silently opening a fallback", async () => {
  for (const fetcher of [
    async () => ({ ok: false, status: 500 }),
    async () => {
      throw new Error("offline");
    },
  ]) {
    const result = await submitPlanRequest(request, {
      endpoint: "/configured-intake",
      honeyBookUrl: "https://example.test/honeybook",
      fetcher,
    });
    assert.equal(result.kind, "error");
    assert.match(result.message, /couldn’t confirm receipt/);
    assert.equal("url" in result, false);
  }
  assert.equal(request.quote.items.length, 2);
  assert.equal(request.email, "taylor@example.test");
});

test("timed-out intake aborts and does not claim a request was received", async () => {
  let aborted = false;
  const result = await submitPlanRequest(request, {
    endpoint: "/configured-intake",
    honeyBookUrl: "",
    timeoutMs: 5,
    fetcher: (_url, { signal }) =>
      new Promise((_resolve, reject) =>
        signal.addEventListener("abort", () => {
          aborted = true;
          reject(new Error("abort"));
        }),
      ),
  });
  assert.equal(aborted, true);
  assert.equal(result.kind, "error");
});

test("configured HoneyBook is a handoff, never a successful submission", async () => {
  const result = await submitPlanRequest(request, {
    endpoint: "",
    honeyBookUrl: "https://example.test/honeybook?quote=PH-ABC234",
  });
  assert.equal(result.kind, "honeybook");
  assert.equal(result.url, "https://example.test/honeybook?quote=PH-ABC234");
  assert.equal(planHandoff(request, result.url).kind, "honeybook");
});

test("unconfigured or invalid handoffs create an explicitly unsent, correctly encoded email draft", async () => {
  for (const honeyBookUrl of ["", "javascript:alert(1)", "not a URL"]) {
    const result = await submitPlanRequest(request, { endpoint: "", honeyBookUrl });
    assert.equal(result.kind, "email");
    assert.equal(result.url, planEmailUrl(request));
    const url = new URL(result.url);
    assert.equal(url.protocol, "mailto:");
    assert.equal(url.pathname, "info@palmerhouseproductions.com");
    assert.equal(url.searchParams.get("body"), request.message);
    assert.match(url.searchParams.get("subject"), /PH-ABC234/);
  }
});

test("required detail validation blocks empty fields and malformed email", () => {
  const blank = validatePlanDetails({
    name: " ",
    email: "bad email",
    city: " ",
    timing: "Flexible",
    ongoing: false,
  });
  assert.deepEqual(Object.keys(blank), ["name", "email", "city"]);
  const valid = validatePlanDetails({
    name: " Taylor ",
    email: "taylor@example.test ",
    city: " Seattle ",
    timing: "Flexible",
    ongoing: false,
  });
  assert.equal(Object.keys(valid).length, 0);
});

const digitalRequest = {
  ...request,
  city: "",
  quote: {
    ...request.quote,
    items: [{ id: catalog.DIY_DOWNLOADS[0].id, qty: 2, cadence: "one-time", addOnIds: [] }],
  },
};

test("pure DIY creates a secure payment session with server-priced items, without sending a production inquiry", async () => {
  let checkoutInput;
  const result = await submitCheckoutRequest(digitalRequest, {
    endpoint: "/configured-intake",
    honeyBookUrl: "https://example.test/honeybook",
    fetcher: () => {
      throw new Error("A digital purchase must not send a production inquiry");
    },
    createCheckout: async (input) => {
      checkoutInput = input;
      return { ok: true, url: "https://checkout.stripe.com/c/pay_test_session" };
    },
  });
  assert.equal(result.kind, "payment");
  assert.equal(result.url, "https://checkout.stripe.com/c/pay_test_session");
  assert.deepEqual(checkoutInput.data.items, digitalRequest.quote.items);
  assert.equal(checkoutInput.data.email, digitalRequest.email);
  assert.equal("subtotal" in checkoutInput.data, false);
  assert.equal("deposit" in checkoutInput.data, false);
  assert.equal(
    "city" in validatePlanDetails({ ...digitalRequest, timing: "Flexible", ongoing: false }, false),
    false,
  );
});

test("production and mixed plans never create a payment session", async () => {
  for (const items of [
    request.quote.items,
    [request.quote.items[0]],
    [...digitalRequest.quote.items, request.quote.items[0]],
  ]) {
    let paymentCalls = 0;
    const result = await submitCheckoutRequest(
      { ...request, quote: { ...request.quote, items } },
      {
        endpoint: "/configured-intake",
        honeyBookUrl: "",
        fetcher: async () => ({ ok: true, status: 200 }),
        createCheckout: async () => {
          paymentCalls += 1;
          throw new Error("Production cannot pay before quote approval");
        },
      },
    );
    assert.equal(result.kind, "received");
    assert.equal(paymentCalls, 0);
  }
});

test("pending saved scope keeps even a digital-only or otherwise empty cart in the inquiry flow", async () => {
  for (const items of [digitalRequest.quote.items, []]) {
    const pending = {
      ...request,
      quote: { ...request.quote, items, legacyReview: [{ id: "retired-saved-package", qty: 1 }] },
    };
    let paymentCalls = 0;
    const result = await submitCheckoutRequest(pending, {
      endpoint: "/configured-intake",
      honeyBookUrl: "",
      fetcher: async (_url, options) => {
        assert.deepEqual(JSON.parse(options.body).quote.legacyReview, pending.quote.legacyReview);
        return { ok: true, status: 202 };
      },
      createCheckout: async () => {
        paymentCalls += 1;
        throw new Error("Pending scope requires a quote");
      },
    });
    assert.equal(result.kind, "received");
    assert.equal(paymentCalls, 0);
    assert.equal(isDigitalOnly(items, 1), false);
  }
});

test("unconfigured, failed, and invalid digital sessions preserve the form without an inquiry fallback", async () => {
  for (const createCheckout of [
    async () => ({ ok: false, code: "STRIPE_NOT_CONFIGURED" }),
    async () => {
      throw new Error("offline");
    },
    async () => ({ ok: true, url: "javascript:alert(1)" }),
  ]) {
    const result = await submitCheckoutRequest(digitalRequest, {
      endpoint: "/configured-intake",
      honeyBookUrl: "https://example.test/honeybook",
      fetcher: () => {
        throw new Error("Do not send production inquiries for failed digital payments");
      },
      createCheckout,
    });
    assert.equal(result.kind, "error");
    assert.equal("url" in result, false);
    assert.match(result.message, /still here/);
  }
  assert.equal(digitalRequest.quote.items[0].qty, 2);
});
