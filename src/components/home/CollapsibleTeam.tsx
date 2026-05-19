import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const CollapsibleTeam = () => {
  const [isOpen, setIsOpen] = useState(false);

  const teamMembers = [
    {
      name: "Jevoy Palmer",
      role: "Founder & CEO",
      image: "/lovable-uploads/945e6d63-02d8-4c0d-a4ae-b691cc806a74.png",
      bio: "Jevoy is the visionary behind Palmer House Productions. A filmmaker, strategist, and storyteller at heart, he leads with the belief that video isn't just content—it's a business tool.",
      gradient: "gradient-social-3", 
      textGradient: "text-gradient-3"
    },
    {
      name: "Kyli Lora",
      role: "Executive Production Assistant",
      image: "/lovable-uploads/dcada800-4488-4970-82eb-2c356d3e789d.png",
      bio: "Kyli keeps the wheels turning at Palmer House Productions. From client communication and scheduling to on-set logistics and post-production prep, she's the calm in the creative storm.",
      gradient: "gradient-social-1",
      textGradient: "text-gradient-1"
    },
    {
      name: "Trenton Sims", 
      role: "Lead Editor",
      image: "/lovable-uploads/2537d3fc-b210-4170-93a2-d927fe38eea0.png",
      bio: "Trenton is the post-production powerhouse behind our visual storytelling. With a knack for turning raw footage into compelling narratives, he brings each client's vision to life.",
      gradient: "gradient-social-2",
      textGradient: "text-gradient-2"
    }
  ];

  return (
    <section className="py-16 bg-video-white">
      <div className="max-w-6xl mx-auto px-6">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="w-full group">
            <div className="flex items-center justify-between p-8 bg-corporate-light/50 rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300">
              <div className="text-left">
                <div className="inline-block px-4 py-2 gradient-social-2 rounded-full text-white font-bold text-sm mb-4">
                  🏕️ Meet Your Team
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-black text-corporate-dark">
                  The <span className="text-gradient-2">Palmer House</span> Team
                </h2>
                <p className="text-lg text-corporate-gray mt-4">
                  The dedicated professionals behind every compelling story and successful campaign.
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
            <div className="mt-6 p-8 bg-corporate-light/50 rounded-3xl video-shadow">
              <div className="grid lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="group text-center bg-video-white p-6 rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300">
                    <div className="relative mb-6">
                      <div className="aspect-square w-32 h-32 mx-auto rounded-2xl overflow-hidden video-shadow group-hover:scale-105 transition-transform duration-300">
                        <img 
                          src={member.image} 
                          alt={`${member.name}, ${member.role} at Palmer House Productions - Professional video production team member`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                    <h3 className="text-xl font-display font-black text-corporate-dark mb-2">{member.name}</h3>
                    <h4 className={`text-lg font-bold mb-4 ${member.textGradient}`}>
                      {member.role}
                    </h4>
                    <p className="text-corporate-gray leading-relaxed text-sm">
                      {member.bio}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
};