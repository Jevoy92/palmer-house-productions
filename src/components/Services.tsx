import { Video, Film, Users, Megaphone } from 'lucide-react';

export const Services = () => {
  const services = [
    {
      icon: Video,
      title: "Viral Expeditions",
      description: "TikTok, Reels, Shorts that break new ground and blaze fresh trails to your audience.",
      gradient: "gradient-social-1",
      textGradient: "text-gradient-1"
    },
    {
      icon: Film,
      title: "Brand Adventures",
      description: "Corporate storytelling that ventures beyond the ordinary to capture authentic brand narratives.",
      gradient: "gradient-social-2", 
      textGradient: "text-gradient-2"
    },
    {
      icon: Users,
      title: "Pathfinding Strategy",
      description: "Chart uncharted creative territory with content planning that discovers new audience connections.",
      gradient: "gradient-social-3",
      textGradient: "text-gradient-3"
    },
    {
      icon: Megaphone,
      title: "Territory Expansion",
      description: "Multi-platform campaigns that explore new frontiers and expand your brand's reach.",
      gradient: "gradient-social-4",
      textGradient: "text-gradient-1"
    }
  ];

  const handleBeginAdventure = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-32 bg-corporate-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="inline-block px-6 py-3 gradient-social-3 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            🧭 Our Expeditions
          </div>
          <h2 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
            Journeys We <span className="text-gradient-1">Capture</span>
          </h2>
          <p className="text-2xl text-corporate-gray max-w-4xl mx-auto font-medium">
            From uncharted creative territories to bold brand adventures - we explore every path to find your unique story.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
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
        
        {/* Simplified info section without redundant CTA */}
        <div className="text-center p-12 gradient-social-5 rounded-3xl video-shadow-lg">
          <h3 className="text-4xl font-black text-white mb-6">Ready to Explore New Horizons?</h3>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Let's venture into uncharted creative territory and discover stories that resonate.
          </p>
        </div>
      </div>
    </section>
  );
};
