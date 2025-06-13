
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  color: string;
}

interface ServiceSelectionProps {
  services: Service[];
  onServiceSelect: (serviceId: string) => void;
}

export const ServiceSelection = ({ services, onServiceSelect }: ServiceSelectionProps) => {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-display font-black text-corporate-dark mb-6">
        Choose Your <span className="text-gradient-1">Service</span>
      </h2>
      <p className="text-lg text-corporate-gray mb-12">
        What kind of journey are you looking for?
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onServiceSelect(service.id)}
            className="group p-8 bg-video-white border-2 border-corporate-light rounded-3xl hover:border-social-purple transition-all duration-300 text-left hover:scale-105"
          >
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-display font-black text-corporate-dark mb-2">
                {service.title}
              </h3>
              <p className="text-corporate-gray mb-4">{service.description}</p>
              <div className={`inline-block px-4 py-2 ${service.color} text-white rounded-xl font-bold`}>
                {service.price}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
