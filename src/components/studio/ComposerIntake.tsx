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
import { startRecording, type Recorder } from "@/lib/audio-wav";
import { useStudio, type ConversationIntake } from "./StudioProvider";

export const ACCEPTED_INTAKE =
  ".pdf,.doc,.docx,.txt,.md,.csv,.json,.jpg,.jpeg,.png,.webp,.heic,.gif,.mp3,.m4a,.wav,.aac,.ogg,.mp4,.mov,.webm";

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
}: {
  color: string;
  conversationId?: string;
  attachments: ConversationIntake[];
  onAttachmentsChange: (next: ConversationIntake[]) => void;
  onTranscript: (text: string) => void;
  disabled?: boolean;
  onBusyChange?: (busy: boolean) => void;
}) {
  const { uploadConversationFile } = useStudio();
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
    return () => {
      generation.current += 1;
      recorderRef.current?.cancel();
      recorderRef.current = null;
    };
  }, [conversationId]);

  useEffect(() => {
    onBusyChange?.(uploading || starting || Boolean(recorder));
    return () => onBusyChange?.(false);
  }, [uploading, starting, recorder, onBusyChange]);

  useEffect(() => {
    if (!recorder) return;
    const timer = setInterval(() => {
      setSeconds((value) => value + 1);
      setLevel(recorder.level());
    }, 1000);
    return () => clearInterval(timer);
  }, [recorder]);

  async function send(file: File, kind: "voice" | "file") {
    const request = generation.current;
    setUploading(true);
    try {
      const intake = await uploadConversationFile(file, { conversationId, kind });
      if (request !== generation.current) return;
      if (kind === "voice") {
        if (!intake.text) throw new Error("We could not hear any speech in that recording.");
        onTranscript(intake.text);
        toast.success("Voice note added.");
      } else {
        onAttachmentsChange([...attachmentsRef.current, intake]);
        toast.success(`${intake.attachment.label} is ready.`);
      }
    } catch (error) {
      if (request === generation.current)
        toast.error(error instanceof Error ? error.message : "That file could not be read.");
    } finally {
      if (request === generation.current) setUploading(false);
    }
  }

  async function toggleRecording() {
    const request = generation.current;
    if (recorderRef.current) {
      const active = recorderRef.current;
      recorderRef.current = null;
      setRecorder(null);
      setSeconds(0);
      setUploading(true);
      try {
        const blob = await active.stop();
        if (request !== generation.current) return;
        if (blob.size < 4096) throw new Error("That recording was empty. Please try again.");
        await send(new File([blob], "voice-note.wav", { type: "audio/wav" }), "voice");
      } catch (error) {
        if (request === generation.current)
          toast.error(error instanceof Error ? error.message : "That recording could not be read.");
      } finally {
        if (request === generation.current) setUploading(false);
      }
      return;
    }
    if (starting) return;
    setStarting(true);
    try {
      setSeconds(0);
      const active = await startRecording();
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

      <div className="flex items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept={ACCEPTED_INTAKE}
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) void send(file, "file");
          }}
        />
        <button
          type="button"
          disabled={disabled || uploading || starting || Boolean(recorder)}
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
          disabled={!recorder && (disabled || uploading || starting)}
          onClick={() => void toggleRecording()}
          aria-label={recorder ? "Stop recording" : "Record a voice note"}
          className="grid size-10 shrink-0 place-items-center rounded-xl border text-white transition disabled:opacity-40"
          style={{
            background: recorder ? color : "white",
            borderColor: recorder ? color : undefined,
            color: recorder ? "white" : color,
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
            Recording {clock(seconds)}
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
            Talk it out, or add a PDF, doc, image, or recording.
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
