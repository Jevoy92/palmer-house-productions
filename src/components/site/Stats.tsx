import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/site/PageShell";
import { PalCallout, Scene, StatBand } from "@/components/site/PalVisuals";
import { locations } from "@/data/nav";
import { laneById, laneVar } from "@/lib/pal-lanes";
import type { PalAccent } from "@/lib/pricing-catalog";

/** What each lane's video is for, in the customer's words — factual, no reach claims. */
const PURPOSES: { lane: PalAccent; purpose: string; formats: string }[] = [
  {
    lane: "reel",
    purpose: "Show up on social",
    formats: "Short-form videos for Reels, TikTok, and Shorts.",
  },
  {
    lane: "spotlight",
    purpose: "Tell your brand story",
    formats: "Brand films, client stories, and offer explainers.",
  },
  {
    lane: "evergreen",
    purpose: "Share what you know",
    formats: "Educational series, FAQ videos, and how-it-works guides.",
  },
  {
    lane: "system",
    purpose: "Put the process on video",
    formats: "Onboarding, training, and step-by-step walkthroughs.",
  },
];

export function Stats() {
  return (
    <Section
      tone="system"
      eyebrow="Proudly based in the Pacific Northwest"
      title="Serving Seattle, Bellevue, Tacoma, Portland & beyond."
      subtitle="We produce video content for small businesses, startups, healthcare systems, manufacturers, and government agencies across Washington and Oregon."
    >
      <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Scene
          name="locations"
          tags={["Seattle", "Portland", "Tacoma"]}
          className="mx-auto w-full max-w-md lg:max-w-none"
        />
        <div>
          <StatBand
            stats={[
              { value: 1, suffix: " day", label: "shoot day generating a full content library" },
              { value: 4, suffix: " formats", label: "social, web, sales, and training outputs" },
              {
                value: 1,
                suffix: " system",
                label: "strategy, production, editing, and delivery",
              },
              { value: "5.0★", label: "client rating across every review", lane: "system" },
            ]}
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {locations.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="inline-flex min-h-11 items-center rounded-full border border-white/80 bg-white px-4 text-sm font-semibold shadow-sm transition-colors hover:bg-ink hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <PalCallout
          pal="silas"
          label="Silas, System Pal"
          quote="This isn't just footage. It's a video system that performs — one shoot day, planned so every channel gets fed for weeks."
        />
        <div className="rounded-[2rem] border border-white/80 bg-white px-6 py-5 shadow-soft sm:px-8">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            A purpose for every piece
          </p>
          <h3 className="mt-2 text-2xl font-bold tracking-[-0.03em]">
            What does your video need to do?
          </h3>
          <ul className="mt-3 divide-y divide-border">
            {PURPOSES.map((item) => {
              const lane = laneById[item.lane];
              return (
                <li key={item.lane}>
                  <Link
                    to={lane.to}
                    className="group flex min-h-11 items-center gap-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotlight/40"
                  >
                    <span
                      aria-hidden
                      className="h-11 w-1.5 shrink-0 rounded-full"
                      style={{ background: laneVar(item.lane) }}
                    />
                    <span className="min-w-0 flex-1">
                      <span
                        className="block font-mono text-[11px] font-bold uppercase tracking-[0.14em]"
                        style={{ color: laneVar(item.lane, "-text") }}
                      >
                        {lane.label}
                      </span>
                      <span className="mt-0.5 block text-lg font-bold leading-tight group-hover:underline">
                        {item.purpose}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                        {item.formats}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="size-5 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                      style={{ color: laneVar(item.lane, "-text") }}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
