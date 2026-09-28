import { useEffect } from "react";
import { useSiteAppearance, type SiteTheme } from "./useSiteAppearance";
import { Monitor, Moon, Sun } from "lucide-react";
import "./public-shell.css";

export function SiteAppearanceScope() {
  const { theme } = useSiteAppearance();
  useEffect(() => {
    document.documentElement.dataset.siteTheme = theme;
    return () => {
      delete document.documentElement.dataset.siteTheme;
    };
  }, [theme]);
  return null;
}

export function SiteAppearance({ compact = false }: { compact?: boolean }) {
  const { appearance, update } = useSiteAppearance();
  const Icon = appearance === "dark" ? Moon : appearance === "light" ? Sun : Monitor;
  return (
    <label className={`site-appearance${compact ? " is-compact" : ""}`}>
      <Icon size={16} aria-hidden />
      <span className="sr-only">Color theme</span>
      <select
        aria-label="Color theme"
        value={appearance}
        onChange={(event) => update(event.target.value as SiteTheme)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </label>
  );
}
