import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, BookOpen, Download, Save, RefreshCw, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Input } from '@/components/ui/input';

const CONTENT_TYPES = [
  { value: 'blog', label: '📝 Blog Posts' },
  { value: 'video', label: '🎥 Video Series' },
  { value: 'social', label: '📱 Social Media Posts' },
  { value: 'podcast', label: '🎙️ Podcast Episodes' },
];

const EXAMPLE_PROMPTS = [
  { 
    topic: 'Winter Wellness: Complete Seasonal Health Guide', 
    industry: 'Healthcare',
    contentType: 'blog',
    icon: '🏥'
  },
  { 
    topic: '8-Week Body Transformation Challenge', 
    industry: 'Fitness',
    contentType: 'video',
    icon: '🏋️'
  },
  { 
    topic: 'First-Time Homebuyer Journey', 
    industry: 'Real Estate',
    contentType: 'social',
    icon: '🏡'
  },
  { 
    topic: 'Productivity Mastery in 4 Weeks', 
    industry: 'Business Coaching',
    contentType: 'podcast',
    icon: '💼'
  },
];

const LOADING_TIPS = [
  "Analyzing your topic and industry...",
  "Identifying key themes and progression...",
  "Crafting compelling episode titles...",
  "Structuring your series flow...",
  "Adding hooks and CTAs...",
];

interface SeriesEntry {
  number: number;
  title: string;
  description: string;
  keyTopics: string[];
  hook: string;
  cta: string;
}

interface SeriesPlan {
  seriesTitle: string;
  seriesConcept: string;
  throughLine: string;
  entries: SeriesEntry[];
  publishingCadence: string;
}

