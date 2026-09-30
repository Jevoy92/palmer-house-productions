import { StudioDraftImage } from "./StudioDraftImage";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Instagram,
  Layers,
  Linkedin,
  Maximize2,
  MoreHorizontal,
  Send,
  Youtube,
  Download,
  ExternalLink,
  FileText,
  LoaderCircle,
  MessageCircle,
  Pencil,
  Play,
  Share2,
  ThumbsUp,
  X,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";
import type { Tables } from "@/lib/supabase/database.types";
import type { GuideProfile } from "@/lib/pal-directory";
import { studioAssetMedia, studioAssetStoryboard } from "./StudioAssetVisual";
import "./studio-chat-artifacts.css";
import { CampaignBoard } from "@/components/expo/CampaignBoard";
import type { ArtifactType } from "@/lib/expo-demo-types";
import { StudioMarkdown } from "./StudioMarkdown";
import { StudioCopyButton } from "./StudioAssetActions";
import { PalAvatar } from "./PalAvatar";
import { useStudio } from "./StudioProvider";
import { useStudioMotion } from "./studio-motion";

type Asset = Tables<"campaign_assets">;

export function StudioOriginAvatar({
  pal,
  avatarPath,
}: {
  pal: GuideProfile;
  avatarPath?: string;
}) {
  const { resolvePalAvatar } = useStudio();
  const resolver = useRef(resolvePalAvatar);
  resolver.current = resolvePalAvatar;
  const [url, setUrl] = useState("");
  useEffect(() => {
    let current = true;
    setUrl("");
    if (avatarPath && resolver.current)
      void resolver
        .current(avatarPath)
        .then((value) => {
          if (current) setUrl(value);
        })
        .catch(() => {});
    return () => {
      current = false;
    };
  }, [avatarPath]);
  return <PalAvatar pal={url ? { ...pal, avatar: url } : pal} size="xs" ring={false} />;
}
// eslint-disable-next-line react-refresh/only-export-components
export const record = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};

// eslint-disable-next-line react-refresh/only-export-components
export function chatAssetLabel(asset: Asset) {
  const meta = record(asset.metadata);
  if (typeof meta.platform === "string") {
    const platforms: Record<string, string> = {
      facebook: "Facebook",
      instagram: "Instagram",
      youtube: "YouTube",
      linkedin: "LinkedIn",
      tiktok: "TikTok",
      x: "X",
      email: "Email",
    };
    return platforms[meta.platform.toLowerCase()] || meta.platform;
  }
  const labels: Record<string, string> = {
    anchor_script: "Anchor script",
    short_script: "Short script",
    platform_post: "Post",
    article: "Article",
    newsletter: "Newsletter",
    image: "Image",
    pdf: "PDF",
    document: "PDF",
    carousel: "Carousel",
    caption: "Caption",
  };
  return labels[asset.kind] || asset.kind.replaceAll("_", " ");
}

const mediaUrl = studioAssetMedia;

function useAssetMedia(asset?: Asset) {
  const { getAssetImageUrl } = useStudio();
  const meta = record(asset?.metadata);
  const storagePath = meta.storagePath || meta.storage_path;
  const directUrl = asset ? mediaUrl(asset) : "";
  const mediaAssetId = meta.mediaAssetId;
  const id = asset?.id;
  const kind = asset?.kind;
  const key = `${id}:${String(mediaAssetId || storagePath || "")}:${directUrl}`;
  const [resolved, setResolved] = useState({ key, url: directUrl });
  useEffect(() => {
    let active = true;
    setResolved({ key, url: directUrl });
    if (
      !id ||
      directUrl ||
      !getAssetImageUrl ||
      !(mediaAssetId || (kind === "image" && storagePath))
    )
      return;
    void getAssetImageUrl(id)
      .then((url) => {
        if (active) setResolved({ key, url });
      })
      .catch(() => {
        if (active) setResolved({ key, url: "" });
      });
    return () => {
      active = false;
    };
  }, [id, kind, key, directUrl, getAssetImageUrl, storagePath, mediaAssetId]);
  return resolved.key === key ? resolved.url : directUrl;
}

