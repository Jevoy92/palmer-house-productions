import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import "./collection.css";

type Appearance = "light" | "dark" | "system";
const appearanceKey = "palmer-house-appearance";

export function CollectionShell({
  children,
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

  return (
    <div
      className={`pc-shell${detail ? " pc-detail-shell" : ""}${footer ? " pc-has-dock" : ""}`}
      data-appearance={appearance}
      data-theme={appearance === "system" ? (systemDark ? "dark" : "light") : appearance}
    >
      <a className="pc-skip" href="#main-content">
        Skip to content
      </a>
      <SiteNav />
      {backTo && (
        <div className="mx-auto w-full max-w-7xl px-4">
          <Link
            to={backTo}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={18} /> Back to packages
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
