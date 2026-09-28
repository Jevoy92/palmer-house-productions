import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  ArrowUpRight,
  RefreshCw,
  Send,
  Plus,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import type { StudioAuthor, StudioFeedPost } from "@/lib/studio-recovery";
import { useStudio } from "./StudioProvider";
import { palDirectory } from "@/lib/pal-directory";
import { StudioGraphic } from "./StudioGraphic";
import { StudioAssetVisual } from "./StudioAssetVisual";
import "./studio-feed.css";

function safeSource(url: string) {
  return /^https?:\/\//i.test(url) || /^\/studio(?:[/?#]|$)/.test(url);
}
function FeedAvatar({ author }: { author: StudioAuthor }) {
  const { resolvePalAvatar } = useStudio();
  const [customAvatar, setCustomAvatar] = useState("");
  useEffect(() => {
    let alive = true;
    setCustomAvatar("");
    if (author.avatarPath)
      void resolvePalAvatar(author.avatarPath)
        .then((url) => {
          if (alive) setCustomAvatar(url);
        })
        .catch(() => {});
    return () => {
      alive = false;
    };
  }, [author.avatarPath, resolvePalAvatar]);
  const avatar = customAvatar || (author.pal ? palDirectory[author.pal]?.headshot : "");
  return avatar ? (
    <img className="studio-feed-avatar" src={avatar} alt="" />
  ) : (
    <span className="studio-feed-avatar studio-feed-initial">{author.name.slice(0, 1)}</span>
  );
}
function FeedThread({ post }: { post: StudioFeedPost }) {
  const {
    user,
    assets,
    feedComments,
    feedReactions,
    addFeedComment,
    setFeedReaction,
    createIdea,
    ideas,
    createCampaign,
    brand,
  } = useStudio();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState("");
  const [pending, setPending] = useState<string | null>(null);
  const pendingRef = useRef(false);
  const replies = (feedComments || []).filter((c) => c.post_id === post.id);
  const hearts = (feedReactions || []).filter(
    (r) => r.post_id === post.id && r.reaction === "love",
  );
  const loved = hearts.some((r) => r.user_id === user?.id);
  const saved = ideas.some(
    (i) =>
      i.status !== "archived" &&
      i.source_type === "recommended" &&
      i.body === `${post.title}\n\n${post.body}`,
  );
  const asset = assets.find((a) => a.id === post.asset_id);
  async function action(kind: string, fn: () => Promise<unknown>) {
    if (pendingRef.current) return;
    pendingRef.current = true;
    setPending(kind);
    try {
      await fn();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save that change.");
    } finally {
      pendingRef.current = false;
      setPending(null);
    }
  }
  async function saveIdea() {
    await action("save", async () => {
      await createIdea({
        body: `${post.title}\n\n${post.body}`,
        sourceType: "recommended",
        sourceUrl: post.sources.find((source) => safeSource(source.url))?.url,
        lane: post.lane,
        businessProblem: post.title || post.body.slice(0, 180),
      });
      toast.success("Saved to Ideas.");
    });
  }
  async function campaign() {
    await action("campaign", async () => {
      const audience = brand?.primary_audience?.trim() || "";
      if (audience.length < 3)
        throw new Error("Add your audience in Brand DNA before building a campaign.");
      const topic = [post.title, post.body].filter(Boolean).join("\n\n").slice(0, 1200);
      if (topic.length < 8) throw new Error("Add a little more detail to this idea first.");
      const id = await createCampaign({
        title: (post.title || post.body).slice(0, 120),
        goal: (brand?.primary_goal || post.title || post.body).slice(0, 180),
        topic,
        offer: Array.isArray(brand?.offers)
          ? brand.offers
              .filter((x) => typeof x === "string")
              .join(", ")
              .slice(0, 500)
          : "",
        audience: audience.slice(0, 800),
        anchorFormat: "campaign_story",
        depth: "strategic",
      });
      void navigate({ to: "/studio/campaigns/$campaignId", params: { campaignId: id } });
    });
  }
  return (
    <article className="studio-feed-thread">
      <header>
        <FeedAvatar author={post.author} />
        <div>
          <strong>{post.author.name}</strong>
          <span>
            {post.author.kind === "pal" ? "Your creative team" : "Workspace member"} ·{" "}
            {new Date(post.created_at).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
        <span className="studio-feed-lane">{post.lane}</span>
      </header>
      <div className="studio-feed-thread-content">
        {post.title && <h2>{post.title}</h2>}
        <p>{post.body}</p>
        {asset && (
          <div className="studio-feed-linked-asset">
            <StudioAssetVisual asset={asset} />
            <strong>{asset.title}</strong>
          </div>
        )}
        {post.sources.length > 0 && (
          <div className="studio-feed-sources">
            {post.sources
              .filter((source) => safeSource(source.url))
              .map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.label}
                  <ArrowUpRight size={13} />
                </a>
              ))}
          </div>
        )}
      </div>
      {replies
        .filter((c) => c.author.kind === "pal")
        .slice(0, expanded ? replies.length : 2)
        .map((reply) => (
          <div key={reply.id} className="studio-feed-reply">
            <FeedAvatar author={reply.author} />
            <div>
              <strong>{reply.author.name}</strong>
              <p>{reply.body}</p>
            </div>
          </div>
        ))}
      <div className="studio-feed-actions">
        <button
          disabled={!!pending}
          aria-label={loved ? "Remove heart" : "Heart this idea"}
          aria-pressed={loved}
          onClick={() => void action("love", () => setFeedReaction(post.id, "love", !loved))}
        >
          <Heart size={18} fill={loved ? "currentColor" : "none"} />
          {hearts.length || "Like"}
        </button>
        <button onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
          <MessageCircle size={18} />
          {replies.filter((c) => c.author.kind === "member").length || "Comment"}
        </button>
        <button disabled={saved || !!pending} onClick={() => void saveIdea()}>
          <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
          {saved ? "Saved" : pending === "save" ? "Saving…" : "Save idea"}
        </button>
        <button
          disabled={!!pending}
          onClick={() => void campaign()}
          aria-label={`Build campaign from ${post.title || "this idea"}`}
        >
          <Plus size={18} />
          <span>{pending === "campaign" ? "Building…" : "Campaign"}</span>
        </button>
      </div>
      {expanded && (
        <div className="studio-feed-comments">
          {replies
            .filter((c) => c.author.kind === "member")
            .map((reply) => (
              <div key={reply.id} className="studio-feed-reply">
                <FeedAvatar author={reply.author} />
                <div>
                  <strong>{reply.author.name}</strong>
                  <p>{reply.body}</p>
                </div>
              </div>
            ))}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void action("comment", async () => {
                await addFeedComment(post.id, comment.trim());
                setComment("");
              });
            }}
          >
            <label className="sr-only" htmlFor={`comment-${post.id}`}>
              Comment on {post.title || "this idea"}
            </label>
            <input
              id={`comment-${post.id}`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Join the conversation…"
              maxLength={2000}
            />
            <button type="submit" aria-label="Post comment" disabled={!comment.trim() || !!pending}>
              <Send size={17} />
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
export function StudioFeed() {
  const { feedPosts, recoveryError, refreshPalFeed, createFeedPost } = useStudio();
  const [refreshing, setRefreshing] = useState(false);
  const [posting, setPosting] = useState(false);
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState("all");
  async function refresh() {
    setRefreshing(true);
    try {
      await refreshPalFeed();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Your Pals couldn’t update the feed.");
    } finally {
      setRefreshing(false);
    }
  }
  async function post() {
    setPosting(true);
    try {
      await createFeedPost({ body: draft.trim() });
      setDraft("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not share this thought.");
    } finally {
      setPosting(false);
    }
  }
  const posts = (feedPosts || []).filter((p) => filter === "all" || p.lane === filter);
  return (
    <div className="studio-feed-layout">
      <section className="studio-feed-main">
        <header className="studio-section-heading">
          <div>
            <h1>For you</h1>
            <p>A few minds. Your next good idea.</p>
          </div>
          <button
            className="studio-icon-button"
            aria-label="Refresh Pal ideas"
            disabled={refreshing}
            onClick={() => void refresh()}
          >
            <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
          </button>
        </header>
        <div className="studio-filter-pills" aria-label="Filter feed">
          {[
            ["all", "For you"],
            ["reel", "Reel"],
            ["spotlight", "Spotlight"],
            ["system", "System"],
            ["evergreen", "Evergreen"],
          ].map(([value, label]) => (
            <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>
              {label}
            </button>
          ))}
        </div>
        <form
          className="studio-feed-compose"
          onSubmit={(e) => {
            e.preventDefault();
            void post();
          }}
        >
          <textarea
            aria-label="Share a thought with your Pals"
            placeholder="Something on your mind? Bring it to the table…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={4000}
          />
          <button className="primary-action" disabled={!draft.trim() || posting} type="submit">
            {posting ? "Sharing…" : "Share thought"}
            <ArrowRight size={15} />
          </button>
        </form>
        {recoveryError && (
          <p className="studio-feed-error" role="alert">
            {recoveryError}
          </p>
        )}
        {refreshing && (
          <div className="studio-feed-working" role="status">
            <div>
              {["clara", "kiana", "ryder"].map((p) => (
                <img key={p} src={palDirectory[p as keyof typeof palDirectory].headshot} alt="" />
              ))}
            </div>
            <span>Your Pals are reading your workspace and finding an angle…</span>
          </div>
        )}
        {posts.map((post) => (
          <FeedThread key={post.id} post={post} />
        ))}
        {!posts.length && !refreshing && (
          <div className="studio-library-empty">
            <StudioGraphic name="feed" size={150} />
            <h2>Your team has a place to think.</h2>
            <p>
              Invite the Pals to explore your Brand DNA, saved ideas, campaigns, and calendar. Save
              the ideas you want to take further.
            </p>
            <button
              className="primary-action"
              onClick={() => void refresh()}
              disabled={!!recoveryError}
            >
              Find our next idea
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </section>
      <aside className="studio-feed-aside">
        <div className="studio-feed-team">
          {["kiana", "ryder", "clara", "samira"].map((p) => (
            <img
              key={p}
              src={palDirectory[p as keyof typeof palDirectory].headshot}
              alt={palDirectory[p as keyof typeof palDirectory].name}
            />
          ))}
        </div>
        <h2>
          Different perspectives.
          <br />
          One shared Studio.
        </h2>
        <p>
          Your Pals build on your actual work. Bring a thought, save a spark, or turn a conversation
          into a campaign.
        </p>
        <Link to="/studio/ideas">
          See your saved ideas
          <ArrowUpRight size={16} />
        </Link>
        <StudioGraphic name="ideas" size={140} />
      </aside>
    </div>
  );
}
