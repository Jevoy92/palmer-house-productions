
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface GoalsStepProps {
  onSelect: (tag: string) => void;
  onBack: () => void;
}

export const GoalsStep = ({ onSelect, onBack }: GoalsStepProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const options = [
    { label: "We need more leads", tag: "lead_gen", icon: "🎯" },
    { label: "Build trust with our audience", tag: "trust_building", icon: "🤝" },
    { label: "Explain our process better", tag: "internal_clarity", icon: "📋" },
    { label: "Train our team better", tag: "training_ops", icon: "🎓" },
    { label: "Position ourselves as experts", tag: "thought_leadership", icon: "👑" },
    { label: "Educate customers", tag: "customer_support", icon: "💡" },
    { label: "Help sales close deals", tag: "sales_enablement", icon: "💼" },
  ];

  const handleToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleContinue = () => {
    const primaryTag = selectedTags[0] || "lead_gen";
    onSelect(primaryTag);
  };

  return (
    <div className="min-h-[600px] p-8 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="text-5xl mb-4">⛽</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Are Your <span className="text-orange-600">Goals</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            What's your top reason for exploring video? (Select all that apply)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {options.map((option) => (
            <button
              key={option.tag}
              onClick={() => handleToggle(option.tag)}
              className={`p-4 bg-white rounded-lg border-2 transition-all duration-200 text-left hover:border-orange-500 hover:shadow-sm ${
                selectedTags.includes(option.tag)
                  ? 'border-orange-500 bg-orange-50 shadow-sm' 
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-xl">{option.icon}</div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {option.label}
                  </p>
                </div>
                {selectedTags.includes(option.tag) && (
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
          <Button 
            onClick={handleContinue}
            disabled={selectedTags.length === 0}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Continue →
          </Button>
        </div>
      </div>
    </div>
  );
};
