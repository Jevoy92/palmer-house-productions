
import { CardSelection } from "./CardSelection";
import { ServiceType } from "./types";

interface ServiceSelectionProps {
  selectedService?: ServiceType;
  onServiceSelect: (service: ServiceType) => void;
  onBack?: () => void;
}

export const ServiceSelection = ({ selectedService, onServiceSelect, onBack }: ServiceSelectionProps) => {
  const options = [
    {
      id: "consultation",
      title: "General Consultation",
      description: "Strategic discussion about your video needs and goals",
      icon: "💬",
      gradient: "gradient-social-1",
    },
    {
      id: "base-glimpse",
      title: "Base Glimpse",
      description: "Quick video assessment and strategy recommendations ($350)",
      icon: "👁️",
      gradient: "gradient-social-2",
    },
    {
      id: "full-glimpse",
      title: "Full Glimpse",
      description: "Comprehensive video audit and detailed action plan ($750)",
      icon: "🔍",
      gradient: "gradient-social-3",
    },
    {
      id: "monthly",
      title: "Monthly Services",
      description: "Ongoing video production and strategy support",
      icon: "📅",
      gradient: "gradient-social-4",
    },
  ];

  return (
    <CardSelection
      title="What type of video service are you interested in?"
      subtitle="Choose the service that best matches your current needs and goals."
      options={options}
      selectedValue={selectedService}
      onSelect={(value) => onServiceSelect(value as ServiceType)}
      onBack={onBack}
      showBack={true}
    />
  );
};
