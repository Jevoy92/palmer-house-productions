import { useMemo, useState } from "react";
import { useCart, cartStore, buildReceiptLines } from "@/lib/cart-store";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import ryderImg from "@/assets/pals-optimized/ryder.webp";
import raquelImg from "@/assets/pals-optimized/raquel.webp";
import kareemImg from "@/assets/pals-optimized/kareem.webp";
import kianaImg from "@/assets/pals-optimized/kiana.webp";
import silasImg from "@/assets/pals-optimized/silas.webp";
import samiraImg from "@/assets/pals-optimized/samira.webp";
import cyrusImg from "@/assets/pals-optimized/cyrus.webp";
import claraImg from "@/assets/pals-optimized/clara.webp";

const PAL_HEADSHOTS: Record<string, [string, string]> = {
  reel: [ryderImg, raquelImg],
  spotlight: [kareemImg, kianaImg],
  system: [silasImg, samiraImg],
  evergreen: [cyrusImg, claraImg],
};
import { PalGroupCard } from "./PalGroupCard";
import { AddOnsPanel } from "./AddOnsPanel";
import { Receipt } from "./Receipt";

import { MobilePricingView } from "./MobilePricingView";
import { MobileReceiptBar } from "./MobileReceiptBar";
import { QuoteSummaryDialog } from "./QuoteSummaryDialog";
import { generateQuoteReference } from "@/lib/honeybook";
import { cn } from "@/lib/utils";
import { PAL_GROUPS, relevantAddOns, type PalAccent } from "@/lib/pricing-catalog";

export type CountsMap = Record<string, number>;

const TAX_RATE = 0.089; // WA default

