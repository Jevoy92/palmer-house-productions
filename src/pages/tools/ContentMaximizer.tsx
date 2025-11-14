import { useState } from 'react';
import { MetaTags } from '@/components/seo/MetaTags';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Maximize, Sparkles, Download, RotateCcw, Loader2 } from 'lucide-react';
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
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'content-plan.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    toast.success('Content plan downloaded!');
  };

  return (
    <>
      <MetaTags
        title="Content Maximizer | Palmer House Productions Content OS"
        description="Repurpose video content for every platform with AI-optimized captions and strategies."
        canonicalUrl="https://www.palmerhouseproductions.com/tools/content-maximizer"
      />

      <DashboardLayout>
        <div className="max-w-5xl mx-auto px-3 md:px-4 pt-0 pb-6 space-y-4 min-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="mb-8 text-center pt-6">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Maximize className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Content Maximizer</h1>
            <p className="text-lg text-muted-foreground">Repurpose your content for every platform</p>
          </div>

          {loading && (
            <Card className="border-2 p-12">
              <div className="text-center space-y-6">
                <Loader2 className="w-16 h-16 mx-auto text-blue-500 animate-spin" />
                <div>
                  <p className="text-lg font-semibold mb-2">Repurposing Your Content...</p>
                  <p className="text-sm text-muted-foreground animate-pulse">{LOADING_TIPS[currentTip]}</p>
                </div>
              </div>
            </Card>
          )}

          {!loading && results && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Content Repurposing Plan</h2>
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
            </div>
          )}

          {!loading && !results && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Repurpose Your Content</CardTitle>
                <CardDescription>
                  Transform your content for multiple platforms instantly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="content">Your Content *</Label>
                  <Textarea
                    id="content"
                    placeholder="Paste your video script, blog post, or main content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contentType">Content Type *</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Content</SelectItem>
                      <SelectItem value="blog">Blog Post</SelectItem>
                      <SelectItem value="podcast">Podcast</SelectItem>
                      <SelectItem value="presentation">Presentation</SelectItem>
                      <SelectItem value="webinar">Webinar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Target Platforms * (Select at least one)</Label>
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

                <Button 
                  onClick={handleGenerate} 
                  className="w-full" 
                  size="lg"
                  disabled={loading}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Repurpose Content
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}
