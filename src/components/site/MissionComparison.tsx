import { Section } from "@/components/site/PageShell";
import { EVERGREEN_LENGTH_PRICE, FINISHED_VIDEO_PRICE, SESSION_PRICE } from "@/lib/pricing-catalog";

const money = (value: number) => `$${value.toLocaleString()}`;

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
      "Commercials, demos, customer and employee stories",
      "Onboarding, safety, sales training, and SOPs",
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
    label: "Scope",
    values: [
      "Choose the number of finished social videos",
      "Choose the number of finished stories or demos",
      "Choose the number of finished training videos",
      "One 5-, 10-, or 15-minute episode",
    ],
  },
  {
    label: "Pricing Model",
    values: [
      `${money(SESSION_PRICE)}/session + ${money(FINISHED_VIDEO_PRICE)}/video`,
      `${money(SESSION_PRICE)}/session + ${money(FINISHED_VIDEO_PRICE)}/video`,
      `${money(SESSION_PRICE)}/session + ${money(FINISHED_VIDEO_PRICE)}/video`,
      `${money(EVERGREEN_LENGTH_PRICE[5])} / ${money(EVERGREEN_LENGTH_PRICE[10])} / ${money(EVERGREEN_LENGTH_PRICE[15])}`,
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
      eyebrow="Compare packages"
      title="Four goals. Four Pal lanes."
      subtitle="Choose the job your video needs to do, then adjust the package scope."
    >
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-soft">
          <p className="font-display text-lg font-bold">Production session</p>
          <p className="text-brand mt-1 font-display text-2xl font-extrabold">
            {money(SESSION_PRICE)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Filming, planning, and on-set direction
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-soft">
          <p className="font-display text-lg font-bold">Finished video</p>
          <p className="text-brand mt-1 font-display text-2xl font-extrabold">
            {money(FINISHED_VIDEO_PRICE)} / video
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-soft">
          <p className="font-display text-lg font-bold">Evergreen episodes</p>
          <p className="text-brand mt-1 font-display text-2xl font-extrabold">
            {money(EVERGREEN_LENGTH_PRICE[5])} / {money(EVERGREEN_LENGTH_PRICE[10])} /{" "}
            {money(EVERGREEN_LENGTH_PRICE[15])}
          </p>
        </div>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <caption className="sr-only">
            Comparison of the Reel, Spotlight, System, and Evergreen package lanes by goal, best
            fit, style, scope, pricing, impact, speed, and compounding value.
          </caption>
          <thead>
            <tr className="border-b border-border">
              <th
                scope="col"
                className="p-4 font-display text-xs font-bold uppercase tracking-wide text-muted-foreground"
              >
                Category
              </th>
              {LANES.map((lane) => (
                <th key={lane.name} scope="col" className="p-4 font-display text-sm font-bold">
                  {lane.name}
                  <span className="block text-xs font-normal text-muted-foreground">
                    ({lane.tag})
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label} className="border-b border-border last:border-0">
                <th scope="row" className="p-4 align-top font-semibold">
                  {row.label}
                </th>
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
        Choose Reel if your problem is visibility. Choose Spotlight if your problem is perception.
        Choose System if your problem is internal chaos. Choose Evergreen if your problem is
        long-term authority.
      </p>
    </Section>
  );
}
