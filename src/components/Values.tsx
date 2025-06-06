
export const Values = () => {
  const values = [
    { 
      emoji: "🧭", 
      title: "Freedom over Formulas", 
      description: "We break the template. Every brand has a wild edge—we help you find it and film it." 
    },
    { 
      emoji: "🔍", 
      title: "Truth over Trendiness", 
      description: "We don't chase what's viral. We tell stories with soul that actually mean something." 
    },
    { 
      emoji: "✨", 
      title: "Clarity over Complexity", 
      description: "Clear beats clever. Simple beats busy. If your audience doesn't feel it, they won't follow." 
    },
    { 
      emoji: "💥", 
      title: "Emotion over Ego", 
      description: "Connection > performance. We capture presence, not performance—because impact starts with honesty." 
    },
    { 
      emoji: "🛠️", 
      title: "Craft over Clout", 
      description: "Quality matters more than views. We build visuals that last, not just content that scrolls." 
    }
  ];

  const vibeWords = [
    { emoji: "🟤", word: "Adventurous" },
    { emoji: "🟤", word: "Creative" },
    { emoji: "🟤", word: "Bold" },
    { emoji: "🟤", word: "Authentic" },
    { emoji: "🟤", word: "Elevated" }
  ];

  return (
    <section id="values" className="py-20 bg-warm-beige">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-deep-charcoal">What We Value</h2>
          <p className="text-xl text-muted-gray max-w-4xl mx-auto leading-relaxed">
            These aren't just brand values—they're the rules of the road we travel by.
          </p>
          <div className="mt-8 text-accent-terracotta text-2xl">⸻</div>
        </div>
        
        <div className="space-y-8 max-w-4xl mx-auto mb-20">
          {values.map((value, index) => (
            <div 
              key={index}
              className="p-6 bg-cream-white/80 border border-warm-brown/20 rounded-lg hover:border-accent-terracotta/50 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="text-2xl">{value.emoji}</div>
                <div>
                  <h3 className="text-xl font-semibold text-accent-terracotta mb-3 group-hover:text-warm-brown transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-muted-gray leading-relaxed group-hover:text-deep-charcoal transition-colors duration-300">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mb-16">
          <div className="text-accent-terracotta text-2xl mb-8">⸻</div>
          <h3 className="text-3xl font-bold mb-6 text-deep-charcoal">Our Vibe in 5 Words</h3>
          <p className="text-lg text-muted-gray mb-8 max-w-3xl mx-auto">
            Because you should know what it feels like to work with us before you ever hit "Send."
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {vibeWords.map((item, index) => (
              <div 
                key={index}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-accent-terracotta/20 to-warm-brown/20 border border-accent-terracotta/30 text-accent-terracotta font-semibold rounded-full hover:from-accent-terracotta/30 hover:to-warm-brown/30 transition-all duration-300 transform hover:scale-105"
              >
                <span className="text-lg">{item.emoji}</span>
                <span>{item.word}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-accent-terracotta text-2xl mb-8">⸻</div>
          <h3 className="text-3xl font-bold mb-6 text-deep-charcoal">Our Work Doesn't Shout. It Echoes.</h3>
          <p className="text-lg text-muted-gray max-w-4xl mx-auto leading-relaxed">
            We don't make noise. We make movement—video content that feels aligned, moves like strategy, and leaves a lasting emotional fingerprint long after the scroll.
          </p>
        </div>
      </div>
    </section>
  );
};
