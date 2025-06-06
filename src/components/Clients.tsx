
export const Clients = () => {
  const clientTypes = [
    "Founders and growing businesses ready to show up with polish and purpose",
    "Creatives and experts who want to become memorable thought leaders",
    "Coaches, personal brands, and agencies selling with story, not spam",
    "High-end service providers and premium products with visual standards to match",
    "Anyone ready to scale with clarity, style, and integrity"
  ];

  return (
    <section className="py-20 bg-sage-dark">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-warm-cream">Who We Work With</h2>
          <p className="text-xl text-stone-gray max-w-3xl mx-auto">
            We work with people who are tired of blending in. Brands that have outgrown templates. 
            Founders with vision but no map.
          </p>
        </div>
        
        <div className="space-y-6">
          {clientTypes.map((client, index) => (
            <div 
              key={index}
              className="flex items-center space-x-6 p-6 bg-earth-brown/30 border-l-4 border-warm-orange rounded-r-lg hover:bg-earth-brown/50 transition-all duration-300 group"
            >
              <div className="text-2xl text-warm-orange group-hover:scale-110 transition-transform duration-300">
                ✦
              </div>
              <p className="text-lg text-stone-gray group-hover:text-warm-cream transition-colors duration-300">
                {client}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-warm-orange to-transparent mx-auto mb-8"></div>
          <p className="text-xl text-warm-orange font-semibold mb-4">
            If you know your business is bigger than what the world's seen so far, you're in the right place.
          </p>
        </div>
      </div>
    </section>
  );
};
