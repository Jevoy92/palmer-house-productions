import { ADD_ONS, DIY_DOWNLOADS, PAL_GROUPS, type SelectedMap } from "./pricing-catalog";
import {
  buildReceiptLines,
  cartSubtotal,
  getKitCadence,
  getKitDurationSeconds,
  kitAddOnCountKey,
  type CartState,
  type PurchaseCadence,
  type VideoDurationSeconds,
} from "./cart-store";
import type { OfferCode } from "./offer-catalog";

export type CheckoutConfiguration = {
  id: string;
  qty: number;
  count?: number;
  durationSeconds?: VideoDurationSeconds;
  cadence: PurchaseCadence;
  addOnIds: string[];
};

export type QuoteCustomer = {
  name: string;
  email: string;
  company?: string;
  recipient?: string;
  note?: string;
  gift?: boolean;
  expandedScriptwriting?: boolean;
};

export type QuoteSnapshot = {
  reference: string;
  items: CheckoutConfiguration[];
  offerCode?: OfferCode;
  subtotal: number;
  deposit: number;
  cadenceMix: "one-time" | "monthly" | "mixed";
  customer?: QuoteCustomer;
};

const productionIds = new Set(PAL_GROUPS.flatMap((group) => group.items.map((item) => item.id)));
const diyIds = new Set(DIY_DOWNLOADS.map((item) => item.id));

export function cartToCheckoutItems(cart: CartState): CheckoutConfiguration[] {
  const items: CheckoutConfiguration[] = [];

  for (const [id, qty] of Object.entries(cart.selected) as [string, number][]) {
    if (!qty) continue;
    if (productionIds.has(id)) {
      items.push({
        id,
        qty,
        count: cart.counts[id],
        durationSeconds: getKitDurationSeconds(cart.counts, id),
        cadence: getKitCadence(cart.counts, id, cart.cadence),
        addOnIds: ADD_ONS.filter((addOn) => cart.counts[kitAddOnCountKey(id, addOn.id)]).map(
          (addOn) => addOn.id,
        ),
      });
      continue;
    }

    items.push({
      id,
      qty,
      cadence: diyIds.has(id) ? "one-time" : cart.cadence,
      addOnIds: [],
    });
  }

  return items;
}

export function getCadenceMix(
  items: Pick<CheckoutConfiguration, "cadence">[],
): QuoteSnapshot["cadenceMix"] {
  const hasMonthly = items.some((item) => item.cadence === "monthly");
  const hasOneTime = items.some((item) => item.cadence === "one-time");
  if (hasMonthly && hasOneTime) return "mixed";
  return hasMonthly ? "monthly" : "one-time";
}

export function buildQuoteSnapshot({
  cart,
  reference,
  customer,
}: {
  cart: CartState;
  reference: string;
  customer?: QuoteCustomer;
}): QuoteSnapshot {
  const lines = buildReceiptLines(cart);
  const subtotal = cartSubtotal(lines);
  const items = cartToCheckoutItems(cart);
  return {
    reference,
    items,
    offerCode: cart.offerCode,
    subtotal,
    deposit: Math.round(subtotal * 0.1 * 100) / 100,
    cadenceMix: getCadenceMix(items),
    customer,
  };
}

export function selectedMapFromItems(items: CheckoutConfiguration[]): SelectedMap {
  return Object.fromEntries(items.map((item) => [item.id, item.qty]));
}
