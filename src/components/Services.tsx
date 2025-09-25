
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
    <section id="services" className="py-16 sm:py-24 lg:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* White Card Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-block px-6 py-3 bg-pal-orange text-white font-bold text-lg mb-8 rounded-full video-shadow">
              💼 Service Categories
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black mb-6 text-corporate-dark tracking-tight leading-tight">
              Video Production Services for <span className="text-pal-purple">Every Business Need</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-corporate-gray max-w-4xl mx-auto font-medium leading-relaxed">
              Professional video production company offering production video services that save time, increase efficiency, and drive results for your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const palColors = ['bg-pal-purple', 'bg-pal-orange', 'bg-pal-blue', 'bg-pal-green'];
              const palTextColors = ['text-pal-purple', 'text-pal-orange', 'text-pal-blue', 'text-pal-green'];
              
              return (
                <div 
                  key={index}
                  className="group p-8 bg-white rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100"
                >
                  <div className={`w-16 h-16 ${palColors[index]} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-display font-bold mb-4 ${palTextColors[index]} leading-tight`}>
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
      </div>
    </section>
  );
};
