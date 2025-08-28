import { useState } from "react";
import { CardSelection } from "../CardSelection";
import { VideoUseCaseType } from "../types";
import { InsightCard } from "../insights/InsightCard";
import { ScoreDisplay } from "../insights/ScoreDisplay";
import { calculateVideoUseCaseScore } from "../utils/wizardScoring";

interface EnhancedVideoUseCaseStepProps {
  selectedUseCase?: VideoUseCaseType;
  onUseCaseSelect: (useCase: VideoUseCaseType) => void;
  onBack: () => void;
}

export const EnhancedVideoUseCaseStep = ({ 
  selectedUseCase, 
  onUseCaseSelect,
  onBack 
}: EnhancedVideoUseCaseStepProps) => {
  const [showInsights, setShowInsights] = useState(false);
  const [questionScore, setQuestionScore] = useState<any>(null);

  const options = [
    {
      id: "lead-generation",
      title: "Lead Generation & Brand Growth",
      description: "Attract more qualified prospects and grow market presence",
      icon: "🎯",
      gradient: "gradient-social-1",
    },
    {
      id: "training",
      title: "Internal Training & Operations",
      description: "Improve team efficiency and knowledge transfer",
      icon: "🎓",
      gradient: "gradient-social-2",
    },
    {
      id: "onboarding",
      title: "Client Onboarding & Experience",
      description: "Enhance customer experience and reduce support load",
      icon: "🚀",
      gradient: "gradient-social-3",
    },
    {
      id: "authority",
      title: "Authority / Thought Leadership",
      description: "Establish expertise and industry recognition",
      icon: "👑",
      gradient: "gradient-social-4",
    },
    {
      id: "education",
      title: "Customer Education & Support",
      description: "Help customers succeed and reduce churn",
      icon: "📚",
      gradient: "gradient-social-1",
    },
    {
      id: "sales",
      title: "Sales Support & Conversion",
      description: "Accelerate sales cycles and close more deals",
      icon: "💰",
      gradient: "gradient-social-2",
    },
  ];

  const handleSelect = (value: string) => {
    const useCase = value as VideoUseCaseType;
    onUseCaseSelect(useCase);
    
    // Calculate score and show insights
    const score = calculateVideoUseCaseScore(useCase);
    setQuestionScore(score);
    setShowInsights(true);
    
    // Auto-advance after showing insights
    setTimeout(() => {
      // Parent component will handle the next step
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <CardSelection
        title="What's your primary video goal?"
        subtitle="Understanding your main objective helps us calculate your potential ROI and recommend the best approach."
        options={options}
        selectedValue={selectedUseCase}
        onSelect={handleSelect}
        onBack={onBack}
        showBack={true}
      />
      
      {showInsights && questionScore && (
        <div className="animate-fade-in space-y-4">
          <div className="bg-video-white p-6 rounded-xl video-shadow-sm">
            <h3 className="text-xl font-bold text-corporate-dark mb-4 text-center">
              🎯 Your Video Goal Analysis
            </h3>
            <ScoreDisplay score={questionScore} showAnimation={true} />
          </div>
          
          <div className="grid gap-4">
            {questionScore.insights.map((insight: any, index: number) => (
              <div key={insight.id} style={{ animationDelay: `${index * 0.2}s` }}>
                <InsightCard insight={insight} isAnimated={true} />
              </div>
            ))}
          </div>
          
          <div className="text-center p-4 bg-corporate-light rounded-lg">
            <p className="text-sm text-corporate-gray">
              🚀 <strong>Excellent!</strong> This use case has high success potential...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};