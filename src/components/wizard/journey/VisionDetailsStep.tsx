
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface VisionDetailsStepProps {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    challenge: string;
    budget: string;
  };
  onDataUpdate: (data: any) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export const VisionDetailsStep = ({ data, onDataUpdate, onSubmit, onBack, isSubmitting }: VisionDetailsStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!data.firstName.trim()) newErrors.firstName = "First name is required";
    if (!data.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!data.email.trim()) newErrors.email = "Email is required";
    if (data.email && !/\S+@\S+\.\S+/.test(data.email)) newErrors.email = "Email is invalid";
    if (!data.company.trim()) newErrors.company = "Company is required";
    if (!data.challenge.trim()) newErrors.challenge = "Please describe your challenge";
    if (!data.budget) newErrors.budget = "Please select a budget";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit();
    }
  };

  return (
    <div className="p-8 text-center">
      <div className="mb-8">
        <div className="text-6xl mb-4">🎯</div>
        <h2 className="text-4xl font-display font-black text-corporate-dark mb-4">
          Final Stop: What's Your <span className="text-gradient-1">Vision</span>?
        </h2>
        <p className="text-xl text-corporate-gray max-w-2xl mx-auto">
          Just a few details to help us tailor your custom gameplan.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Label htmlFor="firstName" className="absolute -top-2 left-3 bg-white px-1 text-sm font-medium text-corporate-dark z-10">
              First Name *
            </Label>
            <Input
              id="firstName"
              value={data.firstName}
              onChange={(e) => onDataUpdate({ firstName: e.target.value })}
              className="pt-4 border-2 focus:border-corporate-dark transition-all duration-300"
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>
          
          <div className="relative">
            <Label htmlFor="lastName" className="absolute -top-2 left-3 bg-white px-1 text-sm font-medium text-corporate-dark z-10">
              Last Name *
            </Label>
            <Input
              id="lastName"
              value={data.lastName}
              onChange={(e) => onDataUpdate({ lastName: e.target.value })}
              className="pt-4 border-2 focus:border-corporate-dark transition-all duration-300"
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="relative">
          <Label htmlFor="email" className="absolute -top-2 left-3 bg-white px-1 text-sm font-medium text-corporate-dark z-10">
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onDataUpdate({ email: e.target.value })}
            className="pt-4 border-2 focus:border-corporate-dark transition-all duration-300"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="relative">
          <Label htmlFor="company" className="absolute -top-2 left-3 bg-white px-1 text-sm font-medium text-corporate-dark z-10">
            Company Name *
          </Label>
          <Input
            id="company"
            value={data.company}
            onChange={(e) => onDataUpdate({ company: e.target.value })}
            className="pt-4 border-2 focus:border-corporate-dark transition-all duration-300"
          />
          {errors.company && (
            <p className="text-red-600 text-sm mt-1">{errors.company}</p>
          )}
        </div>

        <div className="relative">
          <Label htmlFor="challenge" className="absolute -top-2 left-3 bg-white px-1 text-sm font-medium text-corporate-dark z-10">
            What's the biggest challenge right now? *
          </Label>
          <Textarea
            id="challenge"
            value={data.challenge}
            onChange={(e) => onDataUpdate({ challenge: e.target.value })}
            placeholder="Tell us what's keeping you up at night..."
            className="pt-4 border-2 focus:border-corporate-dark transition-all duration-300 min-h-[100px]"
          />
          {errors.challenge && (
            <p className="text-red-600 text-sm mt-1">{errors.challenge}</p>
          )}
        </div>

        <div className="relative">
          <Label htmlFor="budget" className="absolute -top-2 left-3 bg-white px-1 text-sm font-medium text-corporate-dark z-10">
            Budget Range *
          </Label>
          <select
            id="budget"
            value={data.budget}
            onChange={(e) => onDataUpdate({ budget: e.target.value })}
            className="w-full h-12 pt-4 px-3 rounded-md border-2 border-input bg-background text-sm focus:border-corporate-dark transition-all duration-300"
          >
            <option value="">Select budget</option>
            <option value="Under $5k">Under $5k</option>
            <option value="$5k–$10k">$5k–$10k</option>
            <option value="$10k–$25k">$10k–$25k</option>
            <option value="$25k+">$25k+</option>
          </select>
          {errors.budget && (
            <p className="text-red-600 text-sm mt-1">{errors.budget}</p>
          )}
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
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 gradient-social-1 text-white font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            {isSubmitting ? "Creating Your Plan..." : "Create My Plan 🎉"}
          </Button>
        </div>
      </div>
    </div>
  );
};
