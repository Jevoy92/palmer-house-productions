import { MetaTags } from '@/components/seo/MetaTags';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Sparkles, MessageCircle, Heart, TrendingUp, Loader2, Copy, Download, RefreshCw, Coins } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [currentTip, setCurrentTip] = useState(0);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!comment.trim() || !platform || !tone) {
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
          toolType: 'engagement-responder',
          inputs: { comment, platform, brandVoice, tone }
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
          title: "✨ Responses Generated!",
          description: `Used ${data.credits.consumed} credits. ${data.credits.remaining} credits remaining.`
        });
      } else {
        toast({
          title: "Responses Generated!",
          description: "Your engagement responses are ready"
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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Response copied to clipboard" });
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `engagement-responses-${Date.now()}.json`;
    a.click();
    toast({ title: "Downloaded!", description: "Responses saved successfully" });
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
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            
            <main className="flex-1 bg-white">
              <div className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="mb-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-pal-purple flex items-center justify-center">
                    <MessageCircle className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-foreground mb-3">
                    Engagement Responder
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Build authentic community connections with AI-powered responses
                  </p>
                </div>

                {isLoading && (
                  <Card className="max-w-2xl mx-auto border-2">
                    <CardContent className="py-12">
                      <div className="text-center space-y-6">
                        <Loader2 className="w-16 h-16 mx-auto text-pal-purple animate-spin" />
                        <div>
                          <p className="text-lg font-semibold text-foreground mb-2">
                            Generating Responses...
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
                          <Label htmlFor="tone">Desired Tone *</Label>
                          <Select value={tone} onValueChange={setTone}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select tone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="professional">Professional</SelectItem>
                              <SelectItem value="friendly">Friendly</SelectItem>
                              <SelectItem value="casual">Casual</SelectItem>
                              <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                              <SelectItem value="empathetic">Empathetic</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="brandVoice">Brand Voice (Optional)</Label>
                        <Textarea
                          id="brandVoice"
                          placeholder="Describe your brand voice or leave blank for default..."
                          value={brandVoice}
                          onChange={(e) => setBrandVoice(e.target.value)}
                          rows={2}
                    />
                  </div>

                  {/* Credit Cost Info */}
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-2">
                    <Coins className="w-4 h-4" />
                    <span>This tool uses 3 credits per generation</span>
                  </div>

                  <Button 
                    onClick={handleGenerate} 
                    className="w-full bg-pal-purple hover:bg-pal-purple/90"
                    size="lg"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Responses
                  </Button>
                    </CardContent>
                  </Card>
                )}

                {!isLoading && results && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold">Your Response Options</h2>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleDownload}>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" onClick={handleReset}>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          New Response
                        </Button>
                      </div>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-pal-pink" />
                          Sentiment Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{results.sentiment}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MessageCircle className="w-5 h-5 text-pal-purple" />
                          Response Options
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {results.responses?.map((response: string, idx: number) => (
                          <div key={idx} className="p-4 bg-muted rounded-lg relative group">
                            <p className="text-sm pr-12">{response}</p>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleCopy(response)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {results.escalation && (
                      <Card className="border-amber-500">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-amber-600">
                            <TrendingUp className="w-5 h-5" />
                            Escalation Notice
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {results.escalation.reason}
                          </p>
                          {results.escalation.requiresReview && (
                            <p className="text-sm font-semibold text-amber-600 mt-2">
                              ⚠️ This comment may require human review
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    )}

                    {results.suggestions && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Suggestions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{results.suggestions}</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
