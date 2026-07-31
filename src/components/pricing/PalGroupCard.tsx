import { Check, Minus, Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  computeItemPrice,
  getIncluded,
  type PalGroup,
  type SelectedMap,
  type ServiceItem,
} from "@/lib/pricing-catalog";

export function PalGroupCard({
  group,
  selected,
  counts,
  onChange,
  onCountChange,
}: {
  group: PalGroup;
  selected: SelectedMap;
  counts: Record<string, number>;
  onChange: (itemId: string, nextQty: number) => void;
  onCountChange: (itemId: string, nextCount: number) => void;
}) {
  const accentVar = `var(--${group.accent})`;
  const activeCount = group.items.reduce((n, it) => n + (selected[it.id] ? 1 : 0), 0);
  const isActive = activeCount > 0;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border bg-card transition-all duration-300",
        isActive
          ? "border-transparent shadow-lg ring-2"
          : "border-border hover:border-foreground/20 hover:shadow-md",
      )}
      style={
        isActive ? ({ ["--tw-ring-color" as never]: accentVar } as React.CSSProperties) : undefined
      }
    >
      {/* Accent rail */}
      <div
        className="absolute inset-y-0 left-0 w-1.5 transition-opacity"
        style={{ background: accentVar, opacity: isActive ? 1 : 0.35 }}
      />

      <div className="p-3 sm:flex sm:gap-5 sm:p-5">
        <div className="flex gap-3 sm:contents">
          {/* Pal image */}
          <div
            className="relative flex h-24 w-18 shrink-0 items-end justify-center overflow-hidden rounded-2xl sm:h-40 sm:w-28"
            style={{
              background: `color-mix(in oklab, ${accentVar} 22%, transparent)`,
            }}
          >
            <img
              src={group.image}
              alt={`${group.palName} — ${group.role}`}
              draggable={false}
              className="h-full w-auto object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
            />
            {activeCount > 0 && (
              <div
                className="absolute right-1.5 top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[11px] font-bold text-primary-foreground shadow"
                style={{ background: accentVar }}
              >
                {activeCount}
              </div>
            )}
          </div>

          {/* Header */}
          <div className="min-w-0 flex-1 sm:hidden">
            <div className="flex flex-wrap items-baseline gap-x-1.5">
              <span
                className="text-[9px] font-bold uppercase tracking-[0.16em]"
                style={{ color: accentVar }}
              >
                {group.role}
              </span>
              <span className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                · {group.tagline}
              </span>
            </div>
            <h3 className="mt-0.5 font-display text-lg font-bold leading-tight">{group.palName}</h3>
            <p className="mt-1 text-xs leading-snug text-muted-foreground">{group.pitch}</p>
          </div>
        </div>

        {/* Header + items */}
        <div className="min-w-0 flex-1">
          <div className="hidden sm:block">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ color: accentVar }}
              >
                {group.role}
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                · {group.tagline}
              </span>
            </div>
            <h3 className="mt-0.5 font-display text-xl font-bold leading-tight">{group.palName}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{group.pitch}</p>
          </div>

          <div className="mt-3 space-y-1.5">
            {group.items.map((item) => {
              const qty = selected[item.id] ?? 0;
              const active = qty > 0;
              const canQty = Boolean(item.priceSuffix?.includes("ea"));
              const livePrice = computeItemPrice(item, counts[item.id]);

              return (
                <div
                  key={item.id}
                  className={cn(
                    "w-full rounded-xl border transition-colors",
                    active ? "border-transparent" : "border-border/60 bg-background/40",
                  )}
                  style={
                    active
                      ? {
                          background: `color-mix(in oklab, ${accentVar} 14%, transparent)`,
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center gap-2 px-2.5 py-2.5 sm:gap-3 sm:px-3 sm:py-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-[13px] font-semibold sm:text-sm">
                          {item.name}
                        </span>
                        {item.recommended && (
                          <span
                            className="inline-flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground"
                            style={{ background: accentVar }}
                          >
                            <Sparkles className="h-2.5 w-2.5" /> Rec
                          </span>
                        )}
                      </div>
                      <div className="line-clamp-2 text-[11px] leading-snug text-muted-foreground sm:truncate sm:text-xs">
                        {item.description}
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                      <div className="w-[3.5rem] text-right font-display text-[13px] font-bold tabular-nums sm:w-auto sm:text-sm">
                        ${livePrice.toLocaleString()}
                        {item.priceSuffix && (
                          <span className="ml-0.5 block text-[9px] font-medium leading-none text-muted-foreground sm:inline sm:text-[10px]">
                            {item.priceSuffix}
                          </span>
                        )}
                      </div>

                      {canQty && active ? (
                        <div className="flex items-center gap-1 rounded-full bg-background p-0.5 shadow-sm">
                          <button
                            type="button"
                            onClick={() => onChange(item.id, Math.max(0, qty - 1))}
                            className="flex h-11 w-11 items-center justify-center rounded-full text-foreground transition hover:bg-muted"
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-5 text-center text-sm font-bold tabular-nums">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => onChange(item.id, qty + 1)}
                            className="flex h-11 w-11 items-center justify-center rounded-full text-primary-foreground transition hover:opacity-90"
                            style={{ background: accentVar }}
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onChange(item.id, active ? 0 : 1)}
                          aria-pressed={active}
                          aria-label={`${active ? "Remove" : "Add"} ${item.name}`}
                          className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-full transition-all",
                            active
                              ? "text-primary-foreground shadow"
                              : "bg-muted text-muted-foreground hover:bg-foreground/10",
                          )}
                          style={active ? { background: accentVar } : undefined}
                        >
                          {active ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </button>
                      )}
                    </div>
                  </div>

                  {active && item.editable && (
                    <DesktopEditableControls
                      item={item}
                      group={group}
                      count={counts[item.id] ?? item.editable.defaultCount}
                      accent={accentVar}
                      onCountChange={(c) => onCountChange(item.id, c)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function DesktopEditableControls({
  item,
  group,
  count,
  accent,
  onCountChange,
}: {
  item: ServiceItem;
  group: PalGroup;
  count: number;
  accent: string;
  onCountChange: (next: number) => void;
}) {
  const e = item.editable!;
  const clamp = (n: number) => Math.max(e.min, Math.min(e.max, n));
  const total = e.fixedBase + count * e.unitPrice;
  const included = getIncluded(item, group);
  return (
    <div
      className="space-y-3 border-t px-3 py-3 text-xs"
      style={{
        borderColor: `color-mix(in oklab, ${accent} 30%, transparent)`,
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            {e.baseLabel}
          </span>
          <span className="text-[10px] text-muted-foreground">+</span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold">
              {count} {count === 1 ? e.unitLabel : e.unitLabelPlural}
            </span>
            <div className="flex items-center gap-1 rounded-full bg-background p-0.5 shadow-sm">
              <button
                type="button"
                onClick={() => onCountChange(clamp(count - e.step))}
                disabled={count <= e.min}
                className="flex h-6 w-6 items-center justify-center rounded-full transition hover:bg-muted disabled:opacity-30"
                aria-label={`Decrease ${e.unitLabel}`}
              >
                <Minus className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() => onCountChange(clamp(count + e.step))}
                disabled={count >= e.max}
                className="flex h-6 w-6 items-center justify-center rounded-full text-primary-foreground transition hover:opacity-90 disabled:opacity-30"
                style={{ background: accent }}
                aria-label={`Increase ${e.unitLabel}`}
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
            <span className="text-[10px] text-muted-foreground">{e.unitPriceLabel}</span>
          </div>
        </div>
        <span className="font-display text-xs font-bold tabular-nums">
          = ${total.toLocaleString()}
        </span>
      </div>

      <div
        className="rounded-lg px-2.5 py-2"
        style={{ background: `color-mix(in oklab, ${accent} 6%, transparent)` }}
      >
        <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          What's always included
        </div>
        <ul className="grid gap-1 sm:grid-cols-2">
          {included.map((line) => (
            <li
              key={line}
              className="flex items-start gap-1.5 text-[11px] leading-snug text-foreground/80"
            >
              <Check className="mt-0.5 h-3 w-3 shrink-0" style={{ color: accent }} />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
