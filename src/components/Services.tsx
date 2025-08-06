
import { Video, Film, Users, Megaphone } from 'lucide-react';

export const Services = () => {
  const services = [
    {
      icon: Video,
      title: "DIY Resources",
      description: "Templates, guides, and training to create professional videos independently.",
      gradient: "gradient-social-1",
      textGradient: "text-gradient-1"
    },
    {
      icon: Users,
      title: "Coaching Programs",
      description: "Group coaching to build video skills and on-camera confidence.",
      gradient: "gradient-social-2", 
      textGradient: "text-gradient-2"
    },
    {
      icon: Film,
      title: "Content Partnership",
      description: "Monthly collaboration to produce consistent, high-quality video content.",
      gradient: "gradient-social-3",
      textGradient: "text-gradient-3"
    },
    {
      icon: Megaphone,
      title: "Full-Service Production",
      description: "Complete video solutions handled from concept to delivery.",
      gradient: "gradient-social-4",
      textGradient: "text-gradient-1"
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-24 lg:py-32 bg-corporate-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block px-4 py-2.5 gradient-social-3 rounded-full text-white font-semibold text-sm mb-6 video-shadow">
            💼 Service Categories
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black mb-6 text-corporate-dark tracking-tight leading-tight px-2">
            Video Solutions for <span className="text-gradient-1">Every Business Need</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-corporate-gray max-w-4xl mx-auto font-medium leading-relaxed px-2">
            Professional video content systems that save time, increase efficiency, and drive results for your business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="group p-6 sm:p-8 bg-video-white rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02] touch-manipulation"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent size={28} className="text-white sm:w-8 sm:h-8" />
                </div>
                <h3 className={`text-xl sm:text-2xl font-display font-bold mb-4 ${service.textGradient} leading-tight`}>
                  {service.title}
                </h3>
                <p className="text-corporate-gray leading-relaxed text-base sm:text-lg font-medium">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
