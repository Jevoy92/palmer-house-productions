import { useState, useEffect, useRef } from 'react';
import { clipPathReveal, animateCounter, scrollReveal } from '@/lib/gsap';
import { MagneticButton } from '@/components/ui/magnetic-button';

const processSteps = [
  {
    number: "01",
    title: "Map the System",
    subtitle: "Strategic Foundation",
    description: "We identify what your business is missing and design a repeatable plan that multiplies your content across every platform.",
    metrics: { value: 85, suffix: "% Time Saved" },
    color: "from-social-orange to-social-orange/80"
  },
  {
    number: "02", 
    title: "Capture the Core",
    subtitle: "Efficient Production",
    description: "We record modular videos designed for maximum reusability with guided performance coaching and teleprompter support.",
    metrics: { value: 12, suffix: "x ROI Average" },
    color: "from-social-blue to-social-blue/80"
  },
  {
    number: "03",
    title: "Build the Library", 
    subtitle: "Scalable Growth",
    description: "We edit, organize, and format your footage into a scalable library that serves your business needs across all channels.",
    metrics: { value: 200, suffix: "+ Videos Created" },
    color: "from-social-purple to-social-purple/80"
  }
];

export const EnhancedProcessSection = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !stepsRef.current) return;

    // Animate section reveal
    scrollReveal(sectionRef.current, '.process-header > *', {
      stagger: 0.1
    });

    // Animate step cards
    const cards = stepsRef.current.querySelectorAll('.process-step');
    clipPathReveal(Array.from(cards), {
      trigger: stepsRef.current,
      direction: 'bottom',
      stagger: 0.2
    });

    // Animate counters when they come into view
    processSteps.forEach((step, index) => {
      const counterEl = document.querySelector(`#counter-${index}`);
      if (counterEl) {
        animateCounter(counterEl, {
          to: step.metrics.value,
          duration: 2,
          trigger: counterEl,
          format: (value) => `${Math.round(value)}${step.metrics.suffix}`
        });
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-video-white">
      <div className="section-padding">
        <div className="container mx-auto container-padding">
          {/* Enhanced Header */}
          <div className="process-header mb-20">
            <div className="flex items-center mb-4">
              <span className="text-sm font-medium tracking-widest text-muted-foreground">0—1</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div>
                <h2 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 text-charcoal">
                  Process
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  We don't just make videos — we build a reusable system that serves your business across every channel.
                </p>
              </div>
              <div className="flex justify-end">
                <MagneticButton 
                  variant="outline"
                  className="text-lg px-8 py-4"
                  intensity={0.3}
                >
                  See Full Process
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Interactive Process Steps */}
          <div ref={stepsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="process-step group relative overflow-hidden"
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Step Card */}
                <div className={`
                  relative bg-gradient-to-br ${step.color} 
                  rounded-2xl p-8 h-96 flex flex-col justify-between
                  transition-all duration-500 cursor-pointer
                  ${activeStep === index ? 'scale-105 shadow-2xl' : 'scale-100 shadow-lg'}
                `}>
                  {/* Step Number */}
                  <div className="flex items-start justify-between">
                    <span className="text-6xl font-black text-white/20">
                      {step.number}
                    </span>
                    <div className="text-right">
                      <div 
                        id={`counter-${index}`}
                        className="text-2xl font-bold text-white mb-1"
                      >
                        0{step.metrics.suffix}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                        {step.subtitle}
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-2">
                        {step.title}
                      </h3>
                    </div>
                    
                    <p className="text-white/90 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  <div className={`
                    absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl
                    flex items-center justify-center transition-opacity duration-300
                    ${activeStep === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                  `}>
                    <MagneticButton 
                      variant="secondary"
                      intensity={0.2}
                      className="bg-white/20 border-white text-white hover:bg-white hover:text-charcoal"
                    >
                      Learn More
                    </MagneticButton>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Process Flow Visualization */}
          <div className="mt-16 flex justify-center">
            <div className="flex items-center space-x-4">
              {processSteps.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className={`
                    w-4 h-4 rounded-full transition-all duration-300
                    ${activeStep === index ? 'bg-social-orange scale-125' : 'bg-gray-300'}
                  `} />
                  {index < processSteps.length - 1 && (
                    <div className="w-12 h-px bg-gray-300 mx-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};