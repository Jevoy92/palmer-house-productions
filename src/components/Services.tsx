
import { Video, Film, Users, Megaphone } from 'lucide-react';

export const Services = () => {
  const services = [
    {
      icon: Video,
      title: "DIY Resources",
      description: "Digital downloads and self-paced learning to start your video journey at your own pace.",
      gradient: "gradient-social-1",
      textGradient: "text-gradient-1"
    },
    {
      icon: Users,
      title: "Hands-On Coaching",
      description: "Group programs and personal guidance to build your on-camera confidence and skills.",
      gradient: "gradient-social-2", 
      textGradient: "text-gradient-2"
    },
    {
      icon: Film,
      title: "Done-With-You Content",
      description: "Monthly content system collaboration where we work together to create consistent content.",
      gradient: "gradient-social-3",
      textGradient: "text-gradient-3"
    },
    {
      icon: Megaphone,
      title: "Done-For-You Solutions",
      description: "Complete one-time bundle services that solve specific video challenges for your business.",
      gradient: "gradient-social-4",
      textGradient: "text-gradient-1"
    }
  ];

  return (
    <section id="services" className="py-32 bg-corporate-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="inline-block px-6 py-3 gradient-social-3 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            🎯 Solution Categories
          </div>
          <h2 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
            Solutions for <span className="text-gradient-1">Every Stage</span>
          </h2>
          <p className="text-2xl text-corporate-gray max-w-4xl mx-auto font-medium">
            From DIY starters to full-service production - find the perfect solution for your business stage and goals.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="group p-10 bg-video-white rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-500 hover:scale-105"
              >
                <div className={`w-16 h-16 ${service.gradient} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent size={32} className="text-white" />
                </div>
                <h3 className={`text-3xl font-display font-black mb-6 ${service.textGradient}`}>
                  {service.title}
                </h3>
                <p className="text-corporate-gray leading-relaxed text-lg font-medium">
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
