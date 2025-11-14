import { MetaTags } from '@/components/seo/MetaTags';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { TopNavigation } from '@/components/dashboard/TopNavigation';
import { EnhancedFooter } from '@/components/seo/EnhancedFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Sparkles, Clapperboard, CheckSquare, Camera, Loader2, Download, RefreshCw, MapPin, Clock, Coins } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [currentTip, setCurrentTip] = useState(0);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!concept.trim() || !duration || !scale || !location) {
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
          toolType: 'production-assistant',
          inputs: { concept, duration, scale, budget, location }
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
          title: "✨ Production Plan Ready!",
          description: `Used ${data.credits.consumed} credits. ${data.credits.remaining} credits remaining.`
        });
      } else {
        toast({
          title: "Production Plan Ready!",
          description: "Your complete production guide has been generated"
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

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `production-plan-${Date.now()}.json`;
    a.click();
    toast({ title: "Downloaded!", description: "Production plan saved successfully" });
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
        description="Streamline your pre-production workflow with AI-powered planning and organization."
        canonicalUrl="https://www.palmerhouseproductions.com/tools/production-assistant"
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
                    <Clapperboard className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-foreground mb-3">
                    Production Assistant
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Streamline your pre-production workflow with AI-powered planning
                  </p>
                </div>

                {isLoading && (
                  <Card className="max-w-2xl mx-auto border-2">
                    <CardContent className="py-12">
                      <div className="text-center space-y-6">
                        <Loader2 className="w-16 h-16 mx-auto text-pal-blue animate-spin" />
                        <div>
                          <p className="text-lg font-semibold text-foreground mb-2">
                            Building Your Production Plan...
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
                      <CardTitle>Create Production Plan</CardTitle>
                      <CardDescription>
                        Get a comprehensive production plan with shot lists, checklists, and equipment recommendations
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="concept">Video Concept *</Label>
                        <Textarea
                          id="concept"
                          placeholder="Describe your video concept or script summary..."
                          value={concept}
                          onChange={(e) => setConcept(e.target.value)}
                          rows={4}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="duration">Estimated Duration *</Label>
                          <Select value={duration} onValueChange={setDuration}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-1min">Under 1 minute</SelectItem>
                              <SelectItem value="1-3min">1-3 minutes</SelectItem>
                              <SelectItem value="3-5min">3-5 minutes</SelectItem>
                              <SelectItem value="5-10min">5-10 minutes</SelectItem>
                              <SelectItem value="10plus">10+ minutes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="scale">Production Scale *</Label>
                          <Select value={scale} onValueChange={setScale}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select scale" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="solo">Solo Creator</SelectItem>
                              <SelectItem value="small-team">Small Team (2-3)</SelectItem>
                              <SelectItem value="full-crew">Full Crew (4+)</SelectItem>
                              <SelectItem value="professional">Professional Production</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location Type *</Label>
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

                        <div className="space-y-2">
                          <Label htmlFor="budget">Budget Range (Optional)</Label>
                          <Input
                            id="budget"
                            placeholder="e.g., $500-1000"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                          />
                      </div>
                    </div>

                    {/* Credit Cost Info */}
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-2">
                      <Coins className="w-4 h-4" />
                      <span>This tool uses 7 credits per generation</span>
                    </div>

                    <Button 
                      onClick={handleGenerate} 
                      className="w-full bg-pal-blue hover:bg-pal-blue/90"
                      size="lg"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Production Plan
                    </Button>
                    </CardContent>
                  </Card>
                )}

                {!isLoading && results && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold">Your Production Plan</h2>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleDownload}>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" onClick={handleReset}>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          New Plan
                        </Button>
                      </div>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clapperboard className="w-5 h-5 text-pal-blue" />
                          Shot List
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {results.shotList?.map((shot: any, idx: number) => (
                          <div key={idx} className="p-4 bg-muted rounded-lg">
                            <p className="font-semibold text-sm mb-1">Shot {idx + 1}</p>
                            <p className="text-sm text-muted-foreground">{typeof shot === 'string' ? shot : shot.description}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CheckSquare className="w-5 h-5 text-pal-green" />
                          Production Checklist
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {Object.entries(results.checklist || {}).map(([key, items]: [string, any]) => (
                          <div key={key}>
                            <h4 className="font-semibold mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                            <ul className="space-y-1">
                              {Array.isArray(items) && items.map((item: string, idx: number) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-pal-green mt-1">✓</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Camera className="w-5 h-5 text-pal-blue" />
                          Equipment Recommendations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {results.equipment?.map((item: string, idx: number) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-pal-blue mt-1">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-pal-orange" />
                          Location Tips
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {results.locationTips?.map((tip: string, idx: number) => (
                            <li key={idx} className="text-sm text-muted-foreground">{tip}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-pal-purple" />
                          Shooting Schedule
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {results.schedule?.map((item: string, idx: number) => (
                            <li key={idx} className="text-sm text-muted-foreground">{item}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
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
