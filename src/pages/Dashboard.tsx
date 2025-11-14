import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MetaTags } from '@/components/seo/MetaTags';
import { EnhancedFooter } from '@/components/seo/EnhancedFooter';
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
        <div className="flex w-full min-h-screen">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            
            {/* Main Content */}
            <main className="flex-1 bg-white pb-8 mt-16">
              <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Welcome Hero */}
                <div className="mb-12 text-center">
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
                    className="border-2 hover:shadow-md transition-all duration-300 cursor-pointer group"
                    onClick={() => handleToolClick('video-series-builder')}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl bg-pal-purple flex items-center justify-center">
                            <Video className="w-7 h-7 text-white" />
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
                        className="hover:shadow-md transition-all duration-300 cursor-pointer group"
                        onClick={() => handleToolClick(tool.id)}
                      >
                        <CardHeader>
                          <div className="flex items-center gap-4 mb-3">
                            <div
                              className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center`}
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
            <EnhancedFooter />
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
