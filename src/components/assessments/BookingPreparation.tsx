import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calendar, 
  CheckCircle, 
  TrendingUp, 
  Download, 
  ArrowRight,
  Star,
  Clock,
  Target
} from "lucide-react";
import { getSmartAssessmentZohoUrl, sendAssessmentToFormspree, getCallTypeExplanation } from "@/lib/assessmentRouting";
import { toast } from "@/hooks/use-toast";

interface BookingPreparationProps {
  assessmentType: string;
  score: number;
  level: string;
  recommendations: string[];
  businessContext?: any;
  onDownloadResults?: () => void;
  onBack?: () => void;
}

export const BookingPreparation = ({
  assessmentType,
  score,
  level,
  recommendations,
  businessContext,
  onDownloadResults,
  onBack
}: BookingPreparationProps) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [isBooking, setIsBooking] = useState(false);

  const callTypeInfo = getCallTypeExplanation(score);

  const handleBookCall = async () => {
    if (!userInfo.name || !userInfo.email) {
      toast({
        title: "Information Required",
        description: "Please provide your name and email to book a call.",
        variant: "destructive"
      });
      return;
    }

    setIsBooking(true);

    try {
      const assessmentData = {
        type: assessmentType,
        score,
        level,
        recommendations,
        businessContext,
        userInfo
      };

      const zohoConfig = getSmartAssessmentZohoUrl(assessmentData);
      
      // Send assessment data to Formspree for team notification
      const formspreeResult = await sendAssessmentToFormspree(assessmentData, zohoConfig);
      
      if (formspreeResult.success) {
        toast({
          title: "Assessment Data Sent",
          description: "Your assessment details have been sent to our team for call preparation.",
        });
      }

      // Redirect to Zoho Booking
      window.open(zohoConfig.url, '_blank');
      
      toast({
        title: "Redirecting to Booking",
        description: `Opening ${callTypeInfo.title.toLowerCase()} scheduler...`,
      });

    } catch (error) {
      // Log error in development only
      if (import.meta.env.DEV) {
        console.error('Booking error:', error);
      }
      
      toast({
        title: "Booking Error",
        description: "There was an issue processing your booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Assessment Summary */}
      <Card>
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Ready to Book Your Call</CardTitle>
          <CardDescription>
            Based on your {assessmentType} results, here's what we recommend
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">{score}%</div>
              <div className="text-sm text-muted-foreground">Assessment Score</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Badge variant="outline" className="text-sm mb-2">{level}</Badge>
              <div className="text-sm text-muted-foreground">Readiness Level</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-lg font-semibold mb-2">
                {score >= 75 ? "High Readiness" : "Building Readiness"}
              </div>
              <div className="text-sm text-muted-foreground">Status</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call Type Explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {callTypeInfo.title}
          </CardTitle>
          <CardDescription>{callTypeInfo.description}</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                What We'll Cover:
              </h4>
              <ul className="space-y-1">
                {callTypeInfo.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Call Duration & Format:
              </h4>
              <p className="text-sm text-blue-800">
                {score >= 75 
                  ? "45-60 minute discovery session focused on growth strategy and advanced tactics"
                  : "30-45 minute strategy session to build your video marketing foundation"
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Form */}
      <Card>
        <CardHeader>
          <CardTitle>Book Your Call</CardTitle>
          <CardDescription>
            We'll use this information to prepare for your call and send you a calendar invite.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={userInfo.name}
                onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={userInfo.email}
                onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                placeholder="Your company name (optional)"
                value={userInfo.company}
                onChange={(e) => setUserInfo(prev => ({ ...prev, company: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleBookCall}
              disabled={isBooking || !userInfo.name || !userInfo.email}
              className="flex-1"
            >
              {isBooking ? (
                "Processing..."
              ) : (
                <>
                  <Calendar className="h-4 w-4 mr-2" />
                  Book {score >= 75 ? "Discovery" : "Strategy"} Call
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
            
            {onDownloadResults && (
              <Button variant="outline" onClick={onDownloadResults}>
                <Download className="h-4 w-4 mr-2" />
                Download Results
              </Button>
            )}
          </div>

          {onBack && (
            <div className="pt-4 border-t mt-6">
              <Button variant="ghost" onClick={onBack}>
                ← Back to Results
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Recommendations Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Your Top Recommendations
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-2">
            {recommendations.slice(0, 3).map((recommendation, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                <Badge variant="outline" className="text-xs">{index + 1}</Badge>
                <p className="text-sm">{recommendation}</p>
              </div>
            ))}
          </div>
          
          {recommendations.length > 3 && (
            <p className="text-sm text-muted-foreground mt-3">
              Plus {recommendations.length - 3} more recommendations to discuss on your call...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};