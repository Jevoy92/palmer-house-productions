
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

interface CelebrationStepProps {
  data: any;
  onClose: () => void;
  onNewInquiry: () => void;
  onCalendlyBooking: () => void;
}

export const CelebrationStep = ({ data, onClose, onNewInquiry, onCalendlyBooking }: CelebrationStepProps) => {
  useEffect(() => {
    // Trigger confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#6366f1', '#8b5cf6', '#f59e0b'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }, []);

  const getRecommendation = () => {
    const tags = data.journeyTags || [];
    if (tags.includes("horizon")) return "Horizon Package – Full-scale video domination with high-frequency publishing.";
    if (tags.includes("summit")) return "Summit Package – Weekly strategy and production for major momentum.";
    if (tags.includes("basecamp")) return "Basecamp Package – 3–4 videos/month to maintain visibility and nurture leads.";
    return "Trailhead Package – 1–2 monthly videos, perfect for testing and steady growth.";
  };

  return (
    <div className="min-h-[600px] p-8 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            You've Mapped Your <span className="text-pink-600">Route</span>!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Based on your journey, here's what we recommend for {data.firstName}:
          </p>
        </div>

        <div className="bg-white rounded-lg p-8 border-2 border-pink-200 shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {getRecommendation().split(' – ')[0]}
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            {getRecommendation().split(' – ')[1]}
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Your Journey Summary:</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Company:</strong> {data.company}</p>
              <p><strong>Challenge:</strong> {data.challenge}</p>
              <p><strong>Budget:</strong> {data.budget}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={onCalendlyBooking}
            className="bg-pink-600 hover:bg-pink-700 text-lg px-8 py-3"
          >
            Book Your Strategy Session 📞
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="text-lg px-8 py-3"
          >
            Send Me the Plan First 📧
          </Button>
        </div>

        <div className="mt-6">
          <button
            onClick={onNewInquiry}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Start a new journey
          </button>
        </div>
      </div>
    </div>
  );
};
