
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const PricingFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What's included in my monthly shoot days?",
      answer: "Each shoot day includes pre-production planning, on-location filming (up to 6 hours), and post-production editing. We'll work with you to maximize content creation during each session, often filming multiple pieces of content in one day."
    },
    {
      question: "Can I change my service package anytime?",
      answer: "Absolutely! You can change your service at any time. For monthly services, changes take effect at your next billing cycle. For one-time services, we can discuss your new needs right away. We'll work with you to ensure a smooth transition."
    },
    {
      question: "How do you handle revisions and feedback?",
      answer: "We include up to 2 rounds of revisions for each piece of content. Our collaborative approach means we'll work closely with you during pre-production to align on your vision, minimizing the need for major changes later."
    },
    {
      question: "Do you provide the video equipment and crew?",
      answer: "Yes! We bring all professional equipment including cameras, lighting, audio gear, and our experienced crew. You just need to show up ready to create amazing content."
    },
    {
      question: "What if I need content faster than my monthly allocation?",
      answer: "We offer rush production services for urgent needs. Additional content can be added to any service at competitive rates. Monthly Content System clients get priority for rush requests."
    },
    {
      question: "How far in advance do I need to book shoots?",
      answer: "We recommend booking 2-3 weeks in advance for the best availability. However, we understand business needs can be urgent - we'll always try to accommodate shorter notice when possible."
    },
    {
      question: "Do you help with content strategy and planning?",
      answer: "Yes! Every plan includes strategic planning sessions where we'll help you develop content calendars, identify key messages, and plan content that aligns with your business goals."
    },
    {
      question: "What happens if I'm not satisfied with the content?",
      answer: "Your satisfaction is our priority. We offer a 100% satisfaction guarantee - if you're not happy with the final content, we'll reshoot at no additional cost or provide a full refund for that month's service."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 gradient-social-4 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            ❓ Frequently Asked Questions
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black mb-6 text-corporate-dark tracking-tight">
            Service <span className="text-gradient-3">Questions</span>
          </h2>
          <p className="text-xl text-corporate-gray max-w-2xl mx-auto">
            Everything you need to know about our video production services.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-video-white rounded-2xl video-shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors"
              >
                <h3 className="text-lg md:text-xl font-bold text-corporate-dark pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6 text-corporate-gray" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-corporate-gray" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6 text-corporate-gray leading-relaxed text-base md:text-lg">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-xl text-corporate-gray mb-8">
            Still have questions? We're here to help!
          </p>
          <button className="px-8 py-4 gradient-social-1 text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300 text-lg video-shadow-lg">
            Get in Touch →
          </button>
        </div>
      </div>
    </section>
  );
};
