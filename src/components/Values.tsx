
import { Target, Search, Sparkles, Heart, Wrench, Settings } from 'lucide-react';

export const Values = () => {
  const values = [
    { 
      icon: Target, 
      title: "Freedom over Formulas", 
      description: "We break the template. Every brand has a unique angle—we help you find it and film it.",
      gradient: "gradient-social-1"
    },
    { 
      icon: Search, 
      title: "Truth over Trendiness", 
      description: "We don't chase what's viral. We tell stories with substance that actually mean something.",
      gradient: "gradient-social-2"
    },
    { 
      icon: Sparkles, 
      title: "Clarity over Complexity", 
      description: "Clear beats clever. Simple beats busy. If your audience doesn't feel it, they won't follow.",
      gradient: "gradient-social-3"
    },
    { 
      icon: Heart, 
      title: "Emotion over Ego", 
      description: "Connection > performance. We capture presence, not performance—because impact starts with honesty.",
      gradient: "gradient-social-4"
    },
    { 
      icon: Wrench, 
      title: "Craft over Clout", 
      description: "Quality matters more than views. We build visuals that last, not just content that scrolls.",
      gradient: "gradient-social-5"
    },
    { 
      icon: Settings, 
      title: "Purpose over Profit", 
      description: "We create with intention. Every frame serves your mission, not just our bottom line.",
      gradient: "gradient-social-1"
    }
  ];

  return (
    <section id="values" className="py-32 bg-corporate-light relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 gradient-social-3 rounded-full opacity-10 float-animation"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 gradient-social-1 rounded-full opacity-10 float-animation" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 gradient-social-5 rounded-full opacity-15 float-animation" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 px-4">
          <div className="inline-block px-4 py-2 gradient-social-2 rounded-full text-white font-bold text-sm mb-6 video-shadow mobile-touch-target">
            💎 Our Values
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-black mb-6 text-corporate-dark tracking-tight">
            What We <span className="text-gradient-3">Stand For</span>
          </h2>
          <p className="text-base md:text-lg text-corporate-gray max-w-3xl mx-auto font-medium leading-relaxed">
            These core values drive every project and client relationship at Palmer House Productions.
          </p>
        </div>
        
        <div className="space-y-6 max-w-4xl mx-auto mb-16 px-4">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div 
                key={index}
                className="group p-6 md:p-8 bg-video-white rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 mobile-touch-target"
              >
                <div className="flex items-start space-x-6">
                  <div className={`w-16 h-16 ${value.gradient} rounded-2xl flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-display font-black text-corporate-dark mb-3 group-hover:text-gradient-1 transition-all duration-300">
                      {value.title}
                    </h3>
                    <p className="text-corporate-gray leading-relaxed text-sm md:text-base font-medium group-hover:text-corporate-dark transition-colors duration-300">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center p-12 gradient-social-4 rounded-3xl video-shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full"></div>
          </div>
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Our Work Doesn't Shout. It <span className="text-white/90">Echoes</span>.
            </h3>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed font-medium">
              We don't make noise. We make movement—video content that feels aligned, moves like strategy, 
              and leaves a lasting emotional fingerprint long after the scroll.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
