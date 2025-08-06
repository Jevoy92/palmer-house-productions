
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ContactWizardProps } from "./wizard/types";
import { useContactWizard } from "./wizard/useContactWizard";
import { WizardStepRenderer } from "./wizard/WizardStepRenderer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const ContactWizard = ({ open, onOpenChange, initialService }: ContactWizardProps) => {
  const {
    currentStep,
    isSubmitting,
    wizardData,
    updateWizardData,
    nextStep,
    prevStep,
    resetWizard,
    handleSubmit,
  } = useContactWizard(initialService);

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(resetWizard, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={`max-w-3xl w-[95vw] ${currentStep === 11 ? 'max-h-[95vh]' : 'max-h-[90vh]'} overflow-y-auto bg-gradient-to-br from-video-white to-corporate-light rounded-2xl border-0 video-shadow-lg p-0`}>
        <VisuallyHidden>
          <DialogTitle>Contact Wizard</DialogTitle>
          <DialogDescription>Complete our qualification process to get a custom proposal</DialogDescription>
        </VisuallyHidden>
        
        {/* Mobile-Optimized Step Indicator */}
        {currentStep <= 10 && (
          <div className="p-3 border-b border-corporate-light">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-1 overflow-x-auto pb-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step) => (
                  <div key={step} className="flex items-center flex-shrink-0">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                        step === currentStep
                          ? "gradient-social-1 text-white"
                          : step < currentStep
                          ? "bg-corporate-dark text-white"
                          : "bg-corporate-light text-corporate-gray"
                      }`}
                    >
                      {step}
                    </div>
                    {step < 10 && (
                      <div
                        className={`w-4 h-0.5 mx-0.5 transition-all duration-300 ${
                          step < currentStep ? "bg-corporate-dark" : "bg-corporate-light"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-2">
              <span className="text-xs text-corporate-gray">Step {currentStep} of 10</span>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          <WizardStepRenderer
            currentStep={currentStep}
            wizardData={wizardData}
            updateWizardData={updateWizardData}
            nextStep={nextStep}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onClose={handleClose}
            resetWizard={resetWizard}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
