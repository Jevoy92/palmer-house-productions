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
  ChevronUp,
  Check
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import femaleProTip from '@/assets/pals/female-reel-pal-pro-tip-transparent.png';
import femaleThinking from '@/assets/pals/female-reel-pal-thinking-transparent.png';
import femaleThumbsUp from '@/assets/pals/female-reel-pal-thumbs-up-transparent.png';
import maleProTip from '@/assets/pals/male-reel-pal-pro-tip-transparent.png';
import maleThinking from '@/assets/pals/male-reel-pal-thinking-transparent.png';

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
    title: "Short-Form Content Strategy",
    icon: Video,
    questions: [
      {
        id: 1,
        question: "How satisfied are you with your current posting consistency?",
        type: "emoji",
        options: ["😢", "😕", "😐", "🙂", "😄"]
      },
      {
        id: 2,
        question: "Do you have a content calendar for Reels/TikToks?",
        type: "toggle",
        options: ["No", "Yes"]
      },
      {
        id: 3,
        question: "On a scale of 1-10, how trackable is your content performance?",
        type: "slider",
        min: 0,
        max: 10
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
        question: "Which tools do you currently have? (Select all that apply)",
        type: "checkbox",
        options: ["Smartphone", "Camera/DSLR", "Microphone", "Lighting", "Editing Software"]
      },
      {
        id: 2,
        question: "Is someone on your team comfortable being on camera?",
        type: "buttons",
        options: ["No", "Maybe", "Yes"]
      },
      {
        id: 3,
        question: "How confident are you in creating video content?",
        type: "slider",
        min: 0,
        max: 10
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
        question: "How many hours per week can you dedicate to content creation?",
        type: "scale",
        options: ["Less than 1", "1-3", "3-5", "5-10", "10+"]
      },
      {
        id: 2,
        question: "What's your biggest challenge with content creation?",
        type: "cards",
        options: ["Time Constraints", "Limited Resources", "Lack of Ideas", "Technical Skills"]
      },
      {
        id: 3,
        question: "Do you have team buy-in for regular content creation?",
        type: "toggle",
        options: ["No", "Yes"]
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
        question: "Rate your commitment to building a content library",
        type: "emoji",
        options: ["😴", "😐", "🤔", "😊", "🔥"]
      },
      {
        id: 2,
        question: "When do you want to see results?",
        type: "buttons",
        options: ["Immediately", "1-3 months", "6+ months"]
      },
      {
        id: 3,
        question: "Is content creation a strategic priority for your business?",
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
        question: "What's your monthly content creation budget?",
        type: "scale",
        options: ["Under $500", "$500-$1,500", "$1,500-$3,000", "$3,000+"]
      },
      {
        id: 2,
        question: "How important is ROI tracking for your content?",
        type: "slider",
        min: 0,
        max: 10
      },
      {
        id: 3,
        question: "Are you ready to invest in professional content production?",
        type: "buttons",
        options: ["No", "Considering", "Yes"]
      }
    ]
  }
];

// Character configurations for each section
const characterConfigs = [
  {
    image: femaleProTip,
    tip: "Consistency beats perfection! Post regularly, even if it's not perfect."
  },
  {
    image: maleThinking,
    tip: "Great content starts with the right tools. Invest in what matters most!"
  },
  {
    image: femaleThumbsUp,
    tip: "Batch your content creation - film multiple videos in one session!"
  },
  {
    image: maleProTip,
    tip: "Set clear goals before you start. Know what success looks like!"
  },
  {
    image: femaleThinking,
    tip: "Track your ROI! Understanding your content's value is key to growth."
  }
];

