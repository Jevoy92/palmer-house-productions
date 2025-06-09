
export const Clients = () => {
  const clientTypes = [
    {
      title: "Trailblazing Founders",
      description: "Growing businesses ready to chart new territories with polish and purpose",
      icon: "🗺️",
      gradient: "gradient-social-1"
    },
    {
      title: "Creative Pathfinders", 
      description: "Experts and creatives who want to become memorable thought leaders on uncharted ground",
      icon: "🧭",
      gradient: "gradient-social-2"
    },
    {
      title: "Story Explorers",
      description: "Coaches, personal brands, and agencies selling with authentic narratives, not spam",
      icon: "⭐",
      gradient: "gradient-social-3"
    },
    {
      title: "Premium Adventurers",
      description: "High-end service providers and premium products with visual standards that match their journey",
      icon: "🌟",
      gradient: "gradient-social-4"
    },
    {
      title: "Bold Territory Builders",
      description: "Anyone ready to scale with clarity, style, and integrity while blazing their own trail",
      icon: "🚀",
      gradient: "gradient-social-5"
    },
    {
      title: "Vision Pioneers",
      description: "Industry disruptors and innovators who need their brand to match their breakthrough thinking",
      icon: "💎",
      gradient: "gradient-social-1"
    }
  ];

  return (
    <section id="clients" className="py-32 bg-corporate-light relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 gradient-social-2 rounded-full opacity-10 float-animation"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 gradient-social-4 rounded-full opacity-10 float-animation" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 gradient-social-1 rounded-full opacity-15 float-animation" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-block px-6 py-3 gradient-social-4 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            🏕️ Fellow Adventurers
          </div>
          <h2 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
            Who We <span className="text-gradient-2">Explore</span> With
          </h2>
          <p className="text-2xl text-corporate-gray max-w-4xl mx-auto font-medium leading-tight">
            We work with brands who are tired of following the beaten path. 
            <br />
            <span className="text-gradient-1 font-bold">Visionaries who've outgrown templates</span> and founders ready to <span className="text-gradient-3 font-bold">chart new creative territories</span>.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {clientTypes.map((client, index) => (
            <div 
              key={index}
              className="group p-8 bg-video-white rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-500 hover:scale-105"
            >
              <div className={`w-16 h-16 ${client.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{client.icon}</span>
              </div>
              <h3 className="text-2xl font-display font-black mb-4 text-corporate-dark">
                {client.title}
              </h3>
              <p className="text-corporate-gray leading-relaxed text-lg font-medium">
                {client.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Explorer CTA Section */}
        <div className="text-center p-12 gradient-social-1 rounded-3xl video-shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full"></div>
          </div>
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Ready to Blaze Your Own Trail?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto font-medium">
              If you know your brand is bigger than what the world's seen so far, 
              <br />
              <span className="font-bold">you're in the right place</span>.
            </p>
            <button className="px-10 py-5 bg-video-white text-corporate-dark font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow">
              Start the Adventure 🌟
            </button>
          </div>
        </div>
        
        {/* Explorer Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-black text-gradient-1 mb-2">∞</div>
            <div className="text-corporate-gray font-medium">Uncharted Possibilities</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-black text-gradient-2 mb-2">100%</div>
            <div className="text-corporate-gray font-medium">Authentic Storytelling</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-black text-gradient-3 mb-2">1st</div>
            <div className="text-corporate-gray font-medium">To Break New Ground</div>
          </div>
        </div>
      </div>
    </section>
  );
};