function platformFor(asset: Asset) {
  const platform = record(asset.metadata).platform;
  return typeof platform === "string" ? platform.toLowerCase() : "";
}

function plainCopy(value: string) {
  return value
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}

function assetSlides(asset: Asset): string[] {
  const metadata = record(asset.metadata);
  if (!metadata.studioTextOverride && Array.isArray(metadata.slides)) {
    return metadata.slides
      .flatMap((slide) => {
        if (typeof slide === "string") return [slide];
        const value = record(slide);
        return typeof value.body === "string"
          ? [
              [typeof value.heading === "string" ? value.heading : "", value.body]
                .filter(Boolean)
                .join("\n"),
            ]
          : [];
      })
      .filter((slide) => slide.trim());
  }
  return [];
}

function previewFormat(asset: Asset) {
  if (asset.kind.includes("script")) return "script";
  if (asset.kind === "carousel" || String(record(asset.metadata).format).includes("carousel"))
    return "carousel";
  return platformFor(asset) === "youtube" ? "youtube" : "post";
}

function draftStatus(asset: Asset) {
  if (asset.status === "archived") return "Archived";
  if (["failed", "error"].includes(asset.status)) return "Needs attention";
  if (["generating", "building", "processing", "queued", "pending"].includes(asset.status))
    return "In progress";
  const meta = record(asset.metadata);
  if (
    asset.content.trim() ||
    mediaUrl(asset) ||
    meta.mediaAssetId ||
    meta.storagePath ||
    meta.storage_path
  ) {
    return asset.status === "approved" ? "Approved" : "Ready to review";
  }
  return "Awaiting content";
}

function PlatformMark({ asset }: { asset: Asset }) {
  const platform = platformFor(asset);
  return (
    <span className={`studio-campaign-platform is-${platform || previewFormat(asset)}`}>
      {platform === "linkedin" ? (
        <Linkedin size={17} />
      ) : platform === "youtube" ? (
        <Youtube size={18} />
      ) : platform === "instagram" ? (
        <Instagram size={16} />
      ) : previewFormat(asset) === "carousel" ? (
        <Layers size={16} />
      ) : previewFormat(asset) === "script" ? (
        <Play size={15} />
      ) : (
        <FileText size={16} />
      )}
    </span>
  );
}

function ScriptDraftArtwork({ asset, business }: { asset: Asset; business: string }) {
  const meta = record(asset.metadata);
  const overridden = Boolean(meta.studioTextOverride);
  const beats = overridden ? [] : studioAssetStoryboard(asset);
  const hook =
    !overridden && typeof meta.hook === "string"
      ? meta.hook
      : plainCopy(asset.content).split(/\n+/).find(Boolean) || asset.title;
  const cta = !overridden && typeof meta.callToAction === "string" ? meta.callToAction : "";
  const visual =
    beats[0]?.text || (!overridden && typeof meta.visual === "string" ? meta.visual : "");
  return (
    <div className="studio-campaign-script">
      <small>{business}</small>
      <strong>{plainCopy(hook)}</strong>
      <dl>
        <div>
          <dt>Hook</dt>
          <dd>{plainCopy(hook)}</dd>
        </div>
        {visual ? (
          <div>
            <dt>Visual</dt>
            <dd>{plainCopy(visual)}</dd>
          </div>
        ) : null}
        {cta ? (
          <div>
            <dt>CTA</dt>
            <dd>{plainCopy(cta)}</dd>
          </div>
        ) : null}
      </dl>
      <span>Script draft</span>
    </div>
  );
}

