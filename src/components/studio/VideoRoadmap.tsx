import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Plus } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { diagnoseVideoLibrary, universalVideoLibrary } from "@/lib/studio-intelligence";
import type { StudioLane } from "@/lib/studio-model";
import { StudioGraphic, type StudioGraphicName } from "./StudioGraphic";
import { useStudio } from "./StudioProvider";
import "./studio-support.css";

const lanes: Record<StudioLane, { label: string; purpose: string }> = {
  spotlight: { label: "Spotlight", purpose: "Build trust" },
  reel: { label: "Reel", purpose: "Get seen" },
  evergreen: { label: "Evergreen", purpose: "Share expertise" },
  system: { label: "System", purpose: "Help your team" },
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
const graphics: Record<string, StudioGraphicName> = {
  "homepage-hero": "spotlight",
  "founder-story": "spotlight",
  "why-choose-us": "brand",
  "testimonial-proof": "brand",
  "process-overview": "system",
  "keystone-question": "chat",
  "pricing-explainer": "article",
  "faq-series": "chat",
  "myth-busters": "evergreen",
  "before-after": "brand",
  "quick-wins": "ideas",
  "behind-scenes": "image",
  "customer-welcome": "library",
  "employee-onboarding": "system",
  "sop-library": "roadmap",
  "support-library": "chat",
  "offer-explainer": "spotlight",
  "objection-answer": "chat",
  "hook-first-tip": "ideas",
  "day-in-the-life": "image",
  "customer-question": "chat",
  "results-breakdown": "article",
  "partner-referral": "library",
  "annual-recap": "campaigns",
};

export function VideoRoadmap() {
  const { brand, campaigns, ideas, createIdea, updateVideoProgress, videoProgress } = useStudio();
  const [lane, setLane] = useState<"all" | StudioLane>("all");
  const [show, setShow] = useState<"priority" | "all">("priority");
  const [pending, setPending] = useState<string[]>([]);
  const [savedHere, setSavedHere] = useState<string[]>([]);
  const activeKeys = useRef(new Set<string>());
  const createdKeys = useRef(new Set<string>());
  const diagnosed = useMemo(
    () =>
      diagnoseVideoLibrary(
        brand || {},
        campaigns.map((item) => item.primary_lane),
      ),
    [brand, campaigns],
  );
  const progress = new Map(videoProgress.map((item) => [item.item_key, item]));
  const complete = universalVideoLibrary.filter(
    (item) => progress.get(item.key)?.status === "complete",
  ).length;
  const inProgress = universalVideoLibrary.filter((item) =>
    /^(planned|scripted|ready_to_film|filmed|editing)$/.test(progress.get(item.key)?.status || ""),
  ).length;
  const laneItems = diagnosed.filter((item) => lane === "all" || item.lane === lane);
  const priorityKeys = new Set(
    laneItems
      .filter((item) => !["complete", "not_needed"].includes(progress.get(item.key)?.status || ""))
      .slice(0, 8)
      .map((item) => item.key),
  );
  const visible = laneItems.filter((item) => show === "all" || priorityKeys.has(item.key));
  const hasIdea = (item: (typeof diagnosed)[number]) =>
    savedHere.includes(item.key) ||
    ideas.some(
      (idea) =>
        idea.status !== "archived" &&
        idea.source_type === "recommended" &&
        idea.body === item.prompt,
    );

  function begin(key: string) {
    if (activeKeys.current.has(key)) return false;
    activeKeys.current.add(key);
    setPending(Array.from(activeKeys.current));
    return true;
  }
  function finish(key: string) {
    activeKeys.current.delete(key);
    setPending(Array.from(activeKeys.current));
  }
  async function changeStatus(key: string, status: string) {
    if (!begin(key)) return;
    try {
      await updateVideoProgress(key, status, progress.get(key)?.campaign_id || undefined);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update this video's status.");
    } finally {
      finish(key);
    }
  }
  async function saveAsIdea(item: (typeof diagnosed)[number]) {
    if (hasIdea(item) || createdKeys.current.has(item.key) || !begin(item.key)) return;
    let created = false;
    try {
      await createIdea({
        body: item.prompt,
        sourceType: "recommended",
        lane: item.lane,
        businessProblem: item.problem,
      });
      created = true;
      createdKeys.current.add(item.key);
      setSavedHere((current) => [...current, item.key]);
      if (!progress.get(item.key) || progress.get(item.key)?.status === "recommended") {
        await updateVideoProgress(
          item.key,
          "planned",
          progress.get(item.key)?.campaign_id || undefined,
        );
      }
      toast.success("Saved to Ideas. Your starting brief is ready.");
    } catch (error) {
      toast.error(
        created
          ? "Your idea was saved, but the roadmap status could not update. You can change its status here."
          : error instanceof Error
            ? error.message
            : "Could not save this idea.",
      );
    } finally {
      finish(item.key);
    }
  }

  return (
    <div className="studio-support studio-roadmap">
      <header className="studio-roadmap-heading">
        <div>
          <p className="studio-support-kicker">Build a useful video library</p>
          <h1>Your video roadmap</h1>
          <p>
            Choose the videos that fit your business. Save a starting brief to Ideas, then build it
            into a campaign when you're ready.
          </p>
        </div>
        <div className="studio-roadmap-summary">
          <StudioGraphic name="roadmap" size={90} />
          <div>
            <strong>{complete} complete</strong>
            <span>{inProgress} in progress</span>
            <small>Based on the statuses you set</small>
          </div>
        </div>
      </header>
      <section className="studio-roadmap-filters" aria-label="Filter video roadmap">
        <label>
          <span>Purpose</span>
          <select
            value={lane}
            onChange={(event) => setLane(event.target.value as "all" | StudioLane)}
          >
            <option value="all">All purposes</option>
            {Object.entries(lanes).map(([value, meta]) => (
              <option key={value} value={value}>
                {meta.purpose} · {meta.label}
              </option>
            ))}
          </select>
        </label>
        <div className="studio-roadmap-segment" role="group" aria-label="Suggestions to show">
          {(["priority", "all"] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={show === value}
              onClick={() => setShow(value)}
            >
              {value === "priority" ? "Suggested next" : "All video ideas"}
            </button>
          ))}
        </div>
        <span className="studio-roadmap-result-count" aria-live="polite">
          {visible.length} video {visible.length === 1 ? "idea" : "ideas"}
        </span>
      </section>
      <div className="studio-roadmap-grid">
        {visible.map((item) => {
          const current = progress.get(item.key);
          const status = current?.status || "recommended";
          const busy = pending.includes(item.key);
          const saved = hasIdea(item);
          const campaign = campaigns.find((value) => value.id === current?.campaign_id);
          return (
            <article key={item.key} className="studio-roadmap-card" data-lane={item.lane}>
              <div className="studio-roadmap-card-heading">
                <StudioGraphic name={graphics[item.key] || item.lane} size={66} />
                <div>
                  <p className="studio-roadmap-category">
                    {lanes[item.lane].purpose}
                    <span>·</span>
                    {item.category}
                  </p>
                  <h2>{item.title}</h2>
                </div>
              </div>
              <p className="studio-roadmap-outcome">{item.outcome}</p>
              <p className="studio-roadmap-problem">
                <span>Useful when</span>
                {item.problem}
              </p>
              <details className="studio-roadmap-brief">
                <summary>What to cover</summary>
                <p>{item.prompt}</p>
              </details>
              <div className="studio-roadmap-card-actions">
                <label>
                  <span className="sr-only">Status for {item.title}</span>
                  <select
                    value={status}
                    disabled={busy}
                    onChange={(event) => void changeStatus(item.key, event.target.value)}
                  >
                    {!statuses.some(([value]) => value === status) && (
                      <option value={status}>{status.replaceAll("_", " ")}</option>
                    )}
                    {statuses.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                {saved ? (
                  <Link to="/studio/ideas" className="studio-support-button">
                    <Check size={15} />
                    Open in Ideas
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void saveAsIdea(item)}
                    className="studio-support-button is-primary"
                  >
                    <Plus size={15} />
                    {busy ? "Saving…" : "Save idea"}
                  </button>
                )}
              </div>
              {campaign && (
                <Link
                  to="/studio/campaigns/$campaignId"
                  params={{ campaignId: campaign.id }}
                  className="studio-roadmap-campaign"
                >
                  Continue {campaign.title}
                  <ArrowRight size={14} />
                </Link>
              )}
            </article>
          );
        })}
      </div>
      {!visible.length && (
        <div className="studio-roadmap-empty">
          <StudioGraphic name="brand" size={80} />
          <h2>You're up to date with these suggestions.</h2>
          <p>See every video idea to revisit completed work or items marked not needed.</p>
          <button type="button" className="studio-support-button" onClick={() => setShow("all")}>
            Show all video ideas
          </button>
        </div>
      )}
      <section className="studio-roadmap-brand">
        <StudioGraphic name="brand" size={60} />
        <div>
          <h2>Help the suggestions fit your business.</h2>
          <p>
            Your business description, audience, proof points, and campaign lanes help set the
            order. Keep Brand DNA up to date as your business changes.
          </p>
        </div>
        <Link to="/studio/brand" className="studio-support-link">
          Review Brand DNA
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
