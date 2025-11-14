import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { CreditsBalance } from './CreditsBalance';
import { LOGO } from '@/lib/branding';

export function TopNavigation() {
  const { user } = useAuth();
  
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'there';
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50 flex items-center px-4 md:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <img 
          src={LOGO.url} 
          alt={LOGO.alt}
          className="h-8 w-auto object-contain"
        />
        <div className="hidden md:block ml-2">
          <h1 className="text-sm font-semibold text-foreground">
            {getGreeting()}, {userName}
          </h1>
        </div>
      </div>
      
      <div className="ml-auto flex items-center gap-3">
        <CreditsBalance />
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-pal-purple/10 rounded-full border border-pal-purple/20">
          <span className="text-sm font-medium text-pal-purple">Member</span>
        </div>
      </div>
    </header>
  );
}
