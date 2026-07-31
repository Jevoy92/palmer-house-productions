import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

const services = [
  { label: "Video Production", to: "/services/video-production" },
  { label: "Post-Production", to: "/services/post-production" },
  { label: "Content Strategy", to: "/content-strategy" },
  { label: "Production Pricing", to: "/production-pricing" },
];

const pals = [
  { label: "Meet All the Pals", to: "/pals" },
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
  return (
    <div className="group relative">
      <button className="flex min-h-11 items-center gap-1 rounded-full px-3.5 text-sm font-medium transition-colors hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none">
        {label}{" "}
        <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>
      <div className="invisible absolute left-0 top-[calc(100%+.55rem)] w-60 translate-y-2 rounded-3xl border border-border bg-white p-2 opacity-0 shadow-soft transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="block rounded-2xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:bg-secondary focus-visible:text-foreground focus-visible:outline-none"
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
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <>
      <motion.header
        initial={reduce ? false : { opacity: 0, transform: "translateY(-14px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5"
      >
        <nav
          className="mx-auto flex max-w-6xl items-center gap-2 rounded-full border border-border/80 bg-white/90 p-2 shadow-soft backdrop-blur-xl"
          aria-label="Primary"
        >
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotlight/40"
          >
            <BrandFace />
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
            <a
              href="/#work"
              className="flex min-h-11 items-center rounded-full px-3.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Work
            </a>
            <Dropdown label="More" items={more} />
            <Link
              to="/contact"
              className="ml-1 flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Contact
            </Link>
          </div>

          <Link
            to="/contact"
            className="ml-auto hidden min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-white sm:flex lg:hidden"
          >
            Contact
          </Link>
          <button
            type="button"
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
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0 round 2rem)" }
            }
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0 round 2rem)" }}
            exit={
              reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0 round 2rem)" }
            }
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-x-3 bottom-3 top-[5.4rem] z-40 overflow-y-auto rounded-[2rem] border border-border bg-white p-6 shadow-soft lg:hidden"
          >
            <MobileGroup label="Services" items={services} close={() => setOpen(false)} delay={0} />
            <MobileGroup
              label="Meet the Pals"
              items={pals}
              close={() => setOpen(false)}
              delay={0.04}
            />
            <MobileGroup
              label="Explore"
              items={[{ label: "Our Process", to: "/process" }, ...more]}
              close={() => setOpen(false)}
              delay={0.08}
            />
            <motion.div
              initial={reduce ? false : { opacity: 0, transform: "translateY(12px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ delay: 0.14 }}
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >
              <Link
                to="/production-pricing"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-center rounded-full border border-border px-5 text-sm font-semibold"
              >
                Build a Quote
              </Link>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-center rounded-full bg-spotlight px-5 text-sm font-semibold text-white"
              >
                Book a Discovery Call
              </Link>
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
  items: NavItem[];
  close: () => void;
  delay: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, transform: "translateY(14px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      transition={{ delay }}
      className="border-b border-border py-5 first:pt-0"
    >
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
    </motion.section>
  );
}
