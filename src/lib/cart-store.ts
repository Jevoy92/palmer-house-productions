/**
 * Persistent quote cart — shared across SiteHeader (cart preview) and
 * the package collection and pricing estimator. Backed by localStorage so selections
 * survive page reloads and route changes.
 *
 * Plain subscribable store + useSyncExternalStore so it works under SSR
 * (initial snapshot returns empty, hydrated on the client).
 */
import { useSyncExternalStore } from "react";
import {
  ADD_ONS,
  DIY_DOWNLOADS,
  PAL_GROUPS,
  PACKAGE_PRICING_BASIS,
  type PackagePricingBasis,
  computePackagePrice,
  getItemById,
  getPackageById,
  getPackageScope,
  isFinishedVideoPricing,
  LEGACY_PACKAGE_DEFAULTS,
  normalizePackageConfiguration,
  resolvePackageId,
  type SelectedMap,
} from "./pricing-catalog";
import { isOfferCode, offerUnitPrice, type OfferCode } from "./offer-catalog";
import type { ReceiptLine } from "@/components/pricing/Receipt";

export type CountsMap = Record<string, number>;

export type PurchaseCadence = "one-time" | "monthly";
export const MONTHLY_DISCOUNT_RATE = 0.2;

export function monthlyPrice(price: number): number {
  return Math.round(price * (1 - MONTHLY_DISCOUNT_RATE));
}

export function kitAddOnCountKey(itemId: string, addOnId: string): string {
  return `kit-addon:${resolvePackageId(itemId)}:${addOnId}`;
}

export const VIDEO_DURATION_OPTIONS = [15, 30, 60] as const;
export type VideoDurationSeconds = (typeof VIDEO_DURATION_OPTIONS)[number];

export function kitDurationCountKey(itemId: string): string {
  return `kit-duration:${resolvePackageId(itemId)}`;
}

export function kitCadenceCountKey(itemId: string): string {
  return `kit-cadence:${resolvePackageId(itemId)}`;
}

export function kitSessionCountKey(itemId: string): string {
  return `kit-sessions:${resolvePackageId(itemId)}`;
}

export function getKitSessionCount(counts: CountsMap, itemId: string): number {
  const item = getPackageById(itemId);
  return item
    ? normalizePackageConfiguration(item, counts[item.id], counts[kitSessionCountKey(item.id)])
        .sessions
    : 0;
}

export function getKitCadence(
  counts: CountsMap,
  itemId: string,
  fallback: PurchaseCadence = "one-time",
): PurchaseCadence {
  const key = kitCadenceCountKey(itemId);
  if (!Object.prototype.hasOwnProperty.call(counts, key)) return fallback;
  return counts[key] === 1 ? "monthly" : "one-time";
}

export function getKitDurationSeconds(counts: CountsMap, itemId: string): VideoDurationSeconds {
  const duration = counts[kitDurationCountKey(itemId)];
  return VIDEO_DURATION_OPTIONS.includes(duration as VideoDurationSeconds)
    ? (duration as VideoDurationSeconds)
    : 60;
}

export function getKitOutputCount(runtimeMinutes: number, durationSeconds: number): number {
  return Math.max(1, Math.round((runtimeMinutes * 60) / durationSeconds));
}

export type CartState = {
  selected: SelectedMap;
  counts: CountsMap;
  cadence: PurchaseCadence;
  offerCode?: OfferCode;
  pricingBasis?: PackagePricingBasis;
  migrationNotice?: string;
  /** Retired configurations that cannot be merged without changing their scope. */
  migrationReview?: LegacyCartConfiguration[];
  /** A removed/re-added line is a new selection, even when its quantity matches. */
  lineGenerations?: Record<string, number>;
  pendingDigitalCheckouts?: Record<string, DigitalCheckoutSelection[]>;
  reconciledPurchases?: string[];
};

export type PurchasedDigitalItem = { id: string; qty: number };
export type DigitalCheckoutSelection = PurchasedDigitalItem & { generation: number };

export type LegacyCartConfiguration = {
  id: string;
  canonicalId?: string;
  qty: number;
  count?: number;
  sessions?: number;
  cadence?: PurchaseCadence;
  addOnIds?: string[];
  durationSeconds?: VideoDurationSeconds;
};

