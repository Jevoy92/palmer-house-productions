
interface ContactHeaderProps {
  onQuickRecommendation: () => void;
  currentStep: number;
}

export const ContactHeader = ({ onQuickRecommendation, currentStep }: ContactHeaderProps) => {
  return (
    <div className="text-center mb-16">
      <div className="inline-block bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
        Palmer House Wizard
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
        The Client Expedition
      </h1>
      <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
        Let us guide you through an immersive journey to help you understand your needs and find the right solution with clarity and momentum.
      </p>
    </div>
  );
};
