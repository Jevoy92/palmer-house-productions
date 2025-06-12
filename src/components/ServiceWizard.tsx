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
import { ChevronLeft, ChevronRight, Check, ArrowLeft, Star, Zap } from "lucide-react";
import { ServiceCard } from "./ServiceCard";

interface ServiceWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialService?: string;
}

type ServiceType = 'contact' | 'base-glimpse' | 'full-glimpse' | 'custom';
type CustomFlowStep = 'categories' | 'core-services' | 'pricing-tiers' | 'both';

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
    title: 'Custom Project',
    description: 'Explore our full range of services and pricing tiers',
    price: 'Variable',
    icon: '⭐',
    color: 'gradient-social-4'
  }
];

const serviceCategories = [
  {
    id: 'core-services',
    title: '🎬 Core Services',
    description: 'Creative content and storytelling solutions',
    icon: '🎬',
    gradient: 'gradient-social-1',
    count: 4
  },
  {
    id: 'pricing-tiers',
    title: '📊 Monthly Packages',
    description: 'Ongoing content creation partnerships',
    icon: '📊',
    gradient: 'gradient-social-2',
    count: 4
  },
  {
    id: 'both',
    title: '⚡ View All Options',
    description: 'See everything we offer at once',
    icon: '⚡',
    gradient: 'gradient-social-3',
    count: 8,
    recommended: true
  }
];

const coreServices = [
  {
    id: 'viral-expeditions',
    title: 'Viral Expeditions',
    description: 'TikTok, Reels, Shorts that break new ground and blaze fresh trails to your audience.',
    price: 'Starting $1,500/mo',
    icon: '🚀',
    gradient: 'gradient-social-1',
    features: ['TikTok & Instagram Reels', 'YouTube Shorts', 'Viral content strategy']
  },
  {
    id: 'brand-adventures',
    title: 'Brand Adventures',
    description: 'Corporate storytelling that ventures beyond the ordinary to capture authentic brand narratives.',
    price: 'Starting $3,500/mo',
    icon: '🎬',
    gradient: 'gradient-social-2',
    features: ['Brand storytelling', 'Corporate videos', 'Authentic narratives'],
    recommended: true
  },
  {
    id: 'pathfinding-strategy',
    title: 'Pathfinding Strategy',
    description: 'Chart uncharted creative territory with content planning that discovers new audience connections.',
    price: 'Starting $1,500/mo',
    icon: '🧭',
    gradient: 'gradient-social-3',
    features: ['Content strategy', 'Audience research', 'Creative planning']
  },
  {
    id: 'territory-expansion',
    title: 'Territory Expansion',
    description: 'Multi-platform campaigns that explore new frontiers and expand your brand\'s reach.',
    price: 'Starting $7,500/mo',
    icon: '🗺️',
    gradient: 'gradient-social-4',
    features: ['Multi-platform campaigns', 'Brand expansion', 'Market penetration']
  }
];

const pricingTiers = [
  {
    id: 'trailhead',
    title: 'Trailhead',
    description: 'For solo adventurers and early-stage businesses ready to explore the power of video.',
    price: '$1,500/month',
    icon: '🥾',
    gradient: 'gradient-social-1',
    features: ['Up to 4 minutes of premium content', '1 dedicated shoot day/month', '1x monthly strategy session']
  },
  {
    id: 'basecamp',
    title: 'Basecamp',
    description: 'For growing teams ready to establish a stronger presence across multiple platforms.',
    price: '$3,500/month',
    icon: '🏕',
    gradient: 'gradient-social-2',
    features: ['10 minutes of content', '2 shoot days/month', '2x strategy sessions'],
    recommended: true
  },
  {
    id: 'summit',
    title: 'Summit',
    description: 'For regional brands and agencies pushing for authority, consistency, and scale.',
    price: '$7,500/month',
    icon: '🏔',
    gradient: 'gradient-social-3',
    features: ['25 minutes of content', 'Flexible shoot schedule', 'Weekly strategy sessions']
  },
  {
    id: 'monthly-hosting',
    title: 'Monthly Hosting',
    description: 'For large enterprises and organizations who demand premium content, data, and agility.',
    price: '$20,000/month',
    icon: '🌄',
    gradient: 'gradient-social-4',
    features: ['75 minutes of cinematic content', 'Unlimited shoot days', 'Real-time analytics dashboard']
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
    gradient: 'gradient-social-1'
  },
  {
    id: 'focused',
    title: 'Focused',
    description: 'Strategic precision targeting specific goals and audiences',
    icon: '🎯',
    gradient: 'gradient-social-2'
  }
];

