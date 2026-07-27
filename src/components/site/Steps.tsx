const steps = [
  {
    n: "01",
    title: "Share Your Vision",
    body: "Tell us your goals and we'll craft the perfect video strategy for your business.",
  },
  {
    n: "02",
    title: "Custom Strategy",
    body: "Our team designs a tailored video content plan that aligns with your brand.",
  },
  {
    n: "03",
    title: "Professional Production",
    body: "We handle everything from filming to editing with cinematic quality.",
  },
  {
    n: "04",
    title: "Launch & Optimize",
    body: "Publish your content and watch your engagement soar. We're with you every step.",
  },
];

export function Steps() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)]">
          How Palmer House Productions Works
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
