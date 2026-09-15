import { Link } from "@tanstack/react-router";
import { motion, useInView, usePageInView } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Minus,
  Play,
  Plus,
  Settings2,
  ShoppingCart,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import kiana from "@/assets/pals-optimized/kiana.webp";
import silas from "@/assets/pals-optimized/silas.webp";
import samira from "@/assets/pals-optimized/samira.webp";
import kianaShot from "@/assets/pal-headshots/kiana.webp";
import ryderShot from "@/assets/pal-headshots/ryder.webp";
import silasShot from "@/assets/pal-headshots/silas.webp";
import claraShot from "@/assets/pal-headshots/clara.webp";
import farmersMarket from "@/assets/work/FarmersMarket-optimized.webm";
import farmersMarketPoster from "@/assets/work/FarmersMarket-poster.jpg";
import visibilityShootScene from "@/assets/pals-scenes/visibility-shoot-pal.webp";
import trustFilmScene from "@/assets/pals-scenes/trust-film-pal.webp";
import trainingLibraryScene from "@/assets/pals-scenes/training-library-pal.webp";
import servicePackScene from "@/assets/pals-scenes/service-pack-pal.webp";
import brandPresenceScene from "@/assets/pals-scenes/brand-presence-pal.webp";
import onboardingKitScene from "@/assets/pals-scenes/onboarding-kit-pal.webp";
import teachOnceScene from "@/assets/pals-scenes/teach-once-pal.webp";
import {
  cartStore,
  getKitCadence,
  getKitDurationSeconds,
  getKitOutputCount,
  kitAddOnCountKey,
  kitCadenceCountKey,
  kitDurationCountKey,
  MONTHLY_DISCOUNT_RATE,
  monthlyPrice,
  type PurchaseCadence,
  useCart,
  VIDEO_DURATION_OPTIONS,
} from "@/lib/cart-store";
import { ADD_ONS, PAL_GROUPS, computeItemPrice } from "@/lib/pricing-catalog";
import { footerColumns, locations, socials } from "@/data/nav";
import { useHydratedReducedMotion } from "@/hooks/use-hydrated-reduced-motion";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/lib/use-count-up";

function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="#10204A" />
      <path
        d="M20 7c-3.2 6.4-9 10.4-9 17.2C11 30 15 35 20 35s9-5 9-10.8C29 17.4 23.2 13.4 20 7z"
        fill="#E7C1D3"
      />
      <circle cx="20" cy="24" r="3.2" fill="#fff" />
    </svg>
  );
}

const spring = { type: "spring" as const, stiffness: 380, damping: 22 };
const rise = { type: "spring" as const, stiffness: 120, damping: 18 };

function InView({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useHydratedReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { y: 28 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ ...rise, delay }}
    >
      {children}
    </motion.div>
  );
}

function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const reduce = useHydratedReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) {
      setValue(to);
      return;
    }
    const start = performance.now();
    let lastPaint = 0;
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1100);
      if (now - lastPaint >= 32 || p === 1) {
        lastPaint = now;
        setValue(Math.round((1 - Math.pow(1 - p, 3)) * to));
      }
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

const PROBLEMS = [
  {
    id: "reel-services",
    pal: visibilityShootScene,
    name: "Ryder",
    tone: "bg-reel-soft",
    category: "Social video",
    badge: "6 videos · 15–45 sec",
    title: "Social video kit",
    copy: "When nothing you post actually gets seen.",
    href: "/reel-pal" as const,
  },
  {
    id: "spotlight-brand-presence",
    pal: trustFilmScene,
    name: "Kiana",
    tone: "bg-spotlight-soft",
    category: "Brand film",
    badge: "4 videos · about 1 min",
    title: "Brand film kit",
    copy: "When the message is right and still does not land.",
    href: "/spotlight-pal" as const,
  },
  {
    id: "system-onboarding",
    pal: trainingLibraryScene,
    name: "Silas",
    tone: "bg-system-soft",
    category: "Training video",
    badge: "6 videos · 1–3 min",
    title: "Training video kit",
    copy: "When the same questions eat the same hours.",
    href: "/system-pal" as const,
  },
];

const DEALS = [
  {
    id: "reel-services",
    scope: "1 session · 6 videos",
    img: servicePackScene,
    cat: "Social video",
    title: "Service explainers",
  },
  {
    id: "spotlight-brand-presence",
    scope: "1 session · 4 videos",
    img: brandPresenceScene,
    cat: "Brand film",
    title: "Brand presence",
  },
  {
    id: "system-onboarding",
    scope: "1 session · 6 videos",
    img: onboardingKitScene,
    cat: "Onboarding",
    title: "Employee onboarding",
  },
  {
    id: "evergreen-faq-deep-dive",
    scope: "5-minute episode",
    img: teachOnceScene,
    cat: "Long-form FAQ",
    title: "FAQ deep dive",
  },
];

