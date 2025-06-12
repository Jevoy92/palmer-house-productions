import { Compass, Search, Sparkles, Heart, Wrench, Target } from 'lucide-react';
import { useState } from 'react';
import { ServiceWizard } from './ServiceWizard';
import { PathwayCard } from './PathwayCard';

export const Values = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

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
      description: "For brands that want to break boundaries and explore uncharted creative territory.",
      benefits: [
        "Bold, unconventional video concepts",
        "Risk-taking creative approaches", 
        "Standing out from competitors",
        "Pioneering new trends in your industry"
      ]
    },
    { 
      icon: "⭐", 
      word: "Creative", 
      gradient: "gradient-social-2",
      description: "For businesses that value artistic expression and want visually stunning content.",
      benefits: [
        "Artistic, high-production value videos",
        "Unique visual storytelling techniques",
        "Creative problem-solving approaches",
        "Award-worthy content creation"
      ]
    },
    { 
      icon: "🚀", 
      word: "Bold", 
      gradient: "gradient-social-3",
      description: "For companies ready to make big statements and dominate their market.",
      benefits: [
        "High-impact, attention-grabbing content",
        "Confident brand positioning",
        "Market leadership messaging",
        "Fearless creative execution"
      ]
    },
    { 
      icon: "🧭", 
      word: "Authentic", 
      gradient: "gradient-social-4",
      description: "For brands that prioritize genuine connections and honest storytelling.",
      benefits: [
        "Real, unfiltered brand stories",
        "Honest customer testimonials",
        "Behind-the-scenes content",
        "Building trust through transparency"
      ]
    },
    { 
      icon: "🌟", 
      word: "Elevated", 
      gradient: "gradient-social-5",
      description: "For premium brands that demand sophisticated, high-end video content.",
      benefits: [
        "Luxury-level production quality",
        "Sophisticated visual aesthetics",
        "Premium brand positioning",
        "Elite market targeting"
      ]
    },
    { 
      icon: "🎯", 
      word: "Focused", 
      gradient: "gradient-social-1",
      description: "For businesses with clear goals who want strategic, results-driven content.",
      benefits: [
        "Goal-oriented content strategy",
        "ROI-focused video campaigns",
        "Targeted audience approach",
        "Measurable business outcomes"
      ]
    }
  ];

  const handlePathClick = (pathName: string) => {
    localStorage.setItem('selectedPath', pathName);
    setIsWizardOpen(true);
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
            🎒 Choose Your Path
          </div>
          <h3 className="text-5xl md:text-6xl font-display font-black mb-10 text-corporate-dark leading-tight">
            What Kind of <span className="text-corporate-dark">Explorer</span> Are You?
          </h3>
          <p className="text-2xl text-corporate-gray mb-16 max-w-5xl mx-auto font-medium leading-relaxed">
            Every great journey starts with understanding your style.
            <br />
            <span className="text-corporate-dark font-bold">Click to learn more about each path</span> before choosing your adventure.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto">
            {pathChoices.map((item, index) => (
              <PathwayCard
                key={index}
                icon={item.icon}
                word={item.word}
                gradient={item.gradient}
                description={item.description}
                benefits={item.benefits}
                onStartJourney={() => handlePathClick(item.word)}
              />
            ))}
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
