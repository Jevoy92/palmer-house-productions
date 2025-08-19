
import { useState, useEffect } from "react";
import { ContactWizard } from "./ContactWizard";
import heroStatue from "../assets/hero-statue-camera.jpg";

export const Hero = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const handleSeePricing = () => {
    window.location.href = '/video-packages';
  };

  const handleGetStarted = () => {
    setIsWizardOpen(true);
  };

  useEffect(() => {
    // Initialize GSAP animations
    if (typeof window !== 'undefined') {
      import('../lib/gsap').then(({ heroParallax, revealElements }) => {
        revealElements('.hero-content > *', { stagger: 0.1, delay: 0.2 });
        heroParallax('.hero-image', 0.3);
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen bg-cinematic-charcoal overflow-hidden">
      {/* Background "PALMER HOUSE" Text */}
      <div className="absolute inset-0 flex items-center justify-end pr-8 lg:pr-16">
        <div className="text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem] font-black text-cinematic-charcoal/20 select-none pointer-events-none leading-none tracking-tighter">
          PALMER<br />HOUSE
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 md:left-10 w-16 h-16 md:w-24 md:h-24 gradient-cinematic-primary rounded-full opacity-10 animate-float-gentle"></div>
        <div className="absolute bottom-32 right-1/4 w-20 h-20 md:w-32 md:h-32 gradient-cinematic-accent rounded-full opacity-15 animate-float-gentle" style={{animationDelay: '3s'}}></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-16 items-center">
            {/* Left Content - 60% */}
            <div className="lg:col-span-3 hero-content">
              {/* Service Categories */}
              <div className="mb-8 animate-fade-blur-in">
                <div className="flex flex-col gap-1 mb-6">
                  <span className="text-sm font-medium text-cinematic-glow/70 tracking-wide">Content systems</span>
                  <span className="text-sm font-medium text-cinematic-glow/70 tracking-wide">On-camera coaching</span>
                  <span className="text-sm font-medium text-cinematic-glow/70 tracking-wide">Cinematic production</span>
                  <span className="text-sm font-medium text-cinematic-glow/70 tracking-wide">Subscription fulfillment</span>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 tracking-tight leading-[0.95] text-video-white animate-fade-blur-in" style={{animationDelay: '0.1s'}}>
                Creative video systems for
                <br />
                <span className="bg-gradient-to-r from-cinematic-violet to-cinematic-indigo bg-clip-text text-transparent">bold founders</span>
              </h1>
              
              <div className="animate-fade-blur-in" style={{animationDelay: '0.2s'}}>
                <button 
                  onClick={handleSeePricing}
                  className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base rounded-full transition-colors duration-200"
                >
                  See pricing
                </button>
              </div>
            </div>

            {/* Right Content - 40% */}
            <div className="lg:col-span-2 hero-image animate-fade-blur-in" style={{animationDelay: '0.4s'}}>
              <div className="relative">
                <div className="aspect-[4/5] relative overflow-hidden rounded-2xl video-shadow-lg mb-6">
                  <img
                    src={heroStatue}
                    alt="Classical marble statue representing creative vision and leadership"
                    className="w-full h-full object-cover transform hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cinematic-charcoal/20 to-transparent"></div>
                </div>
                
                {/* Right-side descriptive text */}
                <div className="text-cinematic-glow/80 text-sm leading-relaxed">
                  <p>
                    We partner with growth-stage brands who understand that premium video content is non-negotiable for sustainable growth.
                  </p>
                </div>
                
                {/* Floating accent element */}
                <div className="absolute -top-4 -right-4 w-32 h-32 gradient-cinematic-secondary rounded-full opacity-20 animate-float-gentle" style={{animationDelay: '2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} />
    </section>
  );
};
