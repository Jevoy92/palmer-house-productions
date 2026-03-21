export interface AchievementTier {
  id: string;
  label: string;
  icon: string;
  minCreditsUsed: number;
  color: string;
}

export const ACHIEVEMENT_TIERS: AchievementTier[] = [
  { id: "explorer", label: "Content Explorer", icon: "compass", minCreditsUsed: 0, color: "#8B949E" },
  { id: "creator", label: "Content Creator", icon: "zap", minCreditsUsed: 11, color: "#6B3FA0" },
  { id: "master", label: "Content Master", icon: "award", minCreditsUsed: 51, color: "#0A9B8F" },
  { id: "pro", label: "Content Pro", icon: "star", minCreditsUsed: 101, color: "#E8720C" },
  { id: "legend", label: "Content Legend", icon: "crown", minCreditsUsed: 201, color: "#D4A017" },
];

export function getTierForCreditsUsed(creditsUsed: number): AchievementTier {
  let tier = ACHIEVEMENT_TIERS[0];
  for (const t of ACHIEVEMENT_TIERS) {
    if (creditsUsed >= t.minCreditsUsed) {
      tier = t;
    }
  }
  return tier;
}

export function getNextTier(creditsUsed: number): AchievementTier | null {
  for (const t of ACHIEVEMENT_TIERS) {
    if (creditsUsed < t.minCreditsUsed) {
      return t;
    }
  }
  return null;
}

export function getTierProgress(creditsUsed: number): number {
  const current = getTierForCreditsUsed(creditsUsed);
  const next = getNextTier(creditsUsed);
  if (!next) return 1;
  const range = next.minCreditsUsed - current.minCreditsUsed;
  const progress = creditsUsed - current.minCreditsUsed;
  return Math.min(progress / range, 1);
}
