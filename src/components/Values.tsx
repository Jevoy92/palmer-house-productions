
import { Compass, Search, Sparkles, Heart, Wrench, Target } from 'lucide-react';

export const Values = () => {
  const values = [
    { 
      icon: Compass, 
      title: "Systems over Shortcuts", 
      tagline: "We don't follow trends — we build systems. Anyone can post a video. We build assets that answer questions, close sales, train teams, and keep working long after they're published.",
      description: "Templates create noise. Systems create results. We uncover what your business actually needs — then design video tools that reduce friction, save time, and increase trust at every step of your customer journey.",
      palColor: "pal-purple"
    },
    { 
      icon: Search, 
      title: "Clarity over Clicks", 
      tagline: "We don't make content for algorithms. We create videos that solve real business problems — confused customers, slow sales calls, repetitive onboarding, and untrained staff.",
      description: "Trends disappear. Clear communication compounds. When your message is understood, your business grows — even if the video gets 200 views instead of 200,000.",
      palColor: "pal-orange"
    },
    { 
      icon: Sparkles, 
      title: "Efficiency over Excess", 
      tagline: "Most businesses waste time explaining the same things over and over. We turn those answers into video assets — once, clearly — so they can be used again and again.",
      description: "Simple scripts. Direct language. No fluff. If your audience can't understand it in 30 seconds, they won't act on it. Clarity drives action. Efficiency drives profit.",
      palColor: "pal-blue"
    },
    { 
      icon: Heart, 
      title: "Connection over Performance", 
      tagline: "People don't buy the best company — they buy the one they trust the most. That trust doesn't come from perfect scripts. It comes from honesty, presence, and proof.",
      description: "Our videos don't try to make you look perfect — they show why you're real, reliable, and worth choosing. Vulnerability builds loyalty. Humanity builds brands.",
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
          
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={index}
                  className="group p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border hover:border-gray-200 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`w-14 h-14 bg-${value.palColor} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-black text-corporate-dark pt-2">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-corporate-gray leading-relaxed text-base font-medium mb-3">
                    {value.tagline}
                  </p>
                  <p className="text-corporate-gray/80 leading-relaxed text-sm font-medium">
                    {value.description}
                  </p>
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
