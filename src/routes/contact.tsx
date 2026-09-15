import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { PageShell, PageHero, Section, Card, CardGrid } from "@/components/site/PageShell";
import { PalCallout, Scene } from "@/components/site/PalVisuals";
import { Glyph, type GlyphName } from "@/components/site/Glyphs";
import { contactInfo } from "@/data/nav";
import { PAL_GROUPS, type PalAccent } from "@/lib/pricing-catalog";
import { createSeo } from "@/lib/seo";

const PROJECT_TYPES = [
  ...PAL_GROUPS.flatMap((group) => group.items.map((item) => item.name)),
  "Not Sure Yet",
];

const STATS: { title: string; body: string; lane: PalAccent; glyph: GlyphName }[] = [
  {
    title: "One Shoot",
    body: "Finished videos planned around your goals",
    lane: "spotlight",
    glyph: "camera",
  },
  {
    title: "4 Pal Lanes",
    body: "Visibility, trust, authority, and systems",
    lane: "evergreen",
    glyph: "layers",
  },
  {
    title: "Pacific Northwest",
    body: "Seattle, Bellevue, Tacoma, Portland, and beyond",
    lane: "system",
    glyph: "pin",
  },
  {
    title: "Direct Access",
    body: "Talk to the team doing the work",
    lane: "reel",
    glyph: "handshake",
  },
];

type FormState = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
};

const EMPTY: FormState = { name: "", email: "", company: "", projectType: "", message: "" };

function formatQuoteDetails(value?: string): string {
  if (!value) return "";
  try {
    const items = JSON.parse(value) as unknown;
    if (!Array.isArray(items)) return "";
    return items
      .map((item) => {
        if (!item || typeof item !== "object") return "";
        const entry = item as Record<string, unknown>;
        const name = typeof entry.name === "string" ? entry.name : "";
        const configuration = typeof entry.configuration === "string" ? entry.configuration : "";
        return [name, configuration].filter(Boolean).join(": ");
      })
      .filter(Boolean)
      .join("; ");
  } catch {
    return "";
  }
}

export const Route = createFileRoute("/contact")({
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    quote?: string;
    total?: string;
    services?: string;
    details?: string;
    name?: string;
    email?: string;
    company?: string;
    offer?: string;
    cadence?: string;
    recipient?: string;
    note?: string;
    gift?: string;
    expanded_scriptwriting?: string;
  } => ({
    quote: typeof search.quote === "string" ? search.quote : undefined,
    total:
      typeof search.total === "string" || typeof search.total === "number"
        ? String(search.total)
        : undefined,
    services: typeof search.services === "string" ? search.services : undefined,
    details: typeof search.details === "string" ? search.details : undefined,
    name: typeof search.name === "string" ? search.name : undefined,
    email: typeof search.email === "string" ? search.email : undefined,
    company: typeof search.company === "string" ? search.company : undefined,
    offer: typeof search.offer === "string" ? search.offer : undefined,
    cadence: typeof search.cadence === "string" ? search.cadence : undefined,
    recipient: typeof search.recipient === "string" ? search.recipient : undefined,
    note: typeof search.note === "string" ? search.note : undefined,
    gift: typeof search.gift === "string" ? search.gift : undefined,
    expanded_scriptwriting:
      typeof search.expanded_scriptwriting === "string" ? search.expanded_scriptwriting : undefined,
  }),
  head: () => ({
    ...createSeo({
      title: "Contact Us | Palmer House Productions",
      description:
        "Start your next video project with Palmer House Productions. Reach us by email or phone, serving Seattle, Bellevue, Tacoma, and Portland.",
      pathname: "/contact",
    }),
  }),
  component: ContactPage,
});

