import { ArrowRight, Receipt as ReceiptIcon } from "lucide-react";
import { useCountUp } from "@/lib/use-count-up";
import { cn } from "@/lib/utils";
import type { ReceiptLine } from "./Receipt";

export function MobileReceiptBar({
  items,
  taxRate,
  onBook,
}: {
  items: ReceiptLine[];
  taxRate: number;
  onBook: () => void;
}) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal + subtotal * taxRate;
  const totalAnim = useCountUp(total);
  const count = items.reduce((n, i) => n + i.qty, 0);
  const isEmpty = items.length === 0;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-2 pb-3 sm:px-3 lg:hidden">
      <div
        className={cn(
          "pointer-events-auto mx-auto flex max-w-md items-center gap-2 rounded-2xl border border-border bg-background/95 p-2 shadow-2xl backdrop-blur-md transition-all min-[361px]:gap-3 min-[361px]:pl-3",
          isEmpty && "opacity-90",
        )}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--receipt-paper)] text-foreground">
          <ReceiptIcon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-medium leading-tight text-muted-foreground">
            Total Estimate
          </div>
          <div className="font-display text-lg font-bold tabular-nums leading-tight">
            ${Math.round(totalAnim).toLocaleString()}
          </div>
        </div>
        <button
          type="button"
          disabled={isEmpty}
          onClick={onBook}
          className={cn(
            "flex min-w-[8.65rem] shrink-0 items-center justify-center gap-1.5 rounded-xl bg-foreground px-3 py-3 font-display text-xs font-bold text-background transition-all min-[361px]:min-w-[9.25rem] min-[361px]:gap-2 min-[361px]:px-4",
            isEmpty ? "cursor-not-allowed opacity-35" : "hover:bg-foreground/85",
          )}
        >
          View Receipt
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-background/15 px-1.5 text-[10px] tabular-nums text-background">
            {count}
          </span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
