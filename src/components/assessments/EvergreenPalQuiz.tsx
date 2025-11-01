import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  TrendingUp,
  Target,
  Search,
  FileText,
  Users,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Check,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import placeholderImage from '@/assets/pals/female-evergreen-pal-final.png';

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
    title: "SEO & Search Strategy",
    icon: Search,
    questions: [
      {
        id: 1,
        question: "How often do prospects find you through Google/YouTube search?",
        type: 'emoji',
        options: ['😢', '😕', '😐', '🙂', '😁']
      },
      {
        id: 2,
        question: "Do you have a documented SEO strategy?",
        type: 'toggle',
        options: ['No', 'Yes']
      },
      {
        id: 3,
        question: "On a scale of 1-10, how optimized is your video content for search?",
        type: 'slider',
        min: 0,
        max: 10
      }
    ]
  },
  {
    id: 2,
    title: "Content Clarity & Messaging",
    icon: Target,
    questions: [
      {
        id: 1,
        question: "Do you have explainer videos for your core offerings? (Select all that apply)",
        type: 'checkbox',
        options: ['Services Overview', 'Product Demos', 'FAQ Videos', 'Case Studies', 'None Yet']
      },
      {
        id: 2,
        question: "How clear is your value proposition?",
        type: 'buttons',
        options: ['Unclear', 'Somewhat Clear', 'Very Clear']
      },
      {
        id: 3,
        question: "How often do prospects say they don\'t understand what you do?",
        type: 'slider',
        min: 0,
        max: 10
      }
    ]
  },
  {
    id: 3,
    title: "Content Production Capacity",
    icon: FileText,
    questions: [
      {
        id: 1,
        question: "How many hours per month can you dedicate to evergreen content?",
        type: 'scale',
        options: ['Less than 5', '5-10', '10-20', '20-40', '40+']
      },
      {
        id: 2,
        question: "What\'s your biggest challenge with long-form content?",
        type: 'cards',
        options: ['Time Constraints', 'Technical Know-how', 'Content Ideas', 'Production Quality']
      },
      {
        id: 3,
        question: "Do you have someone who can manage your YouTube/blog?",
        type: 'toggle',
        options: ['No', 'Yes']
      }
    ]
  },
  {
    id: 4,
    title: "Lead Generation Goals",
    icon: TrendingUp,
    questions: [
      {
        id: 1,
        question: "Rate your satisfaction with current inbound lead quality",
        type: 'emoji',
        options: ['😴', '😐', '🤔', '😊', '🔥']
      },
      {
        id: 2,
        question: "When do you expect to see SEO results?",
        type: 'buttons',
        options: ['3 months', '6 months', '12+ months']
      },
      {
        id: 3,
        question: "Is evergreen content a strategic priority for your business?",
        type: 'toggle',
        options: ['No', 'Yes']
      }
    ]
  },
  {
    id: 5,
    title: "Budget & Investment",
    icon: Zap,
    questions: [
      {
        id: 1,
        question: "What\'s your monthly budget for evergreen content?",
        type: 'scale',
        options: ['Under $1,000', '$1,000-$3,000', '$3,000-$5,000', '$5,000+']
      },
      {
        id: 2,
        question: "How important is long-term ROI vs. immediate results?",
        type: 'slider',
        min: 0,
        max: 10
      },
      {
        id: 3,
        question: "Are you ready to invest in professional evergreen production?",
        type: 'buttons',
        options: ['No', 'Considering', 'Yes']
      }
    ]
  }
];

const characterConfigs = [
  {
    image: placeholderImage,
    tip: "SEO is a long game - start planting seeds today!"
  },
  {
    image: placeholderImage,
    tip: "Clarity beats cleverness every time!"
  },
  {
    image: placeholderImage,
    tip: "Batch create to save time and stay consistent!"
  },
  {
    image: placeholderImage,
    tip: "Quality leads come from quality content!"
  },
  {
    image: placeholderImage,
    tip: "Invest in assets that work while you sleep!"
  }
];

