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
    <section className="w-full bg-video-white">
      <div className="section-padding">
        <div className="container mx-auto container-padding">
          {/* Process Header */}
          <div className="mb-12 lg:mb-20">
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium tracking-widest text-muted-foreground">0—1</span>
            </div>
            <h2 className="text-8xl md:text-9xl font-black tracking-tighter mb-6 text-charcoal">
              Process
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              We don't just make videos — we build a reusable system that serves your business across every channel.
            </p>
          </div>
        </div>
      </div>

      {/* Full-Width Accordion Container */}
      <div className="w-full">
        {steps.map((step, index) => (
          <Collapsible 
            key={index}
            open={openSteps[index] || false}
            onOpenChange={() => toggleStep(index)}
            className={`border-b border-gray-200 ${index === steps.length - 1 ? 'border-b-0' : ''}`}
          >
            <CollapsibleTrigger className="w-full bg-white hover:bg-gray-50 transition-all duration-300 relative overflow-hidden">
              <div className="container mx-auto container-padding">
                <div className="flex items-center justify-between py-6 lg:py-8 relative">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-500">{step.number}</span>
                    <h3 className="text-4xl md:text-5xl font-bold text-charcoal text-left">{step.title}</h3>
                  </div>
                </div>
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="bg-white transition-all duration-500 ease-in-out w-full relative overflow-hidden">
              {/* Sliding Number Banner */}
              <div className={`absolute top-0 right-0 h-full w-32 md:w-40 lg:w-48 flex items-center justify-center z-20 ${step.bgColor} ${
                openSteps[index] ? 'animate-slide-in-from-right' : 'animate-slide-out-to-right'
              }`}>
                <span className="font-black text-white text-6xl md:text-7xl lg:text-8xl opacity-90">
                  {step.number}
                </span>
              </div>
              
              <div className="container mx-auto container-padding relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 py-8 lg:py-12 pr-16 md:pr-20 lg:pr-24">
                  {step.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="space-y-3">
                      <h4 className="text-lg font-bold text-charcoal">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </section>
  );
};