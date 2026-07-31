import { Calendar, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { ReceiptLine } from "./Receipt";
import type { QuoteSummary } from "@/lib/honeybook";
import { openHoneyBookBooking } from "@/lib/honeybook";

export function QuoteSummaryDialog({
  open,
  onOpenChange,
  items,
  taxRate,
  reference,
  onReset,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  items: ReceiptLine[];
  taxRate: number;
  reference: string;
  onReset: () => void;
}) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const quote: QuoteSummary = {
    reference,
    items: items.map((i) => ({
      id: i.id,
      name: i.qty > 1 ? `${i.name} × ${i.qty}` : i.name,
      price: i.price * i.qty,
    })),
    subtotal,
    tax,
    total,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="items-center text-center sm:text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--evergreen)] text-primary-foreground">
            <Check className="h-7 w-7" strokeWidth={3} />
          </div>
          <DialogTitle className="font-display text-2xl">Thank You! 🎉</DialogTitle>
          <DialogDescription className="text-center">
            Your quote from Palmer House Productions is ready.
            <br />
            Let's book a call to discuss your project.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <div className="mb-3 text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Quote Summary
          </div>
          <div className="space-y-1.5 text-sm">
            {quote.items.map((i) => (
              <div key={i.id} className="flex justify-between gap-3">
                <span className="truncate">{i.name}</span>
                <span className="font-medium tabular-nums">${i.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="my-3 border-t border-dashed border-border" />
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax ({(taxRate * 100).toFixed(1)}%)</span>
              <span className="tabular-nums">${tax.toFixed(2)}</span>
            </div>
          </div>
          <div className="my-3 border-t border-dashed border-border" />
          <div className="flex items-baseline justify-between">
            <span className="font-display text-base font-bold">Total</span>
            <span className="font-display text-xl font-bold tabular-nums">
              $
              {total.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="mt-3 text-center text-[11px] text-muted-foreground">
            Quote Ref: #{reference}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => openHoneyBookBooking(quote)}
            className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            <Calendar className="h-4 w-4" /> Book Now
          </button>
          <button
            type="button"
            onClick={() => {
              onReset();
              onOpenChange(false);
            }}
            className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent"
          >
            ← Start New Quote
          </button>
        </div>

        <p className="text-center text-[11px] text-muted-foreground">
          * This quote is for reference only. Final pricing will be confirmed during the
          consultation.
        </p>
      </DialogContent>
    </Dialog>
  );
}
