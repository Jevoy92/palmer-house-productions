import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const ProcessOverview = () => {
  const [openSteps, setOpenSteps] = useState<{ [key: number]: boolean }>({});
  
  const steps = [
    {
      number: "01",
      title: "Map the System",
      bgColor: "bg-process-1",
      items: [
        {
          title: "Content Audit & Gap Analysis",
          description: "We identify what your business is missing — onboarding, FAQs, sales touchpoints, or social authority."
        },
        {
          title: "System Blueprint", 
          description: "We design a repeatable plan: what to film once, and how it multiplies into assets for every platform."
        },
        {
          title: "Success Metrics",
          description: "We define the ROI markers (time saved, sales supported, brand authority built)."
        }
      ]
    },
    {
      number: "02",
      title: "Capture the Core", 
      bgColor: "bg-process-2",
      items: [
        {
          title: "Shoot Once, Use Everywhere",
          description: "We record modular videos (anchors, FAQs, social snippets, training) designed for maximum reusability."
        },
        {
          title: "Flexible Formats",
          description: "Every session is planned so one shoot fuels months of distribution: reels, YouTube, web, internal library."
        },
        {
          title: "Guided Performance",
          description: "We provide coaching, teleprompter support, and prompts so you sound like your best self on camera."
        }
      ]
    },
    {
      number: "03", 
      title: "Build the Library",
      bgColor: "bg-process-3",
      items: [
        {
          title: "Content System Assembly",
          description: "We edit, organize, and format your footage into a scalable library that serves your business needs."
        },
        {
          title: "Multi-Channel Deployment",
          description: "From Instagram to onboarding portals, your content is prepped and optimized for every channel."
        },
        {
          title: "Ongoing Growth", 
          description: "We track usage, add new shoots, and expand your system as your business evolves and scales."
        }
      ]
    }
  ];

  const toggleStep = (stepNumber: number) => {
    setOpenSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
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
          We don't just make videos — we build a reusable system that serves your business across every channel.
        </p>
      </div>

      {/* Accordion Container */}
      <div className="w-full rounded-b-2xl overflow-hidden">
        {steps.map((step, index) => (
          <Collapsible 
            key={index}
            open={openSteps[index] || false}
            onOpenChange={() => toggleStep(index)}
            className={`border-b border-white/50 ${index === steps.length - 1 ? 'border-b-0' : ''}`}
          >
            <CollapsibleTrigger className="w-full bg-white transition-all duration-300 hover:opacity-90">
              <div className="flex items-center justify-between px-8 py-6 relative">
                <h3 className="text-3xl md:text-5xl font-bold z-10 text-charcoal">{step.title}</h3>
                <span className="text-6xl md:text-8xl font-black text-charcoal/20 absolute right-8 top-1/2 -translate-y-1/2">
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