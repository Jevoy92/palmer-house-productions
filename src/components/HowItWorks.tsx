import React from 'react';
import { Video, Sparkles, Clapperboard, Rocket } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Share Your Vision",
      description: "Tell us your goals and we'll craft the perfect video strategy for your business.",
      icon: Sparkles,
      lineGradient: "from-cyan-400 to-purple-500",
      mockup: (
        <div className="bg-card backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-border animate-[float_6s_ease-in-out_infinite]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="space-y-3">
            <div className="h-3 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-full"></div>
            <div className="h-3 bg-muted rounded w-5/6"></div>
            <div className="h-8 bg-primary/10 rounded-lg mt-4"></div>
          </div>
        </div>
      )
    },
    {
      number: "02",
      title: "Custom Strategy",
      description: "Our team designs a tailored video content plan that aligns with your brand.",
      icon: Video,
      lineGradient: "from-purple-500 to-pink-500",
      mockup: (
        <div className="bg-card backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-border animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: '-2s' }}>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="h-3 bg-muted rounded flex-1"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="h-3 bg-muted rounded flex-1"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-muted"></div>
              <div className="h-3 bg-muted/50 rounded flex-1"></div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="flex-1 py-2 rounded-full border-2 border-border text-sm font-medium hover:bg-muted transition-colors">Skip</button>
            <button className="flex-1 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">Next</button>
          </div>
        </div>
      )
    },
    {
      number: "03",
      title: "Professional Production",
      description: "We handle everything from filming to editing with cinematic quality.",
      icon: Clapperboard,
      lineGradient: "from-pink-500 to-orange-400",
      mockup: (
        <div className="bg-card backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-border animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: '-4s' }}>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg"></div>
            <div className="aspect-video bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-lg flex items-center justify-center">
              <Video className="w-8 h-8 text-secondary/50" />
            </div>
          </div>
          <div className="mt-4 h-10 bg-muted rounded-lg"></div>
        </div>
      )
    },
    {
      number: "04",
      title: "Launch & Optimize",
      description: "Publish your content and watch your engagement soar. We're with you every step.",
      icon: Rocket,
      lineGradient: "",
      mockup: (
        <div className="bg-card backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-border animate-[float_6s_ease-in-out_infinite]">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-3 bg-muted rounded w-1/3"></div>
              <div className="text-green-500 text-sm font-bold">✓ Ready</div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary w-full"></div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10x</div>
                <div className="text-xs text-muted-foreground">Content</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">75%</div>
                <div className="text-xs text-muted-foreground">Faster</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">ROI+</div>
                <div className="text-xs text-muted-foreground">Growth</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            How Palmer House Productions Works
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={index}>
                {/* Content Section */}
                <div className="flex items-start space-x-8">
                  <div className="relative flex-shrink-0">
                    {/* Vertical line connecting to next step */}
                    {index < steps.length - 1 && (
                      <div className={`absolute -left-1.5 top-12 h-full w-0.5 bg-gradient-to-b ${step.lineGradient}`}></div>
                    )}
                    <p className="text-4xl font-bold text-foreground">{step.number}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-base">{step.description}</p>
                  </div>
                </div>
                
                {/* Visual Section */}
                <div className="flex items-center justify-center min-h-[16rem]">
                  {step.mockup}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};
