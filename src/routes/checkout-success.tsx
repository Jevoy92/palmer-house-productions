/* eslint-disable react-refresh/only-export-components -- Verification and reconciliation boundaries are exported for network-free tests. */
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, CheckCircle2, Clock, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { CollectionShell } from "@/components/collection/CollectionShell";
import { cartStore } from "@/lib/cart-store";
import { DIY_DOWNLOADS } from "@/lib/pricing-catalog";
import { verifyDepositCheckout } from "@/lib/stripe-checkout";

type Verification = Awaited<ReturnType<typeof verifyDepositCheckout>>;

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
  const paid = verification.status === "paid";
  const digital = paid && verification.purchaseKind === "digital";

  useEffect(() => {
    reconcileVerifiedReceipt(sessionId, verification);
  }, [sessionId, verification]);

  if (!paid) {
    const pending = verification.status === "pending";
    const unavailable = verification.status === "unavailable";
    return (
      <CollectionShell active="plan" backTo="/checkout">
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
    <CollectionShell active="plan" backTo="/checkout">
      <section className="pc-guide" aria-labelledby="payment-status-title">
        <CheckCircle2 size={38} aria-hidden="true" />
        <div className="mt-6">
          <p className="pc-eyebrow">Payment confirmed</p>
        </div>
        <h1 id="payment-status-title">
          {digital ? "Thanks for your purchase." : "Your payment is confirmed."}
        </h1>
        <p>
          {digital
            ? "Your digital purchase is paid in full. Keep your order reference for download access or support."
            : "Stripe confirmed this payment. Contact Palmer House with your reference for details about this order."}
        </p>
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
              <strong>{digital ? "Paid in full" : "Amount paid"}</strong>
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
  }),
  loader: async ({ location }) =>
    loadCheckoutReceipt(new URLSearchParams(location.search).get("session_id")),
  head: () => ({
    meta: [
      { title: "Payment Status | Palmer House Productions" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CheckoutSuccessPage,
});
