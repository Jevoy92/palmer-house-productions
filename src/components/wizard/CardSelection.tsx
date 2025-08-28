
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

      <div className="max-w-3xl mx-auto mb-8">
        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className={`w-full p-6 bg-video-white rounded-xl border-2 transition-all duration-200 text-left hover:border-corporate-dark ${
                selectedValue === option.id 
                  ? 'border-corporate-dark bg-corporate-light' 
                  : 'border-corporate-light hover:bg-corporate-light/30'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="text-2xl mt-1 flex-shrink-0">
                  {option.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-corporate-dark mb-2">
                    {option.title}
                  </h3>
                  <p className="text-corporate-gray text-sm leading-relaxed">
                    {option.description}
                  </p>
                </div>
                <div className="flex-shrink-0 mt-2">
                  <div className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                    selectedValue === option.id 
                      ? 'bg-corporate-dark border-corporate-dark' 
                      : 'border-corporate-gray'
                  }`}>
                    {selectedValue === option.id && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
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
