import { Play, X } from "lucide-react";
import { useRef, useState } from "react";
import { packagePreviews } from "@/lib/package-previews";

export function PreviewMedia({
  id,
  name,
  priority = false,
}: {
  id: string;
  name: string;
  priority?: boolean;
}) {
  const media = packagePreviews[id];
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [opened, setOpened] = useState(false);
  const [failed, setFailed] = useState(false);
  if (!media) return null;

  function close() {
    video.current?.pause();
    setOpened(false);
    setFailed(false);
    opener.current?.focus();
  }

  return (
    <>
      <div className="pc-media">
        <img
          src={media.poster}
          alt=""
          width="1920"
          height="1080"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
        <span className="pc-concept-label">AI concept</span>
        <button
          ref={opener}
          className="pc-watch"
          aria-label={`Watch ${name} fictional example with sound, 30 seconds`}
          onClick={() => {
            setOpened(true);
            dialog.current?.showModal();
          }}
        >
          <Play size={14} fill="currentColor" /> Watch example <span>· 0:30</span>
        </button>
      </div>
      <dialog
        ref={dialog}
        className="pc-dialog pc-sample-dialog"
        aria-label={`${name} fictional video example`}
        onClose={close}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const r = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < r.left ||
              event.clientX > r.right ||
              event.clientY < r.top ||
              event.clientY > r.bottom
            )
              dialog.current?.close();
          }
        }}
      >
        <div className="pc-dialog-heading">
          <div>
            <span className="pc-eyebrow">{name}</span>
            <h2>{media.title}</h2>
          </div>
          <button
            className="pc-icon-button"
            onClick={() => dialog.current?.close()}
            aria-label="Close sample preview"
          >
            <X />
          </button>
        </div>
        {opened && (
          <video
            ref={video}
            src={media.videoSrc}
            poster={media.poster}
            controls
            autoPlay
            playsInline
            preload="metadata"
            aria-label={`${name} preview`}
            onError={() => setFailed(true)}
          >
            <track kind="captions" src={media.captions} srcLang="en" label="English" default />
          </video>
        )}
        {failed && (
          <p className="pc-error" role="alert">
            The preview could not load.{" "}
            <a href={media.videoSrc} target="_blank" rel="noreferrer">
              Open the video directly
            </a>
            , or read the script below.
          </p>
        )}
        <div className="pc-sample-copy">
          <p>
            {media.exampleType}. This is an AI-generated fictional demonstration. Your package is
            planned and filmed for your business.
          </p>
          <details>
            <summary>Read the spoken script</summary>
            <p>{media.transcript}</p>
          </details>
        </div>
      </dialog>
    </>
  );
}
