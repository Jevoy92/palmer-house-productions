import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Video,
  Sparkles,
  Users,
  Target,
  TrendingUp
} from 'lucide-react';

type Answer = {
  sectionId: number;
  questionId: number;
  value: string | number;
};

type QuizSection = {
  id: number;
  title: string;
  icon: any;
  questions: {
    id: number;
    question: string;
    type: 'toggle' | 'buttons' | 'scale';
    options?: string[];
  }[];
};

const sections: QuizSection[] = [
  {
    id: 1,
    title: "Short-Form Content Strategy",
    icon: Video,
    questions: [
      {
        id: 1,
        question: "Do you post consistently on social media?",
        type: "buttons",
        options: ["No", "Partially", "Yes"]
      },
      {
        id: 2,
        question: "Do you have a content calendar for Reels/TikToks?",
        type: "buttons",
        options: ["No", "Partially", "Yes"]
      },
      {
        id: 3,
        question: "Are you tracking engagement on your short-form videos?",
        type: "toggle",
        options: ["No", "Yes"]
      }
    ]
  },
  {
    id: 2,
    title: "Content Creation Resources",
    icon: Sparkles,
    questions: [
      {
        id: 1,
        question: "Do you have equipment for filming content?",
        type: "buttons",
        options: ["No", "Partially", "Yes"]
      },
      {
        id: 2,
        question: "Is someone on your team comfortable being on camera?",
        type: "toggle",
        options: ["No", "Yes"]
      },
      {
        id: 3,
        question: "Do you have video editing capabilities?",
        type: "buttons",
        options: ["No", "Partially", "Yes"]
      }
    ]
  },
  {
    id: 3,
    title: "Time & Team Capacity",
    icon: Users,
    questions: [
      {
        id: 1,
        question: "Can you dedicate 3-5 hours weekly to content?",
        type: "toggle",
        options: ["No", "Yes"]
      },
      {
        id: 2,
        question: "Do you have team buy-in for regular content creation?",
        type: "buttons",
        options: ["No", "Partially", "Yes"]
      },
      {
        id: 3,
        question: "How quickly do you need to see results?",
        type: "scale",
        options: ["Immediately", "1 month", "3 months", "6+ months"]
      }
    ]
  },
  {
    id: 4,
    title: "Goals & Commitment",
    icon: Target,
    questions: [
      {
        id: 1,
        question: "Is building a content library a priority for your business?",
        type: "toggle",
        options: ["No", "Yes"]
      },
      {
        id: 2,
        question: "Are you ready to invest in professional content production?",
        type: "buttons",
        options: ["No", "Maybe", "Yes"]
      },
      {
        id: 3,
        question: "Do you understand the long-term value of consistent posting?",
        type: "toggle",
        options: ["No", "Yes"]
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
        question: "What's your monthly budget for content creation?",
        type: "scale",
        options: ["Under $500", "$500-$1,500", "$1,500-$3,000", "$3,000+"]
      },
      {
        id: 2,
        question: "Are you willing to batch-create content (30+ videos in one day)?",
        type: "toggle",
        options: ["No", "Yes"]
      },
      {
        id: 3,
        question: "Do you see content creation as an ongoing investment?",
        type: "buttons",
        options: ["No", "Unsure", "Yes"]
      }
    ]
  }
];

