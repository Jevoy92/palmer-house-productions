import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { 
  Activity, 
  Eye, 
  BarChart3, 
  Zap, 
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Calendar,
  Lightbulb
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Answer = {
  sectionId: number;
  questionId: number;
  value: string | number | string[] | boolean;
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
    title: "Content Health",
    icon: Activity,
    questions: [
      {
        id: 1,
        question: "How consistent is your video posting schedule?",
        type: 'emoji',
      },
      {
        id: 2,
        question: "What percentage of your videos follow a consistent brand style?",
        type: 'slider',
      },
      {
        id: 3,
        question: "Do you repurpose content across multiple platforms?",
        type: 'toggle',
      },
    ],
  },
  {
    id: 2,
    title: "Visibility & Reach",
    icon: Eye,
    questions: [
      {
        id: 4,
        question: "Which platforms are you actively posting video content on?",
        type: 'cards',
        options: [
          { label: "Instagram", value: "instagram" },
          { label: "TikTok", value: "tiktok" },
          { label: "YouTube", value: "youtube" },
          { label: "LinkedIn", value: "linkedin" },
          { label: "Facebook", value: "facebook" },
          { label: "Twitter/X", value: "twitter" },
        ],
      },
      {
        id: 5,
        question: "Are you using SEO-optimized titles and descriptions?",
        type: 'toggle',
      },
      {
        id: 6,
        question: "How often do you use hashtags or keywords strategically?",
        type: 'buttons',
        options: [
          { label: "Never", value: "never" },
          { label: "Sometimes", value: "sometimes" },
          { label: "Always", value: "always" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Performance & Analytics",
    icon: BarChart3,
    questions: [
      {
        id: 7,
        question: "Do you regularly review your video analytics?",
        type: 'toggle',
      },
      {
        id: 8,
        question: "How satisfied are you with your current engagement rates?",
        type: 'emoji',
      },
      {
        id: 9,
        question: "On a scale of 1-10, how well do you understand what makes your videos perform?",
        type: 'slider',
      },
    ],
  },
  {
    id: 4,
    title: "Engagement & Growth",
    icon: Zap,
    questions: [
      {
        id: 10,
        question: "Do you have clear calls-to-action in your videos?",
        type: 'toggle',
      },
      {
        id: 11,
        question: "How actively do you respond to comments and engage with viewers?",
        type: 'buttons',
        options: [
          { label: "Rarely", value: "low" },
          { label: "Sometimes", value: "medium" },
          { label: "Consistently", value: "high" },
        ],
      },
      {
        id: 12,
        question: "Rate your video thumbnails and hooks effectiveness:",
        type: 'slider',
      },
    ],
  },
  {
    id: 5,
    title: "Technical Quality",
    icon: CheckCircle2,
    questions: [
      {
        id: 13,
        question: "Do your videos have good audio quality?",
        type: 'toggle',
      },
      {
        id: 14,
        question: "Do you use captions or subtitles?",
        type: 'toggle',
      },
      {
        id: 15,
        question: "How would you rate your overall video production quality?",
        type: 'emoji',
      },
    ],
  },
];

const emojiOptions = ["😰", "😕", "😐", "🙂", "😄"];

export const VideoHealthCheckQuiz = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const handleAnswer = (questionId: number, value: string | number | string[] | boolean) => {
    const newAnswers = answers.filter((a) => a.questionId !== questionId);
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
    return currentQuestions.every((q) => answers.some((a) => a.questionId === q.id));
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
            never: 0,
            sometimes: 5,
            always: 10,
            low: 3,
            medium: 7,
            high: 10,
          };
          sectionScore += buttonValues[answer as string] || 0;
        } else if (question.type === 'cards') {
          const selected = answer as string[];
          sectionScore += selected?.length ? Math.min((selected.length / 3) * 10, 10) : 0;
        }
      });

      categoryScores[section.title] = {
        score: Math.round(sectionScore),
        max: sectionMax,
      };
    });

    return categoryScores;
  };

  const getHealthStatus = (percentage: number) => {
    if (percentage >= 80) return { status: "💪 Excellent Health", color: "text-green-600" };
    if (percentage >= 60) return { status: "✅ Good Shape", color: "text-blue-600" };
    if (percentage >= 40) return { status: "⚠️ Needs Attention", color: "text-yellow-600" };
    return { status: "🚨 Critical", color: "text-red-600" };
  };

  const getRecommendations = (percentage: number, categoryScores: { [key: string]: { score: number; max: number } }) => {
    const weakestCategory = Object.entries(categoryScores)
      .sort(([, a], [, b]) => (a.score / a.max) - (b.score / b.max))[0];

    if (percentage >= 80) {
      return {
        title: "Your Video Presence is Strong! 🎉",
        description: "You're doing excellent work. Focus on optimization and scaling.",
        actions: [
          "Experiment with advanced content strategies",
          "Consider launching a consistent video series",
          "Explore our Business Video Assets for scaling",
        ],
      };
    }
    if (percentage >= 60) {
      return {
        title: "You're on the Right Path! 📈",
        description: `Good foundation, but there's room for improvement, especially in ${weakestCategory[0]}.`,
        actions: [
          "Develop a more consistent posting schedule",
          "Improve your video SEO and discoverability",
          "Book a strategy call to optimize performance",
        ],
      };
    }
    if (percentage >= 40) {
      return {
        title: "Time to Level Up! 🚀",
        description: `Your ${weakestCategory[0]} needs immediate attention to boost results.`,
        actions: [
          "Start tracking analytics consistently",
          "Improve video quality and consistency",
          "Explore our DIY Downloads for quick wins",
        ],
      };
    }
    return {
      title: "Let's Transform Your Video Presence! 💡",
      description: "You have significant opportunities for growth. Let's build a strong foundation.",
      actions: [
        "Schedule a discovery call to assess your needs",
        "Focus on content quality before quantity",
        "Implement basic video best practices",
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
  const progress = (answers.length / totalQuestions) * 100;

  if (showResults) {
    const categoryScores = calculateDetailedScore();
    const totalScore = Object.values(categoryScores).reduce((acc, { score }) => acc + score, 0);
    const totalMax = Object.values(categoryScores).reduce((acc, { max }) => acc + max, 0);
    const percentage = Math.round((totalScore / totalMax) * 100);
    const healthStatus = getHealthStatus(percentage);
    const recommendations = getRecommendations(percentage, categoryScores);

    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-black text-foreground mb-4">
              Your Video Health Report
            </h2>
            <div className={`text-3xl font-bold mb-2 ${healthStatus.color}`}>
              {healthStatus.status}
            </div>
            <div className="text-6xl font-black text-foreground mb-4">{percentage}%</div>
            <p className="text-lg text-muted-foreground">
              Overall Video Marketing Health Score
            </p>
          </div>

          {/* Category Breakdown */}
          <Card className="mb-8 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Detailed Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" value={openCategories} onValueChange={setOpenCategories}>
                {Object.entries(categoryScores).map(([category, { score, max }], index) => {
                  const categoryPercentage = Math.round((score / max) * 100);
                  const CategoryIcon = sections.find(s => s.title === category)?.icon;
                  return (
                    <AccordionItem key={category} value={`category-${index}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-4">
                          <div className="flex items-center gap-2">
                            {CategoryIcon && <CategoryIcon className="h-4 w-4" />}
                            <span className="font-semibold">{category}</span>
                          </div>
                          <span className={`text-sm font-bold ${
                            categoryPercentage >= 70 ? 'text-green-600' :
                            categoryPercentage >= 50 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {categoryPercentage}%
                          </span>
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
                <Lightbulb className="h-5 w-5" />
                {recommendations.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{recommendations.description}</p>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Recommended Actions:
                </h4>
                <ul className="space-y-2">
                  {recommendations.actions.map((action, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                      <span className="text-sm">{action}</span>
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
              Get Expert Help
            </Link>
            <Link
              to="/services/diy-downloads"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-bold rounded-xl hover:opacity-90 transition-all"
            >
              <Zap className="h-4 w-4" />
              Browse Solutions
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
              Retake Assessment
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
            <Card className="border-2">
              <CardHeader className="space-y-4">
                <div className="flex items-center gap-3">
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
                  <div key={question.id} className="space-y-4">
                    <h3 className="font-semibold text-lg">{question.question}</h3>

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
                      <div className="space-y-4">
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
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={getAnswer(question.id) as boolean}
                          onCheckedChange={(checked) => handleAnswer(question.id, checked)}
                        />
                        <span className="text-sm font-medium">
                          {getAnswer(question.id) ? 'Yes' : 'No'}
                        </span>
                      </div>
                    )}

                    {question.type === 'buttons' && question.options && (
                      <div className="grid gap-3">
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
                      <div className="grid grid-cols-2 gap-3">
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
                  <div className="text-6xl mb-4">🩺</div>
                  <h3 className="font-bold text-lg mb-2">Health Check Tip</h3>
                  <p className="text-sm text-muted-foreground">
                    This assessment evaluates both your content visibility and overall video marketing health. Be thorough for accurate diagnostics!
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
