
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface JourneyData {
  // Journey selections
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
  journeyTags: string[];
}

export const useJourneyWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [journeyData, setJourneyData] = useState<JourneyData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    challenge: "",
    budget: "",
    journeyTags: [],
  });

  const updateJourneyData = (data: Partial<JourneyData>) => {
    setJourneyData(prev => ({ ...prev, ...data }));
  };

  const addJourneyTag = (tag: string) => {
    setJourneyData(prev => ({
      ...prev,
      journeyTags: [...prev.journeyTags, tag]
    }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const resetJourney = () => {
    setCurrentStep(1);
    setJourneyData({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      challenge: "",
      budget: "",
      journeyTags: [],
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting journey form to Formspree...');
      
      const formData = {
        name: `${journeyData.firstName} ${journeyData.lastName}`,
        email: journeyData.email,
        company: journeyData.company,
        challenge: journeyData.challenge,
        budget: journeyData.budget,
        journey_tags: journeyData.journeyTags.join(', '),
        pain_point: journeyData.painPoint,
        business_stage: journeyData.businessStage,
        video_goal: journeyData.videoGoal,
        content_pace: journeyData.contentPace,
        message: `New journey-based inquiry from ${journeyData.firstName} ${journeyData.lastName} at ${journeyData.company}.

JOURNEY PATH:
Pain Point: ${journeyData.painPoint}
Business Stage: ${journeyData.businessStage}
Video Goal: ${journeyData.videoGoal}
Content Pace: ${journeyData.contentPace}

TAGS: ${journeyData.journeyTags.join(', ')}

PROJECT DETAILS:
Challenge: ${journeyData.challenge}
Budget: ${journeyData.budget}

CONTACT INFORMATION:
Email: ${journeyData.email}
Company: ${journeyData.company}`
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
    journeyData,
    updateJourneyData,
    addJourneyTag,
    nextStep,
    prevStep,
    resetJourney,
    handleSubmit,
    getCalendlyUrl,
  };
};
