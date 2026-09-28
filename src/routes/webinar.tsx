import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
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
import { useHydratedReducedMotion } from "@/hooks/use-hydrated-reduced-motion";
import { submitWebinarInterest } from "@/lib/public-resources";
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
    label: "Details confirmed first",
    body: "Ask about the next date and replay availability.",
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
    a: "We confirm replay and slide availability with the session details. Sending an interest request does not reserve a seat.",
  },
  {
    q: "Do I need any video experience?",
    a: "None at all. This session is designed for business owners and marketers, not editors.",
  },
];

export const Route = createFileRoute("/webinar")({
  head: () => ({
    ...createSeo({
      title: "Video Workshop: Request Session Details | Palmer House Productions",
      description:
        "Ask about the next free Palmer House video workshop. The team confirms the date, availability and session details before registration.",
      pathname: "/webinar",
    }),
    scripts: [jsonLdScript(schemaGraph(faqSchema(FAQS)))],
  }),
  component: WebinarPage,
});

function WebinarPage() {
  const reduce = useHydratedReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "accepted" | "draft">("idle");
  const submitted = submitState === "accepted";
  const endpoint = (import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined)?.trim() ?? "";
  const requestText = `Name: ${name}\nEmail: ${email}\nCompany: ${company || "Not provided"}\n\nPlease send details about the next Palmer House video workshop, including date, availability and replay options.`;
  const emailUrl = `mailto:${contactInfo.email}?subject=${encodeURIComponent("Video workshop interest")}&body=${encodeURIComponent(requestText)}`;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter your name and a valid email address.");
      return;
    }
    setError("");
    if (submitState === "sending") return;
    setSubmitState("sending");
    const result = await submitWebinarInterest(
      { name: name.trim(), email: email.trim(), company: company.trim() },
      { endpoint },
    );
    if (result.status === "error") {
      setError(result.message);
      setSubmitState("draft");
    } else setSubmitState(result.status);
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Free video workshop · request details"
        title="Build a video system"
        highlight="that scales."
        subtitle="A practical session about making video useful for your business. Ask about the next date and availability; no event date is currently listed here."
        ctas={false}
        lane="evergreen"
        visual={
          <Scene
            name="webinar"
            priority
            tags={["Practical teaching", "Questions welcome", "Date to confirm"]}
          />
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
                  Your interest request was received.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Thanks, {name.split(" ")[0]}. The team will follow up at <strong>{email}</strong>{" "}
                  with availability and session details. This is not a confirmed registration or
                  calendar booking.
                </p>
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
                      Ask about the next session
                    </p>
                    <h2 className="mt-2 text-2xl font-extrabold">Find out what’s coming up.</h2>
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
                  {submitState === "sending"
                    ? "Sending…"
                    : endpoint
                      ? "Request session details"
                      : "Prepare an email request"}{" "}
                  <ArrowRight className="size-4" />
                </button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  {endpoint
                    ? "This sends an interest request. The team confirms date and availability."
                    : "Prepare a message below, then review and send it in your email app."}
                </p>
                {submitState === "draft" && (
                  <div className="mt-5 rounded-xl border border-border p-4" role="status">
                    <h3 className="font-bold">Your email request is ready.</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Nothing has been sent. Open the draft, review it, then send it from your email
                      app.
                    </p>
                    <a href={emailUrl} className="secondary-action mt-4">
                      Open email draft <ArrowRight className="size-4" />
                    </a>
                  </div>
                )}
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
              Your guides
            </p>
            <h3 className="mt-2 text-2xl font-bold">The Palmer House team</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Our human production team leads the workshop. The Pals are our creative guides and
              Studio AI collaborators; their different perspectives help make the ideas easy to
              apply.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-5xl">
          <LaneTiles variant="compact" className="sm:grid-cols-4" />
        </div>
      </Section>

      <Section eyebrow="Questions" title="Before you request details">
        <FaqList items={FAQS} lane="evergreen" pal="cyrus" />
      </Section>

      <CtaBand
        title="Want a recommendation built around your business?"
        subtitle="Take the assessment for a fast starting point, or bring your current bottleneck to a discovery call."
        primaryLabel="Request a conversation"
        primarySearch={{ intent: "call" }}
        secondaryLabel="Take the assessment"
        secondaryTo="/video-system-assessment"
        lane="evergreen"
      />
    </PageShell>
  );
}
