
import { Button } from "@/components/ui/button";
import { WizardProgress } from "@/components/wizard/journey/WizardProgress";

interface WizardFormProps {
  currentStep: number;
  onQuickRecommendation: () => void;
  children: React.ReactNode;
}

export const WizardForm = ({ currentStep, onQuickRecommendation, children }: WizardFormProps) => {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden relative">
        {currentStep <= 5 && (
          <WizardProgress currentStep={currentStep} totalSteps={6} />
        )}
        
        {currentStep <= 4 && (
          <div className="absolute top-4 right-4 z-20">
            <Button
              variant="outline"
              size="sm"
              onClick={onQuickRecommendation}
              className="text-xs text-corporate-gray hover:bg-corporate-light mobile-touch-target"
            >
              Quick Recommendation →
            </Button>
          </div>
        )}

        <div className="min-h-[400px] md:min-h-[500px]">
          {children}
        </div>
      </div>
    </div>
  );
};
