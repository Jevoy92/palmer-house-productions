import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Archive,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Clipboard,
  CreditCard,
  Download,
  ExternalLink,
  FileStack,
  FolderOpen,
  Gauge,
  Home,
  ImageUp,
  LayoutGrid,
  LoaderCircle,
  LogOut,
  Menu,
  PanelLeftClose,
  Play,
  Plus,
  Search,
  Settings,
  Sparkles,
  Users,
  Video,
  WandSparkles,
  X,
} from "lucide-react";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
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
import { useStudio } from "./StudioProvider";

type Campaign = Tables<"campaigns">;
type Asset = Tables<"campaign_assets">;

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

const nav = [
  { view: "home", label: "Home", to: "/studio", icon: Home },
  { view: "campaigns", label: "Campaigns", to: "/studio/campaigns", icon: WandSparkles },
  { view: "brand", label: "Brand Studio", to: "/studio/brand", icon: Gauge },
  { view: "library", label: "Library", to: "/studio/library", icon: FolderOpen },
  { view: "calendar", label: "Calendar", to: "/studio/calendar", icon: CalendarDays },
  { view: "settings", label: "Settings", to: "/studio/settings", icon: Settings },
] as const;

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
    <main className="grid min-h-screen place-items-center bg-[#f5f5f2]">
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
    <main className="min-h-screen bg-[#f5f5f2] px-4 py-5 sm:px-6">
      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] max-w-[96rem] overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_90px_-50px_rgba(0,0,0,.45)] lg:grid-cols-[1.08fr_.92fr]">
        <section className="relative hidden overflow-hidden bg-ink p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div
            className="absolute inset-0 opacity-[.16]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.16) 1px, transparent 1px)",
              backgroundSize: "54px 54px",
            }}
          />
          <Link to="/" className="relative z-10 flex items-center gap-3 font-bold">
            <span className="grid size-10 place-items-center rounded-full bg-white text-ink">
              PH
            </span>{" "}
            Palmer House Studio
          </Link>
          <div className="relative z-10 max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-white/50">
              From one useful idea
            </p>
            <h1 className="mt-5 text-6xl font-extrabold leading-[.92] tracking-[-.065em] xl:text-7xl">
              A campaign your whole business can use.
            </h1>
            <div className="mt-10 grid grid-cols-4 gap-2" aria-label="The Four Pals campaign lanes">
              {Object.values(lanes).map((lane, index) => (
                <motion.div
                  key={lane.label}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.15 + index * 0.08, duration: 0.55 }}
                  className="origin-bottom rounded-2xl p-4"
                  style={{ background: lane.color }}
                >
                  <p className="text-sm font-bold">{lane.label}</p>
                  <p className="mt-1 text-[10px] text-white/60">{lane.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <p className="relative z-10 max-w-xl text-sm leading-relaxed text-white/55">
            Strategy, scripts, production planning, publishing, and real Palmer House production
            support—in one connected workspace.
          </p>
        </section>
        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-16">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="mb-12 inline-flex items-center gap-2 text-sm font-semibold lg:hidden"
            >
              ← Palmer House
            </Link>
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-system">
              Your content operating system
            </p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-.05em]">
              {mode === "signin" ? "Welcome back." : "Build your first campaign."}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {mode === "signin"
                ? "Sign in to pick up where your team left off."
                : "Start with a seven-day guided sprint. No pretend dashboard, no empty blank page."}
            </p>
            <form onSubmit={submit} className="mt-8 space-y-4">
              {mode === "signup" && (
                <Field name="name" label="Your name" placeholder="Jevoy Palmer" required />
              )}
              <Field
                name="email"
                label="Email"
                type="email"
                placeholder="you@company.com"
                required
              />
              <Field
                name="password"
                label="Password"
                type="password"
                placeholder="At least 8 characters"
                minLength={8}
                required
              />
              <button
                disabled={busy}
                className="flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-ink px-5 font-semibold text-white disabled:opacity-50"
              >
                {busy && <LoaderCircle className="size-4 animate-spin" />}
                {mode === "signin" ? "Sign in" : "Start the free sprint"}
                <ArrowRight className="size-4" />
              </button>
            </form>
            {notice && (
              <p role="status" className="mt-4 rounded-2xl bg-system-soft p-4 text-sm text-system">
                {notice}
              </p>
            )}
            <button
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setNotice("");
              }}
              className="mt-5 text-sm font-semibold underline underline-offset-4"
            >
              {mode === "signin"
                ? "New here? Create an account"
                : "Already have an account? Sign in"}
            </button>
            <div className="my-7 flex items-center gap-3 text-[10px] uppercase tracking-[.16em] text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              or
              <span className="h-px flex-1 bg-border" />
            </div>
            <form onSubmit={magic} className="flex gap-2">
              <input
                name="email"
                type="email"
                required
                aria-label="Email for magic link"
                placeholder="Email for a magic link"
                className="min-h-12 min-w-0 flex-1 rounded-2xl border border-border px-4 text-sm"
              />
              <button className="rounded-2xl border border-border px-4 text-sm font-semibold">
                Send link
              </button>
            </form>
            <button
              onClick={enterDemo}
              className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-5 text-sm font-semibold"
            >
              Explore the complete demo <Play className="size-4" />
            </button>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              The demo stores nothing and charges nothing. Live accounts keep every workspace
              private with row-level access controls.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Onboarding() {
  const { createWorkspace, busy, user, signOut } = useStudio();
  const [name, setName] = useState((user?.user_metadata?.full_name as string) || "");
  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f5f2] px-4">
      <div className="w-full max-w-xl rounded-[2rem] bg-white p-7 shadow-soft sm:p-10">
        <span className="grid size-12 place-items-center rounded-2xl bg-system text-white">
          <Sparkles />
        </span>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[.18em] text-system">
          Step 1 of 3
        </p>
        <h1 className="mt-3 text-4xl font-extrabold">Name your workspace.</h1>
        <p className="mt-3 text-muted-foreground">
          This is the private home for your brand, campaigns, calendar, team, and billing.
        </p>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              await createWorkspace(name || "My Studio");
            } catch (error) {
              toast.error(error instanceof Error ? error.message : "Could not create workspace.");
            }
          }}
          className="mt-8"
        >
          <Field
            label="Workspace name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <button
            disabled={busy}
            className="mt-5 flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-ink font-semibold text-white"
          >
            {busy && <LoaderCircle className="size-4 animate-spin" />}Create my Studio{" "}
            <ArrowRight className="size-4" />
          </button>
        </form>
        <button onClick={() => void signOut()} className="mt-5 text-sm text-muted-foreground">
          Sign out
        </button>
      </div>
    </main>
  );
}

