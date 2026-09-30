import { AsyncLocalStorage } from "node:async_hooks";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./supabase/client";
import {
  studioCreditAllowance,
  studioCreditOperations,
  type StudioCreditOperation,
} from "./studio-credits";
import { authorizedStudioClient } from "./studio-auth.server";

export function studioBillingAdmin() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!key)
    throw new Error(
      "Usage protection is not connected yet. Your workspace owner can finish billing setup; no generation was started.",
    );
  return createClient(process.env.SUPABASE_URL || SUPABASE_URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
export function studioGlobalBudget() {
  const value = Number(process.env.STUDIO_AI_MONTHLY_BUDGET_USD || "1000");
  if (!Number.isFinite(value) || value <= 0 || value > 1_000_000)
    throw new Error("The provider spending limit needs configuration.");
  return value;
}
export function isStudioOperator(userId: string) {
  return (process.env.STUDIO_BILLING_OPERATOR_IDS || "")
    .split(",")
    .map((v) => v.trim())
    .includes(userId);
}
export type ProviderUsage = {
  model: string;
  inputTokens: number | null;
  outputTokens: number | null;
  images: number;
  estimatedCostUsd: number;
  audioSeconds?: number;
  costBasis: "reported_tokens" | "reserved_ceiling" | "validated_audio_duration";
};
type Run = {
  id: string;
  operation: StudioCreditOperation | "automatic_feed";
  ceiling: number;
  audioSeconds?: number;
  calls: ProviderUsage[];
};
const context = new AsyncLocalStorage<Run>();
const operationCeilings: Record<StudioCreditOperation | "automatic_feed", number> = {
  chat: 0.005,
  directions: 0.015,
  analysis: 0.025,
  campaign: 0.5,
  image: 0.15,
  pdf: 0.05,
  avatar: 0.1,
  feed: 0.025,
  automatic_feed: 0.025,
  transcription: 0.01,
};
// Conservative post-promotion rates. Only explicitly priced routes are enabled.
export const studioModelRates: Record<
  string,
  { input: number; output: number; image1k?: number; image2k?: number }
> = {
  "openai/gpt-6-luna": { input: 0.1, output: 0.5 },
  "openai/gpt-6-sol": { input: 2, output: 10 },
  "google/gemini-3.8-flash": { input: 1.5, output: 7.5 },
  "google/gemini-3.1-flash-image": { input: 0.5, output: 3, image1k: 0.067, image2k: 0.101 },
};
export function studioCallLimits() {
  const run = context.getStore();
  return {
    maxInputTokens: 20000,
    maxOutputTokens: run?.operation === "campaign" ? 12000 : run?.operation === "pdf" ? 7000 : 4000,
    imageSize: run?.operation === "avatar" ? "1K" : "2K",
  } as const;
}
export function beginStudioProviderCall(
  model: string,
  inputTokens: number,
  outputTokens: number,
  images = 0,
) {
  const run = context.getStore();
  if (!run) throw new Error("A prepaid usage reservation is required before contacting AI.");
  const rates = studioModelRates[model];
  if (!rates)
    throw new Error(
      "This AI model has no approved cost profile. Ask Palmer House to configure it before generating.",
    );
  if (run.calls.length >= (run.operation === "campaign" ? 2 : 1))
    throw new Error("The generation reached its reserved call limit. Please retry.");
  const imageRate = run.operation === "avatar" ? rates.image1k : rates.image2k;
  if (images && !imageRate) throw new Error("This image model has no approved image price.");
  const ceiling =
    ((inputTokens * rates.input + outputTokens * rates.output) / 1_000_000 +
      images * (imageRate || 0)) *
    1.25;
  if (
    run.calls.reduce((sum, item) => sum + item.estimatedCostUsd, 0) + ceiling >
    run.ceiling + 0.000001
  )
    throw new Error(
      "This model or request exceeds the reserved generation budget. Ask Palmer House to adjust its cost profile. No request was sent.",
    );
  const call: ProviderUsage = {
    model,
    inputTokens: null,
    outputTokens: null,
    images,
    estimatedCostUsd: ceiling,
    costBasis: "reserved_ceiling",
  };
  run.calls.push(call);
  return (usage?: { prompt_tokens?: number; completion_tokens?: number }) => {
    if (
      Number.isSafeInteger(usage?.prompt_tokens) &&
      Number.isSafeInteger(usage?.completion_tokens) &&
      usage!.prompt_tokens! >= 0 &&
      usage!.completion_tokens! >= 0
    ) {
      call.inputTokens = usage!.prompt_tokens!;
      call.outputTokens = usage!.completion_tokens!;
      // Image output token billing differs by gateway. Retain fixed resolution price
      // plus text tokens as a conservative estimate; never label this an invoice cost.
      call.estimatedCostUsd =
        ((call.inputTokens * rates.input + call.outputTokens * rates.output) / 1_000_000 +
          images * (imageRate || 0)) *
        1.25;
      call.costBasis = "reported_tokens";
    }
  };
}
/** A saved result may exist after a network timeout; leave the debit reserved for reconciliation. */
export class StudioCreditReconciliationError extends Error {}

export async function withStudioCredits<T>(
  auth: { accessToken: string; workspaceId: string },
  operation: StudioCreditOperation | "automatic_feed",
  work: () => Promise<T>,
  metering?: { audioSeconds: number },
): Promise<T> {
  if (!process.env.LOVABLE_API_KEY)
    throw new Error("AI is not configured for this project. No credits were used.");
  const { user } = await authorizedStudioClient(auth.accessToken, auth.workspaceId);
  const admin = studioBillingAdmin();
  const sub = await admin
    .from("workspace_subscriptions")
    .select("plan,paid_plan,status")
    .eq("workspace_id", auth.workspaceId)
    .single();
  if (sub.error || !sub.data)
    throw new Error("Could not load your membership. No credits were used.");
  const plan = (
    sub.data.status === "active" ? sub.data.paid_plan : sub.data.plan
  ) as keyof typeof studioCreditAllowance;
  const allowance = studioCreditAllowance[plan];
  if (allowance === undefined) throw new Error("Your membership plan is unavailable.");
  const automatic = operation === "automatic_feed";
  const voice =
    operation === "transcription"
      ? (await import("./studio-transcription")).studioVoiceQuote(metering?.audioSeconds || 0)
      : null;
  const ceiling = voice?.costCeilingUsd ?? operationCeilings[operation];
  const reserved = await admin.rpc("reserve_studio_credits", {
    target_workspace_id: auth.workspaceId,
    actor_id: user.id,
    operation_name: operation,
    credit_count: automatic ? 0 : (voice?.credits ?? studioCreditOperations[operation].credits),
    cost_ceiling: ceiling,
    global_monthly_budget: studioGlobalBudget(),
    workspace_monthly_budget: allowance * 0.005 + (plan === "trial" ? 0.1 : 0.5),
    automatic_monthly_budget: plan === "trial" ? 0.1 : 0.5,
    allowance,
  });
  if (reserved.error || !reserved.data)
    throw new Error(
      reserved.error?.message || "Could not reserve credits. No generation was started.",
    );
  const run: Run = {
    id: reserved.data,
    operation,
    ceiling,
    audioSeconds: voice?.seconds,
    calls: [],
  };
  let result: T;
  try {
    result = await context.run(run, work);
  } catch (error) {
    if (error instanceof StudioCreditReconciliationError) {
      console.error("Studio usage needs reconciliation", { usageId: run.id });
      throw error;
    }
    const released = await admin.rpc("finish_studio_credits", {
      usage_id: run.id,
      outcome: "released",
      provider_cost: run.calls.reduce((sum, row) => sum + row.estimatedCostUsd, 0),
      provider_calls: run.calls,
    });
    if (released.error) {
      console.error("Studio credit release pending reconciliation", { usageId: run.id });
      if (operation === "transcription")
        throw new StudioCreditReconciliationError(
          "Your recording did not finish and its credit release is still being confirmed. Keep this recording and contact Palmer House before retrying.",
        );
    }
    throw error;
  }
  // If the output is saved but bookkeeping fails, preserve the success and debit.
  // Never refund a completed artifact or invite a second paid generation.
  const finished = await admin.rpc("finish_studio_credits", {
    usage_id: run.id,
    outcome: "completed",
    provider_cost: run.calls.reduce((sum, row) => sum + row.estimatedCostUsd, 0),
    provider_calls: run.calls,
  });
  if (finished.error)
    console.error("Studio credit completion pending reconciliation", { usageId: run.id });
  return result;
}

/** Non-secret reference lets operators reconcile a saved file after a DB timeout. */
export function currentStudioUsageId() {
  return context.getStore()?.id;
}

/** Fixed-duration transcription pricing, with the same 25% operating contingency. */
export function beginStudioTranscriptionCall(model: string, seconds: number) {
  const run = context.getStore();
  if (!run || run.operation !== "transcription")
    throw new Error("A voice usage reservation is required before transcription.");
  if (model !== "google/gemini-3.5-transcribe")
    throw new Error("This transcription model has no approved duration price.");
  if (run.calls.length)
    throw new Error("Only one transcription request is allowed per reservation.");
  const cost = (seconds / 60) * 0.0045 * 1.25;
  if (
    !Number.isFinite(seconds) ||
    seconds <= 0 ||
    seconds > 300 ||
    seconds !== run.audioSeconds ||
    cost > run.ceiling
  )
    throw new Error("The audio exceeds its reserved usage budget.");
  run.calls.push({
    model,
    inputTokens: null,
    outputTokens: null,
    images: 0,
    audioSeconds: seconds,
    estimatedCostUsd: cost,
    costBasis: "validated_audio_duration",
  });
}
