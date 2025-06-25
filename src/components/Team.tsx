
export const Team = () => {
  const teamMembers = [
    {
      name: "Kyli Nelson",
      role: "Executive Production Assistant",
      image: "/lovable-uploads/dcada800-4488-4970-82eb-2c356d3e789d.png",
      bio: "Kyli keeps the wheels turning at Palmer House Productions. From client communication and scheduling to on-set logistics and post-production prep, she's the calm in the creative storm. With a sharp eye for detail and a heart for service, she ensures every project runs smoothly from start to finish.",
      gradient: "gradient-social-1",
      textGradient: "text-gradient-1"
    },
    {
      name: "Trenton Hayes", 
      role: "Lead Editor",
      image: "/lovable-uploads/2537d3fc-b210-4170-93a2-d927fe38eea0.png",
      bio: "Trenton is the post-production powerhouse behind our visual storytelling. With a knack for turning raw footage into compelling narratives, he brings each client's vision to life through clean cuts, creative pacing, and platform-ready delivery. His work is where the magic comes together.",
      gradient: "gradient-social-2",
      textGradient: "text-gradient-2"
    },
    {
      name: "Jevoy Palmer",
      role: "Founder & CEO",
      image: "/lovable-uploads/945e6d63-02d8-4c0d-a4ae-b691cc806a74.png",
      bio: "Jevoy is the visionary behind Palmer House Productions. A filmmaker, strategist, and storyteller at heart, he leads with the belief that video isn't just content—it's a business tool. Known for making even the most camera-shy clients feel confident on set, he's passionate about turning complex ideas into cinematic clarity.",
      gradient: "gradient-social-3", 
      textGradient: "text-gradient-3"
    }
  ];

  return (
    <section id="team" className="py-32 bg-video-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-64 h-64 gradient-social-1 rounded-full opacity-10 float-animation"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 gradient-social-2 rounded-full opacity-10 float-animation" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-block px-6 py-3 gradient-social-2 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            🏕️ Meet Your Team
          </div>
          <h2 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
            The <span className="text-gradient-2">Palmer House</span> Team
          </h2>
          <p className="text-2xl text-corporate-gray max-w-3xl mx-auto font-medium">
            The dedicated professionals behind every compelling story and successful campaign.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12">
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
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              <h3 className="text-3xl font-display font-black text-corporate-dark mb-3">{member.name}</h3>
              <h4 className={`text-xl font-bold mb-6 ${member.textGradient}`}>
                {member.role}
              </h4>
              <p className="text-corporate-gray leading-relaxed text-lg font-medium">
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
