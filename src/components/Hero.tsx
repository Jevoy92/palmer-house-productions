
import { useState, useEffect } from "react";
import { ContactWizard } from "./ContactWizard";
import heroStatue from "../assets/hero-statue-camera.jpg";
import { initVanillaParallax } from "../lib/vanillaParallax";

export const Hero = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const handleSeePricing = () => {
    window.location.href = '/video-packages';
  };

  const handleGetStarted = () => {
    setIsWizardOpen(true);
  };

  useEffect(() => {
    // Initialize animations
    if (typeof window !== 'undefined') {
      import('../lib/gsap').then(({ revealElements }) => {
        revealElements('.hero-content > *', { stagger: 0.1, delay: 0.2 });
      });
      
      // Initialize vanilla parallax
      initVanillaParallax();
    }
  }, []);

  return (
    <section className="hero-section relative min-h-screen overflow-hidden">
      {/* Background "PALMER HOUSE" Text */}
      <div 
        className="absolute inset-0 flex items-center justify-end pr-8 lg:pr-16"
        data-parallax 
        data-speed="-0.08"
      >
        <div className="hero-bg-text text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem] font-black text-cinematic-charcoal/35 select-none pointer-events-none leading-none tracking-tighter">
          PALMER<br />HOUSE
        </div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="hero-orb hero-orb--1 absolute top-20 left-4 md:left-10 w-32 h-32 md:w-44 md:h-44 rounded-full opacity-35"
          data-parallax 
          data-speed="-0.15"
        ></div>
        <div 
          className="hero-orb hero-orb--2 absolute bottom-32 right-1/4 w-36 h-36 md:w-52 md:h-52 rounded-full opacity-35"
          data-parallax 
          data-speed="0.2"
        ></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-center">
            {/* Left Content - 60% */}
            <div className="lg:col-span-3 hero-content" data-parallax data-speed="0.05">
              {/* Service Categories */}
              <div className="mb-8 animate-fade-blur-in">
                <div className="flex flex-col gap-1 mb-6">
                  <span className="text-sm font-medium text-cinematic-glow/70 tracking-wide">Content systems</span>
                  <span className="text-sm font-medium text-cinematic-glow/70 tracking-wide">Strategy</span>
                  <span className="text-sm font-medium text-cinematic-glow/70 tracking-wide">Cinematic production</span>
                  <span className="text-sm font-medium text-cinematic-glow/70 tracking-wide">Subscription fulfillment</span>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 tracking-tight leading-[0.95] text-video-white animate-fade-blur-in" style={{animationDelay: '0.1s'}}>
                Creative studio for
                <br />
                <span className="bg-gradient-to-r from-cinematic-violet to-cinematic-indigo bg-clip-text text-transparent">founders</span>
              </h1>
              
              <p className="text-cinematic-glow/80 text-lg mb-8 max-w-[52ch] animate-fade-blur-in" style={{animationDelay: '0.15s'}}>
                We turn video into a system that saves time, cuts costs, and scales your brand.
              </p>
              
              <div className="animate-fade-blur-in" style={{animationDelay: '0.2s'}}>
                <button 
                  onClick={handleSeePricing}
                  className="hero-cta px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base rounded-xl transition-all duration-250 hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                >
                  See pricing
                </button>
              </div>
            </div>

            {/* Right Content - 40% */}
            <div 
              className="lg:col-span-2 hero-image animate-fade-blur-in" 
              style={{animationDelay: '0.4s'}}
              data-parallax 
              data-speed="-0.12"
            >
              <div className="relative">
                <div className="hero-visual aspect-[4/5] relative overflow-hidden rounded-2xl mb-6">
                  <img
                    src={heroStatue}
                    alt="Classical marble statue representing creative vision and leadership"
                    className="w-full h-full object-cover transform hover:scale-105 transition-all duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cinematic-charcoal/20 to-transparent"></div>
                </div>
                
                {/* Right-side descriptive text */}
                <div className="text-cinematic-glow/80 text-sm leading-relaxed">
                  <p>
                    We partner with growth-stage brands to turn video into a problem-solver—building content systems that save time, drive authority, and scale trust.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} />
    </section>
  );
};
