
import { Video, Film, Users, Megaphone } from 'lucide-react';

export const Services = () => {
  const services = [
    {
      icon: Video,
      title: "Viral Short-Form",
      description: "TikTok, Reels, Shorts that stop the scroll and drive action.",
      gradient: "gradient-social-1",
      textGradient: "text-gradient-1"
    },
    {
      icon: Film,
      title: "Corporate Storytelling",
      description: "Professional brand videos that build trust and convert viewers.",
      gradient: "gradient-social-2", 
      textGradient: "text-gradient-2"
    },
    {
      icon: Users,
      title: "Social Strategy",
      description: "Data-driven content planning that maximizes reach and engagement.",
      gradient: "gradient-social-3",
      textGradient: "text-gradient-3"
    },
    {
      icon: Megaphone,
      title: "Campaign Content",
      description: "Multi-platform video campaigns that scale your brand's impact.",
      gradient: "gradient-social-4",
      textGradient: "text-gradient-1"
    }
  ];

  return (
    <section id="services" className="py-32 bg-corporate-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="inline-block px-6 py-3 gradient-social-3 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            🎯 Our Services
          </div>
          <h2 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
            Content That <span className="text-gradient-1">Converts</span>
          </h2>
          <p className="text-2xl text-corporate-gray max-w-4xl mx-auto font-medium">
            From viral moments to corporate campaigns - we create video content that drives real business results.
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
        
        {/* CTA Section */}
        <div className="text-center p-12 gradient-social-5 rounded-3xl video-shadow-lg">
          <h3 className="text-4xl font-black text-white mb-6">Ready to Go Viral?</h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's create content that doesn't just get views - it gets results.
          </p>
          <button className="px-10 py-5 bg-video-white text-corporate-dark font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow">
            Start Your Campaign 📈
          </button>
        </div>
      </div>
    </section>
  );
};
