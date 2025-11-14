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
        <div className="min-h-screen w-full bg-muted/30">
          <TopNavigation />
          
          {/* Three Column Grid Layout */}
          <div className="pt-16 px-4 lg:px-8 pb-8">
            <div className="grid grid-cols-12 gap-6 max-w-[1600px] mx-auto">
              
              {/* Left Sidebar - Navigation */}
              <aside className="col-span-2 hidden lg:block">
                <div className="bg-background rounded-3xl p-6 min-h-[95vh] sticky top-20">
                  <AppSidebar />
                </div>
              </aside>

              {/* Main Content Area */}
              <main className="col-span-12 lg:col-span-7 bg-muted/30 rounded-3xl overflow-hidden">
                <div className="p-6 space-y-6">
                  
                  {/* Hero Banner */}
                  <HeroBanner />

                  {/* Tool Progress Cards */}
                  <div>
                    <ToolProgressCards />
                  </div>

                  {/* Continue Watching / Your Tools */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold text-foreground">Your Tools</h3>
                      <div className="flex items-center gap-2">
                        <button className="w-10 h-10 bg-background rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted">
                          <ArrowRight className="w-4 h-4 rotate-180" />
                        </button>
                        <button className="w-10 h-10 bg-pal-purple rounded-full flex items-center justify-center text-white">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {allTools.slice(0, 3).map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <Card
                            key={tool.id}
                            className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-pal-purple/20 bg-background"
                            onClick={() => handleToolClick(tool.id)}
                          >
                            <CardHeader className="space-y-4">
                              <div className="relative h-40 rounded-xl overflow-hidden bg-gradient-to-br from-pal-purple/10 to-pal-orange/10 flex items-center justify-center">
                                <Icon className="w-16 h-16 text-pal-purple/40" />
                                <button className="absolute top-3 right-3 w-8 h-8 bg-background/30 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-background/50">
                                  <Sparkles className="w-4 h-4" />
                                </button>
                              </div>
                              
                              <div className={`text-xs font-semibold py-1 px-3 rounded-full self-start ${tool.color} text-white`}>
                                {tool.name.split(' ')[0].toUpperCase()}
                              </div>
                              
                              <h4 className="font-bold text-foreground leading-tight">{tool.name}</h4>
                              
                              <div className="w-full bg-muted rounded-full h-1.5">
                                <div className="bg-pal-purple h-1.5 rounded-full" style={{ width: '45%' }}></div>
                              </div>
                              
                              <CardDescription className="text-sm">
                                {tool.description}
                              </CardDescription>
                            </CardHeader>
                          </Card>
                        );
                      })}
                    </div>
                  </div>

                  {/* All Tools Grid */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold text-foreground">All Tools</h3>
                      <button className="font-semibold text-pal-purple hover:underline">See All</button>
                    </div>
                    
                    <div className="bg-background rounded-2xl p-4">
                      <div className="space-y-2">
                        {allTools.slice(3).map((tool) => {
                          const Icon = tool.icon;
                          return (
                            <div
                              key={tool.id}
                              className="flex items-center justify-between py-4 px-4 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                              onClick={() => handleToolClick(tool.id)}
                            >
                              <div className="flex items-center gap-4 flex-1">
                                <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center`}>
                                  <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-bold text-foreground">{tool.name}</p>
                                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                                </div>
                              </div>
                              <button className="w-8 h-8 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:bg-pal-purple/10 hover:text-pal-purple hover:border-pal-purple">
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </main>

              {/* Right Stats Sidebar */}
              <aside className="col-span-12 lg:col-span-3 bg-background rounded-3xl p-6 min-h-[95vh] hidden lg:block sticky top-20">
                <DashboardStats />
              </aside>

            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
