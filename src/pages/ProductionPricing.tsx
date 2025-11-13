import { useState } from "react";
import { MetaTags } from "@/components/seo/MetaTags";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, DollarSign, ChevronRight, Star, Target, TrendingUp, Sparkles, Package, Layers, Film, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const ProductionPricing = () => {
  const [selectedBuildId, setSelectedBuildId] = useState<string>("");

  const palBuilds = [
    {
      id: "reel-pal",
      name: "REEL PAL MONTHLY BUILD",
      subtitle: "VISIBILITY & MOMENTUM PACKAGE",
      price: "$1,500/mo",
      description: "Designed to keep your business visible, consistent, and active.",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
      includes: [
        "1 one-minute anchor video — $450",
        "3 short-form clips — $150 × 3 = $450",
        "2 hook variations — $150 × 2 = $300",
        "1 mini brand intro or lifestyle clip — $300 value"
      ]
    },
    {
      id: "system-pal",
      name: "SYSTEM PAL MONTHLY BUILD",
      subtitle: "CLARITY & OPERATIONS PACKAGE",
      price: "$1,500/mo",
      description: "Built for onboarding, training, SOPs, and reducing repetitive tasks.",
      icon: Layers,
      color: "from-purple-500 to-pink-500",
      includes: [
        "1 anchor video (FAQ or onboarding step) — $450",
        "4 SOP/FAQ clips — $150 × 4 = $600",
        "1 mid-length explainer (3–5 min) — $450 + edits",
        "Library organization — $250 value",
        "On-camera coaching — included"
      ]
    },
    {
      id: "evergreen-pal",
      name: "EVERGREEN PAL MONTHLY BUILD",
      subtitle: "AUTHORITY & LONG-FORM PACKAGE",
      price: "$1,500/mo",
      description: "Perfect for YouTube, training, education, and deep teaching.",
      icon: Star,
      color: "from-green-500 to-emerald-500",
      includes: [
        "1 five-minute video — $450 + (4 × $150) = $1,050",
        "2 short derivative clips — $150 × 2 = $300",
        "1 'pillar summary' video — $150",
        "Coaching for long-form clarity — $100 value"
      ]
    },
    {
      id: "spotlight-pal",
      name: "SPOTLIGHT PAL MONTHLY BUILD",
      subtitle: "BRAND STORY & IDENTITY PACKAGE",
      price: "$1,500/mo",
      description: "Cinematic, emotional, story-driven content that elevates your presence.",
      icon: Film,
      color: "from-orange-500 to-red-500",
      includes: [
        "1 one-minute brand moment — $450",
        "3 mini-story clips — $150 × 3 = $450",
        "1 testimonial or value clip — $150",
        "Cinematic color grade upgrade — $300",
        "Visual identity alignment — $150"
      ]
    }
  ];

  const addOns = [
    {
      category: "Editing & Delivery",
      items: [
        { name: "Additional aspect ratios (9:16 / 1:1)", price: "$75/video" },
        { name: "Extra thumbnails", price: "$100 each" },
        { name: "Advanced editing (graphics, overlays)", price: "$200/video" },
        { name: "Caption export file (SRT/VTT)", price: "$25" }
      ]
    },
    {
      category: "Production & Creative",
      items: [
        { name: "Extra Filming Hour", price: "$200/hr" },
        { name: "Full new Filming Day", price: "$1,500–$2,200" },
        { name: "Brand Kit Import", price: "$200" },
        { name: "Content Library Setup", price: "$300–$700" },
        { name: "AI Script/Outline boosts", price: "$200/session" }
      ]
    },
    {
      category: "Strategy & Direction",
      items: [
        { name: "Additional Strategy Session", price: "$250" },
        { name: "Vision & Story Deep-Dive (Spotlight upgrade)", price: "$300" },
        { name: "Evergreen Content Roadmap", price: "$250" }
      ]
    }
  ];

  const suggestedBuilds = [
    {
      id: "faq-system",
      name: "FAQ SYSTEM",
      pal: "System Pal",
      description: "6 FAQs (1 minute each) + 1 deep-dive FAQ (3 minutes) + Library setup",
      total: "$1,650",
      note: "(all editable)"
    },
    {
      id: "training-system",
      name: "TRAINING SYSTEM",
      pal: "System Pal",
      description: "1 main training video (5 minutes) + 5 SOP clips (1 minute each)",
      total: "$2,400",
      note: ""
    },
    {
      id: "social-visibility",
      name: "SOCIAL VISIBILITY KIT",
      pal: "Reel Pal",
      description: "8 short clips (1 minute) + 1 hook variation",
      total: "$1,500",
      note: ""
    },
    {
      id: "brand-narrative",
      name: "BRAND NARRATIVE STARTER",
      pal: "Spotlight Pal",
      description: "1 brand moment + 3 mini narratives + 1 testimonial",
      total: "$1,050–$1,500",
      note: ""
    },
    {
      id: "youtube-authority",
      name: "YOUTUBE AUTHORITY STARTER",
      pal: "Evergreen Pal",
      description: "1 five-minute anchor video + 2 derivative clips",
      total: "$1,200–$1,500",
      note: ""
    }
  ];

  return (
    <>
      <MetaTags
        title="Production Pricing & Packages | Palmer House Productions"
        description="Build your video system with clear, flexible, production-driven pricing. Choose a monthly Pal build or create your custom package."
        keywords="video production pricing, video packages, monthly video service, video production seattle, content production"
      />
      
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              <Package className="w-3 h-3 mr-1" />
              Production Pricing & Packages
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Build Your System. Add What You Need.
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Start with the Pal that fits your goals.
            </p>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              All production pricing • Monthly Pal builds ($1,500 each) • Add-ons and upgrades • 
              Suggested sample builds • Total flexibility to design your perfect system
            </p>
          </div>

          {/* Section 1: How Our Pricing Works */}
          <Card className="mb-12 border-2">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-6 h-6 text-primary" />
                <CardTitle className="text-3xl">How Our Pricing Works</CardTitle>
              </div>
              <CardDescription className="text-lg">
                Simple. Fair. Predictable. Scalable.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  One Filming Session. One Base Video. Discounted Add-Ons.
                </h3>
                <p className="text-muted-foreground mb-6">
                  Every video type (FAQ, training, onboarding, reel, brand story, evergreen) uses one universal pricing rule:
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl">Base Video</CardTitle>
                    <div className="text-4xl font-bold text-primary mt-2">$450</div>
                    <CardDescription>First 1-minute video</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Studio-quality filming</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Teleprompter</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Captions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Color grading</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Clean sound</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">1 round of revisions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">Organized delivery</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl">Additional Videos</CardTitle>
                    <div className="text-4xl font-bold text-primary mt-2">+$150</div>
                    <CardDescription>Each (same session)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      You're already on set. Lighting is up. Camera rolling.
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      So extra videos cost a fraction — and that's where your value stacks.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl">Longer Videos</CardTitle>
                    <CardDescription className="mt-2">Same session</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="font-semibold text-foreground">+1–3 additional minutes:</div>
                      <div className="text-2xl font-bold text-primary">+$150/min</div>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">+3–5 additional minutes:</div>
                      <div className="text-2xl font-bold text-primary">+$125/min</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg border">
                <h4 className="font-bold text-lg mb-2 text-foreground">All video types cost the same.</h4>
                <p className="text-muted-foreground mb-4">
                  Whether it's FAQ, Training, SOP, Reel, Brand Story, Recruitment, Onboarding, or Long-form educational content — 
                  the price only changes based on length, not category.
                </p>
                <p className="text-sm font-medium text-foreground">
                  This keeps everything simple, fair, and scalable.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Monthly Pal Builds */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-foreground">The Monthly Pal Builds</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every Pal offers a monthly content build valued at $1,500 — a curated, strategic set capturing the strengths of that Pal.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {palBuilds.map((pal) => {
                const Icon = pal.icon;
                return (
                  <Card 
                    key={pal.id} 
                    className={`relative overflow-hidden border-2 transition-all hover:shadow-lg ${
                      selectedBuildId === pal.id ? 'border-primary' : ''
                    }`}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${pal.color} opacity-10 rounded-bl-full`}></div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className="w-6 h-6 text-primary" />
                            <Badge variant="outline">{pal.price}</Badge>
                          </div>
                          <CardTitle className="text-xl mb-1">{pal.name}</CardTitle>
                          <CardDescription className="font-semibold text-foreground">
                            {pal.subtitle}
                          </CardDescription>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">{pal.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">Includes:</h4>
                        <ul className="space-y-2">
                          {pal.includes.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-xs text-muted-foreground italic mb-4">
                        Total Value: $1,500 (fully customizable)
                      </p>
                      <Button 
                        className="w-full" 
                        variant={selectedBuildId === pal.id ? "default" : "outline"}
                        onClick={() => setSelectedBuildId(pal.id)}
                      >
                        {selectedBuildId === pal.id ? "Selected" : "Choose This Pal"}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Section 3: Add-Ons & Upgrades */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <CardTitle className="text-3xl">Add-Ons & Upgrades</CardTitle>
              </div>
              <CardDescription className="text-lg">
                These can be attached to any Pal build or custom package.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                {addOns.map((category, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold text-lg mb-4 text-foreground">{category.category}</h3>
                    <ul className="space-y-3">
                      {category.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-sm">
                          <div className="font-medium text-foreground">{item.name}</div>
                          <div className="text-primary font-semibold">{item.price}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Suggested Sample Builds */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Suggested Sample Builds</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These aren't packages — just inspiration. Click to explore and modify to fit your needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {suggestedBuilds.map((build) => (
                <Card key={build.id} className="hover:shadow-lg transition-all border">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-primary" />
                      <Badge variant="secondary">{build.pal}</Badge>
                    </div>
                    <CardTitle className="text-lg">{build.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{build.description}</p>
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="text-2xl font-bold text-primary">{build.total}</span>
                      {build.note && <span className="text-xs text-muted-foreground">{build.note}</span>}
                    </div>
                    <Button variant="outline" className="w-full" size="sm">
                      View Details
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Section 5: How to Use This Page */}
          <Card className="mb-12 bg-muted/30">
            <CardHeader>
              <CardTitle className="text-2xl">How to Use This Page</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-4">
                {[
                  { step: "1", text: "Choose the Pal that matches your goals" },
                  { step: "2", text: "Start with their $1,500 Monthly Build" },
                  { step: "3", text: "Add/Remove/Swap videos at $150 each" },
                  { step: "4", text: "Add longer content at $150/min" },
                  { step: "5", text: "Add optional upgrades" }
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-3">
                      {item.step}
                    </div>
                    <p className="text-sm font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-6" />
              <p className="text-center text-muted-foreground">
                The entire pricing system is designed to be: <strong className="text-foreground">Fair. Flexible. Predictable. Scalable. And premium.</strong>
              </p>
              <p className="text-center text-muted-foreground mt-2">
                Perfect for founders, teams, and growing brands.
              </p>
            </CardContent>
          </Card>

          {/* Section 6: CTA Area */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to Build Your System?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/contact">
                  Start With a Pal
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link to="/contact">
                  Build Your Own System
                  <Zap className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Questions? <Link to="/contact" className="text-primary hover:underline">Let's talk about your needs</Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default ProductionPricing;
