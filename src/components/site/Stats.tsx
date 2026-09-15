import { Link } from "@tanstack/react-router";
import { Card, CardGrid, Section } from "@/components/site/PageShell";
import { PalCallout, Scene, StatBand } from "@/components/site/PalVisuals";
import { locations } from "@/data/nav";

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
        <CardGrid cols={2}>
          <Card
            lane="spotlight"
            glyph="handshake"
            title="Tailored to your team"
            body="Every project is built around your goals and your bottom line — so you get more than beautiful footage."
          />
          <Card
            lane="reel"
            glyph="publish"
            title="Ready for every channel"
            body="Social, web, training, and email assets delivered from a single production day."
          />
        </CardGrid>
      </div>
    </Section>
  );
}
