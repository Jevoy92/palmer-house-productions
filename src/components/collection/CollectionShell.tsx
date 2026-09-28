import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteAppearance } from "@/components/site/SiteAppearance";
import { useSiteAppearance } from "@/components/site/useSiteAppearance";
import "./collection.css";

export function CollectionShell({
  children,
  active = "products",
  backTo,
  backSearch,
  backLabel = "Back to packages",
  pricingSearch,
  footer,
  detail = false,
}: {
  children: ReactNode;
  active?: "products" | "pricing" | "plan";
  backTo?: string;
  backSearch?: Record<string, string>;
  backLabel?: string;
  pricingSearch?: { package?: string; count?: number; sessions?: number };
  footer?: ReactNode;
  detail?: boolean;
}) {
  const { appearance, theme } = useSiteAppearance();
  return (
    <div
      className={`public-site pc-shell${detail ? " pc-detail-shell" : ""}${footer ? " pc-has-dock" : ""}`}
      data-appearance={appearance}
      data-theme={theme}
    >
      <a className="pc-skip" href="#main-content">
        Skip to content
      </a>
      <SiteNav />
      <div className="pc-collection-bar">
        <nav aria-label="Production packages">
          <Link to="/shop" aria-current={active === "products" ? "page" : undefined}>
            Products
          </Link>
          <Link
            to="/production-pricing"
            search={pricingSearch}
            aria-current={active === "pricing" ? "page" : undefined}
          >
            Pricing
          </Link>
          <Link to="/checkout" aria-current={active === "plan" ? "page" : undefined}>
            Your plan
          </Link>
        </nav>
        <SiteAppearance compact />
      </div>
      {backTo && (
        <div className="pc-back-row">
          <Link to={backTo} search={backSearch}>
            <ArrowLeft size={17} aria-hidden />
            {backLabel}
          </Link>
        </div>
      )}
      <main id="main-content" className="pc-main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
      {footer && (
        <footer className="pc-dock">
          <div className="pc-dock-inner">{footer}</div>
        </footer>
      )}
    </div>
  );
}
