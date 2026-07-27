const team = [
  { name: "Silas", role: "System Pal" },
  { name: "Samira", role: "System Pal" },
  { name: "Kareem", role: "Spotlight Pal" },
  { name: "Kiana", role: "Spotlight Pal" },
  { name: "Clara", role: "Evergreen Pal" },
  { name: "Raquel", role: "Reel Pal" },
  { name: "Ryder", role: "Reel Pal" },
];

export function Team() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="surface-card p-8 sm:p-12">
          <h2 className="max-w-3xl text-[clamp(1.9rem,4.5vw,3rem)]">
            The <span className="text-gradient-brand">Creators</span>.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Meet our diverse team of digital experts. Each Pal owns a piece of your video system —
            from the systems that train your team to the reels that get you seen.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-3">
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
            <h3 className="text-2xl">Hi! We're the team behind Palmer House Productions.</h3>
            <div className="mt-4 space-y-3 leading-relaxed text-muted-foreground">
              <p>
                From training to visibility to customer education, our process turns complex pain
                points into clear, measurable solutions.
              </p>
              <p>
                Every project is tailored to your team, your goals, and your bottom line — so you
                get more than beautiful footage. You get content that performs, scales, and delivers
                real ROI.
              </p>
              <p>Because video isn't the goal. It's the tool that gets you there.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
