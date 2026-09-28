import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";
import { studioCreditOperations, studioCreditTopUps } from "../src/lib/studio-credits.ts";
const require = createRequire(import.meta.url),
  root = path.resolve(import.meta.dirname, "..");
function loader(overrides = {}, env = {}) {
  const cache = new Map();
  function load(file) {
    file = path.resolve(root, file.endsWith(".ts") ? file : file + ".ts");
    if (cache.has(file)) return cache.get(file).exports;
    const module = { exports: {} };
    cache.set(file, module);
    const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
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
        Buffer,
        process: { env },
        console,
        crypto: globalThis.crypto,
        require(name) {
          if (name in overrides) return overrides[name];
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
function runtime(reserveError = false) {
  const events = [];
  const admin = {
    from() {
      return {
        select() {
          return {
            eq() {
              return {
                single: async () => ({
                  data: { plan: "creator", paid_plan: "creator", status: "active" },
                }),
              };
            },
          };
        },
      };
    },
    async rpc(name, args) {
      events.push({ name, args });
      if (name === "reserve_studio_credits")
        return reserveError
          ? { error: { message: "Not enough Studio credits" } }
          : { data: "usage-1" };
      return { data: null };
    },
  };
  const api = loader(
    {
      "@supabase/supabase-js": { createClient: () => admin },
      "./supabase/client": { SUPABASE_URL: "https://example.invalid" },
      "./studio-auth.server": { authorizedStudioClient: async () => ({ user: { id: "user-1" } }) },
    },
    {
      LOVABLE_API_KEY: "test",
      SUPABASE_SECRET_KEY: "test",
      STUDIO_BILLING_OPERATOR_IDS: "operator-1",
    },
  )("src/lib/studio-credit-runtime.server");
  return { api, events };
}
const auth = { accessToken: "test-token", workspaceId: "workspace-1" };
test("credit catalog protects expensive image and campaign work", () => {
  assert.equal(studioCreditOperations.campaign.credits, 100);
  assert.equal(studioCreditOperations.image.credits, 30);
  assert.equal(studioCreditOperations.avatar.credits, 20);
  assert.equal(studioCreditTopUps.bundle.credits, 1500);
});
test("paid provider calls cannot run outside an atomic reservation", () => {
  const { api } = runtime();
  assert.throws(() => api.beginStudioProviderCall("openai/gpt-6-luna", 100, 100), /reservation/);
});
test("out of credits never invokes provider work", async () => {
  const { api } = runtime(true);
  let invoked = false;
  await assert.rejects(
    api.withStudioCredits(auth, "chat", async () => {
      invoked = true;
    }),
    /Not enough/,
  );
  assert.equal(invoked, false);
});
test("meter records reported token costs and charges once after success", async () => {
  const { api, events } = runtime();
  await api.withStudioCredits(auth, "chat", async () => {
    api.beginStudioProviderCall(
      "openai/gpt-6-luna",
      20000,
      4000,
    )({ prompt_tokens: 1000, completion_tokens: 500 });
    return "answer";
  });
  assert.equal(events[0].args.credit_count, 1);
  assert.equal(events[1].args.outcome, "completed");
  assert.equal(events[1].args.provider_cost, 0.00035 * 1.25);
  assert.equal(events[1].args.provider_calls[0].inputTokens, 1000);
});
test("failed output releases customer credits but retains provider cost estimate", async () => {
  const { api, events } = runtime();
  await assert.rejects(
    api.withStudioCredits(auth, "image", async () => {
      api.beginStudioProviderCall("google/gemini-3.1-flash-image", 8000, 2048, 1);
      throw Error("Storage unavailable");
    }),
  );
  assert.equal(events[1].args.outcome, "released");
  assert.ok(events[1].args.provider_cost > 0.1);
});
test("unpriced model and model over operation budget are rejected before provider call", async () => {
  const { api } = runtime();
  await assert.rejects(
    api.withStudioCredits(auth, "chat", async () =>
      api.beginStudioProviderCall("unpriced/model", 100, 100),
    ),
    /cost profile/,
  );
  await assert.rejects(
    api.withStudioCredits(auth, "chat", async () =>
      api.beginStudioProviderCall("openai/gpt-6-sol", 20000, 4000),
    ),
    /budget/,
  );
});
test("hidden automatic feed cannot debit member credits", async () => {
  const { api, events } = runtime();
  await api.withStudioCredits(auth, "automatic_feed", async () =>
    api.beginStudioProviderCall("openai/gpt-6-luna", 100, 100)(),
  );
  assert.equal(events[0].args.credit_count, 0);
});
test("AI retries cannot exceed reserved operation call count", async () => {
  const { api } = runtime();
  await assert.rejects(
    api.withStudioCredits(auth, "chat", async () => {
      api.beginStudioProviderCall("openai/gpt-6-luna", 100, 100);
      api.beginStudioProviderCall("openai/gpt-6-luna", 100, 100);
    }),
    /call limit/,
  );
});
test("customer workspace owner is not an internal billing operator", () => {
  const { api } = runtime();
  assert.equal(api.isStudioOperator("user-1"), false);
  assert.equal(api.isStudioOperator("operator-1"), true);
});
function billing() {
  const calls = [];
  const admin = {
    rpc: async (name, args) => {
      calls.push({ name, args });
      return { data: true };
    },
  };
  const { applyStudioBillingEvent } = loader()("src/lib/studio-billing-webhook.server");
  const stripe = {
    paymentIntents: {
      retrieve: async () => ({
        id: "pi_test",
        status: "succeeded",
        latest_charge: { refunded: false, disputed: false, amount_refunded: 0 },
      }),
    },
    subscriptions: { retrieve: async () => subscription },
  };
  return { calls, admin, stripe, apply: applyStudioBillingEvent };
}
const subscription = {
  id: "sub_test",
  metadata: { workspace_id: "workspace-1" },
  customer: "cus_test",
  status: "active",
  cancel_at_period_end: false,
  items: {
    data: [
      {
        price: { id: "price_1U1u0pGcAcCB6YlQTmre9d6I" },
        current_period_start: 100,
        current_period_end: 200,
      },
    ],
  },
};
const checkout = {
  id: "cs_test",
  mode: "payment",
  status: "complete",
  payment_status: "paid",
  metadata: {
    purchase_kind: "studio_credits",
    credit_catalog_version: "1",
    workspace_id: "workspace-1",
    pack: "boost",
    credits: "500",
  },
  client_reference_id: "workspace-1",
  currency: "usd",
  amount_total: 2000,
  payment_intent: "pi_test",
};
const event = (object, type = "checkout.session.completed") => ({
  id: "evt_test",
  created: 110,
  type,
  data: { object },
});
test("pending checkout never grants prepaid credits", async () => {
  const { apply, admin, stripe, calls } = billing();
  await apply(admin, stripe, event({ ...checkout, payment_status: "unpaid" }));
  assert.equal(calls.length, 0);
});
test("verified paid pack grants exact server-side amount", async () => {
  const { apply, admin, stripe, calls } = billing();
  await apply(admin, stripe, event(checkout));
  assert.equal(calls[0].name, "grant_studio_topup");
  assert.equal(calls[0].args.credit_count, 500);
  assert.equal(calls[0].args.paid_cents, 2000);
});
test("credit pack metadata and payment amount must agree", async () => {
  const { apply, admin, stripe } = billing();
  await assert.rejects(apply(admin, stripe, event({ ...checkout, amount_total: 1 })), /catalog/);
});
test("late payment success cannot grant an already refunded purchase", async () => {
  const { apply, admin, stripe, calls } = billing();
  stripe.paymentIntents.retrieve = async () => ({
    status: "succeeded",
    latest_charge: { refunded: true },
  });
  await assert.rejects(apply(admin, stripe, event(checkout)), /reconciliation/);
  assert.equal(calls.length, 0);
});
test("paid entitlement uses invoice line price rather than unpaid upgraded plan", async () => {
  const { apply, admin, stripe, calls } = billing();
  const invoice = {
    status: "paid",
    parent: { subscription_details: { subscription: "sub_test" } },
    lines: {
      data: [
        {
          parent: { subscription_item_details: { subscription: "sub_test", proration: false } },
          pricing: { price_details: { price: "price_1U1u0JGcAcCB6YlQd2cJUG37" } },
          period: { start: 50, end: 150 },
        },
      ],
    },
  };
  await apply(admin, stripe, event(invoice, "invoice.paid"));
  assert.equal(calls[0].args.subscription_data.plan, "business");
  assert.equal(calls[0].args.subscription_data.paidPlan, "creator");
  assert.equal(calls[0].args.subscription_data.periodEnd, new Date(150000).toISOString());
});
test("proration alone does not replenish the included allowance", async () => {
  const { apply, admin, stripe, calls } = billing();
  await apply(
    admin,
    stripe,
    event(
      {
        status: "paid",
        parent: { subscription_details: { subscription: "sub_test" } },
        lines: {
          data: [
            {
              parent: { subscription_item_details: { subscription: "sub_test", proration: true } },
            },
          ],
        },
      },
      "invoice.paid",
    ),
  );
  assert.equal(calls.length, 0);
});

function membershipCheckoutFixture(
  priorStatus = "canceled",
  sessionStatus = "complete",
  requestedPlan = "creator",
  billing = {},
) {
  const calls = [];
  const rows = [
    {
      attempt_id: "attempt-old",
      lease_token: "token-old",
      plan: "creator",
      interval_name: "month",
      session_id: "cs_old",
    },
    {
      attempt_id: "attempt-new",
      lease_token: "token-new",
      plan: requestedPlan,
      interval_name: "month",
      session_id: null,
    },
  ];
  const admin = {
    from() {
      return {
        select() {
          return {
            eq() {
              return {
                single: async () => ({
                  data: { stripe_customer_id: "cus_test", billing_hold: billing.hold },
                }),
                maybeSingle: async () => ({
                  data: billing.debt ? { credits: billing.debt } : null,
                }),
              };
            },
          };
        },
      };
    },
    async rpc(name, args) {
      calls.push({ name, args });
      return { data: name === "claim_studio_membership_checkout" ? rows.shift() : null };
    },
  };
  const stripe = {
    subscriptions: {
      list: async () => ({ data: [], has_more: false }),
      retrieve: async () => ({ status: priorStatus }),
    },
    checkout: {
      sessions: {
        retrieve: async () => ({
          id: "cs_old",
          status: sessionStatus,
          subscription: "sub_old",
          url: "https://checkout.stripe.com/old",
        }),
        create: async () => {
          calls.push({ name: "stripe.create" });
          return { id: "cs_new", status: "open", url: "https://checkout.stripe.com/new" };
        },
        expire: async () => {
          calls.push({ name: "stripe.expire" });
          return {};
        },
      },
    },
  };
  class StripeMock {
    constructor() {
      return stripe;
    }
  }
  const { openStudioMembershipCheckout } = loader(
    { stripe: StripeMock, "./studio-credit-runtime.server": { studioBillingAdmin: () => admin } },
    { STRIPE_SECRET_KEY: "test" },
  )("src/lib/studio-subscription-checkout.server");
  return {
    calls,
    open: () =>
      openStudioMembershipCheckout({
        workspaceId: "workspace-1",
        plan: requestedPlan,
        interval: "month",
        origin: "https://studio.example",
      }),
  };
}
test("canceled member can replace a previously completed checkout to rejoin", async () => {
  const { calls, open } = membershipCheckoutFixture();
  const result = await open();
  assert.equal(result.url, "https://checkout.stripe.com/new");
  assert.equal(calls.filter((item) => item.name === "stripe.create").length, 1);
  assert.ok(
    calls.some(
      (item) => item.name === "finish_studio_membership_checkout" && item.args.clear_attempt,
    ),
  );
});
test("completed checkout with a still-active subscription cannot create another", async () => {
  const { calls, open } = membershipCheckoutFixture("active");
  await assert.rejects(open(), /billing is updating/);
  assert.equal(
    calls.some((item) => item.name === "stripe.create"),
    false,
  );
});
test("retrying an open membership checkout reuses its existing session", async () => {
  const { calls, open } = membershipCheckoutFixture("canceled", "open");
  const result = await open();
  assert.equal(result.url, "https://checkout.stripe.com/old");
  assert.equal(
    calls.some((item) => item.name === "stripe.create"),
    false,
  );
});
test("changing plans expires the superseded open session before creating one", async () => {
  const { calls, open } = membershipCheckoutFixture("canceled", "open", "business");
  const result = await open();
  assert.equal(result.url, "https://checkout.stripe.com/new");
  assert.ok(
    calls.findIndex((item) => item.name === "stripe.expire") <
      calls.findIndex((item) => item.name === "stripe.create"),
  );
});
test("membership checkout cannot sell access while a billing hold or refund debt blocks it", async () => {
  for (const billing of [{ hold: true }, { debt: 20 }]) {
    const { open, calls } = membershipCheckoutFixture("canceled", "complete", "creator", billing);
    await assert.rejects(open(), /Contact Palmer House/);
    assert.equal(
      calls.some((item) => item.name === "stripe.create"),
      false,
    );
  }
});
