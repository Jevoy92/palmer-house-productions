import { useState } from 'react';
import { MetaTags } from '@/components/seo/MetaTags';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Loader2, Sparkles, Download, Save, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

export default function VideoSeriesBuilder() {
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

    // Cycle through tips during loading
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % LOADING_TIPS.length);
    }, 3000);

    try {
      // TODO: Replace with actual API call to generate content
      // For now, simulating API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock response structure
      const mockPlan = {
        strategy: `This comprehensive content system leverages your core idea to build authority, drive engagement, and convert viewers into customers. By creating a multi-platform approach, we ensure your message reaches your ${industry} audience wherever they are most active.`,
        youtube: {
          title: `${idea.split(' ').slice(0, 8).join(' ')} | ${industry} Guide`,
          scriptHook: "Hook them in the first 15 seconds with a compelling question or statement that addresses their pain point...",
        },
        linkedin: {
          post: "Professional LinkedIn post content here that frames the topic in a business context...",
        },
        twitter: {
          threadIntro: "Thread intro tweet that hooks attention...",
          tweets: [
            "Tweet 1: Main concept introduction",
            "Tweet 2: Key insight or data point",
            "Tweet 3: Actionable tip or framework",
            "Tweet 4: Call to action",
          ],
        },
        instagram: {
          carouselIdea: "Visual carousel concept",
          slides: [
            { title: "Slide 1: Hook", content: "Attention-grabbing opening" },
            { title: "Slide 2: Problem", content: "Pain point description" },
            { title: "Slide 3: Solution", content: "Your approach" },
            { title: "Slide 4: Benefits", content: "What they'll gain" },
            { title: "Slide 5: CTA", content: "Next steps" },
          ],
        },
        blog: {
          seoTitle: `Ultimate Guide to ${idea.split(' ').slice(0, 5).join(' ')}`,
          outline: [
            "Introduction: Why this matters",
            "The problem your audience faces",
            "Your unique solution approach",
            "Step-by-step implementation",
            "Common mistakes to avoid",
            "Conclusion and next steps",
          ],
        },
        email: {
          subject: `Master This: ${idea.split(' ').slice(0, 6).join(' ')}`,
          bodyHook: "Open with a relatable scenario or question that makes them want to read more...",
        },
        downloads: [
          {
            title: `${industry} Success Checklist`,
            description: "A downloadable PDF checklist covering all key steps",
          },
          {
            title: "Quick Reference Guide",
            description: "One-page visual guide for easy implementation",
          },
        ],
      };

      setContentPlan(mockPlan);
      clearInterval(tipInterval);
      setLoading(false);
      setIsSaved(false);
    } catch (error) {
      clearInterval(tipInterval);
      setLoading(false);
      toast({
        title: 'Generation Failed',
        description: 'Unable to generate content plan. Please try again.',
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pal-purple/10 via-background to-pal-orange/10 px-4">
        <Loader2 className="w-16 h-16 animate-spin text-primary mb-8" />
        <h2 className="text-2xl font-bold text-corporate-dark mb-4">
          Crafting Your Content System...
        </h2>
        <div className="max-w-md text-center">
          <p className="text-lg text-corporate-gray bg-background/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            💡 {LOADING_TIPS[currentTip]}
          </p>
        </div>
      </div>
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
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background px-4 py-12">
          <div className="container mx-auto max-w-6xl">
            {/* Header with Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-corporate-dark mb-2">
                  Your Content System
                </h1>
                <p className="text-corporate-gray">Based on: "{idea}"</p>
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
              <Card className="p-6">
                <h3 className="text-xl font-bold text-corporate-dark mb-3">
                  🎯 How It All Ties Together
                </h3>
                <p className="text-corporate-gray leading-relaxed">
                  {contentPlan.strategy}
                </p>
              </Card>

              {/* Platform-specific content cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* YouTube */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-corporate-dark mb-4">📺 YouTube</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-1">SEO Title:</p>
                      <p className="text-corporate-dark">{contentPlan.youtube.title}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground mb-1">Script Hook (First 15 sec):</p>
                      <p className="text-corporate-gray text-sm">{contentPlan.youtube.scriptHook}</p>
                    </div>
                  </div>
                </Card>

                {/* LinkedIn */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-corporate-dark mb-4">💼 LinkedIn Post</h3>
                  <p className="text-corporate-gray text-sm whitespace-pre-line">
                    {contentPlan.linkedin.post}
                  </p>
                </Card>

                {/* Twitter Thread */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-corporate-dark mb-4">𝕏 Twitter Thread</h3>
                  <div className="space-y-2">
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm font-semibold text-corporate-dark mb-1">Thread Intro:</p>
                      <p className="text-corporate-gray text-sm">{contentPlan.twitter.threadIntro}</p>
                    </div>
                    {contentPlan.twitter.tweets.map((tweet: string, idx: number) => (
                      <div key={idx} className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Tweet {idx + 1}:</p>
                        <p className="text-corporate-gray text-sm">{tweet}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Instagram Carousel */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-corporate-dark mb-4">📸 Instagram Carousel</h3>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">
                      Idea: {contentPlan.instagram.carouselIdea}
                    </p>
                    {contentPlan.instagram.slides.map((slide: any, idx: number) => (
                      <div key={idx} className="bg-muted p-3 rounded-lg">
                        <p className="text-sm font-semibold text-corporate-dark">{slide.title}</p>
                        <p className="text-xs text-corporate-gray mt-1">{slide.content}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Blog Post */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-corporate-dark mb-4">📝 Blog Post</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">SEO Title:</p>
                    <p className="text-corporate-dark">{contentPlan.blog.seoTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-2">Outline:</p>
                    <ul className="space-y-1">
                      {contentPlan.blog.outline.map((item: string, idx: number) => (
                        <li key={idx} className="text-corporate-gray text-sm flex gap-2">
                          <span className="text-primary">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Email Newsletter */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-corporate-dark mb-4">📧 Email / Newsletter</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Subject Line:</p>
                    <p className="text-corporate-dark">{contentPlan.email.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Opening Hook:</p>
                    <p className="text-corporate-gray text-sm">{contentPlan.email.bodyHook}</p>
                  </div>
                </div>
              </Card>

              {/* Digital Downloads */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-corporate-dark mb-4">📥 Suggested Digital Downloads</h3>
                <div className="space-y-3">
                  {contentPlan.downloads.map((download: any, idx: number) => (
                    <div key={idx} className="bg-muted p-4 rounded-lg">
                      <p className="font-semibold text-corporate-dark mb-1">{download.title}</p>
                      <p className="text-sm text-corporate-gray">{download.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
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
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pal-purple/10 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-pal-purple" />
              <span className="text-sm font-semibold text-pal-purple">Video Series Builder</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-corporate-dark mb-4">
              Turn one idea into a complete content system.
            </h1>
            <p className="text-lg text-corporate-gray">
              Transform your single video concept into a multi-platform content strategy
            </p>
          </div>

          {/* Main Input Card */}
          <Card className="p-8 mb-8">
            <div className="space-y-6">
              {/* Core Video Idea */}
              <div>
                <label className="block text-sm font-semibold text-corporate-dark mb-2">
                  Core Video Idea
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
                <h3 className="text-sm font-semibold text-corporate-dark mb-4">
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
                  className="p-4 bg-background border border-border rounded-xl hover:shadow-lg hover:scale-105 transition-all text-left"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{prompt.icon}</span>
                    <p className="text-sm text-corporate-gray">{prompt.text}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
