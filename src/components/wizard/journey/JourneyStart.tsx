
import { useState } from "react";
import { CompassBot } from "./CompassBot";

interface JourneyStartProps {
  onSelect: (tag: string) => void;
}

export const JourneyStart = ({ onSelect }: JourneyStartProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showTips, setShowTips] = useState(false);

  const options = [
    { label: "I don't know what kind of videos I need", tag: "format_help", icon: "🎬" },
    { label: "I'm not sure how often I should post", tag: "frequency_confusion", icon: "⏰" },
    { label: "I don't know where to post my videos", tag: "platform_unknowns", icon: "📱" },
    { label: "I want to eliminate repetitive tasks and help my team work more efficiently", tag: "internal_needs", icon: "⚡" },
    { label: "All of the above", tag: "total_support", icon: "🚀" },
  ];

  const tips = [
    "You don't need to know it all—just pick what feels like your next best step.",
    "No wrong answers here. Let's find your story together.",
    "Need a break? You can always save this journey and finish later."
  ];

  const handleSelect = (tag: string) => {
    setSelectedOption(tag);
    setTimeout(() => onSelect(tag), 300);
  };

  return (
    <div className="journey-scene mountains-theme p-8 text-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-green-50 opacity-30"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute top-20 right-20 w-16 h-16 bg-green-200 rounded-full opacity-25 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-purple-200 rounded-full opacity-15 animate-float" style={{animationDelay: '4s'}}></div>

      <div className="relative z-10">
        <div className="mb-8">
          <div className="text-6xl mb-4 animate-bounce">🗺️</div>
          <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
            Start Your <span className="text-gradient-1">Expedition</span>
          </h2>
          <p className="text-xl text-corporate-gray max-w-2xl mx-auto">
            What feels most unclear about video right now?
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4 mb-8">
          {options.map((option) => (
            <button
              key={option.tag}
              onClick={() => handleSelect(option.tag)}
              className={`bubble-button w-full p-6 bg-video-white rounded-2xl border-2 transition-all duration-300 text-left hover:border-corporate-dark hover:scale-105 hover:shadow-lg ${
                selectedOption === option.tag 
                  ? 'border-corporate-dark bg-corporate-light scale-105 shadow-lg animate-pulse' 
                  : 'border-corporate-light hover:bg-gradient-to-r hover:from-social-purple hover:to-social-pink hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl bubble-icon">{option.icon}</div>
                <div className="flex-1">
                  <p className="text-lg font-medium">
                    {option.label}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Compass Bot */}
        <CompassBot 
          tips={tips} 
          showTips={showTips} 
          onToggleTips={() => setShowTips(!showTips)}
        />
      </div>
    </div>
  );
};
