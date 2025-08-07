
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface BottomCTAProps {
  onStartAssessment: () => void;
  onBookCall: () => void;
  onComprehensiveStrategy?: () => void;
}

export const BottomCTA = ({ onStartAssessment, onBookCall, onComprehensiveStrategy }: BottomCTAProps) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center text-white">
      <h2 className="text-4xl font-bold mb-6">Choose Your Path Forward</h2>
      <p className="text-xl mb-8 opacity-90">
        Start with quick insights or get your complete strategy assessment.
      </p>
      
      {/* Book Strategy Call - Primary CTA */}
      <div className="mb-8">
        <Button
          onClick={onBookCall}
          className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg"
        >
          <span className="text-2xl mr-2">📞</span>
          Book Strategy Call (30 min)
        </Button>
      </div>

      {/* Assessment Options */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Or Take a Strategy Assessment</h3>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Quick Assessments */}
          <Card className="bg-white/20 backdrop-blur-sm border-white/30">
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-bold text-lg mb-2">Quick Assessments</h4>
              <p className="text-sm opacity-90 mb-4">
                Video Readiness • Content Gaps • Budget Impact
              </p>
              <Button
                onClick={onStartAssessment}
                className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-4 py-2 text-sm w-full"
              >
                Start Assessment (3-5 min)
              </Button>
            </CardContent>
          </Card>

          {/* Complete Strategy */}
          {onComprehensiveStrategy && (
            <Card className="bg-white/20 backdrop-blur-sm border-white/30">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="font-bold text-lg mb-2">Complete Strategy</h4>
                <p className="text-sm opacity-90 mb-4">
                  Full business assessment with custom recommendations
                </p>
                <Button
                  onClick={onComprehensiveStrategy}
                  className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-4 py-2 text-sm w-full"
                >
                  Complete Assessment (10-15 min)
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
