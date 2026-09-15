import { Link, useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { useReducedMotion } from "motion/react";
import {
  Archive,
  ArrowRight,
  Brain,
  CalendarPlus,
  Check,
  ChevronUp,
  Copy,
  LoaderCircle,
  MessageSquareText,
  Pencil,
  Plus,
  RotateCcw,
  Send,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { palDirectory, palList, resolvePalName } from "@/lib/pal-directory";
import {
  anchorFormats,
  studioGoals,
  type AssistantResponse,
  type PalName,
} from "@/lib/studio-model";
import { ComposerIntake, withAttachmentContext } from "./ComposerIntake";
import { StudioMarkdown } from "./StudioMarkdown";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useStudio, type ConversationIntake } from "./StudioProvider";

function assistantMetadata(value: unknown): AssistantResponse | null {
  if (!value || typeof value !== "object" || !("recommendations" in value)) return null;
  return value as AssistantResponse;
}

function relativeDay(value: string | null) {
  if (!value) return "New";
  const date = new Date(value);
  const days = Math.floor((Date.now() - date.getTime()) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function StudioAssistant({ conversationId }: { conversationId?: string }) {
  const {
    activeConversation,
    archiveConversation,
    askPal,
    brand,
    busy,
    calendar,
    campaigns,
    conversationLoading,
    conversationMessages,
    conversationDrafts: composers,
    setConversationDrafts: setComposers,
    conversations,
    clearConversation,
    createCalendarItem,
    createCampaign,
    createIdea,
    hasOlderMessages,
    loadOlderMessages,
    openConversation,
    renameConversation,
    saveBrand,
    saveSettings,
    setConversationPal,
    settings,
    startConversation,
  } = useStudio();
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  // The conversation's own Pal wins; otherwise the member's saved guide. The
  // neutral option resolves to a real Pal so the name on screen always matches
  // the one we send to the model.
  const selected = resolvePalName(activeConversation?.pal || settings?.preferred_pal);
  const pal = palDirectory[selected];

  const startingPrompt = useSearch({
    strict: false,
    select: (s) => (s as { prompt?: string }).prompt,
  });
  const navigationKey = useLocation({ select: (location) => location.state.__TSR_key });
  const draftKey = conversationId || "new";
  const draft = composers[draftKey]?.text ?? (conversationId ? "" : (startingPrompt ?? ""));
  const attachments = composers[draftKey]?.files ?? [];
  function setDraft(value: string | ((current: string) => string)) {
    setComposers((current) => ({
      ...current,
      [draftKey]: {
        text: typeof value === "function" ? value(current[draftKey]?.text ?? draft) : value,
        files: current[draftKey]?.files ?? attachments,
      },
    }));
  }
  function setAttachments(files: ConversationIntake[]) {
    setComposers((current) => ({
      ...current,
      [draftKey]: { text: current[draftKey]?.text ?? draft, files },
    }));
  }
  const [savedMemory, setSavedMemory] = useState<string[]>([]);
  const [building, setBuilding] = useState(false);
  const [sending, setSending] = useState(false);
  const [intakeBusy, setIntakeBusy] = useState(false);
  const sendingRef = useRef(false);
  const [threadError, setThreadError] = useState<string | null>(null);
  const [campaignSource, setCampaignSource] = useState<{
    body: string;
    meta: AssistantResponse | null;
  } | null>(null);
  const [campaignGoal, setCampaignGoal] = useState<string>(studioGoals[0]);
  const [campaignFormat, setCampaignFormat] = useState<string>(anchorFormats[0].value);
  const [workOpen, setWorkOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollSnapshot = useRef<{ height: number; top: number } | null>(null);
  const scrollTail = useRef<string | undefined>(undefined);
  const nearBottom = useRef(true);
  const justOpened = useRef(true);
  const routeRef = useRef(conversationId);
  routeRef.current = conversationId;
  const composerRef = useRef<HTMLTextAreaElement | null>(null);

  const openThreads = useMemo(
    () => conversations.filter((item) => !item.archived),
    [conversations],
  );

  const latestResponse = useMemo(() => {
    for (let index = conversationMessages.length - 1; index >= 0; index -= 1) {
      const metadata = assistantMetadata(conversationMessages[index].metadata);
      if (metadata) return metadata;
    }
    return null;
  }, [conversationMessages]);

  // The URL owns identity: index starts a draft; an id resumes that thread.
  // Do not depend on activeConversation here: clearing an archived thread must
  // not trigger an automatic reopen of the same URL.
  useEffect(() => {
    setThreadError(null);
    setPickerOpen(false);
    setHistoryOpen(false);
    setSavedMemory([]);
    justOpened.current = true;
    nearBottom.current = true;
    scrollSnapshot.current = null;
    if (!conversationId) {
      clearConversation();
      setComposers((current) => ({ ...current, new: { text: startingPrompt ?? "", files: [] } }));
      return;
    }
    if (activeConversation?.id !== conversationId) {
      void openConversation(conversationId).catch((error) => {
        if (routeRef.current !== conversationId) return;
        setThreadError(
          error instanceof Error ? error.message : "That conversation could not be opened.",
        );
      });
    }
    // activeConversation is read only to avoid refetching a just-created thread.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, navigationKey, startingPrompt, clearConversation, openConversation]);

  const lastMessageId = conversationMessages.at(-1)?.id;
  useLayoutEffect(() => {
    const viewport = scrollRef.current;
    if (!viewport) return;
    if (scrollSnapshot.current && !conversationLoading) {
      const previous = scrollSnapshot.current;
      viewport.scrollTop = previous.top + viewport.scrollHeight - previous.height;
      scrollSnapshot.current = null;
    } else if (justOpened.current && !conversationLoading && conversationMessages.length) {
      viewport.scrollTop = viewport.scrollHeight;
      justOpened.current = false;
    } else if (lastMessageId !== scrollTail.current && nearBottom.current) {
      viewport.scrollTo({ top: viewport.scrollHeight, behavior: reduce ? "auto" : "smooth" });
    }
    scrollTail.current = lastMessageId;
  }, [conversationMessages, conversationLoading, lastMessageId, reduce]);

  async function loadEarlier() {
    const viewport = scrollRef.current;
    if (!viewport) return;
    const snapshot = { height: viewport.scrollHeight, top: viewport.scrollTop };
    try {
      scrollSnapshot.current = snapshot;
      await loadOlderMessages();
    } catch (error) {
      scrollSnapshot.current = null;
      toast.error(error instanceof Error ? error.message : "Earlier messages could not be loaded.");
    }
  }

  async function send(question: string) {
    const value = question.trim();
    if (
      (value.length < 3 && !attachments.length) ||
      busy ||
      intakeBusy ||
      sendingRef.current ||
      conversationLoading ||
      threadError
    )
      return;
    sendingRef.current = true;
    setSending(true);
    const sent = attachments;
    let thread = conversationId;
    setComposers((current) => ({ ...current, [draftKey]: { text: "", files: [] } }));
    nearBottom.current = true;
    try {
      if (!thread) {
        thread = await startConversation(selected, value.slice(0, 58) || "New conversation");
        setComposers((current) => ({ ...current, [thread!]: { text: "", files: [] } }));
        await navigate({
          to: "/studio/conversations/$conversationId",
          params: { conversationId: thread },
        });
      }
      return await askPal(
        withAttachmentContext(
          value || "Read what I just attached and tell me what to do with it.",
          sent,
        ),
        selected,
        thread,
      );
    } catch (error) {
      const restoreKey = thread || draftKey;
      setComposers((current) => ({
        ...current,
        [restoreKey]: {
          text: [value, current[restoreKey]?.text].filter(Boolean).join("\n\n"),
          files: [
            ...sent,
            ...(current[restoreKey]?.files ?? []).filter(
              (file) => !sent.some((item) => item.attachment.id === file.attachment.id),
            ),
          ],
        },
      }));
      toast.error(
        error instanceof Error
          ? error.message
          : "Your Pal could not respond yet. Your draft is ready to retry.",
      );
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await send(draft);
  }

  async function newConversation() {
    setHistoryOpen(false);
    clearConversation();
    setComposers((current) => ({ ...current, new: { text: "", files: [] } }));
    await navigate({ to: "/studio/conversations", search: { prompt: undefined } });
  }

  async function archiveCurrent() {
    if (!activeConversation) return;
    const id = activeConversation.id;
    try {
      await archiveConversation(id);
      if (routeRef.current === id)
        await navigate({ to: "/studio/conversations", search: { prompt: undefined } });
      toast.success("Conversation archived.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not archive this conversation.");
    }
  }

  async function copyMessage(id: string, body: string) {
    try {
      await navigator.clipboard.writeText(body);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1800);
    } catch {
      toast.error("Your browser blocked the clipboard.");
    }
  }

  async function buildCampaign(body: string, meta: AssistantResponse | null) {
    setBuilding(true);
    try {
      const id = await createCampaign({
        title: (meta?.headline || body.split("\n")[0] || "New campaign").slice(0, 90),
        goal: campaignGoal,
        topic: [meta?.headline, meta?.problem, body].filter(Boolean).join("\n\n").slice(0, 4000),
        offer: brand?.calls_to_action?.[0] || "",
        audience: brand?.primary_audience || "",
        anchorFormat: campaignFormat,
        depth: "strategic",
      });
      setCampaignSource(null);
      toast.success("Your campaign is built.");
      await navigate({ to: "/studio/campaigns/$campaignId", params: { campaignId: id } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not build this campaign.");
    } finally {
      setBuilding(false);
    }
  }

  async function saveAnswerAsIdea(body: string, meta: AssistantResponse | null) {
    try {
      await createIdea({
        body,
        sourceType: "chat",
        lane: meta?.lane || pal.lane,
        businessProblem: meta?.problem || "",
      });
      toast.success("Saved to Content ideas.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save this answer.");
    }
  }

  async function choosePal(name: PalName) {
    setPickerOpen(false);
    try {
      // Keep the open thread with this Pal, and make it the default guide.
      if (activeConversation) await setConversationPal(activeConversation.id, name);
      await saveSettings({ preferred_pal: name });
      toast.success(`${palDirectory[name].name} is with you now. Nothing was lost.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not change your Pal.");
    }
  }

  async function rename() {
    if (!activeConversation) return;
    const next = window.prompt("Name this conversation", activeConversation.title);
    if (next === null) return;
    try {
      await renameConversation(activeConversation.id, next);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not rename this conversation.");
    }
  }

  async function saveRecommendation(item: AssistantResponse["recommendations"][number]) {
    try {
      await createIdea({
        body: item.nextStep,
        sourceType: "chat",
        lane: latestResponse?.lane || pal.lane,
        businessProblem: latestResponse?.problem || item.reason,
      });
      toast.success("Saved to Content ideas with the business problem attached.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save this idea.");
    }
  }

  async function scheduleRecommendation(item: AssistantResponse["recommendations"][number]) {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    date.setHours(9, 0, 0, 0);
    try {
      await createCalendarItem({
        title: item.title,
        channel: brand?.platforms?.[0] || "LinkedIn",
        publishAt: date.toISOString(),
        notes: `${item.nextStep}\n\nBusiness problem: ${latestResponse?.problem || item.reason}`,
      });
      toast.success("Added as an editable plan for next week.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not add this to the calendar.");
    }
  }

  async function acceptMemory(suggestion: AssistantResponse["memorySuggestions"][number]) {
    if (!brand) return;
    const key = `${suggestion.field}:${suggestion.value}`;
    const currentValue = brand[suggestion.field];
    const value = Array.isArray(currentValue)
      ? Array.from(new Set([...currentValue, suggestion.value]))
      : suggestion.value;
    try {
      await saveBrand({ [suggestion.field]: value });
      setSavedMemory((current) => [...current, key]);
      toast.success("Approved and added to Brand DNA.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update Brand DNA.");
    }
  }

  const starters = pal.persona.starters;

  return (
    <div className="mx-auto max-w-[92rem]">
      <div className="relative grid h-[calc(100dvh-8rem)] min-h-[28rem] grid-cols-1 overflow-hidden rounded-[1.5rem] border border-border bg-white xl:grid-cols-[14rem_minmax(0,1fr)_18rem]">
        {/* History */}
        <aside
          className={`min-h-0 overflow-y-auto border-border bg-white p-3 xl:relative xl:block xl:border-r ${historyOpen ? "absolute inset-0 z-30 block" : "hidden"}`}
        >
          <div className="flex items-center justify-between px-2 pt-2">
            <p className="studio-eyebrow text-system">Conversations</p>
            <button
              onClick={() => setHistoryOpen(false)}
              className="grid size-7 place-items-center rounded-lg hover:bg-mist xl:hidden"
              aria-label="Close history"
            >
              <X className="size-4" />
            </button>
          </div>
          <button
            onClick={() => void newConversation()}
            className="mt-3 flex min-h-11 w-full items-center gap-2 rounded-xl border border-border px-3 text-left text-xs font-black hover:border-ink"
          >
            <Plus className="size-4" /> New conversation
          </button>
          <div className="mt-3 space-y-1">
            {openThreads.map((thread) => {
              const active = activeConversation?.id === thread.id;
              const speaker = palDirectory[resolvePalName(thread.pal)];
              return (
                <Link
                  key={thread.id}
                  to="/studio/conversations/$conversationId"
                  params={{ conversationId: thread.id }}
                  onClick={() => setHistoryOpen(false)}
                  className={`block rounded-xl px-3 py-2.5 transition ${active ? "border border-current" : "border border-transparent hover:bg-mist"}`}
                  style={{
                    color: active ? `var(--${speaker.lane}-ink, var(--ink))` : "var(--ink)",
                    background: active ? speaker.soft : undefined,
                  }}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="block truncate text-xs font-bold">{thread.title}</span>
                  <span className="mt-1 block truncate text-[10px] text-muted-foreground">
                    {thread.is_legacy ? "Earlier history" : speaker.name} ·{" "}
                    {relativeDay(thread.last_message_at)}
                  </span>
                </Link>
              );
            })}
            {!openThreads.length ? (
              <p className="px-3 py-4 text-[11px] leading-relaxed text-muted-foreground">
                Your conversations will be saved here so you can pick any of them back up.
              </p>
            ) : null}
          </div>
        </aside>

        {/* Conversation */}
        <section className="flex min-h-0 min-w-0 flex-col">
          <header className="relative flex shrink-0 flex-wrap items-center gap-2 border-b border-border p-3 sm:p-4">
            <button
              onClick={() => setHistoryOpen(true)}
              className="grid size-10 shrink-0 place-items-center rounded-xl border border-border xl:hidden"
              aria-label="Open conversation history"
            >
              <MessageSquareText className="size-4" />
            </button>
            <img
              src={pal.headshot}
              alt={`${pal.name}, your Palmer House guide`}
              className="size-11 shrink-0 rounded-[0.9rem] border border-border bg-white object-cover object-top"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-black">
                {activeConversation?.title || `Talk with ${pal.name}`}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                {pal.name} · {pal.role}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              {activeConversation ? (
                <>
                  <button
                    onClick={() => void rename()}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-[11px] font-bold hover:bg-mist"
                  >
                    <Pencil className="size-3.5" />{" "}
                    <span className="sr-only sm:not-sr-only">Rename</span>
                  </button>
                  <button
                    onClick={() => void archiveCurrent()}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-[11px] font-bold hover:bg-mist"
                  >
                    <Archive className="size-3.5" />{" "}
                    <span className="sr-only sm:not-sr-only">Archive</span>
                  </button>
                </>
              ) : null}
              <button
                onClick={() => setPickerOpen((open) => !open)}
                aria-expanded={pickerOpen}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-[11px] font-bold hover:border-ink"
              >
                <Users className="size-3.5" />{" "}
                <span className="sr-only sm:not-sr-only">Change Pal</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setWorkOpen(true)}
              className="min-h-9 rounded-lg px-2 text-[11px] font-bold hover:bg-mist xl:hidden"
            >
              Next steps
            </button>
            {pickerOpen ? (
              <div className="absolute right-4 top-[calc(100%-0.5rem)] z-20 w-[min(26rem,calc(100vw-2rem))] rounded-[1.25rem] border border-border bg-white p-3 shadow-soft">
                <p className="studio-eyebrow px-1 pb-2 text-system">Who do you want on this?</p>
                <div className="grid gap-1.5 sm:grid-cols-2">
                  {palList.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => void choosePal(item.key)}
                      aria-pressed={item.key === selected}
                      className={`flex min-h-14 items-center gap-3 rounded-xl p-2 text-left transition ${item.key === selected ? "border border-current" : "border border-transparent hover:bg-mist"}`}
                      style={{
                        color:
                          item.key === selected
                            ? `var(--${item.lane}-ink, var(--ink))`
                            : "var(--ink)",
                      }}
                    >
                      <img
                        src={item.headshot}
                        alt=""
                        className="size-9 shrink-0 rounded-lg bg-white object-cover object-top"
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-xs font-black">{item.name}</span>
                        <span className="mt-0.5 block truncate text-[10px] text-muted-foreground">
                          {item.role}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
                <p className="px-1 pt-3 text-[10px] leading-relaxed text-muted-foreground">
                  Your conversation stays exactly where it is. Earlier answers keep the name of the
                  Pal who gave them.
                </p>
              </div>
            ) : null}
          </header>

          <div
            ref={scrollRef}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6"
            onScroll={(event) => {
              const viewport = event.currentTarget;
              nearBottom.current =
                viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight < 100;
            }}
          >
            {threadError ? (
              <div role="alert" className="mx-auto max-w-xl border-l-2 border-reel p-4">
                <p className="font-bold">We couldn’t open this conversation.</p>
                <p className="mt-2 text-sm text-muted-foreground">{threadError}</p>
                <button
                  type="button"
                  className="mt-4 min-h-10 rounded-lg border border-border px-4 text-sm font-bold"
                  onClick={() => {
                    setThreadError(null);
                    void openConversation(conversationId!).catch((error) =>
                      setThreadError(error instanceof Error ? error.message : "Please try again."),
                    );
                  }}
                >
                  Try again
                </button>
              </div>
            ) : conversationLoading && !conversationMessages.length ? (
              <p
                role="status"
                className="flex items-center justify-center gap-2 py-12 text-sm text-muted-foreground"
              >
                <LoaderCircle className="size-4 animate-spin" /> Opening conversation…
              </p>
            ) : null}
            {!conversationMessages.length && !conversationLoading && !threadError ? (
              <div className="mx-auto flex max-w-2xl flex-col items-center py-10 text-center sm:py-16">
                <img
                  src={pal.headshot}
                  alt=""
                  className="size-20 rounded-[1.25rem] border border-border bg-white object-cover object-top"
                />
                <h1 className="mt-6 text-3xl font-black tracking-[-.045em] sm:text-4xl">
                  {pal.persona.firstQuestion}
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {pal.intro} Ask in plain language — we have your saved brand, your work so far,
                  and what is on the calendar.
                </p>
                <div className="mt-7 w-full divide-y divide-border border-y border-border text-left">
                  {starters.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => setDraft(prompt)}
                      className="flex min-h-12 w-full items-center justify-between gap-3 px-2 py-3 text-left text-sm font-medium leading-snug hover:bg-mist"
                    >
                      {prompt}
                      <ArrowRight className="size-4 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-3xl space-y-6">
                {hasOlderMessages ? (
                  <button
                    onClick={() => void loadEarlier()}
                    disabled={conversationLoading}
                    className="mx-auto flex min-h-10 items-center gap-1.5 rounded-lg border border-border px-4 text-[11px] font-bold hover:border-ink disabled:opacity-40"
                  >
                    <ChevronUp className="size-3.5" /> Load earlier messages
                  </button>
                ) : null}

                {conversationMessages.map((message, messageIndex) => {
                  const previousQuestion =
                    conversationMessages
                      .slice(0, messageIndex)
                      .reverse()
                      .find((item) => item.role === "user")?.body || "";
                  const meta = assistantMetadata(message.metadata);
                  const speaker = palDirectory[resolvePalName(message.pal)];
                  if (message.role === "user") {
                    return (
                      <div
                        key={message.id}
                        className="ml-auto whitespace-pre-wrap break-words max-w-[90%] rounded-[1.25rem] rounded-br-md px-4 py-3 text-sm font-medium leading-relaxed text-white"
                        style={{ background: `var(--${pal.lane}-ink, var(--ink))` }}
                      >
                        {message.body}
                      </div>
                    );
                  }
                  return (
                    <div key={message.id} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={speaker.headshot}
                          alt=""
                          className="size-7 rounded-lg border border-border bg-white object-cover object-top"
                        />
                        <span className="text-xs font-black">{speaker.name}</span>
                        <span
                          className="font-mono text-[10px] uppercase tracking-[.14em]"
                          style={{ color: `var(--${speaker.lane}-ink, var(--ink))` }}
                        >
                          · {meta?.lane || speaker.lane}
                        </span>
                      </div>

                      {meta?.headline ? (
                        <p className="text-xl font-black leading-snug tracking-[-.03em]">
                          {meta.headline}
                        </p>
                      ) : null}

                      <StudioMarkdown accent={`var(--${speaker.lane}-ink, var(--ink))`}>
                        {message.body}
                      </StudioMarkdown>

                      {meta?.keyPoints?.length ? (
                        <ul
                          className="mt-4 space-y-2 rounded-[1rem] p-4"
                          style={{ background: speaker.soft }}
                        >
                          {meta.keyPoints.map((point) => (
                            <li
                              key={point}
                              className="flex gap-2.5 text-[13px] font-bold leading-snug"
                            >
                              <Check
                                className="mt-0.5 size-3.5 shrink-0"
                                style={{ color: `var(--${speaker.lane}-ink, var(--ink))` }}
                              />
                              {point}
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <button
                          onClick={() => void copyMessage(message.id, message.body)}
                          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-border bg-white px-3 text-[11px] font-bold hover:border-ink"
                        >
                          {copiedId === message.id ? (
                            <Check className="size-3.5" />
                          ) : (
                            <Copy className="size-3.5" />
                          )}
                          {copiedId === message.id ? "Copied" : "Copy"}
                        </button>
                        <button
                          onClick={() => void saveAnswerAsIdea(message.body, meta)}
                          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-border bg-white px-3 text-[11px] font-bold hover:border-ink"
                        >
                          <Plus className="size-3.5" /> Save as idea
                        </button>
                        <button
                          onClick={() => setCampaignSource({ body: message.body, meta })}
                          disabled={busy || building}
                          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-border bg-white px-3 text-[11px] font-bold hover:border-ink disabled:opacity-40"
                        >
                          {building ? (
                            <LoaderCircle className="size-3.5 animate-spin" />
                          ) : (
                            <Sparkles className="size-3.5" />
                          )}
                          Build this campaign
                        </button>
                        <button
                          onClick={() => {
                            setDraft(previousQuestion);
                            composerRef.current?.focus();
                          }}
                          disabled={busy || !previousQuestion}
                          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-border bg-white px-3 text-[11px] font-bold hover:border-ink disabled:opacity-40"
                        >
                          <RotateCcw className="size-3.5" /> Ask again
                        </button>
                      </div>

                      {meta?.followUps?.length ? (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {meta.followUps.map((question) => (
                            <button
                              key={question}
                              onClick={() => {
                                setDraft(question);
                                composerRef.current?.focus();
                              }}
                              disabled={
                                busy || sending || conversationLoading || Boolean(threadError)
                              }
                              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-dashed border-border px-3 text-left text-[11px] font-bold text-muted-foreground transition hover:border-ink hover:text-ink disabled:opacity-40"
                            >
                              {question}
                              <ArrowRight className="size-3.5 shrink-0" />
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
                {busy ? (
                  <div role="status" className="flex items-center gap-3">
                    <img
                      src={pal.headshot}
                      alt=""
                      className="size-7 animate-pulse rounded-lg border border-border object-cover object-top"
                    />
                    <span className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <LoaderCircle
                        className="size-3.5 animate-spin"
                        style={{ color: pal.color }}
                      />
                      {pal.name} is reading the workspace…
                    </span>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <form onSubmit={submit} className="shrink-0 border-t border-border bg-white p-3 sm:p-4">
            <div
              className="mx-auto max-w-3xl rounded-[1.15rem] border border-border bg-white p-2 shadow-soft transition focus-within:border-current"
              style={{ color: `var(--${pal.lane}-ink, var(--ink))` }}
            >
              <div className="px-1 pb-2 pt-1">
                <ComposerIntake
                  key={draftKey}
                  color={`var(--${pal.lane}-ink, var(--ink))`}
                  conversationId={activeConversation?.id || conversationId}
                  attachments={attachments}
                  onAttachmentsChange={setAttachments}
                  onBusyChange={setIntakeBusy}
                  onTranscript={(text) =>
                    setDraft((current) => (current ? `${current.trim()} ${text}` : text))
                  }
                  disabled={busy || sending || conversationLoading || Boolean(threadError)}
                />
              </div>
              <div className="flex items-end gap-2">
                <textarea
                  ref={composerRef}
                  aria-label={`Message ${pal.name}`}
                  disabled={conversationLoading || Boolean(threadError)}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (
                      event.key === "Enter" &&
                      !event.shiftKey &&
                      !event.nativeEvent.isComposing
                    ) {
                      event.preventDefault();
                      void send(draft);
                    }
                  }}
                  rows={2}
                  placeholder={`Tell ${pal.name} what you are working on…`}
                  className="min-h-12 flex-1 resize-none border-0 bg-transparent p-2 text-sm text-ink outline-none"
                />
                <button
                  disabled={
                    busy ||
                    sending ||
                    intakeBusy ||
                    conversationLoading ||
                    Boolean(threadError) ||
                    (draft.trim().length < 3 && !attachments.length)
                  }
                  aria-label="Send message"
                  className="grid size-11 shrink-0 place-items-center rounded-xl text-white disabled:opacity-35"
                  style={{ background: `var(--${pal.lane}-ink, var(--ink))` }}
                >
                  {busy ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}
                </button>
              </div>
            </div>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              Enter to send · Shift + Enter for a new line
            </p>
          </form>
        </section>

        {/* Work panel */}
        <aside
          className={`min-h-0 overflow-y-auto border-border bg-mist p-4 xl:relative xl:block xl:border-l ${workOpen ? "absolute inset-0 z-30 block" : "hidden"}`}
        >
          <button
            type="button"
            onClick={() => setWorkOpen(false)}
            aria-label="Close next steps"
            className="mb-4 ml-auto grid size-9 place-items-center rounded-lg hover:bg-white xl:hidden"
          >
            <X className="size-4" />
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-system" />
            <p className="text-sm font-black">What we can do with this</p>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
            Everything here saves into your work — nothing runs on its own.
          </p>
          <div className="mt-4 divide-y divide-border">
            {(latestResponse?.recommendations || []).map((item) => (
              <article key={item.title} className="py-4">
                <p className="text-sm font-black">{item.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.reason}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => void saveRecommendation(item)}
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-system-soft px-2 text-[10px] font-bold text-system"
                  >
                    <Plus className="size-3.5" /> Save idea
                  </button>
                  <button
                    onClick={() => void scheduleRecommendation(item)}
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-evergreen-soft px-2 text-[10px] font-bold text-evergreen"
                  >
                    <CalendarPlus className="size-3.5" /> Plan next week
                  </button>
                </div>
              </article>
            ))}
            {!latestResponse ? (
              <div className="border-t border-border py-5">
                <Brain className="size-5 text-system" />
                <p className="mt-3 text-xs font-bold">
                  Say one thing and this fills with real next steps.
                </p>
                <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                  {campaigns.length} campaigns and {calendar.length} calendar items are already
                  available as context.
                </p>
              </div>
            ) : null}
          </div>

          {latestResponse?.memorySuggestions.length ? (
            <div className="mt-6 border-t border-border pt-5">
              <div className="flex items-center gap-2">
                <Brain className="size-4 text-spotlight" />
                <p className="text-sm font-black">Worth remembering</p>
              </div>
              <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                Approve durable facts before they become Brand DNA.
              </p>
              <div className="mt-3 space-y-2">
                {latestResponse.memorySuggestions.map((item) => {
                  const key = `${item.field}:${item.value}`;
                  const saved = savedMemory.includes(key);
                  return (
                    <button
                      key={key}
                      disabled={saved}
                      onClick={() => void acceptMemory(item)}
                      className="w-full rounded-xl border border-border bg-white p-3 text-left disabled:opacity-55"
                    >
                      <span className="flex items-center justify-between gap-2 text-[10px] font-black uppercase tracking-[.08em] text-spotlight">
                        {item.field.replaceAll("_", " ")}
                        {saved ? <Check className="size-3.5" /> : null}
                      </span>
                      <span className="mt-2 block text-xs leading-relaxed">{item.value}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </aside>
      </div>
      <Dialog
        open={Boolean(campaignSource)}
        onOpenChange={(open) => {
          if (!open && !building) setCampaignSource(null);
        }}
      >
        <DialogContent className="studio-app max-h-[90dvh] overflow-y-auto rounded-2xl">
          <DialogTitle>Make this a campaign</DialogTitle>
          <DialogDescription>
            Choose the outcome and format. We’ll use this conversation and your Brand DNA to build
            an editable campaign.
          </DialogDescription>
          <label className="grid gap-2 text-sm font-bold">
            Goal
            <select
              value={campaignGoal}
              onChange={(event) => setCampaignGoal(event.target.value)}
              className="min-h-11 rounded-lg border border-border bg-white px-3 font-normal"
              disabled={building}
            >
              {studioGoals.map((goal) => (
                <option key={goal} value={goal}>
                  {goal}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Anchor format
            <select
              value={campaignFormat}
              onChange={(event) => setCampaignFormat(event.target.value)}
              className="min-h-11 rounded-lg border border-border bg-white px-3 font-normal"
              disabled={building}
            >
              {anchorFormats.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </select>
          </label>
          <p className="text-xs leading-relaxed text-muted-foreground">
            This uses one campaign from your plan. You can review and edit it before scheduling
            anything.
          </p>
          <button
            type="button"
            disabled={building || busy}
            onClick={() => {
              if (campaignSource) void buildCampaign(campaignSource.body, campaignSource.meta);
            }}
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-ink px-4 text-sm font-bold text-white disabled:opacity-50"
          >
            {building ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            {building ? "Building campaign…" : "Build campaign"}
          </button>
          <Link
            to="/studio/create"
            className="min-h-10 text-center text-sm font-bold underline underline-offset-4"
            onClick={() => setCampaignSource(null)}
          >
            Open the full creation workflow
          </Link>
        </DialogContent>
      </Dialog>
    </div>
  );
}
