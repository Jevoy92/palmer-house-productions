import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Gift, Minus, Plus, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Eyebrow, PageShell } from "@/components/site/PageShell";
import { Scene } from "@/components/site/PalVisuals";
import { GlyphBadge, type GlyphName } from "@/components/site/Glyphs";
import {
  buildReceiptLines,
  cartStore,
  cartSubtotal,
  receiptLineConfiguration,
  useCart,
} from "@/lib/cart-store";
import { ADD_ONS } from "@/lib/pricing-catalog";
import { generateQuoteReference, openHoneyBookBooking } from "@/lib/honeybook";
import { buildQuoteSnapshot } from "@/lib/quote-engine";
import { createDepositCheckout } from "@/lib/stripe-checkout";

const money = (value: number) =>
  value.toLocaleString(undefined, { style: "currency", currency: "USD" });

const TRUST_STRIP: { glyph: GlyphName; label: string; body: string }[] = [
  { glyph: "shield", label: "No surprise charge", body: "Scope, tax, and travel confirmed first." },
  { glyph: "handshake", label: "Human handoff", body: "Palmer House confirms before any deposit." },
  { glyph: "clock", label: "Schedule confirmed", body: "Timing is locked before payment." },
];

function CheckoutPage() {
  const search = useSearch({ strict: false }) as { quote?: unknown };
  const preservedReference =
    typeof search.quote === "string" && /^PH-[A-HJ-NP-Z2-9]{6}$/.test(search.quote)
      ? search.quote
      : undefined;
  const cart = useCart();
  const lines = useMemo(() => buildReceiptLines(cart), [cart]);
  const hasMonthlyItems = lines.some((line) => line.cadence === "monthly");
  const allItemsMonthly = lines.length > 0 && lines.every((line) => line.cadence === "monthly");
  const subtotal = cartSubtotal(lines);
  const deposit = Math.round(subtotal * 0.1 * 100) / 100;
  const [step, setStep] = useState(1);
  const [gift, setGift] = useState(false);
  const [scriptSupport, setScriptSupport] = useState(false);
  const [handoffState, setHandoffState] = useState<"idle" | "loading" | "fallback">("idle");
  const stepHeadingRefs = useRef<Record<number, HTMLHeadingElement | null>>({});
  const focusStepHeading = useRef(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    company: "",
    recipient: "",
    note: "",
  });
  const suggested = ADD_ONS.filter((item) => !cart.selected[item.id]).slice(0, 2);

  useEffect(() => {
    if (!focusStepHeading.current) return;
    focusStepHeading.current = false;
    const frame = window.requestAnimationFrame(() => {
      stepHeadingRefs.current[step]?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [step]);

  function goToStep(nextStep: number) {
    focusStepHeading.current = true;
    setStep(nextStep);
  }

  function continueFromDetails(event: FormEvent) {
    event.preventDefault();
    if (!details.name.trim() || !/^\S+@\S+\.\S+$/.test(details.email)) return;
    goToStep(3);
  }

  async function handoff() {
    const reference = preservedReference ?? generateQuoteReference();
    const customer = {
      ...details,
      gift,
      expandedScriptwriting: scriptSupport,
    };
    const snapshot = buildQuoteSnapshot({ cart, reference, customer });
    const items = lines.map((line) => ({
      id: line.id,
      name: `${line.name}${line.qty > 1 ? ` × ${line.qty}` : ""}`,
      price: line.price * line.qty,
      cadence: line.cadence,
      configuration: receiptLineConfiguration(line),
    }));
    if (!hasMonthlyItems) {
      setHandoffState("loading");
      try {
        const result = await createDepositCheckout({
          data: {
            email: details.email,
            name: details.name,
            company: details.company || undefined,
            reference,
            offerCode: cart.offerCode,
            gift,
            expandedScriptwriting: scriptSupport,
            items: snapshot.items,
          },
        });
        if (result.ok) {
          window.location.assign(result.url);
          return;
        }
      } catch {
        // Preserve the exact quote through the configured HoneyBook/contact fallback.
      }
    }
    setHandoffState("fallback");
    openHoneyBookBooking({
      reference,
      items,
      subtotal,
      tax: 0,
      total: subtotal,
      offerCode: cart.offerCode,
      cadenceMix: snapshot.cadenceMix,
      customer,
    });
  }

  if (!lines.length) {
    return (
      <PageShell>
        <section className="px-4 py-12 sm:py-20">
          <div className="mx-auto grid max-w-5xl items-center gap-10 rounded-[2.5rem] bg-mist px-6 py-12 sm:px-12 lg:grid-cols-[.9fr_1.1fr]">
            <Scene
              name="emptyCart"
              priority
              className="mx-auto w-full max-w-sm"
              tags={["Nothing here yet", "Ryder is waiting"]}
            />
            <div className="text-center lg:text-left">
              <Eyebrow lane="reel">Your cart</Eyebrow>
              <h1 className="mt-5 text-5xl font-extrabold tracking-[-0.05em] sm:text-6xl">
                Your plan is wide open.
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose a mission or build a custom package before booking. The current offers are a
                good place to start.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link to="/offers" className="primary-action">
                  See current offers <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/shop"
                  className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 font-semibold text-white"
                >
                  Explore packages
                </Link>
              </div>
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="px-4 pb-20 pt-12">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/shop"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground"
          >
            <ArrowLeft className="size-4" /> Keep shopping
          </Link>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_25rem]">
            <div>
              <div
                className="flex gap-2"
                role="progressbar"
                aria-label={`Checkout step ${step} of 3`}
                aria-valuemin={1}
                aria-valuemax={3}
                aria-valuenow={step}
              >
                {[1, 2, 3].map((value) => (
                  <span
                    key={value}
                    className={`h-1.5 flex-1 rounded-full ${value <= step ? "bg-spotlight" : "bg-border"}`}
                  />
                ))}
              </div>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Step {step} of 3
              </p>

              {step === 1 && (
                <div className="mt-5">
                  <h1
                    ref={(heading) => {
                      stepHeadingRefs.current[1] = heading;
                    }}
                    tabIndex={-1}
                    className="text-4xl font-extrabold outline-none sm:text-6xl"
                  >
                    Shape the booking.
                  </h1>
                  <p className="mt-4 max-w-xl text-muted-foreground">
                    Review quantities, decide how often this work should happen, and tell us if it
                    is a gift.
                  </p>
                  <div className="mt-8 divide-y divide-border border-y border-border">
                    {lines.map((line) => (
                      <div key={line.id} className="flex items-center gap-4 py-5">
                        <span
                          className="size-3 shrink-0 rounded-full"
                          style={{ background: line.accent }}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold">{line.name}</p>
                          <p className="text-sm text-muted-foreground">{line.groupLabel}</p>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {receiptLineConfiguration(line)}
                          </p>
                        </div>
                        <div className="flex items-center rounded-full border border-border p-1">
                          <button
                            type="button"
                            className="grid size-11 place-items-center rounded-full hover:bg-secondary"
                            onClick={() => cartStore.decrement(line.id)}
                            aria-label={`Remove one ${line.name}`}
                          >
                            <Minus className="size-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{line.qty}</span>
                          <button
                            type="button"
                            className="grid size-11 place-items-center rounded-full hover:bg-secondary"
                            onClick={() => cartStore.add(line.id)}
                            aria-label={`Add one ${line.name}`}
                          >
                            <Plus className="size-4" />
                          </button>
                        </div>
                        <span className="hidden w-24 text-right font-semibold sm:block">
                          {money(line.price * line.qty)}
                        </span>
                      </div>
                    ))}
                  </div>
                  {suggested.length > 0 && (
                    <div className="mt-8 rounded-[2rem] bg-secondary p-6">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        Frequently useful with this plan
                      </p>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        {suggested.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => cartStore.add(item.id)}
                            className="flex min-h-20 items-center gap-3 rounded-2xl bg-white p-4 text-left"
                          >
                            <Plus className="size-5 shrink-0 text-system-text" />
                            <span className="min-w-0 flex-1">
                              <span className="block font-semibold">{item.name}</span>
                              <span className="block text-xs text-muted-foreground">
                                +{money(item.price)}
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setScriptSupport((value) => !value)}
                      className={`min-h-28 rounded-[1.5rem] border p-5 text-left ${scriptSupport ? "border-evergreen bg-evergreen-soft" : "border-border"}`}
                      aria-pressed={scriptSupport}
                    >
                      <span className="flex items-center justify-between">
                        <span className="font-semibold">Expanded scriptwriting</span>
                        {scriptSupport && <Check className="size-5 text-evergreen-text" />}
                      </span>
                      <span className="mt-2 block text-sm text-muted-foreground">
                        Script and talking-point help is already included. Request full draft
                        scripting or a larger review cycle.
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setGift((value) => !value)}
                      className={`min-h-28 rounded-[1.5rem] border p-5 text-left ${gift ? "border-reel bg-reel-soft" : "border-border"}`}
                      aria-pressed={gift}
                    >
                      <span className="flex items-center justify-between">
                        <span className="font-semibold">Make this a gift</span>
                        <Gift className="size-5 text-reel-text" />
                      </span>
                      <span className="mt-2 block text-sm text-muted-foreground">
                        Add a recipient and note. They choose the session date later.
                      </span>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => goToStep(2)}
                    className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 font-semibold text-white sm:w-auto"
                  >
                    Continue <ArrowRight className="size-4" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <form onSubmit={continueFromDetails} className="mt-5 max-w-2xl">
                  <h1
                    ref={(heading) => {
                      stepHeadingRefs.current[2] = heading;
                    }}
                    tabIndex={-1}
                    className="text-4xl font-extrabold outline-none sm:text-6xl"
                  >
                    Who is this for?
                  </h1>
                  <p className="mt-4 text-muted-foreground">
                    We use this to prepare the booking handoff. Nothing is charged on this screen.
                  </p>
                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Your name"
                      value={details.name}
                      onChange={(value) => setDetails({ ...details, name: value })}
                      required
                    />
                    <Field
                      label="Your email"
                      type="email"
                      value={details.email}
                      onChange={(value) => setDetails({ ...details, email: value })}
                      required
                    />
                    <Field
                      label="Company"
                      value={details.company}
                      onChange={(value) => setDetails({ ...details, company: value })}
                    />
                    {gift && (
                      <Field
                        label="Recipient email"
                        type="email"
                        value={details.recipient}
                        onChange={(value) => setDetails({ ...details, recipient: value })}
                      />
                    )}
                    {gift && (
                      <label className="sm:col-span-2">
                        <span className="text-sm font-semibold">Gift note</span>
                        <textarea
                          value={details.note}
                          onChange={(event) => setDetails({ ...details, note: event.target.value })}
                          rows={4}
                          className="mt-2 w-full rounded-2xl border border-border bg-white p-4"
                          placeholder="A note they will see before booking…"
                        />
                      </label>
                    )}
                  </div>
                  <div className="mt-8 flex gap-3">
                    <button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="min-h-12 rounded-full border border-border px-5 font-semibold"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-white"
                    >
                      Review booking <ArrowRight className="size-4" />
                    </button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <div className="mt-5 max-w-2xl">
                  <span className="grid size-14 place-items-center rounded-full bg-evergreen-soft text-evergreen-text">
                    <Check className="size-7" />
                  </span>
                  <h1
                    ref={(heading) => {
                      stepHeadingRefs.current[3] = heading;
                    }}
                    tabIndex={-1}
                    className="mt-6 text-4xl font-extrabold outline-none sm:text-6xl"
                  >
                    Ready for the human handoff.
                  </h1>
                  <p className="mt-4 text-muted-foreground">
                    Your working plan is ready. Palmer House confirms scope and timing before the
                    deposit is collected.
                  </p>
                  <div className="mt-8 rounded-[2rem] border border-border p-6">
                    <div className="flex justify-between gap-6">
                      <span className="text-muted-foreground">Estimated project</span>
                      <strong>
                        {money(subtotal)}
                        {allItemsMonthly ? " / month" : ""}
                      </strong>
                    </div>
                    <div className="mt-3 flex justify-between gap-6">
                      <span className="text-muted-foreground">Estimated 10% deposit</span>
                      <strong>{money(deposit)}</strong>
                    </div>
                    {scriptSupport && (
                      <p className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">
                        Expanded scriptwriting requested — final scope confirmed before payment.
                      </p>
                    )}
                    {gift && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        Gift flow requested for {details.recipient || "your recipient"}.
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    disabled={handoffState === "loading"}
                    onClick={handoff}
                    className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-spotlight px-7 font-semibold text-white disabled:opacity-60 sm:w-auto"
                  >
                    <ShieldCheck className="size-5" />{" "}
                    {handoffState === "loading"
                      ? "Preparing secure checkout…"
                      : "Continue to secure booking"}
                  </button>
                  <p className="mt-3 max-w-lg text-xs leading-relaxed text-muted-foreground">
                    One-time production deposits use Stripe Checkout when its server key is
                    connected. Monthly plans continue to HoneyBook for scope confirmation before a
                    Stripe subscription is created.
                  </p>
                  {handoffState === "fallback" && (
                    <p className="mt-3 text-sm font-semibold text-system-text">
                      Secure checkout is not connected here yet, so we opened the exact quote for a
                      human booking confirmation.
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="h-fit space-y-4 lg:sticky lg:top-24">
              <div className="hidden items-center gap-4 rounded-[2rem] bg-reel-soft p-4 lg:flex">
                <Scene name="checkoutReview" className="w-28 shrink-0" />
                <div className="min-w-0">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-reel-text">
                    Raquel · Reel Pal
                  </p>
                  <p className="mt-1 text-sm font-bold leading-snug">
                    Reviewing your working order before the human handoff.
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Nothing is charged on these screens.
                  </p>
                </div>
              </div>
              <aside className="rounded-[2rem] bg-ink p-6 text-white">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
                  Working order
                </p>
                <div className="mt-5 space-y-3">
                  {lines.map((line) => (
                    <div key={line.id} className="flex justify-between gap-4 text-sm">
                      <span className="min-w-0 text-white/70">
                        <span className="block">
                          {line.name} × {line.qty}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-white/45">
                          {receiptLineConfiguration(line)}
                        </span>
                      </span>
                      <span>{money(line.price * line.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t border-white/20 pt-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-white/60">Estimate</span>
                    <strong className="text-2xl">{money(subtotal)}</strong>
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-white/60">Deposit target</span>
                    <span>{money(deposit)}</span>
                  </div>
                </div>
                <div className="mt-6 rounded-2xl bg-white/10 p-4 text-xs leading-relaxed text-white/65">
                  No surprise charge: scope, tax, travel, schedule, and final deposit are confirmed
                  before payment.
                </div>
              </aside>
              <ul className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {TRUST_STRIP.map((item, index) => (
                  <li key={item.label} className="surface-card flex items-center gap-3 p-3">
                    <GlyphBadge
                      name={item.glyph}
                      lane={index === 0 ? "evergreen" : index === 1 ? "spotlight" : "system"}
                      size="sm"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-bold">{item.label}</p>
                      <p className="text-xs leading-snug text-muted-foreground">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label>
      <span className="text-sm font-semibold">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="mt-2 min-h-12 w-full rounded-2xl border border-border bg-white px-4"
      />
    </label>
  );
}

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Review Your Booking | Palmer House Productions" },
      {
        name: "description",
        content:
          "Review a Palmer House package, estimate the booking deposit, and continue to a secure booking handoff.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CheckoutPage,
});
