
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

  const handleViewAllReviews = () => {
    window.open('https://www.google.com/search?q=palmer+house+productions&oq=palmer+house+productions&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGD0yBggCEEUYPTIGCAMQRRhB0gEINTI0OWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x54905d5328d9caa5:0x5946127015c6ae31,1,,,,', '_blank');
  };

  const reviews = [
    {
      name: "Isabella Johnstun",
      reviewCount: "2 reviews",
      timeAgo: "a week ago",
      text: "Jevoy and his team did an amazing job with pictures & videos of our team and stores. Our management was blown away by the quality, professionalism, and speed at which their media was produced. They took the time to understand our goals and absolutely delivered on every promise. We felt like they took our feedback really well and took the time to make the final product better than we every imagined! I'm looking forward to working with them on future projects!"
    },
    {
      name: "Athan Seyler",
      reviewCount: "Local Guide · 8 reviews",
      timeAgo: "a month ago",
      text: "Jevoy and the Palmer House Team were fantastic! Getting in front of the camera for photos is one stressor, but jumping in front of the camera to make a video is even more stressful. Jevoy has a gift of helping his clients become grounded again, making the process enjoyable and fun. Would highly recommend for anyone looking to add videos to their marketing plan as Jevoy also jumps into marketing strategy with his videos."
    },
    {
      name: "Sarah Dylan Jensen",
      reviewCount: "Local Guide · 32 reviews · 54 photos",
      timeAgo: "9 months ago",
      text: "Awesome experience from start to finish working with Jevoy. He was in constant communication, detail-oriented and provided exactly what we were looking for in our organization's marketing videos and photos."
    }
  ];

  const renderStars = () => {
    return (
      <div className="flex space-x-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">★</span>
        ))}
      </div>
    );
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

        {/* Full-width Journey Form */}
        <div className="max-w-4xl mx-auto mb-16">
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
        </div>

        {/* Expedition Preview - Now under the form */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Expedition Preview</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here's a glimpse of the journey ahead as we guide you to your perfect video strategy.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
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

        {/* Google Reviews Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Fellow Explorers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                {renderStars()}
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {review.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">{review.reviewCount}</p>
                  <p className="text-gray-600 text-sm">{review.timeAgo}</p>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  "{review.text}"
                </p>
                
                {/* Google Badge */}
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-green-500 rounded-full"></div>
                  <span className="text-gray-600 text-sm font-medium">Google Review</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Reviews CTA */}
          <div className="text-center mt-8">
            <Button 
              onClick={handleViewAllReviews}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
            >
              View All Google Reviews ⭐
            </Button>
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
