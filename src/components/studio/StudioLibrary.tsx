import { Link, useSearch, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, Search, Grid2X2, List, Heart, Download, Pencil, X } from "lucide-react";
import { toast } from "sonner";
import { useStudio } from "./StudioProvider";
import { StudioGraphic } from "./StudioGraphic";
import { StudioAssetVisual, studioAssetLabel } from "./StudioAssetVisual";
import { StudioChatEditor } from "./StudioChatArtifacts";
import "./studio-chat.css";
import { StudioCopyButton } from "./StudioAssetActions";
import { useGuide } from "./useGuide";
import { PalAvatar } from "./PalAvatar";
import { StudioFilterPills } from "./StudioFilterPills";
import { useStudioMotion } from "./studio-motion";
import "./studio-library.css";

export function StudioLibrary() {
  const { assets, campaigns, workspace, getArtifactUrl } = useStudio();
  const navigate = useNavigate();
  const { guide } = useGuide();
  const { reduceMotion, transition, fadeTransition } = useStudioMotion();
  const searchRef = useRef<HTMLInputElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [announcement, setAnnouncement] = useState("");
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
  function favorite(id: string, title: string) {
    const removing = favorites.includes(id);
    if (removing && filter === "Saved") {
      pageRef.current
        ?.querySelector<HTMLButtonElement>('.studio-filter-pills button[aria-pressed="true"]')
        ?.focus();
    }
    setAnnouncement(`${title} ${removing ? "removed from" : "added to"} Saved.`);
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
      <div className="studio-library-page" ref={pageRef}>
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
            ref={searchRef}
            aria-label="Search library"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your content…"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery("");
                searchRef.current?.focus();
              }}
            >
              <X size={17} />
            </button>
          )}
        </label>
        <StudioFilterPills
          label="Filter library"
          value={filter}
          onChange={setFilter}
          options={["All", "Posts", "Images", "Articles", "Scripts", "Documents", "Saved"].map(
            (value) => ({ value, label: value }),
          )}
        />
        <p className="sr-only" role="status">
          {announcement}
        </p>
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
          <h2>
            {query ? "Search results" : filter === "Saved" ? "Your saved picks" : "Recently saved"}
            <span className="studio-library-result-count" role="status">
              {visible.length} {visible.length === 1 ? "item" : "items"}
            </span>
          </h2>
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
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((asset) => (
              <motion.article
                key={asset.id}
                className="studio-library-card"
                layout={reduceMotion ? false : "position"}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
                transition={{ ...fadeTransition, layout: transition }}
              >
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
                      onClick={() => favorite(asset.id, asset.title)}
                    >
                      <motion.span
                        initial={false}
                        animate={{
                          scale: !reduceMotion && favorites.includes(asset.id) ? [1, 1.18, 1] : 1,
                        }}
                        transition={fadeTransition}
                      >
                        <Heart
                          size={16}
                          fill={favorites.includes(asset.id) ? "currentColor" : "none"}
                        />
                      </motion.span>
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
              </motion.article>
            ))}
          </AnimatePresence>
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
            {assets.length ? (
              <button
                className="primary-action"
                onClick={() => {
                  setQuery("");
                  setFilter("All");
                  searchRef.current?.focus();
                }}
              >
                Clear filters
              </button>
            ) : (
              <Link to="/studio/conversations" className="primary-action">
                Start a conversation
              </Link>
            )}
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
