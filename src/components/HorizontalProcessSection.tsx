import { useEffect, useRef } from 'react';
import { createHorizontalScroll, cleanupScrollTrigger } from '@/lib/gsap';

export const HorizontalProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const processSteps = [
    {
      number: "01",
      title: "Map the System",
      subtitle: "Strategic Foundation",
      description: "We identify what your business is missing and design a repeatable plan that multiplies your content across every platform.",
      color: "from-social-orange to-social-pink",
      items: [
        "Content Audit & Gap Analysis",
        "System Blueprint Design", 
        "Success Metrics Definition"
      ]
    },
    {
      number: "02", 
      title: "Capture the Core",
      subtitle: "Production Excellence",
      description: "Record modular videos designed for maximum reusability. One shoot fuels months of distribution across all channels.",
      color: "from-social-blue to-social-cyan",
      items: [
        "Shoot Once, Use Everywhere",
        "Flexible Format Planning",
        "Guided Performance Coaching"
      ]
    },
    {
      number: "03",
      title: "Build the Library", 
      subtitle: "Scalable Systems",
      description: "Edit, organize, and format your footage into a scalable library that serves your business and grows with your needs.",
      color: "from-social-purple to-social-pink",
      items: [
        "Content System Assembly",
        "Multi-Channel Deployment", 
        "Ongoing Growth Strategy"
      ]
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const timeline = createHorizontalScroll(
      containerRef.current,
      '.process-panel',
      {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        snap: true
      }
    );

    return () => {
      cleanupScrollTrigger();
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-video-black">
      {/* Progress indicator */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-video-white/10 backdrop-blur-md rounded-full px-4 py-2">
        <div className="flex space-x-2">
          {processSteps.map((_, index) => (
            <div 
              key={index}
              className="w-2 h-2 rounded-full bg-video-white/30 process-dot"
              data-step={index}
            />
          ))}
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative h-screen overflow-hidden"
      >
        <div className="flex h-full w-[300%]">
          {processSteps.map((step, index) => (
            <div 
              key={index}
              className="process-panel flex-shrink-0 w-screen h-full flex items-center justify-center relative"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-10`} />
              
              {/* Content */}
              <div className="container mx-auto px-8 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  
                  {/* Left side - Content */}
                  <div className="text-video-white">
                    <div className="mb-4">
                      <span className="text-sm font-medium tracking-widest text-video-white/60">
                        STEP {step.number}
                      </span>
                    </div>
                    
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4">
                      {step.title}
                    </h2>
                    
                    <h3 className="text-xl md:text-2xl font-medium text-video-white/80 mb-8">
                      {step.subtitle}
                    </h3>
                    
                    <p className="text-lg md:text-xl text-video-white/70 leading-relaxed mb-12 max-w-2xl">
                      {step.description}
                    </p>

                    {/* Action items */}
                    <div className="space-y-4">
                      {step.items.map((item, itemIndex) => (
                        <div 
                          key={itemIndex}
                          className="flex items-center space-x-4 group"
                        >
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${step.color} group-hover:scale-125 transition-transform duration-300`} />
                          <span className="text-video-white/90 group-hover:text-video-white transition-colors duration-300">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right side - Visual */}
                  <div className="relative">
                    {/* Large step number */}
                    <div className="absolute -top-8 -right-8 text-[200px] md:text-[280px] lg:text-[320px] font-black text-video-white/5 leading-none select-none">
                      {step.number}
                    </div>
                    
                    {/* Interactive visual element */}
                    <div className="relative z-10">
                      <div className={`w-80 h-80 lg:w-96 lg:h-96 rounded-2xl bg-gradient-to-br ${step.color} opacity-20 blur-xl`} />
                      <div className={`absolute inset-0 w-80 h-80 lg:w-96 lg:h-96 rounded-2xl bg-gradient-to-br ${step.color} opacity-30 animate-pulse`} />
                      
                      {/* Process visualization */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className={`w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 hover:scale-110 transition-transform duration-500 cursor-pointer`}>
                            <span className="text-3xl lg:text-4xl font-black text-video-white">
                              {step.number}
                            </span>
                          </div>
                          <div className="text-video-white/60 text-sm font-medium">
                            {step.subtitle}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll instruction */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-video-white/60 text-sm font-medium animate-bounce">
        Scroll to explore process →
      </div>
    </section>
  );
};