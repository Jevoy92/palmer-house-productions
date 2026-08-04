import { Player } from "@remotion/player";
import { useReducedMotion } from "motion/react";
import type { CampaignTeaserProps } from "@/remotion/CampaignTeaser";
import { CampaignTeaser } from "@/remotion/CampaignTeaser";

export function CampaignMotionPreview(props: Omit<CampaignTeaserProps, "reducedMotion">) {
  const reduce = useReducedMotion();
  return (
    <div className="overflow-hidden rounded-[2rem] border border-border bg-white p-3 shadow-soft">
      <div className="mb-3 flex items-center justify-between gap-4 px-2 pt-1">
        <div>
          <p className="studio-eyebrow text-system">Motion direction</p>
          <p className="mt-1 text-sm font-black">Preview the campaign’s visual spine</p>
        </div>
        <span className="rounded-full bg-mist px-3 py-1 font-mono text-[8px] uppercase tracking-[.14em] text-muted-foreground">
          Editable preview
        </span>
      </div>
      <Player
        component={CampaignTeaser}
        inputProps={{ ...props, reducedMotion: Boolean(reduce) }}
        durationInFrames={180}
        compositionWidth={1080}
        compositionHeight={1080}
        fps={30}
        controls={!reduce}
        autoPlay={false}
        loop={false}
        clickToPlay={!reduce}
        spaceKeyToPlayOrPause={!reduce}
        style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: "1.25rem", overflow: "hidden" }}
      />
      <p className="px-2 pb-1 pt-3 text-xs leading-relaxed text-muted-foreground">
        This is a direction check, not a finished video. Edit the hook and CTA before production.
      </p>
    </div>
  );
}
