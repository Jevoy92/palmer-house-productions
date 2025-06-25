
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CheckCircle, Clock, Users, Video, Target, Calendar, ArrowRight } from "lucide-react";

interface PackageDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageType: string;
  onBookSession: () => void;
}

export const PackageDetailsModal = ({ open, onOpenChange, packageType, onBookSession }: PackageDetailsModalProps) => {
  const getPackageDetails = () => {
    switch (packageType) {
      case "Pinnacle Package":
        return {
          name: "Pinnacle Package",
          subtitle: "Enterprise-level video domination with unlimited possibilities",
          price: "$20,000/month",
          icon: "🌄",
          gradient: "gradient-social-4",
          frequency: "Unlimited shoots & content",
          features: [
            "Unlimited video production",
            "Dedicated production team",
            "Enterprise-level strategy",
            "Multi-location shoots",
            "Real-time analytics dashboard",
            "White-label solutions",
            "Training & internal content",
            "Priority support & rush delivery"
          ],
          timeline: "Immediate setup, ongoing production",
          ideal: "National franchises, large enterprises, and industry leaders ready to dominate their market"
        };
      case "Summit Package":
        return {
          name: "Summit Package",
          subtitle: "Weekly strategy and production for major momentum",
          price: "$7,500/month",
          icon: "🏔",
          gradient: "gradient-social-3",
          frequency: "4-6 videos per month",
          features: [
            "Weekly video production",
            "Strategic content planning",
            "Professional editing suite",
            "Platform-specific optimization",
            "Performance analytics",
            "Monthly strategy calls",
            "Brand consistency guidelines",
            "Audience engagement tracking"
          ],
          timeline: "1-2 weeks setup, weekly deliveries",
          ideal: "Growing businesses ready to establish thought leadership and authority"
        };
      case "Basecamp Package":
        return {
          name: "Basecamp Package",
          subtitle: "3–4 videos/month to maintain visibility and nurture leads",
          price: "$3,500/month",
          icon: "🏕",
          gradient: "gradient-social-2",
          frequency: "3-4 videos per month",
          features: [
            "Monthly video content",
            "Lead generation focus",
            "Professional production",
            "Basic analytics reporting",
            "Content strategy guidance",
            "Brand messaging consistency",
            "Multi-platform formatting",
            "Quarterly strategy review"
          ],
          timeline: "1 week setup, monthly deliveries",
          ideal: "Established businesses maintaining steady growth and lead generation"
        };
      default:
        return {
          name: "Trailhead Package",
          subtitle: "1–2 monthly videos, perfect for testing and steady growth",
          price: "$1,500/month",
          icon: "🥾",
          gradient: "gradient-social-1",
          frequency: "1-2 videos per month",
          features: [
            "Monthly video creation",
            "Professional production quality",
            "Single platform focus",
            "Basic analytics",
            "Content guidance",
            "Brand alignment",
            "Quick turnaround",
            "Growth foundation"
          ],
          timeline: "3-5 days setup, monthly delivery",
          ideal: "Small businesses and solopreneurs starting their video journey"
        };
    }
  };

  const details = getPackageDetails();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-lg border-0 shadow-xl p-0">
        <VisuallyHidden>
          <DialogTitle>Package Details</DialogTitle>
          <DialogDescription>Detailed information about your recommended video package</DialogDescription>
        </VisuallyHidden>
        
        <div className="bg-gradient-to-br from-gray-50 to-white">
          {/* Header */}
          <div className="p-8 text-center border-b border-gray-100">
            <div className={`w-20 h-20 ${details.gradient} rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg`}>
              {details.icon}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              {details.name}
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              {details.subtitle}
            </p>
            <div className="inline-block bg-white rounded-lg p-4 shadow-lg">
              <p className="text-3xl font-bold text-gray-900">{details.price}</p>
              <p className="text-sm text-gray-500">{details.frequency}</p>
            </div>
          </div>

          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Features */}
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    What's Included
                  </h3>
                  <ul className="space-y-3">
                    {details.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-green-600 mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Details */}
              <div className="space-y-6">
                <Card className="bg-white shadow-lg border-0">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      Timeline
                    </h3>
                    <p className="text-gray-700">{details.timeline}</p>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg border-0">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-purple-600" />
                      Ideal For
                    </h3>
                    <p className="text-gray-700">{details.ideal}</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* CTA Section */}
            <Card className={`${details.gradient} text-white border-0 shadow-2xl`}>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-3">Ready to Get Started?</h3>
                <p className="text-lg mb-6 opacity-90">
                  Book a strategy session to discuss your specific needs and customize this package for your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Button 
                    onClick={onBookSession}
                    variant="secondary"
                    className="bg-white text-gray-900 hover:bg-gray-100 font-bold"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Strategy Session
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => onOpenChange(false)}
                    className="border-white text-white hover:bg-white/10"
                  >
                    Close Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
