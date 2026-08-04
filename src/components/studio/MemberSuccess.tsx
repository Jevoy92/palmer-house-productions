import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CalendarCheck,
  Camera,
  Check,
  CircleHelp,
  Clock3,
  FileQuestion,
  Heart,
  Lightbulb,
  MessageSquareText,
  Mic2,
  Send,
  Sparkles,
  Star,
  Target,
  Video,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import samiraHeadshot from "@/assets/pal-headshots/samira.png";
import { studioPlans, type StudioPlanKey } from "@/lib/studio-model";
import { useStudio } from "./StudioProvider";

const bookingUrl = import.meta.env.VITE_STRATEGY_BOOKING_URL || "/contact";
const publicReviewUrl = import.meta.env.VITE_PUBLIC_REVIEW_URL || "/resources/reviews";

type HelpType = "member_question" | "project_review" | "full_production";

const helpTypes: Array<{
  id: HelpType;
  label: string;
  detail: string;
  icon: typeof CircleHelp;
}> = [
  {
    id: "member_question",
    label: "Ask a question",
    detail: "A quick strategic or Studio question.",
    icon: CircleHelp,
  },
  {
    id: "project_review",
    label: "Review a project",
    detail: "Get eyes on a campaign, script, or plan.",
    icon: FileQuestion,
  },
  {
    id: "full_production",
    label: "Production help",
    detail: "Talk filming, editing, or a larger build.",
    icon: Camera,
  },
];

function startOfCurrentPeriod(value?: string) {
  const parsed = value
    ? new Date(value)
    : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  return Number.isNaN(parsed.getTime()) ? new Date(0) : parsed;
}

