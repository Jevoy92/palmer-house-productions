import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Users, 
  Star,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from "lucide-react";

interface Priority {
  id: string;
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'High' | 'Medium' | 'Low';
  timeline: string;
  category: string;
}

interface Milestone {
  month: number;
  title: string;
  goals: string[];
  metrics: string[];
}

interface EnhancedResultsProps {
  score: number;
  level: string;
  sectionScores: Record<string, number>;
  priorities: Priority[];
  milestones: Milestone[];
  industryBenchmark?: number;
  confidenceScore?: number;
  onGetDetailedPlan?: () => void;
}

export const EnhancedResults = ({ 
  score, 
  level, 
  sectionScores, 
  priorities, 
  milestones,
  industryBenchmark = 65,
  confidenceScore = 85,
  onGetDetailedPlan
}: EnhancedResultsProps) => {
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'High': return 'border-red-200 dark:border-red-800';
      case 'Medium': return 'border-yellow-200 dark:border-yellow-800';
      case 'Low': return 'border-green-200 dark:border-green-800';
      default: return 'border-gray-200 dark:border-gray-800';
    }
  };

  const isAboveBenchmark = score > industryBenchmark;

  return (
    <div className="space-y-6">
      {/* Score Overview with Benchmark */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your Assessment Results</span>
            <Badge variant={isAboveBenchmark ? 'default' : 'secondary'}>
              {isAboveBenchmark ? 'Above Average' : 'Below Average'}
            </Badge>
          </CardTitle>
          <CardDescription>
            Compared to similar businesses in your industry
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{score}%</div>
            <div className="text-lg font-medium">{level}</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Your Score</span>
              <span>{score}%</span>
            </div>
            <Progress value={score} className="h-3" />
            
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Industry Average: {industryBenchmark}%</span>
              <span className="flex items-center gap-1">
                Confidence: {confidenceScore}%
                <Star className="h-3 w-3" />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Section Performance
          </CardTitle>
          <CardDescription>
            See how you performed in each area of assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(sectionScores).map(([section, sectionScore]) => (
              <div key={section} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">{section.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{sectionScore}%</span>
                    {sectionScore >= 80 ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                </div>
                <Progress value={sectionScore} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Priority Action Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Priority Action Plan
          </CardTitle>
          <CardDescription>
            Recommended actions organized by impact and effort
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {priorities.slice(0, 6).map((priority) => (
              <div 
                key={priority.id}
                className={`p-4 border rounded-lg ${getEffortColor(priority.effort)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{priority.title}</h4>
                  <div className="flex gap-2">
                    <Badge className={getImpactColor(priority.impact)} variant="secondary">
                      {priority.impact} Impact
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {priority.effort} Effort
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {priority.description}
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{priority.category}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {priority.timeline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Implementation Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            6-Month Implementation Roadmap
          </CardTitle>
          <CardDescription>
            A month-by-month plan to improve your video marketing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div key={milestone.month} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  {milestone.month}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-2">{milestone.title}</h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <h5 className="font-medium text-muted-foreground mb-1">Goals:</h5>
                      <ul className="space-y-1">
                        {milestone.goals.map((goal, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <ArrowRight className="h-3 w-3 text-primary" />
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-muted-foreground mb-1">Key Metrics:</h5>
                      <ul className="space-y-1">
                        {milestone.metrics.map((metric, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="text-center py-6">
          <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-bold mb-2">Ready to Implement Your Plan?</h3>
          <p className="text-muted-foreground mb-4">
            Get a personalized 30-minute strategy session to discuss your results and create a detailed implementation plan.
          </p>
          <Button onClick={onGetDetailedPlan} size="lg" className="w-full max-w-md">
            Book Your Free Strategy Session
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};