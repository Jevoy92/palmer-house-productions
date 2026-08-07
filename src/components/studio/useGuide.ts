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
  const { settings, profile, saveSettings, saveProfile } = useStudio();
  const stored = settings?.preferred_pal || profile?.favorite_pal || null;
  const guide = resolveGuide(stored);
  const hasChosen = Boolean(stored);

  const setGuide = useCallback(
    async (pal: PalName | "none") => {
      await saveSettings({ preferred_pal: pal });
      try {
        await saveProfile({ favorite_pal: pal === "none" ? null : pal });
      } catch {
        // profile sync is a convenience; workspace setting is the source of truth
      }
    },
    [saveSettings, saveProfile],
  );

  const tip = useCallback(
    (surface: string) => guide.tips[surface] || guide.tips.home,
    [guide],
  );

  return { guide, hasChosen, setGuide, tip };
}
