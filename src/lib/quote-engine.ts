import {
  ADD_ONS,
  DIY_DOWNLOADS,
  PACKAGE_PRICING_BASIS,
  computePackagePrice,
  getItemById,
  getPackageById,
  getPackageScope,
  validatePackageConfiguration,
  type SelectedMap,
} from "./pricing-catalog";
import {
  buildReceiptLines,
  cartSubtotal,
  getKitCadence,
  getKitDurationSeconds,
  getKitSessionCount,
  kitAddOnCountKey,
  monthlyPrice,
  normalizeCartState,
  type CartState,
  type PurchaseCadence,
  type VideoDurationSeconds,
} from "./cart-store";
import { offerUnitPrice, type OfferCode } from "./offer-catalog";

export type CheckoutConfiguration = {
  id: string;
  qty: number;
  count?: number;
  sessions?: number;
  durationSeconds?: VideoDurationSeconds;
  cadence: PurchaseCadence;
  addOnIds: string[];
};

export type QuoteCustomer = {
  name: string;
  email: string;
  company?: string;
  city?: string;
  timing?: string;
  recipient?: string;
  note?: string;
  gift?: boolean;
  expandedScriptwriting?: boolean;
};

export type QuoteSnapshot = {
  reference: string;
  items: CheckoutConfiguration[];
  offerCode?: OfferCode;
  pricingBasis: typeof PACKAGE_PRICING_BASIS;
  subtotal: number;
  /** Legacy payment estimate: production deposit plus full digital-product cost. */
  deposit: number;
  cadenceMix: "one-time" | "monthly" | "mixed";
  customer?: QuoteCustomer;
};

const diyIds = new Set(DIY_DOWNLOADS.map((item) => item.id));

export function cartToCheckoutItems(input: CartState): CheckoutConfiguration[] {
  const cart = normalizeCartState(input);
  return Object.entries(cart.selected).map(([id, qty]) => {
    const pkg = getPackageById(id);
    if (pkg) {
      return {
        id,
        qty,
        count: cart.counts[id] ?? pkg.editable!.defaultCount,
        sessions: getKitSessionCount(cart.counts, id),
        durationSeconds:
          pkg.lane === "evergreen" ? undefined : getKitDurationSeconds(cart.counts, id),
        cadence: getKitCadence(cart.counts, id, cart.cadence),
        addOnIds: ADD_ONS.filter(
          (a) =>
            cart.counts[kitAddOnCountKey(id, a.id)] &&
            (!a.applicablePals || a.applicablePals.includes(pkg.lane)),
        ).map((a) => a.id),
      };
    }
    return {
      id,
      qty,
      cadence: diyIds.has(id) ? ("one-time" as const) : cart.cadence,
      addOnIds: [],
    };
  });
}

export function getCadenceMix(
  items: Pick<CheckoutConfiguration, "cadence">[],
): QuoteSnapshot["cadenceMix"] {
  const hasMonthly = items.some((item) => item.cadence === "monthly");
  const hasOneTime = items.some((item) => item.cadence === "one-time");
  return hasMonthly && hasOneTime ? "mixed" : hasMonthly ? "monthly" : "one-time";
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
  const normalized = normalizeCartState(cart);
  const lines = buildReceiptLines(normalized);
  const items = cartToCheckoutItems(normalized);
  return {
    reference,
    items,
    offerCode: normalized.offerCode,
    pricingBasis: PACKAGE_PRICING_BASIS,
    subtotal: cartSubtotal(lines),
    deposit:
      Math.round(
        lines.reduce(
          (sum, line) => sum + line.price * line.qty * (diyIds.has(line.id) ? 1 : 0.1),
          0,
        ) * 100,
      ) / 100,
    cadenceMix: getCadenceMix(items),
    customer,
  };
}

export function selectedMapFromItems(items: CheckoutConfiguration[]): SelectedMap {
  return items.reduce<SelectedMap>((selected, item) => {
    selected[item.id] = (selected[item.id] ?? 0) + item.qty;
    return selected;
  }, {});
}

