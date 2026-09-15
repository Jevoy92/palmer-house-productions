import { createServerFn } from "@tanstack/react-start";
import type Stripe from "stripe";
import { z } from "zod";

const CheckoutInput = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(120),
  company: z.string().max(160).optional(),
  reference: z.string().min(4).max(40),
  offerCode: z.enum(["STARTERDUO", "EDIT2FOR1"]).optional(),
  gift: z.boolean().optional(),
  expandedScriptwriting: z.boolean().optional(),
  items: z
    .array(
      z.object({
        id: z.string().min(1).max(100),
        qty: z.number().int().min(1).max(20),
        count: z.number().int().min(0).max(20).optional(),
        sessions: z.number().int().min(0).max(4).optional(),
        durationSeconds: z.union([z.literal(15), z.literal(30), z.literal(60)]).optional(),
        cadence: z.enum(["one-time", "monthly"]),
        addOnIds: z.array(z.string().min(1).max(100)).max(12),
      }),
    )
    .min(1)
    .max(30),
});

const CheckoutVerificationInput = z.object({
  sessionId: z.string().trim().min(8).max(255),
});

/**
 * Creates a Stripe-hosted Checkout Session for full digital-product payments.
 * Production payments require a confirmed quote. Prices are rebuilt from the server catalog;
 * client totals are intentionally ignored.
 */
export const createDepositCheckout = createServerFn({ method: "POST" })
  .validator(CheckoutInput)
  .handler(async ({ data }) => {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return { ok: false as const, code: "STRIPE_NOT_CONFIGURED" as const };

    const [{ default: Stripe }, { getRequestUrl }, { priceCheckoutItems }] = await Promise.all([
      import("stripe"),
      import("@tanstack/react-start/server"),
      import("./quote-engine"),
    ]);
    // Rebuild every amount and validate IDs, sessions, units and add-ons on the server.
    const priced = priceCheckoutItems(data.items, data.offerCode);
    if (data.items.some((item) => item.cadence === "monthly")) {
      return { ok: false as const, code: "MONTHLY_REQUIRES_BOOKING" as const };
    }
    // Production is quote-first. A future payment endpoint must look up a persisted,
    // approved quote rather than treating a client-created reference as approval.
    // Existing standalone digital purchases remain available.
    if (priced.some((line) => !line.isDigital)) {
      return { ok: false as const, code: "PRODUCTION_REQUIRES_CONFIRMED_QUOTE" as const };
    }
    const stripe = new Stripe(secret);
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = priced.map((line) => ({
      quantity: line.configuration.qty,
      price_data: {
        currency: "usd",
        product_data: {
          name: line.name,
          description: line.description,
          metadata: { catalog_item_id: line.configuration.id },
        },
        unit_amount: Math.round(line.unitPrice * 100),
      },
    }));
    const configurationMetadata = Object.fromEntries(
      priced.map((line, index) => {
        const configuration = JSON.stringify(line.configuration);
        if (configuration.length > 500) throw new Error("The checkout configuration is too large.");
        return [`item_${index}`, configuration];
      }),
    );

    const requestOrigin = getRequestUrl().origin;
    const siteOrigin = process.env.PUBLIC_SITE_URL || requestOrigin;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: data.email,
      client_reference_id: data.reference,
      line_items: lineItems,
      success_url: `${siteOrigin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteOrigin}/checkout`,
      allow_promotion_codes: !data.offerCode,
      metadata: {
        quote_reference: data.reference,
        customer_name: data.name,
        company: data.company ?? "",
        offer_code: data.offerCode ?? "",
        gift: data.gift ? "yes" : "no",
        expanded_scriptwriting: data.expandedScriptwriting ? "yes" : "no",
        configuration_version: "2",
        item_count: String(priced.length),
        ...configurationMetadata,
      },
    });

    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    return { ok: true as const, url: session.url };
  });

/**
 * Confirms a checkout session on the server before the success route changes
 * client state. Only the minimal status needed by the UI is returned.
 */
export const verifyDepositCheckout = createServerFn({ method: "GET" })
  .validator(CheckoutVerificationInput)
  .handler(async ({ data }) => {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return { status: "unavailable" as const };

    try {
      const { default: Stripe } = await import("stripe");
      const stripe = new Stripe(secret);
      const session = await stripe.checkout.sessions.retrieve(data.sessionId);
      const quoteReference = session.metadata?.quote_reference;
      const isPalmerCheckout =
        session.mode === "payment" &&
        Boolean(quoteReference) &&
        quoteReference === session.client_reference_id;

      if (!isPalmerCheckout) return { status: "invalid" as const };
      if (session.status === "complete" && session.payment_status === "paid") {
        const { DIY_DOWNLOADS } = await import("./pricing-catalog");
        const digitalIds = new Set(DIY_DOWNLOADS.map((item) => item.id));
        const itemCount = Number(session.metadata?.item_count);
        const purchasedItems: { id: string; qty: number }[] = [];
        let digital =
          session.metadata?.configuration_version === "2" &&
          Number.isInteger(itemCount) &&
          itemCount >= 1 &&
          itemCount <= DIY_DOWNLOADS.length;
        if (digital) {
          const seen = new Set<string>();
          try {
            for (let index = 0; index < itemCount; index++) {
              const item = JSON.parse(session.metadata?.[`item_${index}`] ?? "null");
              if (
                !item ||
                !digitalIds.has(item.id) ||
                seen.has(item.id) ||
                !Number.isInteger(item.qty) ||
                item.qty < 1 ||
                item.qty > 20
              ) {
                digital = false;
                break;
              }
              seen.add(item.id);
              purchasedItems.push({ id: item.id, qty: item.qty });
            }
          } catch {
            digital = false;
          }
        }
        return {
          status: "paid" as const,
          purchaseKind: digital ? ("digital" as const) : ("legacy" as const),
          reference: quoteReference!,
          purchasedItems: digital ? purchasedItems : [],
          amountTotal: session.amount_total,
          currency: session.currency,
        };
      }
      return { status: "pending" as const };
    } catch {
      return { status: "invalid" as const };
    }
  });
