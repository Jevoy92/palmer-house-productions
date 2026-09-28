import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Archive,
  ArrowRight,
  ExternalLink,
  LoaderCircle,
  Pencil,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { classifyLane } from "@/lib/studio-intelligence";
import type { ContentDirection, StudioLane } from "@/lib/studio-model";
import { useStudio } from "./StudioProvider";
import { useStudioMotion } from "./studio-motion";
import { supabase } from "@/lib/supabase/client";
import { StudioGraphic } from "./StudioGraphic";
import "./studio-support.css";

const lanes = {
  spotlight: { label: "Spotlight", role: "Build trust" },
  reel: { label: "Reel", role: "Earn attention" },
  evergreen: { label: "Evergreen", role: "Teach clearly" },
  system: { label: "System", role: "Create clarity" },
} satisfies Record<StudioLane, { label: string; role: string }>;
const laneKeys = Object.keys(lanes) as StudioLane[];
const starters: Array<{ id: string; text: string; lane: StudioLane; problem: string }> = [
  {
    id: "faq",
    text: "Answer the question customers ask right before they buy.",
    lane: "evergreen",
    problem: "Sales conversations repeat the same education before a customer can decide.",
  },
  {
    id: "proof",
    text: "Show the moment a client finally understood the value.",
    lane: "spotlight",
    problem: "The business has results, but the proof is hard for a new customer to see.",
  },
  {
    id: "process",
    text: "Turn one invisible team process into a useful walkthrough.",
    lane: "system",
    problem: "A useful process lives in one person’s head instead of a reusable system.",
  },
  {
    id: "conversation",
    text: "Ask the audience what keeps delaying the decision.",
    lane: "reel",
    problem: "The business is posting without learning what the audience needs next.",
  },
];
const ink = (lane: StudioLane) => `var(--${lane}-ink, var(--ink))`;
function sourceLink(value: string | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function IdeaSourceImage({ path, workspaceId }: { path: string; workspaceId?: string }) {
  const [url, setUrl] = useState("");
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    setUrl("");
    setFailed(false);
    if (!workspaceId || !path.startsWith(`${workspaceId}/`)) {
      setFailed(true);
      return;
    }
    void supabase.storage
      .from("campaign-assets")
      .createSignedUrl(path, 3600)
      .then((result) => {
        if (active) {
          setUrl(result.data?.signedUrl || "");
          setFailed(Boolean(result.error || !result.data?.signedUrl));
        }
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [path, workspaceId]);
  return (
    <div className="studio-idea-source-image">
      {url && !failed ? (
        <img
          src={url}
          alt="Image saved as the source for this idea"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <div>
          <StudioGraphic name="image" size={56} />
          <span>{failed ? "Saved image preview unavailable" : "Loading saved image…"}</span>
        </div>
      )}
    </div>
  );
}

/** Restores standalone idea capture and directions from the pre-consolidation workflow. */
export function StudioIdeasBoard() {
  const {
    ideas,
    createIdea,
    updateIdea,
    uploadIdeaSource,
    suggestDirections,
    brand,
    busy,
    workspace,
  } = useStudio();
  const ui = useStudioMotion();
  const [draft, setDraft] = useState("");
  const [sourceType, setSourceType] = useState<"text" | "link" | "image">("text");
  const [sourceUrl, setSourceUrl] = useState("");
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourcePreview, setSourcePreview] = useState("");
  const [problem, setProblem] = useState("");
  const [filter, setFilter] = useState<"all" | StudioLane>("all");
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);
  const [directionsLoading, setDirectionsLoading] = useState(false);
  const [directions, setDirections] = useState<ContentDirection[]>([]);
  const [directionSource, setDirectionSource] = useState("");
  const [directionError, setDirectionError] = useState<string | null>(null);
  const [pendingIdeas, setPendingIdeas] = useState<string[]>([]);
  const pendingIdeaIds = useRef(new Set<string>());
  const [captureError, setCaptureError] = useState("");
  const [ideaErrors, setIdeaErrors] = useState<Record<string, string>>({});
  const [editingIdea, setEditingIdea] = useState<{
    id: string;
    body: string;
    problem: string;
  } | null>(null);
  const detectedLane = classifyLane(`${draft} ${problem}`);
  const draftRef = useRef<HTMLTextAreaElement>(null);
  const savedIdeas = ideas.filter((idea) => idea.status !== "archived");
  const visible = savedIdeas.filter((idea) => filter === "all" || idea.primary_lane === filter);

  useEffect(() => {
    if (!sourceFile) {
      setSourcePreview("");
      return;
    }
    const url = URL.createObjectURL(sourceFile);
    setSourcePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [sourceFile]);

  async function findDirections(body: string) {
    setDirectionsLoading(true);
    setDirectionError(null);
    setDirectionSource(body);
    try {
      setDirections(
        await suggestDirections({
          idea: body,
          goal: "Turn source material into a useful campaign",
          audience: brand?.primary_audience || "The business’s primary audience",
        }),
      );
    } catch (error) {
      setDirectionError(
        error instanceof Error ? error.message : "We could not suggest directions yet.",
      );
    } finally {
      setDirectionsLoading(false);
    }
  }

  async function addIdea(findAngles: boolean) {
    if (savingRef.current || busy || directionsLoading) return;
    const url = sourceType === "link" ? sourceLink(sourceUrl) : null;
    if (sourceType === "link" && !url) {
      toast.error("Add a complete http or https link.");
      return;
    }
    if (sourceType === "image" && !sourceFile) {
      toast.error("Choose an image to save with this idea.");
      return;
    }
    const body =
      draft.trim() ||
      (sourceType === "image"
        ? `Use ${sourceFile!.name} as the visual source for a campaign.`
        : url
          ? `Turn the useful material at ${url} into a campaign.`
          : "");
    if (body.length < 8) {
      toast.error("Add a little more context so this idea is useful later.");
      return;
    }
    savingRef.current = true;
    setSaving(true);
    setCaptureError("");
    try {
      const mediaPath =
        sourceType === "image" && sourceFile ? await uploadIdeaSource(sourceFile) : undefined;
      await createIdea({
        body,
        sourceType,
        sourceUrl: url || undefined,
        sourceMediaPath: mediaPath,
        lane: detectedLane,
        businessProblem: problem.trim() || `${lanes[detectedLane].role}: ${body}`,
      });
      // Saving and suggesting are separate outcomes. If suggestion fails, the
      // idea remains saved and retrying directions must not create a duplicate.
      setDraft("");
      setSourceUrl("");
      setSourceFile(null);
      setProblem("");
      toast.success("Idea saved to this workspace.");
      if (findAngles) {
        setDirections([]);
        await findDirections(body);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not save this source. Your draft is still here.";
      setCaptureError(message);
      toast.error(message);
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }

  async function changeIdea(
    id: string,
    values: {
      status?: string;
      primary_lane?: StudioLane;
      body?: string;
      business_problem?: string;
    },
  ) {
    if (pendingIdeaIds.current.has(id)) return false;
    pendingIdeaIds.current.add(id);
    const previousStatus = ideas.find((idea) => idea.id === id)?.status || "saved";
    setPendingIdeas(Array.from(pendingIdeaIds.current));
    setIdeaErrors((errors) => ({ ...errors, [id]: "" }));
    try {
      await updateIdea(id, values);
      if (values.status === "archived")
        toast.success("Idea archived.", {
          action: { label: "Undo", onClick: () => void changeIdea(id, { status: previousStatus }) },
        });
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not update this idea.";
      setIdeaErrors((errors) => ({ ...errors, [id]: message }));
      toast.error(message);
      return false;
    } finally {
      pendingIdeaIds.current.delete(id);
      setPendingIdeas(Array.from(pendingIdeaIds.current));
    }
  }

  return (
    <div className="studio-support studio-ideas-board mx-auto max-w-[88rem]">
      <header className="flex flex-wrap items-end justify-between gap-5">
        <div className="max-w-2xl">
          <p className="studio-eyebrow text-system">Content ideas</p>
          <h1 className="mt-3 text-3xl font-black tracking-[-.045em] sm:text-4xl">
            Catch the useful thought.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Save a thought, link, or image. Keep the source and the problem it could solve, then
            shape it into a campaign when you’re ready.
          </p>
        </div>
        <Link to="/studio/create" className="secondary-action">
          <Sparkles className="size-4" /> Create a campaign
        </Link>
      </header>
      <div className="mt-8 grid items-start gap-8 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] xl:gap-12">
        <section
          aria-labelledby="idea-capture-title"
          className="studio-idea-capture rounded-2xl border border-border bg-white p-5 sm:p-6"
        >
          <div className="studio-idea-capture-heading">
            <StudioGraphic name="ideas" size={54} />
            <div>
              <p className="studio-support-kicker">Quick capture</p>
              <h2 id="idea-capture-title">What are we starting with?</h2>
            </div>
          </div>
          <div className="mt-5 flex border-b border-border" role="group" aria-label="Source type">
            {(["text", "link", "image"] as const).map((type) => (
              <button
                key={type}
                type="button"
                disabled={saving}
                onClick={() => setSourceType(type)}
                aria-pressed={sourceType === type}
                className={`min-h-11 flex-1 border-b-2 text-sm font-bold capitalize ${sourceType === type ? "border-system text-system" : "border-transparent text-muted-foreground"}`}
              >
                {type}
              </button>
            ))}
          </div>
          <fieldset disabled={saving} className="mt-5 min-w-0 space-y-4 disabled:opacity-65">
            {sourceType === "link" ? (
              <label className="grid gap-2 text-sm font-bold">
                Source link
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={(event) => setSourceUrl(event.target.value)}
                  placeholder="https://…"
                  className="min-h-11 min-w-0 rounded-lg border border-border bg-white px-3 font-normal"
                />
              </label>
            ) : null}
            {sourceType === "image" ? (
              <div>
                <label className="relative flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-system bg-system-soft p-4 text-center focus-within:ring-2 focus-within:ring-system">
                  {sourcePreview ? (
                    <img
                      src={sourcePreview}
                      alt="Selected idea source"
                      className="max-h-40 w-full rounded-lg object-contain"
                    />
                  ) : (
                    <>
                      <StudioGraphic name="image" size={58} />
                      <span className="text-sm font-bold">Choose a source image</span>
                      <span className="text-xs text-muted-foreground">PNG, JPG, or WebP</span>
                    </>
                  )}
                  <input
                    aria-label="Source image"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="sr-only"
                    onChange={(event) => {
                      setSourceFile(event.target.files?.[0] || null);
                      event.target.value = "";
                    }}
                  />
                </label>
                {sourceFile ? (
                  <button
                    type="button"
                    className="mt-2 flex min-h-9 items-center gap-2 text-xs font-bold"
                    onClick={() => setSourceFile(null)}
                  >
                    <X className="size-3.5" /> Remove {sourceFile.name}
                  </button>
                ) : null}
              </div>
            ) : null}
            <label className="grid gap-2 text-sm font-bold">
              Your idea
              <textarea
                ref={draftRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                rows={5}
                placeholder={
                  sourceType === "image"
                    ? "What should the audience notice?"
                    : sourceType === "link"
                      ? "What is useful about this link?"
                      : "A customer asked why…"
                }
                className="w-full resize-y rounded-lg border border-border bg-white p-3 font-normal leading-relaxed"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Problem or opportunity{" "}
              <span className="font-normal text-muted-foreground">Optional</span>
              <input
                value={problem}
                onChange={(event) => setProblem(event.target.value)}
                placeholder="Customers cannot see the difference…"
                className="min-h-11 min-w-0 rounded-lg border border-border bg-white px-3 font-normal"
              />
            </label>
            <p className="studio-idea-detected text-xs leading-relaxed">
              <StudioGraphic name={detectedLane} size={28} />
              <span>
                <strong>{lanes[detectedLane].label}</strong> · {lanes[detectedLane].role}. You can
                change the category after saving.
              </span>
            </p>
          </fieldset>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              disabled={busy || saving || directionsLoading}
              onClick={() => void addIdea(false)}
              className="secondary-action justify-center disabled:opacity-50"
            >
              {saving ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Plus className="size-4" />
              )}{" "}
              Save source
            </button>
            <button
              type="button"
              disabled={busy || saving || directionsLoading}
              onClick={() => void addIdea(true)}
              className="primary-action justify-center disabled:opacity-50"
            >
              <Sparkles className="size-4" /> Find directions
            </button>
          </div>
          {captureError && (
            <p role="alert" className="mt-4 studio-support-error">
              {captureError}
            </p>
          )}
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            {sourceType === "text"
              ? "If your team has said it twice, save the exact wording. That is often the useful part."
              : "Directions use the context you write here. Your link or image stays attached as a reference."}
          </p>
        </section>
        <div className="min-w-0">
          {directionsLoading || directionError || directions.length ? (
            <section
              aria-labelledby="idea-directions-title"
              className="mb-8 border-b border-border pb-8"
            >
              <p className="studio-eyebrow text-system">From your source</p>
              <h2 id="idea-directions-title" className="mt-2 text-xl font-black">
                Campaign directions
              </h2>
              {directionsLoading ? (
                <p
                  role="status"
                  className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <LoaderCircle className="size-4 animate-spin" /> Finding useful angles…
                </p>
              ) : null}
              {directionError ? (
                <div role="alert" className="mt-4 border-l-2 border-reel pl-4">
                  <p className="text-sm font-bold">
                    Your idea is saved. Directions aren’t ready yet.
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">{directionError}</p>
                  <button
                    type="button"
                    onClick={() => void findDirections(directionSource)}
                    disabled={directionsLoading || busy}
                    className="mt-3 min-h-10 text-sm font-bold underline underline-offset-4"
                  >
                    Try directions again
                  </button>
                </div>
              ) : null}
              <div className="mt-4 divide-y divide-border">
                {directions.map((direction) => (
                  <article key={direction.id} className="py-4">
                    <p className="studio-eyebrow" style={{ color: ink(direction.lane) }}>
                      {direction.lane} · {direction.flavor}
                    </p>
                    <h3 className="mt-2 text-lg font-bold">{direction.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {direction.angle}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {direction.whyItWorks}
                    </p>
                    <Link
                      to="/studio/create"
                      search={{
                        idea: [direction.title, direction.angle, directionSource]
                          .join("\n\n")
                          .slice(0, 5000),
                      }}
                      className="mt-3 inline-flex min-h-10 items-center gap-2 text-sm font-bold"
                      style={{ color: ink(direction.lane) }}
                    >
                      Use this direction <ArrowRight className="size-4" />
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="studio-eyebrow text-reel">Idea bank</p>
              <h2 className="mt-2 text-2xl font-black">
                {savedIdeas.length
                  ? `${savedIdeas.length} saved ${savedIdeas.length === 1 ? "idea" : "ideas"}`
                  : "Your next starting point"}
              </h2>
            </div>
            <div
              role="group"
              aria-label="Filter ideas by category"
              className="flex flex-wrap gap-1"
            >
              {(["all", ...laneKeys] as const).map((lane) => (
                <button
                  key={lane}
                  type="button"
                  onClick={() => setFilter(lane)}
                  aria-pressed={filter === lane}
                  className={`min-h-10 rounded-lg px-3 text-xs font-bold capitalize ${filter === lane ? "bg-ink text-white" : "text-muted-foreground hover:bg-mist"}`}
                >
                  {lane}
                </button>
              ))}
            </div>
          </div>
          <div className="studio-idea-grid">
            {visible.map((idea) => {
              const lane = laneKeys.includes(idea.primary_lane as StudioLane)
                ? (idea.primary_lane as StudioLane)
                : "spotlight";
              const url = sourceLink(idea.source_url);
              return (
                <motion.article
                  key={idea.id}
                  layout={ui.reduceMotion ? false : "position"}
                  transition={ui.transition}
                  className="studio-saved-idea"
                >
                  {idea.source_type === "image" && idea.source_media_path ? (
                    <IdeaSourceImage path={idea.source_media_path} workspaceId={workspace?.id} />
                  ) : null}
                  <div className="studio-saved-idea-header">
                    <StudioGraphic name={idea.source_type === "image" ? "image" : lane} size={48} />
                    <label
                      className="flex items-center gap-2 text-xs font-bold"
                      style={{ color: ink(lane) }}
                    >
                      <span className="sr-only">Category for {idea.body.slice(0, 50)}</span>
                      <select
                        value={lane}
                        onChange={(event) =>
                          void changeIdea(idea.id, {
                            primary_lane: event.target.value as StudioLane,
                          })
                        }
                        disabled={pendingIdeas.includes(idea.id)}
                        className="min-h-9 rounded-md bg-transparent pr-2"
                      >
                        {laneKeys.map((key) => (
                          <option key={key} value={key}>
                            {lanes[key].label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <span className="studio-idea-source-label">
                      {idea.source_type === "recommended"
                        ? "Suggested brief"
                        : idea.source_type === "chat"
                          ? "From a chat"
                          : `${idea.source_type} source`}
                    </span>
                  </div>
                  {editingIdea?.id === idea.id ? (
                    <div className="grid gap-3">
                      <label className="studio-calendar-field">
                        <span>Idea text</span>
                        <textarea
                          rows={4}
                          value={editingIdea.body}
                          disabled={pendingIdeas.includes(idea.id)}
                          onChange={(event) =>
                            setEditingIdea({ ...editingIdea, body: event.target.value })
                          }
                          autoFocus
                        />
                      </label>
                      <label className="studio-calendar-field">
                        <span>Problem or opportunity</span>
                        <input
                          value={editingIdea.problem}
                          disabled={pendingIdeas.includes(idea.id)}
                          onChange={(event) =>
                            setEditingIdea({ ...editingIdea, problem: event.target.value })
                          }
                        />
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="studio-support-button is-primary"
                          disabled={
                            pendingIdeas.includes(idea.id) || editingIdea.body.trim().length < 8
                          }
                          onClick={async () => {
                            if (
                              await changeIdea(idea.id, {
                                body: editingIdea.body.trim(),
                                business_problem: editingIdea.problem.trim(),
                              })
                            ) {
                              setEditingIdea(null);
                              toast.success("Idea updated.");
                            }
                          }}
                        >
                          {pendingIdeas.includes(idea.id) ? "Saving…" : "Save idea changes"}
                        </button>
                        <button
                          className="studio-support-button"
                          disabled={pendingIdeas.includes(idea.id)}
                          onClick={() => setEditingIdea(null)}
                        >
                          Cancel idea edit
                        </button>
                      </div>
                    </div>
                  ) : (
                    <h3 className="studio-saved-idea-copy">{idea.body}</h3>
                  )}
                  {idea.business_problem && editingIdea?.id !== idea.id ? (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {idea.business_problem}
                    </p>
                  ) : null}
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {editingIdea?.id !== idea.id && (
                      <>
                        <Link
                          to="/studio/create"
                          search={{
                            idea: [idea.body, idea.business_problem]
                              .filter(Boolean)
                              .join("\n\n")
                              .slice(0, 5000),
                          }}
                          className="inline-flex min-h-10 items-center gap-2 text-sm font-bold"
                          style={{ color: ink(lane) }}
                        >
                          Build this <ArrowRight className="size-4" />
                        </Link>
                        <button
                          className="studio-support-button"
                          disabled={Boolean(editingIdea) || pendingIdeas.includes(idea.id)}
                          onClick={() => {
                            setIdeaErrors((errors) => ({ ...errors, [idea.id]: "" }));
                            setEditingIdea({
                              id: idea.id,
                              body: idea.body,
                              problem: idea.business_problem || "",
                            });
                          }}
                          aria-label={`Edit idea ${idea.body.slice(0, 60)}`}
                        >
                          <Pencil size={14} />
                          Edit
                        </button>
                      </>
                    )}
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-10 items-center gap-1.5 text-xs font-bold text-muted-foreground"
                      >
                        Open source <ExternalLink className="size-3.5" />
                      </a>
                    ) : null}
                    <button
                      type="button"
                      disabled={pendingIdeas.includes(idea.id) || editingIdea?.id === idea.id}
                      onClick={() => void changeIdea(idea.id, { status: "archived" })}
                      className="ml-auto grid size-10 place-items-center rounded-lg text-muted-foreground hover:bg-mist disabled:opacity-50"
                      aria-label={`Archive ${idea.body.slice(0, 60)}`}
                    >
                      <Archive className="size-4" />
                    </button>
                  </div>
                  {ideaErrors[idea.id] && (
                    <p role="alert" className="studio-support-error">
                      {ideaErrors[idea.id]}
                    </p>
                  )}
                </motion.article>
              );
            })}
            {savedIdeas.length && !visible.length ? (
              <p className="py-8 text-sm text-muted-foreground">
                No saved ideas in this category. Choose another category or capture one.
              </p>
            ) : null}
            {!savedIdeas.length ? (
              <div className="py-6">
                <p className="text-sm text-muted-foreground">
                  Nothing saved yet. Try a starting point below, or capture your own.
                </p>
                <div className="mt-4 divide-y divide-border">
                  {starters
                    .filter((idea) => filter === "all" || idea.lane === filter)
                    .map((idea) => (
                      <button
                        key={idea.id}
                        type="button"
                        onClick={() => {
                          setSourceType("text");
                          setDraft(idea.text);
                          setProblem(idea.problem);
                          draftRef.current?.focus();
                        }}
                        className="flex min-h-16 w-full items-center gap-3 py-4 text-left"
                      >
                        <StudioGraphic name={idea.lane} size={42} />
                        <span className="text-sm font-bold">{idea.text}</span>
                        <ArrowRight className="ml-auto size-4 shrink-0 text-muted-foreground" />
                      </button>
                    ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
