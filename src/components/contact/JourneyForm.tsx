
import { Button } from "@/components/ui/button";
import { JourneyProgress } from "@/components/wizard/journey/JourneyProgress";

interface JourneyFormProps {
  currentStep: number;
  onQuickRecommendation: () => void;
  children: React.ReactNode;
}

export const JourneyForm = ({ currentStep, onQuickRecommendation, children }: JourneyFormProps) => {
  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative">
        {currentStep <= 5 && (
          <JourneyProgress currentStep={currentStep} totalSteps={6} />
        )}
        
        {currentStep <= 4 && (
          <div className="absolute top-4 right-4 z-20">
            <Button
              variant="outline"
              size="sm"
              onClick={onQuickRecommendation}
              className="text-xs text-gray-600 hover:bg-gray-100"
            >
              Get Quick Recommendation →
            </Button>
          </div>
        )}

        <div className="min-h-[500px]">
          {children}
        </div>
      </div>
    </div>
  );
};
