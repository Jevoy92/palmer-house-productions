import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, Search, ShoppingBag, Sparkles, Tag, UserRound, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { exploreLinks, palLinks, serviceLinks, startHereLinks, type NavLink } from "@/data/nav";
import { useHydratedReducedMotion } from "@/hooks/use-hydrated-reduced-motion";
import { cartItemCount, useCart } from "@/lib/cart-store";
import phMark from "@/assets/php-mark-108.webp";

function BrandFace() {
  return (
    <span className="grid size-9 shrink-0 place-items-center text-ink" aria-hidden="true">
      <svg viewBox="0 0 44 40" className="size-9" fill="none">
        <path d="M1 15.5 12 20 1 24.5v-9Z" fill="currentColor" />
        <path
          d="M15 33V7h8.5a8 8 0 0 1 0 16H19m0-4h4.5a4 4 0 0 0 0-8H19v22"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29 17v16m0-8h12m0-8v16"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function Dropdown({
  label,
  items,
  badge,
  compact = false,
}: {
  label: string;
  items: NavLink[];
  badge?: string;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const suppressFocusOpenRef = useRef(false);
  const menuId = useId();

  useEffect(() => {
    const closeOnPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        event.preventDefault();
        if (document.activeElement !== triggerRef.current) {
          suppressFocusOpenRef.current = true;
          triggerRef.current?.focus();
        }
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOnPointerDown);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnPointerDown);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        if (!rootRef.current?.contains(document.activeElement)) setOpen(false);
      }}
      onFocusCapture={() => {
        if (suppressFocusOpenRef.current) {
          suppressFocusOpenRef.current = false;
          return;
        }
        setOpen(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={`relative flex min-h-11 items-center gap-1 rounded-full font-medium transition-colors hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none ${
          compact
            ? "px-2 text-xs text-muted-foreground xl:px-3 xl:text-sm"
            : "px-2 text-xs xl:px-3.5 xl:text-sm"
        }`}
      >
        {label}{" "}
        <ChevronDown
          className={`size-3.5 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
        {badge && (
          <span className="absolute -right-1 -top-1 rotate-3 rounded-full bg-reel px-1.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-ink shadow-sm">
            {badge}
          </span>
        )}
      </button>
      <div
        id={menuId}
        hidden={!open}
        className="absolute left-0 top-[calc(100%+.55rem)] z-[70] w-72 rounded-[1.5rem] border border-border bg-white p-2 shadow-soft"
      >
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group/item flex items-center justify-between gap-3 rounded-[1.1rem] px-4 py-3 transition-colors hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none"
            activeProps={{
              className:
                "flex items-center justify-between gap-3 rounded-[1.1rem] bg-secondary px-4 py-3",
            }}
          >
            <span>
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                {item.label}
                {item.badge && (
                  <span className="rounded-full bg-reel-soft px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-reel-text">
                    {item.badge}
                  </span>
                )}
              </span>
              {item.description && (
                <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
                  {item.description}
                </span>
              )}
            </span>
            <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors group-hover/item:bg-ink group-hover/item:text-white">
              <ChevronDown className="size-3 -rotate-90" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduce = useHydratedReducedMotion();
  const cart = useCart();
  const cartCount = cartItemCount(cart);
  const closeMenuAndRestoreFocus = useCallback(() => {
    setOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1120px)");
    const closeAtDesktop = () => {
      if (desktop.matches) setOpen(false);
    };

    desktop.addEventListener("change", closeAtDesktop);
    return () => desktop.removeEventListener("change", closeAtDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenuAndRestoreFocus();
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

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>("input, a, button")?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeMenuAndRestoreFocus, open]);

  return (
    <>
      <motion.header
        initial={reduce ? false : { opacity: 0, transform: "translateY(-14px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-[80] px-3 pt-3 sm:px-5"
      >
        <nav
          className="mx-auto flex max-w-7xl items-center gap-2 rounded-full border border-border/80 bg-white/95 p-2 shadow-soft"
          aria-label="Primary"
        >
          <Link
            to="/"
            className="flex min-h-11 min-w-0 shrink-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotlight/40"
          >
            {logoFailed ? (
              <BrandFace />
            ) : (
              <img
                src={phMark}
                alt="Palmer House Productions"
                width={36}
                height={36}
                className="size-9 shrink-0 object-contain"
                loading="eager"
                decoding="async"
                onError={() => setLogoFailed(true)}
              />
            )}
            <span className="hidden pr-2 text-xs font-bold leading-tight sm:block sm:text-sm min-[1120px]:hidden xl:block">
              Palmer House
              <span className="block font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Productions
              </span>
            </span>
          </Link>

          <div className="ml-1 hidden border-l border-border pl-1 min-[1120px]:block">
            <Dropdown label="Start here" items={startHereLinks} compact />
          </div>

          <form
            action="/shop"
            method="get"
            role="search"
            className="relative ml-1 hidden h-11 w-40 shrink items-center xl:flex 2xl:w-56"
          >
            <Search
              className="pointer-events-none absolute left-3.5 size-3.5 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              name="q"
              placeholder="Search packages"
              aria-label="Search video packages"
              className="size-full rounded-full border border-border bg-mist py-2 pl-9 pr-3 text-xs font-medium text-ink outline-none transition-colors placeholder:text-muted-foreground focus:border-system focus:bg-white"
            />
          </form>

          <div className="ml-auto hidden items-center min-[1120px]:flex">
            <Dropdown label="Services" items={serviceLinks} badge="New" />
            <Dropdown label="Pals" items={palLinks} />
            <Link
              to="/work"
              className="flex min-h-11 items-center rounded-full px-2 text-xs font-medium transition-colors hover:bg-secondary xl:px-3 xl:text-sm"
            >
              Work
            </Link>
            <Dropdown label="Explore" items={exploreLinks} />
            <Link
              to="/offers"
              aria-label="Offers"
              className="ml-1 flex min-h-11 items-center gap-1 rounded-full bg-reel-soft px-2.5 text-xs font-semibold text-reel-text transition-colors hover:bg-reel hover:text-ink xl:gap-1.5 xl:px-3.5 xl:text-sm"
            >
              <Tag className="size-3.5" />
              <span className="hidden xl:inline">Offers</span>
            </Link>
            <Link
              to="/studio"
              aria-label="Login"
              className="ml-1 flex min-h-11 items-center gap-1 rounded-full px-2 text-xs font-medium transition-colors hover:bg-system-soft hover:text-system-text xl:gap-1.5 xl:px-3 xl:text-sm"
            >
              <UserRound className="size-3.5" />
              <span className="hidden xl:inline">Login</span>
            </Link>
            <Link
              to="/checkout"
              aria-label={`Review cart with ${cartCount} item${cartCount === 1 ? "" : "s"}`}
              className="relative ml-1 grid size-11 place-items-center rounded-full border border-border bg-white transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              <ShoppingBag className="size-4" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={reduce ? false : { scale: 0.65 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-reel px-1 font-mono text-[11px] font-bold text-ink"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
            <Link
              to="/contact"
              className="ml-1 flex min-h-11 items-center gap-1 rounded-full bg-ink px-3 text-xs font-semibold text-white transition-transform hover:scale-[1.03] xl:gap-1.5 xl:px-4 xl:text-sm"
            >
              <Sparkles className="size-3.5" />
              <span className="xl:hidden">Start</span>
              <span className="hidden xl:inline">Get started</span>
            </Link>
          </div>

          <Link
            to="/checkout"
            aria-label={`Review cart with ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            className="relative ml-auto grid size-11 place-items-center rounded-full border border-border bg-white min-[1120px]:hidden"
          >
            <ShoppingBag className="size-4" />
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={reduce ? false : { scale: 0.65 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-reel px-1 font-mono text-[11px] font-bold text-ink"
              >
                {cartCount}
              </motion.span>
            )}
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="ml-1 grid size-11 place-items-center rounded-full border border-border bg-white min-[1120px]:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </motion.header>

      <div className="h-[4.9rem]" aria-hidden="true" />

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.1 : 0.2 }}
            className="fixed inset-0 z-[70] bg-ink/20 p-3 pt-[5.4rem] min-[1120px]:hidden"
            onClick={closeMenuAndRestoreFocus}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-12px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-12px)" }}
              transition={{ duration: reduce ? 0.1 : 0.25, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="h-full overflow-y-auto rounded-[2rem] border border-border bg-white p-6 shadow-soft"
            >
              <motion.form
                action="/shop"
                method="get"
                role="search"
                initial={reduce ? false : { opacity: 0, transform: "translateY(10px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                onSubmit={() => setOpen(false)}
                className="relative mb-5"
              >
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <input
                  type="search"
                  name="q"
                  placeholder="Search video packages"
                  aria-label="Search video packages"
                  className="h-13 w-full rounded-full border border-border bg-mist py-3 pl-11 pr-4 text-sm font-medium outline-none focus:border-system focus:bg-white"
                />
              </motion.form>
              <MobileGroup
                label="Start here"
                items={startHereLinks}
                close={() => setOpen(false)}
                delay={0}
              />
              <MobileGroup
                label="Services"
                items={serviceLinks}
                close={() => setOpen(false)}
                delay={0.03}
              />
              <MobileGroup
                label="Meet the Pals"
                items={palLinks}
                close={() => setOpen(false)}
                delay={0.06}
              />
              <MobileGroup
                label="Explore"
                items={exploreLinks}
                close={() => setOpen(false)}
                delay={0.09}
              />
              <motion.div
                initial={reduce ? false : { opacity: 0, transform: "translateY(12px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ delay: 0.14 }}
                className="mt-8 grid gap-3 sm:grid-cols-2"
              >
                <Link
                  to="/offers"
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-reel-soft px-5 text-sm font-semibold text-reel-text"
                >
                  <Tag className="size-4" /> Offers
                </Link>
                <Link
                  to="/studio"
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-border px-5 text-sm font-semibold"
                >
                  <UserRound className="size-4" /> Login
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-spotlight px-5 text-sm font-semibold text-white sm:col-span-2"
                >
                  <Sparkles className="size-4" /> Book a Discovery Call
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileGroup({
  label,
  items,
  close,
  delay,
}: {
  label: string;
  items: NavLink[];
  close: () => void;
  delay: number;
}) {
  const reduce = useHydratedReducedMotion();
  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, transform: "translateY(14px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      transition={{ delay: reduce ? 0 : delay, duration: reduce ? 0 : 0.25 }}
      className="border-b border-border py-5 first:pt-0"
    >
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-2 grid sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={close}
            className="flex min-h-11 items-center text-lg font-semibold"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </motion.section>
  );
}
