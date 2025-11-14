import { useState } from 'react';
import { Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import femaleReelPal from '@/assets/pals/female-reel-pal-circular-headshot.jpg';
import maleEvergreenPal from '@/assets/pals/male-evergreen-pal-circular-headshot.jpg';
import femaleSpotlightPal from '@/assets/pals/female-spotlight-pal-circular-3.jpg';
import femaleSystemPal from '@/assets/pals/female-system-pal-circular.jpg';

const PAL_OPTIONS = [
  {
    id: 'reel',
    name: 'Reel Pal',
    description: 'Your short-form content expert',
    image: femaleReelPal,
    traits: ['Trendy', 'Fast-paced', 'Engaging'],
  },
  {
    id: 'evergreen',
    name: 'Evergreen Pal',
    description: 'Your long-term strategy guide',
    image: maleEvergreenPal,
    traits: ['Strategic', 'Thoughtful', 'Timeless'],
  },
  {
    id: 'spotlight',
    name: 'Spotlight Pal',
    description: 'Your production quality guru',
    image: femaleSpotlightPal,
    traits: ['Professional', 'Polished', 'Premium'],
  },
  {
    id: 'system',
    name: 'System Pal',
    description: 'Your workflow automation specialist',
    image: femaleSystemPal,
    traits: ['Organized', 'Efficient', 'Systematic'],
  },
];

interface PalAvatarSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPal: string;
  onPalChange: (palId: string) => void;
}

export function PalAvatarSelector({ open, onOpenChange, currentPal, onPalChange }: PalAvatarSelectorProps) {
  const { user } = useAuth();
  const [selectedPal, setSelectedPal] = useState(currentPal);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ favorite_pal: selectedPal })
        .eq('id', user.id);

      if (error) throw error;

      onPalChange(selectedPal);
      toast.success('Your favorite Pal has been updated!');
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating favorite pal:', error);
      toast.error('Failed to update favorite Pal');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Your Favorite Pal</DialogTitle>
          <DialogDescription>
            Select the Pal that best represents your content creation style
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {PAL_OPTIONS.map((pal) => (
            <button
              key={pal.id}
              onClick={() => setSelectedPal(pal.id)}
              className={`relative p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
                selectedPal === pal.id
                  ? 'border-pal-purple bg-pal-purple/5'
                  : 'border-border hover:border-pal-purple/50'
              }`}
            >
              {selectedPal === pal.id && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-pal-purple flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className="flex flex-col items-center gap-3">
                <img
                  src={pal.image}
                  alt={pal.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-lg"
                />
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{pal.name}</h3>
                  <p className="text-sm text-muted-foreground">{pal.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {pal.traits.map((trait) => (
                    <span
                      key={trait}
                      className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || selectedPal === currentPal}
            className="bg-pal-purple hover:bg-pal-purple/90"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
