import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronDown, Minus } from "lucide-react";
import { useState } from "react";
import { Eyebrow, InView, PageShell } from "@/components/site/PageShell";
import { PalCallout, PalFigure, StatBand } from "@/components/site/PalVisuals";
import { GlyphBadge, type GlyphName } from "@/components/site/Glyphs";
import { laneVar } from "@/lib/pal-lanes";
import type { PalAccent } from "@/lib/pricing-catalog";
import { studioAdvisoryOffer, studioConsultingOffer, studioPlans } from "@/lib/studio-model";
import { createSeo, faqSchema, jsonLdScript, schemaGraph } from "@/lib/seo";

const BILLING_INTERVALS = ["month", "year"] as const;
const PLAN_LANES: PalAccent[] = ["system", "spotlight", "reel"];
const PLAN_GLYPHS: GlyphName[] = ["spark", "clock", "calendar"];

const rows = [
  ["Complete campaigns / month", "2", "5", "12"],
  ["Brand DNA + Pal guidance", true, true, true],
  ["Personalized video roadmap", true, true, true],
  ["Scripts, platform posts + production plans", true, true, true],
  ["Content calendar + private library", true, true, true],
  ["Palmer House help desk", true, true, true],
  ["Private Palmer House strategy time", false, "1 hour / month", "1 hour / week"],
  ["Project review priority", false, "Guided", "Priority"],
  ["Preferred production pricing", false, true, true],
  ["MINDYOURBIZNIZ guest request", "Every 6 months", "Every 6 months", "Every 6 months"],
] as const;

const faqs = [
  {
    q: "Is Palmer House time really included?",
    a: "Yes. Guided includes one private 60-minute session each billing month. Partner keeps one 60-minute working session available each week. Use Member Success to choose the focus and request a time without starting a new intake.",
  },
  {
    q: "What happens to unused sessions?",
    a: "Included sessions reset each billing period and do not roll over. That keeps the calendar available and encourages a useful working rhythm.",
  },
  {
    q: "What does annual billing save?",
    a: "You receive twelve months for the price of ten—a 17% savings. The full annual amount is charged at the start of the period.",
  },
  {
    q: "Does membership include filming and editing?",
    a: "The Studio and the listed strategy time are included. Filming, editing, travel, and custom production are scoped separately, with preferred production pricing on Guided and Partner.",
  },
  {
    q: "Can I just book one consulting session?",
    a: `Yes. The ${studioConsultingOffer.name} is a focused ${studioConsultingOffer.duration}-minute working session for $${studioConsultingOffer.price} and includes ${studioConsultingOffer.includedDays} days of ${studioConsultingOffer.includedPlan}.`,
  },
];

