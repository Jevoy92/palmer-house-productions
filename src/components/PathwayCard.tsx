
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ServiceWizard } from './ServiceWizard';

interface PathwayCardProps {
  id: string;
  icon: string;
  word: string;
  gradient: string;
  description: string;
  features: string[];
  onClick?: (pathName: string) => void;
}

export const PathwayCard = ({ 
  id, 
  icon, 
  word, 
  gradient, 
  description, 
  features, 
  onClick 
}: PathwayCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const handleCardClick = () => {
    setIsOpen(!isOpen);
  };

  const handleStartJourney = () => {
    if (onClick) {
      onClick(word);
    }
    setIsWizardOpen(true);
  };

  return (
    <>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button 
            onClick={handleCardClick}
            className={`group relative p-4 bg-video-white rounded-2xl hover:bg-transparent transition-all duration-500 video-shadow hover:video-shadow-lg cursor-pointer overflow-hidden transform hover:scale-105 active:scale-95 w-full`}
          >
            <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>
            
            <div className="relative z-10 text-center">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-500">
                {icon}
              </div>
              <h4 className="text-sm font-display font-black text-corporate-dark group-hover:text-white transition-colors duration-500 leading-tight mb-2">
                {word}
              </h4>
              <div className="flex items-center justify-center">
                {isOpen ? (
                  <ChevronUp size={16} className="text-corporate-gray group-hover:text-white transition-colors duration-500" />
                ) : (
                  <ChevronDown size={16} className="text-corporate-gray group-hover:text-white transition-colors duration-500" />
                )}
              </div>
            </div>
            
            <div className="absolute -top-1 -right-1 w-3 h-3 gradient-social-3 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 gradient-social-4 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
          </button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-4">
          <div className="bg-video-white rounded-2xl p-6 video-shadow border border-corporate-light">
            <p className="text-corporate-gray mb-4 leading-relaxed">
              {description}
            </p>
            <div className="mb-4">
              <h5 className="font-bold text-corporate-dark mb-2">Perfect for:</h5>
              <ul className="space-y-1">
                {features.map((feature, index) => (
                  <li key={index} className="text-sm text-corporate-gray flex items-start">
                    <span className="mr-2 text-social-purple">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={handleStartJourney}
              className={`w-full px-6 py-3 ${gradient} text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 video-shadow`}
            >
              Start Your {word} Journey 🗺️
            </button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <ServiceWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} />
    </>
  );
};
