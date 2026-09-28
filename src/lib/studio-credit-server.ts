import { createServerFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";
import { z } from "zod";
import { StudioAuthSchema } from "./studio-recovery";
import { authorizedStudioClient } from "./studio-auth.server";
import {
  studioBillingAdmin,
  studioGlobalBudget,
  isStudioOperator,
} from "./studio-credit-runtime.server";
import {
  studioCreditAllowance,
  studioCreditTopUps,
  type StudioCreditSummary,
  type StudioCreditOperation,
} from "./studio-credits";

export const getStudioCreditSummary = createServerFn({ method: "POST" })
  .validator(StudioAuthSchema)
  .handler(async ({ data }): Promise<StudioCreditSummary> => {
    const { role, user } = await authorizedStudioClient(data.accessToken, data.workspaceId);
    const canManageBilling = role === "owner" || role === "admin";
    const unavailable: StudioCreditSummary = {
      enforcement: "unavailable",
      message:
        "Usage protection needs to be connected. No new AI generation is available until billing setup is complete.",
      available: 0,
      includedRemaining: 0,
      includedAllowance: 0,
      topUpRemaining: 0,
      usedThisPeriod: 0,
      reserved: 0,
      renewsAt: null,
      status: "inactive",
      recent: [],
      canManageBilling,
      topUpsEnabled: false,
    };
    try {
      const admin = studioBillingAdmin();
      const sub = await admin
        .from("workspace_subscriptions")
        .select("plan,paid_plan,status,stripe_subscription_id,paid_period_end")
        .eq("workspace_id", data.workspaceId)
        .single();
      if (sub.error || !sub.data) return unavailable;
      if (
        sub.data.status === "active" &&
        sub.data.stripe_subscription_id &&
        !sub.data.paid_period_end &&
        process.env.STRIPE_SECRET_KEY
      ) {
        // One-time migration catch-up verifies the real current Stripe invoice; never
        // award credits merely because a legacy local row says active.
        const { default: Stripe } = await import("stripe");
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const subscription = await stripe.subscriptions.retrieve(sub.data.stripe_subscription_id);
        const invoiceId =
          typeof subscription.latest_invoice === "string"
            ? subscription.latest_invoice
            : subscription.latest_invoice?.id;
        if (invoiceId) {
          const invoice = await stripe.invoices.retrieve(invoiceId);
          if (invoice.status === "paid") {
            const { applyStudioBillingEvent } = await import("./studio-billing-webhook.server");
            await applyStudioBillingEvent(admin, stripe, {
              id: `reconcile:${invoice.id}`,
              created: invoice.created,
              type: "invoice.paid",
              data: { object: invoice },
            } as unknown as import("stripe").default.Event);
          }
        }
      }
      const latest = await admin
        .from("workspace_subscriptions")
        .select("plan,paid_plan,status")
        .eq("workspace_id", data.workspaceId)
        .single();
      if (latest.error || !latest.data) return unavailable;
      const allowance =
        studioCreditAllowance[
          (latest.data.status === "active"
            ? latest.data.paid_plan
            : latest.data.plan) as keyof typeof studioCreditAllowance
        ];
      if (allowance === undefined) return unavailable;
      const refreshed = await admin.rpc("refresh_studio_credits", {
        target_workspace_id: data.workspaceId,
        allowance,
      });
      if (refreshed.error || !refreshed.data) return unavailable;
      const window = refreshed.data;
      const [snapshot, recent] = await Promise.all([
        admin.rpc("studio_credit_snapshot", {
          target_workspace_id: data.workspaceId,
          period_start:
            window.startAt ||
            new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
        }),
        admin
          .from("studio_credit_usage")
          .select("id,operation,credits,status,created_at")
          .eq("workspace_id", data.workspaceId)
          .neq("operation", "automatic_feed")
          .order("created_at", { ascending: false })
          .limit(12),
      ]);
      if (snapshot.error || recent.error) return unavailable;
      const value = snapshot.data;
      const summary: StudioCreditSummary = {
        enforcement: "ready",
        available: Math.max(0, value.includedRemaining + value.topUpRemaining - value.debt),
        includedRemaining: value.includedRemaining,
        includedAllowance: value.includedAllowance || allowance,
        topUpRemaining: value.topUpRemaining,
        usedThisPeriod: value.usedThisPeriod,
        reserved: value.reserved,
        renewsAt: window.endAt,
        status: window.status,
        recent: (recent.data || []).map((row) => ({
          id: row.id,
          operation: row.operation as StudioCreditOperation,
          credits: row.credits,
          status: row.status,
          createdAt: row.created_at,
        })),
        canManageBilling,
        topUpsEnabled:
          canManageBilling &&
          Boolean(process.env.STRIPE_SECRET_KEY) &&
          Boolean(process.env.LOVABLE_API_KEY) &&
          process.env.STUDIO_AI_SALES_READY === "true" &&
          process.env.STUDIO_CREDIT_TOPUPS_ENABLED === "true" &&
          window.active &&
          !value.debt,
      };
      if (value.debt > 0)
        summary.message =
          "A refunded credit purchase needs a billing adjustment. Ask your workspace owner to contact Palmer House.";
      if (isStudioOperator(user.id)) {
        const costs = await admin.rpc("studio_credit_cost_snapshot");
        if (!costs.error)
          summary.operator = { ...costs.data, monthlyBudgetUsd: studioGlobalBudget() };
      }
      return summary;
    } catch {
      return unavailable;
    }
  });

export const createStudioCreditCheckout = createServerFn({ method: "POST" })
  .validator(
    StudioAuthSchema.extend({ pack: z.enum(["boost", "bundle"]), requestId: z.string().uuid() }),
  )
  .handler(async ({ data }) => {
    const { role, user } = await authorizedStudioClient(data.accessToken, data.workspaceId);
    if (role !== "owner" && role !== "admin")
      throw new Error("Only a workspace owner or admin can buy credits.");
    if (
      process.env.STUDIO_CREDIT_TOPUPS_ENABLED !== "true" ||
      process.env.STUDIO_AI_SALES_READY !== "true" ||
      !process.env.LOVABLE_API_KEY ||
      !process.env.STRIPE_SECRET_KEY
    )
      return { ok: false as const, code: "CREDIT_TOPUPS_NOT_CONFIGURED" as const };
    const admin = studioBillingAdmin();
    const sub = await admin
      .from("workspace_subscriptions")
      .select("*")
      .eq("workspace_id", data.workspaceId)
      .single();
    if (sub.error || !sub.data) throw new Error("Could not load your membership.");
    const allowance =
      studioCreditAllowance[
        (sub.data.status === "active"
          ? sub.data.paid_plan
          : sub.data.plan) as keyof typeof studioCreditAllowance
      ];
    const window = await admin.rpc("refresh_studio_credits", {
      target_workspace_id: data.workspaceId,
      allowance,
    });
    if (window.error || !window.data?.active)
      throw new Error("Renew your Studio membership before buying extra credits.");
    const debt = await admin
      .from("studio_credit_debts")
      .select("credits")
      .eq("workspace_id", data.workspaceId)
      .maybeSingle();
    if (debt.error)
      throw new Error("Could not verify your billing balance. No checkout was opened.");
    if (debt.data?.credits)
      throw new Error(
        "A billing adjustment needs to be resolved before buying more credits. Contact Palmer House.",
      );
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const pack = studioCreditTopUps[data.pack];
    const origin = process.env.PUBLIC_SITE_URL || getRequestUrl().origin;
    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        ...(sub.data.stripe_customer_id
          ? { customer: sub.data.stripe_customer_id }
          : { customer_email: user.email }),
        client_reference_id: data.workspaceId,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: pack.priceUsd * 100,
              product_data: {
                name: `Palmer House Studio · ${pack.credits} credits`,
                description:
                  "Prepaid AI usage. No automatic recharge. An active Studio membership is required.",
              },
            },
          },
        ],
        metadata: {
          purchase_kind: "studio_credits",
          credit_catalog_version: "1",
          workspace_id: data.workspaceId,
          pack: data.pack,
          credits: String(pack.credits),
        },
        success_url: `${origin}/studio/billing?credits=success`,
        cancel_url: `${origin}/studio/billing?credits=canceled`,
        payment_intent_data: {
          metadata: {
            purchase_kind: "studio_credits",
            workspace_id: data.workspaceId,
            pack: data.pack,
          },
        },
      },
      { idempotencyKey: `studio-credits:${data.workspaceId}:${data.requestId}` },
    );
    if (!session.url) throw new Error("Stripe did not return a checkout link.");
    return { ok: true as const, url: session.url };
  });
