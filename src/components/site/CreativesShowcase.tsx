import c1 from "@/assets/creative-1.jpg";
import c2 from "@/assets/creative-2.jpg";
import c3 from "@/assets/creative-3.jpg";
import c4 from "@/assets/creative-4.jpg";
import { Marquee } from "./Marquee";

const creatives = [c1, c2, c3, c4];

export function CreativesShowcase() {
  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-[clamp(2rem,5vw,3.4rem)] leading-[1.02]">
          You've probably seen our work.
          <span className="block text-muted-foreground">You just didn't know it was us.</span>
        </h2>
      </div>

      <div className="mt-12">
        <Marquee duration="45s">
          {creatives.concat(creatives).map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Palmer House Productions video project ${i + 1}`}
              width={720}
              height={900}
              loading="lazy"
              className="h-72 w-56 rounded-3xl object-cover shadow-soft sm:h-96 sm:w-72"
            />
          ))}
        </Marquee>
      </div>

      <div className="mx-auto mt-16 max-w-3xl px-4 text-center text-xl leading-relaxed sm:text-2xl">
        <p>
          We don't just make videos; we solve{" "}
          <span className="text-gradient-brand font-display font-bold">business problems</span> with
          them. Maybe your onboarding takes too long. Your message isn't landing. Your brand isn't
          getting seen where it counts.
        </p>
        <p className="mt-4 text-muted-foreground">
          Whatever the challenge, we start by understanding what's getting in the way — and then
          design a video system built to fix it. Because video isn't the goal. It's the tool that
          gets you there.
        </p>
      </div>
    </section>
  );
}
