import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Check, FileText, FolderUp, Sparkles, Users } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";

const TOOLS = [
  {
    icon: FolderUp,
    title: "Brand kit home",
    body: "Keep the colors, language, offers, and assets every draft should remember.",
  },
  {
    icon: CalendarDays,
    title: "Content calendar",
    body: "Turn a shoot into a publishing rhythm instead of another forgotten folder.",
  },
  {
    icon: FileText,
    title: "Script builder",
    body: "Shape hooks, talking points, and calls to action without starting from a blank page.",
  },
  {
    icon: Users,
    title: "Persona generator",
    body: "Clarify who needs the message, what they fear, and what proof moves them.",
  },
];

function MembershipPage() {
  const waitlistHref =
    "mailto:info@palmerhouseproductions.com?subject=Palmer%20House%20Studio%20waitlist&body=Please%20add%20me%20to%20the%20Palmer%20House%20Studio%20waitlist.";
  return (
    <PageShell>
      <section className="px-4 pb-16 pt-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.55fr]">
            <div>
              <h1 className="max-w-[11ch] text-5xl font-extrabold leading-[0.94] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                Keep the system after the shoot.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Palmer House Studio is the DIY and out-of-area workspace for planning, scripting,
                organizing, and getting more useful content out of what you already know.
              </p>
            </div>
            <div className="rounded-[2rem] bg-spotlight p-6 text-white">
              <Sparkles className="size-6" />
              <p className="mt-5 text-2xl font-bold">The member area is in preview.</p>
              <p className="mt-3 text-sm text-white/70">
                Login, billing, and credits stay hidden until secure accounts and Stripe
                subscriptions are connected.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-px overflow-hidden rounded-[2.5rem] bg-border sm:grid-cols-2">
            {TOOLS.map((tool, index) => (
              <article key={tool.title} className="min-h-72 bg-white p-7 sm:p-10">
                <span
                  className="grid size-12 place-items-center rounded-full"
                  style={{
                    background: [
                      "var(--system-soft)",
                      "var(--reel-soft)",
                      "var(--evergreen-soft)",
                      "var(--spotlight-soft)",
                    ][index],
                  }}
                >
                  <tool.icon className="size-5" />
                </span>
                <h2 className="mt-8 text-2xl font-bold">{tool.title}</h2>
                <p className="mt-3 max-w-md text-muted-foreground">{tool.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="rounded-[2.5rem] bg-ink p-8 text-white sm:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
              Founding access
            </p>
            <h2 className="mt-4 text-4xl font-extrabold">Help shape the useful version.</h2>
            <ul className="mt-7 space-y-4 text-white/75">
              {[
                "Guided DIY tools built around the Four Pals",
                "A unified place for scripts, personas, and calendars",
                "Credits and paid generation only after billing is production-ready",
                "Clear ownership of every draft and uploaded asset",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-evergreen" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={waitlistHref}
              className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-ink"
            >
              Join the waitlist <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="rounded-[2.5rem] border border-border bg-secondary p-8 sm:p-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Preview the workflow
            </p>
            <h2 className="mt-4 text-4xl font-extrabold">Try the tools without a fake login.</h2>
            <p className="mt-5 text-muted-foreground">
              The preview runs locally in your browser and does not upload files or charge anything.
              It shows the product shape while authentication, storage, and subscriptions remain
              gated.
            </p>
            <Link
              to="/studio-preview"
              className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-spotlight px-6 font-semibold text-white"
            >
              Open studio preview <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Palmer House Studio Membership" },
      {
        name: "description",
        content:
          "Preview the Palmer House member tools for brand kits, scripts, personas, and content planning.",
      },
    ],
  }),
  component: MembershipPage,
});
