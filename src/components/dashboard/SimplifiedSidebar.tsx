import { Home, Search, Video, User, Sparkles, Maximize, MessageCircle, Settings, LogOut, BookOpen } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import femaleReelPal from '@/assets/pals/female-reel-pal-circular-headshot.jpg';
import maleEvergreenPal from '@/assets/pals/male-evergreen-pal-circular-headshot.jpg';
import femaleSpotlightPal from '@/assets/pals/female-spotlight-pal-circular-3.jpg';
import femaleSystemPal from '@/assets/pals/female-system-pal-circular.jpg';

const overviewItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Search', url: '/dashboard', icon: Search }, // Could trigger search
];

const toolItems = [
  { title: 'Content System Builder', url: '/tools/content-system-builder', icon: Video },
  { title: 'Series Builder', url: '/tools/video-series-builder', icon: BookOpen },
  { title: 'Persona Generator', url: '/tools/persona-generator', icon: User },
  { title: 'Production Assistant', url: '/tools/production-assistant', icon: Sparkles },
  { title: 'Content Maximizer', url: '/tools/content-maximizer', icon: Maximize },
  { title: 'Engagement Responder', url: '/tools/engagement-responder', icon: MessageCircle },
];

const palItems = [
  { title: 'Reel Pal', url: '/pals/reel-pal', image: femaleReelPal },
  { title: 'Evergreen Pal', url: '/pals/evergreen-pal', image: maleEvergreenPal },
  { title: 'Spotlight Pal', url: '/pals/spotlight-pal', image: femaleSpotlightPal },
  { title: 'System Pal', url: '/pals/system-pal', image: femaleSystemPal },
];

export function SimplifiedSidebar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-background fixed top-16 left-0 bottom-0 overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Overview Section */}
        <div>
          <h3 className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Overview
          </h3>
          <nav className="space-y-1">
            {overviewItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.url}
                  to={item.url}
                  end
                  className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-foreground hover:bg-muted transition-colors"
                  activeClassName="bg-muted text-pal-purple font-medium"
                >
                  <Icon className="w-4 h-4" />
                  {item.title}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <Separator />

        {/* Tools Section */}
        <div>
          <h3 className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Tools
          </h3>
          <nav className="space-y-1">
            {toolItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.url}
                  to={item.url}
                  className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-foreground hover:bg-muted transition-colors"
                  activeClassName="bg-muted text-pal-purple font-medium"
                >
                  <Icon className="w-4 h-4" />
                  {item.title}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <Separator />

        {/* Your Pals Section */}
        <div>
          <h3 className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Your Pals
          </h3>
          <nav className="space-y-1">
            {palItems.map((item) => (
              <NavLink
                key={item.url}
                to={item.url}
                className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-foreground hover:bg-muted transition-colors"
                activeClassName="bg-muted text-pal-purple font-medium"
              >
                <img src={item.image} alt={item.title} className="w-6 h-6 rounded-full object-cover" />
                {item.title}
              </NavLink>
            ))}
          </nav>
        </div>

        <Separator />

        {/* Settings Section */}
        <div>
          <h3 className="px-2 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Settings
          </h3>
          <nav className="space-y-1">
            <NavLink
              to="/dashboard/settings"
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-foreground hover:bg-muted transition-colors"
              activeClassName="bg-muted text-pal-purple font-medium"
            >
              <Settings className="w-4 h-4" />
              Settings
            </NavLink>
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full justify-start gap-3 px-3 text-sm text-pal-orange hover:text-pal-orange hover:bg-muted"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </nav>
        </div>
      </div>
    </aside>
  );
}
