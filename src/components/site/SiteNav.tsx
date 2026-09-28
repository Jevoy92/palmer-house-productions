import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { primaryLinks, resourceLinks, type NavLink } from "@/data/nav";
import { useHydratedReducedMotion } from "@/hooks/use-hydrated-reduced-motion";
import { cartItemCount, useCart } from "@/lib/cart-store";
import phMark from "@/assets/php-mark-108.webp";
import { SiteAppearance, SiteAppearanceScope } from "./SiteAppearance";

function ResourceMenu() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <div
      ref={root}
      className="site-resource-menu"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="site-nav-link"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            requestAnimationFrame(() =>
              root.current?.querySelector<HTMLAnchorElement>("a")?.focus(),
            );
          }
        }}
      >
        Resources <ChevronDown size={14} aria-hidden className={open ? "is-open" : ""} />
      </button>
      <div id={id} className="site-resource-panel" hidden={!open}>
        {resourceLinks.map((item) => (
          <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
            <span>
              <strong>{item.label}</strong>
              {item.description && <small>{item.description}</small>}
            </span>
            <ArrowRight size={15} aria-hidden />
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const dialogId = useId();
  const reduce = useHydratedReducedMotion();
  const path = useRouterState({ select: (state) => state.location.pathname });
  const cartCount = cartItemCount(useCart());
  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => menuButton.current?.focus());
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1180px)");
    const change = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    const background = [
      ...document.querySelectorAll<HTMLElement>(
        ".public-site > main, .public-site > .site-footer, .site-nav-bar",
      ),
    ];
    const inert = background.map((element) => element.inert);
    background.forEach((element) => {
      element.inert = true;
    });
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() =>
      dialog.current?.querySelector<HTMLButtonElement>("button")?.focus(),
    );
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key !== "Tab" || !dialog.current) return;
      const nodes = [
        ...dialog.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),select,[tabindex="0"]',
        ),
      ].filter((node) => node.getClientRects().length);
      const first = nodes[0],
        last = nodes.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = overflow;
      background.forEach((element, index) => {
        element.inert = inert[index];
      });
      document.removeEventListener("keydown", keydown);
    };
  }, [open, close]);
  const planLabel = `Your plan, ${cartCount} package${cartCount === 1 ? "" : "s"}`;
  return (
    <>
      <SiteAppearanceScope />
      <header className="site-header">
        <nav className="site-nav-bar" aria-label="Primary">
          <Link to="/" className="site-brand" aria-label="Palmer House Productions home">
            <img src={phMark} alt="" width={34} height={34} fetchPriority="high" />
            <span>
              Palmer House<small>Productions</small>
            </span>
          </Link>
          <div className="site-desktop-nav">
            {primaryLinks.map((item) => (
              <NavItem key={item.to} item={item} />
            ))}
            <span className="site-nav-divider" aria-hidden />
            <NavItem item={{ label: "Work", to: "/work" }} />
            <NavItem item={{ label: "Pricing", to: "/pricing" }} />
            <ResourceMenu />
          </div>
          <div className="site-nav-actions">
            <div className="site-desktop-appearance">
              <SiteAppearance compact />
            </div>
            <Link to="/studio" className="site-account" aria-label="Studio account">
              <UserRound size={17} aria-hidden />
              <span>Account</span>
            </Link>
            <Link to="/checkout" className="site-plan" aria-label={planLabel}>
              <ShoppingBag size={17} aria-hidden />
              <span>Plan</span>
              <span className="site-plan-count">{cartCount}</span>
            </Link>
            <button
              ref={menuButton}
              type="button"
              className="site-menu-button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls={dialogId}
              onClick={() => setOpen(true)}
            >
              <Menu size={21} />
            </button>
          </div>
        </nav>
      </header>
      <div className="site-nav-space" aria-hidden />
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="site-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.18 }}
            onClick={close}
          >
            <motion.div
              ref={dialog}
              id={dialogId}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${dialogId}-title`}
              className="site-mobile-menu"
              initial={reduce ? false : { y: 12 }}
              animate={{ y: 0 }}
              exit={reduce ? undefined : { y: 8 }}
              transition={{ duration: 0.18 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="site-mobile-heading">
                <strong id={`${dialogId}-title`}>Make your next move.</strong>
                <button type="button" onClick={close} aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>
              <nav aria-label="Mobile">
                <div className="site-mobile-avenues">
                  {primaryLinks.map((item) => (
                    <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
                      <span>
                        <strong>{item.label}</strong>
                        <small>{item.description}</small>
                      </span>
                      <ArrowRight size={19} />
                    </Link>
                  ))}
                </div>
                <div className="site-mobile-quick">
                  {[
                    { label: "Selected work", to: "/work" },
                    { label: "Pricing", to: "/pricing" },
                    { label: "Browse packages", to: "/shop" },
                    { label: "Talk to the team", to: "/contact" },
                    { label: "Studio account", to: "/studio" },
                  ].map((item) => (
                    <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
                      {item.label}
                      <ArrowRight size={15} />
                    </Link>
                  ))}
                </div>
                <details className="site-mobile-resources">
                  <summary>
                    More from Palmer House <ChevronDown size={16} />
                  </summary>
                  {resourceLinks.map((item) => (
                    <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
                      {item.label}
                    </Link>
                  ))}
                </details>
              </nav>
              <form action="/shop" role="search" className="site-menu-search">
                <Search size={17} aria-hidden />
                <input
                  name="q"
                  type="search"
                  placeholder="Search video packages"
                  aria-label="Search video packages"
                />
                <button type="submit" aria-label="Search packages">
                  <ArrowRight size={18} />
                </button>
              </form>
              <div className="site-menu-preferences">
                <span>Make yourself at home</span>
                <SiteAppearance />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
function NavItem({ item }: { item: NavLink }) {
  return (
    <Link
      to={item.to}
      className="site-nav-link"
      activeProps={{ className: "site-nav-link is-current" }}
      activeOptions={{ exact: item.to === "/membership" }}
    >
      {item.label}
    </Link>
  );
}
