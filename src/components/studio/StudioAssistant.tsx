import { StudioCreditCost } from "./StudioCredits";
import { Link, useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { useStudioMotion } from "./studio-motion";
import { motion } from "motion/react";
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
  Menu,
  History,
  Info,
  ImagePlus,
  FileText,
  ArrowUp,
  Pencil,
  Plus,
  RotateCcw,
  Sparkles,
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
import { PalAvatar } from "./PalAvatar";
import {
  StudioChatArtifactCard,
  StudioChatEditor,
  StudioOriginAvatar,
  record,
} from "./StudioChatArtifacts";
import { StudioCustomPal } from "./StudioCustomPal";
import { PalActivity, PalWelcome } from "./PalPresence";
import "./studio-chat.css";

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
    customPals = [],
    activeCustomPalId,
    selectCustomPal,
    generateArtifact,
    linkCampaignToConversation,
    activeConversation,
    archiveConversation,
    askPal,
    assets,
    brand,
    busy,
    calendar,
    campaigns,
    ideas,
    profile,
    workspace,
    workspaceMemories,
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
  const { reduceMotion: reduce, fadeTransition } = useStudioMotion();

  // The conversation's own Pal wins; otherwise the member's saved guide. The
  // neutral option resolves to a real Pal so the name on screen always matches
  // the one we send to the model.
  const selected = resolvePalName(
    (activeConversation && activeConversation.id === conversationId
      ? activeConversation.pal
      : null) || settings?.preferred_pal,
  );
  const customPal = customPals.find((item) => item.id === activeCustomPalId);
  const basePal = palDirectory[customPal?.base_pal || selected];
  const pal = customPal
    ? {
        ...basePal,
        name: customPal.name,
        avatar: customPal.avatar_url || basePal.avatar,
        headshot: customPal.avatar_url || basePal.headshot,
        role: "Your creative Pal",
      }
    : basePal;

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
  const [customOpen, setCustomOpen] = useState(false);
  const [greetingCycle, setGreetingCycle] = useState(0);
  const [dismissedOpening, setDismissedOpening] = useState("");
  const [composerTools, setComposerTools] = useState(false);
  const [editor, setEditor] = useState<{ assetId: string; mode: "preview" | "edit" } | null>(null);
  const [artifactKind, setArtifactKind] = useState<"image" | "pdf" | null>(null);
  const [artifactPrompt, setArtifactPrompt] = useState("");
  const [artifactTitle, setArtifactTitle] = useState("");
  const [artifactBusy, setArtifactBusy] = useState(false);
  const [artifactError, setArtifactError] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const palTriggerRef = useRef<HTMLButtonElement>(null);
  const historyTriggerRef = useRef<HTMLButtonElement>(null);
  const workTriggerRef = useRef<HTMLButtonElement>(null);
  const composerToolsRef = useRef<HTMLButtonElement>(null);
  const campaignTriggerRef = useRef<HTMLButtonElement | null>(null);
  function returnFocus(event: Event, target: HTMLElement | null) {
    event.preventDefault();
    if (target?.isConnected) target.focus();
  }
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollSnapshot = useRef<{ height: number; top: number } | null>(null);
  const scrollTail = useRef<string | undefined>(undefined);
  const nearBottom = useRef(true);
  const justOpened = useRef(true);
  const routeRef = useRef(conversationId);
  routeRef.current = conversationId;
  const composerRef = useRef<HTMLTextAreaElement | null>(null);
  const presenceKey = `${workspace?.id || "workspace"}:${draftKey}:${customPal?.id || selected}:${greetingCycle}:${navigationKey || "arrival"}`;
  const actualWork = sending || artifactBusy || building;
  useEffect(() => {
    // Creating a thread changes its URL during a request. Keep that arrival quiet too.
    if (actualWork) setDismissedOpening(presenceKey);
  }, [actualWork, presenceKey]);
  const upcoming = [...calendar]
    .filter((item) => item.status !== "published" && Date.parse(item.publish_at) >= Date.now())
    .sort((a, b) => Date.parse(a.publish_at) - Date.parse(b.publish_at))[0];
  const currentCampaign = [...campaigns].sort((a, b) =>
    b.updated_at.localeCompare(a.updated_at),
  )[0];
  const openingContext = {
    memberName: profile?.full_name || undefined,
    businessName: brand?.business_name || workspace?.name,
    threadTitle:
      conversationId && activeConversation?.id === conversationId
        ? activeConversation.title
        : undefined,
    campaignTitle: currentCampaign?.title,
    upcomingTitle: upcoming?.title,
    ideaTitle: ideas[0]?.body,
    memoryTitle: workspaceMemories[0]?.title,
    draftCount: assets.length,
    customName: customPal?.name,
  };
  const showOpening =
    !actualWork &&
    !conversationLoading &&
    !threadError &&
    dismissedOpening !== presenceKey &&
    (!conversationId || activeConversation?.id === conversationId);
  function useOpeningPrompt(prompt: string) {
    setDraft(prompt);
    if (conversationMessages.length) setDismissedOpening(presenceKey);
    composerRef.current?.focus();
  }
  useLayoutEffect(() => {
    if (!editor || window.matchMedia("(max-width: 1100px)").matches) return;
    const viewport = scrollRef.current;
    const card = Array.from(
      viewport?.querySelectorAll<HTMLElement>(".studio-chat-artifact") || [],
    ).find((element) => element.dataset.assetId === editor.assetId);
    if (viewport && card)
      viewport.scrollTop += card.getBoundingClientRect().top - viewport.getBoundingClientRect().top;
  }, [editor]);

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
    setEditor(null);
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
      const latest = viewport.querySelector<HTMLElement>(".studio-chat-turn:last-of-type");
      // Start a long answer where it can be read, rather than below its artifact.
      viewport.scrollTop =
        latest && latest.offsetHeight > viewport.clientHeight
          ? latest.getBoundingClientRect().top -
            viewport.getBoundingClientRect().top +
            viewport.scrollTop
          : viewport.scrollHeight;
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
    setGreetingCycle((cycle) => cycle + 1);
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
    if (building) return;
    const targetConversation = conversationId;
    const originPal = selected;
    const originProfile = customPal?.id;
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
        conversationId: targetConversation || undefined,
      });
      setCampaignSource(null);
      toast.success("Your campaign is built.");
      if (targetConversation) {
        try {
          await linkCampaignToConversation({
            campaignId: id,
            conversationId: targetConversation,
            pal: originPal,
            palProfileId: originProfile,
          });
        } catch (error) {
          toast.error(
            `Your campaign is saved in Campaigns. ${error instanceof Error ? error.message : "It could not be attached to this conversation."}`,
          );
        }
      } else {
        await navigate({ to: "/studio/campaigns/$campaignId", params: { campaignId: id } });
      }
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
      if (activeCustomPalId && selectCustomPal) await selectCustomPal(null);
      // Keep the open thread with this Pal, and make it the default guide.
      if (activeConversation) await setConversationPal(activeConversation.id, name);
      await saveSettings({ preferred_pal: name });
      setGreetingCycle((cycle) => cycle + 1);
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

  async function createArtifact() {
    if (!artifactKind || !artifactPrompt.trim() || artifactBusy) return;
    setArtifactBusy(true);
    setArtifactError("");
    try {
      let thread = conversationId;
      if (!thread) {
        thread = await startConversation(selected, artifactTitle || artifactPrompt.slice(0, 58));
        await navigate({
          to: "/studio/conversations/$conversationId",
          params: { conversationId: thread },
        });
      }
      await generateArtifact({
        kind: artifactKind,
        title: artifactTitle || (artifactKind === "image" ? "New image" : "New document"),
        prompt: artifactPrompt,
        conversationId: thread,
        palProfileId: customPal?.id,
        pal: selected,
      });
      setArtifactKind(null);
      setArtifactPrompt("");
      setArtifactTitle("");
      toast.success("Created and saved to your Library.");
    } catch (reason) {
      setArtifactError(
        reason instanceof Error
          ? reason.message
          : "Could not create this file. Your request is ready to retry.",
      );
    } finally {
      setArtifactBusy(false);
    }
  }
  function openArtifact(kind: "image" | "pdf") {
    setArtifactKind(kind);
    setArtifactPrompt(draft);
    setArtifactError("");
    setComposerTools(false);
  }

  return (
    <div className={`studio-chat-workspace ${editor ? "has-editor" : ""}`}>
      <section className="studio-chat-main" aria-label={`Conversation with ${pal.name}`}>
        <header className="studio-chat-header">
          <button
            type="button"
            className="studio-chat-icon studio-chat-menu"
            aria-label="Open Studio navigation"
            onClick={() => window.dispatchEvent(new CustomEvent("studio:open-navigation"))}
          >
            <Menu size={20} />
          </button>
          <button
            type="button"
            className="studio-chat-pal"
            ref={palTriggerRef}
            disabled={actualWork}
            onClick={() => setPickerOpen(true)}
            aria-label={`Change Pal, currently ${pal.name}`}
          >
            <PalAvatar
              pal={pal}
              size="md"
              activity={artifactBusy || building ? "creating" : sending ? "thinking" : "idle"}
              ring={false}
            />
            <span>
              <strong>{pal.name}</strong>
              <small>Your creative Pal</small>
            </span>
          </button>
          <div className="studio-chat-header-actions">
            <button
              type="button"
              className="studio-chat-icon"
              aria-label="New conversation"
              onClick={() => void newConversation()}
            >
              <Plus size={20} />
            </button>
            <button
              type="button"
              className="studio-chat-icon"
              aria-label="Open conversation history"
              ref={historyTriggerRef}
              onClick={() => setHistoryOpen(true)}
            >
              <History size={19} />
            </button>
            <button
              type="button"
              className="studio-chat-icon"
              aria-label="Open next steps"
              ref={workTriggerRef}
              onClick={() => setWorkOpen(true)}
            >
              <Info size={19} />
            </button>
          </div>
        </header>
        {showOpening && conversationMessages.length > 0 ? (
          <div className="studio-chat-return" role="status">
            <img src={pal.avatar} alt="" className="studio-chat-return-avatar" />
            <span>
              <strong>{pal.name}:</strong> Welcome back. Pick up where we left off, or tell me
              what’s next.
            </span>
            <button
              type="button"
              aria-label="Dismiss greeting"
              onClick={() => setDismissedOpening(presenceKey)}
            >
              <X size={14} />
            </button>
          </div>
        ) : null}
        <div
          ref={scrollRef}
          className="studio-chat-scroll"
          onScroll={(event) => {
            const viewport = event.currentTarget;
            nearBottom.current =
              viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight < 100;
          }}
        >
          <div className="studio-chat-timeline">
            {threadError ? (
              <div role="alert" className="studio-chat-error">
                <strong>We couldn’t open this conversation.</strong>
                <p>{threadError}</p>
                <button
                  type="button"
                  className="studio-chat-button"
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
              <p role="status" className="studio-chat-loading">
                <LoaderCircle size={18} className="animate-spin" /> Opening conversation…
              </p>
            ) : null}
            {showOpening && !conversationMessages.length ? (
              <PalWelcome
                key={presenceKey}
                pal={pal}
                context={openingContext}
                variant={greetingCycle}
                onPrompt={useOpeningPrompt}
                onImage={() => openArtifact("image")}
                onPdf={() => openArtifact("pdf")}
                onDismiss={() => setDismissedOpening(presenceKey)}
              />
            ) : null}
            {hasOlderMessages ? (
              <button
                type="button"
                className="studio-chat-earlier"
                onClick={() => void loadEarlier()}
                disabled={conversationLoading}
              >
                <ChevronUp size={15} /> Load earlier messages
              </button>
            ) : null}
            {conversationMessages.map((message, messageIndex) => {
              const raw = record(message.metadata);
              const meta = assistantMetadata(message.metadata);
              const origin = record(raw.originatingPal);
              const original = palDirectory[resolvePalName(message.pal)];
              const originAvatar =
                typeof origin.avatarUrl === "string"
                  ? origin.avatarUrl
                  : typeof origin.avatar_url === "string"
                    ? origin.avatar_url
                    : original.avatar;
              const speaker = {
                ...original,
                name: typeof origin.name === "string" ? origin.name : original.name,
                avatar: originAvatar,
                headshot: originAvatar,
              };
              const previousQuestion =
                conversationMessages
                  .slice(0, messageIndex)
                  .reverse()
                  .find((item) => item.role === "user")?.body || "";
              const linkedCampaign =
                typeof raw.campaignId === "string"
                  ? raw.campaignId
                  : typeof raw.campaign_id === "string"
                    ? raw.campaign_id
                    : campaigns.find(
                        (item) => item.title.length > 5 && message.body.includes(item.title),
                      )?.id;
              const assetIds = Array.isArray(raw.assetIds)
                ? raw.assetIds.filter((id): id is string => typeof id === "string")
                : typeof raw.assetId === "string"
                  ? [raw.assetId]
                  : typeof raw.artifactId === "string"
                    ? [raw.artifactId]
                    : undefined;
              if (message.role === "user")
                return (
                  <div key={message.id} className="studio-chat-user-message">
                    {message.body}
                  </div>
                );
              return (
                <div key={message.id} className="studio-chat-turn">
                  <div className="studio-chat-response">
                    <StudioOriginAvatar
                      pal={speaker}
                      avatarPath={
                        typeof origin.avatarPath === "string" ? origin.avatarPath : undefined
                      }
                    />
                    <article className="studio-chat-bubble">
                      <span className="studio-chat-author">{speaker.name}</span>
                      {meta?.headline ? <h2>{meta.headline}</h2> : null}
                      <StudioMarkdown accent="var(--studio-accent)" variant="chat">
                        {message.body}
                      </StudioMarkdown>
                    </article>
                  </div>
                  {linkedCampaign || assetIds?.length ? (
                    <StudioChatArtifactCard
                      campaignId={linkedCampaign}
                      assetIds={assetIds}
                      onOpen={(assetId, mode) => setEditor({ assetId, mode })}
                    />
                  ) : null}
                  {meta?.keyPoints?.length && !linkedCampaign ? (
                    <ul className="studio-chat-keypoints">
                      {meta.keyPoints.map((point) => (
                        <li key={point}>
                          <Check size={14} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="studio-chat-message-actions">
                    <button
                      type="button"
                      onClick={() => void copyMessage(message.id, message.body)}
                      aria-label={`Copy ${speaker.name}’s answer`}
                    >
                      {copiedId === message.id ? <Check size={14} /> : <Copy size={14} />}
                      {copiedId === message.id ? "Copied" : "Copy"}
                    </button>
                    <button type="button" onClick={() => void saveAnswerAsIdea(message.body, meta)}>
                      <Plus size={14} />
                      Save idea
                    </button>
                    {!linkedCampaign ? (
                      <button
                        type="button"
                        onClick={(event) => {
                          campaignTriggerRef.current = event.currentTarget;
                          setCampaignSource({ body: message.body, meta });
                        }}
                        disabled={busy || building}
                      >
                        <Sparkles size={14} />
                        Build campaign
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => {
                        setDraft(previousQuestion);
                        composerRef.current?.focus();
                      }}
                      disabled={busy || !previousQuestion}
                    >
                      <RotateCcw size={14} />
                      Ask again
                    </button>
                  </div>
                  {meta?.followUps?.length ? (
                    <div className="studio-chat-followups">
                      {meta.followUps.map((question) => (
                        <button
                          type="button"
                          key={question}
                          onClick={() => {
                            setDraft(question);
                            composerRef.current?.focus();
                          }}
                          disabled={busy || sending || conversationLoading || Boolean(threadError)}
                        >
                          {question}
                          <ArrowRight size={13} />
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
            {actualWork ? (
              <PalActivity
                pal={pal}
                custom={Boolean(customPal)}
                task={artifactBusy ? artifactKind || "image" : building ? "campaign" : "reply"}
              />
            ) : null}
          </div>
        </div>
        <form onSubmit={submit} className="studio-chat-composer">
          {composerTools || attachments.length || intakeBusy ? (
            <motion.div
              className="studio-composer-tools"
              initial={reduce ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={fadeTransition}
            >
              <ComposerIntake
                key={draftKey}
                color="var(--studio-accent)"
                conversationId={activeConversation?.id || conversationId}
                attachments={attachments}
                onAttachmentsChange={setAttachments}
                onBusyChange={setIntakeBusy}
                onTranscript={(text) =>
                  setDraft((current) => (current ? `${current.trim()} ${text}` : text))
                }
                disabled={busy || sending || conversationLoading || Boolean(threadError)}
              />
              <div className="studio-composer-create">
                <button type="button" onClick={() => openArtifact("image")}>
                  <ImagePlus size={15} /> Create image
                </button>
                <button type="button" onClick={() => openArtifact("pdf")}>
                  <FileText size={15} /> Create PDF
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="studio-composer-intake-hidden">
              <ComposerIntake
                key={draftKey}
                color="var(--studio-accent)"
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
          )}
          <div className="studio-composer-row">
            <button
              type="button"
              className="studio-composer-add"
              aria-label={composerTools ? "Close attachment tools" : "Add files or create content"}
              ref={composerToolsRef}
              aria-expanded={composerTools}
              onClick={() => setComposerTools((open) => !open)}
            >
              {composerTools ? <X size={21} /> : <Plus size={24} />}
            </button>
            <textarea
              ref={composerRef}
              aria-label={`Message ${pal.name}`}
              disabled={conversationLoading || Boolean(threadError)}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                  event.preventDefault();
                  void send(draft);
                }
              }}
              rows={1}
              placeholder={`Message ${pal.name}…`}
            />
            <button
              disabled={
                busy ||
                sending ||
                artifactBusy ||
                intakeBusy ||
                conversationLoading ||
                Boolean(threadError) ||
                (draft.trim().length < 3 && !attachments.length)
              }
              aria-label="Send message"
              className="studio-composer-send"
            >
              {sending ? (
                <LoaderCircle size={21} className="animate-spin" />
              ) : (
                <ArrowUp size={22} />
              )}
            </button>
          </div>
          <StudioCreditCost operation="chat" compact />
          <p>Ideas become drafts. Nothing publishes without you.</p>
        </form>
      </section>
      {editor ? (
        <StudioChatEditor
          key={editor.assetId}
          assetId={editor.assetId}
          initialMode={editor.mode}
          pal={pal}
          onClose={() => setEditor(null)}
          onRefine={(prompt) => {
            setDraft(prompt);
            if (window.matchMedia("(max-width: 1100px)").matches) setEditor(null);
            composerRef.current?.focus();
          }}
        />
      ) : null}
      <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
        <DialogContent
          className="studio-app studio-pal-picker"
          onCloseAutoFocus={(event) =>
            returnFocus(event, customOpen ? null : palTriggerRef.current)
          }
        >
          <DialogTitle>Who do you want on this?</DialogTitle>
          <DialogDescription>
            Different personalities. The same shared knowledge of your business.
          </DialogDescription>
          <div className="studio-pal-grid">
            {palList.map((item) => (
              <button
                key={item.key}
                type="button"
                aria-pressed={!customPal && item.key === selected}
                onClick={() => void choosePal(item.key)}
              >
                <PalAvatar pal={item} size="md" ring={false} />
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.role}</small>
                </span>
                {!customPal && item.key === selected ? <Check size={16} /> : null}
              </button>
            ))}
            {customPals.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={item.id === activeCustomPalId}
                onClick={() => {
                  void selectCustomPal(item.id)
                    .then(() => setPickerOpen(false))
                    .catch((error) => toast.error(error.message));
                }}
              >
                <PalAvatar
                  pal={{
                    ...palDirectory[item.base_pal],
                    name: item.name,
                    avatar: item.avatar_url || palDirectory[item.base_pal].avatar,
                  }}
                  size="md"
                  ring={false}
                />
                <span>
                  <strong>{item.name}</strong>
                  <small>Your custom Pal</small>
                </span>
                {item.id === activeCustomPalId ? <Check size={16} /> : null}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="studio-chat-button is-primary"
            onClick={() => {
              setPickerOpen(false);
              setCustomOpen(true);
            }}
          >
            <Plus size={17} />
            Create a Pal
          </button>
          <p className="studio-picker-note">
            Earlier answers keep the name of the Pal who wrote them.
          </p>
        </DialogContent>
      </Dialog>
      <StudioCustomPal
        open={customOpen}
        onClose={() => setCustomOpen(false)}
        returnFocusTo={palTriggerRef}
      />
      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
        <DialogContent
          className="studio-app studio-chat-history"
          onCloseAutoFocus={(event) => returnFocus(event, historyTriggerRef.current)}
        >
          <DialogTitle>Your conversations</DialogTitle>
          <DialogDescription>Pick up where you left off.</DialogDescription>
          <button
            type="button"
            className="studio-chat-button is-primary"
            onClick={() => void newConversation()}
          >
            <Plus size={17} />
            New conversation
          </button>
          <div className="studio-history-list">
            {openThreads.map((thread) => (
              <Link
                key={thread.id}
                to="/studio/conversations/$conversationId"
                params={{ conversationId: thread.id }}
                onClick={() => setHistoryOpen(false)}
                aria-current={thread.id === conversationId ? "page" : undefined}
              >
                <MessageSquareText size={17} />
                <span>
                  <strong>{thread.title}</strong>
                  <small>{relativeDay(thread.last_message_at || thread.updated_at)}</small>
                </span>
              </Link>
            ))}
          </div>
          {!openThreads.length ? (
            <p>Your conversations will appear here after your first message.</p>
          ) : null}
          {activeConversation ? (
            <div className="studio-history-controls">
              <button type="button" className="studio-chat-button" onClick={() => void rename()}>
                <Pencil size={15} />
                Rename
              </button>
              <button
                type="button"
                className="studio-chat-button"
                onClick={() => void archiveCurrent()}
              >
                <Archive size={15} />
                Archive
              </button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
      <Dialog open={workOpen} onOpenChange={setWorkOpen}>
        <DialogContent
          className="studio-app studio-chat-next"
          onCloseAutoFocus={(event) => returnFocus(event, workTriggerRef.current)}
        >
          <DialogTitle>What we can do with this</DialogTitle>
          <DialogDescription>Turn the conversation into work you can use.</DialogDescription>
          {latestResponse?.recommendations.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.reason}</p>
              <div>
                <button
                  type="button"
                  className="studio-chat-button"
                  onClick={() => void saveRecommendation(item)}
                >
                  <Plus size={15} />
                  Save idea
                </button>
                <button
                  type="button"
                  className="studio-chat-button"
                  onClick={() => void scheduleRecommendation(item)}
                >
                  <CalendarPlus size={15} />
                  Plan next week
                </button>
              </div>
            </article>
          ))}
          {!latestResponse ? (
            <p>
              Your next steps will appear here as you talk. Your Pal can build on {campaigns.length}{" "}
              campaigns and {calendar.length} calendar items.
            </p>
          ) : null}
          {latestResponse?.memorySuggestions?.length ? (
            <section>
              <h3>
                <Brain size={17} />
                Worth remembering
              </h3>
              <p>Approve these facts to add them to Brand DNA.</p>
              {latestResponse.memorySuggestions.map((item) => {
                const key = `${item.field}:${item.value}`;
                return (
                  <button
                    key={key}
                    className="studio-memory-button"
                    disabled={savedMemory.includes(key)}
                    onClick={() => void acceptMemory(item)}
                  >
                    <strong>{item.field.replaceAll("_", " ")}</strong>
                    <span>{item.value}</span>
                    {savedMemory.includes(key) ? <Check size={16} /> : <Plus size={16} />}
                  </button>
                );
              })}
            </section>
          ) : null}
        </DialogContent>
      </Dialog>
      <Dialog
        open={Boolean(artifactKind)}
        onOpenChange={(open) => {
          if (!open && !artifactBusy) setArtifactKind(null);
        }}
      >
        <DialogContent
          className="studio-app studio-custom-pal"
          closeDisabled={artifactBusy}
          onCloseAutoFocus={(event) => returnFocus(event, composerToolsRef.current)}
          onEscapeKeyDown={(event) => {
            if (artifactBusy) event.preventDefault();
          }}
        >
          <DialogTitle>{artifactKind === "image" ? "Create an image" : "Create a PDF"}</DialogTitle>
          <DialogDescription>
            {pal.name} will use your brief and Brand DNA. Your finished file saves to Library.
          </DialogDescription>
          <label className="studio-editor-label">
            Title
            <input
              value={artifactTitle}
              disabled={artifactBusy}
              onChange={(event) => setArtifactTitle(event.target.value)}
              maxLength={120}
              placeholder={
                artifactKind === "image" ? "Morning at the bakery" : "Our customer welcome guide"
              }
            />
          </label>
          <label className="studio-editor-label">
            What should we make?
            <textarea
              rows={6}
              value={artifactPrompt}
              disabled={artifactBusy}
              onChange={(event) => setArtifactPrompt(event.target.value)}
              maxLength={3000}
              placeholder={
                artifactKind === "image"
                  ? "Describe the subject, setting, and feeling…"
                  : "Describe the document, who it is for, and what it should include…"
              }
            />
          </label>
          <StudioCreditCost operation={artifactKind || "image"} />
          {artifactBusy && (
            <PalActivity pal={pal} custom={Boolean(customPal)} task={artifactKind || "image"} />
          )}
          {artifactError ? (
            <p role="alert" className="studio-chat-error">
              {artifactError}
            </p>
          ) : null}
          <button
            type="button"
            className="studio-chat-button is-primary"
            disabled={artifactBusy || artifactPrompt.trim().length < 3}
            onClick={() => void createArtifact()}
          >
            {artifactBusy ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <Sparkles size={16} />
            )}
            {artifactBusy
              ? "Creating and saving…"
              : artifactKind === "image"
                ? "Create image"
                : "Create PDF"}
          </button>
        </DialogContent>
      </Dialog>
      <Dialog
        open={Boolean(campaignSource)}
        onOpenChange={(open) => {
          if (!open && !building) setCampaignSource(null);
        }}
      >
        <DialogContent
          className="studio-app studio-custom-pal"
          onCloseAutoFocus={(event) => returnFocus(event, campaignTriggerRef.current)}
        >
          <DialogTitle>Make this a campaign</DialogTitle>
          <DialogDescription>
            Choose the outcome and format. We’ll build editable drafts from this conversation and
            your Brand DNA.
          </DialogDescription>
          <label className="studio-editor-label">
            Goal
            <select
              value={campaignGoal}
              onChange={(event) => setCampaignGoal(event.target.value)}
              disabled={building}
            >
              {studioGoals.map((goal) => (
                <option key={goal}>{goal}</option>
              ))}
            </select>
          </label>
          <label className="studio-editor-label">
            Anchor format
            <select
              value={campaignFormat}
              onChange={(event) => setCampaignFormat(event.target.value)}
              disabled={building}
            >
              {anchorFormats.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </select>
          </label>
          <StudioCreditCost operation="campaign" />
          <p className="studio-picker-note">
            Written drafts and video scripts. Generate images separately when you need them.
          </p>
          <button
            type="button"
            disabled={building || busy}
            onClick={() => {
              if (campaignSource) void buildCampaign(campaignSource.body, campaignSource.meta);
            }}
            className="studio-chat-button is-primary"
          >
            {building ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <Sparkles size={16} />
            )}
            {building ? "Building campaign…" : "Build campaign"}
          </button>
          <Link
            to="/studio/create"
            className="studio-chat-text-link"
            onClick={() => setCampaignSource(null)}
          >
            Open the full creation workflow
          </Link>
        </DialogContent>
      </Dialog>
    </div>
  );
}
