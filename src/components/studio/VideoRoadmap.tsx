import { Link } from "@tanstack/react-router";
import { ArrowRight, Film, Gauge, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { diagnoseVideoLibrary, universalVideoLibrary } from "@/lib/studio-intelligence";
import type { StudioLane } from "@/lib/studio-model";
import { useStudio } from "./StudioProvider";

const laneMeta: Record<StudioLane, { label: string; color: string; soft: string }> = {
  spotlight: { label: "Spotlight", color: "var(--spotlight)", soft: "var(--spotlight-soft)" },
  reel: { label: "Reel", color: "var(--reel)", soft: "var(--reel-soft)" },
  evergreen: { label: "Evergreen", color: "var(--evergreen)", soft: "var(--evergreen-soft)" },
  system: { label: "System", color: "var(--system)", soft: "var(--system-soft)" },
};

const statuses = [
  ["recommended", "Recommended"],
  ["planned", "Planned"],
  ["scripted", "Scripted"],
  ["ready_to_film", "Ready to film"],
  ["filmed", "Filmed"],
  ["editing", "Editing"],
  ["complete", "Complete"],
  ["refresh", "Needs refresh"],
  ["not_needed", "Not needed"],
] as const;

export function VideoRoadmap() {
  const { brand, campaigns, createIdea, updateVideoProgress, videoProgress } = useStudio();
  const [lane, setLane] = useState<"all" | StudioLane>("all");
  const [show, setShow] = useState<"priority" | "all">("priority");
  const diagnosed = useMemo(
    () =>
      diagnoseVideoLibrary(
        brand || {},
        campaigns.map((item) => item.primary_lane),
      ),
    [brand, campaigns],
  );
  const progress = new Map(videoProgress.map((item) => [item.item_key, item.status]));
  const complete = universalVideoLibrary.filter(
    (item) => progress.get(item.key) === "complete",
  ).length;
  const visible = diagnosed.filter((item, index) => {
    if (lane !== "all" && item.lane !== lane) return false;
    return show === "all" || index < 8 || progress.has(item.key);
  });
  const percent = Math.round((complete / universalVideoLibrary.length) * 100);

  async function saveAsIdea(item: (typeof diagnosed)[number]) {
    try {
      await createIdea({
        body: item.prompt,
        sourceType: "recommended",
        lane: item.lane,
        businessProblem: item.problem,
      });
      await updateVideoProgress(item.key, "planned");
      toast.success("Added to Content ideas and marked planned.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not plan this video.");
    }
  }

  return (
    <div className="mx-auto max-w-[90rem]">
      <header className="grid gap-4 border-b border-border pb-5 lg:grid-cols-[1fr_18rem] lg:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-[-.05em] sm:text-4xl">Video roadmap</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            A living checklist based on Brand DNA, the problems each video solves, and the work
            already in motion.
          </p>
        </div>
        <div className="rounded-xl border border-system/30 bg-system-soft px-4 py-3">
          <div className="flex items-center justify-between gap-3 text-xs">
            <p className="font-semibold">Library health</p>
            <span className="font-mono font-semibold text-system">{percent}%</span>
          </div>
          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-white"
            role="progressbar"
            aria-label="Video library completion"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
          >
            <span
              className="block h-full w-full origin-left bg-system"
              style={{ transform: `scaleX(${percent / 100})` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {complete} of {universalVideoLibrary.length} complete
          </p>
        </div>
      </header>

      <section aria-label="Filter video roadmap" className="mt-5 flex flex-wrap items-end gap-3">
        <label className="min-w-0 flex-1 sm:max-w-52">
          <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
            Content lane
          </span>
          <select
            value={lane}
            onChange={(event) => setLane(event.target.value as "all" | StudioLane)}
            className="min-h-11 w-full rounded-xl border border-border bg-white px-3 text-sm font-semibold"
          >
            <option value="all">All lanes</option>
            {(["spotlight", "reel", "evergreen", "system"] as const).map((value) => (
              <option key={value} value={value}>
                {laneMeta[value].label}
              </option>
            ))}
          </select>
        </label>
        <div
          className="grid shrink-0 grid-cols-2 rounded-xl border border-border bg-white p-1"
          aria-label="Roadmap scope"
        >
          {(["priority", "all"] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={show === value}
              onClick={() => setShow(value)}
              className={`min-h-11 rounded-lg px-3 text-xs font-semibold ${show === value ? "bg-system-soft text-system" : "text-muted-foreground"}`}
            >
              {value === "priority" ? "For you first" : "Master list"}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        {visible.map((item, index) => {
          const meta = laneMeta[item.lane];
          const status = progress.get(item.key) || "recommended";
          return (
            <article
              key={item.key}
              className="rounded-[1.25rem] border border-border bg-white p-5 transition hover:border-ink sm:p-6"
            >
              <div className="flex items-start gap-4">
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-xl"
                  style={{ background: meta.soft, color: meta.color }}
                >
                  <Film className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="text-[9px] font-black uppercase tracking-[.12em]"
                      style={{ color: meta.color }}
                    >
                      {meta.label}
                    </span>
                    <span className="text-[9px] text-muted-foreground">{item.category}</span>
                    {index < 3 ? (
                      <span className="rounded-full bg-reel-soft px-2 py-1 text-[8px] font-black uppercase tracking-[.08em] text-reel">
                        High priority
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mt-3 text-xl font-black">{item.title}</h2>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-mist p-4">
                  <p className="text-[9px] font-black uppercase tracking-[.12em] text-muted-foreground">
                    Problem it solves
                  </p>
                  <p className="mt-2 text-sm font-bold leading-relaxed">{item.problem}</p>
                </div>
                <div className="rounded-xl p-4" style={{ background: meta.soft }}>
                  <p
                    className="text-[9px] font-black uppercase tracking-[.12em]"
                    style={{ color: meta.color }}
                  >
                    Useful outcome
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">{item.outcome}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                <strong className="text-ink">Start here:</strong> {item.prompt}
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <label className="min-w-0 flex-1">
                  <span className="sr-only">Status for {item.title}</span>
                  <select
                    value={status}
                    onChange={(event) => void updateVideoProgress(item.key, event.target.value)}
                    className="min-h-12 w-full rounded-xl border border-border bg-white px-3 text-xs font-bold"
                  >
                    {statuses.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  onClick={() => void saveAsIdea(item)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold text-white"
                  style={{ background: meta.color }}
                >
                  <Sparkles className="size-4" /> Plan this
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <section className="mt-6 grid gap-4 rounded-[1.25rem] border border-border bg-white p-5 md:grid-cols-[auto_1fr_auto] md:items-center">
        <span className="grid size-12 place-items-center rounded-xl bg-spotlight-soft text-spotlight">
          <Gauge className="size-5" />
        </span>
        <div>
          <p className="font-black">The roadmap gets sharper as Brand DNA gets stronger.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Proof, offers, audience questions, and approved chat memory change the order—not the
            universal foundation.
          </p>
        </div>
        <Link to="/studio/brand" className="secondary-action">
          Strengthen Brand DNA <ArrowRight className="size-4" />
        </Link>
      </section>
    </div>
  );
}
