import { useState } from "react";
import { CardSelection } from "../CardSelection";
import { TimelineType } from "../types";
import { InsightCard } from "../insights/InsightCard";
import { ScoreDisplay } from "../insights/ScoreDisplay";
import { calculateTimelineScore } from "../utils/wizardScoring";

interface EnhancedTimelineStepProps {
  selectedTimeline?: TimelineType;
  onTimelineSelect: (timeline: TimelineType) => void;
  onBack: () => void;
}

export const EnhancedTimelineStep = ({ 
  selectedTimeline, 
  onTimelineSelect,
  onBack 
}: EnhancedTimelineStepProps) => {
  const [showInsights, setShowInsights] = useState(false);
  const [questionScore, setQuestionScore] = useState<any>(null);

  const options = [
    {
      id: "immediately",
      title: "Ready to Start Now",
      description: "I want to begin creating video content immediately",
      icon: "⚡",
      gradient: "gradient-social-1",
      subtitle: "Quick wins available"
    },
    {
      id: "1-3-months",
      title: "1-3 months",
      description: "Planning to begin within the quarter",
      icon: "📅",
      gradient: "gradient-social-2",
      subtitle: "Strategic planning phase"
    },
    {
      id: "3-6-months",
      title: "3-6 months",
      description: "Part of a longer-term strategy",
      icon: "🗓️",
      gradient: "gradient-social-3",
      subtitle: "Long-term planning"
    },
    {
      id: "planning",
      title: "Research & Planning Mode",
      description: "Gathering information for future decisions",
      icon: "🔍",
      gradient: "gradient-social-4",
      subtitle: "Knowledge building phase"
    },
  ];

  const handleSelect = (value: string) => {
    const timeline = value as TimelineType;
    onTimelineSelect(timeline);
    
    // Calculate score and show insights
    const score = calculateTimelineScore(timeline);
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
        title="When would you like to start creating video content?"
        subtitle="Understanding your timeline helps us recommend the most effective approach for your situation."
        options={options}
        selectedValue={selectedTimeline}
        onSelect={handleSelect}
        onBack={onBack}
        showBack={true}
      />
      
      {showInsights && questionScore && (
        <div className="animate-fade-in space-y-4">
          <div className="bg-video-white p-6 rounded-xl video-shadow-sm">
            <h3 className="text-xl font-bold text-corporate-dark mb-4 text-center">
              ⏰ Your Timeline Analysis
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
              ⏰ <strong>Perfect timing!</strong> Your approach aligns with best practices...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};