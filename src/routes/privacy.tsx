import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/site/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Palmer House Productions" },
      {
        name: "description",
        content:
          "Learn how Palmer House Productions collects, uses, and protects your information when you work with us.",
      },
      { property: "og:title", content: "Privacy Policy | Palmer House Productions" },
      {
        property: "og:description",
        content:
          "How Palmer House Productions collects, uses, and safeguards your personal information.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly to us, such as when you contact us through our website, book a discovery call, or engage with our services.",
  },
  {
    title: "How We Use Your Information",
    body: "We use the information we collect to provide, maintain, and improve our services, communicate with you, and respond to your requests and inquiries.",
  },
  {
    title: "Information Sharing",
    body: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.",
  },
  {
    title: "Data Security",
    body: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.",
  },
  {
    title: "Data Retention",
    body: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your personal information, we will securely delete or anonymize it.",
  },
  {
    title: "Your Rights",
    body: "You have the right to access, update, or delete your personal information. You may also opt out of receiving marketing communications from us at any time. To exercise these rights, please contact us using the information provided below.",
  },
  {
    title: "Children's Privacy",
    body: "Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information from our records.",
  },
  {
    title: "Changes to This Policy",
    body: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our services after any changes constitutes your acceptance of the new Privacy Policy.',
  },
  {
    title: "Contact Us",
    body: "If you have any questions about this Privacy Policy, please contact us at info@palmerhouseproductions.com.",
  },
];

function PrivacyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        highlight="Policy"
        subtitle="Your privacy matters to us. Learn how we collect, use, and protect your information when you work with Palmer House Productions."
        ctas={false}
      />
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-muted-foreground">
            Last Updated: January 2024 | This policy explains how Palmer House Productions collects,
            uses, and safeguards your personal information when you use our video production
            services, visit our website, or interact with our team.
          </p>
          <div className="mt-10 space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-xl font-bold">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
