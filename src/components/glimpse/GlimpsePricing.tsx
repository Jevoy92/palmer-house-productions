
export const GlimpsePricing = () => {
  const packages = [
    {
      name: "Base Glimpse",
      icon: "🎒",
      price: "$350",
      features: [
        "1-hour session",
        "Home page or single flow",
        "Screen share + recording",
        "7-day hosted link"
      ],
      gradient: "gradient-social-1",
      highlight: false,
      calendlyUrl: "https://calendly.com/palmerhouseproductions-info/the-glimpse"
    },
    {
      name: "Full Glimpse",
      icon: "🧭",
      price: "$750",
      features: [
        "2-hour session",
        "Up to 2 flows (e.g. onboarding + booking)",
        "Strategy snapshot PDF",
        "30-day hosted link"
      ],
      gradient: "gradient-social-2",
      highlight: true,
      calendlyUrl: "https://calendly.com/palmerhouseproductions-info/the-full-glimpse"
    }
  ];

  const addOns = [
    { name: "Additional flows", price: "$100 each" },
    { name: "Personalized walkthrough video", price: "$200" },
    { name: "Priority booking", price: "+$50" }
  ];

  const handleBooking = (calendlyUrl: string) => {
    window.open(calendlyUrl, '_blank');
  };

  return (
    <section className="py-32 bg-video-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 gradient-social-2 rounded-full opacity-10 float-animation"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 gradient-social-4 rounded-full opacity-10 float-animation" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-block px-6 py-3 gradient-social-3 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            🗺️ Offer Packages
          </div>
          <h2 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
            Choose Your <span className="text-gradient-1">Glimpse</span>
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {packages.map((pkg, index) => (
            <div 
              key={index}
              className={`relative p-8 bg-corporate-light rounded-3xl transition-all duration-500 video-shadow hover:video-shadow-lg group overflow-hidden ${
                pkg.highlight 
                  ? 'scale-105 border-2 border-transparent' 
                  : 'hover:scale-105'
              }`}
            >
              {pkg.highlight && (
                <div className="mb-4 text-center">
                  <div className="inline-block gradient-social-2 text-white px-4 py-2 rounded-full text-sm font-bold video-shadow">
                    🌟 Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className={`w-16 h-16 ${pkg.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  {pkg.icon}
                </div>
                <h3 className="text-3xl font-display font-black text-corporate-dark mb-3">{pkg.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-black text-corporate-dark">{pkg.price}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <div className={`w-3 h-3 ${pkg.gradient} rounded-full mt-2 flex-shrink-0`}></div>
                    <span className="text-corporate-gray leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handleBooking(pkg.calendlyUrl)}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  pkg.highlight
                    ? `${pkg.gradient} text-white hover:scale-105 video-shadow`
                    : `border-2 border-corporate-gray text-corporate-dark hover:bg-corporate-dark hover:text-white hover:scale-105`
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
        
        <div className="bg-corporate-light rounded-3xl p-8 video-shadow">
          <h3 className="text-3xl font-display font-black text-corporate-dark mb-6 text-center">Optional Add-Ons</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="text-center p-6 bg-video-white rounded-2xl video-shadow">
                <div className="font-bold text-corporate-dark mb-2">{addon.name}</div>
                <div className="text-gradient-2 font-black text-xl">{addon.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
