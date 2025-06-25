
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CompassBot } from "./CompassBot";

interface ClimbFuelStepProps {
  onSelect: (tag: string) => void;
  onBack: () => void;
}

export const ClimbFuelStep = ({ onSelect, onBack }: ClimbFuelStepProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showTips, setShowTips] = useState(false);

  const options = [
    { label: "We need more leads", tag: "lead_gen", icon: "🎯", color: "bg-red-100 hover:bg-red-200 border-red-300" },
    { label: "Build trust with our audience", tag: "trust_building", icon: "🤝", color: "bg-blue-100 hover:bg-blue-200 border-blue-300" },
    { label: "Explain our process better (for clients or team)", tag: "internal_clarity", icon: "🔍", color: "bg-purple-100 hover:bg-purple-200 border-purple-300" },
    { label: "Train our team or onboard people better", tag: "training_ops", icon: "🎓", color: "bg-green-100 hover:bg-green-200 border-green-300" },
    { label: "Position ourselves as experts", tag: "thought_leadership", icon: "👑", color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300" },
    { label: "Educate customers before and after they buy", tag: "customer_support", icon: "💡", color: "bg-orange-100 hover:bg-orange-200 border-orange-300" },
    { label: "Help our sales team close more deals", tag: "sales_enablement", icon: "📈", color: "bg-pink-100 hover:bg-pink-200 border-pink-300" },
  ];

  const tips = [
    "Pick the goal that keeps you up at night.",
    "Video works best when it solves a real problem.",
    "Your biggest challenge is your biggest opportunity."
  ];

  const handleSelect = (tag: string) => {
    setSelectedOption(tag);
    setTimeout(() => onSelect(tag), 300);
  };

  return (
    <div className="journey-scene desert-theme p-8 text-center relative overflow-hidden">
      {/* Desert Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-yellow-50 opacity-40"></div>
      <div className="absolute top-0 left-0 w-40 h-40 bg-yellow-200 rounded-full opacity-15 animate-float"></div>
      <div className="absolute bottom-0 right-0 w-36 h-36 bg-orange-200 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>

      <div className="relative z-10">
        <div className="mb-8">
          <div className="text-6xl mb-4 animate-bounce">⛽</div>
          <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
            Fuel for the <span className="text-gradient-1">Climb</span>
          </h2>
          <p className="text-xl text-corporate-gray max-w-2xl mx-auto">
            What's your top reason for exploring video?
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {options.map((option, index) => (
            <button
              key={option.tag}
              onClick={() => handleSelect(option.tag)}
              className={`sticker-tile p-6 rounded-xl border-2 transition-all duration-300 text-center hover:scale-105 hover:shadow-lg ${
                selectedOption === option.tag 
                  ? 'border-corporate-dark bg-corporate-light scale-105 shadow-lg animate-pulse' 
                  : `${option.color} border-transparent hover:border-current`
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: 'sticker-appear 0.5s ease-out forwards'
              }}
            >
              <div className="text-3xl mb-3 sticker-icon animate-bounce" style={{animationDelay: `${index * 0.2}s`}}>
                {option.icon}
              </div>
              <p className="text-sm font-medium text-corporate-dark leading-tight">
                {option.label}
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
