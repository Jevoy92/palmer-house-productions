
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VisionDetailsStepProps {
  data: any;
  onDataUpdate: (data: any) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export const VisionDetailsStep = ({ data, onDataUpdate, onSubmit, onBack, isSubmitting }: VisionDetailsStepProps) => {
  const [formData, setFormData] = useState({
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    email: data.email || "",
    company: data.company || "",
    challenge: data.challenge || "",
    budget: data.budget || "",
  });

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onDataUpdate(newData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.company && formData.challenge && formData.budget;

  return (
    <div className="min-h-[600px] p-8 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎯</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Final Stop: What's Your <span className="text-indigo-600">Vision</span>?
          </h2>
          <p className="text-lg text-gray-600">
            Just a few details to help us tailor your custom gameplan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="h-12"
                required
              />
            </div>
            <div>
              <Input
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="h-12"
                required
              />
            </div>
          </div>

          <Input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="h-12"
            required
          />

          <Input
            placeholder="Company Name"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            className="h-12"
            required
          />

          <Textarea
            placeholder="What's the biggest challenge right now?"
            value={formData.challenge}
            onChange={(e) => handleInputChange('challenge', e.target.value)}
            className="min-h-[100px]"
            required
          />

          <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="What's your budget range?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Under $5k">Under $5k</SelectItem>
              <SelectItem value="$5k–$10k">$5k–$10k</SelectItem>
              <SelectItem value="$10k–$25k">$10k–$25k</SelectItem>
              <SelectItem value="$25k+">$25k+</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-4 justify-center pt-6">
            <Button type="button" variant="outline" onClick={onBack}>
              ← Back
            </Button>
            <Button 
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isSubmitting ? "Submitting..." : "Complete Journey →"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
