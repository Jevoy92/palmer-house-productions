import { useEffect, useState } from "react";

export type SiteTheme = "light" | "dark" | "system";
const key = "palmer-house-appearance";
const eventName = "palmer:appearance";
const valid = (value: unknown): value is SiteTheme =>
  value === "light" || value === "dark" || value === "system";

function readTheme(): SiteTheme {
  try {
    const saved = localStorage.getItem(key);
    if (valid(saved)) return saved;
    const studio = JSON.parse(localStorage.getItem("palmer.studio.appearance.v1") || "{}");
    return valid(studio.theme) ? studio.theme : "system";
  } catch {
    return "system";
  }
}

export function useSiteAppearance() {
  const [appearance, setAppearance] = useState<SiteTheme>("system");
  const [systemDark, setSystemDark] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = (event?: Event) =>
      setAppearance(
        event instanceof CustomEvent && valid(event.detail) ? event.detail : readTheme(),
      );
    const syncSystem = () => setSystemDark(media.matches);
    sync();
    syncSystem();
    window.addEventListener(eventName, sync);
    window.addEventListener("storage", sync);
    window.addEventListener("studio:appearance", sync);
    media.addEventListener("change", syncSystem);
    return () => {
      window.removeEventListener(eventName, sync);
      window.removeEventListener("storage", sync);
      window.removeEventListener("studio:appearance", sync);
      media.removeEventListener("change", syncSystem);
    };
  }, []);
  const update = (next: SiteTheme) => {
    setAppearance(next);
    try {
      localStorage.setItem(key, next);
    } catch {
      /* This visit still works without storage. */
    }
    window.dispatchEvent(new CustomEvent(eventName, { detail: next }));
  };
  return {
    appearance,
    theme: appearance === "system" ? (systemDark ? "dark" : "light") : appearance,
    update,
  };
}
