import { Link } from "@tanstack/react-router";
import kareem from "@/assets/pals-optimized/kareem.webp";
import kiana from "@/assets/pals-optimized/kiana.webp";

export function FinalCta() {
  return (
    <section className="px-4 pb-20 pt-10">
      <div
        className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] px-6 py-20 text-center"
        style={{ backgroundColor: "var(--spotlight)" }}
      >
        <div className="mx-auto flex h-44 items-end justify-center" aria-hidden="true">
          <img
            src={kareem}
            alt=""
            loading="lazy"
            className="animate-float -mr-4 h-40 w-auto object-contain"
          />
          <img
            src={kiana}
            alt=""
            loading="lazy"
            className="animate-float -ml-4 h-44 w-auto object-contain [animation-delay:-2s]"
          />
        </div>
        <h2 className="mt-8 text-[clamp(2rem,5vw,3.4rem)] leading-tight text-primary-foreground">
          Ready to build a video system that works?
        </h2>
        <p className="mt-3 text-lg text-primary-foreground/85">(Not just beautiful footage)</p>
        <Link
          to="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-card px-8 py-4 text-base font-semibold text-foreground shadow-soft transition-transform hover:scale-[1.03]"
        >
          Book a Discovery Call <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
