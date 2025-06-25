
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ClimbFuelStepProps {
  onSelect: (tag: string) => void;
  onBack: () => void;
}

export const ClimbFuelStep = ({ onSelect, onBack }: ClimbFuelStepProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const options = [
    { label: "We need more leads", tag: "lead_gen", icon: "🎯" },
    { label: "Build trust with our audience", tag: "trust_building", icon: "🤝" },
    { label: "Explain our process better (for clients or team)", tag: "internal_clarity", icon: "🔍" },
    { label: "Train our team or onboard people better", tag: "training_ops", icon: "🎓" },
    { label: "Position ourselves as experts", tag: "thought_leadership", icon: "👑" },
    { label: "Educate customers before and after they buy", tag: "customer_support", icon: "💡" },
    { label: "Help our sales team close more deals", tag: "sales_enablement", icon: "📈" },
  ];

  const handleSelect = (tag: string) => {
    setSelectedOption(tag);
    setTimeout(() => onSelect(tag), 300);
  };

  return (
    <div className="p-8 text-center">
      <div className="mb-8">
        <div className="text-6xl mb-4">⛽</div>
        <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
          Fuel for the <span className="text-gradient-1">Climb</span>
        </h2>
        <p className="text-xl text-corporate-gray max-w-2xl mx-auto">
          What's your top reason for exploring video?
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {options.map((option) => (
          <button
            key={option.tag}
            onClick={() => handleSelect(option.tag)}
            className={`p-6 bg-video-white rounded-xl border-2 transition-all duration-300 text-center hover:border-corporate-dark hover:scale-105 hover:shadow-lg ${
              selectedOption === option.tag 
                ? 'border-corporate-dark bg-corporate-light scale-105 shadow-lg' 
                : 'border-corporate-light'
            }`}
          >
            <div className="text-3xl mb-3">{option.icon}</div>
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
    </div>
  );
};
