
import { useState, useEffect } from "react";

export const Hero = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showHeadline, setShowHeadline] = useState(false);
  const [fadeOutQuestions, setFadeOutQuestions] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);

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
    window.location.href = '/video-packages';
  };

  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      const timer = setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setFadeOutQuestions(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, questions.length]);

  useEffect(() => {
    if (fadeOutQuestions) {
      const timer = setTimeout(() => {
        setShowHeadline(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [fadeOutQuestions]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const newOpacity = Math.max(0, 1 - (scrollY / (windowHeight * 0.8)));
      setScrollOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Fixed 4-Color Background Bars */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        <div className="w-full h-full flex">
          <div className="w-1/4 h-full bg-pal-orange transition-all duration-700 ease-in-out"></div>
          <div className="w-1/4 h-full bg-pal-purple transition-all duration-700 ease-in-out"></div>
          <div className="w-1/4 h-full bg-pal-green transition-all duration-700 ease-in-out"></div>
          <div className="w-1/4 h-full bg-pal-blue transition-all duration-700 ease-in-out"></div>
        </div>
      </div>

      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden z-10"
        style={{ opacity: scrollOpacity }}
      >
      
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-7xl mx-auto">
        {!showHeadline ? (
          <div className={`flex flex-col items-center justify-center min-h-[60vh] transition-opacity duration-700 ${fadeOutQuestions ? 'opacity-0' : 'opacity-100'}`}>
            {questions.map((question, index) => (
              <div
                key={index}
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white mb-4 ${
                  index <= currentQuestionIndex ? 'question-reveal' : 'opacity-0'
                }`}
                style={{
                  animationDelay: `${index * 0.3}s`
                }}
              >
                {question}
              </div>
            ))}
          </div>
        ) : (
          <div className={`transition-opacity duration-700 ${showHeadline ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/20 max-w-5xl mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-semibold mb-6 sm:mb-8 tracking-tight leading-[1.1] text-corporate-dark">
                We turn those questions into a{" "}
                <span className="bg-gradient-to-r from-pal-orange to-pal-purple bg-clip-text text-transparent">Content System</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-corporate-gray mb-8 sm:mb-10 font-medium leading-relaxed">
                One shoot day. Months of reusable video.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <button 
                  onClick={handleGetStarted}
                  className="w-full sm:w-auto px-8 py-4 bg-pal-orange text-white font-bold text-base sm:text-lg rounded-xl hover:scale-105 hover:bg-pal-orange/90 transition-all duration-300 shadow-lg min-h-[52px] flex items-center justify-center"
                >
                  Build My Content System
                </button>
                <button 
                  onClick={handleExplorePackages}
                  className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-pal-purple text-pal-purple font-bold text-base sm:text-lg rounded-xl hover:bg-pal-purple hover:text-white transition-all duration-300 shadow-md min-h-[52px] flex items-center justify-center"
                >
                  Book Strategy Call
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </section>
    </div>
  );
};
