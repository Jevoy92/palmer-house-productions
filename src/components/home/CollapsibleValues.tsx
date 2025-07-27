import { useState } from "react";
import { ChevronDown, ChevronUp, Compass, Search, Sparkles, Heart, Wrench, Target } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const CollapsibleValues = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <section className="py-16 bg-corporate-light">
      <div className="max-w-6xl mx-auto px-6">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="w-full group">
            <div className="flex items-center justify-between p-8 bg-video-white rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300">
              <div className="text-left">
                <div className="inline-block px-4 py-2 gradient-social-2 rounded-full text-white font-bold text-sm mb-4">
                  🧭 Trail Markers
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-black text-corporate-dark">
                  What We <span className="text-gradient-3">Value</span>
                </h2>
                <p className="text-lg text-corporate-gray mt-4">
                  The compass points we navigate by in every creative expedition.
                </p>
              </div>
              <div className="ml-6">
                {isOpen ? (
                  <ChevronUp size={32} className="text-corporate-gray group-hover:text-corporate-dark transition-colors" />
                ) : (
                  <ChevronDown size={32} className="text-corporate-gray group-hover:text-corporate-dark transition-colors" />
                )}
              </div>
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <div className="mt-6 p-8 bg-video-white rounded-3xl video-shadow">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {values.map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                    <div 
                      key={index}
                      className="group p-6 bg-corporate-light/30 rounded-2xl hover:bg-corporate-light/50 transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 ${value.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-display font-black text-corporate-dark mb-2">
                            {value.title}
                          </h3>
                          <p className="text-corporate-gray leading-relaxed text-sm">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="text-center p-8 gradient-social-4 rounded-2xl video-shadow">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                  Our Work Doesn't Shout. It <span className="text-white/90">Echoes</span>.
                </h3>
                <p className="text-lg text-white/90 leading-relaxed">
                  We don't make noise. We make movement—video content that feels aligned, moves like strategy, 
                  and leaves a lasting emotional fingerprint long after the scroll.
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
};