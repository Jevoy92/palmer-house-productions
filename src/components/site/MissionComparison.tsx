import { Section } from "@/components/site/PageShell";

const ROWS: { label: string; values: [string, string, string, string] }[] = [
  {
    label: "Primary Goal",
    values: [
      "Get attention and post consistently",
      "Elevate brand perception and trust",
      "Build internal video systems",
      "Create content that compounds over time",
    ],
  },
  {
    label: "Best For",
    values: [
      "Social content, objection handling, proof",
      "Brand films, testimonials, offer clarity",
      "Onboarding, SOPs, training libraries",
      "YouTube, website education, SEO authority",
    ],
  },
  {
    label: "Video Style",
    values: [
      "Short-form, platform-native",
      "Cinematic, high-production",
      "Clear, instructional",
      "Structured, educational",
    ],
  },
  {
    label: "Typical Video Count",
    values: ["5–14 videos", "4–5 videos", "5–9 videos", "1 long-form per piece"],
  },
  {
    label: "Pricing Model",
    values: [
      "$450 + $150/video",
      "$450 + $150/video",
      "$450 + $150/video",
      "$1,050 / $1,650 / $2,250",
    ],
  },
  {
    label: "Business Impact",
    values: [
      "More visibility and engagement",
      "Stronger brand credibility",
      "Time saved + operational clarity",
      "Organic traffic + thought leadership",
    ],
  },
  {
    label: "Speed to Publish",
    values: ["Fast", "Moderate", "Moderate", "Longer production cycle"],
  },
  {
    label: "Compounding Value",
    values: ["Medium", "Medium-High", "High (internally)", "Very High (externally)"],
  },
];

const LANES = [
  { name: "Reel", tag: "Visibility" },
  { name: "Spotlight", tag: "Brand Authority" },
  { name: "System", tag: "Operations" },
  { name: "Evergreen", tag: "Long-Term Authority" },
];

export function MissionComparison() {
  return (
    <Section
      eyebrow="Compare Missions"
      title="Mission Lane Comparison"
      subtitle="All missions are built using the same system. No mystery math. Fully customizable."
    >
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-soft">
          <p className="font-display text-lg font-bold">Mission Session</p>
          <p className="text-gradient-brand mt-1 font-display text-2xl font-extrabold">$450</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-soft">
          <p className="font-display text-lg font-bold">Additional Videos</p>
          <p className="text-gradient-brand mt-1 font-display text-2xl font-extrabold">$150 each</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-soft">
          <p className="font-display text-lg font-bold">Evergreen Videos</p>
          <p className="text-gradient-brand mt-1 font-display text-2xl font-extrabold">$1,050 / $1,650 / $2,250</p>
        </div>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 font-display text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Category
              </th>
              {LANES.map((lane) => (
                <th key={lane.name} className="p-4 font-display text-sm font-bold">
                  {lane.name}
                  <span className="block text-xs font-normal text-muted-foreground">({lane.tag})</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label} className="border-b border-border last:border-0">
                <td className="p-4 align-top font-semibold">{row.label}</td>
                {row.values.map((v, i) => (
                  <td key={i} className="p-4 align-top text-muted-foreground">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
        Choose Reel if your problem is visibility. Choose Spotlight if your problem is perception. Choose System if
        your problem is internal chaos. Choose Evergreen if your problem is long-term authority.
      </p>
    </Section>
  );
}
