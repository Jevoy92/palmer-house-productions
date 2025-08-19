
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const PricingFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes will take effect at the start of your next billing cycle."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, ACH transfers, and wire transfers for enterprise customers."
    },
    {
      question: "Is there a minimum contract period?",
      answer: "Monthly plans require a 3-month minimum commitment. One-off projects have no minimum term."
    },
    {
      question: "What happens if I need more content?",
      answer: "You can purchase additional content packages or upgrade to a higher tier plan at any time to meet your needs."
    },
    {
      question: "What's included in my monthly shoot days?",
      answer: "Each shoot day includes pre-production planning, on-location filming (up to 6 hours), and post-production editing. We'll work with you to maximize content creation during each session, often filming multiple pieces of content in one day."
    },
    {
      question: "Do we own the video content?",
      answer: "Yes. Upon final payment, you own all footage, finished videos, and source files—use them however and wherever you want."
    },
    {
      question: "How do you handle revisions and feedback?",
      answer: "We include up to 2 rounds of revisions for each piece of content. Our collaborative approach means we'll work closely with you during pre-production to align on your vision, minimizing the need for major changes later."
    },
    {
      question: "What's the first step to working with Palmer House Productions?",
      answer: "Book a discovery call. We map your pain points, your goals, and your bottlenecks before recommending any solution."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Frequently asked questions</h2>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border pb-6">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex items-center justify-between group"
              >
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 ml-4">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="mt-3 text-muted-foreground leading-relaxed animate-accordion-down overflow-hidden">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
