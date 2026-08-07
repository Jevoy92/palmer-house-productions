import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

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
  const nextStep = steps.find((step) => !step.done) || steps[steps.length - 1];


  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!workspace || typeof window === "undefined") return;
    setHidden(window.localStorage.getItem(dismissKey(workspace.id)) === "done");
  }, [workspace]);

  useEffect(() => {
    if (!open) return;
    const next = steps.findIndex((step) => !step.done);
    setIndex(next === -1 ? steps.length - 1 : next);
  }, [open, steps]);

  useEffect(() => {
    if (!workspace || !allDone) return;
    celebrateOnce(`setup.${workspace.id}`, {
      title: "Your workspace is fully set up.",
      detail: "Brand DNA, moodboard, first campaign, and calendar are all in place.",
    });
  }, [workspace, allDone]);


  const dismiss = (permanent: boolean) => {
    if (permanent && workspace && typeof window !== "undefined") {
      window.localStorage.setItem(dismissKey(workspace.id), "done");
      setHidden(true);
    }
    setOpen(false);
  };

  if (!workspace) return null;

  const active = steps[index] || steps[0];

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-ink/25 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Start here"
          >
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
              className="w-full max-w-lg rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_40px_120px_-50px_rgba(31,35,40,.7)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIndex((current) => Math.max(0, current - 1))}
                    disabled={index === 0}
                    className="flex min-h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-bold disabled:opacity-30"
                  >
                    <ArrowLeft className="size-4" /> Back
                  </button>
                  <span className="flex h-1.5 w-24 overflow-hidden rounded-full bg-border">
                    <span
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(completed / steps.length) * 100}%`,
                        background: active.color,
                      }}
                    />
                  </span>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground">
                  Step {index + 1} / {steps.length}
                </p>
              </div>

              <h2 className="mt-6 text-3xl font-black tracking-[-.05em]">
                {allDone ? "You're set up." : "Start here"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {allDone
                  ? "Everything on the setup list is done. Keep creating whenever you're ready."
                  : "Optional setup you can finish whenever you want. Nothing here blocks the content engine."}
              </p>

              <div className="mt-6 space-y-2">
                {steps.map((step, position) => (
                  <Link
                    key={step.key}
                    to={step.to}
                    onClick={() => dismiss(false)}
                    onFocus={() => setIndex(position)}
                    onMouseEnter={() => setIndex(position)}
                    className="flex min-h-16 items-center gap-4 rounded-2xl border px-4 transition"
                    style={{
                      background: step.done ? step.soft : "transparent",
                      borderColor: step.done ? step.color : "var(--border)",
                    }}
                  >
                    <span
                      className="grid size-10 shrink-0 place-items-center rounded-xl font-mono text-xs font-bold"
                      style={{ background: step.soft, color: step.color }}
                    >
                      {String(position + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-extrabold">{step.title}</span>
                      <span className="block text-xs text-muted-foreground">{step.detail}</span>
                    </span>
                    {step.done ? (
                      <Check className="size-5 shrink-0" style={{ color: step.color }} />
                    ) : (
                      <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                    )}
                  </Link>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={() => dismiss(true)}
                  className="min-h-11 rounded-full px-4 text-sm font-bold text-muted-foreground hover:bg-spotlight-soft"
                >
                  Hide this checklist
                </button>
                <button
                  onClick={() => dismiss(false)}
                  className="flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white"
                >
                  Close <ArrowRight className="size-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!open && !hidden ? (
        <motion.button
          onClick={() => setOpen(true)}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={reduce ? undefined : { scale: 1.03 }}
          whileTap={reduce ? undefined : { scale: 0.97 }}
          className="fixed bottom-24 right-4 z-40 flex min-h-12 items-center gap-2.5 rounded-full border bg-white px-4 text-sm font-bold shadow-[0_20px_60px_-30px_rgba(31,35,40,.8)] lg:bottom-6"
          style={{ borderColor: allDone ? "var(--evergreen)" : nextStep.color }}
        >
          <span className="relative grid size-6 place-items-center">
            {!allDone && !reduce ? (
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: nextStep.color }}
                animate={{ opacity: [0.35, 0, 0.35], scale: [1, 1.75, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            ) : null}
            <span
              className="relative grid size-6 place-items-center rounded-full"
              style={{
                background: allDone ? "var(--evergreen-soft)" : nextStep.soft,
                color: allDone ? "var(--evergreen)" : nextStep.color,
              }}
            >
              {allDone ? <Check className="size-3.5" /> : <Sparkles className="size-3.5" />}
            </span>
          </span>
          <span className="text-left leading-tight">
            <span className="block">{allDone ? "Setup complete" : nextStep.title}</span>
            <span className="block font-mono text-[9px] uppercase tracking-[.14em] text-muted-foreground">
              {completed}/{steps.length} done
            </span>
          </span>
          <span className="flex gap-1">
            {steps.map((step) => (
              <span
                key={step.key}
                className="size-1.5 rounded-full transition-colors"
                style={{ background: step.done ? step.color : "var(--border)" }}
              />
            ))}
          </span>
        </motion.button>
      ) : null}

    </>
  );
}
