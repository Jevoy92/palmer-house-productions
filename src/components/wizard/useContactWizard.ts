
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { WizardData, ServiceType } from "./types";
import { getServiceName, getPlanName } from "./utils";

export const useContactWizard = (initialService?: string) => {
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting form to Formspree...');
      
      const formData = {
        name: `${wizardData.firstName} ${wizardData.lastName}`,
        email: wizardData.email,
        phone: wizardData.phone || 'Not provided',
        company: wizardData.company,
        service_type: getServiceName(wizardData.serviceType),
        plan_type: getPlanName(wizardData.planType),
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

      console.log('Form data:', formData);
      
      const response = await fetch('https://formspree.io/f/mjkrwjpk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        nextStep(); // Go to thank you page
      } else {
        const errorData = await response.text();
        console.error('Form submission failed:', response.status, errorData);
        throw new Error(`Form submission failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or contact us directly at info@palmerhouseproductions.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    isSubmitting,
    wizardData,
    updateWizardData,
    nextStep,
    prevStep,
    resetWizard,
    handleSubmit,
  };
};
