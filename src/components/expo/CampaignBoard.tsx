import { useState, type ReactNode } from "react";
import { ArrowLeft, CheckCircle2, Columns3, LayoutGrid, Maximize2 } from "lucide-react";
import type { ArtifactType } from "@/lib/expo-demo-types";
import "./campaign-board.css";

export type CampaignBoardItem = {
  id: string;
  kind: ArtifactType;
  label: string;
  aspect: string;
  preview: ReactNode;
  onOpen: () => void;
};

const filters = ["All", "Posts", "Images", "Scripts", "Carousels"] as const;
export function CampaignBoard({
  business,
  headline,
  items,
  layout,
  onLayoutChange,
  onBack,
  statusLabel = "Ready to review",
}: {
  business: string;
  headline: string;
  items: CampaignBoardItem[];
  layout: "vertical" | "horizontal";
  onLayoutChange: (layout: "vertical" | "horizontal") => void;
  onBack?: () => void;
  statusLabel?: string;
}) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = items.filter(
    (item) =>
      filter === "All" ||
      (filter === "Posts" && ["instagram", "linkedin", "extra"].includes(item.kind)) ||
      (filter === "Images" && ["instagram", "youtube"].includes(item.kind)) ||
      (filter === "Scripts" && ["reel", "extra"].includes(item.kind)) ||
      (filter === "Carousels" && item.kind === "carousel"),
  );
  return (
    <section className="cp-board" aria-label="Campaign board">
      <div className="cp-breadcrumb">
        <span>{business.replace(/\s*\(example\)/gi, "")}</span>
        <span>/</span>
        <span>{headline}</span>
        {onBack ? (
          <button type="button" onClick={onBack}>
            <ArrowLeft size={14} /> Back to chat
          </button>
        ) : null}
      </div>
      <div className="cp-heading">
        <h1>
          Your business. A whole <em>campaign.</em>
        </h1>
        <span className="cp-ready">
          <CheckCircle2 size={15} />
          {statusLabel}
        </span>
      </div>
      <div className="cp-toolbar">
        <div className="cp-filters" role="group" aria-label="Filter campaign pieces">
          {filters.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="cp-layouts" role="group" aria-label="Card layout">
          <button
            type="button"
            aria-label="Vertical card layout"
            aria-pressed={layout === "vertical"}
            onClick={() => onLayoutChange("vertical")}
          >
            <LayoutGrid size={15} />
            <span>Vertical</span>
          </button>
          <button
            type="button"
            aria-label="Horizontal card layout"
            aria-pressed={layout === "horizontal"}
            onClick={() => onLayoutChange("horizontal")}
          >
            <Columns3 size={15} />
            <span>Horizontal</span>
          </button>
        </div>
      </div>
      <div
        className={`cp-cards cp-${layout} ${filter !== "All" || new Set(visible.map((item) => item.kind)).size !== visible.length ? "cp-filtered" : ""}`}
      >
        {visible.map((item) => (
          <article className={`cp-card cp-kind-${item.kind}`} key={item.id}>
            <header>
              <span>
                <strong>{item.label}</strong>
                <small>{item.aspect}</small>
              </span>
              <button type="button" onClick={item.onOpen} aria-label={`Expand ${item.label}`}>
                <Maximize2 size={15} />
              </button>
            </header>
            <div className="cp-card-preview">{item.preview}</div>
          </article>
        ))}
      </div>
      {!visible.length ? <p className="cp-empty">No pieces in this category yet.</p> : null}
    </section>
  );
}
