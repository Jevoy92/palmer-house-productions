
export const Team = () => {
  const teamMembers = [
    {
      name: "Kyli Lora",
      role: "Executive Production Assistant",
      image: "/lovable-uploads/dcada800-4488-4970-82eb-2c356d3e789d.png",
      bio: "Storyteller and creative artist with expertise in film and music production."
    },
    {
      name: "Trenton Sims",
      role: "Video Editor & Animator", 
      image: "/lovable-uploads/2537d3fc-b210-4170-93a2-d927fe38eea0.png",
      bio: "Dynamic video editor and 3D animator with extensive production experience."
    },
    {
      name: "Jevoy Palmer",
      role: "Founder & Creative Director",
      image: "/lovable-uploads/945e6d63-02d8-4c0d-a4ae-b691cc806a74.png", 
      bio: "Creative strategist and visual storyteller specializing in authentic brand narratives."
    }
  ];

  return (
    <section id="team" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-sf font-semibold mb-6 text-black tracking-tight">Meet the Team</h2>
          <p className="text-xl text-apple-gray-4 max-w-2xl mx-auto">
            The creative minds behind every story.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="text-center group"
            >
              <div className="aspect-square w-full mb-8 rounded-3xl overflow-hidden bg-apple-gray apple-shadow group-hover:apple-shadow-lg transition-all duration-300">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-sf font-semibold text-black mb-2">{member.name}</h3>
              <h4 className="text-apple-blue font-medium mb-4">
                {member.role}
              </h4>
              <p className="text-apple-gray-4 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
