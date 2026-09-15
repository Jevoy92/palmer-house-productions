import { FaqList, Section } from "@/components/site/PageShell";
import { HOME_FAQS } from "@/data/site-faqs";

export function Faq() {
  return (
    <Section
      tone="mist"
      eyebrow="Questions, answered"
      lane="system"
      title="FAQ"
      subtitle="The things people ask before their first session. Samira keeps the answers current."
    >
      <FaqList items={HOME_FAQS} lane="system" pal="samira" />
    </Section>
  );
}
