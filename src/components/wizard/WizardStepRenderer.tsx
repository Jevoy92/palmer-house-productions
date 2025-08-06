
import { ServiceSelection } from "./ServiceSelection";
import { ServiceCategorySelection } from "./ServiceCategorySelection";
import { PersonalInfoStep } from "./PersonalInfoStep";
import { ConfirmationStep } from "./ConfirmationStep";
import { ThankYouStep } from "./ThankYouStep";
import { EnhancedBusinessProfileStep } from "./steps/EnhancedBusinessProfileStep";
import { BusinessTypeStep } from "./BusinessTypeStep";
import { EnhancedVideoUseCaseStep } from "./steps/EnhancedVideoUseCaseStep";
import { EnhancedContentVolumeStep } from "./steps/EnhancedContentVolumeStep";
import { EnhancedTimelineStep } from "./steps/EnhancedTimelineStep";
import { GeographicStep } from "./GeographicStep";
import { ComprehensiveResults } from "./results/ComprehensiveResults";
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
        <EnhancedBusinessProfileStep
          selectedProfile={wizardData.businessProfile}
          onProfileSelect={(profile: BusinessProfileType) => {
            updateWizardData({ businessProfile: profile });
            setTimeout(nextStep, 3000);
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
        <EnhancedVideoUseCaseStep
          selectedUseCase={wizardData.videoUseCase}
          onUseCaseSelect={(useCase: VideoUseCaseType) => {
            updateWizardData({ videoUseCase: useCase });
            setTimeout(nextStep, 3000);
          }}
          onBack={prevStep}
        />
      );
    case 4:
      return (
        <EnhancedContentVolumeStep
          selectedVolume={wizardData.contentVolume}
          onVolumeSelect={(volume: ContentVolumeType) => {
            updateWizardData({ contentVolume: volume });
            setTimeout(nextStep, 3000);
          }}
          onBack={prevStep}
        />
      );
    case 5:
      return (
        <EnhancedTimelineStep
          selectedTimeline={wizardData.timeline}
          onTimelineSelect={(timeline: TimelineType) => {
            updateWizardData({ timeline: timeline });
            setTimeout(nextStep, 3000);
          }}
          onBack={prevStep}
        />
      );
    case 6:
      return (
        <ComprehensiveResults
          data={wizardData}
          onContinueToServices={nextStep}
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
        <ServiceCategorySelection
          selectedCategory={wizardData.serviceCategory}
          serviceType={wizardData.serviceType}
          onCategorySelect={(category) => {
            updateWizardData({ serviceCategory: category });
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
