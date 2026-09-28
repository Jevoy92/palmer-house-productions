#!/usr/bin/env node
/** Reproducible planning estimates, not observed bills or a profit forecast.
 * Run with Node 22.18+: node scripts/studio-economics.mjs [--write] [--stress]
 * Catalog prices/credits are imported from the application's actual catalog.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import {
  studioCreditOperations,
  studioCreditAllowance,
  studioCreditTopUps,
} from "../src/lib/studio-credits.ts";
import { studioPlans } from "../src/lib/studio-model.ts";

export const assumptions = {
  reviewedAt: "2026-09-27",
  currency: "USD",
  aiContingency: 1.25,
  // These are planning allowances, not a documented Lovable markup.
  paymentPercent: 0.029,
  paymentFixedUsd: 0.3,
  subscriptionBillingPercent: 0.007,
  creditAiEnvelopeUsd: 0.005,
  laborHourlyUsd: 100,
  prepMultiplier: 1.25,
  illustrativeMonthlyInfrastructureUsd: 5,
  sources: {
    google: "https://ai.google.dev/gemini-api/docs/pricing",
    openai: "https://developers.openai.com/api/docs/pricing",
    anthropic: "https://platform.claude.com/docs/en/about-claude/pricing",
    lovable: "https://docs.lovable.dev/features/ai",
    payments: "https://stripe.com/pricing",
    billing: "https://stripe.com/billing/pricing",
  },
};

// USD per 1M tokens, standard processing; no cache, batch, free tier or volume discount.
export const rates = {
  luna: { input: 0.1, output: 0.5 },
  sol: { input: 2, output: 10 },
  flash: { input: 0.75, output: 3.75 },
  flashAfterPromotion: { input: 1.5, output: 7.5 },
  flashLite: { input: 0.25, output: 1.5 },
  sonnet: { input: 2, output: 10 },
  image: { input: 0.5, output: 3, image1k: 0.067, image2k: 0.101, image4k: 0.151 },
};

// Output includes billable thinking tokens. Campaign tokens are totals across TWO calls.
export const work = {
  chat: { input: 12000, output: 1500, calls: 1 },
  directions: { input: 14000, output: 2500, calls: 1 },
  analysis: { input: 16000, output: 3500, calls: 1 },
  campaign: { input: 32000, output: 18000, calls: 2 },
  image: { input: 3000, output: 1000, calls: 1 },
  pdf: { input: 14000, output: 6000, calls: 1 },
  avatar: { input: 1500, output: 750, calls: 1 },
  feed: { input: 12000, output: 2500, calls: 1 },
};

export const profiles = [
  {
    name: "Light",
    chat: 40,
    directions: 2,
    analysis: 1,
    campaign: 1,
    image: 4,
    pdf: 1,
    avatar: 0,
    feed: 0,
    backgroundDiscussions: 6,
  },
  {
    name: "Moderate",
    chat: 180,
    directions: 8,
    analysis: 4,
    campaign: 4,
    image: 20,
    pdf: 4,
    avatar: 1,
    feed: 2,
    backgroundDiscussions: 12,
  },
  {
    name: "Heavy",
    chat: 800,
    directions: 24,
    analysis: 8,
    campaign: 12,
    image: 80,
    pdf: 12,
    avatar: 2,
    feed: 6,
    backgroundDiscussions: 24,
  },
];

const round = (value, places = 2) => Number(value.toFixed(places));
const tokenCost = (input, output, rate) => (input * rate.input + output * rate.output) / 1e6;
export function actionCost(
  action,
  { futurePrices = true, textRouting = "luna", costMultiplier = 1 } = {},
) {
  const task = work[action];
  if (!task) throw new Error(`Unknown action: ${action}`);
  let raw;
  if (action === "image" || action === "avatar") {
    raw =
      tokenCost(task.input, task.output, rates.image) +
      (action === "image" ? rates.image.image2k : rates.image.image1k);
  } else {
    const rate =
      action === "campaign" || textRouting === "flash"
        ? rates[futurePrices ? "flashAfterPromotion" : "flash"]
        : rates.luna;
    raw = tokenCost(task.input, task.output, rate);
  }
  return raw * assumptions.aiContingency * costMultiplier;
}

/** Minimum advertised cash purchase for enough credits, with real pack granularity.
 * Each pack is a separate Checkout purchase, so each incurs its fixed fee.
 */
