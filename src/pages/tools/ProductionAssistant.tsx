import { MetaTags } from '@/components/seo/MetaTags';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, CheckCircle, FileText, Calendar } from 'lucide-react';

export default function ProductionAssistant() {
  return (
    <>
      <MetaTags
        title="Production Assistant | Palmer House Productions Content OS"
        description="Streamline your pre-production workflow with AI-powered planning and organization."
        canonicalUrl="https://www.palmerhouseproductions.com/tools/production-assistant"
      />
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            
            <main className="flex-1 bg-gradient-to-br from-background via-muted/20 to-background">
              <div className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="mb-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-pal-green to-pal-blue flex items-center justify-center shadow-lg">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-foreground mb-3">
                    Production Assistant
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Streamline your pre-production workflow from concept to shoot day
                  </p>
                </div>

                <Card className="max-w-2xl mx-auto bg-gradient-to-br from-pal-green/5 to-pal-blue/5">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-pal-green to-pal-blue flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Coming Very Soon!</CardTitle>
                    <CardDescription className="text-base">
                      Your AI production coordinator is in development
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-pal-green mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Shot Lists & Storyboards</h3>
                          <p className="text-sm text-muted-foreground">
                            Generate comprehensive shot lists and visual storyboards based on your script
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-pal-blue mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Equipment & Location Planning</h3>
                          <p className="text-sm text-muted-foreground">
                            Smart recommendations for gear, crew, and location requirements
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-pal-green mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Production Scheduling</h3>
                          <p className="text-sm text-muted-foreground">
                            Optimize shoot schedules and coordinate team availability automatically
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
