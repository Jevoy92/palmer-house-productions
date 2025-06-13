
import { Button } from "@/components/ui/button";

interface CardOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient?: string;
}

interface CardSelectionProps {
  title: string;
  subtitle: string;
  options: CardOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  onBack?: () => void;
  showBack?: boolean;
}

export const CardSelection = ({ 
  title, 
  subtitle, 
  options, 
  selectedValue, 
  onSelect, 
  onBack, 
  showBack = false 
}: CardSelectionProps) => {
  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
          {title}
        </h2>
        <p className="text-xl text-corporate-gray max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`group p-6 bg-video-white rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-105 text-left ${
              selectedValue === option.id ? 'ring-2 ring-social-purple' : ''
            }`}
          >
            <div className={`w-16 h-16 ${option.gradient || 'gradient-social-1'} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {option.icon}
            </div>
            <h3 className="text-xl font-display font-black text-corporate-dark mb-3 group-hover:text-gradient-1 transition-all duration-300">
              {option.title}
            </h3>
            <p className="text-corporate-gray text-sm leading-relaxed">
              {option.description}
            </p>
          </button>
        ))}
      </div>

      {showBack && onBack && (
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="border-corporate-gray text-corporate-gray hover:bg-corporate-light"
          >
            ← Back
          </Button>
        </div>
      )}
    </div>
  );
};
