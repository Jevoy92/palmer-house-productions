import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, MessageCircle, Video, Target, CheckCircle, Clock } from "lucide-react";

export const CollapsibleDiscoverySteps = () => {
  const [defaultValue, setDefaultValue] = useState("step-1");

  const steps = [
    {
      id: "step-1",
      icon: Calendar,
      title: "Book Your Call",
      duration: "2 minutes",
      description: "Schedule a 30-minute discovery session at your convenience",
      details: [
        "Choose from available time slots that work for your schedule",
        "Receive calendar invite with video call link",
        "Get prep questions to maximize our time together",
        "No pressure, no sales pitch - just strategic conversation"
      ],
      gradient: "gradient-social-1"
    },
    {
      id: "step-2", 
      icon: MessageCircle,
      title: "Strategic Discussion",
      duration: "20 minutes",
      description: "We dive deep into your brand goals and video vision",
      details: [
        "Explore your current marketing challenges and gaps",
        "Define your target audience and their behavior patterns", 
        "Identify which video types will drive the most impact",
        "Map out content that aligns with your business objectives"
      ],
      gradient: "gradient-social-2"
    },
    {
      id: "step-3",
      icon: Target,
      title: "Custom Roadmap",
      duration: "10 minutes", 
      description: "Receive a tailored video strategy designed for your needs",
      details: [
        "Get specific package recommendations based on your goals",
        "Review production timeline and delivery expectations",
        "Understand pricing structure with no hidden costs",
        "Leave with clear next steps, whether you work with us or not"
      ],
      gradient: "gradient-social-3"
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Quick & Focused",
      description: "Just 30 minutes to explore if we're the right fit"
    },
    {
      icon: Target,
      title: "Zero Pressure",
      description: "No pushy sales tactics - genuine strategic advice"
    },
    {
      icon: CheckCircle,
      title: "Immediate Value",
      description: "Walk away with actionable insights regardless"
    }
  ];

  return (
    <section className="py-16 bg-video-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 gradient-social-2 rounded-full text-white font-bold text-sm mb-6">
            🗺️ Discovery Process
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-corporate-dark mb-6">
            What to Expect in Your <span className="text-gradient-2">Discovery Call</span>
          </h2>
          <p className="text-lg text-corporate-gray max-w-3xl mx-auto">
            A structured 30-minute conversation designed to map out your video strategy and determine the best path forward.
          </p>
        </div>

        {/* Process Steps - Accordion */}
        <div className="mb-12">
          <Accordion type="single" collapsible defaultValue={defaultValue} className="space-y-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <AccordionItem 
                  key={step.id} 
                  value={step.id} 
                  className="bg-white rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center w-full text-left">
                      <div className={`w-12 h-12 ${step.gradient} rounded-xl flex items-center justify-center mr-4`}>
                        <IconComponent size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-corporate-dark">
                            Step {index + 1}: {step.title}
                          </h3>
                          <span className="text-sm text-corporate-gray bg-muted px-3 py-1 rounded-full">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-corporate-gray text-sm">{step.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="ml-16">
                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start">
                            <CheckCircle size={16} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-corporate-gray">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="text-center p-6 bg-corporate-light/50 rounded-2xl">
                <div className="w-16 h-16 gradient-social-1 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-corporate-dark mb-2">{benefit.title}</h3>
                <p className="text-corporate-gray text-sm">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-social-purple/10 to-social-pink/10 p-8 rounded-3xl border border-social-purple/20">
          <h3 className="text-2xl font-display font-black text-corporate-dark mb-4">
            Ready to Map Out Your Video Strategy?
          </h3>
          <p className="text-corporate-gray mb-6 max-w-2xl mx-auto">
            Book your discovery call today and get clear on the video content that will drive real results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 gradient-social-2 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 video-shadow">
              Book Discovery Call
            </button>
            <button className="px-6 py-3 bg-white text-corporate-dark font-bold rounded-xl border-2 border-corporate-dark hover:scale-105 transition-all duration-300">
              View Packages First
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};