import * as Popover from "@radix-ui/react-popover";
import { Bell, Check, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { palList } from "@/lib/pal-directory";
import { PalAvatar } from "./PalAvatar";
import { useStudio } from "./StudioProvider";

type Note = {
  id: string;
  kind: "welcome" | "nudge" | "update";
  title: string;
  body: string;
  color: string;
  soft: string;
  avatar?: string;
  palKey?: string;
  to?: string;
};

function readSet(key: string) {
  if (typeof window === "undefined") return new Set<string>();
  try {
    return new Set<string>(JSON.parse(window.localStorage.getItem(key) || "[]"));
  } catch {
    return new Set<string>();
  }
}

/**
 * The bell. Welcome notes from every Pal land here on day one, and after that
 * the panel carries live nudges pulled from real workspace activity.
 */
export function StudioNotifications() {
  const { workspace, brand, campaigns, ideas, calendar, assets, settings } = useStudio();
  const inApp = (settings as { inapp_alerts?: boolean } | null)?.inapp_alerts ?? true;
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState<Set<string>>(new Set());
  const storageKey = `phs-notifications-read:${workspace?.id || "none"}`;

  useEffect(() => setRead(readSet(storageKey)), [storageKey]);

  const notes = useMemo<Note[]>(() => {
    const items: Note[] = [];
    if (inApp)
      items.push({
        id: "update:credits-2026-09",
        kind: "update",
        title: "Your monthly credits just went up",
        body: "Studio now includes 12,000 credits a month (was 3,500), Guided 25,000 and Partner 50,000. The new amount arrives at your next monthly refill. Same price, no action needed.",
        color: "var(--spotlight)",
        soft: "var(--spotlight-soft)",
        to: "/studio/billing",
      });

    const draft = campaigns.find((item) => item.status === "draft");
    if (draft)
      items.push({
        id: `draft:${draft.id}`,
        kind: "nudge",
        title: "You left a campaign unfinished",
        body: `“${draft.title}” is still a draft. Pick it back up where you stopped.`,
        color: "var(--reel)",
        soft: "var(--reel-soft)",
        to: `/studio/campaigns/${draft.id}`,
      });

    const openIdea = ideas.find((item) => item.status === "captured" || item.status === "new");
    if (openIdea)
      items.push({
        id: `idea:${openIdea.id}`,
        kind: "nudge",
        title: "An idea is waiting to become a campaign",
        body: openIdea.body.slice(0, 140),
        color: "var(--evergreen)",
        soft: "var(--evergreen-soft)",
        to: "/studio/create",
      });

    if (brand && (brand.personal_interests || []).length === 0)
      items.push({
        id: "interests",
        kind: "nudge",
        title: "Tell the studio what you love outside work",
        body: "Hobbies and side passions make your content sound like you and nobody else. Add a few in Brand DNA.",
        color: "var(--spotlight)",
        soft: "var(--spotlight-soft)",
        to: "/studio/brand",
      });

    const approvedUnscheduled = assets.filter((item) => item.status === "approved").length;
    if (approvedUnscheduled > 0 && calendar.length === 0)
      items.push({
        id: "schedule",
        kind: "nudge",
        title: "Approved work with no publish dates",
        body: `${approvedUnscheduled} approved pieces are sitting in your library. Put them on the calendar.`,
        color: "var(--system)",
        soft: "var(--system-soft)",
        to: "/studio/calendar",
      });

    for (const pal of palList) {
      items.push({
        id: `welcome:${pal.key}`,
        kind: "welcome",
        title: `${pal.name} — ${pal.role}`,
        body: pal.welcome,
        color: pal.color,
        soft: pal.soft,
        avatar: pal.avatar,
        palKey: pal.key,
        to: "/studio",
      });
    }
    return items;
  }, [assets, brand, calendar.length, campaigns, ideas, inApp]);

  const unread = notes.filter((note) => !read.has(note.id));

  function markAll() {
    const next = new Set(notes.map((note) => note.id));
    setRead(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify([...next]));
    } catch {
      // a full storage quota should never break the panel
    }
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          aria-label={unread.length ? `Notifications, ${unread.length} unread` : "Notifications"}
          className="relative grid size-11 shrink-0 place-items-center rounded-full border border-border bg-white transition hover:bg-mist"
        >
          <Bell className="size-4" />
          {unread.length ? (
            <span
              className="absolute right-2 top-2 size-2 rounded-full ring-2 ring-white"
              style={{ background: "var(--reel)" }}
            />
          ) : null}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          aria-label="Notifications"
          align="end"
          sideOffset={8}
          collisionPadding={16}
          className="studio-app studio-notifications-panel"
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <p className="text-sm font-black">Notifications</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {unread.length ? `${unread.length} new` : "You are all caught up"}
              </p>
            </div>
            <div className="flex items-center gap-1">
              {unread.length ? (
                <button
                  onClick={markAll}
                  className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:text-ink"
                  aria-label="Mark all as read"
                >
                  <Check className="size-4" />
                </button>
              ) : null}
              <button
                onClick={() => setOpen(false)}
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:text-ink"
                aria-label="Close notifications"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          <div className="studio-notifications-scroll p-3">
            {notes.length === 0 ? (
              <p className="px-3 py-10 text-center text-sm text-muted-foreground">
                No notifications right now. We will let you know when something needs you.
              </p>
            ) : (
              <ul className="space-y-2">
                {notes.map((note) => {
                  const isRead = read.has(note.id);
                  const inner = (
                    <div className="flex gap-3">
                      {note.avatar ? (
                        <PalAvatar
                          pal={palList.find((pal) => pal.key === note.palKey)!}
                          size="sm"
                        />
                      ) : (
                        <span
                          className="mt-1 size-2.5 shrink-0 rounded-full"
                          style={{ background: note.color }}
                        />
                      )}
                      <div className="min-w-0">
                        <p className="text-[13px] font-black leading-tight">{note.title}</p>
                        <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                          {note.body}
                        </p>
                      </div>
                    </div>
                  );
                  return (
                    <li key={note.id}>
                      <Link
                        to={note.to || "/studio/dashboard"}
                        onClick={() => setOpen(false)}
                        className="block rounded-[1.15rem] border p-3 transition hover:border-ink/20"
                        style={{
                          borderColor: isRead ? "var(--border)" : note.color,
                          background: isRead ? "var(--studio-surface)" : note.soft,
                        }}
                      >
                        {inner}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
