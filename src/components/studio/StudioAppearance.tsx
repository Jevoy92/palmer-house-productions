import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Theme = "light" | "dark" | "system";
const key = "palmer.studio.appearance.v1";
type Appearance = { theme: Theme; largerText: boolean; reduceMotion: boolean };
const defaults: Appearance = { theme: "system", largerText: false, reduceMotion: false };
function readAppearance(): Appearance {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "{}");
    return {
      theme: ["light", "dark", "system"].includes(value.theme) ? value.theme : "system",
      largerText: value.largerText === true,
      reduceMotion: value.reduceMotion === true,
    };
  } catch {
    return defaults;
  }
}
export function useStudioAppearance() {
  const [appearance, setAppearance] = useState<Appearance>(defaults);
  useEffect(() => {
    const sync = (event?: Event) =>
      setAppearance(
        event instanceof CustomEvent && event.detail
          ? (event.detail as Appearance)
          : readAppearance(),
      );
    sync();
    window.addEventListener("studio:appearance", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("studio:appearance", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  const update = (next: Partial<Appearance>) => {
    const value = { ...appearance, ...next };
    setAppearance(value);
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* Keep this visit usable. */
    }
    window.dispatchEvent(new CustomEvent("studio:appearance", { detail: value }));
  };
  return { appearance, update };
}
export function StudioAppearanceScope() {
  const { appearance } = useStudioAppearance();
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      document.documentElement.dataset.studioTheme =
        appearance.theme === "system" ? (query.matches ? "dark" : "light") : appearance.theme;
      document.documentElement.dataset.studioText = appearance.largerText ? "large" : "normal";
      document.documentElement.dataset.studioMotion = appearance.reduceMotion ? "reduce" : "auto";
    };
    apply();
    query.addEventListener("change", apply);
    return () => {
      query.removeEventListener("change", apply);
      delete document.documentElement.dataset.studioTheme;
      delete document.documentElement.dataset.studioText;
      delete document.documentElement.dataset.studioMotion;
    };
  }, [appearance]);
  return null;
}
export function StudioAppearanceSettings() {
  const { appearance, update } = useStudioAppearance();
  return (
    <section className="studio-appearance-settings">
      <h2>Make yourself at home.</h2>
      <p>Choose how your Studio looks and feels on this device.</p>
      <fieldset>
        <legend>Appearance</legend>
        <div className="studio-theme-options">
          {(
            [
              ["light", "Light", Sun],
              ["dark", "Dark", Moon],
              ["system", "System", Monitor],
            ] as const
          ).map(([value, label, Icon]) => (
            <button
              type="button"
              key={value}
              aria-pressed={appearance.theme === value}
              onClick={() => update({ theme: value })}
            >
              <Icon size={19} />
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="studio-preference">
        <span>
          <strong>Larger text</strong>
          <small>A little more room to read.</small>
        </span>
        <input
          type="checkbox"
          checked={appearance.largerText}
          onChange={(e) => update({ largerText: e.target.checked })}
        />
      </label>
      <label className="studio-preference">
        <span>
          <strong>Reduce motion</strong>
          <small>Keep transitions quiet. Your system preference also applies.</small>
        </span>
        <input
          type="checkbox"
          checked={appearance.reduceMotion}
          onChange={(e) => update({ reduceMotion: e.target.checked })}
        />
      </label>
    </section>
  );
}
