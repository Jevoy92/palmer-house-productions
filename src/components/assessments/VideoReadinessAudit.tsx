import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Video,
  Target,
  Users,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Trophy,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
    title: "Strategic Foundation",
    icon: Target,
    questions: [
      {
        id: 1,
        question: "How clear are your video marketing goals?",
        type: "emoji",
        options: ["😢", "😕", "😐", "🙂", "😄"]
      },
      {
        id: 2,
        question: "Do you have a documented content strategy?",
        type: "toggle",
        options: ["No", "Yes"]
      },
      {
        id: 3,
        question: "How well do you know your target audience's video preferences?",
        type: "slider",
        min: 0,
        max: 10
      }
    ]
  },
  {
    id: 2,
    title: "Technical Readiness",
    icon: Video,
    questions: [
      {
        id: 1,
        question: "Which equipment do you currently have? (Select all that apply)",
        type: "checkbox",
        options: ["Camera/Smartphone", "Microphone", "Lighting", "Editing Software", "Tripod/Stabilizer"]
      },
      {
        id: 2,
        question: "Does your team have video production skills?",
        type: "buttons",
        options: ["No", "Some", "Yes"]
      },
      {
        id: 3,
        question: "How confident are you in your technical video capabilities?",
        type: "slider",
        min: 0,
        max: 10
      }
    ]
  },
  {
    id: 3,
    title: "Content Planning",
    icon: Users,
    questions: [
      {
        id: 1,
        question: "Do you maintain a consistent content calendar?",
        type: "toggle",
        options: ["No", "Yes"]
      },
      {
        id: 2,
        question: "How would you rate your brand guidelines for video?",
        type: "emoji",
        options: ["😢", "😕", "😐", "🙂", "😄"]
      },
      {
        id: 3,
        question: "How organized is your content approval process?",
        type: "slider",
        min: 0,
        max: 10
      }
    ]
  },
  {
    id: 4,
    title: "Distribution & Analytics",
    icon: BarChart3,
    questions: [
      {
        id: 1,
        question: "Which platforms do you actively use? (Select all)",
        type: "checkbox",
        options: ["YouTube", "LinkedIn", "Instagram", "Facebook", "Website"]
      },
      {
        id: 2,
        question: "Do you regularly analyze video performance data?",
        type: "toggle",
        options: ["No", "Yes"]
      },
      {
        id: 3,
        question: "How well can you measure video ROI?",
        type: "slider",
        min: 0,
        max: 10
      }
    ]
  }
];

const characterConfigs = [
  {
    tip: "Be honest with your answers to get the most accurate recommendations for your video journey!"
  },
  {
    tip: "Technical skills can be learned - focus on what you have and what you need!"
  },
  {
    tip: "Consistency beats perfection. A simple plan executed regularly wins every time!"
  },
  {
    tip: "Data-driven decisions lead to better video performance and higher ROI!"
  }
];

