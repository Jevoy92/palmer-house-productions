
import { useState } from "react";
import { ArrowRight } from "lucide-react";

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
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left column with heading and subtext */}
          <div className="md:col-span-4">
            <h2 className="text-6xl font-bold mb-6 text-foreground">FAQ</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Get quick answers about working with us and our approach to digital solutions.
            </p>
            <span className="inline-flex items-center text-foreground font-medium group cursor-pointer hover:text-primary transition-colors">
              <span className="mr-2">Ask a question</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
          
          {/* Right column with FAQ items */}
          <div className="md:col-span-8">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border-b border-border py-6 cursor-pointer group hover:bg-muted/50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors pr-4">
                    {faq.question}
                  </h3>
                  <span className="text-3xl font-light text-muted-foreground flex-shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                {openIndex === index && (
                  <div className="mt-4 text-muted-foreground">
                    <p className="leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
