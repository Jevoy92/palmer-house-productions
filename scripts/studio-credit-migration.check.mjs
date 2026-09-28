import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
const { PGlite } = await import(pathToFileURL(process.env.STUDIO_PGLITE_MODULE).href);
const db = new PGlite();
let checks = 0;
const check = (label, value) => {
  assert.ok(value, label);
  console.log(`PASS ${++checks}: ${label}`);
};
const reject = async (label, fn) => {
  await assert.rejects(fn);
  check(label, true);
};
const a = "11111111-1111-4111-8111-111111111111",
  b = "22222222-2222-4222-8222-222222222222",
  user = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const value = async (sql, args = []) => (await db.query(sql, args)).rows[0].value;
const refresh = (workspace = a, allowance = 100) =>
  value("select refresh_studio_credits($1,$2) as value", [workspace, allowance]);
const reserve = (
  workspace = a,
  count = 10,
  cost = 0.05,
  global = 100,
  automatic = 0.1,
  operation = "image",
  monthly = 5,
) =>
  value("select reserve_studio_credits($1,$2,$3,$4,$5,$6,$7,$8,$9) as value", [
    workspace,
    user,
    operation,
    count,
    cost,
    global,
    monthly,
    automatic,
    100,
  ]);
const finish = (id, status = "completed", cost = 0.02) =>
  value("select finish_studio_credits($1,$2,$3,$4) as value", [
    id,
    status,
    cost,
    JSON.stringify([
      { model: "test-priced-model", inputTokens: 10, outputTokens: 10, estimatedCostUsd: cost },
    ]),
  ]);
const balance = () =>
  value(
    "select coalesce(sum(remaining),0)::int as value from studio_credit_grants where workspace_id=$1 and (expires_at is null or expires_at>now())",
    [a],
  );
