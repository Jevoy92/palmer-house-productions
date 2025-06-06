
export const Services = () => {
  const services = [
    "Short-form social video (Instagram, TikTok, LinkedIn, YouTube Shorts, Facebook)",
    "Long-form YouTube-ready content (interviews, explainers, launches, educational series)",
    "Script & content strategy sessions (monthly batch ideation + hooks)",
    "Brand storytelling films (about pages, brand launches, origin stories)",
    "Training & onboarding videos (internal/client-facing)",
    "Event filming & recap content",
    "Ad creatives and pre-launch buzz campaigns"
  ];

  return (
    <section id="services" className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">What We Offer</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            All services are part of our monthly subscription pathways
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-amber-400/50 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-amber-400 rounded-full mt-3 group-hover:scale-150 transition-transform duration-300"></div>
                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                  {service}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
            We specialize in handcrafted content that travels far and resonates deeply. Every video we create 
            is designed for emotional clarity and social momentum, helping our clients build recognition, 
            trust, and authority while staying true to their voice.
          </p>
          
          <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-semibold rounded-lg hover:from-amber-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105">
            Explore Subscriptions
          </button>
        </div>
      </div>
    </section>
  );
};