export const CART_STORAGE_KEY = "ph.quote.cart.v2";
const LEGACY_STORAGE_KEY = "ph.quote.cart.v1";
const STORAGE_KEY = CART_STORAGE_KEY;
const EMPTY: CartState = {
  selected: {},
  counts: {},
  cadence: "one-time",
  pricingBasis: PACKAGE_PRICING_BASIS,
};
const MIGRATION_NOTICE =
  "Your saved plan uses our current package names and approved prices. Previous edited-minute scopes have been converted to finished-video counts using their saved video length. Review the scope and recalculated estimate before sending. Older configurations needing a separate review remain saved in this browser.";

const objectRecord = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
const validQty = (value: unknown): number =>
  typeof value === "number" && Number.isFinite(value)
    ? Math.max(0, Math.min(20, Math.floor(value)))
    : 0;

/** Versioned, deterministic migration used for hydration and every store mutation. */
export function normalizeCartState(
  value: unknown,
  options: { legacyPricing?: boolean } = {},
): CartState {
  const raw = objectRecord(value);
  const rawSelected = objectRecord(raw.selected);
  const rawCounts = objectRecord(raw.counts);
  const cadence: PurchaseCadence = raw.cadence === "monthly" ? "monthly" : "one-time";
  const selected: SelectedMap = {};
  const lineGenerations = Object.fromEntries(
    Object.entries(objectRecord(raw.lineGenerations)).filter(
      ([id, generation]) =>
        DIY_DOWNLOADS.some((item) => item.id === id) &&
        typeof generation === "number" &&
        Number.isSafeInteger(generation) &&
        generation >= 0,
    ),
  ) as Record<string, number>;
  const pendingDigitalCheckouts: Record<string, DigitalCheckoutSelection[]> = {};
  for (const [reference, entries] of Object.entries(
    objectRecord(raw.pendingDigitalCheckouts),
  ).slice(-20)) {
    if (!Array.isArray(entries)) continue;
    const valid = entries.filter((entry): entry is DigitalCheckoutSelection =>
      Boolean(
        entry &&
        DIY_DOWNLOADS.some((item) => item.id === entry.id) &&
        Number.isInteger(entry.qty) &&
        entry.qty >= 1 &&
        entry.qty <= 20 &&
        Number.isSafeInteger(entry.generation) &&
        entry.generation >= 0,
      ),
    );
    if (valid.length === entries.length && valid.length > 0 && valid.length <= DIY_DOWNLOADS.length)
      pendingDigitalCheckouts[reference] = valid;
  }
  const reconciledPurchases = Array.isArray(raw.reconciledPurchases)
    ? raw.reconciledPurchases
        .filter((id): id is string => typeof id === "string" && id.length > 0 && id.length <= 255)
        .slice(-50)
    : [];
  const counts: CountsMap = {};
  const migrationReview: LegacyCartConfiguration[] = Array.isArray(raw.migrationReview)
    ? raw.migrationReview
        .filter((entry): entry is LegacyCartConfiguration =>
          Boolean(
            entry && typeof entry.id === "string" && Number.isInteger(entry.qty) && entry.qty > 0,
          ),
        )
        .slice(0, 100)
    : [];
  let migrated = Boolean(raw.migrationNotice) || Boolean(options.legacyPricing);

  // Keep valid draft scope settings even when a package has not been added yet.
  for (const [key, value] of Object.entries(rawCounts)) {
    if (typeof value !== "number" || !Number.isFinite(value)) continue;
    if (getPackageById(key)) {
      const item = getPackageById(key)!;
      if (counts[item.id] === undefined || key === item.id) {
        const duration = VIDEO_DURATION_OPTIONS.includes(
          rawCounts[`kit-duration:${key}`] as VideoDurationSeconds,
        )
          ? (rawCounts[`kit-duration:${key}`] as number)
          : 60;
        const converting =
          isFinishedVideoPricing() &&
          item.lane !== "evergreen" &&
          (options.legacyPricing ||
            (key !== item.id && raw.pricingBasis !== PACKAGE_PRICING_BASIS));
        const draftCount = converting ? (value * 60) / duration : value;
        counts[item.id] = normalizePackageConfiguration(item, draftCount).count;
        const legacy = LEGACY_PACKAGE_DEFAULTS[key];
        if (legacy && counts[kitSessionCountKey(item.id)] === undefined)
          counts[kitSessionCountKey(item.id)] = legacy.sessions;
      }
      continue;
    }
    const match = /^(kit-duration|kit-cadence|kit-sessions|kit-addon):([^:]+)(?::([^:]+))?$/.exec(
      key,
    );
    if (!match) continue;
    const [, type, rawId, addOnId] = match;
    const item = getPackageById(rawId);
    if (!item) continue;
    const normalizedKey = `${type}:${item.id}${addOnId ? `:${addOnId}` : ""}`;
    if (counts[normalizedKey] !== undefined && rawId !== item.id) continue;
    if (type === "kit-duration" && VIDEO_DURATION_OPTIONS.includes(value as VideoDurationSeconds))
      counts[normalizedKey] = value;
    if (type === "kit-cadence") counts[normalizedKey] = value === 1 ? 1 : 0;
    if (type === "kit-sessions")
      counts[normalizedKey] = normalizePackageConfiguration(item, undefined, value).sessions;
    if (
      type === "kit-addon" &&
      ADD_ONS.some(
        (a) => a.id === addOnId && (!a.applicablePals || a.applicablePals.includes(item.lane)),
      )
    )
      counts[normalizedKey] = value ? 1 : 0;
  }

  const fingerprints: Record<string, string> = {};
  for (const [rawId, rawQty] of Object.entries(rawSelected)) {
    const qty = validQty(rawQty);
    if (!qty) continue;
    const item = getItemById(rawId);
    if (!item) {
      migrationReview.push({ id: rawId, qty });
      migrated = true;
      continue;
    }
    const id = item.id;
    migrated ||= rawId !== id;
    const pkg = getPackageById(id);
    if (!pkg) {
      selected[id] = Math.min(20, (selected[id] ?? 0) + qty);
      continue;
    }
    const legacy = LEGACY_PACKAGE_DEFAULTS[rawId];
    const duration = VIDEO_DURATION_OPTIONS.includes(
      rawCounts[`kit-duration:${rawId}`] as VideoDurationSeconds,
    )
      ? (rawCounts[`kit-duration:${rawId}`] as number)
      : 60;
    let previousCount =
      typeof rawCounts[rawId] === "number" ? (rawCounts[rawId] as number) : legacy?.count;
    const previousSessions =
      typeof rawCounts[`kit-sessions:${rawId}`] === "number"
        ? (rawCounts[`kit-sessions:${rawId}`] as number)
        : legacy?.sessions;
    const itemCadence: PurchaseCadence =
      rawCounts[`kit-cadence:${rawId}`] === 1
        ? "monthly"
        : rawCounts[`kit-cadence:${rawId}`] === 0
          ? "one-time"
          : cadence;
    const savedAddOnIds = ADD_ONS.filter((a) => rawCounts[`kit-addon:${rawId}:${a.id}`]).map(
      (a) => a.id,
    );
    const addOnIds = ADD_ONS.filter(
      (a) =>
        savedAddOnIds.includes(a.id) && (!a.applicablePals || a.applicablePals.includes(pkg.lane)),
    ).map((a) => a.id);
    if (
      isFinishedVideoPricing() &&
      pkg.lane !== "evergreen" &&
      (options.legacyPricing || (rawId !== id && raw.pricingBasis !== PACKAGE_PRICING_BASIS))
    ) {
      previousCount = ((previousCount ?? pkg.editable!.defaultCount) * 60) / duration;
      migrated = true;
      if (previousCount > pkg.editable!.max || !Number.isInteger(previousCount)) {
        migrationReview.push({
          id: rawId,
          canonicalId: id,
          qty,
          count: previousCount,
          sessions: previousSessions ?? pkg.sessions,
          cadence: itemCadence,
          addOnIds: savedAddOnIds,
          durationSeconds: duration as VideoDurationSeconds,
        });
        continue;
      }
    }
    const scope = normalizePackageConfiguration(pkg, previousCount, previousSessions);
    if (savedAddOnIds.length !== addOnIds.length && (options.legacyPricing || rawId !== id)) {
      migrationReview.push({
        id: rawId,
        canonicalId: id,
        qty,
        ...scope,
        cadence: itemCadence,
        addOnIds: savedAddOnIds,
        durationSeconds: duration as VideoDurationSeconds,
      });
      migrated = true;
      continue;
    }
    const fingerprint = JSON.stringify([scope, duration, itemCadence, addOnIds]);
    if (fingerprints[id] && (fingerprints[id] !== fingerprint || selected[id] + qty > 20)) {
      migrationReview.push({
        id: rawId,
        canonicalId: id,
        qty,
        ...scope,
        cadence: itemCadence,
        addOnIds,
        durationSeconds: duration as VideoDurationSeconds,
      });
      migrated = true;
      continue;
    }
    fingerprints[id] = fingerprint;
    selected[id] = (selected[id] ?? 0) + qty;
    counts[id] = scope.count;
    counts[kitSessionCountKey(id)] = scope.sessions;
    counts[kitDurationCountKey(id)] = duration;
    if (rawCounts[`kit-cadence:${rawId}`] !== undefined)
      counts[kitCadenceCountKey(id)] = itemCadence === "monthly" ? 1 : 0;
    else delete counts[kitCadenceCountKey(id)];
    for (const a of ADD_ONS) counts[kitAddOnCountKey(id, a.id)] = addOnIds.includes(a.id) ? 1 : 0;
  }
  return {
    selected,
    counts,
    cadence,
    pricingBasis: PACKAGE_PRICING_BASIS,
    lineGenerations,
    pendingDigitalCheckouts,
    reconciledPurchases,
    offerCode: isOfferCode(raw.offerCode) ? raw.offerCode : undefined,
    ...(migrated ? { migrationNotice: MIGRATION_NOTICE } : {}),
    ...(migrationReview.length ? { migrationReview } : {}),
  };
}

