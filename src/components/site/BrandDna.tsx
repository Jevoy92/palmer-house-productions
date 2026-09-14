import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import raquel from "@/assets/pal-headshots/raquel.png";
import ryder from "@/assets/pal-headshots/ryder.png";
import { LaneTag } from "./LaneTag";

const features = [
  {
    title: "Built for the platform",
    body: "Short-form cuts shaped for the pace, framing, and captions of the channel where they will appear.",
    tag: "TikTok · Reels · Shorts",
  },
  {
    title: "A rhythm you can maintain",
    body: "Leave the shoot with a practical sequence of content and a clear idea of what to share next.",
    tag: "Plan · Film · Share",
  },
  {
    title: "A reason to join in",
    body: "Useful questions, clear hooks, and relevant next steps give people something to respond to.",
    tag: "Hooks · Questions · Conversation",
  },
  {
    title: "A recognizable point of view",
    body: "Keep the voice and ideas consistent as each piece takes a different shape.",
    tag: "Your voice, across every format",
  },
];

export function BrandDna() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-6 border-b border-border pb-10 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <p className="text-sm font-semibold text-spotlight">A library with a purpose</p>
            <h2 className="mt-3 max-w-2xl text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.06]">
              One shoot. More ways to tell your story.
            </h2>
          </div>
          <div>
            <p className="max-w-xl leading-relaxed text-muted-foreground">
              Plan the formats together, then capture what each one needs. Your content can work
              across social, your website, sales, and training.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <LaneTag lane="spotlight">Video</LaneTag>
              <LaneTag lane="evergreen">Photo</LaneTag>
              <LaneTag lane="system">Training</LaneTag>
              <LaneTag lane="reel">Social</LaneTag>
            </div>
          </div>
        </div>
        <div
          className="marketing-lane mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.2fr] lg:gap-16"
          data-lane="reel"
        >
          <div className="self-start overflow-hidden rounded-3xl bg-[var(--lane-soft)] p-7 sm:p-9">
            <LaneTag lane="reel">Reel Pal</LaneTag>
            <h2 className="mt-6 max-w-sm text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl">
              Give a good idea more places to go.
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">
              Raquel and Ryder bring the focus to short-form content: how it opens, why people stay,
              and what comes next.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { name: "Raquel", role: "Connection", image: raquel },
                { name: "Ryder", role: "Momentum", image: ryder },
              ].map((pal) => (
                <figure key={pal.name} className="overflow-hidden rounded-2xl bg-white">
                  <img
                    src={pal.image}
                    alt={pal.name + ", your Reel Pal guide"}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="aspect-square w-full object-cover"
                  />
                  <figcaption className="px-4 pb-4 pt-2">
                    <span className="block font-bold">{pal.name}</span>
                    <span className="text-xs text-muted-foreground">{pal.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <Link
              to="/reel-pal"
              className="mt-7 inline-flex min-h-11 items-center gap-2 font-bold text-[var(--lane-ink)]"
            >
              Explore Reel Pal <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="divide-y divide-border border-t border-border">
            {features.map((feature, index) => (
              <article key={feature.title} className="flex gap-5 py-7 first:pt-6 sm:gap-6">
                <span
                  className="mt-1 grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--lane-soft)] text-sm font-bold text-[var(--lane-ink)]"
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-2xl">{feature.title}</h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">
                    {feature.body}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-[var(--lane-ink)]">{feature.tag}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
