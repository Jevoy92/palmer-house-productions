
import { Check, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const FeaturesComparison = () => {
  const features = [
    {
      category: "Content Creation",
      items: [
        { feature: "Monthly Content Minutes", trailhead: "4 minutes", basecamp: "10 minutes", summit: "25 minutes", pinnacle: "75 minutes" },
        { feature: "Shoot Days per Month", trailhead: "1", basecamp: "2", summit: "4", pinnacle: "Unlimited" },
        { feature: "Strategy Sessions", trailhead: "1", basecamp: "2", summit: "Weekly", pinnacle: "Weekly + On-demand" },
        { feature: "Pre-Production Manager", trailhead: false, basecamp: false, summit: false, pinnacle: true },
        { feature: "Dedicated Account Lead", trailhead: false, basecamp: false, summit: true, pinnacle: true }
      ]
    },
    {
      category: "Platform Coverage",
      items: [
        { feature: "Instagram & TikTok", trailhead: true, basecamp: true, summit: true, pinnacle: true },
        { feature: "LinkedIn", trailhead: false, basecamp: true, summit: true, pinnacle: true },
        { feature: "YouTube", trailhead: false, basecamp: false, summit: true, pinnacle: true },
        { feature: "Internal Systems", trailhead: false, basecamp: false, summit: false, pinnacle: true },
        { feature: "All Major Channels", trailhead: false, basecamp: false, summit: false, pinnacle: true }
      ]
    },
    {
      category: "Analytics & Reporting",
      items: [
        { feature: "Basic Analytics", trailhead: true, basecamp: false, summit: false, pinnacle: false },
        { feature: "Enhanced Analytics", trailhead: false, basecamp: true, summit: false, pinnacle: false },
        { feature: "Deep-dive ROI Reporting", trailhead: false, basecamp: false, summit: true, pinnacle: true },
        { feature: "Real-time Dashboard", trailhead: false, basecamp: false, summit: false, pinnacle: true },
        { feature: "Lead Strategy Integration", trailhead: false, basecamp: false, summit: true, pinnacle: true }
      ]
    }
  ];

  const tiers = [
    { name: "Trailhead", price: "$1,500", gradient: "gradient-social-1" },
    { name: "Basecamp", price: "$3,500", gradient: "gradient-social-2" },
    { name: "Summit", price: "$7,500", gradient: "gradient-social-3" },
    { name: "Pinnacle", price: "$20,000", gradient: "gradient-social-4" }
  ];

  const renderFeatureValue = (value: any) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-gray-300 mx-auto" />
      );
    }
    return <span className="font-medium text-corporate-dark">{value}</span>;
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
                    <div className="text-sm text-corporate-gray">{tier.price}/mo</div>
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
      </div>
    </section>
  );
};
