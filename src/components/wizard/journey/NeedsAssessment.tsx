
import { useState } from "react";

interface NeedsAssessmentProps {
  onSelect: (tag: string) => void;
}

export const NeedsAssessment = ({ onSelect }: NeedsAssessmentProps) => {
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
    setTimeout(() => onSelect(tag), 200);
  };

  return (
    <div className="min-h-[600px] p-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <div className="text-5xl mb-4">🗺️</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Let's Assess Your <span className="text-blue-600">Needs</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            What feels most unclear about video right now?
          </p>
        </div>

        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.tag}
              onClick={() => handleSelect(option.tag)}
              className={`w-full p-4 bg-white rounded-lg border-2 transition-all duration-200 text-left hover:border-blue-500 hover:shadow-md ${
                selectedOption === option.tag 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{option.icon}</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {option.label}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
