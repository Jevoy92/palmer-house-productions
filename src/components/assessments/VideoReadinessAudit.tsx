import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  CheckCircle, 
  CheckCircle2,
  AlertCircle,
  AlertTriangle, 
  TrendingUp, 
  Video, 
  Target, 
  BarChart3,
  ArrowLeft,
  ArrowRight,
  Star,
  Trophy,
  Sparkles,
  ChevronDown,
  ChevronUp
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
          <div className="text-8xl font-bold mb-4">{results.overallScore}%</div>
          <div className="inline-block bg-white/20 px-8 py-3 rounded-full mb-6">
            <p className="text-2xl font-semibold">{results.readinessLevel}</p>
          </div>
          <p className="text-xl max-w-2xl mx-auto">
            {results.description}
          </p>
        </div>

        {/* Category Breakdown with Insights */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10 mb-8">
          <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Breakdown by Category</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {results.sectionPerformance.map((section) => {
              const isOpen = openCategories.includes(section.name);
              const status = section.percentage >= 70 ? 'strong' : section.percentage >= 40 ? 'developing' : 'opportunity';
              
              return (
                <Collapsible key={section.name} open={isOpen} onOpenChange={() => toggleCategory(section.name)}>
                  <div className={`border-2 rounded-xl overflow-hidden transition-colors ${
                    status === 'strong' ? 'border-green-300 bg-green-50/50' :
                    status === 'developing' ? 'border-yellow-300 bg-yellow-50/50' :
                    'border-blue-300 bg-blue-50/50'
                  }`}>
                    <CollapsibleTrigger className="w-full p-6 text-left hover:bg-white/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-lg text-gray-800 flex-1">{section.name}</h4>
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
                              style={{ width: `${section.percentage}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-gray-700">{section.percentage}%</span>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="px-6 pb-6 pt-2">
                        <div className="space-y-3 pt-3 border-t border-gray-200">
                          <div className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="font-semibold">Score:</span>
                            <span>{section.score} / {section.maxScore} points</span>
                          </div>
                          {section.recommendations.length > 0 && (
                            <div>
                              <h5 className="font-semibold text-sm mb-2 text-gray-700">Top Recommendations:</h5>
                              <ul className="space-y-2">
                                {section.recommendations.slice(0, 3).map((rec, i) => (
                                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                    {status === 'strong' ? (
                                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                    ) : (
                                      <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                    )}
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
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
            {results.immediateActions.slice(0, 5).map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="text-lg text-gray-800 font-semibold mb-1">{item.title}</p>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs bg-white">
                      {item.priority} Priority
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-white">
                      {item.timeline}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendation CTA */}
        <div className="bg-blue-50 rounded-3xl shadow-xl p-8 lg:p-12 mb-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-3xl font-bold mb-4 text-gray-800">Ready to Level Up Your Video Strategy?</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              Based on your assessment, we can help you implement these recommendations and accelerate your video marketing success.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-600/30 text-center flex items-center justify-center gap-2"
            >
              Schedule Strategy Call
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button 
              onClick={() => {
                setShowResults(false);
                setCurrentSection(0);
                setAnswers({});
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

  // Assessment form
  const currentSectionData = sections[currentSection];
  const answeredQuestions = currentSectionData.questions.filter(q => answers[q.id] !== undefined);
  const sectionProgress = Math.round((answeredQuestions.length / currentSectionData.questions.length) * 100);
  const overallProgress = Math.round(((currentSection + (sectionProgress / 100)) / sections.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Progress Header */}
      <div className="px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex justify-between items-center text-gray-500 font-medium mb-2 text-sm sm:text-base">
          <span>Section {currentSection + 1} of {sections.length}</span>
          <span>{Math.round(overallProgress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Main Quiz Card */}
        <div className="flex-grow w-full md:max-w-3xl">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12">
            {/* Section Header */}
            <div className="flex items-center justify-center space-x-3 mb-6 sm:mb-8">
              <Video className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">{currentSectionData.title}</h1>
            </div>

            <p className="text-center text-gray-600 mb-6 sm:mb-8">{currentSectionData.description}</p>

            {/* Questions */}
            <div className="space-y-6 sm:space-y-8">
              {currentSectionData.questions.map((question) => {
                const answer = answers[question.id];
                const hasAnswer = answer !== undefined;
                
                return (
                  <div key={question.id} className="py-3 sm:py-4 border-b border-gray-200 last:border-b-0">
                    <p className="text-base sm:text-lg text-gray-700 mb-4 font-medium">{question.text}</p>
                    
                    <div className="flex items-center justify-center space-x-3">
                      <span className={`text-lg font-semibold ${answer === question.points ? 'text-blue-600' : 'text-gray-400'}`}>
                        {answer === question.points ? '✓ Yes' : answer === 0 ? '✗ No' : answer === Math.round(question.points * 0.5) ? '~ Partially' : 'No'}
                      </span>
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAnswer(question.id, 0)}
                              className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm ${
                                answer === 0
                                  ? 'bg-red-500 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              No
                            </button>
                            <button
                              onClick={() => handleAnswer(question.id, Math.round(question.points * 0.5))}
                              className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm ${
                                answer === Math.round(question.points * 0.5)
                                  ? 'bg-yellow-500 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              Partially
                            </button>
                            <button
                              onClick={() => handleAnswer(question.id, question.points)}
                              className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm ${
                                answer === question.points
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              Yes
                            </button>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 sm:mt-12 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              <button
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
                className="bg-gray-200 text-gray-600 font-semibold px-6 sm:px-10 py-3 sm:py-3.5 rounded-full hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                Previous
              </button>
              <button
                onClick={currentSection === sections.length - 1 ? handleShowResults : handleNextSection}
                disabled={answeredQuestions.length < currentSectionData.questions.length}
                className="bg-blue-600 text-white font-semibold px-6 sm:px-10 py-3 sm:py-3.5 rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {currentSection === sections.length - 1 ? 'View Results' : 'Next Section'}
              </button>
            </div>
          </div>
        </div>

        {/* Pro Tip Sidebar - Tablet and Desktop Only */}
        <div className="hidden md:flex md:flex-col md:items-center md:w-[350px] lg:w-[450px] flex-shrink-0 md:mt-4 lg:mt-8 md:ml-4 lg:ml-8">
          <div className="w-full bg-blue-50 rounded-2xl p-6 lg:p-8 border-2 border-blue-200 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <Target className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Pro Tip</h3>
            <p className="text-blue-800 font-medium text-base text-center">
              Be honest with your answers to get the most accurate recommendations for your video journey!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};