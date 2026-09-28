import { useEffect, useState } from "react";
import { ArrowUpRight, FileText, Check } from "lucide-react";
import { useStudio } from "./StudioProvider";
import { supabase } from "@/lib/supabase/client";
import { StudioGraphic } from "./StudioGraphic";
import "./studio-brand.css";

// eslint-disable-next-line react-refresh/only-export-components
export function brandColorInk(value: string) {
  const full = /^#([a-f\d]{3})$/i.test(value)
    ? `#${value
        .slice(1)
        .split("")
        .map((v) => v + v)
        .join("")}`
    : value;
  const hex = /^#([a-f\d]{6})$/i.exec(full)?.[1];
  if (!hex) return "var(--studio-text)";
  const rgb = [0, 2, 4]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  const luminance = rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  return (luminance + 0.05) / 0.05 >= 1.05 / (luminance + 0.05) ? "#000" : "#fff";
}
export function StudioBrandGuide({
  draft,
  completion,
}: {
  draft: Record<string, string>;
  completion: number;
}) {
  const { brandReferences, workspace } = useStudio();
  const [references, setReferences] = useState<
    Array<{ id: string; label: string; url: string; image: boolean }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const value = (key: string) => String(draft[key] || "").trim();
  const list = (key: string) =>
    value(key)
      .split(/\n|,/)
      .map((v) => v.trim())
      .filter(Boolean);
  useEffect(() => {
    let live = true;
    setLoading(true);
    setReferences([]);
    setFailedImages([]);
    void Promise.all(
      brandReferences.map(async (ref) => {
        const metadata =
          ref.metadata && typeof ref.metadata === "object" && !Array.isArray(ref.metadata)
            ? ref.metadata
            : {};
        const image =
          String(metadata.type || "").startsWith("image/") ||
          ["image", "logo"].includes(ref.kind) ||
          /\.(png|jpe?g|webp)(?:\?|$)/i.test(ref.source_url || ref.label);
        let url = ref.source_url || "";
        if (ref.storage_path) {
          url = "";
          if (workspace && ref.storage_path.startsWith(`${workspace.id}/`)) {
            try {
              const result = await supabase.storage
                .from("brand-assets")
                .createSignedUrl(ref.storage_path, 3600);
              url = result.data?.signedUrl || "";
            } catch {
              /* Keep other valid references when one upload cannot resolve. */
            }
          }
        }
        return {
          id: ref.id,
          label: ref.label,
          url: /^https?:\/\//i.test(url) || /^\/(?!\/)/.test(url) ? url : "",
          image,
        };
      }),
    )
      .then((items) => {
        if (live) setReferences(items);
      })
      .catch(() => {
        if (live) setReferences([]);
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, [brandReferences, workspace]);
  const images = references.filter((r) => r.image && r.url && !failedImages.includes(r.id));
  const unavailable = references.filter((r) => !r.url || failedImages.includes(r.id)).length;
  const failImage = (id: string) =>
    setFailedImages((ids) => (ids.includes(id) ? ids : [...ids, id]));
  const primary = /^#(?:[a-f\d]{3}|[a-f\d]{6})$/i.test(value("primaryColor"))
    ? value("primaryColor")
    : "var(--studio-soft)";
  return (
    <div className="studio-brand-guide">
      <section
        className="studio-brand-cover"
        style={{ background: primary, color: brandColorInk(primary) }}
      >
        <div>
          <span>Brand guide · {completion}% complete</span>
          <h2 style={{ fontFamily: value("primaryFont") || undefined }}>
            {value("business_name") || "Your brand, in focus."}
          </h2>
          <p>
            {value("mission") ||
              value("description") ||
              "The story, voice, and visuals that make your work yours."}
          </p>
        </div>
        {images[0] ? (
          <img src={images[0].url} alt={images[0].label} onError={() => failImage(images[0].id)} />
        ) : (
          <StudioGraphic name="brand" size={148} />
        )}
      </section>
      <section className="studio-brand-chapter">
        <span>01 / The story</span>
        <h3>{value("taglines") || "What we’re here to do."}</h3>
        <p>
          {value("description") ||
            "Add your story in Brand DNA to give every Pal the right starting point."}
        </p>
        {list("values").length > 0 && (
          <div className="studio-brand-values">
            {list("values").map((v) => (
              <strong key={v}>{v}</strong>
            ))}
          </div>
        )}
      </section>
      <section className="studio-brand-chapter">
        <span>02 / The palette</span>
        <h3>Our colors, together.</h3>
        <div className="studio-brand-swatches">
          {[
            ["Primary", "primaryColor"],
            ["Secondary", "secondaryColor"],
            ["Accent", "accentColor"],
          ].map(([label, key]) => (
            <div
              key={key}
              style={{
                background: /^#(?:[a-f\d]{3}|[a-f\d]{6})$/i.test(value(key))
                  ? value(key)
                  : "var(--studio-soft)",
                color: brandColorInk(value(key)),
              }}
            >
              <strong>{label}</strong>
              <code>{value(key) || "Not set"}</code>
            </div>
          ))}
        </div>
      </section>
      <section className="studio-brand-type">
        <div>
          <span>03 / Typography</span>
          <h3 style={{ fontFamily: value("primaryFont") || undefined }}>
            Words with
            <br />
            personality.
          </h3>
          <p>{value("primaryFont") || "Choose your typeface"}</p>
        </div>
        <div
          className="studio-brand-specimen"
          style={{ fontFamily: value("primaryFont") || undefined }}
        >
          <strong>Aa</strong>
          <span>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
            <br />
            abcdefghijklmnopqrstuvwxyz
            <br />
            0123456789
          </span>
        </div>
      </section>
      <section className="studio-brand-chapter">
        <span>04 / Voice & people</span>
        <h3>Sound like yourself.</h3>
        <div className="studio-brand-voice">
          {list("voice_traits").map((trait) => (
            <strong key={trait}>{trait}</strong>
          ))}
        </div>
        <p>{value("primary_audience") || "Describe the people your brand speaks to."}</p>
        {value("avoid_language") && (
          <div className="studio-brand-avoid">
            <strong>Language to leave out</strong>
            <p>{value("avoid_language")}</p>
          </div>
        )}
      </section>
      <section className="studio-brand-chapter">
        <span>05 / Visual direction</span>
        <h3>A feeling you can recognize.</h3>
        {images.length ? (
          <div className="studio-brand-moodboard">
            {images.map((ref) => (
              <figure key={ref.id}>
                <img
                  src={ref.url}
                  alt={ref.label}
                  onError={() => failImage(ref.id)}
                  loading="lazy"
                />
                <figcaption>{ref.label}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="studio-brand-reference-empty">
            <StudioGraphic name="image" size={88} />
            <p>
              {loading
                ? "Loading your visual references…"
                : unavailable
                  ? "Your saved references could not be previewed. They remain in Brand DNA; check the original files or links there."
                  : "Add your logos, photography, or reference images in Brand DNA. They will appear here."}
            </p>
          </div>
        )}
        {unavailable > 0 && images.length > 0 && (
          <p role="status">
            {unavailable} {unavailable === 1 ? "reference is" : "references are"} unavailable. Your
            other references are shown.
          </p>
        )}
        <p>
          {[value("photography"), value("imageStyle"), value("motion")].filter(Boolean).join(" ")}
        </p>
      </section>
      {list("proof_points").length > 0 && (
        <section className="studio-brand-chapter">
          <span>06 / Proof</span>
          <h3>Built on what’s true.</h3>
          {list("proof_points").map((proof) => (
            <p className="studio-brand-proof" key={proof}>
              <Check size={18} />
              {proof}
            </p>
          ))}
        </section>
      )}
      {references.filter((r) => !r.image && r.url).length > 0 && (
        <section className="studio-brand-files">
          <h3>Source library</h3>
          {references
            .filter((r) => !r.image && r.url)
            .map((ref) => (
              <a key={ref.id} href={ref.url} target="_blank" rel="noopener noreferrer">
                <FileText size={18} />
                {ref.label}
                <ArrowUpRight size={16} />
              </a>
            ))}
        </section>
      )}
    </div>
  );
}
