
import { useState } from 'react';

export const Pricing = () => {
  const [commitment, setCommitment] = useState<'monthly' | '3-month' | '6-month'>('monthly');

  const getDiscount = () => {
    switch (commitment) {
      case '3-month': return 0.10;
      case '6-month': return 0.20;
      default: return 0;
    }
  };

  const calculatePrice = (basePrice: number) => {
    const discount = getDiscount();
    return Math.round(basePrice * (1 - discount));
  };

  const calculateSavings = (basePrice: number) => {
    const discount = getDiscount();
    return Math.round(basePrice * discount);
  };

  const pricingTiers = [
    {
      name: "Trailhead",
      icon: "🥾",
      basePrice: 1500,
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
      highlight: false,
      gradient: "gradient-social-1",
      action: "contact"
    },
    {
      name: "Basecamp",
      icon: "🏕",
      basePrice: 3500,
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
      highlight: true,
      gradient: "gradient-social-2",
      action: "contact"
    },
    {
      name: "Summit",
      icon: "🏔",
      basePrice: 7500,
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
      highlight: false,
      gradient: "gradient-social-3",
      action: "contact"
    },
    {
      name: "Monthly Hosting",
      icon: "🌄",
      basePrice: 20000,
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
      highlight: false,
      gradient: "gradient-social-4",
      action: "contact"
    }
  ];

  const handleStartJourney = (tierName: string, action: string) => {
    if (action === "contact") {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    console.log(`Starting journey for: ${tierName}`);
  };

  const handleStrategyCall = () => {
    window.open('https://calendly.com/palmerhouseproductions-info/general-strategy-call', '_blank');
  };

  return (
    <section id="pricing" className="pt-48 pb-32 bg-corporate-light relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 gradient-social-2 rounded-full opacity-10 float-animation"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 gradient-social-4 rounded-full opacity-10 float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 gradient-social-1 rounded-full opacity-15 float-animation" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-block px-6 py-3 gradient-social-3 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            🗺️ Service Packages
          </div>
          <h2 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
            Choose Your <span className="text-gradient-1">Package</span>
          </h2>
          
          {/* Commitment Toggle */}
          <div className="mb-12">
            <div className="inline-flex bg-video-white rounded-2xl p-2 video-shadow">
              <button
                onClick={() => setCommitment('monthly')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  commitment === 'monthly'
                    ? 'gradient-social-1 text-white video-shadow'
                    : 'text-corporate-gray hover:text-corporate-dark'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setCommitment('3-month')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  commitment === '3-month'
                    ? 'gradient-social-1 text-white video-shadow'
                    : 'text-corporate-gray hover:text-corporate-dark'
                }`}
              >
                3-Month
                <span className="ml-2 text-xs bg-social-green text-white px-2 py-1 rounded-full">10% OFF</span>
              </button>
              <button
                onClick={() => setCommitment('6-month')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  commitment === '6-month'
                    ? 'gradient-social-1 text-white video-shadow'
                    : 'text-corporate-gray hover:text-corporate-dark'
                }`}
              >
                6-Month
                <span className="ml-2 text-xs bg-social-green text-white px-2 py-1 rounded-full">20% OFF</span>
              </button>
            </div>
          </div>

          <div className="text-2xl text-corporate-gray max-w-5xl mx-auto space-y-6 font-medium leading-tight">
            <p>Not all journeys are the same—neither are our video solutions.</p>
            <p>
              At Palmer House Productions, we don't offer one-offs or generic content. We create <span className="text-gradient-2 font-bold">handcrafted, high-impact video experiences</span> designed to solve real business problems. That's why every path we offer is a fully guided expedition: built for growth, backed by strategy, and designed to get results on the platforms that matter most to your audience.
            </p>
            <p>Whether you're just starting your brand story or scaling to new heights, there's a <span className="text-gradient-3 font-bold">pathway that's right for your journey</span>.</p>
          </div>
          <div className="mt-12 text-corporate-gray text-4xl tracking-widest">⸻ ⸻ ⸻</div>
        </div>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
          {pricingTiers.map((tier, index) => {
            const currentPrice = calculatePrice(tier.basePrice);
            const savings = calculateSavings(tier.basePrice);
            
            return (
              <div 
                key={index}
                className={`relative p-8 bg-video-white rounded-3xl transition-all duration-500 video-shadow hover:video-shadow-lg group overflow-hidden ${
                  tier.highlight 
                    ? 'scale-105 border-2 border-transparent' 
                    : 'hover:scale-105'
                }`}
              >
                {tier.highlight && (
                  <div className="mb-4 text-center">
                    <div className="inline-block gradient-social-2 text-white px-4 py-2 rounded-full text-sm font-bold video-shadow">
                      🌟 Most Popular
                    </div>
                  </div>
                )}
                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500">
                  <div className={`w-full h-full ${tier.gradient} rounded-3xl`}></div>
                </div>
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 ${tier.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      {tier.icon}
                    </div>
                    <h3 className="text-3xl font-display font-black text-corporate-dark mb-3 group-hover:text-gradient-1 transition-all duration-300">{tier.name}</h3>
                    <div className="mb-2">
                      <span className="text-5xl font-black text-corporate-dark">${currentPrice.toLocaleString()}</span>
                      <span className="text-corporate-gray text-xl">{tier.period}</span>
                    </div>
                    {savings > 0 && (
                      <div className="mb-4">
                        <span className="bg-social-green text-white px-3 py-1 rounded-full text-sm font-bold">
                          You save ${savings.toLocaleString()}/month
                        </span>
                      </div>
                    )}
                    <p className="text-corporate-gray leading-relaxed font-medium">{tier.description}</p>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className={`w-3 h-3 ${tier.gradient} rounded-full mt-2 flex-shrink-0`}></div>
                        <span className="text-corporate-gray leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mb-8 p-4 bg-corporate-light rounded-2xl">
                    <p className="text-sm text-corporate-gray mb-2 font-bold">Perfect for:</p>
                    <p className="text-sm text-corporate-dark leading-relaxed">{tier.perfectFor}</p>
                  </div>
                  
                  <button 
                    onClick={() => handleStartJourney(tier.name, tier.action)}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                      tier.highlight
                        ? `${tier.gradient} text-white hover:scale-105 video-shadow`
                        : `border-2 border-corporate-gray text-corporate-dark hover:bg-corporate-dark hover:text-white hover:scale-105`
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center">
          <div className="text-corporate-gray text-4xl mb-12 tracking-widest">⸻ ⸻ ⸻</div>
          <div className="inline-block px-8 py-4 gradient-social-4 rounded-full text-white font-bold text-xl mb-8 video-shadow-lg">
            🧭 Need Direction?
          </div>
          <h3 className="text-5xl md:text-6xl font-display font-black mb-10 text-corporate-dark leading-tight">
            Which Package Is Right <span className="text-gradient-2">For You?</span>
          </h3>
          <p className="text-2xl text-corporate-gray mb-12 max-w-4xl mx-auto font-medium leading-relaxed">
            If you're not sure where to begin, don't worry. Every great adventure starts with a <span className="text-gradient-1 font-bold">strategy call</span>.
            <br />
            Let's map out your journey together.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            <div className="p-8 bg-video-white rounded-3xl video-shadow">
              <div className="text-5xl font-black text-gradient-1 mb-4">∞</div>
              <div className="text-lg text-corporate-gray font-semibold">Endless Possibilities</div>
            </div>
            <div className="p-8 bg-video-white rounded-3xl video-shadow">
              <div className="text-5xl font-black text-gradient-2 mb-4">1</div>
              <div className="text-lg text-corporate-gray font-semibold">Perfect Package</div>
            </div>
            <div className="p-8 bg-video-white rounded-3xl video-shadow">
              <div className="text-5xl font-black text-gradient-3 mb-4">100%</div>
              <div className="text-lg text-corporate-gray font-semibold">Authentic Journey</div>
            </div>
          </div>
          
          <button 
            onClick={handleStrategyCall}
            className="px-12 py-6 gradient-social-1 text-white font-bold rounded-3xl hover:scale-105 transition-all duration-300 text-xl video-shadow-lg"
          >
            Book My Strategy Call →
          </button>
        </div>
      </div>
    </section>
  );
};
