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
  { title: "200+", body: "Videos Produced" },
  { title: "50+", body: "Happy Clients" },
  { title: "24hr", body: "Response Time" },
  { title: "4.9★", body: "Average Rating" },
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
  head: () => ({
    meta: [
      { title: "Contact Us | Palmer House Productions" },
      { name: "description", content: "Start your next video project with Palmer House Productions. Reach us by email or phone, serving Seattle, Bellevue, Tacoma, and Portland." },
      { property: "og:title", content: "Contact Us | Palmer House Productions" },
      { property: "og:description", content: "Fill out the form and we'll get back to you within 24 hours with a personalized game plan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <PageShell>
        <PageHero eyebrow="Let's Talk" title="Message Sent." highlight="We'll Be in Touch." ctas={false} />
        <Section>
          <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
            <p className="text-muted-foreground">
              Thanks, {form.name.split(" ")[0] || "friend"} — we received your message and will respond within 24 hours with a personalized game plan.
            </p>
            <button
              onClick={() => {
                setForm(EMPTY);
                setSubmitted(false);
              }}
              className="mt-6 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow"
              style={{ backgroundImage: "var(--gradient-brand)" }}
            >
              Send Another Message
            </button>
          </div>
        </Section>
      </PageShell>
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
          <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <h2 className="font-display text-xl font-bold">Send Us a Message</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="text-sm font-semibold" htmlFor="name">Name</label>
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
                <label className="text-sm font-semibold" htmlFor="email">Email</label>
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
                <label className="text-sm font-semibold" htmlFor="company">Company</label>
                <input
                  id="company"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                  placeholder="Company name (optional)"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="text-sm font-semibold" htmlFor="projectType">Project Type</label>
                <select
                  id="projectType"
                  value={form.projectType}
                  onChange={(e) => update("projectType", e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                >
                  <option value="">Select one...</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.projectType && <p className="mt-1 text-xs text-destructive">{errors.projectType}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={5}
                  className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                  placeholder="Tell us about your goals, timeline, and budget..."
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow sm:w-auto"
              style={{ backgroundImage: "var(--gradient-brand)" }}
            >
              Send Message
            </button>
          </form>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold">Book a Strategy Call</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Free 30-minute session</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Talk directly with our team about your goals, timeline, and budget. We'll map out the right content path for you.
              </p>
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
