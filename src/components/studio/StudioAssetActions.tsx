import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { Check, Clipboard, PenLine, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Tables } from "@/lib/supabase/database.types";
import { useStudio } from "./StudioProvider";
import { useStudioMotion } from "./studio-motion";

/** Confirmation follows a successful clipboard write, never a simulated delay. */
export function StudioCopyButton({
  content,
  label = "Copy",
  className = "secondary-action",
}: {
  content: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { enter, exit, transition } = useStudioMotion();
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Could not copy. Open the draft and select the text to copy it.");
    }
  }
  return (
    <button
      type="button"
      onClick={() => void copy()}
      className={className}
      aria-label={copied ? "Copied to clipboard" : label}
    >
      <span className="relative grid size-4 shrink-0 place-items-center" aria-hidden="true">
        <AnimatePresence initial={false} mode="wait">
          <motion.span
            key={String(copied)}
            initial={enter}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={exit}
            transition={transition}
          >
            {copied ? <Check className="size-4" /> : <Clipboard className="size-4" />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}

export function StudioAssetEditor({ asset }: { asset: Tables<"campaign_assets"> }) {
  const { updateAsset } = useStudio();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(asset.content);
  const [status, setStatus] = useState(asset.status);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function save() {
    if (saving) return;
    setSaving(true);
    setError("");
    try {
      await updateAsset(asset.id, { content, status });
      toast.success("Draft saved.");
      setOpen(false);
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Could not save this draft. Your changes are still here.",
      );
    } finally {
      setSaving(false);
    }
  }
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        if (saving) return;
        if (value) {
          setContent(asset.content);
          setStatus(asset.status);
          setError("");
        }
        setOpen(value);
      }}
    >
      <Dialog.Trigger asChild>
        <button className="secondary-action">
          <PenLine className="size-4" /> Read & edit
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="studio-app studio-navigation-backdrop" />
        <Dialog.Content
          className="studio-app studio-edit-dialog"
          onEscapeKeyDown={(event) => {
            if (saving) event.preventDefault();
          }}
          onInteractOutside={(event) => event.preventDefault()}
        >
          <header className="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
            <div>
              <Dialog.Title className="text-xl font-bold">{asset.title}</Dialog.Title>
              <Dialog.Description className="mt-2 text-sm text-muted-foreground">
                Review the complete draft, make changes, and choose its status.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button disabled={saving} aria-label="Close draft" className="studio-icon-button">
                <X className="size-4" />
              </button>
            </Dialog.Close>
          </header>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5 sm:p-6">
            <label className="block text-sm font-semibold">
              Draft content
              <textarea
                disabled={saving}
                value={content}
                onChange={(event) => setContent(event.target.value)}
                className="mt-2 min-h-72 w-full resize-y rounded-lg border border-input bg-white p-4 text-sm font-normal leading-relaxed"
              />
            </label>
            <label className="flex flex-wrap items-center gap-3 text-sm font-semibold">
              Status
              <select
                disabled={saving}
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="min-h-11 rounded-lg border border-input bg-white px-3 font-normal"
              >
                <option value="draft">Draft</option>
                <option value="review">Ready for review</option>
                <option value="approved">Approved</option>
                <option value="scheduled">Scheduled</option>
                <option value="published">Published</option>
              </select>
            </label>
            {error ? (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
                {error}
              </p>
            ) : null}
          </div>
          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-5">
            <StudioCopyButton content={content} />
            <button
              disabled={saving || !content.trim()}
              onClick={() => void save()}
              className="primary-action disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
