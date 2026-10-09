/* eslint-disable react-refresh/only-export-components -- Verification and reconciliation boundaries are exported for network-free tests. */
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, CheckCircle2, Clock, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { CollectionShell } from "@/components/collection/CollectionShell";
import { cartStore } from "@/lib/cart-store";
import { DIY_DOWNLOADS } from "@/lib/pricing-catalog";
import { verifyCoveredBooking, verifyDepositCheckout } from "@/lib/stripe-checkout";
import { HONEYBOOK_LEAD_FORM_URL } from "@/lib/honeybook";
import { BOOKING_EXPECTATIONS, bookingTargets, VIDEO_PLANNING_BOOKING_URL } from "@/lib/booking-links";

type Verification = Awaited<ReturnType<typeof verifyDepositCheckout>>;
type Covered = Awaited<ReturnType<typeof verifyCoveredBooking>>;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** A covered Partner booking is shown only after the server confirms its redemption. */
export async function loadCoveredBooking(
  redemptionId: string | null,
  verify: (input: { data: { redemptionId: string } }) => Promise<Covered> = verifyCoveredBooking,
): Promise<Covered> {
  const id = redemptionId?.trim() ?? "";
  if (!UUID.test(id)) return { status: "invalid" };
  try {
    return await verify({ data: { redemptionId: id } });
  } catch {
    return { status: "unavailable" };
  }
}

