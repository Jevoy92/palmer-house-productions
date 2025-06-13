
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WizardData } from "./types";

interface PersonalInfoStepProps {
  data: WizardData;
  onDataUpdate: (data: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PersonalInfoStep = ({ data, onDataUpdate, onNext, onBack }: PersonalInfoStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!data.firstName.trim()) newErrors.firstName = "First name is required";
    if (!data.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!data.email.trim()) newErrors.email = "Email is required";
    if (data.email && !/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Email is invalid";
    if (!data.company.trim()) newErrors.company = "Company is required";
    if (!data.challenge.trim()) newErrors.challenge = "Please describe your challenge";
    if (!data.timeline) newErrors.timeline = "Please select a timeline";
    if (!data.budget) newErrors.budget = "Please select a budget";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
          Tell Us About Your <span className="text-gradient-1">Vision</span>
        </h2>
        <p className="text-xl text-corporate-gray max-w-2xl mx-auto">
          Share your details so we can craft the perfect strategy for your brand.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={data.firstName}
              onChange={(e) => onDataUpdate({ firstName: e.target.value })}
              className="mt-1"
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={data.lastName}
              onChange={(e) => onDataUpdate({ lastName: e.target.value })}
              className="mt-1"
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => onDataUpdate({ email: e.target.value })}
              className="mt-1"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => onDataUpdate({ phone: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            value={data.company}
            onChange={(e) => onDataUpdate({ company: e.target.value })}
            className="mt-1"
          />
          {errors.company && (
            <p className="text-red-600 text-sm mt-1">{errors.company}</p>
          )}
        </div>

        <div>
          <Label htmlFor="challenge">What's your biggest brand challenge? *</Label>
          <Textarea
            id="challenge"
            value={data.challenge}
            onChange={(e) => onDataUpdate({ challenge: e.target.value })}
            placeholder="Tell us about what's not working with your current brand presence..."
            className="mt-1 min-h-[100px]"
          />
          {errors.challenge && (
            <p className="text-red-600 text-sm mt-1">{errors.challenge}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="timeline">Timeline *</Label>
            <select
              id="timeline"
              value={data.timeline}
              onChange={(e) => onDataUpdate({ timeline: e.target.value })}
              className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              <option value="">Select timeline</option>
              <option value="immediate">Need it ASAP</option>
              <option value="1-2-weeks">1-2 weeks</option>
              <option value="1-month">Within a month</option>
              <option value="2-3-months">2-3 months</option>
              <option value="exploring">Just exploring</option>
            </select>
            {errors.timeline && (
              <p className="text-red-600 text-sm mt-1">{errors.timeline}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="budget">Budget Range *</Label>
            <select
              id="budget"
              value={data.budget}
              onChange={(e) => onDataUpdate({ budget: e.target.value })}
              className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              <option value="">Select budget</option>
              <option value="under-5k">Under $5k</option>
              <option value="5k-10k">$5k - $10k</option>
              <option value="10k-25k">$10k - $25k</option>
              <option value="25k-plus">$25k+</option>
              <option value="tbd">To be determined</option>
            </select>
            {errors.budget && (
              <p className="text-red-600 text-sm mt-1">{errors.budget}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1 border-corporate-gray text-corporate-gray hover:bg-corporate-light"
          >
            ← Back
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            className="flex-1 gradient-social-1 text-white font-medium hover:scale-105 transition-all duration-300"
          >
            Continue →
          </Button>
        </div>
      </div>
    </div>
  );
};
