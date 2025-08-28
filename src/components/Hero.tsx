
import { useState } from "react";
import { ContactWizard } from "./ContactWizard";
import { QuestionSequence } from "./QuestionSequence";

export const Hero = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);

  const handleExplorePackages = () => {
    window.location.href = '/video-packages';
  };

  const handleGetStarted = () => {
    setIsWizardOpen(true);
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
      
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-7xl mx-auto">
        {!showMainContent ? (
          <QuestionSequence onComplete={() => setShowMainContent(true)} />
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 sm:mb-20 px-4 animate-fade-in">
              <button 
                onClick={handleExplorePackages}
                className="w-full sm:w-auto px-8 py-4 gradient-social-1 text-white font-bold text-base sm:text-lg rounded-xl hover:scale-105 transition-all duration-300 video-shadow-lg min-h-[52px] flex items-center justify-center"
              >
                Build My Content System
              </button>
              <button 
                onClick={handleGetStarted}
                className="w-full sm:w-auto px-8 py-4 bg-video-white border-2 border-social-purple text-corporate-dark font-bold text-base sm:text-lg rounded-xl hover:bg-social-purple hover:text-white transition-all duration-300 video-shadow min-h-[52px] flex items-center justify-center"
              >
                Book Strategy Call
              </button>
            </div>
          </>
        )}
      </div>
      
      <div className="absolute bottom-6 md:bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="w-1 h-6 md:w-2 md:h-12 gradient-social-1 rounded-full animate-bounce"></div>
      </div>

      <ContactWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} />
    </section>
  );
};
