import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface QuestionSequenceProps {
  onComplete: () => void;
  className?: string;
}

const questions = [
  "Where do I post?",
  "When do I post?", 
  "Which platform is worth my time?",
  "How do we train new hires faster?",
  "Why does our content die in a week?"
];

export const QuestionSequence = ({ onComplete, className }: QuestionSequenceProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuestions, setShowQuestions] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      setIsComplete(true);
      setShowQuestions(false);
      onComplete();
      return;
    }

    // Start question sequence after initial delay
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentQuestion(prev => {
          if (prev >= questions.length - 1) {
            clearInterval(interval);
            // Hold last question briefly, then transition to headline
            setTimeout(() => {
              setShowQuestions(false);
              setTimeout(() => {
                setIsComplete(true);
                onComplete();
              }, 500);
            }, 800);
            return prev;
          }
          return prev + 1;
        });
      }, 300); // 300ms stagger

      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(startDelay);
  }, [onComplete]);

  const handleSkip = () => {
    setShowQuestions(false);
    setTimeout(() => {
      setIsComplete(true);
      onComplete();
    }, 300);
  };

  if (isComplete) {
    return (
      <div className={cn("text-center animate-scale-in", className)}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-6 sm:mb-8 tracking-tight leading-[1.1] px-2">
          We turn those questions into a
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          <span className="text-gradient-1">Content System</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-corporate-gray mb-8 sm:mb-10 font-medium max-w-4xl mx-auto leading-relaxed px-2">
          One shoot day. Months of reusable video.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("text-center min-h-[400px] flex flex-col items-center justify-center", className)}>
      {!showQuestions && (
        <div className="absolute top-6 md:top-12 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-6 md:w-2 md:h-12 gradient-social-1 rounded-full animate-bounce"></div>
        </div>
      )}
      
      {showQuestions && (
        <>
          <div className="space-y-6 max-w-2xl">
            {questions.map((question, index) => (
              <div
                key={index}
                className={cn(
                  "text-xl sm:text-2xl md:text-3xl font-display font-semibold text-corporate-dark transition-all duration-500 opacity-0",
                  index <= currentQuestion && "animate-question-reveal opacity-100"
                )}
                style={{
                  animationDelay: `${index * 300}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                {question}
              </div>
            ))}
          </div>
          
          <button
            onClick={handleSkip}
            className="mt-8 text-sm text-corporate-gray hover:text-corporate-dark transition-colors duration-200 opacity-50 hover:opacity-100"
          >
            Skip animation →
          </button>
        </>
      )}
    </div>
  );
};