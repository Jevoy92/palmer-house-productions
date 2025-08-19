import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const ProcessOverview = () => {
  const [openStep, setOpenStep] = useState<number | null>(null);
  
  const steps = [
    {
      number: "01",
      title: "Discovery",
      bgColor: "bg-process-1",
      items: [
        {
          title: "Stakeholder interviews",
          description: "We kick things off by talking with key stakeholders to understand the business, the product, and what success looks like."
        },
        {
          title: "User & market research", 
          description: "From audience behaviors to competitive landscapes, we dig deep to uncover insights that will inform the design and strategy."
        },
        {
          title: "Defining the challenge",
          description: "We define a clear problem statement, map out user journeys, and outline key objectives. This becomes our north star."
        }
      ]
    },
    {
      number: "02",
      title: "Concept", 
      bgColor: "bg-process-2",
      items: [
        {
          title: "Ideation & brainstorming",
          description: "This is where creativity takes center stage. We explore multiple directions through sketches and collaborative sessions."
        },
        {
          title: "Information architecture",
          description: "We organize content and functionality in a way that makes sense for users, ensuring intuitive navigation and discovery."
        },
        {
          title: "Design systems & direction",
          description: "We establish the visual language that will guide the project, including color palettes, typography, and components."
        }
      ]
    },
    {
      number: "03", 
      title: "Execution",
      bgColor: "bg-process-3",
      items: [
        {
          title: "UI design & prototyping",
          description: "We bring concepts to life with high-fidelity designs and interactive prototypes for stakeholders to experience."
        },
        {
          title: "User testing & iteration",
          description: "We validate our designs with real users, gathering feedback and making necessary adjustments to meet user needs."
        },
        {
          title: "Development handoff", 
          description: "We prepare all assets and specifications for the development team, ensuring a smooth transition from design to code."
        }
      ]
    },
    {
      number: "04",
      title: "Launch",
      bgColor: "bg-process-4", 
      items: [
        {
          title: "Quality assurance",
          description: "We conduct thorough testing across devices and browsers to ensure everything works as intended and is optimized."
        },
        {
          title: "Deployment & go-live",
          description: "We coordinate with stakeholders for a smooth launch, addressing any last-minute issues and ensuring systems are ready."
        },
        {
          title: "Post-launch support",
          description: "We monitor performance, gather user feedback, and make adjustments after launch for future improvements."
        }
      ]
    }
  ];

  const toggleStep = (stepNumber: number) => {
    setOpenStep(openStep === stepNumber ? null : stepNumber);
  };

  return (
    <section className="bg-video-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
      {/* Process Header */}
      <div className="mb-16">
        <div className="flex items-center mb-4">
          <span className="text-sm font-medium tracking-widest text-muted-foreground">0—1</span>
        </div>
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 text-charcoal">
          Process
        </h2>
        <p className="text-lg md:text-xl max-w-2xl text-muted-foreground">
          Let's dive into the process. From first idea to final launch, every step is clear and intentional.
        </p>
      </div>

      {/* Accordion Container */}
      <div className="w-full rounded-b-2xl overflow-hidden">
        {steps.map((step, index) => (
          <Collapsible 
            key={index}
            open={openStep === index}
            onOpenChange={() => toggleStep(index)}
            className={`border-b border-white/50 ${index === steps.length - 1 ? 'border-b-0' : ''}`}
          >
            <CollapsibleTrigger className={`w-full ${step.bgColor} transition-all duration-300 hover:opacity-90`}>
              <div className="flex items-center justify-between px-8 py-6 relative">
                <h3 className="text-3xl md:text-5xl font-bold z-10 text-charcoal">{step.title}</h3>
                <span className="text-6xl md:text-8xl font-black text-white/70 absolute right-8 top-1/2 -translate-y-1/2">
                  {step.number}
                </span>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className={`${step.bgColor} transition-all duration-500 ease-in-out`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                {step.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="space-y-3">
                    <h4 className="text-lg font-bold text-charcoal">{item.title}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
      </div>
    </section>
  );
};