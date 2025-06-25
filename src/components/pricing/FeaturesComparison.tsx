
import { Check, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface FeaturesComparisonProps {
  isAnnualBilling: boolean;
}

export const FeaturesComparison = ({ isAnnualBilling }: FeaturesComparisonProps) => {
  const tiers = [
    { 
      name: "Trailhead", 
      monthlyPrice: 1500, 
      gradient: "gradient-social-1" 
    },
    { 
      name: "Basecamp", 
      monthlyPrice: 3500, 
      gradient: "gradient-social-2" 
    },
    { 
      name: "Summit", 
      monthlyPrice: 7500, 
      gradient: "gradient-social-3" 
    },
    { 
      name: "Pinnacle", 
      monthlyPrice: 20000, 
      gradient: "gradient-social-4" 
    }
  ];

  const calculatePrice = (monthlyPrice: number) => {
    if (isAnnualBilling) {
      const annualPrice = monthlyPrice * 0.9; // 10% discount
      return `$${annualPrice.toLocaleString()}/mo`;
    }
    return `$${monthlyPrice.toLocaleString()}/mo`;
  };

  const features = [
    {
      category: "Content Creation & Support",
      items: [
        { 
          feature: "Monthly Content Minutes", 
          trailhead: "4 minutes", 
          basecamp: "10 minutes", 
          summit: "25 minutes", 
          pinnacle: "75 minutes" 
        },
        { 
          feature: "Shoot Days per Month", 
          trailhead: "1", 
          basecamp: "2", 
          summit: "4", 
          pinnacle: "Unlimited" 
        },
        { 
          feature: "Strategy Sessions", 
          trailhead: "1", 
          basecamp: "2", 
          summit: "Weekly", 
          pinnacle: "Weekly + Quarterly" 
        },
        { 
          feature: "Pre-shoot Coaching", 
          trailhead: true, 
          basecamp: true, 
          summit: true, 
          pinnacle: true 
        },
        { 
          feature: "Success Check-ins", 
          trailhead: "Monthly", 
          basecamp: "Monthly", 
          summit: "Weekly", 
          pinnacle: "Slack/Direct + On-demand" 
        },
        { 
          feature: "Dedicated Account Lead", 
          trailhead: false, 
          basecamp: false, 
          summit: true, 
          pinnacle: true 
        },
        { 
          feature: "Pre-Production Manager", 
          trailhead: false, 
          basecamp: false, 
          summit: false, 
          pinnacle: true 
        }
      ]
    },
    {
      category: "Platform Coverage & Output Style",
      items: [
        { 
          feature: "Instagram & TikTok", 
          trailhead: true, 
          basecamp: true, 
          summit: true, 
          pinnacle: true 
        },
        { 
          feature: "LinkedIn", 
          trailhead: false, 
          basecamp: true, 
          summit: true, 
          pinnacle: true 
        },
        { 
          feature: "YouTube", 
          trailhead: false, 
          basecamp: false, 
          summit: true, 
          pinnacle: true 
        },
        { 
          feature: "Internal Video Support", 
          trailhead: true, 
          basecamp: true, 
          summit: true, 
          pinnacle: true 
        },
        { 
          feature: "All Major Platforms + Internal Systems", 
          trailhead: false, 
          basecamp: false, 
          summit: false, 
          pinnacle: true 
        },
        { 
          feature: "Suggested Output Formats", 
          trailhead: "15 TikTok Shorts or 1x 4-min flagship", 
          basecamp: "6–10 short-form or LinkedIn reels", 
          summit: "Weekly episodic series or stack", 
          pinnacle: "Full asset library (ads, training, brand)" 
        },
        { 
          feature: "Campaign Style", 
          trailhead: "Single-message promo", 
          basecamp: "Multi-message campaign", 
          summit: "Full cross-platform strategy", 
          pinnacle: "Enterprise-level campaign systems" 
        },
        { 
          feature: "Use Case Examples", 
          trailhead: "Social storytelling, promos", 
          basecamp: "Launch videos, intros, explainers", 
          summit: "Funnel videos, deep dives, series", 
          pinnacle: "Paid ads, global rollouts, training" 
        }
      ]
    },
    {
      category: "Analytics & Performance",
      items: [
        { 
          feature: "Basic Reporting", 
          trailhead: true, 
          basecamp: true, 
          summit: false, 
          pinnacle: false 
        },
        { 
          feature: "Enhanced Analytics", 
          trailhead: false, 
          basecamp: true, 
          summit: true, 
          pinnacle: true 
        },
        { 
          feature: "ROI & Engagement Insights", 
          trailhead: false, 
          basecamp: false, 
          summit: true, 
          pinnacle: true 
        },
        { 
          feature: "Real-Time Dashboard", 
          trailhead: false, 
          basecamp: false, 
          summit: false, 
          pinnacle: true 
        },
        { 
          feature: "Lead Strategy Integration", 
          trailhead: false, 
          basecamp: false, 
          summit: true, 
          pinnacle: true 
        }
      ]
    }
  ];

  const renderFeatureValue = (value: any) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-300 mx-auto" />
      );
    }
    return <span className="font-medium text-corporate-dark text-sm leading-tight">{value}</span>;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-3 gradient-social-2 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            📊 Feature Comparison
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-black mb-6 text-corporate-dark tracking-tight">
            Trail <span className="text-gradient-1">Features</span>
          </h2>
          <p className="text-xl text-corporate-gray max-w-3xl mx-auto">
            Compare what's included in each trail to find the perfect fit for your journey.
            {isAnnualBilling && (
              <span className="block text-green-600 font-bold mt-2">
                🎉 Annual pricing shown with 10% savings!
              </span>
            )}
          </p>
        </div>

        <div className="bg-video-white rounded-3xl video-shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-corporate-light">
                <TableHead className="text-left py-6 px-8 text-lg font-bold text-corporate-dark bg-gray-50">
                  Features
                </TableHead>
                {tiers.map((tier) => (
                  <TableHead key={tier.name} className="text-center py-6 px-4 bg-gray-50">
                    <div className={`inline-block px-4 py-2 ${tier.gradient} rounded-xl text-white font-bold mb-2`}>
                      {tier.name}
                    </div>
                    <div className="text-sm text-corporate-gray">
                      {calculatePrice(tier.monthlyPrice)}
                      {isAnnualBilling && (
                        <div className="text-xs text-green-600 font-medium mt-1">
                          Save 10%
                        </div>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((category) => (
                <>
                  <TableRow key={category.category} className="bg-corporate-light/30">
                    <TableCell colSpan={5} className="py-4 px-8">
                      <h3 className="text-lg font-bold text-corporate-dark">{category.category}</h3>
                    </TableCell>
                  </TableRow>
                  {category.items.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-50/50 transition-colors">
                      <TableCell className="py-4 px-8 font-medium text-corporate-dark">
                        {item.feature}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-center">
                        {renderFeatureValue(item.trailhead)}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-center">
                        {renderFeatureValue(item.basecamp)}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-center">
                        {renderFeatureValue(item.summit)}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-center">
                        {renderFeatureValue(item.pinnacle)}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Additional Benefits for Annual Billing */}
        {isAnnualBilling && (
          <div className="mt-12 bg-green-50 rounded-2xl p-8 border border-green-200">
            <div className="text-center">
              <div className="text-2xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">Annual Billing Benefits</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-green-700">
                <div>
                  <div className="font-bold mb-2">💰 Save 10% on All Plans</div>
                  <p>Lock in your video journey for 12 months and enjoy significant savings.</p>
                </div>
                <div>
                  <div className="font-bold mb-2">🚀 Priority Booking</div>
                  <p>Get first priority on shoot day scheduling and strategy session bookings.</p>
                </div>
                <div>
                  <div className="font-bold mb-2">⭐ Exclusive Strategy Sessions</div>
                  <p>Access to quarterly deep-dive strategy sessions to maximize your ROI.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
