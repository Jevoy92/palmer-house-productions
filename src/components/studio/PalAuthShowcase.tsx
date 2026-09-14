import { useState } from "react";
import { Check } from "lucide-react";
import silas from "@/assets/pals-optimized/silas.webp";
import samira from "@/assets/pals-optimized/samira.webp";
import kareem from "@/assets/pals-optimized/kareem.webp";
import kiana from "@/assets/pals-optimized/kiana.webp";
import clara from "@/assets/pals-optimized/clara.webp";
import cyrus from "@/assets/pals-optimized/cyrus.webp";
import raquel from "@/assets/pals-optimized/raquel.webp";
import ryder from "@/assets/pals-optimized/ryder.webp";

type Slide = {
  name: string;
  lane: string;
  color: string;
  soft: string;
  image: string;
  headline: string;
  helps: string;
  capabilities: string[];
};

const slides: Slide[] = [
  {
    name: "Silas",
    lane: "System Pal",
    color: "var(--system)",
    soft: "var(--system-soft)",
    image: silas,
    headline: "Organize recurring processes into reusable videos.",
    helps: "Process capture · SOP video · Onboarding",
    capabilities: ["Process capture", "SOP walkthroughs", "Onboarding videos"],
  },
  {
    name: "Samira",
    lane: "System Pal",
    color: "var(--system)",
    soft: "var(--system-soft)",
    image: samira,
    headline: "Plan how content moves through your team.",
    helps: "Calendars · Approvals · Team handoffs",
    capabilities: ["Content calendars", "Approval planning", "Team handoffs"],
  },
  {
    name: "Kareem",
    lane: "Spotlight Pal",
    color: "var(--spotlight)",
    soft: "var(--spotlight-soft)",
    image: kareem,
    headline: "Shape the story of what your business does.",
    helps: "Brand story · Founder film · Positioning",
    capabilities: ["Brand stories", "Founder films", "Offer explainers"],
  },
  {
    name: "Kiana",
    lane: "Spotlight Pal",
    color: "var(--spotlight)",
    soft: "var(--spotlight-soft)",
    image: kiana,
    headline: "Prepare people and stories for the camera.",
    helps: "Direction · Interviews · Client stories",
    capabilities: ["Creative direction", "Interview preparation", "Client stories"],
  },
  {
    name: "Clara",
    lane: "Evergreen Pal",
    color: "var(--evergreen)",
    soft: "var(--evergreen-soft)",
    image: clara,
    headline: "Explain what your customers need to understand.",
    helps: "Explainers · FAQ library · Education",
    capabilities: ["Explainer videos", "FAQ libraries", "Customer education"],
  },
  {
    name: "Cyrus",
    lane: "Evergreen Pal",
    color: "var(--evergreen)",
    soft: "var(--evergreen-soft)",
    image: cyrus,
    headline: "Organize your expertise into a video library.",
    helps: "Expertise · Long-form · Resource hubs",
    capabilities: ["Long-form series", "Expertise mapping", "Resource libraries"],
  },
  {
    name: "Raquel",
    lane: "Reel Pal",
    color: "var(--reel)",
    soft: "var(--reel-soft)",
    image: raquel,
    headline: "Shape social content around useful conversations.",
    helps: "Short form · Hooks · Weekly rhythm",
    capabilities: ["Social questions", "Short-form storytelling", "Publishing plans"],
  },
  {
    name: "Ryder",
    lane: "Reel Pal",
    color: "var(--reel)",
    soft: "var(--reel-soft)",
    image: ryder,
    headline: "Develop short videos from your ideas and footage.",
    helps: "Repurposing · Clips · Platform cuts",
    capabilities: ["Short-form hooks", "Footage repurposing", "Platform cuts"],
  },
];

/** A manually selected guide to the Pals beside the Studio sign-in form. */
export function PalAuthShowcase() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden rounded-[2rem] border border-border"
      style={{ background: slide.soft }}
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

      <div key={slide.name} className="grid flex-1 gap-6 px-8 pt-6 md:grid-cols-2">
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

          <ul
            className="mt-6 space-y-3 border-t border-ink/10 pt-5"
            aria-label={slide.name + " capabilities"}
          >
            {slide.capabilities.map((capability) => (
              <li
                key={capability}
                className="flex items-start gap-2 text-sm font-semibold leading-relaxed"
              >
                <Check className="mt-1 size-4 shrink-0" aria-hidden="true" />
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 px-8 pb-7 pt-6">
        {slides.map((item, position) => (
          <button
            key={item.name}
            type="button"
            aria-label={`Show ${item.name}`}
            aria-pressed={position === index}
            onClick={() => setIndex(position)}
            className="min-h-11 rounded-xl border px-2 text-xs font-bold hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              background: position === index ? "var(--ink)" : "white",
              color: position === index ? "white" : "var(--ink)",
              borderColor: position === index ? "var(--ink)" : "var(--border)",
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