export function buyCredits(required) {
  if (!Number.isFinite(required) || required < 0 || required > 1e6)
    throw new Error("Credit need must be between 0 and 1,000,000.");
  if (!required) return { credits: 0, priceUsd: 0, transactions: 0, packs: {} };
  const packs = Object.entries(studioCreditTopUps);
  const max = required + Math.max(...packs.map(([, pack]) => pack.credits));
  const states = new Map([[0, { credits: 0, priceUsd: 0, transactions: 0, packs: {} }]]);
  const step = packs.reduce((gcd, [, pack]) => {
    let b = pack.credits;
    while (b) [gcd, b] = [b, gcd % b];
    return gcd;
  }, 0);
  for (let total = 0; total <= max; total += step) {
    const old = states.get(total);
    if (!old) continue;
    for (const [key, pack] of packs) {
      const next = total + pack.credits;
      if (next > max) continue;
      const candidate = {
        credits: next,
        priceUsd: old.priceUsd + pack.priceUsd,
        transactions: old.transactions + 1,
        packs: { ...old.packs, [key]: (old.packs[key] || 0) + 1 },
      };
      const saved = states.get(next);
      if (
        !saved ||
        candidate.priceUsd < saved.priceUsd ||
        (candidate.priceUsd === saved.priceUsd && candidate.transactions < saved.transactions)
      )
        states.set(next, candidate);
    }
  }
  return [...states.values()]
    .filter((item) => item.credits >= required)
    .sort(
      (a, b) => a.priceUsd - b.priceUsd || a.credits - b.credits || a.transactions - b.transactions,
    )[0];
}

export function simulate(planKey, profile, options = {}) {
  const plan = studioPlans[planKey];
  if (!plan) throw new Error(`Unknown plan: ${planKey}`);
  const annual = options.annual ?? false;
  const operations = Object.entries(work).map(([action, task]) => ({
    action,
    count: profile[action] || 0,
    credits: (profile[action] || 0) * studioCreditOperations[action].credits,
    costUsd: (profile[action] || 0) * actionCost(action, options),
    calls: task.calls * (profile[action] || 0),
  }));
  const creditsUsed = operations.reduce((sum, row) => sum + row.credits, 0);
  const topUps = buyCredits(Math.max(0, creditsUsed - studioCreditAllowance[planKey]));
  const membershipRevenue = annual ? plan.annualPrice / 12 : plan.price;
  const membershipFees =
    membershipRevenue * (assumptions.paymentPercent + assumptions.subscriptionBillingPercent) +
    assumptions.paymentFixedUsd / (annual ? 12 : 1);
  const topUpFees =
    topUps.priceUsd * assumptions.paymentPercent +
    topUps.transactions * assumptions.paymentFixedUsd;
  const backgroundCost = profile.backgroundDiscussions * actionCost("feed", options);
  const aiCost = operations.reduce((sum, row) => sum + row.costUsd, 0) + backgroundCost;
  // Reserve the worst-case AI liability for prepaid credits still held by the member.
  const unusedPaidCredits = Math.max(
    0,
    topUps.credits - Math.max(0, creditsUsed - studioCreditAllowance[planKey]),
  );
  const prepaidAiReserve = unusedPaidCredits * assumptions.creditAiEnvelopeUsd;
  const revenue = membershipRevenue + topUps.priceUsd;
  const beforeService = revenue - membershipFees - topUpFees - aiCost - prepaidAiReserve;
  // Partner's public feature promises a WEEKLY hour: 52/12, rather than four per month.
  const serviceHours = planKey === "partner" ? 52 / 12 : plan.strategyMinutes / 60;
  const humanServiceCost =
    serviceHours *
    assumptions.prepMultiplier *
    (options.laborHourlyUsd ?? assumptions.laborHourlyUsd);
  const infrastructure =
    options.infrastructureUsd ?? assumptions.illustrativeMonthlyInfrastructureUsd;
  return {
    profile: profile.name,
    planKey,
    plan: plan.name,
    interval: annual ? "annual-month-equivalent" : "monthly",
    creditsUsed,
    includedCredits: studioCreditAllowance[planKey],
    topUpCredits: topUps.credits,
    topUpPurchases: topUps.packs,
    membershipRevenueUsd: round(membershipRevenue),
    topUpRevenueUsd: topUps.priceUsd,
    aiCostUsd: round(aiCost),
    backgroundAiCostUsd: round(backgroundCost, 4),
    providerCalls:
      operations.reduce((sum, row) => sum + row.calls, 0) + profile.backgroundDiscussions,
    unusedPaidCredits,
    prepaidAiReserveUsd: round(prepaidAiReserve),
    stripeFeesUsd: round(membershipFees + topUpFees),
    contributionBeforeServiceUsd: round(beforeService),
    contributionBeforeServicePercent: round((beforeService / revenue) * 100, 1),
    humanServiceCostUsd: round(humanServiceCost),
    illustrativeInfrastructureUsd: infrastructure,
    contributionAfterIllustrativeServiceUsd: round(
      beforeService - humanServiceCost - infrastructure,
    ),
    contributionAfterIllustrativeServicePercent: round(
      ((beforeService - humanServiceCost - infrastructure) / revenue) * 100,
      1,
    ),
  };
}