/** Planning-call next step. Opening it never marks anything as scheduled. */
export function PlanningCallStep({ purchasedAt }: { purchasedAt?: number | null }) {
  const targets = bookingTargets(purchasedAt ?? null);
  return (
    <div className="pc-status" aria-labelledby="planning-call-title">
      <h2 id="planning-call-title">Book your planning call</h2>
      <p>
        A 30-minute video call with our team to plan your shoot. This call plans the shoot — it
        does not reserve a filming date. We’ll agree on your filming date together.
      </p>
      <p>
        {BOOKING_EXPECTATIONS}
        {targets ? ` Suggested: book by ${targets.bookBy}; meet by ${targets.meetBy}.` : ""}
      </p>
      <div className="mt-4">
        <a
          href={VIDEO_PLANNING_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="pc-primary"
        >
          Book your planning call <ArrowRight size={18} />
        </a>
      </div>
    </div>
  );
}

export async function loadCheckoutReceipt(
  sessionId: string | null,
  verify: (input: { data: { sessionId: string } }) => Promise<Verification> = verifyDepositCheckout,
): Promise<Verification> {
  const id = sessionId?.trim() ?? "";
  if (id.length < 8 || id.length > 255) return { status: "invalid" };
  try {
    return await verify({ data: { sessionId: id } });
  } catch {
    return { status: "unavailable" };
  }
}

/** Cart changes require verified digital items and a locally remembered checkout. */
export function reconcileVerifiedReceipt(
  sessionId: string,
  verification: Verification,
  reconcile: (
    sessionId: string,
    reference: string,
    items: { id: string; qty: number }[],
  ) => unknown = (id, reference, items) => cartStore.reconcileDigitalPurchase(id, reference, items),
): void {
  if (sessionId && verification.status === "paid" && verification.purchaseKind === "digital") {
    reconcile(sessionId, verification.reference, verification.purchasedItems);
  }
}

function CheckoutSuccessPage() {
  const { session_id: sessionId } = Route.useSearch();
  const verification = Route.useLoaderData();
  useEffect(() => {
    if (verification.mode === "receipt") reconcileVerifiedReceipt(sessionId, verification.result);
  }, [sessionId, verification]);

  if (verification.mode === "covered") {
    const covered = verification.result;
    if (covered.status === "covered") {
      return (
        <CollectionShell active="plan" backTo="/studio" backLabel="Back to Studio">
          <section className="pc-guide" aria-labelledby="included-title">
            <CheckCircle2 size={38} aria-hidden="true" />
            <p className="pc-eyebrow mt-6">Partner membership</p>
            <h1 id="included-title">Your filming session is booked.</h1>
            <p className="mt-4">
              This month's included filming session covers it, so there's nothing to pay today.
              Next, book your planning call and tell us about your project.
            </p>
            <PlanningCallStep purchasedAt={covered.confirmedAt} />
            <div className="mt-6">
              <a
                href={`${HONEYBOOK_LEAD_FORM_URL}${HONEYBOOK_LEAD_FORM_URL.includes("?") ? "&" : "?"}quote_ref=${encodeURIComponent(covered.reference)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pc-outline"
              >
                Complete your project intake <ArrowRight size={18} />
              </a>
            </div>
            <p className="pc-reference">
              Booking reference: <strong>{covered.reference}</strong>
            </p>
          </section>
        </CollectionShell>
      );
    }
  }
  const receipt: Verification =
    verification.mode === "covered"
      ? { status: verification.result.status === "unavailable" ? "unavailable" : "invalid" }
      : verification.result;
  return <ReceiptView sessionId={sessionId} verification={receipt} />;
}

function ReceiptView({ sessionId, verification }: { sessionId: string; verification: Verification }) {
  const paid = verification.status === "paid";
  const digital = paid && verification.purchaseKind === "digital";
  const deposit = paid && verification.purchaseKind === "production_deposit";


  if (!paid) {
    const pending = verification.status === "pending";
    const unavailable = verification.status === "unavailable";
    return (
      <CollectionShell active="plan" backTo="/checkout" backLabel="Back to your plan">
        <section className="pc-guide" aria-labelledby="payment-status-title">
          {pending ? (
            <Clock size={36} aria-hidden="true" />
          ) : (
            <AlertTriangle size={36} aria-hidden="true" />
          )}
          <div className="mt-6">
            <p className="pc-eyebrow">Payment status</p>
          </div>
          <h1 id="payment-status-title">
            {pending
              ? "Your payment is processing."
              : unavailable
                ? "Payment verification is unavailable."
                : "We couldn’t verify this payment."}
          </h1>
          <p>
            {pending
              ? "Stripe has not confirmed payment yet. Your cart is still saved. Check again in a moment."
              : "Your cart is still saved. If you completed a payment, contact Palmer House before starting another checkout."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {(pending || unavailable) && (
              <button type="button" className="pc-primary" onClick={() => window.location.reload()}>
                <RefreshCw size={18} /> Check payment status
              </button>
            )}
            <Link to="/contact" className={pending || unavailable ? "pc-outline" : "pc-primary"}>
              Contact Palmer House <ArrowRight size={18} />
            </Link>
            <Link to="/checkout" className="pc-text-button">
              Review your cart
            </Link>
          </div>
        </section>
      </CollectionShell>
    );
  }

  const supportSubject = `${digital ? "Digital purchase" : "Payment"} support · ${verification.reference}`;
  const supportUrl = `mailto:info@palmerhouseproductions.com?subject=${encodeURIComponent(supportSubject)}`;
  // This checkout sells the catalog in USD. Never reconstruct a receipt from current catalog prices.
  const paidTotal =
    verification.currency === "usd" &&
    typeof verification.amountTotal === "number" &&
    Number.isFinite(verification.amountTotal)
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
          verification.amountTotal / 100,
        )
      : undefined;

  return (
    <CollectionShell active="plan" backTo="/checkout" backLabel="Back to your plan">
      <section className="pc-guide" aria-labelledby="payment-status-title">
        <CheckCircle2 size={38} aria-hidden="true" />
        <div className="mt-6">
          <p className="pc-eyebrow">Payment confirmed</p>
        </div>
        <h1 id="payment-status-title">
          {digital
            ? "Thanks for your purchase."
            : deposit
              ? "Your project is booked."
              : "Your payment is confirmed."}
        </h1>
        <p>
          {digital
            ? "Your digital purchase is paid in full. Keep your order reference for download access or support."
            : deposit
              ? "Your 50% deposit is paid and our team has your order. One last step: tell us about your project in our intake form so we can schedule your shoot."
              : "Stripe confirmed this payment. Contact Palmer House with your reference for details about this order."}
        </p>
        {deposit && <PlanningCallStep purchasedAt={verification.paidAt} />}
        {deposit && (
          <div className="mt-6">
            <a
              href={`${HONEYBOOK_LEAD_FORM_URL}${HONEYBOOK_LEAD_FORM_URL.includes("?") ? "&" : "?"}quote_ref=${encodeURIComponent(verification.reference)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pc-outline"
            >
              Complete your project intake <ArrowRight size={18} />
            </a>
          </div>
        )}
        <div className="pc-status" aria-labelledby="order-summary-title">
          <h2 id="order-summary-title">{digital ? "Your digital order" : "Payment receipt"}</h2>
          {digital && (
            <div className="pc-summary-items">
              {verification.purchasedItems.map((item) => (
                <div key={item.id}>
                  <span>
                    {DIY_DOWNLOADS.find((download) => download.id === item.id)?.name ??
                      "Digital product"}
                    <small>PDF download</small>
                  </span>
                  <strong>Qty {item.qty}</strong>
                </div>
              ))}
            </div>
          )}
          {paidTotal && (
            <div className="pc-total">
              <strong>{digital ? "Paid in full" : deposit ? "Deposit paid" : "Amount paid"}</strong>
              <strong>{paidTotal}</strong>
            </div>
          )}
          <p className="pc-reference">
            {digital ? "Order reference" : "Payment reference"}:{" "}
            <strong>{verification.reference}</strong>
          </p>
        </div>
        {digital && (
          <div className="mt-6">
            <h2>Need your download links?</h2>
            <div className="mt-3">
              <p>
                Contact Palmer House with the order reference above for download access or help with
                your purchase.
              </p>
            </div>
          </div>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="pc-primary" href={supportUrl}>
            {digital ? "Get help with downloads" : "Ask about this payment"}{" "}
            <ArrowRight size={18} />
          </a>
          <Link to={digital ? "/services/diy-downloads" : "/shop"} className="pc-outline">
            {digital ? "Browse more downloads" : "Explore packages"}
          </Link>
        </div>
      </section>
    </CollectionShell>
  );
}

export const Route = createFileRoute("/checkout-success")({
  validateSearch: (search: Record<string, unknown>) => ({
    session_id: typeof search.session_id === "string" ? search.session_id.trim() : "",
    covered: typeof search.covered === "string" ? search.covered.trim() : undefined,
  }),
  loader: async ({ location }) => {
    const params = new URLSearchParams(location.search);
    const covered = params.get("covered");
    if (covered) return { mode: "covered" as const, result: await loadCoveredBooking(covered) };
    return { mode: "receipt" as const, result: await loadCheckoutReceipt(params.get("session_id")) };
  },
  head: () => ({
    meta: [
      { title: "Payment Status | Palmer House Productions" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CheckoutSuccessPage,
});
