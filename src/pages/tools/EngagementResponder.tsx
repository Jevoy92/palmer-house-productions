import { MetaTags } from '@/components/seo/MetaTags';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, MessageCircle, Heart, TrendingUp } from 'lucide-react';

export default function EngagementResponder() {
  return (
    <>
      <MetaTags
        title="Engagement Responder | Palmer House Productions Content OS"
        description="Automate community engagement and build authentic connections at scale."
        canonicalUrl="https://www.palmerhouseproductions.com/tools/engagement-responder"
      />
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            
            <main className="flex-1 bg-gradient-to-br from-background via-muted/20 to-background">
              <div className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="mb-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-pal-purple to-pal-pink flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-foreground mb-3">
                    Engagement Responder
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Build authentic community connections while you focus on creating
                  </p>
                </div>

                <Card className="max-w-2xl mx-auto bg-gradient-to-br from-pal-purple/5 to-pal-pink/5">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-pal-purple to-pal-pink flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Coming Very Soon!</CardTitle>
                    <CardDescription className="text-base">
                      Your AI community manager is in the works
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MessageCircle className="w-5 h-5 text-pal-purple mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Smart Comment Responses</h3>
                          <p className="text-sm text-muted-foreground">
                            AI-powered replies that match your brand voice and engage authentically
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Heart className="w-5 h-5 text-pal-pink mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Sentiment Analysis</h3>
                          <p className="text-sm text-muted-foreground">
                            Automatically prioritize responses based on sentiment and engagement potential
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-pal-purple mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Engagement Insights</h3>
                          <p className="text-sm text-muted-foreground">
                            Track community growth and identify your most engaged audience members
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <p className="text-center text-sm text-muted-foreground">
                        Want early access? Contact us at{' '}
                        <a href="mailto:hello@palmerhouseproductions.com" className="text-pal-purple hover:underline">
                          hello@palmerhouseproductions.com
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
