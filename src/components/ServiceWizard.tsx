
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useServiceWizard } from "./wizard/useServiceWizard";
import { WizardProgress } from "./wizard/journey/WizardProgress";
import { NeedsAssessment } from "./wizard/journey/NeedsAssessment";
import { BusinessStageStep } from "./wizard/journey/BusinessStageStep";
import { GoalsStep } from "./wizard/journey/GoalsStep";
import { PacePickerStep } from "./wizard/journey/PacePickerStep";
import { VisionDetailsStep } from "./wizard/journey/VisionDetailsStep";
import { CelebrationStep } from "./wizard/journey/CelebrationStep";

interface ServiceWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ServiceWizard = ({ open, onOpenChange }: ServiceWizardProps) => {
  const {
    currentStep,
    isSubmitting,
    serviceData,
    updateServiceData,
    addServiceTag,
    nextStep,
    prevStep,
    resetService,
    handleSubmit,
    getCalendlyUrl,
    jumpToRecommendation,
  } = useServiceWizard();

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(resetService, 300);
  };

  const handleCalendlyBooking = () => {
    const calendlyUrl = getCalendlyUrl();
    window.open(calendlyUrl, '_blank');
  };

  const handleQuickRecommendation = () => {
    addServiceTag('quick_recommendation');
    updateServiceData({ 
      painPoint: 'quick_help',
      businessStage: 'scaling_team',
      videoGoal: 'lead_gen',
      contentPace: 'standard'
    });
    jumpToRecommendation();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <NeedsAssessment
            onSelect={(tag) => {
              addServiceTag(tag);
              updateServiceData({ painPoint: tag });
              nextStep();
            }}
          />
        );
      case 2:
        return (
          <BusinessStageStep
            onSelect={(tag) => {
              addServiceTag(tag);
              updateServiceData({ businessStage: tag });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <GoalsStep
            onSelect={(tag) => {
              addServiceTag(tag);
              updateServiceData({ videoGoal: tag });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <PacePickerStep
            onSelect={(tag) => {
              addServiceTag(tag);
              updateServiceData({ contentPace: tag });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <VisionDetailsStep
            data={serviceData}
            onDataUpdate={updateServiceData}
            onSubmit={handleSubmit}
            onBack={prevStep}
            isSubmitting={isSubmitting}
          />
        );
      case 6:
        return (
          <CelebrationStep
            data={serviceData}
            onClose={handleClose}
            onNewInquiry={resetService}
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
          <DialogTitle>Service Wizard</DialogTitle>
          <DialogDescription>Take our interactive assessment to discover your perfect video strategy</DialogDescription>
        </VisuallyHidden>
        
        {/* Wizard Progress - show for steps 1-5 */}
        {currentStep <= 5 && (
          <WizardProgress currentStep={currentStep} totalSteps={6} />
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
