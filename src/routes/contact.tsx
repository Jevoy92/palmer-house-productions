import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageShell, PageHero, Section, Card, CardGrid } from "@/components/site/PageShell";

const PROJECT_TYPES = [
  "Spotlight (Brand Story)",
  "Reel (Short-Form)",
  "Evergreen (Training/FAQ)",
  "System (Full Ecosystem)",
  "Not Sure Yet",
];

const STATS = [
  { title: "One Shoot", body: "A reusable, multi-format content library" },
  { title: "4 Pal Lanes", body: "Visibility, trust, authority, and systems" },
  { title: "Pacific Northwest", body: "Seattle, Bellevue, Tacoma, Portland, and beyond" },
  { title: "Direct Access", body: "Talk to the team doing the work" },
];

type FormState = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
};

const EMPTY: FormState = { name: "", email: "", company: "", projectType: "", message: "" };

export const Route = createFileRoute("/contact")({
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    quote?: string;
    total?: string;
    services?: string;
  } => ({
    quote: typeof search.quote === "string" ? search.quote : undefined,
    total:
      typeof search.total === "string" || typeof search.total === "number"
        ? String(search.total)
        : undefined,
    services: typeof search.services === "string" ? search.services : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact Us | Palmer House Productions" },
      {
        name: "description",
        content:
          "Start your next video project with Palmer House Productions. Reach us by email or phone, serving Seattle, Bellevue, Tacoma, and Portland.",
      },
      { property: "og:title", content: "Contact Us | Palmer House Productions" },
      {
        property: "og:description",
        content:
          "Fill out the form and we'll get back to you within 24 hours with a personalized game plan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const quote = Route.useSearch();
  const [form, setForm] = useState<FormState>(() => ({
    ...EMPTY,
    projectType: quote.quote ? "Not Sure Yet" : "",
    message: quote.quote
      ? `I'd like to discuss quote ${quote.quote} (${quote.services || "selected Palmer House services"}), estimated at $${quote.total}.`
      : "",
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
    if (!validate()) return;
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
        eyebrow="Let's Talk"
        title="Start Your Next"
        highlight="Project"
        subtitle="Fill out the form below and we'll get back to you within 24 hours with a personalized game plan."
        ctas={false}
      />

      <Section>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.4fr_1fr]">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8"
          >
            <h2 className="font-display text-xl font-bold">Send Us a Message</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="text-sm font-semibold" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                  placeholder="Jane Doe"
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="sm:col-span-1">
                <label className="text-sm font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                  placeholder="jane@company.com"
                />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div className="sm:col-span-1">
                <label className="text-sm font-semibold" htmlFor="company">
                  Company
                </label>
                <input
                  id="company"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                  placeholder="Company name (optional)"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="text-sm font-semibold" htmlFor="projectType">
                  Project Type
                </label>
                <select
                  id="projectType"
                  value={form.projectType}
                  onChange={(e) => update("projectType", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                >
                  <option value="">Select one...</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <p className="mt-1 text-xs text-destructive">{errors.projectType}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={5}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                  placeholder="Tell us about your goals, timeline, and budget..."
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-destructive">{errors.message}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={submitState === "sending"}
              className="mt-6 w-full rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow sm:w-auto"
              style={{ backgroundColor: "var(--spotlight)" }}
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

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold">Book a Strategy Call</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Free 30-minute session
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Talk directly with our team about your goals, timeline, and budget. We'll map out
                the right content path for you.
              </p>
              {import.meta.env.VITE_CLICKUP_INTAKE_URL && (
                <a
                  href={import.meta.env.VITE_CLICKUP_INTAKE_URL as string}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center rounded-full border border-border px-4 text-sm font-semibold"
                >
                  Open client intake
                </a>
              )}
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold">Contact Info</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>info@palmerhouseproductions.com</li>
                <li>(425) 533-9060</li>
                <li>Bellevue, WA &amp; Portland, OR</li>
                <li>Serving Seattle, Bellevue, Tacoma, Portland &amp; beyond</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Why Palmer House?" muted>
        <CardGrid cols={4}>
          {STATS.map((s) => (
            <Card key={s.body} title={s.title} body={s.body} />
          ))}
        </CardGrid>
      </Section>
    </PageShell>
  );
}
