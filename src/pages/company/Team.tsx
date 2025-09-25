import { SkipLink } from "@/components/ui/skip-link";
import { MainContent } from "@/components/MainContent";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { MetaTags } from "@/components/seo/MetaTags";
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
      palColor: "pal-purple",
      longBio: "With over a decade of experience in video production and brand strategy, Jevoy has helped hundreds of businesses discover their authentic voice through video. His approach combines technical excellence with emotional storytelling, creating content that doesn't just look professional—it feels authentic and drives real business results."
    },
    {
      name: "Trenton Sims", 
      role: "Lead Editor",
      image: "/lovable-uploads/2537d3fc-b210-4170-93a2-d927fe38eea0.png",
      bio: "Trenton is the post-production powerhouse behind our visual storytelling. With a knack for turning raw footage into compelling narratives, he brings each client's vision to life through expert editing, color grading, and motion graphics. His technical expertise and creative eye ensure every frame serves the story.",
      palColor: "pal-orange",
      longBio: "Trenton's expertise spans across multiple editing platforms and post-production workflows. He specializes in creating dynamic, engaging content that captures attention and drives action. His collaborative approach with the production team ensures that the final product exceeds client expectations while maintaining the Palmer House standard of excellence."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden font-sans relative">
      {/* Fixed 4-Color Background Bars */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <div className="w-full h-full flex">
          <div className="w-1/4 h-full bg-pal-orange"></div>
          <div className="w-1/4 h-full bg-pal-purple"></div>
          <div className="w-1/4 h-full bg-pal-green"></div>
          <div className="w-1/4 h-full bg-pal-blue"></div>
        </div>
      </div>
      <MetaTags 
        title="Our Video Production Team | Palmer House Productions"
        description="Get to know the creative professionals behind Palmer House Productions - Jevoy Palmer, Kyli Lora, and Trenton Sims. Expert video production team in Seattle."
        keywords="Palmer House Productions team, Jevoy Palmer, video production team, Seattle creative professionals, video editing experts"
        ogTitle="Meet Our Team | Palmer House Productions"
        ogDescription="Get to know the creative professionals behind Palmer House Productions - Jevoy Palmer, Kyli Lora, and Trenton Sims. Expert video production team in Seattle."
      />
      <GoogleAnalytics measurementId="G-HTFNMQRWLL" />
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Navigation />
      <StructuredData />
      <BreadcrumbNavigation />
      <MainContent>
        <section className="pt-24 pb-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Hero Section - White Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl text-center mb-12">
              <div className="inline-block px-6 py-3 bg-pal-purple text-white font-bold text-lg mb-8 rounded-full video-shadow">
                👥 Meet Your Team
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black mb-8 text-corporate-dark tracking-tight">
                The <span className="text-pal-purple">Palmer House</span> Team
              </h1>
              <p className="text-lg xl:text-xl text-corporate-gray max-w-4xl mx-auto font-medium leading-relaxed">
                The dedicated professionals behind every compelling story and successful campaign. We're not just a production company—we're your creative partners in building authentic brand experiences.
              </p>
            </div>

            {/* Team Members - White Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl mb-12">
              <div className="space-y-16">
                {teamMembers.map((member, index) => (
                  <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                    <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <div className="aspect-square w-full max-w-md mx-auto rounded-3xl overflow-hidden video-shadow-lg group">
                        <img 
                          src={member.image} 
                          alt={`${member.name}, ${member.role} at Palmer House Productions`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                    
                    <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                      <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-display font-black text-corporate-dark">{member.name}</h2>
                        <h3 className={`text-xl md:text-2xl font-bold text-${member.palColor}`}>
                          {member.role}
                        </h3>
                        <p className="text-corporate-gray leading-relaxed text-lg">
                          {member.bio}
                        </p>
                        <p className="text-corporate-gray leading-relaxed text-base">
                          {member.longBio}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Values Section - White Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-corporate-dark mb-8">
                What Drives Our <span className="text-pal-green">Team</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="bg-gradient-to-br from-pal-orange/10 to-pal-orange/5 p-6 rounded-2xl border border-pal-orange/20">
                  <div className="text-3xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-3">Purpose-Driven</h3>
                  <p className="text-corporate-gray">Every project serves your mission, not just our portfolio.</p>
                </div>
                <div className="bg-gradient-to-br from-pal-purple/10 to-pal-purple/5 p-6 rounded-2xl border border-pal-purple/20">
                  <div className="text-3xl mb-4">🤝</div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-3">Collaborative</h3>
                  <p className="text-corporate-gray">Your vision guides every creative decision we make.</p>
                </div>
                <div className="bg-gradient-to-br from-pal-green/10 to-pal-green/5 p-6 rounded-2xl border border-pal-green/20">
                  <div className="text-3xl mb-4">🎨</div>
                  <h3 className="text-xl font-bold text-corporate-dark mb-3">Authentic</h3>
                  <p className="text-corporate-gray">We capture truth, not performance—because real resonates.</p>
                </div>
              </div>
              <p className="text-lg xl:text-xl text-corporate-gray max-w-3xl mx-auto font-medium leading-relaxed">
                We're not just makers of content. We're creators of possibility, helping bold brands chart new creative territory with every project.
              </p>
            </div>
          </div>
        </section>
      </MainContent>
    </div>
  );
};

export default Team;