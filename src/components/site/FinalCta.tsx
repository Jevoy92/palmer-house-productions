import mascot from "@/assets/mascot.jpg";

export function FinalCta() {
  return (
    <footer className="px-4 pb-16 pt-10">
      <div
        className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] px-6 py-20 text-center"
        style={{ backgroundImage: "var(--gradient-brand)" }}
      >
        <img
          src={mascot}
          alt="Holo mascot"
          width={1200}
          height={1200}
          loading="lazy"
          className="animate-float mx-auto w-40 rounded-full"
        />
        <h2 className="mt-8 text-[clamp(2rem,5vw,3.4rem)] leading-tight text-primary-foreground">
          Ready to create agency-like content?
        </h2>
        <p className="mt-3 text-lg text-primary-foreground/85">(Without the fees)</p>
        <a
          href="#top"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-card px-8 py-4 text-base font-semibold text-foreground shadow-soft transition-transform hover:scale-[1.03]"
        >
          Buy now <span aria-hidden>→</span>
        </a>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Holo AI. All rights reserved.</p>
        <nav className="flex gap-6">
          <a href="#features" className="hover:text-foreground">
            Use cases
          </a>
          <a href="#pricing" className="hover:text-foreground">
            Pricing
          </a>
          <a href="#top" className="hover:text-foreground">
            Privacy
          </a>
        </nav>
      </div>
    </footer>
  );
}
