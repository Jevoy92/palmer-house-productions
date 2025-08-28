
import { CardSelection } from "./CardSelection";
import { BusinessProfileType } from "./types";

interface BusinessProfileStepProps {
  selectedProfile?: BusinessProfileType;
  onProfileSelect: (profile: BusinessProfileType) => void;
}

export const BusinessProfileStep = ({ selectedProfile, onProfileSelect }: BusinessProfileStepProps) => {
  const options = [
    {
      id: "solo",
      title: "Solo Founder / Small Team",
      description: "1-3 people building something meaningful",
      icon: "👤",
      bgClass: "bg-social-purple",
    },
    {
      id: "growing",
      title: "Growing Business",
      description: "4-15 people scaling operations",
      icon: "📈",
      bgClass: "bg-social-orange",
    },
    {
      id: "established",
      title: "Established Business",
      description: "15+ people with proven market fit",
      icon: "🏢",
      bgClass: "bg-social-cyan",
    },
    {
      id: "agency",
      title: "Agency / Creative Firm",
      description: "Serving clients with outsourced needs",
      icon: "🎨",
      bgClass: "bg-social-pink",
    },
    {
      id: "enterprise",
      title: "Enterprise / Multi-Brand",
      description: "Large organization with complex needs",
      icon: "🏭",
      bgClass: "bg-social-blue",
    },
    {
      id: "nonprofit",
      title: "Nonprofit / Special Project",
      description: "Mission-driven organization or unique initiative",
      icon: "🌟",
      bgClass: "bg-social-green",
    },
  ];

  return (
    <CardSelection
      title="Which best describes your business stage today?"
      subtitle="Help us understand your current situation so we can recommend the right approach."
      options={options}
      selectedValue={selectedProfile}
      onSelect={(value) => onProfileSelect(value as BusinessProfileType)}
    />
  );
};
