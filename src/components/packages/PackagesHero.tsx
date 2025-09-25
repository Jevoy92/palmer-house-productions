import { useState, useEffect } from "react";

export const PackagesHero = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showHeadline, setShowHeadline] = useState(false);
  const [fadeOutQuestions, setFadeOutQuestions] = useState(false);

  const questions = [
    "Do I need social content or internal systems?",
    "Should I start with DIY or done-for-you?", 
    "What's my biggest content bottleneck right now?",
    "How do I scale video without burning budget?",
    "Which Pal fits my business best?"
  ];

  const handleBookStrategyCall = () => {
    window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078004', '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      const timer = setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 800);
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

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl mb-12">
      {!showHeadline ? (
        <div className={`flex flex-col items-center justify-center min-h-[40vh] transition-opacity duration-700 ${fadeOutQuestions ? 'opacity-0' : 'opacity-100'}`}>
          {questions.map((question, index) => (
            <div
              key={index}
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium text-corporate-dark mb-4 text-center transition-all duration-500 ${
                index <= currentQuestionIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                animationDelay: `${index * 0.8}s`
              }}
            >
              {question}
            </div>
          ))}
        </div>
      ) : (
        <div className={`text-center transition-opacity duration-700 ${showHeadline ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-block px-6 py-3 bg-pal-orange text-white font-bold text-lg mb-8 rounded-full video-shadow">
            🎬 Business Video Assets
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black mb-6 text-corporate-dark tracking-tight">
            Choose Your Perfect{" "}
            <span className="text-gradient-1">Content System</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-corporate-gray mb-8 sm:mb-10 font-medium max-w-4xl mx-auto leading-relaxed">
            Not social fluff — these are cinematic, repeatable videos that save your team time, cut training costs, and build customer trust.
          </p>
          
          <button
            onClick={handleBookStrategyCall}
            className="inline-flex items-center px-8 py-4 bg-pal-purple text-white font-bold text-lg rounded-xl hover:scale-105 transition-all duration-300 video-shadow-lg"
          >
            Book Strategy Call
          </button>
        </div>
      )}
    </div>
  );
};