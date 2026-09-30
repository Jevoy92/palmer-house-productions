import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { artifactMeta, type Artifact } from "@/lib/expo-demo-types";

/** Image area: real photo when we have one, otherwise an honest typographic block. */
function Visual({ src, ratio, label }: { src?: string; ratio: string; label?: string }) {
  return (
    <div className="xd-visual" style={{ aspectRatio: ratio }}>
      {src ? <img src={src} alt="" /> : <span className="xd-visual-empty">{label ?? "Image"}</span>}
    </div>
  );
}

function Carousel({ a, image }: { a: Artifact; image?: string }) {
  const [i, setI] = useState(0);
  const slides = a.slides ?? [];
  const s = slides[i];
  if (!s) return null;
  return (
    <div className="xd-carousel" style={{ aspectRatio: "1 / 1" }}>
      {image && i === 0 ? <img src={image} alt="" /> : null}
      <div className={`xd-slide ${image && i === 0 ? "on-photo" : ""}`}>
        <span className="xd-slide-n">
          {i + 1} / {slides.length}
        </span>
        <strong>{s.heading}</strong>
        <p>{s.body}</p>
      </div>
      <button
        type="button"
        aria-label="Previous slide"
        className="xd-arrow left"
        disabled={i === 0}
        onClick={(e) => {
          e.stopPropagation();
          setI((v) => Math.max(0, v - 1));
        }}
      >
        <ChevronLeft size={16} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className="xd-arrow right"
        disabled={i === slides.length - 1}
        onClick={(e) => {
          e.stopPropagation();
          setI((v) => Math.min(slides.length - 1, v + 1));
        }}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

/** Native-proportion preview of one artifact. Same renderer for every view. */
export function ArtifactPreview({
  a,
  images,
  brand,
  large,
}: {
  a: Artifact;
  images: { square?: string; wide?: string };
  brand: string;
  large?: boolean;
}) {
  const meta = artifactMeta[a.type];
  switch (a.type) {
    case "instagram":
      return (
        <div className="xd-native xd-ig">
          <div className="xd-native-head">
            <span className="xd-avatar">{brand.slice(0, 1)}</span>
            {brand}
          </div>
          <Visual src={images.square} ratio={meta.ratio} label={a.title} />
          <p className={`xd-caption ${large ? "" : "clamp"}`}>{a.caption}</p>
        </div>
      );
    case "reel": {
      const beat = a.beats?.[0];
      return (
        <div className="xd-native xd-reel" style={{ aspectRatio: meta.ratio }}>
          {images.square ? <img src={images.square} alt="" /> : null}
          <div className="xd-reel-overlay">
            <span className="xd-reel-hook">{a.hook}</span>
            {beat ? <span className="xd-reel-text">{beat.onScreen}</span> : null}
          </div>
        </div>
      );
    }
    case "carousel":
      return (
        <div className="xd-native">
          <Carousel a={a} image={images.square} />
        </div>
      );
    case "linkedin":
      return (
        <div className="xd-native xd-li">
          <div className="xd-native-head">
            <span className="xd-avatar">{brand.slice(0, 1)}</span>
            {brand}
          </div>
          <p className={`xd-li-body ${large ? "" : "clamp"}`}>{a.body}</p>
        </div>
      );
    case "youtube":
      return (
        <div className="xd-native xd-yt">
          <div className="xd-yt-thumb" style={{ aspectRatio: meta.ratio }}>
            {images.wide ?? images.square ? <img src={images.wide ?? images.square} alt="" /> : null}
            <strong>{a.thumbnailText}</strong>
          </div>
          <p className="xd-yt-title">{a.title}</p>
        </div>
      );
    default:
      return (
        <div className="xd-native xd-doc">
          <p className="xd-doc-title">{a.title}</p>
          <p className={`xd-doc-body ${large ? "" : "clamp"}`}>{a.body}</p>
        </div>
      );
  }
}

/** Plain text of an artifact for copy/export. */
export function artifactText(a: Artifact) {
  const parts = [a.title];
  if (a.hook) parts.push(`Hook: ${a.hook}`);
  a.beats?.forEach((b, i) =>
    parts.push(`${i + 1}. Visual: ${b.visual}\n   Voice: ${b.voice}\n   On screen: ${b.onScreen}`),
  );
  a.slides?.forEach((s, i) => parts.push(`Slide ${i + 1}: ${s.heading} — ${s.body}`));
  if (a.thumbnailText) parts.push(`Thumbnail: ${a.thumbnailText}`);
  if (a.body) parts.push(a.body);
  if (a.caption) parts.push(a.caption);
  if (a.cta) parts.push(`CTA: ${a.cta}`);
  return parts.join("\n\n");
}