export const ReelPalQuiz = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: number, value: string | number) => {
    const newAnswers = answers.filter(
      a => !(a.sectionId === sections[currentSection].id && a.questionId === questionId)
    );
    newAnswers.push({
      sectionId: sections[currentSection].id,
      questionId,
      value
    });
    setAnswers(newAnswers);
  };

  const getAnswer = (questionId: number) => {
    return answers.find(
      a => a.sectionId === sections[currentSection].id && a.questionId === questionId
    )?.value;
  };

  const isSectionComplete = () => {
    return sections[currentSection].questions.every(q => 
      answers.some(a => a.sectionId === sections[currentSection].id && a.questionId === q.id)
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

  const calculateScore = () => {
    // Simple scoring system - could be made more sophisticated
    let score = 0;
    answers.forEach(answer => {
      if (typeof answer.value === 'number') {
        score += answer.value;
      } else if (typeof answer.value === 'string') {
        // Give points based on option index
        const section = sections.find(s => s.id === answer.sectionId);
        const question = section?.questions.find(q => q.id === answer.questionId);
        const optionIndex = question?.options?.indexOf(answer.value) ?? 0;
        score += optionIndex;
      }
    });
    return score;
  };

  const getRecommendation = () => {
    const score = calculateScore();
    const maxScore = sections.reduce((acc, section) => 
      acc + section.questions.length * 4, 0
    );
    const percentage = (score / maxScore) * 100;

    if (percentage < 30) {
      return {
        level: "Starter Kit Perfect",
        title: "Start with DIY Foundations",
        description: "You're at the beginning of your content journey. I recommend starting with my DIY Starter Kit to build confidence and basic skills before investing in full production.",
        recommendation: "DIY Starter Kit ($97)",
        action: "Get the Starter Kit",
        link: "https://payhip.com/b/u8wvz",
        icon: "🎬",
        color: "orange"
      };
    } else if (percentage < 50) {
      return {
        level: "Ready for Guidance",
        title: "Guided Content Session",
        description: "You have some experience but need structure. A 5-Video Starter Session will give you professional content plus learn-as-you-go guidance.",
        recommendation: "5-Video Starter Session ($1,500)",
        action: "Book Starter Session",
        link: "/contact",
        icon: "🎥",
        color: "purple"
      };
    } else if (percentage < 70) {
      return {
        level: "Batch Production Ready",
        title: "30 Reels in a Day",
        description: "You're ready to scale! With your resources and commitment level, creating a content bank with the 30 Reels package will set you up for consistent posting.",
        recommendation: "30 Reels in a Day ($3,000)",
        action: "Book Your Shoot",
        link: "/contact",
        icon: "🚀",
        color: "green"
      };
    } else {
      return {
        level: "Advanced Strategy",
        title: "Monthly Content System",
        description: "You're operating at a high level and need ongoing support. A monthly partnership with full content production and strategy is your best path forward.",
        recommendation: "Monthly Content Partnership (Custom)",
        action: "Schedule Strategy Call",
        link: "/contact",
        icon: "✨",
        color: "blue"
      };
    }
  };

  const currentSectionData = sections[currentSection];
  const progress = ((currentSection + 1) / sections.length) * 100;

  if (showResults) {
    const recommendation = getRecommendation();
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-10 lg:p-12">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{recommendation.icon}</div>
            <div className="inline-block bg-orange-100 text-orange-700 font-semibold px-6 py-2 rounded-full mb-4">
              {recommendation.level}
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-800">{recommendation.title}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {recommendation.description}
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-purple-50 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">My Recommendation</h3>
            <p className="text-center text-xl font-semibold mb-6 text-gray-700">{recommendation.recommendation}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {recommendation.link.startsWith('http') ? (
                <a 
                  href={recommendation.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-3.5 rounded-full transition-colors shadow-lg shadow-orange-500/30 text-center"
                >
                  {recommendation.action} →
                </a>
              ) : (
                <Link 
                  to={recommendation.link}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-3.5 rounded-full transition-colors shadow-lg shadow-orange-500/30 text-center"
                >
                  {recommendation.action} →
                </Link>
              )}
              <button 
                onClick={() => {
                  setShowResults(false);
                  setCurrentSection(0);
                  setAnswers([]);
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-semibold px-10 py-3.5 rounded-full transition-colors"
              >
                Retake Quiz
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>Not sure? <Link to="/contact" className="text-orange-500 hover:underline font-semibold">Schedule a free discovery call</Link> to discuss your unique situation.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Progress Header */}
      <div className="px-8 mb-4">
        <div className="flex justify-between items-center text-gray-500 font-medium mb-2">
          <span>Section {currentSection + 1} of {sections.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-teal-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex gap-8 items-start">
        {/* Main Quiz Card */}
        <div className="flex-grow max-w-3xl">
          <div className="bg-white rounded-3xl shadow-2xl p-10 lg:p-12">
            {/* Section Header */}
            <div className="flex items-center space-x-4 mb-8">
              <h1 className="text-3xl font-bold text-gray-800">{currentSectionData.title}</h1>
              <currentSectionData.icon className="w-8 h-8 text-teal-500" />
            </div>

            {/* Questions */}
            <div className="space-y-8">
              {currentSectionData.questions.map((question) => (
                <div key={question.id} className="py-4 border-b border-gray-200 last:border-b-0">
                  <p className="text-lg text-gray-600 mb-4">{question.question}</p>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                  {question.type === 'buttons' && question.options && (
                    <>
                      {question.options.map((option) => {
                        const isSelected = getAnswer(question.id) === option;
                        return (
                          <button
                            key={option}
                            onClick={() => handleAnswer(question.id, option)}
                            className={`font-semibold px-6 py-2 rounded-full transition-colors ${
                              isSelected 
                                ? 'bg-teal-500 text-white' 
                                : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </>
                  )}

                  {question.type === 'toggle' && question.options && (
                    <div className="flex items-center space-x-3">
                      <span className={`text-lg font-semibold ${getAnswer(question.id) === 'Yes' ? 'text-teal-600' : 'text-gray-400'}`}>
                        {(getAnswer(question.id) as string) || 'No'}
                      </span>
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            className="sr-only" 
                            checked={getAnswer(question.id) === 'Yes'}
                            onChange={(e) => handleAnswer(question.id, e.target.checked ? 'Yes' : 'No')}
                          />
                          <div className={`block w-16 h-9 rounded-full relative transition-colors ${
                            getAnswer(question.id) === 'Yes' ? 'bg-teal-500' : 'bg-gray-200'
                          }`}>
                            <div className={`absolute top-1 left-1 bg-white w-7 h-7 rounded-full transition-transform ${
                              getAnswer(question.id) === 'Yes' ? 'transform translate-x-7' : ''
                            }`}></div>
                          </div>
                        </div>
                      </label>
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
                                ? 'bg-teal-500 text-white'
                                : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
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
            <div className="mt-12 flex items-center justify-center space-x-4">
              <button
                onClick={handlePrevious}
                disabled={currentSection === 0}
                className="bg-gray-200 text-gray-600 font-semibold px-10 py-3.5 rounded-full hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={!isSectionComplete()}
                className="bg-teal-500 text-white font-semibold px-10 py-3.5 rounded-full hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentSection === sections.length - 1 ? 'See Results' : 'Next Section'}
              </button>
            </div>
          </div>
        </div>

        {/* Character Illustration - Desktop Only */}
        <div className="hidden lg:block w-[450px] h-[700px] flex-shrink-0 -mt-16 ml-8">
          <img 
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8d044c2b51-0865f11dd64a7ebb4c23.png"
            alt="Reel Pal character illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};
