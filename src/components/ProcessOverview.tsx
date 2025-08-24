import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const ProcessOverview = () => {
  const [openSteps, setOpenSteps] = useState<{ [key: number]: boolean }>({});
  
  const steps = [
    {
      number: "01",
      title: "Map the System",
      bgColor: "bg-process-1",
      triggerBgColor: "bg-process-1-trigger",
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
      triggerBgColor: "bg-process-2-trigger",
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
      triggerBgColor: "bg-process-3-trigger",
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

      {/* Process Steps */}
      <div className="container mx-auto container-padding">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="w-full">
              {!openSteps[index] ? (
                // Collapsed State: Full-width clickable bar
                <button
                  onClick={() => toggleStep(index)}
                  className={`w-full ${step.triggerBgColor} transition-all duration-300 relative overflow-hidden border-b border-gray-200 ${index === steps.length - 1 ? 'border-b-0' : ''}`}
                >
                  <div className="flex items-center justify-between py-6 lg:py-8">
                    <h3 className="text-4xl md:text-5xl font-bold text-charcoal text-left">{step.title}</h3>
                    <span className="text-6xl md:text-7xl lg:text-8xl font-black text-white">{step.number}</span>
                  </div>
                </button>
              ) : (
                // Expanded State: Compact rectangle
                <div className={`max-w-4xl mx-auto ${step.bgColor} rounded-2xl p-8 lg:p-12 transition-all duration-500 ease-in-out`}>
                  {/* Header with title and number */}
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-3xl md:text-4xl font-bold text-white">{step.title}</h3>
                    <button
                      onClick={() => toggleStep(index)}
                      className="text-4xl md:text-5xl lg:text-6xl font-black text-white hover:text-white/80 transition-colors duration-200"
                    >
                      {step.number}
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {step.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="space-y-3">
                        <h4 className="text-lg font-bold text-white">{item.title}</h4>
                        <p className="text-white/90 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};