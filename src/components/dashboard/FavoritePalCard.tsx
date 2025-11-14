import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import femaleReelPal from '@/assets/pals/female-reel-pal-circular-headshot.jpg';
import maleEvergreenPal from '@/assets/pals/male-evergreen-pal-circular-headshot.jpg';
import femaleSpotlightPal from '@/assets/pals/female-spotlight-pal-circular-3.jpg';
import femaleSystemPal from '@/assets/pals/female-system-pal-circular.jpg';

const PAL_DATA = {
  reel: {
    name: 'Reel Pal',
    description: 'Your short-form content expert',
    image: femaleReelPal,
    traits: ['Trendy', 'Fast-paced', 'Engaging'],
  },
  evergreen: {
    name: 'Evergreen Pal',
    description: 'Your long-term strategy guide',
    image: maleEvergreenPal,
    traits: ['Strategic', 'Thoughtful', 'Timeless'],
  },
  spotlight: {
    name: 'Spotlight Pal',
    description: 'Your production quality guru',
    image: femaleSpotlightPal,
    traits: ['Professional', 'Polished', 'Premium'],
  },
  system: {
    name: 'System Pal',
    description: 'Your workflow automation specialist',
    image: femaleSystemPal,
    traits: ['Organized', 'Efficient', 'Systematic'],
  },
};

interface FavoritePalCardProps {
  favoritePal: string;
  onChangePal: () => void;
}

export function FavoritePalCard({ favoritePal, onChangePal }: FavoritePalCardProps) {
  const pal = PAL_DATA[favoritePal as keyof typeof PAL_DATA] || PAL_DATA.reel;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Your Favorite Pal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <img
            src={pal.image}
            alt={pal.name}
            className="w-16 h-16 rounded-full object-cover border-4 border-pal-purple/20"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{pal.name}</h3>
            <p className="text-sm text-muted-foreground">{pal.description}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {pal.traits.map((trait) => (
            <Badge key={trait} variant="secondary" className="text-xs">
              {trait}
            </Badge>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={onChangePal}
        >
          Change Pal
        </Button>
      </CardContent>
    </Card>
  );
}
