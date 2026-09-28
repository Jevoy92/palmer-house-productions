import { FaqList, Section } from "@/components/site/PageShell";
import { HOME_FAQS } from "@/data/site-faqs";

export function Faq() {
  return (
    <Section
      tone="mist"
      eyebrow="Questions, answered"
      lane="system"
      title="A few practical answers."
      subtitle="Choose the right help and understand what happens next."
    >
      <FaqList items={HOME_FAQS} lane="system" pal="samira" />
    </Section>
  );
}
