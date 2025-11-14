import { useState } from 'react';
import { MetaTags } from '@/components/seo/MetaTags';
import { TopNavigation } from '@/components/dashboard/TopNavigation';
import { MobileTopBar } from '@/components/dashboard/MobileTopBar';
import { SimplifiedSidebar } from '@/components/dashboard/SimplifiedSidebar';
import { BottomNavigation } from '@/components/dashboard/BottomNavigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Users, Target, MessageSquare, Loader2, Download, RefreshCw, Coins } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const LOADING_TIPS = [
  "Analyzing your target audience...",
  "Creating detailed persona profiles...",
  "Defining your brand voice...",
  "Mapping pain points and goals...",
  "Crafting messaging guidelines..."
];

export default function PersonaGenerator() {
  const [business, setBusiness] = useState('');
  const [products, setProducts] = useState('');
  const [audience, setAudience] = useState('');
  const [goals, setGoals] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [currentTip, setCurrentTip] = useState(0);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!business.trim() || !products.trim() || !goals.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setCurrentTip(0);

    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % LOADING_TIPS.length);
    }, 2500);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('You must be logged in to use this tool');
      }

      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: {
          toolType: 'persona-generator',
          inputs: { business, products, audience, goals }
        }
      });

      clearInterval(tipInterval);

      if (error) throw error;

      // Check for insufficient credits
      if (data?.error) {
        if (data.error === 'Insufficient credits') {
          toast({
            title: '⚡ Not Enough Credits',
            description: data.message || `This tool requires ${data.required} credits. You have ${data.current} credits remaining.`,
            variant: 'destructive',
          });
          setIsLoading(false);
          return;
        }
        throw new Error(data.error);
      }

      const parsedContent = typeof data.content === 'string' 
        ? JSON.parse(data.content) 
        : data.content;
      
      setResults(parsedContent);
      
      if (data.credits) {
        toast({
          title: "✨ Personas Generated!",
          description: `Used ${data.credits.consumed} credits. ${data.credits.remaining} credits remaining.`
        });
      } else {
        toast({
          title: "Personas Generated!",
          description: "Your audience personas and brand voice are ready"
        });
      }
    } catch (error: any) {
      clearInterval(tipInterval);
      console.error('Generation error:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setBusiness('');
    setProducts('');
    setAudience('');
    setGoals('');
    setResults(null);
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `personas-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Results downloaded!' });
  };
  return (
    <>
      <MetaTags
        title="Persona Generator | Palmer House Productions Content OS"
        description="Define your ideal audience and craft a powerful brand voice that resonates with AI-powered persona generation."
        canonicalUrl="https://www.palmerhouseproductions.com/tools/persona-generator"
      />
      <SidebarProvider>
        <div className="min-h-screen w-full">
          <TopNavigation />
          <div className="flex pt-16">
            <AppSidebar />
            <main className="flex-1 bg-background overflow-auto min-h-[calc(100vh-4rem)]">
              <div className="container mx-auto px-4 py-8 max-w-5xl">
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

                {isLoading && (
                  <Card className="max-w-2xl mx-auto border-2">
                    <CardContent className="py-12">
                      <div className="text-center space-y-6">
                        <Loader2 className="w-16 h-16 mx-auto text-pal-blue animate-spin" />
                        <div>
                          <p className="text-lg font-semibold text-foreground mb-2">
                            Creating Your Personas...
                          </p>
                          <p className="text-sm text-muted-foreground animate-pulse">
                            {LOADING_TIPS[currentTip]}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {!isLoading && !results && (
                  <Card className="max-w-2xl mx-auto border-2">
                    <CardHeader>
                      <CardTitle>Generate Audience Personas</CardTitle>
                      <CardDescription>
                        Create detailed audience personas and define your brand voice
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="business">Business/Brand Name *</Label>
                        <Input
                          id="business"
                          placeholder="e.g., Acme Real Estate"
                          value={business}
                          onChange={(e) => setBusiness(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="products">Products/Services *</Label>
                        <Textarea
                          id="products"
                          placeholder="Describe what you offer..."
                          value={products}
                          onChange={(e) => setProducts(e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="audience">Current Audience (Optional)</Label>
                        <Textarea
                          id="audience"
                          placeholder="Describe your current audience if known..."
                          value={audience}
                          onChange={(e) => setAudience(e.target.value)}
                          rows={2}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="goals">Business Goals *</Label>
                        <Textarea
                          id="goals"
                          placeholder="What are your main business goals?"
                          value={goals}
                          onChange={(e) => setGoals(e.target.value)}
                          rows={3}
                        />
                      </div>

                      {/* Credit Cost Info */}
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-2">
                        <Coins className="w-4 h-4" />
                        <span>This tool uses 8 credits per generation</span>
                      </div>

                      <Button 
                        onClick={handleGenerate} 
                        className="w-full bg-pal-blue hover:bg-pal-blue/90"
                        size="lg"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Personas & Brand Voice
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {!isLoading && results && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-foreground">Your Personas & Brand Voice</h2>
                      <div className="flex gap-2">
                        <Button onClick={handleDownload} variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button onClick={handleReset} variant="default" size="sm">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Generate New
                        </Button>
                      </div>
                    </div>

                    {/* Personas */}
                    {results.personas && results.personas.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                          <Target className="w-5 h-5 text-pal-blue" />
                          Audience Personas
                        </h3>
                        {results.personas.map((persona: any, idx: number) => (
                          <Card key={idx} className="border-2">
                            <CardHeader>
                              <CardTitle className="text-lg">{persona.name || `Persona ${idx + 1}`}</CardTitle>
                              {persona.tagline && (
                                <CardDescription>{persona.tagline}</CardDescription>
                              )}
                            </CardHeader>
                            <CardContent className="space-y-4">
                              {persona.demographics && (
                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">Demographics</h4>
                                  <p className="text-sm text-muted-foreground">{persona.demographics}</p>
                                </div>
                              )}
                              {persona.psychographics && (
                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">Psychographics</h4>
                                  <p className="text-sm text-muted-foreground">{persona.psychographics}</p>
                                </div>
                              )}
                              {persona.painPoints && (
                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">Pain Points</h4>
                                  <p className="text-sm text-muted-foreground">{persona.painPoints}</p>
                                </div>
                              )}
                              {persona.goals && (
                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">Goals</h4>
                                  <p className="text-sm text-muted-foreground">{persona.goals}</p>
                                </div>
                              )}
                              {persona.contentPreferences && (
                                <div>
                                  <h4 className="font-semibold text-foreground mb-2">Content Preferences</h4>
                                  <p className="text-sm text-muted-foreground">{persona.contentPreferences}</p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    {/* Brand Voice */}
                    {results.brandVoice && (
                      <Card className="border-2">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-pal-purple" />
                            Brand Voice Guidelines
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {results.brandVoice.tone && (
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">Tone</h4>
                              <p className="text-sm text-muted-foreground">{results.brandVoice.tone}</p>
                            </div>
                          )}
                          {results.brandVoice.messagingPillars && (
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">Messaging Pillars</h4>
                              <p className="text-sm text-muted-foreground whitespace-pre-line">{results.brandVoice.messagingPillars}</p>
                            </div>
                          )}
                          {results.brandVoice.dos && (
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">Do's</h4>
                              <p className="text-sm text-muted-foreground whitespace-pre-line">{results.brandVoice.dos}</p>
                            </div>
                          )}
                          {results.brandVoice.donts && (
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">Don'ts</h4>
                              <p className="text-sm text-muted-foreground whitespace-pre-line">{results.brandVoice.donts}</p>
                            </div>
                          )}
                          {results.brandVoice.examples && (
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">Example Phrases</h4>
                              <p className="text-sm text-muted-foreground whitespace-pre-line">{results.brandVoice.examples}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            </main>
            <EnhancedFooter />
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