export default function SeriesBuilder() {
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState('blog');
  const [industry, setIndustry] = useState('');
  const [seriesLength, setSeriesLength] = useState('5');
  const [additionalContext, setAdditionalContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [seriesPlan, setSeriesPlan] = useState<SeriesPlan | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const { toast } = useToast();

  const handlePromptClick = (prompt: typeof EXAMPLE_PROMPTS[0]) => {
    setTopic(prompt.topic);
    setIndustry(prompt.industry);
    setContentType(prompt.contentType);
  };

  const handleGenerate = async () => {
    if (!topic || !industry) {
      toast({
        title: 'Missing Information',
        description: 'Please provide a topic and industry.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setCurrentTip(0);

    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % LOADING_TIPS.length);
    }, 3000);

    try {
      const { data: functionData, error: functionError } = await supabase.functions.invoke('generate-content', {
        body: { 
          toolType: 'series-builder',
          inputs: {
            topic,
            contentType,
            industry,
            seriesLength: parseInt(seriesLength),
            additionalContext,
          }
        }
      });

      clearInterval(tipInterval);

      if (functionError) {
        console.error('Function error:', functionError);
        
        if (functionError.message?.includes('Insufficient credits')) {
          toast({
            title: 'Insufficient Credits',
            description: 'You need more credits to use this tool. Please upgrade your plan.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Generation Failed',
            description: functionError.message || 'An error occurred while generating your series.',
            variant: 'destructive',
          });
        }
        setLoading(false);
        return;
      }

      if (!functionData?.generatedText) {
        throw new Error('No content generated');
      }

      const cleanedText = functionData.generatedText
        .replace(/^```json\s*\n?/i, '')
        .replace(/\n?```\s*$/i, '')
        .trim();

      const parsedPlan = JSON.parse(cleanedText);
      setSeriesPlan(parsedPlan);

      toast({
        title: 'Series Generated!',
        description: 'Your content series plan is ready.',
      });
    } catch (error) {
      console.error('Error generating series:', error);
      clearInterval(tipInterval);
      
      toast({
        title: 'Generation Error',
        description: error instanceof Error ? error.message : 'Failed to generate series plan.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSeriesPlan(null);
    setTopic('');
    setIndustry('');
    setContentType('blog');
    setSeriesLength('5');
    setAdditionalContext('');
    setSaveStatus('idle');
  };

  const handleDownload = () => {
    if (!seriesPlan) return;
    
    const dataStr = JSON.stringify(seriesPlan, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `series-plan-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'Downloaded!',
      description: 'Your series plan has been downloaded.',
    });
  };

  const handleSave = () => {
    if (!seriesPlan) return;
    
    setSaveStatus('saving');
    localStorage.setItem(`series-plan-${Date.now()}`, JSON.stringify(seriesPlan));
    
    setTimeout(() => {
      setSaveStatus('saved');
      toast({
        title: 'Saved!',
        description: 'Your series plan has been saved to your library.',
      });
    }, 500);
  };

  if (loading) {
    return (
      <SidebarProvider>
        <div className="flex w-full min-h-[calc(100vh-5rem)]">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            <main className="flex-1 flex flex-col items-center justify-center bg-white px-4 pb-8">
              <Loader2 className="w-16 h-16 animate-spin text-primary mb-8" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Building Your Series...
              </h2>
              <p className="text-muted-foreground text-center max-w-md">
                {LOADING_TIPS[currentTip]}
              </p>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  if (seriesPlan) {
    return (
      <SidebarProvider>
        <div className="flex w-full min-h-[calc(100vh-5rem)]">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            <main className="flex-1 bg-white px-4 pb-8 overflow-y-auto">

              <div className="max-w-6xl mx-auto py-8">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Your Content Series</h1>
                    <p className="text-muted-foreground">Ready to schedule and publish</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={handleDownload} variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button onClick={handleSave} variant="outline" size="sm" disabled={saveStatus === 'saved'}>
                      <Save className="w-4 h-4 mr-2" />
                      {saveStatus === 'saved' ? 'Saved' : 'Save'}
                    </Button>
                    <Button onClick={handleReset} variant="default" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      New Series
                    </Button>
                  </div>
                </div>

                {/* Series Overview */}
                <Card className="mb-8 bg-gradient-to-br from-pal-purple/5 to-pal-blue/5">
                  <CardHeader>
                    <CardTitle className="text-2xl">{seriesPlan.seriesTitle}</CardTitle>
                    <CardDescription className="text-base">{seriesPlan.seriesConcept}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Series Through-Line</h3>
                      <p className="text-muted-foreground">{seriesPlan.throughLine}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Publishing Cadence</h3>
                      <p className="text-muted-foreground">{seriesPlan.publishingCadence}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Individual Entries */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">Series Entries</h2>
                  {seriesPlan.entries.map((entry) => (
                    <Card key={entry.number} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-pal-purple text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                            {entry.number}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">{entry.title}</CardTitle>
                            <CardDescription>{entry.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Key Topics</h4>
                          <div className="flex flex-wrap gap-2">
                            {entry.keyTopics.map((topic, idx) => (
                              <span key={idx} className="px-3 py-1 bg-pal-blue/10 text-pal-blue rounded-full text-sm">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Hook</h4>
                          <p className="text-muted-foreground italic">"{entry.hook}"</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Call-to-Action</h4>
                          <p className="text-muted-foreground">{entry.cta}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-[calc(100vh-5rem)]">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 bg-white px-4 pb-8 overflow-y-auto">

            <div className="max-w-4xl mx-auto py-8">
              <div className="mb-12">
                {/* Header */}
                <div className="text-center mb-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-pal-blue flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-foreground mb-3">
                    Series Builder
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Create a cohesive content series that keeps your audience engaged
                  </p>
                </div>

                {/* Input Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Series Details</CardTitle>
                    <CardDescription>Tell us about the series you want to create</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Content Type */}
                    <div>
                      <Label htmlFor="contentType">Content Type *</Label>
                      <Select value={contentType} onValueChange={setContentType}>
                        <SelectTrigger id="contentType">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CONTENT_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Topic */}
                    <div>
                      <Label htmlFor="topic">Series Topic *</Label>
                      <Textarea
                        id="topic"
                        placeholder="e.g., Winter Wellness: Complete Seasonal Health Guide"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        rows={3}
                        className="resize-none"
                      />
                    </div>

                    {/* Industry */}
                    <div>
                      <Label htmlFor="industry">Industry *</Label>
                      <Input
                        id="industry"
                        placeholder="e.g., Healthcare, Fitness, Real Estate"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                      />
                    </div>

                    {/* Series Length */}
                    <div>
                      <Label htmlFor="seriesLength">Number of Entries *</Label>
                      <Select value={seriesLength} onValueChange={setSeriesLength}>
                        <SelectTrigger id="seriesLength">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {contentType === 'blog' ? 'posts' : contentType === 'video' ? 'videos' : 'episodes'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Additional Context */}
                    <div>
                      <Label htmlFor="additionalContext">Additional Context (Optional)</Label>
                      <Textarea
                        id="additionalContext"
                        placeholder="Target audience, seasonal themes, specific goals, etc."
                        value={additionalContext}
                        onChange={(e) => setAdditionalContext(e.target.value)}
                        rows={3}
                        className="resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Example Prompts */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    <Sparkles className="w-5 h-5 inline mr-2" />
                    Try These Examples
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {EXAMPLE_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePromptClick(prompt)}
                        className="text-left p-4 rounded-lg border border-border hover:border-pal-purple hover:bg-pal-purple/5 transition-all"
                      >
                        <div className="text-2xl mb-2">{prompt.icon}</div>
                        <div className="font-semibold text-foreground mb-1">{prompt.topic}</div>
                        <div className="text-sm text-muted-foreground">{prompt.industry}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Credit Cost & Generate Button */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="w-4 h-4" />
                    <span>This tool costs 5 credits per generation</span>
                  </div>
                  <Button 
                    onClick={handleGenerate}
                    disabled={loading || !topic || !industry}
                    size="lg"
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-5 h-5 mr-2" />
                        Generate Series Plan
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
