
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { trackContactFormSubmit, trackConversion } from "@/lib/analytics";

interface ServiceData {
  // Service selections
  painPoint?: string;
  businessStage?: string;
  videoGoal?: string;
  contentPace?: string;
  
  // Personal info
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  challenge: string;
  budget: string;
  
  // Collected tags for recommendations
  serviceTags: string[];
}

export const useServiceWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [serviceData, setServiceData] = useState<ServiceData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    challenge: "",
    budget: "",
    serviceTags: [],
  });

  const updateServiceData = (data: Partial<ServiceData>) => {
    setServiceData(prev => ({ ...prev, ...data }));
  };

  const addServiceTag = (tag: string) => {
    setServiceData(prev => ({
      ...prev,
      serviceTags: [...prev.serviceTags, tag]
    }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);
  const jumpToRecommendation = () => setCurrentStep(6);

  const resetService = () => {
    setCurrentStep(1);
    setServiceData({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      challenge: "",
      budget: "",
      serviceTags: [],
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting journey form to Formspree...');
      
      const formData = {
        name: `${serviceData.firstName} ${serviceData.lastName}`,
        email: serviceData.email,
        company: serviceData.company,
        challenge: serviceData.challenge,
        budget: serviceData.budget,
        service_tags: serviceData.serviceTags.join(', '),
        pain_point: serviceData.painPoint,
        business_stage: serviceData.businessStage,
        video_goal: serviceData.videoGoal,
        content_pace: serviceData.contentPace,
        message: `New service inquiry from ${serviceData.firstName} ${serviceData.lastName} at ${serviceData.company}.

SERVICE ASSESSMENT:
Pain Point: ${serviceData.painPoint}
Business Stage: ${serviceData.businessStage}
Video Goal: ${serviceData.videoGoal}
Content Pace: ${serviceData.contentPace}

TAGS: ${serviceData.serviceTags.join(', ')}

PROJECT DETAILS:
Challenge: ${serviceData.challenge}
Budget: ${serviceData.budget}

CONTACT INFORMATION:
Email: ${serviceData.email}
Company: ${serviceData.company}`
      };

      console.log('Journey form data:', formData);
      
      const response = await fetch('https://formspree.io/f/mjkrwjpk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Journey form submitted successfully');
        trackContactFormSubmit('quick');
        trackConversion('contact_submit');
        nextStep(); // Go to celebration page
      } else {
        const errorData = await response.text();
        console.error('Journey form submission failed:', response.status, errorData);
        throw new Error(`Form submission failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Journey form submission error:', error);
      
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or contact us directly at info@palmerhouseproductions.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCalendlyUrl = () => {
    // Return Calendly URL based on journey data
    return 'https://calendly.com/palmerhouseproductions-info/general-strategy-call';
  };

  return {
    currentStep,
    isSubmitting,
    serviceData,
    updateServiceData,
    addServiceTag,
    nextStep,
    prevStep,
    resetService,
    handleSubmit,
    getCalendlyUrl,
    jumpToRecommendation,
  };
};
