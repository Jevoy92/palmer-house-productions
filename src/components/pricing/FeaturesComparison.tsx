import { PRICING } from "@/lib/pricing";
import { Check, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const FeaturesComparison = () => {
  const categories = [
    { 
      name: "DIY Downloads", 
      priceRange: "$19-$99",
      gradient: "gradient-social-1" 
    },
    { 
      name: "Group Coaching", 
      priceRange: "$2,000",
      gradient: "gradient-social-2" 
    },
    { 
      name: "Monthly Content", 
      priceRange: "$3,000/mo",
      gradient: "gradient-social-3" 
    },
    { 
      name: "One-Time Bundles", 
      priceRange: "$500-$6,500",
      gradient: "gradient-social-4" 
    }
  ];

  const renderFeatureValue = (value: any) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-red-400 mx-auto" />
      );
    }
    return <span className="text-corporate-dark text-sm">{value}</span>;
  };

  const features = [
    {
      category: "Service Delivery",
      items: [
        { 
          feature: "Delivery Method", 
          diy: "Instant Download", 
          coaching: "Live Sessions", 
          monthly: "Monthly Delivery", 
          bundles: "Custom Timeline" 
        },
        { 
          feature: "Time Commitment", 
          diy: "Self-Paced", 
          coaching: "6 Weeks", 
          monthly: "Ongoing", 
          bundles: "Project-Based" 
        },
        { 
          feature: "Professional Production", 
          diy: false, 
          coaching: false, 
          monthly: true, 
          bundles: true 
        },
        { 
          feature: "Strategy Session", 
          diy: false, 
          coaching: true, 
          monthly: true, 
          bundles: true 
        }
      ]
    },
    {
      category: "Content & Support",
      items: [
        { 
          feature: "Scripts Included", 
          diy: true, 
          coaching: "Training", 
          monthly: true, 
          bundles: true 
        },
        { 
          feature: "Live Coaching", 
          diy: false, 
          coaching: true, 
          monthly: "Monthly Check-ins", 
          bundles: "Pre-Production" 
        },
        { 
          feature: "Video Editing", 
          diy: "DIY", 
          coaching: "You Do", 
          monthly: "Professional", 
          bundles: "Professional" 
        },
        { 
          feature: "Ongoing Support", 
          diy: false, 
          coaching: "6 Weeks", 
          monthly: "Unlimited", 
          bundles: "Project Duration" 
        }
      ]
    },
    {
      category: "Best For",
      items: [
        { 
          feature: "Target Audience", 
          diy: "DIY Creators", 
          coaching: "New to Video", 
          monthly: "Consistent Content", 
          bundles: "Specific Needs" 
        },
        { 
          feature: "Business Stage", 
          diy: "Just Starting", 
          coaching: "Building Confidence", 
          monthly: "Scaling Content", 
          bundles: "Problem Solving" 
        },
        { 
          feature: "Investment Level", 
          diy: "Minimal", 
          coaching: "Moderate", 
          monthly: "High", 
          bundles: "Variable" 
        }
      ]
    }
  ];

  return (
    <section className="py-24 bg-video-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-40 h-40 gradient-social-1 rounded-full opacity-10 float-animation"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 gradient-social-3 rounded-full opacity-10 float-animation" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <header className="text-center mb-16">
          <div className="inline-block px-6 py-3 gradient-social-2 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            📊 Service Comparison
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-8 text-corporate-dark tracking-tight">
            Compare Our <span className="text-gradient-1">Service Options</span>
          </h2>
          <p className="text-xl text-corporate-gray max-w-3xl mx-auto font-medium leading-relaxed">
            Choose the right fit for your business stage, budget, and video needs.
          </p>
        </header>

        <div className="bg-white rounded-3xl p-6 md:p-8 video-shadow-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-corporate-light">
                <TableHead className="w-1/5 text-corporate-dark font-bold text-base">
                  Features
                </TableHead>
                {categories.map((category) => (
                  <TableHead key={category.name} className="text-center">
                    <div className="space-y-2">
                      <div className={`w-12 h-12 ${category.gradient} rounded-xl mx-auto mb-2`}></div>
                      <div className="font-black text-corporate-dark text-base">{category.name}</div>
                      <div className="text-sm font-medium text-corporate-gray">{category.priceRange}</div>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((section, sectionIndex) => (
                <>
                  <TableRow key={`section-${sectionIndex}`} className="bg-corporate-light/50">
                    <TableCell colSpan={5} className="font-bold text-corporate-dark py-4">
                      {section.category}
                    </TableCell>
                  </TableRow>
                  {section.items.map((item, itemIndex) => (
                    <TableRow key={`${sectionIndex}-${itemIndex}`} className="border-corporate-light/50">
                      <TableCell className="font-medium text-corporate-dark py-4">
                        {item.feature}
                      </TableCell>
                      <TableCell className="text-center py-4">
                        {renderFeatureValue(item.diy)}
                      </TableCell>
                      <TableCell className="text-center py-4">
                        {renderFeatureValue(item.coaching)}
                      </TableCell>
                      <TableCell className="text-center py-4">
                        {renderFeatureValue(item.monthly)}
                      </TableCell>
                      <TableCell className="text-center py-4">
                        {renderFeatureValue(item.bundles)}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-corporate-gray mb-8">
            Still not sure which option is right for you?
          </p>
          <a
            href="https://palmerhouseproductions.zohobookings.com/#/4740771000000078004"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 gradient-social-4 text-white font-bold rounded-3xl hover:scale-105 transition-all duration-300 text-lg video-shadow-lg"
          >
            Schedule a Free Strategy Call →
          </a>
        </div>
      </div>
    </section>
  );
};