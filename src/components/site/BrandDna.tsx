const dna = [
  {
    title: "Captures Your Style",
    body: "Understands your creative vision. So every asset feels like it came from inside your team.",
    tag: "Brand tone",
  },
  {
    title: "Learns Buying Triggers",
    body: "It goes beyond tone. Our AI ad maker learns how your customers think when they're ready to buy.",
    tag: "Psychology",
  },
  {
    title: "Knows Your Audience",
    body: "Learns your customer's mindset, habits, and pain points, then builds content they actually care about.",
    tag: "Facebook · X · Instagram · TikTok · Email",
  },
  {
    title: "Keeps Data Private",
    body: "Your brand data stays private. It's never shared, trained on, or reused.",
    tag: "🔒 100% guarantee",
  },
];

const pillars = ["Videos", "Ads", "Socials", "Emails"];

export function BrandDna() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="surface-card overflow-hidden p-8 sm:p-12">
          <h2 className="text-[clamp(1.9rem,4.5vw,3rem)]">The All-in-One Marketing Tool</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            <em className="text-foreground not-italic">Skip the tools, templates, and tabs.</em>{" "}
            This is your AI for marketing, built to scale. From ads, emails and social posts. Core
            marketing areas? Covered.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {pillars.map((p) => (
              <span
                key={p}
                className="rounded-full border border-border bg-secondary px-5 py-2 text-sm font-medium"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-[clamp(1.9rem,4.5vw,3rem)]">Your Brand DNA</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            From brand tone to audience pain points. Holo's AI learns what makes you unique. Then
            builds with it.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {dna.map((d) => (
              <article key={d.title} className="surface-card p-8">
                <h3 className="text-2xl">{d.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{d.body}</p>
                <p className="text-gradient-brand mt-6 text-sm font-semibold">{d.tag}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
