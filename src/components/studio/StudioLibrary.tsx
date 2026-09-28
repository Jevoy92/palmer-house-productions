import { Link, useSearch, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Search, Grid2X2, List, Heart, Download, Pencil } from "lucide-react";
import { toast } from "sonner";
import { useStudio } from "./StudioProvider";
import { StudioGraphic } from "./StudioGraphic";
import { StudioAssetVisual, studioAssetLabel } from "./StudioAssetVisual";
import { StudioChatEditor } from "./StudioChatArtifacts";
import "./studio-chat.css";
import { StudioCopyButton } from "./StudioAssetActions";
import { useGuide } from "./useGuide";
import { PalAvatar } from "./PalAvatar";
import "./studio-library.css";

export function StudioLibrary() {
  const { assets, campaigns, workspace, getArtifactUrl } = useStudio();
  const navigate = useNavigate();
  const { guide } = useGuide();
  const [selected, setSelected] = useState<{ id: string; mode: "preview" | "edit" } | null>(null);
  const search = useSearch({ strict: false }) as { q?: string };
  const [query, setQuery] = useState(search.q || "");
  const [filter, setFilter] = useState("All");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [downloading, setDownloading] = useState<string | null>(null);
  const favoriteKey = `phs.library.favorites.${workspace?.id || "guest"}`;
  useEffect(() => {
    setQuery(search.q || "");
  }, [search.q]);
  useEffect(() => {
    try {
      const value = JSON.parse(localStorage.getItem(favoriteKey) || "[]");
      setFavorites(Array.isArray(value) ? value.filter((v) => typeof v === "string") : []);
    } catch {
      setFavorites([]);
    }
  }, [favoriteKey]);
  const visible = useMemo(
    () =>
      assets.filter((a) => {
        const type =
          filter === "All" ||
          (filter === "Posts" && /post|caption|carousel/.test(a.kind)) ||
          (filter === "Images" && a.kind === "image") ||
          (filter === "Articles" && /article|blog|newsletter|faq/.test(a.kind)) ||
          (filter === "Scripts" && /script/.test(a.kind)) ||
          (filter === "Documents" && /document|pdf/.test(a.kind)) ||
          (filter === "Saved" && favorites.includes(a.id));
        return type && `${a.title} ${a.content}`.toLowerCase().includes(query.toLowerCase());
      }),
    [assets, filter, query, favorites],
  );
  function favorite(id: string) {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
      try {
        localStorage.setItem(favoriteKey, JSON.stringify(next));
      } catch {
        /* Keep visit usable. */
      }
      return next;
    });
  }
  async function download(id: string) {
    setDownloading(id);
    try {
      const url = await getArtifactUrl(id);
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.click();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not open this file.");
    } finally {
      setDownloading(null);
    }
  }
  return (
    <div className={`studio-library-layout ${selected ? "has-editor" : ""}`}>
      <div className="studio-library-page">
        <header className="studio-section-heading">
          <div>
            <h1>Library</h1>
            <p>Everything we’ve made, ready to reuse.</p>
          </div>
          <PalAvatar pal={guide} size="lg" />
        </header>
        <label className="studio-library-search">
          <Search size={21} />
          <input
            aria-label="Search library"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your content…"
          />
        </label>
        <div className="studio-filter-pills" aria-label="Filter library">
          {["All", "Posts", "Images", "Articles", "Scripts", "Documents", "Saved"].map((item) => (
            <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>
              {item}
            </button>
          ))}
        </div>
        {campaigns.length > 0 && (
          <div className="studio-library-folders">
            {campaigns.slice(0, 3).map((c) => (
              <Link key={c.id} to="/studio/campaigns/$campaignId" params={{ campaignId: c.id }}>
                <StudioGraphic name="library" size={45} />
                <span>
                  <strong>{c.title}</strong>
                  <small>{assets.filter((a) => a.campaign_id === c.id).length} drafts</small>
                </span>
                <ChevronRight size={20} />
              </Link>
            ))}
          </div>
        )}
        <div className="studio-library-sectionbar">
          <h2>{query ? "Search results" : "Recently saved"}</h2>
          <div>
            <button
              aria-label="Grid view"
              aria-pressed={layout === "grid"}
              onClick={() => setLayout("grid")}
            >
              <Grid2X2 size={19} />
            </button>
            <button
              aria-label="List view"
              aria-pressed={layout === "list"}
              onClick={() => setLayout("list")}
            >
              <List size={19} />
            </button>
          </div>
        </div>
        <div className={`studio-library-grid ${layout === "list" ? "studio-library-list" : ""}`}>
          {visible.map((asset) => (
            <article key={asset.id} className="studio-library-card">
              <button
                className="studio-library-open"
                onClick={() => setSelected({ id: asset.id, mode: "preview" })}
                aria-label={`Open ${asset.title}`}
              >
                <StudioAssetVisual asset={asset} />
              </button>
              <div className="studio-library-card-body">
                <div className="studio-library-kind">
                  <span>{studioAssetLabel(asset)}</span>
                  <button
                    aria-label={`${favorites.includes(asset.id) ? "Unsave" : "Save"} ${asset.title}`}
                    aria-pressed={favorites.includes(asset.id)}
                    onClick={() => favorite(asset.id)}
                  >
                    <Heart
                      size={16}
                      fill={favorites.includes(asset.id) ? "currentColor" : "none"}
                    />
                  </button>
                </div>
                <h3>{asset.title}</h3>
                <p>
                  {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)} ·{" "}
                  {new Date(asset.updated_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <div className="studio-library-card-actions">
                  <button
                    className="secondary-action"
                    onClick={() => setSelected({ id: asset.id, mode: "edit" })}
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                  {/^(image|document)$/.test(asset.kind) ? (
                    <button
                      className="secondary-action"
                      disabled={downloading === asset.id}
                      onClick={() => void download(asset.id)}
                      aria-label={`Download ${asset.title}`}
                    >
                      <Download size={15} />
                      {downloading === asset.id ? "Opening…" : "Download"}
                    </button>
                  ) : (
                    <StudioCopyButton content={asset.content} label="Copy text" />
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        {!visible.length && (
          <div className="studio-library-empty">
            <StudioGraphic name="library" size={144} />
            <h2>{assets.length ? "Nothing here matches yet." : "Your next idea belongs here."}</h2>
            <p>
              {assets.length
                ? "Try another search or content type."
                : "Create with your Pal. Your posts, images, articles, and scripts will stay together here."}
            </p>
            <Link to="/studio/conversations" className="primary-action">
              Start a conversation
            </Link>
          </div>
        )}
      </div>
      {selected && (
        <StudioChatEditor
          key={selected.id}
          assetId={selected.id}
          initialMode={selected.mode}
          pal={guide}
          onClose={() => setSelected(null)}
          onRefine={(prompt) => {
            void navigate({ to: "/studio/conversations", search: { prompt } });
          }}
        />
      )}
    </div>
  );
}
