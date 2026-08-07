import { useState, useEffect } from "react";
import { usePageTransition } from '@/components/PageTransition';
import femalePalsGroup from "@/assets/pals/female-pals-group.png";
import malePalsGroup from "@/assets/pals/male-pals-group.png";

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
    transitionTo('/dashboard');
  };

  const handleBookStrategyCall = () => {
    window.open('https://calendar.app.google/TjXSG2EjNF7KZzcJ8', '_blank', 'noopener,noreferrer');
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
      className="relative flex items-center justify-center overflow-hidden z-10 py-12"
      style={{ opacity: scrollOpacity }}
    >
      
      {/* White Card Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-[clamp(1rem,4vw,2rem)]">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-[clamp(2rem,8vw,4rem)] video-shadow-xl">
          {!showHeadline ? (
            <div className={`flex flex-col items-center justify-center min-h-[40vh] transition-opacity duration-700 ${fadeOutQuestions ? 'opacity-0' : 'opacity-100'}`}>
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
            <div className={`transition-opacity duration-700 ${showHeadline ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-center mb-8">
                <h1 className="text-[clamp(1.75rem,5vw,3.5rem)] font-display font-semibold mb-[clamp(1rem,3vw,1.5rem)] tracking-tight leading-[1.1]">
                  We turn those questions into a{" "}
                  <span className="text-gradient-1">Content System</span>
                </h1>
                
                <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-corporate-gray mb-[clamp(1.5rem,4vw,2rem)] font-medium max-w-4xl mx-auto leading-relaxed">
                  One shoot day. Months of reusable video.
                </p>
                
                <div className="flex flex-wrap gap-[clamp(1rem,3vw,1.5rem)] justify-center mb-12">
                  <button 
                    onClick={handleGetStarted}
                    className="btn-primary min-w-[200px] flex-1 max-w-[300px]"
                  >
                    Access Content OS
                  </button>
                  <button 
                    onClick={handleBookStrategyCall}
                    className="btn-secondary min-w-[200px] flex-1 max-w-[300px]"
                  >
                    Book Strategy Call
                  </button>
                </div>
              </div>

              {/* Hover Image Transition */}
              <div className="relative w-full max-w-5xl mx-auto group cursor-pointer">
                <img 
                  src={femalePalsGroup} 
                  alt="Palmer House Productions Team - Female Pals" 
                  className="w-full h-auto transition-opacity duration-500 group-hover:opacity-0"
                />
                <img 
                  src={malePalsGroup} 
                  alt="Palmer House Productions Team - Male Pals" 
                  className="absolute top-0 left-0 w-full h-auto transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
