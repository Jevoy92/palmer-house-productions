import { Link } from "@tanstack/react-router";
import { ArrowRight, Clapperboard, Film, BookOpen, MonitorPlay, MessageCircle } from "lucide-react";
import { LaneTag, type MarketingLane } from "./LaneTag";

const formats: { label: string; lane: MarketingLane }[] = [
  { label: "Product demos", lane: "spotlight" },
  { label: "Team stories", lane: "spotlight" },
  { label: "Training videos", lane: "system" },
  { label: "Testimonials", lane: "spotlight" },
  { label: "Brand stories", lane: "spotlight" },
  { label: "Social content", lane: "reel" },
  { label: "Event coverage", lane: "reel" },
  { label: "Explainer videos", lane: "evergreen" },
  { label: "Before & after", lane: "spotlight" },
  { label: "Client stories", lane: "spotlight" },
  { label: "How-to guides", lane: "evergreen" },
  { label: "Company culture", lane: "system" },
  { label: "Industry insights", lane: "evergreen" },
  { label: "Behind the scenes", lane: "reel" },
];
const outputs = [
  { lane: "spotlight", label: "Your main story", detail: "Website · Brand film", icon: Film },
  {
    lane: "reel",
    label: "Short social cuts",
    detail: "Reels · TikTok · Shorts",
    icon: MessageCircle,
  },
  { lane: "evergreen", label: "Useful explainers", detail: "YouTube · Education", icon: BookOpen },
  {
    lane: "system",
    label: "Reusable know-how",
    detail: "Training · Onboarding",
    icon: MonitorPlay,
  },
] as const;

export function ContentCalendar() {
  return (
    <section className="bg-cream/60 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-spotlight">
          From the shoot to the places you show up
        </p>
        <h2 className="mt-3 max-w-3xl text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.06]">
          Plan the content together. Make every format useful.
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Start with your story and the channels you need. We plan what to capture, then shape the
          footage into the formats agreed for your project.
        </p>
        <div className="mt-10 grid items-center gap-5 lg:grid-cols-[0.8fr_auto_1.5fr]">
          <div className="rounded-3xl bg-ink p-8 text-white sm:p-10">
            <Clapperboard className="size-10 text-white/80" strokeWidth={1.5} />
            <p className="mt-7 text-sm font-semibold text-white/65">The starting point</p>
            <h3 className="mt-2 text-3xl leading-tight">One focused production day.</h3>
            <p className="mt-4 leading-relaxed text-white/80">
              Your people, your expertise, and the details that make your business yours.
            </p>
            <p className="mt-6 border-t border-white/20 pt-5 text-sm text-white/70">
              Planned together · Captured with purpose
            </p>
          </div>
          <ArrowRight
            className="mx-auto size-6 rotate-90 text-spotlight lg:rotate-0"
            aria-hidden="true"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {outputs.map((output) => (
              <div
                key={output.lane}
                data-lane={output.lane}
                className="marketing-lane rounded-2xl border bg-[var(--lane-soft)] p-6"
                style={{ borderColor: "color-mix(in srgb, var(--lane) 20%, transparent)" }}
              >
                <output.icon className="size-7 text-[var(--lane-ink)]" strokeWidth={1.5} />
                <h3 className="mt-5 text-xl">{output.label}</h3>
                <p className="mt-2 text-sm text-[var(--lane-ink)]">{output.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 border-t border-ink/15 pt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="max-w-lg text-2xl sm:text-3xl">
              A format for the story you need to tell.
            </h3>
            <Link
              to="/services/video-production"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-spotlight"
            >
              Explore video services <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {formats.map((format) => (
              <LaneTag key={format.label} lane={format.lane}>
                {format.label}
              </LaneTag>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-5 rounded-2xl border border-ink/10 bg-white/75 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <h3 className="shrink-0 text-xl">Built around your business.</h3>
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            Small businesses · Startups · Healthcare · Manufacturing · Public organizations
          </p>
        </div>
      </div>
    </section>
  );
}
