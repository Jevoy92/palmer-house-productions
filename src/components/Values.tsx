
export const Values = () => {
  const values = [
    { title: "Freedom", subtitle: "formulas", description: "We believe in creative freedom over rigid formulas" },
    { title: "Truth", subtitle: "trendiness", description: "Authentic storytelling over fleeting trends" },
    { title: "Clarity", subtitle: "complexity", description: "Clear communication over unnecessary complexity" },
    { title: "Emotion", subtitle: "ego", description: "Emotional connection over ego-driven content" },
    { title: "Craft", subtitle: "clout", description: "Quality craftsmanship over social media clout" }
  ];

  const vibeWords = ["Adventurous", "Creative", "Bold", "Authentic", "Elevated"];

  return (
    <section id="values" className="py-20 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">What We Value</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            And what you'll feel on our site
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-slate-800/30 rounded-lg border border-slate-700 hover:border-amber-400/50 transition-all duration-300 group"
            >
              <h3 className="text-2xl font-bold text-amber-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                {value.title}
              </h3>
              <div className="text-gray-500 mb-3">
                <span className="text-lg">></span> {value.subtitle}
              </div>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {value.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-8 text-white">Our Vibe in 5 Words</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {vibeWords.map((word, index) => (
              <span 
                key={index}
                className="px-6 py-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 text-amber-400 font-semibold rounded-full hover:from-amber-500/30 hover:to-orange-500/30 transition-all duration-300 transform hover:scale-105"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We don't make noisy content. We make necessary content—visuals that feel like you, 
            move like strategy, and leave an emotional fingerprint long after the scroll.
          </p>
        </div>
      </div>
    </section>
  );
};
