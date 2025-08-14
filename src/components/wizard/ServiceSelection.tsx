
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
      id: "coaching",
      title: "Group Coaching",
      description: "6-week Camera-Ready Brand program ($2,000)",
      icon: "👥",
      gradient: "gradient-social-3",
    },
    {
      id: "monthly",
      title: "Monthly Content System",
      description: "The Social Authority Kit ($3,000/month)",
      icon: "🔄",
      gradient: "gradient-social-4",
    },
    {
      id: "bundle",
      title: "One-Time Bundles",
      description: "Problem-solving video packages ($500-$6,500)",
      icon: "🛠️",
      gradient: "gradient-social-1",
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
