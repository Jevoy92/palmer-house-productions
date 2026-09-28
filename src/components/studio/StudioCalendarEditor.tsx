import { StudioAssetVisual } from "./StudioAssetVisual";
import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Pencil, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Tables } from "@/lib/supabase/database.types";
import { useStudio } from "./StudioProvider";
import { StudioCopyButton } from "./StudioAssetActions";
import { StudioGraphic, studioGraphicForAsset } from "./StudioGraphic";
import { StudioMarkdown } from "./StudioMarkdown";
import "./studio-support.css";
import "./studio-secondary-polish.css";

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
// eslint-disable-next-line react-refresh/only-export-components
export function parseLocalSchedule(date: string, time: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) return null;
  const value = new Date(`${date}T${time}`);
  if (!Number.isFinite(value.getTime())) return null;
  return localDate(value.toISOString()) === date && localTime(value.toISOString()) === time
    ? value
    : null;
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
    const url = typeof metadata[key] === "string" ? String(metadata[key]).trim() : "";
    if (
      !url ||
      !(/^(https?:\/\/)/i.test(url) || /^\/(?!\/)/.test(url)) ||
      /\.(pdf|mp3|wav)(?:[?#]|$)/i.test(url)
    )
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
  const { updateCalendarItem, updateAsset, campaigns, assets, brand, workspace, getAssetImageUrl } =
    useStudio();
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
  const [editingCopy, setEditingCopy] = useState(false);
  const [copyDraft, setCopyDraft] = useState("");
  const [copySaving, setCopySaving] = useState(false);
  const [copyError, setCopyError] = useState("");
  const [discarding, setDiscarding] = useState(false);
  const campaign = campaigns.find((value) => value.id === item.campaign_id);
  const asset = assets.find((value) => value.id === item.asset_id);
  const metadata = metadataOf(asset);
  const media =
    assetMedia(asset) ||
    (privateImageUrl ? { url: privateImageUrl, type: "image" as const } : null);
  const assetId = asset?.id;
  const assetUpdatedAt = asset?.updated_at;
  const privateImage =
    !assetMedia(asset) &&
    Boolean(
      typeof metadata.mediaAssetId === "string" ||
      (asset?.kind === "image" && typeof metadata.storagePath === "string"),
    );
  useEffect(() => {
    let active = true;
    setPrivateImageUrl("");
    setMediaError(false);
    setMediaLoading(false);
    if (privateImage && assetId && getAssetImageUrl) {
      setMediaLoading(true);
      void getAssetImageUrl(assetId)
        .then((url) => {
          if (active) {
            const safe = /^https?:\/\//i.test(url) || /^\/(?!\/)/.test(url);
            setPrivateImageUrl(safe ? url : "");
            setMediaError(!safe);
          }
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
  }, [assetId, assetUpdatedAt, privateImage, getAssetImageUrl]);
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
  const locked = saving || copySaving;
  const unsavedCopy = editingCopy && copyDraft !== (asset?.content || "");
  function requestClose() {
    if (locked) return;
    if (unsavedCopy) setDiscarding(true);
    else close();
  }
  async function saveCopy() {
    if (!asset || copySaving) return;
    setCopySaving(true);
    setCopyError("");
    try {
      await updateAsset(asset.id, { content: copyDraft });
      setEditingCopy(false);
      toast.success("Draft text saved wherever this content appears.");
    } catch (reason) {
      setCopyError(
        reason instanceof Error
          ? reason.message
          : "Could not save the text. Your edits are still here.",
      );
    } finally {
      setCopySaving(false);
    }
  }

  async function save() {
    if (locked || editingCopy) return;
    const publish = parseLocalSchedule(date, time);
    if (!publish) {
      setError(
        "Choose a valid local date and time. Some times do not exist when the clocks change.",
      );
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
        if (!open) requestClose();
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
            if (locked || unsavedCopy) {
              event.preventDefault();
              requestClose();
            }
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
                disabled={locked}
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
                    {/script/.test(asset.kind) && !media && (
                      <div className="studio-calendar-script-cover">
                        <StudioAssetVisual asset={asset} />
                      </div>
                    )}
                    <div className="studio-calendar-copy">
                      {asset.kind !== "platform_post" && <h3>{asset.title}</h3>}
                      {editingCopy ? (
                        <div className="studio-calendar-copy-editor">
                          <label className="studio-calendar-field">
                            <span>Draft text</span>
                            <textarea
                              value={copyDraft}
                              onChange={(event) => setCopyDraft(event.target.value)}
                              rows={8}
                              disabled={copySaving}
                              autoFocus
                            />
                          </label>
                          <p className="studio-support-muted">
                            Changes update this draft in your Library and campaign too.
                          </p>
                          {copyError && (
                            <p role="alert" className="studio-support-error">
                              {copyError}
                            </p>
                          )}
                          <div className="studio-calendar-actions">
                            <button
                              className="studio-support-button is-primary"
                              disabled={copySaving}
                              onClick={() => void saveCopy()}
                            >
                              {copySaving ? "Saving text…" : "Save text"}
                            </button>
                            <button
                              className="studio-support-button"
                              disabled={copySaving}
                              onClick={() => {
                                setEditingCopy(false);
                                setCopyError("");
                              }}
                            >
                              Cancel text edit
                            </button>
                          </div>
                        </div>
                      ) : fullCopy ? (
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
                            typeof metadata.imageAlt === "string" && metadata.imageAlt.trim()
                              ? metadata.imageAlt.trim()
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
                    {!editingCopy && (
                      <button
                        className="studio-support-button"
                        disabled={locked}
                        onClick={() => {
                          setCopyDraft(asset.content);
                          setCopyError("");
                          setEditingCopy(true);
                        }}
                      >
                        <Pencil size={15} />
                        Edit text
                      </button>
                    )}
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
                          if (locked || unsavedCopy) {
                            event.preventDefault();
                            requestClose();
                          } else close();
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
          <footer className={`studio-calendar-footer ${discarding ? "is-confirming" : ""}`}>
            <p>
              {editingCopy
                ? "Save or cancel your text edit before saving the schedule."
                : "Saving updates your calendar. Publish to the channel separately."}
            </p>
            {discarding && (
              <div className="studio-calendar-discard" role="alert">
                <p>Your text edits have not been saved.</p>
                <button className="studio-support-button" onClick={() => setDiscarding(false)}>
                  Keep editing
                </button>
                <button className="studio-support-button" onClick={close}>
                  Discard text edits
                </button>
              </div>
            )}
            <div>
              <Dialog.Close asChild>
                <button disabled={locked} className="studio-support-button">
                  Cancel
                </button>
              </Dialog.Close>
              <button
                disabled={locked || editingCopy || !date || !time}
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
