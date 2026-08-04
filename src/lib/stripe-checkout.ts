import { createServerFn } from "@tanstack/react-start";
import type Stripe from "stripe";
import { z } from "zod";

const CheckoutInput = z.object({
  email: z.string().email(),
  reference: z.string().min(4).max(40),
  items: z
    .array(
      z.object({
        id: z.string().min(1).max(100),
        qty: z.number().int().min(1).max(20),
        count: z.number().int().min(0).max(30).optional(),
      }),
    )
    .min(1)
    .max(30),
});

/**
 * Creates a Stripe-hosted Checkout Session for production deposits and full
 * digital-product payments. All prices are rebuilt from the server catalog;
 * client totals are intentionally ignored.
 */
export const createDepositCheckout = createServerFn({ method: "POST" })
  .validator(CheckoutInput)
  .handler(async ({ data }) => {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return { ok: false as const, code: "STRIPE_NOT_CONFIGURED" as const };

    const [{ default: Stripe }, { getRequestUrl }, catalog] = await Promise.all([
      import("stripe"),
      import("@tanstack/react-start/server"),
      import("./pricing-catalog"),
    ]);
    const stripe = new Stripe(secret);
    const diyIds = new Set(catalog.DIY_DOWNLOADS.map((item) => item.id));
    const lineItems = data.items.map((selected) => {
      const item = catalog.getItemById(selected.id);
      if (!item) throw new Error(`Unknown catalog item: ${selected.id}`);
      const fullUnit = catalog.computeItemPrice(item, selected.count);
      const unitAmount = diyIds.has(item.id)
        ? Math.round(fullUnit * 100)
        : Math.round(fullUnit * 0.1 * 100);
      return {
        quantity: selected.qty,
        price_data: {
          currency: "usd",
          product_data: {
            name: diyIds.has(item.id) ? item.name : `10% booking deposit — ${item.name}`,
            description: diyIds.has(item.id)
              ? item.description
              : "Working deposit. Final scope, schedule, tax, and travel are confirmed before production.",
          },
          unit_amount: unitAmount,
        },
      } satisfies Stripe.Checkout.SessionCreateParams.LineItem;
    });

    const requestOrigin = getRequestUrl().origin;
    const siteOrigin = process.env.PUBLIC_SITE_URL || requestOrigin;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: data.email,
      client_reference_id: data.reference,
      line_items: lineItems,
      success_url: `${siteOrigin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteOrigin}/checkout`,
      allow_promotion_codes: true,
      metadata: { quote_reference: data.reference },
    });

    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    return { ok: true as const, url: session.url };
  });
