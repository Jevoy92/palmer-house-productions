import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageShell, PageHero, Section, Card, CardGrid, FaqList } from "@/components/site/PageShell";

const AGENDA = [
  { index: "01", title: "The System Mindset", body: "Why one-off videos fail and how to think about content as an asset library, not a to-do list." },
  { index: "02", title: "The Four Pillars", body: "Spotlight, Reel, Evergreen, and System — how to map your business needs to the right kind of video." },
  { index: "03", title: "Building the Machine", body: "A repeatable production and distribution workflow you can run without heroic effort." },
  { index: "04", title: "Live Q&A", body: "Bring your specific bottlenecks — we'll troubleshoot them live with the Palmer House team." },
];

const WHO = [
  "Founders tired of repeating the same explanations to every customer",
  "Marketing leads who need a content system, not just more content",
  "Operations teams drowning in onboarding and training questions",
  "Anyone who's posted videos and gotten crickets in return",
];

const FAQS = [
  { q: "Is this actually free?", a: "Yes — no catch. We host these sessions because we love helping businesses think clearly about video." },
  { q: "Will there be a recording?", a: "Yes, all registrants receive the replay and the slide deck by email." },
  { q: "Do I need any video experience?", a: "None at all. This session is designed for business owners and marketers, not editors." },
];

export const Route = createFileRoute("/webinar")({
  head: () => ({
    meta: [
      { title: "Free Webinar: Build a Video System That Scales | Palmer House Productions" },
      { name: "description", content: "Join Palmer House Productions for a free live webinar on building a video system that turns messy content into a scalable, measurable machine." },
      { property: "og:title", content: "Free Webinar: Build a Video System That Scales" },
      { property: "og:description", content: "A live session on the four pillars of video strategy and how to build a system, not just content." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WebinarPage,
});

function WebinarPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter your name and a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Free Webinar"
        title="Build a Video System"
        highlight="That Scales"
        subtitle="A free, live working session on turning messy content into a measurable, repeatable video machine — hosted by the Palmer House team."
        ctas={false}
      />

      <Section eyebrow="What You'll Learn" title="Agenda" subtitle="45 minutes, plus live Q&A.">
        <CardGrid cols={4}>
          {AGENDA.map((a) => (
            <Card key={a.index} title={a.title} body={a.body} index={a.index} />
          ))}
        </CardGrid>
      </Section>

      <Section muted>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold">Who This Is For</h2>
            <ul className="mt-4 space-y-3">
              {WHO.map((w) => (
                <li key={w} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-gradient-brand">✓</span>
                  {w}
                </li>
              ))}
            </ul>
            <h2 className="mt-8 font-display text-2xl font-bold">Your Hosts</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              This session is co-hosted by members of the Palmer House Pals — the strategic guides behind our four video pillars. Expect practical, no-fluff frameworks from the same team that designs Reel, System, Evergreen, and Spotlight campaigns for real clients every week.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-soft">
              <h3 className="font-display text-xl font-bold">You're Registered!</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Thanks, {name.split(" ")[0]}. Check {email} for your confirmation and calendar invite.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h3 className="font-display text-lg font-bold">Save Your Seat</h3>
              <div className="mt-5 space-y-4">
                <div>
                  <label className="text-sm font-semibold" htmlFor="wname">Name</label>
                  <input
                    id="wname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold" htmlFor="wemail">Email</label>
                  <input
                    id="wemail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                    placeholder="jane@company.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold" htmlFor="wcompany">Company</label>
                  <input
                    id="wcompany"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm"
                    placeholder="Optional"
                  />
                </div>
                {error && <p className="text-xs text-destructive">{error}</p>}
              </div>
              <button
                type="submit"
                className="mt-6 w-full rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow"
                style={{ backgroundImage: "var(--gradient-brand)" }}
              >
                Reserve My Free Spot
              </button>
            </form>
          )}
        </div>
      </Section>

      <Section eyebrow="Questions" title="Before You Register">
        <FaqList items={FAQS} />
      </Section>
    </PageShell>
  );
}
