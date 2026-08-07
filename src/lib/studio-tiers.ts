export type StudioTier = {
  key: string;
  label: string;
  min: number;
  blurb: string;
};

export const studioTiers: StudioTier[] = [
  { key: "explorer", label: "Explorer", min: 0, blurb: "Getting the studio set up." },
  { key: "creator", label: "Creator", min: 6, blurb: "Making work on a rhythm." },
  { key: "producer", label: "Producer", min: 18, blurb: "Running a real content system." },
  { key: "studio", label: "Studio", min: 40, blurb: "Operating like a production house." },
  { key: "legend", label: "Legend", min: 75, blurb: "The system runs itself." },
];

export type TierState = {
  points: number;
  tier: StudioTier;
  next: StudioTier | null;
  toNext: number;
  percent: number;
};

/**
 * Points come from work that actually happened, not vanity clicks.
 * Campaigns are worth the most, then completed checklist videos, then approved assets.
 */
export function calculateTier(input: {
  campaigns: number;
  approvedAssets: number;
  completedVideos: number;
  brandCompletion: number;
}): TierState {
  const points =
    input.campaigns * 4 +
    input.completedVideos * 3 +
    Math.floor(input.approvedAssets / 3) +
    (input.brandCompletion >= 80 ? 5 : 0);
  const reached = [...studioTiers].reverse().find((tier) => points >= tier.min) || studioTiers[0];
  const index = studioTiers.findIndex((tier) => tier.key === reached.key);
  const next = studioTiers[index + 1] || null;
  const floor = reached.min;
  const ceiling = next?.min ?? reached.min + 1;
  return {
    points,
    tier: reached,
    next,
    toNext: next ? Math.max(next.min - points, 0) : 0,
    percent: next ? Math.min(100, Math.round(((points - floor) / (ceiling - floor)) * 100)) : 100,
  };
}
