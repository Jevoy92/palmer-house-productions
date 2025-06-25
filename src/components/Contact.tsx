
import { useState, useEffect } from "react";
import { ContactWizard } from "./ContactWizard";
import { JourneyWizard } from "./JourneyWizard";
import { useJourneyWizard } from "./wizard/useJourneyWizard";
import { JourneyStart } from "./wizard/journey/JourneyStart";
import { TrailMapStep } from "./wizard/journey/TrailMapStep";
import { ClimbFuelStep } from "./wizard/journey/ClimbFuelStep";
import { PacePickerStep } from "./wizard/journey/PacePickerStep";
import { VisionDetailsStep } from "./wizard/journey/VisionDetailsStep";
import { CelebrationStep } from "./wizard/journey/CelebrationStep";
import { ContactHeader } from "./contact/ContactHeader";
import { JourneyForm } from "./contact/JourneyForm";
import { ExpeditionPreview } from "./contact/ExpeditionPreview";
import { ReviewsSection } from "./contact/ReviewsSection";
import { BottomCTA } from "./contact/BottomCTA";
import { ContactFooter } from "./contact/ContactFooter";

interface ContactProps {
  autoOpenWizard?: boolean;
}

export const Contact = ({ autoOpenWizard = false }: ContactProps) => {
  const [isWizardOpen, setIsWizardOpen] = useState(autoOpenWizard);
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);

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
    addJourneyTag('quick_recommendation');
    updateJourneyData({ 
      painPoint: 'quick_help',
      businessStage: 'scaling_team',
      videoGoal: 'lead_gen',
      contentPace: 'basecamp'
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
            onClose={() => resetJourney()}
            onNewInquiry={resetJourney}
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

        <JourneyForm 
          currentStep={currentStep}
          onQuickRecommendation={handleQuickRecommendation}
        >
          {renderEmbeddedStep()}
        </JourneyForm>

        <ExpeditionPreview />

        <ReviewsSection onViewAllReviews={handleViewAllReviews} />

        <BottomCTA 
          onStartJourney={resetJourney}
          onBookCall={handleCalendlyBooking}
        />

        <ContactFooter />
      </div>

      <ContactWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} />
      <JourneyWizard open={isJourneyOpen} onOpenChange={setIsJourneyOpen} />
    </section>
  );
};
