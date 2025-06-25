
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

interface CelebrationStepProps {
  data: any;
  onClose: () => void;
  onNewInquiry: () => void;
  onCalendlyBooking: () => void;
}

export const CelebrationStep = ({ data, onClose, onNewInquiry, onCalendlyBooking }: CelebrationStepProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    // Show content after a brief delay
    setTimeout(() => setShowContent(true), 500);

    return () => clearInterval(interval);
  }, []);

  const getRecommendation = () => {
    // Simple recommendation logic based on journey tags
    if (data.journeyTags?.includes('total_support') || data.journeyTags?.includes('horizon')) {
      return {
        title: "Summit Package",
        description: "Full-service video strategy with weekly content production",
        icon: "🏔️"
      };
    } else if (data.journeyTags?.includes('scaling_team') || data.journeyTags?.includes('summit')) {
      return {
        title: "Basecamp Package", 
        description: "Consistent monthly content with strategic guidance",
        icon: "⛺"
      };
    } else {
      return {
        title: "Trailhead Package",
        description: "Perfect starting point with foundational video content",
        icon: "🥾"
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="p-8 text-center">
      {showContent && (
        <div className="animate-fade-in">
          <div className="text-6xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
            You've Mapped Your <span className="text-gradient-1">Route</span>!
          </h2>
          <p className="text-xl text-corporate-gray max-w-2xl mx-auto mb-8">
            Based on your journey, here's the plan we recommend...
          </p>

          <div className="max-w-lg mx-auto bg-video-white rounded-2xl p-8 border-2 border-corporate-light mb-8 hover:scale-105 transition-all duration-300">
            <div className="text-4xl mb-4">{recommendation.icon}</div>
            <h3 className="text-2xl font-bold text-corporate-dark mb-3">
              {recommendation.title}
            </h3>
            <p className="text-corporate-gray mb-6">
              {recommendation.description}
            </p>
            <div className="text-sm text-corporate-gray bg-corporate-light rounded-lg p-3">
              Perfect for: {data.firstName} at {data.company}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              onClick={onCalendlyBooking}
              className="px-8 py-4 gradient-social-1 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow"
            >
              Book Your Strategy Session 📞
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                // You could trigger an email or download here
                onClose();
              }}
              className="px-8 py-4 border-2 border-social-purple text-social-purple font-bold text-lg rounded-2xl hover:bg-social-purple hover:text-white transition-all duration-300"
            >
              Send Me the Plan First 📧
            </Button>
          </div>

          <div className="text-sm text-corporate-gray">
            Want to explore a different path?{' '}
            <button
              onClick={onNewInquiry}
              className="text-social-purple font-medium hover:underline"
            >
              Start New Journey
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
