import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Settings,
  Users,
  BookOpen,
  Database,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Check,
  Monitor,
  BarChart3,
  Sparkles,
  Target
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    type: 'toggle' | 'buttons' | 'scale' | 'emoji' | 'slider' | 'checkbox' | 'cards';
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
        options: ['No', 'Yes']
      },
      {
        id: 3,
        question: "On a scale of 1-10, how documented are your processes?",
        type: 'slider',
        min: 0,
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
        id: 1,
        question: "What types of content does your team need? (Select all that apply)",
        type: 'checkbox',
        options: ['Process Documentation', 'Product Training', 'Software Tutorials', 'Compliance Videos', 'FAQs']
      },
      {
        id: 2,
        question: "How often do team members ask the same questions?",
        type: 'buttons',
        options: ['Rarely', 'Sometimes', 'Often', 'Constantly']
      },
      {
        id: 3,
        question: "How accessible is your current knowledge base?",
        type: 'slider',
        min: 0,
        max: 10
      }
    ]
  },
  {
    id: 3,
    title: "Team Efficiency & Scale",
    icon: Monitor,
    questions: [
      {
        id: 1,
        question: "How many hours per week do you spend answering repeat questions?",
        type: 'scale',
        options: ['Less than 5', '5-10', '10-20', '20+']
      },
      {
        id: 2,
        question: "What\'s your biggest operational bottleneck?",
        type: 'cards',
        options: ['Onboarding Time', 'Knowledge Transfer', 'Consistency', 'Scalability']
      },
      {
        id: 3,
        question: "Do you have a centralized knowledge base?",
        type: 'toggle',
        options: ['No', 'Yes']
      }
    ]
  },
  {
    id: 4,
    title: "Growth & Scalability",
    icon: TrendingUp,
    questions: [
      {
        id: 1,
        question: "Rate how prepared you are to scale your team",
        type: 'emoji',
        options: ['😴', '😐', '🤔', '😊', '🔥']
      },
      {
        id: 2,
        question: "When do you need this system operational?",
        type: 'buttons',
        options: ['Not Urgent', 'Within 3 months', 'ASAP']
      },
      {
        id: 3,
        question: "Is building systems a strategic priority?",
        type: 'toggle',
        options: ['No', 'Yes']
      }
    ]
  },
  {
    id: 5,
    title: "Budget & Investment",
    icon: Database,
    questions: [
      {
        id: 1,
        question: "What\'s your budget for building video systems?",
        type: 'scale',
        options: ['Under $3,000', '$3,000-$7,000', '$7,000-$15,000', '$15,000+']
      },
      {
        id: 2,
        question: "How important is reducing training time and costs?",
        type: 'slider',
        min: 0,
        max: 10
      },
      {
        id: 3,
        question: "Are you ready to invest in systems that scale?",
        type: 'buttons',
        options: ['No', 'Considering', 'Yes']
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
  },
  {
    image: placeholderImage,
    tip: "Systems unlock scalability!"
  },
  {
    image: placeholderImage,
    tip: "Invest in leverage, not labor!"
  }
];

export const SystemPalQuiz = () => {
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

  const calculateDetailedScore = () => {
    const categoryScores: { [key: string]: { score: number; max: number } } = {};
    
    sections.forEach(section => {
      let sectionScore = 0;
      let sectionMax = 0;
      
      section.questions.forEach(question => {
        const answer = answers.find(a => a.sectionId === section.id && a.questionId === question.id);
        if (answer) {
          if (question.type === 'slider') {
            const value = answer.value as number;
            const range = (question.max || 10) - (question.min || 0);
            sectionScore += ((value - (question.min || 0)) / range) * 10;
            sectionMax += 10;
          } else if (question.type === 'emoji') {
            const emojiValues: { [key: string]: number } = { '😫': 2, '😕': 4, '😐': 6, '😊': 8, '🚀': 10 };
            sectionScore += emojiValues[answer.value as string] || 5;
            sectionMax += 10;
          } else if (question.type === 'checkbox' && Array.isArray(answer.value)) {
            sectionScore += (answer.value.length / (question.options?.length || 1)) * 10;
            sectionMax += 10;
          } else {
            sectionScore += 7;
            sectionMax += 10;
          }
        }
      });
      
      categoryScores[section.title] = {
        score: sectionScore,
        max: sectionMax
      };
    });
    
    const totalScore = Object.values(categoryScores).reduce((sum, cat) => sum + cat.score, 0);
    const totalMax = Object.values(categoryScores).reduce((sum, cat) => sum + cat.max, 0);
    const percentage = Math.round((totalScore / totalMax) * 100);
    
    return { categoryScores, totalScore, totalMax, percentage };
  };

  const getCategoryInsight = (categoryTitle: string, score: number, max: number): string => {
    const percentage = (score / max) * 100;
    
    const insights: { [key: string]: { high: string; medium: string; low: string } } = {
      "Process & Workflow": {
        high: "Excellent process thinking! Your workflow awareness creates the foundation for scalable, efficient video systems.",
        medium: "You understand workflows but systematizing and documenting processes will unlock team efficiency and consistency.",
        low: "Structured processes transform chaos into predictability. Let's map your workflows and build repeatable systems."
      },
      "Team & Training": {
        high: "Strong training mindset! Empowering your team through video knowledge bases will multiply your organization's capabilities.",
        medium: "Good team awareness, but creating systematic training content will reduce onboarding time and improve performance.",
        low: "Video-based training scales expertise across your organization. Let's build a library that empowers every team member."
      },
      "Automation": {
        high: "You're thinking automation-first! This approach will free your team from repetitive tasks and drive operational efficiency.",
        medium: "You see automation potential, but identifying and implementing video automation opportunities will yield significant time savings.",
        low: "Automation is your leverage point. Let's identify manual video tasks that can be systematized or eliminated entirely."
      },
      "Knowledge Management": {
        high: "Fantastic knowledge management approach! Capturing institutional knowledge in video prevents expertise loss and accelerates problem-solving.",
        medium: "You value documentation, but video knowledge bases make information more accessible and retain team members longer.",
        low: "Knowledge disappears when people leave. Let's create video systems that preserve expertise and make it searchable and actionable."
      },
      "Scalability": {
        high: "You're building for scale! Your systems thinking will ensure video operations grow smoothly with your organization.",
        medium: "Good growth awareness, but planning for video scalability now prevents bottlenecks as demand increases.",
        low: "Scalable systems compound value over time. Let's design video workflows that work at 10x your current volume."
      }
    };
    
    if (percentage >= 70) return insights[categoryTitle]?.high || "";
    if (percentage >= 40) return insights[categoryTitle]?.medium || "";
    return insights[categoryTitle]?.low || "";
  };

  const getActionItems = (categoryScores: { [key: string]: { score: number; max: number } }): string[] => {
    const actions: string[] = [];
    
    Object.entries(categoryScores).forEach(([category, { score, max }]) => {
      const percentage = (score / max) * 100;
      
      if (category === "Process & Workflow" && percentage < 70) {
        actions.push("Document your current video workflows and identify bottlenecks where systematization would save the most time");
      }
      if (category === "Team & Training" && percentage < 70) {
        actions.push("Create a video training library for onboarding, best practices, and common processes to scale team knowledge");
      }
      if (category === "Automation" && percentage < 70) {
        actions.push("Audit repetitive video tasks and implement templates, presets, or tools to automate manual work");
      }
      if (category === "Knowledge Management" && percentage < 70) {
        actions.push("Build a searchable video knowledge base that captures expert insights, troubleshooting, and institutional memory");
      }
      if (category === "Scalability" && percentage < 70) {
        actions.push("Design video systems with 10x capacity in mind: standardize formats, organize assets, and plan for growth");
      }
    });
    
    if (actions.length === 0) {
      actions.push("Create standard operating procedures (SOPs) in video format for consistent execution across your team");
      actions.push("Implement a content management system to organize and make video assets easily discoverable");
      actions.push("Measure time saved and productivity gained from systematic video workflows to prove ROI");
    }
    
    return actions;
  };

  const getRecommendation = (percentage: number): { level: string; title: string; description: string; recommendation: string; cta: string; icon: string } => {
    if (percentage >= 75) {
      return {
        level: "Systems Expert",
        title: "You're Ready to Build Video Systems",
        description: "Your systems thinking and operational awareness position you perfectly for implementing scalable video workflows. Let's leverage your readiness to create automated processes that multiply team efficiency and preserve institutional knowledge.",
        recommendation: "Full Video Systems Implementation",
        cta: "Launch System Strategy",
        icon: "🎯"
      };
    } else if (percentage >= 50) {
      return {
        level: "Growing Systems Thinker",
        title: "Systematize Your Video Operations",
        description: "You understand operations but need strategic guidance to transform video from a bottleneck into a scalable asset. Let's build workflows, training libraries, and automation that free your team to focus on high-value work.",
        recommendation: "Guided Systems Development",
        cta: "Develop Video Systems",
        icon: "⚙️"
      };
    } else {
      return {
        level: "Systems Beginner",
        title: "Start Your Systems Journey",
        description: "Video systems might be a new concept, but they're game-changing for operational efficiency. Let's begin by identifying your biggest time drains and building simple video solutions that deliver immediate ROI and scale as you grow.",
        recommendation: "Systems Discovery & Foundation",
        cta: "Begin Discovery Call",
        icon: "🌱"
      };
    }
  };

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
          colors: ['#22c55e', '#4ade80', '#86efac']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#22c55e', '#4ade80', '#86efac']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [showResults]);

  if (showResults) {
    const { categoryScores, percentage } = calculateDetailedScore();
    const actionItems = getActionItems(categoryScores);
    const recommendation = getRecommendation(percentage);

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
        <div className="bg-green-600 rounded-3xl shadow-2xl p-8 lg:p-12 mb-8 text-white text-center">
          <Trophy className="w-20 h-20 mx-auto mb-4 animate-scale-in" />
          <h2 className="text-5xl font-bold mb-4">Your Video System Readiness Score</h2>
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
            {Object.entries(categoryScores).map(([category, { score, max }]) => {
              const catPercentage = Math.round((score / max) * 100);
              const isOpen = openCategories.includes(category);
              const insight = getCategoryInsight(category, score, max);
              const status = catPercentage >= 70 ? 'strong' : catPercentage >= 40 ? 'developing' : 'opportunity';
              
              return (
                <Collapsible key={category} open={isOpen} onOpenChange={() => toggleCategory(category)}>
                  <div className={`border-2 rounded-xl overflow-hidden transition-colors ${
                    status === 'strong' ? 'border-green-300 bg-green-50/50' :
                    status === 'developing' ? 'border-yellow-300 bg-yellow-50/50' :
                    'border-green-300 bg-green-50/50'
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
                              className="bg-green-600 h-3 rounded-full transition-all duration-1000"
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
                            <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
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
              <div key={idx} className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  {idx + 1}
                </div>
                <p className="text-lg text-gray-700 pt-1">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation CTA */}
        <div className="bg-green-50 rounded-3xl shadow-xl p-8 lg:p-12 mb-8">
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
              to="/contact"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-green-600/30 text-center flex items-center justify-center gap-2"
            >
              {recommendation.cta}
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
              Retake Quiz
            </button>
          </div>
        </div>

        <div className="text-center text-gray-600 pb-8">
          <p className="text-lg">Want to discuss your results? <Link to="/contact" className="text-green-600 hover:underline font-semibold">Schedule a free discovery call</Link></p>
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
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-gray-200 hover:border-green-200 hover:bg-green-50/50'
                              }`}
                            >
                              <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-all ${
                                isSelected ? 'bg-green-500 border-green-500' : 'border-gray-300'
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
                                  ? 'border-green-500 bg-green-50 shadow-lg'
                                  : 'border-gray-200 hover:border-green-200 hover:shadow-md'
                              }`}
                            >
                              <div className={`text-4xl mb-3 ${isSelected ? 'scale-110' : ''} transition-transform`}>
                                {option === 'Onboarding Time' && '⏰'}
                                {option === 'Knowledge Transfer' && '📚'}
                                {option === 'Consistency' && '✅'}
                                {option === 'Scalability' && '📈'}
                              </div>
                              <h4 className={`font-semibold ${isSelected ? 'text-green-700' : 'text-gray-700'}`}>{option}</h4>
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
                                  ? 'bg-green-500 text-white shadow-lg'
                                  : 'bg-green-100 text-green-700 hover:bg-green-200'
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
