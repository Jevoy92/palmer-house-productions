import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'process' | 'pricing' | 'technical' | 'timeline';
}

export const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs: FAQItem[] = [
    {
      question: "What makes Palmer House Productions different from other video companies?",
      answer: "We specialize in turning video into business systems. While other companies focus on one-off productions, we create scalable video content that automates processes, reduces repetitive work, and grows with your business. Our systematic approach means every video serves multiple purposes and drives measurable ROI.",
      category: 'process'
    },
    {
      question: "How much does a typical video project cost?",
      answer: "Our projects range from $500 DIY resources to $7,500+ comprehensive video systems. Pricing depends on scope, timeline, and deliverables. We offer transparent pricing with detailed breakdowns, and every project includes strategy, production, and optimization. Book a discovery call for a custom quote.",
      category: 'pricing'
    },
    {
      question: "How long does it take to complete a video project?",
      answer: "Timeline varies by project scope: DIY resources are instant download, single videos take 2-3 weeks, and comprehensive video systems take 4-8 weeks. We provide detailed timelines during discovery and keep you updated throughout the process with regular check-ins and milestone deliveries.",
      category: 'timeline'
    },
    {
      question: "Do you work with businesses outside of Seattle?",
      answer: "Yes! While we're based in Seattle, we work with clients nationwide and internationally. For local clients, we offer on-location filming. For remote clients, we provide video strategy, remote coaching, and can coordinate with local videographers in your area when needed.",
      category: 'process'
    },
    {
      question: "What's included in your video strategy services?",
      answer: "Our strategy services include content planning, script development, distribution strategy, performance tracking setup, and ongoing optimization recommendations. We also provide detailed documentation so you can implement and scale the system internally.",
      category: 'process'
    },
    {
      question: "Can you help with ongoing video content after the initial project?",
      answer: "Absolutely! We offer retainer services, monthly content packages, and DIY coaching to help you maintain momentum. Our goal is to train your team to create quality content independently while providing support when needed.",
      category: 'process'
    },
    {
      question: "What video formats and platforms do you optimize for?",
      answer: "We deliver videos optimized for all major platforms: YouTube, LinkedIn, Instagram, TikTok, websites, email campaigns, and internal training systems. Each delivery includes multiple formats, aspect ratios, and compression levels tailored to your distribution strategy.",
      category: 'technical'
    },
    {
      question: "Do you provide the video equipment and crew?",
      answer: "Yes, we handle all production logistics including professional cameras, lighting, audio equipment, and crew. For larger projects, we bring additional specialists like sound engineers or drone operators. You don't need to worry about any technical aspects.",
      category: 'technical'
    }
  ];

  const categories = {
    process: { name: "Process & Approach", color: "text-social-green" },
    pricing: { name: "Pricing & Investment", color: "text-social-orange" },
    timeline: { name: "Timeline & Delivery", color: "text-social-cyan" },
    technical: { name: "Technical & Equipment", color: "text-social-purple" }
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary font-bold text-sm mb-6 rounded-full">
            ❓ Frequently Asked Questions
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black mb-6 text-foreground tracking-tight">
            Everything You Need to Know About 
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"> Working With Us</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-medium">
            Get answers to common questions about our process, pricing, timelines, and what makes our video systems approach unique.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openItems.includes(index);
            const categoryInfo = categories[faq.category];
            
            return (
              <div 
                key={index}
                className="bg-card border border-border rounded-2xl hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 rounded-2xl transition-colors duration-200"
                >
                  <div className="flex-1 pr-4">
                    <div className={`text-xs font-semibold text-primary mb-2 uppercase tracking-wide`}>
                      {categoryInfo.name}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-6 h-6 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-border">
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-card border border-border rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground text-lg mb-6">
              We're here to help! Book a free discovery call to discuss your specific needs and get personalized answers.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold text-lg rounded-xl hover:scale-105 transition-all duration-300">
              Book Discovery Call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};