import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRICING } from "@/lib/pricing";
import { Download, Users, Repeat, Wrench } from "lucide-react";
import { usePageTransition } from '@/components/PageTransition';

export const Pricing = () => {
  const navigate = useNavigate();
  const { transitionTo } = usePageTransition();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const pricingCategories = [
    {
      id: "business-assets",
      name: "Business Video Assets",
      icon: Users,
      description: "Internal & external video systems for business operations",
      priceRange: "$4,500 - $10,000+",
      gradient: "gradient-social-2",
      popular: true,
      items: Object.values(PRICING.BUSINESS_VIDEO_ASSETS),
      route: "/contact"
    },
    {
      id: "bundles",
      name: "Other Video Bundles",
      icon: Wrench, 
      description: "YouTube, launches, reels, and founder branding",
      priceRange: "$500 - $6,500",
      gradient: "gradient-social-4",
      items: Object.values(PRICING.OTHER_BUNDLES).slice(0, 4), // Show top 4
      route: "/contact"
    },
    {
      id: "diy",
      name: "DIY Digital Downloads",
      icon: Download,
      description: "Instant access to guides, scripts, and courses",
      priceRange: "$19 - $99",
      gradient: "gradient-social-1",
      items: Object.values(PRICING.DIY_DOWNLOADS),
      route: "/services/diy-downloads"
    }
  ];

  const handleCategoryClick = (route: string) => {
    navigate(route);
  };

  const toggleExpanded = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
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
              🎯 Simplified Pricing
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black mb-6 md:mb-8 text-corporate-dark tracking-tight leading-tight">
              Palmer House Productions <span className="text-gradient-1">Package Options</span>
            </h1>
            <div className="text-lg md:text-xl text-corporate-gray max-w-3xl mx-auto mb-8 md:mb-12 font-medium leading-relaxed">
              From DIY downloads to comprehensive video production — choose what fits your current needs and growth stage.
            </div>
          </header>

          {/* Service Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 md:mb-20">
            {pricingCategories.map((category) => (
              <div key={category.id} className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${category.popular ? 'border-primary scale-105 md:scale-110' : 'border-gray-200'} hover:shadow-xl cursor-pointer`} onClick={() => handleCategoryClick(category.route)}>
                {/* Popular Badge */}
                {category.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-primary-dark text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}

                {/* Category Header */}
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 ${category.gradient} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                    <category.icon size={28} color="white" />
                  </div>
                  <h3 className="text-xl font-display font-black text-corporate-dark mb-2">{category.name}</h3>
                  <div className="text-2xl font-black text-corporate-dark mb-2">
                    {category.priceRange}
                  </div>
                  <p className="text-sm text-corporate-gray">{category.description}</p>
                </div>

                {/* Sample Items */}
                <div className="space-y-2 mb-6">
                  {category.items.slice(0, expandedCategory === category.id ? undefined : 2).map((item, index) => (
                    <div key={index} className="text-sm">
                      <p className="font-semibold text-corporate-dark">{item.name}</p>
                      <p className="text-xs text-corporate-gray">{item.price}</p>
                    </div>
                  ))}
                </div>

                {/* Expand/Collapse for Mobile */}
                {category.items.length > 2 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpanded(category.id);
                    }}
                    className="w-full text-sm text-primary font-medium mb-4 hover:text-primary-dark transition-colors"
                  >
                    {expandedCategory === category.id ? 'Show Less' : `Show All ${category.items.length} Options`}
                  </button>
                )}

                {/* CTA Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(category.route);
                  }}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 mobile-touch-target ${
                    category.popular 
                      ? 'bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg' 
                      : 'border-2 border-gray-300 text-corporate-dark hover:border-primary hover:text-primary'
                  }`}
                >
                  Explore {category.name} →
                </button>
              </div>
            ))}
          </div>

          {/* Bonus Pack Highlight */}
          <div className="bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-3xl p-8 mb-16 text-center">
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-2xl font-display font-black text-corporate-dark mb-4">
              The Business Bonus Pack
            </h3>
            <p className="text-lg text-corporate-gray mb-4">
              <strong>FREE with:</strong> Any Business Video Assets Package $4,500+
            </p>
            <p className="text-sm text-corporate-gray">
              <strong>Total Value:</strong> {PRICING.BONUS_PACK.totalValue} • Includes scripts, courses, and coaching sessions
            </p>
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
              onClick={() => transitionTo('/contact')}
              className="px-8 md:px-12 py-4 md:py-6 gradient-social-1 text-white font-bold rounded-3xl hover:scale-105 transition-all duration-300 text-lg md:text-xl video-shadow-lg mobile-touch-target"
            >
              Start Your Project →
            </button>
          </section>
        </div>
      </section>
    </main>
  );
};