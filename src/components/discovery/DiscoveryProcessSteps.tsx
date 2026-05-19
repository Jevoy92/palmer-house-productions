
import { Calendar, Users, MapPin, Flag } from "lucide-react";

export const DiscoveryProcessSteps = () => {
  const steps = [
    {
      number: "01",
      title: "Book a Call",
      description: "Schedule your 30-minute Discovery Call with our team",
      icon: Calendar,
      gradient: "gradient-social-1"
    },
    {
      number: "02",
      title: "Align Your Needs",
      description: "We'll dive deep into your business goals and video vision",
      icon: Users,
      gradient: "gradient-social-2"
    },
    {
      number: "03",
      title: "Get Matched to a Plan",
      description: "Receive a custom recommendation based on your requirements",
      icon: MapPin,
      gradient: "gradient-social-3"
    },
    {
      number: "04",
      title: "Begin the Journey",
      description: "Start creating cinematic content that grows your business",
      icon: Flag,
      gradient: "gradient-social-4"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-display font-black mb-8 text-corporate-dark">
            Our <span className="text-gradient-1">4-Step Process</span>
          </h2>
          <p className="text-2xl text-corporate-gray max-w-3xl mx-auto font-medium">
            From first contact to cinematic content in 4 simple steps
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full h-px bg-gradient-to-r from-social-purple to-social-pink opacity-30 z-0"></div>
              )}
              
              <div className="relative z-10 text-center">
                <div className={`w-20 h-20 ${step.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 video-shadow`}>
                  <step.icon color="white" size={32} />
                </div>
                
                <div className="text-5xl font-black text-corporate-dark mb-4 opacity-20">
                  {step.number}
                </div>
                
                <h3 className="text-2xl font-bold text-corporate-dark mb-4">
                  {step.title}
                </h3>
                
                <p className="text-corporate-gray leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