export function QuoteBuilder() {
  const { selected, counts } = useCart();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reference, setReference] = useState<string>(() => generateQuoteReference());
  /** Carousel index — which Pal is currently being chosen on desktop. */
  const [activeIndex, setActiveIndex] = useState(0);

  // Which Pals have at least one selected mission? Drives add-on visibility.
  const activePals = useMemo(() => {
    const set = new Set<PalAccent>();
    for (const g of PAL_GROUPS) {
      if (g.items.some((it) => (selected[it.id] ?? 0) > 0)) set.add(g.id);
    }
    return set;
  }, [selected]);

  const visibleAddOns = useMemo(() => relevantAddOns(activePals), [activePals]);

  /** Per-Pal selected-mission count, for stepper badges. */
  const palCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const g of PAL_GROUPS) {
      map[g.id] = g.items.reduce((n, it) => n + ((selected[it.id] ?? 0) > 0 ? 1 : 0), 0);
    }
    return map;
  }, [selected]);

  const lines = useMemo(() => buildReceiptLines({ selected, counts }), [selected, counts]);

  const handleChange = (itemId: string, nextQty: number) => cartStore.changeQty(itemId, nextQty);

  const handleCountChange = (itemId: string, nextCount: number) =>
    cartStore.setCount(itemId, nextCount);

  /** Receipt minus button — remove one of the line, drop entirely if it hits 0. */
  const handleDecrement = (itemId: string) => cartStore.decrement(itemId);

  const handleBook = () => {
    setReference(generateQuoteReference());
    setDialogOpen(true);
  };

  const reset = () => {
    cartStore.reset();
    setReference(generateQuoteReference());
  };

  const activeGroup = PAL_GROUPS[activeIndex];
  const isLastPal = activeIndex === PAL_GROUPS.length - 1;
  const nextGroup = !isLastPal ? PAL_GROUPS[activeIndex + 1] : null;
  const prevGroup = activeIndex > 0 ? PAL_GROUPS[activeIndex - 1] : null;

  return (
    <section className="pricing-builder mx-auto max-w-[1600px] px-4 pb-40 sm:px-6 lg:pb-24 lg:px-8">
      {/* Mobile-first view */}
      <MobilePricingView
        selected={selected}
        onChange={handleChange}
        counts={counts}
        onCountChange={handleCountChange}
        lines={lines}
        taxRate={TAX_RATE}
        onBook={handleBook}
      />

      {/* Desktop / tablet (≥ lg) — guided Pal carousel */}
      <div className="hidden gap-10 lg:grid lg:grid-cols-[1.35fr_1fr] lg:gap-12">
        <div>
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Step {activeIndex + 1} of {PAL_GROUPS.length} · Pick from {activeGroup.role}
            </div>
            <div className="shrink-0 text-xs text-muted-foreground">
              {lines.length} item{lines.length === 1 ? "" : "s"} selected
            </div>
          </div>

          {/* Pal stepper rail — sleek segmented progress */}
          <div className="mb-6">
            <div className="flex items-stretch gap-1 rounded-full border border-border/60 bg-muted/40 p-1 backdrop-blur">
              {PAL_GROUPS.map((g, i) => {
                const isActive = i === activeIndex;
                const c = palCounts[g.id] ?? 0;
                const done = c > 0;
                const accent = `var(--${g.accent})`;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-current={isActive ? "step" : undefined}
                    className={cn(
                      "group relative flex flex-1 items-center gap-2.5 rounded-full px-3 py-2 text-left transition-all duration-300",
                      isActive
                        ? "bg-background shadow-sm ring-1 ring-border/80"
                        : "hover:bg-background/60",
                    )}
                  >
                    <span className="relative flex h-9 w-[42px] shrink-0 items-center justify-center">
                      {(PAL_HEADSHOTS[g.accent] ?? []).map((src, idx) => (
                        <span
                          key={idx}
                          className={cn(
                            "absolute h-8 w-8 overflow-hidden rounded-full bg-background ring-2 transition-all duration-300",
                            idx === 0 ? "left-0 z-10" : "right-0",
                            isActive || done ? "ring-[var(--pal-accent)]" : "ring-border",
                            !isActive &&
                              !done &&
                              "opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0",
                          )}
                          style={{ ["--pal-accent" as string]: accent }}
                        >
                          <img src={src} alt="" className="h-full w-full object-cover" />
                        </span>
                      ))}
                      {done && (
                        <span
                          className="absolute -bottom-0.5 -right-0.5 z-20 flex h-4 w-4 items-center justify-center rounded-full text-primary-foreground shadow-sm ring-2 ring-background"
                          style={{ background: accent }}
                        >
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        </span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block truncate text-[12px] font-semibold leading-tight tracking-tight transition-colors",
                          isActive
                            ? "text-foreground"
                            : "text-muted-foreground group-hover:text-foreground",
                        )}
                      >
                        {g.palName}
                      </span>
                      <span
                        className={cn(
                          "block truncate text-[10px] font-medium leading-tight tracking-wide transition-opacity",
                          isActive ? "opacity-100" : "opacity-60",
                        )}
                        style={{ color: accent }}
                      >
                        {g.role}
                        {c > 0 && <span className="text-muted-foreground"> · {c}</span>}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Progress line */}
            <div className="mt-3 h-0.5 w-full overflow-hidden rounded-full bg-border/50">
              <div
                className="h-full rounded-full bg-foreground/80 transition-all duration-500 ease-out"
                style={{ width: `${((activeIndex + 1) / PAL_GROUPS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Active Pal card — animates in on switch */}
          <div
            key={activeGroup.id}
            className="animate-in fade-in slide-in-from-right-3 duration-300"
          >
            <p className="mb-3 text-sm text-muted-foreground">
              {palCounts[activeGroup.id] > 0
                ? `Great — ${palCounts[activeGroup.id]} pick${palCounts[activeGroup.id] === 1 ? "" : "s"} from ${activeGroup.role}. Add more or move on.`
                : `Pick any videos or packs from ${activeGroup.role} that solve your business problem. Or skip — your call.`}
            </p>
            <PalGroupCard
              group={activeGroup}
              selected={selected}
              counts={counts}
              onChange={handleChange}
              onCountChange={handleCountChange}
            />
          </div>

          {/* Prev / Next nav */}
          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={!prevGroup}
              onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition",
                prevGroup ? "hover:border-foreground/40" : "cursor-not-allowed opacity-40",
              )}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {prevGroup ? `Back to ${prevGroup.role}` : "Back"}
            </button>
            {nextGroup ? (
              <button
                type="button"
                onClick={() => setActiveIndex((i) => i + 1)}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.14em] text-background transition hover:bg-foreground/85"
              >
                {palCounts[activeGroup.id] > 0 ? "Next" : "Skip"} — {nextGroup.role}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleBook}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 font-display text-xs font-bold uppercase tracking-[0.14em] text-background transition hover:bg-foreground/85"
              >
                Review your quote
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {visibleAddOns.length > 0 && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <AddOnsPanel addOns={visibleAddOns} selected={selected} onChange={handleChange} />
            </div>
          )}

          <p className="mt-6 text-sm text-muted-foreground">
            Mission prices use base session defaults ($
            {(450).toLocaleString()}/session + $150/additional video). Evergreen shows 5-min episode
            pricing — longer episodes confirmed on the call.
          </p>
        </div>

        <div>
          <Receipt
            items={lines}
            taxRate={TAX_RATE}
            onBook={handleBook}
            onDecrement={handleDecrement}
          />
        </div>
      </div>

      {/* Mobile sticky running-total bar */}
      <MobileReceiptBar items={lines} taxRate={TAX_RATE} onBook={handleBook} />

      <QuoteSummaryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        items={lines}
        taxRate={TAX_RATE}
        reference={reference}
        onReset={reset}
      />
    </section>
  );
}
