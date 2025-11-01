import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Camera,
  Film,
  Award,
  Star,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Check,
  Users
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import placeholderImage from '@/assets/pals/female-spotlight-pal.png';

type Answer = {
  sectionId: number;
  questionId: number;
  value: string | number | string[];
};

type QuizSection = {
  id: number;
  title: string;
  icon: any;
  questions: {
    id: number;
    question: string;
    type: 'toggle' | 'buttons' | 'scale' | 'emoji' | 'slider' | 'checkbox' | 'cards';
    options?: string[];
    min?: number;
    max?: number;
  }[];
};

const sections: QuizSection[] = [
  {
    id: 1,
    title: "Production Quality Goals",
    icon: Camera,
    questions: [
      {
        id: 1,
        question: "How satisfied are you with your current video production quality?",
        type: 'emoji',
        options: ['😢', '😕', '😐', '🙂', '😁']
      },
      {
        id: 2,
        question: "Do you have professional video equipment or access to it?",
        type: 'toggle',
        options: ['No', 'Yes']
      },
      {
        id: 3,
        question: "On a scale of 1-10, how cinematic do you want your videos to be?",
        type: 'slider',
        min: 0,
        max: 10
      }
    ]
  },
  {
    id: 2,
    title: "Storytelling & Documentation",
    icon: Film,
    questions: [
      {
        id: 1,
        question: "Which stories do you need to capture? (Select all that apply)",
        type: 'checkbox',
        options: ['Customer Wins', 'Team Culture', 'Product Launches', 'Case Studies', 'Behind the Scenes']
      },
      {
        id: 2,
        question: "How often do you capture customer success stories?",
        type: 'buttons',
        options: ['Never', 'Rarely', 'Sometimes', 'Often']
      },
      {
        id: 3,
        question: "How important is emotional connection in your brand videos?",
        type: 'slider',
        min: 0,
        max: 10
      }
    ]
  },
  {
    id: 3,
    title: "Team & Resources",
    icon: Users,
    questions: [
      {
        id: 1,
        question: "How many days per quarter can you dedicate to production?",
        type: 'scale',
        options: ['1 day', '2-3 days', '4-5 days', '6+ days']
      },
      {
        id: 2,
        question: "What\'s your biggest challenge with premium production?",
        type: 'cards',
        options: ['Budget Constraints', 'Technical Complexity', 'Coordination', 'Creative Direction']
      },
      {
        id: 3,
        question: "Do you have someone who can coordinate video shoots?",
        type: 'toggle',
        options: ['No', 'Yes']
      }
    ]
  },
  {
    id: 4,
    title: "Brand Visibility & Impact",
    icon: Award,
    questions: [
      {
        id: 1,
        question: "Rate how visible your wins and achievements currently are",
        type: 'emoji',
        options: ['😴', '😐', '🤔', '😊', '🔥']
      },
      {
        id: 2,
        question: "When do you want to start capturing premium stories?",
        type: 'buttons',
        options: ['Not Yet', 'Soon', 'Right Away']
      },
      {
        id: 3,
        question: "Is showcasing your brand story a strategic priority?",
        type: 'toggle',
        options: ['No', 'Yes']
      }
    ]
  },
  {
    id: 5,
    title: "Budget & Investment",
    icon: TrendingUp,
    questions: [
      {
        id: 1,
        question: "What\'s your budget per production project?",
        type: 'scale',
        options: ['Under $2,000', '$2,000-$5,000', '$5,000-$10,000', '$10,000+']
      },
      {
        id: 2,
        question: "How important is production value for your brand perception?",
        type: 'slider',
        min: 0,
        max: 10
      },
      {
        id: 3,
        question: "Are you ready to invest in cinematic production?",
        type: 'buttons',
        options: ['No', 'Considering', 'Yes']
      }
    ]
  }
];

const characterConfigs = [
  {
    image: placeholderImage,
    tip: "Quality production builds trust instantly!"
  },
  {
    image: placeholderImage,
    tip: "Stories sell better than features ever will!"
  },
  {
    image: placeholderImage,
    tip: "Plan your shoot day like a military operation!"
  },
  {
    image: placeholderImage,
    tip: "Show don't tell - let your work speak!"
  },
  {
    image: placeholderImage,
    tip: "Premium content = premium perception!"
  }
];

