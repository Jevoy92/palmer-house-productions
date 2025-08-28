
import { useState, useEffect } from "react";
import { ContactWizard } from "./ContactWizard";

export const Hero = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showHeadline, setShowHeadline] = useState(false);

  const questions = [
    "Where do I post?",
    "When do I post?", 
    "Which platform is worth my time?",
    "How do we train new hires faster?",
    "Why does our content die in a week?"
  ];

  const handleExplorePackages = () => {
    window.location.href = '/video-packages';
  };

  const handleGetStarted = () => {
    setIsWizardOpen(true);
  };

  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      const timer = setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowHeadline(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, questions.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-video-white overflow-hidden">
      {/* Clean white canvas with subtle floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-12 h-12 bg-social-purple rounded-full opacity-10 float-animation"></div>
        <div className="absolute top-40 right-20 w-8 h-8 bg-social-orange rounded-full opacity-10 float-animation" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-social-cyan rounded-full opacity-10 float-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-60 right-1/3 w-10 h-10 bg-social-pink rounded-full opacity-10 float-animation" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-social-blue rounded-full opacity-10 float-animation" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {!showHeadline ? (
            <div className="space-y-6 min-h-[300px] flex flex-col justify-center">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className={`text-2xl lg:text-3xl text-corporate-gray transition-all duration-500 ${
                    index <= currentQuestionIndex ? 'question-reveal opacity-100' : 'opacity-0'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.3}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {question}
                </div>
              ))}
            </div>
          ) : (
            <div className="animate-fade-in">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-black text-corporate-dark mb-6 leading-tight">
                We turn those questions into a{" "}
                <span className="text-social-purple">Content System</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-corporate-gray mb-8 max-w-3xl mx-auto leading-relaxed">
                One shoot day. Months of reusable video.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={handleGetStarted}
                  className="w-full sm:w-auto px-8 py-4 bg-corporate-dark text-video-white hover:bg-corporate-gray transition-all duration-300 transform hover:scale-105 text-lg font-semibold rounded-xl min-h-[52px] flex items-center justify-center"
                >
                  Build My Content System
                </button>
                <button 
                  onClick={handleExplorePackages}
                  className="w-full sm:w-auto px-8 py-4 border-2 border-corporate-dark text-corporate-dark hover:bg-corporate-dark hover:text-video-white transition-all duration-300 text-lg font-semibold rounded-xl min-h-[52px] flex items-center justify-center"
                >
                  Book Strategy Call
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ContactWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} />
    </section>
  );
};
