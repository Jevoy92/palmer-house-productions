
import { Textarea } from "@/components/ui/textarea";
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

interface ProjectDetailsStepProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: string) => void;
}

export const ProjectDetailsStep = ({ formData, updateField }: ProjectDetailsStepProps) => {
  return (
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
  );
};
