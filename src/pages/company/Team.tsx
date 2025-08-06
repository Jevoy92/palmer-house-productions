import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { StructuredData } from "@/components/seo/StructuredData";
import { BreadcrumbNavigation } from "@/components/seo/BreadcrumbNavigation";
import { Navigation } from "@/components/Navigation";

const Team = () => {
  const teamMembers = [
    {
      name: "Jevoy Palmer",
      role: "Founder & CEO",
      image: "/lovable-uploads/945e6d63-02d8-4c0d-a4ae-b691cc806a74.png",
      bio: "Jevoy is the visionary behind Palmer House Productions. A filmmaker, strategist, and storyteller at heart, he leads with the belief that video isn't just content—it's a business tool. Raised in Kingston, Jamaica, where culture, rhythm, and resilience converge, Jevoy brings a unique perspective to visual storytelling that breaks templates and charts new creative territory.",
      gradient: "gradient-social-3", 
      textGradient: "text-gradient-3",
      longBio: "With over a decade of experience in video production and brand strategy, Jevoy has helped hundreds of businesses discover their authentic voice through video. His approach combines technical excellence with emotional storytelling, creating content that doesn't just look professional—it feels authentic and drives real business results."
    },
    {
      name: "Kyli Lora",
      role: "Executive Production Assistant",
      image: "/lovable-uploads/dcada800-4488-4970-82eb-2c356d3e789d.png",
      bio: "Kyli keeps the wheels turning at Palmer House Productions. From client communication and scheduling to on-set logistics and post-production prep, she's the calm in the creative storm. Her attention to detail and organizational skills ensure every project runs smoothly from concept to delivery.",
      gradient: "gradient-social-1",
      textGradient: "text-gradient-1",
      longBio: "Kyli's background in project management and client relations makes her an invaluable asset to the Palmer House team. She works closely with clients to understand their vision and coordinates with the production team to bring that vision to life. Her proactive communication style and problem-solving abilities have earned her praise from clients and team members alike."
    },
    {
      name: "Trenton Sims", 
      role: "Lead Editor",
      image: "/lovable-uploads/2537d3fc-b210-4170-93a2-d927fe38eea0.png",
      bio: "Trenton is the post-production powerhouse behind our visual storytelling. With a knack for turning raw footage into compelling narratives, he brings each client's vision to life through expert editing, color grading, and motion graphics. His technical expertise and creative eye ensure every frame serves the story.",
      gradient: "gradient-social-2",
      textGradient: "text-gradient-2",
      longBio: "Trenton's expertise spans across multiple editing platforms and post-production workflows. He specializes in creating dynamic, engaging content that captures attention and drives action. His collaborative approach with the production team ensures that the final product exceeds client expectations while maintaining the Palmer House standard of excellence."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <StructuredData />
      <MainContent>
        <section className="pt-24 pb-16 bg-video-white">
          <div className="max-w-7xl mx-auto px-6">
            <BreadcrumbNavigation />
            
            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="inline-block px-6 py-3 gradient-social-2 rounded-full text-white font-bold text-lg mb-8">
                🏕️ Meet Your Team
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                The <span className="text-gradient-2">Palmer House</span> Team
              </h1>
              <p className="text-xl md:text-2xl text-corporate-gray mb-8 max-w-4xl mx-auto">
                The dedicated professionals behind every compelling story and successful campaign. We're not just a production company—we're your creative partners in building authentic brand experiences.
              </p>
            </div>

            {/* Team Members */}
            <div className="space-y-16">
              {teamMembers.map((member, index) => (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="aspect-square w-full max-w-md mx-auto rounded-3xl overflow-hidden video-shadow-lg">
                      <img 
                        src={member.image} 
                        alt={`${member.name}, ${member.role} at Palmer House Productions`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className="bg-white p-8 rounded-3xl video-shadow">
                      <h2 className="text-3xl font-display font-black text-corporate-dark mb-2">{member.name}</h2>
                      <h3 className={`text-xl font-bold mb-6 ${member.textGradient}`}>
                        {member.role}
                      </h3>
                      <p className="text-corporate-gray leading-relaxed mb-6 text-lg">
                        {member.bio}
                      </p>
                      <p className="text-corporate-gray leading-relaxed">
                        {member.longBio}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Values Section */}
            <div className="mt-24">
              <div className="bg-gradient-to-r from-social-purple/10 to-social-pink/10 rounded-3xl p-12 border border-social-purple/20 text-center">
                <h2 className="text-4xl font-display font-black text-corporate-dark mb-8">
                  What Drives Our Team
                </h2>
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="bg-white p-6 rounded-2xl video-shadow">
                    <div className="text-3xl mb-4">🎯</div>
                    <h3 className="text-xl font-bold text-corporate-dark mb-3">Purpose-Driven</h3>
                    <p className="text-corporate-gray">Every project serves your mission, not just our portfolio.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl video-shadow">
                    <div className="text-3xl mb-4">🤝</div>
                    <h3 className="text-xl font-bold text-corporate-dark mb-3">Collaborative</h3>
                    <p className="text-corporate-gray">Your vision guides every creative decision we make.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl video-shadow">
                    <div className="text-3xl mb-4">🎨</div>
                    <h3 className="text-xl font-bold text-corporate-dark mb-3">Authentic</h3>
                    <p className="text-corporate-gray">We capture truth, not performance—because real resonates.</p>
                  </div>
                </div>
                <p className="text-xl text-corporate-gray max-w-3xl mx-auto">
                  We're not just makers of content. We're explorers of possibility, helping bold brands chart new creative territory with every project.
                </p>
              </div>
            </div>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default Team;