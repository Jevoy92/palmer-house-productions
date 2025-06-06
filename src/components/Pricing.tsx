
export const Pricing = () => {
  const pricingTiers = [
    {
      name: "Trailhead",
      icon: "🥾",
      price: "$1,500",
      period: "/month",
      description: "For solo adventurers and early-stage businesses ready to explore the power of video.",
      features: [
        "Up to 4 minutes of premium content",
        "1 dedicated shoot day/month",
        "1x monthly strategy session",
        "Pre-shoot coaching",
        "Monthly success check-in",
        "Basic analytics & reporting",
        "Ideal for: Instagram, TikTok",
        "Suggested formats: 15 TikTok shorts, 2x 2-min Reels, or a 4-min flagship video"
      ],
      perfectFor: "solopreneurs, service providers, and small but mighty teams (1–5) carving out their space.",
      highlight: false
    },
    {
      name: "Basecamp",
      icon: "🏕",
      price: "$3,500",
      period: "/month",
      description: "For growing teams ready to establish a stronger presence across multiple platforms.",
      features: [
        "10 minutes of content",
        "2 shoot days/month",
        "2x strategy sessions",
        "Multi-campaign content blueprint",
        "Premiere editing",
        "Enhanced analytics",
        "Ideal for: Instagram, TikTok, LinkedIn, Facebook",
        "Suggested formats: 6–10 short-form videos, LinkedIn reels, or platform-specific deep dives"
      ],
      perfectFor: "teams of 5–20, e-commerce brands, regional service pros, and businesses scaling up.",
      highlight: true
    },
    {
      name: "Summit",
      icon: "🏔",
      price: "$7,500",
      period: "/month",
      description: "For regional brands and agencies pushing for authority, consistency, and scale.",
      features: [
        "25 minutes of content",
        "Flexible shoot schedule",
        "Weekly strategy sessions",
        "Cross-platform content campaign design",
        "Dedicated account lead",
        "Deep-dive analytics & ROI reporting",
        "Ideal for: YouTube, LinkedIn, Instagram, TikTok",
        "Suggested formats: Full series rollouts, weekly videos, evergreen assets + monthly content stack"
      ],
      perfectFor: "teams of 20–100, agencies, B2B pros, and companies needing a proven rhythm to their visibility.",
      highlight: false
    },
    {
      name: "Horizon",
      icon: "🌄",
      price: "$20,000",
      period: "/month",
      description: "For large enterprises and organizations who demand premium content, data, and agility—without compromise.",
      features: [
        "75 minutes of cinematic content",
        "Unlimited shoot days",
        "Weekly + quarterly strategy",
        "Dedicated pre-production manager",
        "Real-time analytics dashboard",
        "Platform optimization & advanced scaling",
        "Ideal for: all major platforms, internal comms, ad campaigns, training assets"
      ],
      perfectFor: "national franchises, elite agencies, and organizations ready to dominate their space with unforgettable content.",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-sage">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-warm-cream">✦ Choose Your Path</h2>
          <div className="text-lg text-stone-gray max-w-4xl mx-auto space-y-4">
            <p>Not all journeys are the same—neither are our video solutions.</p>
            <p>
              At Palmer House Productions, we don't offer one-offs or generic content. We create handcrafted, 
              high-impact video experiences designed to solve real business problems. That's why every path we 
              offer is a fully guided expedition: built for growth, backed by strategy, and designed to get 
              results on the platforms that matter most to your audience.
            </p>
            <p>Whether you're just starting your brand story or scaling to new heights, there's a pathway that's right for your journey.</p>
          </div>
          <div className="mt-8 text-warm-orange text-2xl">⸻</div>
        </div>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-lg border transition-all duration-300 ${
                tier.highlight 
                  ? 'border-warm-orange bg-gradient-to-b from-warm-orange/10 to-earth-brown/10 scale-105' 
                  : 'border-earth-brown-light bg-earth-brown/50 hover:border-warm-orange/50'
              } group`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-warm-orange to-warm-orange-dark text-earth-brown-dark px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className="text-3xl mb-3">{tier.icon}</div>
                <h3 className="text-2xl font-bold text-warm-orange mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-warm-cream">{tier.price}</span>
                  <span className="text-stone-gray">{tier.period}</span>
                </div>
                <p className="text-stone-gray text-sm leading-relaxed">{tier.description}</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-warm-orange rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-stone-gray text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mb-8">
                <p className="text-xs text-stone-gray mb-2">Perfect for:</p>
                <p className="text-sm text-warm-cream leading-relaxed">{tier.perfectFor}</p>
              </div>
              
              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                tier.highlight
                  ? 'bg-gradient-to-r from-warm-orange to-warm-orange-dark text-earth-brown-dark hover:from-warm-orange-light hover:to-warm-orange'
                  : 'border border-warm-orange text-warm-orange hover:bg-warm-orange hover:text-earth-brown-dark'
              }`}>
                Choose This Path
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="text-warm-orange text-2xl mb-6">⸻</div>
          <h3 className="text-2xl font-bold text-warm-cream mb-4">🧭 Which Path Is Right For You?</h3>
          <p className="text-lg text-stone-gray mb-8">
            If you're not sure where to begin, don't worry. Every journey starts with a strategy call.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-warm-orange to-warm-orange-dark text-earth-brown-dark font-semibold rounded-lg hover:from-warm-orange-light hover:to-warm-orange transition-all duration-300 text-lg">
            Book My Call →
          </button>
        </div>
      </div>
    </section>
  );
};
