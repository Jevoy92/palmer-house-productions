import { Button } from "@/components/ui/button";
import { WizardData } from "../ContactWizard";

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
      case "base-glimpse": return "Base Glimpse ($350)";
      case "full-glimpse": return "Full Glimpse ($750)";
      case "monthly": return "Monthly Services";
      default: return "Not specified";
    }
  };

  const getPlanName = (planType?: string) => {
    switch (planType) {
      case "trailhead": return "Trailhead ($1,500/month)";
      case "basecamp": return "Basecamp ($3,500/month)";
      case "summit": return "Summit ($7,500/month)";
      case "hosting": return "Monthly Hosting ($20,000/month)";
      default: return "Not applicable";
    }
  };

  const getBookingButtonText = (serviceType?: string) => {
    switch (serviceType) {
      case "consultation": return "Book Strategy Call 📞";
      case "base-glimpse": return "Book Base Glimpse 🎒";
      case "full-glimpse": return "Book Full Glimpse 🧭";
      case "monthly": return "Book Discovery Call 🏔";
      default: return "Book & Pay Now 💳";
    }
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
          Ready to <span className="text-gradient-1">Begin</span>?
        </h2>
        <p className="text-xl text-corporate-gray max-w-2xl mx-auto">
          Choose your next step: book directly or send us your inquiry.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-video-white rounded-3xl p-8 video-shadow-lg mb-8">
          <h3 className="text-2xl font-display font-black text-corporate-dark mb-6">Project Summary</h3>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-corporate-dark mb-2">Service Type</h4>
                <p className="text-corporate-gray">{getServiceName(data.serviceType)}</p>
              </div>
              {data.planType && (
                <div>
                  <h4 className="font-bold text-corporate-dark mb-2">Monthly Plan</h4>
                  <p className="text-corporate-gray">{getPlanName(data.planType)}</p>
                </div>
              )}
            </div>
            
            <div className="w-full h-px bg-gradient-social-1 opacity-30"></div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-corporate-dark mb-2">Contact</h4>
                <p className="text-corporate-gray">{data.firstName} {data.lastName}</p>
                <p className="text-corporate-gray">{data.email}</p>
                {data.phone && <p className="text-corporate-gray">{data.phone}</p>}
              </div>
              <div>
                <h4 className="font-bold text-corporate-dark mb-2">Company</h4>
                <p className="text-corporate-gray">{data.company}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-corporate-dark mb-2">Challenge</h4>
              <p className="text-corporate-gray">{data.challenge}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-corporate-dark mb-2">Timeline</h4>
                <p className="text-corporate-gray">{data.timeline}</p>
              </div>
              <div>
                <h4 className="font-bold text-corporate-dark mb-2">Budget</h4>
                <p className="text-corporate-gray">{data.budget}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-social-1 rounded-2xl text-white">
              <h4 className="font-bold mb-2">🚀 Ready to Start?</h4>
              <p className="text-sm opacity-90">
                Book your session directly and secure your spot with payment
              </p>
            </div>
            <div className="p-6 bg-corporate-light rounded-2xl">
              <h4 className="font-bold text-corporate-dark mb-2">💬 Have Questions?</h4>
              <p className="text-corporate-gray text-sm">
                Send us your inquiry and we'll respond within 24 hours
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={onCalendlyBooking}
              disabled={isSubmitting}
              className="flex-1 gradient-social-1 text-white font-bold text-lg hover:scale-105 transition-all duration-300"
            >
              {getBookingButtonText(data.serviceType)}
            </Button>
            <Button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              variant="outline"
              className="flex-1 border-2 border-corporate-dark text-corporate-dark hover:bg-corporate-dark hover:text-white font-bold text-lg transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  Sending...
                </>
              ) : (
                "Send Inquiry ✉️"
              )}
            </Button>
          </div>
          
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isSubmitting}
            className="w-full border-corporate-gray text-corporate-gray hover:bg-corporate-light"
          >
            ← Back to Edit Details
          </Button>
        </div>
      </div>
    </div>
  );
};
