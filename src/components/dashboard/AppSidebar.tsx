import { Home, Video, User, Sparkles, Maximize, MessageCircle, Settings, LogOut, CreditCard, BookOpen } from 'lucide-react';
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
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const toolItems = [
  { 
    title: 'Dashboard', 
    url: '/dashboard', 
    icon: Home,
    available: true,
  },
  { 
    title: 'Content System Builder', 
    url: '/tools/content-system-builder', 
    icon: Video,
    available: true,
  },
  { 
    title: 'Series Builder', 
    url: '/tools/series-builder', 
    icon: BookOpen,
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
  { 
    title: 'Pricing', 
    url: '/app-pricing', 
    icon: CreditCard,
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
      className="transition-all duration-300 ease-in-out top-16 h-[calc(100vh-4rem)]"
    >
      <SidebarContent className="transition-all duration-300 pt-4">

        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>Tools</SidebarGroupLabel>}
          
          <SidebarGroupContent>
            <SidebarMenu>
              {toolItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {isCollapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={item.url} 
                            end={item.url === '/dashboard'}
                            className="hover:bg-muted/50 transition-colors"
                            activeClassName="bg-muted text-primary font-medium"
                          >
                            <item.icon className="h-5 w-5" />
                          </NavLink>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="font-medium">
                        {item.title}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url} 
                        end={item.url === '/dashboard'}
                        className="hover:bg-muted/50 transition-colors"
                        activeClassName="bg-muted text-primary font-medium"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={handleSignOut}
                      className="hover:bg-muted/50 transition-colors w-full"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-medium">
                  Sign Out
                </TooltipContent>
              </Tooltip>
            ) : (
              <SidebarMenuButton asChild>
                <button
                  onClick={handleSignOut}
                  className="hover:bg-muted/50 transition-colors w-full"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
