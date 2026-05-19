import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreditsBalance } from './CreditsBalance';
import { MemberProfile } from './MemberProfile';
import { LOGO } from '@/lib/branding';

export function TopNavigation() {
  return (
    <header className="hidden lg:flex fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50 items-center px-4 md:px-6 gap-4">
      {/* Logo */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <img 
          src={LOGO.url} 
          alt={LOGO.alt}
          className="h-8 w-auto object-contain"
        />
      </div>
      
      {/* Spacer */}
      <div className="flex-1" />
      
      {/* Right Side - Notifications, Credits, Profile */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pal-orange rounded-full" />
        </Button>
        <CreditsBalance />
        <MemberProfile />
      </div>
    </header>
  );
}
