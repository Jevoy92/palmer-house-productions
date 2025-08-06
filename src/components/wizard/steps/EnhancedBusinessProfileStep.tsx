import { useState, useEffect } from "react";
import { CardSelection } from "../CardSelection";
import { BusinessProfileType } from "../types";
import { InsightCard } from "../insights/InsightCard";
import { ScoreDisplay } from "../insights/ScoreDisplay";
import { calculateBusinessProfileScore } from "../utils/wizardScoring";

interface EnhancedBusinessProfileStepProps {
  selectedProfile?: BusinessProfileType;
  onProfileSelect: (profile: BusinessProfileType) => void;
}

export const EnhancedBusinessProfileStep = ({ 
  selectedProfile, 
  onProfileSelect 
}: EnhancedBusinessProfileStepProps) => {
  const [showInsights, setShowInsights] = useState(false);
  const [questionScore, setQuestionScore] = useState<any>(null);

  const options = [
    {
      id: "solo",
      title: "Solo Founder / Small Team",
      description: "1-3 people building something meaningful",
      icon: "👤",
      gradient: "gradient-social-1",
    },
    {
      id: "growing",
      title: "Growing Business",
      description: "4-15 people scaling operations",
      icon: "📈",
      gradient: "gradient-social-2",
    },
    {
      id: "established",
      title: "Established Business",
      description: "15+ people with proven market fit",
      icon: "🏢",
      gradient: "gradient-social-3",
    },
    {
      id: "agency",
      title: "Agency / Creative Firm",
      description: "Serving clients with outsourced needs",
      icon: "🎨",
      gradient: "gradient-social-4",
    },
    {
      id: "enterprise",
      title: "Enterprise / Multi-Brand",
      description: "Large organization with complex needs",
      icon: "🏭",
      gradient: "gradient-social-1",
    },
    {
      id: "nonprofit",
      title: "Nonprofit / Special Project",
      description: "Mission-driven organization or unique initiative",
      icon: "🌟",
      gradient: "gradient-social-2",
    },
  ];

  const handleSelect = (value: string) => {
    const profile = value as BusinessProfileType;
    onProfileSelect(profile);
    
    // Calculate score and show insights
    const score = calculateBusinessProfileScore(profile);
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
        title="Which best describes your business stage today?"
        subtitle="Help us understand your current situation so we can provide personalized insights and recommendations."
        options={options}
        selectedValue={selectedProfile}
        onSelect={handleSelect}
      />
      
      {showInsights && questionScore && (
        <div className="animate-fade-in space-y-4">
          <div className="bg-video-white p-6 rounded-xl video-shadow-sm">
            <h3 className="text-xl font-bold text-corporate-dark mb-4 text-center">
              📊 Your Business Stage Analysis
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
              ✨ <strong>Great choice!</strong> We're building your personalized video strategy...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};