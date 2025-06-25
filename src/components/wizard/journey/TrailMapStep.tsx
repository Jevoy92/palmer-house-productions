
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface TrailMapStepProps {
  onSelect: (tag: string) => void;
  onBack: () => void;
}

export const TrailMapStep = ({ onSelect, onBack }: TrailMapStepProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const options = [
    { 
      label: "Just getting my feet under me", 
      tag: "solo_startup", 
      icon: "🌱",
      description: "Early stage, finding your direction"
    },
    { 
      label: "Growing with a lean team", 
      tag: "scaling_team", 
      icon: "🌳",
      description: "Building momentum and systems"
    },
    { 
      label: "We're established and ready to lead", 
      tag: "established_leader", 
      icon: "🏔️",
      description: "Market position, scaling impact"
    },
  ];

  const handleSelect = (tag: string) => {
    setSelectedOption(tag);
    setTimeout(() => onSelect(tag), 300);
  };

  return (
    <div className="p-8 text-center">
      <div className="mb-8">
        <div className="text-6xl mb-4">🗺️</div>
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
            className={`w-full p-8 bg-video-white rounded-2xl border-2 transition-all duration-300 text-center hover:border-corporate-dark hover:scale-105 hover:shadow-lg ${
              selectedOption === option.tag 
                ? 'border-corporate-dark bg-corporate-light scale-105 shadow-lg' 
                : 'border-corporate-light'
            }`}
          >
            <div className="text-4xl mb-3">{option.icon}</div>
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
    </div>
  );
};
