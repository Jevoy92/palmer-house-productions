export const Team = () => {
  const teamMembers = [
    {
      name: "Jevoy Palmer",
      role: "Founder & CEO",
      image: "/lovable-uploads/945e6d63-02d8-4c0d-a4ae-b691cc806a74.png",
      bio: "Jevoy is the visionary behind Palmer House Productions. A filmmaker, strategist, and storyteller at heart, he leads with the belief that video isn't just content—it's a business tool. Known for making even the most camera-shy clients feel confident on set, he's passionate about turning complex ideas into cinematic clarity.",
      gradient: "gradient-social-3", 
      textGradient: "text-gradient-3"
    },
    {
      name: "Kyli Lora",
      role: "Executive Production Assistant",
      image: "/lovable-uploads/dcada800-4488-4970-82eb-2c356d3e789d.png",
      bio: "Kyli keeps the wheels turning at Palmer House Productions. From client communication and scheduling to on-set logistics and post-production prep, she's the calm in the creative storm. With a sharp eye for detail and a heart for service, she ensures every project runs smoothly from start to finish.",
      gradient: "gradient-social-1",
      textGradient: "text-gradient-1"
    },
    {
      name: "Trenton Sims", 
      role: "Lead Editor",
      image: "/lovable-uploads/2537d3fc-b210-4170-93a2-d927fe38eea0.png",
      bio: "Trenton is the post-production powerhouse behind our visual storytelling. With a knack for turning raw footage into compelling narratives, he brings each client's vision to life through clean cuts, creative pacing, and platform-ready delivery. His work is where the magic comes together.",
      gradient: "gradient-social-2",
      textGradient: "text-gradient-2"
    }
  ];

  return (
    <section id="team" className="py-32 bg-cinematic-charcoal/50 backdrop-blur-sm relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-64 h-64 gradient-social-1 rounded-full opacity-10 float-animation"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 gradient-social-2 rounded-full opacity-10 float-animation" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 px-4">
          <div className="inline-block px-4 py-2 gradient-social-2 rounded-full text-white font-bold text-sm mb-6 video-shadow mobile-touch-target">
            👥 Our Team
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-black mb-6 text-video-white tracking-tight">
            The <span className="text-gradient-2">Palmer House</span> Team
          </h2>
          <p className="text-base md:text-lg text-video-white/80 max-w-3xl mx-auto font-medium leading-relaxed">
            Meet the video production professionals who bring your stories to life.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="group text-center"
            >
              {/* Photo Container */}
              <div className="relative mb-8">
                <div className={`absolute inset-0 ${member.gradient} rounded-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
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

              <h3 className="text-xl md:text-2xl font-display font-black text-video-white mb-2">{member.name}</h3>
              <h4 className={`text-base md:text-lg font-bold mb-4 ${member.textGradient}`}>
                {member.role}
              </h4>
              <p className="text-video-white/80 leading-relaxed text-sm md:text-base font-medium">
                {member.bio}
              </p>
              
              {/* Social Icons Placeholder */}
              <div className="flex justify-center space-x-4 mt-6">
                <div className={`w-10 h-10 ${member.gradient} rounded-full opacity-60 hover:opacity-100 transition-opacity cursor-pointer`}></div>
                <div className={`w-10 h-10 ${member.gradient} rounded-full opacity-60 hover:opacity-100 transition-opacity cursor-pointer`}></div>
                <div className={`w-10 h-10 ${member.gradient} rounded-full opacity-60 hover:opacity-100 transition-opacity cursor-pointer`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
