
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ServiceSelection } from "./wizard/ServiceSelection";
import { PlanSelection } from "./wizard/PlanSelection";
import { PersonalInfoStep } from "./wizard/PersonalInfoStep";
import { ConfirmationStep } from "./wizard/ConfirmationStep";

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
    setTimeout(resetWizard, 300); // Reset after dialog closes
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
            onSubmit={() => {
              // Handle submission
              console.log("Submitting wizard data:", wizardData);
              
              // Create mailto link
              const subject = `Project Inquiry from ${wizardData.firstName} ${wizardData.lastName}`;
              const body = `
Service Type: ${wizardData.serviceType}
Plan Type: ${wizardData.planType || 'Not selected'}

Name: ${wizardData.firstName} ${wizardData.lastName}
Email: ${wizardData.email}
Phone: ${wizardData.phone}
Company: ${wizardData.company}

Challenge: ${wizardData.challenge}
Timeline: ${wizardData.timeline}
Budget: ${wizardData.budget}
              `;
              
              const mailtoLink = `mailto:info@palmerhouseproductions.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              window.location.href = mailtoLink;
              
              handleClose();
            }}
            onBack={prevStep}
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
