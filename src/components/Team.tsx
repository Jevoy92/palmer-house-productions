
export const Team = () => {
  const teamMembers = [
    {
      name: "Kyli Lora",
      role: "Executive Production Assistant",
      image: "/lovable-uploads/dcada800-4488-4970-82eb-2c356d3e789d.png",
      bio: "Based in Seattle, Kyli Lora is a multifaceted artist with a passion for storytelling through film and music. A recent graduate from the University of Washington, she's currently advancing her expertise in the UW Film & Video Production Certificate Program. Kyli has showcased her talents as an actress in productions like Teach (2019) and Tapestry Brewing (2025). Her musical endeavors include the album The Hourglass and singles like \"Mr. Rabbit and I\" reflecting her deep connection to storytelling."
    },
    {
      name: "Trenton Sims",
      role: "Video Editor & Animator", 
      image: "/lovable-uploads/2537d3fc-b210-4170-93a2-d927fe38eea0.png",
      bio: "Trenton Sims is a dynamic video editor and 3D animator with a rich background in both creative and technical aspects of production. His experience includes roles at BRON Studios and Palmer House Productions, where he contributed to various projects as a junior animator and video editor. Trenton's diverse skill set and innovative approach make him an invaluable asset to any creative team."
    },
    {
      name: "Jevoy Palmer",
      role: "Founder & Creative Director",
      image: "/lovable-uploads/945e6d63-02d8-4c0d-a4ae-b691cc806a74.png", 
      bio: "Born and raised in Kingston, Jamaica, Jevoy Palmer is a Seattle-based creative strategist and visual storyteller. As the founder of Palmer House Productions, he specializes in crafting subscription-based video systems that empower brands to move beyond the basics. Jevoy's approach is rooted in authenticity, creativity, and a deep understanding of his clients' unique journeys. His work reflects a commitment to storytelling, discovery, and exclusivity, ensuring that every project is a tailored, unforgettable content journey."
    }
  ];

  return (
    <section id="team" className="py-20 bg-cream-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-deep-charcoal">The Expedition Team</h2>
          <div className="mt-8 text-accent-terracotta text-2xl">⸻</div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-background border border-warm-beige rounded-lg p-6 hover:border-accent-terracotta/50 transition-all duration-300 group hover:shadow-lg"
            >
              <div className="aspect-square w-full mb-6 rounded-lg overflow-hidden bg-warm-beige/30">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-deep-charcoal mb-2">{member.name}</h3>
              <h4 className="text-accent-terracotta font-semibold mb-4 group-hover:text-warm-brown transition-colors duration-300">
                {member.role}
              </h4>
              <p className="text-muted-foreground leading-relaxed text-sm group-hover:text-foreground transition-colors duration-300">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
