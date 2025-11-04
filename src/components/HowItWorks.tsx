import { Video } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Share Your Vision",
      description: "Tell us your goals and we'll craft the perfect video strategy for your business.",
      hasLine: true,
      lineGradient: "from-cyan-400 to-purple-500",
      mockup: (
        <div className="bg-card backdrop-blur-sm rounded-2xl p-6 shadow-2xl w-full max-w-sm" style={{ animation: 'float 6s ease-in-out infinite, pulse-glow 4s ease-in-out infinite' }}>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
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
      hasLine: true,
      lineGradient: "from-purple-500 to-pink-500",
      mockup: (
        <div className="bg-card backdrop-blur-sm rounded-2xl p-6 shadow-2xl w-full max-w-sm" style={{ animation: 'float 6s ease-in-out infinite, pulse-glow 4s ease-in-out infinite', animationDelay: '-1s' }}>
          <div className="bg-muted w-full h-32 rounded-lg p-4 flex flex-col justify-between">
            <div className="w-3/4 h-4 bg-muted-foreground/20 rounded"></div>
            <div className="w-1/2 h-4 bg-muted-foreground/20 rounded"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-muted-foreground/20 rounded-full"></div>
              <div className="w-16 h-4 bg-muted-foreground/20 rounded"></div>
            </div>
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <button className="w-16 h-16 flex items-center justify-center bg-card border border-border rounded-full shadow-md text-red-500 text-2xl hover:bg-muted transition">
              ✕
            </button>
            <button className="w-16 h-16 flex items-center justify-center bg-card border-2 border-pink-400 rounded-full shadow-lg text-pink-500 text-2xl transform scale-110 hover:bg-pink-50 transition" style={{ animation: 'bounce-gentle 2s ease-in-out infinite' }}>
              ♥
            </button>
          </div>
        </div>
      )
    },
    {
      number: "03",
      title: "Professional Production",
      description: "We handle everything from filming to editing with cinematic quality.",
      hasLine: true,
      lineGradient: "from-pink-500 to-orange-400",
      mockup: (
        <div className="bg-card backdrop-blur-sm rounded-2xl p-6 shadow-2xl w-full max-w-sm" style={{ animation: 'float 6s ease-in-out infinite, pulse-glow 4s ease-in-out infinite' }}>
          <div className="w-full h-32 bg-gray-800 rounded-lg flex items-center justify-center relative">
            <div className="absolute top-2 left-2 text-xs text-white bg-black/30 px-2 py-1 rounded">01:15 / 03:42</div>
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <div className="mt-4 space-y-3">
            <div className="w-full h-2 bg-muted rounded-full">
              <div className="h-2 bg-primary rounded-full" style={{ width: '33%', animation: 'progress 4s ease-in-out infinite' }}></div>
            </div>
            <div className="flex justify-between text-muted-foreground text-2xl">
              <span>⏮</span>
              <span>⚙</span>
              <span>⛶</span>
            </div>
          </div>
        </div>
      )
    },
    {
      number: "04",
      title: "Launch & Optimize",
      description: "Publish your content and watch your engagement soar. We're with you every step.",
      hasLine: true,
      lineGradient: "from-orange-400 to-red-400",
      mockup: (
        <div className="bg-card backdrop-blur-sm rounded-2xl p-6 shadow-2xl w-full max-w-sm" style={{ animation: 'float 6s ease-in-out infinite, pulse-glow 4s ease-in-out infinite' }}>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">🚀</span>
            </div>
            <div>
              <p className="font-semibold">Launch Successful</p>
              <p className="text-sm text-muted-foreground">Content is now live!</p>
            </div>
          </div>
          <div className="mt-6 space-y-4" style={{ animation: 'slide-up 2s ease-in-out infinite alternate' }}>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Engagement</p>
              <p className="text-sm font-semibold text-green-500">+25% ↗</p>
            </div>
            <div className="w-full h-2 bg-muted rounded-full">
              <div className="w-4/5 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Reach</p>
              <p className="text-sm font-semibold text-green-500">+40% ↗</p>
            </div>
            <div className="w-full h-2 bg-muted rounded-full">
              <div className="w-2/3 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="pt-16 pb-24 md:pt-24 md:pb-32 bg-background">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 20px rgba(108, 92, 231, 0.1); }
          50% { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(108, 92, 231, 0.2); }
        }
        @keyframes progress {
          0% { width: 33%; }
          50% { width: 50%; }
          100% { width: 33%; }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-5px) scale(1.05); }
        }
        @keyframes slide-up {
          0% { transform: translateY(10px); opacity: 0.8; }
          100% { transform: translateY(0px); opacity: 1; }
        }
      `}} />
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-semibold">
            How Palmer House Productions Works
          </h1>
        </div>

        {/* Mobile: All content first, then all visuals */}
        <div className="md:hidden space-y-12">
          {/* All step content */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={`mobile-content-${index}`} className="flex items-start space-x-8">
                <div className="relative flex-shrink-0">
                  {step.hasLine && index < steps.length - 1 && (
                    <div className={`absolute -left-1.5 top-12 h-full w-0.5 bg-gradient-to-b ${step.lineGradient}`}></div>
                  )}
                  <p className="text-4xl font-bold text-gray-800">{step.number}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-base">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* All mockups */}
          <div className="grid grid-cols-1 gap-12 mt-12">
            {steps.map((step, index) => (
              <div key={`mobile-visual-${index}`} className="flex items-center justify-center">
                {step.mockup}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Step content next to its mockup */}
        <div className="hidden md:block max-w-6xl mx-auto space-y-16">
          {steps.map((step, index) => (
            <div key={`desktop-${index}`} className="grid grid-cols-2 gap-x-24 items-center">
              {/* Step Content */}
              <div className="flex items-start space-x-8">
                <div className="relative flex-shrink-0">
                  {step.hasLine && index < steps.length - 1 && (
                    <div className={`absolute -left-1.5 top-12 h-full w-0.5 bg-gradient-to-b ${step.lineGradient}`}></div>
                  )}
                  <p className="text-4xl font-bold text-gray-800">{step.number}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-base">{step.description}</p>
                </div>
              </div>
              
              {/* Step Visual */}
              <div className="flex items-center justify-center">
                {step.mockup}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
