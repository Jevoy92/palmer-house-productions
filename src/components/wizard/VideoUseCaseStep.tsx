
import { CardSelection } from "./CardSelection";
import { VideoUseCaseType } from "./types";

interface VideoUseCaseStepProps {
  selectedUseCase?: VideoUseCaseType;
  onUseCaseSelect: (useCase: VideoUseCaseType) => void;
  onBack: () => void;
}

export const VideoUseCaseStep = ({ selectedUseCase, onUseCaseSelect, onBack }: VideoUseCaseStepProps) => {
  const options = [
    {
      id: "lead-generation",
      title: "Lead Generation & Brand Growth",
      description: "Attract new customers and build brand awareness",
      icon: "🚀",
      gradient: "gradient-social-1",
    },
    {
      id: "training",
      title: "Internal Training & Operations",
      description: "Educate team members and streamline processes",
      icon: "🎓",
      gradient: "gradient-social-2",
    },
    {
      id: "onboarding",
      title: "Client Onboarding & Experience",
      description: "Welcome new clients and improve their experience",
      icon: "👋",
      gradient: "gradient-social-3",
    },
    {
      id: "authority",
      title: "Authority / Thought Leadership",
      description: "Establish expertise and industry credibility",
      icon: "👑",
      gradient: "gradient-social-4",
    },
    {
      id: "education",
      title: "Customer Education & Support",
      description: "Help customers understand and use your offerings",
      icon: "💡",
      gradient: "gradient-social-1",
    },
    {
      id: "sales",
      title: "Sales Support & Conversion",
      description: "Close more deals and increase conversion rates",
      icon: "💰",
      gradient: "gradient-social-2",
    },
  ];

  return (
    <CardSelection
      title="Where will video have the biggest impact for you?"
      subtitle="Focus on the area where video content will drive the most meaningful results."
      options={options}
      selectedValue={selectedUseCase}
      onSelect={(value) => onUseCaseSelect(value as VideoUseCaseType)}
      onBack={onBack}
      showBack={true}
    />
  );
};
