import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WizardData } from "../types";
import { 
  calculateBusinessProfileScore, 
  calculateVideoUseCaseScore, 
  calculateContentVolumeScore, 
  calculateTimelineScore,
  generateOverallRecommendations 
} from "../utils/wizardScoring";
import { ScoreDisplay } from "../insights/ScoreDisplay";
import { InsightCard } from "../insights/InsightCard";
import { TrendingUp, Calendar, DollarSign, Users, Target, CheckCircle } from "lucide-react";

interface ComprehensiveResultsProps {
  data: WizardData;
  onContinueToServices: () => void;
  onBack: () => void;
}

export const ComprehensiveResults = ({ 
  data, 
  onContinueToServices,
  onBack 
}: ComprehensiveResultsProps) => {
  const [scores, setScores] = useState<any[]>([]);
  const [overallAnalysis, setOverallAnalysis] = useState<any>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Calculate all scores
    const businessScore = calculateBusinessProfileScore(data.businessProfile || '');
    const useCaseScore = calculateVideoUseCaseScore(data.videoUseCase || '');
    const volumeScore = calculateContentVolumeScore(data.contentVolume || '');
    const timelineScore = calculateTimelineScore(data.timeline || '');

    const allScores = [businessScore, useCaseScore, volumeScore, timelineScore];
    setScores(allScores);

    // Generate overall recommendations
    const analysis = generateOverallRecommendations(allScores);
    setOverallAnalysis(analysis);

    // Show content with animation
    setTimeout(() => setShowContent(true), 300);
  }, [data]);

  if (!showContent || !overallAnalysis) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-social-purple mx-auto mb-4"></div>
          <p className="text-corporate-gray">Analyzing your responses and generating personalized strategy...</p>
        </div>
      </div>
    );
  }

  const getReadinessColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-social-green';
      case 'medium': return 'text-social-cyan';
      case 'low': return 'text-social-orange';
      default: return 'text-corporate-gray';
    }
  };

  const getReadinessEmoji = (level: string) => {
    switch (level) {
      case 'high': return '🚀';
      case 'medium': return '📈';
      case 'low': return '🌱';
      default: return '📊';
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
          Your <span className="text-gradient-1">Video Strategy</span> Assessment
        </h2>
        <p className="text-xl text-corporate-gray max-w-3xl mx-auto">
          Based on your responses, here's your personalized video marketing roadmap and recommendations.
        </p>
      </div>

      {/* Overall Score Card */}
      <Card className="bg-gradient-to-br from-video-white to-corporate-light border-0 video-shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="text-6xl mr-4">{getReadinessEmoji(overallAnalysis.readinessLevel)}</div>
            <div>
              <div className={`text-5xl font-black mb-2 ${getReadinessColor(overallAnalysis.readinessLevel)}`}>
                {overallAnalysis.overallScore}%
              </div>
              <p className="text-lg text-corporate-gray">Video Readiness Score</p>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-corporate-dark mb-3">
            {overallAnalysis.readinessLevel === 'high' && 'High Video Readiness - Ready for Launch!'}
            {overallAnalysis.readinessLevel === 'medium' && 'Medium Video Readiness - Strong Foundation'}
            {overallAnalysis.readinessLevel === 'low' && 'Early Stage - Perfect for Strategic Planning'}
          </h3>
          <p className="text-corporate-gray max-w-2xl mx-auto">
            {overallAnalysis.recommendations[0]}
          </p>
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <div className="grid md:grid-cols-2 gap-6">
        {scores.map((score, index) => (
          <Card key={score.area} className="bg-video-white border-0 video-shadow">
            <CardContent className="p-6">
              <ScoreDisplay score={score} showAnimation={true} />
              {score.insights.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-semibold text-corporate-dark mb-2">Key Insight:</h5>
                  <p className="text-sm text-corporate-gray">
                    {score.insights[0].description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* All Insights */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-corporate-dark text-center mb-6">
          🎯 Your Personalized Action Plan
        </h3>
        <div className="grid gap-4">
          {scores.flatMap(score => score.insights).map((insight: any, index: number) => (
            <div key={insight.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <InsightCard insight={insight} isAnimated={true} />
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Section */}
      <Card className="bg-corporate-dark text-white border-0 video-shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-3">
            <Target className="w-8 h-8" />
            Strategic Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Key Recommendations
              </h4>
              <ul className="space-y-2">
                {overallAnalysis.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-social-green flex-shrink-0 mt-1">✓</span>
                    <span className="opacity-90">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Next Steps
              </h4>
              <ul className="space-y-2">
                {overallAnalysis.nextSteps.map((step: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-social-cyan flex-shrink-0 mt-1">{index + 1}.</span>
                    <span className="opacity-90">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <div className="text-center space-y-6">
        <div className="bg-video-white p-6 rounded-xl video-shadow">
          <h3 className="text-2xl font-bold text-corporate-dark mb-3">
            Ready to Turn These Insights Into Results? 🎯
          </h3>
          <p className="text-corporate-gray mb-6 max-w-2xl mx-auto">
            Let's discuss which service option will help you implement these recommendations most effectively.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto">
            <Button
              onClick={onContinueToServices}
              className="gradient-social-1 text-white font-bold py-3 hover:scale-105 transition-all duration-300"
            >
              View Service Options →
            </Button>
            <Button
              onClick={onBack}
              variant="outline"
              className="border-2 border-corporate-dark text-corporate-dark hover:bg-corporate-dark hover:text-white font-bold py-3"
            >
              ← Review Responses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};