export const VideoReadinessAudit = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const handleAnswer = (questionId: number, value: string | number | string[]) => {
    setAnswers(prev => {
      const existing = prev.find(
        a => a.sectionId === sections[currentSection].id && a.questionId === questionId
      );
      
      if (existing) {
        return prev.map(a =>
          a.sectionId === sections[currentSection].id && a.questionId === questionId
            ? { ...a, value }
            : a
        );
      }
      
      return [...prev, { sectionId: sections[currentSection].id, questionId, value }];
    });
  };

  const getAnswer = (questionId: number) => {
    const answer = answers.find(
      a => a.sectionId === sections[currentSection].id && a.questionId === questionId
    );
    return answer?.value;
  };

  const isSectionComplete = () => {
    const currentSectionData = sections[currentSection];
    return currentSectionData.questions.every(q => {
      const answer = answers.find(
        a => a.sectionId === sections[currentSection].id && a.questionId === q.id
      );
      return answer !== undefined;
    });
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

  const calculateDetailedScore = () => {
    const categoryScores: { [key: string]: { score: number; max: number } } = {};
    let totalScore = 0;
    let totalMax = 0;

    sections.forEach(section => {
      let sectionScore = 0;
      let sectionMax = 0;

      section.questions.forEach(question => {
        const answer = answers.find(a => a.sectionId === section.id && a.questionId === question.id);
        const maxPoints = 10;
        sectionMax += maxPoints;

        if (answer) {
          if (question.type === 'emoji') {
            const emojiValue = question.options?.indexOf(answer.value as string) ?? 0;
            sectionScore += (emojiValue + 1) * 2;
          } else if (question.type === 'toggle') {
            sectionScore += answer.value === 'Yes' ? 10 : 0;
          } else if (question.type === 'buttons') {
            const buttonIndex = question.options?.indexOf(answer.value as string) ?? 0;
            sectionScore += buttonIndex * 5;
          } else if (question.type === 'slider') {
            sectionScore += answer.value as number;
          } else if (question.type === 'checkbox') {
            const selectedCount = (answer.value as string[]).length;
            const totalOptions = question.options?.length ?? 1;
            sectionScore += (selectedCount / totalOptions) * 10;
          }
        }
      });

      categoryScores[section.title] = { score: sectionScore, max: sectionMax };
      totalScore += sectionScore;
      totalMax += sectionMax;
    });

    const percentage = Math.round((totalScore / totalMax) * 100);

    return { categoryScores, percentage };
  };

  const getCategoryInsight = (category: string, score: number, max: number) => {
    const percentage = (score / max) * 100;
    
    if (category === "Strategic Foundation") {
      if (percentage >= 70) return "Your strategic foundation is strong. You have clear goals and understand your audience well.";
      if (percentage >= 40) return "You have some strategic elements in place. Focus on documenting your strategy and setting clearer measurable goals.";
      return "Build your foundation by defining clear video marketing objectives and researching your target audience's preferences.";
    }
    
    if (category === "Technical Readiness") {
      if (percentage >= 70) return "You have the technical capabilities to produce quality video content. Keep refining your skills!";
      if (percentage >= 40) return "You have some equipment and skills. Consider investing in key areas like audio quality and editing capabilities.";
      return "Start with basic equipment - a good smartphone, microphone, and simple editing software can get you started.";
    }
    
    if (category === "Content Planning") {
      if (percentage >= 70) return "Your content planning process is well-organized. Maintain this consistency for long-term success.";
      if (percentage >= 40) return "You have planning elements in place. Focus on creating a sustainable content calendar and approval workflow.";
      return "Establish a simple content calendar and basic brand guidelines to ensure consistency in your video output.";
    }
    
    if (category === "Distribution & Analytics") {
      if (percentage >= 70) return "You're effectively distributing content and measuring results. This data-driven approach will maximize your ROI.";
      if (percentage >= 40) return "You're using some platforms and tracking. Expand your analytics capabilities to better understand what's working.";
      return "Set up basic analytics tracking and focus on 1-2 platforms initially before expanding your distribution.";
    }
    
    return "Keep building in this area to strengthen your video marketing capabilities.";
  };

  const getActionItems = (categoryScores: { [key: string]: { score: number; max: number } }) => {
    const actions: string[] = [];
    
    Object.entries(categoryScores).forEach(([category, { score, max }]) => {
      const percentage = (score / max) * 100;
      
      if (category === "Strategic Foundation" && percentage < 70) {
        actions.push("Define SMART video marketing goals with clear metrics for success");
      }
      if (category === "Technical Readiness" && percentage < 70) {
        actions.push("Invest in essential equipment: quality microphone and basic lighting setup");
      }
      if (category === "Content Planning" && percentage < 70) {
        actions.push("Create a 30-day content calendar with consistent posting schedule");
      }
      if (category === "Distribution & Analytics" && percentage < 70) {
        actions.push("Set up Google Analytics and platform-specific tracking for all video content");
      }
    });
    
    if (actions.length === 0) {
      actions.push("Continue optimizing your video strategy with A/B testing");
      actions.push("Scale production by documenting your workflows and creating templates");
      actions.push("Explore advanced strategies like video SEO and paid promotion");
    }
    
    return actions.slice(0, 5);
  };

  const getRecommendation = (percentage: number) => {
    if (percentage >= 75) {
      return {
        level: "Video Marketing Advanced",
        title: "You're Ready for Advanced Strategies",
        description: "Your organization has excellent video marketing capabilities. You're positioned to scale, optimize, and innovate with video as a core business asset.",
        recommendation: "Advanced Video System Implementation",
        action: "Schedule Strategy Call",
        link: "/contact",
        icon: "🚀"
      };
    } else if (percentage >= 50) {
      return {
        level: "Video Marketing Developing",
        title: "Build Your Video Foundation",
        description: "You have solid fundamentals but need strategic support to maximize video ROI. Let's fill the gaps in your strategy, technical capabilities, and analytics.",
        recommendation: "Guided Video Development Program",
        action: "Get Started",
        link: "/contact",
        icon: "📈"
      };
    } else {
      return {
        level: "Video Marketing Beginner",
        title: "Start Your Video Journey",
        description: "Video marketing might be new territory, but that's where the biggest opportunity lies. Let's build your strategy from the ground up with tools and training.",
        recommendation: "Video Foundation & Training",
        action: "Begin Discovery",
        link: "/contact",
        icon: "🌱"
      };
    }
  };

  const currentSectionData = sections[currentSection];
  const progress = ((currentSection + 1) / sections.length) * 100;

  // Auto-initialize slider questions with their default value
  useEffect(() => {
    sections[currentSection].questions.forEach(question => {
      if (question.type === 'slider' && question.min !== undefined && question.max !== undefined) {
        const hasAnswer = answers.some(
          a => a.sectionId === sections[currentSection].id && a.questionId === question.id
        );
        if (!hasAnswer) {
          // Initialize with middle value
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
          colors: ['#3b82f6', '#60a5fa', '#93c5fd']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#3b82f6', '#60a5fa', '#93c5fd']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [showResults]);

  if (showResults) {
    const { percentage, categoryScores } = calculateDetailedScore();
    const recommendation = getRecommendation(percentage);
    const actionItems = getActionItems(categoryScores);

    const toggleCategory = (category: string) => {
      setOpenCategories(prev => 
        prev.includes(category) 
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
    };

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
        {/* Hero Score Section */}
        <div className="bg-blue-600 rounded-3xl shadow-2xl p-8 lg:p-12 mb-8 text-white text-center">
          <Trophy className="w-20 h-20 mx-auto mb-4 animate-scale-in" />
          <h2 className="text-5xl font-bold mb-4">Your Video Readiness Score</h2>
          <div className="text-8xl font-bold mb-4">{percentage}%</div>
          <div className="inline-block bg-white/20 px-8 py-3 rounded-full mb-6">
            <p className="text-2xl font-semibold">{recommendation.level}</p>
          </div>
          <p className="text-xl max-w-2xl mx-auto">
            {recommendation.title}
          </p>
        </div>

        {/* Category Breakdown with Insights */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 mb-8">
          <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Breakdown by Category</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(categoryScores).map(([category, scores]) => {
              const catPercentage = Math.round((scores.score / scores.max) * 100);
              const isOpen = openCategories.includes(category);
              const insight = getCategoryInsight(category, scores.score, scores.max);
              const status = catPercentage >= 70 ? 'strong' : catPercentage >= 40 ? 'developing' : 'opportunity';
              
              return (
                <Collapsible key={category} open={isOpen} onOpenChange={() => toggleCategory(category)}>
                  <div className={`border-2 rounded-xl overflow-hidden transition-colors ${
                    status === 'strong' ? 'border-green-300 bg-green-50/50' :
                    status === 'developing' ? 'border-yellow-300 bg-yellow-50/50' :
                    'border-blue-300 bg-blue-50/50'
                  }`}>
                    <CollapsibleTrigger className="w-full p-6 text-left hover:bg-white/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-lg text-gray-800 flex-1">{category}</h4>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                              style={{ width: `${catPercentage}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-gray-700">{catPercentage}%</span>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="px-6 pb-6 pt-2">
                        <div className="flex items-start gap-3 pt-3 border-t border-gray-200">
                          {status === 'strong' ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          )}
                          <p className="text-gray-700 leading-relaxed">{insight}</p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              );
            })}
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 mb-8">
          <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Personalized Action Plan</h3>
          <div className="space-y-4">
            {actionItems.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  {idx + 1}
                </div>
                <p className="text-lg text-gray-700 pt-1">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation CTA */}
        <div className="bg-blue-50 rounded-3xl shadow-xl p-8 lg:p-12 mb-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{recommendation.icon}</div>
            <h3 className="text-3xl font-bold mb-4 text-gray-800">My Recommendation for You</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              {recommendation.description}
            </p>
            <p className="text-2xl font-bold text-gray-800 mb-8">{recommendation.recommendation}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to={recommendation.link}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-600/30 text-center flex items-center justify-center gap-2"
            >
              {recommendation.action}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button 
              onClick={() => {
                setShowResults(false);
                setCurrentSection(0);
                setAnswers([]);
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-10 py-4 rounded-full transition-all hover:scale-105"
            >
              Retake Assessment
            </button>
          </div>
        </div>

        <div className="text-center text-gray-600 pb-8">
          <p className="text-lg">Want to discuss your results? <Link to="/contact" className="text-blue-600 hover:underline font-semibold">Schedule a free discovery call</Link></p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Progress Header */}
      <div className="px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex justify-between items-center text-gray-500 font-medium mb-2 text-sm sm:text-base">
          <span>Section {currentSection + 1} of {sections.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Main Quiz Card */}
        <div className="flex-grow w-full md:max-w-3xl">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12">
            {/* Section Header */}
            <div className="flex items-center justify-center space-x-3 mb-6 sm:mb-8">
              <currentSectionData.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">{currentSectionData.title}</h1>
            </div>

            {/* Questions */}
            <div className="space-y-6 sm:space-y-8">
              {currentSectionData.questions.map((question) => (
                <div key={question.id} className="py-3 sm:py-4 border-b border-gray-200 last:border-b-0">
                  <p className="text-base sm:text-lg text-gray-600 mb-4 text-center">{question.question}</p>
                  
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
                                ? 'bg-blue-100 scale-110 sm:scale-125 ring-4 ring-blue-600' 
                                : 'hover:bg-gray-100 hover:scale-105 sm:hover:scale-110'
                            }`}
                          >
                            {emoji}
                          </button>
                        );
                      })}
                    </>
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
                          background: `linear-gradient(to right, #2563eb 0%, #2563eb ${((((getAnswer(question.id) as number) ?? Math.round((question.min + question.max) / 2)) - question.min) / (question.max - question.min)) * 100}%, #e5e7eb ${((((getAnswer(question.id) as number) ?? Math.round((question.min + question.max) / 2)) - question.min) / (question.max - question.min)) * 100}%, #e5e7eb 100%)`
                        }}
                        className="w-full h-3 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>1</span>
                        <span className="text-2xl font-bold text-blue-600">{(getAnswer(question.id) as number) ?? Math.round((question.min + question.max) / 2)}</span>
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
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
                            }`}
                          >
                            <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-all ${
                              isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                            }`}>
                              {isSelected && <Check className="w-4 h-4 text-white" />}
                            </div>
                            <span className={isSelected ? 'font-semibold' : ''}>{option}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

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
                                ? 'bg-blue-600 text-white' 
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
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
                      <span className={`text-lg font-semibold ${getAnswer(question.id) === 'Yes' ? 'text-blue-600' : 'text-gray-400'}`}>
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
                            getAnswer(question.id) === 'Yes' ? 'bg-blue-600' : 'bg-gray-200'
                          }`}>
                            <div className={`absolute top-1 left-1 bg-white w-7 h-7 rounded-full transition-transform ${
                              getAnswer(question.id) === 'Yes' ? 'transform translate-x-7' : ''
                            }`}></div>
                          </div>
                        </div>
                      </label>
                    </div>
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
                className="bg-blue-600 text-white font-semibold px-6 sm:px-10 py-3 sm:py-3.5 rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {currentSection === sections.length - 1 ? 'View Results' : 'Next Section'}
              </button>
            </div>
          </div>
        </div>

        {/* Pro Tip Sidebar - Tablet and Desktop Only */}
        <div className="hidden md:flex md:flex-col md:items-center md:w-[350px] lg:w-[450px] flex-shrink-0 md:mt-4 lg:mt-8 md:ml-4 lg:ml-8">
          <div className="mt-3 lg:mt-4 bg-blue-50 rounded-2xl p-4 lg:p-6 border-2 border-blue-200 shadow-lg animate-scale-in">
            <p className="text-blue-800 font-semibold text-base lg:text-lg text-center">
              💡 Pro Tip: {characterConfigs[currentSection].tip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
