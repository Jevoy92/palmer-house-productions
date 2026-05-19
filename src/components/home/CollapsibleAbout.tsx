import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const CollapsibleAbout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-16 bg-corporate-light">
      <div className="max-w-6xl mx-auto px-6">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="w-full group">
            <div className="flex items-center justify-between p-8 bg-video-white rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300">
              <div className="text-left">
                <div className="inline-block px-4 py-2 gradient-social-1 rounded-full text-white font-bold text-sm mb-4">
                  🌍 Our Origin Story
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-black text-corporate-dark">
                  A Content System Worth <span className="text-gradient-1">Building</span>
                </h2>
                <p className="text-lg text-corporate-gray mt-4">
                  Discover the story behind Palmer House Productions and our strategic approach to content systems for your business.
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
              <div className="max-w-4xl mx-auto">
                <p className="text-xl text-corporate-gray leading-relaxed mb-8 text-center">
                  Raised where culture, rhythm, and resilience converge in Kingston, Jamaica, I've always believed stories are made to be <span className="text-gradient-3 font-bold">discovered</span> - not manufactured.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-corporate-light/50 rounded-2xl">
                    <div className="text-3xl mb-3 text-gradient-1">❌</div>
                    <p className="text-lg text-corporate-dark font-medium">We don't follow templates.</p>
                  </div>
                  <div className="text-center p-6 bg-corporate-light/50 rounded-2xl">
                    <div className="text-3xl mb-3 text-gradient-2">❌</div>
                    <p className="text-lg text-corporate-dark font-medium">We don't take safe routes.</p>
                  </div>
                  <div className="text-center p-6 bg-corporate-light/50 rounded-2xl">
                    <div className="text-3xl mb-3 text-gradient-3">❌</div>
                    <p className="text-lg text-corporate-dark font-medium">We don't blend in.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-social-purple/10 to-social-pink/10 rounded-2xl p-8 border border-social-purple/20 mb-8">
                  <p className="text-xl text-corporate-gray leading-relaxed text-center">
                    We chart <span className="text-gradient-1 font-bold">new creative territory</span> with every project. You deserve more than content. You deserve a <span className="text-gradient-2 font-bold">visual identity as bold</span> as your brand's journey.
                  </p>
                </div>

                {/* Founder Quote */}
                <div className="bg-gradient-to-br from-social-purple/10 via-social-pink/5 to-social-cyan/10 rounded-3xl p-8 video-shadow border border-social-purple/20">
                  <h3 className="text-3xl font-display font-black text-corporate-dark mb-6 text-center">Field Notes from the Founder</h3>
                  <div className="relative">
                    <div className="text-4xl text-social-purple/30 absolute -top-2 -left-2">"</div>
                    <blockquote className="text-xl text-corporate-gray leading-relaxed italic mb-6 relative z-10 text-center">
                      I grew up knowing that stories could change lives—but only if told with truth, courage, and soul. Palmer House is more than a business. It's an invitation to <span className="text-gradient-2 font-bold">explore boldly</span> and say what matters.
                    </blockquote>
                    <div className="text-4xl text-social-purple/30 absolute -bottom-4 -right-2">"</div>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-12 h-1 bg-gradient-to-r from-social-purple to-social-pink rounded-full"></div>
                    <p className="text-gradient-1 font-bold text-lg">Jevoy Palmer</p>
                    <div className="w-12 h-1 bg-gradient-to-r from-social-purple to-social-pink rounded-full"></div>
                  </div>
                  <p className="text-corporate-gray text-sm mt-2 text-center">Founder & Lead Creative Guide</p>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
};