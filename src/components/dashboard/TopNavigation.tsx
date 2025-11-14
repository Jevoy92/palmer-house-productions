import { SidebarTrigger } from '@/components/ui/sidebar';
import { CreditsBalance } from './CreditsBalance';
import { MemberProfile } from './MemberProfile';
import { SearchBar } from './SearchBar';
import { LOGO } from '@/lib/branding';

export function TopNavigation() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-50 flex items-center px-4 md:px-6 gap-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <img 
          src={LOGO.url} 
          alt={LOGO.alt}
          className="h-8 w-auto object-contain"
        />
      </div>
      
      <div className="hidden md:flex flex-1 max-w-2xl mx-auto">
        <SearchBar />
      </div>
      
      <div className="ml-auto flex items-center gap-3">
        <CreditsBalance />
        <div className="hidden sm:block">
          <MemberProfile />
        </div>
      </div>
    </header>
  );
}
