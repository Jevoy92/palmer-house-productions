import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MetaTags } from '@/components/seo/MetaTags';
import { EnhancedFooter } from '@/components/seo/EnhancedFooter';
import { Video, User, Sparkles, Maximize, MessageCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { TopNavigation } from '@/components/dashboard/TopNavigation';
import { HeroBanner } from '@/components/dashboard/HeroBanner';
import { ToolProgressCards } from '@/components/dashboard/ToolProgressCards';
import { DashboardStats } from '@/components/dashboard/DashboardStats';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleToolClick = (toolId: string) => {
    navigate(`/tools/${toolId}`);
  };

  // All tools are now available
  const allTools = [
    {
      id: 'video-series-builder',
      name: 'Video Series Builder',
      description: 'Turn one idea into a complete content system',
      icon: Video,
      color: 'bg-pal-purple',
    },
    {
      id: 'persona-generator',
      name: 'Persona Generator',
      description: 'Define your ideal audience and brand voice',
      icon: User,
      color: 'bg-pal-blue',
    },
    {
      id: 'production-assistant',
      name: 'Production Assistant',
      description: 'Streamline your pre-production workflow',
      icon: Sparkles,
      color: 'bg-pal-green',
    },
    {
      id: 'content-maximizer',
      name: 'Content Maximizer',
      description: 'Repurpose content across all platforms',
      icon: Maximize,
      color: 'bg-pal-orange',
    },
    {
      id: 'engagement-responder',
      name: 'Engagement Responder',
      description: 'Automate community engagement',
      icon: MessageCircle,
      color: 'bg-pal-purple',
    },
  ];

  return (
    <>
      <MetaTags
        title="Dashboard | Palmer House Productions Content OS"
        description="Access your video series builder, persona generator, production assistant, and more content creation tools."
        canonicalUrl="https://www.palmerhouseproductions.com/dashboard"
      />
      <SidebarProvider>
        <div className="min-h-screen w-full">
          <TopNavigation />
          <div className="flex pt-16">
            <AppSidebar />
            
            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-8 overflow-auto bg-background min-h-[calc(100vh-4rem)]">
              <div className="max-w-7xl mx-auto space-y-8">
                {/* Hero Banner */}
                <HeroBanner />

                {/* Tool Progress Cards */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                  <ToolProgressCards />
                </div>

                {/* All Tools Grid */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Your Tools</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {allTools.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <Card
                          key={tool.id}
                          className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-pal-purple/20"
                          onClick={() => handleToolClick(tool.id)}
                        >
                          <CardHeader>
                            <div className="flex items-center gap-4">
                              <div className={`w-14 h-14 rounded-xl ${tool.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <Icon className="w-7 h-7 text-white" />
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-xl mb-1">{tool.name}</CardTitle>
                                <CardDescription className="text-sm">
                                  {tool.description}
                                </CardDescription>
                              </div>
                              <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-pal-purple group-hover:translate-x-1 transition-all flex-shrink-0" />
                            </div>
                          </CardHeader>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            </main>

            {/* Right Stats Sidebar */}
            <aside className="hidden xl:block w-80 border-l border-border p-6 overflow-y-auto bg-background min-h-[calc(100vh-4rem)]">
              <DashboardStats />
            </aside>
          </div>
          <EnhancedFooter />
        </div>
      </SidebarProvider>
    </>
  );
}
