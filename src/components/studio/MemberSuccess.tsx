import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Award,
  CalendarCheck,
  Camera,
  Check,
  CircleHelp,
  Clock3,
  FileQuestion,
  Flame,
  Heart,
  Lightbulb,
  Link2,
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
import {
  studioAdvisoryOffer,
  studioConsultingOffer,
  studioPlans,
  type StudioPlanKey,
} from "@/lib/studio-model";
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
  const [helpCampaign, setHelpCampaign] = useState("");
  const [helpReference, setHelpReference] = useState("");
  const [callPlannerOpen, setCallPlannerOpen] = useState(false);
  const [callFocus, setCallFocus] = useState("Campaign clarity");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [callNote, setCallNote] = useState("");
  const [callDelivery, setCallDelivery] = useState("Zoom");
  const [podcastOpen, setPodcastOpen] = useState(false);
  const [podcastTopic, setPodcastTopic] = useState("");
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
        title: "Teach the Studio your world",
        detail: "Reach 80% Brand DNA so every suggestion has useful context.",
        done: (brand?.completion || 0) >= 80,
        to: "/studio/brand",
        icon: Target,
        color: "var(--spotlight)",
        soft: "var(--spotlight-soft)",
        points: 150,
      },
      {
        title: "Capture a real customer problem",
        detail: "Save an idea with the problem it needs to solve.",
        done: ideas.some((idea) => Boolean(idea.business_problem)),
        to: "/studio/ideas",
        icon: Lightbulb,
        color: "var(--reel)",
        soft: "var(--reel-soft)",
        points: 75,
      },
      {
        title: "Choose the next useful video",
        detail: "Move one recommended video into planning.",
        done: videoProgress.some((item) => item.status !== "not_started"),
        to: "/studio/roadmap",
        icon: Video,
        color: "var(--evergreen)",
        soft: "var(--evergreen-soft)",
        points: 100,
      },
      {
        title: "Build a connected campaign",
        detail: "Turn one useful idea into a complete system of assets.",
        done: campaigns.length > 0 && assets.length > 0,
        to: "/studio",
        icon: Sparkles,
        color: "var(--system)",
        soft: "var(--system-soft)",
        points: 200,
      },
      {
        title: "Give the work a date",
        detail: "Place at least one useful asset on the calendar.",
        done: calendar.length > 0,
        to: "/studio/calendar",
        icon: CalendarCheck,
        color: "var(--spotlight)",
        soft: "var(--spotlight-soft)",
        points: 100,
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
        points: 125,
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
  const earnedPoints = missions.reduce(
    (total, mission) => total + (mission.done ? mission.points : 0),
    0,
  );
  const totalPoints = missions.reduce((total, mission) => total + mission.points, 0);
  const nextMission = missions.find((mission) => !mission.done);
  const achievements = [
    {
      label: "Clear foundation",
      detail: "Brand DNA is ready to guide the work.",
      done: (brand?.completion || 0) >= 80,
      color: "var(--spotlight)",
      soft: "var(--spotlight-soft)",
    },
    {
      label: "Useful signal",
      detail: "A real problem became a planned video.",
      done:
        ideas.some((idea) => Boolean(idea.business_problem)) &&
        videoProgress.some((item) => item.status !== "not_started"),
      color: "var(--evergreen)",
      soft: "var(--evergreen-soft)",
    },
    {
      label: "Working system",
      detail: "A campaign is built and given a date.",
      done: campaigns.length > 0 && assets.length > 0 && calendar.length > 0,
      color: "var(--system)",
      soft: "var(--system-soft)",
    },
  ];

  async function submitHelp(event: FormEvent) {
    event.preventDefault();
    if (helpNote.trim().length < 8) return;
    setBusy(true);
    try {
      const campaign = campaigns.find((item) => item.id === helpCampaign);
      const structuredNote = [
        `Outcome needed: ${helpNote.trim()}`,
        campaign ? `Campaign: ${campaign.title}` : "",
        helpReference.trim() ? `Reference: ${helpReference.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n");
      await requestService(helpType, structuredNote, campaign?.id);
      setHelpNote("");
      setHelpCampaign("");
      setHelpReference("");
    } finally {
      setBusy(false);
    }
  }

  async function scheduleSession(event: FormEvent) {
    event.preventDefault();
    if (sessionsRemaining < 1 && plan.strategySessions > 0) {
      toast.info("Your included sessions are already requested for this period.");
      return;
    }
    const form = new FormData(event.currentTarget as HTMLFormElement);
    const selectedFocus = String(form.get("callFocus") || callFocus);
    const selectedDate = String(form.get("preferredDate") || preferredDate);
    const selectedTime = String(form.get("preferredTime") || preferredTime);
    const selectedContext = String(form.get("callContext") || callNote).trim();
    if (!selectedDate || !selectedTime) {
      toast.info("Choose a preferred date and time first.");
      return;
    }
    setBusy(true);
    try {
      await requestService(
        "strategy_call",
        [
          `${plan.name} plan strategy session`,
          `Focus: ${selectedFocus}`,
          `Delivery: ${callDelivery}`,
          `Preferred time: ${new Date(`${selectedDate}T${selectedTime}`).toLocaleString()}`,
          selectedContext ? `Context: ${selectedContext}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
      );
      setCallPlannerOpen(false);
      setPreferredDate("");
      setPreferredTime("");
      setCallNote("");
      if (!demo && bookingUrl !== "/contact") window.location.assign(bookingUrl);
    } finally {
      setBusy(false);
    }
  }

  async function requestPodcast() {
    if (!podcastEligible || podcastTopic.trim().length < 8) return;
    setBusy(true);
    try {
      await requestService(
        "podcast_guest",
        `Proposed MINDYOURBIZNIZ topic: ${podcastTopic.trim()}\nPlease follow up with editorial-fit and scheduling questions.`,
      );
      setPodcastTopic("");
      setPodcastOpen(false);
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
          <div className="relative z-10 max-w-[11rem] sm:max-w-[13rem]">
            <p className="studio-eyebrow text-system">Samira’s nudge</p>
            <p className="mt-3 text-sm font-bold leading-relaxed">
              The best next move is the one that removes a real bottleneck—not the one with the
              fanciest name.
            </p>
          </div>
          <img
            src={samiraHeadshot}
            alt="Samira, your systems guide"
            className="absolute -bottom-5 -right-2 h-32 w-32 object-contain object-bottom sm:-bottom-7 sm:-right-3 sm:h-40 sm:w-40"
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
              <p className="text-3xl font-black text-spotlight">{earnedPoints}</p>
              <p className="text-[10px] font-bold uppercase tracking-[.12em] text-muted-foreground">
                of {totalPoints} useful-work points
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
          <div className="mt-5 grid gap-2 sm:grid-cols-3" aria-label="Member achievements">
            {achievements.map((achievement) => (
              <div
                key={achievement.label}
                className="flex min-h-24 items-start gap-3 rounded-[1rem] border border-border p-3"
                style={{ background: achievement.done ? achievement.soft : "white" }}
              >
                <span
                  className="grid size-8 shrink-0 place-items-center rounded-lg"
                  style={{
                    color: achievement.done ? achievement.color : "var(--muted)",
                    background: achievement.done ? "white" : "var(--mist)",
                  }}
                >
                  {achievement.done ? <Award className="size-4" /> : <Flame className="size-4" />}
                </span>
                <span>
                  <span className="block text-xs font-black">{achievement.label}</span>
                  <span className="mt-1 block text-[10px] leading-relaxed text-muted-foreground">
                    {achievement.done ? achievement.detail : "Complete the connected missions."}
                  </span>
                </span>
              </div>
            ))}
          </div>
          {nextMission ? (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[1rem] bg-spotlight-soft p-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.12em] text-spotlight">
                  Best next move · +{nextMission.points} points
                </p>
                <p className="mt-1 text-sm font-black">{nextMission.title}</p>
              </div>
              <Link to={nextMission.to} className="secondary-action bg-white">
                Start this mission <ArrowRight className="size-4" />
              </Link>
            </div>
          ) : (
            <div className="mt-5 rounded-[1rem] bg-evergreen-soft p-4 text-sm font-black text-evergreen">
              You completed the full useful-work loop. Keep the rhythm by building the next real
              campaign—not by collecting empty points.
            </div>
          )}
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
            Open the Skill Lab: camera check, mission spinner, and Pal finder{" "}
            <ArrowRight className="size-4" />
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
                onClick={() => setCallPlannerOpen((value) => !value)}
                className="primary-action mt-5 w-full disabled:opacity-45"
              >
                <CalendarCheck className="size-4" />{" "}
                {sessionsRemaining > 0
                  ? callPlannerOpen
                    ? "Close call planner"
                    : "Choose a focus & time"
                  : "All included calls requested"}
              </button>
              {callPlannerOpen ? (
                <form onSubmit={scheduleSession} className="mt-4 rounded-[1.25rem] bg-white p-4">
                  <label className="block text-xs font-black">
                    What should this hour unlock?
                    <select
                      name="callFocus"
                      value={callFocus}
                      onChange={(event) => setCallFocus(event.target.value)}
                      className="mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-3 text-sm"
                    >
                      <option>Campaign clarity</option>
                      <option>Bigger-picture brand direction</option>
                      <option>Filming-space setup</option>
                      <option>Script or project review</option>
                      <option>Content-system planning</option>
                    </select>
                  </label>
                  {callFocus === "Filming-space setup" ? (
                    <label className="mt-4 block text-xs font-black">
                      How should we review the space?
                      <select
                        value={callDelivery}
                        onChange={(event) => setCallDelivery(event.target.value)}
                        className="mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-3 text-sm"
                      >
                        <option>Zoom</option>
                        <option>On-site visit request</option>
                      </select>
                      {callDelivery === "On-site visit request" ? (
                        <span className="mt-2 block font-medium leading-relaxed text-muted-foreground">
                          Palmer House will confirm availability, travel, and any additional on-site
                          fee before anything is booked.
                        </span>
                      ) : null}
                    </label>
                  ) : null}
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <label className="block text-xs font-black">
                      Preferred date
                      <input
                        name="preferredDate"
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(event) => setPreferredDate(event.target.value)}
                        className="mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-3 text-sm"
                      />
                    </label>
                    <label className="block text-xs font-black">
                      Preferred time
                      <input
                        name="preferredTime"
                        type="time"
                        required
                        value={preferredTime}
                        onChange={(event) => setPreferredTime(event.target.value)}
                        className="mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-3 text-sm"
                      />
                    </label>
                  </div>
                  <label className="mt-4 block text-xs font-black">
                    Context for Jevoy{" "}
                    <span className="font-medium text-muted-foreground">(optional)</span>
                    <textarea
                      name="callContext"
                      value={callNote}
                      onChange={(event) => setCallNote(event.target.value)}
                      rows={3}
                      placeholder="What decision or roadblock should we prepare for?"
                      className="mt-2 w-full rounded-xl border border-border bg-white p-3 text-sm"
                    />
                  </label>
                  <button
                    disabled={busy}
                    className="primary-action mt-4 w-full disabled:opacity-40"
                  >
                    Reserve this session <ArrowRight className="size-4" />
                  </button>
                  <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">
                    {bookingUrl === "/contact"
                      ? "Palmer House will confirm the requested time. Connect the live scheduling URL to turn this into instant calendar booking."
                      : "After this request is saved, the live calendar opens so you can confirm the exact slot."}
                  </p>
                </form>
              ) : null}
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
              Book a {studioConsultingOffer.duration}-minute {studioConsultingOffer.name}. It
              includes {studioConsultingOffer.includedDays} days of{" "}
              {studioConsultingOffer.includedPlan} access.
            </p>
            <a
              href={bookingUrl}
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold underline underline-offset-4"
            >
              Book the ${studioConsultingOffer.price} intensive <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="mt-5 rounded-[1.25rem] bg-spotlight p-5 text-white">
            <p className="font-mono text-[9px] uppercase tracking-[.15em] text-white/65">
              Close partnership
            </p>
            <h3 className="mt-3 text-2xl font-black">{studioAdvisoryOffer.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              {studioAdvisoryOffer.description}
            </p>
            <p className="mt-4 text-2xl font-black">
              ${studioAdvisoryOffer.price.toLocaleString()}{" "}
              <span className="text-xs font-bold text-white/65">· application only</span>
            </p>
            <button
              type="button"
              disabled={busy}
              onClick={() =>
                void requestService(
                  "advisory_application",
                  `Interested in the ${studioAdvisoryOffer.name}. Please follow up with fit and scope questions.`,
                )
              }
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-black text-spotlight disabled:opacity-50"
            >
              Start the conversation <ArrowRight className="size-4" />
            </button>
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
            {helpType !== "member_question" && campaigns.length ? (
              <label className="mt-4 block">
                <span className="mb-2 block text-xs font-black">Attach a Studio campaign</span>
                <select
                  value={helpCampaign}
                  onChange={(event) => setHelpCampaign(event.target.value)}
                  className="min-h-12 w-full rounded-[1rem] border border-border bg-white px-4 text-sm outline-none transition focus:border-system"
                >
                  <option value="">No campaign selected yet</option>
                  {campaigns.map((campaign) => (
                    <option key={campaign.id} value={campaign.id}>
                      {campaign.title}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
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
            <label className="mt-4 block">
              <span className="mb-2 flex items-center gap-2 text-xs font-black">
                <Link2 className="size-3.5" /> Reference link{" "}
                <span className="font-medium text-muted-foreground">(optional)</span>
              </span>
              <input
                type="url"
                value={helpReference}
                onChange={(event) => setHelpReference(event.target.value)}
                placeholder="https://…"
                className="min-h-12 w-full rounded-[1rem] border border-border bg-white px-4 text-sm outline-none transition focus:border-system"
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
              onClick={() => setPodcastOpen((value) => !value)}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-spotlight px-5 text-sm font-black text-white disabled:opacity-45"
            >
              <Mic2 className="size-4" />{" "}
              {podcastEligible
                ? podcastOpen
                  ? "Close topic request"
                  : "Request my guest spot"
                : `Eligible again ${nextPodcastDate?.toLocaleDateString()}`}
            </button>
            {podcastOpen ? (
              <div className="mt-4 rounded-xl bg-white p-4">
                <label className="text-xs font-black">
                  What useful story should we explore?
                  <textarea
                    value={podcastTopic}
                    onChange={(event) => setPodcastTopic(event.target.value)}
                    rows={4}
                    placeholder="The decision, lesson, or story you can help another person understand…"
                    className="mt-2 w-full rounded-xl border border-border p-3 text-sm"
                  />
                </label>
                <button
                  type="button"
                  disabled={busy || podcastTopic.trim().length < 8}
                  onClick={() => void requestPodcast()}
                  className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-spotlight px-4 text-xs font-black text-white disabled:opacity-40"
                >
                  Send topic for editorial review <Send className="size-3.5" />
                </button>
              </div>
            ) : null}
          </article>

          <article className="studio-card">
            <div className="flex gap-1 text-reel" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-4 fill-current" />
              ))}
            </div>
            <h2 className="mt-4 text-2xl font-black">
              {completed >= 4
                ? "Has the Studio earned a review?"
                : "Help us make this more useful."}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {completed >= 4
                ? "Share an honest public review, or tell us privately what would make the experience better. Both paths stay available to every member."
                : "You should feel useful value before we ask for a public review. For now, tell us privately what would improve the next step."}
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              {completed >= 4 ? (
                <a
                  href={publicReviewUrl}
                  target={publicReviewUrl.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-reel px-4 text-sm font-black text-white"
                >
                  <Heart className="size-4" /> Leave an honest review
                </a>
              ) : null}
              <button
                type="button"
                onClick={() => setFeedbackOpen((value) => !value)}
                className={`inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-4 text-sm font-black ${completed < 4 ? "w-full" : ""}`}
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
