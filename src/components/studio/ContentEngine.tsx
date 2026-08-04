import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  AtSign,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Clipboard,
  Copy,
  Facebook,
  FileStack,
  Heart,
  Image as ImageIcon,
  Instagram,
  Linkedin,
  LoaderCircle,
  MessageCircle,
  Music2,
  Play,
  RefreshCw,
  Save,
  Send,
  Share2,
  Sparkles,
  ThumbsUp,
  WandSparkles,
  Youtube,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import clara from "@/assets/pal-headshots/clara.png";
import kiana from "@/assets/pal-headshots/kiana.png";
import ryder from "@/assets/pal-headshots/ryder.png";
import samira from "@/assets/pal-headshots/samira.png";
import engineFlow from "@/assets/studio-visuals/content-engine-flow.png";
import systemMap from "@/assets/studio-visuals/content-system-map.png";
import {
  contentPlatforms,
  studioGoals,
  type ContentDirection,
  type ContentPlatform,
  type PlatformPost,
} from "@/lib/studio-model";
import { useStudio } from "./StudioProvider";

const platformMeta: Record<
  ContentPlatform,
  { label: string; icon: typeof Youtube; color: string; formats: string }
> = {
  youtube: {
    label: "YouTube",
    icon: Youtube,
    color: "#ff0033",
    formats: "Video · Short · Community poll",
  },
  instagram: {
    label: "Instagram",
    icon: Instagram,
    color: "#c13584",
    formats: "Reel · Story · Carousel · Poll · Quiz",
  },
  tiktok: {
    label: "TikTok",
    icon: Music2,
    color: "#111111",
    formats: "Short · Q&A · Reply · Stitch · Duet",
  },
  linkedin: {
    label: "LinkedIn",
    icon: Linkedin,
    color: "#0a66c2",
    formats: "Post · Document · Poll · Newsletter",
  },
  facebook: {
    label: "Facebook",
    icon: Facebook,
    color: "#1877f2",
    formats: "Post · Story · Poll · Live · Event",
  },
  threads: {
    label: "Threads",
    icon: AtSign,
    color: "#111111",
    formats: "Post · Thread · Quote · Question",
  },
};

const laneMeta = {
  spotlight: {
    color: "var(--spotlight)",
    soft: "var(--spotlight-soft)",
    coach: kiana,
    name: "Kiana",
  },
  reel: { color: "var(--reel)", soft: "var(--reel-soft)", coach: ryder, name: "Ryder" },
  evergreen: {
    color: "var(--evergreen)",
    soft: "var(--evergreen-soft)",
    coach: clara,
    name: "Clara",
  },
  system: { color: "var(--system)", soft: "var(--system-soft)", coach: samira, name: "Samira" },
} as const;

const ideaStarters = [
  "Turn the question customers ask before buying into a campaign",
  "Explain why our process is different without sounding salesy",
  "Build a month of content around one customer success story",
  "Turn repeated onboarding questions into reusable videos",
];

