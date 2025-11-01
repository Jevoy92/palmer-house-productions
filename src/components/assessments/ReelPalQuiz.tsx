import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Users,
  Calendar,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

type Answer = {
  sectionId: number;
  questionId: number;
  value: string | number;
};

type QuizSection = {
  id: number;
  title: string;
  icon: any;
  color: string;
  questions: {
    id: number;
    question: string;
    type: 'single' | 'scale';
    options?: string[];
    scaleLabels?: { min: string; max: string };
  }[];
};

const sections: QuizSection[] = [
  {
    id: 1,
    title: "Current Social Presence",
    icon: Users,
    color: "orange",
    questions: [
      {
        id: 1,
        question: "How often do you currently post on social media?",
        type: "single",
        options: ["Rarely or never", "Once a week", "2-3 times per week", "Daily", "Multiple times per day"]
      },
      {
        id: 2,
        question: "Which platforms are most important for your business?",
        type: "single",
        options: ["Instagram", "TikTok", "LinkedIn", "YouTube", "Multiple platforms"]
      },
      {
        id: 3,
        question: "How would you rate your current social media engagement?",
        type: "scale",
        scaleLabels: { min: "Very Low", max: "Very High" }
      }
    ]
  },
  {
    id: 2,
    title: "Content Creation Experience",
    icon: Sparkles,
    color: "purple",
    questions: [
      {
        id: 1,
        question: "How comfortable are you filming yourself?",
        type: "single",
        options: ["Very uncomfortable", "Somewhat uncomfortable", "Neutral", "Somewhat comfortable", "Very comfortable"]
      },
      {
        id: 2,
        question: "Do you have experience editing videos?",
        type: "single",
        options: ["No experience", "Basic editing", "Intermediate", "Advanced", "Professional level"]
      },
      {
        id: 3,
        question: "How long does it typically take you to create one social post?",
        type: "single",
        options: ["Less than 15 min", "15-30 min", "30-60 min", "1-2 hours", "More than 2 hours"]
      }
    ]
  },
  {
    id: 3,
    title: "Resources & Team",
    icon: Users,
    color: "green",
    questions: [
      {
        id: 1,
        question: "Who currently handles your social media content?",
        type: "single",
        options: ["Just me", "Me + 1 person", "Small team (2-3)", "Dedicated team", "Agency/Outsourced"]
      },
      {
        id: 2,
        question: "What equipment do you currently have?",
        type: "single",
        options: ["Just my phone", "Phone + basic accessories", "Semi-professional setup", "Professional equipment", "Full studio"]
      },
      {
        id: 3,
        question: "How much time can you dedicate weekly to content?",
        type: "single",
        options: ["Less than 1 hour", "1-3 hours", "3-5 hours", "5-10 hours", "10+ hours"]
      }
    ]
  },
  {
    id: 4,
    title: "Goals & Strategy",
    icon: Target,
    color: "blue",
    questions: [
      {
        id: 1,
        question: "What's your primary goal for social media?",
        type: "single",
        options: ["Brand awareness", "Lead generation", "Sales/conversions", "Community building", "Thought leadership"]
      },
      {
        id: 2,
        question: "Do you have a content strategy in place?",
        type: "single",
        options: ["No strategy", "Vague ideas", "Basic plan", "Detailed strategy", "Comprehensive roadmap"]
      },
      {
        id: 3,
        question: "How important is consistency to your brand?",
        type: "scale",
        scaleLabels: { min: "Not Important", max: "Critical" }
      }
    ]
  },
  {
    id: 5,
    title: "Investment & Commitment",
    icon: TrendingUp,
    color: "red",
    questions: [
      {
        id: 1,
        question: "What's your monthly budget for content creation?",
        type: "single",
        options: ["Under $500", "$500-$1,500", "$1,500-$3,000", "$3,000-$5,000", "$5,000+"]
      },
      {
        id: 2,
        question: "How committed are you to building a content library?",
        type: "scale",
        scaleLabels: { min: "Just Exploring", max: "Fully Committed" }
      },
      {
        id: 3,
        question: "When do you want to start seeing results?",
        type: "single",
        options: ["Immediately", "Within 1 month", "1-3 months", "3-6 months", "6+ months"]
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
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 shadow-2xl">
          <CardContent className="pt-12 pb-12 px-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{recommendation.icon}</div>
              <Badge className="mb-4 bg-orange-100 text-orange-700 px-4 py-2">
                {recommendation.level}
              </Badge>
              <h2 className="text-4xl font-bold mb-4">{recommendation.title}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                {recommendation.description}
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-purple-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4 text-center">My Recommendation</h3>
              <p className="text-center text-xl font-semibold mb-6">{recommendation.recommendation}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {recommendation.link.startsWith('http') ? (
                  <Button 
                    size="lg" 
                    className="bg-orange-500 hover:bg-orange-600"
                    asChild
                  >
                    <a href={recommendation.link} target="_blank" rel="noopener noreferrer">
                      {recommendation.action}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                ) : (
                  <Button 
                    size="lg" 
                    className="bg-orange-500 hover:bg-orange-600"
                    asChild
                  >
                    <Link to={recommendation.link}>
                      {recommendation.action}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                )}
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => {
                    setShowResults(false);
                    setCurrentSection(0);
                    setAnswers([]);
                  }}
                >
                  Retake Quiz
                </Button>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>Not sure? <Link to="/contact" className="text-orange-500 hover:underline">Schedule a free discovery call</Link> to discuss your unique situation.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center text-muted-foreground font-medium mb-3">
          <span>Section {currentSection + 1} of {sections.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex gap-8 items-start">
        {/* Main Quiz Card */}
        <Card className="flex-1 border-2 shadow-xl">
          <CardContent className="pt-8 pb-8 px-8">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                <currentSectionData.icon className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold">{currentSectionData.title}</h3>
            </div>

            {/* Questions */}
            <div className="space-y-8">
              {currentSectionData.questions.map((question) => (
                <div key={question.id} className="border-b pb-6 last:border-b-0">
                  <p className="text-lg font-medium mb-4">{question.question}</p>
                  
                  {question.type === 'single' && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option, idx) => {
                        const isSelected = getAnswer(question.id) === option;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(question.id, option)}
                            className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                              isSelected 
                                ? 'border-orange-500 bg-orange-50' 
                                : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50/50'
                            }`}
                          >
                            {isSelected ? (
                              <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                            )}
                            <span className={isSelected ? 'font-semibold' : ''}>{option}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {question.type === 'scale' && question.scaleLabels && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>{question.scaleLabels.min}</span>
                        <span>{question.scaleLabels.max}</span>
                      </div>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((value) => {
                          const isSelected = getAnswer(question.id) === value;
                          return (
                            <button
                              key={value}
                              onClick={() => handleAnswer(question.id, value)}
                              className={`flex-1 py-3 rounded-lg border-2 transition-all font-semibold ${
                                isSelected
                                  ? 'border-orange-500 bg-orange-500 text-white'
                                  : 'border-gray-200 hover:border-orange-200 hover:bg-orange-50'
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <Button
                onClick={handlePrevious}
                disabled={currentSection === 0}
                variant="outline"
                size="lg"
                className="min-w-[120px]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isSectionComplete()}
                size="lg"
                className="min-w-[120px] bg-orange-500 hover:bg-orange-600"
              >
                {currentSection === sections.length - 1 ? 'See Results' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Character Illustration - Desktop Only */}
        <div className="hidden lg:block w-80 flex-shrink-0 sticky top-8">
          <img 
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8d044c2b51-0865f11dd64a7ebb4c23.png"
            alt="Reel Pal character illustration"
            className="w-full h-auto object-contain"
          />
          <div className="mt-6 bg-orange-50 rounded-xl p-6 text-center">
            <p className="font-semibold mb-2">💡 Pro Tip</p>
            <p className="text-sm text-muted-foreground">
              Answer honestly to get the most accurate recommendation for your content journey!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