function PricingPage() {
  const [interval, setInterval] = useState<"month" | "year">("year");
  const [openFaq, setOpenFaq] = useState(0);
  const plans = Object.values(studioPlans);

  return (
    <PageShell>
      <section className="relative isolate px-4 py-14 sm:py-20">
        <div className="pointer-events-none absolute inset-x-4 top-0 -z-10 mx-auto h-[34rem] max-w-7xl overflow-hidden rounded-[2.5rem] bg-mist sm:rounded-[3.5rem]">
          <span
            aria-hidden
            className="absolute -right-16 -top-20 size-64 rounded-full bg-system-soft sm:size-80"
          />
          <span
            aria-hidden
            className="absolute -bottom-28 -left-16 size-72 rounded-full bg-spotlight-soft sm:size-96"
          />
        </div>
        <div className="mx-auto max-w-6xl pt-6 text-center">
          <Eyebrow lane="system">Palmer House Studio membership</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-[12ch] text-4xl font-extrabold leading-[.96] tracking-[-.055em] sm:text-7xl sm:leading-[.92]">
            Choose the amount of guidance you want{" "}
            <span className="text-system-text">beside the tools.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Every plan includes the connected Studio. Guided plans add private Palmer House time so
            curiosity never turns into a week of guessing.
          </p>
          <div
            className="mx-auto mt-8 grid w-full max-w-md grid-cols-2 rounded-2xl bg-white p-1 shadow-soft"
            role="radiogroup"
            aria-label="Billing frequency"
          >
            {BILLING_INTERVALS.map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={interval === value}
                tabIndex={interval === value ? 0 : -1}
                onClick={() => setInterval(value)}
                onKeyDown={(event) => {
                  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                  event.preventDefault();
                  const currentIndex = BILLING_INTERVALS.indexOf(value);
                  const nextIndex =
                    event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? BILLING_INTERVALS.length - 1
                        : (currentIndex +
                            (event.key === "ArrowRight" ? 1 : -1) +
                            BILLING_INTERVALS.length) %
                          BILLING_INTERVALS.length;
                  setInterval(BILLING_INTERVALS[nextIndex]);
                  event.currentTarget.parentElement
                    ?.querySelectorAll<HTMLButtonElement>('[role="radio"]')
                    [nextIndex]?.focus();
                }}
                className={`rounded-xl px-3 py-3 text-sm font-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotlight sm:px-5 ${interval === value ? "bg-ink text-white shadow-sm" : "text-muted-foreground hover:text-ink"}`}
              >
                {value === "month" ? "Pay monthly" : "Pay annually · save 17%"}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const displayed = interval === "year" ? Math.round(plan.annualPrice / 12) : plan.price;
            const lane = PLAN_LANES[index];
            const colors = [laneVar(lane, "-soft"), laneVar(lane, "-text")];
            return (
              <article
                key={plan.name}
                className={`relative flex flex-col overflow-hidden rounded-[2rem] border bg-white p-7 ${index === 1 ? "border-spotlight shadow-soft" : "border-border"}`}
              >
                <span
                  aria-hidden
                  className="absolute -right-12 -top-12 size-32 rounded-full"
                  style={{ background: colors[0] }}
                />
                {index === 1 ? (
                  <span className="absolute right-5 top-5 rounded-full bg-spotlight px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[.1em] text-white">
                    Best balance
                  </span>
                ) : null}
                <GlyphBadge name={PLAN_GLYPHS[index]} lane={lane} className="relative" />
                <p className="relative mt-6 font-mono text-[11px] font-bold uppercase tracking-[.14em] text-muted-foreground">
                  {plan.name}
                </p>
                <p className="relative mt-4 text-5xl font-extrabold">
                  ${displayed}
                  <span className="text-sm text-muted-foreground"> / month</span>
                </p>
                {interval === "year" ? (
                  <p className="mt-2 text-sm font-bold text-evergreen">
                    ${plan.annualPrice.toLocaleString()} billed annually
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Cancel before the next monthly renewal
                  </p>
                )}
                <p className="mt-4 min-h-20 text-base leading-relaxed text-muted-foreground">
                  {plan.audience}
                </p>
                <div className="mt-4 rounded-2xl p-4" style={{ background: colors[0] }}>
                  <p className="text-sm font-black" style={{ color: colors[1] }}>
                    {plan.strategySessions
                      ? plan.name === "Partner"
                        ? "1 private hour with Palmer House / week"
                        : `${plan.strategySessions} private ${plan.strategySessions === 1 ? "hour" : "hours"} with Palmer House / month`
                      : "Self-guided, with the help desk when needed"}
                  </p>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-base leading-relaxed">
                      <Check className="mt-0.5 size-4 shrink-0 text-evergreen" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/studio/billing"
                  className="primary-action mt-8 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotlight focus-visible:ring-offset-2"
                >
                  Choose {plan.name} <ArrowRight className="size-4" />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <StatBand
            stats={[
              ...plans.map((plan, index) => ({
                value: plan.campaigns,
                label: `complete campaigns each month · ${plan.name}`,
                lane: PLAN_LANES[index],
              })),
              { value: 17, suffix: "%", label: "saved with annual billing", lane: "evergreen" },
            ]}
          />
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <PalCallout
            pal="samira"
            quote="Guided includes one private hour with Palmer House each billing month. Partner keeps a working session open every week. Either way, curiosity never turns into a week of guessing."
            action={{ label: "Book the Clarity Intensive instead", to: "/contact" }}
          />
        </div>

        <div className="mx-auto mt-14 max-w-6xl">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <Eyebrow lane="system">Compare every detail</Eyebrow>
            <p className="text-sm text-muted-foreground">
              Scroll sideways on smaller screens to see every plan.
            </p>
          </div>
        </div>
        <div
          className="mx-auto max-w-6xl overflow-x-auto rounded-[2rem] border border-border bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotlight focus-visible:ring-offset-2"
          role="region"
          aria-label="Palmer House Studio plan comparison"
          tabIndex={0}
        >
          <table className="w-full min-w-[52rem] text-left">
            <thead>
              <tr className="border-b border-border bg-system-soft">
                <th scope="col" className="p-5 text-sm">
                  What is included
                </th>
                {plans.map((plan, index) => (
                  <th key={plan.name} scope="col" className="p-5 text-sm">
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden
                        className="size-2.5 rounded-full"
                        style={{ background: laneVar(PLAN_LANES[index]) }}
                      />
                      {plan.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, ...values]) => (
                <tr key={String(label)} className="border-b border-border last:border-0">
                  <th scope="row" className="p-5 text-sm font-medium">
                    {label}
                  </th>
                  {values.map((value, index) => (
                    <td key={`${label}-${index}`} className="p-5 text-sm">
                      {value === true ? (
                        <Check className="size-4 text-evergreen" />
                      ) : value === false ? (
                        <Minus className="size-4 text-muted-foreground" />
                      ) : (
                        <span className="font-semibold">{value}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mx-auto mt-10 grid max-w-6xl gap-5 rounded-[2rem] bg-system-soft p-7 sm:p-9 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <GlyphBadge name="bulb" lane="system" size="lg" className="hidden lg:grid" />
          <div>
            <div className="flex items-center gap-3">
              <GlyphBadge name="bulb" lane="system" size="sm" className="lg:hidden" />
              <p className="font-mono text-[11px] font-bold uppercase tracking-[.14em] text-system">
                One focused decision
              </p>
            </div>
            <h2 className="mt-3 text-3xl font-black">{studioConsultingOffer.name}</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {studioConsultingOffer.description}
            </p>
            <p className="mt-4 text-sm font-black">
              ${studioConsultingOffer.price} · {studioConsultingOffer.duration} minutes ·{" "}
              {studioConsultingOffer.includedDays} days of {studioConsultingOffer.includedPlan}{" "}
              included
            </p>
          </div>
          <Link
            to="/contact"
            className="primary-action whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-system focus-visible:ring-offset-2"
          >
            Book the intensive <ArrowRight className="size-4" />
          </Link>
        </section>

        <section className="mx-auto mt-5 grid max-w-6xl gap-8 rounded-[2rem] bg-spotlight p-7 text-white sm:p-9 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[.14em] text-white/70">
              High-touch advisory
            </p>
            <h2 className="mt-3 max-w-[13ch] text-4xl font-black leading-[.95] tracking-[-.05em]">
              {studioAdvisoryOffer.name}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
              {studioAdvisoryOffer.description}
            </p>
            <p className="mt-5 text-3xl font-black">
              ${studioAdvisoryOffer.price.toLocaleString()}{" "}
              <span className="text-sm text-white/70">· application only</span>
            </p>
          </div>
          <div>
            <ul className="space-y-3 text-base">
              {studioAdvisoryOffer.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-white" /> {feature}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 text-sm font-black text-spotlight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-spotlight"
            >
              Explore the partnership <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-20 grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start">
          <div>
            <div className="text-center lg:text-left">
              <Eyebrow lane="reel">Before you choose</Eyebrow>
              <h2 className="mt-4 text-4xl font-black tracking-[-.045em] sm:text-5xl">
                The useful fine print.
              </h2>
            </div>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {faqs.map((item, index) => (
                <article key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                    aria-expanded={openFaq === index}
                    className="flex min-h-20 w-full items-center justify-between gap-5 rounded-lg py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotlight"
                  >
                    <span className="font-black">{item.q}</span>
                    <ChevronDown
                      className={`size-5 shrink-0 transition ${openFaq === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === index ? (
                    <p className="max-w-2xl pb-6 text-base leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
          <InView className="hidden lg:block">
            <PalFigure
              pal="silas"
              size="md"
              lane="system"
              className="min-h-[18rem]"
              caption="Fine print, explained"
            />
          </InView>
        </section>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute("/membership/pricing")({
  head: () => ({
    ...createSeo({
      title: "Studio Membership Pricing — Palmer House",
      description:
        "Compare Palmer House Studio plans with software, private strategy time, member support, and annual savings.",
      pathname: "/membership/pricing",
    }),
    scripts: [jsonLdScript(schemaGraph(faqSchema(faqs)))],
  }),
  component: PricingPage,
});
