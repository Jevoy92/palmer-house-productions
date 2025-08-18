
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
      question: "Do you offer monthly video content packages?",
      answer: "Yes, our \"Business Video Assets\" package delivers strategic video systems that replace repetitive operations, so you never run out of evergreen business documentation. Custom project basis."
    },
    {
      question: "How do your one-time bundles work?",
      answer: "We offer targeted solutions like Internal FAQ Buildouts, External FAQ Videos, Reels Blitzes, and rapid launches. Each solves a specific problem fast—without a long-term contract."
    },
    {
      question: "Do you offer a starter package for first-timers?",
      answer: "Yes—the \"Starter Session\" is a $500 mini-package with a 30-minute shoot and three edited videos. Simple, accessible, and capped to ensure quality."
    },
    {
      question: "What's the \"Business Bonus Pack\"?",
      answer: "It's our bundle of DIY guides, coaching, and scripts—free with monthly packages or any major bundle. Perfect for teams who want to practice, plan, or sharpen their on-camera skills."
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
