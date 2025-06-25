
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface PacePickerStepProps {
  onSelect: (tag: string) => void;
  onBack: () => void;
}

export const PacePickerStep = ({ onSelect, onBack }: PacePickerStepProps) => {
  const [selectedPace, setSelectedPace] = useState<number>(1);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const paceOptions = [
    { value: 1, label: "One solid video a month", tag: "trailhead", icon: "🥾", description: "Steady and consistent" },
    { value: 2, label: "A few pieces to stay present", tag: "basecamp", icon: "⛺", description: "Building momentum" },
    { value: 3, label: "Weekly content for traction", tag: "summit", icon: "🏔️", description: "Active engagement" },
    { value: 4, label: "We want to flood the market", tag: "horizon", icon: "🚀", description: "Maximum visibility" },
  ];

  const currentOption = paceOptions[selectedPace - 1];

  const handleSliderChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = (e.clientX - rect.left) / rect.width;
      const newValue = Math.min(4, Math.max(1, Math.round(percentage * 4)));
      setSelectedPace(newValue);
    }
  };

  const handleSelect = () => {
    onSelect(currentOption.tag);
  };

  return (
    <div className="p-8 text-center">
      <div className="mb-8">
        <div className="text-6xl mb-4">🎵</div>
        <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
          Pick Your <span className="text-gradient-1">Pace</span>
        </h2>
        <p className="text-xl text-corporate-gray max-w-2xl mx-auto">
          Imagine your video strategy as a rhythm — what fits your current groove?
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <div className="bg-video-white rounded-2xl p-8 border-2 border-corporate-light">
          <div className="text-4xl mb-4">{currentOption.icon}</div>
          <h3 className="text-2xl font-bold text-corporate-dark mb-2">
            {currentOption.label}
          </h3>
          <p className="text-corporate-gray mb-6">
            {currentOption.description}
          </p>

          <div className="relative">
            <div
              ref={sliderRef}
              className="w-full h-4 bg-corporate-light rounded-full cursor-pointer"
              onClick={handleSliderChange}
            >
              <div
                className="h-full gradient-social-1 rounded-full transition-all duration-300"
                style={{ width: `${(selectedPace / 4) * 100}%` }}
              />
              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border-2 border-corporate-dark rounded-full cursor-grab active:cursor-grabbing shadow-lg transition-all duration-300"
                style={{ left: `calc(${((selectedPace - 1) / 3) * 100}% - 12px)` }}
              />
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
    </div>
  );
};
