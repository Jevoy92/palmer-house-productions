import { useCallback, useMemo } from "react";
import { resolveGuide, type GuideProfile } from "@/lib/pal-directory";
import type { PalName } from "@/lib/studio-model";
import { useStudio } from "./StudioProvider";

/**
 * The guide controls voice, avatar, tips, and small accent highlights.
 * Light and dark surface colors stay independent of the chosen Pal.
 */
export function useGuide(): {
  guide: GuideProfile;
  hasChosen: boolean;
  setGuide: (pal: PalName | "none") => Promise<void>;
  tip: (surface: string) => string;
} {
  const { settings, saveSettings, customPals, activeCustomPalId, selectCustomPal } = useStudio();
  const stored = settings?.preferred_pal || null;
  const custom = customPals.find((pal) => pal.id === activeCustomPalId);
  const base = resolveGuide(custom?.base_pal || stored);
  const guide = useMemo<GuideProfile>(
    () =>
      custom ? { ...base, name: custom.name, avatar: custom.avatar_url || base.avatar } : base,
    [custom, base],
  );
  const hasChosen = Boolean(stored || custom);

  const setGuide = useCallback(
    async (pal: PalName | "none") => {
      if (activeCustomPalId) await selectCustomPal(null);
      await saveSettings({ preferred_pal: pal });
    },
    [saveSettings, activeCustomPalId, selectCustomPal],
  );

  const tip = useCallback(
    (surface: string) => {
      const tips = guide.tips as Record<string, string>;
      return tips[surface] || tips.home;
    },
    [guide],
  );

  return { guide, hasChosen, setGuide, tip };
}
