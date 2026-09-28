import { z } from "zod";
import { palNames, type PalName, type StudioLane } from "./studio-model.ts";

export const StudioAuthSchema = z.object({
  workspaceId: z.string().uuid(),
  accessToken: z.string().min(20),
});
export const PalProfileInputSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1).max(60),
  basePal: z.enum(palNames),
  personality: z.string().trim().min(3).max(1600),
  avatarPath: z.string().max(600).nullable().optional(),
});
export type PalProfileInput = z.infer<typeof PalProfileInputSchema>;
export type StudioPalProfile = {
  id: string;
  workspace_id: string;
  name: string;
  base_pal: PalName;
  personality: string;
  avatar_path: string | null;
  avatar_url?: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
};
export type StudioAuthor = {
  kind: "pal" | "member";
  name: string;
  pal?: PalName;
  profileId?: string;
  avatarPath?: string | null;
  userId?: string;
};
export type StudioFeedSource = { label: string; url: string };
export type StudioFeedPost = {
  id: string;
  workspace_id: string;
  created_by: string;
  title: string;
  body: string;
  lane: StudioLane;
  author: StudioAuthor;
  sources: StudioFeedSource[];
  asset_id: string | null;
  generated: boolean;
  created_at: string;
};
export type StudioFeedComment = {
  id: string;
  workspace_id: string;
  post_id: string;
  created_by: string;
  body: string;
  author: StudioAuthor;
  created_at: string;
};
export const feedReactions = ["helpful", "love", "spark"] as const;
export type StudioFeedReaction = {
  workspace_id: string;
  post_id: string;
  user_id: string;
  reaction: (typeof feedReactions)[number];
  created_at: string;
};
export const ArtifactInputSchema = z
  .object({
    kind: z.enum(["image", "pdf"]),
    title: z.string().trim().min(2).max(180),
    prompt: z.string().trim().min(3).max(3000),
    content: z.string().trim().max(30000).optional(),
    campaignId: z.string().uuid().optional(),
    targetAssetId: z.string().uuid().optional(),
    imagePurpose: z.enum(["cover", "social", "thumbnail", "storyboard"]).optional(),
    conversationId: z.string().uuid().optional(),
    palProfileId: z.string().uuid().optional(),
    pal: z.enum(palNames).optional(),
  })
  .refine((input) => input.kind === "image" || (!input.targetAssetId && !input.imagePurpose), {
    message: "Only still images can be attached as an asset visual.",
  });
export type StudioArtifactInput = z.infer<typeof ArtifactInputSchema>;
export type StudioArtifact = {
  assetId: string;
  storagePath: string;
  mimeType: string;
  url: string;
  messageId?: string;
  warning?: string;
  title: string;
  kind: "image" | "pdf";
  targetAssetId?: string;
};
export type StudioPalAvatar = {
  storagePath: string;
  url: string;
  mimeType: string;
  styleVersion: string;
};
export type StudioPalAvatarInput = { name?: string; description: string; basePal?: PalName };
export type StudioFeedGenerationResult = {
  status: "generated" | "deferred" | "unavailable";
  postId?: string;
  reason?: string;
  nextAttemptAt?: string;
};
export const FeedPostInputSchema = z.object({
  title: z.string().trim().max(180).default(""),
  body: z.string().trim().min(1).max(4000),
  palProfileId: z.string().uuid().optional(),
  assetId: z.string().uuid().optional(),
  lane: z.enum(["spotlight", "reel", "evergreen", "system"]).default("reel"),
});
export type StudioFeedPostInput = z.input<typeof FeedPostInputSchema>;

export function assertWorkspaceStoragePath(workspaceId: string, path: string) {
  if (
    !path.startsWith(`${workspaceId}/`) ||
    path.includes("..") ||
    /[\\?#]/.test(path) ||
    [...path].some((char) => char.charCodeAt(0) < 32)
  )
    throw new Error("This file does not belong to the active workspace.");
  return path;
}
export function isCompletedRoadmapStatus(status: string) {
  return status === "complete" || status === "done";
}
export function validatedFeedSources(
  proposed: StudioFeedSource[],
  allowed: StudioFeedSource[],
): StudioFeedSource[] {
  const known = new Map(allowed.map((source) => [source.url, source]));
  return [...new Set(proposed.map((source) => source.url))].flatMap((url) =>
    known.has(url) ? [known.get(url)!] : [],
  );
}

/** Stored reference links are data, never executable URLs. */
export function safeFeedSources(value: unknown): StudioFeedSource[] {
  if (!Array.isArray(value)) return [];
  return value.slice(0, 6).flatMap((source: unknown) => {
    if (!source || typeof source !== "object") return [];
    const { label, url } = source as Record<string, unknown>;
    if (typeof label !== "string" || typeof url !== "string" || url.length > 2048) return [];
    if (/^\/studio\/[a-zA-Z0-9/_-]+$/.test(url)) return [{ label: label.slice(0, 180), url }];
    try {
      const parsed = new URL(url);
      if (!["https:", "http:"].includes(parsed.protocol) || parsed.username || parsed.password)
        return [];
      return [{ label: label.slice(0, 180), url }];
    } catch {
      return [];
    }
  });
}

const SavedAuthorSchema = z.object({
  kind: z.enum(["pal", "member"]),
  name: z.string().trim().min(1).max(180),
  pal: z.enum(palNames).optional(),
  profileId: z.string().uuid().optional(),
  avatarPath: z.string().max(600).nullable().optional(),
  userId: z.string().optional(),
});
export function safeStudioAuthor(
  value: unknown,
  createdBy: string,
  workspaceId: string,
): StudioAuthor {
  const parsed = SavedAuthorSchema.safeParse(value);
  if (!parsed.success || (parsed.data.kind === "pal" && !parsed.data.pal))
    return { kind: "member", name: "Workspace member", userId: createdBy };
  const author = parsed.data;
  if (author.kind === "member") author.userId = createdBy;
  if (author.avatarPath) {
    try {
      assertWorkspaceStoragePath(workspaceId, author.avatarPath);
    } catch {
      author.avatarPath = null;
    }
  }
  return author;
}
