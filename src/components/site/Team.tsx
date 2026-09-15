import { Section } from "@/components/site/PageShell";
import { PalCallout, PalRoster } from "@/components/site/PalVisuals";
import { GlyphBadge } from "@/components/site/Glyphs";

const pillars = [
  { glyph: "bulb", lane: "evergreen", text: "Jevoy leads strategy and story." },
  {
    glyph: "camera",
    lane: "spotlight",
    text: "Production, camera, sound, and editing are staffed around the work.",
  },
  {
    glyph: "chart",
    lane: "reel",
    text: "Every project is tailored to your team, your goals, and your bottom line.",
  },
] as const;

export function Team() {
  return (
    <Section
      eyebrow="Meet the Pals"
      lane="evergreen"
      title="A clear system, with a real team behind it."
      subtitle="The Pals are recognizable guides for visibility, trust, education, and operations. They help you choose the right path; Palmer House people plan and produce the work."
    >
      <PalRoster />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="surface-card p-8 sm:p-10">
          <h3 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
            A founder-led company. Never a one-person production.
          </h3>
          <ul className="mt-6 space-y-4">
            {pillars.map((p) => (
              <li key={p.text} className="flex items-center gap-4">
                <GlyphBadge name={p.glyph} lane={p.lane} size="sm" />
                <span className="text-base leading-relaxed text-ink-soft">{p.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-lg font-semibold">
            Because video isn&apos;t the goal. It&apos;s the tool that gets you there.
          </p>
        </div>
        <PalCallout
          pal="clara"
          label="Clara, Evergreen Pal"
          quote="You get content that performs, scales, and delivers real ROI — not just beautiful footage. That's the promise every Pal is built around."
          action={{ label: "Meet all eight Pals", to: "/meet-the-pals" }}
        />
      </div>
    </Section>
  );
}
