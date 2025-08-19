import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const TrustSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const numeralRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const numeral = numeralRef.current;
    const stats = statsRef.current;

    if (!section || !numeral || !stats) return;

    // Numeral reveal animation
    gsap.fromTo(numeral, 
      { 
        opacity: 0, 
        scale: 0.8,
        filter: 'blur(10px)'
      },
      { 
        opacity: 0.1, 
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        }
      }
    );

    // Stats counter animation
    ScrollTrigger.create({
      trigger: stats,
      start: 'top 60%',
      onEnter: () => {
        // Count up animation for the main stat
        let obj = { val: 0 };
        gsap.to(obj, {
          val: 49,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            const countElement = stats.querySelector('.count-up');
            if (countElement) {
              countElement.textContent = Math.round(obj.val) + '%';
            }
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Large Numeral */}
          <div ref={numeralRef} className="flex justify-center lg:justify-start">
            <div className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-muted/10 select-none leading-none">
              0–1
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="space-y-6">
            <div className="bg-card border rounded-lg p-8 shadow-sm">
              {/* Stars */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 text-yellow-400 fill-current">
                    ⭐
                  </div>
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-lg text-foreground leading-relaxed mb-6">
                "Palmer House Productions transformed our video strategy. Their systematic approach helped us scale from sporadic content to consistent, high-quality videos that actually convert."
              </blockquote>
              
              {/* Client Info */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold text-lg">MK</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Maria Kowalski</div>
                  <div className="text-sm text-muted-foreground">CMO, TechFlow Solutions</div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm animate-fade-in"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                <div className="ml-3 text-muted-foreground text-sm">
                  +200 creators
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Case Studies */}
          <div ref={statsRef} className="space-y-6">
            {/* Revenue Growth Card */}
            <div className="bg-card border rounded-lg p-6 text-center shadow-sm">
              <div className="text-4xl font-black text-primary count-up">0%</div>
              <div className="text-muted-foreground text-sm mt-1">Avg. Revenue Growth</div>
              <div className="text-xs text-muted-foreground/80 mt-2">Within 6 months</div>
            </div>
            
            {/* Case Study Card */}
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 text-xs font-bold">$</span>
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">$4M Raised</div>
                  <div className="text-xs text-muted-foreground">Series A Funding</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Startup used our video content system to create compelling investor pitches and product demos.
              </p>
            </div>
            
            {/* Process Preview Card */}
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <div className="text-lg font-semibold text-foreground mb-3">Our Process</div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-muted-foreground">Strategy & Planning</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary/60"></div>
                  <span className="text-muted-foreground">Content Production</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                  <span className="text-muted-foreground">Optimization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};