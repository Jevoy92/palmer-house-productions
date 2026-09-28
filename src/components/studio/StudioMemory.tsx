import { useState, type FormEvent } from "react";
import { Brain, Download, LoaderCircle, Pencil, Plus, RefreshCw, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { useStudio } from "./StudioProvider";
import {
  MEMORY_CONTENT_LIMIT,
  MEMORY_ENTRY_LIMIT,
  type StudioMemoryEntry,
} from "@/lib/studio-memory";

const button =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:opacity-50";
const field =
  "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function StudioMemory() {
  const {
    workspace,
    workspaceMemories,
    legacyMemory,
    memoryLoading,
    memoryError,
    memoryAvailable,
    refreshMemory,
    saveMemory,
    forgetMemory,
    forgetLegacyMemory,
    exportMemory,
  } = useStudio();
  const [editing, setEditing] = useState<StudioMemoryEntry | "new" | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgetting, setForgetting] = useState<string | null>(null);
  const legacyText = JSON.stringify(legacyMemory, null, 2);
  const hasLegacy = legacyText !== "{}" && legacyText !== "null";
  const used = workspaceMemories.reduce((sum, entry) => sum + Array.from(entry.content).length, 0);

  function edit(entry: StudioMemoryEntry | "new") {
    setEditing(entry);
    setTitle(entry === "new" ? "" : entry.title);
    setContent(entry === "new" ? "" : entry.content);
    setError(null);
    setForgetting(null);
  }
  async function save(event: FormEvent) {
    event.preventDefault();
    setWorking(true);
    setError(null);
    try {
      await saveMemory({
        title,
        content,
        ...(editing && editing !== "new"
          ? { id: editing.id, expectedRevision: editing.revision }
          : {}),
      });
      setEditing(null);
      toast.success("Saved for every Pal.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save memory.");
    } finally {
      setWorking(false);
    }
  }
  async function forget(entry: StudioMemoryEntry | "legacy") {
    setWorking(true);
    setError(null);
    try {
      if (entry === "legacy") await forgetLegacyMemory();
      else await forgetMemory(entry.id, entry.revision);
      setForgetting(null);
      if (editing !== "new" && editing?.id === (entry === "legacy" ? null : entry.id))
        setEditing(null);
      toast.success("Memory forgotten.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not forget memory.");
    } finally {
      setWorking(false);
    }
  }
  async function download() {
    setWorking(true);
    setError(null);
    try {
      const exported = await exportMemory();
      const url = URL.createObjectURL(
        new Blob([JSON.stringify(exported, null, 2)], { type: "application/json" }),
      );
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `studio-memory-${exported.exportedAt.slice(0, 10)}.json`;
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not export memory.");
    } finally {
      setWorking(false);
    }
  }
  if (!workspace) return null;
  return (
    <section aria-labelledby="shared-memory-heading" className="space-y-6 text-foreground">
      <header>
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">
          <Brain size={16} aria-hidden="true" /> Across every Pal
        </p>
        <h2 id="shared-memory-heading" className="mt-2 text-2xl font-bold tracking-tight">
          Shared memory
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Save the facts, preferences, and decisions you want every Pal to carry forward. Memory
          belongs to this workspace and stays saved when the AI model changes.
        </p>
      </header>
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Pals also use your Brand DNA, saved work, and recent chats. Older conversations stay in your
        history.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          className={button}
          disabled={
            !memoryAvailable ||
            working ||
            memoryLoading ||
            workspaceMemories.length >= MEMORY_ENTRY_LIMIT
          }
          onClick={() => edit("new")}
        >
          <Plus size={16} /> Add memory
        </button>
        <button
          className={button}
          disabled={working || memoryLoading}
          onClick={() => void download()}
        >
          <Download size={16} /> Export memory
        </button>
        <button
          className={button}
          disabled={working || memoryLoading}
          onClick={() => void refreshMemory()}
        >
          <RefreshCw size={16} className={memoryLoading ? "animate-spin" : ""} /> Reload
        </button>
        <p className="text-xs text-muted-foreground">
          {workspaceMemories.length}/{MEMORY_ENTRY_LIMIT} notes · {used.toLocaleString()}/
          {MEMORY_CONTENT_LIMIT.toLocaleString()} characters
        </p>
      </div>
      {memoryLoading && (
        <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground">
          <LoaderCircle className="animate-spin" size={16} /> Loading shared memory…
        </p>
      )}
      {(error || memoryError) && (
        <p
          role="alert"
          className="rounded-xl border border-destructive/40 p-3 text-sm text-destructive"
        >
          {error || memoryError}
        </p>
      )}
      {editing && (
        <form
          onSubmit={(event) => void save(event)}
          className="space-y-4 rounded-2xl border border-border bg-card p-5"
          aria-label={editing === "new" ? "Add shared memory" : "Edit shared memory"}
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold">{editing === "new" ? "Add memory" : "Edit memory"}</h3>
            <button
              type="button"
              aria-label="Close memory editor"
              disabled={working}
              onClick={() => setEditing(null)}
              className={button}
            >
              <X size={16} />
            </button>
          </div>
          <label className="block space-y-2 text-sm font-semibold">
            <span>Title</span>
            <input
              autoFocus
              required
              maxLength={100}
              className={field}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="For example, our primary audience"
            />
          </label>
          <div className="space-y-2 text-sm font-semibold">
            <label htmlFor="studio-memory-content" className="block">
              What should every Pal remember?
            </label>
            <textarea
              id="studio-memory-content"
              required
              maxLength={2000}
              rows={5}
              className={`${field} resize-y font-normal`}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Write the context in your own words. Only save information you want shared with this workspace."
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">{content.length}/2,000 characters</p>
            <button
              className={`${button} bg-primary text-primary-foreground hover:bg-primary/90`}
              disabled={working || !title.trim() || !content.trim()}
              type="submit"
            >
              {working ? "Saving…" : "Save memory"}
            </button>
          </div>
        </form>
      )}
      {!memoryLoading && !workspaceMemories.length && memoryAvailable && (
        <p className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
          No saved memory yet. Add a lasting preference or decision for every Pal to use.
        </p>
      )}
      <div className="space-y-3">
        {workspaceMemories.map((entry) => (
          <article className="rounded-2xl border border-border bg-card p-5" key={entry.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="break-words font-semibold">{entry.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Member-saved · Updated {new Date(entry.updated_at).toLocaleDateString()} ·
                  Revision {entry.revision}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className={button}
                  aria-label={`Edit ${entry.title}`}
                  disabled={working}
                  onClick={() => edit(entry)}
                >
                  <Pencil size={15} /> Edit
                </button>
                <button
                  className={button}
                  aria-label={`Forget ${entry.title}`}
                  disabled={working}
                  onClick={() => setForgetting(entry.id)}
                >
                  <Trash2 size={15} /> Forget
                </button>
              </div>
            </div>
            <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-relaxed">
              {entry.content}
            </p>
            {forgetting === entry.id && (
              <div className="mt-4 rounded-xl border border-border bg-muted/40 p-3">
                <p className="text-sm">
                  Forget this note for future replies? Your Brand DNA, previous chats, and files are
                  kept.
                </p>
                <div className="mt-3 flex gap-2">
                  <button className={button} disabled={working} onClick={() => void forget(entry)}>
                    Confirm forget
                  </button>
                  <button className={button} disabled={working} onClick={() => setForgetting(null)}>
                    Keep note
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
      {hasLegacy && (
        <details className="rounded-2xl border border-border p-5">
          <summary className="cursor-pointer font-semibold">
            Legacy workspace notes · review needed
          </summary>
          <p className="mt-3 text-sm text-muted-foreground">
            These older notes have no recorded approval history. Pals receive them as unreviewed
            background. Review them and add useful facts above; no notes are automatically promoted
            into member-saved memory.
          </p>
          <pre className="mt-4 max-h-64 overflow-auto whitespace-pre-wrap break-all rounded-xl bg-muted p-3 text-xs">
            {legacyText}
          </pre>
          <button
            className={`${button} mt-3`}
            disabled={working || !memoryAvailable}
            onClick={() => setForgetting("legacy")}
          >
            Forget legacy notes
          </button>
          {forgetting === "legacy" && (
            <div className="mt-3 space-y-3">
              <p className="text-sm">Remove all legacy notes? Export first if you want a copy.</p>
              <div className="flex gap-2">
                <button className={button} disabled={working} onClick={() => void forget("legacy")}>
                  Confirm forget legacy notes
                </button>
                <button className={button} disabled={working} onClick={() => setForgetting(null)}>
                  Keep notes
                </button>
              </div>
            </div>
          )}
        </details>
      )}
    </section>
  );
}