function ContactPage() {
  const quote = Route.useSearch();
  const quoteDetails = formatQuoteDetails(quote.details);
  const quoteContext = [
    `I'd like to discuss quote ${quote.quote} (${quote.services || "selected Palmer House services"}), estimated at $${quote.total}.`,
    quoteDetails ? `Configuration: ${quoteDetails}.` : "",
    quote.cadence ? `Cadence: ${quote.cadence}.` : "",
    quote.offer ? `Offer: ${quote.offer}.` : "",
    quote.recipient ? `Gift recipient: ${quote.recipient}.` : "",
    quote.note ? `Gift note: ${quote.note}` : "",
    quote.expanded_scriptwriting ? "Expanded scriptwriting requested." : "",
  ]
    .filter(Boolean)
    .join("\n");
  const [form, setForm] = useState<FormState>(() => ({
    ...EMPTY,
    name: quote.name ?? "",
    email: quote.email ?? "",
    company: quote.company ?? "",
    projectType: quote.quote ? "Not Sure Yet" : "",
    message: quote.quote ? quoteContext : "",
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [draftOpened, setDraftOpened] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "email">("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email.";
    if (!form.projectType) next.projectType = "Please select a project type.";
    if (!form.message.trim()) next.message = "Tell us a bit about your project.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) {
      window.requestAnimationFrame(() => {
        document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
      return;
    }
    const subject = `Project inquiry from ${form.name}${form.company ? ` — ${form.company}` : ""}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company || "Not provided"}`,
      `Project type: ${form.projectType}`,
      "",
      form.message,
    ].join("\n");
    const endpoint = (import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined) ?? "";
    if (endpoint) {
      setSubmitState("sending");
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ...form, source: "palmerhouseproductions.com" }),
        });
        if (!response.ok) throw new Error("Contact endpoint rejected the request.");
        setSubmitState("sent");
        setForm(EMPTY);
        return;
      } catch {
        setSubmitState("email");
      }
    }
    setDraftOpened(true);
    setSubmitState("email");
    window.location.assign(
      `mailto:info@palmerhouseproductions.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Start with the problem"
        title="Tell us what keeps"
        highlight="getting repeated, missed, or misunderstood."
        subtitle="You do not need a finished brief. Share the bottleneck, goal, timing, and budget you know. We'll get back to you within 24 hours with a personalized game plan."
        ctas={false}
        lane="spotlight"
      >
        <div className="rounded-[2.25rem] bg-ink p-6 text-white shadow-soft sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">
              What happens next
            </p>
            <Glyph name="chat" lane="spotlight" className="size-12" />
          </div>
          <div className="mt-6 space-y-3">
            {[
              "We read the context before replying.",
              "We identify the likely Pal lane or strategy path.",
              "We confirm the useful next step before scope grows.",
            ].map((item, index) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/8 p-4">
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                    index === 0 ? "bg-reel" : index === 1 ? "bg-spotlight" : "bg-evergreen"
                  }`}
                >
                  {index + 1}
                </span>
                <p className="text-sm font-semibold text-white/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      <Section
        eyebrow="Project intake"
        title="A useful first conversation starts with context."
        subtitle="Answer what you can. The team can help shape the rest."
        lane="spotlight"
      >
        <div className="mx-auto mb-8 max-w-6xl">
          <PalCallout
            pal="kiana"
            quote="You do not need a polished brief. Tell me about a customer, a hard week, or the question you keep answering — that is enough to start."
          />
        </div>
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.35fr_.65fr] lg:items-start">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-[2.5rem] border border-border bg-white p-6 shadow-soft sm:p-10"
          >
            <h3 className="text-3xl font-extrabold">What is not working yet?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Repeated questions, weak trust, random content, slow training, an unclear offer, or
              something else—we can start there.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="text-sm font-semibold" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="mt-2 min-h-12 w-full rounded-2xl border border-border bg-mist px-4 text-sm"
                  placeholder="Jane Doe"
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-destructive" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="sm:col-span-1">
                <label className="text-sm font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="mt-2 min-h-12 w-full rounded-2xl border border-border bg-mist px-4 text-sm"
                  placeholder="jane@company.com"
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-destructive" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="sm:col-span-1">
                <label className="text-sm font-semibold" htmlFor="company">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  autoComplete="organization"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  className="mt-2 min-h-12 w-full rounded-2xl border border-border bg-mist px-4 text-sm"
                  placeholder="Company name (optional)"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="text-sm font-semibold" htmlFor="projectType">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  aria-required="true"
                  aria-invalid={Boolean(errors.projectType)}
                  aria-describedby={errors.projectType ? "project-type-error" : undefined}
                  value={form.projectType}
                  onChange={(e) => update("projectType", e.target.value)}
                  className="mt-2 min-h-12 w-full rounded-2xl border border-border bg-mist px-4 text-sm"
                >
                  <option value="">Select one...</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <p id="project-type-error" className="mt-1 text-xs text-destructive" role="alert">
                    {errors.projectType}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  aria-required="true"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={5}
                  className="mt-2 w-full rounded-2xl border border-border bg-mist px-4 py-3 text-sm"
                  placeholder="Tell us about your goals, timeline, and budget..."
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-destructive" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={submitState === "sending"}
              className="primary-action mt-6 w-full justify-center sm:w-auto"
            >
              {submitState === "sending"
                ? "Sending…"
                : import.meta.env.VITE_CONTACT_FORM_ENDPOINT
                  ? "Send Project Inquiry"
                  : "Open Email Draft"}
            </button>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {import.meta.env.VITE_CONTACT_FORM_ENDPOINT
                ? "Your message is sent to the configured Palmer House intake system."
                : "This opens a prefilled message in your email app. Nothing is sent until you review and send it."}
            </p>
            {submitState === "sent" && (
              <p className="mt-3 text-sm font-medium text-evergreen" role="status">
                Your inquiry was accepted by the configured Palmer House intake endpoint.
              </p>
            )}
            {draftOpened && (
              <p className="mt-3 text-sm font-medium text-evergreen" role="status">
                Your email draft should be open. If it did not launch, email us directly at
                info@palmerhouseproductions.com.
              </p>
            )}
          </form>

          <aside className="space-y-4 lg:sticky lg:top-28">
            <Scene
              name="contact"
              tags={["Reply within 24 hours", "Free 30-min call"]}
              caption="Kiana · Story and presence"
            />
            <div className="flex items-start gap-4 rounded-[2rem] bg-evergreen-soft p-6">
              <Glyph name="cart" lane="evergreen" className="size-12 shrink-0" />
              <div>
                <p className="text-sm font-bold">Prefer to price the idea first?</p>
                <Link
                  to="/production-pricing"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-evergreen-text"
                >
                  Build a working package <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section
        tone="spotlight"
        eyebrow="Reach us directly"
        title="Pick whichever way is easiest."
        subtitle="Book a call, send a note, or ring the studio. We serve the Pacific Northwest from Bellevue and Portland."
      >
        <CardGrid cols={4}>
          <Card lane="spotlight" glyph="calendar" title="Book a Strategy Call">
            <p className="relative mt-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-spotlight-text">
              Free 30-minute session
            </p>
            <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
              Talk directly with our team about your goals, timeline, and budget. We'll map out the
              right content path for you.
            </p>
            {import.meta.env.VITE_CLICKUP_INTAKE_URL && (
              <a
                href={import.meta.env.VITE_CLICKUP_INTAKE_URL as string}
                target="_blank"
                rel="noreferrer"
                className="relative mt-5 inline-flex min-h-11 items-center rounded-full bg-spotlight px-4 text-sm font-bold text-white"
              >
                Open client intake
              </a>
            )}
          </Card>
          <Card lane="evergreen" glyph="chat" title="Email the team">
            <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
              >
                {contactInfo.email}
              </a>
            </p>
          </Card>
          <Card lane="reel" glyph="mic" title="Call the studio">
            <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
              <a
                href={contactInfo.phoneHref}
                className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
              >
                (425) 533-9060
              </a>
            </p>
          </Card>
          <Card lane="system" glyph="pin" title="Bellevue, WA & Portland, OR">
            <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
              Serving Seattle, Bellevue, Tacoma, Portland &amp; beyond
            </p>
          </Card>
        </CardGrid>
      </Section>

      <Section
        eyebrow="Why Palmer House"
        title="A production relationship built around clarity."
        subtitle="The route from first question to reusable library stays connected."
      >
        <CardGrid cols={4}>
          {STATS.map((s) => (
            <Card key={s.body} title={s.title} body={s.body} lane={s.lane} glyph={s.glyph} />
          ))}
        </CardGrid>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/process" className="secondary-action">
            See the process
          </Link>
          <Link to="/resources/reviews" className="secondary-action">
            Read client reviews
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}
