
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Plus } from "lucide-react";

export const PricingFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [inViewItems, setInViewItems] = useState<Set<number>>(new Set());
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

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
