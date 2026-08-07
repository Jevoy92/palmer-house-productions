import { useEffect, useState } from "react";
import silas from "@/assets/Silas_standing_full.webp.asset.json";
import samira from "@/assets/Samira_standing_full.webp.asset.json";
import kareem from "@/assets/Kareem_standing_full.webp.asset.json";
import kiana from "@/assets/Kiana_standing_full.webp.asset.json";
import clara from "@/assets/Clara_standing_full.png.asset.json";
import cyrus from "@/assets/Cyrus_standing_full.png.asset.json";
import raquel from "@/assets/Raquel_standing_full.png.asset.json";
import ryder from "@/assets/Ryder_standing_full.webp.asset.json";

type Slide = {
  name: string;
  lane: string;
  color: string;
  soft: string;
  image: string;
  headline: string;
  helps: string;
  metrics: { label: string; value: string; fill: number }[];
  signature: string;
};

const slides: Slide[] = [
  {
    name: "Silas",
    lane: "System Pal",
    color: "var(--system)",
    soft: "var(--system-soft)",
    image: silas.url,
    headline: "Turns tribal knowledge into a repeatable system.",
    helps: "Process capture · SOP video · Onboarding",
    metrics: [
      { label: "Repeat questions answered once", value: "84%", fill: 84 },
      { label: "Onboarding time saved", value: "6 hrs", fill: 62 },
      { label: "Team clarity score", value: "9.1", fill: 91 },
    ],
    signature: "Write it once. Film it once. Use it forever.",
  },
  {
    name: "Samira",
    lane: "System Pal",
    color: "var(--system)",
    soft: "var(--system-soft)",
    image: samira.url,
    headline: "Builds the operating rhythm behind the content.",
    helps: "Calendars · Approvals · Team handoffs",
    metrics: [
      { label: "On-time publishing", value: "96%", fill: 96 },
      { label: "Handoff friction", value: "-71%", fill: 71 },
      { label: "Weeks planned ahead", value: "8", fill: 66 },
    ],
    signature: "A calendar is a promise you can actually keep.",
  },
  {
    name: "Kareem",
    lane: "Spotlight Pal",
    color: "var(--spotlight)",
    soft: "var(--spotlight-soft)",
    image: kareem.url,
    headline: "Makes the reason you are different impossible to miss.",
    helps: "Brand story · Founder film · Positioning",
    metrics: [
      { label: "Message recall", value: "3.2x", fill: 78 },
      { label: "Qualified inbound", value: "+41%", fill: 41 },
      { label: "Pitch confidence", value: "9.4", fill: 94 },
    ],
    signature: "Say the true thing louder than the safe thing.",
  },
  {
    name: "Kiana",
    lane: "Spotlight Pal",
    color: "var(--spotlight)",
    soft: "var(--spotlight-soft)",
    image: kiana.url,
    headline: "Turns proof into stories buyers believe.",
    helps: "Testimonials · Case studies · Social proof",
    metrics: [
      { label: "Close-rate lift", value: "+28%", fill: 58 },
      { label: "Proof assets per shoot", value: "12", fill: 80 },
      { label: "Objections answered", value: "17", fill: 72 },
    ],
    signature: "Your customers already wrote the best script.",
  },
  {
    name: "Clara",
    lane: "Evergreen Pal",
    color: "var(--evergreen)",
    soft: "var(--evergreen-soft)",
    image: clara.url,
    headline: "Teaches the thing you explain on every single call.",
    helps: "Explainers · FAQ library · Education",
    metrics: [
      { label: "Support calls avoided", value: "-46%", fill: 46 },
      { label: "Library shelf life", value: "3 yrs", fill: 88 },
      { label: "Watch-through rate", value: "67%", fill: 67 },
    ],
    signature: "Teach first. The sale follows the understanding.",
  },
  {
    name: "Cyrus",
    lane: "Evergreen Pal",
    color: "var(--evergreen)",
    soft: "var(--evergreen-soft)",
    image: cyrus.url,
    headline: "Builds the library that keeps earning after launch.",
    helps: "Search demand · Long-form · Resource hubs",
    metrics: [
      { label: "Organic discovery", value: "+119%", fill: 85 },
      { label: "Assets still working", value: "92%", fill: 92 },
      { label: "Cost per lead", value: "-38%", fill: 62 },
    ],
    signature: "Evergreen is not slow. It is patient and paid.",
  },
  {
    name: "Raquel",
    lane: "Reel Pal",
    color: "var(--reel)",
    soft: "var(--reel-soft)",
    image: raquel.url,
    headline: "Keeps you visible without living on your phone.",
    helps: "Short form · Hooks · Weekly rhythm",
    metrics: [
      { label: "Posts from one shoot", value: "24", fill: 90 },
      { label: "Hook hold rate", value: "58%", fill: 58 },
      { label: "Hours filming / month", value: "2", fill: 34 },
    ],
    signature: "One good afternoon becomes a month of presence.",
  },
  {
    name: "Ryder",
    lane: "Reel Pal",
    color: "var(--reel)",
    soft: "var(--reel-soft)",
    image: ryder.url,
    headline: "Finds the moment inside the footage you already have.",
    helps: "Repurposing · Clips · Platform cuts",
    metrics: [
      { label: "Extra clips per hour", value: "18", fill: 76 },
      { label: "Reuse of existing footage", value: "71%", fill: 71 },
      { label: "Time to publish", value: "48 hrs", fill: 52 },
    ],
    signature: "Every long video is hiding a dozen short ones.",
  },
];

/** Rotating Pal infographic panel used beside the Studio sign-in form. */
export function PalAuthShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = slides[index];

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => setIndex((current) => (current + 1) % slides.length), 6000);
    return () => clearTimeout(timer);
  }, [index, paused]);

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] border border-border"
      style={{ background: slide.soft }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Meet the Pals"
    >
      <div className="flex items-center justify-between px-8 pt-8">
        <p
          className="font-mono text-[10px] font-bold uppercase tracking-[.2em]"
          style={{ color: slide.color }}
        >
          {slide.lane}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[.2em] text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </p>
      </div>

      <div key={slide.name} className="grid flex-1 animate-fade-in gap-6 px-8 pt-6 md:grid-cols-2">
        <div className="relative flex items-end justify-center">
          <img
            src={slide.image}
            alt={`${slide.name}, ${slide.lane} at Palmer House`}
            className="max-h-[26rem] w-auto object-contain mix-blend-multiply"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-black leading-[.98] tracking-[-.05em]">{slide.name}</h2>
          <p className="mt-3 text-base font-bold leading-snug">{slide.headline}</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground">
            {slide.helps}
          </p>

          <dl className="mt-6 space-y-4 rounded-2xl bg-white/80 p-5">
            {slide.metrics.map((metric) => (
              <div key={metric.label}>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-xs font-semibold text-muted-foreground">{metric.label}</dt>
                  <dd className="text-sm font-black" style={{ color: slide.color }}>
                    {metric.value}
                  </dd>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full transition-[width] duration-700"
                    style={{ width: `${metric.fill}%`, background: slide.color }}
                  />
                </div>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-sm font-semibold italic leading-relaxed text-muted-foreground">
            “{slide.signature}”
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 px-8 pb-7 pt-6">
        {slides.map((item, position) => (
          <button
            key={item.name}
            type="button"
            aria-label={`Show ${item.name}`}
            aria-current={position === index}
            onClick={() => setIndex(position)}
            className="size-2.5 rounded-full transition-colors"
            style={{
              background: position === index ? slide.color : "var(--border)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
