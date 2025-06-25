
import { useState } from "react";
import { ContactWizard } from "./ContactWizard";
import { BillingCycle } from "./pricing/BillingCycle";

export const Pricing = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isAnnualBilling, setIsAnnualBilling] = useState(false);

  const handleBillingChange = (isAnnual: boolean) => {
    setIsAnnualBilling(isAnnual);
  };

  const calculatePrice = (monthlyPrice: number) => {
    if (isAnnualBilling) {
      const annualPrice = monthlyPrice * 0.9; // 10% discount
      return `$${annualPrice.toLocaleString()}`;
    }
    return `$${monthlyPrice.toLocaleString()}`;
  };
  
  const pricingTiers = [
    {
      name: "Trailhead",
      icon: "🥾",
      monthlyPrice: 1500,
      period: "/month",
      description: "For solo adventurers and early-stage businesses ready to explore the power of video.",
      features: [
        "Up to 4 minutes of premium content monthly",
        "1 dedicated shoot day per month",
        "1 monthly strategy session with pre-shoot coaching",
        "Monthly success check-ins and basic analytics",
        "Instagram & TikTok optimization",
        "Internal video support included",
        "15 TikTok Shorts or 1x 4-min flagship video",
        "Single-message promo campaign style"
      ],
      perfectFor: "solopreneurs, service providers, and small but mighty teams (1–5) carving out their space with social storytelling and promos.",
      highlight: false,
      gradient: "gradient-social-1"
    },
    {
      name: "Basecamp",
      icon: "🏕",
      monthlyPrice: 3500,
      period: "/month",
      description: "For growing teams ready to establish a stronger presence across multiple platforms.",
      features: [
        "10 minutes of premium content monthly",
        "2 dedicated shoot days per month",
        "2 strategy sessions with multi-campaign blueprint",
        "Enhanced analytics and monthly success check-ins",
        "Instagram, TikTok, LinkedIn & Facebook optimization",
        "6–10 short-form videos or LinkedIn reels",
        "Multi-message campaign approach",
        "Launch videos, intros, and explainer content"
      ],
      perfectFor: "teams of 5–20, e-commerce brands, regional service pros, and businesses scaling up with launch videos and explainers.",
      highlight: true,
      gradient: "gradient-social-2"
    },
    {
      name: "Summit",
      icon: "🏔",
      monthlyPrice: 7500,
      period: "/month",
      description: "For regional brands and agencies pushing for authority, consistency, and scale.",
      features: [
        "25 minutes of premium content monthly",
        "4 flexible shoot days with dedicated account lead",
        "Weekly strategy sessions with deep-dive analytics",
        "ROI & engagement insights with lead strategy integration",
        "YouTube, LinkedIn, Instagram & TikTok mastery",
        "Weekly episodic series or content stacks",
        "Full cross-platform strategy execution",
        "Funnel videos, deep dives, and evergreen series"
      ],
      perfectFor: "teams of 20–100, agencies, B2B pros, and companies needing a proven rhythm to their visibility with funnel videos and series.",
      highlight: false,
      gradient: "gradient-social-3"
    },
    {
      name: "Pinnacle",
      icon: "🌄",
      monthlyPrice: 20000,
      period: "/month",
      description: "For large enterprises and organizations who demand premium content, data, and agility—without compromise.",
      features: [
        "75 minutes of cinematic content monthly",
        "Unlimited shoot days with pre-production manager",
        "Weekly + quarterly strategy with real-time dashboard",
        "Slack/Direct access with on-demand support",
        "All major platforms + internal systems optimization",
        "Full asset library: ads, training, brand content",
        "Enterprise-level campaign systems",
        "Paid ads, global rollouts, and training assets"
      ],
      perfectFor: "national franchises, elite agencies, and organizations ready to dominate their space with paid ads, global rollouts, and training systems.",
      highlight: false,
      gradient: "gradient-social-4"
    }
  ];

  return (
    <>
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
              🗺️ Expedition Packages
            </div>
            <h2 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
              Choose Your <span className="text-gradient-1">Path</span>
            </h2>
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
            {pricingTiers.map((tier, index) => (
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
                    <div className="mb-6">
                      <div className="text-5xl font-black text-corporate-dark">
                        {calculatePrice(tier.monthlyPrice)}
                        {isAnnualBilling && (
                          <div className="text-sm text-green-600 font-medium mt-1">
                            Save 10% annually
                          </div>
                        )}
                      </div>
                      <div className="text-corporate-gray text-xl">{tier.period}</div>
                    </div>
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
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="text-corporate-gray text-4xl mb-12 tracking-widest">⸻ ⸻ ⸻</div>
            <div className="inline-block px-8 py-4 gradient-social-4 rounded-full text-white font-bold text-xl mb-8 video-shadow-lg">
              🧭 Ready to Begin?
            </div>
            <h3 className="text-5xl md:text-6xl font-display font-black mb-10 text-corporate-dark leading-tight">
              Let's Find Your Perfect <span className="text-gradient-2">Path</span>
            </h3>
            <p className="text-2xl text-corporate-gray mb-12 max-w-4xl mx-auto font-medium leading-relaxed">
              Every great adventure starts with choosing the right direction.
              <br />
              Tell us about your vision and we'll <span className="text-gradient-1 font-bold">craft your journey</span>.
            </p>
            
            <button 
              onClick={() => setIsWizardOpen(true)}
              className="px-12 py-6 gradient-social-1 text-white font-bold rounded-3xl hover:scale-105 transition-all duration-300 text-xl video-shadow-lg"
            >
              Choose Your Plan →
            </button>
          </div>
        </div>

        <ContactWizard 
          open={isWizardOpen} 
          onOpenChange={setIsWizardOpen}
          initialService="monthly"
        />
      </section>

      {/* Add Billing Cycle Component */}
      <BillingCycle onCycleChange={handleBillingChange} />
    </>
  );
};
