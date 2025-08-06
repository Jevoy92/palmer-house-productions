
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WizardData } from "./types";
import { getServiceCategoryName } from "./utils";
import { User, Building2, MessageSquare, Clock, DollarSign, Briefcase } from "lucide-react";

interface ConfirmationStepProps {
  data: WizardData;
  onSubmit: () => void;
  onCalendlyBooking: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

export const ConfirmationStep = ({ data, onSubmit, onCalendlyBooking, onBack, isSubmitting = false }: ConfirmationStepProps) => {
  const getServiceName = (serviceType?: string) => {
    switch (serviceType) {
      case "consultation": return "General Consultation";
      case "diy": return "DIY Downloads";
      case "coaching": return "Group Coaching";
      case "monthly": return "Monthly Content System";
      case "bundle": return "One-Time Bundles";
      default: return "Not specified";
    }
  };

  const getBookingButtonText = (serviceType?: string) => {
    switch (serviceType) {
      case "consultation": return "Book Strategy Call";
      case "diy": return "Get Instant Access";
      case "coaching": return "Apply for Coaching";
      case "monthly": return "Book Discovery Call";
      case "bundle": return "Book Strategy Call";
      default: return "Book & Pay Now";
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
          Ready to <span className="text-gradient-1">Begin</span>?
        </h2>
        <p className="text-xl text-corporate-gray max-w-2xl mx-auto">
          Review your project details and choose how you'd like to proceed
        </p>
      </div>

      <div className="grid gap-6 mb-8">
        {/* Service & Plan Card */}
        <Card className="bg-video-white border-0 video-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-corporate-dark">
              <Briefcase className="w-6 h-6 text-social-purple" />
              Service Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-corporate-dark mb-2">Service Type</h4>
                <p className="text-corporate-gray bg-corporate-light px-4 py-2 rounded-lg">
                  {getServiceName(data.serviceType)}
                </p>
              </div>
              {data.serviceCategory && (
                <div>
                  <h4 className="font-semibold text-corporate-dark mb-2">Service Category</h4>
                  <p className="text-corporate-gray bg-corporate-light px-4 py-2 rounded-lg">
                    {getServiceCategoryName(data.serviceCategory)}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information Card */}
        <Card className="bg-video-white border-0 video-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-corporate-dark">
              <User className="w-6 h-6 text-social-cyan" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-corporate-dark mb-2">Contact Person</h4>
                <div className="space-y-1">
                  <p className="text-corporate-gray">{data.firstName} {data.lastName}</p>
                  <p className="text-corporate-gray">{data.email}</p>
                  {data.phone && <p className="text-corporate-gray">{data.phone}</p>}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-corporate-dark mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Company
                </h4>
                <p className="text-corporate-gray bg-corporate-light px-4 py-2 rounded-lg">
                  {data.company}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Details Card */}
        <Card className="bg-video-white border-0 video-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-corporate-dark">
              <MessageSquare className="w-6 h-6 text-social-orange" />
              Project Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-corporate-dark mb-2">Challenge</h4>
                <p className="text-corporate-gray bg-corporate-light p-4 rounded-lg leading-relaxed">
                  {data.challenge}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-corporate-dark mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Timeline
                  </h4>
                  <p className="text-corporate-gray bg-corporate-light px-4 py-2 rounded-lg">
                    {data.timeline}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-corporate-dark mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Budget
                  </h4>
                  <p className="text-corporate-gray bg-corporate-light px-4 py-2 rounded-lg">
                    {data.budget}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-corporate-dark text-white border-0 video-shadow hover:scale-105 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-3xl mb-3">🚀</div>
            <h4 className="font-bold text-lg mb-2">Ready to Start?</h4>
            <p className="text-sm opacity-90">
              Book your session directly and secure your spot with payment
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-video-white border-2 border-corporate-light video-shadow hover:scale-105 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="text-3xl mb-3">💬</div>
            <h4 className="font-bold text-lg text-corporate-dark mb-2">Have Questions?</h4>
            <p className="text-corporate-gray text-sm">
              Send us your inquiry and we'll respond within 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Button
            type="button"
            onClick={onCalendlyBooking}
            disabled={isSubmitting}
            className="gradient-social-1 text-white font-bold text-lg py-6 hover:scale-105 transition-all duration-300 border-0"
          >
            <span className="mr-2">📞</span>
            {getBookingButtonText(data.serviceType)}
          </Button>
          
          <Button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            variant="outline"
            className="border-2 border-corporate-dark text-corporate-dark hover:bg-corporate-dark hover:text-white font-bold text-lg py-6 transition-all duration-300"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <span className="mr-2">✉️</span>
                Send Inquiry
              </>
            )}
          </Button>
        </div>
        
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className="w-full border-corporate-gray text-corporate-gray hover:bg-corporate-light py-3"
        >
          ← Back to Edit Details
        </Button>
      </div>
    </div>
  );
};
