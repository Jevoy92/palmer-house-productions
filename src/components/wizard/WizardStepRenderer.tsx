
import { ServiceSelection } from "./ServiceSelection";
import { PlanSelection } from "./PlanSelection";
import { PersonalInfoStep } from "./PersonalInfoStep";
import { ConfirmationStep } from "./ConfirmationStep";
import { ThankYouStep } from "./ThankYouStep";
import { WizardData } from "./types";
import { getCalendlyUrl } from "./utils";

interface WizardStepRendererProps {
  currentStep: number;
  wizardData: WizardData;
  updateWizardData: (data: Partial<WizardData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleSubmit: () => Promise<void>;
  isSubmitting: boolean;
  onClose: () => void;
  resetWizard: () => void;
}

export const WizardStepRenderer = ({
  currentStep,
  wizardData,
  updateWizardData,
  nextStep,
  prevStep,
  handleSubmit,
  isSubmitting,
  onClose,
  resetWizard,
}: WizardStepRendererProps) => {
  const handleCalendlyBooking = () => {
    const calendlyUrl = getCalendlyUrl(wizardData.serviceType);
    window.open(calendlyUrl, '_blank');
  };

  switch (currentStep) {
    case 1:
      return (
        <ServiceSelection
          selectedService={wizardData.serviceType}
          onServiceSelect={(service) => {
            updateWizardData({ serviceType: service });
            nextStep();
          }}
        />
      );
    case 2:
      return (
        <PlanSelection
          selectedPlan={wizardData.planType}
          serviceType={wizardData.serviceType}
          onPlanSelect={(plan) => {
            updateWizardData({ planType: plan });
            nextStep();
          }}
          onBack={prevStep}
        />
      );
    case 3:
      return (
        <PersonalInfoStep
          data={wizardData}
          onDataUpdate={updateWizardData}
          onNext={nextStep}
          onBack={prevStep}
        />
      );
    case 4:
      return (
        <ConfirmationStep
          data={wizardData}
          onSubmit={handleSubmit}
          onCalendlyBooking={handleCalendlyBooking}
          onBack={prevStep}
          isSubmitting={isSubmitting}
        />
      );
    case 5:
      return (
        <ThankYouStep
          data={wizardData}
          onClose={onClose}
          onNewInquiry={() => {
            resetWizard();
          }}
        />
      );
    default:
      return null;
  }
};
