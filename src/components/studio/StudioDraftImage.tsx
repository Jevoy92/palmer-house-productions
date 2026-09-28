import { useRef, useState } from "react";
import { ImagePlus, LoaderCircle } from "lucide-react";
import type { Tables } from "@/lib/supabase/database.types";
import type { StudioImagePurpose } from "@/lib/studio-image-brief";
import { useStudio } from "./StudioProvider";
import { useGuide } from "./useGuide";
import { StudioAssetVisual } from "./StudioAssetVisual";

/** Generation is grounded in the saved output on the server, not its campaign hero. */
export function StudioDraftImage({
  asset,
  disabled,
  onBusyChange,
}: {
  asset: Tables<"campaign_assets">;
  disabled?: boolean;
  onBusyChange?: (busy: boolean) => void;
}) {
  const { generateArtifact } = useStudio();
  const { guide } = useGuide();
  const [expanded, setExpanded] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [purpose, setPurpose] = useState<StudioImagePurpose>(
    asset.kind.includes("script")
      ? "thumbnail"
      : /caption|post|carousel/.test(asset.kind)
        ? "social"
        : "cover",
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const lock = useRef(false);
  if (["image", "document", "pdf"].includes(asset.kind)) return null;
  async function create() {
    if (lock.current || disabled) return;
    lock.current = true;
    setBusy(true);
    onBusyChange?.(true);
    setError("");
    setResult("");
    try {
      const created = await generateArtifact({
        kind: "image",
        title: `${asset.title.slice(0, 160)} — image`,
        targetAssetId: asset.id,
        campaignId: asset.campaign_id || undefined,
        imagePurpose: purpose,
        prompt:
          prompt.trim() ||
          "Illustrate the specific subject and message in this saved draft. Follow the brand's visual direction.",
        pal: guide.key || undefined,
      });
      setResult(
        created.warning ||
          "Saved to this draft and your Library. Other drafts keep their own images.",
      );
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Could not create the image. Your direction is still here; try again.",
      );
    } finally {
      lock.current = false;
      setBusy(false);
      onBusyChange?.(false);
    }
  }
  return (
    <section className="studio-draft-image">
      <button type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
        <ImagePlus size={17} /> Image for this draft <span>{expanded ? "−" : "+"}</span>
      </button>
      {expanded && (
        <div className="studio-draft-image-body">
          <p>
            Your saved words, subject, and Brand DNA guide this image. Add any specific details
            below.
          </p>
          <div className="studio-draft-image-preview">
            <StudioAssetVisual asset={asset} />
          </div>
          <label>
            Image format
            <select
              value={purpose}
              disabled={busy}
              onChange={(event) => setPurpose(event.target.value as StudioImagePurpose)}
            >
              <option value="social">Social post</option>
              <option value="thumbnail">Video thumbnail</option>
              <option value="cover">Article cover</option>
              <option value="storyboard">Storyboard still</option>
            </select>
          </label>
          <label>
            Visual direction <small>Optional</small>
            <textarea
              value={prompt}
              maxLength={3000}
              disabled={busy}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="The exact subject, setting, mood, or composition you have in mind…"
              rows={3}
            />
          </label>
          {disabled && <p>Save your text changes first so the image uses the latest draft.</p>}
          {error && (
            <p role="alert" className="studio-chat-error">
              {error}
            </p>
          )}
          {result && <p role="status">{result}</p>}
          <button
            type="button"
            className="studio-chat-button"
            disabled={disabled || busy}
            onClick={() => void create()}
          >
            {busy ? <LoaderCircle size={16} className="animate-spin" /> : <ImagePlus size={16} />}
            {busy ? "Creating draft image…" : "Generate draft image"}
          </button>
        </div>
      )}
    </section>
  );
}
