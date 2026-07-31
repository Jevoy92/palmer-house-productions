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
import type { ReceiptLine } from "@/components/pricing/Receipt";

export type CountsMap = Record<string, number>;

export type PurchaseCadence = "one-time" | "monthly";

export type CartState = {
  selected: SelectedMap;
  counts: CountsMap;
  cadence: PurchaseCadence;
};

const STORAGE_KEY = "ph.quote.cart.v1";
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
  for (const g of PAL_GROUPS) {
    for (const it of g.items) {
      const qty = s.selected[it.id] ?? 0;
      if (qty > 0) {
        out.push({
          ...it,
          price: computeItemPrice(it, s.counts[it.id]),
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

/** Pre-tax subtotal across all lines. */
export function cartSubtotal(lines: ReceiptLine[]): number {
  return lines.reduce((sum, l) => sum + l.price * l.qty, 0);
}
