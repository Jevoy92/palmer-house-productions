import { MetaTags } from '@/components/seo/MetaTags';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Clapperboard, Loader2, RotateCcw, Coins } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const LOADING_TIPS = [
  "Creating your shot list...",
  "Planning equipment needs...",
  "Generating production checklist...",
  "Optimizing shooting schedule...",
  "Adding location tips..."
];

export default function ProductionAssistant() {
  const [concept, setConcept] = useState('');
  const [duration, setDuration] = useState('');
  const [scale, setScale] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [currentTip, setCurrentTip] = useState(0);

  const handleGenerate = async () => {
    if (!concept.trim() || !duration || !scale || !location) {
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
          toolType: 'production-assistant',
          inputs: { concept, duration, scale, budget, location }
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
        toast.success(`Production plan ready! Used ${data.credits.consumed} credits. ${data.credits.remaining} credits remaining.`);
      } else {
        toast.success('Production plan ready!');
      }
    } catch (error: any) {
      clearInterval(tipInterval);
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to generate production plan');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setConcept('');
    setDuration('');
    setScale('');
    setBudget('');
    setLocation('');
    setResults(null);
  };

  return (
    <>
      <MetaTags
        title="Production Assistant | Palmer House Productions Content OS"
        description="Get AI-powered production planning, shot lists, and equipment recommendations."
        canonicalUrl="https://www.palmerhouseproductions.com/tools/production-assistant"
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
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-pal-green flex items-center justify-center">
                  <Clapperboard className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-3">
                  Production Assistant
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get AI-powered production planning and equipment recommendations
                </p>
              </div>

              {loading && (
                <Card className="max-w-2xl mx-auto border-2 p-12">
                  <div className="text-center space-y-6">
                    <Loader2 className="w-16 h-16 mx-auto text-pal-green animate-spin" />
                    <div>
                      <p className="text-lg font-semibold text-foreground mb-2">
                        Creating Production Plan...
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
                    <CardTitle>Plan Your Production</CardTitle>
                    <CardDescription>
                      Get a complete production plan with shot lists and equipment needs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Video Concept *</label>
                      <Textarea
                        value={concept}
                        onChange={(e) => setConcept(e.target.value)}
                        placeholder="Describe your video concept..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Duration *</label>
                        <Select value={duration} onValueChange={setDuration}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="short">Under 1 min</SelectItem>
                            <SelectItem value="medium">1-3 minutes</SelectItem>
                            <SelectItem value="long">3-10 minutes</SelectItem>
                            <SelectItem value="extended">10+ minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Production Scale *</label>
                        <Select value={scale} onValueChange={setScale}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select scale" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="solo">Solo (DIY)</SelectItem>
                            <SelectItem value="small">Small Team (2-3)</SelectItem>
                            <SelectItem value="medium">Medium Team (4-6)</SelectItem>
                            <SelectItem value="large">Large Production (7+)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Budget Range (Optional)</label>
                      <Input
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="e.g., $500-$1000"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location *</label>
                      <Select value={location} onValueChange={setLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="indoor">Indoor</SelectItem>
                          <SelectItem value="outdoor">Outdoor</SelectItem>
                          <SelectItem value="studio">Studio</SelectItem>
                          <SelectItem value="mixed">Mixed Locations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-2">
                      <Coins className="w-4 h-4" />
                      <span>This tool uses 3 credits per generation</span>
                    </div>

                    <Button 
                      onClick={handleGenerate} 
                      className="w-full bg-pal-green hover:bg-pal-green/90"
                      size="lg"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Production Plan
                    </Button>
                  </CardContent>
                </Card>
              )}

              {!loading && results && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Your Production Plan</h2>
                    <Button onClick={handleReset}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      New Plan
                    </Button>
                  </div>

                  {results.shotList && (
                    <Card className="p-6 border-2">
                      <h3 className="text-xl font-bold mb-3">📹 Shot List</h3>
                      <div className="space-y-2 text-sm">
                        {results.shotList.map((shot: string, idx: number) => (
                          <p key={idx}>• {shot}</p>
                        ))}
                      </div>
                    </Card>
                  )}

                  {results.equipment && (
                    <Card className="p-6 border-2">
                      <h3 className="text-xl font-bold mb-3">🎬 Equipment Needed</h3>
                      <div className="space-y-2 text-sm">
                        {results.equipment.map((item: string, idx: number) => (
                          <p key={idx}>• {item}</p>
                        ))}
                      </div>
                    </Card>
                  )}

                  {results.schedule && (
                    <Card className="p-6 border-2">
                      <h3 className="text-xl font-bold mb-3">📅 Production Schedule</h3>
                      <p className="text-muted-foreground">{results.schedule}</p>
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
