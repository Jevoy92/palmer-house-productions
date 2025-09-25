
import { Compass, Search, Sparkles, Heart, Wrench, Target } from 'lucide-react';

export const Values = () => {
  const values = [
    { 
      icon: Compass, 
      title: "Freedom over Formulas", 
      description: "We break the template. Every brand has a wild edge—we help you find it and film it.",
      palColor: "pal-purple"
    },
    { 
      icon: Search, 
      title: "Truth over Trendiness", 
      description: "We don't chase what's viral. We tell stories with soul that actually mean something.",
      palColor: "pal-orange"
    },
    { 
      icon: Sparkles, 
      title: "Clarity over Complexity", 
      description: "Clear beats clever. Simple beats busy. If your audience doesn't feel it, they won't follow.",
      palColor: "pal-blue"
    },
    { 
      icon: Heart, 
      title: "Emotion over Ego", 
      description: "Connection > performance. We capture presence, not performance—because impact starts with honesty.",
      palColor: "pal-green"
    }
  ];

  return (
    <section id="values" className="py-16 sm:py-24 lg:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Values Section - White Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl">
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-3 bg-pal-orange text-white font-bold text-lg mb-8 rounded-full video-shadow">
              💎 Our Values
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black mb-6 text-corporate-dark tracking-tight">
              What We <span className="text-pal-blue">Stand For</span>
            </h2>
            <p className="text-lg xl:text-xl text-corporate-gray max-w-4xl mx-auto font-medium leading-relaxed">
              These core values guide every project and client relationship at Palmer House Productions.
            </p>
          </div>
          
          <div className="space-y-6 max-w-4xl mx-auto mb-12">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={index}
                  className="group p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border hover:border-gray-200 transition-all duration-300"
                >
                  <div className="flex items-start space-x-6">
                    <div className={`w-16 h-16 bg-${value.palColor} rounded-2xl flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={28} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-display font-black text-corporate-dark mb-3">
                        {value.title}
                      </h3>
                      <p className="text-corporate-gray leading-relaxed text-sm md:text-base font-medium">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center bg-gradient-to-br from-pal-green/10 to-pal-blue/10 p-8 md:p-12 rounded-2xl border border-pal-green/20">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-corporate-dark mb-6 leading-tight">
              Our Work Doesn't Shout. It <span className="text-pal-green">Echoes</span>.
            </h3>
            <p className="text-lg xl:text-xl text-corporate-gray max-w-4xl mx-auto leading-relaxed font-medium">
              We don't make noise. We make movement—video content that feels aligned, moves like strategy, 
              and leaves a lasting emotional fingerprint long after the scroll.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
