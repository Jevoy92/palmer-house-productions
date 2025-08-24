import { useEffect, useRef } from 'react';
import { heroParallax, scrollReveal, cleanupScrollTrigger } from '@/lib/gsap';

export const ParallaxHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !layer1Ref.current || !layer2Ref.current || !layer3Ref.current) return;

    // Set up parallax layers with different intensities
    heroParallax(layer1Ref.current, 0.2);
    heroParallax(layer2Ref.current, 0.4);  
    heroParallax(layer3Ref.current, 0.6);

    // Scroll-triggered reveals
    scrollReveal(heroRef.current, '.parallax-content', {
      stagger: 0.2,
      start: 'top 80%'
    });

    return () => cleanupScrollTrigger();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen overflow-hidden bg-gradient-to-b from-video-black to-video-black/80"
    >
      {/* Parallax Layer 1 - Background */}
      <div 
        ref={layer1Ref}
        className="absolute inset-0 bg-gradient-to-br from-social-purple/20 to-social-blue/20"
      />

      {/* Parallax Layer 2 - Middle */}
      <div 
        ref={layer2Ref}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-96 h-96 bg-gradient-to-r from-social-orange/10 to-social-pink/10 rounded-full blur-[100px]" />
      </div>

      {/* Parallax Layer 3 - Foreground */}
      <div 
        ref={layer3Ref}
        className="absolute inset-0 flex items-end justify-end p-20"
      >
        <div className="w-64 h-64 bg-gradient-to-r from-social-cyan/10 to-social-blue/10 rounded-full blur-[80px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-video-white max-w-4xl px-8">
          <h1 className="parallax-content text-6xl md:text-8xl font-black mb-6 opacity-0">
            Next Level
            <br />
            <span className="bg-gradient-to-r from-social-orange via-social-pink to-social-purple bg-clip-text text-transparent">
              Production
            </span>
          </h1>
          
          <p className="parallax-content text-xl md:text-2xl text-video-white/70 mb-12 opacity-0">
            Experience the future of video content creation
          </p>

          <div className="parallax-content flex justify-center space-x-6 opacity-0">
            <button className="bg-gradient-to-r from-social-orange to-social-pink text-white px-8 py-4 rounded-lg font-medium hover:scale-105 transition-transform duration-300">
              Explore Now
            </button>
            <button className="border border-video-white/20 text-video-white px-8 py-4 rounded-lg font-medium backdrop-blur-sm hover:bg-video-white/10 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-video-white/60 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs font-medium">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-video-white/60 to-transparent" />
        </div>
      </div>
    </section>
  );
};