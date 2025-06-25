
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CheckCircle, Clock, Users, Video, Target } from "lucide-react";

interface PackageDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageType: string;
  onBookSession: () => void;
}

export const PackageDetailsModal = ({ open, onOpenChange, packageType, onBookSession }: PackageDetailsModalProps) => {
  const getPackageDetails = () => {
    switch (packageType) {
      case "Horizon Package":
        return {
          name: "Horizon Package",
          subtitle: "Full-scale video domination with high-frequency publishing",
          price: "Custom Pricing",
          frequency: "Daily/Multiple per week",
          features: [
            "Daily video content creation",
            "Multi-platform optimization",
            "Complete content strategy",
            "Full production team",
            "Analytics and performance tracking",
            "Brand voice development",
            "Competitor analysis",
            "Content calendar management"
          ],
          timeline: "2-3 weeks setup, ongoing production",
          ideal: "Established companies ready to dominate their market through video"
        };
      case "Summit Package":
        return {
          name: "Summit Package",
          subtitle: "Weekly strategy and production for major momentum",
          price: "Starting at $8,000/month",
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
          ideal: "Growing businesses ready to establish thought leadership"
        };
      case "Basecamp Package":
        return {
          name: "Basecamp Package",
          subtitle: "3–4 videos/month to maintain visibility and nurture leads",
          price: "Starting at $4,500/month",
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
          ideal: "Established businesses maintaining steady growth"
        };
      default:
        return {
          name: "Trailhead Package",
          subtitle: "1–2 monthly videos, perfect for testing and steady growth",
          price: "Starting at $2,500/month",
          frequency: "1-2 videos per month",
          features: [
            "Monthly video creation",
            "Basic production quality",
            "Single platform focus",
            "Simple analytics",
            "Content guidance",
            "Brand alignment",
            "Quick turnaround",
            "Growth foundation"
          ],
          timeline: "3-5 days setup, monthly delivery",
          ideal: "Small businesses starting their video journey"
        };
    }
  };

  const details = getPackageDetails();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-lg border-0 shadow-xl p-0">
        <VisuallyHidden>
          <DialogTitle>Package Details</DialogTitle>
          <DialogDescription>Detailed information about your recommended video package</DialogDescription>
        </VisuallyHidden>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">📋</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {details.name}
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              {details.subtitle}
            </p>
            <div className="bg-blue-50 rounded-lg p-4 inline-block">
              <p className="text-2xl font-bold text-blue-600">{details.price}</p>
              <p className="text-sm text-blue-500">{details.frequency}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                What's Included
              </h3>
              <ul className="space-y-2">
                {details.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Timeline
                </h3>
                <p className="text-gray-700">{details.timeline}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-600" />
                  Ideal For
                </h3>
                <p className="text-gray-700">{details.ideal}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to Get Started?</h3>
            <p className="text-gray-700 mb-4">
              Book a strategy session to discuss your specific needs and customize this package for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={onBookSession}
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
              >
                Book Strategy Session 📞
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="text-lg px-8 py-3"
              >
                Close Details
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
