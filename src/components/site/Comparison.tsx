import { Check, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/site/PageShell";
import { PalCallout } from "@/components/site/PalVisuals";
import { GlyphBadge, type GlyphName } from "@/components/site/Glyphs";
import type { PalAccent } from "@/lib/pricing-catalog";

const cols = ["Palmer House", "Freelancer", "In-house DIY", "Stock footage"];
const rows: Array<{ label: string; glyph: GlyphName; lane: PalAccent; values: boolean[] }> = [
  {
    label: "Cinematic production quality",
    glyph: "camera",
    lane: "spotlight",
    values: [true, true, false, true],
  },
  {
    label: "Strategy before the camera rolls",
    glyph: "bulb",
    lane: "evergreen",
    values: [true, false, false, false],
  },
  {
    label: "Multi-format library from one shoot",
    glyph: "layers",
    lane: "reel",
    values: [true, false, false, false],
  },
  {
    label: "Reliable turnaround and communication",
    glyph: "clock",
    lane: "system",
    values: [true, false, true, false],
  },
  {
    label: "Built around your business goals",
    glyph: "chart",
    lane: "spotlight",
    values: [true, false, true, false],
  },
];

function Mark({ ok, hero }: { ok: boolean; hero: boolean }) {
  if (ok) {
    return (
      <span
        className={`mx-auto grid size-8 place-items-center rounded-full ${
          hero ? "bg-ink text-white" : "bg-evergreen-soft text-evergreen-text"
        }`}
        role="img"
        aria-label="Included"
      >
        <Check className="size-4" strokeWidth={3} />
      </span>
    );
  }
  return (
    <span
      className="mx-auto grid size-8 place-items-center rounded-full bg-secondary text-muted-foreground/60"
      role="img"
      aria-label="Not included"
    >
      <X className="size-3.5" strokeWidth={2.5} />
    </span>
  );
}

export function Comparison() {
  const reduce = useReducedMotion();
  return (
    <Section
      id="pricing"
      tone="mist"
      eyebrow="One team to do it all"
      title="One partner for strategy, production, and delivery."
      subtitle="Compare what a Pal-guided production includes against the usual alternatives."
    >
      <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
        <div>
          <p id="comparison-scroll-hint" className="mb-2 text-xs text-muted-foreground lg:hidden">
            Swipe or scroll sideways to compare all four options.
          </p>
          <div
            role="region"
            aria-label="Production approach comparison"
            aria-describedby="comparison-scroll-hint"
            tabIndex={0}
            className="surface-card overflow-x-auto p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotlight/40 sm:p-4"
          >
            <table className="w-full min-w-[600px] border-collapse text-left">
              <caption className="sr-only">
                What each production option includes, compared with a Pal-guided session.
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[38%] p-4">
                    <span className="sr-only">What's included</span>
                  </th>
                  {cols.map((c, i) => (
                    <th key={c} scope="col" className="p-4 text-center text-sm font-semibold">
                      {i === 0 ? (
                        <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-ink px-3.5 py-1.5 text-white">
                          {c}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">{c}</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <motion.tr
                    key={r.label}
                    className="border-t border-border"
                    initial={reduce ? false : { opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                  >
                    <th scope="row" className="p-4 text-left font-semibold">
                      <span className="flex items-center gap-3 text-sm">
                        <GlyphBadge name={r.glyph} lane={r.lane} size="sm" />
                        {r.label}
                      </span>
                    </th>
                    {r.values.map((v, j) => (
                      <td
                        key={j}
                        className={`p-4 text-center ${j === 0 ? "bg-spotlight-soft/60" : ""}`}
                      >
                        <Mark ok={v} hero={j === 0} />
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <PalCallout
          pal="kareem"
          label="Kareem, Spotlight Pal"
          quote="A freelancer can shoot beautifully. What they usually can't do is plan the shoot so one day becomes a month of publishing — that's the part we build in first."
          action={{ label: "See what a session includes", to: "/production-pricing" }}
        />
      </div>
    </Section>
  );
}
