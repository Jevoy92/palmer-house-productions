import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Minus, Receipt as ReceiptIcon, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/lib/use-count-up";
import type { ServiceItem } from "@/lib/pricing-catalog";

export type ReceiptLine = ServiceItem & {
  qty: number;
  accent: string;
  /** Stable section key — e.g. Pal accent or "add-ons" / "diy". */
  groupId?: string;
  /** Human label for the section header. */
  groupLabel?: string;
};

export type ReceiptProps = {
  items: ReceiptLine[];
  taxRate: number;
  onBook: () => void;
  /** Decrement (or remove) a line directly from the receipt. */
  onDecrement?: (itemId: string) => void;
};

const ZIGZAG =
  "polygon(0 8px, 4% 0, 8% 8px, 12% 0, 16% 8px, 20% 0, 24% 8px, 28% 0, 32% 8px, 36% 0, 40% 8px, 44% 0, 48% 8px, 52% 0, 56% 8px, 60% 0, 64% 8px, 68% 0, 72% 8px, 76% 0, 80% 8px, 84% 0, 88% 8px, 92% 0, 96% 8px, 100% 0, 100% calc(100% - 8px), 96% 100%, 92% calc(100% - 8px), 88% 100%, 84% calc(100% - 8px), 80% 100%, 76% calc(100% - 8px), 72% 100%, 68% calc(100% - 8px), 64% 100%, 60% calc(100% - 8px), 56% 100%, 52% calc(100% - 8px), 48% 100%, 44% calc(100% - 8px), 40% 100%, 36% calc(100% - 8px), 32% 100%, 28% calc(100% - 8px), 24% 100%, 20% calc(100% - 8px), 16% 100%, 12% calc(100% - 8px), 8% 100%, 4% calc(100% - 8px), 0 100%)";

function formatMoney(n: number) {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function ClientDate() {
  const [date, setDate] = useState<string | null>(null);
  useEffect(() => {
    setDate(
      new Date().toLocaleString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    );
  }, []);
  return <p className="mt-2 min-h-[1em] text-xs text-[oklch(0.4_0.02_60)]">{date ?? "\u00a0"}</p>;
}

type Section = {
  id: string;
  label: string;
  accent: string;
  lines: ReceiptLine[];
};

function groupLines(items: ReceiptLine[]): Section[] {
  const order: string[] = [];
  const map = new Map<string, Section>();
  for (const it of items) {
    const id = it.groupId ?? "other";
    const label = it.groupLabel ?? "Other";
    if (!map.has(id)) {
      order.push(id);
      map.set(id, { id, label, accent: it.accent, lines: [] });
    }
    map.get(id)!.lines.push(it);
  }
  return order.map((id) => map.get(id)!);
}

export function Receipt({ items, taxRate, onBook, onDecrement }: ReceiptProps) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  const isEmpty = items.length === 0;

  const subtotalAnim = useCountUp(subtotal);
  const taxAnim = useCountUp(tax);
  const totalAnim = useCountUp(total);

  const sections = useMemo(() => groupLines(items), [items]);
  let lineNo = 0;

  return (
    <div className="relative lg:sticky lg:top-24">
      <div className="mx-auto h-3 w-[92%] rounded-t-md bg-foreground" />

      <div
        className="relative bg-[var(--receipt-paper)] px-7 py-9 text-[oklch(0.2_0.02_60)] shadow-xl transition-shadow"
        style={{ clipPath: ZIGZAG }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[oklch(0.92_0.04_80)]">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 4v16M6 4h7a4 4 0 0 1 0 8H6" />
              <path d="M14 14l4 4" />
            </svg>
          </div>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">PALMER HOUSE</h3>
          <p className="text-xs uppercase tracking-[0.18em] text-[oklch(0.4_0.02_60)]">
            Video Content Systems
          </p>
          <ClientDate />
        </div>

        <div className="my-5 border-t border-dashed border-[oklch(0.4_0.02_60)]/40" />

        {isEmpty ? (
          <div className="flex flex-col items-center py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[oklch(0.92_0.04_80)]/60">
              <ReceiptIcon className="h-6 w-6 text-[oklch(0.4_0.02_60)]" />
            </div>
            <p className="mt-4 max-w-[200px] text-sm text-[oklch(0.4_0.02_60)]">
              Pick your Pals to build your quote
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {sections.map((sec) => (
                <div key={sec.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: sec.accent }}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[oklch(0.35_0.02_60)]">
                      {sec.label}
                    </span>
                    <span className="flex-1 border-t border-dotted border-[oklch(0.4_0.02_60)]/30" />
                  </div>
                  {sec.lines.map((item) => {
                    lineNo += 1;
                    return (
                      <div
                        key={item.id}
                        className="group flex animate-in fade-in slide-in-from-right-2 items-baseline justify-between gap-3 text-sm duration-300"
                      >
                        <div className="flex min-w-0 items-baseline gap-2">
                          <span className="font-mono text-[11px] text-[oklch(0.5_0.02_60)]">
                            {String(lineNo).padStart(2, "0")}
                          </span>
                          <span className="truncate font-medium uppercase tracking-wide">
                            {item.name}
                            {item.qty > 1 && (
                              <span className="ml-1 text-[oklch(0.5_0.02_60)]">× {item.qty}</span>
                            )}
                          </span>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="font-display font-semibold tabular-nums">
                            ${formatMoney(item.price * item.qty)}
                          </span>
                          {onDecrement && (
                            <button
                              type="button"
                              onClick={() => onDecrement(item.id)}
                              aria-label={`Remove one ${item.name}`}
                              className="flex h-6 w-6 items-center justify-center rounded-full border border-[oklch(0.4_0.02_60)]/30 text-[oklch(0.35_0.02_60)] opacity-60 transition hover:bg-foreground hover:text-background hover:opacity-100 group-hover:opacity-100"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="my-5 border-t border-dashed border-[oklch(0.4_0.02_60)]/40" />

            <div className="space-y-1.5 text-sm">
              <Row label="SUBTOTAL" value={`$${formatMoney(subtotalAnim)}`} />
              <Row
                label={`TAX (${(taxRate * 100).toFixed(1)}%)`}
                value={`$${formatMoney(taxAnim)}`}
              />
            </div>

            <div className="my-5 border-t border-dashed border-[oklch(0.4_0.02_60)]/40" />

            <div className="flex items-baseline justify-between">
              <span className="font-display text-xl font-bold">TOTAL</span>
              <span className="font-display text-3xl font-black tabular-nums">
                ${formatMoney(totalAnim)}
              </span>
            </div>
          </>
        )}

        <button
          type="button"
          disabled={isEmpty}
          onClick={onBook}
          className={cn(
            "mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-foreground px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.16em] text-background transition-all",
            isEmpty ? "cursor-not-allowed opacity-30" : "hover:bg-foreground/85 hover:shadow-lg",
          )}
        >
          Book Consultation <ArrowRight className="h-4 w-4" />
        </button>

        <div className="mt-5 flex flex-col items-center gap-1 text-center">
          <p className="text-xs text-[oklch(0.4_0.02_60)]">Thank you for your interest!</p>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-3 w-3 fill-[oklch(0.4_0.02_60)] text-[oklch(0.4_0.02_60)]"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto h-3 w-[92%] rounded-b-md bg-foreground" />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[oklch(0.35_0.02_60)]">
      <span className="text-xs uppercase tracking-wider">{label}</span>
      <span className="font-display tabular-nums">{value}</span>
    </div>
  );
}