export const ReelPalQuiz = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const handleAnswer = (questionId: number, value: string | number | string[]) => {
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
      } else if (question.type === 'emoji') {
        questionMax = question.options!.length - 1;
        questionScore = question.options!.indexOf(answer.value as string);
      } else if (question.type === 'slider') {
        questionMax = question.max!;
        questionScore = (answer.value as number);
      } else if (question.type === 'checkbox') {
        questionMax = question.options!.length;
        questionScore = Array.isArray(answer.value) ? answer.value.length : 0;
      } else if (question.type === 'cards' || question.type === 'buttons') {
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
      // Trigger confetti celebration
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#f97316', '#fb923c', '#fdba74']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#f97316', '#fb923c', '#fdba74']
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
        <div className="bg-orange-500 rounded-3xl shadow-2xl p-8 lg:p-12 mb-8 text-white text-center">
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
                              className="bg-orange-500 h-3 rounded-full transition-all duration-1000"
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
              <div key={idx} className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
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
      <div className="px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex justify-between items-center text-gray-500 font-medium mb-2 text-sm sm:text-base">
          <span>Section {currentSection + 1} of {sections.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">{currentSectionData.title}</h1>
              <currentSectionData.icon className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 flex-shrink-0" />
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
                                ? 'bg-orange-100 scale-110 sm:scale-125 ring-4 ring-orange-500' 
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
                          background: `linear-gradient(to right, #f97316 0%, #f97316 ${((((getAnswer(question.id) as number) ?? Math.round((question.min + question.max) / 2)) - question.min) / (question.max - question.min)) * 100}%, #e5e7eb ${((((getAnswer(question.id) as number) ?? Math.round((question.min + question.max) / 2)) - question.min) / (question.max - question.min)) * 100}%, #e5e7eb 100%)`
                        }}
                        className="w-full h-3 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-orange-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>1</span>
                        <span className="text-2xl font-bold text-orange-600">{(getAnswer(question.id) as number) ?? Math.round((question.min + question.max) / 2)}</span>
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
                                ? 'border-orange-500 bg-orange-50'
                                : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50/50'
                            }`}
                          >
                            <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-all ${
                              isSelected ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
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
                                ? 'border-orange-500 bg-orange-50 shadow-lg'
                                : 'border-gray-200 hover:border-orange-200 hover:shadow-md'
                            }`}
                          >
                            <div className={`text-4xl mb-3 ${isSelected ? 'scale-110' : ''} transition-transform`}>
                              {option === 'Time Constraints' && '⏰'}
                              {option === 'Limited Resources' && '💰'}
                              {option === 'Lack of Ideas' && '💡'}
                              {option === 'Technical Skills' && '🔧'}
                            </div>
                            <h4 className={`font-semibold ${isSelected ? 'text-orange-700' : 'text-gray-700'}`}>{option}</h4>
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
                                ? 'bg-orange-500 text-white' 
                                : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
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
                      <span className={`text-lg font-semibold ${getAnswer(question.id) === 'Yes' ? 'text-orange-600' : 'text-gray-400'}`}>
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
                            getAnswer(question.id) === 'Yes' ? 'bg-orange-500' : 'bg-gray-200'
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
                                ? 'bg-orange-500 text-white'
                                : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
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
                className="bg-orange-500 text-white font-semibold px-6 sm:px-10 py-3 sm:py-3.5 rounded-full hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {currentSection === sections.length - 1 ? 'See Results' : 'Next Section'}
              </button>
            </div>
          </div>
        </div>

        {/* Character Illustration - Tablet and Desktop Only */}
        <div className="hidden md:flex md:flex-col md:items-center md:w-[350px] lg:w-[450px] flex-shrink-0 md:mt-12 lg:mt-16 md:ml-4 lg:ml-8">
          <img 
            src={characterConfigs[currentSection].image}
            alt="Reel Pal character illustration"
            className="w-full h-auto max-h-[500px] lg:max-h-[600px] object-contain"
          />
          <div className="mt-4 lg:mt-6 bg-orange-50 rounded-2xl p-4 lg:p-6 border-2 border-orange-200 shadow-lg">
            <p className="text-orange-800 font-semibold text-base lg:text-lg text-center">
              💡 Pro Tip: {characterConfigs[currentSection].tip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