export type PricedCheckoutLine = {
  configuration: CheckoutConfiguration;
  name: string;
  description: string;
  scope: string;
  isDigital: boolean;
  unitPrice: number;
  total: number;
};

/** Authoritative validation and pricing, shared by the server and focused tests.
 * Never accepts client totals or allows arbitrary add-on IDs/copies to change a quote.
 */
export function priceCheckoutItems(
  items: CheckoutConfiguration[],
  offerCode?: OfferCode,
): PricedCheckoutLine[] {
  if (!Array.isArray(items) || items.length < 1 || items.length > 30)
    throw new Error("Choose 1–30 catalog items.");
  const seen = new Set<string>();
  const selected = selectedMapFromItems(items.filter((item) => item.cadence === "one-time"));
  return items.map((input) => {
    const item = getItemById(input.id);
    if (!item || item.id !== input.id)
      throw new Error(
        `Package has changed or is unavailable: ${input.id}. Review the current catalog.`,
      );
    if (seen.has(item.id)) throw new Error(`Duplicate catalog item: ${item.id}`);
    seen.add(item.id);
    if (!Number.isInteger(input.qty) || input.qty < 1 || input.qty > 20)
      throw new Error(`Invalid quantity: ${item.id}`);
    if (input.cadence !== "one-time" && input.cadence !== "monthly")
      throw new Error("Invalid purchase cadence.");
    if (
      !Array.isArray(input.addOnIds) ||
      input.addOnIds.length > 12 ||
      new Set(input.addOnIds).size !== input.addOnIds.length
    )
      throw new Error("Invalid or duplicate add-ons.");
    if (input.durationSeconds !== undefined && ![15, 30, 60].includes(input.durationSeconds))
      throw new Error("Invalid video duration.");
    const pkg = getPackageById(item.id);
    const isDigital = diyIds.has(item.id);
    if (
      !pkg &&
      (input.count !== undefined ||
        input.sessions !== undefined ||
        input.durationSeconds !== undefined ||
        input.addOnIds.length)
    )
      throw new Error(`This item does not accept production scope: ${item.id}`);
    if (isDigital && input.cadence !== "one-time")
      throw new Error("Digital products are one-time purchases.");
    if (pkg?.lane === "evergreen" && input.durationSeconds !== undefined)
      throw new Error("Episode runtime is configured in five-minute blocks.");
    const config = pkg ? validatePackageConfiguration(pkg, input.count, input.sessions) : undefined;
    const addOns = input.addOnIds.map((id) => {
      const addOn = ADD_ONS.find((a) => a.id === id);
      if (!addOn || !pkg || (addOn.applicablePals && !addOn.applicablePals.includes(pkg.lane)))
        throw new Error(`Unavailable add-on for this package: ${id}`);
      return addOn;
    });
    const basePrice = pkg ? computePackagePrice(pkg, config!.count, config!.sessions) : item.price;
    const addOnPrice = addOns.reduce((sum, a) => sum + a.price, 0);
    const unitPrice =
      input.cadence === "monthly"
        ? monthlyPrice(basePrice + addOnPrice)
        : offerUnitPrice({
            code: offerCode,
            itemId: item.id,
            baseUnitPrice: basePrice,
            addOnUnitPrice: addOnPrice,
            qty: input.qty,
            selected,
          });
    const scope = [
      pkg ? getPackageScope(pkg, config!.count, config!.sessions) : "",
      input.cadence === "monthly" ? "Monthly" : "One-time",
      addOns.length ? `Add-ons: ${addOns.map((a) => a.name).join(", ")}` : "",
    ]
      .filter(Boolean)
      .join(" · ");
    return {
      configuration: { ...input, ...config },
      name: item.name,
      description: item.description,
      scope,
      isDigital,
      unitPrice,
      total: Math.round(unitPrice * input.qty * 100) / 100,
    };
  });
}
