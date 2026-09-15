import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Monitor, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { buildReceiptLines, useCart } from "@/lib/cart-store";
import "./collection.css";

type Appearance = "light" | "dark" | "system";
const appearanceKey = "palmer-house-appearance";

export function CollectionShell({
  children,
  active = "products",
  backTo,
  footer,
  detail = false,
}: {
  children: ReactNode;
  active?: "products" | "pricing" | "plan";
  backTo?: string;
  footer?: ReactNode;
  detail?: boolean;
}) {
  const [appearance, setAppearance] = useState<Appearance>("system");
  const [systemDark, setSystemDark] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const cart = useCart();
  const count = buildReceiptLines(cart).length;

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystem = () => setSystemDark(media.matches);
    const syncSaved = () => {
      try {
        const saved = window.localStorage.getItem(appearanceKey);
        setAppearance(saved === "light" || saved === "dark" ? saved : "system");
      } catch {
        setAppearance("system");
      }
    };
    syncSystem();
    syncSaved();
    media.addEventListener("change", syncSystem);
    const onStorage = (event: StorageEvent) => {
      if (event.key === appearanceKey || event.key === null) syncSaved();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      media.removeEventListener("change", syncSystem);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const choose = (value: Appearance) => {
    setAppearance(value);
    try {
      window.localStorage.setItem(appearanceKey, value);
    } catch {
      /* Session preference still works. */
    }
  };

  return (
    <div
      className={`pc-shell${detail ? " pc-detail-shell" : ""}${footer ? " pc-has-dock" : ""}`}
      data-appearance={appearance}
      data-theme={appearance === "system" ? (systemDark ? "dark" : "light") : appearance}
    >
      <a className="pc-skip" href="#main-content">
        Skip to content
      </a>
      <header className="pc-header">
        <div className="pc-header-inner">
          {backTo && (
            <Link to={backTo} className="pc-icon-button pc-back" aria-label="Back to packages">
              <ArrowLeft size={21} />
            </Link>
          )}
          <Link to="/" className="pc-brand" aria-label="Palmer House Productions home">
            <img src="/packages/mark.webp" alt="" width="29" height="33" />
            <span>
              Palmer House<small>PRODUCTIONS</small>
            </span>
          </Link>
          <nav className="pc-desktop-nav" aria-label="Explore Palmer House">
            <Link to="/shop" aria-current={active === "products" ? "page" : undefined}>
              Products
            </Link>
            <Link to="/production-pricing" aria-current={active === "pricing" ? "page" : undefined}>
              Pricing
            </Link>
            <Link to="/find-your-pal">Find your Pal</Link>
            <Link to="/work">Our work</Link>
          </nav>
          <div className="pc-header-actions">
            <Link
              to="/checkout"
              className="pc-plan-link"
              aria-label={`Your plan, ${count} ${count === 1 ? "item" : "items"}`}
            >
              Plan <span>{count}</span>
            </Link>
            <button
              ref={trigger}
              className="pc-icon-button"
              aria-label="Appearance settings"
              onClick={() => dialog.current?.showModal()}
            >
              <span className="pc-theme-symbol" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <nav className="pc-mobile-nav" aria-label="Main navigation">
        <Link to="/shop" aria-current={active === "products" ? "page" : undefined}>
          Products
        </Link>
        <Link to="/production-pricing" aria-current={active === "pricing" ? "page" : undefined}>
          Pricing
        </Link>
        <Link to="/find-your-pal">Find your Pal</Link>
      </nav>
      <main id="main-content" className="pc-main" tabIndex={-1}>
        {children}
      </main>
      <div className="pc-site-footer">
        <Link to="/">Palmer House Productions</Link>
        <nav aria-label="More information">
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </nav>
      </div>
      {footer && (
        <footer className="pc-dock">
          <div className="pc-dock-inner">{footer}</div>
        </footer>
      )}
      <dialog
        ref={dialog}
        className="pc-dialog pc-appearance-dialog"
        aria-labelledby="pc-appearance-title"
        onClose={() => trigger.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const box = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < box.left ||
              event.clientX > box.right ||
              event.clientY < box.top ||
              event.clientY > box.bottom
            )
              dialog.current?.close();
          }
        }}
      >
        <div className="pc-dialog-heading">
          <h2 id="pc-appearance-title">Appearance</h2>
          <button
            className="pc-icon-button"
            onClick={() => dialog.current?.close()}
            aria-label="Close appearance settings"
          >
            <X size={21} />
          </button>
        </div>
        <p className="pc-muted">Choose how Palmer House looks on this device.</p>
        <div className="pc-appearance-options" role="group" aria-label="Color theme">
          {(["light", "dark", "system"] as const).map((mode) => {
            const Icon = mode === "light" ? Sun : mode === "dark" ? Moon : Monitor;
            return (
              <button key={mode} aria-pressed={appearance === mode} onClick={() => choose(mode)}>
                <Icon size={23} />
                <span>
                  <strong>{mode[0].toUpperCase() + mode.slice(1)}</strong>
                  <small>
                    {mode === "system"
                      ? "Match your device"
                      : mode === "light"
                        ? "Bright and clear"
                        : "Easy on the eyes"}
                  </small>
                </span>
                {appearance === mode && <Check size={20} />}
              </button>
            );
          })}
        </div>
        <button className="pc-primary" onClick={() => dialog.current?.close()}>
          Done
        </button>
      </dialog>
    </div>
  );
}
