const testimonials = [
  {
    name: "Anna Clark",
    loc: "CA · Mar 6, 2025",
    text: "I run everything solo and Holo basically saved my life lol. Content posts, ads, everything ready without babysitting. 10/10.",
  },
  {
    name: "David Wilson",
    loc: "US · Mar 2, 2025",
    text: "Was worried it would be like other AI tools but this actually sounds like my brand. Great tool for busy founders.",
  },
  {
    name: "Sophie Adams",
    loc: "UK · Mar 15, 2025",
    text: "Every other AI tool I tried felt super robotic. Holo actually captured how we talk to our customers. Up and running the same day.",
  },
  {
    name: "Isaac Fisher",
    loc: "US · Mar 14, 2025",
    text: "saved us a bunch of $$ on freelancers. tone match is pretty solid across ads and emails.",
  },
  {
    name: "Nicole Harris",
    loc: "US · Mar 23, 2025",
    text: "Full campaigns ready in a couple of hours instead of weeks?? It's not just templates, it actually builds for your brand.",
  },
  {
    name: "Jonas Bertasius",
    loc: "LT · Mar 11, 2025",
    text: "Social media posts used to take me HOURS. Now it's like 10 minutes a day. crazy.",
  },
  {
    name: "Leo Zhang",
    loc: "CA · Mar 24, 2025",
    text: "Launches are faster, content sounds way better, and 90% of what comes out is ready to go.",
  },
  {
    name: "Marcus Lee",
    loc: "US · Mar 21, 2025",
    text: "Holo feels like it understands the vibe I'm going for — fun, casual, not robotic. Totally worth it.",
  },
  {
    name: "Nina Collins",
    loc: "US · Sep 23, 2025",
    text: "We built our last 3 campaigns through Holo. Genuinely impressed — it's consistent and fast.",
  },
];

export function Testimonials() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-[clamp(1.9rem,4.5vw,3rem)]">
          Built for people doing the work. Used by those who move fast.
        </h2>
      </div>

      <div className="mx-auto mt-12 max-w-6xl columns-1 gap-5 sm:columns-2 lg:columns-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="surface-card mb-5 break-inside-avoid p-6">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-secondary text-sm font-semibold">
                {t.name.charAt(0)}
              </span>
              <figcaption>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.loc}</p>
              </figcaption>
            </div>
            <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t.text}
            </blockquote>
            <p className="mt-4 text-sm">★★★★★</p>
          </figure>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        <strong className="text-foreground">4268+</strong> founders love Holo
      </p>
    </section>
  );
}
