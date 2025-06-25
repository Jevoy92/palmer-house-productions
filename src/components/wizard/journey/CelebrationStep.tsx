
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
  const [currentRecommendation, setCurrentRecommendation] = useState(0);

  useEffect(() => {
    // Epic confetti celebration
    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

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

      // Multi-colored confetti from different angles
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6']
      });
    }, 250);

    // Show content after confetti starts
    setTimeout(() => setShowContent(true), 800);

    return () => clearInterval(interval);
  }, []);

  const getRecommendation = () => {
    const tags = data.journeyTags || [];
    
    if (tags.includes('horizon') || tags.includes('total_support')) {
      return {
        title: "Horizon Package",
        subtitle: "Full-scale video domination",
        description: "High-frequency publishing with complete strategic oversight",
        icon: "🚀",
        gradient: "from-red-400 via-pink-500 to-purple-600",
        features: ["Weekly content production", "Multi-platform strategy", "Advanced analytics", "Dedicated team"]
      };
    } else if (tags.includes('summit') || tags.includes('scaling_team')) {
      return {
        title: "Summit Package", 
        subtitle: "Weekly strategy and production",
        description: "Perfect for building major momentum and market presence",
        icon: "🏔️",
        gradient: "from-purple-400 via-blue-500 to-cyan-600",
        features: ["Weekly video content", "Strategic planning", "Performance tracking", "Team collaboration"]
      };
    } else if (tags.includes('basecamp') || tags.includes('established_leader')) {
      return {
        title: "Basecamp Package",
        subtitle: "3–4 videos per month",
        description: "Maintain visibility and nurture leads consistently",
        icon: "⛺",
        gradient: "from-blue-400 via-green-500 to-teal-600",
        features: ["Monthly content calendar", "Professional production", "Brand consistency", "Growth tracking"]
      };
    } else {
      return {
        title: "Trailhead Package",
        subtitle: "1–2 monthly videos",
        description: "Perfect for testing and steady, sustainable growth",
        icon: "🥾",
        gradient: "from-green-400 via-emerald-500 to-teal-600",
        features: ["Monthly video creation", "Strategy foundation", "Market testing", "Scalable approach"]
      };
    }
  };

  const recommendations = [getRecommendation()];

  return (
    <div className="journey-scene celebration-theme p-8 text-center relative overflow-hidden min-h-screen">
      {/* Celebration Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 opacity-60"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {['🎉', '🎊', '⭐', '🌟', '✨'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      {showContent && (
        <div className="relative z-10 animate-fade-in">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h2 className="text-5xl font-display font-black text-corporate-dark mb-4">
            You've Mapped Your <span className="text-gradient-1">Route</span>!
          </h2>
          <p className="text-2xl text-corporate-gray max-w-3xl mx-auto mb-12 leading-relaxed">
            Based on your expedition, here's the perfect plan we've crafted just for you...
          </p>

          <div className="max-w-2xl mx-auto mb-12">
            <div className={`bg-white rounded-3xl p-10 border-4 border-transparent bg-gradient-to-br ${recommendations[currentRecommendation].gradient} shadow-2xl transform hover:scale-105 transition-all duration-500`}>
              <div className="bg-white rounded-2xl p-8 m-1">
                <div className="text-6xl mb-6 animate-bounce">{recommendations[currentRecommendation].icon}</div>
                <h3 className="text-3xl font-black text-corporate-dark mb-2">
                  {recommendations[currentRecommendation].title}
                </h3>
                <p className="text-xl text-social-purple font-bold mb-4">
                  {recommendations[currentRecommendation].subtitle}
                </p>
                <p className="text-corporate-gray mb-6 text-lg">
                  {recommendations[currentRecommendation].description}
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {recommendations[currentRecommendation].features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-corporate-dark">
                      <span className="text-green-500">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="text-sm text-corporate-gray bg-corporate-light rounded-lg p-4">
                  <span className="font-medium">Customized for:</span> {data.firstName} at {data.company}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Button
              onClick={onCalendlyBooking}
              className="px-10 py-6 gradient-social-1 text-white font-bold text-xl rounded-2xl hover:scale-110 transition-all duration-300 video-shadow-lg"
            >
              Book Your Strategy Session 📞
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                // Trigger email or download
                onClose();
              }}
              className="px-10 py-6 border-3 border-social-purple text-social-purple font-bold text-xl rounded-2xl hover:bg-social-purple hover:text-white transition-all duration-300 video-shadow"
            >
              Send Me the Plan First 📧
            </Button>
          </div>

          <div className="bg-white/80 rounded-2xl p-6 max-w-lg mx-auto mb-8">
            <h4 className="font-bold text-corporate-dark mb-3">Your Journey Summary:</h4>
            <div className="text-sm text-corporate-gray space-y-1">
              <p><span className="font-medium">Challenge:</span> {data.painPoint}</p>
              <p><span className="font-medium">Stage:</span> {data.businessStage}</p>
              <p><span className="font-medium">Goal:</span> {data.videoGoal}</p>
              <p><span className="font-medium">Pace:</span> {data.contentPace}</p>
              <p><span className="font-medium">Budget:</span> {data.budget}</p>
            </div>
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
