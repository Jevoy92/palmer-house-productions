
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  gradient: string;
  features?: string[];
  recommended?: boolean;
  selected?: boolean;
  onClick: (id: string) => void;
}

export const ServiceCard = ({
  id,
  title,
  description,
  price,
  icon,
  gradient,
  features = [],
  recommended = false,
  selected = false,
  onClick
}: ServiceCardProps) => {
  return (
    <Card 
      className={`relative p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 ${
        selected 
          ? 'border-social-purple bg-social-purple/5' 
          : 'border-corporate-light hover:border-social-purple/50'
      }`}
      onClick={() => onClick(id)}
    >
      {recommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="px-4 py-1 gradient-social-2 text-white text-sm font-bold rounded-full">
            🌟 Recommended
          </div>
        </div>
      )}
      
      <CardContent className="p-0">
        <div className="text-center mb-4">
          <div className={`w-16 h-16 ${gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <h3 className="text-2xl font-display font-black text-corporate-dark mb-2">
            {title}
          </h3>
          <div className={`inline-block px-4 py-2 ${gradient} text-white rounded-xl font-bold mb-3`}>
            {price}
          </div>
          <p className="text-corporate-gray text-sm leading-relaxed">{description}</p>
        </div>
        
        {features.length > 0 && (
          <ul className="space-y-2">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <div className={`w-2 h-2 ${gradient} rounded-full mt-2 flex-shrink-0`}></div>
                <span className="text-corporate-gray">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
