import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Video, 
  Target, 
  BarChart3,
  ArrowLeft,
  ArrowRight,
  Star
} from "lucide-react";
import { useAssessmentProgress } from "@/hooks/useAssessmentProgress";
import { useAssessmentData } from "@/hooks/useAssessmentData";
import { ProgressResume } from "./ProgressResume";
import { ResultsExport } from "./ResultsExport";
import { EnhancedResults } from "./EnhancedResults";
import { SmartBookingButton } from "./SmartBookingButton";

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
        name: 'Group Video Marketing Coaching',
        description: 'Structured group coaching to develop strategy and skills',
        matchScore: 88,
        timeline: '2-3 months',
        investment: '$2,500-$5,000'
      });
    }
    
    if (overallScore >= 50) {
      suggestedServices.push({
        name: 'Monthly Content Partnership',
        description: 'Professional video creation and strategic guidance',
        matchScore: 92,
        timeline: '3-6 months',
        investment: '$8,000-$15,000'
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

  const handleEmailSubmit = () => {
    console.log('Email results to:', emailForResults);
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
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Your Video Readiness Assessment</CardTitle>
            <CardDescription>
              Based on your responses, here's your personalized video marketing readiness report
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <EnhancedResults
              score={results.overallScore}
              level={results.readinessLevel}
              sectionScores={results.sectionPerformance.reduce((acc, section) => ({
                ...acc,
                [section.name.toLowerCase().replace(/\s+/g, '')]: section.percentage
              }), {})}
              priorities={results.immediateActions.map((action, index) => ({
                id: `action-${index}`,
                title: action.title,
                description: action.description,
                impact: action.priority as 'High' | 'Medium' | 'Low',
                effort: 'Medium' as 'High' | 'Medium' | 'Low',
                timeline: action.timeline,
                category: action.phase || 'General'
              }))}
              milestones={results.monthlyMilestones || []}
              industryBenchmark={65}
              confidenceScore={85}
              onGetDetailedPlan={() => console.log('Book consultation')}
            />

            <div className="mt-6 flex justify-center">
              <SmartBookingButton
                assessmentType="Video Readiness Audit"
                score={results.overallScore}
                level={results.readinessLevel}
                recommendations={results.immediateActions.map(a => a.title)}
                businessContext={businessContext}
                onDownloadResults={() => {
                  const content = `
Video Readiness Audit Results
Assessment Score: ${results.overallScore}%
Readiness Level: ${results.readinessLevel}

Top Recommendations:
${results.immediateActions.slice(0, 5).map((action, i) => `${i + 1}. ${action.title}`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
                  `.trim();
                  
                  const blob = new Blob([content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `video-readiness-audit-${Date.now()}.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                buttonText="Schedule Strategy Call Based on Results"
                size="lg"
              />
            </div>

            <ResultsExport
              assessmentType="Video Readiness Audit"
              score={results.overallScore}
              level={results.readinessLevel}
              recommendations={results.immediateActions.map(a => a.title)}
              businessContext={businessContext}
            />

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              {onBack && (
                <Button variant="outline" onClick={onBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              <Button onClick={() => window.location.reload()} className="ml-auto">
                Take Another Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
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