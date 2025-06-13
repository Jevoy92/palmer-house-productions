
import { ServiceType } from "./types";

interface ServiceSelectionProps {
  selectedService?: ServiceType;
  onServiceSelect: (service: ServiceType) => void;
}

export const ServiceSelection = ({ onServiceSelect }: ServiceSelectionProps) => {
  const services = [
    {
      id: "consultation" as ServiceType,
      icon: "📞",
      title: "General Consultation",
      description: "Strategic discussion about your brand's video needs",
      gradient: "gradient-social-1",
    },
    {
      id: "base-glimpse" as ServiceType,
      icon: "🎒",
      title: "Base Glimpse",
      description: "1-hour brand visualization session ($350)",
      gradient: "gradient-social-2",
    },
    {
      id: "full-glimpse" as ServiceType,
      icon: "🧭",
      title: "Full Glimpse",
      description: "2-hour comprehensive brand experience session ($750)",
      gradient: "gradient-social-3",
    },
    {
      id: "monthly" as ServiceType,
      icon: "🏔",
      title: "Monthly Services",
      description: "Ongoing video production and strategy partnership",
      gradient: "gradient-social-4",
    },
  ];

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
          What Can We <span className="text-gradient-1">Create</span> Together?
        </h2>
        <p className="text-xl text-corporate-gray max-w-2xl mx-auto">
          Choose the service that best fits your brand's journey.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => onServiceSelect(service.id)}
            className="group p-8 bg-video-white rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-105 text-left"
          >
            <div className={`w-16 h-16 ${service.gradient} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
              {service.icon}
            </div>
            <h3 className="text-2xl font-display font-black text-corporate-dark mb-4 group-hover:text-gradient-1 transition-all duration-300">
              {service.title}
            </h3>
            <p className="text-corporate-gray leading-relaxed">
              {service.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
