
import { useState, useEffect } from "react";
import { ContactWizard } from "./ContactWizard";
import { ServiceWizard } from "./ServiceWizard";
import { useServiceWizard } from "./wizard/useServiceWizard";
import { NeedsAssessment } from "./wizard/journey/NeedsAssessment";
import { BusinessStageStep } from "./wizard/journey/BusinessStageStep";
import { GoalsStep } from "./wizard/journey/GoalsStep";
import { PacePickerStep } from "./wizard/journey/PacePickerStep";
import { VisionDetailsStep } from "./wizard/journey/VisionDetailsStep";
import { CelebrationStep } from "./wizard/journey/CelebrationStep";
import { ContactHeader } from "./contact/ContactHeader";
import { WizardForm } from "./contact/WizardForm";
import { ProcessPreview } from "./contact/ProcessPreview";
import { ReviewsSection } from "./contact/ReviewsSection";
import { BottomCTA } from "./contact/BottomCTA";


interface ContactProps {
  autoOpenWizard?: boolean;
}

export const Contact = ({ autoOpenWizard = false }: ContactProps) => {
  const [isWizardOpen, setIsWizardOpen] = useState(autoOpenWizard);
  const [isServiceOpen, setIsServiceOpen] = useState(false);

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

  useEffect(() => {
    if (autoOpenWizard) {
      // Start with embedded form
    }
  }, [autoOpenWizard]);

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

  const handleViewAllReviews = () => {
    window.open('https://www.google.com/search?q=palmer+house+productions&oq=palmer+house+productions&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGD0yBggCEEUYPTIGCAMQRRhB0gEINTI0OWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x54905d5328d9caa5:0x5946127015c6ae31,1,,,,', '_blank');
  };

  const renderEmbeddedStep = () => {
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
            onClose={() => resetService()}
            onNewInquiry={resetService}
            onCalendlyBooking={handleCalendlyBooking}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section id="contact" className="pt-24 pb-12 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <ContactHeader 
          onQuickRecommendation={handleQuickRecommendation}
          currentStep={currentStep}
        />

        <WizardForm 
          currentStep={currentStep}
          onQuickRecommendation={handleQuickRecommendation}
        >
          {renderEmbeddedStep()}
        </WizardForm>

        <ProcessPreview />

        <ReviewsSection onViewAllReviews={handleViewAllReviews} />

        <BottomCTA 
          onStartAssessment={() => window.location.href = '/content-strategy'}
          onBookCall={handleCalendlyBooking}
        />
      </div>

      <ContactWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} />
      <ServiceWizard open={isServiceOpen} onOpenChange={setIsServiceOpen} />
    </section>
  );
};
