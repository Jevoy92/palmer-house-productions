import { useEffect, useRef } from "react";
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
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    // Auto-play all videos when component mounts
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.play().catch(console.error);
      }
    });
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Fixed Background Bars */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <div className="w-full h-full flex">
          <div className="w-1/4 h-full bg-pal-orange"></div>
          <div className="w-1/4 h-full bg-pal-purple"></div>
          <div className="w-1/4 h-full bg-pal-green"></div>
          <div className="w-1/4 h-full bg-pal-blue"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-black text-white mb-4 drop-shadow-2xl">
            PALMER HOUSE PALS
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-lg">
            Your AI-powered video production team
          </p>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {pals.map((pal, index) => (
            <div
              key={pal.id}
              className="flex flex-col items-center animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Character Name Badge */}
              <div className="bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-xl">
                <h3 className="text-xl font-display font-black text-corporate-dark">
                  {pal.name}
                </h3>
              </div>

              {/* Character Container */}
              <div className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-2xl">
                {/* Character Video or Placeholder */}
                {pal.videoSrc ? (
                  <video
                    ref={(el) => {videoRefs.current[pal.id] = el}}
                    className="w-full h-full object-contain"
                    loop
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src={pal.videoSrc} type="video/webm" />
                  </video>
                ) : (
                  <div className={`w-full h-full ${pal.backgroundColor} flex items-center justify-center`}>
                    <div className="text-6xl">🎬</div>
                  </div>
                )}

                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Character Description */}
              <div className="mt-6 text-center">
                <p className="text-white/90 font-medium drop-shadow-lg">
                  {pal.id === 'reel-pal' && 'Social Content Creation'}
                  {pal.id === 'system-pal' && 'Training & Internal Systems'}
                  {pal.id === 'evergreen-pal' && 'Long-form Content Strategy'}
                  {pal.id === 'spotlight-pal' && 'Premium Video Production'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button
            onClick={() => window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank')}
            className="px-12 py-6 bg-white text-corporate-dark font-display font-black text-xl rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Meet Your Pals - Book Discovery Call
          </button>
        </div>
      </div>
    </div>
  );
};