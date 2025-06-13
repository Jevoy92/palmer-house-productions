
import { Input } from "@/components/ui/input";
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

interface PersonalInfoStepProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
  selectedServiceTitle: string;
}

export const PersonalInfoStep = ({ formData, updateField, selectedServiceTitle }: PersonalInfoStepProps) => {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
          Personal <span className="text-gradient-1">Information</span>
        </h2>
        <p className="text-lg text-corporate-gray">
          Tell us about yourself for {selectedServiceTitle}
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
  );
};
