import { Minus, Plus } from "lucide-react";
import { GlyphBadge } from "@/components/site/Glyphs";
import { cn } from "@/lib/utils";
import type { AddOn, SelectedMap } from "@/lib/pricing-catalog";

const PAL_LABEL: Record<string, string> = {
  reel: "Reel",
  spotlight: "Spotlight",
  system: "System",
  evergreen: "Evergreen",
};

export function AddOnsPanel({
  addOns,
  selected,
  onChange,
}: {
  addOns: AddOn[];
  selected: SelectedMap;
  onChange: (id: string, qty: number) => void;
}) {
  if (addOns.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-3xl border border-dashed border-border bg-spotlight-soft/40 p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <GlyphBadge name="spark" lane="spotlight" size="sm" />
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-spotlight-text">
              Boost it
            </div>
            <h3 className="font-display text-lg font-bold">Add-ons</h3>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">À-la-carte extras</span>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {addOns.map((a) => {
          const active = (selected[a.id] ?? 0) > 0;
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => onChange(a.id, active ? 0 : 1)}
              aria-pressed={active}
              className={cn(
                "group grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-2xl border p-3 text-left transition-[color,background-color,border-color,box-shadow,transform] sm:flex sm:items-start",
                active
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border bg-background hover:border-foreground/20",
              )}
            >
              <div
                className={cn(
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground group-hover:bg-foreground/10",
                )}
              >
                {active ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-1.5">
                  <span className="min-w-0 text-sm font-semibold leading-tight sm:truncate">
                    {a.name}
                  </span>
                  {a.category === "pal-specific" && a.applicablePals?.[0] && (
                    <span className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                      {a.applicablePals.map((p) => PAL_LABEL[p]).join(" · ")}
                    </span>
                  )}
                </div>
                <div className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                  {a.description}
                </div>
              </div>
              <div className="col-start-2 text-left font-display text-sm font-bold tabular-nums sm:shrink-0 sm:text-right">
                +${a.price.toLocaleString()}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
