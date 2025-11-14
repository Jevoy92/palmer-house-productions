import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import femaleReelPal from '@/assets/pals/female-reel-pal-circular-headshot.jpg';
import maleEvergreenPal from '@/assets/pals/male-evergreen-pal-circular-headshot.jpg';
import femaleSpotlightPal from '@/assets/pals/female-spotlight-pal-circular-3.jpg';
import femaleSystemPal from '@/assets/pals/female-system-pal-circular.jpg';

const PAL_AVATARS: Record<string, string> = {
  reel: femaleReelPal,
  evergreen: maleEvergreenPal,
  spotlight: femaleSpotlightPal,
  system: femaleSystemPal,
};

interface MobileTopBarProps {
  favoritePal?: string;
  onAvatarClick?: () => void;
}

export function MobileTopBar({ favoritePal = 'reel', onAvatarClick }: MobileTopBarProps) {
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || '';
  const initials = userName.slice(0, 2).toUpperCase();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50 lg:hidden">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left: Avatar */}
        <button onClick={onAvatarClick} className="flex-shrink-0">
          <Avatar className="w-10 h-10">
            <AvatarImage src={PAL_AVATARS[favoritePal]} alt="Profile" />
            <AvatarFallback className="bg-pal-purple text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>

        {/* Right: Notifications & Search */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pal-orange rounded-full" />
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
