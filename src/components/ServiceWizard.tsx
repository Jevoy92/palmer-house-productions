
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { sendContactFormEmail, sendGlimpseFormEmail } from "@/lib/emailService";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { ServiceSelection } from "./wizard/ServiceSelection";
import { PersonalInfoStep } from "./wizard/PersonalInfoStep";
import { ProjectDetailsStep } from "./wizard/ProjectDetailsStep";
import { ConfirmationStep } from "./wizard/ConfirmationStep";

interface ServiceWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialService?: string;
}

type ServiceType = 'contact' | 'base-glimpse' | 'full-glimpse' | 'custom';

interface FormData {
  service: ServiceType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  challenge: string;
  currentChallenge: string;
  pathway: string;
  message: string;
  timeline: string;
  budget: string;
  referralSource: string;
  readiness: string;
}

const services = [
  {
    id: 'contact' as ServiceType,
    title: 'General Consultation',
    description: 'Free strategy session to explore your brand journey',
    price: 'Free',
    icon: '💬',
    color: 'gradient-social-1'
  },
  {
    id: 'base-glimpse' as ServiceType,
    title: 'Base Glimpse',
    description: 'Quick brand clarity session with basic prototype',
    price: '$350',
    icon: '🔍',
    color: 'gradient-social-2'
  },
  {
    id: 'full-glimpse' as ServiceType,
    title: 'Full Glimpse',
    description: 'Complete brand journey with cinematic prototype',
    price: '$750',
    icon: '🎬',
    color: 'gradient-social-3'
  },
  {
    id: 'custom' as ServiceType,
    title: 'Custom Project',
    description: 'Tailored solution for your unique requirements',
    price: 'Custom',
    icon: '⭐',
    color: 'gradient-social-4'
  }
];

export const ServiceWizard = ({ open, onOpenChange, initialService }: ServiceWizardProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    service: (initialService as ServiceType) || 'contact',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    challenge: '',
    currentChallenge: '',
    pathway: '',
    message: '',
    timeline: '',
    budget: '',
    referralSource: '',
    readiness: ''
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleServiceSelect = (serviceId: ServiceType) => {
    updateField('service', serviceId);
    nextStep();
  };

  const handlePayment = (service: 'base-glimpse' | 'full-glimpse') => {
    const calendlyUrl = service === 'base-glimpse' 
      ? 'https://calendly.com/palmerhouseproductions-info/the-glimpse'
      : 'https://calendly.com/palmerhouseproductions-info/the-full-glimpse';
    window.open(calendlyUrl, '_blank');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      if (formData.service === 'contact' || formData.service === 'custom') {
        await sendContactFormEmail(formData);
      } else {
        await sendGlimpseFormEmail(formData);
      }
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      onOpenChange(false);
      navigate('/thank-you');
    } catch (error) {
      console.error('Form submission failed:', error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedService = services.find(s => s.id === formData.service);
  const totalSteps = 4;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-video-white rounded-3xl border-0 video-shadow-lg">
        <div className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    i + 1 <= step ? 'bg-gradient-social-1 text-white' : 'bg-corporate-light text-corporate-gray'
                  }`}>
                    {i + 1 <= step ? <Check size={16} /> : i + 1}
                  </div>
                  {i < totalSteps - 1 && (
                    <div className={`w-16 h-1 mx-2 ${
                      i + 1 < step ? 'bg-gradient-social-1' : 'bg-corporate-light'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center text-corporate-gray">
              Step {step} of {totalSteps}
            </div>
          </div>

          {/* Step Components */}
          {step === 1 && (
            <ServiceSelection 
              services={services} 
              onServiceSelect={handleServiceSelect} 
            />
          )}

          {step === 2 && (
            <PersonalInfoStep 
              formData={formData} 
              updateField={updateField} 
              selectedServiceTitle={selectedService?.title || ''} 
            />
          )}

          {step === 3 && (
            <ProjectDetailsStep 
              formData={formData} 
              updateField={updateField} 
            />
          )}

          {step === 4 && (
            <ConfirmationStep 
              formData={formData} 
              updateField={updateField} 
              selectedService={selectedService} 
              handlePayment={handlePayment} 
            />
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            <Button
              type="button"
              variant="outline"
              onClick={step === 1 ? () => onOpenChange(false) : prevStep}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              {step === 1 ? 'Cancel' : 'Back'}
            </Button>
            
            <div className="text-sm text-corporate-gray">
              {step}/{totalSteps}
            </div>
            
            {step < totalSteps ? (
              <Button
                onClick={nextStep}
                disabled={
                  (step === 2 && (!formData.firstName || !formData.lastName || !formData.email)) ||
                  (step === 3 && formData.service !== 'contact' && !formData.currentChallenge)
                }
                className="flex items-center gap-2 gradient-social-1 text-white"
              >
                Next
                <ChevronRight size={16} />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="gradient-social-1 text-white font-bold px-8"
              >
                {isSubmitting ? 'Sending...' : 'Send Message ✨'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