export function report(options = {}) {
  const unitEconomics = Object.keys(work).map((action) => ({
    action,
    credits: studioCreditOperations[action].credits,
    illustrativeAiCostUsd: round(actionCost(action, options), 5),
    planningAiEnvelopeUsd: studioCreditOperations[action].credits * assumptions.creditAiEnvelopeUsd,
  }));
  return {
    assumptions,
    options: { futurePrices: true, textRouting: "luna", ...options },
    warning:
      "Synthetic workload estimates. Model quality, gateway route compatibility, actual token mix, retries, and billed costs require live measurement. Contribution is not net profit.",
    workloadProfiles: profiles,
    tokenWorkloads: work,
    rates,
    unitEconomics,
    overBudgetActions: unitEconomics
      .filter((row) => row.illustrativeAiCostUsd > row.planningAiEnvelopeUsd)
      .map((row) => row.action),
    monthly: Object.keys(studioPlans).flatMap((plan) =>
      profiles.map((profile) => simulate(plan, profile, options)),
    ),
    annual: Object.keys(studioPlans).flatMap((plan) =>
      profiles.map((profile) => simulate(plan, profile, { ...options, annual: true })),
    ),
    topUps: Object.entries(studioCreditTopUps).map(([key, pack]) => {
      const stripe = pack.priceUsd * assumptions.paymentPercent + assumptions.paymentFixedUsd;
      const fullRedemptionCost = pack.credits * assumptions.creditAiEnvelopeUsd;
      return {
        key,
        ...pack,
        stripeUsd: round(stripe),
        fullRedemptionAiBudgetUsd: round(fullRedemptionCost),
        contributionAfterAiAndStripePercent: round(
          ((pack.priceUsd - stripe - fullRedemptionCost) / pack.priceUsd) * 100,
          1,
        ),
      };
    }),
  };
}

function toCsv(rows) {
  const keys = Object.keys(rows[0]).filter((key) => typeof rows[0][key] !== "object");
  const cell = (value) => JSON.stringify(String(value));
  return (
    [keys, ...rows.map((row) => keys.map((key) => row[key]))]
      .map((row) => row.map(cell).join(","))
      .join("\n") + "\n"
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const options = {
    futurePrices: !process.argv.includes("--current-prices"),
    textRouting: process.argv.includes("--flash-chat") ? "flash" : "luna",
    costMultiplier: process.argv.includes("--stress") ? 2 : 1,
  };
  const output = report(options);
  console.table(
    output.monthly.map(
      ({
        plan,
        profile,
        creditsUsed,
        topUpRevenueUsd,
        aiCostUsd,
        contributionBeforeServicePercent,
        contributionAfterIllustrativeServicePercent,
      }) => ({
        plan,
        profile,
        creditsUsed,
        topUpRevenueUsd,
        aiCostUsd,
        contributionBeforeServicePercent,
        contributionAfterIllustrativeServicePercent,
      }),
    ),
  );
  console.table(output.topUps);
  if (output.overBudgetActions.length)
    console.warn("Actions exceeding planning envelope:", output.overBudgetActions.join(", "));
  if (process.argv.includes("--write")) {
    const directory = resolve(import.meta.dirname, "../docs/studio-rebuild/economics");
    await mkdir(directory, { recursive: true });
    const suffix = `${options.textRouting}${options.futurePrices ? "-future" : "-current"}${options.costMultiplier > 1 ? "-stress" : ""}`;
    await writeFile(resolve(directory, `${suffix}.json`), JSON.stringify(output, null, 2) + "\n");
    await writeFile(
      resolve(directory, `${suffix}.csv`),
      toCsv([...output.monthly, ...output.annual]),
    );
    console.log(`Saved ${suffix}.json and ${suffix}.csv`);
  }
}
