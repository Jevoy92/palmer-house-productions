import { MetaTags } from '@/components/seo/MetaTags';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Clapperboard, Loader2, RotateCcw } from 'lucide-react';
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
      
      <DashboardLayout>
        <div className="max-w-4xl mx-auto px-3 md:px-4 pt-0 pb-6 space-y-4 min-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="mb-8 text-center pt-6">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Clapperboard className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Production Assistant</h1>
            <p className="text-lg text-muted-foreground">AI-powered production planning and shot lists</p>
          </div>

          {loading && (
            <Card className="border-2 p-12">
              <div className="text-center space-y-6">
                <Loader2 className="w-16 h-16 mx-auto text-indigo-500 animate-spin" />
                <div>
                  <p className="text-lg font-semibold mb-2">Creating Production Plan...</p>
                  <p className="text-sm text-muted-foreground animate-pulse">{LOADING_TIPS[currentTip]}</p>
                </div>
              </div>
            </Card>
          )}

          {!loading && !results && (
            <Card className="border-2">
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
                        <SelectItem value="minimal">Minimal (1-2 people)</SelectItem>
                        <SelectItem value="small">Small Team (3-5 people)</SelectItem>
                        <SelectItem value="medium">Medium (6-10 people)</SelectItem>
                        <SelectItem value="large">Large Production (10+ people)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Budget Range (Optional)</label>
                  <Input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g., $500-$2000"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Location Type *</label>
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

                <Button onClick={handleGenerate} className="w-full" size="lg">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Production Plan
                </Button>
              </CardContent>
            </Card>
          )}

          {!loading && results && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your Production Plan</h2>
                <Button onClick={handleReset} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  New Plan
                </Button>
              </div>

              {results.overview && (
                <Card>
                  <CardHeader>
                    <CardTitle>Production Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground whitespace-pre-wrap">{results.overview}</p>
                  </CardContent>
                </Card>
              )}

              {results.shotList && (
                <Card>
                  <CardHeader>
                    <CardTitle>Shot List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {results.shotList.map((shot: any, index: number) => (
                        <li key={index} className="border-b pb-3 last:border-0">
                          <div className="font-semibold">Shot {index + 1}: {shot.type}</div>
                          <p className="text-sm text-muted-foreground mt-1">{shot.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">Duration: {shot.duration}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {results.equipment && (
                <Card>
                  <CardHeader>
                    <CardTitle>Equipment Needed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {results.equipment.map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {results.schedule && (
                <Card>
                  <CardHeader>
                    <CardTitle>Production Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground whitespace-pre-wrap">{results.schedule}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}
