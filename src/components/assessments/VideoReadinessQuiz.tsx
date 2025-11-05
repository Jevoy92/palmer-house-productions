import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { 
  Target, 
  Sparkles, 
  TrendingUp, 
  Users, 
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Download,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
    type: 'emoji' | 'slider' | 'toggle' | 'buttons' | 'cards';
    options?: { label: string; value: string }[];
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
        type: 'emoji',
      },
      {
        id: 2,
        question: "Do you have a documented content strategy?",
        type: 'toggle',
      },
      {
        id: 3,
        question: "How well do you know your target audience's video preferences?",
        type: 'slider',
      },
    ],
  },
  {
    id: 2,
    title: "Production Capabilities",
    icon: Sparkles,
    questions: [
      {
        id: 4,
        question: "Current equipment quality level:",
        type: 'buttons',
        options: [
          { label: "📱 Smartphone Only", value: "beginner" },
          { label: "🎥 Basic Camera", value: "intermediate" },
          { label: "🎬 Professional Gear", value: "advanced" },
        ],
      },
      {
        id: 5,
        question: "Do you have consistent video branding (intros, outros, templates)?",
        type: 'toggle',
      },
      {
        id: 6,
        question: "How comfortable is your team with video creation?",
        type: 'slider',
      },
    ],
  },
  {
    id: 3,
    title: "Content Planning",
    icon: TrendingUp,
    questions: [
      {
        id: 7,
        question: "Do you use a content calendar?",
        type: 'toggle',
      },
      {
        id: 8,
        question: "How satisfied are you with your posting consistency?",
        type: 'emoji',
      },
      {
        id: 9,
        question: "How much of your content is repurposed across platforms?",
        type: 'slider',
      },
    ],
  },
  {
    id: 4,
    title: "Distribution & Analytics",
    icon: Users,
    questions: [
      {
        id: 10,
        question: "Which platforms are you actively using?",
        type: 'cards',
        options: [
          { label: "Instagram", value: "instagram" },
          { label: "TikTok", value: "tiktok" },
          { label: "YouTube", value: "youtube" },
          { label: "LinkedIn", value: "linkedin" },
        ],
      },
      {
        id: 11,
        question: "Do you track video performance metrics?",
        type: 'toggle',
      },
      {
        id: 12,
        question: "How well do you understand your video analytics?",
        type: 'slider',
      },
    ],
  },
  {
    id: 5,
    title: "Resources & Investment",
    icon: CheckCircle2,
    questions: [
      {
        id: 13,
        question: "Do you have a dedicated video budget?",
        type: 'toggle',
      },
      {
        id: 14,
        question: "Time available per week for video creation:",
        type: 'buttons',
        options: [
          { label: "< 2 hours", value: "low" },
          { label: "2-5 hours", value: "medium" },
          { label: "5+ hours", value: "high" },
        ],
      },
      {
        id: 15,
        question: "How ready are you to invest in video marketing?",
        type: 'slider',
      },
    ],
  },
];

const emojiOptions = ["😰", "😕", "😐", "🙂", "😄"];

