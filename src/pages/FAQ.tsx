import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { Navigation } from "@/components/Navigation";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { EnhancedFooter } from "@/components/seo/EnhancedFooter";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What's included in your video packages?",
      answer: "Our video packages include full-service production from concept to completion. This encompasses strategy development, scriptwriting, professional filming with cinema-quality equipment, expert editing, motion graphics, music selection, and multiple revisions. Each package is customized to your specific goals and includes delivery in multiple formats optimized for different platforms."
    },
    {
      question: "How long does the video production process take?",
      answer: "The timeline varies depending on the complexity and scope of your project. Typically, our process takes 3-6 weeks from initial consultation to final delivery. This includes strategy sessions, scripting, filming, editing, and revisions. We'll provide you with a detailed timeline during your discovery call that's tailored to your specific project and deadlines."
    },
    {
      question: "Do you offer video marketing strategy beyond production?",
      answer: "Absolutely! We don't just create videos; we develop comprehensive video marketing strategies. This includes audience analysis, platform optimization, distribution planning, performance tracking, and ongoing optimization recommendations. Our goal is to ensure your videos not only look great but also drive real business results."
    },
    {
      question: "Can you work with businesses outside your local area?",
      answer: "Yes! We work with clients nationwide and have successfully produced content for businesses across the country. We can handle remote strategy sessions and planning, and we're equipped to travel for on-location filming when needed. Many of our services, like our DIY downloads and group coaching, are completely location-independent."
    },
    {
      question: "What makes Palmer House Productions different from other video companies?",
      answer: "We focus on authentic storytelling that connects with your audience on an emotional level. Unlike companies that follow cookie-cutter templates, we take time to understand your unique story, values, and goals. Our background in both creative storytelling and business strategy means we create videos that are not only beautiful but also strategically designed to achieve your specific objectives."
    },
    {
      question: "Do you provide the raw footage and source files?",
      answer: "Yes, upon project completion and final payment, we provide you with all raw footage, source files, and project assets. This ensures you have everything you need for future use and gives you complete ownership of your content. We also provide detailed guidelines on how to use and store these assets effectively."
    },
    {
      question: "How much do your services typically cost?",
      answer: "Our pricing varies based on the scope, complexity, and specific requirements of your project. We offer everything from DIY downloads starting at $47 to comprehensive video production packages. The best way to get accurate pricing is through a discovery call where we can understand your needs and provide a customized quote that fits your budget and goals."
    },
    {
      question: "What if I'm not satisfied with the final video?",
      answer: "Your satisfaction is our top priority. Our process includes multiple check-ins and revision rounds to ensure the final product exceeds your expectations. We work closely with you throughout the entire process and won't consider a project complete until you're thrilled with the results. Our collaborative approach means issues are addressed early and often."
    },
    {
      question: "Do you handle social media content and shorter video formats?",
      answer: "Definitely! We understand that modern marketing requires content in multiple formats and lengths. Our packages often include creating various cuts of your content optimized for different platforms - everything from 15-second social media clips to full-length promotional videos. We'll ensure your content works effectively across all your marketing channels."
    },
    {
      question: "How do I get started with Palmer House Productions?",
      answer: "The best first step is booking a discovery call where we can discuss your goals, challenges, and vision. This consultation is designed to understand your needs and determine how we can best help you achieve your objectives. From there, we'll provide you with a customized proposal and timeline. You can book your discovery call directly through our website or contact us to get started."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <StructuredData />
      <MainContent>
        <section className="pt-24 pb-16 bg-video-white">
          <div className="max-w-4xl mx-auto px-6">
            <BreadcrumbNavigation />
            
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-3 gradient-social-1 rounded-full text-white font-bold text-lg mb-8">
                <HelpCircle className="inline-block mr-2" size={20} />
                Frequently Asked Questions
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                Got <span className="text-gradient-1">Questions?</span>
              </h1>
              <p className="text-xl md:text-2xl text-corporate-gray mb-8 max-w-3xl mx-auto">
                Find answers to the most common questions about our video production services, process, and pricing.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl video-shadow overflow-hidden">
                  <button
                    className="w-full text-left p-6 hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="text-lg font-bold text-corporate-dark pr-4">
                      {faq.question}
                    </h3>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-corporate-gray flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-corporate-gray flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div 
                      id={`faq-answer-${index}`}
                      className="px-6 pb-6 text-corporate-gray leading-relaxed"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-social-purple/10 to-social-pink/10 rounded-3xl p-8 border border-social-purple/20">
                <h3 className="text-3xl font-display font-black text-corporate-dark mb-4">
                  Still Have Questions?
                </h3>
                <p className="text-lg text-corporate-gray mb-6">
                  We'd love to chat about your specific project and how we can help bring your vision to life.
                </p>
                <a
                  href="/contact"
                  className="inline-block px-8 py-4 gradient-social-1 text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300 video-shadow"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
      <EnhancedFooter />
    </div>
  );
};

export default FAQ;