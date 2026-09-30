import { useState, type CSSProperties } from "react";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Globe,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Send,
  ThumbsUp,
} from "lucide-react";
import { type Artifact } from "@/lib/expo-demo-types";
import "./demo-artifacts.css";

type PreviewProps = {
  a: Artifact;
  images: { square?: string; wide?: string };
  brand: string;
  large?: boolean;
  /** Campaign headline belongs in the artwork, not a duplicate card heading. */
  headline?: string;
  location?: string;
  /** Photo-first artwork for the dense campaign wall; platform detail remains in expanded view. */
  compact?: boolean;
};

function cleanBrand(brand: string) {
  return brand.replace(/\s*\(example\)\s*/gi, "").trim();
}

function Identity({
  brand,
  location,
  network,
}: {
  brand: string;
  location?: string;
  network: "instagram" | "linkedin";
}) {
  const name = cleanBrand(brand);
  return (
    <div className="xp-identity">
      <span className="xp-avatar" aria-hidden="true">
        {name
          .split(/\s+/)
          .map((part) => part[0])
          .slice(0, 2)
          .join("")}
      </span>
      <div className="xp-identity-copy">
        <strong>{name}</strong>
        <span>
          {location || "Campaign preview"}
          {network === "linkedin" ? (
            <>
              {" "}
              · <Globe size={10} aria-label="Public post format" />
            </>
          ) : null}
        </span>
      </div>
      <MoreHorizontal size={18} className="xp-more" aria-hidden="true" />
    </div>
  );
}

function Photo({ src, position = "50% 50%" }: { src?: string; position?: string }) {
  return src ? (
    <img
      className="xp-photo"
      src={src}
      alt=""
      style={{ objectPosition: position }}
      draggable={false}
    />
  ) : (
    <span className="xp-photo-missing" aria-hidden="true" />
  );
}

function Poster({
  a,
  src,
  brand,
  headline,
  location,
}: Omit<PreviewProps, "images"> & { src?: string }) {
  return (
    <div className="xp-poster">
      <Photo src={src} />
      <div className="xp-poster-shade" />
      <div className="xp-poster-copy">
        <h3>{a.hook || headline || a.title}</h3>
        <span className="xp-brush" aria-hidden="true" />
        <div className="xp-poster-signature">
          <strong>{cleanBrand(brand)}</strong>
          {location ? <span>{location}</span> : null}
        </div>
      </div>
    </div>
  );
}

function Instagram({ a, images, brand, headline, location, large, compact }: PreviewProps) {
  return (
    <article
      className={`xp-artifact xp-instagram ${large ? "xp-large" : ""} ${compact ? "xp-art-only" : ""}`}
      aria-label={`${cleanBrand(brand)} Instagram post preview`}
    >
      {!compact ? <Identity brand={brand} location={location} network="instagram" /> : null}
      <Poster
        a={a}
        src={images.square || images.wide}
        brand={brand}
        headline={headline}
        location={location}
      />
      {!compact ? (
        <>
          <div className="xp-ig-actions" aria-label="Instagram post action preview">
            <Heart />
            <MessageCircle />
            <Send />
            <Bookmark className="xp-save" />
          </div>
          <p className={`xp-ig-caption ${large ? "" : "xp-clamp-2"}`}>
            <strong>{cleanBrand(brand)}</strong> {a.caption || a.cta}
          </p>
        </>
      ) : null}
    </article>
  );
}