export function MemberSuccess() {
  const {
    subscription,
    brand,
    campaigns,
    assets,
    calendar,
    ideas,
    videoProgress,
    serviceRequests,
    requestService,
    demo,
  } = useStudio();
  const reduce = useReducedMotion();
  const [helpType, setHelpType] = useState<HelpType>("member_question");
  const [helpNote, setHelpNote] = useState("");
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [busy, setBusy] = useState(false);

  const planKey: StudioPlanKey =
    subscription?.plan === "business" || subscription?.plan === "partner"
      ? subscription.plan
      : subscription?.plan === "creator"
        ? "creator"
        : "partner";
  const plan = studioPlans[planKey];
  const periodStart = startOfCurrentPeriod(subscription?.current_period_start);
  const strategyRequests = serviceRequests.filter(
    (request) =>
      request.request_type === "strategy_call" && new Date(request.created_at) >= periodStart,
  );
  const sessionsRemaining = Math.max(0, plan.strategySessions - strategyRequests.length);
  const lastPodcastRequest = serviceRequests.find(
    (request) => request.request_type === "podcast_guest",
  );
  const nextPodcastDate = lastPodcastRequest
    ? new Date(
        new Date(lastPodcastRequest.created_at).setMonth(
          new Date(lastPodcastRequest.created_at).getMonth() + 6,
        ),
      )
    : null;
  const podcastEligible = !nextPodcastDate || nextPodcastDate <= new Date();

  const missions = useMemo(
    () => [
      {
        title: "Teach the Studio your business",
        detail: "Reach 80% Brand DNA so every suggestion has useful context.",
        done: (brand?.completion || 0) >= 80,
        to: "/studio/brand",
        icon: Target,
        color: "var(--spotlight)",
        soft: "var(--spotlight-soft)",
      },
      {
        title: "Capture a real customer problem",
        detail: "Save an idea with the problem it needs to solve.",
        done: ideas.some((idea) => Boolean(idea.business_problem)),
        to: "/studio/ideas",
        icon: Lightbulb,
        color: "var(--reel)",
        soft: "var(--reel-soft)",
      },
      {
        title: "Choose the next useful video",
        detail: "Move one recommended video into planning.",
        done: videoProgress.some((item) => item.status !== "not_started"),
        to: "/studio/roadmap",
        icon: Video,
        color: "var(--evergreen)",
        soft: "var(--evergreen-soft)",
      },
      {
        title: "Build a connected campaign",
        detail: "Turn one useful idea into a complete system of assets.",
        done: campaigns.length > 0 && assets.length > 0,
        to: "/studio",
        icon: Sparkles,
        color: "var(--system)",
        soft: "var(--system-soft)",
      },
      {
        title: "Give the work a date",
        detail: "Place at least one useful asset on the calendar.",
        done: calendar.length > 0,
        to: "/studio/calendar",
        icon: CalendarCheck,
        color: "var(--spotlight)",
        soft: "var(--spotlight-soft)",
      },
      {
        title: "Get a second set of eyes",
        detail: "Ask Palmer House a question or submit a project for review.",
        done: serviceRequests.some((request) =>
          ["member_question", "project_review", "strategy_review"].includes(request.request_type),
        ),
        to: "/studio/success",
        icon: MessageSquareText,
        color: "var(--reel)",
        soft: "var(--reel-soft)",
      },
    ],
    [
      assets.length,
      brand?.completion,
      calendar.length,
      campaigns.length,
      ideas,
      serviceRequests,
      videoProgress,
    ],
  );
  const completed = missions.filter((mission) => mission.done).length;
  const progress = Math.round((completed / missions.length) * 100);

  async function submitHelp(event: FormEvent) {
    event.preventDefault();
    if (helpNote.trim().length < 8) return;
    setBusy(true);
    try {
      await requestService(helpType, helpNote.trim());
      setHelpNote("");
    } finally {
      setBusy(false);
    }
  }

  async function scheduleSession() {
    if (sessionsRemaining < 1 && plan.strategySessions > 0) {
      toast.info("Your included sessions are already requested for this period.");
      return;
    }
    setBusy(true);
    try {
      await requestService(
        "strategy_call",
        `${plan.name} plan strategy session. Please use this call for the member's most pressing campaign, production, or bigger-picture question.`,
      );
      if (!demo) window.location.assign(bookingUrl);
    } finally {
      setBusy(false);
    }
  }

  async function requestPodcast() {
    if (!podcastEligible) return;
    setBusy(true);
    try {
      await requestService(
        "podcast_guest",
        "I would like to be considered for my included MINDYOURBIZNIZ guest appearance. Please follow up with topic and scheduling questions.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function sendFeedback(event: FormEvent) {
    event.preventDefault();
    if (feedback.trim().length < 8) return;
    setBusy(true);
    try {
      await requestService("private_feedback", feedback.trim());
      setFeedback("");
      setFeedbackOpen(false);
      toast.success("Thank you. This went privately to Palmer House.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-[88rem]">
      <header className="grid gap-7 lg:grid-cols-[1fr_23rem] lg:items-end">
        <div>
          <p className="studio-eyebrow text-system">Member success</p>
          <h1 className="mt-4 max-w-[12ch] text-5xl font-black leading-[.92] tracking-[-.055em] sm:text-7xl">
            Tools when you can. Humans when you need us.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Complete useful missions, get a second set of eyes, and use every Palmer House benefit
            included with your membership.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-[1.75rem] bg-system-soft p-6">
          <div className="relative z-10 max-w-[13rem]">
            <p className="studio-eyebrow text-system">Samira’s nudge</p>
            <p className="mt-3 text-sm font-bold leading-relaxed">
              The best next move is the one that removes a real bottleneck—not the one with the
              fanciest name.
            </p>
          </div>
          <img
            src={samiraHeadshot}
            alt="Samira, your systems guide"
            className="absolute -bottom-7 -right-3 h-40 w-40 object-contain object-bottom"
          />
        </div>
      </header>

      <section className="mt-10 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
        <article className="studio-card">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="studio-eyebrow text-spotlight">Your useful-work streak</p>
              <h2 className="mt-3 text-3xl font-black">
                {completed} of {missions.length} missions complete
              </h2>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-spotlight">{completed * 100}</p>
              <p className="text-[10px] font-bold uppercase tracking-[.12em] text-muted-foreground">
                Momentum points
              </p>
            </div>
          </div>
          <div
            className="mt-6 h-3 overflow-hidden rounded-full bg-spotlight-soft"
            aria-label={`${progress}% of missions complete`}
          >
            <motion.span
              initial={reduce ? false : { width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="block h-full rounded-full bg-spotlight"
            />
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {missions.map((mission, index) => (
              <motion.div
                key={mission.title}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduce ? 0 : index * 0.045, duration: 0.3 }}
              >
                <Link
                  to={mission.to}
                  className="group flex min-h-36 items-start gap-4 rounded-[1.25rem] border border-border bg-white p-4 transition hover:-translate-y-0.5 hover:border-ink"
                >
                  <span
                    className="grid size-10 shrink-0 place-items-center rounded-xl"
                    style={{ background: mission.soft, color: mission.color }}
                  >
                    {mission.done ? (
                      <Check className="size-5" />
                    ) : (
                      <mission.icon className="size-5" />
                    )}
                  </span>
                  <span>
                    <span className="block text-sm font-black">{mission.title}</span>
                    <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
                      {mission.detail}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[.1em]">
                      {mission.done ? "Complete" : "Do this next"} <ArrowRight className="size-3" />
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <Link
            to="/games"
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold underline underline-offset-4"
          >
            Open the camera check and mission spinner <ArrowRight className="size-4" />
          </Link>
        </article>

        <article className="studio-card bg-cream">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="studio-eyebrow text-reel">Included guidance</p>
              <h2 className="mt-3 text-3xl font-black">Your Palmer House time</h2>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[.1em]">
              {plan.name}
            </span>
          </div>
          {plan.strategySessions > 0 ? (
            <>
              <div className="mt-7 flex items-center gap-4 rounded-[1.25rem] bg-white p-5">
                <span className="grid size-12 place-items-center rounded-xl bg-reel-soft text-reel">
                  <Clock3 className="size-5" />
                </span>
                <div>
                  <p className="text-2xl font-black">
                    {sessionsRemaining} of {plan.strategySessions} left
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {plan.strategyMinutes} included minutes this billing period
                  </p>
                </div>
              </div>
              <button
                disabled={busy || sessionsRemaining < 1}
                onClick={() => void scheduleSession()}
                className="primary-action mt-5 w-full disabled:opacity-45"
              >
                <CalendarCheck className="size-4" />{" "}
                {sessionsRemaining > 0
                  ? "Request & schedule a call"
                  : "All included calls requested"}
              </button>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Use it for a pressing campaign, a filming-space setup, a bigger-picture decision, or
                whatever is blocking useful work.
              </p>
            </>
          ) : (
            <div className="mt-7 rounded-[1.25rem] bg-white p-5">
              <p className="font-black">Human guidance is one upgrade away.</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Guided includes one private hour each month. Partner includes one every week.
              </p>
              <Link to="/studio/billing" className="primary-action mt-5">
                See guided plans <ArrowRight className="size-4" />
              </Link>
            </div>
          )}
          <div className="mt-5 border-t border-border pt-5">
            <p className="text-sm font-black">Need one focused session instead?</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Book a 75-minute Clarity Intensive. It includes 30 days of Studio access.
            </p>
            <a
              href={bookingUrl}
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold underline underline-offset-4"
            >
              Book the $450 intensive <ArrowRight className="size-4" />
            </a>
          </div>
        </article>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1fr_.72fr]">
        <article className="studio-card">
          <p className="studio-eyebrow text-system">Palmer House help desk</p>
          <h2 className="mt-3 text-3xl font-black">Submit the question or the work.</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Keep the context attached to your workspace. We can see the Brand DNA, campaigns, and
            approved work you have already built.
          </p>
          <form onSubmit={submitHelp} className="mt-7">
            <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Type of help">
              {helpTypes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={helpType === item.id}
                  onClick={() => setHelpType(item.id)}
                  className={`min-h-32 rounded-[1.2rem] border p-4 text-left transition ${helpType === item.id ? "border-system bg-system-soft" : "border-border bg-white hover:border-system"}`}
                >
                  <item.icon className="size-5 text-system" />
                  <span className="mt-4 block text-sm font-black">{item.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                    {item.detail}
                  </span>
                </button>
              ))}
            </div>
            <label className="mt-4 block">
              <span className="mb-2 block text-xs font-black">What should we know?</span>
              <textarea
                value={helpNote}
                onChange={(event) => setHelpNote(event.target.value)}
                rows={5}
                placeholder="Share the decision, link, campaign name, or place where you feel stuck…"
                className="w-full rounded-[1.2rem] border border-border bg-white p-4 outline-none transition focus:border-system"
              />
            </label>
            <button
              disabled={busy || helpNote.trim().length < 8}
              className="primary-action mt-4 disabled:opacity-40"
            >
              <Send className="size-4" /> Send to Palmer House
            </button>
          </form>
          {serviceRequests.length ? (
            <div className="mt-7 border-t border-border pt-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-black">Recent requests</p>
                <p className="text-[10px] uppercase tracking-[.1em] text-muted-foreground">
                  Saved with this workspace
                </p>
              </div>
              <div className="mt-3 grid gap-2">
                {serviceRequests.slice(0, 3).map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center gap-3 rounded-xl bg-cream px-4 py-3"
                  >
                    <span className="grid size-8 place-items-center rounded-lg bg-white text-system">
                      <Check className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-black capitalize">
                        {request.request_type.replaceAll("_", " ")}
                      </p>
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        {new Date(request.created_at).toLocaleDateString()} · {request.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </article>

        <div className="grid gap-5">
          <article className="studio-card bg-spotlight-soft">
            <span className="grid size-11 place-items-center rounded-xl bg-spotlight text-white">
              <Mic2 className="size-5" />
            </span>
            <p className="studio-eyebrow mt-6 text-spotlight">Member benefit</p>
            <h2 className="mt-3 text-2xl font-black">Bring your story to MINDYOURBIZNIZ.</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Active members can request one included guest appearance every six months, subject to
              editorial fit and scheduling.
            </p>
            <button
              disabled={busy || !podcastEligible}
              onClick={() => void requestPodcast()}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-spotlight px-5 text-sm font-black text-white disabled:opacity-45"
            >
              <Mic2 className="size-4" />{" "}
              {podcastEligible
                ? "Request my guest spot"
                : `Eligible again ${nextPodcastDate?.toLocaleDateString()}`}
            </button>
          </article>

          <article className="studio-card">
            <div className="flex gap-1 text-reel" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-4 fill-current" />
              ))}
            </div>
            <h2 className="mt-4 text-2xl font-black">Loving the Studio?</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A public review helps the right business owner find us. If something is off, tell us
              privately so we can fix it.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <a
                href={publicReviewUrl}
                target={publicReviewUrl.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-reel px-4 text-sm font-black text-white"
              >
                <Heart className="size-4" /> Leave a review
              </a>
              <button
                type="button"
                onClick={() => setFeedbackOpen((value) => !value)}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-4 text-sm font-black"
              >
                Help us improve
              </button>
            </div>
            {feedbackOpen ? (
              <form onSubmit={sendFeedback} className="mt-4 rounded-xl bg-reel-soft p-4">
                <label className="text-xs font-black">What would make this better?</label>
                <textarea
                  value={feedback}
                  onChange={(event) => setFeedback(event.target.value)}
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-border bg-white p-3 text-sm"
                />
                <button
                  disabled={busy || feedback.trim().length < 8}
                  className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-xl bg-ink px-4 text-xs font-black text-white disabled:opacity-40"
                >
                  Send privately <Send className="size-3.5" />
                </button>
              </form>
            ) : null}
          </article>
        </div>
      </section>
    </div>
  );
}
