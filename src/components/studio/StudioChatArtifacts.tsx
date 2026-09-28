import { Link } from "@tanstack/react-router";
import {
  Check,
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
import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";
import type { Tables } from "@/lib/supabase/database.types";
import type { GuideProfile } from "@/lib/pal-directory";
import { StudioMarkdown } from "./StudioMarkdown";
import { StudioCopyButton } from "./StudioAssetActions";
import { PalAvatar } from "./PalAvatar";
import { useStudio } from "./StudioProvider";

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

function mediaUrl(asset: Asset) {
  const meta = record(asset.metadata);
  for (const key of ["thumbnailUrl", "imageUrl", "mediaUrl", "previewUrl", "url"]) {
    const value = meta[key];
    if (typeof value === "string" && (/^https?:\/\//i.test(value) || value.startsWith("/")))
      return value;
  }
  return "";
}

function useAssetMedia(asset: Asset) {
  const { getArtifactUrl } = useStudio();
  const [url, setUrl] = useState(mediaUrl(asset));
  const meta = record(asset.metadata);
  const storagePath = meta.storagePath || meta.storage_path;
  const directUrl = mediaUrl(asset);
  useEffect(() => {
    let active = true;
    setUrl(directUrl);
    if (!storagePath || !getArtifactUrl || ["pdf", "document"].includes(asset.kind)) return;
    void getArtifactUrl(asset.id)
      .then((result) => {
        if (active) setUrl(result);
      })
      .catch(() => {
        if (active) setUrl("");
      });
    return () => {
      active = false;
    };
  }, [asset.id, asset.kind, directUrl, getArtifactUrl, storagePath]);
  return url;
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
  const label = chatAssetLabel(asset);
  const image = useAssetMedia(asset);
  const isDocument = ["article", "newsletter", "pdf", "document"].includes(asset.kind);
  const isScript = asset.kind.includes("script");
  return (
    <article
      className={`studio-native-draft ${isDocument ? "is-document" : ""} ${compact ? "is-compact" : ""}`}
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
          <small>{label} · Draft preview</small>
        </div>
        <span className="studio-saved-indicator">
          <Check size={12} /> Saved
        </span>
      </header>
      <div className="studio-native-copy">
        {isDocument || isScript ? <h3>{asset.title}</h3> : null}
        <StudioMarkdown>{content ?? asset.content}</StudioMarkdown>
      </div>
      {image && !["pdf", "document"].includes(asset.kind) ? (
        <div className="studio-native-media">
          <img src={image} alt={asset.title} loading="lazy" />
          {isScript ? (
            <span className="studio-video-marker">
              <Play size={24} fill="currentColor" />
              <span>Script preview</span>
            </span>
          ) : null}
        </div>
      ) : null}
      {!isDocument && !isScript && asset.kind !== "image" ? (
        <div
          className="studio-preview-social"
          aria-label="Platform preview controls, illustrative only"
        >
          <span>
            <ThumbsUp size={16} /> Like
          </span>
          <span>
            <MessageCircle size={16} /> Comment
          </span>
          <span>
            <Share2 size={16} /> Share
          </span>
        </div>
      ) : null}
      {isScript ? (
        <footer className="studio-script-note">
          <Play size={14} /> Ready to film · Video script
        </footer>
      ) : null}
    </article>
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
  const { assets, campaigns } = useStudio();
  const campaign = campaigns.find((item) => item.id === campaignId);
  const drafts = assets.filter((asset) =>
    campaignId
      ? asset.campaign_id === campaignId && !["production_note", "faq"].includes(asset.kind)
      : assetIds?.includes(asset.id),
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = drafts.find((asset) => asset.id === selectedId) || drafts[0];
  if (!selected) return null;
  return (
    <section
      className="studio-chat-artifact"
      data-asset-id={selected.id}
      aria-label={campaign?.title || selected.title}
    >
      <header className="studio-artifact-heading">
        <div>
          <h2>{campaign?.title || selected.title}</h2>
          <p>
            {drafts.length} {drafts.length === 1 ? "draft" : "drafts"} · Saved to Library
          </p>
        </div>
        {campaign ? (
          <Link
            to="/studio/campaigns/$campaignId"
            params={{ campaignId: campaign.id }}
            aria-label={`Open campaign ${campaign.title}`}
          >
            <ExternalLink size={17} />
          </Link>
        ) : (
          <FileText size={18} />
        )}
      </header>
      {drafts.length > 1 ? (
        <div className="studio-artifact-tabs" role="tablist" aria-label="Campaign drafts">
          {drafts.map((asset) => (
            <button
              type="button"
              key={asset.id}
              role="tab"
              aria-selected={asset.id === selected.id}
              onClick={() => setSelectedId(asset.id)}
            >
              {chatAssetLabel(asset)}
            </button>
          ))}
        </div>
      ) : null}
      <StudioNativeDraft asset={selected} />
      <div className="studio-artifact-actions">
        <button type="button" onClick={() => onOpen(selected.id, "edit")}>
          <Pencil size={15} /> Edit
        </button>
        <button type="button" onClick={() => onOpen(selected.id, "preview")}>
          <ExternalLink size={15} /> Open
        </button>
        <span>
          <Check size={15} /> Saved
        </span>
      </div>
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
  const asset = assets.find((item) => item.id === assetId);
  const [mode, setMode] = useState(initialMode);
  const [draft, setDraft] = useState(asset?.content || "");
  const lastPersisted = useRef(asset?.content || "");
  const [saving, setSaving] = useState(false);
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
    if (saving) return;
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
        <div className="studio-editor-tabs" role="tablist" aria-label="Draft view">
          <button role="tab" aria-selected={mode === "preview"} onClick={() => setMode("preview")}>
            Preview
          </button>
          <button role="tab" aria-selected={mode === "edit"} onClick={() => setMode("edit")}>
            Edit
          </button>
        </div>
        {mode === "preview" ? (
          <StudioNativeDraft asset={asset} content={draft} compact />
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
        {mode === "edit" && mediaUrl(asset) ? (
          <div className="studio-editor-image">
            <strong>Image</strong>
            <img src={mediaUrl(asset)} alt={asset.title} />
          </div>
        ) : null}
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
        <p>
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
            if (dirty || saving) event.preventDefault();
          }}
          onEscapeKeyDown={(event) => {
            if (saving) event.preventDefault();
          }}
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">{asset.title}</Dialog.Title>
          {content}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ) : (
    <aside className="studio-chat-editor" aria-label={`Edit ${asset.title}`}>
      {content}
    </aside>
  );
}
