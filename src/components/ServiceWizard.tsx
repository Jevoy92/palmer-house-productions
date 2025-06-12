
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { sendContactFormEmail, sendGlimpseFormEmail } from "@/lib/emailService";
import { ChevronLeft, ChevronRight, Check, ArrowLeft, Star, Zap, ToggleLeft, ToggleRight } from "lucide-react";
import { ServiceCard } from "./ServiceCard";

interface ServiceWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialService?: string;
}

type ServiceType = 'contact' | 'base-glimpse' | 'full-glimpse' | 'custom';
type CommitmentType = 'monthly' | '3-month' | '6-month';

interface FormData {
  service: ServiceType;
  selectedServices: string[];
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
  commitment: CommitmentType;
}

const mainServices = [
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
    title: 'Monthly Services',
    description: 'Ongoing content creation partnerships',
    price: 'Variable',
    icon: '⭐',
    color: 'gradient-social-4'
  }
];

// Your real monthly services with actual pricing
const monthlyServices = [
  {
    id: 'trailhead',
    title: 'Trailhead',
    description: 'For solo adventurers and early-stage businesses ready to explore the power of video.',
    monthlyPrice: 1500,
    icon: '🥾',
    gradient: 'gradient-social-1',
    features: ['Up to 4 minutes of premium content', '1 dedicated shoot day/month', '1x monthly strategy session'],
    perfectFor: 'Solo entrepreneurs and startups'
  },
  {
    id: 'basecamp',
    title: 'Basecamp',
    description: 'For growing teams ready to establish a stronger presence across multiple platforms.',
    monthlyPrice: 3500,
    icon: '🏕',
    gradient: 'gradient-social-2',
    features: ['10 minutes of content', '2 shoot days/month', '2x strategy sessions'],
    recommended: true,
    perfectFor: 'Growing businesses and teams'
  },
  {
    id: 'summit',
    title: 'Summit',
    description: 'For regional brands and agencies pushing for authority, consistency, and scale.',
    monthlyPrice: 7500,
    icon: '🏔',
    gradient: 'gradient-social-3',
    features: ['25 minutes of content', 'Flexible shoot schedule', 'Weekly strategy sessions'],
    perfectFor: 'Regional brands and agencies'
  },
  {
    id: 'monthly-hosting',
    title: 'Monthly Hosting',
    description: 'For large enterprises and organizations who demand premium content, data, and agility.',
    monthlyPrice: 20000,
    icon: '🌄',
    gradient: 'gradient-social-4',
    features: ['75 minutes of cinematic content', 'Unlimited shoot days', 'Real-time analytics dashboard'],
    perfectFor: 'Large enterprises'
  }
];

const pathwayOptions = [
  {
    id: 'adventurous',
    title: 'Adventurous',
    description: 'Bold moves that push boundaries and take creative risks',
    icon: '🏔️',
    gradient: 'gradient-social-1'
  },
  {
    id: 'creative',
    title: 'Creative',
    description: 'Artistic storytelling that showcases unique brand personality',
    icon: '🎨',
    gradient: 'gradient-social-2'
  },
  {
    id: 'bold',
    title: 'Bold',
    description: 'Confident messaging that commands attention and respect',
    icon: '⚡',
    gradient: 'gradient-social-3'
  },
  {
    id: 'authentic',
    title: 'Authentic',
    description: 'Genuine narratives that build trust and human connection',
    icon: '💎',
    gradient: 'gradient-social-4'
  },
  {
    id: 'elevated',
    title: 'Elevated',
    description: 'Sophisticated approach that positions you as premium',
    icon: '👑',
    gradient: 'gradient-social-5'
  },
  {
    id: 'focused',
    title: 'Focused',
    description: 'Strategic precision targeting specific goals and audiences',
    icon: '🎯',
    gradient: 'gradient-social-6'
  }
];

const getServiceInfo = (serviceId: string) => {
  return monthlyServices.find(s => s.id === serviceId);
};

const getPathwayInfo = (pathwayId: string) => {
  const pathway = pathwayOptions.find(p => p.id === pathwayId);
  return pathway ? pathway : null;
};

const getTimelineLabel = (timeline: string) => {
  const timelineMap: { [key: string]: string } = {
    'immediate': 'Need it ASAP',
    '1-2-weeks': '1-2 weeks',
    '1-month': 'Within a month',
    '2-3-months': '2-3 months',
    'exploring': 'Just exploring'
  };
  return timelineMap[timeline] || timeline;
};

