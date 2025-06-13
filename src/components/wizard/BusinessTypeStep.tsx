
import { CardSelection } from "./CardSelection";
import { BusinessType } from "./types";

interface BusinessTypeStepProps {
  selectedType?: BusinessType;
  onTypeSelect: (type: BusinessType) => void;
  onBack: () => void;
}

export const BusinessTypeStep = ({ selectedType, onTypeSelect, onBack }: BusinessTypeStepProps) => {
  const options = [
    {
      id: "service",
      title: "Service-Based Business",
      description: "Providing expertise and solutions to clients",
      icon: "🤝",
      gradient: "gradient-social-1",
    },
    {
      id: "product",
      title: "Product-Based Business",
      description: "Creating and selling physical or digital products",
      icon: "📦",
      gradient: "gradient-social-2",
    },
    {
      id: "saas",
      title: "SaaS / Tech",
      description: "Software solutions and technology platforms",
      icon: "💻",
      gradient: "gradient-social-3",
    },
    {
      id: "coaching",
      title: "Coaching / Consulting",
      description: "Personal development and business guidance",
      icon: "🎯",
      gradient: "gradient-social-4",
    },
    {
      id: "professional",
      title: "Professional Services",
      description: "Law, Finance, Healthcare, and specialized services",
      icon: "⚖️",
      gradient: "gradient-social-1",
    },
    {
      id: "media",
      title: "Media / Education",
      description: "Content creation, publishing, and educational services",
      icon: "📚",
      gradient: "gradient-social-2",
    },
    {
      id: "nonprofit",
      title: "Nonprofit / Advocacy",
      description: "Mission-driven organizations and causes",
      icon: "❤️",
      gradient: "gradient-social-3",
    },
  ];

  return (
    <CardSelection
      title="What category does your business primarily serve?"
      subtitle="Understanding your industry helps us tailor our approach to your specific needs."
      options={options}
      selectedValue={selectedType}
      onSelect={(value) => onTypeSelect(value as BusinessType)}
      onBack={onBack}
      showBack={true}
    />
  );
};
