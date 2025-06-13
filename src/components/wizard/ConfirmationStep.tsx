
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface FormData {
  service: string;
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

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  color: string;
}

interface ConfirmationStepProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
  selectedService: Service | undefined;
  handlePayment: (service: 'base-glimpse' | 'full-glimpse') => void;
}

export const ConfirmationStep = ({ formData, updateField, selectedService, handlePayment }: ConfirmationStepProps) => {
  return (
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
  );
};