export function StudioNativeDraft({
  asset,
  content,
  compact = false,
}: {
  asset: Asset;
  content?: string;
  compact?: boolean;
}) {
  const { brand, workspace } = useStudio();
  const business = brand?.business_name || workspace?.name || "Your brand";
  const image = useAssetMedia(asset);
  const [failedImage, setFailedImage] = useState("");
  const platform = platformFor(asset);
  const slides = assetSlides(asset);
  const isCarousel = previewFormat(asset) === "carousel";
  const [slideIndex, setSlideIndex] = useState(0);
  const currentSlide = Math.min(slideIndex, Math.max(slides.length - 1, 0));
  const isDocument = ["article", "newsletter", "pdf", "document"].includes(asset.kind);
  const isScript = asset.kind.includes("script");
  const isInstagram = platform === "instagram";
  const isYoutube = platform === "youtube";
  const hasMedia = Boolean(
    image && image !== failedImage && !["pdf", "document"].includes(asset.kind),
  );
  const body =
    compact && isScript ? (
      <ScriptDraftArtwork asset={asset} business={business} />
    ) : (
      <div className="studio-native-copy">
        {isDocument || isScript || isYoutube ? <h3>{asset.title}</h3> : null}
        <StudioMarkdown>{content ?? asset.content}</StudioMarkdown>
      </div>
    );
  const media =
    isCarousel && slides.length ? (
      <div className="studio-native-carousel">
        <div className={`studio-native-carousel-slide ${hasMedia ? "has-photo" : ""}`}>
          {hasMedia ? <img src={image} alt="" onError={() => setFailedImage(image)} /> : null}
          <span>
            {currentSlide + 1} / {slides.length}
          </span>
          <strong>{plainCopy(slides[currentSlide])}</strong>
          <small>{business}</small>
        </div>
        <div className="studio-native-carousel-controls">
          <button
            type="button"
            aria-label="Previous slide"
            disabled={currentSlide === 0}
            onClick={() => setSlideIndex(currentSlide - 1)}
          >
            <ChevronLeft size={17} />
          </button>
          <span>
            Slide {currentSlide + 1} of {slides.length}
          </span>
          <button
            type="button"
            aria-label="Next slide"
            disabled={currentSlide === slides.length - 1}
            onClick={() => setSlideIndex(currentSlide + 1)}
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    ) : hasMedia ? (
      <div className="studio-native-media">
        <img
          src={image}
          alt={
            typeof record(asset.metadata).imageAlt === "string"
              ? String(record(asset.metadata).imageAlt)
              : asset.title
          }
          loading="lazy"
          onError={() => setFailedImage(image)}
        />
        {isScript ? (
          <span className="studio-native-media-label">Script reference image</span>
        ) : null}
      </div>
    ) : null;
  return (
    <article
      className={`studio-native-draft studio-native-platform ${isDocument ? "is-document" : ""} ${compact ? "is-compact" : ""} ${hasMedia ? "has-media" : ""} platform-${platform || "draft"}`}
    >
      <header className="studio-native-header">
        <span className="studio-brand-initials">
          {business
            .split(/\s+/)
            .slice(0, 2)
            .map((word) => word[0])
            .join("")}
        </span>
        <div>
          <strong>{business}</strong>
          <small>{isCarousel ? "Carousel" : chatAssetLabel(asset)} · Draft preview</small>
        </div>
        <MoreHorizontal size={19} className="studio-native-menu" aria-hidden="true" />
      </header>
      {isInstagram || isYoutube || isCarousel ? (
        media
      ) : (
        <>
          {body}
          {media}
        </>
      )}
      {!isDocument && !isScript && asset.kind !== "image" && !isYoutube ? (
        <div className="studio-preview-social" aria-label="Illustrative platform controls">
          {isInstagram ? (
            <>
              <Heart size={20} />
              <MessageCircle size={20} />
              <Send size={20} />
              <Bookmark size={20} className="studio-native-bookmark" />
            </>
          ) : (
            <>
              <span>
                <ThumbsUp size={16} /> Like
              </span>
              <span>
                <MessageCircle size={16} /> Comment
              </span>
              <span>
                <Share2 size={16} /> Share
              </span>
            </>
          )}
        </div>
      ) : null}
      {isInstagram || isYoutube || isCarousel ? body : null}
      {isScript ? (
        <footer className="studio-script-note">
          <FileText size={14} /> Video script · Draft for review
        </footer>
      ) : null}
    </article>
  );
}

