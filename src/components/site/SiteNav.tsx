import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useSiteMotion } from "./site-motion";
import phMark from "@/assets/php-mark-108.webp";
import { cartItemCount, useCart } from "@/lib/cart-store";

const services = [
  { label: "Video Production", to: "/services/video-production" },
  { label: "Post-Production", to: "/services/post-production" },
  { label: "Content Strategy", to: "/content-strategy" },
  { label: "Production Pricing", to: "/production-pricing" },
  { label: "Shop Packages", to: "/shop" },
];

const pals = [
  { label: "Meet All the Pals", to: "/pals" },
  { label: "Find Your Pal", to: "/find-your-pal" },
  { label: "Spotlight Pal", to: "/spotlight-pal" },
  { label: "Reel Pal", to: "/reel-pal" },
  { label: "Evergreen Pal", to: "/evergreen-pal" },
  { label: "System Pal", to: "/system-pal" },
];

const more = [
  { label: "About Palmer House", to: "/about-us" },
  { label: "Production Guide", to: "/production-guide" },
  { label: "Blog & Insights", to: "/blog" },
  { label: "Client Reviews", to: "/resources/reviews" },
  { label: "Locations", to: "/locations/seattle-wa" },
  { label: "FAQ", to: "/faq" },
  { label: "Selected Work", to: "/work" },
  { label: "Games & Tools", to: "/games" },
  { label: "Membership", to: "/membership" },
  { label: "Our View on AI", to: "/ai-pov" },
];

type NavItem = { label: string; to: string };

function BrandFace() {
  return (
    <span
      className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-white shadow-soft"
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 40" className="size-7" fill="none">
        <circle cx="14" cy="17" r="2.2" fill="#1F2328" />
        <circle cx="26" cy="17" r="2.2" fill="#1F2328" />
        <path d="M13 25c4 3 10 3 14 0" stroke="#1F2328" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Dropdown({ label, items }: { label: string; items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setOpen(true);
      }}
      onPointerLeave={() => {
        if (!rootRef.current?.contains(document.activeElement)) setOpen(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-11 items-center gap-1 rounded-full px-3.5 text-sm font-medium transition-colors hover:bg-secondary focus-visible:bg-secondary"
      >
        {label}{" "}
        <ChevronDown
          className={`size-3.5 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <div id={panelId} hidden={!open} className="absolute left-0 top-full w-60 pt-2">
        <div className="rounded-3xl border border-border bg-white p-2 shadow-soft">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:bg-secondary focus-visible:text-foreground"
              activeProps={{
                className:
                  "block rounded-2xl bg-secondary px-4 py-3 text-sm font-semibold text-foreground",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { enter, exit, transition } = useSiteMotion();
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  const cart = useCart();
  const cartCount = cartItemCount(cart);

  return (
    <>
      <motion.header
        initial={enter}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={transition}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
      >
        <nav
          className="mx-auto flex max-w-6xl items-center gap-2 rounded-full border border-border/80 bg-white/90 p-2 shadow-soft backdrop-blur-xl"
          aria-label="Primary"
        >
          <Link
            to="/"
            className="flex min-h-11 min-w-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotlight/40"
          >
            <img
              src={phMark}
              alt="Palmer House Productions"
              width={36}
              height={36}
              className="size-9 shrink-0 object-contain"
              loading="eager"
            />
            <span className="pr-2 text-xs font-bold leading-tight sm:text-sm">
              Palmer House
              <span className="block font-mono text-[8px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Productions
              </span>
            </span>
          </Link>

          <div className="ml-auto hidden items-center lg:flex">
            <Dropdown label="Services" items={services} />
            <Dropdown label="Pals" items={pals} />
            <Link
              to="/process"
              className="flex min-h-11 items-center rounded-full px-3.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Process
            </Link>
            <Link
              to="/work"
              className="flex min-h-11 items-center rounded-full px-3.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Work
            </Link>
            <Dropdown label="More" items={more} />
            <Link
              to="/studio"
              className="ml-1 flex min-h-11 items-center rounded-full bg-system-soft px-4 text-sm font-semibold text-[#086e66] transition-transform hover:scale-[1.03]"
            >
              Studio
            </Link>
            <Link
              to="/checkout"
              aria-label={`Review cart with ${cartCount} item${cartCount === 1 ? "" : "s"}`}
              className="relative ml-1 grid size-11 place-items-center rounded-full border border-border bg-white"
            >
              <ShoppingBag className="size-4" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-reel px-1 font-mono text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/contact"
              className="ml-1 flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Contact
            </Link>
          </div>

          <Link
            to="/checkout"
            aria-label={`Review cart with ${cartCount} item${cartCount === 1 ? "" : "s"}`}
            className="relative ml-auto hidden size-11 place-items-center rounded-full border border-border bg-white sm:grid lg:hidden"
          >
            <ShoppingBag className="size-4" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-reel px-1 font-mono text-[9px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            ref={menuButtonRef}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="ml-auto grid size-11 place-items-center rounded-full border border-border bg-white sm:ml-0 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </motion.header>

      <div className="h-[4.9rem]" aria-hidden="true" />

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            initial={enter}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={exit}
            transition={transition}
            className="fixed inset-x-3 bottom-3 top-[5.4rem] z-40 overflow-y-auto rounded-[2rem] border border-border bg-white p-6 shadow-soft lg:hidden"
          >
            <MobileGroup label="Services" items={services} close={() => setOpen(false)} />
            <MobileGroup label="Meet the Pals" items={pals} close={() => setOpen(false)} />
            <MobileGroup
              label="Explore"
              items={[{ label: "Our Process", to: "/process" }, ...more]}
              close={() => setOpen(false)}
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link
                to="/studio"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-center rounded-full bg-system-soft px-5 text-sm font-semibold text-[#086e66] sm:col-span-2"
              >
                Open Palmer House Studio
              </Link>
              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold"
              >
                Shop Packages
              </Link>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-center rounded-full bg-spotlight px-5 text-sm font-semibold text-white"
              >
                Book a Discovery Call
              </Link>
            </div>
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
}: {
  label: string;
  items: NavItem[];
  close: () => void;
}) {
  return (
    <section className="border-b border-border py-5 first:pt-0">
      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
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
    </section>
  );
}
