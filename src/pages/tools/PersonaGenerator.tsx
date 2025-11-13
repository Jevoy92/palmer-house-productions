import { useState } from 'react';
import { MetaTags } from '@/components/seo/MetaTags';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Users, Target, MessageSquare } from 'lucide-react';

export default function PersonaGenerator() {
  return (
    <>
      <MetaTags
        title="Persona Generator | Palmer House Productions Content OS"
        description="Define your ideal audience and brand voice with AI-powered persona generation."
        canonicalUrl="https://www.palmerhouseproductions.com/tools/persona-generator"
      />
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            
            <main className="flex-1 bg-white">
              <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Hero Section */}
                <div className="mb-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-pal-blue flex items-center justify-center">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-foreground mb-3">
                    Persona Generator
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Define your ideal audience and craft a powerful brand voice that resonates
                  </p>
                </div>

                {/* Coming Soon Card */}
                <Card className="max-w-2xl mx-auto border-2">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-pal-blue flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Coming Very Soon!</CardTitle>
                    <CardDescription className="text-base">
                      We're building something special
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-pal-blue mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Audience Profiling</h3>
                          <p className="text-sm text-muted-foreground">
                            Create detailed personas of your ideal customers with demographics, pain points, and goals
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <MessageSquare className="w-5 h-5 text-pal-purple mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Brand Voice Definition</h3>
                          <p className="text-sm text-muted-foreground">
                            Establish tone, style, and messaging that connects authentically with your audience
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-pal-blue mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Multi-Persona Management</h3>
                          <p className="text-sm text-muted-foreground">
                            Create and manage multiple audience personas for different content strategies
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