function CampaignPreview({
  asset,
  business,
  onOpen,
}: {
  asset: Asset;
  business: string;
  onOpen: () => void;
}) {
  const image = useAssetMedia(asset);
  const [failedImage, setFailedImage] = useState("");
  const media = image && image !== failedImage ? image : "";
  const format = previewFormat(asset);
  const slides = assetSlides(asset);
  const meta = record(asset.metadata);
  const hasDraft = ["Ready to review", "Approved"].includes(draftStatus(asset));
  return (
    <button
      type="button"
      className={`studio-campaign-preview format-${format}`}
      onClick={onOpen}
      aria-label={`Open ${chatAssetLabel(asset)}: ${asset.title}`}
    >
      <div className="studio-campaign-preview-frame">
        {format === "script" ? (
          <ScriptDraftArtwork asset={asset} business={business} />
        ) : format === "carousel" ? (
          <div className="studio-campaign-slides">
            {(slides.length ? slides.slice(0, 3) : [asset.title]).map((slide, index) => (
              <div className="studio-campaign-slide" key={index}>
                {media ? (
                  <img src={media} alt="" loading="lazy" onError={() => setFailedImage(image)} />
                ) : null}
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{plainCopy(slide)}</strong>
                <small>{business}</small>
              </div>
            ))}
          </div>
        ) : media ? (
          <img
            className="studio-campaign-photo"
            src={media}
            alt={asset.title}
            loading="lazy"
            onError={() => setFailedImage(image)}
          />
        ) : (
          <div className="studio-campaign-text-cover">
            <PlatformMark asset={asset} />
            <small>{business}</small>
            <strong>{asset.title}</strong>
            <p>{plainCopy(asset.content).slice(0, 150)}</p>
            <span>{hasDraft ? "Text draft" : draftStatus(asset)}</span>
          </div>
        )}
        <span className="studio-campaign-expand">
          <Maximize2 size={14} />
        </span>
      </div>
      <span className="studio-campaign-preview-label">
        {format === "carousel"
          ? "Carousel"
          : format === "script"
            ? asset.kind === "short_script"
              ? "Reel script"
              : "Video script"
            : chatAssetLabel(asset)}
        {format === "carousel" && slides.length ? ` · ${slides.length} slides` : ""}
        {format === "script" && typeof meta.duration === "string" ? ` · ${meta.duration}` : ""}
      </span>
    </button>
  );
}