export const VideoReadinessQuiz = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const handleAnswer = (questionId: number, value: string | number | string[]) => {
    const newAnswers = answers.filter(
      (a) => a.questionId !== questionId
    );
    newAnswers.push({
      sectionId: sections[currentSection].id,
      questionId,
      value,
    });
    setAnswers(newAnswers);
  };

  const getAnswer = (questionId: number) => {
    return answers.find((a) => a.questionId === questionId)?.value;
  };

  const isSectionComplete = () => {
    const currentQuestions = sections[currentSection].questions;
    return currentQuestions.every((q) =>
      answers.some((a) => a.questionId === q.id)
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

  // Initialize slider questions with default value
  useEffect(() => {
    sections.forEach((section) => {
      section.questions.forEach((question) => {
        if (question.type === 'slider' && !getAnswer(question.id)) {
          handleAnswer(question.id, 5);
        }
      });
    });
  }, []);

  const calculateDetailedScore = () => {
    const categoryScores: { [key: string]: { score: number; max: number } } = {};
    
    sections.forEach((section) => {
      let sectionScore = 0;
      let sectionMax = 0;

      section.questions.forEach((question) => {
        const answer = getAnswer(question.id);
        sectionMax += 10;

        if (question.type === 'emoji') {
          const emojiIndex = emojiOptions.indexOf(answer as string);
          sectionScore += (emojiIndex + 1) * 2;
        } else if (question.type === 'slider') {
          sectionScore += Number(answer) || 5;
        } else if (question.type === 'toggle') {
          sectionScore += answer ? 10 : 0;
        } else if (question.type === 'buttons') {
          const buttonValues: { [key: string]: number } = {
            beginner: 3,
            intermediate: 7,
            advanced: 10,
            low: 3,
            medium: 7,
            high: 10,
          };
          sectionScore += buttonValues[answer as string] || 0;
        } else if (question.type === 'cards') {
          const selected = answer as string[];
          sectionScore += selected?.length ? (selected.length / 4) * 10 : 0;
        }
      });

      categoryScores[section.title] = {
        score: Math.round(sectionScore),
        max: sectionMax,
      };
    });

    return categoryScores;
  };

  const getReadinessLevel = (percentage: number) => {
    if (percentage >= 80) return { level: "🚀 Video Ready", color: "text-green-600" };
    if (percentage >= 60) return { level: "📈 Building Momentum", color: "text-blue-600" };
    if (percentage >= 40) return { level: "🌱 Getting Started", color: "text-yellow-600" };
    return { level: "💡 Early Stage", color: "text-orange-600" };
  };

  const getRecommendation = (percentage: number) => {
    if (percentage >= 80) {
      return {
        title: "You're Ready to Scale!",
        description: "You have a strong foundation. Focus on optimization and advanced strategies.",
        nextSteps: [
          "Explore advanced content repurposing techniques",
          "Implement A/B testing for video performance",
          "Consider our Business Video Assets package for scaling",
        ],
      };
    }
    if (percentage >= 60) {
      return {
        title: "You're on the Right Track!",
        description: "You have the basics covered. Time to level up your strategy and consistency.",
        nextSteps: [
          "Develop a comprehensive content calendar",
          "Invest in quality equipment upgrades",
          "Check out our DIY Downloads for templates and tools",
        ],
      };
    }
    if (percentage >= 40) {
      return {
        title: "Great Potential Ahead!",
        description: "You're building momentum. Focus on establishing consistent processes.",
        nextSteps: [
          "Start with a simple content strategy",
          "Learn basic video editing techniques",
          "Book a strategy call to create your roadmap",
        ],
      };
    }
    return {
      title: "Perfect Time to Start!",
      description: "Every expert was once a beginner. Let's build your video foundation together.",
      nextSteps: [
        "Define your video marketing goals clearly",
        "Start with smartphone videos to build confidence",
        "Schedule a discovery call to explore your options",
      ],
    };
  };

  useEffect(() => {
    if (showResults) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [showResults]);

  const totalQuestions = sections.reduce((acc, s) => acc + s.questions.length, 0);
  const progress = ((answers.length / totalQuestions) * 100);

  if (showResults) {
    const categoryScores = calculateDetailedScore();
    const totalScore = Object.values(categoryScores).reduce((acc, { score }) => acc + score, 0);
    const totalMax = Object.values(categoryScores).reduce((acc, { max }) => acc + max, 0);
    const percentage = Math.round((totalScore / totalMax) * 100);
    const readiness = getReadinessLevel(percentage);
    const recommendation = getRecommendation(percentage);

    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-black text-foreground mb-4">
              Your Video Readiness Results
            </h2>
            <div className={`text-3xl font-bold mb-2 ${readiness.color}`}>
              {readiness.level}
            </div>
            <div className="text-6xl font-black text-foreground mb-4">{percentage}%</div>
            <p className="text-lg text-muted-foreground">
              Ready to level up your video marketing game
            </p>
          </div>

          {/* Category Breakdown */}
          <Card className="mb-8 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Category Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" value={openCategories} onValueChange={setOpenCategories}>
                {Object.entries(categoryScores).map(([category, { score, max }], index) => {
                  const categoryPercentage = Math.round((score / max) * 100);
                  return (
                    <AccordionItem key={category} value={`category-${index}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-4">
                          <span className="font-semibold">{category}</span>
                          <span className="text-sm font-bold">{categoryPercentage}%</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          <Progress value={categoryPercentage} className="h-2" />
                          <p className="text-sm text-muted-foreground">
                            Score: {score} / {max} points
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="mb-8 bg-gradient-to-br from-primary/5 to-primary/10 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                {recommendation.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{recommendation.description}</p>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Your Next Steps:
                </h4>
                <ul className="space-y-2">
                  {recommendation.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all"
            >
              <Calendar className="h-4 w-4" />
              Book a Strategy Call
            </Link>
            <Link
              to="/pals"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-bold rounded-xl hover:opacity-90 transition-all"
            >
              <Users className="h-4 w-4" />
              Explore Our Solutions
            </Link>
            <button
              onClick={() => {
                setShowResults(false);
                setCurrentSection(0);
                setAnswers([]);
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-muted text-muted-foreground font-bold rounded-xl hover:bg-muted/80 transition-all"
            >
              <RotateCcw className="h-4 w-4" />
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentSectionData = sections[currentSection];
  const SectionIcon = currentSectionData.icon;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Section {currentSection + 1} of {sections.length}
            </span>
            <span className="text-sm font-bold text-primary">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Quiz Card */}
          <div className="lg:col-span-2">
            <Card className="border-2 animate-fade-in" key={currentSection}>
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-3 animate-slide-in-right">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <SectionIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{currentSectionData.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {currentSectionData.questions.map((question) => (
                  <div key={question.id} className="space-y-4 pb-6 border-b border-border last:border-0 last:pb-0">
                    <h3 className="font-semibold text-lg text-foreground">{question.question}</h3>

                    {question.type === 'emoji' && (
                      <div className="flex justify-between gap-2">
                        {emojiOptions.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => handleAnswer(question.id, emoji)}
                            className={`text-4xl p-3 rounded-xl transition-all hover:scale-110 ${
                              getAnswer(question.id) === emoji
                                ? 'bg-primary/20 scale-110'
                                : 'hover:bg-muted'
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}

                    {question.type === 'slider' && (
                      <div className="space-y-4 pt-2">
                        <Slider
                          value={[Number(getAnswer(question.id)) || 5]}
                          onValueChange={(value) => handleAnswer(question.id, value[0])}
                          min={1}
                          max={10}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>1</span>
                          <span className="font-bold text-xl text-primary">
                            {getAnswer(question.id) || 5}
                          </span>
                          <span>10</span>
                        </div>
                      </div>
                    )}

                    {question.type === 'toggle' && (
                      <div className="flex items-center gap-4 pt-2">
                        <Switch
                          checked={Boolean(getAnswer(question.id))}
                          onCheckedChange={(checked) => handleAnswer(question.id, checked as any)}
                        />
                        <span className="text-base font-semibold text-foreground">
                          {getAnswer(question.id) ? '✓ Yes' : '✗ No'}
                        </span>
                      </div>
                    )}

                    {question.type === 'buttons' && question.options && (
                      <div className="grid gap-3 pt-2">
                        {question.options.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleAnswer(question.id, option.value)}
                            className={`p-4 rounded-xl border-2 font-medium transition-all text-left ${
                              getAnswer(question.id) === option.value
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {question.type === 'cards' && question.options && (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {question.options.map((option) => {
                          const selected = (getAnswer(question.id) as string[]) || [];
                          const isSelected = selected.includes(option.value);
                          return (
                            <button
                              key={option.value}
                              onClick={() => {
                                const newSelected = isSelected
                                  ? selected.filter((v) => v !== option.value)
                                  : [...selected, option.value];
                                handleAnswer(question.id, newSelected);
                              }}
                              className={`p-4 rounded-xl border-2 font-medium transition-all ${
                                isSelected
                                  ? 'border-primary bg-primary/10'
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}

                {/* Navigation */}
                <div className="flex gap-4 pt-6">
                  <button
                    onClick={handlePrevious}
                    disabled={currentSection === 0}
                    className="px-6 py-3 bg-muted text-muted-foreground font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/80 transition-all"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!isSectionComplete()}
                    className="flex-1 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all inline-flex items-center justify-center gap-2"
                  >
                    {currentSection === sections.length - 1 ? 'See Results' : 'Next Section'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Tip */}
          <div className="lg:block hidden">
            <Card className="border-2 bg-gradient-to-br from-primary/5 to-primary/10 sticky top-24">
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="font-bold text-lg mb-2">Pro Tip</h3>
                  <p className="text-sm text-muted-foreground">
                    Be honest with your answers to get the most accurate recommendations for your video journey!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
