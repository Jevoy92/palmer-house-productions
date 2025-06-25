
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CompassBot } from "./CompassBot";

interface TrailMapStepProps {
  onSelect: (tag: string) => void;
  onBack: () => void;
}

export const TrailMapStep = ({ onSelect, onBack }: TrailMapStepProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showTips, setShowTips] = useState(false);

  const options = [
    { 
      label: "Just getting my feet under me", 
      tag: "solo_startup", 
      icon: "🌱",
      description: "Early stage, finding your direction",
      gradient: "from-green-400 to-green-600"
    },
    { 
      label: "Growing with a lean team", 
      tag: "scaling_team", 
      icon: "🌳",
      description: "Building momentum and systems",
      gradient: "from-blue-400 to-blue-600"
    },
    { 
      label: "We're established and ready to lead", 
      tag: "established_leader", 
      icon: "🏔️",
      description: "Market position, scaling impact",
      gradient: "from-purple-400 to-purple-600"
    },
  ];

  const tips = [
    "Think about where you are today, not where you want to be.",
    "Your current stage shapes the perfect video strategy for you.",
    "Growth happens in stages—let's find yours."
  ];

  const handleSelect = (tag: string) => {
    setSelectedOption(tag);
    setTimeout(() => onSelect(tag), 300);
  };

  return (
    <div className="journey-scene forest-theme p-8 text-center relative overflow-hidden">
      {/* Forest Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-emerald-50 opacity-40"></div>
      <div className="absolute top-5 left-5 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-10 right-10 w-28 h-28 bg-emerald-200 rounded-full opacity-25 animate-float" style={{animationDelay: '3s'}}></div>

      <div className="relative z-10">
        <div className="mb-8">
          <div className="text-6xl mb-4 animate-bounce">🗺️</div>
          <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
            Choose Your <span className="text-gradient-1">Trail Map</span>
          </h2>
          <p className="text-xl text-corporate-gray max-w-2xl mx-auto">
            Which of these matches your business's current vibe?
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-4 mb-8">
          {options.map((option) => (
            <button
              key={option.tag}
              onClick={() => handleSelect(option.tag)}
              className={`emoji-card w-full p-8 bg-video-white rounded-2xl border-2 transition-all duration-300 text-center hover:border-corporate-dark hover:scale-105 hover:shadow-lg ${
                selectedOption === option.tag 
                  ? 'border-corporate-dark bg-corporate-light scale-105 shadow-lg' 
                  : 'border-corporate-light'
              }`}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${option.gradient} flex items-center justify-center text-2xl`}>
                {option.icon}
              </div>
              <h3 className="text-xl font-bold text-corporate-dark mb-2">
                {option.label}
              </h3>
              <p className="text-corporate-gray">
                {option.description}
              </p>
            </button>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="border-corporate-gray text-corporate-gray hover:bg-corporate-light"
        >
          ← Back
        </Button>

        <CompassBot 
          tips={tips} 
          showTips={showTips} 
          onToggleTips={() => setShowTips(!showTips)}
        />
      </div>
    </div>
  );
};
