import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  FileText,
  ImagePlus,
  Layers3,
  MessageSquareText,
  Sparkles,
  X,
} from "lucide-react";
import type { GuideProfile } from "@/lib/pal-directory";
import type { PalName } from "@/lib/studio-model";
import { PAL_SCENES, type PalSceneName } from "@/lib/pal-scenes";
import { composePalOpening, type PalOpeningContext } from "@/lib/pal-greetings";
import { PalAvatar } from "./PalAvatar";
import { useStudioMotion } from "./studio-motion";
import { palActivityCopy, type PalTask } from "@/lib/pal-activity";
import "./pal-presence.css";

const scenes: Record<PalName, PalSceneName> = {
  kareem: "postProduction",
  kiana: "contact",
  ryder: "startups",
  raquel: "checkoutReview",
  cyrus: "contentStrategy",
  clara: "blog",
  silas: "assessment",
  samira: "faqHelp",
};

function PalScene({
  pal,
  custom,
  working = false,
}: {
  pal: GuideProfile;
  custom: boolean;
  working?: boolean;
}) {
  const scene = pal.key ? PAL_SCENES[scenes[pal.key]] : null;
  return (
    <div
      className={`studio-pal-scene ${custom ? "is-custom" : ""}`}
      data-working={working}
      data-pal={pal.key}
      aria-hidden="true"
    >
      <img src={!custom && scene ? scene.src : pal.avatar || ""} alt="" loading="eager" />
    </div>
  );
}

export function PalWelcome({
  pal,
  context,
  variant,
  compact = false,
  onPrompt,
  onImage,
  onPdf,
  onDismiss,
}: {
  pal: GuideProfile;
  context: PalOpeningContext;
  variant: number;
  compact?: boolean;
  onPrompt: (prompt: string) => void;
  onImage: () => void;
  onPdf: () => void;
  onDismiss: () => void;
}) {
  // This snapshot belongs to one arrival/Pal choice; background refreshes do not interrupt it.
  const [opening] = useState(() => composePalOpening(pal.key || "kiana", context, variant));
  const { reduceMotion, fadeTransition } = useStudioMotion();
  return (
    <motion.section
      className={`studio-pal-welcome ${compact ? "is-compact" : ""}`}
      aria-label={`${pal.name}’s welcome`}
      initial={reduceMotion ? false : { opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={fadeTransition}
    >
      <div className="studio-pal-welcome-portrait">
        <PalScene pal={pal} custom={Boolean(context.customName)} />
      </div>
      <div className="studio-pal-welcome-copy">
        <div className="studio-pal-welcome-byline">
          <PalAvatar pal={pal} size="xs" ring={false} />
          <strong>{pal.name}</strong>
          <span>{opening.contextLabel}</span>
        </div>
        {compact ? <h2>{opening.headline}</h2> : <h1>{opening.headline}</h1>}
        <p>
          {reduceMotion ? (
            opening.body
          ) : (
            <>
              <span className="sr-only">{opening.body}</span>
              <span aria-hidden="true">
                {opening.body.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    className="studio-pal-greeting-word"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.14, delay: Math.min(index * 0.012, 0.48) }}
                  >
                    {word}{" "}
                  </motion.span>
                ))}
              </span>
            </>
          )}
        </p>
        <div className="studio-pal-opening-prompts">
          {opening.suggestions.slice(0, compact ? 1 : 2).map((prompt) => (
            <button key={prompt} type="button" onClick={() => onPrompt(prompt)}>
              {prompt}
              <ArrowRight size={15} />
            </button>
          ))}
        </div>
        {!compact && (
          <>
            <div className="studio-pal-shared-tools">
              <button type="button" onClick={onImage}>
                <ImagePlus size={17} />
                Create an image
              </button>
              <button type="button" onClick={onPdf}>
                <FileText size={17} />
                Make a PDF
              </button>
              <button
                type="button"
                onClick={() =>
                  onPrompt(`Help me build a campaign for ${context.businessName || "my business"}.`)
                }
              >
                <Layers3 size={17} />
                Build a campaign
              </button>
            </div>
            <small className="studio-pal-capabilities">
              Every Pal can write, plan, create images, and make PDFs. Choose the personality you
              enjoy.
            </small>
          </>
        )}
      </div>
      {compact && (
        <button
          type="button"
          className="studio-pal-welcome-dismiss"
          onClick={onDismiss}
          aria-label="Dismiss welcome"
        >
          <X size={16} />
        </button>
      )}
    </motion.section>
  );
}

export function PalActivity({
  pal,
  custom,
  task,
}: {
  pal: GuideProfile;
  custom: boolean;
  task: PalTask;
}) {
  const { reduceMotion, fadeTransition } = useStudioMotion();
  const activity = palActivityCopy(pal.key || "kiana", task);
  const Icon =
    task === "image"
      ? Sparkles
      : task === "pdf"
        ? FileText
        : task === "campaign"
          ? Layers3
          : MessageSquareText;
  return (
    <motion.div
      className="studio-pal-activity studio-chat-working"
      data-task={task}
      data-reduced-motion={reduceMotion}
      role="status"
      aria-live="polite"
      aria-label={`${pal.name}: ${activity.label}`}
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={fadeTransition}
    >
      <div className="studio-pal-activity-art">
        <PalScene pal={pal} custom={custom} working />
        <div className={`studio-task-motif is-${activity.shape}`} aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div>
        <span className="studio-pal-activity-badge">
          <Icon size={14} />
          {activity.label}
        </span>
        <strong>
          {pal.name}
          <span className="studio-working-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </strong>
        <p className="studio-pal-task-voice">{activity.voice}</p>
        <div
          className="studio-task-progress"
          role="progressbar"
          aria-label={activity.label}
          aria-valuetext="Request in progress"
        >
          <span />
        </div>
        <details className="studio-task-details">
          <summary>What’s happening</summary>
          <p>{activity.detail}</p>
          <span>{activity.next}</span>
        </details>
      </div>
    </motion.div>
  );
}
