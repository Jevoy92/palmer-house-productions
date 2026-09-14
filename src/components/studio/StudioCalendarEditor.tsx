import * as Dialog from "@radix-ui/react-dialog";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { Tables } from "@/lib/supabase/database.types";
import { useStudio } from "./StudioProvider";

function localDate(value: string) {
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function StudioCalendarEditor({
  item,
  close,
}: {
  item: Tables<"calendar_items">;
  close: () => void;
}) {
  const { updateCalendarItem, campaigns, assets } = useStudio();
  const opener = useRef(
    typeof document !== "undefined" ? (document.activeElement as HTMLElement | null) : null,
  );
  const [date, setDate] = useState(localDate(item.publish_at));
  const [status, setStatus] = useState(item.status);
  const [channel, setChannel] = useState(item.channel);
  const [notes, setNotes] = useState(item.notes || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const campaign = campaigns.find((value) => value.id === item.campaign_id);
  const asset = assets.find((value) => value.id === item.asset_id);
  async function save() {
    if (saving || !date) return;
    setSaving(true);
    setError("");
    const previous = new Date(item.publish_at);
    const publish = new Date(`${date}T00:00:00`);
    publish.setHours(previous.getHours(), previous.getMinutes(), 0, 0);
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
          className="studio-app studio-detail-drawer"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            opener.current?.focus();
          }}
          onInteractOutside={(event) => event.preventDefault()}
          onEscapeKeyDown={(event) => {
            if (saving) event.preventDefault();
          }}
        >
          <header className="flex items-start justify-between gap-4 border-b border-border pb-5">
            <div>
              <p className="studio-eyebrow text-system">Scheduled content</p>
              <Dialog.Title className="mt-3 text-2xl font-bold leading-tight">
                {item.title}
              </Dialog.Title>
              <Dialog.Description className="mt-3 text-sm text-muted-foreground">
                Update the schedule and keep production notes together.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                disabled={saving}
                className="studio-icon-button"
                aria-label="Close calendar item"
              >
                <X className="size-4" />
              </button>
            </Dialog.Close>
          </header>
          <div className="mt-6 flex items-center gap-3 rounded-xl bg-system-soft p-4">
            <CalendarDays className="size-5 shrink-0 text-system" />
            <p className="text-sm">
              {asset ? asset.title : "A planned post. Add your content before publishing."}
            </p>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold">
              Publish date
              <input
                disabled={saving}
                required
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-lg border border-input px-3"
              />
            </label>
            <label className="text-sm font-semibold">
              Status
              <select
                disabled={saving}
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-lg border border-input bg-white px-3"
              >
                {["planned", "scripted", "filmed", "editing", "approved", "published"].map(
                  (value) => (
                    <option key={value}>{value}</option>
                  ),
                )}
              </select>
            </label>
            <label className="text-sm font-semibold sm:col-span-2">
              Channel
              <select
                disabled={saving}
                value={channel}
                onChange={(event) => setChannel(event.target.value)}
                className="mt-2 min-h-11 w-full rounded-lg border border-input bg-white px-3"
              >
                {Array.from(
                  new Set([
                    item.channel,
                    "Instagram",
                    "LinkedIn",
                    "YouTube",
                    "TikTok",
                    "Email",
                    "Website",
                  ]),
                ).map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-semibold sm:col-span-2">
              Working notes
              <textarea
                disabled={saving}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={5}
                className="mt-2 w-full rounded-lg border border-input p-3 font-normal leading-relaxed"
              />
            </label>
          </div>
          {campaign ? (
            <Link
              to="/studio/campaigns/$campaignId"
              params={{ campaignId: campaign.id }}
              onClick={close}
              className="mt-5 flex items-center justify-between gap-3 rounded-lg bg-spotlight-soft p-4 text-sm font-semibold"
            >
              <span>{campaign.title}</span>
              <ArrowRight className="size-4 shrink-0" />
            </Link>
          ) : null}
          {error ? (
            <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-800">
              {error}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-border pt-5">
            <Dialog.Close asChild>
              <button disabled={saving} className="secondary-action">
                Cancel
              </button>
            </Dialog.Close>
            <button
              disabled={saving || !date}
              onClick={() => void save()}
              className="primary-action disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
