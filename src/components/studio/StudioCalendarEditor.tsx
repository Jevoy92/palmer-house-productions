import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Tables } from "@/lib/supabase/database.types";
import { useStudio } from "./StudioProvider";
import { StudioCopyButton } from "./StudioAssetActions";
import { StudioGraphic, studioGraphicForAsset } from "./StudioGraphic";
import { StudioMarkdown } from "./StudioMarkdown";
import "./studio-support.css";

type Asset = Tables<"campaign_assets">;
function localDate(value: string) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function localTime(value: string) {
  const date = new Date(value);
  return Number.isFinite(date.getTime())
    ? `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
    : "09:00";
}
function metadataOf(asset?: Asset) {
  return asset?.metadata && typeof asset.metadata === "object" && !Array.isArray(asset.metadata)
    ? (asset.metadata as Record<string, unknown>)
    : {};
}
function assetMedia(asset?: Asset): { url: string; type: "image" | "video" } | null {
  const metadata = metadataOf(asset);
  for (const key of [
    "videoUrl",
    "imageUrl",
    "image_url",
    "thumbnailUrl",
    "posterUrl",
    "coverImageUrl",
    "mediaUrl",
  ]) {
    const url = metadata[key];
    if (typeof url !== "string" || !(/^(https?:\/\/)/i.test(url) || /^\/(?!\/)/.test(url)))
      continue;
    const video = key === "videoUrl" || /\.(mp4|webm|mov)(?:[?#]|$)/i.test(url);
    return { url, type: video ? "video" : "image" };
  }
  return null;
}
const channels = ["Facebook", "Instagram", "LinkedIn", "YouTube", "TikTok", "Email", "Website"];
function channelLabel(value: string) {
  return channels.find((name) => name.toLowerCase() === value.toLowerCase()) || readable(value);
}
function readable(value: string) {
  return value.replaceAll("_", " ").replace(/^./, (letter) => letter.toUpperCase());
}

export function StudioCalendarEditor({
  item,
  close,
}: {
  item: Tables<"calendar_items">;
  close: () => void;
}) {
  const { updateCalendarItem, campaigns, assets, brand, workspace, getArtifactUrl } = useStudio();
  const opener = useRef(
    typeof document !== "undefined" ? (document.activeElement as HTMLElement | null) : null,
  );
  const [date, setDate] = useState(localDate(item.publish_at));
  const [time, setTime] = useState(localTime(item.publish_at));
  const [status, setStatus] = useState(item.status);
  const [channel, setChannel] = useState(item.channel);
  const [notes, setNotes] = useState(item.notes || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [mediaError, setMediaError] = useState(false);
  const [privateImageUrl, setPrivateImageUrl] = useState("");
  const [mediaLoading, setMediaLoading] = useState(false);
  const campaign = campaigns.find((value) => value.id === item.campaign_id);
  const asset = assets.find((value) => value.id === item.asset_id);
  const metadata = metadataOf(asset);
  const media =
    assetMedia(asset) ||
    (privateImageUrl ? { url: privateImageUrl, type: "image" as const } : null);
  const assetId = asset?.id;
  const assetUpdatedAt = asset?.updated_at;
  const privateImage =
    asset?.kind === "image" && typeof metadata.storagePath === "string" && !assetMedia(asset);
  useEffect(() => {
    let active = true;
    setPrivateImageUrl("");
    setMediaError(false);
    setMediaLoading(false);
    if (privateImage && assetId && getArtifactUrl) {
      setMediaLoading(true);
      void getArtifactUrl(assetId)
        .then((url) => {
          if (active) setPrivateImageUrl(url);
        })
        .catch(() => {
          if (active) setMediaError(true);
        })
        .finally(() => {
          if (active) setMediaLoading(false);
        });
    }
    return () => {
      active = false;
    };
  }, [assetId, assetUpdatedAt, privateImage, getArtifactUrl]);
  const graphic = studioGraphicForAsset(asset?.kind ?? "", channel);
  const content = asset?.content || (typeof metadata.body === "string" ? metadata.body : "");
  const hook =
    typeof metadata.hook === "string" && !content.includes(metadata.hook) ? metadata.hook : "";
  const callToAction =
    typeof metadata.callToAction === "string" && !content.includes(metadata.callToAction)
      ? metadata.callToAction
      : "";
  const hashtags = Array.isArray(metadata.hashtags)
    ? metadata.hashtags
        .filter((tag): tag is string => typeof tag === "string")
        .filter((tag) => !content.includes(tag))
        .join(" ")
    : "";
  const fullCopy = [hook, content, callToAction, hashtags].filter(Boolean).join("\n\n");
  const words = fullCopy.trim().split(/\s+/).filter(Boolean).length;
  const updated =
    asset && Number.isFinite(new Date(asset.updated_at).getTime())
      ? new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(
          new Date(asset.updated_at),
        )
      : "";
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone.replaceAll("_", " ");

  async function save() {
    if (saving) return;
    const publish = new Date(`${date}T${time}`);
    if (!date || !time || !Number.isFinite(publish.getTime())) {
      setError("Choose a valid date and time.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await updateCalendarItem(item.id, {
        publish_at: publish.toISOString(),
        status,
        channel,
        notes,
      });
      toast.success("Calendar item saved.");
      close();
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Could not save. Your changes are still here.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open && !saving) close();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="studio-app studio-navigation-backdrop" />
        <Dialog.Content
          className="studio-app studio-support studio-detail-drawer studio-calendar-editor"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            opener.current?.focus();
          }}
          onInteractOutside={(event) => event.preventDefault()}
          onEscapeKeyDown={(event) => {
            if (saving) event.preventDefault();
          }}
        >
          <header className="studio-calendar-heading">
            <StudioGraphic name="calendar" size={50} />
            <div>
              <p className="studio-support-kicker">Your calendar</p>
              <Dialog.Title>{item.title}</Dialog.Title>
              <Dialog.Description className="studio-support-muted">
                Review the content, then choose when it belongs in your plan.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                disabled={saving}
                className="studio-icon-button"
                aria-label="Close calendar item"
              >
                <X size={20} />
              </button>
            </Dialog.Close>
          </header>
          <div className="studio-calendar-body">
            <section className="studio-calendar-preview" aria-label="Scheduled content preview">
              <div className="studio-calendar-preview-label">
                <span>{asset ? "Linked content" : "Planned content"}</span>
                {asset && <span className="studio-support-pill">{readable(asset.status)}</span>}
              </div>
              <article className="studio-calendar-content-card">
                {asset ? (
                  <>
                    <div className="studio-calendar-content-byline">
                      <StudioGraphic name={graphic} size={40} />
                      <div>
                        <strong>
                          {brand?.business_name || workspace?.name || "Your business"}
                        </strong>
                        <small>
                          {channel ? channelLabel(channel) : readable(asset.kind)} ·{" "}
                          {readable(asset.kind)}
                        </small>
                      </div>
                    </div>
                    <div className="studio-calendar-copy">
                      {asset.kind !== "platform_post" && <h3>{asset.title}</h3>}
                      {fullCopy ? (
                        <StudioMarkdown>{fullCopy}</StudioMarkdown>
                      ) : (
                        <p className="studio-support-muted">This draft does not have text yet.</p>
                      )}
                    </div>
                    {media && !mediaError ? (
                      media.type === "video" ? (
                        <video
                          className="studio-calendar-media"
                          src={media.url}
                          controls
                          playsInline
                          preload="metadata"
                          onError={() => setMediaError(true)}
                          aria-label={asset.title}
                        />
                      ) : (
                        <img
                          className="studio-calendar-media"
                          src={media.url}
                          alt={
                            typeof metadata.imageAlt === "string"
                              ? metadata.imageAlt
                              : `Attached image for ${asset.title}`
                          }
                          onError={() => setMediaError(true)}
                        />
                      )
                    ) : (
                      <div className="studio-calendar-format-note">
                        <StudioGraphic name={graphic} size={48} />
                        <span>
                          {mediaLoading
                            ? "Loading attached image…"
                            : mediaError
                              ? "The attached media could not load. Your saved text is still available."
                              : /script/.test(asset.kind)
                                ? "A script to record. Finished footage has not been attached."
                                : "Text draft. No image is attached to this item."}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="studio-calendar-no-asset">
                    <StudioGraphic name="calendar" size={92} />
                    <h3>A place in your plan.</h3>
                    <p>
                      {item.asset_id
                        ? "The linked draft is not available in this workspace. Your schedule and notes are still saved."
                        : "This calendar item does not have a linked draft yet. Keep the date and production notes here while you make the content."}
                    </p>
                  </div>
                )}
              </article>
              {asset && (
                <>
                  <div className="studio-calendar-actions">
                    {fullCopy && (
                      <StudioCopyButton
                        content={fullCopy}
                        label="Copy text"
                        className="studio-support-button"
                      />
                    )}
                    {campaign && (
                      <Link
                        to="/studio/campaigns/$campaignId"
                        params={{ campaignId: campaign.id }}
                        className="studio-support-button"
                        aria-disabled={saving}
                        onClick={(event) => {
                          if (saving) event.preventDefault();
                          else close();
                        }}
                      >
                        Open campaign <ArrowRight size={16} />
                      </Link>
                    )}
                  </div>
                  <div className="studio-calendar-asset-meta">
                    <span>{words ? `${words.toLocaleString()} words` : "No written copy"}</span>
                    {updated && <span>Draft updated {updated}</span>}
                  </div>
                </>
              )}
            </section>
            <section
              className="studio-calendar-schedule"
              aria-labelledby="studio-calendar-schedule-title"
            >
              <h3 id="studio-calendar-schedule-title">Schedule & details</h3>
              <label className="studio-calendar-field">
                <span>Date</span>
                <input
                  disabled={saving}
                  required
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </label>
              <label className="studio-calendar-field">
                <span>Time</span>
                <input
                  disabled={saving}
                  required
                  type="time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                />
                <small className="studio-support-muted">{timezone}</small>
              </label>
              <label className="studio-calendar-field">
                <span>Channel</span>
                <select
                  disabled={saving}
                  value={channel}
                  onChange={(event) => setChannel(event.target.value)}
                >
                  {[item.channel, ...channels]
                    .filter(
                      (value, index, values) =>
                        value &&
                        values.findIndex(
                          (option) => option.toLowerCase() === value.toLowerCase(),
                        ) === index,
                    )
                    .map((value) => (
                      <option key={value} value={value}>
                        {channelLabel(value)}
                      </option>
                    ))}
                </select>
              </label>
              <label className="studio-calendar-field">
                <span>Production status</span>
                <select
                  disabled={saving}
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  {Array.from(
                    new Set([
                      item.status,
                      "planned",
                      "scripted",
                      "filmed",
                      "editing",
                      "approved",
                      "published",
                    ]),
                  ).map((value) => (
                    <option value={value} key={value}>
                      {readable(value)}
                    </option>
                  ))}
                </select>
              </label>
              <details open={Boolean(item.notes)}>
                <summary>Production notes</summary>
                <label className="studio-calendar-field">
                  <span className="sr-only">Working notes</span>
                  <textarea
                    disabled={saving}
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    rows={4}
                    placeholder="Anything the team needs to know…"
                  />
                </label>
              </details>
              {campaign && (
                <dl>
                  <dt>Part of</dt>
                  <dd>{campaign.title}</dd>
                </dl>
              )}
              {error && (
                <p role="alert" className="studio-support-error">
                  {error}
                </p>
              )}
            </section>
          </div>
          <footer className="studio-calendar-footer">
            <p>Saving updates your calendar. Publish to the channel separately.</p>
            <div>
              <Dialog.Close asChild>
                <button disabled={saving} className="studio-support-button">
                  Cancel
                </button>
              </Dialog.Close>
              <button
                disabled={saving || !date || !time}
                onClick={() => void save()}
                className="studio-support-button is-primary"
              >
                {saving ? "Saving…" : "Save schedule"}
              </button>
            </div>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
