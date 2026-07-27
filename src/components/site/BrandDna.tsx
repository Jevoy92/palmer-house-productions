const dna = [
  {
    title: "Visibility & Momentum Engine",
    body: "Ryder hooks the scroll; Raquel keeps them watching. Together they craft content engineered for TikTok, Reels, and Shorts.",
    tag: "TikTok · Reels · Shorts",
  },
  {
    title: "Content Cadence System",
    body: "No more 'what do I post?' panic. Raquel and Ryder set up realistic schedules you can actually maintain.",
    tag: "7 Day content runway",
  },
  {
    title: "Audience Engagement Framework",
    body: "Likes are nice. Comments, shares, conversion are better. Hooks, loops, and CTA strategies that turn viewers into participants.",
    tag: "10x Comments · 5x Shares · Higher CTR",
  },
  {
    title: "Brand Momentum Engine",
    body: "One great post is good. A sustained flow of aligned content is transformative.",
    tag: "Consistency builds trust",
  },
];

const pillars = ["Video", "Photo", "Training", "Social"];

export function BrandDna() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="surface-card overflow-hidden p-8 sm:p-12">
          <h2 className="text-[clamp(1.9rem,4.5vw,3rem)]">
            Build Your Video Library, One Shoot At A Time
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            <em className="text-foreground not-italic">Maximum output, minimal effort.</em> We
            capture multiple video formats in a single production day. Your brand gets a content
            library ready to deploy across every platform — social, web, training, and more.
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
          <p className="text-gradient-brand text-sm font-semibold uppercase tracking-widest">
            Powered by Palmer House Productions
          </p>
          <h2 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)]">Reel Pal</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Meet Raquel & Ryder — your visibility experts. Your audience scrolls fast. They help
            your brand ride that momentum with short-form content engineered for the platforms your
            people actually use.
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
