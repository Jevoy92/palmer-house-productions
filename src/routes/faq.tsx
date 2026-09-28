import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, FaqList, PageHero, PageShell, Section } from "@/components/site/PageShell";
import { HOME_FAQS } from "@/data/site-faqs";
import { createSeo, faqSchema, jsonLdScript, schemaGraph } from "@/lib/seo";
const productionQuestions = [
  {
    q: "What video packages can I choose from?",
    a: "Social Content, Commercials, Product Demos, Customer Stories, Employee Spotlights, Onboarding, Safety Training, Sales Training, Video SOPs, and Educational Videos. Each package has an example, an adjustable scope, and a working estimate.",
  },
  {
    q: "What is included in a filming session?",
    a: "A two-hour on-location session, pre-shoot planning, on-set direction, professional lighting, and audio. Editing, color, and sound are included in the finished-video price. We confirm the number of sessions and deliverables together.",
  },
  {
    q: "Are the example videos real client work?",
    a: "Package examples marked AI concept are fictional illustrations of the kind of video you could make. Visit Our work to see Palmer House portfolio examples. Your project is planned around your own people, business, and message.",
  },
  {
    q: "Does submitting a plan book the shoot or charge my card?",
    a: "No. A production plan is a request to confirm scope. We review the details, timing, tax, and travel with you before payment. If the site opens an email draft, you still need to send that email.",
  },
  {
    q: "When will I receive my videos?",
    a: "The package pages show typical delivery guidance. Your quote confirms the schedule, which depends on scope, filming availability, and your review turnaround.",
  },
  {
    q: "Who owns the finished content?",
    a: "Once the project is paid in full, you own the final video content under the agreed project terms. Tell us before the shoot if you need additional file formats or specific source materials, so they are included in your scope.",
  },
  {
    q: "Can you edit footage we already have?",
    a: "Yes. Our editing service can help with existing footage. Share the source material, what you want to make, and your delivery requirements so we can confirm the scope.",
  },
  {
    q: "Will you host our training videos or track their performance?",
    a: "Hosting and reporting are not automatic inclusions in a production package. Tell us about your existing platform and any access or reporting requirements when we plan the project.",
  },
];
const studioQuestions = [
  {
    q: "Are the Pals people or AI assistants?",
    a: "The Pals are creative characters and AI assistants in Studio, each with a distinct conversational style. They share workspace context and tools. The Palmer House team provides human strategy, filming, editing, and preparation support.",
  },
  {
    q: "How do Studio credits work?",
    a: "Plans include monthly credits, and different AI actions use different amounts. Studio shows the cost before you generate and lets you buy more credits when needed. See Studio pricing for current plans and allowances.",
  },
  {
    q: "Can I switch Pals without starting over?",
    a: "Yes. Pals share your workspace’s brand context, content, and saved memory. Their personalities differ, but any Pal can help with the same creative tools. You can review and manage saved memory in Studio.",
  },
  {
    q: "Does buying a DIY download deliver it instantly?",
    a: "DIY PDF purchases are currently fulfilled by the Palmer House team. After payment, use your order reference to request access. The product and checkout pages explain this before you pay.",
  },
];
const groups = [
  { title: "Choosing the right help", items: HOME_FAQS },
  { title: "Production, scope & delivery", items: productionQuestions },
  { title: "Studio, Pals & resources", items: studioQuestions },
];
function FaqPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Questions, answered"
        title="Get clear on"
        highlight="the next step."
        subtitle="The practical details about working with our team, using Studio, and choosing the right amount of help."
        primary={{ label: "Compare your options", to: "/pricing" }}
        secondary={{ label: "Ask the team", to: "/contact" }}
      />
      {groups.map((group) => (
        <Section key={group.title} title={group.title} align="left">
          <FaqList items={group.items} />
        </Section>
      ))}
      <CtaBand
        title="Still working out what you need?"
        subtitle="Tell us what you want the work to do. We can help you choose a starting point."
        primaryLabel="Talk to the team"
        primaryTo="/contact"
        secondaryLabel="Browse packages"
        secondaryTo="/shop"
        crew={false}
      />
    </PageShell>
  );
}
export const Route = createFileRoute("/faq")({
  head: () => ({
    ...createSeo({
      title: "Questions About Production & Studio | Palmer House",
      description:
        "Clear answers about Palmer House production packages, pricing, planning support, AI Pals, Studio credits, and delivery.",
      pathname: "/faq",
    }),
    scripts: [jsonLdScript(schemaGraph(faqSchema(groups.flatMap((g) => g.items))))],
  }),
  component: FaqPage,
});
