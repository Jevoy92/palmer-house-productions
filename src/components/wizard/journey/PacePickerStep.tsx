
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface PacePickerStepProps {
  onSelect: (tag: string) => void;
  onBack: () => void;
}

export const PacePickerStep = ({ onSelect, onBack }: PacePickerStepProps) => {
  const [selectedPace, setSelectedPace] = useState<number>(1);

  const paceOptions = [
    { 
      value: 1, 
      label: "One solid video a month", 
      tag: "trailhead", 
      icon: "🥾", 
      description: "Steady and consistent"
    },
    { 
      value: 2, 
      label: "A few pieces to stay present", 
      tag: "basecamp", 
      icon: "⛺", 
      description: "Building momentum"
    },
    { 
      value: 3, 
      label: "Weekly content for traction", 
      tag: "summit", 
      icon: "🏔️", 
      description: "Active engagement"
    },
    { 
      value: 4, 
      label: "We want to flood the market", 
      tag: "horizon", 
      icon: "🚀", 
      description: "Maximum visibility"
    },
  ];

  const currentOption = paceOptions[selectedPace - 1];

  const handleSliderChange = (value: number[]) => {
    setSelectedPace(value[0]);
  };

  const handleSelect = () => {
    onSelect(currentOption.tag);
  };

  return (
    <div className="min-h-[600px] p-8 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="text-5xl mb-4">🎵</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pick Your <span className="text-purple-600">Pace</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Imagine your video strategy as a rhythm — what fits your current groove?
          </p>
        </div>

        <div className="bg-white rounded-lg p-8 border-2 border-gray-200 shadow-sm mb-8">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
              {currentOption.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {currentOption.label}
            </h3>
            <p className="text-gray-600">
              {currentOption.description}
            </p>
          </div>

          <div className="space-y-4">
            <Slider
              value={[selectedPace]}
              onValueChange={handleSliderChange}
              max={4}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Minimal</span>
              <span>Consistent</span>
              <span>Active</span>
              <span>Maximum</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
          <Button 
            onClick={handleSelect}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Continue →
          </Button>
        </div>
      </div>
    </div>
  );
};
