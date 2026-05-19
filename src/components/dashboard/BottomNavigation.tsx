import { Home, Grid3x3, Search, Clock, User } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'home', icon: Home, label: 'Home', path: '/dashboard' },
  { id: 'tools', icon: Grid3x3, label: 'Tools', path: '/dashboard' }, // Could be separate tools page
  { id: 'search', icon: Search, label: 'Search', path: '/dashboard' }, // Could trigger search modal
  { id: 'activity', icon: Clock, label: 'Activity', path: '/dashboard' }, // Could be separate activity page
  { id: 'profile', icon: User, label: 'Profile', path: '/dashboard' }, // Could be separate profile page
];

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              end
              className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors flex-1"
              activeClassName="text-pal-purple"
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
