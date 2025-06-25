
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
      description: "Early stage, figuring things out"
    },
    { 
      label: "Growing with a lean team", 
      tag: "scaling_team", 
      icon: "🌿",
      description: "Building momentum and systems"
    },
    { 
      label: "We're established and ready to lead", 
      tag: "established_leader", 
      icon: "🌳",
      description: "Market presence and thought leadership"
    },
  ];

  const handleSelect = (tag: string) => {
    setSelectedOption(tag);
    setTimeout(() => onSelect(tag), 200);
  };

  return (
    <div className="min-h-[600px] p-8 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <div className="text-5xl mb-4">🧭</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your <span className="text-green-600">Trail Map</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Which of these matches your business's current vibe?
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {options.map((option) => (
            <button
              key={option.tag}
              onClick={() => handleSelect(option.tag)}
              className={`w-full p-6 bg-white rounded-lg border-2 transition-all duration-200 text-left hover:border-green-500 hover:shadow-md ${
                selectedOption === option.tag 
                  ? 'border-green-500 bg-green-50 shadow-md' 
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{option.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {option.label}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
        </div>
      </div>
    </div>
  );
};
