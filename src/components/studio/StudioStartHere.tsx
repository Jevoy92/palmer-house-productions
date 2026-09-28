import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowRight, Check, ChevronLeft, ChevronRight, CircleHelp, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useStudio } from "./StudioProvider";
import { StudioGraphic, type StudioGraphicName } from "./StudioGraphic";
import { useStudioMotion } from "./studio-motion";
import {
  hasEstablishedStudio,
  parseStudioGuidePreference,
  studioGuideStorageKey,
  studioSetupSteps,
  STUDIO_GUIDE_VERSION,
  type StudioGuidePreference,
} from "@/lib/studio-onboarding";
import "./studio-onboarding.css";

const tour = [
  {
    graphic: "chat",
    title: "Start with a conversation.",
    body: "Tell a Pal what you’re working on. Each has a different personality, and every Pal can help with posts, images, PDFs, and campaigns.",
    note: "Switch Pals from the name at the top of Chat. Your conversation and shared workspace knowledge stay with you.",
    to: "/studio/conversations",
    action: "Open Chat",
  },
  {
    graphic: "feed",
    title: "A good idea can come from anywhere.",
    body: "Feed is where your Pals share suggestions and discuss your workspace. Heart something, add a comment, or save it to Ideas for later.",
    note: "Ideas hold the sparks. Campaigns turn one story into a coordinated set of drafts for different channels.",
    to: "/studio/feed",
    action: "Explore Feed",
  },
  {
    graphic: "library",
    title: "Your work has a home.",
    body: "Library holds your posts, images, articles, PDFs, and video scripts. Open a draft to preview, edit, or copy it. Calendar puts the finished work in front of you when you need it.",
    note: "Planning a date does not publish a post. Review your work, then copy or export it to your chosen channel.",
    to: "/studio/library",
    action: "Open Library",
  },
  {
    graphic: "brand",
    title: "Keep every Pal in the loop.",
    body: "Brand DNA sets your business, audience, voice, and visual style. Shared memory in Settings keeps useful facts available when you change Pal or model.",
    note: "You can review, edit, export, or forget shared memories. Video roadmap helps plan reusable video scripts; it does not generate footage.",
    to: "/studio/brand",
    action: "Open Brand DNA",
  },
  {
    graphic: "campaigns",
    title: "Create at your own pace.",
    body: "Usage & billing shows your allowance and the cost of each kind of AI work. Check the credit estimate before generating, and add credits when you need more.",
    note: "Your saved drafts stay yours to open, edit, copy, and organize. Adding credits is a separate purchase—not an automatic refill.",
    to: "/studio/billing",
    action: "See usage & billing",
  },
] as const;

