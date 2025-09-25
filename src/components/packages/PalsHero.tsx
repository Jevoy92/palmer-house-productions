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
      
      // Calculate overall scroll progress
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - containerRect.top) / (windowHeight + containerRect.height)
      ));
      setScrollProgress(progress);

      // Check visibility of each pal section
      const newVisibleSections = new Set<string>();
      
      pals.forEach((pal, index) => {
        const palElement = document.getElementById(`pal-${pal.id}`);
        if (palElement) {
          const palRect = palElement.getBoundingClientRect();
          const isVisible = palRect.top < windowHeight * 0.8 && palRect.bottom > windowHeight * 0.2;
          
          if (isVisible) {
            newVisibleSections.add(pal.id);
            
            // Play video when section becomes visible
            const video = videoRefs.current[pal.id];
            if (video && video.paused) {
              video.play().catch(console.error);
            }
          } else {
            // Pause video when out of view
            const video = videoRefs.current[pal.id];
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
    <div ref={containerRef} className="relative min-h-[400vh]">
      {/* Fixed Background Bars */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <div className="w-full h-full flex">
          <div 
            className="w-1/4 h-full bg-pal-orange transition-all duration-700"
            style={{ 
              transform: `translateY(${Math.max(0, 100 - (scrollProgress * 400))}%)` 
            }}
          ></div>
          <div 
            className="w-1/4 h-full bg-pal-purple transition-all duration-700 delay-200"
            style={{ 
              transform: `translateY(${Math.max(0, 100 - ((scrollProgress - 0.25) * 400))}%)` 
            }}
          ></div>
          <div 
            className="w-1/4 h-full bg-pal-green transition-all duration-700 delay-400"
            style={{ 
              transform: `translateY(${Math.max(0, 100 - ((scrollProgress - 0.5) * 400))}%)` 
            }}
          ></div>
          <div 
            className="w-1/4 h-full bg-pal-blue transition-all duration-700 delay-600"
            style={{ 
              transform: `translateY(${Math.max(0, 100 - ((scrollProgress - 0.75) * 400))}%)` 
            }}
          ></div>
        </div>
      </div>

      {/* Fixed Title */}
      <div className="fixed top-16 left-0 right-0 z-20 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white drop-shadow-2xl">
          PALMER HOUSE PALS
        </h1>
        <p className="text-lg md:text-xl text-white/90 font-medium drop-shadow-lg mt-2">
          Your AI-powered video production team
        </p>
      </div>

      {/* Character Sections */}
      <div className="relative z-10">
        {pals.map((pal, index) => (
          <div
            key={pal.id}
            id={`pal-${pal.id}`}
            className="h-screen flex items-center justify-center"
            style={{ 
              marginTop: index === 0 ? '20vh' : '0',
            }}
          >
            <div 
              className={`flex flex-col items-center transition-all duration-1000 ${
                visibleSections.has(pal.id) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
            >
              {/* Character Name Badge */}
              <div className="bg-white/95 backdrop-blur-sm rounded-full px-8 py-4 mb-8 shadow-xl">
                <h3 className="text-2xl font-display font-black text-corporate-dark">
                  {pal.name}
                </h3>
              </div>

              {/* Character Container */}
              <div className="relative">
                {/* Character Video or Placeholder */}
                {pal.videoSrc ? (
                  <video
                    ref={(el) => {videoRefs.current[pal.id] = el}}
                    className="w-80 h-80 object-contain rounded-3xl shadow-2xl bg-white/10 backdrop-blur-sm"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src={pal.videoSrc} type="video/webm" />
                  </video>
                ) : (
                  <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl flex items-center justify-center">
                    <div className="text-8xl">🎬</div>
                  </div>
                )}
              </div>

              {/* Character Description */}
              <div className="mt-8 text-center">
                <p className="text-xl text-white font-bold drop-shadow-lg">
                  {pal.id === 'reel-pal' && 'Social Content Creation'}
                  {pal.id === 'system-pal' && 'Training & Internal Systems'}
                  {pal.id === 'evergreen-pal' && 'Long-form Content Strategy'}
                  {pal.id === 'spotlight-pal' && 'Premium Video Production'}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* CTA Section */}
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
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
  );
};