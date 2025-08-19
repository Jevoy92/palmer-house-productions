
import { useState } from "react";
import { ContactWizard } from "./ContactWizard";

export const Hero = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const handleExplorePackages = () => {
    window.location.href = '/video-packages';
  };

  const handleGetStarted = () => {
    setIsWizardOpen(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-cinematic-charcoal overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 md:left-10 w-16 h-16 md:w-32 md:h-32 gradient-cinematic-primary rounded-full opacity-20 animate-float-gentle"></div>
        <div className="absolute top-40 right-4 md:right-20 w-12 h-12 md:w-24 md:h-24 gradient-cinematic-secondary rounded-full opacity-30 animate-float-gentle" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 md:w-40 md:h-40 gradient-cinematic-accent rounded-full opacity-15 animate-float-gentle" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-4 md:right-10 w-14 h-14 md:w-28 md:h-28 gradient-cinematic-primary rounded-full opacity-25 animate-float-gentle" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <div className="inline-block px-4 py-2.5 glass-card text-cinematic-glow font-semibold text-sm sm:text-base mb-4 sm:mb-6 animate-fade-blur-in">
            Business Systems & Process Documentation
          </div>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black mb-6 sm:mb-8 tracking-tight leading-[1.1] px-2 text-video-white animate-fade-blur-in" style={{animationDelay: '0.1s'}}>
          Creative studio for
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          <span className="bg-gradient-to-r from-cinematic-violet to-cinematic-indigo bg-clip-text text-transparent">founders</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-cinematic-glow mb-8 sm:mb-10 font-medium max-w-4xl mx-auto leading-relaxed px-2 animate-fade-blur-in" style={{animationDelay: '0.2s'}}>
          Systemized video that saves time, cuts costs, and scales your brand.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 sm:mb-20 px-4 animate-fade-blur-in" style={{animationDelay: '0.3s'}}>
          <button 
            onClick={handleExplorePackages}
            className="w-full sm:w-auto px-8 py-4 gradient-cinematic-primary text-video-white font-bold text-base sm:text-lg rounded-xl btn-cinematic min-h-[52px] flex items-center justify-center video-shadow-lg"
          >
            View Services
          </button>
          <button 
            onClick={handleGetStarted}
            className="w-full sm:w-auto px-8 py-4 glass-card text-cinematic-glow font-bold text-base sm:text-lg rounded-xl btn-cinematic min-h-[52px] flex items-center justify-center border border-cinematic-violet/30 hover:border-cinematic-violet/60"
          >
            Book Strategy Call
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-6 md:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-6 md:w-2 md:h-12 gradient-cinematic-primary rounded-full"></div>
      </div>

      <ContactWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} />
    </section>
  );
};
