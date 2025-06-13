
import { Compass, Search, Sparkles, Heart, Wrench, Target } from 'lucide-react';
import { useState } from 'react';
import { ServiceWizard } from './ServiceWizard';

export const Values = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [expandedPathway, setExpandedPathway] = useState<string | null>(null);

  const values = [
    { 
      icon: Compass, 
      title: "Freedom over Formulas", 
      description: "We break the template. Every brand has a wild edge—we help you find it and film it.",
      gradient: "gradient-social-1"
    },
    { 
      icon: Search, 
      title: "Truth over Trendiness", 
      description: "We don't chase what's viral. We tell stories with soul that actually mean something.",
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
      icon: Target, 
      title: "Purpose over Profit", 
      description: "We create with intention. Every frame serves your mission, not just our bottom line.",
      gradient: "gradient-social-1"
    }
  ];

  const pathChoices = [
    { 
      icon: "🗺️", 
      word: "Adventurous", 
      gradient: "gradient-social-1",
      description: "Bold moves that push boundaries and take creative risks. Perfect for brands ready to stand out from the crowd and make a statement that resonates with bold, forward-thinking audiences."
    },
    { 
      icon: "⭐", 
      word: "Creative", 
      gradient: "gradient-social-2",
      description: "Artistic storytelling that showcases unique brand personality. Ideal for brands with a distinctive voice who want to express their creativity through compelling visual narratives."
    },
    { 
      icon: "🚀", 
      word: "Bold", 
      gradient: "gradient-social-3",
      description: "Confident messaging that commands attention and respect. Designed for established brands ready to assert their authority and leadership in their industry."
    },
    { 
      icon: "🧭", 
      word: "Authentic", 
      gradient: "gradient-social-4",
      description: "Genuine narratives that build trust and human connection. Perfect for brands who prioritize transparency, honesty, and building meaningful relationships with their audience."
    },
    { 
      icon: "🌟", 
      word: "Elevated", 
      gradient: "gradient-social-5",
      description: "Sophisticated approach that positions you as premium. Tailored for luxury brands and high-end services that demand excellence and exclusivity in their presentation."
    },
    { 
      icon: "🎯", 
      word: "Focused", 
      gradient: "gradient-social-1",
      description: "Strategic precision targeting specific goals and audiences. Ideal for brands with clear objectives who want every piece of content to serve a specific purpose and drive measurable results."
    }
  ];

  const handlePathwayToggle = (pathName: string) => {
    if (expandedPathway === pathName) {
      setExpandedPathway(null);
    } else {
      setExpandedPathway(pathName);
    }
  };

  return (
    <section id="values" className="py-32 bg-corporate-light relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 gradient-social-3 rounded-full opacity-10 float-animation"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 gradient-social-1 rounded-full opacity-10 float-animation" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 gradient-social-5 rounded-full opacity-15 float-animation" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-block px-6 py-3 gradient-social-2 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            🧭 Trail Markers
          </div>
          <h2 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
            What We <span className="text-gradient-3">Value</span>
          </h2>
          <p className="text-2xl text-corporate-gray max-w-4xl mx-auto font-medium leading-tight">
            These aren't just brand values—they're the <span className="text-corporate-dark font-bold">compass points</span> we navigate by.
            <br />
            <span className="text-corporate-dark font-bold">Rules of the road</span> for every creative expedition.
          </p>
        </div>
        
        <div className="space-y-8 max-w-5xl mx-auto mb-20">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div 
                key={index}
                className="group p-8 bg-video-white rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-500 hover:scale-105"
              >
                <div className="flex items-start space-x-6">
                  <div className={`w-16 h-16 ${value.gradient} rounded-2xl flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-black text-corporate-dark mb-4 group-hover:text-corporate-dark transition-all duration-300">
                      {value.title}
                    </h3>
                    <p className="text-corporate-gray leading-relaxed text-lg font-medium group-hover: text-corporate-dark transition-colors duration-300">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mb-16">
          <div className="text-corporate-gray text-4xl mb-12 tracking-widest">⸻ ⸻ ⸻</div>
          <div className="inline-block px-8 py-4 gradient-social-1 rounded-full text-white font-bold text-xl mb-8 video-shadow-lg">
            🎒 Brand Pathways
          </div>
          <h3 className="text-5xl md:text-6xl font-display font-black mb-10 text-corporate-dark leading-tight">
            Explore Your <span className="text-corporate-dark">Brand Direction</span>
          </h3>
          <p className="text-2xl text-corporate-gray mb-16 max-w-5xl mx-auto font-medium leading-relaxed">
            Every great brand has its own unique voice and approach.
            <br />
            <span className="text-corporate-dark font-bold">What kind of story does your brand want to tell?</span> Click to learn more about each pathway.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20 max-w-5xl mx-auto">
            {pathChoices.map((item, index) => {
              const isExpanded = expandedPathway === item.word;
              return (
                <div key={index}>
                  <button 
                    onClick={() => handlePathwayToggle(item.word)}
                    className={`group relative p-4 bg-video-white rounded-2xl hover:bg-transparent transition-all duration-500 video-shadow hover:video-shadow-lg cursor-pointer overflow-hidden transform hover:scale-105 active:scale-95 w-full ${
                      isExpanded ? 'scale-105' : ''
                    }`}
                  >
                    <div className={`absolute inset-0 ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl ${
                      isExpanded ? 'opacity-100' : ''
                    }`}></div>
                    
                    <div className="relative z-10 text-center">
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-500">
                        {item.icon}
                      </div>
                      <h4 className={`text-sm font-display font-black transition-colors duration-500 leading-tight ${
                        isExpanded ? 'text-white' : 'text-corporate-dark group-hover:text-white'
                      }`}>
                        {item.word}
                      </h4>
                    </div>
                    
                    <div className="absolute -top-1 -right-1 w-3 h-3 gradient-social-3 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 gradient-social-4 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                  </button>
                  
                  {isExpanded && (
                    <div className="mt-4 p-6 bg-video-white rounded-2xl video-shadow border-l-4 border-social-purple">
                      <p className="text-corporate-gray leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            <div className="p-8 bg-video-white rounded-2xl video-shadow">
              <div className="text-5xl font-black text-corporate-dark mb-4">∞</div>
              <div className="text-lg text-corporate-gray font-semibold">Paths to Explore</div>
            </div>
            <div className="p-8 bg-video-white rounded-2xl video-shadow">
              <div className="text-5xl font-black text-corporate-dark mb-4">1</div>
              <div className="text-lg text-corporate-gray font-semibold">Perfect Journey</div>
            </div>
            <div className="p-8 bg-video-white rounded-2xl video-shadow">
              <div className="text-5xl font-black text-corporate-dark mb-4">100%</div>
              <div className="text-lg text-corporate-gray font-semibold">Authentic Adventure</div>
            </div>
          </div>
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

      <ServiceWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} />
    </section>
  );
};
