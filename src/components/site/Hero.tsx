import mascot from "@/assets/mascot.jpg";

function GradientButton({ label = "Buy now" }: { label?: string }) {
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
            <span className="text-gradient-brand text-sm font-medium">AI for Marketing</span>
          </span>
        </span>

        <h1 className="mt-7 text-[clamp(2.6rem,7vw,5rem)] font-extrabold leading-[0.98]">
          Launch 10x more content. 75% faster.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Holo turns your website into ads, emails, and social posts. 100's of content pieces
          generated, while you sleep.
        </p>

        <div className="mt-8 flex justify-center">
          <GradientButton />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-left">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-accent font-display text-sm font-bold">
              F
            </span>
            <span className="text-sm">
              <span className="block font-medium">Backed by VC funds</span>
              <span className="block text-muted-foreground">✦ $6MM+ raised ✦</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-secondary text-sm">✳</span>
            <span className="text-sm">
              <span className="block font-medium">Powered by OpenAI</span>
              <span className="block text-muted-foreground">✦ Leading AI model ✦</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-xl">
        <img
          src={mascot}
          alt="Holo AI mascot wearing a holographic visor"
          width={1200}
          height={1200}
          className="animate-float mx-auto w-full max-w-md mix-blend-multiply"
        />
      </div>

      <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-3">
        <div className="flex -space-x-2">
          {["A", "M", "J", "S"].map((i) => (
            <span
              key={i}
              className="grid size-8 place-items-center rounded-full border-2 border-background bg-secondary text-xs font-semibold"
            >
              {i}
            </span>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">4.9</strong>/5 from{" "}
          <strong className="text-foreground">4268</strong> customers ★
        </p>
      </div>
    </section>
  );
}
