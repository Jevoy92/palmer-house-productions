import { Video, Sparkles, Clapperboard, Rocket } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Share Your Vision",
      description: "Tell us your goals and we'll craft the perfect video strategy for your business.",
      icon: Sparkles,
      mockup: (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
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
      mockup: (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 relative">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="h-3 bg-gray-200 rounded flex-1"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="h-3 bg-gray-200 rounded flex-1"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="h-3 bg-gray-100 rounded flex-1"></div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="flex-1 py-2 rounded-full border-2 border-gray-300 text-sm font-medium">Skip</button>
            <button className="flex-1 py-2 rounded-full bg-primary text-white text-sm font-medium">Next</button>
          </div>
        </div>
      )
    },
    {
      number: "03",
      title: "Professional Production",
      description: "We handle everything from filming to editing with cinematic quality.",
      icon: Clapperboard,
      mockup: (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200">
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg"></div>
            <div className="aspect-video bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-lg flex items-center justify-center">
              <Video className="w-8 h-8 text-secondary/50" />
            </div>
          </div>
          <div className="mt-4 h-10 bg-gray-100 rounded-lg"></div>
        </div>
      )
    },
    {
      number: "04",
      title: "Launch & Optimize",
      description: "Publish your content and watch your engagement soar. We're with you every step.",
      icon: Rocket,
      mockup: (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              <div className="text-green-500 text-sm font-bold">✓ Ready</div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary w-full"></div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10x</div>
                <div className="text-xs text-gray-500">Content</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">75%</div>
                <div className="text-xs text-gray-500">Faster</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">ROI+</div>
                <div className="text-xs text-gray-500">Growth</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How Palmer House Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From concept to launch, we make professional video production effortless.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-6xl font-bold text-primary/20">
                      {step.number}
                    </div>
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  {step.mockup}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
