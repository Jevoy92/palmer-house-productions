import palsWorld from "@/assets/pals-world.png.asset.json";

function GradientButton({ label = "Book a Discovery Call" }: { label?: string }) {
  return (
    <a
      href="#pricing"
      className="bg-gradient-brand inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
    >
      {label}
      <span aria-hidden>→</span>
    </a>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-10 pt-16 sm:pt-24"
      style={{ backgroundImage: "var(--gradient-soft)" }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <span
          className="inline-block rounded-full p-[1.5px]"
          style={{ backgroundImage: "var(--gradient-brand)" }}
        >
          <span className="block rounded-full bg-background px-4 py-1.5">
            <span className="text-gradient-brand text-sm font-medium">
              Strategic Video Content Production
            </span>
          </span>
        </span>

        <h1 className="mt-7 text-[clamp(2.6rem,7vw,5rem)] font-extrabold leading-[0.98]">
          Build your video library, one shoot at a time.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          We don't just make videos; we solve business problems with them. One production day
          delivers weeks of content across social, web, training, and more.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <GradientButton />
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-base font-semibold shadow-soft transition-transform hover:scale-[1.03]"
          >
            Explore the Pals
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-left">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-accent font-display text-sm font-bold">
              PN
            </span>
            <span className="text-sm">
              <span className="block font-medium">Proudly based in the PNW</span>
              <span className="block text-muted-foreground">✦ Seattle · Portland ✦</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-secondary text-sm">🎬</span>
            <span className="text-sm">
              <span className="block font-medium">One shoot, every format</span>
              <span className="block text-muted-foreground">✦ Maximum output ✦</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-xl">
        <img
          src={mascot}
          alt="Palmer House Productions creative character"
          width={1200}
          height={1200}
          className="animate-float mx-auto w-full max-w-md mix-blend-darken"
        />
      </div>

      <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-3">
        <div className="flex -space-x-2">
          {["S", "K", "C", "R"].map((i) => (
            <span
              key={i}
              className="grid size-8 place-items-center rounded-full border-2 border-background bg-secondary text-xs font-semibold"
            >
              {i}
            </span>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">5.0</strong>/5 from{" "}
          <strong className="text-foreground">hundreds</strong> of local businesses ★
        </p>
      </div>
    </section>
  );
}
