
import { Video, Film, Users, Megaphone } from 'lucide-react';

export const Services = () => {
  const services = [
    {
      icon: Video,
      title: "Social Video Production",
      description: "Short-form content designed for maximum engagement across all platforms."
    },
    {
      icon: Film,
      title: "Brand Storytelling",
      description: "Long-form narratives that capture your brand's authentic voice and vision."
    },
    {
      icon: Users,
      title: "Content Strategy",
      description: "Strategic planning and script development to amplify your message."
    },
    {
      icon: Megaphone,
      title: "Campaign Creative",
      description: "Targeted video content for launches, promotions, and brand initiatives."
    }
  ];

  return (
    <section id="services" className="py-32 bg-apple-gray">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-sf font-semibold mb-6 text-black tracking-tight">What We Do</h2>
          <p className="text-xl text-apple-gray-4 max-w-3xl mx-auto">
            Comprehensive video production services designed to elevate your brand.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="p-8 bg-white rounded-2xl apple-shadow hover:apple-shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-apple-blue rounded-xl flex items-center justify-center mb-6">
                  <IconComponent size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-sf font-semibold text-black mb-4">
                  {service.title}
                </h3>
                <p className="text-apple-gray-4 leading-relaxed text-lg">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-apple-blue text-white font-medium rounded-xl hover:bg-apple-blue/90 transition-all duration-200 apple-shadow">
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
};
