import { createFileRoute } from "@tanstack/react-router";
import { Check, CircleDashed } from "lucide-react";
import { Card, CardGrid, CtaBand, PageHero, PageShell, Section } from "@/components/site/PageShell";
import { PalCallout } from "@/components/site/PalVisuals";
import type { GlyphName } from "@/components/site/Glyphs";

function IntegrationsPage() {
  const connections: { name: string; ready: boolean; detail: string; glyph: GlyphName }[] = [
    {
      name: "Stripe Checkout",
      ready: false,
      glyph: "cart",
      detail:
        "Production deposits, Studio subscriptions, billing portal, and signed webhook handling are built. Connect the three server secrets listed in .env.example.",
    },
    {
      name: "Supabase Studio backend",
      ready: true,
      glyph: "layers",
      detail:
        "Authentication, private workspaces, profiles, roles, subscriptions, brand memory, campaigns, assets, calendars, usage metering, service requests, and private storage are deployed.",
    },
    {
      name: "OpenAI campaign engine",
      ready: false,
      glyph: "spark",
      detail:
        "The encrypted key is saved and the structured campaign runtime is built. The selected OpenAI organization needs API credits before live generation can succeed.",
    },
    {
      name: "HoneyBook",
      ready: Boolean(import.meta.env.VITE_HONEYBOOK_LEAD_FORM_URL),
      glyph: "calendar",
      detail:
        "Quote context and totals pass into the configured lead form or fall back to the contact flow.",
    },
    {
      name: "ClickUp intake",
      ready: Boolean(import.meta.env.VITE_CLICKUP_INTAKE_URL),
      glyph: "workflow",
      detail:
        "Add the public intake-form URL to hand confirmed clients into the production workspace.",
    },
    {
      name: "Contact CRM",
      ready: Boolean(import.meta.env.VITE_CONTACT_FORM_ENDPOINT),
      glyph: "chat",
      detail:
        "The contact form can POST to a secure endpoint; email-draft fallback remains available.",
    },
  ];
  const readyCount = connections.filter((c) => c.ready).length;
  return (
    <PageShell>
      <PageHero
        eyebrow="Connection desk · intentionally unlisted"
        title="No green dot without"
        highlight="a real connection."
        subtitle="The customer-facing flows are built. This page makes the remaining vendor credentials explicit so the site never pretends a form, payment, or automation succeeded."
        lane="system"
        pal="silas"
        palTags={[`${readyCount} of ${connections.length} connected`, "Honest fallbacks"]}
        primary={{ label: "Test checkout", to: "/checkout" }}
        secondary={{ label: "Contact flow", to: "/contact" }}
      />

      <Section
        eyebrow="Vendor connections"
        title="Every integration, with its real status."
        subtitle="Connected means the credential is present in this environment. Anything else falls back to an honest manual path."
        lane="system"
      >
        <CardGrid cols={3}>
          {connections.map((item) => (
            <Card
              key={item.name}
              lane={item.ready ? "evergreen" : "system"}
              glyph={item.glyph}
              title={item.name}
              body={item.detail}
            >
              <span
                className={`relative mt-5 inline-flex min-h-8 w-fit items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] ${
                  item.ready
                    ? "bg-evergreen-soft text-evergreen-text"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {item.ready ? (
                  <Check className="size-3.5" />
                ) : (
                  <CircleDashed className="size-3.5" />
                )}
                {item.ready ? "Connected" : "Needs credential"}
              </span>
            </Card>
          ))}
        </CardGrid>
        <div className="mt-10">
          <PalCallout
            pal="silas"
            quote="Think in systems: one anchor, many outputs. A connection either works end to end or the customer gets a clear fallback — nothing in between."
            action={{ label: "Test checkout", to: "/checkout" }}
          />
        </div>
      </Section>

      <CtaBand
        title="Customer paths still have an honest fallback."
        subtitle="Quotes open a prefilled contact handoff until the vendor connection is live."
        primaryLabel="Test checkout"
        primaryTo="/checkout"
        secondaryLabel="Open contact flow"
        secondaryTo="/contact"
        lane="system"
        crew={false}
      />
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
