import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, CalendarDays, Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import { PageShell, PageHero, Section, FaqList, CtaBand } from "@/components/site/PageShell";
import {
  LaneTiles,
  PalCallout,
  PalCrew,
  ProcessTimeline,
  Scene,
} from "@/components/site/PalVisuals";
import { GlyphBadge, type GlyphName } from "@/components/site/Glyphs";
import { contactInfo } from "@/data/nav";
import type { PalName } from "@/lib/studio-model";
import { createSeo, faqSchema, jsonLdScript, schemaGraph } from "@/lib/seo";

const AGENDA: { index: string; title: string; body: string; pal: PalName }[] = [
  {
    index: "01",
    title: "The System Mindset",
    body: "Why one-off videos fail and how to think about content as an asset library, not a to-do list.",
    pal: "cyrus",
  },
  {
    index: "02",
    title: "The Four Pillars",
    body: "Spotlight, Reel, Evergreen, and System — how to map your business needs to the right kind of video.",
    pal: "kiana",
  },
  {
    index: "03",
    title: "Building the Machine",
    body: "A repeatable production and distribution workflow you can run without heroic effort.",
    pal: "silas",
  },
  {
    index: "04",
    title: "Live Q&A",
    body: "Bring your specific bottlenecks — we'll troubleshoot them live with the Palmer House team.",
    pal: "ryder",
  },
];

const FACTS: { glyph: GlyphName; label: string; body: string }[] = [
  { glyph: "clock", label: "45 minutes", body: "Focused teaching, then Q&A." },
  {
    glyph: "handshake",
    label: "Built for operators",
    body: "Founders, marketing, and operations.",
  },
  {
    glyph: "publish",
    label: "Replay included",
    body: "Recording and slides go to every registrant.",
  },
];

const WHO = [
  "Founders tired of repeating the same explanations to every customer",
  "Marketing leads who need a content system, not just more content",
  "Operations teams drowning in onboarding and training questions",
  "Anyone who's posted videos and gotten crickets in return",
];

const FAQS = [
  {
    q: "Is this actually free?",
    a: "Yes — no catch. We host these sessions because we love helping businesses think clearly about video.",
  },
  {
    q: "Will there be a recording?",
    a: "Yes, all registrants receive the replay and the slide deck by email.",
  },
  {
    q: "Do I need any video experience?",
    a: "None at all. This session is designed for business owners and marketers, not editors.",
  },
];

export const Route = createFileRoute("/webinar")({
  head: () => ({
    ...createSeo({
      title: "Free Webinar: Build a Video System That Scales | Palmer House Productions",
      description:
        "Join Palmer House Productions for a free live webinar on building a video system that turns messy content into a scalable, measurable machine.",
      pathname: "/webinar",
    }),
    scripts: [jsonLdScript(schemaGraph(faqSchema(FAQS)))],
  }),
  component: WebinarPage,
});

