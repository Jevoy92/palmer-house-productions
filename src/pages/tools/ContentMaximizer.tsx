import { useState } from 'react';
import { MetaTags } from '@/components/seo/MetaTags';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { EnhancedFooter } from '@/components/seo/EnhancedFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Maximize, Sparkles, Download, RotateCcw, Coins, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const PLATFORMS = [
  { id: 'youtube', label: 'YouTube' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'twitter', label: 'Twitter/X' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'blog', label: 'Blog' },
  { id: 'email', label: 'Email/Newsletter' },
];

const LOADING_TIPS = [
  "Analyzing your content...",
  "Adapting for platform-specific formats...",
  "Crafting platform-optimized captions...",
  "Generating hashtag strategies...",
  "Creating your content calendar..."
];

export default function ContentMaximizer() {
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [results, setResults] = useState<any>(null);

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleGenerate = async () => {
    if (!content.trim() || !contentType || selectedPlatforms.length === 0) {
      toast.error('Please fill in all fields and select at least one platform');
      return;
    }

    setLoading(true);
    setCurrentTip(0);
    setResults(null);

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
          toolType: 'content-maximizer',
          inputs: { content, contentType, platforms: selectedPlatforms }
        }
      });

      clearInterval(tipInterval);

      if (error) throw error;

      // Check for insufficient credits
      if (data?.error) {
        if (data.error === 'Insufficient credits') {
          toast.error(data.message || `This tool requires ${data.required} credits. You have ${data.current} credits remaining.`);
          setLoading(false);
          return;
        }
        throw new Error(data.error);
      }

      const parsedContent = typeof data.content === 'string' 
        ? JSON.parse(data.content) 
        : data.content;
      
      setResults(parsedContent);
      
      if (data.credits) {
        toast.success(`Content repurposed! Used ${data.credits.consumed} credits. ${data.credits.remaining} credits remaining.`);
      } else {
        toast.success('Content repurposed successfully!');
      }
    } catch (error: any) {
      clearInterval(tipInterval);
      console.error('Generation error:', error);
      toast.error(error.message || 'Failed to repurpose content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setContent('');
    setContentType('');
    setSelectedPlatforms([]);
    setResults(null);
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `content-maximizer-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Results downloaded!');
  };

  if (loading) {
    return (
      <>
        <MetaTags
          title="Content Maximizer | Palmer House Productions Content OS"
          description="Repurpose your content across all platforms to maximize reach and engagement."
          canonicalUrl="https://www.palmerhouseproductions.com/tools/content-maximizer"
        />
        <SidebarProvider>
          <div className="flex w-full min-h-screen">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <DashboardHeader />
              <main className="flex-1 bg-white flex items-center justify-center p-8 pb-8">
                <div className="text-center max-w-md">
                  <Loader2 className="w-16 h-16 mx-auto mb-6 text-pal-orange animate-spin" />
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Repurposing Your Content...
                  </h2>
                  <p className="text-lg text-muted-foreground bg-muted/50 rounded-xl p-6 animate-pulse">
                    💡 {LOADING_TIPS[currentTip]}
                  </p>
                </div>
              </main>
              <EnhancedFooter />
            </div>
          </div>
        </SidebarProvider>
      </>
    );
  }

  if (results) {
    return (
      <>
        <MetaTags
          title="Content Maximizer | Palmer House Productions Content OS"
          description="Repurpose your content across all platforms to maximize reach and engagement."
          canonicalUrl="https://www.palmerhouseproductions.com/tools/content-maximizer"
        />
        <SidebarProvider>
          <div className="flex w-full min-h-screen">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <DashboardHeader />
              <main className="flex-1 bg-white pb-8">
                <div className="container mx-auto px-4 py-8 max-w-5xl">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">Content Repurposing Plan</h1>
                      <p className="text-muted-foreground">Optimized for {selectedPlatforms.length} platforms</p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleDownload} variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button onClick={handleReset} variant="outline" size="sm">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        New Plan
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {results.platformAdaptations && Object.entries(results.platformAdaptations).map(([platform, data]: [string, any]) => (
                      <Card key={platform}>
                        <CardHeader>
                          <CardTitle className="capitalize">{platform}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label className="font-semibold">Format</Label>
                            <p className="text-foreground">{data.format}</p>
                          </div>
                          <div>
                            <Label className="font-semibold">Caption/Copy</Label>
                            <p className="text-foreground whitespace-pre-wrap">{data.caption}</p>
                          </div>
                          <div>
                            <Label className="font-semibold">Hashtags</Label>
                            <p className="text-foreground">{data.hashtags}</p>
                          </div>
                          <div>
                            <Label className="font-semibold">Best Posting Time</Label>
                            <p className="text-foreground">{data.postingTime}</p>
                          </div>
                          <div>
                            <Label className="font-semibold">Call-to-Action</Label>
                            <p className="text-foreground">{data.cta}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {results.calendarSuggestions && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Content Calendar (Next 2 Weeks)</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-foreground whitespace-pre-wrap">{results.calendarSuggestions}</p>
                        </CardContent>
                      </Card>
                    )}

                    {results.highlights && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Key Highlights to Extract</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-foreground whitespace-pre-wrap">{results.highlights}</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </main>
              <EnhancedFooter />
            </div>
          </div>
        </SidebarProvider>
      </>
    );
  }

  return (
    <>
      <MetaTags
        title="Content Maximizer | Palmer House Productions Content OS"
        description="Repurpose your content across all platforms to maximize reach and engagement."
        canonicalUrl="https://www.palmerhouseproductions.com/tools/content-maximizer"
      />
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col">
            <DashboardHeader />
            
            <main className="flex-1 bg-white pb-8">
              <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="mb-12 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-pal-orange flex items-center justify-center">
                    <Maximize className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-foreground mb-3">
                    Content Maximizer
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Turn one piece of content into dozens of platform-optimized assets
                  </p>
                </div>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>What content do you want to repurpose?</CardTitle>
                    <CardDescription>
                      We'll adapt it for every platform you select
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="content">Original Content *</Label>
                      <Textarea
                        id="content"
                        placeholder="Paste your video script, blog post, or describe your content..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={6}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contentType">Content Type *</Label>
                      <Select value={contentType} onValueChange={setContentType}>
                        <SelectTrigger id="contentType">
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="blog">Blog Post</SelectItem>
                          <SelectItem value="podcast">Podcast</SelectItem>
                          <SelectItem value="webinar">Webinar</SelectItem>
                          <SelectItem value="whitepaper">Whitepaper</SelectItem>
                          <SelectItem value="case-study">Case Study</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Target Platforms * (select at least one)</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {PLATFORMS.map((platform) => (
                          <div key={platform.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={platform.id}
                              checked={selectedPlatforms.includes(platform.id)}
                              onCheckedChange={() => handlePlatformToggle(platform.id)}
                            />
                            <label
                              htmlFor={platform.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {platform.label}
                            </label>
                          </div>
                        ))}
                      </div>
                  </div>

                  {/* Credit Cost Info */}
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-2">
                    <Coins className="w-4 h-4" />
                    <span>This tool uses 6 credits per generation</span>
                  </div>

                  <Button 
                    onClick={handleGenerate} 
                    className="w-full"
                    size="lg"
                    disabled={!content.trim() || !contentType || selectedPlatforms.length === 0}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Maximize This Content
                  </Button>
                  </CardContent>
                </Card>
              </div>
            </main>
            <EnhancedFooter />
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
