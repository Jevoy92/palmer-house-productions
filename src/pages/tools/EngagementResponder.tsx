import { MetaTags } from '@/components/seo/MetaTags';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Sparkles, MessageCircle, Heart, Loader2, Copy, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const LOADING_TIPS = [
  "Analyzing sentiment and tone...",
  "Crafting authentic responses...",
  "Matching your brand voice...",
  "Checking for escalation needs...",
  "Generating response variations..."
];

export default function EngagementResponder() {
  const [comment, setComment] = useState('');
  const [platform, setPlatform] = useState('');
  const [brandVoice, setBrandVoice] = useState('');
  const [tone, setTone] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [currentTip, setCurrentTip] = useState(0);

  const handleGenerate = async () => {
    if (!comment.trim() || !platform || !tone) {
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
          toolType: 'engagement-responder',
          inputs: { comment, platform, brandVoice, tone }
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
        toast.success(`Responses generated! Used ${data.credits.consumed} credits. ${data.credits.remaining} credits remaining.`);
      } else {
        toast.success('Responses generated!');
      }
    } catch (error: any) {
      clearInterval(tipInterval);
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to generate responses');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleReset = () => {
    setComment('');
    setPlatform('');
    setBrandVoice('');
    setTone('');
    setResults(null);
  };

  return (
    <>
      <MetaTags
        title="Engagement Responder | Palmer House Productions Content OS"
        description="Automate community engagement and build authentic connections at scale."
        canonicalUrl="https://www.palmerhouseproductions.com/tools/engagement-responder"
      />
      
      <DashboardLayout>
        <div className="max-w-4xl mx-auto px-3 md:px-4 pt-0 pb-6 space-y-4 min-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="mb-8 text-center pt-6">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Engagement Responder</h1>
            <p className="text-lg text-muted-foreground">AI-powered responses that build authentic connections</p>
          </div>

          {loading && (
            <Card className="border-2 p-12">
              <div className="text-center space-y-6">
                <Loader2 className="w-16 h-16 mx-auto text-purple-500 animate-spin" />
                <div>
                  <p className="text-lg font-semibold mb-2">Generating Responses...</p>
                  <p className="text-sm text-muted-foreground animate-pulse">{LOADING_TIPS[currentTip]}</p>
                </div>
              </div>
            </Card>
          )}

          {!loading && !results && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Generate Response</CardTitle>
                <CardDescription>
                  Get AI-powered response suggestions for your community engagement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="comment">Comment/Message *</Label>
                  <Textarea
                    id="comment"
                    placeholder="Paste the comment or message you want to respond to..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform">Platform *</Label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="twitter">Twitter/X</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tone">Response Tone *</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                        <SelectItem value="helpful">Helpful</SelectItem>
                        <SelectItem value="empathetic">Empathetic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brandVoice">Brand Voice (Optional)</Label>
                  <Textarea
                    id="brandVoice"
                    placeholder="Describe your brand's voice and personality..."
                    value={brandVoice}
                    onChange={(e) => setBrandVoice(e.target.value)}
                    rows={2}
                  />
                </div>

                <Button onClick={handleGenerate} className="w-full" size="lg">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Responses
                </Button>
              </CardContent>
            </Card>
          )}

          {!loading && results && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Your Response Options</h2>
                <Button onClick={handleReset} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  New Response
                </Button>
              </div>

              {results.analysis && (
                <Card>
                  <CardHeader>
                    <CardTitle>Comment Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="font-semibold">Sentiment</Label>
                      <p className="text-foreground">{results.analysis.sentiment}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Key Points</Label>
                      <p className="text-foreground">{results.analysis.keyPoints}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {results.responses && results.responses.map((response: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Option {index + 1}</CardTitle>
                        <CardDescription>{response.style}</CardDescription>
                      </div>
                      <Button
                        onClick={() => handleCopy(response.text)}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground whitespace-pre-wrap">{response.text}</p>
                  </CardContent>
                </Card>
              ))}

              {results.suggestions && (
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {results.suggestions.map((suggestion: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Heart className="w-5 h-5 text-pink-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
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
