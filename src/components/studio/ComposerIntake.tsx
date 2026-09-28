import {
  FileText,
  Image as ImageIcon,
  LoaderCircle,
  Mic,
  Paperclip,
  Square,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { startRecording, prepareStudioVoiceFile, type Recorder } from "@/lib/audio-wav";
import { getStudioTranscriptionStatus } from "@/lib/studio-transcription-server";
import {
  inspectStudioVoiceWav,
  studioVoiceQuote,
  STUDIO_VOICE_MAX_SECONDS,
} from "@/lib/studio-transcription";
import { useStudio, type ConversationIntake } from "./StudioProvider";

export const ACCEPTED_INTAKE =
  ".pdf,.doc,.docx,.txt,.md,.csv,.json,.jpg,.jpeg,.png,.webp,.heic,.gif";

function sizeLabel(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function clock(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

export function ComposerIntake({
  color,
  conversationId,
  attachments,
  onAttachmentsChange,
  onTranscript,
  disabled,
  onBusyChange,
  transcriptionEnabled,
}: {
  color: string;
  conversationId?: string;
  attachments: ConversationIntake[];
  onAttachmentsChange: (next: ConversationIntake[]) => void;
  onTranscript: (text: string) => void;
  disabled?: boolean;
  onBusyChange?: (busy: boolean) => void;
  /** Optional override for the isolated development preview. Server enforcement always applies. */
  transcriptionEnabled?: boolean;
}) {
  const { uploadConversationFile, session, workspace } = useStudio();
  const [voiceStatus, setVoiceStatus] = useState({
    enabled: false,
    reason: "Checking voice availability…",
  });
  const voiceEnabled = transcriptionEnabled ?? voiceStatus.enabled;
  const [pendingAudio, setPendingAudio] = useState<{
    file: File;
    seconds: number;
    requestId: string;
  } | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [voiceError, setVoiceError] = useState("");
  useEffect(() => {
    let canceled = false;
    setVoiceStatus({ enabled: false, reason: "Checking voice availability…" });
    if (session?.access_token && workspace?.id)
      getStudioTranscriptionStatus({
        data: { accessToken: session.access_token, workspaceId: workspace.id },
      })
        .then((status) => {
          if (!canceled) setVoiceStatus(status);
        })
        .catch(() => {
          if (!canceled)
            setVoiceStatus({
              enabled: false,
              reason: "Voice is unavailable. You can still paste text or attach a document.",
            });
        });
    return () => {
      canceled = true;
    };
  }, [session?.access_token, workspace?.id]);
  useEffect(() => {
    if (!pendingAudio) {
      setAudioUrl(null);
      return;
    }
    const url = URL.createObjectURL(pendingAudio.file);
    setAudioUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [pendingAudio]);
  const [uploading, setUploading] = useState(false);
  const [starting, setStarting] = useState(false);
  const [recorder, setRecorder] = useState<Recorder | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [level, setLevel] = useState(0);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const recorderRef = useRef<Recorder | null>(null);
  const generation = useRef(0);
  const attachmentsRef = useRef(attachments);
  attachmentsRef.current = attachments;

  useEffect(() => {
    generation.current += 1;
    setRecorder(null);
    setStarting(false);
    setUploading(false);
    setSeconds(0);
    setPendingAudio(null);
    setVoiceError("");
    return () => {
      generation.current += 1;
      recorderRef.current?.cancel();
      recorderRef.current = null;
    };
  }, [conversationId, workspace?.id]);

  useEffect(() => {
    onBusyChange?.(uploading || starting || Boolean(recorder) || Boolean(pendingAudio));
    return () => onBusyChange?.(false);
  }, [uploading, starting, recorder, pendingAudio, onBusyChange]);

  useEffect(() => {
    if (!recorder) return;
    const timer = setInterval(() => {
      setSeconds(Math.floor(recorder.duration()));
      setLevel(recorder.level());
    }, 200);
    return () => clearInterval(timer);
  }, [recorder]);

  async function send(file: File, kind: "voice" | "file", requestId?: string) {
    const request = generation.current;
    setUploading(true);
    setVoiceError("");
    try {
      const intake = await uploadConversationFile(file, { conversationId, kind, requestId });
      if (request !== generation.current) return;
      if (kind === "voice") {
        if (!intake.text) throw new Error("We could not hear any speech in that recording.");
        setPendingAudio(null);
        onTranscript(intake.text);
        toast.success("Transcript added. Review it before sending.");
      } else {
        onAttachmentsChange([...attachmentsRef.current, intake]);
        toast.success(`${intake.attachment.label} is ready.`);
      }
    } catch (error) {
      if (request === generation.current) {
        const message = error instanceof Error ? error.message : "That file could not be read.";
        if (kind === "voice") setVoiceError(message);
        toast.error(message);
      }
    } finally {
      if (request === generation.current) setUploading(false);
    }
  }
  async function receiveFile(file: File) {
    const audio =
      /^(audio|video)\//.test(file.type) ||
      /\.(wav|mp3|m4a|aac|ogg|webm|mp4|mov)$/i.test(file.name);
    if (!audio) {
      await send(file, "file");
      return;
    }
    if (!voiceEnabled) {
      toast.info(voiceStatus.reason);
      return;
    }
    const request = generation.current;
    setUploading(true);
    setVoiceError("");
    try {
      const result = await prepareStudioVoiceFile(file);
      if (request === generation.current)
        setPendingAudio({
          file: result.file,
          seconds: result.durationSeconds,
          requestId: crypto.randomUUID(),
        });
    } catch (error) {
      if (request === generation.current)
        toast.error(error instanceof Error ? error.message : "This audio could not be read.");
    } finally {
      if (request === generation.current) setUploading(false);
    }
  }
  async function finishRecording() {
    const request = generation.current,
      active = recorderRef.current;
    if (!active) return;
    recorderRef.current = null;
    setRecorder(null);
    setUploading(true);
    try {
      const blob = await active.stop();
      const quote = inspectStudioVoiceWav(new Uint8Array(await blob.arrayBuffer()));
      if (request === generation.current)
        setPendingAudio({
          file: new File([blob], "voice-note.wav", { type: "audio/wav" }),
          seconds: quote.seconds,
          requestId: crypto.randomUUID(),
        });
    } catch (error) {
      if (request === generation.current)
        toast.error(error instanceof Error ? error.message : "This recording could not be read.");
    } finally {
      if (request === generation.current) {
        setUploading(false);
        setSeconds(0);
      }
    }
  }
  async function toggleRecording() {
    const request = generation.current;
    if (recorderRef.current) {
      await finishRecording();
      return;
    }
    if (!voiceEnabled) return;
    if (starting) return;
    setStarting(true);
    try {
      setSeconds(0);
      const active = await startRecording({ onLimit: () => void finishRecording() });
      // A permission dialog can resolve after leaving the conversation.
      // Release that microphone immediately instead of starting a hidden recording.
      if (request !== generation.current) {
        active.cancel();
        return;
      }
      recorderRef.current = active;
      setRecorder(active);
    } catch {
      if (request === generation.current)
        toast.error("We need microphone access to record. Allow it in your browser and try again.");
    } finally {
      if (request === generation.current) setStarting(false);
    }
  }

  function cancelRecording() {
    recorderRef.current?.cancel();
    recorderRef.current = null;
    setRecorder(null);
    setSeconds(0);
  }

  return (
    <div className="flex flex-col gap-2">
      {attachments.length ? (
        <div className="flex flex-wrap gap-2">
          {attachments.map((item, index) => (
            <span
              key={item.attachment.id}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-mist/60 px-3 py-2 text-[11px] font-bold"
            >
              {item.attachment.kind === "image" ? (
                <ImageIcon className="size-3.5" style={{ color }} />
              ) : (
                <FileText className="size-3.5" style={{ color }} />
              )}
              <span className="max-w-40 truncate">{item.attachment.label}</span>
              <span className="text-muted-foreground">{sizeLabel(item.attachment.byte_size)}</span>
              <button
                type="button"
                aria-label={`Remove ${item.attachment.label}`}
                className="grid min-h-7 min-w-7 place-items-center rounded-md hover:bg-white"
                disabled={disabled}
                onClick={() =>
                  onAttachmentsChange(attachments.filter((_, position) => position !== index))
                }
              >
                <X className="size-3.5 text-muted-foreground" />
              </button>
            </span>
          ))}
        </div>
      ) : null}

      {pendingAudio ? (
        <div
          className="rounded-2xl border border-border p-3 space-y-3"
          aria-label="Review voice note"
        >
          <div className="flex items-center justify-between gap-2 text-sm">
            <strong>Review your voice note</strong>
            <span className="text-muted-foreground">
              {clock(Math.ceil(pendingAudio.seconds))} ·{" "}
              {studioVoiceQuote(pendingAudio.seconds).credits} credits
            </span>
          </div>
          {audioUrl ? (
            <audio
              src={audioUrl}
              controls
              className="w-full h-10"
              aria-label="Play your voice note"
            />
          ) : null}
          <p className="text-xs text-muted-foreground">
            Transcription uses 2 credits per started minute. You can edit the text before sending it
            to your Pal.
          </p>
          {voiceError ? (
            <p role="alert" className="text-sm text-destructive">
              {voiceError}
            </p>
          ) : null}
          {uploading ? (
            <p role="status" className="flex items-center gap-2 text-sm">
              <LoaderCircle className="size-4 animate-spin" />
              Turning your voice into text… Your recording stays here until it is saved.
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <button
              type="button"
              disabled={uploading || disabled}
              className="rounded-xl px-4 py-3 font-bold text-white disabled:opacity-40"
              style={{ background: color, color: "var(--studio-action-text, #fff)" }}
              onClick={() => void send(pendingAudio.file, "voice", pendingAudio.requestId)}
            >
              Transcribe · {studioVoiceQuote(pendingAudio.seconds).credits} credits
            </button>
            <button
              type="button"
              disabled={uploading}
              className="px-2 py-3 underline underline-offset-4"
              onClick={() => {
                setPendingAudio(null);
                setVoiceError("");
              }}
            >
              Discard
            </button>
            {audioUrl ? (
              <a
                href={audioUrl}
                download={pendingAudio.file.name}
                className="px-2 py-3 underline underline-offset-4"
              >
                Save recording
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
      <div className="flex items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept={
            voiceEnabled ? `${ACCEPTED_INTAKE},.wav,.mp3,.m4a,.aac,.ogg,.webm` : ACCEPTED_INTAKE
          }
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) void receiveFile(file);
          }}
        />
        <button
          type="button"
          disabled={disabled || uploading || starting || Boolean(recorder) || Boolean(pendingAudio)}
          onClick={() => fileRef.current?.click()}
          aria-label="Attach a file"
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-white text-muted-foreground transition hover:text-ink disabled:opacity-40"
        >
          {uploading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Paperclip className="size-4" />
          )}
        </button>
        <button
          type="button"
          disabled={
            !voiceEnabled ||
            (!recorder && (disabled || uploading || starting || Boolean(pendingAudio)))
          }
          title={!voiceEnabled ? voiceStatus.reason : undefined}
          onClick={() => void toggleRecording()}
          aria-label={recorder ? "Stop recording" : "Record a voice note"}
          className="grid size-10 shrink-0 place-items-center rounded-xl border text-white transition disabled:opacity-40"
          style={{
            background: recorder ? color : "var(--studio-surface, #fff)",
            borderColor: recorder ? color : undefined,
            color: recorder ? "var(--studio-action-text, #fff)" : color,
          }}
        >
          {starting ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : recorder ? (
            <Square className="size-3.5" />
          ) : (
            <Mic className="size-4" />
          )}
        </button>
        {recorder ? (
          <span className="flex items-center gap-2 text-[11px] font-bold" style={{ color }}>
            <span
              className="inline-block size-2 rounded-full"
              style={{ background: color, opacity: 0.35 + Math.min(0.65, level) }}
            />
            Recording {clock(seconds)} / {clock(STUDIO_VOICE_MAX_SECONDS)}
            <button
              type="button"
              onClick={cancelRecording}
              className="min-h-9 px-2 underline underline-offset-4"
            >
              Cancel
            </button>
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">
            {uploading
              ? "Preparing your content…"
              : voiceEnabled
                ? "Voice: 2 credits per started minute · 5 min max."
                : voiceStatus.reason}
          </span>
        )}
      </div>
    </div>
  );
}

/** Fold attachment text into the message the Pal reads. */
// eslint-disable-next-line react-refresh/only-export-components
export function withAttachmentContext(message: string, attachments: ConversationIntake[]) {
  if (!attachments.length) return message;
  const blocks = attachments.map((item) => {
    if (!item.text) return `Attached image: ${item.attachment.label}`;
    return `Attached ${item.attachment.kind} "${item.attachment.label}":\n${item.text}`;
  });
  return `${message}\n\n---\n${blocks.join("\n\n")}`;
}