const getServiceInfo = (serviceId: string) => {
  const allServices = [...coreServices, ...pricingTiers];
  return allServices.find(s => s.id === serviceId);
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

export const ServiceWizard = ({ open, onOpenChange, initialService }: ServiceWizardProps) => {
  const [step, setStep] = useState(1);
  const [customFlowStep, setCustomFlowStep] = useState<CustomFlowStep>('categories');
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    readiness: ''
  });

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleServiceSelect = (serviceId: ServiceType) => {
    updateField('service', serviceId);
    if (serviceId === 'custom') {
      setCustomFlowStep('categories');
      setStep(2);
    } else {
      setStep(3);
    }
  };

  const handleCategorySelect = (categoryId: CustomFlowStep) => {
    setCustomFlowStep(categoryId);
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
  const totalSteps = formData.service === 'custom' ? 5 : 4;

  // Fixed validation logic
  const canProceedFromStep2 = formData.service !== 'custom' || formData.selectedServices.length > 0;
  const canProceedFromPersonalInfo = formData.firstName && formData.lastName && formData.email;
  const canProceedFromProjectDetails = 
    formData.service === 'contact' || 
    (formData.service === 'custom' && (formData.pathway || formData.message)) ||
    ((formData.service === 'base-glimpse' || formData.service === 'full-glimpse') && formData.currentChallenge);

  const getServicesToShow = () => {
    if (customFlowStep === 'core-services') return coreServices;
    if (customFlowStep === 'pricing-tiers') return pricingTiers;
    if (customFlowStep === 'both') return [...coreServices, ...pricingTiers];
    return [];
  };

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

          {/* Step 2: Custom Service Selection */}
          {step === 2 && formData.service === 'custom' && (
            <div>
              {customFlowStep === 'categories' ? (
                // Category Selection
                <div className="text-center">
                  <h2 className="text-4xl font-display font-black text-corporate-dark mb-6">
                    What Are You <span className="text-gradient-1">Looking For?</span>
                  </h2>
                  <p className="text-lg text-corporate-gray mb-12">
                    Choose your area of interest to see relevant options
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {serviceCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id as CustomFlowStep)}
                        className="group p-8 bg-video-white border-2 border-corporate-light rounded-3xl hover:border-social-purple transition-all duration-300 text-center hover:scale-105 relative"
                      >
                        {category.recommended && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge className="gradient-social-2 text-white font-bold px-3 py-1">
                              <Star size={12} className="mr-1" />
                              Popular Choice
                            </Badge>
                          </div>
                        )}
                        <div className={`w-16 h-16 ${category.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto`}>
                          {category.icon}
                        </div>
                        <h3 className="text-xl font-display font-black text-corporate-dark mb-2">
                          {category.title}
                        </h3>
                        <p className="text-corporate-gray mb-4">{category.description}</p>
                        <div className="text-sm text-social-purple font-bold">
                          {category.count} options available
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                // Service Selection within Category
                <div>
                  <div className="flex items-center mb-8">
                    <Button
                      variant="ghost"
                      onClick={() => setCustomFlowStep('categories')}
                      className="flex items-center gap-2 text-corporate-gray hover:text-corporate-dark"
                    >
                      <ArrowLeft size={16} />
                      Back to Categories
                    </Button>
                  </div>
                  
                  <div className="text-center mb-8">
                    <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
                      {customFlowStep === 'core-services' && '🎬 Core Services'}
                      {customFlowStep === 'pricing-tiers' && '📊 Monthly Packages'}
                      {customFlowStep === 'both' && '⚡ All Services & Packages'}
                    </h2>
                    <p className="text-lg text-corporate-gray">
                      Select the services that interest you {formData.selectedServices.length > 0 && `(${formData.selectedServices.length} selected)`}
                    </p>
                  </div>
                  
                  <div className={`grid gap-6 ${customFlowStep === 'both' ? 'md:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-2'}`}>
                    {getServicesToShow().map((service) => (
                      <ServiceCard
                        key={service.id}
                        {...service}
                        selected={formData.selectedServices.includes(service.id)}
                        onClick={handleCustomServiceSelect}
                      />
                    ))}
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
                )}
                
                {(formData.service === 'base-glimpse' || formData.service === 'full-glimpse') && (
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

          {/* Step 5: Enhanced Visual Summary */}
          {step === (formData.service === 'custom' ? 5 : 4) && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
                  {formData.service === 'contact' ? 'Almost' : 'Review &'} <span className="text-gradient-1">{formData.service === 'contact' ? 'Done!' : 'Confirm'}</span>
                </h2>
                <p className="text-lg text-corporate-gray">
                  {formData.service === 'contact' ? 'Ready to send your message' : 'Final details for your project'}
                </p>
              </div>
              
              {formData.service !== 'contact' && (
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <Label htmlFor="timeline">Timeline *</Label>
                    <select
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => updateField('timeline', e.target.value)}
                      className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    >
                      <option value="">Select timeline</option>
                      <option value="immediate">Need it ASAP</option>
                      <option value="1-2-weeks">1-2 weeks</option>
                      <option value="1-month">Within a month</option>
                      <option value="2-3-months">2-3 months</option>
                      <option value="exploring">Just exploring</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="budget">Budget Range *</Label>
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => updateField('budget', e.target.value)}
                      className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    >
                      <option value="">Select budget</option>
                      <option value="under-5k">Under $5k</option>
                      <option value="5k-10k">$5k - $10k</option>
                      <option value="10k-25k">$10k - $25k</option>
                      <option value="25k-plus">$25k+</option>
                      <option value="tbd">To be determined</option>
                    </select>
                  </div>
                </div>
              )}
              
              {/* Payment Options for Glimpse Services */}
              {(formData.service === 'base-glimpse' || formData.service === 'full-glimpse') && (
                <div className="bg-gradient-social-1 rounded-2xl p-6 mb-8 text-white">
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
              )}
              
              {/* Enhanced Visual Summary */}
              <div className="bg-gradient-to-br from-video-white to-corporate-light rounded-3xl p-8 video-shadow-lg border border-corporate-light">
                <h3 className="text-2xl font-bold text-corporate-dark mb-6 flex items-center">
                  <div className="w-8 h-8 gradient-social-1 rounded-full flex items-center justify-center mr-3">
                    <Check className="text-white" size={18} />
                  </div>
                  Order Summary
                </h3>
                
                {/* Service Card */}
                <div className="bg-video-white rounded-2xl p-6 mb-6 border-2 border-social-purple/20">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${selectedService?.color} rounded-2xl flex items-center justify-center text-2xl mr-4`}>
                      {selectedService?.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-display font-black text-corporate-dark">
                        {selectedService?.title}
                      </h4>
                      <p className="text-corporate-gray">{selectedService?.description}</p>
                    </div>
                    <div className={`ml-auto px-4 py-2 ${selectedService?.color} text-white rounded-xl font-bold`}>
                      {selectedService?.price}
                    </div>
                  </div>
                </div>

                {/* Selected Services for Custom Projects */}
                {formData.selectedServices.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-corporate-dark mb-4 flex items-center">
                      <Star className="mr-2 text-social-purple" size={20} />
                      Selected Services ({formData.selectedServices.length})
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {formData.selectedServices.map((serviceId) => {
                        const service = getServiceInfo(serviceId);
                        if (!service) return null;
                        return (
                          <div key={serviceId} className="bg-video-white rounded-xl p-4 border border-corporate-light">
                            <div className="flex items-center">
                              <div className={`w-8 h-8 ${service.gradient} rounded-lg flex items-center justify-center text-lg mr-3`}>
                                {service.icon}
                              </div>
                              <div className="flex-1">
                                <h5 className="font-bold text-corporate-dark text-sm">{service.title}</h5>
                                <p className="text-xs text-corporate-gray">{service.price}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-video-white rounded-xl">
                      <span className="font-medium text-corporate-gray">Contact</span>
                      <span className="text-corporate-dark font-bold">{formData.firstName} {formData.lastName}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-video-white rounded-xl">
                      <span className="font-medium text-corporate-gray">Email</span>
                      <span className="text-corporate-dark">{formData.email}</span>
                    </div>
                    {formData.company && (
                      <div className="flex items-center justify-between p-3 bg-video-white rounded-xl">
                        <span className="font-medium text-corporate-gray">Company</span>
                        <span className="text-corporate-dark">{formData.company}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    {formData.timeline && (
                      <div className="flex items-center justify-between p-3 bg-video-white rounded-xl">
                        <span className="font-medium text-corporate-gray">Timeline</span>
                        <Badge variant="secondary">{getTimelineLabel(formData.timeline)}</Badge>
                      </div>
                    )}
                    {formData.budget && (
                      <div className="flex items-center justify-between p-3 bg-video-white rounded-xl">
                        <span className="font-medium text-corporate-gray">Budget</span>
                        <Badge className="gradient-social-2 text-white">{getBudgetLabel(formData.budget)}</Badge>
                      </div>
                    )}
                    {formData.pathway && (
                      <div className="p-3 bg-video-white rounded-xl">
                        <span className="font-medium text-corporate-gray block mb-2">Preferred Pathway</span>
                        <div className="flex items-center">
                          <div className={`w-6 h-6 ${getPathwayInfo(formData.pathway)?.gradient} rounded-lg flex items-center justify-center text-sm mr-2`}>
                            {getPathwayInfo(formData.pathway)?.icon}
                          </div>
                          <span className="text-corporate-dark font-bold">{getPathwayInfo(formData.pathway)?.title}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Messages */}
                {(formData.challenge || formData.currentChallenge || formData.message) && (
                  <div className="bg-video-white rounded-xl p-4 border-l-4 border-social-purple">
                    <h5 className="font-bold text-corporate-dark mb-2">Your Message</h5>
                    {formData.challenge && (
                      <div className="mb-2">
                        <span className="text-xs text-corporate-gray font-medium">Challenge:</span>
                        <p className="text-sm text-corporate-dark">{formData.challenge}</p>
                      </div>
                    )}
                    {formData.currentChallenge && (
                      <div className="mb-2">
                        <span className="text-xs text-corporate-gray font-medium">Brand Challenge:</span>
                        <p className="text-sm text-corporate-dark">{formData.currentChallenge}</p>
                      </div>
                    )}
                    {formData.message && (
                      <div>
                        <span className="text-xs text-corporate-gray font-medium">Additional Notes:</span>
                        <p className="text-sm text-corporate-dark">{formData.message}</p>
                      </div>
                    )}
                  </div>
                )}
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
                  (step === 2 && formData.service === 'custom' && customFlowStep === 'categories') ||
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
