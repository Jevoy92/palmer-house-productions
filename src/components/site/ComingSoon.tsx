import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { StudioMark } from "@/components/studio/StudioVisuals";

const lanes = [
  { label: "System", color: "var(--system)", soft: "var(--system-soft)" },
  { label: "Spotlight", color: "var(--spotlight)", soft: "var(--spotlight-soft)" },
  { label: "Evergreen", color: "var(--evergreen)", soft: "var(--evergreen-soft)" },
  { label: "Reel", color: "var(--reel)", soft: "var(--reel-soft)" },
];

export function ComingSoon() {
  return (
    <main className="min-h-screen bg-background px-5 py-10 text-ink">
      <header className="mx-auto flex max-w-5xl items-center justify-between">
        <StudioMark />
        <a
          href="tel:+14255339060"
          className="hidden min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-bold sm:flex"
        >
          <Phone className="size-4" /> (425) 533-9060
        </a>
      </header>

      <section className="mx-auto grid max-w-5xl gap-10 py-16 md:py-24">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[.22em] text-muted-foreground">
            Palmer House Productions · Building something better
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[.95] tracking-[-.06em] sm:text-7xl">
            We're heads-down building new features.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Our website is taking a short break while our team ships the next version of the Palmer
            House content system. The Studio — where members plan, create, and schedule their video
            content — is open and running as usual.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/studio"
              className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-ink px-7 text-base font-bold text-white transition hover:bg-evergreen"
            >
              Sign in to the Studio <ArrowRight className="size-5" />
            </Link>
            <Link
              to="/studio"
              search={{ mode: "signup" }}
              className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-border px-7 text-base font-bold transition hover:bg-spotlight-soft"
            >
              Create an account
            </Link>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="size-4" />
            Need our team for a project?{" "}
            <a className="font-bold text-ink underline" href="mailto:hello@palmerhouseproductions.com">
              hello@palmerhouseproductions.com
            </a>
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {lanes.map((lane) => (
            <div
              key={lane.label}
              className="rounded-[1.25rem] border border-border p-5"
              style={{ background: lane.soft }}
            >
              <p
                className="font-mono text-[10px] font-bold uppercase tracking-[.2em]"
                style={{ color: lane.color }}
              >
                {lane.label} Pal
              </p>
              <p className="mt-3 text-sm font-bold leading-snug">
                Still working behind the scenes for our members.
              </p>
            </div>
          ))}
        </div>

        <section className="rounded-[1.25rem] border border-border p-6 sm:p-8">
          <h2 className="text-2xl font-black tracking-[-.04em] sm:text-3xl">
            What Palmer House Studio does
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Palmer House Studio is the web application we operate at
            palmerhouseproductions.com/studio. Business owners create an account, describe their
            brand, and use our tools to plan a video and content program: generating campaign
            strategy, video scripts, blog articles, and social posts, then organizing them on a
            content calendar for approval and scheduling.
          </p>
          <ul className="mt-6 grid gap-3 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
            <li className="rounded-[1rem] border border-border p-4">
              <span className="font-bold text-ink">Brand profile.</span> Members save their
              industry, audience, voice, and story so everything generated sounds like them.
            </li>
            <li className="rounded-[1rem] border border-border p-4">
              <span className="font-bold text-ink">Content engine.</span> One idea becomes a short
              video script, a long-form script, a blog article, and platform-ready posts.
            </li>
            <li className="rounded-[1rem] border border-border p-4">
              <span className="font-bold text-ink">Calendar and approvals.</span> Members schedule
              what they've made and track what's approved and published.
            </li>
            <li className="rounded-[1rem] border border-border p-4">
              <span className="font-bold text-ink">Production services.</span> Alongside the app,
              our team shoots and edits video for Pacific Northwest businesses.
            </li>
          </ul>
          <h3 className="mt-8 text-lg font-black tracking-[-.03em]">Why we ask to sign in with Google</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Signing in with Google is an optional way to create and access a Palmer House Studio
            account. We request only your basic profile and email address so we can identify your
            account and contact you about it. We never access Gmail, Drive, Calendar, contacts, or
            any other Google data, and we never sell your information.
          </p>
          <p className="mt-6 text-sm">
            <Link to="/privacy" className="font-bold text-ink underline">
              Privacy Policy
            </Link>
            <span className="px-2 text-muted-foreground">·</span>
            <Link to="/terms" className="font-bold text-ink underline">
              Terms of Service
            </Link>
          </p>
        </section>
      </section>

      <footer className="mx-auto max-w-5xl border-t border-border pt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Palmer House Productions · Pacific Northwest
      </footer>
    </main>
  );
}
