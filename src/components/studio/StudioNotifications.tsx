import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Bell, Check, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { palList } from "@/lib/pal-directory";
import { PalAvatar } from "./PalAvatar";
import { useStudio } from "./StudioProvider";

type Note = {
  id: string;
  kind: "welcome" | "nudge";
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
  const { workspace, brand, campaigns, ideas, calendar, assets } = useStudio();
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState<Set<string>>(new Set());
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const storageKey = `phs-notifications-read:${workspace?.id || "none"}`;

  useEffect(() => setRead(readSet(storageKey)), [storageKey]);

  useEffect(() => {
    if (!open) return;
    function onClick(event: MouseEvent) {
      if (!wrap.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const notes = useMemo<Note[]>(() => {
    const items: Note[] = [];

    const draft = campaigns.find((item) => item.status === "draft");
    if (draft)
      items.push({
        id: `draft:${draft.id}`,
        kind: "nudge",
        title: "You left a campaign unfinished",
        body: `“${draft.title}” is still a draft. Pick it back up where you stopped.`,
        color: "var(--reel)",
        soft: "var(--reel-soft)",
        to: `/studio/campaign/${draft.id}`,
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
        to: "/studio",
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
  }, [assets, brand, calendar.length, campaigns, ideas]);

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
    <div className="relative ml-2" ref={wrap}>
      <button
        aria-label={unread.length ? `Notifications, ${unread.length} unread` : "Notifications"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
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
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 top-[3.25rem] z-50 w-[min(23rem,calc(100vw-2rem))] overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-[0_40px_90px_-50px_rgba(31,35,40,.8)]"
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

            <div className="max-h-[26rem] overflow-y-auto p-3">
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
                            background: isRead ? "white" : note.soft,
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
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
