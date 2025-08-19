
import { useState, useEffect } from "react";
import { Play, Check } from "lucide-react";

export const Hero = () => {
  const handleStartSystem = () => {
    window.location.href = '/video-packages';
  };

  useEffect(() => {
    // Initialize animations
    if (typeof window !== 'undefined') {
      import('../lib/gsap').then(({ revealElements }) => {
        revealElements('.hero-content > *', { stagger: 0.1, delay: 0.2 });
      });
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-video-black text-video-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>
      
      <div className="relative z-10 h-full w-full">
        <div className="container mx-auto container-padding h-screen">
          
          {/* Main Hero Content */}
          <div className="flex flex-1 items-center h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full">
              {/* Left Column - Headline and Description */}
              <div className="flex flex-col justify-center hero-content">
                <h1 className="font-bold leading-tight tracking-tight mb-6 lg:mb-8 text-video-white animate-fade-blur-in">
                  Build Video<br/>
                  Content<br/>
                  Systems
                </h1>
                <p className="text-lg lg:text-xl text-neutral-300 leading-relaxed max-w-lg mb-8 lg:mb-12 animate-fade-blur-in" style={{animationDelay: '0.1s'}}>
                  Save time and money, drive authority, and scale your business.
                </p>
                
                <div className="flex animate-fade-blur-in" style={{animationDelay: '0.2s'}}>
                  <button 
                    onClick={handleStartSystem}
                    className="bg-social-orange text-white text-lg font-medium px-10 py-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-[0_0_20px_rgba(255,125,59,0.4)] hover:-translate-y-0.5"
                  >
                    Start Your System
                  </button>
                </div>
              </div>
              
              {/* Right Column - Visual System */}
              <div className="relative flex items-center justify-center animate-fade-blur-in" style={{animationDelay: '0.3s'}}>
                {/* Connection Lines SVG - Hidden on mobile */}
                <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
                  <svg width="100%" height="100%" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M295 295 C 295 200, 400 200, 420 190" stroke="hsl(var(--social-blue))" strokeWidth="1.5" strokeOpacity="0.5"></path>
                    <path d="M295 295 C 200 295, 200 230, 180 215" stroke="hsl(var(--social-blue))" strokeWidth="1.5" strokeOpacity="0.5"></path>
                    <path d="M295 305 C 200 305, 200 380, 220 400" stroke="hsl(var(--social-blue))" strokeWidth="1.5" strokeOpacity="0.5"></path>
                    <path d="M220 400 C 220 440, 280 440, 300 440" stroke="hsl(var(--social-blue))" strokeWidth="1.5" strokeOpacity="0.5"></path>
                    <path d="M420 190 C 470 190, 470 140, 490 130" stroke="hsl(var(--social-blue))" strokeWidth="1.5" strokeOpacity="0.5"></path>
                  </svg>
                </div>

                {/* Central Monitor - Always visible, responsive sizing */}
                <div className="relative z-10 w-32 h-20 sm:w-40 sm:h-24 lg:w-48 lg:h-32 bg-video-black/50 backdrop-blur-md rounded-lg p-2 border border-social-orange/50 shadow-[0_0_30px_rgba(255,125,59,0.3)]">
                  <div className="w-full h-full rounded-md flex items-center justify-center bg-gradient-to-br from-social-orange/30 to-social-orange/10">
                     <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-social-orange rounded-md flex items-center justify-center">
                        <Play className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 lg:w-24 h-2 bg-video-black/50 border-x border-b border-social-orange/50 rounded-b-md"></div>
                </div>

                {/* Mobile: Simplified card layout below monitor */}
                <div className="block md:hidden absolute -bottom-16 left-1/2 -translate-x-1/2 flex space-x-4">
                  {/* Onboarding Card - Mobile simplified */}
                  <div className="w-20 h-12 bg-video-black/50 backdrop-blur-md rounded-lg p-2 border border-social-orange/50 shadow-[0_0_20px_rgba(255,125,59,0.2)] flex items-center justify-center">
                    <div className="w-4 h-4 bg-social-orange rounded-sm flex items-center justify-center">
                      <Play className="w-2 h-2 text-white fill-white" />
                    </div>
                  </div>
                  
                  {/* Checkmark Card - Mobile simplified */}
                  <div className="w-20 h-12 bg-video-black/50 backdrop-blur-md rounded-lg p-2 border border-social-orange/50 shadow-[0_0_20px_rgba(255,125,59,0.2)] flex items-center justify-center">
                     <Check className="w-5 h-5 text-social-orange" />
                  </div>
                  
                  {/* Video Item Card - Mobile simplified */}
                  <div className="w-20 h-12 bg-video-black/50 backdrop-blur-md rounded-lg p-2 border border-social-blue/50 shadow-[0_0_20px_rgba(59,130,246,0.2)] flex items-center justify-center">
                    <div className="w-5 h-5 bg-social-blue rounded-md flex items-center justify-center">
                      <Play className="w-2 h-2 text-white fill-white" />
                    </div>
                  </div>
                </div>

                {/* Desktop/Tablet: Full floating card system */}
                <div className="hidden md:block">
                  {/* Onboarding Card - Responsive positioning */}
                  <div className="absolute top-4 right-0 md:top-8 md:right-4 lg:top-16 lg:right-0 z-10 w-32 md:w-36 lg:w-44 bg-video-black/50 backdrop-blur-md rounded-lg p-3 border border-social-orange/50 shadow-[0_0_20px_rgba(255,125,59,0.2)]">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-5 h-5 lg:w-6 lg:h-6 bg-social-orange rounded-sm flex items-center justify-center">
                        <Play className="w-2 h-2 lg:w-3 lg:h-3 text-white fill-white" />
                      </div>
                      <span className="font-medium text-xs lg:text-sm">Onboarding</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-1.5 lg:h-2 w-3/4 bg-social-blue/30 rounded-full"></div>
                      <div className="h-1.5 lg:h-2 w-full bg-social-blue/30 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Checkmark Card - Responsive positioning */}
                  <div className="absolute top-8 left-8 md:top-12 md:left-12 lg:top-24 lg:left-24 z-10 w-20 h-14 lg:w-24 lg:h-16 bg-video-black/50 backdrop-blur-md rounded-lg p-3 border border-social-orange/50 shadow-[0_0_20px_rgba(255,125,59,0.2)] flex items-center justify-center">
                     <Check className="w-6 h-6 lg:w-8 lg:h-8 text-social-orange" />
                  </div>

                  {/* Video Item Card - Responsive positioning */}
                  <div className="absolute top-24 left-2 md:top-32 md:left-4 lg:top-40 lg:left-8 z-10 w-20 h-14 lg:w-24 lg:h-16 bg-video-black/50 backdrop-blur-md rounded-lg p-3 border border-social-blue/50 shadow-[0_0_20px_rgba(59,130,246,0.2)] flex items-center justify-center">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-social-blue rounded-md flex items-center justify-center">
                      <Play className="w-3 h-3 lg:w-4 lg:h-4 text-white fill-white" />
                    </div>
                  </div>

                  {/* List Card - Hidden on tablet, shown on desktop */}
                  <div className="hidden lg:block absolute bottom-32 left-16 z-10 w-32 h-20 bg-video-black/50 backdrop-blur-md rounded-lg p-3 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)] flex items-center space-x-3">
                    <span className="text-2xl lg:text-3xl font-bold text-red-400">1</span>
                    <div className="flex-1 space-y-2">
                      <div className="h-2 lg:h-2.5 w-full bg-red-400/30 rounded-full"></div>
                      <div className="h-2 lg:h-2.5 w-3/4 bg-red-400/30 rounded-full"></div>
                    </div>
                  </div>

                  {/* FAQs Card - Simplified positioning */}
                  <div className="absolute bottom-8 left-32 md:bottom-12 md:left-36 lg:bottom-16 lg:left-48 z-10 w-24 lg:w-28 bg-video-black/50 backdrop-blur-md rounded-lg p-3 border border-social-purple/50 shadow-[0_0_20px_rgba(151,71,255,0.2)] flex items-center space-x-2">
                    <div className="flex flex-col space-y-1">
                      <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-social-purple/50 rounded-full"></div>
                      <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-social-purple/50 rounded-full"></div>
                    </div>
                    <span className="font-medium text-xs lg:text-sm">FAQs</span>
                  </div>

                  {/* Playlist Card - Responsive positioning */}
                  <div className="absolute bottom-12 right-2 md:bottom-16 md:right-4 lg:bottom-20 lg:right-8 z-10 w-28 lg:w-36 bg-video-black/50 backdrop-blur-md rounded-lg p-3 border border-social-purple/50 shadow-[0_0_20px_rgba(151,71,255,0.2)] flex items-center space-x-3">
                    <div className="flex-1 space-y-2">
                      <div className="h-2 lg:h-2.5 w-full bg-social-purple/30 rounded-full"></div>
                      <div className="h-2 lg:h-2.5 w-3/4 bg-social-purple/30 rounded-full"></div>
                    </div>
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-social-purple rounded-full flex items-center justify-center">
                      <Play className="w-2 h-2 lg:w-3 lg:h-3 text-white fill-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-social-purple/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-social-orange/10 rounded-full blur-[100px]"></div>

    </section>
  );
};
