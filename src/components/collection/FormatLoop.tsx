import type { CSSProperties } from "react";
import { packagePreviews } from "@/lib/package-previews";
import "./format-loop.css";

/** Silent looping graphic that explains a package format. No footage, no people. */
export function FormatLoop({ id, name }: { id: string; name: string }) {
  const p = packagePreviews[id];
  if (!p) return null;
  const n = p.beats.length;
  return (
    <div
      className={`fl fl-${p.layout}`}
      role="img"
      aria-label={`${name} format preview: ${p.heading}, ${p.beats.join(", ")}`}
      style={
        {
          "--fl-color": `var(--${p.lane})`,
          "--fl-soft": `var(--${p.lane}-soft)`,
          "--fl-n": n,
        } as CSSProperties
      }
    >
      <div className="fl-frame" aria-hidden="true">
        <div className="fl-head">
          <span className="fl-dot" />
          <strong>{p.heading}</strong>
        </div>
        <ol className="fl-beats">
          {p.beats.map((b, i) => (
            <li key={b} style={{ "--i": i } as CSSProperties}>
              <span className="fl-mark">{p.layout === "steps" ? i + 1 : ""}</span>
              <span>{b}</span>
            </li>
          ))}
        </ol>
        <div className="fl-progress">
          <span />
        </div>
      </div>
    </div>
  );
}
