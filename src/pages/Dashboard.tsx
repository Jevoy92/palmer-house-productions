import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MetaTags } from '@/components/seo/MetaTags';
import { Video, User, Sparkles, Maximize, MessageCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleToolClick = (toolId: string) => {
    navigate(`/tools/${toolId}`);
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'there';

  // All tools are now available
  const allTools = [
    {
      id: 'video-series-builder',
      name: 'Video Series Builder',
      description: 'Turn one idea into a complete content system',
      icon: Video,
      gradient: 'from-pal-purple to-pal-orange',
    },
    {
      id: 'persona-generator',
      name: 'Persona Generator',
      description: 'Define your ideal audience and brand voice',
      icon: User,
      gradient: 'from-pal-blue to-pal-purple',
    },
    {
      id: 'production-assistant',
      name: 'Production Assistant',
      description: 'Streamline your pre-production workflow',
      icon: Sparkles,
      gradient: 'from-pal-green to-pal-blue',
    },
    {
      id: 'content-maximizer',
      name: 'Content Maximizer',
      description: 'Repurpose content across all platforms',
      icon: Maximize,
      gradient: 'from-pal-orange to-pal-purple',
    },
    {
      id: 'engagement-responder',
      name: 'Engagement Responder',
      description: 'Automate community engagement',
      icon: MessageCircle,
      gradient: 'from-pal-purple to-pal-pink',
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
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            
            {/* Main Content */}
            <main className="flex-1 bg-gradient-to-br from-background via-muted/20 to-background">
              <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Welcome Hero */}
                <div className="mb-12 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pal-purple via-pal-blue to-pal-orange p-1 shadow-lg">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-pal-purple" />
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold text-foreground mb-3">
                    Welcome back, {userName}!
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Your integrated suite for automating and elevating your content creation lifecycle
                  </p>
                </div>

                {/* Featured Tool - Video Series Builder */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Start Creating</h3>
                  <Card 
                    className="bg-gradient-to-br from-pal-purple/10 via-background to-pal-orange/10 border-2 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => handleToolClick('video-series-builder')}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pal-purple to-pal-orange flex items-center justify-center shadow-lg">
                            <Video className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl mb-1">Video Series Builder</CardTitle>
                            <CardDescription className="text-base">
                              Turn one idea into a complete content system
                            </CardDescription>
                          </div>
                        </div>
                        <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-pal-purple group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardHeader>
                  </Card>
                </div>

                {/* All Tools Grid */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">All Tools</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Card
                        key={tool.id}
                        className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                        onClick={() => handleToolClick(tool.id)}
                      >
                        <CardHeader>
                          <div className="flex items-center gap-4 mb-3">
                            <div
                              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-md`}
                            >
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg mb-1">{tool.name}</CardTitle>
                              <CardDescription className="text-sm">
                                {tool.description}
                              </CardDescription>
                            </div>
                            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </div>
                        </CardHeader>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
