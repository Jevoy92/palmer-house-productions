import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  ChevronDown,
  Clock3,
  Minus,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { studioAdvisoryOffer, studioConsultingOffer, studioPlans } from "@/lib/studio-model";

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
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-system">
            Studio membership
          </p>
          <h1 className="mx-auto mt-5 max-w-[12ch] text-5xl font-extrabold leading-[.92] tracking-[-.065em] sm:text-7xl">
            Choose the amount of guidance you want beside the tools.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Every plan includes the connected Studio. Guided plans add private Palmer House time so
            curiosity never turns into a week of guessing.
          </p>
          <div
            className="mx-auto mt-8 inline-flex rounded-2xl bg-cream p-1"
            role="radiogroup"
            aria-label="Billing frequency"
          >
            {(["month", "year"] as const).map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={interval === value}
                onClick={() => setInterval(value)}
                className={`min-h-12 rounded-xl px-5 text-sm font-black transition ${interval === value ? "bg-white shadow-sm" : "text-muted-foreground"}`}
              >
                {value === "month" ? "Pay monthly" : "Pay annually · save 17%"}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const displayed = interval === "year" ? Math.round(plan.annualPrice / 12) : plan.price;
            const colors = [
              ["var(--system-soft)", "var(--system)"],
              ["var(--spotlight-soft)", "var(--spotlight)"],
              ["var(--reel-soft)", "var(--reel)"],
            ][index];
            return (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-[2rem] border bg-white p-7 ${index === 1 ? "border-spotlight shadow-[0_24px_70px_-44px_rgba(61,26,102,.65)]" : "border-border"}`}
              >
                {index === 1 ? (
                  <span className="absolute right-5 top-5 rounded-full bg-spotlight px-3 py-1 font-mono text-[8px] font-bold uppercase tracking-[.12em] text-white">
                    Best balance
                  </span>
                ) : null}
                <span
                  className="grid size-12 place-items-center rounded-2xl"
                  style={{ background: colors[0], color: colors[1] }}
                >
                  {index === 0 ? (
                    <Sparkles className="size-5" />
                  ) : index === 1 ? (
                    <Clock3 className="size-5" />
                  ) : (
                    <CalendarCheck className="size-5" />
                  )}
                </span>
                <p className="mt-6 font-mono text-[9px] uppercase tracking-[.17em] text-muted-foreground">
                  {plan.name}
                </p>
                <p className="mt-4 text-5xl font-extrabold">
                  ${displayed}
                  <span className="text-sm text-muted-foreground"> / month</span>
                </p>
                {interval === "year" ? (
                  <p className="mt-1 text-xs font-bold text-evergreen">
                    ${plan.annualPrice.toLocaleString()} billed annually
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Cancel before the next monthly renewal
                  </p>
                )}
                <p className="mt-4 min-h-20 text-sm leading-relaxed text-muted-foreground">
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
                    <li key={feature} className="flex gap-3 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-evergreen" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/studio/billing" className="primary-action mt-8 w-full">
                  Choose {plan.name} <ArrowRight className="size-4" />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-16 max-w-6xl overflow-x-auto rounded-[2rem] border border-border bg-white">
          <table className="w-full min-w-[52rem] text-left">
            <thead>
              <tr className="border-b border-border bg-cream">
                <th className="p-5 text-sm">What is included</th>
                {plans.map((plan) => (
                  <th key={plan.name} className="p-5 text-sm">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, ...values]) => (
                <tr key={String(label)} className="border-b border-border last:border-0">
                  <th className="p-5 text-sm font-medium">{label}</th>
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

        <section className="mx-auto mt-10 grid max-w-6xl gap-5 rounded-[2rem] bg-system-soft p-7 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.17em] text-system">
              One focused decision
            </p>
            <h2 className="mt-3 text-3xl font-black">{studioConsultingOffer.name}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {studioConsultingOffer.description}
            </p>
            <p className="mt-4 text-sm font-black">
              ${studioConsultingOffer.price} · {studioConsultingOffer.duration} minutes ·{" "}
              {studioConsultingOffer.includedDays} days of {studioConsultingOffer.includedPlan}{" "}
              included
            </p>
          </div>
          <Link to="/contact" className="primary-action whitespace-nowrap">
            Book the intensive <ArrowRight className="size-4" />
          </Link>
        </section>

        <section className="mx-auto mt-5 grid max-w-6xl gap-8 rounded-[2rem] bg-spotlight p-7 text-white sm:p-9 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.17em] text-white/60">
              High-touch advisory
            </p>
            <h2 className="mt-3 max-w-[13ch] text-4xl font-black leading-[.95] tracking-[-.05em]">
              {studioAdvisoryOffer.name}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75">
              {studioAdvisoryOffer.description}
            </p>
            <p className="mt-5 text-3xl font-black">
              ${studioAdvisoryOffer.price.toLocaleString()}{" "}
              <span className="text-xs text-white/60">· application only</span>
            </p>
          </div>
          <div>
            <ul className="space-y-3 text-sm">
              {studioAdvisoryOffer.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-white" /> {feature}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-5 text-sm font-black text-spotlight"
            >
              Explore the partnership <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-3xl">
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-reel">
              Before you choose
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-[-.045em] sm:text-5xl">
              The useful fine print.
            </h2>
          </div>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {faqs.map((item, index) => (
              <article key={item.q}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  aria-expanded={openFaq === index}
                  className="flex min-h-20 w-full items-center justify-between gap-5 py-4 text-left"
                >
                  <span className="font-black">{item.q}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 transition ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === index ? (
                  <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute("/membership/pricing")({
  head: () => ({
    meta: [
      { title: "Studio Membership Pricing — Palmer House" },
      {
        name: "description",
        content:
          "Compare Palmer House Studio plans with software, private strategy time, member support, and annual savings.",
      },
    ],
  }),
  component: PricingPage,
});
