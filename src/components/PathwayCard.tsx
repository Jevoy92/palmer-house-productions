
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface PathwayCardProps {
  icon: string;
  word: string;
  gradient: string;
  description: string;
  benefits: string[];
  onStartJourney: () => void;
}

export const PathwayCard = ({ icon, word, gradient, description, benefits, onStartJourney }: PathwayCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <button className={`group relative p-4 bg-video-white rounded-2xl hover:bg-transparent transition-all duration-500 video-shadow hover:video-shadow-lg cursor-pointer overflow-hidden transform hover:scale-105 active:scale-95 w-full`}>
          <div className={`absolute inset-0 ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>
          
          <div className="relative z-10 text-center">
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-500">
              {icon}
            </div>
            <h4 className="text-sm font-display font-black text-corporate-dark group-hover:text-white transition-colors duration-500 leading-tight mb-2">
              {word}
            </h4>
            <ChevronDown className={`w-4 h-4 mx-auto text-corporate-gray group-hover:text-white transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
          
          <div className="absolute -top-1 -right-1 w-3 h-3 gradient-social-3 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 gradient-social-4 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
        </button>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="mt-4">
        <div className="p-6 bg-video-white rounded-2xl video-shadow border-l-4 border-l-transparent" style={{borderLeftColor: `var(--social-purple)`}}>
          <div className="mb-4">
            <div className={`inline-flex items-center gap-2 px-3 py-1 ${gradient} rounded-full text-white text-sm font-bold mb-3`}>
              {icon} {word} Path
            </div>
            <p className="text-corporate-gray leading-relaxed mb-4">{description}</p>
          </div>
          
          <div className="mb-6">
            <h5 className="font-display font-black text-corporate-dark mb-3">Perfect if you're looking for:</h5>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className={`w-2 h-2 ${gradient} rounded-full mt-2 flex-shrink-0`}></div>
                  <span className="text-corporate-gray text-sm leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <button 
            onClick={onStartJourney}
            className={`w-full py-3 px-6 ${gradient} text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 text-sm`}
          >
            Start This Journey →
          </button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
