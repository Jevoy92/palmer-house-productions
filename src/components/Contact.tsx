
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
import { JourneyProgress } from "./wizard/journey/JourneyProgress";
import { Button } from "./ui/button";

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
    <section id="contact" className="py-12 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Palmer House Wizard
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            The Client Expedition
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Let us guide you through an immersive journey to help you understand your needs and find the right solution with clarity and momentum.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Embedded Journey Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative">
            {currentStep <= 5 && (
              <JourneyProgress currentStep={currentStep} totalSteps={6} />
            )}
            
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

            <div className="min-h-[500px]">
              {renderEmbeddedStep()}
            </div>
          </div>

          {/* Right Column - Journey Preview */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Expedition Preview</h2>
            <div className="space-y-6">
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">🌲</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Your Trail Map</h3>
                    <p className="text-gray-600">Tell us about your business stage and current challenges so we can map the perfect path forward.</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">🏜️</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Fuel for the Climb</h3>
                    <p className="text-gray-600">Discover what type of video content will best serve your goals and audience.</p>
                  </div>
                </div>
              </div>

              <div className="bg-pink-50 rounded-xl p-6 border border-pink-100">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">⭐</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Pick Your Pace</h3>
                    <p className="text-gray-600">Choose the content frequency and production level that matches your ambitions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fellow Explorers Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Fellow Explorers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="mb-4">
                <p className="text-gray-700 italic mb-4">
                  "Palmer House transformed our brand story into compelling video content that resonates with our audience."
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">Sarah Johnson</p>
                <p className="text-sm text-gray-600">CEO, TechStart Solutions</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="mb-4">
                <p className="text-gray-700 italic mb-4">
                  "The journey approach helped us discover exactly what our business needed. The results speak for themselves."
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">Michael Chen</p>
                <p className="text-sm text-gray-600">Founder, GrowthLab</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="mb-4">
                <p className="text-gray-700 italic mb-4">
                  "Professional, creative, and results-driven. Palmer House exceeded our expectations in every way."
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">Emma Rodriguez</p>
                <p className="text-sm text-gray-600">Marketing Director, Innovate Co</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Map Your Video Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of businesses who've discovered their perfect video strategy through our guided expedition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => resetJourney()}
              className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-3"
            >
              Start Your Expedition
            </Button>
            <Button
              onClick={handleCalendlyBooking}
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-bold px-8 py-3"
            >
              Book Strategy Call
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center pt-16 border-t border-gray-200 mt-16">
          <p className="text-gray-500">
            © 2025 Palmer House Productions. All rights reserved. Crafting authentic stories since day one.
          </p>
        </footer>
      </div>

      <ContactWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} />
      <JourneyWizard open={isJourneyOpen} onOpenChange={setIsJourneyOpen} />
    </section>
  );
};
