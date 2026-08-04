import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Archive,
  Activity,
  ArrowRight,
  Bell,
  Building2,
  CalendarDays,
  Captions,
  Check,
  CheckSquare2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Clipboard,
  CreditCard,
  Download,
  Eye,
  ExternalLink,
  FileText,
  FileStack,
  Film,
  FolderOpen,
  Gauge,
  Heart,
  HandHeart,
  Home,
  ImageUp,
  Images,
  LayoutGrid,
  LayoutTemplate,
  Lightbulb,
  ListTodo,
  LoaderCircle,
  Mail,
  MessageSquareText,
  LogOut,
  Menu,
  MoreHorizontal,
  PenLine,
  Play,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  UserPlus,
  Users,
  Video,
  WandSparkles,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type DragEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { createStudioBillingPortal, createStudioSubscriptionCheckout } from "@/lib/studio-server";
import {
  anchorFormats,
  studioGoals,
  studioPlans,
  type StudioPlanKey,
  type StudioView,
} from "@/lib/studio-model";
import type { Tables } from "@/lib/supabase/database.types";
import creativeOne from "@/assets/creative-1.jpg";
import creativeTwo from "@/assets/creative-2.jpg";
import creativeThree from "@/assets/creative-3.jpg";
import creativeFour from "@/assets/creative-4.jpg";
import productionWorkspace from "@/assets/studio-visuals/production-workspace.png";
import contentEngineFlow from "@/assets/studio-visuals/content-engine-flow.png";
import samiraHeadshot from "@/assets/pal-headshots/samira.png";
import kianaHeadshot from "@/assets/pal-headshots/kiana.png";
import { useStudio } from "./StudioProvider";
import { ContentEngine } from "./ContentEngine";
import { ContentOrbit, LanePulse, StudioMark } from "./StudioVisuals";
import { StudioAssistant } from "./StudioAssistant";
import { VideoRoadmap } from "./VideoRoadmap";
import { MemberSuccess } from "./MemberSuccess";

type Campaign = Tables<"campaigns">;
type Asset = Tables<"campaign_assets">;
type CalendarItem = Tables<"calendar_items">;

const lanes = {
  spotlight: {
    color: "var(--spotlight)",
    soft: "var(--spotlight-soft)",
    label: "Spotlight",
    role: "Build trust",
  },
  reel: { color: "var(--reel)", soft: "var(--reel-soft)", label: "Reel", role: "Earn attention" },
  evergreen: {
    color: "var(--evergreen)",
    soft: "var(--evergreen-soft)",
    label: "Evergreen",
    role: "Teach clearly",
  },
  system: {
    color: "var(--system)",
    soft: "var(--system-soft)",
    label: "System",
    role: "Create clarity",
  },
};

const libraryMedia = [
  creativeOne,
  creativeTwo,
  productionWorkspace,
  creativeThree,
  contentEngineFlow,
  creativeFour,
];

const assetKinds = {
  anchor_script: { icon: Film, label: "Anchor video", color: "var(--spotlight)" },
  short_script: { icon: Captions, label: "Short video", color: "var(--reel)" },
  caption: { icon: MessageSquareText, label: "Social caption", color: "var(--reel)" },
  newsletter: { icon: Mail, label: "Newsletter", color: "var(--evergreen)" },
  carousel: { icon: Images, label: "Carousel", color: "var(--system)" },
  platform_post: { icon: Send, label: "Platform post", color: "var(--reel)" },
  faq: { icon: FileText, label: "FAQ answer", color: "var(--evergreen)" },
} as const;

function assetKindMeta(kind: string) {
  return (
    assetKinds[kind as keyof typeof assetKinds] || {
      icon: LayoutTemplate,
      label: kind.replaceAll("_", " "),
      color: "var(--system)",
    }
  );
}

function assetMedia(asset: Asset, index = 0) {
  const kindIndex = Object.keys(assetKinds).indexOf(asset.kind);
  const mediaIndex = (kindIndex >= 0 ? kindIndex + index : index) % libraryMedia.length;
  return libraryMedia[mediaIndex];
}

function PalTip({
  name,
  headshot,
  color,
  children,
}: {
  name: string;
  headshot: string;
  color: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <aside className="relative overflow-hidden rounded-[1.25rem] border border-border bg-white p-4">
      <div className="flex items-start gap-4">
        <div className="relative shrink-0 pt-3">
          <img
            src={headshot}
            alt={`${name}, your Palmer House guide`}
            className="size-16 rounded-[1rem] border border-border bg-white object-cover object-top"
          />
          <motion.span
            aria-hidden="true"
            className="absolute -right-2 -top-2 grid size-8 place-items-center rounded-full bg-white shadow-soft"
            style={{ color }}
            initial={reduce ? false : { opacity: 0, scale: 0.7, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }}
          >
            <Lightbulb className="size-4 fill-current" />
          </motion.span>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-black" style={{ color }}>
            {name}’s nudge
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink">{children}</p>
        </div>
      </div>
    </aside>
  );
}

const navSections = [
  {
    label: "Make",
    items: [
      { view: "home", label: "Dashboard", to: "/studio/dashboard", icon: Home },
      { view: "engine", label: "Create", to: "/studio", icon: Plus },
      { view: "assistant", label: "Ask a Pal", to: "/studio/assistant", icon: MessageSquareText },
      { view: "campaigns", label: "Campaigns", to: "/studio/campaigns", icon: WandSparkles },
      { view: "ideas", label: "Content ideas", to: "/studio/ideas", icon: Lightbulb },
    ],
  },
  {
    label: "Organize",
    items: [
      { view: "roadmap", label: "Video roadmap", to: "/studio/roadmap", icon: Film },
      { view: "library", label: "Library", to: "/studio/library", icon: FolderOpen },
      { view: "brand", label: "Brand DNA", to: "/studio/brand", icon: Gauge },
      { view: "approvals", label: "Approvals", to: "/studio/approvals", icon: CheckSquare2 },
    ],
  },
  {
    label: "Plan",
    items: [
      { view: "calendar", label: "Calendar", to: "/studio/calendar", icon: CalendarDays },
      { view: "success", label: "Member success", to: "/studio/success", icon: HandHeart },
      { view: "settings", label: "Settings", to: "/studio/settings", icon: Settings },
    ],
  },
] as const;

const nav = navSections.flatMap((section) => section.items);

export function StudioPage({ view, campaignId }: { view: StudioView; campaignId?: string }) {
  return (
    <>
      <StudioGate view={view} campaignId={campaignId} />
    </>
  );
}

function StudioGate({ view, campaignId }: { view: StudioView; campaignId?: string }) {
  const studio = useStudio();
  if (studio.loading) return <StudioLoading />;
  if (!studio.session && !studio.demo) return <AuthExperience />;
  if (!studio.workspace) return <Onboarding />;
  return <StudioShell view={view}>{renderView(view, campaignId)}</StudioShell>;
}

function StudioLoading() {
  return (
    <main className="grid min-h-screen place-items-center bg-white">
      <div className="text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-ink text-white">
          <LoaderCircle className="size-5 animate-spin" />
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground">
          Opening your studio
        </p>
      </div>
    </main>
  );
}

