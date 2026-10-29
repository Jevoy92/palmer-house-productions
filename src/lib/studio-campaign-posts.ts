import type { CampaignOutput } from "./studio-model";
import type { Tables } from "./supabase/database.types";

type Asset = Tables<"campaign_assets">;

/** Saved drafts are authoritative; generation output only supplies presentation details. */
export function campaignPostEntries(output: CampaignOutput | undefined, items: Asset[]) {
  const assets = items
    .filter((item) => item.kind === "platform_post")
    .sort((a, b) => a.sort_order - b.sort_order);
  return (output?.platformPosts || []).map((post, index) => {
    const asset =
      assets.find((item) => {
        const metadata = item.metadata;
        return (
          metadata &&
          typeof metadata === "object" &&
          !Array.isArray(metadata) &&
          metadata.id === post.id
        );
      }) ||
      assets.find((item) => {
        const metadata = item.metadata;
        const hasId =
          metadata && typeof metadata === "object" && !Array.isArray(metadata) && metadata.id;
        return !hasId && item === assets[index];
      });
    return { post: asset ? { ...post, title: asset.title, body: asset.content } : post, asset };
  });
}
