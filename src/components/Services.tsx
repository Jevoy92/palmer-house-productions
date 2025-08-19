
import { Video, Film, Users, Megaphone } from 'lucide-react';

export const Services = () => {
  const services = [
    {
      icon: Video,
      title: "Content Systems",
      description: "30 Reels, FAQs, SOPs, Evergreen YouTube content that works while you sleep.",
      gradient: "gradient-cinematic-primary"
    },
    {
      icon: Film,
      title: "Content Strategy", 
      description: "Script Bundle, Coaching, Video Strategy Blueprint for consistent growth.",
      gradient: "gradient-cinematic-secondary"
    },
    {
      icon: Users,
      title: "Brand Identity",
      description: "Founder films, Brand story, Customer testimonials that build trust.",
      gradient: "gradient-cinematic-accent"
    },
    {
      icon: Megaphone,
      title: "Launch & Growth Systems",
      description: "7-Day Launch, Visibility Engine, Broadcast spots that drive results.",
      gradient: "gradient-cinematic-primary"
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-24 lg:py-32 bg-cinematic-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block px-4 py-2.5 glass-card text-cinematic-glow font-semibold text-sm mb-6 animate-fade-blur-in">
            💼 Service Categories
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-black mb-6 text-video-white tracking-tight leading-tight px-2 animate-fade-blur-in" style={{animationDelay: '0.1s'}}>
            Our services help founders grow smarter,{' '}
            <span className="bg-gradient-to-r from-cinematic-violet to-cinematic-indigo bg-clip-text text-transparent">
              move faster, and build with clarity
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-cinematic-glow max-w-4xl mx-auto font-medium leading-relaxed px-2 animate-fade-blur-in" style={{animationDelay: '0.2s'}}>
            Strategic video production focused on business systems that reduce repetitive work and scale your operations efficiently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="group glass-card p-6 sm:p-8 hover:scale-[1.02] transition-all duration-300 btn-cinematic animate-fade-blur-in"
                style={{animationDelay: `${0.3 + index * 0.1}s`}}
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 ${service.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent size={28} className="text-video-white sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold mb-4 text-video-white leading-tight">
                  {service.title}
                </h3>
                <p className="text-cinematic-glow leading-relaxed text-base sm:text-lg font-medium">
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
