const stats = [
  { v: "1 Day", l: "shoot day generating a full content library" },
  { v: "+40%", l: "average reach lift after launch" },
  { v: "+25%", l: "average engagement lift across channels" },
  { v: "5.0★", l: "client rating across every review" },
];

export function Stats() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Proudly Based In
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl text-center text-[clamp(1.9rem,4.5vw,3rem)]">
          Serving the Pacific Northwest
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
          From Seattle and Bellevue to Tacoma and Portland — we produce video content for small
          businesses, startups, healthcare systems, manufacturers, and government agencies across
          Washington and Oregon.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-lg font-medium text-muted-foreground">
          {["Seattle, WA", "Bellevue, WA", "Tacoma, WA", "Portland, OR", "Puget Sound Region"].map(
            (b) => (
              <span key={b} className="font-display font-semibold">
                {b}
              </span>
            ),
          )}
        </div>

        <div className="surface-card mt-14 p-8 sm:p-12">
          <h3 className="text-2xl sm:text-3xl">
            This isn't just footage. It's a video system that performs.
          </h3>
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
            <h3 className="text-3xl">Tailored to your team</h3>
            <p className="mt-3 text-muted-foreground">
              Every project is built around your goals and your bottom line — so you get more than
              beautiful footage.
            </p>
          </div>
          <div className="surface-card p-10">
            <h3 className="text-3xl">Ready for every channel</h3>
            <p className="mt-3 text-muted-foreground">
              Social, web, training, and email assets delivered from a single production day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
