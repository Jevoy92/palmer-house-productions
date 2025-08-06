import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, TrendingUp, FileText, BarChart3, Calculator } from "lucide-react";

interface AssessmentOption {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  questionsCount: number;
  icon: React.ReactNode;
  benefits: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  recommended?: boolean;
}

interface AssessmentPreviewProps {
  onSelectAssessment: (assessmentId: string) => void;
  currentPath?: string;
}

const assessmentOptions: AssessmentOption[] = [
  {
    id: 'video-readiness',
    title: 'Video Readiness Audit',
    description: 'Assess your current video marketing maturity and get a roadmap for improvement.',
    estimatedTime: '8-10 minutes',
    questionsCount: 24,
    icon: <FileText className="h-6 w-6" />,
    benefits: [
      'Strategic foundation assessment',
      'Technical readiness evaluation',
      'Content planning guidance',
      'Distribution strategy recommendations'
    ],
    difficulty: 'Beginner',
    recommended: true
  },
  {
    id: 'content-gap',
    title: 'Content Gap Analysis',
    description: 'Identify missing content types in your marketing funnel and prioritize creation.',
    estimatedTime: '6-8 minutes',
    questionsCount: 18,
    icon: <BarChart3 className="h-6 w-6" />,
    benefits: [
      'Funnel stage mapping',
      'Content priority matrix',
      'ROI impact predictions',
      'Competitive positioning insights'
    ],
    difficulty: 'Intermediate'
  },
  {
    id: 'budget-impact',
    title: 'Budget Impact Calculator',
    description: 'Calculate ROI projections and get personalized investment recommendations.',
    estimatedTime: '5-7 minutes',
    questionsCount: 15,
    icon: <Calculator className="h-6 w-6" />,
    benefits: [
      'ROI projections',
      'Break-even analysis',
      'Goal-aligned recommendations',
      'Implementation timeline'
    ],
    difficulty: 'Advanced'
  }
];

export const AssessmentPreview = ({ onSelectAssessment, currentPath }: AssessmentPreviewProps) => {
  const getRecommendedAssessment = () => {
    // Logic to recommend assessment based on user journey
    if (currentPath?.includes('discovery') || !currentPath) {
      return 'video-readiness';
    }
    if (currentPath?.includes('content')) {
      return 'content-gap';
    }
    if (currentPath?.includes('pricing') || currentPath?.includes('budget')) {
      return 'budget-impact';
    }
    return 'video-readiness';
  };

  const recommendedId = getRecommendedAssessment();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Choose Your Assessment
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Take a personalized assessment to get tailored recommendations for your video marketing strategy.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {assessmentOptions.map((assessment) => (
          <Card 
            key={assessment.id}
            className={`relative transition-all duration-200 hover:shadow-lg ${
              assessment.id === recommendedId ? 'ring-2 ring-primary' : ''
            }`}
          >
            {assessment.id === recommendedId && (
              <Badge className="absolute -top-2 left-4 bg-primary text-primary-foreground">
                Recommended for you
              </Badge>
            )}
            
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 p-3 bg-primary/10 rounded-full w-fit">
                {assessment.icon}
              </div>
              <CardTitle className="text-xl">{assessment.title}</CardTitle>
              <CardDescription className="text-sm">
                {assessment.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {assessment.estimatedTime}
                </div>
                <Badge variant="outline" className="text-xs">
                  {assessment.difficulty}
                </Badge>
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                {assessment.questionsCount} questions
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">What you'll get:</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {assessment.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <TrendingUp className="h-3 w-3 text-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                onClick={() => onSelectAssessment(assessment.id)}
                className="w-full mt-4"
                variant={assessment.id === recommendedId ? 'default' : 'outline'}
              >
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          Need help choosing? Our recommended assessment is based on your current page and typical user journey.
        </p>
      </div>
    </div>
  );
};