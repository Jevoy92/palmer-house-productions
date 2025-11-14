import { useState } from 'react';
import { MetaTags } from '@/components/seo/MetaTags';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Loader2, Sparkles, Download, Save, RotateCcw, Video, Coins } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TopNavigation } from '@/components/dashboard/TopNavigation';
import { MobileTopBar } from '@/components/dashboard/MobileTopBar';
import { SimplifiedSidebar } from '@/components/dashboard/SimplifiedSidebar';
import { BottomNavigation } from '@/components/dashboard/BottomNavigation';
import { supabase } from '@/integrations/supabase/client';

const EXAMPLE_PROMPTS = [
  {
    text: 'A real estate agent explaining the home buying process for first-timers.',
    industry: 'Real Estate',
    icon: '🏡',
  },
  {
    text: 'A fitness coach sharing a 5-minute daily mobility routine.',
    industry: 'Fitness',
    icon: '💪',
  },
  {
    text: 'A business coach explaining the "SMART" goal framework for entrepreneurs.',
    industry: 'Coaching',
    icon: '💡',
  },
  {
    text: 'An e-commerce brand unboxing and reviewing their new product line.',
    industry: 'E-Commerce',
    icon: '📦',
  },
];

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
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const handlePromptClick = (prompt: typeof EXAMPLE_PROMPTS[0]) => {
    setIdea(prompt.text);
    setIndustry(prompt.industry);
  };

  const handleGenerate = async () => {
    if (!idea.trim()) {
      toast({
        title: 'Missing Input',
        description: 'Please enter your core video idea.',
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
      // Get the current session to authenticate the request
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('You must be logged in to use this tool');
      }

      // Call the edge function with authentication
    const { data: functionData, error: functionError } = await supabase.functions.invoke('generate-content', {
      body: { 
        toolType: 'content-system-builder',
          inputs: {
            idea: idea.trim(),
            industry,
            goal
          }
        }
      });

      clearInterval(tipInterval);

      if (functionError) {
        throw functionError;
      }

      // Check for 402 insufficient credits error
      if (functionData?.error) {
        if (functionData.error === 'Insufficient credits') {
          toast({
            title: '⚡ Not Enough Credits',
            description: functionData.message || `This tool requires ${functionData.required} credits. You have ${functionData.current} credits remaining.`,
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }
        throw new Error(functionData.error);
      }

      // Parse the generated content (it comes as a string, need to parse JSON)
      let parsedContent;
      try {
        parsedContent = typeof functionData.content === 'string' 
          ? JSON.parse(functionData.content) 
          : functionData.content;
      } catch (parseError) {
        console.error('Error parsing content:', parseError);
        throw new Error('Failed to parse generated content');
      }

      setContentPlan(parsedContent);
      setLoading(false);
      setIsSaved(false);

      // Show success with credit information
      if (functionData.credits) {
        toast({
          title: '✨ Content Plan Generated!',
          description: `Used ${functionData.credits.consumed} credits. ${functionData.credits.remaining} credits remaining.`,
        });
      } else {
        toast({
          title: '✨ Content Plan Generated!',
          description: 'Your multi-platform strategy is ready.',
        });
      }
    } catch (error: any) {
      clearInterval(tipInterval);
      setLoading(false);
      console.error('Generation error:', error);
      
      toast({
        title: 'Generation Failed',
        description: error.message || 'Unable to generate content plan. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleReset = () => {
    setContentPlan(null);
    setIdea('');
    setIsSaved(false);
  };

  const handleDownload = () => {
    const dataStr = JSON.stringify(contentPlan, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'content_plan.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Downloaded!',
      description: 'Your content plan has been saved.',
    });
  };

  const handleSave = () => {
    const saved = localStorage.getItem('savedContentPlans');
    const plans = saved ? JSON.parse(saved) : [];
    
    plans.push({
      id: new Date().toISOString(),
      idea,
      plan: contentPlan,
    });
    
    localStorage.setItem('savedContentPlans', JSON.stringify(plans));
    setIsSaved(true);
    
    toast({
      title: 'Saved!',
      description: 'Your content plan has been saved to your library.',
    });
  };

  if (loading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen w-full">
          <TopNavigation />
          <div className="flex pt-16">
            <AppSidebar />
            <main className="flex-1 flex flex-col items-center justify-center bg-background px-4 min-h-[calc(100vh-4rem)]">
              <Loader2 className="w-16 h-16 animate-spin text-primary mb-8" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Crafting Your Content System...
              </h2>
              <div className="max-w-md text-center">
                <p className="text-lg text-muted-foreground bg-muted/50 rounded-xl p-6">
                  💡 {LOADING_TIPS[currentTip]}
                </p>
              </div>
            </main>
          </div>
          <EnhancedFooter />
        </div>
      </SidebarProvider>
    );
  }

  if (contentPlan) {
    return (
      <>
        <MetaTags
          title="Content Plan Results | Video Series Builder"
          description="Your complete multi-platform content strategy"
          canonicalUrl="https://www.palmerhouseproductions.com/tools/video-series-builder"
        />
        <SidebarProvider>
          <div className="min-h-screen w-full">
            <TopNavigation />
            <div className="flex pt-16">
              <AppSidebar />
              <main className="flex-1 bg-background px-4 py-8 overflow-auto min-h-[calc(100vh-4rem)]">
                <div className="container mx-auto max-w-6xl">
                  {/* Header with Actions */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">
                        Your Content System
                      </h1>
                      <p className="text-muted-foreground">Based on: "{idea}"</p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleDownload} variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button onClick={handleSave} variant="outline" size="sm" disabled={isSaved}>
                        <Save className="w-4 h-4 mr-2" />
                        {isSaved ? 'Saved!' : 'Save'}
                      </Button>
                      <Button onClick={handleReset} variant="default" size="sm">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Generate New
                      </Button>
                    </div>
                  </div>

                  {/* Results Cards */}
                  <div className="space-y-6">
                    {/* Strategy Card */}
                    <Card className="p-6 border-2">
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        🎯 How It All Ties Together
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {contentPlan.strategy}
                      </p>
                    </Card>

                    {/* Platform-specific content cards */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* YouTube */}
                      <Card className="p-6">
                        <h3 className="text-lg font-bold text-foreground mb-4">📺 YouTube</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-1">SEO Title:</p>
                            <p className="text-foreground">{contentPlan.youtube.title}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-1">Script Hook (First 15 sec):</p>
                            <p className="text-muted-foreground text-sm">{contentPlan.youtube.scriptHook}</p>
                          </div>
                        </div>
                      </Card>

                      {/* LinkedIn */}
                      <Card className="p-6">
                        <h3 className="text-lg font-bold text-foreground mb-4">💼 LinkedIn Post</h3>
                        <p className="text-muted-foreground text-sm whitespace-pre-line">
                          {contentPlan.linkedin.post}
                        </p>
                      </Card>

                      {/* Twitter Thread */}
                      <Card className="p-6">
                        <h3 className="text-lg font-bold text-foreground mb-4">𝕏 Twitter Thread</h3>
                        <div className="space-y-2">
                          <div className="bg-muted p-3 rounded-lg">
                            <p className="text-sm font-semibold text-foreground mb-1">Thread Intro:</p>
                            <p className="text-muted-foreground text-sm">{contentPlan.twitter.threadIntro}</p>
                          </div>
                          {contentPlan.twitter.tweets.map((tweet: string, idx: number) => (
                            <div key={idx} className="bg-muted/50 p-3 rounded-lg">
                              <p className="text-xs font-semibold text-muted-foreground mb-1">Tweet {idx + 1}:</p>
                              <p className="text-muted-foreground text-sm">{tweet}</p>
                            </div>
                          ))}
                        </div>
                      </Card>

                      {/* Instagram Carousel */}
                      <Card className="p-6">
                        <h3 className="text-lg font-bold text-foreground mb-4">📷 Instagram Carousel</h3>
                        <div className="mb-3">
                          <p className="text-sm font-semibold text-muted-foreground mb-1">Carousel Concept:</p>
                          <p className="text-foreground">{contentPlan.instagram.carouselIdea}</p>
                        </div>
                        <div className="space-y-2">
                          {contentPlan.instagram.slides.map((slide: any, idx: number) => (
                            <div key={idx} className="bg-muted p-3 rounded-lg">
                              <p className="text-sm font-semibold text-foreground">{slide.title}</p>
                              <p className="text-sm text-muted-foreground">{slide.content}</p>
                            </div>
                          ))}
                        </div>
                      </Card>

                      {/* Blog Post */}
                      <Card className="p-6">
                        <h3 className="text-lg font-bold text-foreground mb-4">📝 Blog Post</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-1">SEO Title:</p>
                            <p className="text-foreground">{contentPlan.blog.seoTitle}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-2">Outline:</p>
                            <ul className="space-y-1">
                              {contentPlan.blog.outline.map((item: string, idx: number) => (
                                <li key={idx} className="text-sm text-muted-foreground">• {item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card>

                      {/* Email/Newsletter */}
                      <Card className="p-6">
                        <h3 className="text-lg font-bold text-foreground mb-4">📧 Email / Newsletter</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-1">Subject Line:</p>
                            <p className="text-foreground">{contentPlan.email.subject}</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-muted-foreground mb-1">Opening Hook:</p>
                            <p className="text-muted-foreground text-sm">{contentPlan.email.bodyHook}</p>
                          </div>
                        </div>
                      </Card>

                      {/* Digital Downloads */}
                      <Card className="p-6 md:col-span-2">
                        <h3 className="text-lg font-bold text-foreground mb-4">📥 Suggested Digital Downloads</h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {contentPlan.downloads.map((download: any, idx: number) => (
                            <div key={idx} className="bg-muted p-4 rounded-lg">
                              <p className="font-semibold text-foreground mb-1">{download.title}</p>
                              <p className="text-sm text-muted-foreground">{download.description}</p>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
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
        title="Video Series Builder | Palmer House Productions Content OS"
        description="Turn one idea into a complete content system across YouTube, LinkedIn, Instagram, Twitter, blog posts, and email."
        canonicalUrl="https://www.palmerhouseproductions.com/tools/video-series-builder"
      />
        <SidebarProvider>
          <div className="min-h-screen w-full">
            <TopNavigation />
            <div className="flex pt-16">
              <AppSidebar />
              <main className="flex-1 bg-background px-4 py-8 overflow-auto min-h-[calc(100vh-4rem)]">
              <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-pal-purple flex items-center justify-center">
                    <Video className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-foreground mb-3">
                    Content System Builder
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Turn one idea into a complete content system
                  </p>
                </div>

                {/* Input Card */}
                <Card className="mb-8 p-6 border-2">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Core Content Idea
                      </label>
                      <Textarea
                        placeholder="e.g., A 5-part series on how first-time homebuyers can secure a loan."
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                    </div>

                    {/* Tweaking Options */}
                    <div>
                      <h3 className="text-sm font-semibold text-foreground mb-4">
                        Tweaking Options
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Industry
                          </label>
                          <Select value={industry} onValueChange={setIndustry}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Real Estate">Real Estate</SelectItem>
                              <SelectItem value="Fitness">Fitness</SelectItem>
                              <SelectItem value="Coaching">Coaching</SelectItem>
                              <SelectItem value="Trades">Trades</SelectItem>
                              <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                              <SelectItem value="Hospitality">Hospitality</SelectItem>
                              <SelectItem value="Nonprofit">Nonprofit</SelectItem>
                              <SelectItem value="Healthcare">Healthcare</SelectItem>
                              <SelectItem value="Law/Finance">Law/Finance</SelectItem>
                              <SelectItem value="Corporate/HR">Corporate/HR</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Primary Goal
                          </label>
                          <Select value={goal} onValueChange={setGoal}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Educate">Educate</SelectItem>
                              <SelectItem value="Sell">Sell</SelectItem>
                              <SelectItem value="Train">Train</SelectItem>
                              <SelectItem value="Build Trust">Build Trust</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Credit Cost Info */}
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-2">
                      <Coins className="w-4 h-4" />
                      <span>This tool uses 5 credits per generation</span>
                    </div>

                    <Button
                      onClick={handleGenerate}
                      className="w-full"
                      size="lg"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Content System
                    </Button>
                  </div>
                </Card>

                {/* Example Prompts */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">
                    Get Started With An Example Below
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {EXAMPLE_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePromptClick(prompt)}
                        className="p-4 bg-background border border-border rounded-xl hover:shadow-md hover:scale-105 transition-all text-left"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{prompt.icon}</span>
                          <p className="text-sm text-muted-foreground">{prompt.text}</p>
                        </div>
                      </button>
                    ))}
                  </div>
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
