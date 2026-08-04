import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Palmer House Productions" },
      {
        name: "description",
        content:
          "The terms and conditions governing your use of Palmer House Productions' services.",
      },
      { property: "og:title", content: "Terms of Service | Palmer House Productions" },
      {
        property: "og:description",
        content:
          "Please read these terms carefully before using Palmer House Productions services.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By accessing and using Palmer House Productions services, you accept and agree to be bound by the terms and provision of this agreement.",
  },
  {
    title: "Services",
    body: "Palmer House Productions provides video production services, coaching, and digital downloads. We reserve the right to modify or discontinue services at any time.",
  },
  {
    title: "Payment Terms",
    body: "Payment terms will be outlined in individual service agreements. All fees are non-refundable unless otherwise specified in writing.",
  },
  {
    title: "Intellectual Property",
    body: "All content, materials, and intellectual property created by Palmer House Productions remain the property of Palmer House Productions until full payment is received, at which point ownership transfers to the client as outlined in the service agreement.",
  },
  {
    title: "Limitation of Liability",
    body: "Palmer House Productions shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to the use of our services.",
  },
  {
    title: "Governing Law",
    body: "These terms shall be governed by and construed in accordance with the laws of the State of Washington, without regard to its conflict of law provisions.",
  },
  {
    title: "Changes to Terms",
    body: "We reserve the right to update these terms at any time. Changes will be posted on this page and will take effect immediately upon posting. Your continued use of our services constitutes acceptance of any changes.",
  },
  {
    title: "Contact Information",
    body: "For questions about these terms, please contact us at info@palmerhouseproductions.com.",
  },
];

function TermsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title="Terms of"
        highlight="Service"
        subtitle="Please read these terms carefully before using our services."
        ctas={false}
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-xl font-bold">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
