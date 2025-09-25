
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
      title: "Business Video Assets",
      description: "Strategic video systems that replace repetitive operations and save time.",
      gradient: "gradient-social-2", 
      textGradient: "text-gradient-2"
    },
    {
      icon: Film,
      title: "Other Video Bundles",
      description: "Specialized video solutions for events, recruitment, and music production.",
      gradient: "gradient-social-3",
      textGradient: "text-gradient-3"
    },
    {
      icon: Megaphone,
      title: "Coaching & Support",
      description: "DIY coaching programs and hands-on guidance for video confidence.",
      gradient: "gradient-social-4",
      textGradient: "text-gradient-1"
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-24 lg:py-32 bg-white relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block px-6 py-3 bg-pal-green/10 border border-pal-green/20 rounded-full text-pal-green font-semibold text-sm mb-6">
            💼 Service Categories
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black mb-6 text-corporate-dark tracking-tight leading-tight px-2">
            Video Production Services for <span className="bg-gradient-to-r from-pal-purple to-pal-blue bg-clip-text text-transparent">Every Business Need</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-corporate-gray max-w-4xl mx-auto font-medium leading-relaxed px-2">
            Professional video production company offering production video services that save time, increase efficiency, and drive results for your business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const palColors = ['pal-orange', 'pal-purple', 'pal-green', 'pal-blue'];
            const palColor = palColors[index % palColors.length];
            
            return (
              <div 
                key={index}
                className="group p-8 sm:p-10 bg-white rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-gray-200 transition-all duration-500 hover:scale-[1.02] animate-on-scroll opacity-0 transform translate-y-10"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 sm:w-18 sm:h-18 bg-${palColor}/10 border border-${palColor}/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent size={32} className={`text-${palColor} sm:w-9 sm:h-9`} />
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold mb-4 text-corporate-dark leading-tight">
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
