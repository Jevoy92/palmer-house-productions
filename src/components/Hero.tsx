
import { useState } from "react";
import { ContactWizard } from "./ContactWizard";

export const Hero = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const handleExplorePackages = () => {
    window.location.href = '/video-packages';
  };

  const handleBookCall = () => {
    window.location.href = '/discovery-call';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-video-white overflow-hidden">
      {/* Dynamic Background Elements - Responsive */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 md:left-10 w-16 h-16 md:w-32 md:h-32 gradient-social-1 rounded-full opacity-20 float-animation"></div>
        <div className="absolute top-40 right-4 md:right-20 w-12 h-12 md:w-24 md:h-24 gradient-social-2 rounded-full opacity-30 float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 md:w-40 md:h-40 gradient-social-3 rounded-full opacity-15 float-animation" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-4 md:right-10 w-14 h-14 md:w-28 md:h-28 gradient-social-4 rounded-full opacity-25 float-animation" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative z-10 text-center px-4 md:px-6 max-w-6xl mx-auto">
        <div className="mb-6 md:mb-8">
          <div className="inline-block px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-social-purple to-social-pink rounded-full text-white font-semibold text-base md:text-lg mb-4 md:mb-6 video-shadow animate-pulse-social">
            🎬 Visual Storytelling Explorers
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black mb-4 md:mb-8 tracking-tight leading-tight">
          Video That Ventures
          <br />
          <span className="text-gradient-1">Beyond Content</span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-corporate-gray mb-8 md:mb-12 font-medium max-w-4xl mx-auto leading-tight">
          Short-form cinematic storytelling for <span className="text-gradient-2 font-bold">bold brands</span> ready to scale.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-16 md:mb-24">
          <button 
            onClick={handleExplorePackages}
            className="px-6 md:px-10 py-3 md:py-5 gradient-social-1 text-white font-bold text-base md:text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow-lg"
          >
            🎯 Explore Video Packages
          </button>
          <button 
            onClick={handleBookCall}
            className="px-6 md:px-10 py-3 md:py-5 bg-video-white border-2 border-social-purple text-corporate-dark font-bold text-base md:text-lg rounded-2xl hover:bg-social-purple hover:text-white transition-all duration-300 video-shadow"
          >
            🔍 Book a Discovery Call
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-6 md:bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="w-1 h-6 md:w-2 md:h-12 gradient-social-1 rounded-full animate-bounce"></div>
      </div>

      <ContactWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} />
    </section>
  );
};
