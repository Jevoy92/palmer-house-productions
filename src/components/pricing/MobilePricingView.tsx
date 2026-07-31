import { useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronRight,
  GitCompare,
  Heart,
  LayoutGrid,
  Minus,
  Plus,
  Receipt as ReceiptIcon,
  Search,
  Sparkles,
  SlidersHorizontal,
  Target,
  X,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/lib/use-count-up";
import {
  ADD_ONS,
  AUDIENCES,
  AUTOMATIONS,
  DIY_DOWNLOADS,
  EFFORTS,
  PAIN_POINTS,
  PAL_GROUPS,
  PROBLEMS,
  SPEEDS,
  STAGES,
  VIBES,
  computeItemPrice,
  getIncluded,
  getItemTags,
  relevantAddOns,
  type Audience,
  type Automation,
  type Effort,
  type PalAccent,
  type PalGroup,
  type Problem,
  type ServiceItem,
  type SelectedMap,
  type Speed,
  type Stage,
  type Vibe,
} from "@/lib/pricing-catalog";
import type { ReceiptLine } from "./Receipt";

type FlatItem = ServiceItem & { group: PalGroup; videos: number };

const CATEGORY_CHIPS: { id: "all" | PalAccent; label: string }[] = [
  { id: "all", label: "All" },
  { id: "reel", label: "Reel Pals" },
  { id: "spotlight", label: "Spotlight Pals" },
  { id: "system", label: "System Pals" },
  { id: "evergreen", label: "Evergreen Pals" },
];

const BUDGETS = [
  { id: "any", label: "Any budget", max: Infinity },
  { id: "u1000", label: "Under $1,000", max: 1000 },
  { id: "u2000", label: "Under $2,000", max: 2000 },
  { id: "u3500", label: "Under $3,500", max: 3500 },
];

type SortId = "recommended" | "price-asc" | "price-desc" | "videos-desc";
const SORTS: { id: SortId; label: string }[] = [
  { id: "recommended", label: "Recommended" },
  { id: "price-asc", label: "Price: Low → High" },
  { id: "price-desc", label: "Price: High → Low" },
  { id: "videos-desc", label: "Most videos" },
];

/** Top 8 problems shown as a quick-pick chip rail above search. */
const QUICK_PROBLEMS: Problem[] = [
  "leads",
  "trust",
  "explain-offer",
  "reduce-repetition",
  "improve-sales",
  "build-authority",
  "shorten-onboarding",
  "consistent-content",
];

function inferVideoCount(desc: string): number {
  const m = desc.match(/(\d+)\s*videos?/i);
  if (m) return parseInt(m[1], 10);
  if (/(\d+)-min episode/i.test(desc)) return 1;
  return 0;
}

function flattenItems(): FlatItem[] {
  const out: FlatItem[] = [];
  for (const g of PAL_GROUPS) {
    for (const it of g.items) {
      out.push({ ...it, group: g, videos: inferVideoCount(it.description) });
    }
  }
  return out;
}

/** True iff item matches every active filter axis (within-axis is OR). */
function matchesFilters(
  it: FlatItem,
  f: {
    problems: Set<Problem>;
    stage: Stage | "any";
    speed: Speed | "any";
    effort: Effort | "any";
    vibe: Vibe | "any";
    audiences: Set<Audience>;
    automation: Set<Automation>;
  },
): boolean {
  const t = getItemTags(it, it.group);
  if (f.problems.size && !t.problems.some((p) => f.problems.has(p))) return false;
  if (f.stage !== "any" && !t.stages.includes(f.stage)) return false;
  if (f.speed !== "any" && t.speed !== f.speed) return false;
  if (f.effort !== "any" && t.effort !== f.effort) return false;
  if (f.vibe !== "any" && t.vibe !== f.vibe) return false;
  if (f.audiences.size && !t.audiences.some((a) => f.audiences.has(a))) return false;
  if (f.automation.size && !t.automation.some((a) => f.automation.has(a))) return false;
  return true;
}

/** Score an item by how many of the user's problems it solves. */
function problemScore(it: FlatItem, problems: Set<Problem>): number {
  if (!problems.size) return 0;
  const t = getItemTags(it, it.group);
  let n = 0;
  for (const p of t.problems) if (problems.has(p)) n++;
  return n;
}

export function MobilePricingView({
  selected,
  onChange,
  counts,
  onCountChange,
  lines,
  taxRate,
  onBook,
}: {
  selected: SelectedMap;
  onChange: (id: string, qty: number) => void;
  counts: Record<string, number>;
  onCountChange: (id: string, count: number) => void;
  lines: ReceiptLine[];
  taxRate: number;
  onBook: () => void;
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"all" | PalAccent>("all");
  const [budget, setBudget] = useState<string>("any");
  const [sort, setSort] = useState<SortId>("recommended");

  // Problem-first filters
  const [problems, setProblems] = useState<Set<Problem>>(new Set());
  const [stage, setStage] = useState<Stage | "any">("any");
  const [speed, setSpeed] = useState<Speed | "any">("any");
  const [effort, setEffort] = useState<Effort | "any">("any");
  const [vibe, setVibe] = useState<Vibe | "any">("any");
  const [audiences, setAudiences] = useState<Set<Audience>>(new Set());
  const [automation, setAutomation] = useState<Set<Automation>>(new Set());

  const [filterOpen, setFilterOpen] = useState(false);
  const [painOpen, setPainOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<PalAccent | null>(null);

  const allItems = useMemo(flattenItems, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const budgetMax = BUDGETS.find((b) => b.id === budget)?.max ?? Infinity;
    const list = allItems.filter((it) => {
      if (category !== "all" && it.group.id !== category) return false;
      if (it.price > budgetMax) return false;
      if (!matchesFilters(it, { problems, stage, speed, effort, vibe, audiences, automation }))
        return false;
      if (!q) return true;
      return (
        it.name.toLowerCase().includes(q) ||
        it.description.toLowerCase().includes(q) ||
        it.group.palName.toLowerCase().includes(q) ||
        it.group.role.toLowerCase().includes(q)
      );
    });
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "videos-desc") sorted.sort((a, b) => b.videos - a.videos);
    else
      sorted.sort((a, b) => {
        const ps = problemScore(b, problems) - problemScore(a, problems);
        if (ps !== 0) return ps;
        return Number(b.recommended ?? 0) - Number(a.recommended ?? 0);
      });
    return sorted;
  }, [
    allItems,
    search,
    category,
    budget,
    sort,
    problems,
    stage,
    speed,
    effort,
    vibe,
    audiences,
    automation,
  ]);

  const popular = useMemo(() => filtered.slice(0, 6), [filtered]);

  /** Recommended stack: top-scoring items from different Pal lanes. */
  const recommendedStack = useMemo(() => {
    if (problems.size === 0) return [];
    const scored = allItems
      .map((it) => ({ it, score: problemScore(it, problems) }))
      .filter((x) => x.score > 0)
      .sort(
        (a, b) =>
          b.score - a.score || Number(b.it.recommended ?? 0) - Number(a.it.recommended ?? 0),
      );
    const out: FlatItem[] = [];
    const seenLanes = new Set<PalAccent>();
    for (const { it } of scored) {
      if (seenLanes.has(it.group.id)) continue;
      out.push(it);
      seenLanes.add(it.group.id);
      if (out.length === 3) break;
    }
    return out;
  }, [allItems, problems]);

  const subtotal = lines.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal + subtotal * taxRate;
  const totalAnim = useCountUp(total);
  const count = lines.reduce((n, i) => n + i.qty, 0);

  const activePals = useMemo(() => {
    const set = new Set<PalAccent>();
    for (const g of PAL_GROUPS) {
      if (g.items.some((it) => (selected[it.id] ?? 0) > 0)) set.add(g.id);
    }
    return set;
  }, [selected]);
  const visibleAddOns = useMemo(() => relevantAddOns(activePals), [activePals]);

  const activeFilterCount =
    (category !== "all" ? 1 : 0) +
    problems.size +
    (stage !== "any" ? 1 : 0) +
    (speed !== "any" ? 1 : 0) +
    (effort !== "any" ? 1 : 0) +
    (vibe !== "any" ? 1 : 0) +
    audiences.size +
    automation.size +
    (budget !== "any" ? 1 : 0) +
    (sort !== "recommended" ? 1 : 0);

  const resetFilters = () => {
    setCategory("all");
    setBudget("any");
    setSort("recommended");
    setProblems(new Set());
    setStage("any");
    setSpeed("any");
    setEffort("any");
    setVibe("any");
    setAudiences(new Set());
    setAutomation(new Set());
  };

  const toggleProblem = (p: Problem) => {
    setProblems((prev) => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });
  };
  const toggleAudience = (a: Audience) => {
    setAudiences((prev) => {
      const next = new Set(prev);
      if (next.has(a)) next.delete(a);
      else next.add(a);
      return next;
    });
  };
  const toggleAutomation = (a: Automation) => {
    setAutomation((prev) => {
      const next = new Set(prev);
      if (next.has(a)) next.delete(a);
      else next.add(a);
      return next;
    });
  };

  return (
    <div className="lg:hidden">
      {/* YOUR QUOTE summary card */}
      <button
        type="button"
        onClick={() => setQuoteOpen((v) => !v)}
        className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left shadow-sm transition active:scale-[0.99]"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--receipt-paper,#f5f0e6)] text-foreground">
          <ReceiptIcon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Your Quote
          </div>
          <div className="font-display text-base font-bold leading-tight">
            {count === 0
              ? "0 items selected"
              : `${count} item${count === 1 ? "" : "s"} · $${Math.round(
                  totalAnim,
                ).toLocaleString()}`}
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
            quoteOpen && "rotate-180",
          )}
        />
      </button>

      {quoteOpen && (
        <div className="mt-2 animate-in fade-in slide-in-from-top-1 rounded-2xl border border-border bg-card p-3">
          {lines.length === 0 ? (
            <p className="py-2 text-center text-sm text-muted-foreground">
              Add packages below to start your quote.
            </p>
          ) : (
            <>
              <ul className="divide-y divide-border/60">
                {lines.map((l) => (
                  <li key={l.id} className="flex items-center gap-2 py-2 text-sm">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: l.accent }}
                    />
                    <span className="min-w-0 flex-1 truncate">
                      {l.name}
                      {l.qty > 1 && <span className="ml-1 text-muted-foreground">× {l.qty}</span>}
                    </span>
                    <span className="font-display font-bold tabular-nums">
                      ${(l.price * l.qty).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={onBook}
                className="mt-3 w-full rounded-xl bg-foreground py-3 font-display text-sm font-bold text-background"
              >
                View full receipt
              </button>
            </>
          )}
        </div>
      )}

      {/* Search + filter */}
      <div className="mt-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Pals or keywords..."
            className="h-11 w-full rounded-2xl border border-border bg-card pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-foreground/40 focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={() => setFilterOpen(true)}
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border bg-card"
          aria-label="Filter"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {activeFilterCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[9px] font-bold text-background">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Problem chip rail — the primary, problem-first entry point */}
      <div className="mt-5">
        <div className="mb-2 flex items-baseline justify-between">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            What problem are you solving?
          </div>
          <button
            type="button"
            onClick={() => setPainOpen(true)}
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-foreground/70 hover:text-foreground"
          >
            <Heart className="h-3 w-3" /> What's hurting most?
          </button>
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {QUICK_PROBLEMS.map((id) => {
            const p = PROBLEMS.find((x) => x.id === id)!;
            const on = problems.has(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleProblem(id)}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                  on
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-foreground",
                )}
              >
                {p.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="shrink-0 rounded-full border border-dashed border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground"
          >
            More +
          </button>
        </div>
      </div>

      {/* Recommended stack — appears once user picks any problem */}
      {recommendedStack.length > 0 && (
        <div className="mt-5 rounded-2xl border border-foreground/15 bg-foreground/[0.03] p-3">
          <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/80">
            <Target className="h-3 w-3" /> Recommended Stack
          </div>
          <p className="mb-3 text-[11px] text-muted-foreground">
            Based on what you picked — one starting move per Pal lane.
          </p>
          <div className="space-y-2">
            {recommendedStack.map((it) => (
              <CompactItemRow
                key={`rec-${it.id}`}
                item={it}
                selected={selected}
                counts={counts}
                onChange={onChange}
                onCountChange={onCountChange}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              recommendedStack.forEach((it) => {
                if ((selected[it.id] ?? 0) === 0) onChange(it.id, 1);
              });
            }}
            className="mt-3 w-full rounded-xl bg-foreground py-2.5 font-display text-xs font-bold uppercase tracking-wider text-background"
          >
            Add full stack to quote
          </button>
        </div>
      )}

      {/* Popular picks */}
      <div className="mb-2 mt-6 flex items-baseline justify-between">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {sort === "recommended" && category === "all" && activeFilterCount === 0
            ? "Popular Picks"
            : "Results"}
        </div>
        <div className="text-[10px] text-muted-foreground">
          {filtered.length} match{filtered.length === 1 ? "" : "es"}
        </div>
      </div>
      <p className="mb-2 text-[11px] text-muted-foreground">
        Every pack is a starting point — fully customizable on the call.
      </p>

      <div className="space-y-2">
        {popular.length === 0 ? (
          <EmptyState
            message={
              search
                ? "No matches. Try adjusting filters or search."
                : "No popular picks for these filters."
            }
            onReset={() => {
              setSearch("");
              resetFilters();
            }}
          />
        ) : (
          popular.map((it) => (
            <CompactItemRow
              key={it.id}
              item={it}
              selected={selected}
              counts={counts}
              onChange={onChange}
              onCountChange={onCountChange}
            />
          ))
        )}
      </div>

      {/* Browse all pals */}
      <SectionHeader title="Browse All Pals" />
      <div className="space-y-2">
        <BigActionButton
          icon={<LayoutGrid className="h-5 w-5" />}
          title="View by Category"
          subtitle="Browse all packages"
          onClick={() => setCategoryOpen(true)}
        />
        <BigActionButton
          icon={<GitCompare className="h-5 w-5" />}
          title="Compare Pals"
          subtitle="Find the right fit"
          onClick={() => setCompareOpen(true)}
        />
      </div>

      {/* Add-ons (only when at least one selection) */}
      {visibleAddOns.length > 0 && (
        <>
          <SectionHeader title="Add-Ons" />
          <div className="space-y-2">
            {visibleAddOns.map((a) => {
              const qty = selected[a.id] ?? 0;
              const active = qty > 0;
              return (
                <div
                  key={a.id}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border bg-card p-3",
                    active ? "border-foreground/40" : "border-border",
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-semibold">{a.name}</div>
                    <div className="line-clamp-2 text-[11px] text-muted-foreground">
                      {a.description}
                    </div>
                  </div>
                  <div className="font-display text-sm font-bold tabular-nums">${a.price}</div>
                  <AddButton
                    active={active}
                    label={a.name}
                    onClick={() => onChange(a.id, active ? 0 : 1)}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* DIY Downloads — available standalone, no Pal required */}
      <SectionHeader title="DIY Downloads" />
      <div className="space-y-2">
        {DIY_DOWNLOADS.map((d) => {
          const qty = selected[d.id] ?? 0;
          const active = qty > 0;
          return (
            <div
              key={d.id}
              className={cn(
                "flex items-center gap-3 rounded-2xl border bg-card p-3",
                active ? "border-foreground/40" : "border-border",
              )}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--receipt-paper,#f5f0e6)] text-[10px] font-bold text-foreground">
                {d.format}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold">{d.name}</div>
                <div className="line-clamp-2 text-[11px] text-muted-foreground">
                  {d.description}
                </div>
              </div>
              <div className="font-display text-sm font-bold tabular-nums">${d.price}</div>
              <AddButton
                active={active}
                label={d.name}
                onClick={() => onChange(d.id, active ? 0 : 1)}
              />
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Mission prices use base session defaults ($450/session + $150/additional video). Evergreen
        shows 5-min episode pricing — longer episodes confirmed on the call.
      </p>

      {/* Filter sheet */}
      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent
          side="bottom"
          className="max-h-[90vh] overflow-y-auto rounded-t-3xl border-0 px-5 pb-8 pt-5"
        >
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-muted-foreground/30" />
          <SheetHeader className="mb-4 flex-row items-center justify-between space-y-0 text-left">
            <SheetTitle className="font-display text-xl font-bold">Filter packages</SheetTitle>
          </SheetHeader>

          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Sort by
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {SORTS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSort(s.id)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition",
                  sort === s.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-foreground",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Category
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {CATEGORY_CHIPS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition",
                  category === c.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-foreground",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          <FilterChipGroup
            label="Solve a Business Problem"
            options={PROBLEMS}
            selected={problems}
            onToggle={toggleProblem}
          />

          <FilterChipGroup
            label="Best For (Company Stage)"
            options={STAGES}
            selectedSingle={stage}
            onPickSingle={(v) => setStage(v as Stage | "any")}
          />

          <FilterChipGroup
            label="Time to Results"
            options={SPEEDS}
            selectedSingle={speed}
            onPickSingle={(v) => setSpeed(v as Speed | "any")}
          />

          <FilterChipGroup
            label="Your Involvement"
            options={EFFORTS}
            selectedSingle={effort}
            onPickSingle={(v) => setEffort(v as Effort | "any")}
          />

          <FilterChipGroup
            label="Brand Vibe"
            options={VIBES}
            selectedSingle={vibe}
            onPickSingle={(v) => setVibe(v as Vibe | "any")}
          />

          <FilterChipGroup
            label="Who Is This For?"
            options={AUDIENCES}
            selected={audiences}
            onToggle={(v) => toggleAudience(v as Audience)}
          />

          <FilterChipGroup
            label="Saves Time By..."
            options={AUTOMATIONS}
            selected={automation}
            onToggle={(v) => toggleAutomation(v as Automation)}
          />

          <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Budget range
          </div>
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger className="mt-2 h-11 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BUDGETS.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={resetFilters}
              className="h-12 flex-1 rounded-xl border border-border bg-card text-sm font-semibold"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => setFilterOpen(false)}
              className="h-12 flex-[2] rounded-xl bg-foreground font-display text-sm font-bold text-background"
            >
              Apply Filters
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Category browse sheet */}
      <Sheet open={categoryOpen} onOpenChange={setCategoryOpen}>
        <SheetContent
          side="bottom"
          className="h-[88vh] overflow-y-auto rounded-t-3xl border-0 px-4 pb-32 pt-4"
        >
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-muted-foreground/30" />
          <SheetHeader className="mb-3 text-left">
            <SheetTitle className="font-display text-xl font-bold">
              {activeGroup
                ? PAL_GROUPS.find((g) => g.id === activeGroup)?.palName
                : "Browse by Category"}
            </SheetTitle>
          </SheetHeader>

          {activeGroup === null ? (
            <div className="space-y-2">
              {PAL_GROUPS.map((g) => {
                const activeCount = g.items.reduce(
                  (n, it) => n + ((selected[it.id] ?? 0) > 0 ? 1 : 0),
                  0,
                );
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setActiveGroup(g.id)}
                    className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left"
                  >
                    <div
                      className="relative flex h-16 w-14 shrink-0 items-end justify-center overflow-hidden rounded-xl"
                      style={{
                        background: `color-mix(in oklab, var(--${g.accent}) 22%, transparent)`,
                      }}
                    >
                      <img
                        src={g.image}
                        alt={g.palName}
                        className="h-full w-auto object-contain object-bottom"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className="text-[10px] font-bold uppercase tracking-[0.16em]"
                        style={{ color: `var(--${g.accent})` }}
                      >
                        {g.role}
                      </div>
                      <div className="font-display text-base font-bold leading-tight">
                        {g.palName}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {g.items.length} packages
                        {activeCount > 0 && ` · ${activeCount} selected`}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          ) : (
            <CategoryDetail
              group={PAL_GROUPS.find((g) => g.id === activeGroup)!}
              selected={selected}
              counts={counts}
              onChange={onChange}
              onCountChange={onCountChange}
              onBack={() => setActiveGroup(null)}
            />
          )}
        </SheetContent>
      </Sheet>

      {/* Compare sheet */}
      <Sheet open={compareOpen} onOpenChange={setCompareOpen}>
        <SheetContent
          side="bottom"
          className="h-[88vh] overflow-y-auto rounded-t-3xl border-0 px-4 pb-32 pt-4"
        >
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-muted-foreground/30" />
          <SheetHeader className="mb-3 text-left">
            <SheetTitle className="font-display text-xl font-bold">Compare Pals</SheetTitle>
          </SheetHeader>
          <p className="mb-4 text-sm text-muted-foreground">
            Each Pal solves a different problem. Tap one to see their packages.
          </p>
          <div className="space-y-3">
            {PAL_GROUPS.map((g) => (
              <div key={g.id} className="overflow-hidden rounded-2xl border border-border bg-card">
                <div
                  className="flex gap-3 p-3"
                  style={{
                    background: `color-mix(in oklab, var(--${g.accent}) 8%, transparent)`,
                  }}
                >
                  <div
                    className="relative flex h-20 w-16 shrink-0 items-end justify-center overflow-hidden rounded-xl"
                    style={{
                      background: `color-mix(in oklab, var(--${g.accent}) 22%, transparent)`,
                    }}
                  >
                    <img
                      src={g.image}
                      alt={g.palName}
                      className="h-full w-auto object-contain object-bottom"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className="text-[10px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: `var(--${g.accent})` }}
                    >
                      {g.role}
                    </div>
                    <div className="font-display text-base font-bold leading-tight">
                      {g.tagline}
                    </div>
                    <p className="mt-1 line-clamp-3 text-[11px] text-muted-foreground">{g.pitch}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCompareOpen(false);
                    setActiveGroup(g.id);
                    setCategoryOpen(true);
                  }}
                  className="flex w-full items-center justify-between border-t border-border px-4 py-3 text-sm font-semibold"
                >
                  See {g.items.length} packages
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* What's hurting most? — emotional pain-point picker */}
      <Sheet open={painOpen} onOpenChange={setPainOpen}>
        <SheetContent
          side="bottom"
          className="max-h-[85vh] overflow-y-auto rounded-t-3xl border-0 px-5 pb-8 pt-5"
        >
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-muted-foreground/30" />
          <SheetHeader className="mb-2 text-left">
            <SheetTitle className="font-display text-xl font-bold">
              What's hurting most right now?
            </SheetTitle>
          </SheetHeader>
          <p className="mb-4 text-sm text-muted-foreground">
            Pick one or two. We'll prescribe the right stack.
          </p>
          <div className="space-y-2">
            {PAIN_POINTS.map((p) => {
              const on = problems.has(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => toggleProblem(p.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition",
                    on
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-foreground",
                  )}
                >
                  <span>"{p.label}"</span>
                  {on ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider">Picked</span>
                  ) : (
                    <Plus className="h-4 w-4 opacity-60" />
                  )}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setPainOpen(false)}
            className="mt-5 h-12 w-full rounded-xl bg-foreground font-display text-sm font-bold text-background"
          >
            See my recommended stack
          </button>
        </SheetContent>
      </Sheet>
    </div>
  );
}

/**
 * Tag-filter chip group. Two modes:
 *  - multi-select (pass `selected` Set + `onToggle`)
 *  - single-select with implicit "Any" (pass `selectedSingle` + `onPickSingle`)
 */
function FilterChipGroup<T extends string>({
  label,
  options,
  selected,
  onToggle,
  selectedSingle,
  onPickSingle,
}: {
  label: string;
  options: { id: T; label: string }[];
  selected?: Set<T>;
  onToggle?: (id: T) => void;
  selectedSingle?: T | "any";
  onPickSingle?: (id: T | "any") => void;
}) {
  const isSingle = onPickSingle != null;
  return (
    <div className="mt-5">
      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {isSingle && (
          <button
            type="button"
            onClick={() => onPickSingle!("any")}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition",
              selectedSingle === "any"
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card text-foreground",
            )}
          >
            Any
          </button>
        )}
        {options.map((o) => {
          const on = isSingle ? selectedSingle === o.id : !!selected?.has(o.id);
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => (isSingle ? onPickSingle!(o.id) : onToggle?.(o.id))}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition",
                on
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-foreground",
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-2 mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
      {title}
    </div>
  );
}

function CompactItemRow({
  item,
  selected,
  counts,
  onChange,
  onCountChange,
}: {
  item: FlatItem;
  selected: SelectedMap;
  counts: Record<string, number>;
  onChange: (id: string, qty: number) => void;
  onCountChange: (id: string, count: number) => void;
}) {
  const qty = selected[item.id] ?? 0;
  const active = qty > 0;
  const accent = `var(--${item.group.accent})`;
  const livePrice = computeItemPrice(item, counts[item.id]);
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card transition",
        active ? "border-transparent ring-2" : "border-border",
      )}
      style={active ? ({ ["--tw-ring-color" as never]: accent } as React.CSSProperties) : undefined}
    >
      <div className="flex items-center gap-3 p-2.5">
        <div
          className="relative flex h-16 w-14 shrink-0 items-end justify-center overflow-hidden rounded-xl"
          style={{
            background: `color-mix(in oklab, ${accent} 22%, transparent)`,
          }}
        >
          <img
            src={item.group.image}
            alt={item.group.palName}
            className="h-full w-auto object-contain object-bottom"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-[13px] font-semibold">{item.name}</span>
            {item.recommended && (
              <span
                className="inline-flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground"
                style={{ background: accent }}
              >
                <Sparkles className="h-2.5 w-2.5" />
                Rec
              </span>
            )}
          </div>
          <div className="truncate text-[11px] text-muted-foreground">
            {item.group.role} ·{" "}
            {item.videos > 0 ? `${item.videos} video${item.videos === 1 ? "" : "s"}` : "1 episode"}
          </div>
          <div className="mt-0.5 font-display text-sm font-bold tabular-nums">
            ${livePrice.toLocaleString()}
          </div>
        </div>
        <AddButton
          active={active}
          accent={accent}
          label={item.name}
          onClick={() => onChange(item.id, active ? 0 : 1)}
        />
      </div>

      {active && item.editable && (
        <EditableControls
          item={item}
          group={item.group}
          count={counts[item.id] ?? item.editable.defaultCount}
          accent={accent}
          onCountChange={(c) => onCountChange(item.id, c)}
        />
      )}
    </div>
  );
}

function EditableControls({
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
      className="space-y-2 border-t px-3 py-3 text-xs"
      style={{
        borderColor: `color-mix(in oklab, ${accent} 25%, transparent)`,
        background: `color-mix(in oklab, ${accent} 6%, transparent)`,
      }}
    >
      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        Customize this pack
      </div>

      {/* Fixed base row */}
      <div className="flex items-center justify-between gap-3 rounded-lg bg-background/60 px-2.5 py-2">
        <div className="min-w-0">
          <div className="text-[12px] font-semibold">{e.baseLabel}</div>
          <div className="text-[10px] text-muted-foreground">Included · not editable</div>
        </div>
        <span className="font-display text-[12px] font-bold tabular-nums">
          ${e.fixedBase.toLocaleString()}
        </span>
      </div>

      {/* Editable unit row */}
      <div className="flex items-center gap-2 rounded-lg bg-background/60 px-2.5 py-2">
        <div className="min-w-0 flex-1">
          <div className="text-[12px] font-semibold">
            {count} {count === 1 ? e.unitLabel : e.unitLabelPlural}
          </div>
          <div className="text-[10px] text-muted-foreground">{e.unitPriceLabel}</div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-background p-0.5 shadow-sm">
          <button
            type="button"
            onClick={() => onCountChange(clamp(count - e.step))}
            disabled={count <= e.min}
            className="flex h-7 w-7 items-center justify-center rounded-full text-foreground transition hover:bg-muted disabled:opacity-30"
            aria-label={`Decrease ${e.unitLabel}`}
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="min-w-5 text-center text-[12px] font-bold tabular-nums">{count}</span>
          <button
            type="button"
            onClick={() => onCountChange(clamp(count + e.step))}
            disabled={count >= e.max}
            className="flex h-7 w-7 items-center justify-center rounded-full text-primary-foreground transition hover:opacity-90 disabled:opacity-30"
            style={{ background: accent }}
            aria-label={`Increase ${e.unitLabel}`}
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* What's always included */}
      <div className="rounded-lg bg-background/60 px-2.5 py-2">
        <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          What's always included
        </div>
        <ul className="space-y-1">
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

      {/* Live total */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Pack total
        </span>
        <span className="font-display text-sm font-bold tabular-nums">
          ${total.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

function AddButton({
  active,
  accent,
  label,
  onClick,
}: {
  active: boolean;
  accent?: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={`${active ? "Remove" : "Add"} ${label}`}
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition",
        active ? "text-primary-foreground shadow" : "bg-muted text-foreground",
      )}
      style={active && accent ? { background: accent } : undefined}
    >
      {active ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
    </button>
  );
}

function BigActionButton({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left transition active:scale-[0.99]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-display text-base font-bold leading-tight">{title}</div>
        <div className="text-[11px] text-muted-foreground">{subtitle}</div>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </button>
  );
}

function EmptyState({ message, onReset }: { message: string; onReset: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-6 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-foreground"
      >
        <X className="h-3 w-3" /> Reset filters
      </button>
    </div>
  );
}

function CategoryDetail({
  group,
  selected,
  counts,
  onChange,
  onCountChange,
  onBack,
}: {
  group: PalGroup;
  selected: SelectedMap;
  counts: Record<string, number>;
  onChange: (id: string, qty: number) => void;
  onCountChange: (id: string, count: number) => void;
  onBack: () => void;
}) {
  const accent = `var(--${group.accent})`;
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-muted-foreground"
      >
        <ChevronRight className="h-3 w-3 rotate-180" /> All categories
      </button>
      <div
        className="mb-4 flex gap-3 rounded-2xl p-3"
        style={{ background: `color-mix(in oklab, ${accent} 10%, transparent)` }}
      >
        <div
          className="relative flex h-20 w-16 shrink-0 items-end justify-center overflow-hidden rounded-xl"
          style={{ background: `color-mix(in oklab, ${accent} 22%, transparent)` }}
        >
          <img
            src={group.image}
            alt={group.palName}
            className="h-full w-auto object-contain object-bottom"
          />
        </div>
        <div className="min-w-0">
          <div
            className="text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{ color: accent }}
          >
            {group.role}
          </div>
          <div className="font-display text-base font-bold">{group.palName}</div>
          <p className="mt-1 text-[11px] text-muted-foreground">{group.pitch}</p>
        </div>
      </div>
      <div className="space-y-2">
        {group.items.map((it) => {
          const qty = selected[it.id] ?? 0;
          const active = qty > 0;
          const livePrice = computeItemPrice(it, counts[it.id]);
          return (
            <div
              key={it.id}
              className={cn(
                "rounded-xl border transition",
                active ? "border-transparent ring-2" : "border-border",
              )}
              style={
                active
                  ? ({
                      ["--tw-ring-color" as never]: accent,
                      background: `color-mix(in oklab, ${accent} 10%, transparent)`,
                    } as React.CSSProperties)
                  : undefined
              }
            >
              <div className="flex items-center gap-2 p-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-[13px] font-semibold">{it.name}</span>
                    {it.recommended && (
                      <span
                        className="inline-flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground"
                        style={{ background: accent }}
                      >
                        <Sparkles className="h-2.5 w-2.5" /> Rec
                      </span>
                    )}
                  </div>
                  <div className="line-clamp-2 text-[11px] text-muted-foreground">
                    {it.description}
                  </div>
                </div>
                <div className="font-display text-sm font-bold tabular-nums">
                  ${livePrice.toLocaleString()}
                </div>
                <AddButton
                  active={active}
                  accent={accent}
                  label={it.name}
                  onClick={() => onChange(it.id, active ? 0 : 1)}
                />
              </div>
              {active && it.editable && (
                <EditableControls
                  item={it}
                  group={group}
                  count={counts[it.id] ?? it.editable.defaultCount}
                  accent={accent}
                  onCountChange={(c) => onCountChange(it.id, c)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Avoid unused-import warning for ADD_ONS (used via relevantAddOns context).
void ADD_ONS;
