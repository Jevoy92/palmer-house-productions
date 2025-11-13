import { Home, Video, User, Sparkles, Maximize, MessageCircle, Settings, LogOut } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
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
    available: false,
  },
  { 
    title: 'Production Assistant', 
    url: '/tools/production-assistant', 
    icon: Sparkles,
    available: false,
  },
  { 
    title: 'Content Maximizer', 
    url: '/tools/content-maximizer', 
    icon: Maximize,
    available: false,
  },
  { 
    title: 'Engagement Responder', 
    url: '/tools/engagement-responder', 
    icon: MessageCircle,
    available: false,
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pal-purple to-pal-orange flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-foreground">Content OS</h2>
                <p className="text-xs text-muted-foreground">Palmer House</p>
              </div>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="p-2 flex justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pal-purple to-pal-orange flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
          </div>
        )}

        <Separator className="my-2" />

        <SidebarGroup>
          {!isCollapsed && <SidebarGroupLabel>Tools</SidebarGroupLabel>}
          
          <SidebarGroupContent>
            <SidebarMenu>
              {toolItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild disabled={!item.available}>
                    <NavLink 
                      to={item.url} 
                      end={item.url === '/dashboard'}
                      className="hover:bg-muted/50 transition-colors"
                      activeClassName="bg-muted text-primary font-medium"
                    >
                      <item.icon className={isCollapsed ? 'h-5 w-5' : 'mr-2 h-4 w-4'} />
                      {!isCollapsed && (
                        <span className="flex items-center gap-2">
                          {item.title}
                          {!item.available && (
                            <span className="ml-auto text-xs text-muted-foreground">Soon</span>
                          )}
                        </span>
                      )}
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
