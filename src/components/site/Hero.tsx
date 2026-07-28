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
      className="relative flex min-h-[100svh] flex-col overflow-hidden px-4 pb-4 pt-[calc(var(--nav-h,4.5rem)+1rem)] lg:h-[100svh]"
    >
      <div className="mx-auto w-full max-w-4xl shrink-0 text-center">
        <span
          className="inline-block rounded-full p-[1.5px]"
          style={{ backgroundColor: "var(--spotlight)" }}
        >
          <span className="block rounded-full bg-background px-4 py-1">
            <span className="text-gradient-brand text-xs font-medium sm:text-sm">
              Strategic Video Content Production
            </span>
          </span>
        </span>

        <h1 className="mt-4 text-[clamp(2rem,5.2vw,3.75rem)] font-extrabold leading-[1.02]">
          Build your video library, one shoot at a time.
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base lg:text-lg">
          We don't just make videos; we solve business problems with them. One production day
          delivers weeks of content across social, web, training, and more.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <GradientButton />
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold shadow-soft transition-transform hover:scale-[1.03] sm:text-base"
          >
            Explore the Pals
          </a>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-left">
          <div className="flex items-center gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-accent font-display text-xs font-bold">
              PN
            </span>
            <span className="min-w-0 text-sm">
              <span className="block font-medium">Proudly based in the PNW</span>
              <span className="block text-muted-foreground">✦ Seattle · Portland ✦</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-secondary text-sm">
              🎬
            </span>
            <span className="min-w-0 text-sm">
              <span className="block font-medium">One shoot, every format</span>
              <span className="block text-muted-foreground">✦ Maximum output ✦</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-4 flex min-h-0 w-full max-w-5xl flex-1 items-center justify-center">
        <img
          src={palsWorld.url}
          alt="The Palmer House Pals studio world — reel, spotlight, system, and evergreen production sets"
          width={1920}
          height={1080}
          className="animate-float mx-auto h-full max-h-[46vh] w-full object-contain lg:max-h-full"
        />
      </div>

      <div className="mx-auto mt-3 flex w-full max-w-md shrink-0 items-center justify-center gap-3 pb-2">
        <div className="flex -space-x-2">
          {["S", "K", "C", "R"].map((i) => (
            <span
              key={i}
              className="grid size-7 place-items-center rounded-full border-2 border-background bg-secondary text-xs font-semibold"
            >
              {i}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground sm:text-sm">
          <strong className="text-foreground">5.0</strong>/5 from{" "}
          <strong className="text-foreground">hundreds</strong> of local businesses ★
        </p>
      </div>
    </section>
  );
}
