import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Minus, Plus, ShoppingBag, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import {
  buildReceiptLines,
  cartItemCount,
  cartStore,
  cartSubtotal,
  useCart,
} from "@/lib/cart-store";
import { ADD_ONS, DIY_DOWNLOADS, PAL_GROUPS, computeItemPrice } from "@/lib/pricing-catalog";

const money = (value: number) => `$${value.toLocaleString()}`;

function ShopPage() {
  const cart = useCart();
  const reduced = useReducedMotion();
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const lines = useMemo(() => buildReceiptLines(cart), [cart]);
  const subtotal = cartSubtotal(lines);
  const starters = PAL_GROUPS.map((group) => ({
    group,
    item: group.items.find((item) => item.recommended) ?? group.items[0],
  }));

  function add(id: string, name: string) {
    cartStore.add(id);
    setLastAdded(name);
  }

  return (
    <PageShell>
      <section className="px-4 pb-12 pt-14 sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h1 className="max-w-[11ch] text-5xl font-extrabold leading-[0.94] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                Buy the fix, not a pile of videos.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Start with a proven mission or build your own. Every production package begins with
                strategy, direction, and a team that helps you feel natural on camera.
              </p>
            </div>
            <div
              className="flex rounded-full border border-border bg-secondary p-1"
              aria-label="Purchase cadence"
            >
              {(["one-time", "monthly"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => cartStore.setCadence(mode)}
                  className={`min-h-11 rounded-full px-5 text-sm font-semibold transition ${
                    cart.cadence === mode
                      ? "bg-ink text-white shadow-soft"
                      : "text-muted-foreground"
                  }`}
                  aria-pressed={cart.cadence === mode}
                >
                  {mode === "one-time" ? "One-time" : "Monthly rhythm"}
                </button>
              ))}
            </div>
          </div>
          {cart.cadence === "monthly" && (
            <p className="mt-4 max-w-xl font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground lg:ml-auto">
              The estimate repeats monthly. Exact cadence and deliverables are confirmed before
              billing.
            </p>
          )}
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Preset missions
              </p>
              <h2 className="mt-2 text-3xl font-extrabold sm:text-5xl">
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
          <div className="grid gap-5 md:grid-cols-2">
            {starters.map(({ group, item }, index) => {
              const qty = cart.selected[item.id] ?? 0;
              const price = computeItemPrice(item, cart.counts[item.id]);
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
                    style={{
                      background:
                        group.id === "reel"
                          ? "var(--reel-soft)"
                          : group.id === "spotlight"
                            ? "var(--spotlight-soft)"
                            : group.id === "evergreen"
                              ? "var(--evergreen-soft)"
                              : "var(--system-soft)",
                    }}
                  >
                    <div className="p-6 sm:p-8">
                      <p
                        className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]"
                        style={{ color: `var(--${group.accent})` }}
                      >
                        {group.role}
                      </p>
                      <h3 className="mt-3 text-2xl font-extrabold">{item.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                        {item.description}
                      </p>
                    </div>
                    <img
                      src={group.image}
                      alt={`${group.palName}, guides for ${group.role}`}
                      className="h-full w-full object-contain object-bottom p-2 transition-transform duration-500 group-hover:scale-[1.04]"
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
                          className="grid size-10 place-items-center rounded-full hover:bg-secondary"
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
                          className="grid size-10 place-items-center rounded-full hover:bg-secondary"
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
          <div className="mt-6 rounded-[2rem] border border-dashed border-border bg-secondary/40 p-7 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
            <div>
              <h3 className="text-xl font-bold">Need a different mix?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Use the full builder to mix Pals, quantities, runtime, and add-ons.
              </p>
            </div>
            <Link
              to="/production-pricing"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-ink px-5 text-sm font-semibold sm:mt-0"
            >
              Customize a package <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-secondary p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Fine-tune the output
              </p>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-5xl">
                Slide only what has a clear price.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Voiceover and custom production requests stay scope-based. Extra edits and thumbnail
                sets can update the estimate immediately.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { id: "extra-edited-video", label: "Additional edited videos", max: 8, unit: 150 },
                { id: "thumbnail-set", label: "Thumbnail sets", max: 12, unit: 50 },
              ].map((option) => {
                const value = cart.selected[option.id] ?? 0;
                return (
                  <label key={option.id} className="rounded-[2rem] bg-white p-6">
                    <span className="flex items-end justify-between gap-4">
                      <span>
                        <span className="block font-semibold">{option.label}</span>
                        <span className="mt-1 block text-xs text-muted-foreground">
                          {money(option.unit)} each
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
                    <span className="mt-3 flex justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
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

      <section className="bg-ink px-4 py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <Sparkles className="size-7 text-reel" />
            <h2 className="mt-5 text-4xl font-extrabold sm:text-5xl">
              Small additions. Bigger usefulness.
            </h2>
            <p className="mt-4 max-w-md text-white/65">
              Add the support that helps the finished work travel farther. No mystery bundles.
            </p>
          </div>
          <div className="divide-y divide-white/15 border-y border-white/15">
            {ADD_ONS.slice(0, 5).map((addon) => {
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

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-extrabold sm:text-5xl">Start small and do it yourself.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {DIY_DOWNLOADS.map((item, index) => (
              <article
                key={item.id}
                className="flex min-h-64 flex-col rounded-[2rem] border border-border bg-white p-6"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Digital tool 0{index + 1}
                </span>
                <h3 className="mt-5 text-2xl font-bold">{item.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
                <div className="mt-auto flex items-center justify-between pt-6">
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
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lastAdded && (
          <motion.div
            initial={{ opacity: 0, transform: "translateY(20px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transform: "translateY(20px)" }}
            className="fixed bottom-24 left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-border bg-white p-4 shadow-soft sm:bottom-6"
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
                className="text-xs font-semibold text-muted-foreground"
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
    meta: [
      { title: "Shop Video Packages | Palmer House Productions" },
      {
        name: "description",
        content:
          "Choose a Palmer House video mission, customize the plan, and book with a working estimate.",
      },
    ],
  }),
  component: ShopPage,
});
