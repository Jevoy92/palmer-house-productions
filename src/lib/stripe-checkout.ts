import { stripeSecretKey } from "@/lib/stripe-env";
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
  accessToken: z.string().min(20).max(4000).optional(),
  workspaceId: z.string().uuid().optional(),
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
    const secret = stripeSecretKey();
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
    // Production books with a 50% deposit of the server-priced total; the balance is invoiced in HoneyBook.
    const isProduction = priced.some((line) => !line.isDigital);
    const stripe = new Stripe(secret);
    const productionTotal = priced.reduce(
      (sum, line) => sum + line.unitPrice * line.configuration.qty,
      0,
    );
    // Membership filming benefit: verified on the server, applied to one session fee only.
    let benefit: Awaited<ReturnType<typeof import("./filming-benefit.server").resolveFilmingBenefit>> = null;
    const { getPackageById } = await import("./pricing-catalog");
    const hasFilming = priced.some((l) => !l.isDigital && getPackageById(l.configuration.id)?.lane !== "evergreen");
    if (isProduction && hasFilming && data.accessToken) {
      const { resolveFilmingBenefit } = await import("./filming-benefit.server");
      benefit = await resolveFilmingBenefit(data.accessToken, data.workspaceId, data.reference);
      if (benefit) benefit.discount = Math.min(benefit.discount, productionTotal);
    }
    const memberTotal = productionTotal - (benefit?.discount ?? 0);
    if (isProduction && benefit && memberTotal <= 0) {
      // Fully covered by Partner's included session: no payment; confirm straight to the team.
      const { markRedemption } = await import("./filming-benefit.server");
      const { queueTeamEmail } = await import("./team-email.server");
      await queueTeamEmail(
        "deposit-booked",
        {
          reference: data.reference,
          customerName: data.name,
          customerEmail: data.email,
          company: data.company ?? "",
          depositPaid: "$0.00 (Partner included session)",
          estimatedTotal: `$${productionTotal.toFixed(2)} retail · covered by membership`,
        },
        `included-${data.reference}`,
      );
      if (benefit.redemptionId) await markRedemption(benefit.redemptionId, "redeemed");
      const siteOrigin0 = process.env.PUBLIC_SITE_URL || getRequestUrl().origin;
      return { ok: true as const, url: `${siteOrigin0}/checkout-success?included=1&ref=${encodeURIComponent(data.reference)}` };
    }
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = isProduction
      ? [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              product_data: {
                name: "Video production deposit (50%)",
                description: `Books your project (${priced.map((l) => l.name).join(", ").slice(0, 240)}). ${benefit ? `${benefit.label}: −$${benefit.discount.toFixed(2)}. ` : ""}Estimated total $${memberTotal.toFixed(2)}; balance invoiced before delivery.`,
              },
              unit_amount: Math.round(memberTotal * 50),
            },
          },
        ]
      : priced.map((line) => ({
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
      ...(benefit?.redemptionId ? { expires_at: Math.floor(Date.now() / 1000) + 3600 } : {}),
      cancel_url: `${siteOrigin}/checkout`,
      allow_promotion_codes: !data.offerCode && !isProduction,
      metadata: {
        quote_reference: data.reference,
        customer_name: data.name,
        company: data.company ?? "",
        offer_code: data.offerCode ?? "",
        gift: data.gift ? "yes" : "no",
        expanded_scriptwriting: data.expandedScriptwriting ? "yes" : "no",
        configuration_version: "2",
        purchase_kind: isProduction ? "production_deposit" : "digital",
        estimated_total: isProduction ? memberTotal.toFixed(2) : "",
        member_benefit: benefit ? `${benefit.plan}:${benefit.discount.toFixed(2)}` : "",
        filming_redemption_id: benefit?.redemptionId ?? "",
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
    const secret = stripeSecretKey();
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
          purchaseKind:
            session.metadata?.purchase_kind === "production_deposit"
              ? ("production_deposit" as const)
              : digital
                ? ("digital" as const)
                : ("legacy" as const),
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
