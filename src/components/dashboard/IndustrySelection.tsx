import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Building2, Heart, Dumbbell, Cog, Code, Users, Home, GraduationCap, ShoppingBag, Hotel, Hammer, DollarSign, HandHeart, Palette, Briefcase } from 'lucide-react';

const INDUSTRIES = [
  { value: 'healthcare', label: 'Healthcare', icon: Heart, description: 'Medical, dental, wellness' },
  { value: 'fitness', label: 'Fitness & Wellness', icon: Dumbbell, description: 'Gyms, trainers, studios' },
  { value: 'manufacturing', label: 'Manufacturing', icon: Cog, description: 'Industrial & production' },
  { value: 'technology', label: 'Technology', icon: Code, description: 'Software, IT, SaaS' },
  { value: 'professional_services', label: 'Professional Services', icon: Briefcase, description: 'Consulting, legal, accounting' },
  { value: 'real_estate', label: 'Real Estate', icon: Home, description: 'Property & construction' },
  { value: 'education', label: 'Education', icon: GraduationCap, description: 'Schools, training, coaching' },
  { value: 'retail', label: 'Retail', icon: ShoppingBag, description: 'Stores & e-commerce' },
  { value: 'hospitality', label: 'Hospitality', icon: Hotel, description: 'Hotels, restaurants, events' },
  { value: 'construction', label: 'Construction', icon: Hammer, description: 'Building & trades' },
  { value: 'financial_services', label: 'Financial Services', icon: DollarSign, description: 'Banking, insurance, investing' },
  { value: 'nonprofit', label: 'Nonprofit', icon: HandHeart, description: 'Charities & organizations' },
  { value: 'creative_agency', label: 'Creative Agency', icon: Palette, description: 'Design, marketing, media' },
  { value: 'other', label: 'Other', icon: Building2, description: 'Other industries' },
];

interface IndustrySelectionProps {
  open: boolean;
  userId: string;
  onComplete: () => void;
}

export function IndustrySelection({ open, userId, onComplete }: IndustrySelectionProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!selectedIndustry) {
      toast.error('Please select an industry');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ industry: selectedIndustry as any })
        .eq('id', userId);

      if (error) throw error;

      toast.success('Industry preference saved!');
      onComplete();
    } catch (error) {
      console.error('Error saving industry:', error);
      toast.error('Failed to save industry preference');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to Palmer House Content OS!</DialogTitle>
          <DialogDescription className="text-base">
            Select your industry to get personalized video strategies, examples, and tips tailored specifically for your business.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
          {INDUSTRIES.map((industry) => {
            const Icon = industry.icon;
            return (
              <Card
                key={industry.value}
                className={`p-4 cursor-pointer transition-all hover:border-primary ${
                  selectedIndustry === industry.value ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedIndustry(industry.value)}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <Icon className={`w-8 h-8 ${selectedIndustry === industry.value ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div>
                    <h3 className="font-semibold text-sm">{industry.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{industry.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={handleSave} disabled={!selectedIndustry || saving} size="lg">
            {saving ? 'Saving...' : 'Continue to Dashboard'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
