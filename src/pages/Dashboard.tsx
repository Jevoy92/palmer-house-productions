import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MetaTags } from '@/components/seo/MetaTags';
import { Video, User, Sparkles, Maximize, MessageCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const tools = [
    {
      id: 'video-series-builder',
      name: 'Video Series Builder',
      description: 'Turn one idea into a complete content system',
      icon: Video,
      color: 'bg-pal-purple',
      available: true,
      comingSoon: false,
    },
    {
      id: 'persona-generator',
      name: 'Persona Generator',
      description: 'Define your ideal audience and brand voice',
      icon: User,
      color: 'bg-pal-blue',
      available: false,
      comingSoon: true,
    },
    {
      id: 'production-assistant',
      name: 'Production Assistant',
      description: 'Streamline your pre-production workflow',
      icon: Sparkles,
      color: 'bg-pal-green',
      available: false,
      comingSoon: true,
    },
    {
      id: 'content-maximizer',
      name: 'Content Maximizer',
      description: 'Repurpose content across all platforms',
      icon: Maximize,
      color: 'bg-pal-orange',
      available: false,
      comingSoon: true,
    },
    {
      id: 'engagement-responder',
      name: 'Engagement Responder',
      description: 'Automate community engagement',
      icon: MessageCircle,
      color: 'bg-pal-purple',
      available: false,
      comingSoon: true,
    },
  ];

  const handleToolClick = (toolId: string, available: boolean) => {
    if (!available) return;
    // Navigate to the tool - for now, just show a toast
    // Later you'll implement these tools
    navigate(`/tools/${toolId}`);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <MetaTags
        title="Dashboard | Palmer House Productions Content OS"
        description="Access your video series builder, persona generator, production assistant, and more content creation tools."
        canonicalUrl="https://www.palmerhouseproductions.com/dashboard"
      />
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-corporate-dark">Content OS</h1>
              <p className="text-sm text-muted-foreground">Palmer House Productions</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-corporate-dark">{user?.email}</p>
                <p className="text-xs text-muted-foreground">Member</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-corporate-dark mb-2">
              Welcome to Content OS
            </h2>
            <p className="text-lg text-corporate-gray">
              Your integrated suite for automating and elevating your content creation lifecycle
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card
                  key={tool.id}
                  className={`transition-all duration-300 ${
                    tool.available
                      ? 'hover:shadow-lg hover:scale-105 cursor-pointer'
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => handleToolClick(tool.id, tool.available)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      {tool.comingSoon && (
                        <span className="px-2 py-1 bg-muted text-xs font-semibold rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-xl">{tool.name}</CardTitle>
                    <CardDescription className="text-base">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {tool.available ? (
                      <Button className="w-full" variant="default">
                        Launch Tool
                      </Button>
                    ) : (
                      <Button className="w-full" variant="outline" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
