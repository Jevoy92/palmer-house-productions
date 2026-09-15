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
        count: z.number().int().min(0).max(30).optional(),
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
 * Creates a Stripe-hosted Checkout Session for production deposits and full
 * digital-product payments. All prices are rebuilt from the server catalog;
 * client totals are intentionally ignored.
 */
export const createDepositCheckout = createServerFn({ method: "POST" })
  .validator(CheckoutInput)
  .handler(async ({ data }) => {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) return { ok: false as const, code: "STRIPE_NOT_CONFIGURED" as const };

    const [{ default: Stripe }, { getRequestUrl }, catalog, offers] = await Promise.all([
      import("stripe"),
      import("@tanstack/react-start/server"),
      import("./pricing-catalog"),
      import("./offer-catalog"),
    ]);
    const stripe = new Stripe(secret);
    const diyIds = new Set(catalog.DIY_DOWNLOADS.map((item) => item.id));
    const evergreenIds = new Set(
      catalog.PAL_GROUPS.find((group) => group.id === "evergreen")?.items.map((item) => item.id) ??
        [],
    );
    if (data.items.some((item) => item.cadence === "monthly")) {
      return { ok: false as const, code: "MONTHLY_REQUIRES_BOOKING" as const };
    }

    const selectedMap = Object.fromEntries(data.items.map((item) => [item.id, item.qty]));
    const lineItems = data.items.map((selected) => {
      const item = catalog.getItemById(selected.id);
      if (!item) throw new Error(`Unknown catalog item: ${selected.id}`);
      if (
        item.editable &&
        selected.count !== undefined &&
        (selected.count < item.editable.min || selected.count > item.editable.max)
      ) {
        throw new Error(`Invalid configuration for catalog item: ${selected.id}`);
      }
      const addOns = selected.addOnIds.map((addOnId) => {
        const addOn = catalog.ADD_ONS.find((candidate) => candidate.id === addOnId);
        if (!addOn) throw new Error(`Unknown add-on: ${addOnId}`);
        return addOn;
      });
      const baseUnit = catalog.computeItemPrice(item, selected.count);
      const addOnUnit = addOns.reduce((sum, addOn) => sum + addOn.price, 0);
      const configuredUnit = baseUnit + addOnUnit;
      const fullUnit =
        selected.cadence === "one-time"
          ? offers.offerUnitPrice({
              code: data.offerCode,
              itemId: item.id,
              baseUnitPrice: baseUnit,
              addOnUnitPrice: addOnUnit,
              qty: selected.qty,
              selected: selectedMap,
            })
          : configuredUnit;
      const unitAmount = diyIds.has(item.id)
        ? Math.round(fullUnit * 100)
        : Math.round(fullUnit * 0.1 * 100);
      const configuredCount = selected.count ?? item.editable?.defaultCount;
      const runtime =
        configuredCount === undefined
          ? ""
          : evergreenIds.has(item.id)
            ? `${5 + configuredCount * 5}-minute episode`
            : `${configuredCount} edited ${configuredCount === 1 ? "minute" : "minutes"}`;
      const output =
        configuredCount !== undefined && selected.durationSeconds && !evergreenIds.has(item.id)
          ? `${(configuredCount * 60) / selected.durationSeconds} × ${selected.durationSeconds}-second outputs`
          : "";
      const configuration = [
        runtime,
        output,
        selected.cadence === "monthly" ? "Monthly" : "One-time",
        addOns.length ? `Add-ons: ${addOns.map((addOn) => addOn.name).join(", ")}` : "",
      ]
        .filter(Boolean)
        .join(" · ");
      return {
        quantity: selected.qty,
        price_data: {
          currency: "usd",
          product_data: {
            name: diyIds.has(item.id) ? item.name : `10% booking deposit — ${item.name}`,
            description: diyIds.has(item.id)
              ? item.description
              : `Working deposit. ${configuration || item.description}. Final scope, schedule, tax, and travel are confirmed before production.`,
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
      allow_promotion_codes: !data.offerCode,
      metadata: {
        quote_reference: data.reference,
        customer_name: data.name,
        company: data.company ?? "",
        offer_code: data.offerCode ?? "",
        gift: data.gift ? "yes" : "no",
        expanded_scriptwriting: data.expandedScriptwriting ? "yes" : "no",
        configuration: JSON.stringify(data.items).slice(0, 500),
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
        return { status: "paid" as const };
      }
      return { status: "pending" as const };
    } catch {
      return { status: "invalid" as const };
    }
  });
