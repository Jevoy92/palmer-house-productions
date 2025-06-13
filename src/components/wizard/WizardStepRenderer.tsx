
import { ServiceSelection } from "./ServiceSelection";
import { PlanSelection } from "./PlanSelection";
import { PersonalInfoStep } from "./PersonalInfoStep";
import { ConfirmationStep } from "./ConfirmationStep";
import { ThankYouStep } from "./ThankYouStep";
import { BusinessProfileStep } from "./BusinessProfileStep";
import { BusinessTypeStep } from "./BusinessTypeStep";
import { VideoUseCaseStep } from "./VideoUseCaseStep";
import { ContentVolumeStep } from "./ContentVolumeStep";
import { TimelineStep } from "./TimelineStep";
import { GeographicStep } from "./GeographicStep";
import { WizardData, BusinessProfileType, BusinessType, VideoUseCaseType, ContentVolumeType, TimelineType, GeographicType } from "./types";
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
        <BusinessProfileStep
          selectedProfile={wizardData.businessProfile}
          onProfileSelect={(profile: BusinessProfileType) => {
            updateWizardData({ businessProfile: profile });
            nextStep();
          }}
        />
      );
    case 2:
      return (
        <BusinessTypeStep
          selectedType={wizardData.businessType}
          onTypeSelect={(type: BusinessType) => {
            updateWizardData({ businessType: type });
            nextStep();
          }}
          onBack={prevStep}
        />
      );
    case 3:
      return (
        <VideoUseCaseStep
          selectedUseCase={wizardData.videoUseCase}
          onUseCaseSelect={(useCase: VideoUseCaseType) => {
            updateWizardData({ videoUseCase: useCase });
            nextStep();
          }}
          onBack={prevStep}
        />
      );
    case 4:
      return (
        <ContentVolumeStep
          selectedVolume={wizardData.contentVolume}
          onVolumeSelect={(volume: ContentVolumeType) => {
            updateWizardData({ contentVolume: volume });
            nextStep();
          }}
          onBack={prevStep}
        />
      );
    case 5:
      return (
        <TimelineStep
          selectedTimeline={wizardData.timeline}
          onTimelineSelect={(timeline: TimelineType) => {
            updateWizardData({ timeline: timeline });
            nextStep();
          }}
          onBack={prevStep}
        />
      );
    case 6:
      return (
        <GeographicStep
          selectedGeographic={wizardData.geographic}
          geographicCustom={wizardData.geographicCustom}
          onGeographicSelect={(geographic: GeographicType, custom?: string) => {
            updateWizardData({ 
              geographic: geographic,
              geographicCustom: custom 
            });
            nextStep();
          }}
          onBack={prevStep}
        />
      );
    case 7:
      return (
        <ServiceSelection
          selectedService={wizardData.serviceType}
          onServiceSelect={(service) => {
            updateWizardData({ serviceType: service });
            nextStep();
          }}
          onBack={prevStep}
        />
      );
    case 8:
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
    case 9:
      return (
        <PersonalInfoStep
          data={wizardData}
          onDataUpdate={updateWizardData}
          onNext={nextStep}
          onBack={prevStep}
        />
      );
    case 10:
      return (
        <ConfirmationStep
          data={wizardData}
          onSubmit={handleSubmit}
          onCalendlyBooking={handleCalendlyBooking}
          onBack={prevStep}
          isSubmitting={isSubmitting}
        />
      );
    case 11:
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
