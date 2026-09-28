import { useEffect, useState, type RefObject } from "react";
import { Check, LoaderCircle, Sparkles, Upload } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { palDirectory, palList } from "@/lib/pal-directory";
import type { PalName } from "@/lib/studio-model";
import { useStudio } from "./StudioProvider";

export function StudioCustomPal({
  open,
  onClose,
  returnFocusTo,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusTo?: RefObject<HTMLButtonElement | null>;
}) {
  const { saveCustomPal, selectCustomPal, uploadPalAvatar, generateArtifact, resolvePalAvatar } =
    useStudio();
  const [name, setName] = useState("");
  const [personality, setPersonality] = useState("");
  const [appearance, setAppearance] = useState("");
  const [basePal, setBasePal] = useState<PalName>("kiana");
  const [avatarPath, setAvatarPath] = useState<string | undefined>();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [busy, setBusy] = useState<"save" | "image" | "upload" | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (open) setError("");
  }, [open]);
  async function upload(file?: File) {
    if (!file || busy) return;
    setBusy("upload");
    setError("");
    try {
      const path = await uploadPalAvatar(file);
      const url = await resolvePalAvatar(path);
      setAvatarPath(path);
      setAvatarUrl(url);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not upload this portrait.");
    } finally {
      setBusy(null);
    }
  }
  async function generate() {
    if (!appearance.trim() || busy) return;
    setBusy("image");
    setError("");
    try {
      const result = await generateArtifact({
        kind: "image",
        title: `${name.trim() || "My Pal"} portrait`,
        prompt: `Create a friendly stylized 3D character portrait for a creative assistant named ${name.trim() || "Pal"}. Soft sculpted features, expressive eyes, dimensional hair and fabric, polished animation-film character style matching Palmer House Pals. Chest-up portrait, centered face, uncluttered pale lavender background, no lettering. User's appearance description: ${appearance}.`,
      });
      setAvatarPath(result.storagePath);
      setAvatarUrl(result.url);
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "The portrait could not be generated. You can retry or upload an image.",
      );
    } finally {
      setBusy(null);
    }
  }
  async function save() {
    if (!name.trim() || !personality.trim() || busy) return;
    setBusy("save");
    setError("");
    try {
      const profile = await saveCustomPal({
        name: name.trim(),
        personality: personality.trim(),
        basePal,
        avatarPath,
      });
      await selectCustomPal(profile.id);
      toast.success(`${profile.name} is ready to work with you.`);
      onClose();
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Could not save your Pal. Your choices are still here.",
      );
    } finally {
      setBusy(null);
    }
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next && !busy) onClose();
      }}
    >
      <DialogContent
        className="studio-app studio-custom-pal"
        onCloseAutoFocus={(event) => {
          if (returnFocusTo?.current) {
            event.preventDefault();
            returnFocusTo.current.focus();
          }
        }}
        onInteractOutside={(event) => {
          if (busy) event.preventDefault();
        }}
        onEscapeKeyDown={(event) => {
          if (busy) event.preventDefault();
        }}
      >
        <DialogTitle>Create your Pal</DialogTitle>
        <DialogDescription>
          A personality you connect with. Every Pal can help with all your creative work.
        </DialogDescription>
        <div className="studio-custom-pal-portrait">
          <img src={avatarUrl || palDirectory[basePal].avatar} alt={name || "Your new Pal"} />
          <div>
            <strong>{name || "Your creative Pal"}</strong>
            <p>
              {avatarPath
                ? "Your custom portrait"
                : `Starting with ${palDirectory[basePal].name}’s look`}
            </p>
          </div>
        </div>
        <label className="studio-editor-label">
          Name
          <input
            maxLength={60}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="What should we call your Pal?"
          />
        </label>
        <label className="studio-editor-label">
          Personality
          <textarea
            rows={3}
            maxLength={1500}
            value={personality}
            onChange={(event) => setPersonality(event.target.value)}
            placeholder="Warm and witty, asks thoughtful questions, loves a short answer…"
          />
        </label>
        <fieldset>
          <legend>Start with a familiar Pal</legend>
          <div className="studio-custom-pal-bases">
            {palList.map((item) => (
              <button
                type="button"
                key={item.key}
                aria-label={`Start with ${item.name}`}
                aria-pressed={basePal === item.key}
                onClick={() => {
                  setBasePal(item.key);
                  if (!avatarPath) setAvatarUrl("");
                }}
              >
                <img src={item.avatar} alt="" />
                <span>{item.name}</span>
                {basePal === item.key ? <Check size={12} /> : null}
              </button>
            ))}
          </div>
        </fieldset>
        <details className="studio-custom-appearance">
          <summary>Give your Pal a custom look</summary>
          <label className="studio-editor-label">
            Describe their appearance
            <textarea
              rows={2}
              value={appearance}
              maxLength={1500}
              onChange={(event) => setAppearance(event.target.value)}
              placeholder="A Jamaican woman with curls, round glasses, and a yellow jacket…"
            />
          </label>
          <div className="studio-custom-portrait-actions">
            <button
              type="button"
              className="studio-chat-button"
              disabled={!appearance.trim() || Boolean(busy)}
              onClick={() => void generate()}
            >
              {busy === "image" ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <Sparkles size={16} />
              )}
              Generate portrait
            </button>
            <label className="studio-chat-button">
              <Upload size={16} />
              Upload
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                hidden
                disabled={Boolean(busy)}
                onChange={(event) => void upload(event.target.files?.[0])}
              />
            </label>
          </div>
        </details>
        {error ? (
          <p role="alert" className="studio-chat-error">
            {error}
          </p>
        ) : null}
        <button
          type="button"
          className="studio-chat-button is-primary"
          disabled={!name.trim() || !personality.trim() || Boolean(busy)}
          onClick={() => void save()}
        >
          {busy ? <LoaderCircle size={16} className="animate-spin" /> : <Check size={16} />}
          {busy === "image"
            ? "Creating portrait…"
            : busy === "upload"
              ? "Uploading portrait…"
              : busy === "save"
                ? "Saving your Pal…"
                : "Meet your Pal"}
        </button>
      </DialogContent>
    </Dialog>
  );
}
