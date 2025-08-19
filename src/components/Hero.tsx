
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
      
      <div className="relative z-10 h-full max-w-7xl mx-auto px-8">
        <div className="flex flex-col h-screen">
          
          {/* Main Hero Content */}
          <div className="flex flex-1 items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 w-full">
              {/* Left Column - Headline and Description */}
              <div className="flex flex-col justify-center hero-content">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-8 text-video-white animate-fade-blur-in">
                  Build Video<br/>
                  Content<br/>
                  Systems
                </h1>
                <p className="text-xl text-neutral-300 leading-relaxed max-w-lg mb-12 animate-fade-blur-in" style={{animationDelay: '0.1s'}}>
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
                {/* Connection Lines SVG */}
                <div className="absolute inset-0 pointer-events-none z-0">
                  <svg width="100%" height="100%" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M295 295 C 295 200, 400 200, 420 190" stroke="hsl(var(--social-blue))" strokeWidth="1.5" strokeOpacity="0.5"></path>
                    <path d="M295 295 C 200 295, 200 230, 180 215" stroke="hsl(var(--social-blue))" strokeWidth="1.5" strokeOpacity="0.5"></path>
                    <path d="M295 305 C 200 305, 200 380, 220 400" stroke="hsl(var(--social-blue))" strokeWidth="1.5" strokeOpacity="0.5"></path>
                    <path d="M220 400 C 220 440, 280 440, 300 440" stroke="hsl(var(--social-blue))" strokeWidth="1.5" strokeOpacity="0.5"></path>
                    <path d="M420 190 C 470 190, 470 140, 490 130" stroke="hsl(var(--social-blue))" strokeWidth="1.5" strokeOpacity="0.5"></path>
                  </svg>
                </div>

                {/* Central Monitor */}
                <div className="relative z-10 w-48 h-32 bg-video-black/50 backdrop-blur-md rounded-lg p-2 border border-social-orange/50 shadow-[0_0_30px_rgba(255,125,59,0.3)]">
                  <div className="w-full h-full rounded-md flex items-center justify-center bg-gradient-to-br from-social-orange/30 to-social-orange/10">
                     <div className="w-10 h-10 bg-social-orange rounded-md flex items-center justify-center">
                        <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-2 bg-video-black/50 border-x border-b border-social-orange/50 rounded-b-md"></div>
                </div>

                {/* Onboarding Card */}
                <div className="absolute top-16 right-0 z-10 w-44 bg-video-black/50 backdrop-blur-md rounded-lg p-3 border border-social-orange/50 shadow-[0_0_20px_rgba(255,125,59,0.2)]">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-social-orange rounded-sm flex items-center justify-center">
                      <Play className="w-3 h-3 text-white fill-white" />
                    </div>
                    <span className="font-medium text-sm">Onboarding</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 w-3/4 bg-social-blue/30 rounded-full"></div>
                    <div className="h-2 w-full bg-social-blue/30 rounded-full"></div>
                  </div>
                </div>
                
                {/* Checkmark Card */}
                <div className="absolute top-24 left-24 z-10 w-24 h-16 bg-video-black/50 backdrop-blur-md rounded-lg p-3 border border-social-orange/50 shadow-[0_0_20px_rgba(255,125,59,0.2)] flex items-center justify-center">
                   <Check className="w-8 h-8 text-social-orange" />
                </div>

                {/* Video Item Card */}
                <div className="absolute top-40 left-8 z-10 w-24 h-16 bg-video-black/50 backdrop-blur-md rounded-lg p-3 border border-social-blue/50 shadow-[0_0_20px_rgba(59,130,246,0.2)] flex items-center justify-center">
                  <div className="w-8 h-8 bg-social-blue rounded-md flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>

                {/* List Card */}
                <div className="absolute bottom-32 left-16 z-10 w-32 h-20 bg-video-black/50 backdrop-blur-md rounded-lg p-3 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)] flex items-center space-x-3">
                  <span className="text-3xl font-bold text-red-400">1</span>
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 w-full bg-red-400/30 rounded-full"></div>
                    <div className="h-2.5 w-3/4 bg-red-400/30 rounded-full"></div>
                  </div>
                </div>

                {/* FAQs Card */}
                <div className="absolute bottom-16 left-48 z-10 w-28 bg-video-black/50 backdrop-blur-md rounded-lg p-3 border border-social-purple/50 shadow-[0_0_20px_rgba(151,71,255,0.2)] flex items-center space-x-2">
                  <div className="flex flex-col space-y-1">
                    <div className="w-2.5 h-2.5 bg-social-purple/50 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-social-purple/50 rounded-full"></div>
                  </div>
                  <span className="font-medium text-sm">FAQs</span>
                </div>

                {/* Playlist Card */}
                <div className="absolute bottom-20 right-8 z-10 w-36 bg-video-black/50 backdrop-blur-md rounded-lg p-3 border border-social-purple/50 shadow-[0_0_20px_rgba(151,71,255,0.2)] flex items-center space-x-3">
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 w-full bg-social-purple/30 rounded-full"></div>
                    <div className="h-2.5 w-3/4 bg-social-purple/30 rounded-full"></div>
                  </div>
                  <div className="w-8 h-8 bg-social-purple rounded-full flex items-center justify-center">
                    <Play className="w-3 h-3 text-white fill-white" />
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
