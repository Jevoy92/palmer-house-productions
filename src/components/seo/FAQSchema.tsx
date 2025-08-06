import { useEffect } from 'react';

interface FAQSchemaProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const FAQSchema = ({ faqs }: FAQSchemaProps) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    script.id = 'faq-schema';
    
    // Remove existing schema if it exists
    const existingSchema = document.getElementById('faq-schema');
    if (existingSchema) {
      existingSchema.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const schemaScript = document.getElementById('faq-schema');
      if (schemaScript) {
        schemaScript.remove();
      }
    };
  }, [faqs]);

  return null;
};