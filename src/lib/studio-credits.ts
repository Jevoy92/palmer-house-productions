/** Client-safe credit catalog. Provider costs and credentials never come from the client. */
export const studioCreditOperations = {
  chat: { label: "Pal reply", credits: 1 },
  directions: { label: "Three content directions", credits: 3 },
  analysis: { label: "Website or reference analysis", credits: 5 },
  campaign: { label: "Complete campaign", credits: 100 },
  image: { label: "Generated image", credits: 30 },
  pdf: { label: "Written PDF document", credits: 10 },
  avatar: { label: "Custom Pal portrait", credits: 20 },
  transcription: { label: "Voice transcription / started minute", credits: 2 },
  feed: { label: "Fresh Pal discussion", credits: 5 },
} as const;
export type StudioCreditOperation = keyof typeof studioCreditOperations;
export const studioCreditAllowance = {
  trial: 300,
  creator: 12000,
  business: 25000,
  partner: 50000,
} as const;
/** Plain-English "what a month of credits makes", mixing all four kinds of work.
 * Studio (12,000) ~ 35 campaigns + 115 images + 1,750 voice minutes + ~1,500 replies. */
export function studioCreditExamples(allowance: number) {
  const share = allowance * (3500 / 12000);
  const campaigns = Math.floor(share / studioCreditOperations.campaign.credits);
  const images = Math.floor(share / studioCreditOperations.image.credits);
  const voiceMinutes = Math.floor(share / studioCreditOperations.transcription.credits);
  const replies = Math.max(
    0,
    allowance -
      campaigns * studioCreditOperations.campaign.credits -
      images * studioCreditOperations.image.credits -
      voiceMinutes * studioCreditOperations.transcription.credits,
  );
  return { campaigns, images, voiceMinutes, replies };
}
export const studioCreditTopUps = {
  boost: { label: "Credit boost", credits: 500, priceUsd: 20 },
  bundle: { label: "Credit bundle", credits: 1500, priceUsd: 50 },
} as const;
export type StudioCreditPack = keyof typeof studioCreditTopUps;
export type StudioCreditSummary = {
  enforcement: "ready" | "unavailable";
  message?: string;
  available: number;
  includedRemaining: number;
  includedAllowance: number;
  topUpRemaining: number;
  usedThisPeriod: number;
  reserved: number;
  renewsAt: string | null;
  status: "active" | "trialing" | "inactive";
  recent: Array<{
    id: string;
    operation: StudioCreditOperation;
    credits: number;
    status: "reserved" | "completed" | "released";
    createdAt: string;
  }>;
  canManageBilling: boolean;
  topUpsEnabled: boolean;
  operator?: {
    estimatedCostUsd: number;
    providerCalls: number;
    monthlyBudgetUsd: number;
    budgetUsedUsd: number;
  };
};
