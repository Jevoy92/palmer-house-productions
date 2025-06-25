import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FeaturesComparison } from "./pricing/FeaturesComparison";
import { BillingCycle } from "./pricing/BillingCycle";
import { PricingFAQ } from "./pricing/PricingFAQ";

export const PricingTrails = () => {
  const navigate = useNavigate();
  const [hoveredWaypoint, setHoveredWaypoint] = useState<string | null>(null);
  const [isAnnualBilling, setIsAnnualBilling] = useState(false);

  const pricingPaths = [
    {
      tier: "Trailhead",
      monthlyPrice: 1500,
      annualSavings: 10,
      gradient: "gradient-social-1",
      trailColor: "#8b5cf6",
      waypoints: [
        { 
          id: "trailhead-1", 
          icon: "🎯", 
          label: "Ideal for: Solo founders & small teams", 
          details: "Perfect for solopreneurs, service providers, and small but mighty teams (1–5) carving out their space with social storytelling and promos." 
        },
        { 
          id: "trailhead-2", 
          icon: "📦", 
          label: "4 minutes content, 1 shoot day, 1 strategy session", 
          details: "15 TikTok Shorts or 1x 4-min flagship video with pre-shoot coaching and monthly success check-ins included." 
        },
        { 
          id: "trailhead-3", 
          icon: "📍", 
          label: "Platforms: Instagram & TikTok", 
          details: "Optimized single-message promo content for the most engaging short-form video platforms." 
        },
        { 
          id: "trailhead-4", 
          icon: "🧭", 
          label: "Basic reporting & internal video support", 
          details: "Monthly strategy sessions, pre-shoot coaching, success check-ins, and basic analytics reporting." 
        },
        { 
          id: "trailhead-5", 
          icon: "🏁", 
          label: isAnnualBilling ? "$1,350/month" : "$1,500/month", 
          details: isAnnualBilling ? "Save $150/month with annual billing - perfect for consistent growth." : "Start your video journey with professional quality at an accessible price point." 
        }
      ]
    },
    {
      tier: "Basecamp",
      monthlyPrice: 3500,
      annualSavings: 10,
      gradient: "gradient-social-2",
      trailColor: "#f59e0b",
      waypoints: [
        { 
          id: "basecamp-1", 
          icon: "🎯", 
          label: "Ideal for: Growing teams, e-com, scaling pros", 
          details: "Perfect for teams of 5–20, e-commerce brands, and regional service professionals scaling up with launch videos and explainers." 
        },
        { 
          id: "basecamp-2", 
          icon: "📦", 
          label: "10 minutes content, 2 shoot days, 2 strategy sessions", 
          details: "6–10 short-form videos or LinkedIn reels with multi-message campaign approach and enhanced editing." 
        },
        { 
          id: "basecamp-3", 
          icon: "📍", 
          label: "Platforms: Instagram, LinkedIn, TikTok", 
          details: "Expanded reach across professional and social platforms for maximum impact with multi-message campaigns." 
        },
        { 
          id: "basecamp-4", 
          icon: "🧭", 
          label: "Enhanced analytics & campaign strategy", 
          details: "Monthly success check-ins, pre-shoot coaching, enhanced analytics, and multi-platform campaign blueprint." 
        },
        { 
          id: "basecamp-5", 
          icon: "🏁", 
          label: isAnnualBilling ? "$3,150/month" : "$3,500/month", 
          details: isAnnualBilling ? "Save $350/month with annual billing - scale with confidence." : "Scale your presence with professional multi-platform content strategy." 
        }
      ]
    },
    {
      tier: "Summit",
      monthlyPrice: 7500,
      annualSavings: 10,
      gradient: "gradient-social-3",
      trailColor: "#06b6d4",
      waypoints: [
        { 
          id: "summit-1", 
          icon: "🎯", 
          label: "Ideal for: B2B brands, regional agencies", 
          details: "Perfect for teams of 20–100, agencies, and B2B professionals building authority with funnel videos and deep dive series." 
        },
        { 
          id: "summit-2", 
          icon: "📦", 
          label: "25 minutes content, 4 shoot days, weekly strategy", 
          details: "Weekly episodic series or stack with full cross-platform strategy and evergreen assets for consistent authority building." 
        },
        { 
          id: "summit-3", 
          icon: "📍", 
          label: "Platforms: YouTube, LinkedIn, Instagram, TikTok", 
          details: "Comprehensive platform strategy including long-form and short-form content with full cross-platform campaigns." 
        },
        { 
          id: "summit-4", 
          icon: "🧭", 
          label: "Dedicated account lead & ROI insights", 
          details: "Weekly strategy sessions, dedicated account lead, ROI & engagement insights, and lead strategy integration." 
        },
        { 
          id: "summit-5", 
          icon: "🏁", 
          label: isAnnualBilling ? "$6,750/month" : "$7,500/month", 
          details: isAnnualBilling ? "Save $750/month with annual billing - establish lasting authority." : "Establish authority with consistent, high-impact content across all platforms." 
        }
      ]
    },
    {
      tier: "Pinnacle",
      monthlyPrice: 20000,
      annualSavings: 10,
      gradient: "gradient-social-4",
      trailColor: "#ec4899",
      waypoints: [
        { 
          id: "pinnacle-1", 
          icon: "🎯", 
          label: "Ideal for: Franchises, global campaigns, enterprise", 
          details: "For national franchises, elite agencies, and organizations ready to dominate with paid ads, global rollouts, and training systems." 
        },
        { 
          id: "pinnacle-2", 
          icon: "📦", 
          label: "75 minutes content, unlimited shoots, weekly + quarterly", 
          details: "Full asset library including ads, onboarding, training, and brand content with enterprise-level campaign systems." 
        },
        { 
          id: "pinnacle-3", 
          icon: "📍", 
          label: "All major platforms + internal systems", 
          details: "Complete omnichannel presence including internal communications, training assets, and global campaign coordination." 
        },
        { 
          id: "pinnacle-4", 
          icon: "🧭", 
          label: "Pre-production manager & real-time dashboard", 
          details: "Dedicated pre-production manager, real-time analytics dashboard, Slack/direct line access, and on-demand support." 
        },
        { 
          id: "pinnacle-5", 
          icon: "🏁", 
          label: isAnnualBilling ? "$18,000/month" : "$20,000/month", 
          details: isAnnualBilling ? "Save $2,000/month with annual billing - enterprise excellence." : "Premium enterprise solution with unlimited shoots and dedicated team support." 
        }
      ]
    }
  ];

  const handleTrailClick = (tier: string) => {
    navigate('/contact', { state: { selectedTier: tier } });
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
    <div>
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
              🗺️ Choose Your Trail
            </div>
            <h2 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
              Map Your <span className="text-gradient-1">Journey</span>
            </h2>
            <div className="text-2xl text-corporate-gray max-w-4xl mx-auto mb-12 font-medium leading-tight">
              <p>Each trail represents a different approach to video content creation.</p>
              <p>Choose the path that matches your <span className="text-gradient-2 font-bold">ambition and scale</span>.</p>
            </div>
          </div>

          {/* Trail Map */}
          <div className="grid lg:grid-cols-4 gap-8 mb-20">
            {pricingPaths.map((path, pathIndex) => (
              <div key={path.tier} className="relative">
                {/* Trail Header */}
                <div className="text-center mb-8">
                  <div className={`w-20 h-20 ${path.gradient} rounded-2xl flex items-center justify-center text-4xl mb-4 mx-auto video-shadow`}>
                    {path.tier === "Trailhead" && "🥾"}
                    {path.tier === "Basecamp" && "🏕"}
                    {path.tier === "Summit" && "🏔"}
                    {path.tier === "Pinnacle" && "🌄"}
                  </div>
                  <h3 className="text-3xl font-display font-black text-corporate-dark mb-2">{path.tier}</h3>
                  <div className="text-xl text-corporate-gray">Trail</div>
                </div>

                {/* Simplified SVG Trail Path */}
                <div className="relative h-[450px] mb-8">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 200 450"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Straight vertical line */}
                    <line
                      x1="100"
                      y1="30"
                      x2="100"
                      y2="420"
                      stroke={path.trailColor}
                      strokeWidth="4"
                      strokeDasharray="8,4"
                      className="opacity-30"
                    />
                    
                    {/* Centered waypoints */}
                    {path.waypoints.map((waypoint, index) => (
                      <g key={waypoint.id}>
                        <circle
                          cx="100"
                          cy={30 + index * 80}
                          r="24"
                          fill={path.trailColor}
                          className="cursor-pointer transition-all duration-300 hover:scale-110 drop-shadow-lg"
                          style={{
                            filter: hoveredWaypoint === waypoint.id ? `drop-shadow(0 0 12px ${path.trailColor})` : 'none'
                          }}
                          onMouseEnter={() => setHoveredWaypoint(waypoint.id)}
                          onMouseLeave={() => setHoveredWaypoint(null)}
                        />
                        <text
                          x="100"
                          y={30 + index * 80}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-xl font-bold fill-white pointer-events-none"
                        >
                          {waypoint.icon}
                        </text>
                      </g>
                    ))}
                  </svg>

                  {/* Waypoint Details */}
                  {path.waypoints.map((waypoint, index) => (
                    <div
                      key={waypoint.id}
                      className={`absolute transition-all duration-500 pointer-events-none z-50 ${
                        hoveredWaypoint === waypoint.id 
                          ? 'opacity-100 scale-100 translate-y-0' 
                          : 'opacity-0 scale-95 translate-y-2'
                      }`}
                      style={{
                        left: '50%',
                        top: `${30 + index * 80 - 60}px`,
                        transform: 'translateX(-50%) translateY(-100%)'
                      }}
                    >
                      <div className="bg-video-white/95 backdrop-blur-sm p-8 rounded-2xl video-shadow-lg max-w-lg border border-gray-100 min-w-[280px]">
                        <div className="flex items-start gap-4 mb-3">
                          <div className="text-2xl flex-shrink-0 mt-1">{waypoint.icon}</div>
                          <div>
                            <p className="text-base font-bold text-corporate-dark mb-3 leading-tight">{waypoint.label}</p>
                            <p className="text-sm text-corporate-gray leading-relaxed">{waypoint.details}</p>
                          </div>
                        </div>
                      </div>
                      <div 
                        className="absolute top-full left-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-transparent border-t-video-white/95 -translate-x-1/2"
                      />
                    </div>
                  ))}
                </div>

                {/* Price Display Only - No Button */}
                <div className="text-center">
                  <div className="text-4xl font-black text-corporate-dark mb-4">
                    {calculatePrice(path.monthlyPrice, path.annualSavings)}
                    {isAnnualBilling && (
                      <div className="text-sm text-green-600 font-medium">
                        Save {path.annualSavings}% annually
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section - keeping existing code */}
          <div className="text-center">
            <div className="text-corporate-gray text-4xl mb-12 tracking-widest">⸻ ⸻ ⸻</div>
            <div className="inline-block px-8 py-4 gradient-social-4 rounded-full text-white font-bold text-xl mb-8 video-shadow-lg">
              🧭 Ready to Begin?
            </div>
            <h3 className="text-5xl md:text-6xl font-display font-black mb-10 text-corporate-dark leading-tight">
              Let's Find Your Perfect <span className="text-gradient-2">Trail</span>
            </h3>
            <p className="text-2xl text-corporate-gray mb-12 max-w-4xl mx-auto font-medium leading-relaxed">
              Every great adventure starts with choosing the right path.
              <br />
              Tell us about your vision and we'll <span className="text-gradient-1 font-bold">map your journey</span>.
            </p>
            
            <button 
              onClick={() => navigate('/contact')}
              className="px-12 py-6 gradient-social-1 text-white font-bold rounded-3xl hover:scale-105 transition-all duration-300 text-xl video-shadow-lg"
            >
              Start Your Journey →
            </button>
          </div>
        </div>
      </section>

      {/* Sections with billing integration */}
      <BillingCycle onCycleChange={handleBillingChange} />
      <FeaturesComparison isAnnualBilling={isAnnualBilling} />
      <PricingFAQ />
    </div>
  );
};
