import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Video,
  Sparkles,
  Users,
  Target,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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

  const calculateDetailedScore = () => {
    let totalScore = 0;
    let maxScore = 0;
    const categoryScores: { [key: string]: { score: number; max: number } } = {};

    answers.forEach(answer => {
      const section = sections.find(s => s.id === answer.sectionId);
      const question = section?.questions.find(q => q.id === answer.questionId);
      
      if (!section || !question) return;
      
      let questionScore = 0;
      let questionMax = 0;

      if (question.type === 'toggle') {
        questionMax = 1;
        questionScore = answer.value === 'Yes' ? 1 : 0;
      } else if (question.type === 'buttons') {
        questionMax = question.options!.length - 1;
        questionScore = question.options!.indexOf(answer.value as string);
      } else if (question.type === 'scale') {
        questionMax = question.options!.length - 1;
        questionScore = question.options!.indexOf(answer.value as string);
      }

      totalScore += questionScore;
      maxScore += questionMax;

      if (!categoryScores[section.title]) {
        categoryScores[section.title] = { score: 0, max: 0 };
      }
      categoryScores[section.title].score += questionScore;
      categoryScores[section.title].max += questionMax;
    });

    const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
    
    return { totalScore, maxScore, percentage, categoryScores };
  };

  const getActionItems = () => {
    const items: string[] = [];
    
    answers.forEach(answer => {
      const section = sections.find(s => s.id === answer.sectionId);
      const question = section?.questions.find(q => q.id === answer.questionId);
      
      if (section?.id === 1 && answer.value === 'No') {
        if (question?.id === 1) items.push("Create a consistent posting schedule for social media");
        if (question?.id === 2) items.push("Build a content calendar for your Reels/TikToks");
      }
      
      if (section?.id === 2 && (answer.value === 'No' || answer.value === 'Partially')) {
        if (question?.id === 1) items.push("Invest in basic filming equipment (ring light, tripod)");
        if (question?.id === 3) items.push("Learn basic video editing skills or hire support");
      }
      
      if (section?.id === 3 && answer.value === 'No') {
        if (question?.id === 1) items.push("Block out dedicated time weekly for content creation");
        if (question?.id === 2) items.push("Get leadership buy-in for regular content initiatives");
      }
      
      if (section?.id === 4 && answer.value === 'No') {
        if (question?.id === 1) items.push("Prioritize content creation in your business strategy");
      }
    });

    // Always add a few universal action items
    items.push("Start with batch filming - create multiple videos in one session");
    items.push("Focus on authentic, personality-driven content");
    
    return items.slice(0, 5); // Return top 5 action items
  };

  const getCategoryInsight = (category: string, percentage: number) => {
    const insights: { [key: string]: { high: string; medium: string; low: string } } = {
      'Short-Form Content Strategy': {
        high: "Your strategy foundation is solid! You're posting consistently and tracking results. Focus on optimizing what's working and experimenting with new formats.",
        medium: "You have some systems in place, but consistency is key. Building a content calendar and tracking engagement will amplify your results significantly.",
        low: "Let's build your strategy from the ground up. Start with a simple posting schedule and one platform to master before expanding."
      },
      'Content Creation Resources': {
        high: "You're well-equipped to create quality content! Your team and tools are ready. Now it's about maintaining momentum and refining your production process.",
        medium: "You have the basics covered. Consider investing in a few key tools (like a ring light or simple editing software) to elevate production quality.",
        low: "The good news? You don't need much to start. A smartphone, natural lighting, and free editing apps are enough to begin building your content library."
      },
      'Time & Team Capacity': {
        high: "Time management is your strength! You've carved out dedicated content creation time and have team support. This consistency will compound over time.",
        medium: "You're making time, but it's stretched thin. Consider batch filming sessions to maximize efficiency - create multiple videos in one focused block.",
        low: "Time is tight, and that's normal. Start small: even one hour per week of batch filming can create 4-6 weeks of content with the right approach."
      },
      'Goals & Commitment': {
        high: "Your commitment level is exceptional! You understand content is a long-term investment and you're ready to prioritize it. This mindset is what separates success stories from the rest.",
        medium: "You see the value but may need to align it more closely with business priorities. Getting leadership buy-in will unlock the consistency you need.",
        low: "Content creation needs to become a strategic priority. The businesses winning on social are those that view it as essential, not optional. Let's shift that mindset."
      },
      'Budget & Investment': {
        high: "Your budget shows you're serious about content. With this investment level, you can build a comprehensive content system that generates ROI for years.",
        medium: "Your budget allows for strategic investments. Focus on high-impact areas: quality filming sessions, editing support, or a batch production day with professional guidance.",
        low: "Budget is lean, but that doesn't mean you can't start. DIY approaches and free tools can get you 80% of the way there. Invest your time before your money."
      }
    };

    const messages = insights[category] || {
      high: "You're doing great here! Keep building on this strength.",
      medium: "Good foundation - some improvements will make a big difference.",
      low: "This is a growth opportunity - focus here for maximum impact."
    };

    if (percentage >= 70) return messages.high;
    if (percentage >= 40) return messages.medium;
    return messages.low;
  };

  const getRecommendation = () => {
    const { percentage } = calculateDetailedScore();

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

  useEffect(() => {
    if (showResults) {
      // Trigger confetti celebration
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#14b8a6', '#f97316', '#8b5cf6']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#14b8a6', '#f97316', '#8b5cf6']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [showResults]);

  if (showResults) {
    const recommendation = getRecommendation();
    const { percentage, categoryScores } = calculateDetailedScore();
    const actionItems = getActionItems();
    const [openCategories, setOpenCategories] = useState<string[]>([]);

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
        <div className="bg-teal-500 rounded-3xl shadow-2xl p-8 lg:p-12 mb-8 text-white text-center">
          <Trophy className="w-20 h-20 mx-auto mb-4 animate-scale-in" />
          <h2 className="text-5xl font-bold mb-4">Your Content Readiness Score</h2>
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
              const insight = getCategoryInsight(category, catPercentage);
              const status = catPercentage >= 70 ? 'strong' : catPercentage >= 40 ? 'developing' : 'opportunity';
              
              return (
                <Collapsible key={category} open={isOpen} onOpenChange={() => toggleCategory(category)}>
                  <div className={`border-2 rounded-xl overflow-hidden transition-colors ${
                    status === 'strong' ? 'border-green-300 bg-green-50/50' :
                    status === 'developing' ? 'border-yellow-300 bg-yellow-50/50' :
                    'border-orange-300 bg-orange-50/50'
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
                              className="bg-teal-500 h-3 rounded-full transition-all duration-1000"
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
                            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
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
              <div key={idx} className="flex items-start gap-4 p-4 bg-teal-50 rounded-xl border-2 border-teal-200">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  {idx + 1}
                </div>
                <p className="text-lg text-gray-700 pt-1">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation CTA */}
        <div className="bg-orange-50 rounded-3xl shadow-xl p-8 lg:p-12 mb-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{recommendation.icon}</div>
            <h3 className="text-3xl font-bold mb-4 text-gray-800">My Recommendation for You</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              {recommendation.description}
            </p>
            <p className="text-2xl font-bold text-gray-800 mb-8">{recommendation.recommendation}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {recommendation.link.startsWith('http') ? (
              <a 
                href={recommendation.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-orange-500/30 text-center flex items-center justify-center gap-2"
              >
                {recommendation.action}
                <ArrowRight className="w-5 h-5" />
              </a>
            ) : (
              <Link 
                to={recommendation.link}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-orange-500/30 text-center flex items-center justify-center gap-2"
              >
                {recommendation.action}
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
            <button 
              onClick={() => {
                setShowResults(false);
                setCurrentSection(0);
                setAnswers([]);
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-10 py-4 rounded-full transition-all hover:scale-105"
            >
              Retake Quiz
            </button>
          </div>
        </div>

        <div className="text-center text-gray-600 pb-8">
          <p className="text-lg">Want to discuss your results? <Link to="/contact" className="text-orange-500 hover:underline font-semibold">Schedule a free discovery call</Link></p>
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
            <div className="flex items-center justify-center space-x-4 mb-8">
              <h1 className="text-3xl font-bold text-gray-800">{currentSectionData.title}</h1>
              <currentSectionData.icon className="w-8 h-8 text-teal-500" />
            </div>

            {/* Questions */}
            <div className="space-y-8">
              {currentSectionData.questions.map((question) => (
                <div key={question.id} className="py-4 border-b border-gray-200 last:border-b-0">
                  <p className="text-lg text-gray-600 mb-4 text-center">{question.question}</p>
                  
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
