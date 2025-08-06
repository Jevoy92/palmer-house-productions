
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PackageDetailsModal } from "./PackageDetailsModal";
import { CheckCircle, ArrowRight, Calendar, Sparkles, Target, TrendingUp } from "lucide-react";

interface CelebrationStepProps {
  data: any;
  onClose: () => void;
  onNewInquiry: () => void;
  onCalendlyBooking: () => void;
}

export const CelebrationStep = ({ data, onClose, onNewInquiry, onCalendlyBooking }: CelebrationStepProps) => {
  const [showPackageDetails, setShowPackageDetails] = useState(false);

  const getRecommendedPackage = () => {
    const { contentPace, businessStage, videoGoal } = data;
    
    if (contentPace === 'high-volume' || businessStage === 'enterprise') {
      return "Monthly Content System";
    } else if (contentPace === 'weekly' || businessStage === 'scaling_team' || videoGoal === 'thought_leadership') {
      return "One-Time Bundles";
    } else if (contentPace === 'monthly' || businessStage === 'established' || videoGoal === 'lead_gen') {
      return "Group Coaching";
    } else {
      return "DIY Downloads";
    }
  };

  const getPackageIcon = (packageName: string) => {
    switch (packageName) {
      case "DIY Downloads": return "📱";
      case "Group Coaching": return "👥";
      case "One-Time Bundles": return "🛠️";
      case "Monthly Content System": return "🔄";
      default: return "📦";
    }
  };

  const getPackageGradient = (packageName: string) => {
    switch (packageName) {
      case "DIY Downloads": return "gradient-social-1";
      case "Group Coaching": return "gradient-social-2";
      case "One-Time Bundles": return "gradient-social-3";
      case "Monthly Content System": return "gradient-social-4";
      default: return "gradient-social-1";
    }
  };

  const getPackagePrice = (packageName: string) => {
    switch (packageName) {
      case "DIY Downloads": return "$19-$99";
      case "Group Coaching": return "$2,000";
      case "One-Time Bundles": return "$500-$6,500";
      case "Monthly Content System": return "$3,000/month";
      default: return "Custom Pricing";
    }
  };

  const recommendedPackage = getRecommendedPackage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-display font-black text-gray-900 mb-4">
            Your Perfect <span className="text-gradient-2">Solution</span> Awaits!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on your needs, we've found the perfect video service for your business.
          </p>
        </div>

        {/* Main Results Card */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Package Recommendation */}
              <div>
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Recommended for You
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{recommendedPackage}</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {recommendedPackage === "DIY Downloads" && "Perfect for getting started with professional video content"}
                    {recommendedPackage === "Group Coaching" && "Ideal for mastering on-camera presence and building confidence"}
                    {recommendedPackage === "One-Time Bundles" && "Great for solving specific video challenges and building authority"}
                    {recommendedPackage === "Monthly Content System" && "Ultimate solution for consistent content that drives results"}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 ${getPackageGradient(recommendedPackage)} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                      {getPackageIcon(recommendedPackage)}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{getPackagePrice(recommendedPackage)}</div>
                      <div className="text-sm text-gray-500">Starting price</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={() => setShowPackageDetails(true)}
                      variant="outline"
                      className="flex-1"
                    >
                      View Details
                    </Button>
                    <Button 
                      onClick={onCalendlyBooking}
                      className={`flex-1 ${getPackageGradient(recommendedPackage)} text-white border-0 hover:scale-105 transition-transform`}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Strategy Call
                    </Button>
                  </div>
                </div>
              </div>

              {/* Journey Summary */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Your Journey Summary
                </h3>
                <div className="space-y-3">
                  {data.painPoint && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Challenge: </span>
                        <span className="text-sm text-gray-600 capitalize">{data.painPoint.replace(/_/g, ' ')}</span>
                      </div>
                    </div>
                  )}
                  {data.businessStage && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Business Stage: </span>
                        <span className="text-sm text-gray-600 capitalize">{data.businessStage.replace(/_/g, ' ')}</span>
                      </div>
                    </div>
                  )}
                  {data.videoGoal && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Video Goal: </span>
                        <span className="text-sm text-gray-600 capitalize">{data.videoGoal.replace(/_/g, ' ')}</span>
                      </div>
                    </div>
                  )}
                  {data.contentPace && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Content Pace: </span>
                        <span className="text-sm text-gray-600 capitalize">{data.contentPace.replace(/_/g, ' ')}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Accelerated Growth</h3>
              <p className="text-sm text-gray-600">Professional video content that drives real business results</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Strategic Approach</h3>
              <p className="text-sm text-gray-600">Tailored content strategy aligned with your business goals</p>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Proven Results</h3>
              <p className="text-sm text-gray-600">Track record of helping businesses achieve video success</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-lg mb-6 text-blue-100">
              Let's discuss how we can bring your video vision to life with a personalized strategy session.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button 
                onClick={onCalendlyBooking}
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Your Call
              </Button>
              <Button 
                onClick={onNewInquiry}
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Take Quiz Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Package Details Modal */}
      <PackageDetailsModal
        open={showPackageDetails}
        onOpenChange={setShowPackageDetails}
        packageType={recommendedPackage}
        onBookSession={onCalendlyBooking}
      />
    </div>
  );
};
