import { useCallback } from "react";
import { resolveGuide, type GuideProfile } from "@/lib/pal-directory";
import type { PalName } from "@/lib/studio-model";
import { useStudio } from "./StudioProvider";

/**
 * The guide is chosen once (onboarding or settings) and themes the whole studio:
 * greeting, accent color, avatar, and the tips shown on each surface.
 */
export function useGuide(): {
  guide: GuideProfile;
  hasChosen: boolean;
  setGuide: (pal: PalName | "none") => Promise<void>;
  tip: (surface: string) => string;
} {
  const { settings, saveSettings } = useStudio();
  const stored = settings?.preferred_pal || null;
  const guide = resolveGuide(stored);
  const hasChosen = Boolean(stored);

  const setGuide = useCallback(
    async (pal: PalName | "none") => {
      await saveSettings({ preferred_pal: pal });
    },
    [saveSettings],
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
