import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Minus } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";
import { studioPlans } from "@/lib/studio-model";

const rows = [
  ["Complete campaigns / month", "2", "5", "12"],
  ["Brand Studio", true, true, true],
  ["Scripts + written assets", true, true, true],
  ["Production plans", true, true, true],
  ["Content calendar", true, true, true],
  ["Private brand uploads", true, true, true],
  ["Shared team workspace", false, true, true],
  ["Website content analysis", false, true, true],
  ["Monthly strategy session", false, false, true],
  ["Priority production support", false, false, true],
];

function PricingPage() {
  const plans = Object.values(studioPlans);
  return (
    <PageShell>
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-system">
            Studio membership
          </p>
          <h1 className="mx-auto mt-5 max-w-[11ch] text-5xl font-extrabold leading-[.92] tracking-[-.065em] sm:text-7xl">
            Pay for momentum, not mystery credits.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            A campaign is a complete body of useful work. Every plan includes the whole Studio;
            higher tiers add volume, collaboration, and Palmer House access.
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-6xl gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              key={plan.name}
              className={`rounded-[2rem] border p-7 ${index === 1 ? "border-ink bg-ink text-white" : "bg-white"}`}
            >
              <p className="font-mono text-[9px] uppercase tracking-[.17em] opacity-55">
                {plan.name}
              </p>
              <p className="mt-6 text-5xl font-extrabold">
                ${plan.price}
                <span className="text-sm opacity-55"> / month</span>
              </p>
              <p className="mt-4 min-h-14 text-sm leading-relaxed opacity-65">{plan.audience}</p>
              <p
                className={`mt-6 rounded-2xl p-4 text-sm font-bold ${index === 1 ? "bg-white/10" : "bg-secondary"}`}
              >
                {plan.campaigns} complete campaigns
              </p>
              <Link
                to="/studio"
                className={`mt-7 flex min-h-13 items-center justify-center rounded-2xl font-semibold ${index === 1 ? "bg-white text-ink" : "bg-ink text-white"}`}
              >
                Start free <ArrowRight className="ml-2 size-4" />
              </Link>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-16 max-w-6xl overflow-x-auto rounded-[2rem] border border-border bg-white">
          <table className="w-full min-w-[46rem] text-left">
            <thead>
              <tr className="border-b border-border">
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
                    <td key={`${label}-${index}`} className="p-5">
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
        <div className="mx-auto mt-10 max-w-3xl rounded-[2rem] bg-system-soft p-7 text-center">
          <h2 className="text-2xl font-bold">Production stays honest and separate.</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Membership covers the software and included strategy access. Filming, editing, travel,
            and custom production are scoped from the campaign when you need them.
          </p>
          <Link to="/studio" className="primary-action mt-6">
            Start the seven-day sprint
          </Link>
        </div>
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
          "Compare Palmer House Studio plans for complete campaigns, team workspaces, strategy access, and production support.",
      },
    ],
  }),
  component: PricingPage,
});