function read(): CartState {
  if (typeof window === "undefined") return EMPTY;
  for (const key of [STORAGE_KEY, LEGACY_STORAGE_KEY]) {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) continue;
      return normalizeCartState(parsed, {
        legacyPricing: parsed.pricingBasis !== PACKAGE_PRICING_BASIS,
      });
    } catch {
      // A damaged current record must not erase a valid legacy plan.
    }
  }
  return EMPTY;
}

function write(s: CartState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* quota / private mode — silently ignore */
  }
}

let state: CartState = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function ensureHydrated(): boolean {
  if (hydrated || typeof window === "undefined") return false;
  state = read();
  write(state);
  hydrated = true;
  return true;
}

function emit() {
  for (const l of listeners) l();
}

function set(updater: (s: CartState) => CartState) {
  ensureHydrated();
  const previous = state;
  state = normalizeCartState(updater(state));
  const generations = { ...state.lineGenerations };
  for (const item of DIY_DOWNLOADS) {
    if (!(previous.selected[item.id] > 0) && state.selected[item.id] > 0)
      generations[item.id] = (previous.lineGenerations?.[item.id] ?? 0) + 1;
  }
  state = { ...state, lineGenerations: generations };
  write(state);
  emit();
}

export const cartStore = {
  getSnapshot: (): CartState => {
    ensureHydrated();
    return state;
  },
  getServerSnapshot: (): CartState => EMPTY,
  subscribe: (l: () => void) => {
    const didHydrate = ensureHydrated();
    listeners.add(l);
    // During SSR hydration React initially consumes getServerSnapshot(). If
    // localStorage changed the state before subscribe, notify this subscriber
    // once so the persisted cart becomes visible without waiting for an action.
    if (didHydrate) queueMicrotask(l);
    // Cross-tab sync
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        state = read();
        emit();
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("storage", onStorage);
    }
    return () => {
      listeners.delete(l);
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", onStorage);
      }
    };
  },
  setSelected: (selected: SelectedMap) => set((s) => ({ ...s, selected })),
  setCounts: (counts: CountsMap) => set((s) => ({ ...s, counts })),
  setCadence: (cadence: PurchaseCadence) => set((s) => ({ ...s, cadence })),
  applyOffer: (offerCode?: OfferCode) =>
    set((s) => {
      if (!offerCode) return { ...s, offerCode: undefined };
      const counts = Object.fromEntries(
        Object.entries(s.counts).filter(([key]) => !key.startsWith("kit-cadence:")),
      );
      return { ...s, counts, offerCode, cadence: "one-time" };
    }),
  add: (itemId: string, qty = 1) =>
    set((s) => ({
      ...s,
      selected: {
        ...s.selected,
        [resolvePackageId(itemId)]: (s.selected[resolvePackageId(itemId)] ?? 0) + Math.max(1, qty),
      },
    })),
  changeQty: (itemId: string, nextQty: number) =>
    set((s) => {
      itemId = resolvePackageId(itemId);
      const next = { ...s.selected };
      if (nextQty <= 0) delete next[itemId];
      else next[itemId] = nextQty;
      return { ...s, selected: next };
    }),
  decrement: (itemId: string) =>
    set((s) => {
      itemId = resolvePackageId(itemId);
      const cur = s.selected[itemId] ?? 0;
      const next = { ...s.selected };
      if (cur <= 1) delete next[itemId];
      else next[itemId] = cur - 1;
      return { ...s, selected: next };
    }),
  setCount: (itemId: string, n: number) =>
    set((s) => ({ ...s, counts: { ...s.counts, [resolvePackageId(itemId)]: n } })),
  configurePackage: (itemId: string, config: { count?: number; sessions?: number }) =>
    set((s) => {
      const item = getPackageById(itemId);
      if (!item) return s;
      const scope = normalizePackageConfiguration(
        item,
        config.count ?? s.counts[item.id],
        config.sessions ?? getKitSessionCount(s.counts, item.id),
      );
      return {
        ...s,
        selected: { ...s.selected, [item.id]: 1 },
        counts: {
          ...s.counts,
          [item.id]: scope.count,
          [kitSessionCountKey(item.id)]: scope.sessions,
        },
      };
    }),
  rememberDigitalCheckout: (reference: string, items: readonly PurchasedDigitalItem[]) =>
    set((s) => {
      if (
        !reference ||
        !items.length ||
        items.some(
          (item) =>
            !DIY_DOWNLOADS.some((d) => d.id === item.id) || s.selected[item.id] !== item.qty,
        )
      )
        return s;
      const selections = items.map((item) => ({
        id: item.id,
        qty: item.qty,
        generation: s.lineGenerations?.[item.id] ?? 0,
      }));
      return {
        ...s,
        pendingDigitalCheckouts: { ...s.pendingDigitalCheckouts, [reference]: selections },
      };
    }),
  reconcileDigitalPurchase: (
    sessionId: string,
    reference: string,
    items: readonly PurchasedDigitalItem[],
  ) =>
    set((s) => {
      if (!sessionId || s.reconciledPurchases?.includes(sessionId)) return s;
      const pending = s.pendingDigitalCheckouts?.[reference];
      const selected = { ...s.selected };
      const seen = new Set<string>();
      for (const item of items) {
        if (seen.has(item.id)) continue;
        seen.add(item.id);
        if (
          !DIY_DOWNLOADS.some((d) => d.id === item.id) ||
          !Number.isInteger(item.qty) ||
          item.qty < 1 ||
          item.qty > 20
        )
          continue;
        const original = pending?.find((entry) => entry.id === item.id && entry.qty === item.qty);
        if (
          !original ||
          original.generation !== (s.lineGenerations?.[item.id] ?? 0) ||
          (selected[item.id] ?? 0) < item.qty
        )
          continue;
        const remaining = selected[item.id] - item.qty;
        if (remaining > 0) selected[item.id] = remaining;
        else delete selected[item.id];
      }
      const pendingDigitalCheckouts = { ...s.pendingDigitalCheckouts };
      delete pendingDigitalCheckouts[reference];
      return {
        ...s,
        selected,
        pendingDigitalCheckouts,
        reconciledPurchases: [...(s.reconciledPurchases ?? []), sessionId],
      };
    }),
  reset: () =>
    set((s) => ({
      selected: {},
      counts: {},
      cadence: "one-time",
      pricingBasis: PACKAGE_PRICING_BASIS,
      lineGenerations: s.lineGenerations,
      reconciledPurchases: s.reconciledPurchases,
    })),
};

