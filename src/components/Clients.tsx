
import { useState } from "react";
import { ContactWizard } from "./ContactWizard";

export const Clients = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const clientTypes = [
    {
      title: "Growing Businesses",
      description: "Companies ready to scale with professional video content that drives results",
      icon: "📈",
      gradient: "gradient-social-1"
    },
    {
      title: "Professional Services", 
      description: "Consultants, agencies, and experts who need video to establish authority",
      icon: "💼",
      gradient: "gradient-social-2"
    },
    {
      title: "Personal Brands",
      description: "Coaches and thought leaders building trust through authentic video content",
      icon: "👤",
      gradient: "gradient-social-3"
    },
    {
      title: "Premium Brands",
      description: "High-end service providers requiring video quality that matches their standards",
      icon: "⭐",
      gradient: "gradient-social-4"
    },
    {
      title: "Technology Companies",
      description: "SaaS and tech businesses explaining complex products through clear video",
      icon: "🔧",
      gradient: "gradient-social-5"
    },
    {
      title: "Educational Organizations",
      description: "Training companies and educators creating engaging learning content",
      icon: "📚",
      gradient: "gradient-social-1"
    }
  ];

  const handleGetStarted = () => {
    setIsWizardOpen(true);
  };

  return (
    <section id="clients" className="py-32 bg-corporate-light relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 gradient-social-2 rounded-full opacity-10 float-animation"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 gradient-social-4 rounded-full opacity-10 float-animation" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 gradient-social-1 rounded-full opacity-15 float-animation" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 gradient-social-4 rounded-full text-white font-semibold text-sm mb-6 video-shadow mobile-touch-target">
            🤝 Our Clients
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black mb-6 text-corporate-dark tracking-tight">
            Who We <span className="text-gradient-2">Partner</span> With
          </h2>
          <p className="text-lg md:text-xl text-corporate-gray max-w-3xl mx-auto font-medium leading-relaxed">
            We work with businesses ready to leverage video content for growth. 
            <span className="text-gradient-1 font-semibold">Professional results</span> for companies that value <span className="text-gradient-3 font-semibold">quality and efficiency</span>.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {clientTypes.map((client, index) => (
            <div 
              key={index}
              className="group p-6 md:p-8 bg-video-white rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-105 mobile-touch-target"
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 ${client.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-xl md:text-2xl">{client.icon}</span>
              </div>
              <h3 className="text-lg md:text-xl font-display font-bold mb-4 text-corporate-dark">
                {client.title}
              </h3>
              <p className="text-corporate-gray leading-relaxed text-sm md:text-base font-medium">
                {client.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Business CTA Section */}
        <div className="text-center p-8 md:p-12 gradient-social-1 rounded-2xl video-shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 md:w-16 md:h-16 bg-white rounded-full"></div>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-6 leading-tight">
              Ready to Scale Your Business with Video?
            </h3>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto font-medium">
              If you're ready to invest in professional video content that drives results, 
              <span className="font-bold block mt-2">let's discuss your goals</span>.
            </p>
            <button 
              onClick={handleGetStarted}
              className="mobile-button bg-video-white text-corporate-dark font-bold rounded-xl hover:scale-105 transition-all duration-300 video-shadow mobile-touch-target"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>

      <ContactWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} />
    </section>
  );
};
