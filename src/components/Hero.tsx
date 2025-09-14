
import { useState, useEffect } from "react";

export const Hero = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showHeadline, setShowHeadline] = useState(false);
  const [fadeOutQuestions, setFadeOutQuestions] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [activeBar, setActiveBar] = useState(0);

  const questions = [
    "Where do I post?",
    "When do I post?", 
    "Which platform is worth my time?",
    "How do we train new hires faster?",
    "Why does our content die in a week?"
  ];

  const barColors = ['pal-orange', 'pal-purple', 'pal-green', 'pal-blue'];

  const handleExplorePackages = () => {
    window.location.href = '/video-packages';
  };

  const handleGetStarted = () => {
    window.location.href = '/video-packages';
  };

  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      setActiveBar(currentQuestionIndex % 4);
      const timer = setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 1200);
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
      {/* Dynamic 4-Color Background Bars with Question Integration */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        <div className="w-full h-full flex">
          {barColors.map((color, index) => (
            <div 
              key={index}
              className={`w-1/4 h-full bg-${color} transition-all duration-1000 ease-in-out relative overflow-hidden ${
                activeBar === index && !showHeadline ? 'brightness-110 scale-105' : 'brightness-90'
              }`}
            >
              {/* Bar Pulse Effect */}
              <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent transition-opacity duration-500 ${
                activeBar === index && !showHeadline ? 'opacity-100' : 'opacity-0'
              }`}></div>
              
              {/* Question Display in Active Bar */}
              {activeBar === index && currentQuestionIndex < questions.length && !fadeOutQuestions && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/90 text-lg md:text-xl lg:text-2xl font-display font-medium text-center px-4 transform rotate-90 whitespace-nowrap animate-fade-in">
                    {questions[currentQuestionIndex]}
                  </div>
                </div>
              )}
              
              {/* Animated Bar Lines */}
              <div className={`absolute top-0 left-1/2 w-0.5 h-full bg-white/20 transition-all duration-700 ${
                activeBar === index && !showHeadline ? 'opacity-100 animate-pulse' : 'opacity-30'
              }`}></div>
            </div>
          ))}
        </div>
        
        {/* Dynamic overlay that reduces as questions progress */}
        <div className={`absolute inset-0 transition-all duration-1000 ${
          showHeadline ? 'bg-white/85 backdrop-blur-sm' : 'bg-white/70 backdrop-blur-sm'
        }`}></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(180deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden z-10"
        style={{ opacity: scrollOpacity }}
      >
      
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-7xl mx-auto">
        {!showHeadline ? (
          <div className={`flex flex-col items-center justify-center min-h-[60vh] transition-opacity duration-700 ${fadeOutQuestions ? 'opacity-0' : 'opacity-100'}`}>
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium text-corporate-dark/30 text-center">
              Watch the bars light up with your questions...
            </div>
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
    </div>
  );
};
