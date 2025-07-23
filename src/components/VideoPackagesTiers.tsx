
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Flame, 
  Footprints, 
  Tent, 
  Mountain, 
  Sunrise,
  Clock,
  Users,
  Video,
  Mic,
  Camera,
  Play
} from "lucide-react";

export const VideoPackagesTiers = () => {
  const navigate = useNavigate();
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  const tiers = [
    {
      id: "campfire",
      name: "Campfire",
      price: "$500",
      period: "/month",
      tagline: "Light the spark. Stay consistent.",
      icon: Flame,
      gradient: "gradient-social-4",
      features: [
        "One shoot every 6 months (15-20 min)",
        "1 final video (up to 45 sec)",
        "1 podcast guest spot per 6 months",
        "No pre-production support",
        "30-day turnaround",
        "Ultra-budget local consistency"
      ],
      assets: "1 video",
      shootDays: "Every 6 months",
      hidden: true
    },
    {
      id: "trailhead",
      name: "Trailhead",
      price: "$1,500",
      period: "/month",
      tagline: "Your monthly content cadence starts here.",
      icon: Footprints,
      gradient: "gradient-social-1",
      features: [
        "1 shoot day/month (up to 4 hours)",
        "Pre-production + scripting support",
        "On-set teleprompter and coaching",
        "8 final assets",
        "1 long-form + 6-7 short-form cutdowns",
        "1-2 podcast guest features per year"
      ],
      assets: "8 videos",
      shootDays: "1 day/month"
    },
    {
      id: "basecamp",
      name: "Basecamp",
      price: "$3,500",
      period: "/month",
      tagline: "Two shoots. Double the impact.",
      icon: Tent,
      gradient: "gradient-social-2",
      features: [
        "2 shoot days/month (6 hours each)",
        "Up to 24 final assets",
        "2-4 long-form + 12-20 shorts",
        "Mix of internal and external content",
        "Annual team photo session",
        "Podcast feature + brand mini-doc opportunities"
      ],
      assets: "24 videos",
      shootDays: "2 days/month",
      highlight: true
    },
    {
      id: "summit",
      name: "Summit",
      price: "$7,500",
      period: "/month",
      tagline: "A content engine + internal systems build.",
      icon: Mountain,
      gradient: "gradient-social-3",
      features: [
        "4 full shoot days/month",
        "30-40 total assets",
        "Internal training videos",
        "Social and web content",
        "SOPs, FAQ videos, onboarding systems",
        "Quarterly headshots",
        "Deep dive brand strategy sessions",
        "Podcast host collabs"
      ],
      assets: "30-40 videos",
      shootDays: "4 days/month"
    },
    {
      id: "horizon",
      name: "Horizon",
      price: "$20,000",
      period: "/month",
      tagline: "Your media department. Fully embedded.",
      icon: Sunrise,
      gradient: "gradient-social-4",
      features: [
        "Weekly shoots (4+ days/month)",
        "50-80 deliverables",
        "Full internal + external video catalogs",
        "Evergreen YouTube library",
        "Dedicated strategist",
        "Quarterly headshots",
        "Full podcast planning, scripting, and publishing"
      ],
      assets: "50-80 videos",
      shootDays: "Weekly"
    }
  ];

  const visibleTiers = tiers.filter(tier => !tier.hidden);

  const handleDiscoveryCall = () => {
    navigate('/discovery-call');
  };

  return (
    <section className="pt-24 pb-16 bg-video-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 gradient-social-1 rounded-full opacity-20 float-animation"></div>
        <div className="absolute top-40 right-20 w-24 h-24 gradient-social-2 rounded-full opacity-30 float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 gradient-social-3 rounded-full opacity-15 float-animation" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 gradient-social-4 rounded-full opacity-25 float-animation" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 gradient-social-2 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            🎬 Video Packages
          </div>
          <h1 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
            Choose Your <span className="text-gradient-1">Subscription Path</span>
          </h1>
          <p className="text-2xl text-corporate-gray mb-6 max-w-4xl mx-auto font-medium">
            All tiers include full-service production: scripting, filming, teleprompter support, editing, and internal/external delivery options.
          </p>
        </div>

        {/* Interactive Mountain Trail Visual */}
        <div className="mb-16 relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
              The Trail to <span className="text-gradient-2">Video Mastery</span>
            </h2>
            <p className="text-xl text-corporate-gray">
              Every tier builds toward complete video independence
            </p>
          </div>

          {/* Mountain Trail SVG */}
          <div className="relative h-96 mb-8">
            <svg
              className="w-full h-full"
              viewBox="0 0 800 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Mountain silhouette */}
              <path
                d="M0 400 L200 300 L400 200 L600 100 L800 50 L800 400 Z"
                fill="#f8fafc"
                stroke="#e2e8f0"
                strokeWidth="2"
              />
              
              {/* Trail path */}
              <path
                d="M50 380 Q200 300 400 200 T750 80"
                stroke="#8b5cf6"
                strokeWidth="4"
                strokeDasharray="8,4"
                fill="none"
                opacity="0.6"
              />
              
              {/* Tier markers */}
              {visibleTiers.map((tier, index) => {
                const positions = [
                  { x: 100, y: 350 },
                  { x: 250, y: 280 },
                  { x: 450, y: 200 },
                  { x: 650, y: 120 }
                ];
                
                const pos = positions[index];
                if (!pos) return null;
                
                return (
                  <g key={tier.id}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="24"
                      fill={tier.gradient.includes('1') ? '#8b5cf6' : 
                            tier.gradient.includes('2') ? '#f59e0b' :
                            tier.gradient.includes('3') ? '#06b6d4' : '#ec4899'}
                      className="cursor-pointer transition-all duration-300 hover:scale-110"
                      onMouseEnter={() => setHoveredTier(tier.id)}
                      onMouseLeave={() => setHoveredTier(null)}
                    />
                    <foreignObject
                      x={pos.x - 12}
                      y={pos.y - 12}
                      width="24"
                      height="24"
                      className="pointer-events-none"
                    >
                      <tier.icon color="white" size={24} />
                    </foreignObject>
                  </g>
                );
              })}
            </svg>

            {/* Tier Details Cards */}
            {visibleTiers.map((tier, index) => {
              const positions = [
                { x: '12%', y: '60%' },
                { x: '31%', y: '40%' },
                { x: '56%', y: '20%' },
                { x: '81%', y: '10%' }
              ];
              
              const pos = positions[index];
              if (!pos) return null;
              
              return (
                <div
                  key={tier.id}
                  className={`absolute transition-all duration-500 pointer-events-none ${
                    hoveredTier === tier.id 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 translate-y-4'
                  }`}
                  style={{
                    left: pos.x,
                    top: pos.y,
                    transform: 'translate(-50%, -100%)'
                  }}
                >
                  <div className="bg-white p-6 rounded-2xl video-shadow-lg border border-gray-100 min-w-[280px] max-w-[320px]">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 ${tier.gradient} rounded-xl flex items-center justify-center mr-4`}>
                        <tier.icon color="white" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-corporate-dark">{tier.name}</h3>
                        <p className="text-3xl font-black text-corporate-dark">
                          {tier.price}<span className="text-base text-corporate-gray">{tier.period}</span>
                        </p>
                      </div>
                    </div>
                    <p className="text-corporate-gray text-sm mb-4 italic">"{tier.tagline}"</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-corporate-gray">
                        <Video size={16} className="mr-2" />
                        {tier.assets}
                      </div>
                      <div className="flex items-center text-sm text-corporate-gray">
                        <Camera size={16} className="mr-2" />
                        {tier.shootDays}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {visibleTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative p-6 bg-white rounded-3xl video-shadow hover:video-shadow-lg transition-all duration-300 hover:scale-105 group ${
                tier.highlight ? 'border-2 border-social-purple' : ''
              }`}
              onMouseEnter={() => setHoveredTier(tier.id)}
              onMouseLeave={() => setHoveredTier(null)}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="gradient-social-2 text-white px-4 py-2 rounded-full text-sm font-bold video-shadow">
                    🌟 Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-16 h-16 ${tier.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <tier.icon color="white" size={32} />
                </div>
                <h3 className="text-2xl font-display font-black text-corporate-dark mb-2">{tier.name}</h3>
                <p className="text-corporate-gray italic text-sm mb-4">"{tier.tagline}"</p>
                <div className="mb-4">
                  <span className="text-4xl font-black text-corporate-dark">{tier.price}</span>
                  <span className="text-corporate-gray text-lg">{tier.period}</span>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 ${tier.gradient} rounded-full mt-2 flex-shrink-0`}></div>
                    <span className="text-corporate-gray text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <button
                  onClick={handleDiscoveryCall}
                  className={`w-full py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${
                    tier.highlight
                      ? `${tier.gradient} text-white hover:scale-105 video-shadow`
                      : `border-2 border-corporate-gray text-corporate-dark hover:bg-corporate-dark hover:text-white`
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl p-8 video-shadow mb-16">
          <h2 className="text-4xl font-display font-black text-corporate-dark mb-8 text-center">
            Side-by-Side <span className="text-gradient-1">Comparison</span>
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-corporate-light">
                  <th className="text-left py-4 px-6 font-bold text-corporate-dark">Feature</th>
                  {visibleTiers.map((tier) => (
                    <th key={tier.id} className="text-center py-4 px-6">
                      <div className={`w-12 h-12 ${tier.gradient} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                        <tier.icon color="white" size={20} />
                      </div>
                      <div className="font-bold text-corporate-dark">{tier.name}</div>
                      <div className="text-sm text-corporate-gray">{tier.price}{tier.period}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-corporate-light">
                  <td className="py-4 px-6 font-medium text-corporate-dark">Monthly Shoot Days</td>
                  <td className="py-4 px-6 text-center text-corporate-gray">1</td>
                  <td className="py-4 px-6 text-center text-corporate-gray">2</td>
                  <td className="py-4 px-6 text-center text-corporate-gray">4</td>
                  <td className="py-4 px-6 text-center text-corporate-gray">Weekly</td>
                </tr>
                <tr className="border-b border-corporate-light">
                  <td className="py-4 px-6 font-medium text-corporate-dark">Final Assets</td>
                  <td className="py-4 px-6 text-center text-corporate-gray">8</td>
                  <td className="py-4 px-6 text-center text-corporate-gray">24</td>
                  <td className="py-4 px-6 text-center text-corporate-gray">30-40</td>
                  <td className="py-4 px-6 text-center text-corporate-gray">50-80</td>
                </tr>
                <tr className="border-b border-corporate-light">
                  <td className="py-4 px-6 font-medium text-corporate-dark">Pre-Production</td>
                  <td className="py-4 px-6 text-center">✓</td>
                  <td className="py-4 px-6 text-center">✓</td>
                  <td className="py-4 px-6 text-center">✓</td>
                  <td className="py-4 px-6 text-center">✓</td>
                </tr>
                <tr className="border-b border-corporate-light">
                  <td className="py-4 px-6 font-medium text-corporate-dark">Internal Training Videos</td>
                  <td className="py-4 px-6 text-center">—</td>
                  <td className="py-4 px-6 text-center">✓</td>
                  <td className="py-4 px-6 text-center">✓</td>
                  <td className="py-4 px-6 text-center">✓</td>
                </tr>
                <tr className="border-b border-corporate-light">
                  <td className="py-4 px-6 font-medium text-corporate-dark">Dedicated Strategist</td>
                  <td className="py-4 px-6 text-center">—</td>
                  <td className="py-4 px-6 text-center">—</td>
                  <td className="py-4 px-6 text-center">—</td>
                  <td className="py-4 px-6 text-center">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Floating CTA */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={handleDiscoveryCall}
            className="px-6 py-3 gradient-social-1 text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300 video-shadow-lg flex items-center space-x-2"
          >
            <Play size={20} />
            <span>Book Discovery Call</span>
          </button>
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center">
          <div className="inline-block px-8 py-4 gradient-social-3 rounded-full text-white font-bold text-xl mb-8 video-shadow">
            🎯 Ready to Begin Your Journey?
          </div>
          <h3 className="text-5xl md:text-6xl font-display font-black mb-8 text-corporate-dark">
            Let's Find Your Perfect <span className="text-gradient-2">Path</span>
          </h3>
          <p className="text-2xl text-corporate-gray mb-12 max-w-4xl mx-auto font-medium">
            Every great video strategy starts with understanding your business.
            <br />
            Book a Discovery Call and we'll <span className="text-gradient-1 font-bold">map your journey</span>.
          </p>
          
          <button
            onClick={handleDiscoveryCall}
            className="px-12 py-6 gradient-social-1 text-white font-bold rounded-3xl hover:scale-105 transition-all duration-300 text-xl video-shadow-lg"
          >
            Book Your Discovery Call →
          </button>
        </div>
      </div>
    </section>
  );
};
