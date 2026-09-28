import { StudioCreditCost } from "./StudioCredits";
import { useEffect, useRef, useState, type RefObject } from "react";
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
  const { saveCustomPal, selectCustomPal, uploadPalAvatar, generatePalAvatar, resolvePalAvatar } =
    useStudio();
  const [name, setName] = useState("");
  const [personality, setPersonality] = useState("");
  const [appearance, setAppearance] = useState("");
  const [basePal, setBasePal] = useState<PalName>("kiana");
  const [avatarPath, setAvatarPath] = useState<string | undefined>();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [busy, setBusy] = useState<"save" | "image" | "upload" | null>(null);
  const [error, setError] = useState("");
  const savedProfileId = useRef<string | undefined>(undefined);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
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
      if (!mounted.current) return;
      setAvatarPath(path);
      setAvatarUrl(url);
    } catch (reason) {
      if (mounted.current)
        setError(reason instanceof Error ? reason.message : "Could not upload this portrait.");
    } finally {
      if (mounted.current) setBusy(null);
    }
  }
  async function generate() {
    if (!appearance.trim() || busy) return;
    setBusy("image");
    setError("");
    try {
      const result = await generatePalAvatar({
        name: name.trim() || undefined,
        basePal,
        description: appearance.trim(),
      });
      if (!mounted.current) return;
      setAvatarPath(result.storagePath);
      const url = result.url || (await resolvePalAvatar(result.storagePath));
      if (mounted.current) setAvatarUrl(url);
    } catch (reason) {
      if (mounted.current)
        setError(
          reason instanceof Error
            ? reason.message
            : "The portrait could not be generated. You can retry or upload an image.",
        );
    } finally {
      if (mounted.current) setBusy(null);
    }
  }
  async function save() {
    if (!name.trim() || !personality.trim() || busy) return;
    setBusy("save");
    setError("");
    try {
      const profile = await saveCustomPal({
        id: savedProfileId.current,
        name: name.trim(),
        personality: personality.trim(),
        basePal,
        avatarPath,
      });
      savedProfileId.current = profile.id;
      if (!mounted.current) return;
      await selectCustomPal(profile.id);
      if (!mounted.current) return;
      toast.success(`${profile.name} is ready to work with you.`);
      onClose();
      savedProfileId.current = undefined;
      setName("");
      setPersonality("");
      setAppearance("");
      setAvatarPath(undefined);
      setAvatarUrl("");
      setBasePal("kiana");
    } catch (reason) {
      if (mounted.current)
        setError(
          reason instanceof Error
            ? reason.message
            : "Could not save your Pal. Your choices are still here.",
        );
    } finally {
      if (mounted.current) setBusy(null);
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
          Your own character, your kind of conversation. Every Pal can write, plan, create images,
          and make PDFs.
        </DialogDescription>
        <label className="studio-editor-label">
          Name
          <input
            maxLength={60}
            disabled={Boolean(busy)}
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
            disabled={Boolean(busy)}
            value={personality}
            onChange={(event) => setPersonality(event.target.value)}
            placeholder="Warm and witty, asks thoughtful questions, loves a short answer…"
          />
        </label>
        <section
          className="studio-custom-appearance"
          aria-labelledby="studio-custom-appearance-title"
        >
          <h3 id="studio-custom-appearance-title">Give your Pal a face</h3>
          <p>Describe a character and create a portrait in the Pals’ 3D style.</p>
          <div className="studio-custom-pal-portrait" data-generating={busy === "image"}>
            <img src={avatarUrl || palDirectory[basePal].avatar} alt={name || "Your new Pal"} />
            <div>
              <strong>{name || "Your creative Pal"}</strong>
              <p>
                {avatarPath
                  ? "Your custom portrait"
                  : `Starting with ${palDirectory[basePal].name}’s look`}
              </p>
              {busy === "image" ? (
                <span role="status">
                  <LoaderCircle size={14} className="animate-spin" /> Creating your portrait…
                </span>
              ) : null}
            </div>
          </div>
          <label className="studio-editor-label">
            Describe their appearance
            <textarea
              rows={3}
              value={appearance}
              maxLength={1500}
              disabled={Boolean(busy)}
              onChange={(event) => setAppearance(event.target.value)}
              placeholder="A Jamaican woman with curls, round glasses, and a yellow jacket…"
            />
          </label>
          <StudioCreditCost operation="avatar" />
          <div className="studio-custom-portrait-actions">
            <button
              type="button"
              className="studio-chat-button is-primary"
              disabled={!appearance.trim() || Boolean(busy)}
              onClick={() => void generate()}
            >
              {busy === "image" ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <Sparkles size={16} />
              )}
              {avatarPath ? "Generate a new portrait" : "Generate portrait"}
            </button>
            <label className="studio-chat-button studio-custom-upload">
              <Upload size={16} /> Upload
              <input
                type="file"
                aria-label="Upload Pal portrait"
                accept="image/png,image/jpeg,image/webp"
                disabled={Boolean(busy)}
                onChange={(event) => void upload(event.target.files?.[0])}
              />
            </label>
          </div>
          <small>You can also keep a familiar Pal’s look. Your portrait stays with your Pal.</small>
        </section>
        <details className="studio-custom-bases-details">
          <summary>Choose a starting personality and look</summary>
          <fieldset disabled={Boolean(busy)}>
            <legend className="sr-only">Start with a familiar Pal</legend>
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
