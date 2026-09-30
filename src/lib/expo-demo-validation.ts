import { z } from "zod";
import type { DemoCampaign } from "./expo-demo-types";

const text = z.string().trim().min(1);
const commonArtifact = {
  id: text,
  title: text,
  stage: z.enum(["stop", "matter", "invite"]),
  caption: z.string(),
  cta: text,
  strategy: text,
};

const artifactSchema = z.discriminatedUnion("type", [
  z.object({
    ...commonArtifact,
    type: z.literal("instagram"),
    caption: text,
    imagePrompt: text,
  }),
  z.object({
    ...commonArtifact,
    type: z.literal("reel"),
    caption: text,
    hook: text,
    beats: z.array(z.object({ visual: text, voice: text, onScreen: text })).length(5),
  }),
  z.object({
    ...commonArtifact,
    type: z.literal("carousel"),
    caption: text,
    slides: z.array(z.object({ heading: text, body: text })).length(5),
  }),
  z.object({ ...commonArtifact, type: z.literal("linkedin"), body: text }),
  z.object({ ...commonArtifact, type: z.literal("youtube"), body: text, thumbnailText: text }),
  z.object({ ...commonArtifact, type: z.literal("extra"), body: text }),
]);

const campaignSchema = z.object({
  headline: text,
  centralIdea: text,
  audience: text,
  goal: text,
  artifacts: z
    .array(artifactSchema)
    .length(6)
    .refine((artifacts) => new Set(artifacts.map((artifact) => artifact.type)).size === 6, {
      message: "The campaign must include each of the six artifact types once.",
    })
    .refine((artifacts) => new Set(artifacts.map((artifact) => artifact.id)).size === 6, {
      message: "Every artifact must have a unique ID.",
    }),
});

/** Validate model output before any artifact reaches the guest-facing renderer. */
export function parseDemoCampaign(value: unknown): DemoCampaign {
  const result = campaignSchema.safeParse(value);
  if (!result.success) {
    throw new Error(
      "The campaign came back incomplete. Try building it again, or choose an example campaign.",
    );
  }
  return result.data;
}