function AuthExperience() {
  const { signIn, signUp, sendMagicLink, enterDemo, busy } = useStudio();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [notice, setNotice] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      if (mode === "signup")
        setNotice(
          await signUp(
            String(form.get("name")),
            String(form.get("email")),
            String(form.get("password")),
          ),
        );
      else await signIn(String(form.get("email")), String(form.get("password")));
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "That did not work. Please try again.");
    }
  }
  async function magic(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await sendMagicLink(String(new FormData(event.currentTarget).get("email")));
      setNotice("Magic link sent. Check your email.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "That did not work.");
    }
  }
  return (
    <main className="min-h-screen bg-white px-4 py-5 sm:px-7 lg:px-10 lg:py-7">
      <header className="mx-auto flex max-w-[96rem] items-center justify-between">
        <Link to="/" aria-label="Palmer House home">
          <StudioMark />
        </Link>
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-bold hover:bg-spotlight-soft"
        >
          <ChevronLeft className="size-4" /> Back to the website
        </Link>
      </header>

      <div className="mx-auto grid max-w-[90rem] items-center gap-12 py-12 lg:min-h-[calc(100vh-10rem)] lg:grid-cols-[.78fr_1.22fr] lg:py-8">
        <section className="mx-auto w-full max-w-[31rem] lg:mx-0">
          <p className="studio-eyebrow text-spotlight">Your content operating system</p>
          <h1 className="mt-5 text-[clamp(2.75rem,5vw,4.4rem)] font-black leading-[.94] tracking-[-.065em]">
            {mode === "signin"
              ? "Welcome back. Let’s keep building."
              : "One useful idea can become a system."}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            {mode === "signin"
              ? "Sign in to keep your brand memory, campaigns, calendar, and team moving together."
              : "Create the private workspace where your ideas become campaigns your whole business can use."}
          </p>

          <form onSubmit={submit} className="mt-9 space-y-5">
            {mode === "signup" ? (
              <Field name="name" label="Your name" placeholder="Jevoy Palmer" required />
            ) : null}
            <Field
              name="email"
              label="Email address"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              required
            />
            <Field
              name="password"
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              minLength={8}
              required
            />
            <button
              disabled={busy}
              className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-spotlight px-5 font-bold text-white transition hover:bg-ink disabled:opacity-50"
            >
              {busy ? <LoaderCircle className="size-4 animate-spin" /> : null}
              {mode === "signin" ? "Sign in" : "Create my Studio"}
              <ArrowRight className="size-4" />
            </button>
          </form>

          {notice ? (
            <p
              role="status"
              className="mt-4 rounded-xl border border-system bg-system-soft p-4 text-sm text-system"
            >
              {notice}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
            <button
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setNotice("");
              }}
              className="font-bold text-spotlight underline decoration-spotlight/30 underline-offset-4"
            >
              {mode === "signin"
                ? "New here? Create an account"
                : "Already have an account? Sign in"}
            </button>
            <button
              onClick={enterDemo}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 font-bold hover:border-spotlight"
            >
              Open the owner preview <Play className="size-3.5" />
            </button>
          </div>

          <details className="mt-6 rounded-xl border border-border p-4">
            <summary className="cursor-pointer text-sm font-bold">
              Prefer a password-free sign in?
            </summary>
            <form onSubmit={magic} className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                name="email"
                type="email"
                required
                aria-label="Email for magic link"
                placeholder="Email for a secure sign-in link"
                className="min-h-12 min-w-0 flex-1 rounded-xl border border-border px-4 text-sm"
              />
              <button className="min-h-12 rounded-xl border border-ink px-4 text-sm font-bold">
                Email me a link
              </button>
            </form>
          </details>

          <div className="mt-7 flex items-start gap-3 border-t border-dashed border-border pt-6">
            <ShieldCheck className="mt-0.5 size-5 text-evergreen" />
            <div>
              <p className="text-sm font-bold">Private by default.</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Every member gets a private, onboarding-built workspace. The owner preview is a
                populated design workspace used only to develop and review the product.
              </p>
            </div>
          </div>
        </section>

        <section className="relative hidden min-h-[40rem] items-center justify-center lg:flex">
          <ContentOrbit />
        </section>
      </div>

      <section className="mx-auto grid max-w-[90rem] gap-5 rounded-[1.25rem] border border-border p-5 md:grid-cols-[1.4fr_repeat(4,1fr)] md:items-center">
        <p className="text-xl font-extrabold leading-tight">
          Your brand, campaigns, calendar, and content—in one place.
        </p>
        {[
          [Lightbulb, "Ideas", "Capture what matters"],
          [Play, "Content", "Create once, reshape well"],
          [CalendarDays, "Campaigns", "Keep the work moving"],
          [Users, "Pals", "Get useful guidance"],
        ].map(([Icon, label, note]) => (
          <div
            key={String(label)}
            className="flex items-center gap-3 md:border-l md:border-border md:pl-5"
          >
            <Icon className="size-5 text-system" />
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[.06em]">{String(label)}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{String(note)}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

function Onboarding() {
  const { createWorkspace, busy, user, signOut } = useStudio();
  const [name, setName] = useState((user?.user_metadata?.full_name as string) || "");
  const [step, setStep] = useState(0);
  const [problem, setProblem] = useState("I need a consistent content rhythm");
  const problemOptions = [
    { value: "I need a consistent content rhythm", lane: "Reel", color: "var(--reel)" },
    {
      value: "People do not understand why we are different",
      lane: "Spotlight",
      color: "var(--spotlight)",
    },
    { value: "I keep explaining the same things", lane: "Evergreen", color: "var(--evergreen)" },
    { value: "Knowledge is trapped in our team", lane: "System", color: "var(--system)" },
  ];
  const match = problemOptions.find((item) => item.value === problem) || problemOptions[0];
  return (
    <main className="min-h-screen bg-white p-4 sm:p-8">
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <StudioMark />
        <button
          onClick={() => void signOut()}
          className="min-h-11 rounded-full px-4 text-sm font-bold hover:bg-spotlight-soft"
        >
          Sign out
        </button>
      </header>
      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl items-center gap-10 py-10 lg:grid-cols-[.9fr_1.1fr]">
        <section>
          <div className="flex items-center gap-2" aria-label={`Step ${step + 1} of 3`}>
            {[0, 1, 2].map((item) => (
              <span
                key={item}
                className="h-1.5 flex-1 rounded-full"
                style={{ background: item <= step ? match.color : "var(--border)" }}
              />
            ))}
          </div>
          <p className="studio-eyebrow mt-8 text-system">Step {step + 1} of 3</p>
          <h1 className="mt-4 text-5xl font-black leading-[.95] tracking-[-.06em]">
            {step === 0
              ? "Give the work a home."
              : step === 1
                ? "What needs to change first?"
                : `Start with ${match.lane}.`}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            {step === 0
              ? "Your workspace keeps the brand memory, ideas, campaigns, calendar, and team in one private place."
              : step === 1
                ? "Choose the business problem—not a content format. We will organize the tools around the outcome."
                : `Your ${match.lane} Pal will guide the first campaign. You can use every lane whenever the work calls for it.`}
          </p>

          <div className="mt-8">
            {step === 0 ? (
              <Field
                label="Workspace name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your company or team"
                required
              />
            ) : null}
            {step === 1 ? (
              <ChoiceGrid
                options={problemOptions.map((item) => ({ value: item.value, label: item.value }))}
                value={problem}
                onChange={setProblem}
              />
            ) : null}
            {step === 2 ? (
              <div className="rounded-[1.25rem] border border-border p-6">
                <div className="flex items-center gap-4">
                  <span
                    className="grid size-12 place-items-center rounded-full text-white"
                    style={{ background: match.color }}
                  >
                    <Target className="size-5" />
                  </span>
                  <div>
                    <p className="font-extrabold">Your first workspace path</p>
                    <p className="mt-1 text-sm text-muted-foreground">{problem}</p>
                  </div>
                </div>
                <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                  {[
                    "Brand memory setup",
                    "Three useful directions",
                    "Platform-ready drafts",
                    "Editable content calendar",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="size-4 text-evergreen" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <div className="mt-7 flex gap-3">
            {step > 0 ? (
              <button
                onClick={() => setStep((current) => current - 1)}
                className="min-h-12 rounded-xl border border-border px-5 font-bold"
              >
                Back
              </button>
            ) : null}
            <button
              disabled={busy || (step === 0 && !name.trim())}
              onClick={async () => {
                if (step < 2) {
                  setStep((current) => current + 1);
                  return;
                }
                try {
                  window.sessionStorage.setItem("ph.studio.first-problem", problem);
                  await createWorkspace(name || "My Studio");
                } catch (error) {
                  toast.error(
                    error instanceof Error ? error.message : "Could not create workspace.",
                  );
                }
              }}
              className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-ink px-5 font-bold text-white disabled:opacity-40"
            >
              {busy ? <LoaderCircle className="size-4 animate-spin" /> : null}
              {step === 2 ? "Open my Studio" : "Continue"}
              <ArrowRight className="size-4" />
            </button>
          </div>
        </section>
        <section className="hidden lg:block">
          <ContentOrbit compact />
        </section>
      </div>
    </main>
  );
}

function StudioShell({ view, children }: { view: StudioView; children: ReactNode }) {
  const { workspace, subscription, profile, user, demo, signOut, leaveDemo } = useStudio();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const reduce = useReducedMotion();
  const memberName =
    profile?.full_name || (user?.user_metadata?.full_name as string) || "Studio member";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);
  return (
    <div className="min-h-screen bg-white text-ink">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[15.5rem] flex-col border-r border-border bg-white px-4 py-5 lg:flex">
        <StudioBrand />
        <button
          onClick={() => setCreateOpen(true)}
          className="mt-8 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-spotlight text-sm font-bold text-white transition hover:bg-ink"
        >
          <Plus className="size-4" /> Create
        </button>
        <nav className="mt-7 space-y-6" aria-label="Studio navigation">
          {navSections.map((section) => (
            <div key={section.label}>
              <p className="px-3 font-mono text-[8px] font-semibold uppercase tracking-[.18em] text-muted-foreground">
                {section.label}
              </p>
              <div className="mt-2 space-y-1">
                {section.items.map((item) => (
                  <StudioNavLink
                    key={item.view}
                    item={item}
                    active={
                      view === item.view || (view === "campaign" && item.view === "campaigns")
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="relative mt-auto">
          <AnimatePresence>
            {accountOpen ? (
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute bottom-[4.5rem] left-0 right-0 rounded-[1.15rem] border border-border bg-white p-2 shadow-[0_28px_80px_-40px_rgba(31,35,40,.75)]"
              >
                <Link
                  to="/studio/settings"
                  className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold hover:bg-spotlight-soft"
                >
                  <CircleUserRound className="size-4" /> Profile & settings
                </Link>
                <Link
                  to="/studio/billing"
                  className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold hover:bg-spotlight-soft"
                >
                  <CreditCard className="size-4" /> Usage & billing
                </Link>
                <button
                  onClick={() => (demo ? leaveDemo() : void signOut())}
                  className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-bold text-muted-foreground hover:bg-spotlight-soft"
                >
                  <LogOut className="size-4" /> {demo ? "Close owner preview" : "Sign out"}
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
          <button
            onClick={() => setAccountOpen((current) => !current)}
            className="flex min-h-14 w-full items-center gap-3 rounded-xl border border-border p-2 text-left hover:border-spotlight"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-spotlight text-xs font-black text-white">
              {memberName.slice(0, 1).toUpperCase()}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-extrabold">{memberName}</span>
              <span className="mt-0.5 block truncate text-[10px] text-muted-foreground">
                {demo ? "Owner preview" : `${subscription?.plan || "member"} · ${workspace?.name}`}
              </span>
            </span>
            <ChevronRight className={`size-3.5 transition ${accountOpen ? "rotate-90" : ""}`} />
          </button>
        </div>
      </aside>
      <header className="sticky top-0 z-30 flex min-h-16 items-center border-b border-border bg-white px-4 lg:ml-[15.5rem] lg:px-7">
        <button
          onClick={() => setMobileOpen(true)}
          className="grid size-11 shrink-0 place-items-center rounded-xl border border-border lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </button>
        <div className="ml-3 min-w-0 lg:ml-0">
          <p className="truncate text-sm font-bold">{workspace?.name}</p>
          <p className="hidden font-mono text-[8px] uppercase tracking-[.16em] text-muted-foreground sm:block">
            {demo ? "Owner preview · populated workspace" : "Private member workspace"}
          </p>
        </div>
        <div className="ml-auto hidden sm:block">
          <LanePulse />
        </div>
        <button
          aria-label="Ask a Pal"
          onClick={() => setChatOpen(true)}
          className="ml-3 inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-full border border-system bg-system-soft px-3 text-xs font-bold text-system"
        >
          <MessageSquareText className="size-4" />
          <span className="hidden md:inline">Ask a Pal</span>
        </button>
        <button
          aria-label="Notifications"
          className="ml-2 grid size-11 shrink-0 place-items-center rounded-full border border-border"
        >
          <Bell className="size-4" />
        </button>
        <button
          aria-label="Create something new"
          onClick={() => setCreateOpen(true)}
          className="ml-2 inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-system px-4 text-sm font-bold text-white"
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">Create</span>
        </button>
      </header>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            className="fixed inset-0 z-50 bg-white p-4 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <StudioBrand />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
                className="grid size-11 place-items-center rounded-xl bg-secondary"
              >
                <X />
              </button>
            </div>
            <nav className="mt-9 space-y-7">
              {navSections.map((section) => (
                <div key={section.label}>
                  <p className="px-3 font-mono text-[9px] uppercase tracking-[.18em] text-muted-foreground">
                    {section.label}
                  </p>
                  <div className="mt-2 space-y-1">
                    {section.items.map((item) => (
                      <div key={item.view} onClick={() => setMobileOpen(false)}>
                        <StudioNavLink item={item} active={view === item.view} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.main
        key={view}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="min-h-[calc(100vh-4rem)] px-4 py-6 sm:px-6 lg:ml-[15.5rem] lg:px-7 lg:py-7"
      >
        {children}
      </motion.main>
      <AnimatePresence>
        {createOpen ? <CreateOverlay onClose={() => setCreateOpen(false)} /> : null}
      </AnimatePresence>
      <PalChat open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}

function StudioBrand() {
  return (
    <Link to="/studio/dashboard" className="flex min-h-12 items-center gap-3 rounded-xl">
      <StudioMark />
    </Link>
  );
}
function StudioNavLink({ item, active }: { item: (typeof nav)[number]; active: boolean }) {
  return (
    <Link
      to={item.to}
      className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-bold transition ${active ? "bg-spotlight-soft text-spotlight" : "text-muted-foreground hover:bg-spotlight-soft hover:text-ink"}`}
    >
      <item.icon className="size-4" />
      {item.label}
    </Link>
  );
}

function CreateOverlay({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();
  const options = [
    {
      to: "/studio",
      icon: Sparkles,
      lane: "Spotlight",
      title: "Start with an idea",
      body: "Find the angle, then build the campaign.",
      color: "var(--spotlight)",
      soft: "var(--spotlight-soft)",
    },
    {
      to: "/studio/campaigns",
      icon: Video,
      lane: "Reel",
      title: "Plan from a video",
      body: "Turn one shoot into a useful content system.",
      color: "var(--reel)",
      soft: "var(--reel-soft)",
    },
    {
      to: "/studio/ideas",
      icon: Lightbulb,
      lane: "Evergreen",
      title: "Save a content idea",
      body: "Capture the repeated question before it disappears.",
      color: "var(--evergreen)",
      soft: "var(--evergreen-soft)",
    },
    {
      to: "/studio/calendar",
      icon: CalendarDays,
      lane: "System",
      title: "Plan the rhythm",
      body: "See what is ready, next, and waiting.",
      color: "var(--system)",
      soft: "var(--system-soft)",
    },
  ] as const;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] grid place-items-center bg-ink/35 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Create something new"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        className="w-full max-w-4xl overflow-hidden rounded-[1.5rem] bg-white shadow-[0_40px_120px_-50px_rgba(0,0,0,.8)]"
      >
        <header className="flex items-start justify-between border-b border-border p-5 sm:p-7">
          <div>
            <p className="studio-eyebrow text-system">Create new</p>
            <h2 className="mt-3 text-3xl font-black">What should we make useful?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose the starting point. Nothing publishes automatically.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close create menu"
            className="grid size-11 place-items-center rounded-full border border-border"
          >
            <X className="size-4" />
          </button>
        </header>
        <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-7">
          {options.map((item, index) => (
            <motion.div
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * index }}
            >
              <Link
                to={item.to}
                onClick={onClose}
                className="group flex min-h-36 items-start gap-4 rounded-[1.15rem] border border-border p-5 transition hover:-translate-y-0.5 hover:border-ink"
              >
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-xl"
                  style={{ color: item.color, background: item.soft }}
                >
                  <item.icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="studio-eyebrow" style={{ color: item.color }}>
                    {item.lane}
                  </span>
                  <span className="mt-2 block text-lg font-extrabold">{item.title}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </span>
                </span>
                <ArrowRight className="ml-auto mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}

function PalChat({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { suggestDirections, brand, busy } = useStudio();
  const reduce = useReducedMotion();
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<
    Array<{ id: string; from: "you" | "pal"; body: string }>
  >([
    {
      id: "welcome",
      from: "pal",
      body: "Tell me what feels unclear, repetitive, invisible, or stuck. I’ll help you find the most useful content move.",
    },
  ]);
  async function ask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = draft.trim();
    if (question.length < 8) return;
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), from: "you", body: question },
    ]);
    setDraft("");
    try {
      const directions = await suggestDirections({
        idea: question,
        goal: studioGoals[0],
        audience: brand?.primary_audience || "Your primary audience",
      });
      const best = directions[0];
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          from: "pal",
          body: best
            ? `${best.title}: ${best.angle}\n\nWhy it works: ${best.whyItWorks}`
            : "Start by naming the exact decision you need the audience to make. That gives the content a real job.",
        },
      ]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The Pal could not respond yet.");
    }
  }
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] flex justify-end bg-ink/30"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.aside
            initial={reduce ? false : { transform: "translateX(100%)" }}
            animate={{ transform: "translateX(0%)" }}
            exit={reduce ? { opacity: 0 } : { transform: "translateX(100%)" }}
            transition={
              reduce ? { duration: 0.01 } : { type: "spring", bounce: 0.12, visualDuration: 0.4 }
            }
            className="flex h-full w-full flex-col bg-white shadow-2xl sm:max-w-[32rem]"
            role="dialog"
            aria-modal="true"
            aria-label="Ask a Palmer House Pal"
          >
            <header className="flex items-center gap-4 border-b border-border p-5">
              <div className="relative">
                <img
                  src={kianaHeadshot}
                  alt="Kiana"
                  className="size-12 rounded-xl border border-border object-cover object-top"
                />
                <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-white bg-evergreen" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-black">Ask a Pal</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Kiana is focusing the lens with you
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close Pal chat"
                className="grid size-11 place-items-center rounded-full border border-border"
              >
                <X className="size-4" />
              </button>
            </header>
            <div className="border-b border-border px-5 py-3">
              <Link
                to="/studio/assistant"
                onClick={onClose}
                className="flex min-h-10 items-center justify-between rounded-xl bg-system-soft px-4 text-xs font-bold text-system"
              >
                Open the full Assistant workspace <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-5" aria-live="polite">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[88%] whitespace-pre-line rounded-[1.25rem] p-4 text-sm leading-relaxed ${message.from === "you" ? "ml-auto bg-spotlight text-white" : "bg-system-soft text-ink"}`}
                >
                  {message.body}
                </motion.div>
              ))}
              {busy ? (
                <div className="flex items-center gap-2 text-xs font-bold text-system">
                  <LoaderCircle className="size-4 animate-spin" /> Finding the useful angle…
                </div>
              ) : null}
            </div>
            <form onSubmit={ask} className="border-t border-border p-4">
              <div className="flex items-end gap-2 rounded-[1.15rem] border border-border bg-white p-2 shadow-soft">
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  rows={2}
                  placeholder="What feels stuck?"
                  className="min-h-12 flex-1 resize-none border-0 bg-transparent p-2 text-sm outline-none"
                />
                <button
                  disabled={busy || draft.trim().length < 8}
                  aria-label="Send question"
                  className="grid size-11 shrink-0 place-items-center rounded-xl bg-system text-white disabled:opacity-35"
                >
                  <Send className="size-4" />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-muted-foreground">
                Guidance only. Nothing publishes automatically.
              </p>
            </form>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function renderView(view: StudioView, campaignId?: string) {
  if (view === "engine") return <ContentEngine />;
  if (view === "home") return <Dashboard />;
  if (view === "assistant") return <StudioAssistant />;
  if (view === "roadmap") return <VideoRoadmap />;
  if (view === "success") return <MemberSuccess />;
  if (view === "brand") return <BrandStudio />;
  if (view === "ideas") return <IdeasBoard />;
  if (view === "approvals") return <Approvals />;
  if (view === "campaigns") return <Campaigns />;
  if (view === "campaign") return <CampaignDetail campaignId={campaignId} />;
  if (view === "library") return <Library />;
  if (view === "calendar") return <CalendarView />;
  if (view === "settings")
    return (
      <>
        <div aria-hidden="true">
          <Dashboard />
        </div>
        <SettingsView />
      </>
    );
  if (view === "billing") return <BillingView />;
  return <Dashboard />;
}

function Dashboard() {
  const { campaigns, assets, calendar, brand, profile, user, ideas, videoProgress } = useStudio();
  const upcoming = calendar.filter((item) => new Date(item.publish_at) >= new Date()).slice(0, 4);
  const firstName = (
    profile?.full_name ||
    (user?.user_metadata?.full_name as string) ||
    "there"
  ).split(" ")[0];
  const ready = assets.filter((asset) => asset.status === "approved").length;
  const review = assets.filter((asset) => asset.status === "review").length;
  const scheduled = calendar.filter((item) => item.status !== "published").length;
  const briefing =
    (brand?.completion || 0) < 80
      ? {
          title: "One stronger Brand DNA pass will make every draft more specific.",
          body: "Add the proof, phrases, or offer details customers actually respond to before building the next campaign.",
          to: "/studio/brand" as const,
          action: "Strengthen Brand DNA",
          color: "var(--spotlight)",
          soft: "var(--spotlight-soft)",
        }
      : ideas.length && !videoProgress.length
        ? {
            title: `You have ${ideas.length} useful ${ideas.length === 1 ? "idea" : "ideas"}. Choose which video earns the next slot.`,
            body: "The roadmap ranks the video by the business problem it can remove, using your Brand DNA as context.",
            to: "/studio/roadmap" as const,
            action: "See the recommendation",
            color: "var(--evergreen)",
            soft: "var(--evergreen-soft)",
          }
        : review > 0
          ? {
              title: `${review} ${review === 1 ? "piece is" : "pieces are"} waiting for a decision—not another draft.`,
              body: "Approve what is ready, leave one useful note, and keep the campaign moving toward the calendar.",
              to: "/studio/approvals" as const,
              action: "Review the work",
              color: "var(--reel)",
              soft: "var(--reel-soft)",
            }
          : {
              title: upcoming[0]
                ? `Next on the calendar: ${upcoming[0].title}.`
                : "Your next useful move is ready when you are.",
              body: upcoming[0]
                ? `It is planned for ${new Date(upcoming[0].publish_at).toLocaleDateString()}. Check the asset and notes before the date arrives.`
                : "Ask a Pal for a recommendation grounded in your current campaigns, ideas, and Brand DNA.",
              to: upcoming[0] ? ("/studio/calendar" as const) : ("/studio/assistant" as const),
              action: upcoming[0] ? "Open the calendar" : "Ask a Pal",
              color: "var(--system)",
              soft: "var(--system-soft)",
            };
  const createOptions = [
    {
      to: "/studio",
      icon: Lightbulb,
      title: "Start with an idea",
      body: "Find the useful angle",
      color: "var(--spotlight)",
      soft: "var(--spotlight-soft)",
    },
    {
      to: "/studio/campaigns",
      icon: Play,
      title: "Turn a video into posts",
      body: "Plan the campaign system",
      color: "var(--reel)",
      soft: "var(--reel-soft)",
    },
    {
      to: "/studio/calendar",
      icon: CalendarDays,
      title: "Plan a campaign",
      body: "Map content and timing",
      color: "var(--evergreen)",
      soft: "var(--evergreen-soft)",
    },
    {
      to: "/studio/assistant",
      icon: Users,
      title: "Ask a Pal",
      body: "Get a context-aware next move",
      color: "var(--system)",
      soft: "var(--system-soft)",
    },
  ] as const;
  return (
    <div className="mx-auto max-w-[92rem]">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-base font-medium text-muted-foreground">
            Good to see you, {firstName}.
          </p>
          <h1 className="mt-2 text-[clamp(2.25rem,4.2vw,4.5rem)] font-black leading-[.95] tracking-[-.065em]">
            What are we turning into content today?
          </h1>
        </div>
        <Link to="/studio/success" className="secondary-action shrink-0">
          <HandHeart className="size-4" /> Benefits & Palmer House help
        </Link>
      </header>

      <section
        className="relative mt-7 overflow-hidden rounded-[1.25rem] border border-border p-5 sm:p-6"
        style={{ background: briefing.soft }}
      >
        <div className="relative z-10 max-w-3xl pr-24 sm:pr-40">
          <p className="studio-eyebrow" style={{ color: briefing.color }}>
            Kiana’s workspace briefing
          </p>
          <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">{briefing.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {briefing.body}
          </p>
          <Link
            to={briefing.to}
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-black underline underline-offset-4"
          >
            {briefing.action} <ArrowRight className="size-4" />
          </Link>
        </div>
        <img
          src={kianaHeadshot}
          alt="Kiana, your proof guide"
          className="absolute -bottom-8 -right-3 h-40 w-40 object-contain object-bottom sm:h-48 sm:w-48"
        />
      </section>

      <section className="mt-5 grid overflow-hidden rounded-[1.25rem] border border-border bg-white sm:grid-cols-2 xl:grid-cols-4">
        {createOptions.map((item, index) => (
          <Link
            key={item.title}
            to={item.to}
            className="group relative flex min-h-36 items-start gap-4 border-b border-border p-5 last:border-b-0 sm:[&:nth-child(odd)]:border-r xl:border-b-0 xl:border-r xl:last:border-r-0"
          >
            <span
              className="grid size-10 shrink-0 place-items-center rounded-xl"
              style={{ color: item.color, background: item.soft }}
            >
              <item.icon className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-extrabold">{item.title}</span>
              <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
                {item.body}
              </span>
            </span>
            <ArrowRight className="ml-auto size-4 shrink-0 transition-transform group-hover:translate-x-1" />
            <span className="sr-only">Option {index + 1}</span>
          </Link>
        ))}
      </section>

      {!campaigns.length ? (
        <section className="mt-5 rounded-[1.25rem] border border-system bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xl font-black">
                Your Studio is ready. Let’s teach it your business.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Three short steps turn an empty workspace into your own content system.
              </p>
            </div>
            <span className="rounded-full bg-system-soft px-3 py-1 text-xs font-bold text-system">
              1 of 3 ready
            </span>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              {
                to: "/studio/brand" as const,
                icon: Gauge,
                title: "Build Brand DNA",
                note: "Audience, offer, voice, and proof",
                color: "var(--spotlight)",
                soft: "var(--spotlight-soft)",
              },
              {
                to: "/studio/ideas" as const,
                icon: Lightbulb,
                title: "Save the first idea",
                note: "Capture a real customer question",
                color: "var(--reel)",
                soft: "var(--reel-soft)",
              },
              {
                to: "/studio" as const,
                icon: Sparkles,
                title: "Build the first campaign",
                note: "Turn the idea into usable work",
                color: "var(--evergreen)",
                soft: "var(--evergreen-soft)",
              },
            ].map((step) => (
              <Link
                key={step.title}
                to={step.to}
                className="group flex min-h-24 items-center gap-4 rounded-xl border border-border bg-white p-4 hover:border-ink"
              >
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-xl"
                  style={{ background: step.soft, color: step.color }}
                >
                  <step.icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-extrabold">{step.title}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{step.note}</span>
                </span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-5 grid gap-4 rounded-[1.25rem] border border-border p-5 sm:grid-cols-2 xl:grid-cols-[1.25fr_repeat(4,1fr)_auto] xl:items-center">
        <div>
          <p className="text-lg font-black">Studio Pulse</p>
          <p className="mt-1 text-xs text-muted-foreground">Your useful work, at a glance</p>
        </div>
        {[
          [
            FileStack,
            `${ready} pieces`,
            "ready to use",
            "var(--evergreen)",
            "var(--evergreen-soft)",
          ],
          [Eye, String(review), "awaiting review", "var(--spotlight)", "var(--spotlight-soft)"],
          [CalendarDays, String(scheduled), "on the calendar", "var(--reel)", "var(--reel-soft)"],
          [
            CheckCircle2,
            String(campaigns.length),
            "campaign systems",
            "var(--system)",
            "var(--system-soft)",
          ],
        ].map(([Icon, value, note, color, soft]) => (
          <div
            key={String(note)}
            className="flex items-center gap-3 xl:border-l xl:border-border xl:pl-5"
          >
            <span
              className="grid size-9 shrink-0 place-items-center rounded-full"
              style={{ color: String(color), background: String(soft) }}
            >
              <Icon className="size-4" />
            </span>
            <div>
              <p className="text-xl font-black">{String(value)}</p>
              <p className="text-[10px] text-muted-foreground">{String(note)}</p>
            </div>
          </div>
        ))}
        <Link to="/studio/approvals" className="secondary-action">
          View work
        </Link>
      </section>

      <section className="mt-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="studio-eyebrow text-reel">Continue working</p>
            <h2 className="mt-2 text-2xl font-black">Campaigns in motion</h2>
          </div>
          <Link
            to="/studio/campaigns"
            className="inline-flex min-h-11 items-center text-xs font-bold"
          >
            View all campaigns →
          </Link>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {campaigns.slice(0, 3).map((campaign, index) => {
            const lane = lanes[campaign.primary_lane as keyof typeof lanes] || lanes.spotlight;
            const campaignAssets = assets.filter((asset) => asset.campaign_id === campaign.id);
            const completed = campaignAssets.filter((asset) => asset.status === "approved").length;
            return (
              <Link
                key={campaign.id}
                to="/studio/campaigns/$campaignId"
                params={{ campaignId: campaign.id }}
                className="group rounded-[1.25rem] border border-border p-4 transition hover:-translate-y-0.5 hover:border-ink"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="grid size-14 shrink-0 place-items-center rounded-xl text-white"
                    style={{ background: lane.color }}
                  >
                    <LayoutGrid className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 font-extrabold">{campaign.title}</p>
                    <p className="mt-1 font-mono text-[8px] uppercase tracking-[.12em] text-muted-foreground">
                      {lane.label} · {campaign.status}
                    </p>
                  </div>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-spotlight-soft">
                    <span
                      className="block h-full rounded-full"
                      style={{
                        width: `${Math.max(16, Math.min(100, campaignAssets.length ? (completed / campaignAssets.length) * 100 : (index + 1) * 22))}%`,
                        background: lane.color,
                      }}
                    />
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground">
                    {completed}/{campaignAssets.length}
                  </span>
                </div>
              </Link>
            );
          })}
          {!campaigns.length ? (
            <div className="studio-card lg:col-span-3">
              <EmptyState
                icon={WandSparkles}
                title="Your first campaign starts with one useful idea."
                body="The engine will build the strategy, drafts, production notes, and calendar together."
                action={
                  <Link to="/studio" className="primary-action">
                    Start with an idea
                  </Link>
                }
              />
            </div>
          ) : null}
        </div>
      </section>

      <section className="mt-8">
        <p className="studio-eyebrow text-system">Your content system</p>
        <h2 className="mt-2 text-2xl font-black">The parts that keep the work connected</h2>
        <div className="mt-4 grid gap-4 xl:grid-cols-[.7fr_1.35fr_1fr]">
          <article className="studio-card flex flex-col">
            <p className="font-extrabold">Brand DNA</p>
            <p className="mt-1 text-sm text-system">{brand?.completion || 0}% complete</p>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-system-soft">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${brand?.completion || 0}%` }}
                className="h-full bg-system"
              />
            </div>
            <div className="mt-6 space-y-3">
              {["Business context", "Audience & offers", "Voice & language", "Proof library"].map(
                (item, index) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <span
                      className={`grid size-5 place-items-center rounded-full ${index < 3 ? "bg-evergreen text-white" : "border border-border"}`}
                    >
                      {index < 3 ? <Check className="size-3" /> : null}
                    </span>
                    {item}
                  </div>
                ),
              )}
            </div>
            <Link to="/studio/brand" className="secondary-action mt-auto w-full">
              Continue setup
            </Link>
          </article>
          <article className="studio-card overflow-hidden p-4">
            <div className="flex items-center justify-between px-2 pt-2">
              <div>
                <p className="font-extrabold">Content map</p>
                <p className="mt-1 text-xs text-muted-foreground">Where the work is right now</p>
              </div>
              <Link
                to="/studio/campaigns"
                className="inline-flex min-h-11 items-center text-xs font-bold"
              >
                View campaigns
              </Link>
            </div>
            <CampaignFlowMap
              campaigns={campaigns.length}
              assets={assets.length}
              review={review}
              scheduled={scheduled}
            />
          </article>
          <div className="grid gap-4">
            <article className="studio-card">
              <div className="flex items-center justify-between">
                <p className="font-extrabold">Upcoming</p>
                <Link
                  to="/studio/calendar"
                  className="inline-flex min-h-11 items-center text-[11px] font-bold"
                >
                  Calendar →
                </Link>
              </div>
              <div className="mt-4 divide-y divide-border">
                {upcoming.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-3">
                    <time className="grid size-10 place-items-center rounded-lg border border-border font-mono text-[9px]">
                      {new Date(item.publish_at).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-extrabold">{item.title}</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">{item.channel}</p>
                    </div>
                    <span className="rounded-full bg-system-soft px-2 py-1 text-[8px] font-bold text-system">
                      {item.status}
                    </span>
                  </div>
                ))}
                {!upcoming.length ? (
                  <p className="py-6 text-sm text-muted-foreground">Nothing scheduled yet.</p>
                ) : null}
              </div>
            </article>
            <article className="studio-card">
              <div className="flex items-center justify-between">
                <p className="font-extrabold">Recent library</p>
                <Link
                  to="/studio/library"
                  className="inline-flex min-h-11 items-center text-[11px] font-bold"
                >
                  Library →
                </Link>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {assets.slice(0, 3).map((asset, index) => (
                  <Link
                    key={asset.id}
                    to="/studio/library"
                    className="group overflow-hidden rounded-xl border border-border bg-white"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                      <img
                        src={assetMedia(asset, index)}
                        alt=""
                        className="size-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      {(() => {
                        const meta = assetKindMeta(asset.kind);
                        return (
                          <span
                            className="absolute bottom-2 left-2 grid size-7 place-items-center rounded-lg bg-white shadow-soft"
                            style={{ color: meta.color }}
                          >
                            <meta.icon className="size-3.5" />
                          </span>
                        );
                      })()}
                    </div>
                    <p className="line-clamp-2 p-2 text-[10px] font-bold leading-snug">
                      {asset.title}
                    </p>
                  </Link>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

function CampaignFlowMap({
  campaigns,
  assets,
  review,
  scheduled,
}: {
  campaigns: number;
  assets: number;
  review: number;
  scheduled: number;
}) {
  const reduce = useReducedMotion();
  const steps = [
    {
      label: "Campaign briefs",
      note: "The outcome and audience",
      value: campaigns,
      icon: Target,
      color: "var(--spotlight)",
      soft: "var(--spotlight-soft)",
      to: "/studio/campaigns" as const,
    },
    {
      label: "Assets built",
      note: "Scripts, posts, and plans",
      value: assets,
      icon: LayoutGrid,
      color: "var(--reel)",
      soft: "var(--reel-soft)",
      to: "/studio/library" as const,
    },
    {
      label: "Needs a decision",
      note: "Waiting for your review",
      value: review,
      icon: Eye,
      color: "var(--evergreen)",
      soft: "var(--evergreen-soft)",
      to: "/studio/approvals" as const,
    },
    {
      label: "On the calendar",
      note: "Ready with a date",
      value: scheduled,
      icon: CalendarDays,
      color: "var(--system)",
      soft: "var(--system-soft)",
      to: "/studio/calendar" as const,
    },
  ];
  return (
    <div className="mt-5 px-2 pb-2">
      <div className="grid gap-2 sm:grid-cols-2">
        {steps.map((step, index) => (
          <motion.div
            key={step.label}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.3 }}
          >
            <Link
              to={step.to}
              className="group flex min-h-28 items-start gap-3 rounded-[1rem] border border-border bg-white p-4 hover:border-ink"
            >
              <span
                className="grid size-10 shrink-0 place-items-center rounded-xl"
                style={{ background: step.soft, color: step.color }}
              >
                <step.icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-2xl font-black">{step.value}</span>
                <span className="mt-1 block text-xs font-extrabold">{step.label}</span>
                <span className="mt-1 block text-[10px] leading-relaxed text-muted-foreground">
                  {step.note}
                </span>
              </span>
              <ArrowRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-xl bg-system-soft px-4 py-3 text-xs text-system">
        <Activity className="size-4 shrink-0" />
        <p>
          <strong>{assets ? Math.round((scheduled / assets) * 100) : 0}%</strong> of created assets
          currently have a publishing date.
        </p>
      </div>
    </div>
  );
}

type StarterIdea = {
  id: string;
  text: string;
  lane: keyof typeof lanes;
  source: string;
  problem: string;
};

const starterIdeas: StarterIdea[] = [
  {
    id: "starter-faq",
    text: "Answer the question customers ask right before they buy.",
    lane: "evergreen",
    source: "Repeated question",
    problem: "Sales conversations repeat the same education before a customer can decide.",
  },
  {
    id: "starter-proof",
    text: "Show the moment a client finally understood the value.",
    lane: "spotlight",
    source: "Proof moment",
    problem: "The business has results, but the proof is hard for a new customer to see.",
  },
  {
    id: "starter-process",
    text: "Turn one invisible team process into a useful walkthrough.",
    lane: "system",
    source: "Tribal knowledge",
    problem: "A useful process lives in one person’s head instead of a reusable system.",
  },
  {
    id: "starter-conversation",
    text: "Ask the audience what keeps delaying the decision.",
    lane: "reel",
    source: "Conversation starter",
    problem: "The business is posting without learning what the audience needs next.",
  },
];

function IdeasBoard() {
  const { ideas, createIdea, updateIdea, uploadIdeaSource, suggestDirections, brand, busy } =
    useStudio();
  const [draft, setDraft] = useState("");
  const [sourceType, setSourceType] = useState<"text" | "link" | "image">("text");
  const [sourceUrl, setSourceUrl] = useState("");
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourcePreview, setSourcePreview] = useState("");
  const [previewById, setPreviewById] = useState<Record<string, string>>({});
  const [problem, setProblem] = useState("");
  const [lane, setLane] = useState<keyof typeof lanes>("evergreen");
  const [filter, setFilter] = useState<"all" | keyof typeof lanes>("all");
  const [directions, setDirections] = useState<Awaited<ReturnType<typeof suggestDirections>>>([]);
  const savedIdeas = ideas.filter((item) => item.status !== "archived");
  const combined = savedIdeas.length
    ? savedIdeas.map((item) => ({
        id: item.id,
        text: item.body,
        lane: item.primary_lane as keyof typeof lanes,
        source: item.source_type,
        problem: item.business_problem,
        sourceUrl: item.source_url,
        saved: true,
      }))
    : starterIdeas.map((item) => ({ ...item, sourceUrl: null, saved: false }));
  const visible = filter === "all" ? combined : combined.filter((item) => item.lane === filter);

  async function addIdea(findAngles = false) {
    const fallback =
      sourceType === "image" && sourceFile
        ? `Use ${sourceFile.name} as the visual source for a campaign.`
        : sourceType === "link" && sourceUrl
          ? `Turn the useful material at ${sourceUrl} into a campaign.`
          : "";
    const body = draft.trim() || fallback;
    if (body.length < 8) {
      toast.error("Add a thought, link, or image with enough context to guide the campaign.");
      return;
    }
    try {
      const mediaPath = sourceFile ? await uploadIdeaSource(sourceFile) : undefined;
      const id = await createIdea({
        body,
        sourceType,
        sourceUrl: sourceType === "link" ? sourceUrl : undefined,
        sourceMediaPath: mediaPath,
        lane,
        businessProblem: problem.trim() || `${lanes[lane].role}: ${body}`,
      });
      if (sourcePreview) setPreviewById((current) => ({ ...current, [id]: sourcePreview }));
      if (findAngles) {
        const next = await suggestDirections({
          idea: body,
          goal: "Turn source material into a useful campaign",
          audience: brand?.primary_audience || "The business’s primary audience",
        });
        setDirections(next);
      }
      setDraft("");
      setSourceUrl("");
      setSourceFile(null);
      setSourcePreview("");
      setProblem("");
      toast.success(
        findAngles
          ? "Saved and shaped into three campaign directions."
          : "Saved to this workspace.",
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save this source.");
    }
  }
  return (
    <div className="mx-auto max-w-[88rem]">
      <PageIntro
        eyebrow="Content ideas"
        title="Catch the useful thought before it disappears."
        body="Start with a thought, a link, or an image. The Studio keeps the source, names the business problem, and helps turn it into a connected campaign."
        action={
          <Link
            to="/studio"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-system px-5 text-sm font-bold text-white"
          >
            <Sparkles className="size-4" /> Open the engine
          </Link>
        }
      />
      <section className="mt-8 grid gap-6 xl:grid-cols-[.72fr_1.28fr]">
        <div className="studio-card h-fit xl:sticky xl:top-24">
          <p className="studio-eyebrow text-system">Quick capture</p>
          <h2 className="mt-3 text-2xl font-black">What are we starting with?</h2>
          <div className="mt-5 grid grid-cols-3 rounded-xl border border-border bg-white p-1">
            {(["text", "link", "image"] as const).map((value) => (
              <button
                key={value}
                onClick={() => setSourceType(value)}
                className={`min-h-11 rounded-lg text-xs font-bold capitalize ${sourceType === value ? "bg-system-soft text-system" : "text-muted-foreground"}`}
              >
                {value}
              </button>
            ))}
          </div>
          {sourceType === "link" ? (
            <label className="mt-4 block text-sm font-bold">
              Link to use as the source
              <input
                type="url"
                value={sourceUrl}
                onChange={(event) => setSourceUrl(event.target.value)}
                placeholder="https://…"
                className="mt-2 min-h-12 w-full rounded-xl border border-border px-4 text-sm outline-none focus:border-system"
              />
            </label>
          ) : null}
          {sourceType === "image" ? (
            <label className="mt-4 flex min-h-36 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-system bg-system-soft p-4 text-center">
              {sourcePreview ? (
                <img
                  src={sourcePreview}
                  alt="Selected campaign source"
                  className="max-h-44 w-full rounded-lg object-cover"
                />
              ) : (
                <>
                  <ImageUp className="size-6 text-system" />
                  <span className="mt-3 text-sm font-black text-system">
                    Choose a before-and-after, product, or reference image
                  </span>
                  <span className="mt-1 text-[10px] text-muted-foreground">
                    PNG, JPG, or WebP · private workspace upload
                  </span>
                </>
              )}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;
                  setSourceFile(file);
                  if (sourcePreview) URL.revokeObjectURL(sourcePreview);
                  setSourcePreview(file ? URL.createObjectURL(file) : "");
                }}
              />
            </label>
          ) : null}
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            rows={6}
            placeholder={
              sourceType === "image"
                ? "What should the audience notice about this image?"
                : sourceType === "link"
                  ? "What is useful about this link?"
                  : "A customer asked why…"
            }
            className="mt-5 w-full resize-none rounded-xl border border-border p-4 text-base outline-none focus:border-system"
          />
          <label className="mt-4 block text-sm font-extrabold">
            What business problem could this solve?
            <input
              value={problem}
              onChange={(event) => setProblem(event.target.value)}
              placeholder="Customers cannot see the difference…"
              className="mt-2 min-h-12 w-full rounded-xl border border-border px-4 text-sm font-medium outline-none focus:border-system"
            />
          </label>
          <p className="mt-5 text-sm font-extrabold">Which job does it do?</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(
              Object.entries(lanes) as Array<
                [keyof typeof lanes, (typeof lanes)[keyof typeof lanes]]
              >
            ).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setLane(key)}
                className={`min-h-12 rounded-xl border px-3 text-left text-xs font-bold ${lane === key ? "border-ink" : "border-border"}`}
                style={{
                  background: lane === key ? item.soft : "white",
                  color: lane === key ? item.color : "var(--ink)",
                }}
              >
                {item.label}
                <span className="mt-1 block text-[9px] font-medium text-muted-foreground">
                  {item.role}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <button
              onClick={() => void addIdea(false)}
              disabled={busy}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-system px-4 text-sm font-bold text-system disabled:opacity-45"
            >
              <Plus className="size-4" /> Save source
            </button>
            <button
              onClick={() => void addIdea(true)}
              disabled={busy}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-system px-4 text-sm font-bold text-white disabled:opacity-45"
            >
              {busy ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
              )}{" "}
              Suggest campaign
            </button>
          </div>
          <div className="mt-6">
            <PalTip name="Samira" headshot={samiraHeadshot} color="var(--system)">
              If your team has said it twice, save the exact wording. That is usually the useful
              part.
            </PalTip>
          </div>
        </div>
        <div>
          {directions.length ? (
            <section className="mb-6 rounded-[1.25rem] border border-system bg-system-soft p-5">
              <p className="studio-eyebrow text-system">Campaign directions</p>
              <div className="mt-4 grid gap-3 lg:grid-cols-3">
                {directions.map((direction) => (
                  <article key={direction.id} className="rounded-xl bg-white p-4">
                    <p className="text-[9px] font-black uppercase tracking-[.12em] text-system">
                      {direction.lane}
                    </p>
                    <p className="mt-2 text-sm font-black">{direction.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {direction.angle}
                    </p>
                    <Link
                      to="/studio/campaigns"
                      className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-system"
                    >
                      Build campaign <ArrowRight className="size-3.5" />
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="studio-eyebrow text-reel">Idea bank</p>
              <h2 className="mt-2 text-2xl font-black">Ready when you are</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "spotlight", "reel", "evergreen", "system"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`min-h-11 rounded-full px-4 text-xs font-bold capitalize ${filter === item ? "bg-system text-white" : "border border-border bg-white"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="studio-content-list mt-5 grid gap-4 sm:grid-cols-2">
            {visible.map((idea) => {
              const meta = lanes[idea.lane];
              return (
                <motion.article layout key={idea.id} className="studio-card flex min-h-56 flex-col">
                  <div className="flex items-center justify-between">
                    <span
                      className="flex items-center gap-2 text-xs font-extrabold"
                      style={{ color: meta.color }}
                    >
                      <span
                        className="grid size-8 place-items-center rounded-lg"
                        style={{ background: meta.soft }}
                      >
                        <Lightbulb className="size-3.5" />
                      </span>
                      {meta.label} idea
                    </span>
                    <button
                      aria-label="More idea options"
                      className="grid size-12 place-items-center rounded-full border border-border"
                    >
                      <MoreHorizontal className="size-4" />
                    </button>
                  </div>
                  <p className="mt-6 text-xl font-extrabold leading-snug">{idea.text}</p>
                  {previewById[idea.id] ? (
                    <img
                      src={previewById[idea.id]}
                      alt="Idea source"
                      className="mt-4 h-32 w-full rounded-xl object-cover"
                    />
                  ) : null}
                  <p className="mt-3 text-xs text-muted-foreground">Source: {idea.source}</p>
                  {idea.sourceUrl ? (
                    <a
                      href={idea.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-system"
                    >
                      Open source <ExternalLink className="size-3" />
                    </a>
                  ) : null}
                  <div className="mt-4 rounded-xl bg-mist p-3">
                    <p className="text-[9px] font-black uppercase tracking-[.12em] text-muted-foreground">
                      Problem it solves
                    </p>
                    <p className="mt-2 text-xs font-bold leading-relaxed">{idea.problem}</p>
                  </div>
                  <div className="mt-auto flex gap-2 pt-6">
                    <Link
                      to="/studio"
                      className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold"
                      style={{ background: meta.soft, color: meta.color }}
                    >
                      Build this <ArrowRight className="size-4" />
                    </Link>
                    <button
                      onClick={() =>
                        idea.saved
                          ? void updateIdea(idea.id, { status: "archived" })
                          : toast.success("Starter hidden once you save your first workspace idea.")
                      }
                      className="grid size-12 place-items-center rounded-xl border border-border"
                      aria-label={`Archive ${idea.text}`}
                    >
                      <Archive className="size-4" />
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function Approvals() {
  const { assets, updateAsset } = useStudio();
  const [filter, setFilter] = useState<"review" | "approved" | "draft" | "all">("review");
  const items = filter === "all" ? assets : assets.filter((asset) => asset.status === filter);
  async function setStatus(asset: Asset, status: string) {
    try {
      await updateAsset(asset.id, { status });
      toast.success(
        status === "approved" ? "Approved and ready to use." : "Moved back to draft for revisions.",
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update this asset.");
    }
  }
  return (
    <div className="mx-auto max-w-[88rem]">
      <PageIntro
        eyebrow="Approvals"
        title="One clear place to make the final call."
        body="Review the words, approve what is ready, and send revisions back without losing the campaign context."
      />
      <div className="mt-7 flex flex-wrap gap-2">
        {(["review", "draft", "approved", "all"] as const).map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`min-h-11 rounded-full px-5 text-sm font-bold capitalize ${filter === item ? "bg-ink text-white" : "border border-border"}`}
          >
            {item}
            <span className="ml-2 opacity-60">
              {item === "all"
                ? assets.length
                : assets.filter((asset) => asset.status === item).length}
            </span>
          </button>
        ))}
      </div>
      <div className="studio-content-list mt-6 grid gap-4 xl:grid-cols-2">
        {items.map((asset) => (
          <article key={asset.id} className="studio-card flex flex-col sm:min-h-80">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-spotlight-soft px-3 py-1 font-mono text-[8px] uppercase tracking-[.13em] text-spotlight">
                {asset.kind.replaceAll("_", " ")}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-[9px] font-bold ${asset.status === "approved" ? "bg-evergreen-soft text-evergreen" : asset.status === "review" ? "bg-reel-soft text-reel" : "border border-border"}`}
              >
                {asset.status}
              </span>
            </div>
            <h2 className="mt-5 text-xl font-black">{asset.title}</h2>
            <p className="mt-3 line-clamp-5 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {asset.content}
            </p>
            <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row">
              <button
                onClick={() => void setStatus(asset, "approved")}
                disabled={asset.status === "approved"}
                className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-evergreen px-4 text-sm font-bold text-white disabled:opacity-40"
              >
                <Check className="size-4" /> Approve
              </button>
              <button
                onClick={() => void setStatus(asset, "draft")}
                className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-border px-4 text-sm font-bold"
              >
                <ListTodo className="size-4" /> Needs changes
              </button>
              <button
                onClick={() =>
                  void navigator.clipboard
                    .writeText(asset.content)
                    .then(() => toast.success("Copied."))
                }
                className="grid size-12 place-items-center rounded-xl border border-border"
                aria-label={`Copy ${asset.title}`}
              >
                <Clipboard className="size-4" />
              </button>
            </div>
          </article>
        ))}
        {!items.length ? (
          <div className="studio-card xl:col-span-2">
            <EmptyState
              icon={CheckCircle2}
              title="Nothing is waiting here."
              body="Choose another status or build a campaign to create reviewable work."
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Campaigns() {
  const { campaigns, createCampaign, busy, brand } = useStudio();
  const navigate = useNavigate();
  const [builder, setBuilder] = useState(campaigns.length === 0);
  const [step, setStep] = useState(0);
  const [brief, setBrief] = useState<{
    title: string;
    goal: string;
    topic: string;
    offer: string;
    audience: string;
    anchorFormat: string;
    depth: "quick" | "strategic" | "deep";
  }>({
    title: "New campaign",
    goal: studioGoals[0],
    topic: "",
    offer: "",
    audience: brand?.primary_audience || "",
    anchorFormat: anchorFormats[0].value,
    depth: "strategic" as "quick" | "strategic" | "deep",
  });
  async function generate() {
    try {
      const id = await createCampaign(brief);
      toast.success("Your campaign system is ready.");
      void navigate({ to: "/studio/campaigns/$campaignId", params: { campaignId: id } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Campaign generation failed.");
    }
  }
  if (builder)
    return (
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => setBuilder(false)}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground"
        >
          ← All campaigns
        </button>
        <PageIntro
          eyebrow={`Campaign architect · ${step + 1} of 4`}
          title={
            [
              "Choose the job.",
              "Give it one useful idea.",
              "Choose the anchor.",
              "Ready for the Pals.",
            ][step]
          }
          body={
            [
              "Every campaign begins with a business outcome—not a format.",
              "Specific context produces useful work. Give the campaign something real to organize.",
              "The anchor gives every smaller asset a source of truth.",
              "The Studio will build strategy, scripts, production, and a schedule as one system.",
            ][step]
          }
        />
        <div className="mt-8 studio-card p-5 sm:p-8">
          <div className="mb-8 h-1 overflow-hidden rounded-full bg-secondary">
            <motion.div
              animate={{ width: `${((step + 1) / 4) * 100}%` }}
              className="h-full bg-system"
            />
          </div>
          {step === 0 && (
            <ChoiceGrid
              options={studioGoals.map((goal) => ({ value: goal, label: goal }))}
              value={brief.goal}
              onChange={(goal) => setBrief({ ...brief, goal })}
            />
          )}
          {step === 1 && (
            <div className="grid gap-5">
              <Field
                as="textarea"
                label="What is the idea, problem, or question?"
                value={brief.topic}
                onChange={(event) => setBrief({ ...brief, topic: event.target.value })}
                placeholder="Customers keep asking whether…"
                rows={6}
                required
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="What are we inviting them toward?"
                  value={brief.offer}
                  onChange={(event) => setBrief({ ...brief, offer: event.target.value })}
                  placeholder="A discovery call, service, event…"
                />
                <Field
                  label="Who needs this most?"
                  value={brief.audience}
                  onChange={(event) => setBrief({ ...brief, audience: event.target.value })}
                  placeholder="The exact audience…"
                  required
                />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {anchorFormats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => setBrief({ ...brief, anchorFormat: format.value })}
                  className={`rounded-2xl border p-5 text-left ${brief.anchorFormat === format.value ? "border-ink bg-ink text-white" : "border-border"}`}
                >
                  <p className="font-bold">{format.label}</p>
                  <p
                    className={`mt-2 text-sm ${brief.anchorFormat === format.value ? "text-white/60" : "text-muted-foreground"}`}
                  >
                    {format.detail}
                  </p>
                </button>
              ))}
            </div>
          )}
          {step === 3 && (
            <div>
              <div className="grid gap-3 sm:grid-cols-4">
                {Object.values(lanes).map((lane) => (
                  <div
                    key={lane.label}
                    className="rounded-2xl p-4"
                    style={{ background: lane.soft }}
                  >
                    <span
                      className="block size-2 rounded-full"
                      style={{ background: lane.color }}
                    />
                    <p className="mt-8 font-bold">{lane.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{lane.role}</p>
                  </div>
                ))}
              </div>
              <label className="mt-6 block text-sm font-semibold">
                Planning depth
                <select
                  value={brief.depth}
                  onChange={(event) =>
                    setBrief({ ...brief, depth: event.target.value as typeof brief.depth })
                  }
                  className="mt-2 min-h-12 w-full rounded-2xl border border-border bg-white px-4"
                >
                  <option value="quick">Quick direction</option>
                  <option value="strategic">Strategic campaign</option>
                  <option value="deep">Deep production plan</option>
                </select>
              </label>
            </div>
          )}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              onClick={() => (step > 0 ? setStep(step - 1) : setBuilder(false))}
              className="min-h-12 rounded-2xl border border-border px-5 font-semibold"
            >
              Back
            </button>
            {step < 3 ? (
              <button
                disabled={step === 1 && (!brief.topic.trim() || !brief.audience.trim())}
                onClick={() => setStep(step + 1)}
                className="primary-action disabled:opacity-40"
              >
                Continue <ArrowRight className="size-4" />
              </button>
            ) : (
              <button
                disabled={busy}
                onClick={() => void generate()}
                className="primary-action min-w-44"
              >
                {busy ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Building campaign…
                  </>
                ) : (
                  <>
                    Build complete campaign <Sparkles className="size-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  return (
    <div className="mx-auto max-w-[88rem]">
      <PageIntro
        eyebrow="Campaigns"
        title="Every idea, fully connected."
        body="No scattered prompt history. Each campaign keeps the strategy, scripts, production plan, assets, schedule, and human support together."
        action={
          <button
            onClick={() => {
              setStep(0);
              setBuilder(true);
            }}
            className="primary-action"
          >
            <Plus className="size-4" />
            New campaign
          </button>
        }
      />
      <div className="mt-8">
        <CampaignList campaigns={campaigns} expanded />
        {!campaigns.length && (
          <div className="studio-card">
            <EmptyState
              icon={WandSparkles}
              title="Build your first complete campaign."
              body="It takes about three minutes to give the Studio enough direction."
              action={
                <button onClick={() => setBuilder(true)} className="primary-action">
                  Start campaign <ArrowRight className="size-4" />
                </button>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

function CampaignDetail({ campaignId }: { campaignId?: string }) {
  const { campaigns, assets, campaignOutputs, requestService } = useStudio();
  const campaign = campaigns.find((item) => item.id === campaignId);
  const items = assets.filter((item) => item.campaign_id === campaignId);
  const output = campaignId ? campaignOutputs[campaignId] : undefined;
  const [tab, setTab] = useState("strategy");
  if (!campaign)
    return (
      <div className="mx-auto max-w-4xl studio-card">
        <EmptyState
          icon={Archive}
          title="Campaign not found."
          body="It may have been archived or belongs to another workspace."
          action={
            <Link to="/studio/campaigns" className="primary-action">
              Back to campaigns
            </Link>
          }
        />
      </div>
    );
  const lane = lanes[campaign.primary_lane as keyof typeof lanes] || lanes.spotlight;
  const tabs = ["strategy", "scripts", "production", "publish"];
  return (
    <div className="mx-auto max-w-[88rem]">
      <div
        className="overflow-hidden rounded-[2rem] p-6 text-white sm:p-8"
        style={{ background: lane.color }}
      >
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.18em] text-white/55">
              {lane.label} campaign · {campaign.status}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[.96] tracking-[-.055em] sm:text-6xl">
              {campaign.title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm text-white/70">{campaign.goal}</p>
          </div>
          <button
            onClick={() =>
              void requestService(
                "strategy_review",
                `Please review the ${campaign.title} campaign.`,
                campaign.id,
              )
            }
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-ink"
          >
            Ask Palmer House to review
          </button>
        </div>
      </div>
      <div className="mt-5 overflow-x-auto">
        <div className="flex min-w-max gap-2">
          {tabs.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`rounded-xl px-5 py-3 text-sm font-semibold capitalize ${tab === item ? "bg-ink text-white" : "bg-white"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_19rem]">
        <div className="space-y-5">
          {tab === "strategy" && <StrategyPanel campaign={campaign} output={output} />}
          {tab === "scripts" && (
            <AssetPanel
              items={items.filter((item) =>
                [
                  "anchor_script",
                  "short_script",
                  "caption",
                  "newsletter",
                  "faq",
                  "carousel",
                ].includes(item.kind),
              )}
            />
          )}
          {tab === "production" && <ProductionPanel campaign={campaign} output={output} />}
          {tab === "publish" && <PublishPanel campaign={campaign} />}
        </div>
        <aside className="studio-card h-fit">
          <p className="font-mono text-[9px] uppercase tracking-[.17em] text-muted-foreground">
            Campaign handoff
          </p>
          <div className="mt-5 space-y-3">
            <button
              onClick={() => downloadCampaign(campaign, items)}
              className="secondary-action w-full"
            >
              <Download className="size-4" />
              Download campaign
            </button>
            <button
              onClick={() =>
                void navigator.clipboard
                  .writeText(
                    items.map((item) => `${item.title}\n${item.content}`).join("\n\n---\n\n"),
                  )
                  .then(() => toast.success("Campaign copied."))
              }
              className="secondary-action w-full"
            >
              <Clipboard className="size-4" />
              Copy all assets
            </button>
            <button onClick={() => window.print()} className="secondary-action w-full">
              <FileStack className="size-4" />
              Print / PDF
            </button>
          </div>
          <div className="mt-6 rounded-2xl bg-system-soft p-4">
            <p className="text-sm font-semibold">Ready to produce?</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              The brief is already here. Ask Palmer House to film or edit it.
            </p>
            <button
              onClick={() =>
                void requestService(
                  "full_production",
                  `Production request for ${campaign.title}`,
                  campaign.id,
                )
              }
              className="mt-4 text-xs font-bold underline underline-offset-4"
            >
              Request production
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StrategyPanel({
  campaign,
  output,
}: {
  campaign: Campaign;
  output?: ReturnType<typeof useStudio>["campaignOutputs"][string];
}) {
  const strategy = (output?.strategy || campaign.strategy) as {
    bigIdea?: string;
    audienceInsight?: string;
    promise?: string;
    messagePillars?: string[];
    channelPlan?: Array<{ channel: string; role: string }>;
  };
  return (
    <>
      <div className="studio-card">
        <p className="font-mono text-[9px] uppercase tracking-[.17em] text-muted-foreground">
          The organizing idea
        </p>
        <h2 className="mt-4 text-3xl font-extrabold">{strategy.bigIdea || campaign.topic}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Insight label="Audience truth" text={strategy.audienceInsight || campaign.audience} />
          <Insight label="Campaign promise" text={strategy.promise || campaign.offer} />
        </div>
      </div>
      <div className="studio-card">
        <h2 className="text-xl font-bold">Message pillars</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {(
            strategy.messagePillars || [
              "Name the friction",
              "Show useful proof",
              "Give one next step",
            ]
          ).map((pillar, index) => (
            <div
              key={pillar}
              className="rounded-2xl p-5"
              style={{
                background: ["var(--spotlight-soft)", "var(--reel-soft)", "var(--evergreen-soft)"][
                  index % 3
                ],
              }}
            >
              <span className="font-mono text-[9px] text-muted-foreground">0{index + 1}</span>
              <p className="mt-8 font-semibold">{pillar}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ProductionPanel({
  campaign,
  output,
}: {
  campaign: Campaign;
  output?: ReturnType<typeof useStudio>["campaignOutputs"][string];
}) {
  const plan = (output?.productionPlan || campaign.production_plan) as {
    objective?: string;
    estimatedMinutes?: number;
    location?: string;
    wardrobe?: string[];
    props?: string[];
    deliveryNotes?: string[];
    shots?: Array<{ shot: string; framing: string; purpose: string }>;
    broll?: string[];
    checklist?: string[];
  };
  return (
    <>
      <div className="studio-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.17em] text-muted-foreground">
              Filmable plan
            </p>
            <h2 className="mt-3 text-3xl font-extrabold">
              {plan.objective || "Turn the campaign into usable footage."}
            </h2>
          </div>
          <span className="rounded-xl bg-evergreen-soft px-4 py-3 text-sm font-semibold text-evergreen">
            ~{plan.estimatedMinutes || 75} minutes
          </span>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          <Insight label="Location" text={plan.location || "Choose a quiet, relevant location."} />
          <Insight label="Wardrobe" text={(plan.wardrobe || []).join(" · ")} />
          <Insight label="Props" text={(plan.props || []).join(" · ")} />
        </div>
      </div>
      <div className="studio-card overflow-hidden">
        <h2 className="text-xl font-bold">Shot list</h2>
        <div className="mt-5 divide-y divide-border">
          {(plan.shots || []).map((shot, index) => (
            <div
              key={`${shot.shot}-${index}`}
              className="grid gap-2 py-4 sm:grid-cols-[3rem_1fr_10rem_1fr]"
            >
              <span className="font-mono text-[9px] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="font-semibold">{shot.shot}</p>
              <p className="text-sm text-muted-foreground">{shot.framing}</p>
              <p className="text-sm text-muted-foreground">{shot.purpose}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PublishPanel({ campaign }: { campaign: Campaign }) {
  const { calendar } = useStudio();
  const items = calendar.filter((item) => item.campaign_id === campaign.id);
  return (
    <div className="studio-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[.17em] text-muted-foreground">
            Publishing plan
          </p>
          <h2 className="mt-2 text-2xl font-bold">The campaign has a rhythm.</h2>
        </div>
        <Link to="/studio/calendar" className="text-xs font-semibold">
          Open calendar
        </Link>
      </div>
      <div className="mt-7 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid gap-3 rounded-2xl border border-border bg-white p-4 sm:grid-cols-[8rem_1fr_10rem]"
          >
            <time className="font-mono text-xs">
              {new Date(item.publish_at).toLocaleDateString()}
            </time>
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.channel}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssetPanel({ items }: { items: Asset[] }) {
  const { updateAsset } = useStudio();
  const [selectedId, setSelectedId] = useState(items[0]?.id || "");
  const selected = items.find((asset) => asset.id === selectedId) || items[0];
  if (!selected) {
    return (
      <div className="studio-card">
        <EmptyState
          icon={FileText}
          title="No drafts yet."
          body="Build the campaign to create its working assets."
        />
      </div>
    );
  }
  const selectedMeta = assetKindMeta(selected.kind);
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-border bg-white lg:grid lg:min-h-[38rem] lg:grid-cols-[18rem_1fr]">
      <aside className="border-b border-border p-3 lg:border-b-0 lg:border-r">
        <div className="mb-3 px-2 py-2">
          <p className="font-mono text-[9px] uppercase tracking-[.16em] text-muted-foreground">
            Campaign assets
          </p>
          <p className="mt-2 text-sm font-extrabold">Choose one thing to work on</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
          {items.map((asset) => {
            const meta = assetKindMeta(asset.kind);
            return (
              <button
                key={asset.id}
                onClick={() => setSelectedId(asset.id)}
                className={`flex min-h-14 min-w-[15rem] items-center gap-3 rounded-xl px-3 text-left transition lg:min-w-0 lg:w-full ${selected.id === asset.id ? "border border-border bg-white shadow-soft" : "hover:bg-secondary"}`}
              >
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-xl"
                  style={{ background: `${meta.color}14`, color: meta.color }}
                >
                  <meta.icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{asset.title}</span>
                  <span className="font-mono text-[8px] uppercase tracking-[.14em] text-muted-foreground">
                    {meta.label} · {asset.status}
                  </span>
                </span>
                <ChevronRight className="size-3.5 shrink-0" />
              </button>
            );
          })}
        </div>
      </aside>
      <AnimatePresence mode="wait">
        <motion.section
          key={selected.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          className="flex min-w-0 flex-col p-5 sm:p-7"
        >
          <header className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <span
                className="grid size-11 shrink-0 place-items-center rounded-xl"
                style={{ background: `${selectedMeta.color}14`, color: selectedMeta.color }}
              >
                <selectedMeta.icon className="size-5" />
              </span>
              <div>
                <p className="text-xs font-extrabold" style={{ color: selectedMeta.color }}>
                  {selectedMeta.label}
                </p>
                <h2 className="mt-1 text-2xl font-black">{selected.title}</h2>
              </div>
            </div>
            <span className="w-fit rounded-full bg-evergreen-soft px-3 py-1 text-[9px] font-bold text-evergreen">
              {selected.status}
            </span>
          </header>
          <div className="mt-6 flex-1">
            <label className="text-sm font-extrabold" htmlFor={`asset-${selected.id}`}>
              Working draft
            </label>
            <textarea
              id={`asset-${selected.id}`}
              defaultValue={selected.content}
              onBlur={(event) => void updateAsset(selected.id, { content: event.target.value })}
              rows={Math.min(20, Math.max(11, selected.content.split("\n").length + 3))}
              className="mt-3 w-full resize-y rounded-[1.15rem] border border-border bg-white p-5 text-sm leading-[1.75] outline-none focus:border-system"
            />
          </div>
          <footer className="mt-5 flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => void updateAsset(selected.id, { status: "approved" })}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-evergreen px-4 text-sm font-bold text-white"
              >
                <Check className="size-4" /> Approve
              </button>
              <button
                onClick={() => void updateAsset(selected.id, { status: "review" })}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-spotlight-soft px-4 text-sm font-bold text-spotlight"
              >
                <Eye className="size-4" /> Send to review
              </button>
            </div>
            <button
              onClick={() =>
                void navigator.clipboard
                  .writeText(selected.content)
                  .then(() => toast.success("Copied."))
              }
              className="secondary-action"
            >
              <Clipboard className="size-4" />
              Copy
            </button>
          </footer>
        </motion.section>
      </AnimatePresence>
    </div>
  );
}

function BrandStudio() {
  const { brand, saveBrand, uploadBrandAsset } = useStudio();
  const [draft, setDraft] = useState({
    business_name: brand?.business_name || "",
    website: brand?.website || "",
    industry: brand?.industry || "",
    description: brand?.description || "",
    primary_audience: brand?.primary_audience || "",
    voice_traits: (brand?.voice_traits || []).join(", "),
    proof_points: (brand?.proof_points || []).join("\n"),
    calls_to_action: (brand?.calls_to_action || []).join("\n"),
    avoid_language: (brand?.avoid_language || []).join(", "),
    platforms: (brand?.platforms || []).join(", "),
  });
  async function save() {
    try {
      await saveBrand({
        business_name: draft.business_name,
        website: draft.website,
        industry: draft.industry,
        description: draft.description,
        primary_audience: draft.primary_audience,
        voice_traits: splitList(draft.voice_traits),
        proof_points: lineList(draft.proof_points),
        calls_to_action: lineList(draft.calls_to_action),
        avoid_language: splitList(draft.avoid_language),
        platforms: splitList(draft.platforms),
        completion: calculateCompletion(draft),
      });
      toast.success("Brand memory updated.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save brand.");
    }
  }
  return (
    <div className="mx-auto max-w-[88rem]">
      <PageIntro
        eyebrow="Brand Studio"
        title="Give every campaign the same memory."
        body="This is the source of truth the campaign engine uses. Add only language and proof your team can stand behind."
        action={
          <button onClick={() => void save()} className="primary-action">
            <Check className="size-4" />
            Save brand memory
          </button>
        }
      />
      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_22rem]">
        <div className="studio-card grid gap-5 sm:grid-cols-2">
          <Field
            label="Business name"
            value={draft.business_name}
            onChange={(e) => setDraft({ ...draft, business_name: e.target.value })}
          />
          <Field
            label="Website"
            type="url"
            value={draft.website}
            onChange={(e) => setDraft({ ...draft, website: e.target.value })}
          />
          <Field
            label="Industry"
            value={draft.industry}
            onChange={(e) => setDraft({ ...draft, industry: e.target.value })}
          />
          <Field
            label="Primary audience"
            value={draft.primary_audience}
            onChange={(e) => setDraft({ ...draft, primary_audience: e.target.value })}
          />
          <div className="sm:col-span-2">
            <Field
              as="textarea"
              rows={5}
              label="What the business does"
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            />
          </div>
          <Field
            label="Voice traits, separated by commas"
            value={draft.voice_traits}
            onChange={(e) => setDraft({ ...draft, voice_traits: e.target.value })}
          />
          <Field
            label="Platforms, separated by commas"
            value={draft.platforms}
            onChange={(e) => setDraft({ ...draft, platforms: e.target.value })}
          />
          <Field
            as="textarea"
            rows={5}
            label="Verified proof, one per line"
            value={draft.proof_points}
            onChange={(e) => setDraft({ ...draft, proof_points: e.target.value })}
          />
          <Field
            as="textarea"
            rows={5}
            label="Calls to action, one per line"
            value={draft.calls_to_action}
            onChange={(e) => setDraft({ ...draft, calls_to_action: e.target.value })}
          />
          <div className="sm:col-span-2">
            <Field
              label="Language to avoid"
              value={draft.avoid_language}
              onChange={(e) => setDraft({ ...draft, avoid_language: e.target.value })}
            />
          </div>
        </div>
        <aside className="space-y-5">
          <div className="studio-card">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Memory strength</p>
              <span className="font-mono text-xs">{calculateCompletion(draft)}%</span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
              <motion.div
                animate={{ width: `${calculateCompletion(draft)}%` }}
                className="h-full bg-system"
              />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Strong profiles reduce generic rewrites while keeping the final call with your team.
            </p>
          </div>
          <label className="studio-card grid cursor-pointer place-items-center border-dashed text-center">
            <input
              type="file"
              className="sr-only"
              accept="image/*,.pdf,.txt"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void uploadBrandAsset(file);
              }}
            />
            <ImageUp className="size-7 text-system" />
            <p className="mt-4 font-semibold">Upload a brand file</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Private PDFs, logos, images, or notes · 10 MB max
            </p>
          </label>
          <div className="rounded-[1.5rem] bg-spotlight p-6 text-white">
            <p className="font-mono text-[9px] uppercase tracking-[.17em] text-white/60">
              The rule
            </p>
            <p className="mt-4 text-lg font-semibold">
              The Studio never invents proof. If it is not here, it stays out.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Library() {
  const { assets, campaigns } = useStudio();
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const [collection, setCollection] = useState<"all" | "favorites" | "approved">("all");
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());
  const filtered = assets.filter(
    (item) =>
      (kind === "all" || item.kind === kind) &&
      (collection === "all" ||
        (collection === "approved" ? item.status === "approved" : favorites.has(item.id))) &&
      `${item.title} ${item.content}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="mx-auto max-w-[88rem]">
      <PageIntro
        eyebrow="Content library"
        title="Everything the system has made."
        body="Search, edit, approve, copy, and reuse every campaign asset without digging through old chats."
      />
      <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
        {[
          ["all", "All assets", assets.length, FileStack],
          ["favorites", "Favorites", favorites.size, Heart],
          [
            "approved",
            "Approved",
            assets.filter((item) => item.status === "approved").length,
            CheckCircle2,
          ],
        ].map(([value, label, count, Icon]) => (
          <button
            key={String(value)}
            onClick={() => setCollection(value as typeof collection)}
            className={`flex min-w-44 items-center gap-3 rounded-[1.1rem] border p-3 text-left ${collection === value ? "border-evergreen bg-evergreen-soft" : "border-border"}`}
          >
            <span className="grid size-10 place-items-center rounded-xl bg-white">
              <Icon className="size-4" />
            </span>
            <span>
              <span className="block text-sm font-extrabold">{String(label)}</span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {String(count)} assets
              </span>
            </span>
          </button>
        ))}
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label className="flex min-h-12 flex-1 items-center gap-3 rounded-xl border border-border bg-white px-4">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scripts, captions, FAQs…"
            className="min-h-11 min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </label>
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          className="min-h-12 rounded-xl border border-border bg-white px-4 text-sm font-semibold"
        >
          <option value="all">All formats</option>
          {Array.from(new Set(assets.map((item) => item.kind))).map((item) => (
            <option key={item} value={item}>
              {item.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </div>
      <div className="studio-content-list mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((asset, index) => {
          const meta = assetKindMeta(asset.kind);
          return (
            <article
              key={asset.id}
              className="studio-card group flex min-h-80 flex-col overflow-hidden p-0"
            >
              <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-secondary">
                <img
                  src={assetMedia(asset, index)}
                  alt=""
                  className="size-full object-cover transition duration-500 group-hover:scale-[1.025]"
                />
                <span
                  className="absolute left-3 top-3 grid size-10 place-items-center rounded-xl bg-white shadow-soft"
                  style={{ color: meta.color }}
                >
                  <meta.icon className="size-4" />
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-white px-2.5 py-1 font-mono text-[8px] uppercase tracking-[.13em]">
                  {meta.label}
                </span>
                <button
                  onClick={() =>
                    setFavorites((current) => {
                      const next = new Set(current);
                      if (next.has(asset.id)) next.delete(asset.id);
                      else next.add(asset.id);
                      return next;
                    })
                  }
                  aria-label={`${favorites.has(asset.id) ? "Remove" : "Add"} ${asset.title} ${favorites.has(asset.id) ? "from" : "to"} favorites`}
                  className={`absolute right-3 top-3 grid size-12 place-items-center rounded-full bg-white ${favorites.has(asset.id) ? "text-reel" : "text-muted-foreground"}`}
                >
                  <Heart className={`size-4 ${favorites.has(asset.id) ? "fill-current" : ""}`} />
                </button>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-[9px] font-bold ${asset.status === "approved" ? "bg-evergreen-soft text-evergreen" : asset.status === "review" ? "bg-reel-soft text-reel" : "border border-border"}`}
                  >
                    {asset.status}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(asset.updated_at).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="mt-6 text-xl font-bold">{asset.title}</h2>
                <p className="mt-3 line-clamp-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {asset.content}
                </p>
                <div className="mt-auto flex items-center justify-between pt-6">
                  <p className="max-w-[14rem] truncate text-xs text-muted-foreground">
                    {campaigns.find((item) => item.id === asset.campaign_id)?.title}
                  </p>
                  <button
                    onClick={() =>
                      void navigator.clipboard
                        .writeText(asset.content)
                        .then(() => toast.success("Copied."))
                    }
                    aria-label={`Copy ${asset.title}`}
                    className="grid size-12 place-items-center rounded-xl bg-secondary"
                  >
                    <Clipboard className="size-4" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
        {!filtered.length && (
          <div className="sm:col-span-2 xl:col-span-3 studio-card">
            <EmptyState
              icon={FolderOpen}
              title="No assets match yet."
              body="Generate a campaign or change the search filters."
            />
          </div>
        )}
      </div>
    </div>
  );
}

function CalendarView() {
  const { calendar, updateCalendarItem, createCalendarItem, campaigns, assets } = useStudio();
  const [mode, setMode] = useState<"month" | "week" | "list">("month");
  const [selected, setSelected] = useState<CalendarItem | null>(null);
  const [planning, setPlanning] = useState(false);
  const reduce = useReducedMotion();
  const [focusDate, setFocusDate] = useState(() => {
    const first = calendar[0]?.publish_at;
    return first ? new Date(first) : new Date();
  });
  const grouped = useMemo(
    () =>
      Object.entries(
        calendar.reduce<Record<string, typeof calendar>>((result, item) => {
          const key = new Date(item.publish_at).toLocaleDateString(undefined, {
            month: "long",
            year: "numeric",
          });
          (result[key] ||= []).push(item);
          return result;
        }, {}),
      ),
    [calendar],
  );
  const calendarDays = useMemo(() => {
    const start =
      mode === "week"
        ? startOfCalendarWeek(focusDate)
        : startOfCalendarWeek(new Date(focusDate.getFullYear(), focusDate.getMonth(), 1));
    const count = mode === "week" ? 7 : 42;
    return Array.from({ length: count }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return date;
    });
  }, [focusDate, mode]);

  function moveFocus(direction: number) {
    const next = new Date(focusDate);
    if (mode === "week") next.setDate(next.getDate() + direction * 7);
    else next.setMonth(next.getMonth() + direction);
    setFocusDate(next);
  }

  function moveItem(event: DragEvent<HTMLElement>, date: Date) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/calendar-item");
    const item = calendar.find((candidate) => candidate.id === id);
    if (!item) return;
    const previous = new Date(item.publish_at);
    const next = new Date(date);
    next.setHours(previous.getHours() || 10, previous.getMinutes(), 0, 0);
    void updateCalendarItem(id, { publish_at: next.toISOString() });
    toast.success(`Moved “${item.title}” to ${next.toLocaleDateString()}.`);
  }

  async function generateMonthPlan() {
    setPlanning(true);
    try {
      const monthStart = new Date(focusDate.getFullYear(), focusDate.getMonth(), 1, 10);
      const channels = ["LinkedIn", "Instagram", "YouTube", "Email"];
      const sourceAssets = assets.length ? assets : ([] as Asset[]);
      const sourceCampaign = campaigns[0];
      const ideas = [
        "Name the customer problem clearly",
        "Show one proof moment",
        "Answer the question before the sales call",
        "Turn a team process into a useful walkthrough",
        "Share the strongest campaign takeaway",
        "Invite the audience into the next decision",
        "Reuse the anchor video as a focused post",
        "Close the month with one clear next step",
      ];
      await Promise.all(
        ideas.map((fallback, index) => {
          const publishAt = new Date(monthStart);
          publishAt.setDate(2 + index * 3);
          const asset = sourceAssets[index % Math.max(1, sourceAssets.length)];
          return createCalendarItem({
            campaignId: asset?.campaign_id || sourceCampaign?.id,
            assetId: asset?.id,
            title: asset?.title || fallback,
            channel: channels[index % channels.length],
            publishAt: publishAt.toISOString(),
            notes:
              "Month plan draft. Open this item to adjust the channel, date, status, or notes.",
          });
        }),
      );
      toast.success("A four-week draft plan is now on the calendar.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not build the month plan.");
    } finally {
      setPlanning(false);
    }
  }

  const heading =
    mode === "week"
      ? `${calendarDays[0]?.toLocaleDateString(undefined, { month: "short", day: "numeric" })} – ${calendarDays[6]?.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`
      : focusDate.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const selectedAsset = selected?.asset_id
    ? assets.find((asset) => asset.id === selected.asset_id)
    : undefined;
  const selectedCampaign = selected?.campaign_id
    ? campaigns.find((campaign) => campaign.id === selected.campaign_id)
    : undefined;

  return (
    <div className="mx-auto max-w-[88rem]">
      <PageIntro
        eyebrow="Content calendar"
        title="A visible publishing rhythm."
        body="The schedule is created with the campaign, then stays editable as your team scripts, films, approves, and publishes."
        action={
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => void generateMonthPlan()}
              disabled={planning}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-system px-5 text-sm font-bold text-white disabled:opacity-50"
            >
              {planning ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
              )}
              Generate month plan
            </button>
            <button onClick={() => downloadCalendar(calendar)} className="secondary-action">
              <Download className="size-4" />
              Export .ics
            </button>
          </div>
        }
      />
      <section className="mt-8 overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-[0_18px_60px_rgba(26,26,24,.05)]">
        <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <button
              aria-label="Previous calendar period"
              onClick={() => moveFocus(-1)}
              className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-white"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => setFocusDate(new Date())}
              className="min-h-11 rounded-xl border border-border bg-white px-4 text-sm font-bold"
            >
              Today
            </button>
            <button
              aria-label="Next calendar period"
              onClick={() => moveFocus(1)}
              className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-white"
            >
              <ChevronRight className="size-4" />
            </button>
            <h2 className="ml-2 text-lg font-extrabold sm:text-xl">{heading}</h2>
          </div>
          <div className="grid grid-cols-3 rounded-xl border border-border bg-white p-1">
            {(["month", "week", "list"] as const).map((option) => (
              <button
                key={option}
                onClick={() => setMode(option)}
                className={`min-h-11 rounded-lg px-4 text-xs font-bold capitalize ${mode === option ? "bg-ink text-white" : "text-muted-foreground"}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {mode !== "list" && (
          <div className="overflow-x-auto">
            <div className="min-w-[56rem]">
              <div className="grid grid-cols-7 border-b border-border bg-white">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className="px-3 py-3 font-mono text-[9px] uppercase tracking-[.16em] text-muted-foreground"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {calendarDays.map((date) => {
                  const key = calendarDateKey(date);
                  const items = calendar.filter(
                    (item) => calendarDateKey(new Date(item.publish_at)) === key,
                  );
                  const outsideMonth = mode === "month" && date.getMonth() !== focusDate.getMonth();
                  const today = calendarDateKey(new Date()) === key;
                  return (
                    <div
                      key={key}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={(event) => moveItem(event, date)}
                      className={`min-h-36 border-b border-r border-border p-2 last:border-r-0 ${outsideMonth ? "bg-white text-muted-foreground/45" : "bg-white"}`}
                    >
                      <span
                        className={`grid size-7 place-items-center rounded-full text-xs font-bold ${today ? "bg-ink text-white" : ""}`}
                      >
                        {date.getDate()}
                      </span>
                      <div className="mt-2 space-y-1.5">
                        {items.slice(0, 3).map((item) => (
                          <button
                            key={item.id}
                            draggable
                            onClick={() => setSelected(item)}
                            onDragStart={(event) =>
                              event.dataTransfer.setData("text/calendar-item", item.id)
                            }
                            className="w-full cursor-grab rounded-lg border border-border bg-white px-2 py-2 text-left shadow-sm transition hover:border-ink active:cursor-grabbing"
                          >
                            <div className="flex items-center gap-1.5">
                              <span
                                className="size-1.5 shrink-0 rounded-full"
                                style={{ background: channelColor(item.channel) }}
                              />
                              <p className="truncate text-[10px] font-extrabold">{item.title}</p>
                            </div>
                            <p className="mt-1 truncate pl-3 text-[9px] text-muted-foreground">
                              {item.channel}
                            </p>
                          </button>
                        ))}
                        {items.length > 3 && (
                          <p className="px-2 text-[9px] font-bold text-muted-foreground">
                            +{items.length - 3} more
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {mode === "list" && (
          <div className="divide-y divide-border">
            {grouped.flatMap(([month, items]) => [
              <div
                key={`${month}-heading`}
                className="bg-white px-5 py-3 font-mono text-[9px] uppercase tracking-[.16em] text-muted-foreground"
              >
                {month}
              </div>,
              ...items.map((item) => (
                <div
                  key={item.id}
                  className="grid items-center gap-3 p-4 sm:grid-cols-[5rem_1fr_10rem_9rem]"
                >
                  <time className="grid h-14 place-items-center rounded-xl border border-border bg-white font-mono text-xs">
                    {new Date(item.publish_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="size-2 rounded-full"
                        style={{ background: channelColor(item.channel) }}
                      />
                      <p className="font-semibold">{item.title}</p>
                    </div>
                    <p className="mt-1 pl-4 text-xs text-muted-foreground">{item.channel}</p>
                  </div>
                  <input
                    type="date"
                    aria-label={`Publish date for ${item.title}`}
                    value={item.publish_at.slice(0, 10)}
                    onChange={(event) =>
                      void updateCalendarItem(item.id, {
                        publish_at: new Date(`${event.target.value}T17:00:00`).toISOString(),
                      })
                    }
                    className="min-h-11 rounded-xl border border-border bg-white px-3 text-sm"
                  />
                  <select
                    aria-label={`Status for ${item.title}`}
                    value={item.status}
                    onChange={(event) =>
                      void updateCalendarItem(item.id, { status: event.target.value })
                    }
                    className="min-h-11 rounded-xl border border-border bg-white px-3 text-sm font-semibold"
                  >
                    <option>planned</option>
                    <option>scripted</option>
                    <option>filmed</option>
                    <option>editing</option>
                    <option>approved</option>
                    <option>published</option>
                  </select>
                  <button
                    onClick={() => setSelected(item)}
                    className="secondary-action sm:col-span-4 sm:justify-self-end"
                  >
                    Open post <ArrowRight className="size-4" />
                  </button>
                </div>
              )),
            ])}
          </div>
        )}
      </section>

      <AnimatePresence>
        {selected ? (
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex justify-end bg-ink/30"
            role="dialog"
            aria-modal="true"
            aria-label={`Calendar item: ${selected.title}`}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelected(null);
            }}
          >
            <motion.aside
              initial={reduce ? false : { transform: "translateX(100%)" }}
              animate={{ transform: "translateX(0%)" }}
              exit={reduce ? { opacity: 0 } : { transform: "translateX(100%)" }}
              transition={
                reduce ? { duration: 0.01 } : { type: "spring", bounce: 0.12, visualDuration: 0.4 }
              }
              className="h-full w-full overflow-y-auto bg-white p-5 shadow-2xl sm:max-w-[31rem] sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="studio-eyebrow text-system">Scheduled content</p>
                  <h2 className="mt-3 text-3xl font-black leading-tight">{selected.title}</h2>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close calendar item"
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-border"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-[1.25rem] border border-border bg-secondary">
                <img
                  src={selectedAsset ? assetMedia(selectedAsset) : creativeFour}
                  alt=""
                  className="size-full object-cover"
                />
                <span
                  className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-[9px] font-bold"
                  style={{ color: channelColor(selected.channel) }}
                >
                  {selected.channel}
                </span>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-extrabold">
                  Publish date
                  <input
                    type="date"
                    value={selected.publish_at.slice(0, 10)}
                    onChange={(event) => {
                      const publish_at = new Date(`${event.target.value}T17:00:00`).toISOString();
                      setSelected({ ...selected, publish_at });
                      void updateCalendarItem(selected.id, { publish_at });
                    }}
                    className="mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-4 text-sm"
                  />
                </label>
                <label className="text-sm font-extrabold">
                  Status
                  <select
                    value={selected.status}
                    onChange={(event) => {
                      const status = event.target.value;
                      setSelected({ ...selected, status });
                      void updateCalendarItem(selected.id, { status });
                    }}
                    className="mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-4 text-sm"
                  >
                    {["planned", "scripted", "filmed", "editing", "approved", "published"].map(
                      (status) => (
                        <option key={status}>{status}</option>
                      ),
                    )}
                  </select>
                </label>
                <label className="text-sm font-extrabold sm:col-span-2">
                  Channel
                  <select
                    value={selected.channel}
                    onChange={(event) => {
                      const channel = event.target.value;
                      setSelected({ ...selected, channel });
                      void updateCalendarItem(selected.id, { channel });
                    }}
                    className="mt-2 min-h-12 w-full rounded-xl border border-border bg-white px-4 text-sm"
                  >
                    {["Instagram", "LinkedIn", "YouTube", "TikTok", "Email", "Website"].map(
                      (channel) => (
                        <option key={channel}>{channel}</option>
                      ),
                    )}
                  </select>
                </label>
                <label className="text-sm font-extrabold sm:col-span-2">
                  Working notes
                  <textarea
                    defaultValue={selected.notes}
                    rows={5}
                    onBlur={(event) =>
                      void updateCalendarItem(selected.id, { notes: event.target.value })
                    }
                    className="mt-2 w-full resize-y rounded-xl border border-border bg-white p-4 text-sm leading-relaxed"
                  />
                </label>
              </div>
              {selectedCampaign ? (
                <Link
                  to="/studio/campaigns/$campaignId"
                  params={{ campaignId: selectedCampaign.id }}
                  className="mt-6 flex items-center justify-between rounded-[1.15rem] bg-spotlight-soft p-5 text-spotlight"
                >
                  <span>
                    <span className="block text-xs font-bold">Part of campaign</span>
                    <span className="mt-1 block font-black text-ink">{selectedCampaign.title}</span>
                  </span>
                  <ArrowRight className="size-4" />
                </Link>
              ) : null}
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-8 space-y-8">
        {!grouped.length && (
          <div className="studio-card">
            <EmptyState
              icon={CalendarDays}
              title="Nothing scheduled yet."
              body="Every completed campaign adds a practical publishing sequence here."
              action={
                <Link to="/studio" className="primary-action">
                  Build a campaign
                </Link>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

function startOfCalendarWeek(date: Date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - start.getDay());
  return start;
}

function calendarDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function channelColor(channel: string) {
  const value = channel.toLowerCase();
  if (value.includes("instagram") || value.includes("tiktok")) return "var(--reel)";
  if (value.includes("youtube") || value.includes("website")) return "var(--spotlight)";
  if (value.includes("linkedin") || value.includes("email")) return "var(--evergreen)";
  return "var(--system)";
}

function SettingsView() {
  const { profile, user, saveProfile, workspace, demo, subscription, campaigns, assets } =
    useStudio();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<"workspace" | "brands" | "team" | "usage" | "account">(
    "workspace",
  );
  const [draft, setDraft] = useState({
    full_name: profile?.full_name || (user?.user_metadata?.full_name as string) || "Studio Member",
    job_title: profile?.job_title || "",
    phone: profile?.phone || "",
    timezone: profile?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  async function save() {
    try {
      await saveProfile(draft);
      toast.success("Profile saved.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save profile.");
    }
  }
  const tabs = [
    ["workspace", Settings, "Workspace"],
    ["brands", Gauge, "Brand DNA"],
    ["team", Users, "Team"],
    ["usage", CreditCard, "Usage & plan"],
    ["account", CircleUserRound, "Account"],
  ] as const;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const modal = modalRef.current;
    const focusable = modal?.querySelectorAll<HTMLElement>(
      "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])",
    );
    focusable?.[0]?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") void navigate({ to: "/studio/dashboard" });
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = priorOverflow;
      previous?.focus();
    };
  }, [navigate]);
  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-center bg-ink/25 p-3 backdrop-blur-[3px] sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Workspace settings"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) void navigate({ to: "/studio/dashboard" });
      }}
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="flex max-h-[min(46rem,calc(100vh-2rem))] w-full max-w-[52rem] flex-col overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-[0_40px_120px_-45px_rgba(31,35,40,.8)]"
      >
        <header className="flex items-start gap-4 border-b border-border px-5 py-4 sm:px-6">
          <div className="min-w-0 flex-1">
            <p className="studio-eyebrow text-system">Workspace settings</p>
            <h1 className="mt-2 text-2xl font-black tracking-[-.04em]">
              The controls behind the work.
            </h1>
          </div>
          <button
            onClick={() => void navigate({ to: "/studio/dashboard" })}
            aria-label="Close settings"
            className="grid size-11 place-items-center rounded-full border border-border"
          >
            <X className="size-4" />
          </button>
        </header>
        <div className="grid min-h-0 flex-1 overflow-hidden lg:grid-cols-[11.5rem_1fr]">
          <aside className="flex gap-1 overflow-x-auto border-b border-border p-3 lg:block lg:overflow-visible lg:border-b-0 lg:border-r">
            {tabs.map(([value, Icon, label]) => (
              <button
                key={value}
                onClick={() => setTab(value)}
                className={`flex min-h-11 shrink-0 items-center gap-3 rounded-xl px-3 text-left text-sm font-bold lg:w-full ${tab === value ? "bg-spotlight-soft text-spotlight" : "text-muted-foreground hover:bg-mist"}`}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </aside>
          <section className="min-h-0 overflow-y-auto p-5 sm:p-7">
            {tab === "workspace" ? (
              <div>
                <SettingHeading
                  title="Workspace"
                  body="The private home for your brand, campaigns, calendar, and team."
                />
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <Field label="Workspace name" value={workspace?.name || ""} readOnly />
                  <Field label="Workspace role" value={demo ? "Preview owner" : "Owner"} readOnly />
                  <div className="rounded-[1.15rem] border border-border p-5 sm:col-span-2">
                    <p className="studio-eyebrow text-system">Workspace health</p>
                    <div className="mt-5 grid gap-4 sm:grid-cols-3">
                      <div className="rounded-xl bg-spotlight-soft p-4">
                        <SettingStat value={String(campaigns.length)} label="campaigns" />
                      </div>
                      <div className="rounded-xl bg-reel-soft p-4">
                        <SettingStat value={String(assets.length)} label="assets created" />
                      </div>
                      <div className="rounded-xl bg-evergreen-soft p-4">
                        <SettingStat
                          value={`${Math.round(assets.length * 0.45)}h`}
                          label="estimated time saved"
                        />
                      </div>
                    </div>
                    <WorkspaceActivity
                      dates={[
                        ...campaigns.map((item) => item.created_at),
                        ...assets.map((item) => item.created_at),
                      ]}
                    />
                  </div>
                </div>
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                  Each customer workspace begins empty, follows onboarding, and only contains that
                  account’s brand memory, campaigns, assets, and calendar.
                </p>
              </div>
            ) : null}
            {tab === "brands" ? (
              <div>
                <SettingHeading
                  title="Brand DNA"
                  body="The source of truth the Content Engine reads before it writes."
                />
                <div className="mt-7 rounded-[1.25rem] border border-border p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-black">{workspace?.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Voice, audience, offers, proof, and language rules
                      </p>
                    </div>
                    <Gauge className="size-8 text-spotlight" />
                  </div>
                  <Link to="/studio/brand" className="primary-action mt-7">
                    Open Brand DNA <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            ) : null}
            {tab === "team" ? (
              <div>
                <SettingHeading
                  title="Team"
                  body="Make the company visible inside the workspace without sending unfinished invitations."
                />
                <div className="mt-7 rounded-[1.25rem] border border-border p-5">
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 place-items-center rounded-full bg-spotlight text-sm font-black text-white">
                      {draft.full_name.slice(0, 1)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-extrabold">{draft.full_name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {user?.email || "Owner preview"} · Owner
                      </p>
                    </div>
                    <span className="rounded-full bg-evergreen-soft px-3 py-1 text-[9px] font-bold text-evergreen">
                      Active
                    </span>
                  </div>
                </div>
                <div className="mt-5 flex items-start gap-4 rounded-xl bg-system-soft p-5">
                  <UserPlus className="mt-0.5 size-5 text-system" />
                  <div>
                    <p className="text-sm font-extrabold text-system">
                      Team access is ready for the next connection.
                    </p>
                    <p className="mt-2 text-sm leading-relaxed">
                      Member roles and workspace permissions are designed. Email invitations stay
                      hidden until delivery is connected and tested.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
            {tab === "usage" ? (
              <div>
                <SettingHeading
                  title="Usage & plan"
                  body="See the current allowance without turning the dashboard into a slot machine."
                />
                <div className="mt-7 rounded-[1.25rem] border border-system bg-white p-6">
                  <p className="studio-eyebrow text-system">Current plan</p>
                  <p className="mt-3 text-3xl font-black capitalize text-ink">
                    {subscription?.plan || "Trial"}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {campaigns.length} campaigns in this workspace
                  </p>
                  <div className="mt-6 h-2 overflow-hidden rounded-full bg-system-soft">
                    <span
                      className="block h-full bg-system"
                      style={{
                        width: `${Math.min(100, (campaigns.length / Math.max(1, subscription?.campaign_allowance || 5)) * 100)}%`,
                      }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {campaigns.length} of {subscription?.campaign_allowance || 5} campaign builds
                    used this period
                  </p>
                  <Link
                    to="/studio/billing"
                    className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-system px-5 text-sm font-bold text-white"
                  >
                    Open billing <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            ) : null}
            {tab === "account" ? (
              <div>
                <SettingHeading
                  title="Account"
                  body="Your identity and local working preferences."
                />
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Full name"
                    value={draft.full_name}
                    onChange={(e) => setDraft({ ...draft, full_name: e.target.value })}
                  />
                  <Field
                    label="Job title"
                    value={draft.job_title}
                    onChange={(e) => setDraft({ ...draft, job_title: e.target.value })}
                  />
                  <Field
                    label="Phone"
                    type="tel"
                    value={draft.phone}
                    onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                  />
                  <Field
                    label="Timezone"
                    value={draft.timezone}
                    onChange={(e) => setDraft({ ...draft, timezone: e.target.value })}
                  />
                  <div className="rounded-xl bg-spotlight-soft p-5 sm:col-span-2">
                    <p className="text-sm font-extrabold">Account email</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {user?.email ||
                        "Owner preview—sign in with a member account to persist account changes"}
                    </p>
                  </div>
                  <button onClick={() => void save()} className="primary-action sm:col-span-2">
                    <Check className="size-4" /> Save account
                  </button>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </motion.div>
    </div>
  );
}

function SettingHeading({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="studio-eyebrow text-system">Settings</p>
      <h2 className="mt-3 text-3xl font-black">{title}</h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
function SettingStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-black capitalize">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[.1em] text-muted-foreground">{label}</p>
    </div>
  );
}

function WorkspaceActivity({ dates }: { dates: string[] }) {
  const activeDays = new Set(dates.map((date) => calendarDateKey(new Date(date))));
  const today = new Date();
  const days = Array.from({ length: 84 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (83 - index));
    return { key: calendarDateKey(date), active: activeDays.has(calendarDateKey(date)) };
  });
  return (
    <div className="mt-6 border-t border-border pt-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-extrabold">12-week workspace activity</p>
        <p className="text-[10px] text-muted-foreground">Every created campaign or asset</p>
      </div>
      <div
        className="mt-3 grid grid-flow-col grid-rows-7 gap-1 overflow-hidden"
        aria-label={`${activeDays.size} active workspace days`}
      >
        {days.map((day) => (
          <span
            key={day.key}
            title={day.key}
            className={`aspect-square min-w-2 rounded-[3px] ${day.active ? "bg-evergreen" : "bg-evergreen-soft"}`}
          />
        ))}
      </div>
    </div>
  );
}

function BillingView() {
  const { session, workspace, subscription, demo, campaigns } = useStudio();
  const [loadingPlan, setLoadingPlan] = useState<string>("");
  const [interval, setInterval] = useState<"month" | "year">(
    subscription?.billing_interval === "year" ? "year" : "month",
  );
  const used = campaigns.filter(
    (item) => new Date(item.created_at) >= new Date(subscription?.current_period_start || 0),
  ).length;
  const activePlanKey: StudioPlanKey =
    subscription?.plan === "business" ||
    subscription?.plan === "partner" ||
    subscription?.plan === "creator"
      ? subscription.plan
      : "creator";
  const activePlan = studioPlans[activePlanKey];
  async function checkout(plan: StudioPlanKey) {
    if (demo) {
      toast.info("Billing is disabled in demo mode.");
      return;
    }
    if (!session || !workspace) return;
    setLoadingPlan(plan);
    try {
      const result = await createStudioSubscriptionCheckout({
        data: { accessToken: session.access_token, workspaceId: workspace.id, plan, interval },
      });
      if (result.ok) window.location.assign(result.url);
      else
        toast.info(
          "Stripe is ready in the product, but the live Stripe secret still needs to be connected.",
        );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Billing could not open.");
    } finally {
      setLoadingPlan("");
    }
  }
  async function portal() {
    if (!session || !workspace || demo) {
      toast.info("The billing portal opens for a live paid workspace.");
      return;
    }
    const result = await createStudioBillingPortal({
      data: { accessToken: session.access_token, workspaceId: workspace.id },
    });
    if (result.ok) window.location.assign(result.url);
    else toast.info("No active Stripe customer is linked yet.");
  }
  return (
    <div className="mx-auto max-w-[88rem]">
      <PageIntro
        eyebrow="Usage & billing"
        title="A plan matched to the work."
        body="Campaign allowance is reserved before generation, so retries and failures never silently double-charge usage."
        action={
          <button onClick={() => void portal()} className="secondary-action">
            <ExternalLink className="size-4" />
            Manage billing
          </button>
        }
      />
      <section className="mt-8 studio-card bg-system-soft">
        <div className="grid gap-7 md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.17em] text-system">
              Current period
            </p>
            <h2 className="mt-3 text-3xl font-extrabold">
              {subscription?.status === "active" ? activePlan.name : "Trial"} workspace
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Renews {new Date(subscription?.current_period_end || Date.now()).toLocaleDateString()}
            </p>
          </div>
          <div className="min-w-52">
            <div className="flex justify-between text-sm">
              <span>Campaigns used</span>
              <strong>
                {used} / {subscription?.campaign_allowance || 1}
              </strong>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
              <motion.div
                animate={{
                  width: `${Math.min(100, (used / (subscription?.campaign_allowance || 1)) * 100)}%`,
                }}
                className="h-full bg-system"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[1.25rem] border border-border bg-white p-3 pl-5">
        <div>
          <p className="text-sm font-black">Choose how you pay</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Annual membership includes two months free.
          </p>
        </div>
        <div
          className="flex rounded-xl bg-cream p-1"
          role="radiogroup"
          aria-label="Billing frequency"
        >
          {(["month", "year"] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={interval === value}
              onClick={() => setInterval(value)}
              className={`min-h-11 rounded-lg px-4 text-xs font-black transition ${interval === value ? "bg-white shadow-sm" : "text-muted-foreground"}`}
            >
              {value === "month" ? "Monthly" : "Annual · save 17%"}
            </button>
          ))}
        </div>
      </div>
      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        {Object.entries(studioPlans).map(([key, plan]) => (
          <article
            key={key}
            className={`studio-card flex flex-col ${activePlanKey === key ? "ring-2 ring-ink" : ""}`}
          >
            <p className="font-mono text-[9px] uppercase tracking-[.17em] text-muted-foreground">
              {plan.name}
            </p>
            <p className="mt-5 text-4xl font-extrabold">
              ${interval === "year" ? Math.round(plan.annualPrice / 12) : plan.price}
              <span className="text-sm font-medium text-muted-foreground"> / month</span>
            </p>
            {interval === "year" ? (
              <p className="mt-1 text-xs font-bold text-evergreen">
                ${plan.annualPrice.toLocaleString()} billed annually
              </p>
            ) : null}
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plan.audience}</p>
            <p className="mt-7 rounded-xl bg-cream p-3 text-sm font-semibold">
              {plan.campaigns} complete campaigns / month
            </p>
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm">
                  <Check className="mt-0.5 size-4 text-evergreen" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              disabled={Boolean(loadingPlan) || activePlanKey === key}
              onClick={() => void checkout(key as StudioPlanKey)}
              className="primary-action mt-8 w-full disabled:bg-secondary disabled:text-muted-foreground"
            >
              {loadingPlan === key ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : activePlanKey === key ? (
                "Current plan"
              ) : (
                `Choose ${plan.name}`
              )}
            </button>
          </article>
        ))}
      </section>
      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        Guided and Partner include the Palmer House time shown above. Filming, editing, travel, and
        custom production remain separately scoped so you never pay for work you do not need.
      </p>
    </div>
  );
}

function CampaignList({
  campaigns,
  expanded = false,
}: {
  campaigns: Campaign[];
  expanded?: boolean;
}) {
  if (!campaigns.length) return null;
  return (
    <div className={expanded ? "grid gap-4 md:grid-cols-2 xl:grid-cols-3" : "studio-card"}>
      {!expanded && (
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.17em] text-muted-foreground">
              Recent work
            </p>
            <h2 className="mt-2 text-xl font-bold">Campaigns</h2>
          </div>
          <Link to="/studio/campaigns" className="text-xs font-semibold">
            View all
          </Link>
        </div>
      )}
      {campaigns.map((campaign) => {
        const lane = lanes[campaign.primary_lane as keyof typeof lanes] || lanes.spotlight;
        return (
          <Link
            key={campaign.id}
            to="/studio/campaigns/$campaignId"
            params={{ campaignId: campaign.id }}
            className={`${expanded ? "studio-card" : "flex items-center gap-4 border-t border-border py-4 first:border-t-0"} group`}
          >
            <span
              className="grid size-11 shrink-0 place-items-center rounded-xl text-white"
              style={{ background: lane.color }}
            >
              <LayoutGrid className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-semibold">{campaign.title}</span>
              <span className="mt-1 block font-mono text-[8px] uppercase tracking-[.14em] text-muted-foreground">
                {lane.label} · {campaign.status}
              </span>
            </span>
            <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
            {expanded && (
              <p className="col-span-full mt-8 line-clamp-3 text-sm text-muted-foreground">
                {campaign.topic}
              </p>
            )}
          </Link>
        );
      })}
    </div>
  );
}

function Metric({
  label,
  value,
  detail,
  color,
}: {
  label: string;
  value: string;
  detail: string;
  color: string;
}) {
  return (
    <article className="studio-card relative overflow-hidden">
      <span className="absolute inset-y-0 left-0 w-1" style={{ background: color }} />
      <p className="font-mono text-[9px] uppercase tracking-[.16em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-5 text-4xl font-extrabold tracking-[-.05em]">{value}</p>
      <p className="mt-2 text-xs text-muted-foreground">{detail}</p>
    </article>
  );
}
function PageIntro({
  eyebrow,
  title,
  body,
  action,
}: {
  eyebrow: string;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[.19em] text-system">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-[.96] tracking-[-.055em] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {body}
        </p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
function Insight({ label, text }: { label: string; text?: string }) {
  return (
    <div className="rounded-2xl bg-secondary p-5">
      <p className="font-mono text-[8px] uppercase tracking-[.15em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-4 text-sm leading-relaxed">{text || "Add this context in Brand Studio."}</p>
    </div>
  );
}
function EmptyState({
  icon: Icon,
  title,
  body,
  action,
}: {
  icon: typeof Sparkles;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid min-h-64 place-items-center p-6 text-center">
      <div>
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-secondary">
          <Icon className="size-5" />
        </span>
        <h2 className="mt-5 text-xl font-bold">{title}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{body}</p>
        {action && <div className="mt-6">{action}</div>}
      </div>
    </div>
  );
}
function ChoiceGrid({
  options,
  value,
  onChange,
}: {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex min-h-20 items-center gap-4 rounded-2xl border p-4 text-left font-semibold ${value === option.value ? "border-ink bg-ink text-white" : "border-border"}`}
        >
          <span
            className={`grid size-8 shrink-0 place-items-center rounded-full ${value === option.value ? "bg-white text-ink" : "bg-secondary"}`}
          >
            {value === option.value ? (
              <Check className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </span>
          {option.label}
        </button>
      ))}
    </div>
  );
}
function Field({
  label,
  as,
  ...props
}: { label: string; as?: "textarea" } & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const classes =
    "mt-2 min-h-12 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-system focus:ring-2 focus:ring-system/15";
  return (
    <label className="block text-sm font-semibold">
      {label}
      {as === "textarea" ? (
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={classes}
        />
      ) : (
        <input {...(props as React.InputHTMLAttributes<HTMLInputElement>)} className={classes} />
      )}
    </label>
  );
}
function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
function lineList(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}
function calculateCompletion(draft: Record<string, string>) {
  return Math.round(
    (Object.values(draft).filter((value) => value.trim()).length / Object.values(draft).length) *
      100,
  );
}
function downloadCampaign(campaign: Campaign, assets: Asset[]) {
  const text = `# ${campaign.title}\n\nGoal: ${campaign.goal}\nAudience: ${campaign.audience}\n\n${assets.map((asset) => `## ${asset.title}\n\n${asset.content}`).join("\n\n")}`;
  downloadText(
    `${campaign.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.md`,
    text,
    "text/markdown",
  );
}
function downloadCalendar(items: ReturnType<typeof useStudio>["calendar"]) {
  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Palmer House Studio//EN",
    ...items.flatMap((item) => [
      "BEGIN:VEVENT",
      `UID:${item.id}@palmerhouseproductions.com`,
      `DTSTART:${new Date(item.publish_at).toISOString().replace(/[-:]/g, "").replace(".000", "")}`,
      `SUMMARY:${item.title.replace(/[,;]/g, " ")}`,
      `DESCRIPTION:${item.channel.replace(/[,;]/g, " ")}`,
      "END:VEVENT",
    ]),
    "END:VCALENDAR",
  ].join("\r\n");
  downloadText("palmer-house-content-calendar.ics", content, "text/calendar");
}
function downloadText(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}
