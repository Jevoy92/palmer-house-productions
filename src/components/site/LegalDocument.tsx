import { Link } from "@tanstack/react-router";
import { CtaBand, PageHero, PageShell } from "./PageShell";
import { laneVar } from "@/lib/pal-lanes";

export type LegalSection = { title: string; body: string[] };

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * LegalDocument — the shared, deliberately quiet layout for Privacy and Terms.
 * Lane-tinted container, a comfortable reading measure, a sticky table of
 * contents on large screens, and no decorative motion inside the text.
 */
export function LegalDocument({
  eyebrow = "Palmer House · legal",
  title,
  subtitle,
  lastUpdated,
  related,
  sections,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  related: { label: string; to: string };
  sections: LegalSection[];
}) {
  const lane = "system" as const;
  return (
    <PageShell>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        lane={lane}
        pal="samira"
        palTags={["Plain language", `Updated ${lastUpdated}`]}
        ctas={false}
      />

      <section className="px-4 py-12 sm:py-16" style={{ background: laneVar(lane, "-soft") }}>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start">
          <nav
            aria-label="On this page"
            className="rounded-[1.5rem] border border-white/80 bg-white/70 p-5 lg:sticky lg:top-28"
          >
            <p
              className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{ color: laneVar(lane, "-text") }}
            >
              Last updated · {lastUpdated}
            </p>
            <ol className="mt-4 space-y-1.5 text-sm">
              {sections.map((section, index) => (
                <li key={section.title}>
                  <a
                    href={`#${slugify(section.title)}`}
                    className="flex min-h-11 items-start gap-2 rounded-md text-muted-foreground underline-offset-4 hover:text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-system"
                  >
                    <span
                      className="mt-0.5 font-mono text-[10px] font-bold"
                      style={{ color: laneVar(lane, "-text") }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
            <Link
              to={related.to}
              className="mt-5 inline-flex min-h-11 items-center text-sm font-bold underline decoration-system/30 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-system"
              style={{ color: laneVar(lane, "-text") }}
            >
              {related.label}
            </Link>
          </nav>

          <article className="max-w-3xl rounded-[2rem] border border-white/80 bg-white p-6 shadow-soft sm:p-10">
            <div className="space-y-12">
              {sections.map((section, index) => (
                <section
                  key={section.title}
                  id={slugify(section.title)}
                  className={`scroll-mt-28 ${index === 0 ? "" : "border-t border-border pt-12"}`}
                >
                  <h2 className="text-2xl font-bold tracking-[-.025em] text-ink">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-5">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base leading-8 text-muted-foreground sm:text-[17px]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>

      <CtaBand
        title="Questions about how we work?"
        subtitle="Most policy questions are answered fastest with a short conversation."
        primaryLabel="Contact Us"
        primaryTo="/contact"
        secondaryLabel={related.label}
        secondaryTo={related.to}
        lane={lane}
        crew={false}
      />
    </PageShell>
  );
}
