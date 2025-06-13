
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ContactWizardProps } from "./wizard/types";
import { useContactWizard } from "./wizard/useContactWizard";
import { WizardStepRenderer } from "./wizard/WizardStepRenderer";

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
      <DialogContent className={`max-w-4xl ${currentStep === 10 ? 'max-h-[95vh]' : 'max-h-[90vh]'} overflow-y-auto bg-gradient-to-br from-video-white to-corporate-light rounded-3xl border-0 video-shadow-lg p-0`}>
        {/* Step Indicator - show for steps 1-10 */}
        {currentStep <= 10 && (
          <div className="flex items-center justify-center p-4 border-b border-corporate-light overflow-x-auto">
            <div className="flex items-center space-x-2 min-w-max">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                      step === currentStep
                        ? "gradient-social-1 text-white scale-110"
                        : step < currentStep
                        ? "bg-corporate-dark text-white"
                        : "bg-corporate-light text-corporate-gray"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 10 && (
                    <div
                      className={`w-8 h-1 mx-1 transition-all duration-300 ${
                        step < currentStep ? "bg-corporate-dark" : "bg-corporate-light"
                      }`}
                    />
                  )}
                </div>
              ))}
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
