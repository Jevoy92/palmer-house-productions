import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Check, ListChecks, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { celebrateOnce } from "./Celebrate";
import { useStudio } from "./StudioProvider";

type StepKey = "service" | "context" | "moodboard" | "campaign" | "calendar";

type Step = {
  key: StepKey;
  title: string;
  detail: string;
  to: string;
  color: string;
  soft: string;
  done: boolean;
};

const dismissKey = (workspaceId: string) => `phs.start-here.${workspaceId}`;

export function StudioStartHere() {
  const { workspace, brand, brandReferences, campaigns, calendar } = useStudio();
  const [open, setOpen] = useState(false);

  const steps = useMemo<Step[]>(() => {
    const offers = Array.isArray(brand?.offers) ? (brand?.offers as unknown[]) : [];
    return [
      {
        key: "service",
        title: "Service",
        detail: "Define what you sell",
        to: "/studio/brand",
        color: "var(--spotlight)",
        soft: "var(--spotlight-soft)",
        done: offers.length > 0,
      },
      {
        key: "context",
        title: "Context",
        detail: "Define your brand",
        to: "/studio/brand",
        color: "var(--evergreen)",
        soft: "var(--evergreen-soft)",
        done: Boolean(brand?.description && brand?.primary_audience),
      },
      {
        key: "moodboard",
        title: "Moodboard",
        detail: "Add references that show your style",
        to: "/studio/brand",
        color: "var(--system)",
        soft: "var(--system-soft)",
        done: brandReferences.length > 0,
      },
      {
        key: "campaign",
        title: "First campaign",
        detail: "Turn one idea into many forms",
        to: "/studio/campaigns",
        color: "var(--reel)",
        soft: "var(--reel-soft)",
        done: campaigns.length > 0,
      },
      {
        key: "calendar",
        title: "Calendar",
        detail: "Put the work on a date",
        to: "/studio/calendar",
        color: "var(--spotlight)",
        soft: "var(--spotlight-soft)",
        done: calendar.length > 0,
      },
    ];
  }, [brand, brandReferences, campaigns, calendar]);

  const completed = steps.filter((step) => step.done).length;
  const allDone = completed === steps.length;

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!workspace || typeof window === "undefined") return;
    try {
      setHidden(window.localStorage.getItem(dismissKey(workspace.id)) === "done");
    } catch {
      /* Storage may be disabled. */
    }
  }, [workspace]);

  useEffect(() => {
    if (!workspace || !allDone) return;
    celebrateOnce(`setup.${workspace.id}`, {
      title: "Your workspace is fully set up.",
      detail: "Brand DNA, moodboard, first campaign, and calendar are all in place.",
    });
  }, [workspace, allDone]);

  const dismiss = (permanent: boolean) => {
    if (permanent && workspace && typeof window !== "undefined") {
      try {
        window.localStorage.setItem(dismissKey(workspace.id), "done");
      } catch {
        /* Dismiss for this session. */
      }
      setHidden(true);
    }
    setOpen(false);
  };

  if (!workspace) return null;

  if (hidden) return null;
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="studio-setup-button"
          aria-label={`Workspace setup, ${completed} of ${steps.length} complete`}
        >
          <ListChecks className="size-4" />
          <span className="hidden sm:inline">Setup</span>
          <span className="text-xs text-muted-foreground">
            {completed}/{steps.length}
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="studio-app studio-navigation-backdrop" />
        <Dialog.Content className="studio-app studio-setup-dialog">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-2xl font-bold">
                {allDone ? "You're set up." : "Make your Studio yours."}
              </Dialog.Title>
              <Dialog.Description className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {completed} of {steps.length} setup steps complete. Finish these whenever you’re
                ready.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button className="studio-icon-button" aria-label="Close setup">
                <X className="size-4" />
              </button>
            </Dialog.Close>
          </div>
          <div
            className="my-5 h-1.5 overflow-hidden rounded bg-muted"
            role="progressbar"
            aria-label="Workspace setup"
            aria-valuenow={completed}
            aria-valuemin={0}
            aria-valuemax={steps.length}
          >
            <span
              className="block h-full w-full origin-left bg-system"
              style={{ transform: `scaleX(${completed / steps.length})` }}
            />
          </div>
          <div className="space-y-2">
            {steps.map((step, position) => (
              <Link
                key={step.key}
                to={step.to}
                onClick={() => dismiss(false)}
                className="flex min-h-16 items-center gap-3 rounded-lg border border-border p-3 hover:bg-mist"
              >
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-lg text-xs font-bold"
                  style={{ background: step.soft, color: "var(--ink)" }}
                >
                  {step.done ? (
                    <Check className="size-4" aria-label="Complete" />
                  ) : (
                    String(position + 1).padStart(2, "0")
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold">{step.title}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{step.detail}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
          <button
            onClick={() => dismiss(true)}
            className="mt-5 min-h-11 text-xs font-semibold text-muted-foreground underline underline-offset-4"
          >
            Hide this checklist
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
