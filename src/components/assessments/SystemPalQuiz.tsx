import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings,
  Users,
  BookOpen,
  Database,
  Monitor,
} from 'lucide-react';
import placeholderImage from '@/assets/pals/female-system-pal.png';

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
    type: 'toggle' | 'buttons' | 'scale' | 'emoji' | 'slider';
    options?: string[];
    min?: number;
    max?: number;
  }[];
};

const sections: QuizSection[] = [
  {
    id: 1,
    title: "Training & Onboarding",
    icon: Users,
    questions: [
      {
        id: 1,
        question: "How satisfied are you with your current training process?",
        type: 'emoji',
        options: ['😢', '😕', '😐', '🙂', '😁']
      },
      {
        id: 2,
        question: "Do you have video training materials for new hires?",
        type: 'toggle',
        options: ['Yes', 'No']
      },
      {
        id: 3,
        question: "On a scale of 1-10, how documented are your processes?",
        type: 'slider',
        min: 1,
        max: 10
      }
    ]
  },
  {
    id: 2,
    title: "Knowledge Management",
    icon: BookOpen,
    questions: [
      {
        id: 4,
        question: "How often do team members ask the same questions?",
        type: 'scale',
        options: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always']
      },
      {
        id: 5,
        question: "Do you have a centralized knowledge base?",
        type: 'toggle',
        options: ['Yes', 'No']
      }
    ]
  },
  {
    id: 3,
    title: "Team Efficiency",
    icon: Monitor,
    questions: [
      {
        id: 6,
        question: "How efficient is your team at self-service learning?",
        type: 'emoji',
        options: ['😢', '😕', '😐', '🙂', '😁']
      },
      {
        id: 7,
        question: "Do you use video for internal communication?",
        type: 'toggle',
        options: ['Yes', 'No']
      }
    ]
  }
];

const characterConfigs = [
  {
    image: placeholderImage,
    tip: "Good training pays dividends forever!"
  },
  {
    image: placeholderImage,
    tip: "Document once, benefit forever!"
  },
  {
    image: placeholderImage,
    tip: "Self-service saves everyone time!"
  }
];

export const SystemPalQuiz = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);

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

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 text-center">
          <div className="text-6xl mb-6">🎓</div>
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Your System Strategy Assessment</h2>
          <p className="text-xl text-gray-600 mb-8">
            Thanks for completing the quiz! Based on your answers, let's discuss how video systems can streamline your operations.
          </p>
          <Link to="/contact" className="inline-block bg-green-500 text-white font-semibold px-8 py-4 rounded-full hover:bg-green-600 transition-colors shadow-lg">
            Book Strategy Call
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
            Take my quiz and find out if you're ready to build video systems! Discover your operational readiness and get personalized recommendations.
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
              className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          {/* Quiz Card */}
          <div className="w-full md:flex-1 bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-gray-100">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-green-500 flex items-center justify-center flex-shrink-0">
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
                                  ? 'bg-green-100 scale-110 sm:scale-125 ring-4 ring-green-500' 
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
                                  ? 'bg-green-500 text-white'
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
                            background: `linear-gradient(to right, #22c55e 0%, #22c55e ${((((getAnswer(question.id) as number) ?? Math.round((question.min + question.max) / 2)) - question.min) / (question.max - question.min)) * 100}%, #e5e7eb ${((((getAnswer(question.id) as number) ?? Math.round((question.min + question.max) / 2)) - question.min) / (question.max - question.min)) * 100}%, #e5e7eb 100%)`
                          }}
                          className="w-full h-3 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>1</span>
                          <span className="text-2xl font-bold text-green-600">{(getAnswer(question.id) as number) ?? Math.round((question.min + question.max) / 2)}</span>
                          <span>10</span>
                        </div>
                      </div>
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
                                  ? 'bg-green-500 text-white'
                                  : 'bg-green-100 text-green-700 hover:bg-green-200'
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
                className="bg-green-500 text-white font-semibold px-6 sm:px-10 py-3 sm:py-3.5 rounded-full hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {currentSection === sections.length - 1 ? 'See Results' : 'Next Section'}
              </button>
            </div>
          </div>

          {/* Character Illustration - Tablet and Desktop Only */}
          <div className="hidden md:flex md:flex-col md:items-center md:w-[350px] lg:w-[450px] flex-shrink-0 md:mt-4 lg:mt-8 md:ml-4 lg:ml-8">
            <img 
              src={characterConfigs[currentSection].image}
              alt="System Pal character illustration"
              className="w-full h-auto max-h-[500px] lg:max-h-[600px] object-contain animate-fade-in"
            />
            <div className="mt-3 lg:mt-4 bg-green-50 rounded-2xl p-4 lg:p-6 border-2 border-green-200 shadow-lg animate-scale-in">
              <p className="text-green-800 font-semibold text-base lg:text-lg text-center">
                💡 Pro Tip: {characterConfigs[currentSection].tip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
