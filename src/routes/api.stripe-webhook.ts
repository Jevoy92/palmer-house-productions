import { createClient } from "@supabase/supabase-js";
import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";
import type { Database } from "@/lib/supabase/database.types";
import { SUPABASE_URL } from "@/lib/supabase/client";
import { applyStudioBillingEvent } from "@/lib/studio-billing-webhook.server";

async function handleStripeWebhook({ request }: { request: Request }) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const supabaseSecret =
    process.env["SUPABASE_SERVICE_ROLE_KEY"] || process.env["SUPABASE_SECRET_KEY"];
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
  const admin = createClient<Database>(
    process.env["SUPABASE_URL"] || SUPABASE_URL,
    supabaseSecret,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );

  try {
    await applyStudioBillingEvent(admin, stripe, event);
  } catch (error) {
    console.error("Stripe billing event failed", {
      eventId: event.id,
      type: event.type,
      message: error instanceof Error ? error.message : "Unknown billing error",
    });
    return Response.json(
      { error: "Billing update could not be saved. Stripe will retry." },
      { status: 500 },
    );
  }

  return Response.json({ received: true });
}

export const Route = createFileRoute("/api/stripe-webhook")({
  server: { handlers: { POST: handleStripeWebhook } },
});
