import { studioCreditOperations } from "@/lib/studio-credits";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  ArrowUpRight,
  RefreshCw,
  Send,
  Plus,
  ArrowRight,
  Check,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import type { StudioAuthor, StudioFeedPost } from "@/lib/studio-recovery";
import { useStudio } from "./StudioProvider";
import { palDirectory } from "@/lib/pal-directory";
import { StudioGraphic } from "./StudioGraphic";
import { StudioAssetVisual } from "./StudioAssetVisual";
import { StudioFilterPills } from "./StudioFilterPills";
import { useStudioMotion } from "./studio-motion";
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
  const avatar = customAvatar || (author.pal ? palDirectory[author.pal]?.avatar : "");
  return avatar ? (
    <img className="studio-feed-avatar" src={avatar} alt="" />
  ) : (
    <span className="studio-feed-avatar studio-feed-initial">{author.name.slice(0, 1)}</span>
  );
}
function FeedThread({ post, index }: { post: StudioFeedPost; index: number }) {
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
  const { reduceMotion, transition, fadeTransition } = useStudioMotion();
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState("");
  const [pending, setPending] = useState<string | null>(null);
  const pendingRef = useRef(false);
  const commentRef = useRef<HTMLInputElement>(null);
  const commentTrigger = useRef<HTMLButtonElement>(null);
  const [actionError, setActionError] = useState("");
  useEffect(() => {
    if (expanded) commentRef.current?.focus({ preventScroll: true });
  }, [expanded]);
  const replies = (feedComments || [])
    .filter((c) => c.post_id === post.id)
    .sort((x, y) => String(x.created_at).localeCompare(String(y.created_at)));
  const [showAll, setShowAll] = useState(false);
  const visibleReplies = showAll ? replies : replies.slice(-3);
  const firstVisibleReply = replies.length - visibleReplies.length;
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
    setActionError("");
    try {
      await fn();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Could not save that change.";
      setActionError(message);
      toast.error(message);
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
    <motion.article
      className="studio-feed-thread"
      data-avatar-side={index % 2 === 0 ? "left" : "right"}
      layout={reduceMotion ? false : "position"}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ ...fadeTransition, layout: transition }}
    >
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
      {replies.length > 3 && !showAll ? (
        <button type="button" className="studio-feed-earlier" onClick={() => setShowAll(true)}>
          Show {replies.length - 3} earlier {replies.length - 3 === 1 ? "reply" : "replies"}
        </button>
      ) : null}
      {visibleReplies.map((reply, replyIndex) => (
        <div
          key={reply.id}
          className="studio-feed-reply"
          data-avatar-side={
            (index + firstVisibleReply + replyIndex + 1) % 2 === 0 ? "left" : "right"
          }
        >
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
          aria-busy={pending === "love"}
          onClick={() => void action("love", () => setFeedReaction(post.id, "love", !loved))}
        >
          <motion.span
            initial={false}
            animate={{ scale: loved && !reduceMotion ? [1, 1.2, 1] : 1 }}
            transition={fadeTransition}
          >
            <Heart size={18} fill={loved ? "currentColor" : "none"} />
          </motion.span>
          {hearts.length || "Like"}
        </button>
        <button
          ref={commentTrigger}
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={`feed-comments-${post.id}`}
          aria-label={expanded ? "Close comments" : "Open comments"}
        >
          <MessageCircle size={18} />
          {replies.length || "Reply"}
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="studio-feed-more"
              aria-label="More actions"
              aria-busy={pending === "save" || pending === "campaign"}
            >
              {saved ? <Check size={18} /> : <MoreHorizontal size={18} />}
              <span>
                {pending === "campaign"
                  ? "Building…"
                  : pending === "save"
                    ? "Saving…"
                    : "More"}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-56">
            <DropdownMenuItem disabled={saved || !!pending} onSelect={() => void saveIdea()}>
              {saved ? <Check size={16} /> : <Bookmark size={16} />}
              {saved ? "Saved to ideas" : "Save idea"}
            </DropdownMenuItem>
            <DropdownMenuItem disabled={!!pending} onSelect={() => void campaign()}>
              <Plus size={16} />
              Build campaign · {studioCreditOperations.campaign.credits} credits
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <motion.div
        className="studio-feed-comments"
        id={`feed-comments-${post.id}`}
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={fadeTransition}
        inert={!expanded}
        aria-hidden={!expanded}
        onKeyDown={(event) => {
          if (event.key !== "Escape") return;
          event.preventDefault();
          setExpanded(false);
          commentTrigger.current?.focus();
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!comment.trim() || pendingRef.current) return;
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
            ref={commentRef}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Join the conversation…"
            maxLength={2000}
            disabled={pending === "comment"}
          />
          <button type="submit" aria-label="Post comment" disabled={!comment.trim() || !!pending}>
            <Send size={17} />
          </button>
        </form>
      </motion.div>
      {actionError && (
        <p className="studio-feed-action-error" role="alert">
          {actionError}
        </p>
      )}
    </motion.article>
  );
}
export function StudioFeed() {
  const {
    feedPosts,
    recoveryError,
    refreshPalFeed,
    createFeedPost,
    feedGenerating,
    feedGenerationError,
  } = useStudio();
  const [refreshing, setRefreshing] = useState(false);
  const [posting, setPosting] = useState(false);
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState("all");
  const feedRef = useRef<HTMLElement>(null);
  const { reduceMotion, fadeTransition } = useStudioMotion();
  const postingRef = useRef(false);
  const refreshingRef = useRef(false);
  const working = refreshing || feedGenerating;
  async function refresh() {
    if (refreshingRef.current || feedGenerating) return;
    refreshingRef.current = true;
    setRefreshing(true);
    try {
      await refreshPalFeed();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Your Pals couldn’t update the feed.");
    } finally {
      refreshingRef.current = false;
      setRefreshing(false);
    }
  }
  async function post() {
    if (!draft.trim() || postingRef.current) return;
    postingRef.current = true;
    setPosting(true);
    try {
      await createFeedPost({ body: draft.trim() });
      setDraft("");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not share this thought.");
    } finally {
      postingRef.current = false;
      setPosting(false);
    }
  }
  const posts = (feedPosts || []).filter((p) => filter === "all" || p.lane === filter);
  return (
    <div className="studio-feed-layout">
      <section className="studio-feed-main" ref={feedRef}>
        <header className="studio-section-heading">
          <div>
            <h1>For you</h1>
            <p>A few minds. Your next good idea.</p>
          </div>
          <button
            className="studio-icon-button"
            aria-label="Refresh Pal ideas"
            title={`${studioCreditOperations.feed.credits} credits for a fresh discussion`}
            disabled={working}
            onClick={() => void refresh()}
          >
            <RefreshCw size={18} className={working ? "animate-spin" : ""} />
          </button>
        </header>
        <p className="studio-credit-note text-xs text-muted-foreground">
          Refresh ideas · {studioCreditOperations.feed.credits} credits. Automatic suggestions have
          a separate limit.
        </p>
        <StudioFilterPills
          label="Filter feed"
          value={filter}
          onChange={setFilter}
          options={[
            ["all", "For you"],
            ["reel", "Reel"],
            ["spotlight", "Spotlight"],
            ["system", "System"],
            ["evergreen", "Evergreen"],
          ].map(([value, label]) => ({ value, label }))}
        />
        <p className="sr-only" role="status">
          {posts.length} {posts.length === 1 ? "idea" : "ideas"} in this feed.
        </p>
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
            disabled={posting}
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
        {feedGenerationError && !recoveryError && !working && (
          <div className="studio-feed-generation-note" role="status">
            <p>{feedGenerationError}</p>
            <button className="studio-feed-text-action" onClick={() => void refresh()}>
              Try again
            </button>
          </div>
        )}
        {working && (
          <motion.div
            className="studio-feed-working"
            role="status"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={fadeTransition}
          >
            <div>
              {["clara", "kiana", "ryder"].map((p) => (
                <img key={p} src={palDirectory[p as keyof typeof palDirectory].avatar} alt="" />
              ))}
            </div>
            <span>Your Pals are reading your workspace and finding an angle…</span>
          </motion.div>
        )}
        <AnimatePresence initial={false}>
          {posts.map((post, index) => (
            <FeedThread key={post.id} post={post} index={index} />
          ))}
        </AnimatePresence>
        {!posts.length && !working && (
          <div className="studio-library-empty">
            <StudioGraphic name="feed" size={150} />
            <h2>
              {filter === "all"
                ? "Your team has a place to think."
                : "A fresh angle is still ahead."}
            </h2>
            <p>
              Your Pals check your Brand DNA, saved work, and recent conversations when you visit.
              Useful discussions will land here, ready to take further.
            </p>
            {filter !== "all" ? (
              <button
                className="primary-action"
                onClick={() => {
                  setFilter("all");
                  feedRef.current
                    ?.querySelector<HTMLButtonElement>(".studio-filter-pills button")
                    ?.focus();
                }}
              >
                See all ideas <ArrowRight size={16} />
              </button>
            ) : (
              <button
                className="primary-action"
                onClick={() => void refresh()}
                disabled={!!recoveryError}
              >
                Check for fresh ideas
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        )}
      </section>
      <aside className="studio-feed-aside">
        <div className="studio-feed-team">
          {["kiana", "ryder", "clara", "samira"].map((p) => (
            <img
              key={p}
              src={palDirectory[p as keyof typeof palDirectory].avatar}
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