function StudioShell({ view, children }: { view: StudioView; children: ReactNode }) {
  const { workspace, subscription, demo, signOut, leaveDemo } = useStudio();
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduce = useReducedMotion();
  return (
    <div className="min-h-screen bg-[#f5f5f2] text-ink">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-black/5 bg-white p-4 lg:flex">
        <StudioBrand />
        <nav className="mt-10 space-y-1" aria-label="Studio navigation">
          {nav.map((item) => (
            <StudioNavLink
              key={item.view}
              item={item}
              active={view === item.view || (view === "campaign" && item.view === "campaigns")}
            />
          ))}
        </nav>
        <div className="mt-auto space-y-3">
          <div className="rounded-2xl bg-secondary p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[.16em] text-muted-foreground">
                {demo ? "Guided demo" : `${subscription?.plan || "trial"} plan`}
              </span>
              <span className="size-2 rounded-full bg-evergreen" />
            </div>
            <p className="mt-2 truncate text-sm font-semibold">{workspace?.name}</p>
            <Link
              to="/studio/billing"
              className="mt-4 flex items-center justify-between text-xs font-semibold"
            >
              Usage & billing <ChevronRight className="size-3" />
            </Link>
          </div>
          <button
            onClick={() => (demo ? leaveDemo() : void signOut())}
            className="flex min-h-11 w-full items-center gap-3 rounded-2xl px-4 text-sm text-muted-foreground hover:bg-secondary"
          >
            <LogOut className="size-4" />
            {demo ? "Exit demo" : "Sign out"}
          </button>
        </div>
      </aside>
      <header className="sticky top-0 z-30 flex min-h-16 items-center border-b border-black/5 bg-white/90 px-4 backdrop-blur lg:ml-64 lg:px-8">
        <button
          onClick={() => setMobileOpen(true)}
          className="grid size-11 place-items-center rounded-xl bg-secondary lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </button>
        <div className="ml-3 min-w-0 lg:ml-0">
          <p className="truncate text-sm font-bold">{workspace?.name}</p>
          <p className="font-mono text-[8px] uppercase tracking-[.16em] text-muted-foreground">
            {demo ? "Demo workspace · no data saved" : "Private workspace"}
          </p>
        </div>
        <Link
          to="/studio/campaigns"
          aria-label="New campaign"
          className="ml-auto inline-flex min-h-11 items-center gap-2 rounded-xl bg-ink px-4 text-sm font-semibold text-white"
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">New campaign</span>
        </Link>
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
            <nav className="mt-10 space-y-2">
              {nav.map((item) => (
                <div key={item.view} onClick={() => setMobileOpen(false)}>
                  <StudioNavLink item={item} active={view === item.view} />
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
        className="min-h-[calc(100vh-4rem)] px-4 py-6 sm:px-6 lg:ml-64 lg:px-8 lg:py-8"
      >
        {children}
      </motion.main>
    </div>
  );
}

function StudioBrand() {
  return (
    <Link to="/" className="flex items-center gap-3 rounded-xl">
      <span className="grid size-10 place-items-center rounded-xl bg-ink font-mono text-xs font-bold text-white">
        PH
      </span>
      <span className="text-sm font-bold leading-tight">
        Palmer House
        <span className="block font-mono text-[8px] uppercase tracking-[.19em] text-muted-foreground">
          Studio
        </span>
      </span>
    </Link>
  );
}
function StudioNavLink({ item, active }: { item: (typeof nav)[number]; active: boolean }) {
  return (
    <Link
      to={item.to}
      className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition ${active ? "bg-ink text-white" : "text-muted-foreground hover:bg-secondary hover:text-ink"}`}
    >
      <item.icon className="size-4" />
      {item.label}
    </Link>
  );
}

function renderView(view: StudioView, campaignId?: string) {
  if (view === "home") return <Dashboard />;
  if (view === "brand") return <BrandStudio />;
  if (view === "campaigns") return <Campaigns />;
  if (view === "campaign") return <CampaignDetail campaignId={campaignId} />;
  if (view === "library") return <Library />;
  if (view === "calendar") return <CalendarView />;
  if (view === "settings") return <SettingsView />;
  if (view === "billing") return <BillingView />;
  return <Dashboard />;
}

function Dashboard() {
  const { campaigns, assets, calendar, brand, subscription, demo } = useStudio();
  const upcoming = calendar.filter((item) => new Date(item.publish_at) >= new Date()).slice(0, 4);
  return (
    <div className="mx-auto max-w-[88rem]">
      <PageIntro
        eyebrow="Studio home"
        title="What are we making useful?"
        body="Start with the business idea. The Studio will connect the strategy, scripts, shot plan, and publishing rhythm."
        action={
          <Link to="/studio/campaigns" className="primary-action">
            Build a campaign <ArrowRight className="size-4" />
          </Link>
        }
      />
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <Metric
          label="Campaigns this period"
          value={`${campaigns.length} / ${subscription?.campaign_allowance || 1}`}
          detail={demo ? "Demo allowance" : subscription?.status || "trialing"}
          color="var(--spotlight)"
        />
        <Metric
          label="Ready-to-use assets"
          value={String(assets.length)}
          detail="Scripts, captions, plans"
          color="var(--reel)"
        />
        <Metric
          label="Brand memory"
          value={`${brand?.completion || 0}%`}
          detail="More context, less rewriting"
          color="var(--system)"
        />
      </section>
      <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <div className="studio-card overflow-hidden p-0">
          <div className="border-b border-border p-6 sm:p-7">
            <p className="font-mono text-[9px] uppercase tracking-[.17em] text-muted-foreground">
              The campaign path
            </p>
            <h2 className="mt-2 text-2xl font-extrabold">
              One idea travels through five connected rooms.
            </h2>
          </div>
          <div className="grid sm:grid-cols-5">
            {[
              { icon: Search, label: "Clarify", color: "var(--spotlight)" },
              { icon: BookOpen, label: "Script", color: "var(--reel)" },
              { icon: Video, label: "Plan", color: "var(--evergreen)" },
              { icon: CalendarDays, label: "Schedule", color: "var(--system)" },
              { icon: CheckCircle2, label: "Ship", color: "var(--ink)" },
            ].map((item, index) => (
              <div
                key={item.label}
                className="relative border-b border-border p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
              >
                <span
                  className="grid size-10 place-items-center rounded-xl text-white"
                  style={{ background: item.color }}
                >
                  <item.icon className="size-4" />
                </span>
                <p className="mt-8 text-sm font-bold">{item.label}</p>
                <p className="mt-1 font-mono text-[9px] text-muted-foreground">0{index + 1}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="studio-card bg-ink p-6 text-white sm:p-7">
          <p className="font-mono text-[9px] uppercase tracking-[.17em] text-white/45">
            Palmer House assist
          </p>
          <h2 className="mt-4 text-2xl font-extrabold">Need humans in the loop?</h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Send the campaign to the team for strategy, filming, or editing without rebuilding the
            brief.
          </p>
          <Link
            to="/studio/campaigns"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
          >
            Open campaigns <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <CampaignList campaigns={campaigns.slice(0, 4)} />
        <div className="studio-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[.17em] text-muted-foreground">
                Next up
              </p>
              <h2 className="mt-2 text-xl font-bold">Publishing rhythm</h2>
            </div>
            <Link to="/studio/calendar" className="text-xs font-semibold">
              Full calendar
            </Link>
          </div>
          <div className="mt-6 space-y-3">
            {upcoming.length ? (
              upcoming.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-2xl bg-secondary p-4">
                  <time className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-center font-mono text-[9px] leading-tight">
                    {new Date(item.publish_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{item.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.channel}</p>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                icon={CalendarDays}
                title="Your schedule starts with a campaign."
                body="When a campaign is ready, its publishing plan appears here automatically."
              />
            )}
          </div>
        </div>
      </section>
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
          <div className="mt-6 rounded-2xl bg-secondary p-4">
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
            <div key={pillar} className="rounded-2xl bg-secondary p-5">
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
            className="grid gap-3 rounded-2xl bg-secondary p-4 sm:grid-cols-[8rem_1fr_10rem]"
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
  const [open, setOpen] = useState(items[0]?.id || "");
  return (
    <div className="space-y-3">
      {items.map((asset) => (
        <div key={asset.id} className="studio-card p-0 overflow-hidden">
          <button
            onClick={() => setOpen(open === asset.id ? "" : asset.id)}
            className="flex min-h-16 w-full items-center gap-4 px-5 text-left"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-reel-soft text-reel">
              <FileStack className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-semibold">{asset.title}</span>
              <span className="font-mono text-[8px] uppercase tracking-[.14em] text-muted-foreground">
                {asset.kind.replaceAll("_", " ")}
              </span>
            </span>
            <ChevronRight className={`size-4 transition ${open === asset.id ? "rotate-90" : ""}`} />
          </button>
          <AnimatePresence>
            {open === asset.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="border-t border-border p-5">
                  <textarea
                    defaultValue={asset.content}
                    onBlur={(event) => void updateAsset(asset.id, { content: event.target.value })}
                    rows={Math.min(18, Math.max(6, asset.content.split("\n").length + 3))}
                    className="w-full resize-y rounded-2xl bg-secondary p-4 text-sm leading-relaxed"
                  />
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() =>
                        void navigator.clipboard
                          .writeText(asset.content)
                          .then(() => toast.success("Copied."))
                      }
                      className="secondary-action"
                    >
                      <Clipboard className="size-4" />
                      Copy
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
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
          <div className="rounded-[1.5rem] bg-ink p-6 text-white">
            <p className="font-mono text-[9px] uppercase tracking-[.17em] text-white/45">
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
  const filtered = assets.filter(
    (item) =>
      (kind === "all" || item.kind === kind) &&
      `${item.title} ${item.content}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="mx-auto max-w-[88rem]">
      <PageIntro
        eyebrow="Content library"
        title="Everything the system has made."
        body="Search, edit, approve, copy, and reuse every campaign asset without digging through old chats."
      />
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <label className="flex min-h-12 flex-1 items-center gap-3 rounded-2xl bg-white px-4">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scripts, captions, FAQs…"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </label>
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          className="min-h-12 rounded-2xl bg-white px-4 text-sm font-semibold"
        >
          <option value="all">All formats</option>
          {Array.from(new Set(assets.map((item) => item.kind))).map((item) => (
            <option key={item} value={item}>
              {item.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((asset) => (
          <article key={asset.id} className="studio-card flex min-h-64 flex-col">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-secondary px-3 py-1 font-mono text-[8px] uppercase tracking-[.13em]">
                {asset.kind.replaceAll("_", " ")}
              </span>
              <span className="size-2 rounded-full bg-evergreen" />
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
                className="grid size-10 place-items-center rounded-xl bg-secondary"
              >
                <Clipboard className="size-4" />
              </button>
            </div>
          </article>
        ))}
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
  const { calendar, updateCalendarItem } = useStudio();
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
  return (
    <div className="mx-auto max-w-[88rem]">
      <PageIntro
        eyebrow="Content calendar"
        title="A visible publishing rhythm."
        body="The schedule is created with the campaign, then stays editable as your team scripts, films, approves, and publishes."
        action={
          <button onClick={() => downloadCalendar(calendar)} className="secondary-action">
            <Download className="size-4" />
            Export .ics
          </button>
        }
      />
      <div className="mt-8 space-y-8">
        {grouped.map(([month, items]) => (
          <section key={month}>
            <h2 className="text-xl font-bold">{month}</h2>
            <div className="mt-4 overflow-hidden rounded-[1.5rem] bg-white">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid items-center gap-3 border-b border-border p-4 last:border-0 sm:grid-cols-[5rem_1fr_10rem_9rem]"
                >
                  <time className="grid h-14 place-items-center rounded-xl bg-secondary font-mono text-xs">
                    {new Date(item.publish_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.channel}</p>
                  </div>
                  <input
                    type="date"
                    aria-label={`Publish date for ${item.title}`}
                    defaultValue={item.publish_at.slice(0, 10)}
                    onChange={(e) =>
                      void updateCalendarItem(item.id, {
                        publish_at: new Date(`${e.target.value}T17:00:00`).toISOString(),
                      })
                    }
                    className="min-h-11 rounded-xl bg-secondary px-3 text-sm"
                  />
                  <select
                    value={item.status}
                    onChange={(e) => void updateCalendarItem(item.id, { status: e.target.value })}
                    className="min-h-11 rounded-xl bg-secondary px-3 text-sm font-semibold"
                  >
                    <option>planned</option>
                    <option>scripted</option>
                    <option>filmed</option>
                    <option>editing</option>
                    <option>approved</option>
                    <option>published</option>
                  </select>
                </div>
              ))}
            </div>
          </section>
        ))}
        {!grouped.length && (
          <div className="studio-card">
            <EmptyState
              icon={CalendarDays}
              title="Nothing scheduled yet."
              body="Every completed campaign adds a practical publishing sequence here."
              action={
                <Link to="/studio/campaigns" className="primary-action">
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

function SettingsView() {
  const { profile, user, saveProfile, workspace, demo } = useStudio();
  const [draft, setDraft] = useState({
    full_name: profile?.full_name || (user?.user_metadata?.full_name as string) || "Demo Member",
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
  return (
    <div className="mx-auto max-w-5xl">
      <PageIntro
        eyebrow="Workspace settings"
        title="Your profile and team home."
        body="Keep your identity, contact details, timezone, and workspace controls current."
        action={
          <button onClick={() => void save()} className="primary-action">
            <Check className="size-4" />
            Save settings
          </button>
        }
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="studio-card grid gap-5 sm:grid-cols-2">
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
          <div className="sm:col-span-2 rounded-2xl bg-secondary p-5">
            <p className="text-sm font-semibold">Account email</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {user?.email || "Demo mode—no email connected"}
            </p>
          </div>
        </div>
        <aside className="space-y-5">
          <div className="studio-card">
            <CircleUserRound className="size-7 text-system" />
            <p className="mt-5 font-bold">{draft.full_name}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {draft.job_title || "Workspace member"}
            </p>
          </div>
          <div className="studio-card">
            <Users className="size-6 text-spotlight" />
            <p className="mt-5 font-bold">{workspace?.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {demo ? "Demo owner" : "Owner workspace"}
            </p>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Team invitations are protected in the database and will activate when transactional
              email is connected.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function BillingView() {
  const { session, workspace, subscription, demo, campaigns } = useStudio();
  const [loadingPlan, setLoadingPlan] = useState<string>("");
  const used = campaigns.filter(
    (item) => new Date(item.created_at) >= new Date(subscription?.current_period_start || 0),
  ).length;
  async function checkout(plan: StudioPlanKey) {
    if (demo) {
      toast.info("Billing is disabled in demo mode.");
      return;
    }
    if (!session || !workspace) return;
    setLoadingPlan(plan);
    try {
      const result = await createStudioSubscriptionCheckout({
        data: { accessToken: session.access_token, workspaceId: workspace.id, plan },
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
      <section className="mt-8 studio-card bg-ink text-white">
        <div className="grid gap-7 md:grid-cols-[1fr_auto]">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.17em] text-white/45">
              Current period
            </p>
            <h2 className="mt-3 text-3xl font-extrabold capitalize">
              {subscription?.plan || "Trial"} workspace
            </h2>
            <p className="mt-3 text-sm text-white/60">
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
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
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
      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        {Object.entries(studioPlans).map(([key, plan]) => (
          <article
            key={key}
            className={`studio-card flex flex-col ${subscription?.plan === key ? "ring-2 ring-ink" : ""}`}
          >
            <p className="font-mono text-[9px] uppercase tracking-[.17em] text-muted-foreground">
              {plan.name}
            </p>
            <p className="mt-5 text-4xl font-extrabold">
              ${plan.price}
              <span className="text-sm font-medium text-muted-foreground"> / month</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plan.audience}</p>
            <p className="mt-7 rounded-xl bg-secondary p-3 text-sm font-semibold">
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
              disabled={Boolean(loadingPlan) || subscription?.plan === key}
              onClick={() => void checkout(key as StudioPlanKey)}
              className="primary-action mt-8 w-full disabled:bg-secondary disabled:text-muted-foreground"
            >
              {loadingPlan === key ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : subscription?.plan === key ? (
                "Current plan"
              ) : (
                `Choose ${plan.name}`
              )}
            </button>
          </article>
        ))}
      </section>
      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        Membership includes software access. Palmer House filming, editing, and production services
        are requested and scoped separately so you never pay for work you do not need.
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