export const EvergreenPalQuiz = () => {
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
      "Content Strategy": {
        high: "You have a strong foundation for evergreen content! Your SEO understanding and content planning are solid.",
        medium: "You're on the right track with content strategy, but there's room to strengthen your SEO approach and planning process.",
        low: "Building a content strategy is key to evergreen success. Let's develop your SEO foundation and content calendar."
      },
      "SEO & Discovery": {
        high: "Excellent! Your SEO knowledge will help your content get discovered and drive organic traffic consistently.",
        medium: "Your SEO basics are good, but optimizing for search intent and technical SEO will amplify your reach.",
        low: "SEO is the engine for evergreen content. Let's build your keyword strategy and optimize for long-term discovery."
      },
      "Content Quality": {
        high: "Your content quality standards are impressive! This will help establish authority and keep audiences engaged.",
        medium: "You value quality content, but refining your production process could elevate your evergreen library.",
        low: "Quality evergreen content pays dividends over time. Let's develop workflows to maintain high standards efficiently."
      },
      "Distribution": {
        high: "You understand how to maximize content reach! Your distribution strategy will amplify evergreen content value.",
        medium: "Good distribution awareness, but optimizing your channels and repurposing strategy could extend content lifespan.",
        low: "Distribution multiplies content impact. Let's create a system to strategically share and repurpose your evergreen assets."
      },
      "Measurement": {
        high: "Fantastic! Tracking performance metrics will help you optimize and prove ROI on evergreen content investments.",
        medium: "You're measuring some metrics, but deeper analytics will reveal which evergreen content drives real business results.",
        low: "Measuring evergreen content performance is crucial for growth. Let's set up tracking to understand what works and scale it."
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
      
      if (category === "Content Strategy" && percentage < 70) {
        actions.push("Develop a content calendar focused on evergreen topics that answer your audience's recurring questions");
      }
      if (category === "SEO & Discovery" && percentage < 70) {
        actions.push("Research high-value keywords with lasting search volume and optimize content for search intent");
      }
      if (category === "Content Quality" && percentage < 70) {
        actions.push("Create production templates and style guides to maintain consistent quality across evergreen content");
      }
      if (category === "Distribution" && percentage < 70) {
        actions.push("Build a repurposing workflow to extract multiple formats from each evergreen piece");
      }
      if (category === "Measurement" && percentage < 70) {
        actions.push("Set up analytics tracking to monitor organic traffic, engagement, and conversion from evergreen content");
      }
    });
    
    if (actions.length === 0) {
      actions.push("Audit your existing content library to identify evergreen opportunities");
      actions.push("Document your content creation process to scale efficiently");
      actions.push("Experiment with video formats that combine SEO benefits with engaging storytelling");
    }
    
    return actions;
  };

  const getRecommendation = (percentage: number): { title: string; description: string; cta: string } => {
    if (percentage >= 75) {
      return {
        title: "You're Ready for Evergreen Excellence",
        description: "Your strong foundation makes you an ideal candidate for building a comprehensive evergreen content library. Let's leverage your readiness to create SEO-optimized video content that drives qualified leads for years.",
        cta: "Launch Evergreen Strategy"
      };
    } else if (percentage >= 50) {
      return {
        title: "Build Your Evergreen Foundation",
        description: "You have good awareness but need strategic support to maximize evergreen content ROI. Let's fill the gaps in your SEO, content planning, and distribution to create sustainable organic growth.",
        cta: "Develop Content Strategy"
      };
    } else {
      return {
        title: "Start Your Evergreen Journey",
        description: "Evergreen content might be new territory, but that's where the biggest opportunity lies. Let's build your content strategy from the ground up with SEO-driven video that works 24/7 to generate leads.",
        cta: "Begin Discovery Call"
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
    const { categoryScores, percentage } = calculateDetailedScore();
    const actionItems = getActionItems(categoryScores);
    const recommendation = getRecommendation(percentage);

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
        {/* Overall Score */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 text-white text-center mb-6 sm:mb-8">
          <Trophy className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 animate-scale-in" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Quiz Complete!</h2>
          <div className="text-6xl sm:text-7xl md:text-8xl font-bold mb-3 sm:mb-4">{percentage}%</div>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">Evergreen Content Readiness Score</p>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 flex items-center gap-3">
            <BarChart3 className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500" />
            Your Evergreen Content Breakdown
          </h3>
          
          <Accordion type="multiple" value={openCategories} onValueChange={setOpenCategories} className="space-y-3 sm:space-y-4">
            {Object.entries(categoryScores).map(([category, { score, max }]) => {
              const categoryPercentage = Math.round((score / max) * 100);
              const insight = getCategoryInsight(category, score, max);
              
              return (
                <AccordionItem key={category} value={category} className="border border-gray-200 rounded-2xl px-4 sm:px-6 overflow-hidden">
                  <AccordionTrigger className="hover:no-underline py-4 sm:py-6">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" />
                        <span className="font-semibold text-base sm:text-lg text-left">{category}</span>
                      </div>
                      <span className="text-xl sm:text-2xl font-bold text-blue-500">{categoryPercentage}%</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 sm:pb-6">
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mt-2">
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{insight}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Action Items */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 flex items-center gap-3">
            <Target className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500" />
            Your Personalized Action Plan
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {actionItems.map((item, index) => (
              <div key={index} className="flex gap-3 sm:gap-4 p-4 sm:p-5 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm sm:text-base">
                  {index + 1}
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed pt-0.5">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border-2 border-blue-200">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-800">{recommendation.title}</h3>
          <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">{recommendation.description}</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link 
              to="/contact" 
              className="flex-1 bg-blue-500 text-white text-center font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {recommendation.cta} →
            </Link>
            <button 
              onClick={() => window.location.reload()} 
              className="flex-1 bg-white text-blue-500 border-2 border-blue-500 text-center font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-blue-50 transition-all"
            >
              Retake Quiz
            </button>
          </div>
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
            Take my quiz and find out if you're ready to build evergreen content that works! Discover your SEO readiness and get personalized recommendations.
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
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          {/* Quiz Card */}
          <div className="w-full md:flex-1 bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-gray-100">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-500 flex items-center justify-center flex-shrink-0">
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
                                  ? 'bg-blue-100 scale-110 sm:scale-125 ring-4 ring-blue-500' 
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
                                  ? 'bg-blue-500 text-white'
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
                            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((((getAnswer(question.id) as number) ?? Math.round((question.min + question.max) / 2)) - question.min) / (question.max - question.min)) * 100}%, #e5e7eb ${((((getAnswer(question.id) as number) ?? Math.round((question.min + question.max) / 2)) - question.min) / (question.max - question.min)) * 100}%, #e5e7eb 100%)`
                          }}
                          className="w-full h-3 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md"
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
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
                              }`}
                            >
                              <div className={`w-6 h-6 rounded flex items-center justify-center border-2 transition-all ${
                                isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
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
                                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                                  : 'border-gray-200 hover:border-blue-200 hover:shadow-md'
                              }`}
                            >
                              <div className={`text-4xl mb-3 ${isSelected ? 'scale-110' : ''} transition-transform`}>
                                {option === 'Time Constraints' && '⏰'}
                                {option === 'Technical Know-how' && '🔧'}
                                {option === 'Content Ideas' && '💡'}
                                {option === 'Production Quality' && '🎬'}
                              </div>
                              <h4 className={`font-semibold ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>{option}</h4>
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
                                  ? 'bg-blue-500 text-white shadow-lg'
                                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
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
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
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
                className="bg-blue-500 text-white font-semibold px-6 sm:px-10 py-3 sm:py-3.5 rounded-full hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {currentSection === sections.length - 1 ? 'See Results' : 'Next Section'}
              </button>
            </div>
          </div>

          {/* Character Illustration - Tablet and Desktop Only */}
          <div className="hidden md:flex md:flex-col md:items-center md:w-[350px] lg:w-[450px] flex-shrink-0 md:mt-4 lg:mt-8 md:ml-4 lg:ml-8">
            <img 
              src={characterConfigs[currentSection].image}
              alt="Evergreen Pal character illustration"
              className="w-full h-auto max-h-[500px] lg:max-h-[600px] object-contain animate-fade-in"
            />
            <div className="mt-3 lg:mt-4 bg-blue-50 rounded-2xl p-4 lg:p-6 border-2 border-blue-200 shadow-lg animate-scale-in">
              <p className="text-blue-800 font-semibold text-base lg:text-lg text-center">
                💡 Pro Tip: {characterConfigs[currentSection].tip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
