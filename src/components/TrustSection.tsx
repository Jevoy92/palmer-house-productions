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
          val: 82,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            const countElement = stats.querySelector('.count-up');
            if (countElement) {
              countElement.textContent = Math.round(obj.val) + 'M';
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-cinematic-dark relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Large Numeral */}
          <div ref={numeralRef} className="flex justify-center lg:justify-start">
            <div className="text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-cinematic-violet/10 select-none leading-none">
              0–1
            </div>
          </div>

          {/* Trust Content */}
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-video-white">
              Trusted by operators who care about{' '}
              <span className="bg-gradient-to-r from-cinematic-violet to-cinematic-indigo bg-clip-text text-transparent">
                clarity over hype
              </span>
            </h2>
            
            <p className="text-cinematic-glow text-lg leading-relaxed">
              We help brands build content systems—saving time, reducing spend, scaling distribution.
            </p>

            {/* Trust Avatars */}
            <div className="flex justify-center lg:justify-start items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="w-10 h-10 rounded-full gradient-cinematic-primary flex items-center justify-center text-video-white font-semibold text-sm animate-fade-blur-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
              <div className="ml-3 text-cinematic-glow text-sm">
                +200 creators
              </div>
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="space-y-8">
            <div className="glass-card p-6 text-center">
              <div className="text-4xl font-black text-cinematic-violet count-up">0M</div>
              <div className="text-cinematic-glow text-sm mt-1">Views Generated</div>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="text-2xl font-bold text-video-white">98%</div>
              <div className="text-cinematic-glow text-sm mt-1">Client Satisfaction</div>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="text-2xl font-bold text-video-white">6mo</div>
              <div className="text-cinematic-glow text-sm mt-1">Avg. Partnership</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};