import {
  buildReceiptLines,
  kitAddOnCountKey,
  kitCadenceCountKey,
  kitSessionCountKey,
  type CartState,
} from "@/lib/cart-store";
import {
  ADD_ONS,
  computePackagePrice,
  getPackageScope,
  normalizePackageConfiguration,
  type PackageItem,
} from "@/lib/pricing-catalog";

type PackageDraft = {
  count?: number;
  sessions?: number;
  extras?: Record<string, boolean>;
};

/** Project the saved line before rendering or saving so every amount matches checkout. */
export function packageEstimate(cart: CartState, item: PackageItem, draft: PackageDraft = {}) {
  const saved = Boolean(cart.selected[item.id]);
  const config = normalizePackageConfiguration(
    item,
    draft.count ?? (saved ? cart.counts[item.id] : undefined),
    draft.sessions ?? (saved ? cart.counts[kitSessionCountKey(item.id)] : undefined),
  );
  const counts = {
    ...cart.counts,
    [item.id]: config.count,
    [kitSessionCountKey(item.id)]: config.sessions,
  };
  if (!saved) {
    counts[kitCadenceCountKey(item.id)] = 0;
    for (const extra of ADD_ONS) counts[kitAddOnCountKey(item.id, extra.id)] = 0;
  }
  for (const [extraId, selected] of Object.entries(draft.extras ?? {})) {
    counts[kitAddOnCountKey(item.id, extraId)] = selected ? 1 : 0;
  }
  const projected: CartState = {
    ...cart,
    selected: { ...cart.selected, [item.id]: cart.selected[item.id] || 1 },
    counts,
  };
  const line = buildReceiptLines(projected).find((candidate) => candidate.id === item.id)!;
  const extras = ADD_ONS.filter(
    (extra) =>
      counts[kitAddOnCountKey(item.id, extra.id)] &&
      (!extra.applicablePals || extra.applicablePals.includes(item.lane)),
  );
  const undiscounted =
    computePackagePrice(item, config.count, config.sessions) +
    extras.reduce((sum, extra) => sum + extra.price, 0);
  const scope = [
    line.qty > 1
      ? `${line.qty} packages · ${getPackageScope(item, config.count, config.sessions)} each`
      : getPackageScope(item, config.count, config.sessions),
    ...(line.cadence === "monthly" ? ["Monthly"] : []),
    ...(extras.length ? [`Includes ${extras.map((extra) => extra.name).join(", ")}`] : []),
    ...(line.cadence !== "monthly" && line.price < undiscounted ? ["Offer applied"] : []),
  ].join(" · ");
  return { cart: projected, line, total: line.price * line.qty, scope, undiscounted };
}
