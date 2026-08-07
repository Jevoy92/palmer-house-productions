import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Brain,
  CalendarPlus,
  Check,
  Copy,
  Lightbulb,
  LoaderCircle,
  MessageSquareText,
  Plus,
  RotateCcw,
  Send,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { toast } from "sonner";
import kareem from "@/assets/pal-headshots/kareem.png";
import kiana from "@/assets/pal-headshots/kiana.png";
import ryder from "@/assets/pal-headshots/ryder.png";
import raquel from "@/assets/pal-headshots/raquel.png";
import cyrus from "@/assets/pal-headshots/cyrus.png";
import clara from "@/assets/pal-headshots/clara.png";
import silas from "@/assets/pal-headshots/silas.png";
import samira from "@/assets/pal-headshots/samira.png";
import type { AssistantResponse, PalName, StudioLane } from "@/lib/studio-model";
import { StudioMarkdown } from "./StudioMarkdown";
import { useStudio } from "./StudioProvider";


const palDirectory: Record<
  PalName,
  { name: string; role: string; lane: StudioLane; image: string; color: string; soft: string }
> = {
  kareem: {
    name: "Kareem",
    role: "Production quality",
    lane: "spotlight",
    image: kareem,
    color: "var(--spotlight)",
    soft: "var(--spotlight-soft)",
  },
  kiana: {
    name: "Kiana",
    role: "Story and presence",
    lane: "spotlight",
    image: kiana,
    color: "var(--spotlight)",
    soft: "var(--spotlight-soft)",
  },
  ryder: {
    name: "Ryder",
    role: "Hooks and momentum",
    lane: "reel",
    image: ryder,
    color: "var(--reel)",
    soft: "var(--reel-soft)",
  },
  raquel: {
    name: "Raquel",
    role: "Retention and connection",
    lane: "reel",
    image: raquel,
    color: "var(--reel)",
    soft: "var(--reel-soft)",
  },
  cyrus: {
    name: "Cyrus",
    role: "Authority strategy",
    lane: "evergreen",
    image: cyrus,
    color: "var(--evergreen)",
    soft: "var(--evergreen-soft)",
  },
  clara: {
    name: "Clara",
    role: "Clarity and structure",
    lane: "evergreen",
    image: clara,
    color: "var(--evergreen)",
    soft: "var(--evergreen-soft)",
  },
  silas: {
    name: "Silas",
    role: "Workflow and scale",
    lane: "system",
    image: silas,
    color: "var(--system)",
    soft: "var(--system-soft)",
  },
  samira: {
    name: "Samira",
    role: "Knowledge and onboarding",
    lane: "system",
    image: samira,
    color: "var(--system)",
    soft: "var(--system-soft)",
  },
};

function assistantMetadata(value: unknown): AssistantResponse | null {
  if (!value || typeof value !== "object" || !("recommendations" in value)) return null;
  return value as AssistantResponse;
}

