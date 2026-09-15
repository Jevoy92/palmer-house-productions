/**
 * Persistent quote cart — shared across SiteHeader (cart preview) and
 * the pricing page (QuoteBuilder). Backed by localStorage so selections
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
  computeItemPrice,
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
  return `kit-addon:${itemId}:${addOnId}`;
}

export const VIDEO_DURATION_OPTIONS = [15, 30, 60] as const;
export type VideoDurationSeconds = (typeof VIDEO_DURATION_OPTIONS)[number];

export function kitDurationCountKey(itemId: string): string {
  return `kit-duration:${itemId}`;
}

export function kitCadenceCountKey(itemId: string): string {
  return `kit-cadence:${itemId}`;
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
};

export const CART_STORAGE_KEY = "ph.quote.cart.v1";
const STORAGE_KEY = CART_STORAGE_KEY;
const EMPTY: CartState = { selected: {}, counts: {}, cadence: "one-time" };

function read(): CartState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as CartState;
    return {
      selected: parsed?.selected ?? {},
      counts: parsed?.counts ?? {},
      cadence: parsed?.cadence === "monthly" ? "monthly" : "one-time",
      offerCode: isOfferCode(parsed?.offerCode) ? parsed.offerCode : undefined,
    };
  } catch {
    return EMPTY;
  }
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
  hydrated = true;
  return true;
}

function emit() {
  for (const l of listeners) l();
}

function set(updater: (s: CartState) => CartState) {
  ensureHydrated();
  state = updater(state);
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
        [itemId]: (s.selected[itemId] ?? 0) + Math.max(1, qty),
      },
    })),
  changeQty: (itemId: string, nextQty: number) =>
    set((s) => {
      const next = { ...s.selected };
      if (nextQty <= 0) delete next[itemId];
      else next[itemId] = nextQty;
      return { ...s, selected: next };
    }),
  decrement: (itemId: string) =>
    set((s) => {
      const cur = s.selected[itemId] ?? 0;
      const next = { ...s.selected };
      if (cur <= 1) delete next[itemId];
      else next[itemId] = cur - 1;
      return { ...s, selected: next };
    }),
  setCount: (itemId: string, n: number) =>
    set((s) => ({ ...s, counts: { ...s.counts, [itemId]: n } })),
  reset: () => set(() => ({ selected: {}, counts: {}, cadence: "one-time" })),
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
  const out: ReceiptLine[] = [];
  let studioIncluded = false;
  for (const g of PAL_GROUPS) {
    for (const it of g.items) {
      const qty = s.selected[it.id] ?? 0;
      if (qty > 0) {
        const kitAddOns = ADD_ONS.filter((addOn) => s.counts[kitAddOnCountKey(it.id, addOn.id)]);
        const addOnTotal = kitAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
        const runtimeCount = s.counts[it.id] ?? it.editable?.defaultCount ?? 0;
        const basePrice = computeItemPrice(it, runtimeCount);
        const configuredPrice = basePrice + addOnTotal;
        const itemCadence = getKitCadence(s.counts, it.id, s.cadence);
        const isLongForm = g.id === "evergreen";
        const duration = getKitDurationSeconds(s.counts, it.id);
        const outputCount = getKitOutputCount(runtimeCount, duration);
        const configuration = isLongForm
          ? `${5 + runtimeCount * 5}-minute episode`
          : `${outputCount} × ${duration}-second videos`;
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
                  selected: s.selected,
                }),
          cadence: itemCadence,
          runtimeLabel: isLongForm
            ? `${5 + runtimeCount * 5} minutes`
            : `${runtimeCount} edited ${runtimeCount === 1 ? "minute" : "minutes"}`,
          durationSeconds: isLongForm ? undefined : duration,
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
                selected: s.selected,
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
  return lines.reduce((sum, l) => sum + l.price * l.qty, 0);
}
