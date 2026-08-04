import { createClient } from "@supabase/supabase-js";
import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";
import type { Database } from "@/lib/supabase/database.types";
import { SUPABASE_URL } from "@/lib/supabase/client";
import { studioPlans, type StudioPlanKey } from "@/lib/studio-model";

async function handleStripeWebhook({ request }: { request: Request }) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const supabaseSecret = process.env.SUPABASE_SECRET_KEY;
  if (!stripeSecret || !webhookSecret || !supabaseSecret) {
    return Response.json({ error: "Billing webhook is not configured." }, { status: 503 });
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) return Response.json({ error: "Missing Stripe signature." }, { status: 400 });
  const stripe = new Stripe(stripeSecret);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, webhookSecret);
  } catch {
    return Response.json({ error: "Invalid Stripe signature." }, { status: 400 });
  }
  const admin = createClient<Database>(SUPABASE_URL, supabaseSecret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    if (session.mode === "subscription" && session.subscription && session.customer) {
      const workspaceId = session.metadata?.workspace_id || session.client_reference_id;
      const plan = session.metadata?.plan as StudioPlanKey | undefined;
      const billingInterval = session.metadata?.interval === "year" ? "year" : "month";
      if (workspaceId && plan && studioPlans[plan]) {
        await admin
          .from("workspace_subscriptions")
          .update({
            plan,
            status: "active",
            campaign_allowance: studioPlans[plan].campaigns,
            billing_interval: billingInterval,
            stripe_customer_id: String(session.customer),
            stripe_subscription_id: String(session.subscription),
          })
          .eq("workspace_id", workspaceId);
      }
    }
  }

  if (
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    const subscription = event.data.object;
    const workspaceId = subscription.metadata.workspace_id;
    const plan = subscription.metadata.plan as StudioPlanKey | undefined;
    const billingInterval = subscription.metadata.interval === "year" ? "year" : "month";
    if (workspaceId) {
      const status =
        event.type === "customer.subscription.deleted"
          ? "canceled"
          : subscription.status === "active"
            ? "active"
            : subscription.status === "trialing"
              ? "trialing"
              : subscription.status === "past_due" || subscription.status === "unpaid"
                ? "past_due"
                : "paused";
      await admin
        .from("workspace_subscriptions")
        .update({
          status,
          plan: plan && studioPlans[plan] ? plan : undefined,
          campaign_allowance: plan && studioPlans[plan] ? studioPlans[plan].campaigns : undefined,
          billing_interval: billingInterval,
          stripe_customer_id: String(subscription.customer),
          stripe_subscription_id: subscription.id,
          cancel_at_period_end: subscription.cancel_at_period_end,
          current_period_start: new Date(
            subscription.items.data[0]?.current_period_start * 1000,
          ).toISOString(),
          current_period_end: new Date(
            subscription.items.data[0]?.current_period_end * 1000,
          ).toISOString(),
        })
        .eq("workspace_id", workspaceId);
    }
  }

  return Response.json({ received: true });
}

export const Route = createFileRoute("/api/stripe-webhook")({
  server: { handlers: { POST: handleStripeWebhook } },
});
