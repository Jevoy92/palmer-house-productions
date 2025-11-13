import { Home, Video, User, Sparkles, Maximize, MessageCircle, Settings, LogOut } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LOGO } from '@/lib/branding';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const toolItems = [
  { 
    title: 'Dashboard', 
    url: '/dashboard', 
    icon: Home,
    available: true,
  },
  { 
    title: 'Video Series Builder', 
    url: '/tools/video-series-builder', 
    icon: Video,
    available: true,
  },
  { 
    title: 'Persona Generator', 
    url: '/tools/persona-generator', 
    icon: User,
    available: true,
  },
  { 
    title: 'Production Assistant', 
    url: '/tools/production-assistant', 
    icon: Sparkles,
    available: true,
  },
  { 
    title: 'Content Maximizer', 
    url: '/tools/content-maximizer', 
    icon: Maximize,
    available: true,
  },
  { 
    title: 'Engagement Responder', 
    url: '/tools/engagement-responder', 
    icon: MessageCircle,
    available: true,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  const isCollapsed = state === 'collapsed';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <Sidebar
      collapsible="icon"
    >
      <SidebarContent>
        {/* Logo / Brand */}
        {!isCollapsed && (
          <div className="p-4">
            <div className="flex items-center gap-3">
              <img 
                src={LOGO.url} 
                alt={LOGO.alt}
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="p-2 flex justify-center">
            <img 
              src={LOGO.url} 
              alt={LOGO.alt}
              className="h-8 w-auto object-contain"
            />
          </div>
        )}

        <Separator className="my-2" />

        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>Tools</SidebarGroupLabel>}
          
          <SidebarGroupContent>
            <SidebarMenu>
              {toolItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url} 
                      end={item.url === '/dashboard'}
                      className="hover:bg-muted/50 transition-colors"
                      activeClassName="bg-muted text-primary font-medium"
                    >
                      <item.icon className={isCollapsed ? 'h-5 w-5' : 'mr-2 h-4 w-4'} />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                onClick={handleSignOut}
                className="hover:bg-muted/50 transition-colors w-full"
              >
                <LogOut className={isCollapsed ? 'h-5 w-5' : 'mr-2 h-4 w-4'} />
                {!isCollapsed && <span>Sign Out</span>}
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
