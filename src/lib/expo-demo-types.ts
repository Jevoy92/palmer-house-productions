/** Client-safe shapes shared by the Expo guest demo and its server functions. */
export type BriefFact = { text: string; source: "guest" | "website" | "assumed" };
export type GuestBrief = {
  businessName: string;
  offer: string;
  location: string;
  audience: string;
  goal: string;
  voice: string;
  facts: BriefFact[];
};
export const emptyBrief: GuestBrief = {
  businessName: "",
  offer: "",
  location: "",
  audience: "",
  goal: "",
  voice: "",
  facts: [],
};

export type ArtifactType = "instagram" | "reel" | "carousel" | "linkedin" | "youtube" | "extra";
export type Artifact = {
  id: string;
  type: ArtifactType;
  title: string;
  stage: "stop" | "matter" | "invite";
  caption: string;
  cta: string;
  strategy: string;
  hook?: string;
  beats?: Array<{ visual: string; voice: string; onScreen: string }>;
  slides?: Array<{ heading: string; body: string }>;
  body?: string;
  thumbnailText?: string;
  imagePrompt?: string;
};
export type DemoCampaign = {
  headline: string;
  centralIdea: string;
  audience: string;
  goal: string;
  artifacts: Artifact[];
};

export const artifactMeta: Record<ArtifactType, { label: string; ratio: string; aspect: string }> = {
  instagram: { label: "Instagram post", ratio: "4 / 5", aspect: "4:5" },
  reel: { label: "Reel script", ratio: "9 / 16", aspect: "9:16" },
  carousel: { label: "Carousel", ratio: "1 / 1", aspect: "1:1" },
  linkedin: { label: "LinkedIn post", ratio: "1.91 / 1", aspect: "1.91:1" },
  youtube: { label: "YouTube thumbnail", ratio: "16 / 9", aspect: "16:9" },
  extra: { label: "Customer piece", ratio: "4 / 5", aspect: "4:5" },
};