function tomorrowAtTen() {
  const date = new Date(Date.now() + 86_400_000);
  date.setHours(10, 0, 0, 0);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

export function ContentEngine() {
  const {
    brand,
    campaigns,
    assets,
    campaignOutputs,
    busy,
    suggestDirections,
    createCampaign,
    updateAsset,
    createCalendarItem,
  } = useStudio();
  const reduce = useReducedMotion();
  const [stage, setStage] = useState<"idea" | "directions" | "results">("idea");
  const [idea, setIdea] = useState("");
  const [goal, setGoal] = useState<(typeof studioGoals)[number]>(studioGoals[0]);
  const [audience, setAudience] = useState(brand?.primary_audience || "Busy business owners");
  const [offer, setOffer] = useState(
    Array.isArray(brand?.offers) && typeof brand.offers[0] === "string" ? brand.offers[0] : "",
  );
  const [directions, setDirections] = useState<ContentDirection[]>([]);
  const [selectedDirection, setSelectedDirection] = useState<ContentDirection | null>(null);
  const [campaignId, setCampaignId] = useState<string | null>(null);
  const [platform, setPlatform] = useState<ContentPlatform>("youtube");
  const [selectedPostId, setSelectedPostId] = useState("");
  const [drafts, setDrafts] = useState<Record<string, PlatformPost>>({});
  const [mobilePane, setMobilePane] = useState<"edit" | "preview">("edit");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [publishAt, setPublishAt] = useState(tomorrowAtTen);

  const output = campaignId ? campaignOutputs[campaignId] : null;
  const platformPosts = useMemo(() => output?.platformPosts || [], [output]);
  const matchingPosts = platformPosts.filter((post) => post.platform === platform);
  const selectedPost = drafts[selectedPostId] || matchingPosts[0] || null;
  const coach = laneMeta[selectedDirection?.lane || output?.primaryLane || "evergreen"];
  const activeAsset = assets.find((asset) => {
    if (asset.campaign_id !== campaignId || asset.kind !== "platform_post") return false;
    const metadata = asset.metadata as Record<string, unknown> | null;
    return metadata?.id === selectedPost?.id;
  });

  useEffect(() => {
    if (!platformPosts.length) return;
    const next = Object.fromEntries(platformPosts.map((post) => [post.id, post]));
    setDrafts(next);
    const first = platformPosts[0];
    setPlatform(first.platform);
    setSelectedPostId(first.id);
  }, [platformPosts]);

  useEffect(() => {
    const first = platformPosts.find((post) => post.platform === platform);
    if (first) setSelectedPostId(first.id);
  }, [platform, platformPosts]);

  async function findDirections() {
    if (idea.trim().length < 8) {
      toast.error("Give the engine one real business idea to work with.");
      return;
    }
    try {
      const result = await suggestDirections({ idea, goal, audience });
      setDirections(result);
      setSelectedDirection(result[0]);
      setStage("directions");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The directions could not be created.");
    }
  }

  async function buildCampaign() {
    if (!selectedDirection) return;
    try {
      const id = await createCampaign({
        title: selectedDirection.title,
        goal,
        topic: `${idea}\n\nStrategic direction: ${selectedDirection.angle}`,
        offer,
        audience,
        anchorFormat: "authority_video",
        depth: "strategic",
      });
      setCampaignId(id);
      setStage("results");
      toast.success("Your platform-native campaign is ready.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The campaign could not be created.");
    }
  }

  function updatePost(values: Partial<PlatformPost>) {
    if (!selectedPost) return;
    setDrafts((current) => ({
      ...current,
      [selectedPost.id]: { ...selectedPost, ...values },
    }));
  }

  async function savePost() {
    if (!selectedPost || !activeAsset) {
      toast.success("Your edits are saved in this working session.");
      return;
    }
    try {
      await updateAsset(activeAsset.id, {
        title: selectedPost.title,
        content: selectedPost.body,
        metadata: selectedPost,
      });
      toast.success(`${platformMeta[selectedPost.platform].label} post saved.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The post could not be saved.");
    }
  }

  async function schedulePost() {
    if (!selectedPost) return;
    try {
      await createCalendarItem({
        campaignId: campaignId || undefined,
        assetId: activeAsset?.id,
        title: selectedPost.title,
        channel: platformMeta[selectedPost.platform].label,
        publishAt: new Date(publishAt).toISOString(),
        notes: `${selectedPost.nativeFeature}\n${selectedPost.publishNotes}`,
      });
      toast.success("Post added to the content calendar.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The post could not be scheduled.");
    }
  }

  function loadCampaign(id: string) {
    if (!campaignOutputs[id]) {
      toast.info("Open this campaign from the Library to load its saved assets.");
      return;
    }
    setCampaignId(id);
    setStage("results");
    setHistoryOpen(false);
  }

  return (
    <div className="mx-auto max-w-[96rem]">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
        <div>
          <h1 className="text-3xl font-extrabold tracking-[-.05em] sm:text-4xl">Content Engine</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Start with the problem. Build one campaign. Shape every post for the platform where it
            will live.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/studio/brand" className="secondary-action">
            <FileStack className="size-4" /> Brand Vault
          </Link>
          <button onClick={() => setHistoryOpen((value) => !value)} className="secondary-action">
            <RefreshCw className="size-4" /> History
          </button>
          <Link to="/studio/calendar" className="secondary-action">
            <CalendarDays className="size-4" /> Calendar
          </Link>
        </div>
      </header>

      <AnimatePresence>
        {historyOpen && (
          <motion.section
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-border"
          >
            <div className="flex gap-3 overflow-x-auto py-4">
              {campaigns.length ? (
                campaigns.slice(0, 12).map((campaign) => (
                  <button
                    key={campaign.id}
                    onClick={() => loadCampaign(campaign.id)}
                    className="min-h-20 min-w-64 rounded-2xl border border-border bg-white p-4 text-left transition hover:border-spotlight"
                  >
                    <span className="font-mono text-[8px] uppercase tracking-[.15em] text-muted-foreground">
                      {campaign.status} · {new Date(campaign.created_at).toLocaleDateString()}
                    </span>
                    <span className="mt-2 block line-clamp-2 text-sm font-bold">
                      {campaign.title}
                    </span>
                  </button>
                ))
              ) : (
                <p className="py-5 text-sm text-muted-foreground">
                  Your completed campaigns will appear here.
                </p>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <Progress stage={stage} />

      <AnimatePresence mode="wait">
        {stage === "idea" && (
          <motion.section
            key="idea"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="grid gap-10 py-8 lg:grid-cols-[1fr_.78fr] lg:py-12"
          >
            <div>
              <h2 className="max-w-[12ch] text-4xl font-extrabold leading-[.95] tracking-[-.055em] sm:text-6xl">
                What do you need to say?
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                Give the idea a business job. The Engine will find three useful angles before it
                writes anything.
              </p>
              <div className="mt-8 rounded-[1.75rem] border border-border bg-white p-3 shadow-soft">
                <label htmlFor="engine-idea" className="sr-only">
                  Business idea
                </label>
                <textarea
                  id="engine-idea"
                  value={idea}
                  onChange={(event) => setIdea(event.target.value)}
                  rows={5}
                  placeholder="Example: Customers keep asking whether they need the premium service or the standard one…"
                  className="w-full resize-none rounded-[1.2rem] border-0 bg-white p-4 text-base leading-relaxed outline-none sm:text-lg"
                />
                <button
                  onClick={() => void findDirections()}
                  disabled={busy}
                  className="primary-action w-full rounded-2xl bg-spotlight sm:w-auto"
                >
                  {busy ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    <WandSparkles className="size-4" />
                  )}
                  Find three angles <ArrowRight className="size-4" />
                </button>
              </div>
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {ideaStarters.map((starter) => (
                  <button
                    key={starter}
                    onClick={() => setIdea(starter)}
                    className="min-h-14 rounded-2xl border border-border bg-white px-4 text-left text-sm font-semibold transition hover:border-system"
                  >
                    {starter}
                  </button>
                ))}
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <SelectField
                  label="Business goal"
                  value={goal}
                  onChange={setGoal}
                  options={[...studioGoals]}
                />
                <TextField label="Audience" value={audience} onChange={setAudience} />
                <TextField label="Offer or next step" value={offer} onChange={setOffer} />
              </div>
            </div>
            <div className="relative flex min-h-96 items-center justify-center overflow-hidden rounded-[2rem] bg-white">
              <motion.img
                src={engineFlow}
                alt="One business idea moving through a production engine into platform-ready content"
                className="w-full object-contain"
                initial={reduce ? false : { opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
            </div>
          </motion.section>
        )}

        {stage === "directions" && (
          <motion.section
            key="directions"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="py-8 lg:py-12"
          >
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <h2 className="text-4xl font-extrabold tracking-[-.05em] sm:text-6xl">
                  Find the angle.
                </h2>
                <p className="mt-4 max-w-2xl text-muted-foreground">
                  Same business idea. Three different jobs. Choose the direction that best fits the
                  audience decision you need to change.
                </p>
              </div>
              <button onClick={() => setStage("idea")} className="secondary-action">
                Edit the idea
              </button>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {directions.map((direction, index) => {
                const lane = laneMeta[direction.lane];
                const selected = selectedDirection?.id === direction.id;
                return (
                  <motion.button
                    key={direction.id}
                    onClick={() => setSelectedDirection(direction)}
                    whileHover={reduce ? undefined : { y: -5 }}
                    className={`relative min-h-80 rounded-[1.75rem] border bg-white p-6 text-left transition ${selected ? "shadow-soft" : "border-border"}`}
                    style={{ borderColor: selected ? lane.color : undefined }}
                  >
                    <span
                      className="font-mono text-[9px] uppercase tracking-[.16em]"
                      style={{ color: lane.color }}
                    >
                      {String(index + 1).padStart(2, "0")} · {direction.lane}
                    </span>
                    <h3 className="mt-8 text-2xl font-extrabold tracking-[-.04em]">
                      {direction.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft">{direction.angle}</p>
                    <p className="mt-6 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
                      {direction.whyItWorks}
                    </p>
                    <span
                      className="absolute right-5 top-5 grid size-8 place-items-center rounded-full border"
                      style={{
                        background: selected ? lane.color : "white",
                        color: selected ? "white" : lane.color,
                      }}
                    >
                      {selected && <Check className="size-4" />}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            {selectedDirection && (
              <div className="mt-7 flex flex-col gap-4 rounded-[1.75rem] border border-border bg-white p-5 sm:flex-row sm:items-center">
                <img
                  src={coach.coach}
                  alt={`${coach.name}, your campaign guide`}
                  className="size-16 rounded-2xl object-cover"
                />
                <div className="flex-1">
                  <p className="font-bold">{coach.name} will guide this direction.</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    The guide keeps the lens on the problem and helps tailor the production plan.
                    Your business remains the subject.
                  </p>
                </div>
                <button
                  onClick={() => void buildCampaign()}
                  disabled={busy}
                  className="primary-action rounded-2xl bg-spotlight"
                >
                  {busy ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    <Sparkles className="size-4" />
                  )}
                  Build the campaign <ArrowRight className="size-4" />
                </button>
              </div>
            )}
          </motion.section>
        )}

        {stage === "results" && output && selectedPost && (
          <motion.section
            key="results"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <img src={coach.coach} alt="" className="size-11 rounded-xl object-cover" />
                <div>
                  <p
                    className="font-mono text-[8px] uppercase tracking-[.16em]"
                    style={{ color: coach.color }}
                  >
                    Campaign ready · {output.primaryLane} lane
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold">{output.title}</h2>
                </div>
              </div>
              <button
                onClick={() => {
                  setStage("idea");
                  setIdea("");
                  setDirections([]);
                  setCampaignId(null);
                }}
                className="secondary-action"
              >
                New campaign
              </button>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-2" aria-label="Platform outputs">
              {contentPlatforms.map((key) => {
                const meta = platformMeta[key];
                const Icon = meta.icon;
                const available = platformPosts.some((post) => post.platform === key);
                return (
                  <button
                    key={key}
                    onClick={() => available && setPlatform(key)}
                    disabled={!available}
                    className={`flex min-h-11 shrink-0 items-center gap-2 rounded-xl border px-3 text-xs font-bold transition ${platform === key ? "border-ink bg-ink text-white" : "border-border bg-white"}`}
                  >
                    <Icon className="size-4" /> {meta.label}
                  </button>
                );
              })}
              <Link
                to="/studio/campaigns/$campaignId"
                params={{ campaignId: campaignId! }}
                className="flex min-h-11 shrink-0 items-center gap-2 rounded-xl border border-border bg-white px-3 text-xs font-bold"
              >
                <Clipboard className="size-4" /> Full campaign
              </Link>
            </div>

            <div className="mt-3 flex rounded-xl border border-border bg-white p-1 lg:hidden">
              {(["edit", "preview"] as const).map((pane) => (
                <button
                  key={pane}
                  onClick={() => setMobilePane(pane)}
                  className={`min-h-11 flex-1 rounded-lg text-sm font-bold capitalize ${mobilePane === pane ? "bg-ink text-white" : "text-muted-foreground"}`}
                >
                  {pane}
                </button>
              ))}
            </div>

            <div className="mt-4 grid min-h-[calc(100vh-15rem)] gap-5 lg:grid-cols-[minmax(0,1fr)_25rem]">
              <div className={`${mobilePane === "preview" ? "hidden" : "block"} min-w-0 lg:block`}>
                <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
                  <span className="mr-2 text-xs font-bold text-muted-foreground">Format</span>
                  {matchingPosts.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => setSelectedPostId(post.id)}
                      className={`min-h-10 rounded-xl border px-3 text-xs font-bold capitalize ${selectedPost.id === post.id ? "border-spotlight bg-spotlight text-white" : "border-border bg-white"}`}
                    >
                      {post.format}
                    </button>
                  ))}
                  <span className="ml-auto hidden max-w-xs text-right text-xs text-muted-foreground sm:block">
                    {platformMeta[platform].formats}
                  </span>
                </div>

                <div className="py-5">
                  <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
                    <div>
                      <label className="font-mono text-[8px] uppercase tracking-[.15em] text-muted-foreground">
                        Title
                      </label>
                      <input
                        value={selectedPost.title}
                        onChange={(event) => updatePost({ title: event.target.value })}
                        className="mt-2 w-full border-0 border-b border-border bg-white px-0 pb-3 text-2xl font-extrabold tracking-[-.04em] outline-none focus:border-spotlight"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigator.clipboard
                            .writeText(
                              `${selectedPost.hook}\n\n${selectedPost.body}\n\n${selectedPost.callToAction}`,
                            )
                            .then(() => toast.success("Post copied."))
                        }
                        className="secondary-action px-3"
                        aria-label="Copy post"
                      >
                        <Copy className="size-4" />
                      </button>
                      <button
                        onClick={() => void savePost()}
                        className="secondary-action px-3"
                        aria-label="Save post"
                      >
                        <Save className="size-4" />
                      </button>
                    </div>
                  </div>
                  <EditorField
                    label="Hook"
                    value={selectedPost.hook}
                    onChange={(value) => updatePost({ hook: value })}
                    rows={2}
                  />
                  <EditorField
                    label="Platform-native post"
                    value={selectedPost.body}
                    onChange={(value) => updatePost({ body: value })}
                    rows={10}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <EditorField
                      label="Call to action"
                      value={selectedPost.callToAction}
                      onChange={(value) => updatePost({ callToAction: value })}
                      rows={3}
                    />
                    <EditorField
                      label="Native feature"
                      value={selectedPost.nativeFeature}
                      onChange={(value) => updatePost({ nativeFeature: value })}
                      rows={3}
                    />
                  </div>
                  {selectedPost.poll && (
                    <section className="mt-5 rounded-2xl border border-border bg-white p-5">
                      <p className="font-mono text-[8px] uppercase tracking-[.15em] text-system">
                        Native poll
                      </p>
                      <p className="mt-3 font-bold">{selectedPost.poll.question}</p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {selectedPost.poll.options.map((option) => (
                          <span
                            key={option}
                            className="rounded-xl border border-border px-4 py-3 text-sm"
                          >
                            {option}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}
                  {selectedPost.quiz && (
                    <section className="mt-5 rounded-2xl border border-border bg-white p-5">
                      <p className="font-mono text-[8px] uppercase tracking-[.15em] text-reel">
                        Native quiz
                      </p>
                      <p className="mt-3 font-bold">{selectedPost.quiz.question}</p>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {selectedPost.quiz.options.map((option, index) => (
                          <span
                            key={option}
                            className={`rounded-xl border px-4 py-3 text-sm ${index === selectedPost.quiz?.correctIndex ? "border-evergreen text-evergreen" : "border-border"}`}
                          >
                            {option}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}
                  {!!selectedPost.slides.length && (
                    <section className="mt-5">
                      <p className="font-mono text-[8px] uppercase tracking-[.15em] text-muted-foreground">
                        Slides / frames
                      </p>
                      <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                        {selectedPost.slides.map((slide, index) => (
                          <div
                            key={`${slide}-${index}`}
                            className="min-h-40 min-w-36 rounded-2xl border border-border bg-white p-4"
                          >
                            <span className="font-mono text-[8px] text-muted-foreground">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <p className="mt-8 text-sm font-bold">{slide}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>

              <aside
                className={`${mobilePane === "edit" ? "hidden" : "block"} min-w-0 border-l-0 border-border lg:block lg:border-l lg:pl-5`}
              >
                <div className="sticky top-24">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-extrabold">Preview the post</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        A realistic snippet, not a generic card.
                      </p>
                    </div>
                    <CircleHelp className="size-4 text-muted-foreground" />
                  </div>
                  <PlatformPreview
                    post={selectedPost}
                    business={brand?.business_name || "Your business"}
                  />
                  <div className="mt-4 rounded-2xl border border-border bg-white p-4">
                    <p className="font-mono text-[8px] uppercase tracking-[.15em] text-system">
                      Platform move
                    </p>
                    <p className="mt-2 text-sm font-bold">{selectedPost.nativeFeature}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {selectedPost.publishNotes}
                    </p>
                  </div>
                  <div className="mt-3 grid gap-2">
                    <label className="font-mono text-[8px] uppercase tracking-[.15em] text-muted-foreground">
                      Publish date
                    </label>
                    <input
                      type="datetime-local"
                      value={publishAt}
                      onChange={(event) => setPublishAt(event.target.value)}
                      className="min-h-11 rounded-xl border border-border bg-white px-3 text-sm"
                    />
                    <button
                      onClick={() => void schedulePost()}
                      className="primary-action rounded-xl bg-spotlight"
                    >
                      <CalendarDays className="size-4" /> Schedule post
                    </button>
                  </div>
                </div>
              </aside>
            </div>

            <section className="mt-8 grid gap-5 border-t border-border pt-8 lg:grid-cols-[1fr_.85fr]">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[.15em] text-evergreen">
                  Production plan
                </p>
                <h3 className="mt-3 text-2xl font-extrabold">
                  The writing is connected to a real shoot.
                </h3>
                <div className="mt-5 divide-y divide-border border-y border-border">
                  {output.productionPlan.shots.slice(0, 4).map((shot, index) => (
                    <div key={shot.shot} className="grid gap-2 py-4 sm:grid-cols-[3rem_1fr_9rem]">
                      <span className="font-mono text-[9px] text-muted-foreground">
                        0{index + 1}
                      </span>
                      <span className="text-sm font-bold">
                        {shot.shot}
                        <span className="mt-1 block font-normal text-muted-foreground">
                          {shot.purpose}
                        </span>
                      </span>
                      <span className="text-xs text-muted-foreground">{shot.framing}</span>
                    </div>
                  ))}
                </div>
              </div>
              <img
                src={systemMap}
                alt="A content system connecting scripts, video, calendar, visuals, and production"
                className="w-full rounded-[2rem] object-contain"
              />
            </section>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

function Progress({ stage }: { stage: "idea" | "directions" | "results" }) {
  const steps = [
    { key: "idea", label: "What do you need to say?" },
    { key: "directions", label: "Find the angle" },
    { key: "results", label: "Build the campaign" },
  ] as const;
  const active = steps.findIndex((step) => step.key === stage);
  return (
    <div className="mt-5 grid gap-2 rounded-2xl border border-border bg-white p-2 sm:grid-cols-3">
      {steps.map((step, index) => (
        <div
          key={step.key}
          className={`flex min-h-12 items-center gap-3 rounded-xl px-3 ${index === active ? "bg-spotlight-soft text-spotlight" : "text-muted-foreground"}`}
        >
          <span
            className={`grid size-7 place-items-center rounded-full border font-mono text-[9px] ${index < active ? "border-spotlight bg-spotlight text-white" : "border-current"}`}
          >
            {index < active ? <Check className="size-3.5" /> : index + 1}
          </span>
          <span className="text-xs font-bold">{step.label}</span>
        </div>
      ))}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: never) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="font-mono text-[8px] uppercase tracking-[.15em] text-muted-foreground">
        {label}
      </span>
      <span className="relative mt-2 block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value as never)}
          className="min-h-12 w-full appearance-none rounded-xl border border-border bg-white px-3 pr-9 text-sm font-semibold"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2" />
      </span>
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[8px] uppercase tracking-[.15em] text-muted-foreground">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-3 text-sm"
      />
    </label>
  );
}

function EditorField({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
}) {
  return (
    <label className="mt-5 block">
      <span className="font-mono text-[8px] uppercase tracking-[.15em] text-muted-foreground">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="mt-2 w-full resize-y rounded-2xl border border-border bg-white p-4 text-sm leading-relaxed outline-none focus:border-spotlight"
      />
    </label>
  );
}

function PlatformPreview({ post, business }: { post: PlatformPost; business: string }) {
  const common = { post, business };
  if (post.platform === "youtube") return <YouTubePreview {...common} />;
  if (post.platform === "instagram") return <InstagramPreview {...common} />;
  if (post.platform === "tiktok") return <TikTokPreview {...common} />;
  if (post.platform === "linkedin") return <LinkedInPreview {...common} />;
  if (post.platform === "facebook") return <FacebookPreview {...common} />;
  return <ThreadsPreview {...common} />;
}

function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-soft">
      {children}
    </div>
  );
}

function BrandAvatar({ business, dark = false }: { business: string; dark?: boolean }) {
  return (
    <span
      className={`grid size-9 shrink-0 place-items-center rounded-full font-mono text-[9px] font-bold ${dark ? "bg-white text-ink" : "bg-spotlight text-white"}`}
    >
      {business.slice(0, 2).toUpperCase()}
    </span>
  );
}

function Poll({ post }: { post: PlatformPost }) {
  if (!post.poll) return null;
  return (
    <div className="mt-3 space-y-2">
      {post.poll.options.map((option) => (
        <div
          key={option}
          className="rounded-full border border-current/25 px-3 py-2 text-xs font-semibold"
        >
          {option}
        </div>
      ))}
    </div>
  );
}

function YouTubePreview({ post, business }: { post: PlatformPost; business: string }) {
  if (post.format === "poll")
    return (
      <PreviewFrame>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <BrandAvatar business={business} />
            <div>
              <p className="text-xs font-bold">{business}</p>
              <p className="text-[10px] text-muted-foreground">Community · now</p>
            </div>
          </div>
          <p className="mt-4 text-sm font-semibold">{post.poll?.question || post.hook}</p>
          <Poll post={post} />
          <div className="mt-4 flex gap-5 text-xs text-muted-foreground">
            <span>
              <ThumbsUp className="mr-1 inline size-3" />
              Like
            </span>
            <span>
              <MessageCircle className="mr-1 inline size-3" />
              Comment
            </span>
          </div>
        </div>
      </PreviewFrame>
    );
  return (
    <PreviewFrame>
      <div className="relative aspect-video bg-ink">
        <img src={engineFlow} alt="" className="size-full object-cover opacity-90" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-12 place-items-center rounded-full bg-white/90 text-ink">
            <Play className="size-5 fill-current" />
          </span>
        </span>
      </div>
      <div className="p-4">
        <p className="line-clamp-2 text-sm font-extrabold">{post.title}</p>
        <div className="mt-3 flex items-center gap-3">
          <BrandAvatar business={business} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold">{business}</p>
            <p className="text-[10px] text-muted-foreground">1.8K subscribers</p>
          </div>
          <button className="rounded-full bg-ink px-3 py-2 text-[10px] font-bold text-white">
            Subscribe
          </button>
        </div>
        <p className="mt-4 line-clamp-3 rounded-xl bg-white p-3 text-xs leading-relaxed">
          {post.body}
        </p>
      </div>
    </PreviewFrame>
  );
}

function InstagramPreview({ post, business }: { post: PlatformPost; business: string }) {
  return (
    <PreviewFrame>
      <div className="flex items-center gap-3 p-3">
        <BrandAvatar business={business} />
        <p className="text-xs font-bold">{business.toLowerCase().replace(/\s/g, "")}</p>
        <span className="ml-auto text-lg">•••</span>
      </div>
      <div
        className={`${post.format === "story" ? "aspect-[9/12]" : "aspect-square"} relative overflow-hidden bg-white`}
      >
        <img src={systemMap} alt="" className="size-full object-cover" />
        {post.format === "reel" && (
          <Play className="absolute inset-0 m-auto size-12 rounded-full bg-white/85 p-3" />
        )}
        {post.format === "story" && (
          <div className="absolute inset-x-4 bottom-5 rounded-2xl bg-white/90 p-4 text-center text-sm font-bold">
            {post.hook}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex gap-4">
          <Heart className="size-5" />
          <MessageCircle className="size-5" />
          <Send className="size-5" />
          <Save className="ml-auto size-5" />
        </div>
        <p className="mt-3 line-clamp-4 text-xs leading-relaxed">
          <strong>{business.toLowerCase().replace(/\s/g, "")}</strong> {post.body}
        </p>
        <Poll post={post} />
      </div>
    </PreviewFrame>
  );
}

function TikTokPreview({ post, business }: { post: PlatformPost; business: string }) {
  return (
    <PreviewFrame>
      <div className="relative mx-auto aspect-[9/14] max-h-[32rem] overflow-hidden bg-ink text-white">
        <img
          src={engineFlow}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-75"
        />
        <div className="absolute inset-x-4 top-4 flex justify-center gap-5 text-xs font-bold">
          <span className="text-white/65">Following</span>
          <span>For You</span>
        </div>
        <div className="absolute bottom-5 left-4 right-16">
          <p className="text-xs font-bold">@{business.toLowerCase().replace(/\s/g, "")}</p>
          <p className="mt-2 line-clamp-4 text-xs leading-relaxed">{post.body}</p>
          <p className="mt-2 text-xs">♫ Original sound · {business}</p>
        </div>
        <div className="absolute bottom-5 right-3 grid gap-4 text-center">
          <BrandAvatar business={business} dark />
          <Heart className="mx-auto size-6 fill-white" />
          <MessageCircle className="mx-auto size-6" />
          <Share2 className="mx-auto size-6" />
        </div>
      </div>
    </PreviewFrame>
  );
}

function LinkedInPreview({ post, business }: { post: PlatformPost; business: string }) {
  return (
    <PreviewFrame>
      <div className="p-4">
        <div className="flex gap-3">
          <BrandAvatar business={business} />
          <div>
            <p className="text-xs font-bold">{business}</p>
            <p className="text-[10px] text-muted-foreground">
              Video systems for growing businesses · 1h
            </p>
          </div>
          <span className="ml-auto">•••</span>
        </div>
        <p className="mt-4 line-clamp-6 whitespace-pre-line text-xs leading-relaxed">{post.body}</p>
        {post.format === "document" && (
          <div className="mt-4 aspect-[4/3] rounded-xl border border-border bg-white p-5">
            <p className="font-mono text-[8px] uppercase tracking-[.15em] text-system">
              Document · 1 of {Math.max(post.slides.length, 1)}
            </p>
            <p className="mt-12 text-xl font-extrabold tracking-[-.04em]">
              {post.slides[0] || post.hook}
            </p>
          </div>
        )}
        <Poll post={post} />
        <div className="mt-4 flex justify-between border-t border-border pt-3 text-[10px] text-muted-foreground">
          <span>
            <ThumbsUp className="mr-1 inline size-3" />
            Like
          </span>
          <span>
            <MessageCircle className="mr-1 inline size-3" />
            Comment
          </span>
          <span>
            <RefreshCw className="mr-1 inline size-3" />
            Repost
          </span>
          <span>
            <Send className="mr-1 inline size-3" />
            Send
          </span>
        </div>
      </div>
    </PreviewFrame>
  );
}

function FacebookPreview({ post, business }: { post: PlatformPost; business: string }) {
  return (
    <PreviewFrame>
      <div className="p-4">
        <div className="flex gap-3">
          <BrandAvatar business={business} />
          <div>
            <p className="text-xs font-bold">{business}</p>
            <p className="text-[10px] text-muted-foreground">Sponsored · Public</p>
          </div>
          <span className="ml-auto">•••</span>
        </div>
        <p className="mt-4 line-clamp-5 text-xs leading-relaxed">{post.body}</p>
        <Poll post={post} />
      </div>
      {post.format !== "poll" && (
        <img src={systemMap} alt="" className="aspect-[4/3] w-full object-cover" />
      )}
      <div className="flex justify-around border-t border-border p-3 text-[10px] text-muted-foreground">
        <span>
          <ThumbsUp className="mr-1 inline size-3" />
          Like
        </span>
        <span>
          <MessageCircle className="mr-1 inline size-3" />
          Comment
        </span>
        <span>
          <Share2 className="mr-1 inline size-3" />
          Share
        </span>
      </div>
    </PreviewFrame>
  );
}

function ThreadsPreview({ post, business }: { post: PlatformPost; business: string }) {
  return (
    <PreviewFrame>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <BrandAvatar business={business} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center">
              <p className="text-xs font-bold">{business.toLowerCase().replace(/\s/g, "")}</p>
              <span className="ml-2 text-[10px] text-muted-foreground">2h</span>
              <span className="ml-auto">•••</span>
            </div>
            <div className="mt-2 whitespace-pre-line text-xs leading-relaxed">{post.body}</div>
            <div className="mt-4 flex gap-5 text-muted-foreground">
              <Heart className="size-4" />
              <MessageCircle className="size-4" />
              <RefreshCw className="size-4" />
              <Send className="size-4" />
            </div>
          </div>
        </div>
        {post.format === "thread" && <div className="ml-4 mt-3 h-10 border-l border-border" />}
      </div>
    </PreviewFrame>
  );
}
