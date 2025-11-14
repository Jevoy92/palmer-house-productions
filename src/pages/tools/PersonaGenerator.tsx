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
import { Sparkles, Users, Loader2, RotateCcw, Coins } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [currentTip, setCurrentTip] = useState(0);

  const handleGenerate = async () => {
    if (!business.trim() || !products.trim() || !goals.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
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

      if (data?.error) {
        if (data.error === 'Insufficient credits') {
          toast.error(data.message || `This tool requires ${data.required} credits. You have ${data.current} credits remaining.`);
          setLoading(false);
          return;
        }
        throw new Error(data.error);
      }

      const parsedContent = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
      setResults(parsedContent);
      
      if (data.credits) {
        toast.success(`Personas generated! Used ${data.credits.consumed} credits. ${data.credits.remaining} credits remaining.`);
      } else {
        toast.success('Personas generated!');
      }
    } catch (error: any) {
      clearInterval(tipInterval);
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to generate personas');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBusiness('');
    setProducts('');
    setAudience('');
    setGoals('');
    setResults(null);
  };

  return (
    <>
      <MetaTags
        title="Persona Generator | Palmer House Productions Content OS"
        description="Create detailed audience personas and define your brand voice with AI."
        canonicalUrl="https://www.palmerhouseproductions.com/tools/persona-generator"
      />
      <div className="min-h-screen w-full bg-background">
        <div className="lg:hidden">
          <MobileTopBar />
        </div>
        <div className="hidden lg:block">
          <TopNavigation />
        </div>

        <div className="flex pt-14 lg:pt-16">
          <div className="hidden lg:block">
            <SimplifiedSidebar />
          </div>

          <main className="flex-1 overflow-auto pb-20 lg:pb-8">
            <div className="container mx-auto px-4 py-8 max-w-5xl">
              <div className="mb-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-pal-pink flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-3">
                  Persona Generator
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Create detailed audience personas and define your brand voice
                </p>
              </div>

              {loading && (
                <Card className="max-w-2xl mx-auto border-2 p-12">
                  <div className="text-center space-y-6">
                    <Loader2 className="w-16 h-16 mx-auto text-pal-pink animate-spin" />
                    <div>
                      <p className="text-lg font-semibold text-foreground mb-2">
                        Generating Personas...
                      </p>
                      <p className="text-sm text-muted-foreground animate-pulse">
                        {LOADING_TIPS[currentTip]}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {!loading && !results && (
                <Card className="max-w-2xl mx-auto border-2">
                  <CardHeader>
                    <CardTitle>Generate Your Personas</CardTitle>
                    <CardDescription>
                      Create AI-powered audience personas to guide your content strategy
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Business Description *</label>
                      <Textarea
                        value={business}
                        onChange={(e) => setBusiness(e.target.value)}
                        placeholder="Describe your business in a few sentences..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Products/Services *</label>
                      <Textarea
                        value={products}
                        onChange={(e) => setProducts(e.target.value)}
                        placeholder="What products or services do you offer?"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Target Audience (Optional)</label>
                      <Input
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                        placeholder="Who is your target audience?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Business Goals *</label>
                      <Textarea
                        value={goals}
                        onChange={(e) => setGoals(e.target.value)}
                        placeholder="What are your main business goals?"
                        rows={2}
                      />
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-2">
                      <Coins className="w-4 h-4" />
                      <span>This tool uses 3 credits per generation</span>
                    </div>

                    <Button 
                      onClick={handleGenerate} 
                      className="w-full bg-pal-pink hover:bg-pal-pink/90"
                      size="lg"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Personas
                    </Button>
                  </CardContent>
                </Card>
              )}

              {!loading && results && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Your Audience Personas</h2>
                    <Button onClick={handleReset}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      New Personas
                    </Button>
                  </div>

                  {results.personas?.map((persona: any, idx: number) => (
                    <Card key={idx} className="p-6 border-2">
                      <h3 className="text-xl font-bold mb-3">{persona.name}</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Demographics:</strong> {persona.demographics}</p>
                        <p><strong>Goals:</strong> {persona.goals}</p>
                        <p><strong>Pain Points:</strong> {persona.painPoints}</p>
                        <p><strong>Motivations:</strong> {persona.motivations}</p>
                      </div>
                    </Card>
                  ))}

                  {results.brandVoice && (
                    <Card className="p-6 border-2">
                      <h3 className="text-xl font-bold mb-3">Brand Voice</h3>
                      <p className="text-muted-foreground">{results.brandVoice}</p>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>

        <div className="lg:hidden">
          <BottomNavigation />
        </div>
      </div>
    </>
  );
}
