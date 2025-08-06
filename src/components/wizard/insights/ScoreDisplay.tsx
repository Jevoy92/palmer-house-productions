import { Progress } from "@/components/ui/progress";
import { QuestionScore } from "../utils/wizardScoring";

interface ScoreDisplayProps {
  score: QuestionScore;
  showAnimation?: boolean;
}

export const ScoreDisplay = ({ score, showAnimation = false }: ScoreDisplayProps) => {
  const percentage = Math.round((score.score / score.maxScore) * 100);
  
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-social-green';
    if (percentage >= 60) return 'text-social-cyan';
    if (percentage >= 40) return 'text-social-orange';
    return 'text-social-red';
  };

  const getProgressClass = (percentage: number) => {
    if (percentage >= 80) return '[&>div]:bg-social-green';
    if (percentage >= 60) return '[&>div]:bg-social-cyan';
    if (percentage >= 40) return '[&>div]:bg-social-orange';
    return '[&>div]:bg-social-red';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-corporate-dark">{score.area}</h4>
        <span className={`font-bold text-lg ${getScoreColor(percentage)}`}>
          {percentage}%
        </span>
      </div>
      <Progress 
        value={showAnimation ? 0 : percentage} 
        className={`h-2 ${getProgressClass(percentage)}`}
      />
      {showAnimation && (
        <style>{`
          @keyframes progress-fill {
            from { width: 0% }
            to { width: ${percentage}% }
          }
          .animate-progress > div {
            animation: progress-fill 1s ease-out forwards;
          }
        `}</style>
      )}
    </div>
  );
};