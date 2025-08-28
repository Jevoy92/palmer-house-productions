
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardSelection } from "./CardSelection";
import { GeographicType } from "./types";

interface GeographicStepProps {
  selectedGeographic?: GeographicType;
  geographicCustom?: string;
  onGeographicSelect: (geographic: GeographicType, custom?: string) => void;
  onBack: () => void;
}

export const GeographicStep = ({ selectedGeographic, geographicCustom, onGeographicSelect, onBack }: GeographicStepProps) => {
  const [customValue, setCustomValue] = useState(geographicCustom || "");
  const [showCustomInput, setShowCustomInput] = useState(selectedGeographic === "custom");

  const options = [
    {
      id: "seattle",
      title: "Seattle Metro / Pacific Northwest",
      description: "Local and regional Pacific Northwest focus",
      icon: "🏔️",
      gradient: "gradient-social-1",
    },
    {
      id: "national",
      title: "National (United States)",
      description: "Serving clients across the United States",
      icon: "🇺🇸",
      gradient: "gradient-social-2",
    },
    {
      id: "international",
      title: "International",
      description: "Global reach and international clients",
      icon: "🌍",
      gradient: "gradient-social-3",
    },
    {
      id: "online",
      title: "Primarily Online / Virtual",
      description: "Digital-first with virtual service delivery",
      icon: "💻",
      gradient: "gradient-social-4",
    },
    {
      id: "custom",
      title: "Custom",
      description: "Specify your unique service area",
      icon: "📍",
      gradient: "gradient-social-1",
    },
  ];

  const handleSelect = (value: string) => {
    if (value === "custom") {
      setShowCustomInput(true);
      return;
    }
    onGeographicSelect(value as GeographicType);
  };

  const handleCustomSubmit = () => {
    if (customValue.trim()) {
      onGeographicSelect("custom", customValue.trim());
    }
  };

  if (showCustomInput) {
    return (
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
            Tell us about your service area
          </h2>
          <p className="text-xl text-corporate-gray max-w-2xl mx-auto">
            Describe where most of your clients are located.
          </p>
        </div>

        <div className="max-w-lg mx-auto mb-8">
          <Input
            type="text"
            placeholder="e.g., California Bay Area, Midwest United States, etc."
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            className="text-lg p-4 h-14 rounded-xl border-2 border-corporate-light focus:border-social-purple"
          />
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowCustomInput(false)}
            className="border-corporate-gray text-corporate-gray hover:bg-corporate-light"
          >
            ← Back to Options
          </Button>
          <Button
            type="button"
            onClick={handleCustomSubmit}
            disabled={!customValue.trim()}
            className="gradient-social-1 text-white font-bold px-8"
          >
            Continue →
          </Button>
        </div>
      </div>
    );
  }

  return (
    <CardSelection
      title="Where are most of your clients located?"
      subtitle="Understanding your market helps us tailor our approach and recommendations."
      options={options}
      selectedValue={selectedGeographic}
      onSelect={handleSelect}
      onBack={onBack}
      showBack={true}
    />
  );
};
