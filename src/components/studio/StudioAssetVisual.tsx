import { useEffect, useState } from "react";
import type { Tables } from "@/lib/supabase/database.types";
import { StudioGraphic, studioGraphicForAsset } from "./StudioGraphic";
import { useStudio } from "./StudioProvider";
import "./studio-asset-visual.css";

type Asset = Tables<"campaign_assets">;
export function studioAssetMetadata(asset: Asset): Record<string, unknown> {
  return asset.metadata && typeof asset.metadata === "object" && !Array.isArray(asset.metadata)
    ? (asset.metadata as Record<string, unknown>)
    : {};
}
function imageUrl(value: unknown) {
  if (typeof value !== "string") return "";
  const url = value.trim();
  if (!/^https?:\/\//i.test(url) && !/^\/(?!\/)/.test(url)) return "";
  // A private PDF or video URL is not a still image. Keep its native format cover.
  if (/\.(pdf|mp4|webm|mov|m4v|mp3|wav)(?:[?#]|$)/i.test(url)) return "";
  return url;
}
/** Resolve only this asset's own image fields; never borrow a campaign or workspace image. */
export function studioAssetMedia(asset: Asset) {
  const metadata = studioAssetMetadata(asset);
  for (const key of [
    "imageUrl",
    "image_url",
    "coverImageUrl",
    "thumbnailUrl",
    "posterUrl",
    "mediaUrl",
  ]) {
    const url = imageUrl(metadata[key]);
    if (url) return url;
  }
  return "";
}
export function studioAssetLabel(asset: Asset) {
  const platform = studioAssetMetadata(asset).platform;
  if (
    /^(platform_post|caption|carousel)$/.test(asset.kind) &&
    typeof platform === "string" &&
    platform
  ) {
    return (
      (
        {
          facebook: "Facebook",
          instagram: "Instagram",
          linkedin: "LinkedIn",
          youtube: "YouTube",
          tiktok: "TikTok",
        } as Record<string, string>
      )[platform.toLowerCase()] || platform.charAt(0).toUpperCase() + platform.slice(1)
    );
  }
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
    pdf: "PDF document",
    faq: "FAQ",
    carousel: "Carousel",
  };
  return labels[asset.kind] || asset.kind.replaceAll("_", " ");
}
function cleanText(text: string) {
  return text
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}
export function studioAssetStoryboard(asset: Asset): Array<{ label: string; text: string }> {
  const stored = studioAssetMetadata(asset).storyboard;
  if (Array.isArray(stored)) {
    const beats = stored
      .filter(
        (value): value is Record<string, unknown> =>
          !!value && typeof value === "object" && !Array.isArray(value),
      )
      .filter((value) => typeof value.text === "string" && value.text.trim())
      .slice(0, 3)
      .map((value, index) => ({
        label: typeof value.label === "string" ? value.label.slice(0, 32) : `Beat ${index + 1}`,
        text: String(value.text).slice(0, 180),
      }));
    if (beats.length) return beats;
  }
  // Read real scene directions from a script; do not invent missing shots.
  return Array.from(asset.content.matchAll(/\[([^\]]+)\]/g))
    .slice(0, 3)
    .map((match, index) => {
      const [label, ...body] = match[1].split(":");
      return {
        label: body.length ? label.trim().slice(0, 32) : `Beat ${index + 1}`,
        text: (body.length ? body.join(":") : label).trim(),
      };
    });
}
function EditorialCover({
  asset,
  media,
  onError,
}: {
  asset: Asset;
  media: string;
  onError: () => void;
}) {
  const newsletter = asset.kind === "newsletter";
  const document = /^(document|pdf)$/.test(asset.kind);
  const excerpt = cleanText(asset.content).replace(
    new RegExp(`^${asset.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*`, "i"),
    "",
  );
  const words = cleanText(asset.content).split(/\s+/).filter(Boolean).length;
  return (
    <div
      className={`studio-paper-preview studio-editorial-cover ${newsletter ? "is-letter" : document ? "is-document" : "is-article"}`}
    >
      <div className="studio-cover-masthead">
        <span>
          {newsletter ? "A note for your inbox" : document ? "Field guide" : "The journal"}
        </span>
        <StudioGraphic name={newsletter ? "newsletter" : document ? "pdf" : "article"} size={27} />
      </div>
      {media && (
        <img src={media} alt="" className="studio-cover-photo" onError={onError} loading="lazy" />
      )}
      <strong>{asset.title}</strong>
      <p className="studio-cover-excerpt">{excerpt.slice(0, 240) || "Your draft starts here."}</p>
      <div className="studio-cover-footer">
        <span>{studioAssetLabel(asset)}</span>
        <span>{words ? `${words} words` : "Draft"}</span>
      </div>
    </div>
  );
}
function ScriptCover({ asset }: { asset: Asset }) {
  const short = asset.kind === "short_script";
  const beats = studioAssetStoryboard(asset);
  const spoken = cleanText(asset.content.replace(/\[[^\]]*\]/g, ""))
    .replace(/^\w+:\s*/, "")
    .slice(0, 180);
  return (
    <div className={`studio-script-cover ${short ? "is-reel" : "is-anchor"}`}>
      <div className="studio-script-cover-top">
        <span>{short ? "Reel storyboard" : "Story outline"}</span>
        <span>{beats.length ? `${beats.length} beats` : "Draft"}</span>
      </div>
      <strong>{asset.title}</strong>
      {beats.length ? (
        <div className="studio-storyboard-frames">
          {beats.map((beat, index) => (
            <div key={`${index}-${beat.label}`}>
              <span>{beat.label}</span>
              <StudioGraphic
                name={index === 0 ? "image" : index === 1 ? "script" : "reel"}
                size={34}
              />
              <p>{beat.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="studio-script-quote">
          <StudioGraphic name="script" size={48} />
          <p>{spoken || "Your script draft will appear here."}</p>
        </div>
      )}
      <div className="studio-script-cover-bottom">Script draft · ready to review</div>
    </div>
  );
}
export function StudioAssetVisual({ asset, className = "" }: { asset: Asset; className?: string }) {
  const { getAssetImageUrl } = useStudio();
  const metadata = studioAssetMetadata(asset);
  const source = studioAssetMedia(asset);
  const storagePath = typeof metadata.storagePath === "string" ? metadata.storagePath : "";
  const mediaAssetId = typeof metadata.mediaAssetId === "string" ? metadata.mediaAssetId : "";
  const mediaKey = `${asset.id}:${asset.updated_at}:${source}:${storagePath}:${mediaAssetId}`;
  const [resolved, setResolved] = useState({
    key: mediaKey,
    url: source,
    failed: false,
    loading: false,
  });
  // A card reused for a different asset must not flash the previous asset's signed image.
  const current =
    resolved.key === mediaKey
      ? resolved
      : { key: mediaKey, url: source, failed: false, loading: false };
  useEffect(() => {
    let live = true;
    const privateImage =
      !source && Boolean(mediaAssetId || (asset.kind === "image" && storagePath));
    setResolved({ key: mediaKey, url: source, failed: false, loading: privateImage });
    if (privateImage && getAssetImageUrl)
      void getAssetImageUrl(asset.id)
        .then((value) => {
          if (!live) return;
          const url = imageUrl(value);
          setResolved({ key: mediaKey, url, failed: !url, loading: false });
        })
        .catch(() => {
          if (live) setResolved({ key: mediaKey, url: "", failed: true, loading: false });
        });
    return () => {
      live = false;
    };
  }, [asset.id, asset.kind, mediaKey, source, storagePath, mediaAssetId, getAssetImageUrl]);
  const document = /^(article|blog|newsletter|document|pdf|faq)$/.test(asset.kind);
  const script = /script/.test(asset.kind);
  const media = current.failed ? "" : current.url;
  const storyboard = script && (!media || (metadata.visualType === "storyboard" && !mediaAssetId));
  const fail = () => setResolved({ key: mediaKey, url: "", failed: true, loading: false });
  return (
    <div
      className={`studio-asset-visual studio-content-visual ${document ? "studio-asset-document" : ""} ${className}`}
      data-format={asset.kind}
    >
      {document ? (
        <EditorialCover asset={asset} media={media} onError={fail} />
      ) : storyboard ? (
        <ScriptCover asset={asset} />
      ) : media ? (
        <img
          src={media}
          alt={
            typeof metadata.imageAlt === "string" && metadata.imageAlt.trim()
              ? metadata.imageAlt.trim()
              : `Preview of ${asset.title}`
          }
          loading="lazy"
          onError={fail}
        />
      ) : (
        <div className="studio-format-fallback">
          <StudioGraphic
            name={studioGraphicForAsset(asset.kind, String(metadata.platform || ""))}
            size={92}
          />
          <span>{current.loading ? "Loading image…" : studioAssetLabel(asset)}</span>
        </div>
      )}
      {script && !storyboard && <span className="studio-script-badge">Script draft</span>}
      {current.failed && <span className="studio-media-unavailable">Image unavailable</span>}
    </div>
  );
}