function Storyboard({ a, images, brand, location, large }: PreviewProps) {
  const [firstBeat, setFirstBeat] = useState(0);
  const beats = a.beats?.length
    ? a.beats
    : [{ visual: a.title, voice: a.caption, onScreen: a.hook || a.title }];
  const start = Math.min(firstBeat, Math.max(0, beats.length - 3));
  const visible = beats.slice(start, start + 3);
  const durationMatch = a.title.match(/(\d+)\s*(?:seconds?|secs?|s\b)/i);
  const duration = durationMatch ? Number(durationMatch[1]) : Math.max(15, beats.length * 5);
  const time = (index: number) =>
    `${Math.round((index * duration) / beats.length)}–${Math.round(((index + 1) * duration) / beats.length)}s`;
  return (
    <article
      className={`xp-artifact xp-storyboard ${large ? "xp-large" : ""}`}
      aria-label={`${a.title}, storyboard preview`}
    >
      <div
        className="xp-storyboard-film"
        style={{ "--xp-scenes": visible.length } as CSSProperties}
      >
        {visible.map((beat, offset) => {
          const index = start + offset;
          return (
            <section
              className="xp-scene"
              key={`${a.id}-${index}`}
              aria-label={`Scene ${index + 1}: ${beat.visual}`}
            >
              <Photo
                src={index % 2 ? images.wide || images.square : images.square || images.wide}
                position={["28% 50%", "75% 62%", "50% 36%"][offset]}
              />
              <div className="xp-scene-shade" />
              <div className="xp-scene-copy">
                <span className="xp-scene-time">
                  {index + 1}. {time(index)}
                </span>
                <strong>{beat.onScreen || beat.visual}</strong>
                <p>{beat.visual}</p>
              </div>
            </section>
          );
        })}
        <footer className="xp-storyboard-end">
          <strong>{a.cta || a.hook || cleanBrand(brand)}</strong>
          <span>{location || cleanBrand(brand)}</span>
        </footer>
      </div>
      <div className="xp-sequence-controls" onClick={(e) => e.stopPropagation()}>
        <span>Storyboard · suggested timing</span>
        {beats.length > 3 ? (
          <div>
            <button
              type="button"
              aria-label="Previous storyboard scene"
              disabled={start === 0}
              onClick={() => setFirstBeat(Math.max(0, start - 1))}
            >
              <ChevronLeft size={14} />
            </button>
            <span>
              {start + 1}–{Math.min(start + 3, beats.length)} / {beats.length}
            </span>
            <button
              type="button"
              aria-label="Next storyboard scene"
              disabled={start + 3 >= beats.length}
              onClick={() => setFirstBeat(Math.min(beats.length - 3, start + 1))}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function Carousel({ a, images, brand, large }: PreviewProps) {
  const [active, setActive] = useState(0);
  const slides = a.slides ?? [];
  const index = Math.min(active, Math.max(0, slides.length - 1));
  if (!slides.length) return null;
  return (
    <article
      className={`xp-artifact xp-carousel ${large ? "xp-large" : ""}`}
      aria-label={`${a.title}, carousel preview`}
    >
      <div className="xp-carousel-toolbar" onClick={(e) => e.stopPropagation()}>
        <span>
          {index + 1} / {slides.length}
        </span>
        <div>
          <button
            type="button"
            aria-label="Previous slide"
            disabled={index === 0}
            onClick={() => setActive(Math.max(0, index - 1))}
          >
            <ChevronLeft size={15} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            disabled={index === slides.length - 1}
            onClick={() => setActive(Math.min(slides.length - 1, index + 1))}
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
      <div className="xp-carousel-window">
        <div className="xp-carousel-track" style={{ "--xp-slide": index } as CSSProperties}>
          {slides.map((slide, i) => (
            <section
              className={`xp-slide xp-slide-${i % 3}`}
              key={`${a.id}-${i}`}
              aria-label={`Slide ${i + 1}: ${slide.heading}`}
            >
              {i % 3 !== 0 ? (
                <>
                  <Photo
                    src={i % 2 ? images.square || images.wide : images.wide || images.square}
                    position={i % 2 ? "70% 50%" : "30% 50%"}
                  />
                  <div className="xp-slide-shade" />
                </>
              ) : null}
              <div className="xp-slide-copy">
                <strong>{slide.heading}</strong>
                <p>{slide.body}</p>
                <span>{cleanBrand(brand)}</span>
              </div>
            </section>
          ))}
        </div>
      </div>
      <div
        className="xp-carousel-dots"
        aria-label="Choose carousel slide"
        onClick={(e) => e.stopPropagation()}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            aria-pressed={i === index}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </article>
  );
}

function LinkedIn({ a, images, brand, location, large }: PreviewProps) {
  return (
    <article
      className={`xp-artifact xp-linkedin ${large ? "xp-large" : ""}`}
      aria-label={`${cleanBrand(brand)} LinkedIn post preview`}
    >
      <Identity brand={brand} location={location} network="linkedin" />
      <p className={`xp-linkedin-body ${large ? "" : "xp-clamp-3"}`}>{a.body || a.caption}</p>
      {images.wide || images.square ? (
        <div className="xp-linkedin-image">
          <Photo src={images.wide || images.square} />
        </div>
      ) : null}
      <p className="xp-linkedin-cta">{a.cta}</p>
      {large ? (
        <div className="xp-linkedin-actions" aria-label="LinkedIn post action preview">
          <span>
            <ThumbsUp /> Like
          </span>
          <span>
            <MessageCircle /> Comment
          </span>
          <span>
            <Repeat2 /> Repost
          </span>
          <span>
            <Send /> Send
          </span>
        </div>
      ) : null}
    </article>
  );
}

function YouTube({ a, images, brand, large, compact }: PreviewProps) {
  return (
    <article
      className={`xp-artifact xp-youtube ${large ? "xp-large" : ""} ${compact ? "xp-art-only" : ""}`}
      aria-label={`${a.title}, YouTube thumbnail preview`}
    >
      <div className="xp-youtube-image">
        <Photo src={images.wide || images.square} />
        <div className="xp-youtube-shade" />
        <strong>{a.thumbnailText || a.hook || a.title}</strong>
        <span className="xp-brush" aria-hidden="true" />
      </div>
      {!compact ? (
        <div className="xp-youtube-meta">
          <span className="xp-youtube-avatar">{cleanBrand(brand).slice(0, 1)}</span>
          <div>
            <h3>{a.title}</h3>
            <p>
              {cleanBrand(brand)} <span>· Video concept</span>
            </p>
          </div>
          <MoreHorizontal size={17} aria-hidden="true" />
        </div>
      ) : null}
    </article>
  );
}

function CustomerPiece({ a, brand, large }: PreviewProps) {
  const paragraphs = (a.body || a.caption).split(/\n\s*\n/).filter(Boolean);
  const subject = paragraphs[0]?.match(/^Subject:\s*(.*)/i)?.[1];
  const body = subject ? paragraphs.slice(1) : paragraphs;
  return (
    <article
      className={`xp-artifact xp-document ${large ? "xp-large" : ""}`}
      aria-label={`${a.title}, customer piece preview`}
    >
      <div className="xp-document-brand">
        <span>{cleanBrand(brand)}</span>
        <span>Made for you.</span>
      </div>
      <div className="xp-document-rule" />
      <p className="xp-document-kind">{subject ? "A note from us" : "Stay a little closer"}</p>
      <h3>{subject || a.title}</h3>
      <div className={`xp-document-body ${large ? "" : "xp-document-excerpt"}`}>
        {body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {a.cta ? (
        <p className="xp-document-cta">
          {a.cta}
          <span aria-hidden="true">↗</span>
        </p>
      ) : null}
      <div className="xp-document-signoff">
        {cleanBrand(brand)}
        <span>A little more human.</span>
      </div>
    </article>
  );
}

/** Native artwork and platform anatomy, shared by the wall and enlarged preview. */
export function ArtifactPreview(props: PreviewProps) {
  switch (props.a.type) {
    case "instagram":
      return <Instagram {...props} />;
    case "reel":
      return <Storyboard {...props} key={`${props.a.id}-${props.a.title}`} />;
    case "carousel":
      return <Carousel {...props} key={`${props.a.id}-${props.a.title}`} />;
    case "linkedin":
      return <LinkedIn {...props} />;
    case "youtube":
      return <YouTube {...props} />;
    default:
      return <CustomerPiece {...props} />;
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
