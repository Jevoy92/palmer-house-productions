import { useEffect, useRef, useState } from "react";
import systemPalVideo from "@/assets/pals/animations/female-system-pal.webm";

interface PalCharacter {
  id: string;
  name: string;
  videoSrc?: string;
  backgroundColor: string;
  fallbackImage?: string;
}

const pals: PalCharacter[] = [
  {
    id: "reel-pal",
    name: "Reel Pal",
    backgroundColor: "bg-pal-orange",
    // videoSrc will be added when video is provided
  },
  {
    id: "system-pal", 
    name: "System Pal",
    videoSrc: systemPalVideo,
    backgroundColor: "bg-pal-purple",
  },
  {
    id: "evergreen-pal",
    name: "Evergreen Pal", 
    backgroundColor: "bg-pal-green",
    // videoSrc will be added when video is provided
  },
  {
    id: "spotlight-pal",
    name: "Spotlight Pal",
    backgroundColor: "bg-pal-blue",
    // videoSrc will be added when video is provided
  }
];

export const PalsHero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate overall scroll progress (0 to 1)
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - containerRect.top) / (windowHeight + containerRect.height)
      ));
      setScrollProgress(progress);

      // Check visibility of each pal section with smooth staggered reveals
      const newVisibleSections = new Set<string>();
      
      // Smooth progressive reveal based on scroll
      const baseRevealPoint = 0.2; // Start at 20% scroll
      const revealSpacing = 0.15;   // 15% spacing between reveals
      
      pals.forEach((pal, index) => {
        const revealPoint = baseRevealPoint + (index * revealSpacing);
        if (progress >= revealPoint) {
          newVisibleSections.add(pal.id);
          
          // Play video when section becomes visible
          const video = videoRefs.current[pal.id];
          if (video && video.paused) {
            video.play().catch(console.error);
          }
        }
      });

      setVisibleSections(newVisibleSections);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Smooth Background Bars - Progressive Width Animation */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <div className="w-full h-full flex">
          <div 
            className="h-full bg-pal-orange transition-all duration-1000 ease-out"
            style={{ 
              width: scrollProgress >= 0.2 ? '25%' : '0%'
            }}
          ></div>
          <div 
            className="h-full bg-pal-purple transition-all duration-1000 ease-out delay-300"
            style={{ 
              width: scrollProgress >= 0.35 ? '25%' : '0%'
            }}
          ></div>
          <div 
            className="h-full bg-pal-green transition-all duration-1000 ease-out delay-600"
            style={{ 
              width: scrollProgress >= 0.5 ? '25%' : '0%'
            }}
          ></div>
          <div 
            className="h-full bg-pal-blue transition-all duration-1000 ease-out delay-900"
            style={{ 
              width: scrollProgress >= 0.65 ? '25%' : '0%'
            }}
          ></div>
        </div>
      </div>

      {/* Pulsing overlay effect on active section */}
      <div className="fixed top-0 left-0 w-full h-full z-5 flex">
        {pals.map((pal, index) => {
          const isActive = visibleSections.has(pal.id) && scrollProgress >= 0.2 + (index * 0.15) && scrollProgress < 0.35 + (index * 0.15);
          return (
            <div
              key={pal.id}
              className={`w-1/4 h-full transition-all duration-500 ${
                isActive ? 'bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse' : ''
              }`}
            />
          );
        })}
      </div>

      {/* Fixed Title */}
      <div className="fixed top-16 left-0 right-0 z-20 text-center">
        <div 
          className="transition-all duration-700 ease-out"
          style={{
            opacity: scrollProgress >= 0.1 ? 1 : 0,
            transform: `translateY(${scrollProgress >= 0.1 ? 0 : 20}px)`
          }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white drop-shadow-2xl">
            PALMER HOUSE PALS
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-medium drop-shadow-lg mt-2">
            Your AI-powered video production team
          </p>
        </div>
      </div>

      {/* Character Sections - Smooth Staggered Reveals */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-32">
            {pals.map((pal, index) => {
              const isVisible = visibleSections.has(pal.id);
              const revealProgress = Math.max(0, Math.min(1, (scrollProgress - (0.2 + index * 0.15)) / 0.15));
              
              return (
                <div
                  key={pal.id}
                  id={`pal-${pal.id}`}
                  className="flex flex-col items-center"
                  style={{ 
                    opacity: isVisible ? 1 : 0,
                    transform: `translateY(${isVisible ? 0 : 40}px) scale(${isVisible ? 1 : 0.9})`,
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  {/* Character Name Badge */}
                  <div className="bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-xl">
                    <h3 className="text-xl font-display font-black text-corporate-dark">
                      {pal.name}
                    </h3>
                  </div>

                  {/* Character Container */}
                  <div className="relative">
                    {/* Character Video or Placeholder */}
                    {pal.videoSrc ? (
                      <video
                        ref={(el) => {videoRefs.current[pal.id] = el}}
                        className="w-64 h-64 object-contain rounded-3xl shadow-2xl bg-white/10 backdrop-blur-sm"
                        loop
                        muted
                        playsInline
                        preload="metadata"
                      >
                        <source src={pal.videoSrc} type="video/webm" />
                      </video>
                    ) : (
                      <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl flex items-center justify-center">
                        <div className="text-6xl">🎬</div>
                      </div>
                    )}
                  </div>

                  {/* Character Description */}
                  <div className="mt-6 text-center">
                    <p className="text-lg text-white font-bold drop-shadow-lg">
                      {pal.id === 'reel-pal' && 'Social Content Creation'}
                      {pal.id === 'system-pal' && 'Training & Internal Systems'}
                      {pal.id === 'evergreen-pal' && 'Long-form Content Strategy'}
                      {pal.id === 'spotlight-pal' && 'Premium Video Production'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div 
              className="transition-all duration-1000 ease-out"
              style={{
                opacity: scrollProgress > 0.8 ? 1 : 0,
                transform: `translateY(${scrollProgress > 0.8 ? 0 : 30}px) scale(${scrollProgress > 0.8 ? 1 : 0.95})`
              }}
            >
              <button
                onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank')}
                className="px-12 py-6 bg-white text-corporate-dark font-display font-black text-xl rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Meet Your Pals - Book Discovery Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};