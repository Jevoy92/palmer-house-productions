import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import { Eyebrow, InView, PageShell } from "@/components/site/PageShell";
import { PalCallout, PalCrew, Scene } from "@/components/site/PalVisuals";
import { Glyph, GlyphBadge, type GlyphName } from "@/components/site/Glyphs";
import {
  buildReceiptLines,
  cartItemCount,
  cartStore,
  cartSubtotal,
  monthlyPrice,
  useCart,
} from "@/lib/cart-store";
import { ADD_ONS, DIY_DOWNLOADS, PAL_GROUPS, computeItemPrice } from "@/lib/pricing-catalog";
import { laneById, laneVar } from "@/lib/pal-lanes";
import { createSeo } from "@/lib/seo";

const money = (value: number) => `$${value.toLocaleString()}`;

const DOWNLOAD_GLYPHS: GlyphName[] = ["bulb", "reel", "script"];

function EmptyMatches({ query }: { query: string }) {
  return (
    <div className="surface-card grid items-center gap-6 p-6 sm:grid-cols-[12rem_1fr] sm:p-8">
      <Scene name="emptyCart" className="mx-auto w-40 sm:w-full" />
      <div>
        <Eyebrow lane="reel">Nothing matched</Eyebrow>
        <h3 className="mt-3 text-2xl font-extrabold">No shop items match “{query}”.</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Clear the search to see every mission, or build a custom package from scratch.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/shop" search={{ q: "" }} className="primary-action">
            Clear search
          </Link>
          <Link to="/production-pricing" className="secondary-action">
            Customize a package <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ShopPage() {
  const { q } = useSearch({ strict: false }) as { q?: string };
  const cart = useCart();
  const reduced = useReducedMotion();
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const lines = useMemo(() => buildReceiptLines(cart), [cart]);
  const subtotal = cartSubtotal(lines);
  const query = (q ?? "").trim().toLowerCase();
  const starters = useMemo(
    () =>
      PAL_GROUPS.map((group) => ({
        group,
        item: group.items.find((item) => item.recommended) ?? group.items[0],
      })).filter(({ group, item }) =>
        query
          ? `${group.role} ${group.palName} ${item.name} ${item.description}`
              .toLowerCase()
              .includes(query)
          : true,
      ),
    [query],
  );
  const visibleAddOns = ADD_ONS.filter((item) =>
    query ? `${item.name} ${item.description}`.toLowerCase().includes(query) : true,
  );
  const visibleDownloads = DIY_DOWNLOADS.filter((item) =>
    query ? `${item.name} ${item.description}`.toLowerCase().includes(query) : true,
  );

  function add(id: string, name: string) {
    cartStore.add(id);
    setLastAdded(name);
  }

  return (
    <PageShell>
      <section className="relative isolate overflow-hidden px-4 pb-4 pt-8 sm:pb-6 sm:pt-12">
        <div className="pointer-events-none absolute inset-x-4 inset-y-0 -z-10 mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-mist sm:rounded-[3.5rem]">
          <span
            aria-hidden
            className="absolute -right-16 -top-20 size-64 rounded-full bg-reel-soft sm:size-80"
          />
          <span
            aria-hidden
            className="absolute -bottom-28 -left-16 size-72 rounded-full bg-spotlight-soft sm:size-96"
          />
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-10 sm:py-20 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <Eyebrow lane="reel">Shop the fixes</Eyebrow>
            <h1 className="mt-5 max-w-[11ch] text-5xl font-extrabold leading-[0.94] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              Buy the fix, not a pile of videos.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Start with a proven mission or build your own. Every production package begins with
              strategy, direction, and a team that helps you feel natural on camera.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div
                className="flex rounded-full border border-border bg-white p-1 shadow-soft"
                role="radiogroup"
                aria-label="Purchase cadence"
              >
                {(["one-time", "monthly"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    role="radio"
                    onClick={() => cartStore.setCadence(mode)}
                    className={`min-h-11 rounded-full px-5 text-sm font-semibold transition ${
                      cart.cadence === mode
                        ? "bg-ink text-white shadow-soft"
                        : "text-muted-foreground"
                    }`}
                    aria-checked={cart.cadence === mode}
                  >
                    {mode === "one-time" ? "One-time" : "Monthly rhythm"}
                  </button>
                ))}
              </div>
              {cart.cadence === "monthly" && (
                <p className="max-w-xs font-mono text-[11px] uppercase tracking-[0.14em] text-reel-text">
                  Save 20%. Your configured package repeats monthly until you change or cancel it.
                </p>
              )}
            </div>
          </div>
          <PalCrew className="min-w-0" />
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          {query && (
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] bg-system-soft px-5 py-4">
              <p className="flex items-center gap-3 font-semibold">
                <GlyphBadge name="search" lane="system" size="sm" />
                <span>
                  Showing shop matches for <span className="text-system">“{q}”</span>
                </span>
              </p>
              <Link to="/shop" search={{ q: "" }} className="text-sm font-bold underline">
                Clear search
              </Link>
            </div>
          )}
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <Eyebrow lane="spotlight">Preset missions</Eyebrow>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">
                Choose your starting lane.
              </h2>
            </div>
            <Link
              to="/find-your-pal"
              className="inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4"
            >
              Not sure? Find your Pal <ArrowRight className="size-4" />
            </Link>
          </div>
          {starters.length === 0 ? (
            <EmptyMatches query={q ?? ""} />
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {starters.map(({ group, item }, index) => {
                const qty = cart.selected[item.id] ?? 0;
                const oneTimePrice = computeItemPrice(item, cart.counts[item.id]);
                const price =
                  cart.cadence === "monthly" ? monthlyPrice(oneTimePrice) : oneTimePrice;
                const lane = laneById[group.id];
                return (
                  <motion.article
                    key={group.id}
                    initial={reduced ? false : { opacity: 0, transform: "translateY(18px)" }}
                    whileInView={{ opacity: 1, transform: "translateY(0px)" }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.06, duration: 0.45 }}
                    className="group overflow-hidden rounded-[2rem] border border-border bg-white"
                  >
                    <div
                      className="grid min-h-52 grid-cols-[1fr_9rem] sm:grid-cols-[1fr_13rem]"
                      style={{ background: laneVar(group.accent, "-soft") }}
                    >
                      <div className="p-6 sm:p-8">
                        <div className="flex items-center gap-3">
                          <GlyphBadge name={lane.glyph} lane={group.accent} size="sm" />
                          <p
                            className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]"
                            style={{ color: laneVar(group.accent, "-text") }}
                          >
                            {group.role} · {lane.problem}
                          </p>
                        </div>
                        <h3 className="mt-4 text-2xl font-extrabold">{item.name}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                          {item.description}
                        </p>
                      </div>
                      <img
                        src={group.image}
                        alt={`${group.palName}, guides for ${group.role}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain object-bottom p-2 transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
                      />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:px-8">
                      <div>
                        <p className="text-2xl font-extrabold">{money(price)}</p>
                        <p className="text-xs text-muted-foreground">
                          {cart.cadence === "monthly"
                            ? "working monthly estimate"
                            : "working estimate"}
                        </p>
                      </div>
                      {qty > 0 ? (
                        <div className="flex items-center rounded-full border border-border bg-white p-1">
                          <button
                            type="button"
                            onClick={() => cartStore.decrement(item.id)}
                            className="grid size-11 place-items-center rounded-full hover:bg-secondary"
                            aria-label={`Remove one ${item.name}`}
                          >
                            <Minus className="size-4" />
                          </button>
                          <span className="w-9 text-center font-semibold" aria-live="polite">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => add(item.id, item.name)}
                            className="grid size-11 place-items-center rounded-full hover:bg-secondary"
                            aria-label={`Add another ${item.name}`}
                          >
                            <Plus className="size-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => add(item.id, item.name)}
                          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white"
                        >
                          Add mission <Plus className="size-4" />
                        </button>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
          <div className="mt-6 grid items-center gap-5 rounded-[2rem] bg-system-soft p-7 sm:grid-cols-[auto_1fr_auto]">
            <GlyphBadge name="workflow" lane="system" />
            <div>
              <h3 className="text-xl font-bold">Need a different mix?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Use the full builder to mix Pals, quantities, runtime, and add-ons.
              </p>
            </div>
            <Link
              to="/production-pricing"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink px-5 text-sm font-semibold"
            >
              Customize a package <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20" style={{ background: "var(--spotlight-soft)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <Eyebrow lane="spotlight">Fine-tune the output</Eyebrow>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">
                Slide only what has a clear price.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Voiceover and custom production requests stay scope-based. Extra edits and thumbnail
                sets can update the estimate immediately.
              </p>
              <div className="mt-8">
                <PalCallout
                  pal="kareem"
                  compact
                  quote="Anything with a clear price gets a slider. Anything that depends on scope gets a conversation first."
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  id: "extra-edited-video",
                  label: "Standalone edited minutes",
                  max: 8,
                  unit: 150,
                  glyph: "edit" as GlyphName,
                },
                {
                  id: "thumbnail-set",
                  label: "Thumbnail sets",
                  max: 12,
                  unit: 50,
                  glyph: "layers" as GlyphName,
                },
              ].map((option) => {
                const value = cart.selected[option.id] ?? 0;
                return (
                  <label key={option.id} className="surface-card block p-6">
                    <span className="flex items-end justify-between gap-4">
                      <span className="flex items-center gap-3">
                        <GlyphBadge name={option.glyph} lane="spotlight" size="sm" />
                        <span>
                          <span className="block font-semibold">{option.label}</span>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {money(option.unit)} each
                          </span>
                        </span>
                      </span>
                      <strong className="text-3xl">{value}</strong>
                    </span>
                    <input
                      type="range"
                      min="0"
                      max={option.max}
                      step="1"
                      value={value}
                      onChange={(event) =>
                        cartStore.changeQty(option.id, Number(event.target.value))
                      }
                      className="mt-8 w-full accent-spotlight"
                    />
                    <span className="mt-3 flex justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      <span>None</span>
                      <span>{money(value * option.unit)} added</span>
                      <span>{option.max}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink px-4 py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <Glyph name="spark" lane="reel" className="size-16" />
            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">
              Small additions. Bigger usefulness.
            </h2>
            <p className="mt-4 max-w-md text-white/65">
              Add the support that helps the finished work travel farther. No mystery bundles.
            </p>
          </div>
          <div className="divide-y divide-white/15 border-y border-white/15">
            {visibleAddOns.length === 0 && (
              <p className="py-6 text-sm text-white/65">No add-ons match “{q}”.</p>
            )}
            {visibleAddOns.slice(0, 5).map((addon) => {
              const qty = cart.selected[addon.id] ?? 0;
              return (
                <div key={addon.id} className="flex min-h-20 items-center gap-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{addon.name}</p>
                    <p className="text-sm text-white/55">{addon.description}</p>
                  </div>
                  <span className="font-mono text-sm">+{money(addon.price)}</span>
                  <button
                    type="button"
                    onClick={() =>
                      qty ? cartStore.decrement(addon.id) : add(addon.id, addon.name)
                    }
                    className={`grid size-11 shrink-0 place-items-center rounded-full border ${qty ? "border-evergreen bg-evergreen" : "border-white/30"}`}
                    aria-label={qty ? `Remove ${addon.name}` : `Add ${addon.name}`}
                  >
                    {qty ? <Check className="size-4" /> : <Plus className="size-4" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20" style={{ background: "var(--evergreen-soft)" }}>
        <div className="mx-auto max-w-6xl">
          <Eyebrow lane="evergreen">DIY downloads</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold sm:text-5xl">
            Start small and do it yourself.
          </h2>
          {visibleDownloads.length === 0 ? (
            <div className="mt-8">
              <EmptyMatches query={q ?? ""} />
            </div>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {visibleDownloads.map((item, index) => (
                <InView key={item.id} delay={index * 0.07} className="h-full">
                  <article className="surface-card relative flex h-full min-h-64 flex-col overflow-hidden p-6">
                    <span
                      aria-hidden
                      className="absolute -right-10 -top-10 size-28 rounded-full bg-evergreen-soft"
                    />
                    <div className="relative flex items-center justify-between gap-3">
                      <GlyphBadge
                        name={DOWNLOAD_GLYPHS[index % DOWNLOAD_GLYPHS.length]}
                        lane="evergreen"
                        size="sm"
                      />
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-evergreen-text">
                        Digital tool 0{index + 1}
                      </span>
                    </div>
                    <h3 className="relative mt-5 text-2xl font-bold">{item.name}</h3>
                    <p className="relative mt-3 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="relative mt-auto flex items-center justify-between pt-6">
                      <span className="text-xl font-extrabold">{money(item.price)}</span>
                      <button
                        type="button"
                        onClick={() => add(item.id, item.name)}
                        className="grid size-11 place-items-center rounded-full bg-ink text-white"
                        aria-label={`Add ${item.name}`}
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </article>
                </InView>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lastAdded && (
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(20px)" }}
            className="fixed bottom-24 left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-border bg-white p-4 shadow-soft sm:bottom-6"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-evergreen-soft text-evergreen">
                <Check className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">Added to your plan</p>
                <p className="truncate text-sm text-muted-foreground">{lastAdded}</p>
              </div>
              <button
                type="button"
                onClick={() => setLastAdded(null)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center text-xs font-semibold text-muted-foreground"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {lines.length > 0 && (
        <div className="fixed inset-x-3 bottom-3 z-30 sm:left-auto sm:right-5 sm:w-[24rem]">
          <Link
            to="/checkout"
            className="flex min-h-16 items-center gap-4 rounded-full bg-spotlight px-5 text-white shadow-glow"
          >
            <span className="grid size-10 place-items-center rounded-full bg-white/15">
              <ShoppingBag className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">
                Review {cartItemCount(cart)} item{cartItemCount(cart) === 1 ? "" : "s"}
              </span>
              <span className="block text-xs text-white/65">{money(subtotal)} estimated</span>
            </span>
            <ArrowRight className="size-5" />
          </Link>
        </div>
      )}
    </PageShell>
  );
}

export const Route = createFileRoute("/shop")({
  head: () => ({
    ...createSeo({
      title: "Shop Video Packages | Palmer House Productions",
      description:
        "Choose a Palmer House video mission, customize the plan, and book with a working estimate.",
      pathname: "/shop",
    }),
  }),
  component: ShopPage,
});
