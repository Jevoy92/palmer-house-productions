import { useState } from 'react';
import { MetaTags } from '@/components/seo/MetaTags';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2, BookOpen, Sparkles, RotateCcw, Coins } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const LOADING_TIPS = [
  "Analyzing your topic and industry...",
  "Identifying key themes and progression...",
  "Crafting compelling episode titles...",
  "Structuring your series flow...",
  "Adding hooks and CTAs...",
];

export default function SeriesBuilder() {
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState('blog');
  const [industry, setIndustry] = useState('');
  const [seriesLength, setSeriesLength] = useState('5');
  const [loading, setLoading] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [seriesPlan, setSeriesPlan] = useState<any>(null);

  const handleGenerate = async () => {
    if (!topic || !industry) {
      toast.error('Please provide a topic and industry');
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
          toolType: 'series-builder',
          inputs: { topic, contentType, industry, seriesLength: parseInt(seriesLength) }
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
      setSeriesPlan(parsedContent);

      if (data.credits) {
        toast.success(`Series plan created! Used ${data.credits.consumed} credits. ${data.credits.remaining} credits remaining.`);
      } else {
        toast.success('Series plan created!');
      }
    } catch (error: any) {
      clearInterval(tipInterval);
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to generate series plan');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSeriesPlan(null);
    setTopic('');
    setIndustry('');
  };

  return (
    <>
      <MetaTags
        title="Series Builder | Palmer House Productions Content OS"
        description="Plan your content series with AI-generated episode outlines."
        canonicalUrl="https://www.palmerhouseproductions.com/tools/series-builder"
      />

      <DashboardLayout>
        <div className="max-w-7xl mx-auto px-3 md:px-4 pt-0 space-y-4">
          <div className="mb-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-pal-orange flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-3">
                  Series Builder
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Plan your content series with AI-generated episode outlines
                </p>
              </div>

              {loading && (
                <Card className="max-w-2xl mx-auto border-2 p-12">
                  <div className="text-center space-y-6">
                    <Loader2 className="w-16 h-16 mx-auto text-pal-orange animate-spin" />
                    <div>
                      <p className="text-lg font-semibold text-foreground mb-2">
                        Building Your Series...
                      </p>
                      <p className="text-sm text-muted-foreground animate-pulse">
                        {LOADING_TIPS[currentTip]}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {!loading && !seriesPlan && (
                <Card className="max-w-2xl mx-auto border-2">
                  <CardHeader>
                    <CardTitle>Create Your Series</CardTitle>
                    <CardDescription>
                      Generate a structured content series with episode-by-episode planning
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Series Topic *</label>
                      <Input
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., Winter Wellness: Complete Seasonal Health Guide"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Content Type *</label>
                        <Select value={contentType} onValueChange={setContentType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="blog">📝 Blog Posts</SelectItem>
                            <SelectItem value="video">🎥 Video Series</SelectItem>
                            <SelectItem value="social">📱 Social Media</SelectItem>
                            <SelectItem value="podcast">🎙️ Podcast Episodes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Series Length</label>
                        <Select value={seriesLength} onValueChange={setSeriesLength}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 Episodes</SelectItem>
                            <SelectItem value="5">5 Episodes</SelectItem>
                            <SelectItem value="7">7 Episodes</SelectItem>
                            <SelectItem value="10">10 Episodes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Industry *</label>
                      <Input
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        placeholder="e.g., Healthcare, Fitness, Real Estate"
                      />
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-2">
                      <Coins className="w-4 h-4" />
                      <span>This tool uses 4 credits per generation</span>
                    </div>

                    <Button 
                      onClick={handleGenerate} 
                      className="w-full bg-pal-orange hover:bg-pal-orange/90"
                      size="lg"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Series Plan
                    </Button>
                  </CardContent>
                </Card>
              )}

              {!loading && seriesPlan && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Your Series Plan</h2>
                    <Button onClick={handleReset}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      New Series
                    </Button>
                  </div>

                  <Card className="p-6 border-2">
                    <h3 className="text-2xl font-bold mb-2">{seriesPlan.seriesTitle}</h3>
                    <p className="text-muted-foreground mb-4">{seriesPlan.seriesConcept}</p>
                    <p className="text-sm"><strong>Through Line:</strong> {seriesPlan.throughLine}</p>
                  </Card>

                  <div className="space-y-4">
                    {seriesPlan.entries?.map((entry: any, idx: number) => (
                      <Card key={idx} className="p-6">
                        <h4 className="text-lg font-bold mb-2">
                          Episode {entry.number}: {entry.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">{entry.description}</p>
                        <div className="space-y-2 text-sm">
                          <p><strong>Key Topics:</strong> {entry.keyTopics?.join(', ')}</p>
                          <p><strong>Hook:</strong> {entry.hook}</p>
                          <p><strong>CTA:</strong> {entry.cta}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
        </DashboardLayout>
      </>
    );
  }
