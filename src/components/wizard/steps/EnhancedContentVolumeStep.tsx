import { useState } from "react";
import { CardSelection } from "../CardSelection";
import { ContentVolumeType } from "../types";
import { InsightCard } from "../insights/InsightCard";
import { ScoreDisplay } from "../insights/ScoreDisplay";
import { calculateContentVolumeScore } from "../utils/wizardScoring";

interface EnhancedContentVolumeStepProps {
  selectedVolume?: ContentVolumeType;
  onVolumeSelect: (volume: ContentVolumeType) => void;
  onBack: () => void;
}

export const EnhancedContentVolumeStep = ({ 
  selectedVolume, 
  onVolumeSelect,
  onBack 
}: EnhancedContentVolumeStepProps) => {
  const [showInsights, setShowInsights] = useState(false);
  const [questionScore, setQuestionScore] = useState<any>(null);

  const options = [
    {
      id: "1-2",
      title: "1-2 videos per month",
      description: "Perfect for testing the waters and building momentum",
      icon: "🌱",
      gradient: "gradient-social-1",
      subtitle: "Quality-focused approach"
    },
    {
      id: "3-4",
      title: "3-4 videos per month",
      description: "Steady content flow for consistent engagement",
      icon: "📅",
      gradient: "gradient-social-2",
      subtitle: "Balanced growth strategy"
    },
    {
      id: "5-8",
      title: "5-8 videos per month",
      description: "High-impact content strategy for growth",
      icon: "⚡",
      gradient: "gradient-social-3",
      subtitle: "Aggressive growth mode"
    },
    {
      id: "8-plus",
      title: "8+ videos / High Frequency",
      description: "Maximum content velocity for market dominance",
      icon: "🚀",
      gradient: "gradient-social-4",
      subtitle: "Market domination strategy"
    },
  ];

  const handleSelect = (value: string) => {
    const volume = value as ContentVolumeType;
    onVolumeSelect(volume);
    
    // Calculate score and show insights
    const score = calculateContentVolumeScore(volume);
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
        title="How much video content do you want to produce monthly?"
        subtitle="This helps us calculate your potential reach and recommend the right production approach for sustainable growth."
        options={options}
        selectedValue={selectedVolume}
        onSelect={handleSelect}
        onBack={onBack}
        showBack={true}
      />
      
      {showInsights && questionScore && (
        <div className="animate-fade-in space-y-4">
          <div className="bg-video-white p-6 rounded-xl video-shadow-sm">
            <h3 className="text-xl font-bold text-corporate-dark mb-4 text-center">
              📊 Your Content Strategy Analysis
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
              📈 <strong>Smart choice!</strong> This volume aligns well with your goals...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};