try {
  await db.exec(
    `create role authenticated;create role anon;create role service_role;create schema auth;create table auth.users(id uuid primary key);create table workspaces(id uuid primary key,created_by uuid);create table workspace_members(workspace_id uuid,user_id uuid);create table workspace_subscriptions(workspace_id uuid primary key,plan text default 'trial',status text default 'trialing',campaign_allowance integer default 1,trial_ends_at timestamptz default now()+interval '7 days',current_period_start timestamptz default now(),current_period_end timestamptz default now()+interval '1 month',stripe_customer_id text,stripe_subscription_id text,cancel_at_period_end boolean default false,billing_interval text default 'month');insert into auth.users values('${user}');insert into workspaces values('${a}','${user}'),('${b}','${user}');insert into workspace_members values('${a}','${user}');insert into workspace_subscriptions(workspace_id) values('${a}'),('${b}');`,
  );
  await db.exec(
    await readFile(
      new URL("../supabase/migrations/20260928020000_studio_credit_ledger.sql", import.meta.url),
      "utf8",
    ),
  );
  check("credit migration applies without live services", true);
  await refresh();
  await refresh();
  check("trial allowance is granted once", (await balance()) === 100);
  check("creating a second workspace cannot multiply trial credits", !(await refresh(b)).active);
  await reject("another workspace cannot reserve credits", () => reserve(b));
  const ids = await Promise.all([reserve(a, 60), reserve(a, 60).catch(() => null)]);
  check(
    "atomic reservations prevent overspending",
    ids.filter(Boolean).length === 1 && (await balance()) === 40,
  );
  const first = ids.find(Boolean);
  await finish(first, "released");
  await finish(first, "released");
  check("failure releases exactly once", (await balance()) === 100);
  const success = await reserve(a, 30);
  await finish(success);
  await finish(success, "released");
  check(
    "successful output cannot be refunded by a late duplicate finish",
    (await balance()) === 70,
  );
  await reject("global budget blocks before charging", () => reserve(a, 10, 0.05, 0.01));
  check("rejected budget leaves credits unchanged", (await balance()) === 70);
  await reject("workspace budget is independently enforced", () =>
    reserve(a, 10, 0.05, 100, 0.1, "image", 0.01),
  );
  const auto = await reserve(a, 0, 0.025, 100, 0.025, "automatic_feed");
  await finish(auto, "completed", 0.025);
  check("automatic feed consumes no member credits", (await balance()) === 70);
  await reject("automatic feed has its own budget", () =>
    reserve(a, 0, 0.025, 100, 0.025, "automatic_feed"),
  );
  await reject("automatic feed cannot debit customer credits", () =>
    reserve(a, 2, 0.025, 100, 0.1, "automatic_feed"),
  );
  await db.exec("set role authenticated");
  await reject("members cannot invoke paid reservation RPC", () => reserve());
  await reject("members cannot read private provider costs", () =>
    db.query("select * from studio_credit_usage"),
  );
  await reject("members cannot forge credit grants", () =>
    db.query(
      "insert into studio_credit_grants(workspace_id,source_key,kind,credits,remaining) values($1,'forged','topup',999,999)",
      [a],
    ),
  );
  await db.exec("reset role");
  await db.query(
    "update workspace_subscriptions set trial_ends_at=now()-interval '1 day' where workspace_id=$1",
    [a],
  );
  await reject("expired trial cannot spend old credits", () => reserve());
  const now = Date.now(),
    start = new Date(now - 24 * 3600e3).toISOString(),
    end = new Date(now + 29 * 24 * 3600e3).toISOString();
  const subscription = {
    paidAllowance: 1000,
    paidPlan: "creator",
    paidInterval: "month",
    plan: "creator",
    status: "active",
    campaignAllowance: 2,
    interval: "month",
    customerId: "cus_test",
    subscriptionId: "sub_test",
    periodStart: start,
    periodEnd: end,
    cancelAtPeriodEnd: false,
  };
  const sync = (key, time, data = subscription, paid = true) =>
    value("select sync_studio_subscription($1,$2,$3,$4,$5) as value", [
      key,
      time,
      a,
      JSON.stringify(data),
      paid,
    ]);
  await sync("evt_subscription", 200, subscription, false);
  check("subscription checkout alone does not grant paid access", !(await refresh(a, 1000)).active);
  await sync("evt_invoice", 201);
  await refresh(a, 1000);
  check("paid invoice replaces trial allowance", (await balance()) === 1000);
  check("duplicate invoice is ignored", (await sync("evt_invoice", 201)) === false);
  await refresh(a, 1000);
  check("replayed invoice cannot replenish twice", (await balance()) === 1000);
  await sync("evt_upgrade_unpaid", 201, { ...subscription, plan: "business" }, false);
  check(
    "unpaid plan upgrade keeps paid credit tier",
    (await value("select paid_plan as value from workspace_subscriptions where workspace_id=$1", [
      a,
    ])) === "creator",
  );
  await db.query("update workspace_subscriptions set status='past_due' where workspace_id=$1", [a]);
  await sync("evt_upgrade_paid", 201, {
    ...subscription,
    plan: "business",
    paidPlan: "business",
    paidAllowance: 2500,
    paidUpgrade: true,
  });
  const upgraded = await balance();
  check(
    "paid upgrade recovers past-due status and grants a prorated monthly difference",
    upgraded > 1000 && upgraded < 2500,
  );
  await sync("evt_upgrade_repeat", 201, {
    ...subscription,
    plan: "business",
    paidPlan: "business",
    paidAllowance: 2500,
    paidUpgrade: true,
  });
  check("equivalent upgrade payment cannot multiply its delta", (await balance()) === upgraded);
  await sync("evt_old", 199, { ...subscription, status: "past_due" }, false);
  check("old subscription event does not regress current status", (await refresh(a, 1000)).active);
  await sync("evt_failure", 202, { ...subscription, status: "past_due" }, false);
  await reject("past-due membership cannot spend", () => reserve());
  await sync("evt_paidagain", 203);
  await refresh(a, 1000);
  await db.query("update studio_credit_grants set remaining=0 where workspace_id=$1", [a]);
  const topup = (event = "evt_topup", session = "cs_topup", payment = "pi_topup", credits = 500) =>
    value("select grant_studio_topup($1,$2,$3,$4,$5,$6,$7) as value", [
      event,
      204,
      a,
      session,
      payment,
      credits,
      2000,
    ]);
  await topup();
  await topup();
  await topup("evt_topup_async");
  check("completed and async success events grant one pack", (await balance()) === 500);
  const spend = await reserve(a, 450, 0.05);
  await finish(spend);
  check("topups fund work after included balance is exhausted", (await balance()) === 50);
  const reverse = (event = "evt_refund", payment = "pi_topup", amount = 2000) =>
    value("select reverse_studio_topup($1,$2,$3,$4,$5) as value", [
      event,
      205,
      payment,
      amount,
      false,
    ]);
  await reverse();
  await reverse();
  check(
    "refunded spent credits become debt once",
    (await value("select credits as value from studio_credit_debts where workspace_id=$1", [a])) ===
      450 && (await balance()) === 0,
  );
  await reject("refund debt blocks further generation", () => reserve());
  // Separate refund/running-request race: no debt remains for an operation that failed.
  await db.query("update studio_credit_debts set credits=0 where workspace_id=$1", [a]);
  await topup("evt_topup2", "cs_topup2", "pi_topup2", 100);
  const pending = await reserve(a, 100);
  await reverse("evt_refund2", "pi_topup2");
  await finish(pending, "released");
  check(
    "failed reservation after refund also releases its refund debt",
    (await value("select credits as value from studio_credit_debts where workspace_id=$1", [a])) ===
      0 && (await balance()) === 0,
  );
  // Annual membership replenishes one month at a time anchored to its paid year.
  const year = new Date().getUTCFullYear();
  const annualStart = new Date(Date.UTC(year, 0, 31, 12)).toISOString();
  const annualEnd = new Date(Date.UTC(year + 1, 0, 31, 12)).toISOString();
  await db.query(
    "update workspace_subscriptions set paid_period_start=$2,paid_period_end=$3,billing_interval='year',paid_billing_interval='year',status='active' where workspace_id=$1",
    [a, annualStart, annualEnd],
  );
  const annual = await refresh(a, 1000);
  const windowStart = new Date(annual.startAt),
    windowEnd = new Date(annual.endAt);
  check(
    "annual plan receives a monthly window containing today",
    windowStart <= new Date() && windowEnd > new Date() && windowEnd - windowStart < 32 * 86400e3,
  );
  check("annual plan does not grant a full year at once", (await balance()) === 1000);
  await db.query(
    "update workspace_subscriptions set paid_period_end=now()-interval '1 day' where workspace_id=$1",
    [a],
  );
  await reject("expired paid invoice period fails closed", () => reserve());
  await db.query("update workspace_subscriptions set paid_period_end=$2 where workspace_id=$1", [
    a,
    annualEnd,
  ]);
  await value("select hold_studio_billing($1,$2,$3,$4) as value", [
    "evt_dispute",
    300,
    a,
    "sub_test",
  ]);
  await reject("refunded or disputed subscription is held", () => reserve());
  const pendingCheckout = await value(
    "select claim_studio_membership_checkout($1,$2,$3) as value",
    [b, "creator", "month"],
  );
  await reject("membership checkout lease blocks simultaneous creation", () =>
    value("select claim_studio_membership_checkout($1,$2,$3) as value", [b, "business", "month"]),
  );
  await value("select finish_studio_membership_checkout($1,$2,$3,$4) as value", [
    b,
    pendingCheckout.lease_token,
    null,
    false,
  ]);
  const recoveredCheckout = await value(
    "select claim_studio_membership_checkout($1,$2,$3) as value",
    [b, "business", "month"],
  );
  check(
    "timed-out checkout preserves its original attempt and plan for reconciliation",
    recoveredCheckout.attempt_id === pendingCheckout.attempt_id &&
      recoveredCheckout.plan === "creator",
  );
  await value("select finish_studio_membership_checkout($1,$2,$3,$4) as value", [
    b,
    recoveredCheckout.lease_token,
    "cs_expired",
    true,
  ]);
  const replacement = await value("select claim_studio_membership_checkout($1,$2,$3) as value", [
    b,
    "business",
    "month",
  ]);
  check(
    "expired superseded checkout can be replaced with the new plan",
    replacement.attempt_id !== pendingCheckout.attempt_id && replacement.plan === "business",
  );
  check(
    "cost ledger includes failed provider work",
    Number((await value("select studio_credit_cost_snapshot() as value")).estimatedCostUsd) > 0,
  );
  await db.query(
    "update workspace_subscriptions set status='canceled',billing_hold=false where workspace_id=$1",
    [a],
  );
  await sync("evt_rejoin", 400, { ...subscription, subscriptionId: "sub_new_monthly" });
  check(
    "canceled annual member can rejoin a shorter monthly paid period",
    await value(
      "select paid_period_end=$2::timestamptz as value from workspace_subscriptions where workspace_id=$1",
      [a, end],
    ),
  );
  await sync("evt_old_subscription_late", 401, { ...subscription, status: "canceled" }, false);
  check(
    "late old subscription event cannot cancel a new membership",
    (await value(
      "select stripe_subscription_id as value from workspace_subscriptions where workspace_id=$1",
      [a],
    )) === "sub_new_monthly",
  );
  console.log(`${checks} offline credit-ledger checks passed.`);
} finally {
  await db.close();
}
