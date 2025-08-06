import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Video, Globe, TrendingUp, DollarSign, Play, Building, Zap, Crown } from "lucide-react";
import { FeaturesComparison } from "./pricing/FeaturesComparison";
import { BillingCycle } from "./pricing/BillingCycle";
import { PricingFAQ } from "./pricing/PricingFAQ";

export const PricingTrails = () => {
  const navigate = useNavigate();
  const [expandedTier, setExpandedTier] = useState<string | null>(null);
  const [isAnnualBilling, setIsAnnualBilling] = useState(false);

  const pricingPackages = [
    {
      tier: "Starter",
      monthlyPrice: 1500,
      annualSavings: 10,
      gradient: "gradient-social-1",
      color: "#8b5cf6",
      headerIcon: Play,
      popular: false,
      features: [
        { icon: Users, label: "Solo founders & small teams (1-5)", details: "Perfect for solopreneurs and service providers starting their video journey" },
        { icon: Video, label: "4 minutes content per month", details: "15 TikTok Shorts or 1 flagship 4-minute video with professional editing" },
        { icon: Globe, label: "Instagram & TikTok optimization", details: "Content optimized for the most engaging short-form platforms" },
        { icon: TrendingUp, label: "Monthly strategy & coaching", details: "Pre-shoot coaching and monthly success check-ins included" }
      ]
    },
    {
      tier: "Professional",
      monthlyPrice: 3500,
      annualSavings: 10,
      gradient: "gradient-social-2",
      color: "#f59e0b",
      headerIcon: Building,
      popular: true,
      features: [
        { icon: Users, label: "Growing teams & e-commerce (5-20)", details: "Ideal for scaling businesses and regional service professionals" },
        { icon: Video, label: "10 minutes content per month", details: "6-10 short-form videos with multi-message campaign approach" },
        { icon: Globe, label: "Instagram, LinkedIn & TikTok", details: "Cross-platform strategy for professional and social reach" },
        { icon: TrendingUp, label: "Enhanced analytics & 2 shoots", details: "Bi-weekly strategy sessions with campaign performance insights" }
      ]
    },
    {
      tier: "Enterprise",
      monthlyPrice: 7500,
      annualSavings: 10,
      gradient: "gradient-social-3",
      color: "#06b6d4",
      headerIcon: Zap,
      popular: false,
      features: [
        { icon: Users, label: "B2B brands & agencies (20-100)", details: "Perfect for established businesses building thought leadership" },
        { icon: Video, label: "25 minutes content per month", details: "Weekly episodic series with evergreen assets and authority content" },
        { icon: Globe, label: "All major platforms + YouTube", details: "Comprehensive strategy across long-form and short-form content" },
        { icon: TrendingUp, label: "Dedicated account lead & ROI", details: "Weekly strategy with dedicated support and lead generation focus" }
      ]
    },
    {
      tier: "Ultimate",
      monthlyPrice: 20000,
      annualSavings: 10,
      gradient: "gradient-social-4",
      color: "#ec4899",
      headerIcon: Crown,
      popular: false,
      features: [
        { icon: Users, label: "Enterprise & franchises (100+)", details: "National franchises and organizations with global reach" },
        { icon: Video, label: "75+ minutes unlimited shoots", details: "Complete asset library: ads, training, onboarding, and brand content" },
        { icon: Globe, label: "Omnichannel + internal systems", details: "Full platform presence plus internal communications and training" },
        { icon: TrendingUp, label: "Dedicated team & real-time analytics", details: "Pre-production manager, live dashboard, and on-demand support" }
      ]
    }
  ];

  const handlePackageClick = (tier: string) => {
    navigate('/contact', { state: { selectedTier: tier } });
  };

  const toggleExpanded = (tier: string) => {
    setExpandedTier(expandedTier === tier ? null : tier);
  };

  const handleBillingChange = (isAnnual: boolean) => {
    setIsAnnualBilling(isAnnual);
  };

  const calculatePrice = (monthlyPrice: number, annualSavings: number) => {
    if (isAnnualBilling) {
      const annualPrice = monthlyPrice * (1 - annualSavings / 100);
      return `$${annualPrice.toLocaleString()}/mo`;
    }
    return `$${monthlyPrice.toLocaleString()}/mo`;
  };

  return (
    <main>
      <section id="pricing" className="pt-24 md:pt-32 pb-24 bg-corporate-light relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-40 h-40 gradient-social-2 rounded-full opacity-10 float-animation"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 gradient-social-4 rounded-full opacity-10 float-animation" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 gradient-social-1 rounded-full opacity-15 float-animation" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <header className="text-center mb-16 md:mb-24">
            <div className="inline-block px-4 md:px-6 py-2 md:py-3 gradient-social-3 rounded-full text-white font-bold text-sm md:text-lg mb-6 md:mb-8 video-shadow">
              📊 Video Production Packages
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black mb-6 md:mb-8 text-corporate-dark tracking-tight leading-tight">
              Professional Video Production <span className="text-gradient-1">Pricing Plans</span>
            </h1>
            <div className="text-lg md:text-xl text-corporate-gray max-w-3xl mx-auto mb-8 md:mb-12 font-medium leading-relaxed">
              Choose the plan that fits your business needs and budget. All packages include strategy, filming, and professional editing.
            </div>
          </header>

          {/* Billing Cycle */}
          <BillingCycle onCycleChange={handleBillingChange} />

          {/* Mobile-First Package Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 md:mb-20">
            {pricingPackages.map((pkg) => (
              <div key={pkg.tier} className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${pkg.popular ? 'border-primary scale-105 md:scale-110' : 'border-gray-200'} hover:shadow-xl`}>
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}

                {/* Package Header */}
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 ${pkg.gradient} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                    <pkg.headerIcon size={28} color="white" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-corporate-dark mb-2">{pkg.tier}</h3>
                  <div className="text-3xl font-black text-corporate-dark">
                    {calculatePrice(pkg.monthlyPrice, pkg.annualSavings)}
                  </div>
                  {isAnnualBilling && (
                    <div className="text-sm text-green-600 font-medium">
                      Save {pkg.annualSavings}% annually
                    </div>
                  )}
                </div>

                {/* Features - Mobile Optimized */}
                <div className="space-y-3 mb-6">
                  {pkg.features.slice(0, expandedTier === pkg.tier ? undefined : 2).map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <feature.icon size={18} color={pkg.color} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-corporate-dark leading-tight">{feature.label}</p>
                        <p className="text-xs text-corporate-gray mt-1 leading-relaxed">{feature.details}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expand/Collapse for Mobile */}
                {pkg.features.length > 2 && (
                  <button
                    onClick={() => toggleExpanded(pkg.tier)}
                    className="w-full text-sm text-primary font-medium mb-4 hover:text-primary-dark transition-colors"
                  >
                    {expandedTier === pkg.tier ? 'Show Less' : `Show All ${pkg.features.length} Features`}
                  </button>
                )}

                {/* CTA Button */}
                <button
                  onClick={() => handlePackageClick(pkg.tier)}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 mobile-touch-target ${
                    pkg.popular 
                      ? 'bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg' 
                      : 'border-2 border-gray-300 text-corporate-dark hover:border-primary hover:text-primary'
                  }`}
                >
                  Get Started →
                </button>
              </div>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <section className="text-center">
            <div className="text-corporate-gray text-2xl md:text-4xl mb-8 md:mb-12 tracking-widest">⸻ ⸻ ⸻</div>
            <div className="inline-block px-6 md:px-8 py-3 md:py-4 gradient-social-4 rounded-full text-white font-bold text-lg md:text-xl mb-6 md:mb-8 video-shadow-lg">
              💼 Ready to Start?
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black mb-6 md:mb-10 text-corporate-dark leading-tight">
              Let's Find Your Perfect <span className="text-gradient-2">Package</span>
            </h2>
            <p className="text-lg md:text-xl text-corporate-gray mb-8 md:mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
              Every successful business needs professional video content. Tell us about your goals and we'll recommend the perfect plan.
            </p>
            
            <button 
              onClick={() => navigate('/contact')}
              className="px-8 md:px-12 py-4 md:py-6 gradient-social-1 text-white font-bold rounded-3xl hover:scale-105 transition-all duration-300 text-lg md:text-xl video-shadow-lg mobile-touch-target"
            >
              Start Your Project →
            </button>
          </section>
        </div>
      </section>

      {/* Sections with billing integration */}
      <FeaturesComparison isAnnualBilling={isAnnualBilling} />
      <PricingFAQ />
    </main>
  );
};
