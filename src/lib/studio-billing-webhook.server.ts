import type Stripe from "stripe";
import type { SupabaseClient } from "@supabase/supabase-js";
import { studioPlans, studioPlanPrices, studioPlanTestPrices, type StudioPlanKey } from "./studio-model";
import { studioCreditAllowance, studioCreditTopUps } from "./studio-credits";
const id = (value: string | { id: string } | null | undefined) =>
  typeof value === "string" ? value : value?.id;
function planForPrice(price: string) {
  for (const [plan, intervals] of [...Object.entries(studioPlanPrices), ...Object.entries(studioPlanTestPrices)])
    for (const [interval, priceId] of Object.entries(intervals))
      if (priceId === price) return { plan: plan as StudioPlanKey, interval };
  return null;
}
export async function applyStudioBillingEvent(
  admin: SupabaseClient,
  stripe: Stripe,
  event: Stripe.Event,
) {
  const call = async (name: string, args: Record<string, unknown>) => {
    const result = await admin.rpc(name, args);
    if (result.error) throw new Error(`Billing event could not be saved: ${name}`);
    return result.data;
  };
  const sync = async (subscription: Stripe.Subscription, paidInvoice?: Stripe.Invoice) => {
    const workspaceId = subscription.metadata.workspace_id;
    if (!workspaceId) return;
    const item = subscription.items.data[0];
    const catalog = item && planForPrice(item.price.id);
    if (!catalog || subscription.items.data.length !== 1)
      throw new Error("Unrecognized Studio subscription price.");
    let start = item.current_period_start,
      end = item.current_period_end;
    let paidCatalog: ReturnType<typeof planForPrice> = null;
    let paidUpgrade = false;
    let paidUpgradeAt: string | undefined;
    if (paidInvoice) {
      // The invoice period is authoritative. A delayed old paid event must never
      // mark a newer unpaid subscription period as paid.
      const matching = paidInvoice.lines.data.filter(
        (line) => line.parent?.subscription_item_details?.subscription === subscription.id,
      );
      let lines = matching.filter((line) => !line.parent?.subscription_item_details?.proration);
      if (!lines.length) {
        lines = matching.filter(
          (line) => line.amount > 0 && id(line.pricing?.price_details?.price) === item.price.id,
        );
        if (lines.length !== 1) return; // A downgrade/credit note cannot replenish allowance.
        const prior = await admin
          .from("workspace_subscriptions")
          .select("paid_period_start,paid_period_end,paid_billing_interval")
          .eq("workspace_id", workspaceId)
          .single();
        if (prior.error || !prior.data?.paid_period_start || !prior.data?.paid_period_end)
          throw new Error("A paid upgrade needs its existing paid membership period.");
        if (
          new Date(prior.data.paid_period_end).getTime() !== lines[0].period.end * 1000 ||
          prior.data.paid_billing_interval !== catalog.interval
        )
          throw new Error(
            "An interval-changing proration needs billing reconciliation before new credits.",
          );
        start = new Date(prior.data.paid_period_start).getTime() / 1000;
        end = new Date(prior.data.paid_period_end).getTime() / 1000;
        paidUpgrade = true;
        paidUpgradeAt = new Date(lines[0].period.start * 1000).toISOString();
      } else {
        start = Math.min(...lines.map((line) => line.period.start));
        end = Math.max(...lines.map((line) => line.period.end));
      }
      const paidPlans = lines.map((line) =>
        planForPrice(id(line.pricing?.price_details?.price) || ""),
      );
      if (
        paidPlans.some((plan) => !plan) ||
        new Set(paidPlans.map((plan) => `${plan?.plan}:${plan?.interval}`)).size !== 1
      )
        throw new Error("Paid invoice does not match one known Studio price.");
      paidCatalog = paidPlans[0];
    }
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start)
      throw new Error("Invalid subscription period.");
    const status =
      subscription.status === "active"
        ? "active"
        : subscription.status === "trialing"
          ? "trialing"
          : ["past_due", "unpaid"].includes(subscription.status)
            ? "past_due"
            : subscription.status === "canceled"
              ? "canceled"
              : "paused";
    await call("sync_studio_subscription", {
      event_key: event.id,
      event_time: event.created,
      target_workspace_id: workspaceId,
      paid_invoice: Boolean(paidInvoice),
      subscription_data: {
        ...catalog,
        paidPlan: paidCatalog?.plan,
        paidInterval: paidCatalog?.interval,
        paidAllowance: paidCatalog ? studioCreditAllowance[paidCatalog.plan] : undefined,
        paidUpgrade,
        paidUpgradeAt,
        status,
        campaignAllowance: studioPlans[catalog.plan].campaigns,
        customerId: id(subscription.customer),
        subscriptionId: subscription.id,
        periodStart: new Date(start * 1000).toISOString(),
        periodEnd: new Date(end * 1000).toISOString(),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });
  };
  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object;
    if (session.mode === "subscription" && session.subscription) {
      await sync(await stripe.subscriptions.retrieve(id(session.subscription)!));
      return;
    }
    if (
      session.mode === "payment" &&
      session.metadata?.purchase_kind === "production_deposit" &&
      session.payment_status === "paid"
    ) {
      const { queueTeamEmail } = await import("./team-email.server");
      const money = (cents: number | null) =>
        cents == null ? "" : `$${(cents / 100).toFixed(2)}`;
      await queueTeamEmail(
        "deposit-booked",
        {
          reference: session.metadata.quote_reference,
          customerName: session.metadata.customer_name,
          customerEmail: session.customer_details?.email ?? session.customer_email ?? "",
          company: session.metadata.company,
          depositPaid: money(session.amount_total),
          estimatedTotal: session.metadata.estimated_total
            ? `$${session.metadata.estimated_total}`
            : "",
        },
        `deposit-${session.id}`,
      );
      return;
    }
    if (session.mode !== "payment" || session.metadata?.purchase_kind !== "studio_credits") return;
    if (session.payment_status !== "paid" || session.status !== "complete") return;
    const key = session.metadata.pack as keyof typeof studioCreditTopUps;
    const pack = studioCreditTopUps[key];
    const workspaceId = session.metadata.workspace_id;
    if (
      !pack ||
      session.metadata.credit_catalog_version !== "1" ||
      !workspaceId ||
      session.client_reference_id !== workspaceId ||
      session.metadata.credits !== String(pack.credits) ||
      session.currency !== "usd" ||
      session.amount_total !== pack.priceUsd * 100 ||
      !session.payment_intent
    )
      throw new Error("Paid credit pack does not match the server catalog.");
    // Retrieve the PaymentIntent so a late async-success event cannot grant credits
    // after a charge has already been refunded or disputed.
    const payment = await stripe.paymentIntents.retrieve(id(session.payment_intent)!, {
      expand: ["latest_charge"],
    });
    const charge = payment.latest_charge;
    if (
      payment.status !== "succeeded" ||
      (typeof charge === "object" &&
        charge &&
        (charge.refunded || charge.disputed || charge.amount_refunded > 0))
    )
      throw new Error("Credit payment requires reconciliation before granting.");
    await call("grant_studio_topup", {
      event_key: event.id,
      event_time: event.created,
      target_workspace_id: workspaceId,
      session_id: session.id,
      payment_id: payment.id,
      credit_count: pack.credits,
      paid_cents: session.amount_total,
    });
    return;
  }
  if (event.type === "invoice.paid") {
    const invoice = event.data.object;
    const subscriptionId = id(invoice.parent?.subscription_details?.subscription);
    if (subscriptionId && invoice.status === "paid")
      await sync(await stripe.subscriptions.retrieve(subscriptionId), invoice);
    return;
  }
  if (
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted" ||
    event.type === "customer.subscription.created"
  ) {
    // Retrieval avoids regressing to an older payload when Stripe delivers events out of order.
    const subscription =
      event.type === "customer.subscription.deleted"
        ? event.data.object
        : await stripe.subscriptions.retrieve(event.data.object.id);
    await sync(subscription);
    return;
  }
  if (event.type === "invoice.payment_failed") {
    const subscriptionId = id(event.data.object.parent?.subscription_details?.subscription);
    if (subscriptionId) await sync(await stripe.subscriptions.retrieve(subscriptionId));
    return;
  }
  if (event.type === "charge.refunded" || event.type === "charge.dispute.created") {
    const disputed = event.type === "charge.dispute.created";
    const charge =
      event.type === "charge.refunded"
        ? event.data.object
        : await stripe.charges.retrieve(id(event.data.object.charge)!);
    const paymentId = id(charge.payment_intent);
    if (!paymentId) return;
    const reversed = await call("reverse_studio_topup", {
      event_key: event.id,
      event_time: event.created,
      payment_id: paymentId,
      refunded_cents: charge.amount_refunded,
      disputed,
    });
    if (!reversed && (disputed || charge.refunded)) {
      const payments = await stripe.invoicePayments.list({
        payment: { type: "payment_intent", payment_intent: paymentId },
        limit: 10,
      });
      for (const payment of payments.data) {
        const invoice = await stripe.invoices.retrieve(id(payment.invoice)!);
        const subscriptionId = id(invoice.parent?.subscription_details?.subscription);
        if (!subscriptionId) continue;
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        if (subscription.metadata.workspace_id)
          await call("hold_studio_billing", {
            event_key: `${event.id}:${invoice.id}`,
            event_time: event.created,
            target_workspace_id: subscription.metadata.workspace_id,
            subscription_id: subscription.id,
          });
      }
    }
  }
}
