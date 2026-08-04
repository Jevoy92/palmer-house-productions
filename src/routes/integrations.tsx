import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, CircleDashed } from "lucide-react";
import { PageShell } from "@/components/site/PageShell";

function IntegrationsPage() {
  const connections = [
    {
      name: "Stripe Checkout",
      ready: false,
      detail:
        "Production deposits, Studio subscriptions, billing portal, and signed webhook handling are built. Connect the three server secrets listed in .env.example.",
    },
    {
      name: "Supabase Studio backend",
      ready: true,
      detail:
        "Authentication, private workspaces, profiles, roles, subscriptions, brand memory, campaigns, assets, calendars, usage metering, service requests, and private storage are deployed.",
    },
    {
      name: "OpenAI campaign engine",
      ready: false,
      detail:
        "The encrypted key is saved and the structured campaign runtime is built. The selected OpenAI organization needs API credits before live generation can succeed.",
    },
    {
      name: "HoneyBook",
      ready: Boolean(import.meta.env.VITE_HONEYBOOK_LEAD_FORM_URL),
      detail:
        "Quote context and totals pass into the configured lead form or fall back to the contact flow.",
    },
    {
      name: "ClickUp intake",
      ready: Boolean(import.meta.env.VITE_CLICKUP_INTAKE_URL),
      detail:
        "Add the public intake-form URL to hand confirmed clients into the production workspace.",
    },
    {
      name: "Contact CRM",
      ready: Boolean(import.meta.env.VITE_CONTACT_FORM_ENDPOINT),
      detail:
        "The contact form can POST to a secure endpoint; email-draft fallback remains available.",
    },
  ];
  return (
    <PageShell>
      <section className="px-4 pb-20 pt-14">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Connection desk · intentionally unlisted
          </p>
          <h1 className="mt-4 max-w-[12ch] text-5xl font-extrabold leading-[0.95] sm:text-7xl">
            No green dot without a real connection.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            The customer-facing flows are built. This page makes the remaining vendor credentials
            explicit so the site never pretends a form, payment, or automation succeeded.
          </p>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {connections.map((item) => (
              <article key={item.name} className="grid gap-4 py-6 sm:grid-cols-[12rem_1fr_auto]">
                <div className="flex items-center gap-2 font-semibold">
                  {item.ready ? (
                    <Check className="size-5 text-evergreen" />
                  ) : (
                    <CircleDashed className="size-5 text-muted-foreground" />
                  )}
                  {item.name}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                <span
                  className={`h-fit rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] ${item.ready ? "bg-evergreen-soft text-evergreen" : "bg-secondary text-muted-foreground"}`}
                >
                  {item.ready ? "Connected" : "Needs credential"}
                </span>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-[2rem] bg-ink p-6 text-white sm:flex sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Customer paths still have an honest fallback.</h2>
              <p className="mt-2 text-sm text-white/60">
                Quotes open a prefilled contact handoff until the vendor connection is live.
              </p>
            </div>
            <Link
              to="/checkout"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink sm:mt-0"
            >
              Test checkout <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Integration Readiness | Palmer House Productions" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: IntegrationsPage,
});
