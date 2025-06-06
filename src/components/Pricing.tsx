
export const Pricing = () => {
  const pricingTiers = [
    {
      name: "Trailhead",
      price: "$1,500",
      period: "/month",
      description: "Perfect for getting started with professional video content",
      features: [
        "2-3 short-form videos per month",
        "Basic editing and color correction",
        "Social media optimization",
        "Monthly strategy call",
        "48-hour turnaround"
      ],
      highlight: false
    },
    {
      name: "Basecamp",
      price: "$3,500",
      period: "/month",
      description: "Ideal for consistent content creation and brand building",
      features: [
        "4-6 short-form videos per month",
        "1 long-form video per month",
        "Advanced editing and motion graphics",
        "Content strategy sessions",
        "Priority support",
        "24-hour turnaround"
      ],
      highlight: true
    },
    {
      name: "Summit",
      price: "$7,500",
      period: "/month",
      description: "Comprehensive video marketing for scaling businesses",
      features: [
        "8-10 short-form videos per month",
        "2-3 long-form videos per month",
        "Brand storytelling films",
        "Ad creative development",
        "Monthly batch ideation",
        "Same-day turnaround",
        "Dedicated project manager"
      ],
      highlight: false
    },
    {
      name: "Horizon",
      price: "$20,000",
      period: "/month",
      description: "White-glove service for enterprise-level content needs",
      features: [
        "Unlimited video content",
        "Custom cinematic productions",
        "Multi-location shoots",
        "Advanced post-production",
        "24/7 priority support",
        "Dedicated creative team",
        "Custom strategy development",
        "Event coverage included"
      ],
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Choose Your Pathway</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Subscription-based video production designed to scale with your vision
          </p>
        </div>
        
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index}
              className={`relative p-8 rounded-lg border transition-all duration-300 ${
                tier.highlight 
                  ? 'border-amber-400 bg-gradient-to-b from-amber-500/10 to-orange-500/10 scale-105' 
                  : 'border-slate-700 bg-slate-800/50 hover:border-amber-400/50'
              } group`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-amber-400 mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-gray-400">{tier.period}</span>
                </div>
                <p className="text-gray-400 text-sm">{tier.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                tier.highlight
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400'
                  : 'border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-950'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-300 mb-6">
            All pathways include unlimited revisions, monthly strategy sessions, and our signature cinematic approach.
          </p>
          <button className="px-8 py-3 border border-amber-400 text-amber-400 font-semibold rounded-lg hover:bg-amber-400 hover:text-slate-950 transition-all duration-300">
            Schedule a Discovery Call
          </button>
        </div>
      </div>
    </section>
  );
};
