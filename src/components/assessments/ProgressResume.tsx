import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, RotateCcw, Play } from "lucide-react";

interface ProgressResumeProps {
  assessmentType: string;
  currentSection: number;
  totalSections: number;
  lastSaved: number;
  onResume: () => void;
  onRestart: () => void;
}

export const ProgressResume = ({ 
  assessmentType, 
  currentSection, 
  totalSections, 
  lastSaved, 
  onResume, 
  onRestart 
}: ProgressResumeProps) => {
  const progressPercentage = Math.round((currentSection / totalSections) * 100);
  const timeAgo = Math.round((Date.now() - lastSaved) / (1000 * 60)); // minutes ago
  
  const formatTimeAgo = (minutes: number) => {
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    const hours = Math.round(minutes / 60);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  };

  const getAssessmentTitle = (type: string) => {
    switch (type) {
      case 'video-readiness': return 'Video Readiness Audit';
      case 'content-gap': return 'Content Gap Analysis';
      case 'budget-impact': return 'Budget Impact Calculator';
      default: return 'Assessment';
    }
  };

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Resume Your Assessment</CardTitle>
            <CardDescription>
              Continue where you left off with the {getAssessmentTitle(assessmentType)}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatTimeAgo(timeAgo)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progressPercentage}% complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            Section {currentSection} of {totalSections}
          </p>
        </div>

        <div className="flex gap-3">
          <Button onClick={onResume} className="flex-1">
            <Play className="h-4 w-4 mr-2" />
            Continue Assessment
          </Button>
          <Button variant="outline" onClick={onRestart}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Start Over
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          Your progress is automatically saved and will expire in 24 hours
        </div>
      </CardContent>
    </Card>
  );
};