const stats = [
  { v: "10M+", l: "various content assets processed" },
  { v: "19,000+", l: "high-performing ads analyzed" },
  { v: "27%", l: "average CTR lift across tested campaigns" },
  { v: "99+", l: "languages supported for global brands" },
];

export function Stats() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="mx-auto max-w-3xl text-center text-[clamp(1.9rem,4.5vw,3rem)]">
          AI trained on millions of marketing assets from top ecommerce brands
        </h2>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-lg font-medium text-muted-foreground">
          {["Apple", "Amazon", "Nike", "Glossier", "Gymshark", "Notion"].map((b) => (
            <span key={b} className="font-display font-semibold">
              {b}
            </span>
          ))}
        </div>

        <div className="surface-card mt-14 p-8 sm:p-12">
          <h3 className="text-2xl sm:text-3xl">This isn't just AI. It's content intelligence.</h3>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.v}>
                <p className="text-gradient-brand font-display text-4xl font-extrabold sm:text-5xl">
                  {s.v}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <div className="surface-card p-10">
            <h3 className="text-3xl">99+ languages</h3>
            <p className="mt-3 text-muted-foreground">
              Launch brand-consistent campaigns for any market, anywhere in the world.
            </p>
          </div>
          <div className="surface-card p-10">
            <h3 className="text-3xl">Works seamlessly with your stack</h3>
            <p className="mt-3 text-muted-foreground">
              Post across every major platform, without switching tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