export function StudioChatArtifactCard({
  assetIds,
  campaignId,
  onOpen,
}: {
  assetIds?: string[];
  campaignId?: string;
  onOpen: (assetId: string, mode: "preview" | "edit") => void;
}) {
  const { assets, campaigns, brand, workspace } = useStudio();
  const campaign = campaigns.find((item) => item.id === campaignId);
  const drafts = assets.filter((asset) =>
    campaignId
      ? asset.campaign_id === campaignId && !["production_note", "faq"].includes(asset.kind)
      : assetIds?.includes(asset.id),
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [boardOpen, setBoardOpen] = useState(false);
  const [boardLayout, setBoardLayout] = useState<"vertical" | "horizontal">("vertical");
  const selected = drafts.find((asset) => asset.id === selectedId) || drafts[0];
  if (!selected) return null;
  const business = brand?.business_name || workspace?.name || "Your brand";
  const featured: Asset[] = [];
  for (const match of [
    (asset: Asset) => platformFor(asset) === "instagram" && previewFormat(asset) === "post",
    (asset: Asset) => previewFormat(asset) === "carousel",
    (asset: Asset) => asset.kind === "short_script",
  ]) {
    const asset = drafts.find((item) => !featured.includes(item) && match(item));
    if (asset) featured.push(asset);
  }
  for (const asset of drafts) {
    if (featured.length >= 3) break;
    if (!featured.includes(asset)) featured.push(asset);
  }
  const rest = drafts.filter((asset) => !featured.includes(asset));
  const ready = drafts.filter((asset) =>
    ["Ready to review", "Approved"].includes(draftStatus(asset)),
  ).length;
  const open = (asset: Asset) => {
    setSelectedId(asset.id);
    onOpen(asset.id, "preview");
  };
  return (
    <section
      className="studio-chat-artifact studio-campaign-card"
      data-asset-id={selected.id}
      aria-label={campaign?.title || selected.title}
    >
      <header className="studio-campaign-heading">
        <div>
          <h2>{campaign?.title || selected.title}</h2>
          <p>
            {business}
            {brand?.locations?.[0] ? ` · ${brand.locations[0]}` : ""}
          </p>
        </div>
        <div className="studio-campaign-readiness">
          <span>
            {ready} of {drafts.length} ready to review
          </span>
          <progress value={ready} max={drafts.length} aria-label="Drafts ready to review" />
        </div>
      </header>
      <div
        className="studio-campaign-previews"
        style={{ gridTemplateColumns: `repeat(${featured.length}, minmax(0, 1fr))` }}
      >
        {featured.map((asset) => (
          <CampaignPreview
            key={asset.id}
            asset={asset}
            business={business}
            onOpen={() => open(asset)}
          />
        ))}
      </div>
      {rest.length ? (
        <div className="studio-campaign-remaining">
          {rest.slice(0, 2).map((asset) => (
            <button
              type="button"
              key={asset.id}
              onClick={() => open(asset)}
              aria-label={`Open ${chatAssetLabel(asset)}: ${asset.title}`}
            >
              <PlatformMark asset={asset} />
              <span className="studio-campaign-row-title">{chatAssetLabel(asset)}</span>
              <small
                className={
                  ["Ready to review", "Approved"].includes(draftStatus(asset)) ? "is-ready" : ""
                }
              >
                {draftStatus(asset)}
              </small>
              <Maximize2 size={13} />
            </button>
          ))}
        </div>
      ) : null}
      <footer className="studio-campaign-actions">
        <button
          type="button"
          className="studio-campaign-primary"
          onClick={() => setBoardOpen(true)}
        >
          {campaign ? "Open campaign" : "Open drafts"} <ArrowRight size={16} />
        </button>
        {drafts.length > 1 ? (
          <button type="button" onClick={() => setBoardOpen(true)}>
            View all {drafts.length}
          </button>
        ) : null}
        <button type="button" onClick={() => onOpen(selected.id, "edit")}>
          <Pencil size={14} /> Edit draft
        </button>
      </footer>
      <Dialog.Root open={boardOpen} onOpenChange={setBoardOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="studio-campaign-board-overlay" />
          <Dialog.Content className="studio-campaign-board-dialog" aria-describedby={undefined}>
            <Dialog.Title className="sr-only">{campaign?.title || selected.title}</Dialog.Title>
            <Dialog.Close className="studio-campaign-board-close" aria-label="Close campaign board">
              <X size={18} />
            </Dialog.Close>
            <CampaignBoard
              business={business}
              headline={campaign?.title || selected.title}
              statusLabel={`${ready} of ${drafts.length} drafts ready to review`}
              layout={boardLayout}
              onLayoutChange={setBoardLayout}
              onBack={() => setBoardOpen(false)}
              items={drafts.map((asset) => {
                const format = previewFormat(asset);
                const platform = platformFor(asset);
                const kind: ArtifactType =
                  format === "carousel"
                    ? "carousel"
                    : asset.kind === "short_script"
                      ? "reel"
                      : format === "script" || platform === "youtube"
                        ? "youtube"
                        : platform === "linkedin"
                          ? "linkedin"
                          : platform === "instagram" || asset.kind === "image"
                            ? "instagram"
                            : "extra";
                return {
                  id: asset.id,
                  kind,
                  label:
                    kind === "carousel"
                      ? "Carousel"
                      : kind === "reel"
                        ? "Reel script"
                        : chatAssetLabel(asset),
                  aspect:
                    kind === "youtube"
                      ? "16 / 9"
                      : kind === "reel"
                        ? "9 / 16"
                        : kind === "carousel"
                          ? "1 / 1"
                          : "4 / 5",
                  preview: <StudioNativeDraft asset={asset} compact />,
                  onOpen: () => {
                    setBoardOpen(false);
                    open(asset);
                  },
                };
              })}
            />
            {campaign ? (
              <Link
                className="studio-campaign-details-link"
                to="/studio/campaigns/$campaignId"
                params={{ campaignId: campaign.id }}
              >
                Campaign details <ExternalLink size={13} />
              </Link>
            ) : null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}

export function StudioChatEditor({
  assetId,
  initialMode,
  pal,
  onClose,
  onRefine,
}: {
  assetId: string;
  initialMode: "preview" | "edit";
  pal: GuideProfile;
  onClose: () => void;
  onRefine: (prompt: string) => void;
}) {
  const { assets, updateAsset, getArtifactUrl } = useStudio();
  const { reduceMotion, fadeTransition } = useStudioMotion();
  const modeId = useId();
  const asset = assets.find((item) => item.id === assetId);
  const editImage = useAssetMedia(asset);
  const [mode, setMode] = useState(initialMode);
  const [draft, setDraft] = useState(asset?.content || "");
  const lastPersisted = useRef(asset?.content || "");
  const [saving, setSaving] = useState(false);
  const [imageBusy, setImageBusy] = useState(false);
  const [error, setError] = useState("");
  const [refinement, setRefinement] = useState("");
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 1100px)").matches,
  );
  const opener = useRef(
    typeof document !== "undefined" ? (document.activeElement as HTMLElement | null) : null,
  );
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);
  useEffect(() => {
    if (!asset) return;
    const previous = lastPersisted.current;
    setDraft((current) => (current === previous ? asset.content : current));
    lastPersisted.current = asset.content;
  }, [asset]);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 1100px)");
    const change = () => setMobile(media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  const dirty = Boolean(asset && draft !== asset.content);
  async function save() {
    if (!asset || saving) return;
    setSaving(true);
    setError("");
    try {
      await updateAsset(asset.id, { content: draft });
      toast.success("Changes saved everywhere.");
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Could not save. Your changes are still here.",
      );
    } finally {
      setSaving(false);
    }
  }
  function close() {
    if (saving || imageBusy) return;
    if (dirty && !window.confirm("Discard the unsaved changes to this draft?")) return;
    onClose();
    if (!mobile) opener.current?.focus();
  }
  async function download() {
    if (!asset) return;
    try {
      const metadata = record(asset.metadata);
      const url =
        metadata.storagePath || metadata.storage_path
          ? await getArtifactUrl(asset.id)
          : mediaUrl(asset) || (await getArtifactUrl(asset.id));
      const extension = ["pdf", "document"].includes(asset.kind)
        ? "pdf"
        : metadata.mimeType === "image/jpeg"
          ? "jpg"
          : metadata.mimeType === "image/webp"
            ? "webp"
            : "png";
      const a = document.createElement("a");
      a.href = url;
      a.download = `${asset.title}.${extension}`;
      a.target = "_blank";
      a.rel = "noopener";
      a.click();
    } catch (reason) {
      toast.error(reason instanceof Error ? reason.message : "Could not open this file.");
    }
  }
  if (!asset) return null;
  const content = (
    <>
      <header className="studio-editor-header">
        <div>
          <small>{chatAssetLabel(asset)}</small>
          <h2>{asset.title}</h2>
        </div>
        <button type="button" onClick={close} aria-label="Close draft editor">
          <X size={19} />
        </button>
      </header>
      <div className="studio-editor-body">
        <p className="studio-editor-status">
          <Check size={14} /> Saved changes update this draft everywhere.
        </p>
        <div
          className="studio-editor-tabs"
          role="tablist"
          aria-label="Draft view"
          onKeyDown={(event) => {
            if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            const next =
              event.key === "Home"
                ? "preview"
                : event.key === "End"
                  ? "edit"
                  : mode === "preview"
                    ? "edit"
                    : "preview";
            setMode(next);
            event.currentTarget
              .querySelectorAll<HTMLButtonElement>("button")
              [next === "preview" ? 0 : 1]?.focus();
          }}
        >
          <button
            role="tab"
            id={`${modeId}-preview`}
            aria-controls={`${modeId}-panel`}
            tabIndex={mode === "preview" ? 0 : -1}
            aria-selected={mode === "preview"}
            onClick={() => setMode("preview")}
          >
            Preview
          </button>
          <button
            role="tab"
            id={`${modeId}-edit`}
            aria-controls={`${modeId}-panel`}
            tabIndex={mode === "edit" ? 0 : -1}
            aria-selected={mode === "edit"}
            onClick={() => setMode("edit")}
          >
            Edit
          </button>
        </div>
        <motion.div
          key={mode}
          id={`${modeId}-panel`}
          role="tabpanel"
          aria-labelledby={`${modeId}-${mode}`}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={fadeTransition}
        >
          {mode === "preview" ? (
            <StudioNativeDraft asset={asset} content={draft} />
          ) : (
            <label className="studio-editor-label">
              {asset.kind.includes("script") ? "Script" : "Post text"}
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                disabled={saving}
                rows={6}
              />
              <small>{draft.length} characters</small>
            </label>
          )}
        </motion.div>
        {mode === "edit" && editImage ? (
          <div className="studio-editor-image">
            <strong>Image</strong>
            <img
              src={editImage}
              alt={
                typeof record(asset.metadata).imageAlt === "string" &&
                String(record(asset.metadata).imageAlt).trim()
                  ? String(record(asset.metadata).imageAlt).trim()
                  : asset.title
              }
            />
          </div>
        ) : null}
        <StudioDraftImage asset={asset} disabled={dirty || saving} onBusyChange={setImageBusy} />
        <section className="studio-editor-refine">
          <div>
            <PalAvatar pal={pal} size="sm" />
            <strong>Refine with {pal.name}</strong>
          </div>
          <p>Ask your Pal for a revision in chat, then review the changes.</p>
          <div className="studio-refine-suggestions">
            {["Make it shorter", "Make it more personal"].map((value) => (
              <button key={value} onClick={() => setRefinement(value)}>
                {value}
              </button>
            ))}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!refinement.trim()) return;
              onRefine(
                `Refine the draft “${asset.title}”: ${refinement}\n\nCurrent draft:\n${draft}`,
              );
              setRefinement("");
            }}
          >
            <input
              value={refinement}
              onChange={(event) => setRefinement(event.target.value)}
              placeholder={`Tell ${pal.name} what to change…`}
              aria-label="Refinement request"
            />
            <button type="submit" disabled={!refinement.trim()} aria-label="Ask Pal to refine">
              <ExternalLink size={16} />
            </button>
          </form>
        </section>
        {error ? (
          <p role="alert" className="studio-chat-error">
            {error}
          </p>
        ) : null}
      </div>
      <footer className="studio-editor-footer">
        <p role="status">
          <Check size={14} /> {dirty ? "Unsaved changes" : "Saved to Library"}
        </p>
        <div>
          <StudioCopyButton content={draft} label="Copy text" className="studio-chat-button" />
          {dirty || !["image", "pdf", "document"].includes(asset.kind) ? (
            <button
              className="studio-chat-button is-primary"
              onClick={() => void save()}
              disabled={saving || !dirty}
            >
              {saving ? <LoaderCircle size={16} className="animate-spin" /> : <Check size={16} />}
              {saving ? "Saving…" : "Save changes"}
            </button>
          ) : (
            <button className="studio-chat-button" onClick={() => void download()}>
              <Download size={16} /> Export file
            </button>
          )}
        </div>
      </footer>
    </>
  );
  return mobile ? (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="studio-chat-sheet-overlay" />
        <Dialog.Content
          className="studio-app studio-chat-editor is-sheet"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            opener.current?.focus();
          }}
          onInteractOutside={(event) => {
            if (dirty || saving || imageBusy) event.preventDefault();
          }}
          onEscapeKeyDown={(event) => {
            if (saving || imageBusy) event.preventDefault();
          }}
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">{asset.title}</Dialog.Title>
          {content}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ) : (
    <motion.aside
      className="studio-chat-editor"
      aria-label={`Edit ${asset.title}`}
      initial={reduceMotion ? false : { opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={fadeTransition}
    >
      {content}
    </motion.aside>
  );
}
