import test from "node:test";
import assert from "node:assert/strict";
import {
  assumptions,
  actionCost,
  buyCredits,
  profiles,
  report,
  simulate,
} from "./studio-economics.mjs";

test("top-ups purchase enough credits without inventing fractional packs", () => {
  assert.deepEqual(buyCredits(0), { credits: 0, priceUsd: 0, transactions: 0, packs: {} });
  assert.deepEqual(buyCredits(294), {
    credits: 500,
    priceUsd: 20,
    transactions: 1,
    packs: { boost: 1 },
  });
  assert.deepEqual(buyCredits(3702), {
    credits: 4000,
    priceUsd: 140,
    transactions: 4,
    packs: { boost: 2, bundle: 2 },
  });
  assert.throws(() => buyCredits(-1));
  assert.throws(() => buyCredits(Infinity));
});

test("prices are stressable and the Google promotion is not assumed permanent", () => {
  assert.equal(
    actionCost("campaign", { futurePrices: true }),
    2 * actionCost("campaign", { futurePrices: false }),
  );
  assert.equal(actionCost("image", { costMultiplier: 2 }), 2 * actionCost("image"));
  assert.ok(actionCost("chat", { textRouting: "flash" }) > actionCost("chat"));
});

test("top-up margins budget for full redemption and fixed payment fees", () => {
  const rows = report().topUps;
  assert.equal(rows.find((row) => row.key === "boost").contributionAfterAiAndStripePercent, 83.1);
  assert.equal(rows.find((row) => row.key === "bundle").contributionAfterAiAndStripePercent, 81.5);
  assert.equal(
    rows.find((row) => row.key === "bundle").fullRedemptionAiBudgetUsd,
    1500 * assumptions.creditAiEnvelopeUsd,
  );
});

test("annual billing and weekly human delivery do not disappear from economics", () => {
  const monthly = simulate("partner", profiles[0]);
  const annual = simulate("partner", profiles[0], { annual: true });
  assert.equal(monthly.humanServiceCostUsd, 541.67);
  assert.equal(annual.humanServiceCostUsd, monthly.humanServiceCostUsd);
  assert.ok(annual.membershipRevenueUsd < monthly.membershipRevenueUsd);
  assert.ok(
    annual.contributionAfterIllustrativeServicePercent <
      monthly.contributionAfterIllustrativeServicePercent,
  );
});

test("unspent prepaid credits retain an AI redemption liability", () => {
  const result = simulate("creator", profiles[1]);
  assert.equal(result.unusedPaidCredits, 206);
  assert.equal(result.prepaidAiReserveUsd, 1.03);
  assert.ok(
    result.contributionAfterIllustrativeServicePercent < result.contributionBeforeServicePercent,
  );
});
