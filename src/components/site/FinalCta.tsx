import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import kareem from "@/assets/pal-headshots/kareem.png";
import kiana from "@/assets/pal-headshots/kiana.png";

export function FinalCta() {
  return (
    <section className="px-4 pb-16 pt-8 sm:pb-20">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-spotlight text-white lg:grid-cols-[1.3fr_1fr]">
        <div className="p-7 sm:p-12 lg:p-14">
          <p className="text-sm font-semibold text-white/70">Your next story starts here</p>
          <h2 className="mt-5 max-w-xl text-[clamp(2.2rem,4.3vw,3.7rem)] leading-[1.03] tracking-tight">
            What should video make easier for your business?
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/80">
            Tell us what you’re working toward. We’ll help you find the right story, formats, and
            production plan.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-6 py-4 font-bold text-spotlight"
          >
            Book a Discovery Call <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 items-center gap-3 bg-white/5 p-7 sm:gap-4 sm:p-12 lg:p-8">
          {[
            { name: "Kareem", role: "Production quality", image: kareem },
            { name: "Kiana", role: "Story & presence", image: kiana },
          ].map((pal) => (
            <figure key={pal.name} className="overflow-hidden rounded-2xl bg-white text-ink">
              <img
                src={pal.image}
                alt={pal.name + ", Spotlight Pal guide"}
                width={512}
                height={512}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              <figcaption className="p-4">
                <span className="block font-bold">{pal.name}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{pal.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
