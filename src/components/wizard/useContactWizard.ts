
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { WizardData, ServiceType } from "./types";
import { getServiceName, getServiceCategoryName } from "./utils";
import { trackContactFormSubmit, trackConversion } from "@/lib/analytics";

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
      budget: "",
    });
  };

  const getQualificationText = () => {
    const qualifications = [];
    
    if (wizardData.businessProfile) {
      const profileNames = {
        solo: "Solo Founder / Small Team",
        growing: "Growing Business",
        established: "Established Business", 
        agency: "Agency / Creative Firm",
        enterprise: "Enterprise / Multi-Brand",
        nonprofit: "Nonprofit / Special Project"
      };
      qualifications.push(`Business Stage: ${profileNames[wizardData.businessProfile]}`);
    }
    
    if (wizardData.businessType) {
      const typeNames = {
        service: "Service-Based Business",
        product: "Product-Based Business",
        saas: "SaaS / Tech",
        coaching: "Coaching / Consulting",
        professional: "Professional Services",
        media: "Media / Education",
        nonprofit: "Nonprofit / Advocacy"
      };
      qualifications.push(`Business Type: ${typeNames[wizardData.businessType]}`);
    }
    
    if (wizardData.videoUseCase) {
      const useCaseNames = {
        "lead-generation": "Lead Generation & Brand Growth",
        "training": "Internal Training & Operations",
        "onboarding": "Client Onboarding & Experience",
        "authority": "Authority / Thought Leadership",
        "education": "Customer Education & Support",
        "sales": "Sales Support & Conversion"
      };
      qualifications.push(`Primary Use Case: ${useCaseNames[wizardData.videoUseCase]}`);
    }
    
    if (wizardData.contentVolume) {
      const volumeNames = {
        "1-2": "1-2 videos per month",
        "3-4": "3-4 videos per month", 
        "5-8": "5-8 videos per month",
        "8-plus": "8+ videos per month"
      };
      qualifications.push(`Content Volume: ${volumeNames[wizardData.contentVolume]}`);
    }
    
    if (wizardData.timeline) {
      const timelineNames = {
        "immediately": "Immediately",
        "1-3-months": "1-3 months",
        "3-6-months": "3-6 months", 
        "planning": "Planning / Research Mode"
      };
      qualifications.push(`Timeline: ${timelineNames[wizardData.timeline]}`);
    }
    
    if (wizardData.geographic) {
      const geoNames = {
        "seattle": "Seattle Metro / Pacific Northwest",
        "national": "National (United States)",
        "international": "International",
        "online": "Primarily Online / Virtual",
        "custom": wizardData.geographicCustom || "Custom"
      };
      qualifications.push(`Service Area: ${geoNames[wizardData.geographic]}`);
    }
    
    return qualifications.join('\n');
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
        service_category: getServiceCategoryName(wizardData.serviceCategory),
        challenge: wizardData.challenge,
        timeline: wizardData.timeline,
        budget: wizardData.budget,
        qualifications: getQualificationText(),
        message: `New qualified project inquiry from ${wizardData.firstName} ${wizardData.lastName} at ${wizardData.company}.

QUALIFICATION DETAILS:
${getQualificationText()}

SERVICE SELECTION:
Service: ${getServiceName(wizardData.serviceType)}
Category: ${getServiceCategoryName(wizardData.serviceCategory)}
Budget: ${wizardData.budget}

PROJECT DETAILS:
Challenge: ${wizardData.challenge}

CONTACT INFORMATION:
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
        trackContactFormSubmit('wizard');
        trackConversion('contact_submit');
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
