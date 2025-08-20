import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Plus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [inViewItems, setInViewItems] = useState<Set<number>>(new Set());
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setInViewItems(prev => new Set([...prev, index]));
        }
      });
    }, observerOptions);

    faqRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.setAttribute('data-index', index.toString());
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  const faqs: FAQItem[] = [
    {
      question: "What makes Palmer House Productions different from other video companies?",
      answer: "We specialize in turning video into business systems. While other companies focus on one-off productions, we create scalable video content that automates processes, reduces repetitive work, and grows with your business. Our systematic approach means every video serves multiple purposes and drives measurable ROI."
    },
    {
      question: "How much does a typical video project cost?",
      answer: "Our projects range from $500 DIY resources to $7,500+ comprehensive video systems. Pricing depends on scope, timeline, and deliverables. We offer transparent pricing with detailed breakdowns, and every project includes strategy, production, and optimization. Book a discovery call for a custom quote."
    },
    {
      question: "How long does it take to complete a video project?",
      answer: "Timeline varies by project scope: DIY resources are instant download, single videos take 2-3 weeks, and comprehensive video systems take 4-8 weeks. We provide detailed timelines during discovery and keep you updated throughout the process with regular check-ins and milestone deliveries."
    },
    {
      question: "Do you work with businesses outside of Seattle?",
      answer: "Yes! While we're based in Seattle, we work with clients nationwide and internationally. For local clients, we offer on-location filming. For remote clients, we provide video strategy, remote coaching, and can coordinate with local videographers in your area when needed."
    },
    {
      question: "What's included in your video strategy services?",
      answer: "Our strategy services include content planning, script development, distribution strategy, performance tracking setup, and ongoing optimization recommendations. We also provide detailed documentation so you can implement and scale the system internally."
    },
    {
      question: "Can you help with ongoing video content after the initial project?",
      answer: "Absolutely! We offer retainer services, monthly content packages, and DIY coaching to help you maintain momentum. Our goal is to train your team to create quality content independently while providing support when needed."
    },
    {
      question: "What video formats and platforms do you optimize for?",
      answer: "We deliver videos optimized for all major platforms: YouTube, LinkedIn, Instagram, TikTok, websites, email campaigns, and internal training systems. Each delivery includes multiple formats, aspect ratios, and compression levels tailored to your distribution strategy."
    },
    {
      question: "Do you provide the video equipment and crew?",
      answer: "Yes, we handle all production logistics including professional cameras, lighting, audio equipment, and crew. For larger projects, we bring additional specialists like sound engineers or drone operators. You don't need to worry about any technical aspects."
    }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left column with heading and subtext */}
          <div className="md:col-span-4">
            <h2 className="text-6xl font-bold mb-6 text-foreground">FAQ</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Get quick answers about working with us and our approach to video production systems.
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
                ref={el => faqRefs.current[index] = el}
                className={`
                  border-b border-border py-6 px-4 cursor-pointer group 
                  transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                  hover:bg-muted/50 hover:-translate-y-0.5 hover:shadow-lg hover:rounded-lg
                  ${inViewItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-2'}
                  ${openIndex === index ? 'bg-muted/30' : ''}
                `}
                style={{ transitionDelay: `${index * 0.1}s` }}
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center flex-1">
                    <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-all duration-300 pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`
                      text-2xl font-light transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                      ${openIndex === index ? 'text-foreground font-normal' : 'text-muted-foreground'}
                      group-hover:text-foreground group-hover:scale-105
                    `}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 transition-all duration-300">
                      <Plus className={`
                        w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                        ${openIndex === index ? 'rotate-45' : ''}
                      `} />
                    </div>
                  </div>
                </div>
                <div className={`
                  overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${openIndex === index ? 'max-h-96 opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0'}
                `}>
                  <div className="text-muted-foreground leading-relaxed">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};