export function StudioAssistant() {
  const {
    assistantMessages,
    askPal,
    brand,
    busy,
    calendar,
    campaigns,
    createCalendarItem,
    createIdea,
    saveBrand,
    saveSettings,
    settings,
  } = useStudio();
  const reduce = useReducedMotion();
  const selected = (settings?.preferred_pal || "kiana") as PalName;
  const pal = palDirectory[selected] || palDirectory.kiana;
  const [draft, setDraft] = useState("");
  const [savedMemory, setSavedMemory] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const composerRef = useRef<HTMLTextAreaElement | null>(null);
  const recent = assistantMessages.slice(-14);
  const latestResponse = useMemo(() => {
    for (let index = assistantMessages.length - 1; index >= 0; index -= 1) {
      const metadata = assistantMetadata(assistantMessages[index].metadata);
      if (metadata) return metadata;
    }
    return null;
  }, [assistantMessages]);
  const lastQuestion = useMemo(() => {
    for (let index = assistantMessages.length - 1; index >= 0; index -= 1) {
      if (assistantMessages[index].role === "user") return assistantMessages[index].body;
    }
    return "";
  }, [assistantMessages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "end" });
  }, [assistantMessages.length, busy, reduce]);

  useEffect(() => {
    if (!busy) composerRef.current?.focus();
  }, [busy]);

  async function send(question: string) {
    const value = question.trim();
    if (value.length < 3 || busy) return;
    setDraft("");
    try {
      await askPal(value, selected);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Your Pal could not respond yet.");
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await send(draft);
  }

  async function retry() {
    if (lastQuestion) await send(lastQuestion);
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
    try {
      await saveSettings({ preferred_pal: name });
      toast.success(`${palDirectory[name].name} is now your default guide.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save your Pal.");
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

  const prompts = [
    "What video should this business make next?",
    "Turn a customer question into a campaign.",
    "What gap is slowing down sales?",
    "Give this month a realistic content rhythm.",
  ];

  return (
    <div className="mx-auto max-w-[92rem]">
      <div className="grid min-h-[calc(100vh-7.5rem)] overflow-hidden rounded-[1.5rem] border border-border bg-white xl:grid-cols-[12.5rem_minmax(0,1fr)_19rem]">
        <aside className="border-b border-border p-3 xl:border-b-0 xl:border-r">
          <p className="studio-eyebrow px-2 pt-2 text-system">Choose your guide</p>
          <div className="mt-3 grid grid-cols-4 gap-2 xl:grid-cols-1">
            {(Object.keys(palDirectory) as PalName[]).map((name) => {
              const item = palDirectory[name];
              const active = selected === name;
              return (
                <button
                  key={name}
                  onClick={() => void choosePal(name)}
                  aria-label={`${item.name} — ${item.role}`}
                  aria-pressed={active}
                  className={`flex min-h-12 items-center gap-3 rounded-xl p-2 text-left transition ${active ? "border border-current" : "border border-transparent hover:bg-mist"}`}
                  style={{ color: active ? item.color : "var(--ink)" }}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="size-9 rounded-lg bg-white object-cover object-top"
                  />
                  <span className="hidden min-w-0 xl:block">
                    <span className="block truncate text-xs font-black">{item.name}</span>
                    <span className="mt-0.5 block truncate text-[9px] text-muted-foreground">
                      {item.role}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="flex min-h-[42rem] min-w-0 flex-col">
          <header className="flex items-center gap-4 border-b border-border p-4 sm:p-5">
            <div className="relative">
              <img
                src={pal.image}
                alt={`${pal.name}, your selected Palmer House guide`}
                className="size-14 shrink-0 rounded-[1rem] border border-border bg-white object-cover object-top"
              />
              <span
                className="absolute -right-1 -top-1 grid size-6 place-items-center rounded-full bg-white shadow-soft"
                style={{ color: pal.color }}
              >
                <Lightbulb className="size-3.5 fill-current" />
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-lg font-black">Ask {pal.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Reads Brand DNA, recent campaigns, and your editable calendar.
              </p>
            </div>
            <Link to="/studio/roadmap" className="secondary-action ml-auto hidden sm:inline-flex">
              Video roadmap <ArrowRight className="size-4" />
            </Link>
          </header>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6" aria-live="polite">
            {!recent.length ? (
              <div className="mx-auto flex max-w-2xl flex-col items-center py-10 text-center sm:py-16">
                <span
                  className="grid size-16 place-items-center rounded-[1.25rem]"
                  style={{ background: pal.soft, color: pal.color }}
                >
                  <MessageSquareText className="size-7" />
                </span>
                <h1 className="mt-6 text-3xl font-black tracking-[-.045em] sm:text-4xl">
                  What should the business solve next?
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Ask in plain language. {pal.name} will use what the Studio already knows, explain
                  the problem behind the recommendation, and give you shortcuts into the work.
                </p>
                <div className="mt-7 grid w-full gap-2 sm:grid-cols-2">
                  {prompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => setDraft(prompt)}
                      className="min-h-14 rounded-xl border border-border bg-white px-4 text-left text-sm font-bold hover:border-ink"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-3xl space-y-6">
                {recent.map((message) => {
                  const meta = assistantMetadata(message.metadata);
                  const speaker = palDirectory[(message.pal as PalName) || selected] || pal;
                  if (message.role === "user") {
                    return (
                      <motion.div
                        key={message.id}
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="ml-auto max-w-[80%] rounded-[1.25rem] rounded-br-md px-4 py-3 text-sm font-medium leading-relaxed text-white"
                        style={{ background: pal.color }}
                      >
                        {message.body}
                      </motion.div>
                    );
                  }
                  return (
                    <motion.div
                      key={message.id}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={speaker.image}
                          alt=""
                          className="size-7 rounded-lg border border-border bg-white object-cover object-top"
                        />
                        <span className="text-xs font-black">{speaker.name}</span>
                        <span
                          className="font-mono text-[9px] uppercase tracking-[.14em]"
                          style={{ color: speaker.color }}
                        >
                          · {meta?.lane || speaker.lane}
                        </span>
                      </div>

                      {meta?.headline ? (
                        <p className="text-xl font-black leading-snug tracking-[-.03em]">
                          {meta.headline}
                        </p>
                      ) : null}

                      <StudioMarkdown accent={speaker.color}>{message.body}</StudioMarkdown>

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
                                style={{ color: speaker.color }}
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
                          onClick={() => void retry()}
                          disabled={busy}
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
                              onClick={() => void send(question)}
                              disabled={busy}
                              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-dashed border-border px-3 text-left text-[11px] font-bold text-muted-foreground transition hover:border-ink hover:text-ink disabled:opacity-40"
                            >
                              {question}
                              <ArrowRight className="size-3.5 shrink-0" />
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </motion.div>
                  );
                })}
                {busy ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={pal.image}
                      alt=""
                      className="size-7 animate-pulse rounded-lg border border-border object-cover object-top"
                    />
                    <span className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <LoaderCircle className="size-3.5 animate-spin" style={{ color: pal.color }} />
                      {pal.name} is reading the workspace…
                    </span>
                  </div>
                ) : null}
                <div ref={endRef} />
              </div>

            )}
          </div>

          <form onSubmit={submit} className="border-t border-border bg-white p-4 sm:p-5">
            <div
              className="mx-auto flex max-w-3xl items-end gap-2 rounded-[1.15rem] border border-border bg-white p-2 shadow-soft transition focus-within:border-current"
              style={{ color: pal.color }}
            >
              <textarea
                ref={composerRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void send(draft);
                  }
                }}
                rows={2}
                placeholder={`Ask ${pal.name} about a problem, idea, link, campaign, or next move…`}
                className="min-h-12 flex-1 resize-none border-0 bg-transparent p-2 text-sm text-ink outline-none"
              />
              <button
                disabled={busy || draft.trim().length < 3}
                aria-label="Send question"
                className="grid size-11 shrink-0 place-items-center rounded-xl text-white disabled:opacity-35"
                style={{ background: pal.color }}
              >
                {busy ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-muted-foreground">
              Enter to send · Shift + Enter for a new line · Nothing publishes or changes Brand DNA
              without your approval.
            </p>
          </form>

        </section>

        <aside className="border-t border-border bg-mist/55 p-4 xl:border-l xl:border-t-0">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-system" />
            <p className="text-sm font-black">Next useful moves</p>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
            Updated from Brand DNA and the work already in motion.
          </p>
          <div className="mt-4 space-y-3">
            {(latestResponse?.recommendations || []).map((item) => (
              <article
                key={item.title}
                className="rounded-[1rem] border border-border bg-white p-4"
              >
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
              <div className="rounded-[1rem] border border-dashed border-border bg-white p-4">
                <Brain className="size-5 text-system" />
                <p className="mt-3 text-xs font-bold">
                  Ask one question to create your first personalized move.
                </p>
                <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                  {campaigns.length} campaigns and {calendar.length} calendar items are available as
                  context.
                </p>
              </div>
            ) : null}
          </div>

          {latestResponse?.memorySuggestions.length ? (
            <div className="mt-6 border-t border-border pt-5">
              <div className="flex items-center gap-2">
                <Brain className="size-4 text-spotlight" />
                <p className="text-sm font-black">Suggested memory</p>
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
    </div>
  );
}
