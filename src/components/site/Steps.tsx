const steps = [
  {
    n: "01",
    title: "Input your URL",
    body: "Drop your website link and Holo's AI will learn your brand in minutes.",
  },
  {
    n: "02",
    title: "Swipe ideas",
    body: "Our AI content creator delivers fresh ideas every single day.",
  },
  { n: "03", title: "Edit & customize", body: "Change anything, no design skills needed." },
  { n: "04", title: "Download & publish", body: "Launch 10x more content, 75% faster." },
];

export function Steps() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)]">
          How Our AI Marketing Tool Works
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <article key={s.n} className="surface-card p-7">
              <span className="text-gradient-brand font-display text-3xl font-extrabold">
                {s.n}
              </span>
              <h3 className="mt-6 text-xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
