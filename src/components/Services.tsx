
import { Video, Film, Users, Megaphone } from 'lucide-react';

export const Services = () => {
  const services = [
    {
      icon: Video,
      title: "Trailhead Package",
      description: "For solo adventurers and early-stage businesses ready to explore the power of video. Up to 4 minutes of premium content monthly with 1 dedicated shoot day.",
      price: "$1,500/month",
      gradient: "gradient-social-1",
      textGradient: "text-gradient-1"
    },
    {
      icon: Film,
      title: "Basecamp Package",
      description: "For growing teams ready to establish a stronger presence across multiple platforms. 10 minutes of content with 2 shoot days monthly.",
      price: "$3,500/month",
      gradient: "gradient-social-2", 
      textGradient: "text-gradient-2"
    },
    {
      icon: Users,
      title: "Summit Package",
      description: "For regional brands and agencies pushing for authority, consistency, and scale. 25 minutes of content with flexible shoot schedule.",
      price: "$7,500/month",
      gradient: "gradient-social-3",
      textGradient: "text-gradient-3"
    },
    {
      icon: Megaphone,
      title: "Monthly Hosting Package",
      description: "For large enterprises and organizations who demand premium content, data, and agility—without compromise. 75 minutes of cinematic content.",
      price: "$20,000/month",
      gradient: "gradient-social-4",
      textGradient: "text-gradient-1"
    }
  ];

  return (
    <section id="services" className="py-32 bg-corporate-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="inline-block px-6 py-3 gradient-social-3 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            🧭 Our Services
          </div>
          <h2 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
            Services We <span className="text-gradient-1">Offer</span>
          </h2>
          <p className="text-2xl text-corporate-gray max-w-4xl mx-auto font-medium">
            From early-stage businesses to enterprise organizations - we create handcrafted, high-impact video experiences designed to solve real business problems.
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
                <div className="mb-4">
                  <span className="text-2xl font-bold text-corporate-dark">{service.price}</span>
                </div>
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
