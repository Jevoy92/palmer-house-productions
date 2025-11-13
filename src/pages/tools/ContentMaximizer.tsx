import { MetaTags } from '@/components/seo/MetaTags';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Maximize, Scissors, Share2 } from 'lucide-react';

export default function ContentMaximizer() {
  return (
    <>
      <MetaTags
        title="Content Maximizer | Palmer House Productions Content OS"
        description="Repurpose your content across all platforms to maximize reach and engagement."
        canonicalUrl="https://www.palmerhouseproductions.com/tools/content-maximizer"
      />
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            
            <main className="flex-1 bg-white">
              <div className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="mb-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-pal-orange flex items-center justify-center">
                    <Maximize className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-foreground mb-3">
                    Content Maximizer
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Turn one piece of content into dozens of platform-optimized assets
                  </p>
                </div>

                <Card className="max-w-2xl mx-auto border-2">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-pal-orange flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Coming Very Soon!</CardTitle>
                    <CardDescription className="text-base">
                      Your content repurposing engine is being built
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Scissors className="w-5 h-5 text-pal-orange mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Smart Clip Extraction</h3>
                          <p className="text-sm text-muted-foreground">
                            AI identifies the best moments from long-form content and creates platform-specific clips
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Share2 className="w-5 h-5 text-pal-purple mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Cross-Platform Optimization</h3>
                          <p className="text-sm text-muted-foreground">
                            Automatically resize, caption, and format content for every social platform
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Maximize className="w-5 h-5 text-pal-orange mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Content Calendar Integration</h3>
                          <p className="text-sm text-muted-foreground">
                            Schedule and distribute repurposed content across all your channels
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
