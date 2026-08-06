import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { StudioLane } from "@/lib/studio-model";

export type CampaignTeaserProps = {
  business: string;
  hook: string;
  problem: string;
  promise: string;
  callToAction: string;
  lane: StudioLane;
  reducedMotion?: boolean;
};

const palettes: Record<StudioLane, { color: string; soft: string; label: string }> = {
  spotlight: { color: "#3D1A66", soft: "#EEE9F4", label: "SPOTLIGHT" },
  reel: { color: "#E8720C", soft: "#FDF1E6", label: "REEL" },
  evergreen: { color: "#5B8A2D", soft: "#EEF4E4", label: "EVERGREEN" },
  system: { color: "#0A9B8F", soft: "#E4F4F2", label: "SYSTEM" },
};

function show(frame: number, input: [number, number], reducedMotion: boolean | undefined) {
  if (reducedMotion) return 1;
  return interpolate(frame, input, [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
}

export function CampaignTeaser({
  business,
  hook,
  problem,
  promise,
  callToAction,
  lane,
  reducedMotion,
}: CampaignTeaserProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const palette = palettes[lane];
  return (
    <AbsoluteFill
      style={{
        boxSizing: "border-box",
        backgroundColor: "#FFFFFF",
        color: "#1F2328",
        fontFamily: '"Satoshi", sans-serif',
        padding: 78,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "0 0 auto",
          height: 14,
          backgroundColor: palette.color,
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: 1,
        }}
      >
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 19,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: palette.color,
          }}
        >
          — {palette.label} DIRECTION —
        </span>
        <span style={{ fontSize: 20, fontWeight: 700 }}>{business}</span>
      </div>

      <div
        style={{
          marginTop: 86,
          maxWidth: 850,
          opacity: show(frame, [12, 28], reducedMotion),
          translate: reducedMotion
            ? "0px 0px"
            : interpolate(frame, [12, 28], ["0px 32px", "0px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
        }}
      >
        <div
          style={{
            display: "inline",
            position: "relative",
            fontSize: 40,
            lineHeight: 1.2,
            color: "#6B7280",
          }}
        >
          {problem}
          <span
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "52%",
              height: 4,
              backgroundColor: palette.color,
              scale: reducedMotion
                ? "1 1"
                : `${interpolate(frame, [24, 46], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.bezier(0.16, 1, 0.3, 1),
                  })} 1`,
              transformOrigin: "left center",
            }}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: 42,
          color: palette.color,
          fontSize: 92,
          fontWeight: 850,
          lineHeight: 0.98,
          letterSpacing: "-0.055em",
          opacity: show(frame, [38, 62], reducedMotion),
          translate: reducedMotion
            ? "0px 0px"
            : interpolate(frame, [38, 62], ["-28px 0px", "0px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
        }}
      >
        {promise}
      </div>

      <div
        style={{
          marginTop: "auto",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 36,
          alignItems: "end",
          borderTop: "2px solid #E5E7EB",
          paddingTop: 34,
          opacity: show(frame, [76, 98], reducedMotion),
          translate: reducedMotion
            ? "0px 0px"
            : interpolate(frame, [76, 98], ["0px 28px", "0px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
        }}
      >
        <div>
          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              color: palette.color,
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: "0.18em",
            }}
          >
            THE OPENING LINE
          </div>
          <div
            style={{
              marginTop: 16,
              maxWidth: 700,
              fontSize: 38,
              fontWeight: 750,
              lineHeight: 1.15,
            }}
          >
            {hook}
          </div>
        </div>
        <div
          style={{
            maxWidth: 240,
            borderRadius: 999,
            backgroundColor: palette.color,
            color: "white",
            padding: "18px 26px",
            textAlign: "center",
            fontSize: 18,
            fontWeight: 750,
            opacity: show(frame, [104, 122], reducedMotion),
            scale: reducedMotion
              ? 1
              : interpolate(frame, [104, 122], [0.94, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.spring({ damping: 200, fps }),
                  output: "perceptual-scale",
                }),
          }}
        >
          {callToAction}
        </div>
      </div>
    </AbsoluteFill>
  );
}