const getBudgetLabel = (budget: string) => {
  const budgetMap: { [key: string]: string } = {
    'under-5k': 'Under $5k',
    '5k-10k': '$5k - $10k',
    '10k-25k': '$10k - $25k',
    '25k-plus': '$25k+',
    'tbd': 'To be determined'
  };
  return budgetMap[budget] || budget;
};

const calculateDiscountedPrice = (monthlyPrice: number, commitment: CommitmentType) => {
  if (commitment === '3-month') return monthlyPrice * 0.9; // 10% discount
  if (commitment === '6-month') return monthlyPrice * 0.8; // 20% discount
  return monthlyPrice;
};

const getSavingsAmount = (monthlyPrice: number, commitment: CommitmentType) => {
  const discountedPrice = calculateDiscountedPrice(monthlyPrice, commitment);
  return monthlyPrice - discountedPrice;
};

const getSavingsPercentage = (commitment: CommitmentType) => {
  if (commitment === '3-month') return 10;
  if (commitment === '6-month') return 20;
  return 0;
};

export const ServiceWizard = ({ open, onOpenChange, initialService }: ServiceWizardProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCommitmentToggle, setShowCommitmentToggle] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    service: (initialService as ServiceType) || 'contact',
    selectedServices: [],
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
    readiness: '',
    commitment: 'monthly'
  });

  const updateField = (field: keyof FormData, value: string | string[] | CommitmentType) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleServiceSelect = (serviceId: ServiceType) => {
    updateField('service', serviceId);
    if (serviceId === 'custom') {
      setShowCommitmentToggle(true);
      setStep(2);
    } else {
      setShowCommitmentToggle(false);
      setStep(3);
    }
  };

  const handleCustomServiceSelect = (serviceId: string) => {
    const currentSelected = formData.selectedServices;
    const newSelected = currentSelected.includes(serviceId)
      ? currentSelected.filter(id => id !== serviceId)
      : [...currentSelected, serviceId];
    updateField('selectedServices', newSelected);
  };

  const handlePathwaySelect = (pathwayId: string) => {
    updateField('pathway', pathwayId);
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
    } catch (error) {
      console.error('Form submission failed:', error);
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
    } finally {
      setIsSubmitting(false);
      onOpenChange(false);
      navigate('/thank-you');
    }
  };

  const selectedService = mainServices.find(s => s.id === formData.service);
  const totalSteps = formData.service === 'custom' ? 4 : 3;

  // Fixed validation logic
  const canProceedFromStep2 = formData.service !== 'custom' || formData.selectedServices.length > 0;
  const canProceedFromPersonalInfo = formData.firstName && formData.lastName && formData.email;
  const canProceedFromProjectDetails = 
    formData.service === 'contact' || 
    (formData.service === 'custom' && (formData.pathway || formData.message)) ||
    ((formData.service === 'base-glimpse' || formData.service === 'full-glimpse') && formData.currentChallenge);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-video-white rounded-3xl border-0 video-shadow-lg">
        <DialogTitle className="sr-only">Service Selection Wizard</DialogTitle>
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
                    <div className={`w-12 h-1 mx-2 ${
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

          {/* Step 1: Main Service Selection */}
          {step === 1 && (
            <div className="text-center">
              <h2 className="text-4xl font-display font-black text-corporate-dark mb-6">
                Choose Your <span className="text-gradient-1">Service</span>
              </h2>
              <p className="text-lg text-corporate-gray mb-12">
                What kind of journey are you looking for?
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {mainServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className="group p-8 bg-video-white border-2 border-corporate-light rounded-3xl hover:border-social-purple transition-all duration-300 text-left hover:scale-105"
                  >
                    <div className="text-center mb-6">
                      <div className="text-4xl mb-4">{service.icon}</div>
                      <h3 className="text-2xl font-display font-black text-corporate-dark mb-2">
                        {service.title}
                      </h3>
                      <p className="text-corporate-gray mb-4">{service.description}</p>
                      <div className={`inline-block px-4 py-2 ${service.color} text-white rounded-xl font-bold`}>
                        {service.price}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Monthly Service Selection */}
          {step === 2 && formData.service === 'custom' && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
                  Choose Your <span className="text-gradient-1">Monthly Package</span>
                </h2>
                <p className="text-lg text-corporate-gray mb-6">
                  Select services that interest you {formData.selectedServices.length > 0 && `(${formData.selectedServices.length} selected)`}
                </p>
                
                {/* Commitment Toggle */}
                <div className="flex items-center justify-center gap-4 mb-8 p-4 bg-corporate-light/30 rounded-2xl">
                  <span className={`font-medium ${formData.commitment === 'monthly' ? 'text-corporate-dark' : 'text-corporate-gray'}`}>
                    Monthly
                  </span>
                  <button
                    onClick={() => updateField('commitment', formData.commitment === 'monthly' ? '3-month' : 'monthly')}
                    className="flex items-center"
                  >
                    {formData.commitment === 'monthly' ? (
                      <ToggleLeft size={32} className="text-corporate-gray" />
                    ) : (
                      <ToggleRight size={32} className="text-social-purple" />
                    )}
                  </button>
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${formData.commitment !== 'monthly' ? 'text-corporate-dark' : 'text-corporate-gray'}`}>
                      Commit & Save
                    </span>
                    <select
                      value={formData.commitment === 'monthly' ? '3-month' : formData.commitment}
                      onChange={(e) => updateField('commitment', e.target.value as CommitmentType)}
                      disabled={formData.commitment === 'monthly'}
                      className="text-sm bg-transparent border-none outline-none"
                    >
                      <option value="3-month">3 months (10% off)</option>
                      <option value="6-month">6 months (20% off)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {monthlyServices.map((service) => {
                  const displayPrice = formData.commitment === 'monthly' 
                    ? service.monthlyPrice 
                    : calculateDiscountedPrice(service.monthlyPrice, formData.commitment);
                  const savings = getSavingsAmount(service.monthlyPrice, formData.commitment);
                  
                  return (
                    <ServiceCard
                      key={service.id}
                      id={service.id}
                      title={service.title}
                      description={service.description}
                      price={`$${displayPrice.toLocaleString()}${formData.commitment === 'monthly' ? '/mo' : `/${formData.commitment}`}`}
                      icon={service.icon}
                      gradient={service.gradient}
                      features={service.features}
                      recommended={service.recommended}
                      selected={formData.selectedServices.includes(service.id)}
                      onClick={handleCustomServiceSelect}
                    />
                  );
                })}
              </div>
              
              {formData.commitment !== 'monthly' && formData.selectedServices.length > 0 && (
                <div className="mt-6 text-center">
                  <div className="inline-block bg-gradient-social-2 text-white px-6 py-3 rounded-2xl font-bold">
                    💰 You save {getSavingsPercentage(formData.commitment)}% with {formData.commitment} commitment!
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Personal Information */}
          {step === (formData.service === 'custom' ? 3 : 2) && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
                  Personal <span className="text-gradient-1">Information</span>
                </h2>
                <p className="text-lg text-corporate-gray">
                  Tell us about yourself for {selectedService?.title}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="mt-1"
                  />
                </div>
                {(formData.service === 'base-glimpse' || formData.service === 'full-glimpse' || formData.service === 'custom') && (
                  <>
                    <div>
                      <Label htmlFor="company">Company *</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => updateField('company', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => updateField('website', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Project Details */}
          {step === (formData.service === 'custom' ? 4 : 3) && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
                  Project <span className="text-gradient-1">Details</span>
                </h2>
                <p className="text-lg text-corporate-gray">
                  Help us understand your vision
                </p>
              </div>
              
              <div className="space-y-6">
                {formData.service === 'contact' && (
                  <>
                    <div>
                      <Label htmlFor="challenge">What's your biggest challenge?</Label>
                      <Textarea
                        id="challenge"
                        value={formData.challenge}
                        onChange={(e) => updateField('challenge', e.target.value)}
                        className="mt-1 min-h-[100px]"
                        placeholder="Tell us about what's not working..."
                      />
                    </div>
                    <div>
                      <Label className="text-lg font-bold text-corporate-dark mb-4 block">
                        Choose Your Preferred Pathway
                      </Label>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pathwayOptions.map((pathway) => (
                          <button
                            key={pathway.id}
                            onClick={() => handlePathwaySelect(pathway.id)}
                            className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                              formData.pathway === pathway.id
                                ? 'border-social-purple bg-social-purple/5'
                                : 'border-corporate-light hover:border-social-purple/50'
                            }`}
                          >
                            <div className="text-center mb-3">
                              <div className="text-2xl mb-2">{pathway.icon}</div>
                              <h3 className="font-bold text-corporate-dark">{pathway.title}</h3>
                            </div>
                            <p className="text-sm text-corporate-gray">{pathway.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {formData.service === 'custom' && (
                  <>
                    <div>
                      <Label className="text-lg font-bold text-corporate-dark mb-4 block">
                        Choose Your Preferred Pathway
                      </Label>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pathwayOptions.map((pathway) => (
                          <button
                            key={pathway.id}
                            onClick={() => handlePathwaySelect(pathway.id)}
                            className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                              formData.pathway === pathway.id
                                ? 'border-social-purple bg-social-purple/5'
                                : 'border-corporate-light hover:border-social-purple/50'
                            }`}
                          >
                            <div className="text-center mb-3">
                              <div className="text-2xl mb-2">{pathway.icon}</div>
                              <h3 className="font-bold text-corporate-dark">{pathway.title}</h3>
                            </div>
                            <p className="text-sm text-corporate-gray">{pathway.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Summary of selected services */}
                    {formData.selectedServices.length > 0 && (
                      <div className="bg-gradient-to-br from-video-white to-corporate-light rounded-2xl p-6 border border-corporate-light">
                        <h4 className="text-lg font-bold text-corporate-dark mb-4 flex items-center">
                          <Star className="mr-2 text-social-purple" size={20} />
                          Selected Services Summary
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          {formData.selectedServices.map((serviceId) => {
                            const service = getServiceInfo(serviceId);
                            if (!service) return null;
                            const displayPrice = formData.commitment === 'monthly' 
                              ? service.monthlyPrice 
                              : calculateDiscountedPrice(service.monthlyPrice, formData.commitment);
                            return (
                              <div key={serviceId} className="bg-video-white rounded-xl p-4 border border-corporate-light">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className={`w-8 h-8 ${service.gradient} rounded-lg flex items-center justify-center text-lg mr-3`}>
                                      {service.icon}
                                    </div>
                                    <div>
                                      <h5 className="font-bold text-corporate-dark text-sm">{service.title}</h5>
                                      <p className="text-xs text-corporate-gray">
                                        ${displayPrice.toLocaleString()}{formData.commitment === 'monthly' ? '/mo' : `/${formData.commitment}`}
                                      </p>
                                    </div>
                                  </div>
                                  {formData.commitment !== 'monthly' && (
                                    <Badge className="gradient-social-2 text-white text-xs">
                                      Save {getSavingsPercentage(formData.commitment)}%
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {formData.commitment !== 'monthly' && (
                          <div className="text-center">
                            <div className="inline-block bg-gradient-social-2 text-white px-4 py-2 rounded-xl font-bold text-sm">
                              💰 Total Monthly Savings: $
                              {formData.selectedServices.reduce((total, serviceId) => {
                                const service = getServiceInfo(serviceId);
                                return service ? total + getSavingsAmount(service.monthlyPrice, formData.commitment) : total;
                              }, 0).toLocaleString()}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
                
                {(formData.service === 'base-glimpse' || formData.service === 'full-glimpse') && (
                  <>
                    <div>
                      <Label htmlFor="currentChallenge">What's your biggest brand challenge right now? *</Label>
                      <Textarea
                        id="currentChallenge"
                        value={formData.currentChallenge}
                        onChange={(e) => updateField('currentChallenge', e.target.value)}
                        className="mt-1 min-h-[100px]"
                        placeholder="Tell us about what's not working with your current brand presence..."
                      />
                    </div>
                    
                    {/* Payment Options for Glimpse Services */}
                    <div className="bg-gradient-social-1 rounded-2xl p-6 text-white">
                      <h3 className="text-xl font-display font-black mb-4 flex items-center">
                        <Zap className="mr-2" size={24} />
                        Ready to book your {selectedService?.title}?
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          onClick={() => handlePayment(formData.service as 'base-glimpse' | 'full-glimpse')}
                          className="flex-1 bg-white text-corporate-dark font-bold py-4 rounded-2xl hover:bg-gray-100 hover:scale-105 transition-all duration-300"
                        >
                          Book {selectedService?.title} ({selectedService?.price})
                        </Button>
                        <div className="text-center py-2">
                          <span className="text-sm opacity-90">Or submit inquiry below</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                <div>
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    className="mt-1 min-h-[100px]"
                    placeholder="Any additional details or questions..."
                  />
                </div>
              </div>
            </div>
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
                  (step === 2 && !canProceedFromStep2) ||
                  (step === (formData.service === 'custom' ? 3 : 2) && !canProceedFromPersonalInfo) ||
                  (step === (formData.service === 'custom' ? 4 : 3) && !canProceedFromProjectDetails)
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
