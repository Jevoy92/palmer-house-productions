import { useState } from 'react';
import { MetaTags } from '@/components/seo/MetaTags';
import { TopNavigation } from '@/components/dashboard/TopNavigation';
import { MobileTopBar } from '@/components/dashboard/MobileTopBar';
import { SimplifiedSidebar } from '@/components/dashboard/SimplifiedSidebar';
import { BottomNavigation } from '@/components/dashboard/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Loader2, Sparkles, Download, Save, RotateCcw, Video, Coins } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const LOADING_TIPS = [
  'Repurpose your main video into clips, carousels, and threads to maximize reach.',
  'Use a strong hook in the first 3 seconds to stop the scroll.',
  'Reach all your clients on their platform of choice.',
  "Turn your video's key takeaways into a valuable checklist or guide.",
  'End every piece of content with a clear call-to-action.',
];

export default function ContentSystemBuilder() {
  const [idea, setIdea] = useState('');
  const [industry, setIndustry] = useState('Real Estate');
  const [goal, setGoal] = useState('Educate');
  const [loading, setLoading] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [contentPlan, setContentPlan] = useState<any>(null);

  const handleGenerate = async () => {
    if (!idea.trim()) {
      toast.error('Please enter your core video idea');
      return;
    }

    setLoading(true);
    setCurrentTip(0);

    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % LOADING_TIPS.length);
    }, 3000);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('You must be logged in to use this tool');
      }

      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: { 
          toolType: 'content-system-builder',
          inputs: { idea: idea.trim(), industry, goal }
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
      setContentPlan(parsedContent);

      if (data.credits) {
        toast.success(`Content system generated! Used ${data.credits.consumed} credits. ${data.credits.remaining} credits remaining.`);
      } else {
        toast.success('Content system generated!');
      }
    } catch (error: any) {
      clearInterval(tipInterval);
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to generate content system');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setContentPlan(null);
    setIdea('');
  };

  return (
    <>
      <MetaTags
        title="Content System Builder | Palmer House Productions Content OS"
        description="Turn one core video into a complete multi-platform content system."
        canonicalUrl="https://www.palmerhouseproductions.com/tools/content-system-builder"
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
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-pal-teal flex items-center justify-center">
                  <Video className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-3">
                  Content System Builder
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Turn one core video into a complete multi-platform content system
                </p>
              </div>

              {loading && (
                <Card className="max-w-2xl mx-auto border-2 p-12">
                  <div className="text-center space-y-6">
                    <Loader2 className="w-16 h-16 mx-auto text-pal-teal animate-spin" />
                    <div>
                      <p className="text-lg font-semibold text-foreground mb-2">
                        Crafting Your Content System...
                      </p>
                      <p className="text-sm text-muted-foreground animate-pulse">
                        💡 {LOADING_TIPS[currentTip]}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {!loading && !contentPlan && (
                <Card className="max-w-2xl mx-auto p-6 border-2">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Your Core Video Idea *</label>
                      <Textarea
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder="Describe the main video you want to create..."
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Industry</label>
                        <Select value={industry} onValueChange={setIndustry}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Real Estate">Real Estate</SelectItem>
                            <SelectItem value="Fitness">Fitness</SelectItem>
                            <SelectItem value="Coaching">Coaching</SelectItem>
                            <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Goal</label>
                        <Select value={goal} onValueChange={setGoal}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Educate">Educate</SelectItem>
                            <SelectItem value="Entertain">Entertain</SelectItem>
                            <SelectItem value="Promote">Promote</SelectItem>
                            <SelectItem value="Build Authority">Build Authority</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-2">
                      <Coins className="w-4 h-4" />
                      <span>This tool uses 5 credits per generation</span>
                    </div>

                    <Button 
                      onClick={handleGenerate} 
                      className="w-full bg-pal-teal hover:bg-pal-teal/90"
                      size="lg"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Content System
                    </Button>
                  </div>
                </Card>
              )}

              {!loading && contentPlan && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Your Content System</h2>
                    <Button onClick={handleReset}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      New Plan
                    </Button>
                  </div>

                  <Card className="p-6 border-2">
                    <h3 className="text-xl font-bold mb-3">🎯 Strategy</h3>
                    <p className="text-muted-foreground">{contentPlan.strategy}</p>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(contentPlan).map(([platform, content]: [string, any]) => {
                      if (platform === 'strategy') return null;
                      return (
                        <Card key={platform} className="p-6">
                          <h3 className="text-lg font-bold mb-4 capitalize">{platform}</h3>
                          <div className="space-y-2 text-sm">
                            {typeof content === 'object' ? (
                              Object.entries(content).map(([key, value]) => (
                                <div key={key}>
                                  <strong className="text-muted-foreground">{key}:</strong>
                                  <p>{String(value)}</p>
                                </div>
                              ))
                            ) : (
                              <p>{String(content)}</p>
                            )}
                          </div>
                        </Card>
                      );
                    })}
                  </div>
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