/** Mounted once by the shell. A small arrival banner offers help without opening a modal automatically. */
export function StudioStartHere() {
  const { workspace, user, brand, brandReferences, campaigns, assets, calendar } = useStudio();
  const { reduceMotion, fadeTransition } = useStudioMotion();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"setup" | "tour">("setup");
  const [page, setPage] = useState(0);
  const [stored, setStored] = useState<{ key: string; value: StudioGuidePreference } | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const key = workspace && user ? studioGuideStorageKey(workspace.id, user.id) : null;
  const facts = {
    brand,
    references: brandReferences.length,
    campaigns: campaigns.length,
    assets: assets.length,
    calendar: calendar.length,
  };
  const established = hasEstablishedStudio(facts);
  const steps = studioSetupSteps(facts);
  const completed = steps.filter((step) => step.done).length;
  const preference = stored?.key === key ? stored.value : null;
  const current = tour[page];
  useEffect(() => {
    if (!key) return;
    let value = parseStudioGuidePreference(null);
    try {
      value = parseStudioGuidePreference(window.localStorage.getItem(key));
    } catch {
      /* Session-only when storage is blocked. */
    }
    setStored({ key, value });
    setOpen(false);
    setPage(0);
  }, [key]);
  useEffect(() => {
    const show = () => {
      opener.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setTab(established ? "tour" : "setup");
      setPage(0);
      setOpen(true);
    };
    window.addEventListener("studio:open-guide", show);
    return () => window.removeEventListener("studio:open-guide", show);
  }, [established]);
  function remember(patch: Partial<StudioGuidePreference>) {
    if (!key) return;
    const value = {
      ...(preference || parseStudioGuidePreference(null)),
      ...patch,
      version: STUDIO_GUIDE_VERSION,
    };
    setStored({ key, value });
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* Keep the in-memory choice. */
    }
  }
  function showGuide() {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setTab(established ? "tour" : "setup");
    setPage(0);
    setOpen(true);
  }
  if (!workspace || !user) return null;
  return (
    <>
      {preference && !preference.dismissedWelcome && (
        <motion.aside
          className="studio-guide-arrival"
          aria-label={established ? "What’s new in Studio" : "Welcome to Studio"}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={fadeTransition}
        >
          <StudioGraphic name={established ? "campaigns" : "chat"} size={42} />
          <div>
            <strong>
              {established
                ? "A fresh layout. Your work, right here."
                : "One small step. Something worth sharing."}
            </strong>
            <span>
              {established
                ? "Take a quick look around your refreshed Studio."
                : `${completed} of ${steps.length} steps complete. Let’s make your Studio yours.`}
            </span>
          </div>
          <button type="button" onClick={showGuide}>
            {established ? "Show me around" : "Get started"}
            <ArrowRight size={15} />
          </button>
          <button
            type="button"
            className="studio-guide-dismiss"
            aria-label="Dismiss Studio welcome"
            onClick={() => remember({ dismissedWelcome: true })}
          >
            <X size={16} />
          </button>
        </motion.aside>
      )}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="studio-app studio-navigation-backdrop" />
          <Dialog.Content
            className="studio-app studio-guide-dialog"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              const target = opener.current?.isConnected
                ? opener.current
                : document.getElementById("studio-content");
              target?.focus();
            }}
          >
            <header className="studio-guide-heading">
              <div>
                <small>YOUR STUDIO GUIDE</small>
                <Dialog.Title>
                  {established ? "Find your rhythm." : "Make your first good thing."}
                </Dialog.Title>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="studio-icon-button"
                  aria-label="Close Studio guide"
                >
                  <X size={20} />
                </button>
              </Dialog.Close>
            </header>
            <Dialog.Description className="studio-guide-description">
              A few useful starting points. Come back to this guide any time from the Guide button
              or navigation menu.
            </Dialog.Description>
            <div className="studio-guide-tabs" role="group" aria-label="Guide sections">
              <button type="button" aria-pressed={tab === "setup"} onClick={() => setTab("setup")}>
                Your checklist{" "}
                <span>
                  {completed}/{steps.length}
                </span>
              </button>
              <button type="button" aria-pressed={tab === "tour"} onClick={() => setTab("tour")}>
                Find your way
              </button>
            </div>
            {tab === "setup" ? (
              <div className="studio-guide-checklist">
                <div
                  className="studio-guide-progress"
                  role="progressbar"
                  aria-label="Saved setup progress"
                  aria-valuenow={completed}
                  aria-valuemin={0}
                  aria-valuemax={steps.length}
                >
                  <span style={{ width: `${(completed / steps.length) * 100}%` }} />
                </div>
                <p>
                  {completed === steps.length
                    ? "You have the essentials in place. Keep creating at your own pace."
                    : "These check themselves off when you save the actual work."}
                </p>
                <ol>
                  {steps.map((step) => (
                    <li key={step.key}>
                      <Link to={step.to} onClick={() => setOpen(false)}>
                        <StudioGraphic name={step.graphic} size={50} />
                        <div>
                          <strong>{step.title}</strong>
                          <span>{step.detail}</span>
                        </div>
                        <span className={`studio-guide-step-state ${step.done ? "is-done" : ""}`}>
                          {step.done ? (
                            <Check size={17} aria-label="Complete" />
                          ) : (
                            <ArrowRight size={17} aria-label="Open step" />
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
                <Link
                  className="studio-guide-usage-link"
                  to="/studio/billing"
                  onClick={() => setOpen(false)}
                >
                  Check your usage & credits <ArrowRight size={15} />
                </Link>
              </div>
            ) : (
              <div className="studio-guide-tour">
                <motion.div
                  key={page}
                  initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={fadeTransition}
                >
                  <StudioGraphic name={current.graphic as StudioGraphicName} size={96} />
                  <span className="studio-guide-tour-count">
                    {page + 1} OF {tour.length}
                  </span>
                  <h3>{current.title}</h3>
                  <p>{current.body}</p>
                  <aside>{current.note}</aside>
                  <Link to={current.to} onClick={() => setOpen(false)}>
                    {current.action}
                    <ArrowRight size={15} />
                  </Link>
                </motion.div>
                <div className="studio-guide-tour-controls">
                  <button
                    type="button"
                    disabled={page === 0}
                    onClick={() => setPage((value) => value - 1)}
                  >
                    <ChevronLeft size={17} />
                    Back
                  </button>
                  <span aria-hidden="true">
                    {tour.map((_, index) => (
                      <i key={index} className={index === page ? "is-current" : ""} />
                    ))}
                  </span>
                  {page < tour.length - 1 ? (
                    <button type="button" onClick={() => setPage((value) => value + 1)}>
                      Next
                      <ChevronRight size={17} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        remember({ dismissedWelcome: true, viewedTour: true });
                        setOpen(false);
                      }}
                    >
                      Let’s create
                      <Check size={17} />
                    </button>
                  )}
                </div>
              </div>
            )}
            <footer className="studio-guide-footer">
              <CircleHelp size={15} />
              <span>Your work stays put while you explore.</span>
              <button
                type="button"
                onClick={() => {
                  remember({ dismissedWelcome: true });
                  setOpen(false);
                }}
              >
                Got it for now
              </button>
            </footer>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
