
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CompassBot } from "./CompassBot";

interface PacePickerStepProps {
  onSelect: (tag: string) => void;
  onBack: () => void;
}

export const PacePickerStep = ({ onSelect, onBack }: PacePickerStepProps) => {
  const [selectedPace, setSelectedPace] = useState<number>(1);
  const [showTips, setShowTips] = useState(false);

  const paceOptions = [
    { 
      value: 1, 
      label: "One solid video a month", 
      tag: "trailhead", 
      icon: "🥾", 
      description: "Steady and consistent",
      theme: "from-green-400 to-green-600"
    },
    { 
      value: 2, 
      label: "A few pieces to stay present", 
      tag: "basecamp", 
      icon: "⛺", 
      description: "Building momentum",
      theme: "from-blue-400 to-blue-600"
    },
    { 
      value: 3, 
      label: "Weekly content for traction", 
      tag: "summit", 
      icon: "🏔️", 
      description: "Active engagement",
      theme: "from-purple-400 to-purple-600"
    },
    { 
      value: 4, 
      label: "We want to flood the market", 
      tag: "horizon", 
      icon: "🚀", 
      description: "Maximum visibility",
      theme: "from-red-400 to-red-600"
    },
  ];

  const tips = [
    "Your pace should match your capacity, not your ambition.",
    "Consistency beats perfection every time.",
    "You can always ramp up later—start where you can sustain."
  ];

  const currentOption = paceOptions[selectedPace - 1];

  const handleSliderChange = (value: number) => {
    setSelectedPace(value);
  };

  const handleSelect = () => {
    onSelect(currentOption.tag);
  };

  return (
    <div className="journey-scene stars-theme p-8 text-center relative overflow-hidden">
      {/* Stars Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-purple-50 opacity-40"></div>
      <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-300 rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-20 right-20 w-3 h-3 bg-blue-300 rounded-full opacity-70 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-purple-300 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-pink-300 rounded-full opacity-80 animate-pulse" style={{animationDelay: '3s'}}></div>

      <div className="relative z-10">
        <div className="mb-8">
          <div className="text-6xl mb-4 animate-bounce">🎵</div>
          <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
            Pick Your <span className="text-gradient-1">Pace</span>
          </h2>
          <p className="text-xl text-corporate-gray max-w-2xl mx-auto">
            Imagine your video strategy as a rhythm — what fits your current groove?
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-video-white rounded-2xl p-8 border-2 border-corporate-light">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${currentOption.theme} flex items-center justify-center text-3xl animate-pulse`}>
              {currentOption.icon}
            </div>
            <h3 className="text-2xl font-bold text-corporate-dark mb-2">
              {currentOption.label}
            </h3>
            <p className="text-corporate-gray mb-6">
              {currentOption.description}
            </p>

            {/* Custom Slider */}
            <div className="relative mb-4">
              <div 
                className="w-full h-6 bg-corporate-light rounded-full cursor-pointer relative overflow-hidden"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percentage = (e.clientX - rect.left) / rect.width;
                  const newValue = Math.min(4, Math.max(1, Math.round(percentage * 4)));
                  handleSliderChange(newValue);
                }}
              >
                <div
                  className={`h-full bg-gradient-to-r ${currentOption.theme} rounded-full transition-all duration-500 relative`}
                  style={{ width: `${(selectedPace / 4) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border-3 border-current rounded-full cursor-grab active:cursor-grabbing shadow-lg"></div>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-corporate-gray">
                <span>Minimal</span>
                <span>Consistent</span>
                <span>Active</span>
                <span>Maximum</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="border-corporate-gray text-corporate-gray hover:bg-corporate-light"
          >
            ← Back
          </Button>
          <Button
            type="button"
            onClick={handleSelect}
            className="gradient-social-1 text-white font-medium hover:scale-105 transition-all duration-300"
          >
            Continue →
          </Button>
        </div>

        <CompassBot 
          tips={tips} 
          showTips={showTips} 
          onToggleTips={() => setShowTips(!showTips)}
        />
      </div>
    </div>
  );
};
