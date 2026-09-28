import type { CSSProperties } from "react";
import type { StudioLane } from "@/lib/studio-model";
import "./studio-support.css";

/** Supplied 3D artwork. These are semantic illustrations, never generated content previews. */
export const STUDIO_GRAPHICS = {
  chat: {
    src: "/studio/graphics/evergreen-faq-deep-dive.png",
    label: "Conversation",
    lane: "evergreen",
  },
  feed: { src: "/packages/icons/reel-services.png", label: "Content feed", lane: "reel" },
  ideas: { src: "/studio/graphics/reel-pov.png", label: "Ideas", lane: "reel" },
  campaigns: {
    src: "/packages/icons/system-sales-enablement.png",
    label: "Campaigns",
    lane: "system",
  },
  library: {
    src: "/studio/graphics/system-client-handoff.png",
    label: "Content library",
    lane: "system",
  },
  calendar: { src: "/studio/graphics/reel-momentum.png", label: "Content calendar", lane: "reel" },
  brand: {
    src: "/packages/icons/spotlight-proof-builder.png",
    label: "Brand DNA",
    lane: "spotlight",
  },
  roadmap: { src: "/packages/icons/system-sop.png", label: "Video roadmap", lane: "system" },
  facebook: { src: "/studio/graphics/reel-objection.png", label: "Social post", lane: "reel" },
  article: {
    src: "/studio/graphics/evergreen-case-study.png",
    label: "Article",
    lane: "evergreen",
  },
  pdf: { src: "/studio/graphics/outcome-evergreen.png", label: "Document", lane: "evergreen" },
  script: { src: "/studio/graphics/spotlight-bts.png", label: "Video script", lane: "spotlight" },
  image: { src: "/studio/graphics/reel-day-in-life.png", label: "Image", lane: "reel" },
  newsletter: {
    src: "/studio/graphics/evergreen-faq-deep-dive.png",
    label: "Newsletter",
    lane: "evergreen",
  },
  reel: { src: "/studio/graphics/outcome-reel.png", label: "Short-form video", lane: "reel" },
  spotlight: {
    src: "/studio/graphics/outcome-spotlight.png",
    label: "Trust and stories",
    lane: "spotlight",
  },
  system: {
    src: "/studio/graphics/outcome-system.png",
    label: "Training and processes",
    lane: "system",
  },
  evergreen: {
    src: "/studio/graphics/outcome-evergreen.png",
    label: "Education",
    lane: "evergreen",
  },
} as const satisfies Record<string, { src: string; label: string; lane: StudioLane }>;

export type StudioGraphicName = keyof typeof STUDIO_GRAPHICS;

/** Prefer actual asset media in content cards; use this only for feature/format identity. */
export function StudioGraphic({
  name,
  size = 64,
  className = "",
  alt = "",
  style,
}: {
  name: StudioGraphicName;
  size?: number;
  className?: string;
  /** Decorative by default. Supply descriptive alt only when no adjacent label exists. */
  alt?: string;
  style?: CSSProperties;
}) {
  return (
    <img
      src={STUDIO_GRAPHICS[name].src}
      width={size}
      height={size}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      className={`studio-graphic ${className}`}
      style={{ width: size, height: size, ...style }}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}

export function studioGraphicForAsset(kind: string, platform = ""): StudioGraphicName {
  const type = kind.toLowerCase();
  if (/script|video|reel/.test(type)) return "script";
  if (/pdf|document|guide/.test(type)) return "pdf";
  if (/article|blog|faq/.test(type)) return "article";
  if (/newsletter|email/.test(type)) return "newsletter";
  if (/image|photo|carousel/.test(type)) return "image";
  if (
    /facebook|instagram|linkedin|tiktok/.test(platform.toLowerCase()) ||
    /caption|post/.test(type)
  )
    return "facebook";
  return "library";
}
