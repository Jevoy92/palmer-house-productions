import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Lightbulb,
  ArrowRight,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

interface AssessmentData {
  type: string;
  score: number;
  completedAt: number;
  businessContext: any;
  answers: any;
}

interface IntelligenceInsight {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  nextSteps: string[];
  relatedAssessments: string[];
}

interface AssessmentIntelligenceProps {
  assessments: AssessmentData[];
  onTakeAssessment: (type: string) => void;
  onScheduleConsultation: () => void;
}

export const AssessmentIntelligence = ({ 
  assessments, 
  onTakeAssessment, 
  onScheduleConsultation 
}: AssessmentIntelligenceProps) => {
  const [insights, setInsights] = useState<IntelligenceInsight[]>([]);
  const [overallReadiness, setOverallReadiness] = useState(0);

  useEffect(() => {
    generateIntelligentInsights();
  }, [assessments]);

  const generateIntelligentInsights = () => {
    const completedTypes = assessments.map(a => a.type);
    const newInsights: IntelligenceInsight[] = [];

    // Calculate overall readiness score
    const totalScore = assessments.reduce((sum, a) => sum + a.score, 0);
    const avgScore = assessments.length > 0 ? totalScore / assessments.length : 0;
    setOverallReadiness(Math.round(avgScore));

    // Cross-assessment pattern analysis
    if (completedTypes.includes('video-readiness') && completedTypes.includes('content-gap')) {
      const videoReadiness = assessments.find(a => a.type === 'video-readiness');
      const contentGap = assessments.find(a => a.type === 'content-gap');
      
      if (videoReadiness && contentGap) {
        if (videoReadiness.score > 75 && contentGap.score < 50) {
          newInsights.push({
            id: 'video-content-mismatch',
            title: 'Video Skills vs Content Strategy Mismatch',
            description: 'You have strong video production capabilities but gaps in content strategy. Focus on content planning to maximize your video skills.',
            priority: 'high',
            actionable: true,
            nextSteps: [
              'Develop a comprehensive content calendar',
              'Map existing video skills to content gaps',
              'Consider strategic content planning consultation'
            ],
            relatedAssessments: ['video-readiness', 'content-gap']
          });
        }
        
        if (contentGap.score > 75 && videoReadiness.score < 50) {
          newInsights.push({
            id: 'content-production-gap',
            title: 'Strong Strategy, Weak Execution',
            description: 'Your content strategy is solid, but production capabilities need improvement to execute effectively.',
            priority: 'high',
            actionable: true,
            nextSteps: [
              'Invest in video production training',
              'Consider equipment upgrades',
              'Explore production partnerships'
            ],
            relatedAssessments: ['video-readiness', 'content-gap']
          });
        }
      }
    }

    // Budget vs Readiness correlation
    if (completedTypes.includes('budget-impact') && completedTypes.includes('video-readiness')) {
      const budgetCalc = assessments.find(a => a.type === 'budget-impact');
      const videoReadiness = assessments.find(a => a.type === 'video-readiness');
      
      if (budgetCalc && videoReadiness) {
        const budget = budgetCalc.businessContext?.budget || 0;
        
        if (budget > 10000 && videoReadiness.score < 60) {
          newInsights.push({
            id: 'budget-readiness-mismatch',
            title: 'High Budget, Low Readiness Risk',
            description: 'Your budget suggests ambitious video plans, but current readiness may lead to inefficient spending.',
            priority: 'high',
            actionable: true,
            nextSteps: [
              'Invest in foundational training first',
              'Start with smaller pilot projects',
              'Consider guided implementation approach'
            ],
            relatedAssessments: ['budget-impact', 'video-readiness']
          });
        }
      }
    }

    // Industry-specific insights
    const industries = [...new Set(assessments.map(a => a.businessContext?.industry).filter(Boolean))];
    if (industries.length > 0) {
      const primaryIndustry = industries[0];
      
      if (primaryIndustry === 'technology' && avgScore > 70) {
        newInsights.push({
          id: 'tech-scaling-opportunity',
          title: 'Technology Scaling Opportunity',
          description: 'Your scores indicate readiness for advanced video marketing typical in tech companies.',
          priority: 'medium',
          actionable: true,
          nextSteps: [
            'Explore product demo automation',
            'Consider technical webinar series',
            'Investigate developer content strategies'
          ],
          relatedAssessments: completedTypes
        });
      }
    }

    // Completion pattern insights
    if (assessments.length === 1) {
      newInsights.push({
        id: 'single-assessment-limitation',
        title: 'Complete Picture Needed',
        description: 'Taking additional assessments will provide more comprehensive insights and personalized recommendations.',
        priority: 'medium',
        actionable: true,
        nextSteps: [
          'Complete remaining assessments',
          'Get cross-assessment analysis',
          'Unlock advanced recommendations'
        ],
        relatedAssessments: ['video-readiness', 'content-gap', 'budget-impact']
      });
    }

    // Time-based insights
    const recentAssessments = assessments.filter(
      a => Date.now() - a.completedAt < 7 * 24 * 60 * 60 * 1000 // 7 days
    );
    
    if (recentAssessments.length >= 2) {
      newInsights.push({
        id: 'momentum-insight',
        title: 'Strong Assessment Momentum',
        description: 'You\'ve completed multiple assessments recently. This shows commitment to video strategy development.',
        priority: 'low',
        actionable: true,
        nextSteps: [
          'Schedule strategy consultation',
          'Begin implementation planning',
          'Set up progress tracking'
        ],
        relatedAssessments: completedTypes
      });
    }

    setInsights(newInsights);
  };

  const getRecommendedNextAssessment = () => {
    const completedTypes = assessments.map(a => a.type);
    
    if (!completedTypes.includes('video-readiness')) {
      return { type: 'video-readiness', reason: 'Foundational assessment for video capabilities' };
    }
    
    if (!completedTypes.includes('content-gap')) {
      return { type: 'content-gap', reason: 'Essential for content strategy development' };
    }
    
    if (!completedTypes.includes('budget-impact')) {
      return { type: 'budget-impact', reason: 'Critical for investment planning' };
    }
    
    return null;
  };

  const recommendedNext = getRecommendedNextAssessment();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Target className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  if (assessments.length === 0) {
    return (
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Assessment Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Complete assessments to unlock intelligent insights and cross-assessment analysis.
          </p>
          <Button onClick={() => onTakeAssessment('video-readiness')} className="w-full">
            Start with Video Readiness Assessment
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Readiness Score */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Video Strategy Intelligence
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {overallReadiness}% Ready
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Video Strategy Readiness</span>
                <span className="font-medium">{overallReadiness}%</span>
              </div>
              <Progress value={overallReadiness} className="h-3" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{assessments.length}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{insights.length}</div>
                <div className="text-sm text-muted-foreground">Insights</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {insights.filter(i => i.priority === 'high').length}
                </div>
                <div className="text-sm text-muted-foreground">High Priority</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Intelligent Insights */}
      {insights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Intelligent Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.map(insight => (
                <div 
                  key={insight.id}
                  className={`p-4 rounded-lg border ${getPriorityColor(insight.priority)}`}
                >
                  <div className="flex items-start gap-3">
                    {getPriorityIcon(insight.priority)}
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{insight.title}</h4>
                      <p className="text-sm mb-3">{insight.description}</p>
                      
                      {insight.nextSteps.length > 0 && (
                        <div className="space-y-1">
                          <div className="text-xs font-medium opacity-80">Recommended Actions:</div>
                          {insight.nextSteps.map((step, index) => (
                            <div key={index} className="text-xs flex items-center gap-1">
                              <ArrowRight className="h-3 w-3" />
                              {step}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recommended Next Assessment */}
      {recommendedNext && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <TrendingUp className="h-5 w-5" />
              Recommended Next Step
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-green-700">{recommendedNext.reason}</p>
              <Button 
                onClick={() => onTakeAssessment(recommendedNext.type)}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Take {recommendedNext.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Strategy Consultation CTA */}
      {assessments.length >= 2 && overallReadiness >= 60 && (
        <Card className="border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="text-primary">Ready for Expert Consultation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Your assessment scores indicate you're ready for a personalized video strategy consultation.
            </p>
            <Button onClick={onScheduleConsultation} className="w-full">
              Schedule Strategy Session
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};