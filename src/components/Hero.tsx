
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
    <section 
      className="relative min-h-screen flex items-center justify-center bg-video-white overflow-hidden"
      style={{ opacity: scrollOpacity }}
    >
      {/* Clean white canvas with subtle floating elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-4 md:left-10 w-16 h-16 md:w-32 md:h-32 gradient-social-1 rounded-full opacity-20 float-animation"></div>
        <div className="absolute top-40 right-4 md:right-20 w-12 h-12 md:w-24 md:h-24 gradient-social-2 rounded-full opacity-30 float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 md:w-40 md:h-40 gradient-social-3 rounded-full opacity-15 float-animation" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-4 md:right-10 w-14 h-14 md:w-28 md:h-28 gradient-social-4 rounded-full opacity-25 float-animation" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-7xl mx-auto">
        {!showHeadline ? (
          <div className={`flex flex-col items-center justify-center min-h-[60vh] transition-opacity duration-700 ${fadeOutQuestions ? 'opacity-0' : 'opacity-100'}`}>
            {questions.map((question, index) => (
              <div
                key={index}
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium text-corporate-dark mb-4 ${
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-semibold mb-6 sm:mb-8 tracking-tight leading-[1.1] px-2">
              We turn those questions into a{" "}
              <span className="text-gradient-1">Content System</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-corporate-gray mb-8 sm:mb-10 font-medium max-w-4xl mx-auto leading-relaxed px-2">
              One shoot day. Months of reusable video.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 sm:mb-20 px-4">
              <button 
                onClick={handleGetStarted}
                className="w-full sm:w-auto px-8 py-4 gradient-social-1 text-white font-bold text-base sm:text-lg rounded-xl hover:scale-105 transition-all duration-300 video-shadow-lg min-h-[52px] flex items-center justify-center"
              >
                Build My Content System
              </button>
              <button 
                onClick={handleExplorePackages}
                className="w-full sm:w-auto px-8 py-4 bg-video-white border-2 border-social-purple text-corporate-dark font-bold text-base sm:text-lg rounded-xl hover:bg-social-purple hover:text-white transition-all duration-300 video-shadow min-h-[52px] flex items-center justify-center"
              >
                Book Strategy Call
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
