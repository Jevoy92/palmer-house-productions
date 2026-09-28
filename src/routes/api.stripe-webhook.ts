import { stripeSecretKey, stripeWebhookSecrets } from "@/lib/stripe-env";
import { createClient } from "@supabase/supabase-js";
import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";
import type { Database } from "@/lib/supabase/database.types";
import { SUPABASE_URL } from "@/lib/supabase/client";
import { applyStudioBillingEvent } from "@/lib/studio-billing-webhook.server";

async function handleStripeWebhook({ request }: { request: Request }) {
  const stripeSecret = stripeSecretKey();
  const webhookSecrets = stripeWebhookSecrets();
  const supabaseSecret =
    process.env["SUPABASE_SERVICE_ROLE_KEY"] || process.env["SUPABASE_SECRET_KEY"];
  if (!stripeSecret || !webhookSecrets.length || !supabaseSecret) {
    return Response.json({ error: "Billing webhook is not configured." }, { status: 503 });
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) return Response.json({ error: "Missing Stripe signature." }, { status: 400 });
  const stripe = new Stripe(stripeSecret);
  const body = await request.text();
  let event: Stripe.Event | null = null;
  for (const secret of webhookSecrets) {
    try {
      event = stripe.webhooks.constructEvent(body, signature, secret);
      break;
    } catch {
      /* try next secret */
    }
  }
  if (!event) return Response.json({ error: "Invalid Stripe signature." }, { status: 400 });
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
