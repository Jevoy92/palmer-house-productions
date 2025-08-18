
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
      id: "diy",
      title: "DIY Downloads",
      description: "Instant access to guides, scripts, and courses ($19-$99)",
      icon: "📱",
      gradient: "gradient-social-2",
    },
    {
      id: "assets",
      title: "Business Video Assets",
      description: "Strategic video systems that replace repetitive operations",
      icon: "🎯",
      gradient: "gradient-social-2",
    },
    {
      id: "bundles",
      title: "Other Bundles",
      description: "Specialized video solutions for specific needs",
      icon: "🛠️",
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