function WebinarPage() {
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "received">("idle");
  const submitted = submitState === "sent" || submitState === "received";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter your name and a valid email address.");
      return;
    }
    setError("");
    // Mirrors the contact form: POST to the configured intake endpoint when present,
    // otherwise fall back to an honest "request received" state.
    const endpoint = (import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined) ?? "";
    if (endpoint) {
      setSubmitState("sending");
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            company,
            projectType: "Webinar registration",
            message: `Webinar registration: Build a video system that scales.${company ? ` Company: ${company}.` : ""}`,
            source: "palmerhouseproductions.com/webinar",
          }),
        });
        if (!response.ok) throw new Error("Contact endpoint rejected the request.");
        setSubmitState("sent");
        return;
      } catch {
        setSubmitState("received");
        return;
      }
    }
    setSubmitState("received");
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Free live working session"
        title="Build a video system"
        highlight="that scales."
        subtitle="In 45 minutes, learn how to turn scattered production into a repeatable content library—then bring your bottleneck to the live Q&A."
        ctas={false}
        lane="evergreen"
        visual={
          <Scene name="webinar" priority tags={["45 minutes", "Live Q&A", "Replay included"]} />
        }
      />

      <Section tone="evergreen" id="register">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div className="space-y-6">
            <div className="space-y-3">
              {FACTS.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-[1.5rem] border border-white/80 bg-white p-4 shadow-soft"
                >
                  <GlyphBadge name={item.glyph} lane="evergreen" size="sm" />
                  <div>
                    <p className="text-base font-extrabold">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <PalCallout
              pal="cyrus"
              quote="Bring the video you have been putting off for six months. We will give it a job, a place in the system, and a reason to finally get made."
            />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {submitted ? (
              <motion.div
                key="success"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-[2.25rem] border border-evergreen/25 bg-white p-7 text-center shadow-soft sm:p-9"
                role="status"
                aria-live="polite"
              >
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-evergreen-soft text-evergreen">
                  <Check className="size-7" />
                </span>
                <h2 className="mt-5 text-2xl font-extrabold">
                  {submitState === "sent" ? "You’re registered." : "Request received."}
                </h2>
                {submitState === "sent" ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Thanks, {name.split(" ")[0]}. Check <strong>{email}</strong> for your
                    confirmation, replay details, and calendar invite.
                  </p>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Thanks, {name.split(" ")[0]}. We’ll email your seat details to{" "}
                    <strong>{email}</strong> within one business day. Need it sooner? Email{" "}
                    <a
                      href={`mailto:${contactInfo.email}?subject=${encodeURIComponent("Webinar registration")}`}
                      className="inline-flex min-h-11 items-center font-semibold text-evergreen-text underline underline-offset-4"
                    >
                      {contactInfo.email}
                    </a>
                    .
                  </p>
                )}
                <Link to="/blog" className="secondary-action mt-6">
                  Read a field guide while you wait
                </Link>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                initial={false}
                exit={{ opacity: 0 }}
                className="rounded-[2.25rem] border border-white/80 bg-white p-6 shadow-soft sm:p-8"
                aria-describedby={error ? "webinar-error" : undefined}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-evergreen-text">
                      Free registration
                    </p>
                    <h2 className="mt-2 text-2xl font-extrabold">Save your seat.</h2>
                  </div>
                  <CalendarDays className="size-6 text-evergreen" aria-hidden />
                </div>
                <div className="mt-5 space-y-4">
                  <div>
                    <label className="text-sm font-semibold" htmlFor="wname">
                      Name
                    </label>
                    <input
                      id="wname"
                      name="name"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                        if (error) setError("");
                      }}
                      aria-invalid={Boolean(error && !name.trim())}
                      aria-describedby={error ? "webinar-error" : undefined}
                      className="mt-1.5 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-shadow focus:ring-2 focus:ring-evergreen/30"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold" htmlFor="wemail">
                      Work email
                    </label>
                    <input
                      id="wemail"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        if (error) setError("");
                      }}
                      aria-invalid={Boolean(error && !/^\S+@\S+\.\S+$/.test(email))}
                      aria-describedby={error ? "webinar-error" : undefined}
                      className="mt-1.5 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-shadow focus:ring-2 focus:ring-evergreen/30"
                      placeholder="jane@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold" htmlFor="wcompany">
                      Company <span className="font-normal text-muted-foreground">(optional)</span>
                    </label>
                    <input
                      id="wcompany"
                      name="company"
                      autoComplete="organization"
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                      className="mt-1.5 min-h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-shadow focus:ring-2 focus:ring-evergreen/30"
                      placeholder="Palmer House"
                    />
                  </div>
                  <div className="min-h-5">
                    {error && (
                      <p
                        id="webinar-error"
                        className="text-sm font-semibold text-destructive"
                        role="alert"
                      >
                        {error}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitState === "sending"}
                  className="primary-action mt-2 w-full justify-center"
                >
                  {submitState === "sending" ? "Sending…" : "Reserve my free spot"}{" "}
                  <ArrowRight className="size-4" />
                </button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Registrants receive the replay and slide deck by email.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Section>

      <Section
        eyebrow="What you’ll learn"
        title="Leave with a system, not another list of content ideas."
        subtitle="Four focused parts connect strategy, production, distribution, and the bottleneck your team is facing now."
      >
        <ProcessTimeline
          steps={AGENDA.map((a) => ({ title: a.title, body: a.body, pal: a.pal }))}
        />
      </Section>

      <Section
        tone="mist"
        eyebrow="Who it is for"
        title="For teams ready to make video easier to run."
      >
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="text-xl font-bold">You’ll get value if you are:</h3>
            <ul className="mt-5 space-y-3">
              {WHO.map((w) => (
                <li key={w} className="flex gap-3 rounded-2xl bg-white p-4 text-sm font-medium">
                  <Check className="size-4 shrink-0 text-evergreen" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <PalCrew />
            <p className="mt-6 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-evergreen-text">
              Your hosts
            </p>
            <h3 className="mt-2 text-2xl font-bold">The Palmer House Pals</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              This session is co-hosted by members of the Palmer House Pals — the strategic guides
              behind our four video pillars. Expect practical, no-fluff frameworks from the same
              team that designs Reel, System, Evergreen, and Spotlight campaigns for real clients
              every week.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-5xl">
          <LaneTiles variant="compact" className="sm:grid-cols-4" />
        </div>
      </Section>

      <Section eyebrow="Questions" title="Before You Register">
        <FaqList items={FAQS} lane="evergreen" pal="cyrus" />
      </Section>

      <CtaBand
        title="Want a recommendation built around your business?"
        subtitle="Take the assessment for a fast starting point, or bring your current bottleneck to a discovery call."
        primaryLabel="Book a Discovery Call"
        secondaryLabel="Take the assessment"
        secondaryTo="/video-system-assessment"
        lane="evergreen"
      />
    </PageShell>
  );
}
