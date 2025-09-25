export const Team = () => {
  const teamMembers = [
    {
      name: "Jevoy Palmer",
      role: "Founder & CEO",
      image: "/lovable-uploads/945e6d63-02d8-4c0d-a4ae-b691cc806a74.png",
      bio: "Jevoy is the visionary behind Palmer House Productions. A filmmaker, strategist, and storyteller at heart, he leads with the belief that video isn't just content—it's a business tool. Known for making even the most camera-shy clients feel confident on set, he's passionate about turning complex ideas into cinematic clarity.",
      palColor: "pal-purple"
    },
    {
      name: "Trenton Sims", 
      role: "Lead Editor",
      image: "/lovable-uploads/2537d3fc-b210-4170-93a2-d927fe38eea0.png",
      bio: "Trenton is the post-production powerhouse behind our visual storytelling. With a knack for turning raw footage into compelling narratives, he brings each client's vision to life through clean cuts, creative pacing, and platform-ready delivery. His work is where the magic comes together.",
      palColor: "pal-orange"
    }
  ];

  return (
    <section id="team" className="py-16 sm:py-24 lg:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Team Section - White Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl">
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-3 bg-pal-orange text-white font-bold text-lg mb-8 rounded-full video-shadow">
              👥 Our Team
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black mb-6 text-corporate-dark tracking-tight">
              The <span className="text-pal-orange">Palmer House</span> Team
            </h2>
            <p className="text-lg xl:text-xl text-corporate-gray max-w-4xl mx-auto font-medium leading-relaxed">
              Meet the video production professionals who bring your stories to life.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="group text-center"
              >
                {/* Photo Container */}
                <div className="relative mb-8">
                  <div className={`absolute inset-0 bg-${member.palColor}/20 rounded-3xl group-hover:bg-${member.palColor}/30 transition-colors duration-300`}></div>
                  <div className="relative aspect-square w-full rounded-3xl overflow-hidden video-shadow group-hover:video-shadow-lg transition-all duration-500 group-hover:scale-105">
                    <img 
                      src={member.image} 
                      alt={`${member.name}, ${member.role} at Palmer House Productions - Professional video production team member`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-black text-corporate-dark mb-2">{member.name}</h3>
                <h4 className={`text-lg md:text-xl font-bold mb-6 text-${member.palColor}`}>
                  {member.role}
                </h4>
                <p className="text-corporate-gray leading-relaxed text-base md:text-lg font-medium">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
