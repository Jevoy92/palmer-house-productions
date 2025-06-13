
import { CardSelection } from "./CardSelection";
import { ContentVolumeType } from "./types";

interface ContentVolumeStepProps {
  selectedVolume?: ContentVolumeType;
  onVolumeSelect: (volume: ContentVolumeType) => void;
  onBack: () => void;
}

export const ContentVolumeStep = ({ selectedVolume, onVolumeSelect, onBack }: ContentVolumeStepProps) => {
  const options = [
    {
      id: "1-2",
      title: "1-2 videos per month",
      description: "Perfect for testing the waters and building momentum",
      icon: "🌱",
      gradient: "gradient-social-1",
    },
    {
      id: "3-4",
      title: "3-4 videos per month",
      description: "Steady content flow for consistent engagement",
      icon: "📅",
      gradient: "gradient-social-2",
    },
    {
      id: "5-8",
      title: "5-8 videos per month",
      description: "High-impact content strategy for growth",
      icon: "⚡",
      gradient: "gradient-social-3",
    },
    {
      id: "8-plus",
      title: "8+ videos / High Frequency",
      description: "Maximum content velocity for market dominance",
      icon: "🚀",
      gradient: "gradient-social-4",
    },
  ];

  return (
    <CardSelection
      title="Roughly how much video do you want to produce on an ongoing basis?"
      subtitle="This helps us recommend the right service tier and resource allocation."
      options={options}
      selectedValue={selectedVolume}
      onSelect={(value) => onVolumeSelect(value as ContentVolumeType)}
      onBack={onBack}
      showBack={true}
    />
  );
};
