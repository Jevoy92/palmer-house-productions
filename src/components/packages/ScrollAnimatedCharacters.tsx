import { useEffect, useRef, useState } from "react";
import systemPalVideo from "@/assets/pals/animations/female-system-pal.webm";

interface CharacterSection {
  id: string;
  videoSrc: string;
  question: string;
  color: string;
  position: "left" | "right";
}

const characterSections: CharacterSection[] = [
  {
    id: "system-pal",
    videoSrc: systemPalVideo,
    question: "Need internal training systems?",
    color: "bg-pal-purple",
    position: "right"
  }
  // We'll add more characters as you provide the videos
];

export const ScrollAnimatedCharacters = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate overall scroll progress for color bars
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - containerRect.top) / (windowHeight + containerRect.height)
      ));
      setScrollProgress(progress);

      // Check visibility of each character section
      const newVisibleSections = new Set<string>();
      
      characterSections.forEach((section) => {
        const sectionElement = document.getElementById(section.id);
        if (sectionElement) {
          const sectionRect = sectionElement.getBoundingClientRect();
          const isVisible = sectionRect.top < windowHeight && sectionRect.bottom > 0;
          
          if (isVisible) {
            newVisibleSections.add(section.id);
            
            // Play video when section becomes visible
            const video = videoRefs.current[section.id];
            if (video && video.paused) {
              video.play().catch(console.error);
            }
          } else {
            // Pause video when out of view
            const video = videoRefs.current[section.id];
            if (video && !video.paused) {
              video.pause();
            }
          }
        }
      });

      setVisibleSections(newVisibleSections);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative py-24">
      {/* Animated Progress Bars */}
      <div className="fixed top-0 left-0 w-full h-2 z-40 flex">
        <div 
          className="h-full bg-pal-orange transition-all duration-500"
          style={{ width: `${Math.min(25, scrollProgress * 100)}%` }}
        />
        <div 
          className="h-full bg-pal-purple transition-all duration-500 delay-200"
          style={{ width: `${Math.max(0, Math.min(25, (scrollProgress - 0.25) * 100))}%` }}
        />
        <div 
          className="h-full bg-pal-green transition-all duration-500 delay-400"
          style={{ width: `${Math.max(0, Math.min(25, (scrollProgress - 0.5) * 100))}%` }}
        />
        <div 
          className="h-full bg-pal-blue transition-all duration-500 delay-600"
          style={{ width: `${Math.max(0, Math.min(25, (scrollProgress - 0.75) * 100))}%` }}
        />
      </div>

      {/* Character Sections */}
      <div className="max-w-7xl mx-auto px-4 space-y-32">
        {characterSections.map((section, index) => (
          <div
            key={section.id}
            id={section.id}
            className={`flex items-center justify-between ${
              section.position === 'right' ? 'flex-row-reverse' : 'flex-row'
            } ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
          >
            {/* Character Video */}
            <div className={`w-1/2 flex justify-center ${
              visibleSections.has(section.id) 
                ? 'animate-fade-in translate-x-0' 
                : section.position === 'left' 
                  ? '-translate-x-20 opacity-0' 
                  : 'translate-x-20 opacity-0'
            } transition-all duration-1000`}>
              <div className="relative">
                {/* Question Bubble */}
                <div className={`absolute -top-20 left-1/2 transform -translate-x-1/2 z-10 ${
                  visibleSections.has(section.id) ? 'animate-bounce' : 'opacity-0'
                } transition-opacity duration-500 delay-500`}>
                  <div className="bg-white rounded-2xl px-6 py-3 shadow-lg border-2 border-gray-100 relative">
                    <p className="text-lg font-bold text-corporate-dark whitespace-nowrap">
                      {section.question}
                    </p>
                    {/* Speech bubble tail */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                      <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                      <div className="w-0 h-0 border-l-10 border-r-10 border-t-10 border-l-transparent border-r-transparent border-t-gray-100 absolute -top-1 left-1/2 transform -translate-x-1/2"></div>
                    </div>
                  </div>
                </div>

                {/* Character Video */}
                <video
                  ref={(el) => {videoRefs.current[section.id] = el}}
                  className="w-80 h-80 object-contain rounded-3xl"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                >
                  <source src={section.videoSrc} type="video/webm" />
                </video>
              </div>
            </div>

            {/* Content Section */}
            <div className={`w-1/2 ${section.position === 'right' ? 'pr-12' : 'pl-12'} ${
              visibleSections.has(section.id) 
                ? 'animate-fade-in translate-y-0' 
                : 'translate-y-10 opacity-0'
            } transition-all duration-1000 delay-300`}>
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                <div className={`w-16 h-16 ${section.color} rounded-full flex items-center justify-center mb-6`}>
                  <span className="text-2xl">⚙️</span>
                </div>
                <h3 className="text-3xl font-display font-black text-corporate-dark mb-4">
                  System Pal
                </h3>
                <p className="text-lg text-corporate-gray mb-6">
                  Training videos, employee onboarding, and internal documentation that actually gets used and drives results.
                </p>
                <button className="px-8 py-4 bg-pal-purple text-white font-bold rounded-xl hover:scale-105 transition-all duration-300">
                  Explore System Solutions
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};