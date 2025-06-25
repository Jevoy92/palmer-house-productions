
import { useState } from "react";
import { ContactWizard } from "./ContactWizard";

export const PricingTrails = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [hoveredWaypoint, setHoveredWaypoint] = useState<string | null>(null);

  const pricingPaths = [
    {
      tier: "Trailhead",
      price: "$1,500/mo",
      gradient: "gradient-social-1",
      trailColor: "#8b5cf6",
      waypoints: [
        { id: "trailhead-1", icon: "🎯", label: "Ideal for: solo founders & small teams", details: "Perfect for solopreneurs, service providers, and small but mighty teams (1–5) carving out their space." },
        { id: "trailhead-2", icon: "📦", label: "Suggested Formats: 15 TikTok shorts or 4-min flagship", details: "Up to 4 minutes of premium content per month with flexible format options." },
        { id: "trailhead-3", icon: "📍", label: "Platforms: Instagram, TikTok", details: "Optimized content for the most engaging short-form video platforms." },
        { id: "trailhead-4", icon: "🧭", label: "1 shoot day, 1 strategy session, basic analytics", details: "Monthly strategy session, pre-shoot coaching, and success check-ins included." },
        { id: "trailhead-5", icon: "🏁", label: "$1,500/month", details: "Start your video journey with professional quality at an accessible price point." }
      ]
    },
    {
      tier: "Basecamp",
      price: "$3,500/mo",
      gradient: "gradient-social-2",
      trailColor: "#f59e0b",
      waypoints: [
        { id: "basecamp-1", icon: "🎯", label: "Ideal for: growing teams, e-com, scaling pros", details: "Perfect for teams of 5–20, e-commerce brands, and regional service professionals scaling up." },
        { id: "basecamp-2", icon: "📦", label: "Suggested Formats: 6–10 short-form or LinkedIn reels", details: "10 minutes of content with multi-platform optimization and premiere editing." },
        { id: "basecamp-3", icon: "📍", label: "Platforms: Instagram, LinkedIn, TikTok", details: "Expanded reach across professional and social platforms for maximum impact." },
        { id: "basecamp-4", icon: "🧭", label: "2 shoot days, 2 strategy sessions, enhanced editing", details: "Multi-campaign content blueprint with enhanced analytics and reporting." },
        { id: "basecamp-5", icon: "🏁", label: "$3,500/month", details: "Scale your presence with professional multi-platform content strategy." }
      ]
    },
    {
      tier: "Summit",
      price: "$7,500/mo",
      gradient: "gradient-social-3",
      trailColor: "#06b6d4",
      waypoints: [
        { id: "summit-1", icon: "🎯", label: "Ideal for: B2B brands, regional agencies", details: "Perfect for teams of 20–100, agencies, and B2B professionals building authority." },
        { id: "summit-2", icon: "📦", label: "Suggested Formats: Weekly series, episodic sets", details: "25 minutes of content with full series rollouts and evergreen assets." },
        { id: "summit-3", icon: "📍", label: "Platforms: YouTube, LinkedIn, Instagram, TikTok", details: "Comprehensive platform strategy including long-form and short-form content." },
        { id: "summit-4", icon: "🧭", label: "Cross-platform campaign, analytics & lead strategy", details: "Weekly strategy sessions, dedicated account lead, and deep-dive ROI reporting." },
        { id: "summit-5", icon: "🏁", label: "$7,500/month", details: "Establish authority with consistent, high-impact content across all platforms." }
      ]
    },
    {
      tier: "Pinnacle",
      price: "$20,000/mo",
      gradient: "gradient-social-4",
      trailColor: "#ec4899",
      waypoints: [
        { id: "pinnacle-1", icon: "🎯", label: "Ideal for: franchises, internal ops, global campaigns", details: "For national franchises, elite agencies, and organizations ready to dominate their space." },
        { id: "pinnacle-2", icon: "📦", label: "Suggested Formats: Full asset library, ads, training", details: "75 minutes of cinematic content with unlimited creative possibilities." },
        { id: "pinnacle-3", icon: "📍", label: "Platforms: All major channels + internal systems", details: "Complete omnichannel presence including internal communications and training assets." },
        { id: "pinnacle-4", icon: "🧭", label: "Unlimited shoots, dashboards, pre-pro manager", details: "Dedicated pre-production manager, real-time analytics dashboard, and weekly strategy." },
        { id: "pinnacle-5", icon: "🏁", label: "$20,000/month", details: "Premium enterprise solution with unlimited shoots and dedicated team support." }
      ]
    }
  ];

  const handleTrailClick = (tier: string) => {
    setIsWizardOpen(true);
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

              {/* SVG Trail Path */}
              <div className="relative h-[450px] mb-8">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 200 450"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Trail Path */}
                  <path
                    d="M100 30 Q120 90 80 160 Q60 230 120 300 Q140 370 100 420"
                    stroke={path.trailColor}
                    strokeWidth="4"
                    strokeDasharray="8,4"
                    fill="none"
                    className="opacity-30"
                  />
                  
                  {/* Waypoints */}
                  {path.waypoints.map((waypoint, index) => (
                    <g key={waypoint.id}>
                      <circle
                        cx={index % 2 === 0 ? 100 : index === 1 ? 120 : index === 3 ? 120 : 100}
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
                        x={index % 2 === 0 ? 100 : index === 1 ? 120 : index === 3 ? 120 : 100}
                        y={30 + index * 80}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-lg font-bold fill-white pointer-events-none"
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
                      left: index % 2 === 0 ? '65%' : '-20%',
                      top: `${7 + index * 17.5}%`,
                      transform: 'translateY(-50%)'
                    }}
                  >
                    <div className="bg-video-white p-6 rounded-2xl video-shadow-lg max-w-md border border-gray-100 backdrop-blur-sm">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="text-xl">{waypoint.icon}</div>
                        <div>
                          <p className="text-base font-bold text-corporate-dark mb-2 leading-tight">{waypoint.label}</p>
                          <p className="text-sm text-corporate-gray leading-relaxed">{waypoint.details}</p>
                        </div>
                      </div>
                    </div>
                    {/* Arrow pointing to waypoint */}
                    <div 
                      className={`absolute top-1/2 w-0 h-0 border-t-8 border-b-8 border-transparent ${
                        index % 2 === 0 
                          ? 'border-r-8 border-r-video-white -left-2' 
                          : 'border-l-8 border-l-video-white -right-2'
                      }`}
                      style={{ transform: 'translateY(-50%)' }}
                    />
                  </div>
                ))}
              </div>

              {/* Final CTA */}
              <div className="text-center">
                <div className="text-4xl font-black text-corporate-dark mb-4">{path.price}</div>
                <button
                  onClick={() => handleTrailClick(path.tier)}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${path.gradient} text-white hover:scale-105 video-shadow hover:shadow-2xl`}
                >
                  Choose This Trail →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
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
            onClick={() => setIsWizardOpen(true)}
            className="px-12 py-6 gradient-social-1 text-white font-bold rounded-3xl hover:scale-105 transition-all duration-300 text-xl video-shadow-lg"
          >
            Start Your Journey →
          </button>
        </div>
      </div>

      <ContactWizard 
        open={isWizardOpen} 
        onOpenChange={setIsWizardOpen}
        initialService="monthly"
      />
    </section>
  );
};
