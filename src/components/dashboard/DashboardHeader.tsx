import { useAuth } from '@/contexts/AuthContext';
import { CreditsBalance } from './CreditsBalance';

export function DashboardHeader() {
  const { user } = useAuth();
  
  // Get user's name from metadata or email
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'there';
  
  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <header className="h-16 flex items-center border-b border-border bg-white sticky top-0 z-40">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold text-foreground">
              {getGreeting()}, {userName}
            </h1>
            <p className="text-sm text-muted-foreground">
              What's on <span className="text-pal-purple font-medium">your mind?</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <CreditsBalance />
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-pal-purple/10 rounded-full border border-pal-purple/20">
            <span className="text-sm font-medium text-pal-purple">Member</span>
          </div>
        </div>
      </div>
    </header>
  );
}
