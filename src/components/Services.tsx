
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
    <section id="services" className="py-[clamp(4rem,12vw,8rem)] relative z-10">
      <div className="max-w-7xl mx-auto px-[clamp(1rem,4vw,2rem)]">
        {/* White Card Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-[clamp(2rem,8vw,4rem)] video-shadow-xl">
          <div className="text-center mb-[clamp(3rem,10vw,4rem)]">
            <div className="inline-block px-6 py-3 bg-pal-orange text-white font-bold text-[clamp(1rem,2.5vw,1.125rem)] mb-[clamp(2rem,5vw,2rem)] rounded-full video-shadow">
              💼 Service Categories
            </div>
            <h2 className="text-[clamp(1.5rem,6vw,3.5rem)] font-display font-black mb-6 text-corporate-dark tracking-tight leading-tight">
              Video Production Services for <span className="text-pal-purple">Every Business Need</span>
            </h2>
            <p className="text-[clamp(1rem,3vw,1.25rem)] text-corporate-gray max-w-4xl mx-auto font-medium leading-relaxed">
              Professional video production company offering production video services that save time, increase efficiency, and drive results for your business.
            </p>
          </div>
          
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[clamp(1.5rem,5vw,2rem)]">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const palColors = ['bg-pal-purple', 'bg-pal-orange', 'bg-pal-blue', 'bg-pal-green'];
              const palTextColors = ['text-pal-purple', 'text-pal-orange', 'text-pal-blue', 'text-pal-green'];
              
              return (
                <div 
                  key={index}
                  className="group p-[clamp(2rem,6vw,2rem)] bg-white rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100"
                >
                  <div className={`w-[clamp(4rem,10vw,4rem)] h-[clamp(4rem,10vw,4rem)] ${palColors[index]} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <h3 className={`text-[clamp(1.25rem,4vw,1.5rem)] font-display font-bold mb-4 ${palTextColors[index]} leading-tight`}>
                    {service.title}
                  </h3>
                  <p className="text-corporate-gray leading-relaxed text-[clamp(1rem,2.5vw,1.125rem)] font-medium">
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
