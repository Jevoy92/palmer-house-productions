
import { Button } from "@/components/ui/button";

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
        Quick insights or comprehensive strategy? We've got the right assessment for your needs.
      </p>
      <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <Button
          onClick={onStartAssessment}
          className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-6 py-4 flex flex-col items-center gap-2"
        >
          <span className="text-2xl">⚡</span>
          <span>Quick Assessment</span>
          <span className="text-xs opacity-70">(3-5 min)</span>
        </Button>
        {onComprehensiveStrategy && (
          <Button
            onClick={onComprehensiveStrategy}
            className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-6 py-4 flex flex-col items-center gap-2"
          >
            <span className="text-2xl">🎯</span>
            <span>Complete Strategy</span>
            <span className="text-xs opacity-70">(10-15 min)</span>
          </Button>
        )}
        <Button
          onClick={onBookCall}
          className="bg-white/20 text-white hover:bg-white/30 border border-white/30 font-bold px-6 py-4 flex flex-col items-center gap-2"
        >
          <span className="text-2xl">📞</span>
          <span>Strategy Call</span>
          <span className="text-xs opacity-70">(30 min)</span>
        </Button>
      </div>
    </div>
  );
};
