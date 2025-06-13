import { useState } from "react";
import emailjs from '@emailjs/browser';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ServiceSelection } from "./wizard/ServiceSelection";
import { PlanSelection } from "./wizard/PlanSelection";
import { PersonalInfoStep } from "./wizard/PersonalInfoStep";
import { ConfirmationStep } from "./wizard/ConfirmationStep";
import { useToast } from "@/hooks/use-toast";

interface ContactWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialService?: string;
}

export type ServiceType = "consultation" | "base-glimpse" | "full-glimpse" | "monthly";
export type PlanType = "trailhead" | "basecamp" | "summit" | "hosting";

export interface WizardData {
  serviceType?: ServiceType;
  planType?: PlanType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  challenge: string;
  timeline: string;
  budget: string;
}

export const ContactWizard = ({ open, onOpenChange, initialService }: ContactWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [wizardData, setWizardData] = useState<WizardData>({
    serviceType: initialService as ServiceType,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    challenge: "",
    timeline: "",
    budget: "",
  });

  const updateWizardData = (data: Partial<WizardData>) => {
    setWizardData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const resetWizard = () => {
    setCurrentStep(1);
    setWizardData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      challenge: "",
      timeline: "",
      budget: "",
    });
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(resetWizard, 300);
  };

  const getServiceName = (serviceType?: ServiceType) => {
    switch (serviceType) {
      case "consultation": return "General Consultation";
      case "base-glimpse": return "Base Glimpse ($350)";
      case "full-glimpse": return "Full Glimpse ($750)";
      case "monthly": return "Monthly Services";
      default: return "Not specified";
    }
  };

  const getPlanName = (planType?: PlanType) => {
    switch (planType) {
      case "trailhead": return "Trailhead ($1,500/month)";
      case "basecamp": return "Basecamp ($3,500/month)";
      case "summit": return "Summit ($7,500/month)";
      case "hosting": return "Monthly Hosting ($20,000/month)";
      default: return "Not applicable";
    }
  };

  const getCalendlyUrl = (serviceType?: ServiceType) => {
    switch (serviceType) {
      case "consultation": return "https://calendly.com/palmerhouseproductions-info/general-strategy-call";
      case "base-glimpse": return "https://calendly.com/palmerhouseproductions-info/the-glimpse";
      case "full-glimpse": return "https://calendly.com/palmerhouseproductions-info/the-full-glimpse";
      case "monthly": return "https://calendly.com/palmerhouseproductions-info/discovery-call";
      default: return "https://calendly.com/palmerhouseproductions-info/general-strategy-call";
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Initialize EmailJS with new public key
      emailjs.init('x9nf4ghJ-1Q7CkoeO');
      
      // Prepare email data
      const emailData = {
        to_email: 'info@palmerhouseproductions.com',
        from_name: `${wizardData.firstName} ${wizardData.lastName}`,
        from_email: wizardData.email,
        service_type: getServiceName(wizardData.serviceType),
        plan_type: getPlanName(wizardData.planType),
        company: wizardData.company,
        phone: wizardData.phone || 'Not provided',
        challenge: wizardData.challenge,
        timeline: wizardData.timeline,
        budget: wizardData.budget,
        message: `New project inquiry from ${wizardData.firstName} ${wizardData.lastName} at ${wizardData.company}.
        
Service: ${getServiceName(wizardData.serviceType)}
Plan: ${getPlanName(wizardData.planType)}
Timeline: ${wizardData.timeline}
Budget: ${wizardData.budget}

Challenge: ${wizardData.challenge}

Contact Details:
Email: ${wizardData.email}
Phone: ${wizardData.phone || 'Not provided'}
Company: ${wizardData.company}`
      };

      // Send email using new template ID
      await emailjs.send(
        'service_7zd5x3u',
        'template_9qrpr29', 
        emailData
      );

      toast({
        title: "Project Inquiry Sent! ✨",
        description: "We'll get back to you within 24 hours to discuss your project.",
      });

      handleClose();
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or contact us directly at info@palmerhouseproductions.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCalendlyBooking = () => {
    const calendlyUrl = getCalendlyUrl(wizardData.serviceType);
    window.open(calendlyUrl, '_blank');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelection
            selectedService={wizardData.serviceType}
            onServiceSelect={(service) => {
              updateWizardData({ serviceType: service });
              nextStep();
            }}
          />
        );
      case 2:
        return (
          <PlanSelection
            selectedPlan={wizardData.planType}
            serviceType={wizardData.serviceType}
            onPlanSelect={(plan) => {
              updateWizardData({ planType: plan });
              nextStep();
            }}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <PersonalInfoStep
            data={wizardData}
            onDataUpdate={updateWizardData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <ConfirmationStep
            data={wizardData}
            onSubmit={handleSubmit}
            onCalendlyBooking={handleCalendlyBooking}
            onBack={prevStep}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-video-white to-corporate-light rounded-3xl border-0 video-shadow-lg p-0">
        {/* Step Indicator */}
        <div className="flex items-center justify-center p-6 border-b border-corporate-light">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  step === currentStep
                    ? "gradient-social-1 text-white scale-110"
                    : step < currentStep
                    ? "bg-corporate-dark text-white"
                    : "bg-corporate-light text-corporate-gray"
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`w-16 h-1 mx-2 transition-all duration-300 ${
                    step < currentStep ? "bg-corporate-dark" : "bg-corporate-light"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto">
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
