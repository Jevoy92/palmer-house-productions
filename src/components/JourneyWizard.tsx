
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useJourneyWizard } from "./wizard/useJourneyWizard";
import { JourneyProgress } from "./wizard/journey/JourneyProgress";
import { JourneyStart } from "./wizard/journey/JourneyStart";
import { TrailMapStep } from "./wizard/journey/TrailMapStep";
import { ClimbFuelStep } from "./wizard/journey/ClimbFuelStep";
import { PacePickerStep } from "./wizard/journey/PacePickerStep";
import { VisionDetailsStep } from "./wizard/journey/VisionDetailsStep";
import { CelebrationStep } from "./wizard/journey/CelebrationStep";

interface JourneyWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const JourneyWizard = ({ open, onOpenChange }: JourneyWizardProps) => {
  const {
    currentStep,
    isSubmitting,
    journeyData,
    updateJourneyData,
    addJourneyTag,
    nextStep,
    prevStep,
    resetJourney,
    handleSubmit,
    getCalendlyUrl,
    jumpToRecommendation,
  } = useJourneyWizard();

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(resetJourney, 300);
  };

  const handleCalendlyBooking = () => {
    const calendlyUrl = getCalendlyUrl();
    window.open(calendlyUrl, '_blank');
  };

  const handleQuickRecommendation = () => {
    addJourneyTag('quick_recommendation');
    updateJourneyData({ 
      painPoint: 'quick_help',
      businessStage: 'scaling_team',
      videoGoal: 'lead_gen',
      contentPace: 'basecamp'
    });
    jumpToRecommendation();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <JourneyStart
            onSelect={(tag) => {
              addJourneyTag(tag);
              updateJourneyData({ painPoint: tag });
              nextStep();
            }}
          />
        );
      case 2:
        return (
          <TrailMapStep
            onSelect={(tag) => {
              addJourneyTag(tag);
              updateJourneyData({ businessStage: tag });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <ClimbFuelStep
            onSelect={(tag) => {
              addJourneyTag(tag);
              updateJourneyData({ videoGoal: tag });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <PacePickerStep
            onSelect={(tag) => {
              addJourneyTag(tag);
              updateJourneyData({ contentPace: tag });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <VisionDetailsStep
            data={journeyData}
            onDataUpdate={updateJourneyData}
            onSubmit={handleSubmit}
            onBack={prevStep}
            isSubmitting={isSubmitting}
          />
        );
      case 6:
        return (
          <CelebrationStep
            data={journeyData}
            onClose={handleClose}
            onNewInquiry={resetJourney}
            onCalendlyBooking={handleCalendlyBooking}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-lg border-0 shadow-xl p-0">
        <VisuallyHidden>
          <DialogTitle>Journey Wizard</DialogTitle>
          <DialogDescription>Take our interactive journey to discover your perfect video strategy</DialogDescription>
        </VisuallyHidden>
        
        {/* Journey Progress - show for steps 1-5 */}
        {currentStep <= 5 && (
          <JourneyProgress currentStep={currentStep} totalSteps={6} />
        )}

        {/* Quick Skip Option - show for steps 1-4 */}
        {currentStep <= 4 && (
          <div className="absolute top-4 right-4 z-20">
            <Button
              variant="outline"
              size="sm"
              onClick={handleQuickRecommendation}
              className="text-xs text-gray-600 hover:bg-gray-100"
            >
              Get Quick Recommendation →
            </Button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