/** Hook: returns the live cart state. */
export function useCart(): CartState {
  return useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );
}

/** Derive receipt lines from the cart for previews/checkout. */
export function buildReceiptLines(s: CartState): ReceiptLine[] {
  s = normalizeCartState(s);
  const out: ReceiptLine[] = [];
  let studioIncluded = false;
  const oneTimeSelected = Object.fromEntries(
    Object.entries(s.selected).filter(([id]) =>
      getPackageById(id)
        ? getKitCadence(s.counts, id, s.cadence) === "one-time"
        : s.cadence === "one-time",
    ),
  );
  for (const g of PAL_GROUPS) {
    for (const it of g.items) {
      const qty = s.selected[it.id] ?? 0;
      if (qty > 0) {
        const kitAddOns = ADD_ONS.filter(
          (addOn) =>
            s.counts[kitAddOnCountKey(it.id, addOn.id)] &&
            (!addOn.applicablePals || addOn.applicablePals.includes(it.lane)),
        );
        const addOnTotal = kitAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
        const runtimeCount = s.counts[it.id] ?? it.editable?.defaultCount ?? 0;
        const sessions = getKitSessionCount(s.counts, it.id);
        const basePrice = computePackagePrice(it, runtimeCount, sessions);
        const configuredPrice = basePrice + addOnTotal;
        const itemCadence = getKitCadence(s.counts, it.id, s.cadence);
        const isLongForm = g.id === "evergreen";
        const duration = getKitDurationSeconds(s.counts, it.id);
        const outputCount = isFinishedVideoPricing()
          ? runtimeCount
          : getKitOutputCount(runtimeCount, duration);
        const configuration = getPackageScope(it, runtimeCount, sessions);
        const included = [
          ...kitAddOns.map((addOn) => addOn.name),
          ...(itemCadence === "monthly" && !studioIncluded
            ? ["Studio membership ($99/month value)"]
            : []),
        ];
        if (itemCadence === "monthly") studioIncluded = true;
        out.push({
          ...it,
          description: `${configuration} · ${it.description}${
            included.length > 0 ? ` · Includes ${included.join(", ")}` : ""
          }`,
          price:
            itemCadence === "monthly"
              ? monthlyPrice(configuredPrice)
              : offerUnitPrice({
                  code: s.offerCode,
                  itemId: it.id,
                  baseUnitPrice: basePrice,
                  addOnUnitPrice: addOnTotal,
                  qty,
                  selected: oneTimeSelected,
                }),
          cadence: itemCadence,
          runtimeLabel: configuration,
          durationSeconds: isLongForm || isFinishedVideoPricing() ? undefined : duration,
          outputCount: isLongForm ? undefined : outputCount,
          addOnNames: kitAddOns.map((addOn) => addOn.name),
          qty,
          accent: `var(--${g.accent})`,
          groupId: g.id,
          groupLabel: `${g.role} · ${g.palName}`,
        });
      }
    }
  }
  for (const a of ADD_ONS) {
    const qty = s.selected[a.id] ?? 0;
    if (qty > 0) {
      out.push({
        ...a,
        price:
          s.cadence === "monthly"
            ? monthlyPrice(a.price)
            : offerUnitPrice({
                code: s.offerCode,
                itemId: a.id,
                baseUnitPrice: a.price,
                qty,
                selected: oneTimeSelected,
              }),
        cadence: s.cadence,
        qty,
        accent: "var(--primary)",
        groupId: "add-ons",
        groupLabel: "Add-Ons",
      });
    }
  }
  for (const d of DIY_DOWNLOADS) {
    const qty = s.selected[d.id] ?? 0;
    if (qty > 0) {
      out.push({
        ...d,
        cadence: "one-time",
        qty,
        accent: "var(--primary)",
        groupId: "diy",
        groupLabel: "DIY Downloads",
      });
    }
  }
  return out;
}

/** Total unit count across the cart (sum of qty). */
export function cartItemCount(s: CartState): number {
  s = normalizeCartState(s);
  let n = 0;
  for (const k in s.selected) n += s.selected[k] ?? 0;
  return n;
}

export function receiptLineConfiguration(item: ReceiptLine): string {
  return [
    item.runtimeLabel,
    item.outputCount && item.durationSeconds
      ? `${item.outputCount} × ${item.durationSeconds}-second outputs`
      : undefined,
    item.cadence === "monthly" ? "Monthly" : "One-time",
    item.addOnNames?.length ? `Add-ons: ${item.addOnNames.join(", ")}` : undefined,
  ]
    .filter(Boolean)
    .join(" · ");
}

/** Pre-tax subtotal across all lines. */
export function cartSubtotal(lines: ReceiptLine[]): number {
  return Math.round(lines.reduce((sum, l) => sum + l.price * l.qty, 0) * 100) / 100;
}
