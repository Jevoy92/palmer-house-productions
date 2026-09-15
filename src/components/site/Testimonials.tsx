import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/site/PageShell";
import { Scene } from "@/components/site/PalVisuals";
import { laneVar } from "@/lib/pal-lanes";
import type { PalAccent } from "@/lib/pricing-catalog";

const testimonials: Array<{ name: string; loc: string; text: string; lane: PalAccent }> = [
  {
    name: "Isabella Johnstun",
    loc: "Dick's Restaurant Supply",
    lane: "spotlight",
    text: "Jevoy and his team did an amazing job with pictures & videos of our team and stores. Our management was blown away by the quality, professionalism, and speed at which their media was produced. They took the time to understand our goals and delivered exceptional results.",
  },
  {
    name: "Athan Seyler",
    loc: "Local Guide",
    lane: "reel",
    text: "Jevoy and the Palmer House Team were fantastic! Getting in front of the camera for photos is one stressor, but jumping in front of the camera to make a video is even more stressful. Jevoy has a gift of helping his clients become grounded and comfortable.",
  },
  {
    name: "Sarah Dylan Jensen",
    loc: "Local Guide",
    lane: "evergreen",
    text: "Awesome experience from start to finish working with Jevoy. He was in constant communication, detail-oriented and provided exactly what we were looking for in our organization's marketing videos and photos.",
  },
];

export function Testimonials() {
  const reduce = useReducedMotion();
  return (
    <Section
      eyebrow="Client success"
      lane="spotlight"
      title="Trusted by growing businesses."
      subtitle="Real words from people who trusted Palmer House with the work."
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Scene name="reviews" tags={["5.0 rating", "Google reviews"]} className="w-full" />
        <div className="grid gap-5 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              className={`surface-card relative flex flex-col p-6 ${i === 0 ? "sm:col-span-2" : ""}`}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
            >
              <span
                aria-hidden
                className="absolute inset-x-6 top-0 h-1 rounded-b-full"
                style={{ background: laneVar(t.lane) }}
              />
              <div className="flex items-center gap-3">
                <span
                  className="grid size-11 place-items-center rounded-full text-sm font-bold"
                  style={{ background: laneVar(t.lane, "-soft"), color: laneVar(t.lane, "-text") }}
                >
                  {t.name.charAt(0)}
                </span>
                <figcaption>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.loc}</p>
                </figcaption>
                <span className="ml-auto flex gap-0.5" role="img" aria-label="Five star rating">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-3.5 fill-reel text-reel" />
                  ))}
                </span>
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-ink-soft">
                “{t.text}”
              </blockquote>
            </motion.figure>
          ))}
          <Link
            to="/resources/reviews"
            className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-white transition-transform hover:translate-x-0.5 sm:col-span-2"
          >
            Read more client reviews <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </Section>
  );
}
