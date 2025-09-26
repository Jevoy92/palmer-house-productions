
import { useState, useEffect } from "react";
import { usePageTransition } from '@/components/PageTransition';

export const Hero = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showHeadline, setShowHeadline] = useState(false);
  const [fadeOutQuestions, setFadeOutQuestions] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const { transitionTo } = usePageTransition();

  const questions = [
    "Where do I post?",
    "When do I post?", 
    "Which platform is worth my time?",
    "How do we train new hires faster?",
    "Why does our content die in a week?"
  ];

  const handleExplorePackages = () => {
    transitionTo('/video-packages');
  };

  const handleGetStarted = () => {
    transitionTo('/video-packages');
  };

  const handleBookStrategyCall = () => {
    window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer');
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden z-10"
      style={{ opacity: scrollOpacity }}
    >
      
      {/* White Card Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-[clamp(1rem,4vw,2rem)]">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-[clamp(2rem,8vw,4rem)] video-shadow-xl">
          {!showHeadline ? (
            <div className={`flex flex-col items-center justify-center min-h-[50vh] transition-opacity duration-700 ${fadeOutQuestions ? 'opacity-0' : 'opacity-100'}`}>
              {questions.map((question, index) => (
                <div
                  key={index}
                  className={`text-[clamp(1.5rem,5vw,3rem)] font-display font-medium text-corporate-dark mb-4 text-center ${
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
            <div className={`text-center transition-opacity duration-700 ${showHeadline ? 'opacity-100' : 'opacity-0'}`}>
              <h1 className="text-[clamp(1.75rem,6vw,4rem)] font-display font-semibold mb-[clamp(1.5rem,4vw,2rem)] tracking-tight leading-[1.1]">
                We turn those questions into a{" "}
                <span className="text-gradient-1">Content System</span>
              </h1>
              
              <p className="text-[clamp(1rem,3vw,1.25rem)] text-corporate-gray mb-[clamp(2rem,5vw,2.5rem)] font-medium max-w-4xl mx-auto leading-relaxed">
                One shoot day. Months of reusable video.
              </p>
              
              <div className="flex flex-wrap gap-[clamp(1rem,3vw,1.5rem)] justify-center">
                <button 
                  onClick={handleGetStarted}
                  className="btn-primary min-w-[200px] flex-1 max-w-[300px]"
                >
                  Build My Content System
                </button>
                <button 
                  onClick={handleBookStrategyCall}
                  className="btn-secondary min-w-[200px] flex-1 max-w-[300px]"
                >
                  Book Strategy Call
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
