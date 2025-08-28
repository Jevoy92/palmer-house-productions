
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
      case "Monthly Content System":
        return {
          name: "Monthly Content System",
          subtitle: "The Social Authority Kit - consistent monthly video content",
          price: "$3,000/month",
          icon: "🔄",
          gradient: "gradient-social-4",
          frequency: "Monthly deliverables",
          features: [
            "3-4 videos per month",
            "Strategic content planning",
            "Professional production",
            "Multi-platform optimization",
            "Performance analytics",
            "Monthly strategy calls",
            "Brand consistency guidelines",
            "Content calendar planning"
          ],
          timeline: "1-2 weeks setup, monthly deliveries",
          ideal: "Businesses ready for consistent content that drives authority and results"
        };
      case "One-Time Bundles":
        return {
          name: "One-Time Bundles",
          subtitle: "Problem-solving video packages for specific needs",
          price: "$500-$6,500",
          icon: "🛠️",
          gradient: "gradient-social-3",
          frequency: "Project-based delivery",
          features: [
            "YouTube Visibility Engine",
            "FAQ Video Bundles",
            "Launch Video Kits",
            "Team Training Videos",
            "Custom project solutions",
            "Fast turnaround",
            "Strategic planning included",
            "Multiple format delivery"
          ],
          timeline: "1-3 weeks project completion",
          ideal: "Businesses with specific video challenges or one-time projects"
        };
      case "Group Coaching":
        return {
          name: "Group Coaching",
          subtitle: "6-week Camera-Ready Brand program",
          price: "$2,000",
          icon: "👥",
          gradient: "gradient-social-2",
          frequency: "6-week program",
          features: [
            "6 weeks of intensive training",
            "Live group coaching sessions",
            "Camera confidence building",
            "Personal brand development",
            "Content strategy guidance",
            "Peer support network",
            "Recorded sessions access",
            "Ongoing community support"
          ],
          timeline: "Next cohort starts monthly",
          ideal: "Professionals wanting to master on-camera presence and build their personal brand"
        };
      default:
        return {
          name: "DIY Downloads",
          subtitle: "Instant access to guides, scripts, and courses",
          price: "$19-$99",
          icon: "📱",
          gradient: "gradient-social-1",
          frequency: "Instant download",
          features: [
            "Video script bundles",
            "Step-by-step guides",
            "Template libraries",
            "Quick-start courses",
            "Editing tutorials",
            "Lifetime access",
            "Mobile-friendly content",
            "Self-paced learning"
          ],
          timeline: "Instant access after purchase",
          ideal: "DIY creators and small businesses starting their video journey"
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