export const SpotlightPalQuiz = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const handleAnswer = (questionId: number, value: string | number | string[]) => {
    const newAnswer: Answer = {
      sectionId: sections[currentSection].id,
      questionId,
      value
    };
    
    setAnswers(prev => {
      const filtered = prev.filter(
        a => !(a.sectionId === newAnswer.sectionId && a.questionId === newAnswer.questionId)
      );
      return [...filtered, newAnswer];
    });
  };

  const getAnswer = (questionId: number): string | number | string[] | undefined => {
    const answer = answers.find(
      a => a.sectionId === sections[currentSection].id && a.questionId === questionId
    );
    return answer?.value;
  };

  const isSectionComplete = () => {
    const currentQuestions = sections[currentSection].questions;
    return currentQuestions.every(question => 
      answers.some(a => a.sectionId === sections[currentSection].id && a.questionId === question.id)
    );
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  // Auto-initialize slider questions with their default value
  useEffect(() => {
    sections[currentSection].questions.forEach(question => {
      if (question.type === 'slider' && question.min !== undefined && question.max !== undefined) {
        const hasAnswer = answers.some(
          a => a.sectionId === sections[currentSection].id && a.questionId === question.id
        );
        if (!hasAnswer) {
          const defaultValue = Math.round((question.min + question.max) / 2);
          handleAnswer(question.id, defaultValue);
        }
      }
    });
  }, [currentSection]);

  useEffect(() => {
    if (showResults) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#a855f7', '#c084fc', '#e9d5ff']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#a855f7', '#c084fc', '#e9d5ff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [showResults]);

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 text-center">
          <Trophy className="w-20 h-20 mx-auto mb-6 text-purple-500 animate-scale-in" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Your Spotlight Strategy Assessment Complete!</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Thanks for completing the quiz! Based on your answers, let's discuss how cinematic production can showcase your brand and build trust through powerful storytelling.
          </p>
          <Link to="/contact" className="inline-block bg-purple-500 text-white font-semibold px-8 py-4 rounded-full hover:bg-purple-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
            Book Strategy Call →
          </Link>
        </div>
      </div>
    );
  }

  const currentSectionData = sections[currentSection];
  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="relative bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">
            Think You Have What It Takes?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Take my quiz and find out if you're ready for cinematic production! Discover your production readiness and get personalized recommendations.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Section {currentSection + 1} of {sections.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-purple-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          {/* Quiz Card */}
          <div className="w-full md:flex-1 bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-gray-100">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-500 flex items-center justify-center flex-shrink-0">
                <currentSectionData.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">{currentSectionData.title}</h3>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {currentSectionData.questions.map((question) => (
                <div key={question.id} className="pb-6 sm:pb-8 border-b border-gray-100 last:border-0">
                  <p className="text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6">{question.question}</p>
                  
                  <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                    {question.type === 'emoji' && question.options && (
                      <>
                        {question.options.map((emoji) => {
                          const isSelected = getAnswer(question.id) === emoji;
                          return (
                            <button
                              key={emoji}
                              onClick={() => handleAnswer(question.id, emoji)}
                              className={`text-4xl sm:text-5xl p-2 sm:p-3 rounded-full transition-all ${
                                isSelected 
                                  ? 'bg-purple-100 scale-110 sm:scale-125 ring-4 ring-purple-500' 
                                  : 'hover:bg-gray-100 hover:scale-105 sm:hover:scale-110'
                              }`}
                            >
                              {emoji}
                            </button>
                          );
                        })}
                      </>
                    )}

                    {question.type === 'toggle' && question.options && (
                      <div className="flex gap-3 w-full max-w-md mx-auto">
                        {question.options.map((option) => {
                          const isSelected = getAnswer(question.id) === option;
                          return (
                            <button
                              key={option}
                              onClick={() => handleAnswer(question.id, option)}
                              className={`flex-1 py-3 rounded-full font-semibold transition-colors ${
                                isSelected
                                  ? 'bg-purple-500 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {question.type === 'slider' && question.min !== undefined && question.max !== undefined && (
                      <div className="w-full max-w-md mx-auto">
                        <input
                          type="range"
                          min={question.min}
                          max={question.max}
                          step={1}
                          value={(getAnswer(question.id) as number) ?? Math.round((question.min + question.max) / 2)}
                          onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
                          style={{
                            background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${((((getAnswer(question.id) as number) ?? Math.round((question.min + question.max) / 2)) - question.min) / (question.max - question.min)) * 100}%, #e5e7eb ${((((getAnswer(question.id) as number) ?? Math.round((question.min + question.max) / 2)) - question.min) / (question.max - question.min)) * 100}%, #e5e7eb 100%)`
                          }}
                          className="w-full h-3 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-purple-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>1</span>
                          <span className="text-2xl font-bold text-purple-600">{(getAnswer(question.id) as number) ?? Math.round((question.min + question.max) / 2)}</span>
                          <span>10</span>
                        </div>
                      </div>
                    )}

                    {question.type === 'checkbox' && question.options && (
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {question.options.map((option) => {
                          const currentAnswers = (getAnswer(question.id) as string[]) || [];
                          const isSelected = currentAnswers.includes(option);
                          return (
                            <button
                              key={option}
                              onClick={() => {
                                const current = (getAnswer(question.id) as string[]) || [];
                                const updated = isSelected 
                                  ? current.filter(item => item !== option)
                                  : [...current, option];
                                handleAnswer(question.id, updated);
                              }}
                              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                                isSelected
                                  ? 'border-purple-500 bg-purple-50'
                                  : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50/50'
                              }`}
                            >
                              <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-all ${
                                isSelected ? 'bg-purple-500 border-purple-500' : 'border-gray-300'
                              }`}>
                                {isSelected && <Check className="w-4 h-4 text-white" />}
                              </div>
                              <span className={isSelected ? 'font-semibold' : ''}>{option}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {question.type === 'cards' && question.options && (
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {question.options.map((option) => {
                          const isSelected = getAnswer(question.id) === option;
                          return (
                            <button
                              key={option}
                              onClick={() => handleAnswer(question.id, option)}
                              className={`p-6 rounded-2xl border-2 transition-all hover:scale-105 ${
                                isSelected
                                  ? 'border-purple-500 bg-purple-50 shadow-lg'
                                  : 'border-gray-200 hover:border-purple-200 hover:shadow-md'
                              }`}
                            >
                              <div className={`text-4xl mb-3 ${isSelected ? 'scale-110' : ''} transition-transform`}>
                                {option === 'Budget Constraints' && '💰'}
                                {option === 'Technical Complexity' && '🔧'}
                                {option === 'Coordination' && '📅'}
                                {option === 'Creative Direction' && '🎨'}
                              </div>
                              <h4 className={`font-semibold ${isSelected ? 'text-purple-700' : 'text-gray-700'}`}>{option}</h4>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {question.type === 'buttons' && question.options && (
                      <>
                        {question.options.map((option, idx) => {
                          const isSelected = getAnswer(question.id) === option;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleAnswer(question.id, option)}
                              className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                                isSelected
                                  ? 'bg-purple-500 text-white shadow-lg'
                                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </>
                    )}

                    {question.type === 'scale' && question.options && (
                      <>
                        {question.options.map((option, idx) => {
                          const isSelected = getAnswer(question.id) === option;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleAnswer(question.id, option)}
                              className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm ${
                                isSelected
                                  ? 'bg-purple-500 text-white'
                                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                              }`}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 sm:mt-12 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              <button
                onClick={handlePrevious}
                disabled={currentSection === 0}
                className="bg-gray-200 text-gray-600 font-semibold px-6 sm:px-10 py-3 sm:py-3.5 rounded-full hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!isSectionComplete()}
                className="bg-purple-500 text-white font-semibold px-6 sm:px-10 py-3 sm:py-3.5 rounded-full hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {currentSection === sections.length - 1 ? 'See Results' : 'Next Section'}
              </button>
            </div>
          </div>

          {/* Character Illustration - Tablet and Desktop Only */}
          <div className="hidden md:flex md:flex-col md:items-center md:w-[350px] lg:w-[450px] flex-shrink-0 md:mt-4 lg:mt-8 md:ml-4 lg:ml-8">
            <img 
              src={characterConfigs[currentSection].image}
              alt="Spotlight Pal character illustration"
              className="w-full h-auto max-h-[500px] lg:max-h-[600px] object-contain animate-fade-in"
            />
            <div className="mt-3 lg:mt-4 bg-purple-50 rounded-2xl p-4 lg:p-6 border-2 border-purple-200 shadow-lg animate-scale-in">
              <p className="text-purple-800 font-semibold text-base lg:text-lg text-center">
                💡 Pro Tip: {characterConfigs[currentSection].tip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
