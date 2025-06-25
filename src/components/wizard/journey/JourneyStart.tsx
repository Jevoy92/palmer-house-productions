
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface JourneyStartProps {
  onSelect: (tag: string) => void;
}

export const JourneyStart = ({ onSelect }: JourneyStartProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const options = [
    { label: "I don't know what kind of videos I need", tag: "format_help", icon: "🎬" },
    { label: "I'm not sure how often I should post", tag: "frequency_confusion", icon: "⏰" },
    { label: "I don't know where to post my videos", tag: "platform_unknowns", icon: "📱" },
    { label: "I want to eliminate repetitive tasks and help my team work more efficiently", tag: "internal_needs", icon: "⚡" },
    { label: "All of the above", tag: "total_support", icon: "🚀" },
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
          Start Your <span className="text-gradient-1">Expedition</span>
        </h2>
        <p className="text-xl text-corporate-gray max-w-2xl mx-auto">
          What feels most unclear about video right now?
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {options.map((option) => (
          <button
            key={option.tag}
            onClick={() => handleSelect(option.tag)}
            className={`w-full p-6 bg-video-white rounded-2xl border-2 transition-all duration-300 text-left hover:border-corporate-dark hover:scale-105 hover:shadow-lg ${
              selectedOption === option.tag 
                ? 'border-corporate-dark bg-corporate-light scale-105 shadow-lg' 
                : 'border-corporate-light'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="text-3xl">{option.icon}</div>
              <div className="flex-1">
                <p className="text-lg font-medium text-corporate-dark">
                  {option.label}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
