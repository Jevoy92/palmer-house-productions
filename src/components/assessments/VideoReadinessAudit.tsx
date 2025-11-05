import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Video, 
  Target, 
  BarChart3,
  ArrowLeft,
  ArrowRight,
  Star,
  Trophy,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAssessmentProgress } from "@/hooks/useAssessmentProgress";
import { useAssessmentData } from "@/hooks/useAssessmentData";
import { ProgressResume } from "./ProgressResume";
import confetti from 'canvas-confetti';

interface VideoReadinessAuditProps {
  onBack?: () => void;
}

interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  questions: {
    id: string;
    text: string;
    points: number;
  }[];
}

interface SectionPerformance {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  gaps: string[];
  recommendations: string[];
}

interface AuditResults {
  overallScore: number;
  readinessLevel: string;
  description: string;
  sectionPerformance: SectionPerformance[];
  immediateActions: {
    title: string;
    description: string;
    priority: string;
    timeline: string;
    phase?: string;
  }[];
  suggestedServices: {
    name: string;
    description: string;
    matchScore: number;
    timeline: string;
    investment: string;
  }[];
  monthlyMilestones: {
    month: number;
    title: string;
    goals: string[];
    metrics: string[];
  }[];
}

export const VideoReadinessAudit = ({ onBack }: VideoReadinessAuditProps) => {
  const { progress, saveProgress, clearProgress, hasProgress } = useAssessmentProgress('video-readiness');
  const { saveAssessment } = useAssessmentData();
  const [currentSection, setCurrentSection] = useState(progress?.currentSection || 0);
  const [answers, setAnswers] = useState<Record<string, number>>(progress?.answers || {});
  const [showResults, setShowResults] = useState(false);
  const [emailForResults, setEmailForResults] = useState('');
  const [businessContext, setBusinessContext] = useState(progress?.businessContext || {
    industry: '',
    businessSize: '',
    currentVideoUse: ''
  });
  const [showResumePrompt, setShowResumePrompt] = useState(hasProgress && !showResults);
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  const sections: AssessmentSection[] = [
    {
      id: 'strategic',
      title: 'Strategic Foundation',
      description: 'Assess your video marketing strategy and planning',
      questions: [
        { id: 'clear-goals', text: 'Do you have clear, measurable video marketing goals?', points: 5 },
        { id: 'target-audience', text: 'Have you defined your target audience and their video preferences?', points: 5 },
        { id: 'content-strategy', text: 'Do you have a documented content strategy?', points: 4 },
        { id: 'competitor-analysis', text: 'Have you analyzed competitor video strategies?', points: 3 },
        { id: 'success-metrics', text: 'Do you track video performance metrics consistently?', points: 4 },
        { id: 'budget-allocated', text: 'Do you have a dedicated video marketing budget?', points: 3 }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Readiness',
      description: 'Evaluate your technical capabilities and resources',
      questions: [
        { id: 'equipment-basic', text: 'Do you have basic video equipment (camera, microphone)?', points: 4 },
        { id: 'lighting-setup', text: 'Do you have proper lighting equipment or setup?', points: 3 },
        { id: 'editing-software', text: 'Do you have access to video editing software?', points: 4 },
        { id: 'hosting-platform', text: 'Do you have a video hosting and distribution strategy?', points: 4 },
        { id: 'technical-skills', text: 'Does your team have video production and editing skills?', points: 5 }
      ]
    },
    {
      id: 'content',
      title: 'Content Planning',
      description: 'Review your content creation and planning processes',
      questions: [
        { id: 'content-calendar', text: 'Do you maintain a consistent content calendar?', points: 4 },
        { id: 'script-templates', text: 'Do you have standardized script templates or frameworks?', points: 3 },
        { id: 'brand-guidelines', text: 'Do you have video brand guidelines and style standards?', points: 4 },
        { id: 'approval-process', text: 'Is there a clear content review and approval process?', points: 3 },
        { id: 'repurposing-strategy', text: 'Do you have a content repurposing and distribution strategy?', points: 4 }
      ]
    },
    {
      id: 'distribution',
      title: 'Distribution & Analytics',
      description: 'Assess your distribution channels and measurement capabilities',
      questions: [
        { id: 'multi-platform', text: 'Do you distribute content across multiple relevant platforms?', points: 4 },
        { id: 'optimization', text: 'Do you optimize videos for each platform (format, length, etc.)?', points: 4 },
        { id: 'analytics-tracking', text: 'Do you regularly analyze video performance data?', points: 5 },
        { id: 'audience-engagement', text: 'Do you actively engage with your video audience?', points: 3 },
        { id: 'roi-measurement', text: 'Can you measure the ROI of your video marketing efforts?', points: 4 }
      ]
    }
  ];

  const calculateResults = (): AuditResults => {
    const sectionPerformance = sections.map(section => {
      const sectionAnswers = section.questions.filter(q => answers[q.id] !== undefined);
      const score = sectionAnswers.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
      const maxScore = section.questions.reduce((sum, q) => sum + q.points, 0);
      const percentage = Math.round((score / maxScore) * 100);

      const gaps: string[] = [];
      const recommendations: string[] = [];

      section.questions.forEach(q => {
        if ((answers[q.id] || 0) < q.points * 0.6) {
          gaps.push(q.text);
          
          // Add specific recommendations based on question type
          if (q.id.includes('goals')) recommendations.push('Define SMART video marketing objectives');
          if (q.id.includes('audience')) recommendations.push('Conduct audience research and create viewer personas');
          if (q.id.includes('equipment')) recommendations.push('Invest in basic video production equipment');
          if (q.id.includes('analytics')) recommendations.push('Set up comprehensive video analytics tracking');
        }
      });

      return {
        name: section.title,
        score,
        maxScore,
        percentage,
        gaps,
        recommendations
      };
    });

    const totalScore = sectionPerformance.reduce((sum, section) => sum + section.score, 0);
    const maxTotalScore = sectionPerformance.reduce((sum, section) => sum + section.maxScore, 0);
    const overallScore = Math.round((totalScore / maxTotalScore) * 100);

    let readinessLevel = '';
    let description = '';

    if (overallScore >= 85) {
      readinessLevel = 'Video Marketing Advanced';
      description = 'Your organization has excellent video marketing capabilities and is ready for advanced strategies.';
    } else if (overallScore >= 70) {
      readinessLevel = 'Video Marketing Ready';
      description = 'You have solid foundations in place and are ready to scale your video marketing efforts.';
    } else if (overallScore >= 50) {
      readinessLevel = 'Video Marketing Developing';
      description = 'You have some video marketing elements in place but need to strengthen key areas.';
    } else {
      readinessLevel = 'Video Marketing Beginner';
      description = 'You are in the early stages of video marketing and need foundational development.';
    }

    // Generate phase-based immediate actions
    const immediateActions = [];
    const weakestSections = sectionPerformance
      .filter(section => section.percentage < 70)
      .sort((a, b) => a.percentage - b.percentage)
      .slice(0, 4);

    weakestSections.forEach((section, index) => {
      const priority = index === 0 ? 'High' : index === 1 ? 'Medium' : 'Low';
      const timeline = priority === 'High' ? '1-2 weeks' : priority === 'Medium' ? '2-4 weeks' : '1-2 months';
      
      section.recommendations.slice(0, 2).forEach(rec => {
        immediateActions.push({
          title: rec,
          description: `Focus on ${section.name.toLowerCase()} improvements to strengthen your video marketing foundation.`,
          priority,
          timeline,
          phase: section.name
        });
      });
    });

    // Generate monthly milestones
    const monthlyMilestones = [
      {
        month: 1,
        title: 'Foundation Setup',
        goals: ['Complete video marketing audit', 'Define clear objectives', 'Set up basic equipment'],
        metrics: ['Goal clarity score', 'Equipment readiness', 'Team training completion']
      },
      {
        month: 2,
        title: 'Content Strategy Development',
        goals: ['Create content calendar', 'Develop script templates', 'Establish brand guidelines'],
        metrics: ['Content calendar completion', 'Script template usage', 'Brand consistency score']
      },
      {
        month: 3,
        title: 'Production & Publishing',
        goals: ['Produce first video series', 'Optimize distribution channels', 'Begin audience engagement'],
        metrics: ['Video production rate', 'Platform optimization', 'Engagement rate']
      },
      {
        month: 4,
        title: 'Analytics & Optimization',
        goals: ['Implement tracking systems', 'Analyze performance data', 'Refine strategy based on insights'],
        metrics: ['Analytics setup completion', 'Performance improvement', 'Strategy refinements']
      },
      {
        month: 5,
        title: 'Scale & Expand',
        goals: ['Increase content volume', 'Expand to new platforms', 'Advanced optimization'],
        metrics: ['Content volume increase', 'Platform expansion', 'Advanced metric tracking']
      },
      {
        month: 6,
        title: 'Mastery & Innovation',
        goals: ['Implement advanced strategies', 'Explore new video formats', 'Maximize ROI'],
        metrics: ['ROI improvement', 'Innovation implementation', 'Market leadership position']
      }
    ];

    // Generate service recommendations based on score and gaps
    const suggestedServices = [];
    
    if (overallScore < 50) {
      suggestedServices.push({
        name: 'DIY Video Marketing Starter Kit',
        description: 'Templates, training, and step-by-step guides to build your foundation',
        matchScore: 95,
        timeline: '2-4 weeks',
        investment: '$500-$1,500'
      });
    }
    
    if (overallScore >= 30 && overallScore < 70) {
      suggestedServices.push({
        name: 'Business Video Assets',
        description: 'Strategic video systems that replace repetitive operations',
        matchScore: 88,
        timeline: '2-3 months',
        investment: '$4,500-$6,500'
      });
    }
    
    if (overallScore >= 50) {
      suggestedServices.push({
        name: 'Other Video Bundles',
        description: 'Specialized video solutions and content packages',
        matchScore: 92,
        timeline: '1-3 months',
        investment: '$2,500-$7,500'
      });
    }

    return {
      overallScore,
      readinessLevel,
      description,
      sectionPerformance,
      immediateActions,
      suggestedServices,
      monthlyMilestones
    };
  };

  const handleAnswer = (questionId: string, value: number) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    // Auto-save progress
    saveProgress({
      currentSection,
      answers: newAnswers,
      businessContext
    });
  };

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      const newSection = currentSection + 1;
      setCurrentSection(newSection);
      saveProgress({
        currentSection: newSection,
        answers,
        businessContext
      });
    }
  };

  const handleShowResults = () => {
    const results = calculateResults();
    
    // Save assessment to persistent storage
    saveAssessment({
      type: 'video-readiness',
      score: results.overallScore,
      level: results.readinessLevel,
      completedAt: Date.now(),
      businessContext,
      answers,
      recommendations: results.immediateActions.map(a => a.title)
    });
    
    setShowResults(true);
    clearProgress(); // Clear saved progress once results are shown
  };

  // Confetti effect for results
  useEffect(() => {
    if (showResults) {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [showResults]);

  const handleEmailSubmit = () => {
    // Email results functionality
  };

  const handleResumeProgress = () => {
    setShowResumePrompt(false);
  };

  const handleRestartAssessment = () => {
    clearProgress();
    setCurrentSection(0);
    setAnswers({});
    setBusinessContext({ industry: '', businessSize: '', currentVideoUse: '' });
    setShowResumePrompt(false);
  };

  if (showResumePrompt) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <ProgressResume
          assessmentType="Video Readiness Audit"
          currentSection={progress?.currentSection || 0}
          totalSections={sections.length}
          lastSaved={progress?.timestamp || Date.now()}
          onResume={handleResumeProgress}
          onRestart={handleRestartAssessment}
        />
      </div>
    );
  }

  if (showResults) {
    const results = calculateResults();
    
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
        {/* Overall Score */}
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 text-white text-center mb-6 sm:mb-8">
          <Trophy className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 animate-scale-in" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Assessment Complete!</h2>
          <div className="text-6xl sm:text-7xl md:text-8xl font-bold mb-3 sm:mb-4">{results.overallScore}%</div>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">{results.readinessLevel}</p>
          <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto mt-2">{results.description}</p>
        </div>

        {/* Category Breakdown */}
        <div className="bg-card rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground flex items-center gap-3">
            <BarChart3 className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
            Category Breakdown
          </h3>
          
          <Accordion type="multiple" value={openCategories} onValueChange={setOpenCategories} className="space-y-3 sm:space-y-4">
            {results.sectionPerformance.map((section) => {
              return (
                <AccordionItem key={section.name} value={section.name} className="border border-border rounded-2xl px-4 sm:px-6 overflow-hidden">
                  <AccordionTrigger className="hover:no-underline py-4 sm:py-6">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                        <span className="font-semibold text-base sm:text-lg text-left">{section.name}</span>
                      </div>
                      <span className="text-xl sm:text-2xl font-bold text-primary">{section.percentage}%</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 sm:pb-6">
                    <div className="bg-muted rounded-xl p-4 sm:p-6 mt-2 space-y-3">
                      <div className="mb-2">
                        <Progress value={section.percentage} className="h-2" />
                        <p className="text-sm text-muted-foreground mt-1">Score: {section.score} / {section.maxScore} points</p>
                      </div>
                      {section.recommendations.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Recommendations:</h4>
                          <ul className="space-y-1">
                            {section.recommendations.slice(0, 3).map((rec, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Action Items */}
        <div className="bg-card rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 mb-6 sm:mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground flex items-center gap-3">
            <Target className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
            Your Next Steps
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {results.immediateActions.slice(0, 5).map((item, index) => (
              <div key={index} className="flex gap-3 sm:gap-4 p-4 sm:p-5 bg-muted rounded-xl hover:bg-muted/80 transition-colors">
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm sm:text-base">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm sm:text-base text-foreground mb-1">{item.title}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">{item.priority} Priority</Badge>
                    <Badge variant="outline" className="text-xs">{item.timeline}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation CTA */}
        <div className="bg-gradient-to-br from-muted to-primary/10 rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border-2 border-primary/20">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-foreground">Ready to Level Up Your Video Strategy?</h3>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
            Based on your assessment, we can help you implement these recommendations and accelerate your video marketing success.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link 
              to="/contact" 
              className="flex-1 bg-primary text-primary-foreground text-center font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Schedule Strategy Call →
            </Link>
            <button 
              onClick={() => window.location.reload()} 
              className="flex-1 bg-card text-foreground border-2 border-border text-center font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-muted transition-all"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Assessment form
  const currentSectionData = sections[currentSection];
  const answeredQuestions = currentSectionData.questions.filter(q => answers[q.id] !== undefined);
  const sectionProgress = Math.round((answeredQuestions.length / currentSectionData.questions.length) * 100);
  const overallProgress = Math.round(((currentSection + (sectionProgress / 100)) / sections.length) * 100);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline">
              Section {currentSection + 1} of {sections.length}
            </Badge>
            <Badge variant="secondary">
              {overallProgress}% Complete
            </Badge>
          </div>
          
          <Progress value={overallProgress} className="mb-4" />
          
          <CardTitle className="flex items-center gap-3">
            <Video className="h-6 w-6 text-primary" />
            {currentSectionData.title}
          </CardTitle>
          <CardDescription>
            {currentSectionData.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {currentSectionData.questions.map((question) => (
            <div key={question.id} className="space-y-3">
              <Label className="text-base font-medium">
                {question.text}
              </Label>
              <ToggleGroup
                type="single"
                value={answers[question.id]?.toString()}
                onValueChange={(value) => value && handleAnswer(question.id, parseInt(value))}
                className="flex flex-wrap gap-2"
                variant="outline"
                size="sm"
              >
                <ToggleGroupItem value="0" aria-label="No">No</ToggleGroupItem>
                <ToggleGroupItem value={Math.round(question.points * 0.5).toString()} aria-label="Partially">Partially</ToggleGroupItem>
                <ToggleGroupItem value={question.points.toString()} aria-label="Yes">Yes</ToggleGroupItem>
              </ToggleGroup>
            </div>
          ))}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentSection === sections.length - 1 ? (
              <Button 
                onClick={handleShowResults}
                disabled={answeredQuestions.length < currentSectionData.questions.length}
              >
                View Results
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleNextSection}
                disabled={answeredQuestions.length < currentSectionData.questions.length}
              >
                Next Section
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};