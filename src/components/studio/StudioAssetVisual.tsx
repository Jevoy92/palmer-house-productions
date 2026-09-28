import { useEffect, useState } from "react";
import type { Tables } from "@/lib/supabase/database.types";
import { StudioGraphic, studioGraphicForAsset } from "./StudioGraphic";
import { useStudio } from "./StudioProvider";
import { FileText, Play } from "lucide-react";

type Asset = Tables<"campaign_assets">;
export function studioAssetMetadata(asset: Asset): Record<string, unknown> {
  return asset.metadata && typeof asset.metadata === "object" && !Array.isArray(asset.metadata)
    ? (asset.metadata as Record<string, unknown>)
    : {};
}
export function studioAssetMedia(asset: Asset) {
  const metadata = studioAssetMetadata(asset);
  for (const key of ["thumbnailUrl", "imageUrl", "mediaUrl"]) {
    const value = metadata[key];
    if (typeof value === "string" && (/^https?:\/\//i.test(value) || /^\/(?!\/)/.test(value)))
      return value;
  }
  return "";
}
export function studioAssetLabel(asset: Asset) {
  const platform = studioAssetMetadata(asset).platform;
  if (typeof platform === "string" && platform)
    return platform.charAt(0).toUpperCase() + platform.slice(1);
  const labels: Record<string, string> = {
    anchor_script: "Video script",
    short_script: "Reel script",
    platform_post: "Social post",
    caption: "Social post",
    blog: "Article",
    article: "Article",
    newsletter: "Newsletter",
    image: "Image",
    document: "PDF document",
    faq: "FAQ",
    carousel: "Carousel",
  };
  return labels[asset.kind] || asset.kind.replaceAll("_", " ");
}
export function StudioAssetVisual({ asset, className = "" }: { asset: Asset; className?: string }) {
  const { getArtifactUrl } = useStudio();
  const source = studioAssetMedia(asset);
  const [media, setMedia] = useState(source);
  const [failed, setFailed] = useState(false);
  const metadata = studioAssetMetadata(asset);
  const storagePath = metadata.storagePath;
  useEffect(() => {
    let live = true;
    setFailed(false);
    setMedia(source);
    if (!source && asset.kind === "image" && typeof storagePath === "string" && getArtifactUrl)
      void getArtifactUrl(asset.id)
        .then((url) => {
          if (live) setMedia(url);
        })
        .catch(() => {
          if (live) setFailed(true);
        });
    return () => {
      live = false;
    };
  }, [asset.id, asset.kind, asset.updated_at, source, storagePath, getArtifactUrl]);
  const document = /article|blog|newsletter|document|faq/.test(asset.kind);
  return (
    <div className={`studio-asset-visual ${document ? "studio-asset-document" : ""} ${className}`}>
      {media && !failed ? (
        <img
          src={media}
          alt={`Preview of ${asset.title}`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : document ? (
        <div className="studio-paper-preview">
          <FileText size={17} />
          <strong>{asset.title}</strong>
          <p>
            {asset.content
              .replace(/^#{1,6}\s+/gm, "")
              .replace(/[*_`]/g, "")
              .slice(0, 220)}
          </p>
        </div>
      ) : (
        <StudioGraphic
          name={studioGraphicForAsset(asset.kind, String(metadata.platform || ""))}
          size={108}
        />
      )}
      {/script/.test(asset.kind) && (
        <span className="studio-script-badge">
          <Play size={12} />
          Script
        </span>
      )}
      {failed && <span className="studio-media-unavailable">Image unavailable</span>}
    </div>
  );
}