const CATALOG_ITEMS = PAL_GROUPS.flatMap((group) =>
  group.items.map((item) => ({ item, lane: group.id })),
);
const CARD_ADD_ONS = ADD_ONS.filter((item) =>
  ["caption-pack", "thumbnail-set", "posting-plan", "brand-kit", "rush-delivery"].includes(item.id),
);
const EVERY_PRODUCTION_INCLUDES = [
  "Strategy, script + talking-point help",
  "Wardrobe + on-camera prep guidance",
  "Set setup, styling + shot design",
  "Professional cameras + lenses",
  "Professional lighting + broadcast audio",
  "Direction, editing, color + sound mix",
];

function KitControls({ itemId }: { itemId: string }) {
  const cart = useCart();
  const reduce = useHydratedReducedMotion();
  const [open, setOpen] = useState(false);
  const [cadenceDraft, setCadenceDraft] = useState<PurchaseCadence | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const entry = CATALOG_ITEMS.find(({ item }) => item.id === itemId)!;
  const { item, lane } = entry;
  const editable = item.editable;
  const count = editable ? (cart.counts[itemId] ?? editable.defaultCount) : 0;
  const durationSeconds = getKitDurationSeconds(cart.counts, itemId);
  const outputCount = getKitOutputCount(count, durationSeconds);
  const addOnTotal = CARD_ADD_ONS.reduce(
    (total, addOn) => total + (cart.counts[kitAddOnCountKey(itemId, addOn.id)] ? addOn.price : 0),
    0,
  );
  const oneTimePrice = computeItemPrice(item, count) + addOnTotal;
  const isMonthly = (cadenceDraft ?? getKitCadence(cart.counts, itemId)) === "monthly";
  const price = isMonthly ? monthlyPrice(oneTimePrice) : oneTimePrice;
  const animatedPrice = useCountUp(price, reduce ? 0 : 360);
  const inCart = (cart.selected[itemId] ?? 0) > 0;
  const countLabel =
    lane === "evergreen"
      ? `${5 + count * 5} min`
      : `${outputCount} ${outputCount === 1 ? "video" : "videos"}`;
  const formatLabel =
    lane === "evergreen" ? countLabel : `${outputCount} × ${durationSeconds}-sec videos`;
  const runtimeControlLabel = lane === "evergreen" ? countLabel : `${count} edited min`;

  function setCount(next: number) {
    if (!editable) return;
    cartStore.setCount(itemId, Math.min(editable.max, Math.max(editable.min, next)));
  }

  function addCurrentBuild() {
    cartStore.setCount(kitCadenceCountKey(itemId), isMonthly ? 1 : 0);
    setCadenceDraft(null);
    cartStore.add(itemId);
  }

  function closeCustomizer() {
    if (cadenceDraft) {
      cartStore.setCount(kitCadenceCountKey(itemId), cadenceDraft === "monthly" ? 1 : 0);
      setCadenceDraft(null);
    }
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function toggleAddOn(addOnId: string) {
    if (!inCart) addCurrentBuild();
    const key = kitAddOnCountKey(itemId, addOnId);
    cartStore.setCount(key, cart.counts[key] ? 0 : 1);
  }

  function setDuration(seconds: number) {
    cartStore.setCount(kitDurationCountKey(itemId), seconds);
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (cadenceDraft) {
          cartStore.setCount(kitCadenceCountKey(itemId), cadenceDraft === "monthly" ? 1 : 0);
          setCadenceDraft(null);
        }
        setOpen(false);
        window.requestAnimationFrame(() => triggerRef.current?.focus());
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>("button, a, input")?.focus();
    });
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cadenceDraft, itemId, open]);

  const kitName = {
    reel: "Social video kit",
    spotlight: "Brand film kit",
    system: "Training video kit",
    evergreen: "Long-form video kit",
  }[lane];

  const optionsPanel = editable ? (
    <>
      <div
        className="mb-4 grid grid-cols-2 rounded-2xl bg-[#F1F3F6] p-1"
        role="group"
        aria-label="Booking frequency"
      >
        <button
          type="button"
          onClick={() => setCadenceDraft("one-time")}
          aria-pressed={!isMonthly}
          className={cn(
            "min-h-11 rounded-xl px-3 text-xs font-extrabold transition",
            !isMonthly ? "bg-white shadow-sm" : "text-[#10204A]/55",
          )}
        >
          Single booking
        </button>
        <button
          type="button"
          onClick={() => setCadenceDraft("monthly")}
          aria-pressed={isMonthly}
          className={cn(
            "min-h-11 rounded-xl px-3 text-xs font-extrabold transition",
            isMonthly ? "bg-[#10204A] text-white shadow-sm" : "text-[#10204A]/55",
          )}
        >
          Monthly · save {MONTHLY_DISCOUNT_RATE * 100}%
        </button>
      </div>

      {isMonthly && (
        <div className="mb-4 rounded-2xl border border-system/20 bg-system-soft/70 p-3.5">
          <div className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-system shadow-sm">
              <Sparkles className="size-4" />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-extrabold">Palmer House Studio included</p>
                <span className="rounded-full bg-white px-2 py-1 text-[11px] font-extrabold text-system">
                  $99/mo value
                </span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-[#10204A]/65">
                Automatically included with every monthly video package.
              </p>
            </div>
            <span
              aria-label="Included"
              className="ml-auto grid size-6 shrink-0 place-items-center rounded-full bg-system text-white"
            >
              <Check className="size-3.5" />
            </span>
          </div>
          <div className="mt-3 grid gap-1.5 text-[11px] font-bold text-[#10204A]/75 sm:grid-cols-2">
            {[
              "Brand DNA buildout + Pal guidance",
              "Personalized video roadmap",
              "2 complete campaigns each month",
              "Content calendar, library + help desk",
            ].map((benefit) => (
              <span key={benefit} className="flex items-start gap-1.5">
                <Check className="mt-0.5 size-3 shrink-0 text-system" />
                {benefit}
              </span>
            ))}
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-[#10204A]/50">
            Studio Brand DNA builds your software profile. “Brand Kit Integration” below applies
            that identity to the finished video edits.
          </p>
        </div>
      )}

      {lane !== "evergreen" && (
        <div className="mb-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold">Length per video</p>
              <p className="mt-0.5 text-[11px] text-[#10204A]/60">
                Same runtime, reformatted into the cuts you need.
              </p>
            </div>
            <p className="text-right text-[11px] font-extrabold text-system">{formatLabel}</p>
          </div>
          <div
            className="mt-2 grid grid-cols-3 gap-1.5"
            role="radiogroup"
            aria-label="Length per video"
          >
            {VIDEO_DURATION_OPTIONS.map((seconds) => (
              <button
                key={seconds}
                type="button"
                role="radio"
                aria-checked={durationSeconds === seconds}
                onClick={() => setDuration(seconds)}
                className={cn(
                  "min-h-11 rounded-xl border px-2 text-[11px] font-extrabold transition",
                  durationSeconds === seconds
                    ? "border-[#10204A] bg-[#10204A] text-white"
                    : "border-[#D7DCE6] bg-white text-[#10204A]",
                )}
              >
                {seconds} sec
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-extrabold">
            {lane === "evergreen" ? "Episode length" : "Edited runtime"}
          </p>
          <p className="mt-0.5 text-[11px] leading-snug text-[#10204A]/60">
            {lane === "evergreen"
              ? "Choose a 5, 10, or 15-minute long-form episode."
              : "Each minute is one production credit. Shorter cuts create more deliverables."}
          </p>
        </div>
        <div className="inline-flex shrink-0 items-center rounded-full border border-[#D7DCE6] bg-[#F7F8FA] p-1">
          <motion.button
            type="button"
            whileTap={reduce ? undefined : { scale: 0.9 }}
            onClick={() => setCount(count - editable.step)}
            disabled={count <= editable.min}
            aria-label={`Decrease ${editable.unitLabelPlural}`}
            className="grid size-11 place-items-center rounded-full bg-white shadow-sm disabled:cursor-not-allowed disabled:opacity-25"
          >
            <Minus className="size-4" />
          </motion.button>
          <span className="min-w-[6rem] text-center text-sm font-extrabold" aria-live="polite">
            {runtimeControlLabel}
          </span>
          <motion.button
            type="button"
            whileTap={reduce ? undefined : { scale: 0.9 }}
            onClick={() => setCount(count + editable.step)}
            disabled={count >= editable.max}
            aria-label={`Increase ${editable.unitLabelPlural}`}
            className="grid size-11 place-items-center rounded-full bg-[#10204A] text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-25"
          >
            <Plus className="size-4" />
          </motion.button>
        </div>
      </div>

      <label className="mt-3 block">
        <span className="sr-only">
          {lane === "evergreen" ? "Episode length" : "Edited runtime in minutes"}
        </span>
        <input
          type="range"
          min={editable.min}
          max={editable.max}
          step={editable.step}
          value={count}
          onChange={(event) => setCount(Number(event.target.value))}
          className="h-2 w-full cursor-pointer accent-[#10204A]"
        />
        <span className="mt-1 flex justify-between text-[11px] font-semibold text-[#10204A]/50">
          <span>Minimum {lane === "evergreen" ? "5 min" : `${editable.min} min`}</span>
          <span>{lane === "evergreen" ? "15 min" : `Up to ${editable.max} min`}</span>
        </span>
      </label>

      <div className="mt-4 rounded-2xl border border-[#D7DCE6] bg-[#F8F9FB] p-3.5">
        <p className="text-xs font-extrabold">Every production includes</p>
        <p className="mt-0.5 text-[11px] text-[#10204A]/50">
          Included with single bookings and monthly packages.
        </p>
        <div className="mt-3 grid gap-x-3 gap-y-2 sm:grid-cols-2">
          {EVERY_PRODUCTION_INCLUDES.map((benefit) => (
            <span
              key={benefit}
              className="flex items-start gap-1.5 text-[11px] font-bold leading-snug text-[#10204A]/75"
            >
              <Check className="mt-0.5 size-3 shrink-0 text-evergreen" />
              {benefit}
            </span>
          ))}
        </div>
      </div>

      <div className="my-3 h-px bg-[#E2E5EB]" />
      <p className="text-xs font-extrabold">Add to this kit</p>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {CARD_ADD_ONS.map((addOn) => {
          const selected = Boolean(cart.counts[kitAddOnCountKey(itemId, addOn.id)]);
          return (
            <motion.button
              key={addOn.id}
              type="button"
              whileTap={reduce ? undefined : { scale: 0.97 }}
              onClick={() => toggleAddOn(addOn.id)}
              aria-pressed={selected}
              className={cn(
                "flex min-h-12 items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left text-[11px] font-bold transition-colors",
                selected
                  ? "border-[#10204A] bg-[#10204A] text-white"
                  : "border-[#D7DCE6] bg-white text-[#10204A] hover:bg-[#F7F8FA]",
              )}
            >
              <span className="leading-tight">
                {addOn.id === "brand-kit"
                  ? "Apply Brand Kit to edits"
                  : addOn.name.replace(" Pack", "").replace(" Set", "")}
              </span>
              <span className="shrink-0 opacity-65">
                {selected ? "✓" : `+$${addOn.price.toLocaleString()}`}
              </span>
            </motion.button>
          );
        })}
      </div>
    </>
  ) : null;

  return (
    <div className="kit-cart-cluster relative w-full max-w-[30rem] rounded-[18px] bg-white/95 p-3 text-[#10204A] shadow-[0_12px_30px_-20px_rgb(16_32_74_/_0.7)]">
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="mr-1 min-w-[5.5rem]">
          <p
            aria-label={`Current estimate $${price.toLocaleString()}`}
            aria-live="polite"
            className="tabular-nums text-xl font-extrabold leading-none sm:text-2xl"
          >
            ${Math.round(animatedPrice).toLocaleString()}
            {isMonthly && <span className="ml-1 text-[11px] font-bold text-[#10204A]/55">/mo</span>}
          </p>
          <p className="mt-1.5 text-[11px] font-bold leading-none text-[#10204A]/60">
            {formatLabel} · {isMonthly ? "monthly" : "single booking"}
          </p>
          {isMonthly && (
            <p className="mt-1 text-[11px] font-bold leading-none text-system">
              Save ${(oneTimePrice - price).toLocaleString()} · was ${oneTimePrice.toLocaleString()}
            </p>
          )}
        </div>
        {inCart ? (
          <Link
            to="/checkout"
            className="kit-cart-button inline-flex min-h-11 items-center gap-1.5 rounded-full bg-system-soft px-3 text-[11px] font-bold text-system"
          >
            <Check className="size-3.5" /> <span className="kit-cart-label">In cart</span>
          </Link>
        ) : (
          <button
            type="button"
            onClick={addCurrentBuild}
            className="kit-cart-button inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[#10204A] px-3 text-[11px] font-bold text-white"
          >
            <ShoppingCart className="size-3.5" />{" "}
            <span className="kit-cart-label">Add to cart</span>
          </button>
        )}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-[#D7DCE6] bg-white px-3 text-[11px] font-bold"
        >
          <Settings2 className="size-3.5" /> Customize
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
          >
            <ChevronDown className="size-3.5" />
          </motion.span>
        </button>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          open ? (
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6">
              <button
                type="button"
                onClick={closeCustomizer}
                aria-label="Close customization"
                className="absolute inset-0 z-0 bg-[#10204A]/35 backdrop-blur-[7px]"
              />
              <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`kit-customizer-${itemId}`}
                className="relative z-10 max-h-[calc(100dvh-1.5rem)] w-full max-w-[34rem] overflow-y-auto rounded-[28px] border border-white/70 bg-white p-4 text-[#10204A] shadow-[0_35px_100px_-30px_rgb(16_32_74_/_0.8)] sm:max-h-[calc(100dvh-3rem)] sm:p-6"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#10204A]/50">
                      Customize
                    </p>
                    <h3
                      id={`kit-customizer-${itemId}`}
                      className="mt-1 text-xl font-extrabold tracking-[-0.035em]"
                    >
                      {kitName}
                    </h3>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="tabular-nums text-2xl font-extrabold">
                      ${Math.round(animatedPrice).toLocaleString()}
                      {isMonthly && (
                        <span className="ml-1 text-xs font-bold text-[#10204A]/50">/mo</span>
                      )}
                    </p>
                    <p className="text-[11px] font-semibold text-[#10204A]/50">
                      {isMonthly
                        ? `Save $${(oneTimePrice - price).toLocaleString()}`
                        : "Live estimate"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeCustomizer}
                    aria-label="Exit customizer"
                    className="grid size-11 shrink-0 place-items-center rounded-full border border-[#D7DCE6] bg-white transition hover:bg-[#F1F3F6]"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                {optionsPanel}

                <div className="sticky -bottom-4 -mx-4 mt-5 flex gap-2 border-t border-[#E2E5EB] bg-white/95 px-4 pb-1 pt-4 backdrop-blur sm:-bottom-6 sm:-mx-6 sm:px-6">
                  {inCart ? (
                    <Link
                      to="/checkout"
                      className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-system-soft px-5 text-sm font-bold text-system"
                    >
                      <Check className="size-4" /> Review cart
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={addCurrentBuild}
                      className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#10204A] px-5 text-sm font-bold text-white"
                    >
                      <ShoppingCart className="size-4" /> Add this build
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={closeCustomizer}
                    className="inline-flex min-h-12 items-center gap-1.5 rounded-full border border-[#D7DCE6] px-4 text-sm font-bold"
                  >
                    <ChevronDown className="size-4" /> Minimize
                  </button>
                </div>
              </div>
            </div>
          ) : null,
          document.body,
        )}
    </div>
  );
}

const METRICS = [
  { tone: "bg-[#E7C1D3]", label: "Shoot day", value: "1", width: 84, height: 120, img: ryderShot },
  { tone: "bg-[#A4DAC2]", label: "Formats", value: "6+", width: 96, height: 132 },
  { tone: "bg-[#92BDF5]", label: "Pals", value: "8", width: 108, height: 148, img: kianaShot },
  { tone: "bg-[#EFDA69]", label: "Cities", value: "4", width: 84, height: 120 },
  { tone: "bg-[#10204A] text-white", label: "Rating", value: "5.0", width: 96, height: 136 },
];

export function HomeLandingExtras() {
  return (
    <>
      <PackageShelf embedded />
      <PriorityBanner />
      <BentoStage />
      <StudioStage />
      <ArticleStage />
      <MedicareFooter />
    </>
  );
}

export function PackageShelf({ embedded = false }: { embedded?: boolean }) {
  return (
    <div className={cn(!embedded && "mx-auto my-20 max-w-[1280px] px-4 sm:my-28 sm:px-6 lg:px-8")}>
      <section className="overflow-hidden rounded-[40px] border border-border bg-background px-5 py-10 text-ink sm:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-[clamp(1.9rem,3.8vw,3rem)] font-extrabold tracking-[-0.05em]">
            Frequently booked shoots
          </h2>
          <Link
            to="/shop"
            className="hidden min-h-11 shrink-0 items-center text-[11px] font-bold uppercase tracking-[0.18em] text-spotlight sm:inline-flex"
          >
            View all packages →
          </Link>
        </div>
        <div className="grid gap-4 lg:h-[28rem] lg:grid-cols-[1.06fr_0.94fr] xl:h-[30rem]">
          <ProblemCard card={PROBLEMS[0]} delay={0} featured />
          <div className="grid min-h-0 grid-rows-2 gap-4">
            {PROBLEMS.slice(1).map((card, index) => (
              <ProblemCard key={card.title} card={card} delay={(index + 1) * 0.08} />
            ))}
          </div>
        </div>

        <div className="mb-5 mt-10 flex items-end justify-between gap-4">
          <h2 className="text-[clamp(1.65rem,3.2vw,2.5rem)] font-extrabold tracking-[-0.045em]">
            Popular starting packages
          </h2>
          <Link
            to="/shop"
            className="hidden min-h-11 shrink-0 items-center text-[11px] font-bold uppercase tracking-[0.18em] text-spotlight sm:inline-flex"
          >
            Browse all packages →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DEALS.map((deal, index) => (
            <DealCard key={deal.id} deal={deal} delay={index * 0.07} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProblemCard({
  card,
  delay,
  featured = false,
}: {
  card: (typeof PROBLEMS)[number];
  delay: number;
  featured?: boolean;
}) {
  const reduce = useHydratedReducedMotion();

  return (
    <InView delay={delay} className="h-full min-h-0">
      <motion.article
        whileHover={reduce ? undefined : { y: -6, scale: 1.008 }}
        transition={spring}
        className={cn(
          "group relative h-full min-h-[18rem] overflow-hidden rounded-[26px] text-ink sm:min-h-[19rem] lg:min-h-0",
          featured && "lg:min-h-0",
          card.tone,
        )}
      >
        <img
          src={card.pal}
          alt={`${card.name} demonstrating ${card.title.toLowerCase()}`}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 size-full object-cover object-right transition duration-700 group-hover:scale-[1.025]"
        />
        <div
          className={cn(
            "relative z-10 flex h-full max-w-[46%] flex-col p-5 pb-28 sm:p-6 sm:pb-28 lg:p-5 lg:pb-28",
            featured && "max-w-[42%] sm:p-7 sm:pb-28 lg:p-7 lg:pb-28",
          )}
        >
          <span className="inline-flex w-fit rounded-lg bg-ink/10 px-2 py-1 text-[11px] font-bold sm:text-xs">
            {card.category}
          </span>
          <p className="mt-2 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-ink/55">
            {card.badge}
          </p>
          <Link to={card.href} className="w-fit">
            <h3
              className={cn(
                "mt-2 text-[1.2rem] font-extrabold leading-[1.02] tracking-[-0.045em] hover:underline sm:mt-3 sm:text-[1.35rem]",
                featured && "sm:text-[2rem]",
              )}
            >
              {card.title}
            </h3>
          </Link>
          <p
            className={cn(
              "mt-2 text-[11px] leading-relaxed text-ink/65 sm:text-sm",
              !featured && "lg:hidden",
            )}
          >
            {card.copy}
          </p>
        </div>

        <div className="absolute inset-x-4 bottom-4 z-20 sm:inset-x-5">
          <KitControls itemId={card.id} />
        </div>
      </motion.article>
    </InView>
  );
}

function DealCard({ deal, delay }: { deal: (typeof DEALS)[number]; delay: number }) {
  const reduce = useHydratedReducedMotion();

  return (
    <InView delay={delay}>
      <motion.article
        whileHover={reduce ? undefined : { y: -8 }}
        transition={spring}
        className="group h-full rounded-[24px] border border-border bg-white p-3 text-ink shadow-soft"
      >
        <div className="relative aspect-video overflow-hidden rounded-[18px] bg-cream">
          <span
            className={cn(
              "absolute left-3 top-3 z-10 rounded-md bg-white/95 px-2 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em]",
              !reduce && "group-hover:medicare-wiggle",
            )}
          >
            {deal.scope}
          </span>
          <img
            src={deal.img}
            alt={`${deal.title} illustrated by ${deal.cat}`}
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition duration-700 group-hover:scale-[1.035]"
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>{deal.cat}</span>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em]">
            Working estimate
          </span>
        </div>
        <h3 className="mt-1 text-base font-extrabold leading-tight tracking-[-0.03em]">
          {deal.title}
        </h3>
        <div className="mt-3">
          <KitControls itemId={deal.id} />
        </div>
      </motion.article>
    </InView>
  );
}

function PriorityBanner() {
  const reduce = useHydratedReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { margin: "240px 0px" });
  const isPageInView = usePageInView();
  const active = !reduce && isInView && isPageInView;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!active) {
      video.pause();
      video.removeAttribute("src");
      video.load();
      return;
    }
    void video.play().catch(() => {
      // Muted inline playback can be delayed until the browser has decoded a frame.
    });
  }, [active]);

  return (
    <InView className="relative overflow-hidden rounded-[32px] text-white">
      <img
        src={farmersMarketPoster}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full scale-110 object-cover opacity-80 blur-xl"
      />
      <video
        ref={videoRef}
        src={active ? farmersMarket : undefined}
        poster={farmersMarketPoster}
        muted
        loop
        playsInline
        preload={active ? "auto" : "none"}
        aria-label="Community event video showing a Palmer House production"
        className="relative h-[320px] w-full object-contain sm:h-[380px]"
      />
      <div className="absolute inset-0 bg-[#10204A]/55" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <span className="rounded-full bg-white/15 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]">
          Video systems
        </span>
        <p className="mt-4 text-[clamp(1.8rem,5vw,3.4rem)] font-extrabold leading-[1.05] tracking-[-0.045em]">
          Your video is our <span className="text-[#F5D76E]">Top priority</span>
          <Link
            to="/contact"
            aria-label="Book a consultation"
            className="ml-3 inline-grid size-11 translate-y-1 place-items-center rounded-full bg-[#F5D76E] text-[#10204A] transition hover:translate-x-0.5"
          >
            <ArrowUpRight className="size-5" />
          </Link>
        </p>
      </div>
    </InView>
  );
}

function BentoStage() {
  const reduce = useHydratedReducedMotion();
  return (
    <section className="rounded-[28px] bg-white px-4 py-10 sm:rounded-[36px] sm:px-8 sm:py-14">
      <div className="grid gap-4 lg:grid-cols-2">
        <InView>
          <motion.article
            whileHover={reduce ? undefined : { y: -8 }}
            transition={spring}
            className="relative min-h-[280px] overflow-hidden rounded-[32px] bg-[#EFDA69] p-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#10204A]">
              <i className="size-2 rounded-full bg-[#E23B3B]" /> Podcast
            </span>
            <h3 className="mt-5 max-w-sm text-3xl font-extrabold tracking-[-0.04em] text-[#10204A]">
              Authority that keeps working
            </h3>
            <p className="mt-3 max-w-sm text-sm text-[#10204A]/70">
              Clara builds the pieces you are tired of explaining. Teach it once. Let it earn.
            </p>
            <Link
              to="/evergreen-pal"
              aria-label="Play Evergreen Pal overview"
              className="mt-8 grid size-12 place-items-center rounded-full bg-white text-[#10204A] transition hover:scale-105"
            >
              <Play className="size-5 fill-current" />
            </Link>
            <svg
              viewBox="0 0 160 160"
              className="pointer-events-none absolute -bottom-4 right-2 h-40 w-40 text-[#10204A]/50"
              fill="none"
              aria-hidden
            >
              <rect
                x="38"
                y="28"
                width="84"
                height="64"
                rx="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                d="M70 50l28 16-28 16V50z"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M48 108h64M56 122h48"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </motion.article>
        </InView>

        <div className="grid gap-4">
          <InView delay={0.08}>
            <motion.article
              whileHover={reduce ? undefined : { y: -8 }}
              transition={spring}
              className="relative overflow-hidden rounded-[32px] bg-[#2F4E9A] p-6 text-white"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                <i className="size-2 rounded-full bg-[#E23B3B]" /> Live event
              </span>
              <h3 className="mt-4 text-2xl font-extrabold tracking-[-0.04em]">
                Free webinar: build a video system
              </h3>
              <p className="mt-8 text-sm text-white/70">Next session · Book a seat</p>
              <Link
                to="/webinar"
                className="absolute right-6 top-6 text-sm font-bold underline-offset-4 hover:underline"
              >
                Join →
              </Link>
              <img
                src={kiana}
                alt=""
                loading="lazy"
                decoding="async"
                className="pointer-events-none absolute -bottom-10 right-4 h-32 object-contain opacity-80"
              />
            </motion.article>
          </InView>
          <div className="grid grid-cols-2 gap-4">
            <InView delay={0.12}>
              <motion.article
                whileHover={reduce ? undefined : { y: -8 }}
                transition={spring}
                className="relative overflow-hidden rounded-[28px] bg-[#A4DAC2] p-5 text-[#10204A]"
              >
                <svg
                  viewBox="0 0 80 80"
                  className="absolute right-3 top-3 h-16 w-16 text-[#10204A]/20"
                  fill="none"
                  aria-hidden
                >
                  <circle cx="40" cy="28" r="10" stroke="currentColor" strokeWidth="3" />
                  <path
                    d="M18 68c4-18 12-26 22-26s18 8 22 26"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
                <p className="text-5xl font-extrabold tracking-[-0.06em]">
                  <Count to={7} suffix="" />
                </p>
                <p className="mt-1 font-semibold">Years in the PNW</p>
              </motion.article>
            </InView>
            <InView delay={0.16}>
              <motion.article
                whileHover={reduce ? undefined : { y: -8 }}
                transition={spring}
                className="relative overflow-hidden rounded-[28px] bg-[#E7C1D3] p-5 text-[#10204A]"
              >
                <svg
                  viewBox="0 0 80 80"
                  className="absolute right-3 top-3 h-16 w-16 text-[#10204A]/20"
                  fill="none"
                  aria-hidden
                >
                  <path d="M22 52l18-28 18 28H22z" stroke="currentColor" strokeWidth="3" />
                  <circle cx="40" cy="48" r="6" stroke="currentColor" strokeWidth="3" />
                </svg>
                <p className="text-5xl font-extrabold tracking-[-0.06em]">5.0</p>
                <p className="mt-1 font-semibold">Client rating</p>
              </motion.article>
            </InView>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-[#10204A] sm:text-3xl">
          PNW businesses have left us 47+ five-star reviews.
        </h3>
        <p className="mt-3 text-lg tracking-[0.2em] text-[#22C55A]">★★★★★</p>
        <p className="mt-1 text-sm text-[#8A93A6]">Average Google rating is 5.0</p>
      </div>
    </section>
  );
}

function StudioStage() {
  const reduce = useHydratedReducedMotion();
  const [active, setActive] = useState(3);

  return (
    <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
      <InView>
        <motion.article
          whileHover={reduce ? undefined : { y: -6 }}
          transition={spring}
          className="relative min-h-[420px] overflow-hidden rounded-[32px] bg-[#EFDA69] p-6"
        >
          <BrandMark className="size-10" />
          <div className="relative mx-auto mt-6 w-[min(100%,280px)]">
            <div className="rounded-[2rem] border-8 border-[#10204A] bg-white p-3 shadow-[0_30px_60px_-24px_rgba(16,32,74,0.45)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8A93A6]">
                Palmer House Studio
              </p>
              <p className="mt-2 text-lg font-extrabold text-[#10204A]">Your next useful video</p>
              <div className="mt-3 flex gap-2 overflow-hidden">
                {[ryderShot, kianaShot, silasShot, claraShot].map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="size-12 rounded-2xl object-cover"
                  />
                ))}
              </div>
              <div className="mt-3 rounded-2xl bg-[#10204A] px-3 py-2 text-xs font-bold text-white">
                Open Studio
              </div>
            </div>
            <div className="absolute -right-6 top-16 w-40 rounded-2xl bg-white p-3 shadow-soft">
              <img
                src={kianaShot}
                alt=""
                loading="lazy"
                decoding="async"
                className="size-8 rounded-full object-cover"
              />
              <p className="mt-1 text-xs font-bold text-[#10204A]">Kiana · Spotlight</p>
              <p className="text-[11px] text-[#8A93A6]">Build trust first</p>
            </div>
          </div>
        </motion.article>
      </InView>

      <InView delay={0.1}>
        <article className="flex h-full flex-col justify-between rounded-[32px] bg-[#EEF2F7] p-6 sm:p-8">
          <div className="relative mx-auto h-48 w-full max-w-[380px]">
            {METRICS.map((metric, index) => {
              const offset = index - 2;
              return (
                <motion.button
                  key={metric.label}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onClick={() => setActive(index)}
                  aria-pressed={active === index}
                  aria-label={`${metric.label}: ${metric.value}`}
                  animate={{
                    x: offset * 56,
                    rotate: offset * 8,
                    y: !reduce && active === index ? -14 : 0,
                    zIndex: active === index ? 8 : index,
                  }}
                  whileHover={reduce ? undefined : { y: -18, scale: 1.04 }}
                  transition={spring}
                  className={cn(
                    "absolute left-1/2 top-2 overflow-hidden rounded-[22px] px-1.5 pt-3 text-center",
                    metric.tone,
                  )}
                  style={{
                    width: metric.width,
                    height: metric.height,
                    marginLeft: -metric.width / 2,
                  }}
                >
                  {"img" in metric && metric.img ? (
                    <img
                      src={metric.img}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="mx-auto mb-1 size-8 rounded-full object-cover"
                    />
                  ) : null}
                  <p className="text-lg font-extrabold">{metric.value}</p>
                  <p className="mt-1 text-[11px] font-semibold leading-tight">{metric.label}</p>
                </motion.button>
              );
            })}
          </div>
          <div className="mt-8">
            <h3 className="text-3xl font-extrabold tracking-[-0.04em] text-[#10204A]">
              Open Palmer House Studio for easy access.
            </h3>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/studio"
                className="inline-flex min-h-11 items-center rounded-full bg-[#10204A] px-5 text-sm font-bold text-white transition hover:scale-[1.03]"
              >
                Enter Studio
              </Link>
              <Link
                to="/membership"
                className="inline-flex min-h-11 items-center rounded-full border border-[#10204A] px-5 text-sm font-bold text-[#10204A]"
              >
                See membership
              </Link>
            </div>
          </div>
        </article>
      </InView>
    </section>
  );
}

function ArticleStage() {
  const reduce = useHydratedReducedMotion();
  const posts = [
    {
      tag: "Strategy",
      title: "The video content system toolkit for founders",
      slug: "video-content-toolkit-2025",
      tone: "bg-[#EEF2F7]",
      pal: silas,
    },
    {
      tag: "Healthy cadence",
      title: "How to build a scalable video training library",
      slug: "build-video-training-library",
      tone: "bg-[#A4DAC2]",
      pal: samira,
    },
  ] as const;

  return (
    <section className="rounded-[28px] bg-white px-4 py-10 sm:rounded-[36px] sm:px-8 sm:py-12">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-extrabold tracking-[-0.04em] text-[#10204A]">
          Read top articles from the Pals
        </h2>
        <Link
          to="/blog"
          className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#10204A]"
        >
          Read all blogs →
        </Link>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {posts.map((post, index) => (
          <InView key={post.slug} delay={index * 0.08}>
            <Link to="/blog/$slug" params={{ slug: post.slug }}>
              <motion.article
                whileHover={reduce ? undefined : { y: -10 }}
                transition={spring}
                className={cn(
                  "relative min-h-[220px] overflow-hidden rounded-[28px] p-6",
                  post.tone,
                )}
              >
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#10204A]">
                  {post.tag}
                </span>
                <h3 className="mt-4 max-w-sm text-2xl font-extrabold tracking-[-0.04em] text-[#10204A]">
                  {post.title}
                </h3>
                <img
                  src={post.pal}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="pointer-events-none absolute -bottom-8 right-2 h-40 object-contain transition duration-500 group-hover:-translate-y-2 motion-reduce:transition-none"
                />
              </motion.article>
            </Link>
          </InView>
        ))}
      </div>
    </section>
  );
}

function MedicareFooter() {
  return (
    <footer className="overflow-hidden rounded-[40px] bg-[#0D1130] p-3 sm:p-4">
      <div className="rounded-[28px] bg-white px-6 py-10 sm:rounded-[32px] sm:px-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((col) => (
            <div key={col.label}>
              <p className="font-extrabold text-[#10204A]">{col.label}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-[#4B5568] transition hover:text-[#10204A]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 text-xs font-bold text-[#10204A]">
            {locations.map((loc) => (
              <Link key={loc.to} to={loc.to} className="rounded-full bg-[#EEF2F7] px-3 py-1.5">
                {loc.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-2">
            {socials.slice(0, 3).map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="grid size-11 place-items-center rounded-full bg-[#EEF2F7] text-xs font-bold text-[#10204A] transition hover:bg-[#10204A] hover:text-white"
              >
                {social.label[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-4 rounded-[28px] bg-[#E7C1D3] px-6 py-16 sm:rounded-[32px] sm:px-10 sm:py-20">
        <BrandMark className="size-16 sm:size-20" />
        <p className="font-extrabold tracking-[-0.05em] text-[#10204A] text-[clamp(2.4rem,8vw,7rem)]">
          Palmer House
        </p>
      </div>
      <div className="flex flex-wrap justify-between gap-2 px-6 py-4 text-xs text-white/70 sm:px-10">
        <p>© {new Date().getFullYear()} Palmer House Productions</p>
        <p>Pacific Northwest video systems</p>
      </div>
    </footer>
  );
}
