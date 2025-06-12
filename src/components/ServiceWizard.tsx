
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { sendContactFormEmail, sendGlimpseFormEmail } from "@/lib/emailService";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

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

          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className="text-center">
              <h2 className="text-4xl font-display font-black text-corporate-dark mb-6">
                Choose Your <span className="text-gradient-1">Service</span>
              </h2>
              <p className="text-lg text-corporate-gray mb-12">
                What kind of journey are you looking for?
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {services.map((service) => (
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

          {/* Step 2: Personal Information */}
          {step === 2 && (
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

          {/* Step 3: Project Details */}
          {step === 3 && (
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
                      <Label htmlFor="pathway">Preferred pathway</Label>
                      <select
                        id="pathway"
                        value={formData.pathway}
                        onChange={(e) => updateField('pathway', e.target.value)}
                        className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      >
                        <option value="">Select a pathway</option>
                        <option value="Adventurous">Adventurous</option>
                        <option value="Creative">Creative</option>
                        <option value="Bold">Bold</option>
                        <option value="Authentic">Authentic</option>
                        <option value="Elevated">Elevated</option>
                        <option value="Focused">Focused</option>
                      </select>
                    </div>
                  </>
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

          {/* Step 4: Timeline & Budget / Confirmation */}
          {step === 4 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
                  {formData.service === 'contact' ? 'Almost' : 'Timeline &'} <span className="text-gradient-1">{formData.service === 'contact' ? 'Done!' : 'Budget'}</span>
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
                <div className="bg-corporate-light rounded-2xl p-6 mb-8">
                  <h3 className="text-xl font-display font-black text-corporate-dark mb-4">
                    Ready to book your {selectedService?.title}?
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => handlePayment(formData.service as 'base-glimpse' | 'full-glimpse')}
                      className="flex-1 gradient-social-1 text-white font-bold py-4 rounded-2xl hover:scale-105 transition-all duration-300"
                    >
                      Book {selectedService?.title} ({selectedService?.price})
                    </Button>
                    <div className="text-center text-corporate-gray py-2">
                      <span className="text-sm">Or submit inquiry below</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Summary */}
              <div className="bg-video-white border border-corporate-light rounded-2xl p-6">
                <h3 className="text-lg font-bold text-corporate-dark mb-4">Summary</h3>
                <div className="space-y-2 text-sm text-corporate-gray">
                  <p><strong>Service:</strong> {selectedService?.title}</p>
                  <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  {formData.company && <p><strong>Company:</strong> {formData.company}</p>}
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
