const team = [
  { name: "Aleksandras Urbanavičius", role: "Co-Founder" },
  { name: "Deividas Kovger", role: "Co-Founder" },
  { name: "Karolis Vaiginis", role: "Lead Designer" },
  { name: "Arnas Puidokas", role: "CTO" },
];

export function Team() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="surface-card p-8 sm:p-12">
          <h2 className="max-w-3xl text-[clamp(1.9rem,4.5vw,3rem)]">
            Great powers come with great <span className="text-gradient-brand">privacy</span>.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Your brand is your greatest asset. We protect it with full encryption, zero sharing, and
            absolute control in your hands. Stay in control — from your first post to your
            hundredth campaign, and everything after.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-2">
            {team.map((m) => (
              <div key={m.name} className="surface-card p-5 text-center">
                <span className="bg-gradient-brand mx-auto grid size-16 place-items-center rounded-full font-display text-xl font-bold text-primary-foreground">
                  {m.name.charAt(0)}
                </span>
                <p className="mt-4 text-sm font-semibold">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.role}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-2xl">Hi! We're the team behind Holo.</h3>
            <div className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
              <p>
                Some of us started building online stores in high school. Others were launching
                software before we turned 21.
              </p>
              <p>
                Over the past few years, we helped grow brands like Sintra, Pulsetto, Burga, and
                Moerie — doing growth, writing copy, setting up systems from the inside.
              </p>
              <p>Now, we're building the tool we always wished we had.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
