import { useState } from "react";
import { MetaTags } from "@/components/seo/MetaTags";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, ChevronRight, Star, Target, TrendingUp, Sparkles, Package, Layers, Film, Zap, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BuildItem {
  name: string;
  basePrice: number;
  quantity: number;
  perUnit: boolean;
  included?: boolean; // For items like "included" on-camera coaching
}

interface VideoOption {
  name: string;
  price: number;
  length: string;
}

interface PalBuildConfig {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  icon: any;
  items: BuildItem[];
}

const ProductionPricing = () => {
  const videoOptions: VideoOption[] = [
    { name: "Additional 1-min video", price: 150, length: "1 min" },
    { name: "Additional 3-min video", price: 450, length: "3 min" },
    { name: "Additional 5-min video", price: 1050, length: "5 min" },
    { name: "FAQ video", price: 150, length: "1 min" },
    { name: "Training video", price: 150, length: "1 min" },
    { name: "SOP walkthrough", price: 150, length: "1 min" },
    { name: "Social media clip", price: 150, length: "30-60 sec" },
    { name: "Testimonial video", price: 150, length: "1 min" },
    { name: "Product explainer", price: 150, length: "1 min" },
    { name: "Brand story segment", price: 150, length: "1 min" },
    { name: "Recruitment video", price: 150, length: "1 min" },
    { name: "Onboarding video", price: 150, length: "1 min" },
  ];

  const [palBuilds, setPalBuilds] = useState<PalBuildConfig[]>([
    {
      id: "reel-pal",
      name: "REEL PAL MONTHLY BUILD",
      subtitle: "Visibility & Momentum Package",
      description: "Designed to keep your business visible, consistent, and active.",
      icon: TrendingUp,
      items: [
        { name: "One-minute anchor video", basePrice: 450, quantity: 1, perUnit: false },
        { name: "Short-form clips", basePrice: 150, quantity: 3, perUnit: true },
        { name: "Hook variations", basePrice: 150, quantity: 2, perUnit: true },
        { name: "Mini brand intro/lifestyle clip", basePrice: 300, quantity: 1, perUnit: false }
      ]
    },
    {
      id: "system-pal",
      name: "SYSTEM PAL MONTHLY BUILD",
      subtitle: "Clarity & Operations Package",
      description: "Built for onboarding, training, SOPs, and reducing repetitive tasks.",
      icon: Layers,
      items: [
        { name: "Anchor video (FAQ/onboarding)", basePrice: 450, quantity: 1, perUnit: false },
        { name: "SOP/FAQ clips", basePrice: 150, quantity: 4, perUnit: true },
        { name: "Mid-length explainer (3-5 min)", basePrice: 450, quantity: 1, perUnit: false },
        { name: "Library organization", basePrice: 250, quantity: 1, perUnit: false },
        { name: "On-camera coaching", basePrice: 0, quantity: 1, perUnit: false, included: true }
      ]
    },
    {
      id: "evergreen-pal",
      name: "EVERGREEN PAL MONTHLY BUILD",
      subtitle: "Authority & Long-Form Package",
      description: "Perfect for YouTube, training, education, and deep teaching.",
      icon: Star,
      items: [
        { name: "Five-minute video", basePrice: 1050, quantity: 1, perUnit: false },
        { name: "Short derivative clips", basePrice: 150, quantity: 2, perUnit: true },
        { name: "Pillar summary video", basePrice: 150, quantity: 1, perUnit: false },
        { name: "Long-form clarity coaching", basePrice: 0, quantity: 1, perUnit: false, included: true }
      ]
    },
    {
      id: "spotlight-pal",
      name: "SPOTLIGHT PAL MONTHLY BUILD",
      subtitle: "Brand Story & Identity Package",
      description: "Cinematic, emotional, story-driven content that elevates your presence.",
      icon: Film,
      items: [
        { name: "One-minute brand moment", basePrice: 450, quantity: 1, perUnit: false },
        { name: "Mini-story clips", basePrice: 150, quantity: 3, perUnit: true },
        { name: "Testimonial/value clip", basePrice: 150, quantity: 1, perUnit: false },
        { name: "Cinematic color grade upgrade", basePrice: 300, quantity: 1, perUnit: false },
        { name: "Visual identity alignment", basePrice: 150, quantity: 1, perUnit: false }
      ]
    }
  ]);

  const updateQuantity = (palId: string, itemIndex: number, newQuantity: number) => {
    if (newQuantity < 0) return;
    setPalBuilds(prev => 
      prev.map(pal => 
        pal.id === palId 
          ? {
              ...pal,
              items: pal.items.map((item, idx) => 
                idx === itemIndex ? { ...item, quantity: newQuantity } : item
              )
            }
          : pal
      )
    );
  };

  const addVideoToPackage = (palId: string, videoOption: VideoOption) => {
    setPalBuilds(prev =>
      prev.map(pal =>
        pal.id === palId
          ? {
              ...pal,
              items: [
                ...pal.items,
                {
                  name: videoOption.name,
                  basePrice: videoOption.price,
                  quantity: 1,
                  perUnit: true
                }
              ]
            }
          : pal
      )
    );
  };

  const removeItem = (palId: string, itemIndex: number) => {
    setPalBuilds(prev =>
      prev.map(pal =>
        pal.id === palId
          ? {
              ...pal,
              items: pal.items.filter((_, idx) => idx !== itemIndex)
            }
          : pal
      )
    );
  };

  const calculateTotal = (items: BuildItem[]) => {
    return items.reduce((total, item) => {
      return total + (item.basePrice * item.quantity);
    }, 0);
  };


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
              Build Your Perfect Package
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Start with a suggested build or create your own custom solution—it's your package, your way.
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pick a Pal that solves your current biggest business problem and customize it to your liking.
            </p>
          </div>

          {/* Monthly Pal Builds */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-foreground">The Monthly Pal Builds</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Customize each build to fit your needs. Adjust quantities and watch the price update in real-time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {palBuilds.map((pal) => {
                const Icon = pal.icon;
                const total = calculateTotal(pal.items);
                
                return (
                  <Card 
                    key={pal.id} 
                    className="border hover:shadow-md transition-all bg-background"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-bold">{pal.name}</CardTitle>
                            <CardDescription className="text-sm mt-1">
                              {pal.subtitle}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{pal.description}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        {pal.items.map((item, idx) => (
                          <div 
                            key={idx} 
                            className="flex items-center justify-between py-2 border-b border-border/40 last:border-0"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {item.name}
                                </p>
                                {item.included && (
                                  <Badge variant="secondary" className="text-xs">Included</Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {item.included ? 'Complimentary' : `$${item.basePrice}${item.perUnit ? ' each' : ''}`}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-3 ml-4">
                              {item.included ? (
                                <span className="text-sm font-medium text-muted-foreground">
                                  Included
                                </span>
                              ) : (
                                <>
                                  <div className="flex items-center gap-1 border rounded-md">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-7 p-0 hover:bg-muted"
                                      onClick={() => updateQuantity(pal.id, idx, item.quantity - 1)}
                                      disabled={item.quantity === 0}
                                    >
                                      <Minus className="w-3 h-3" />
                                    </Button>
                                    <span className="w-8 text-center text-sm font-medium">
                                      {item.quantity}
                                    </span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-7 p-0 hover:bg-muted"
                                      onClick={() => updateQuantity(pal.id, idx, item.quantity + 1)}
                                    >
                                      <Plus className="w-3 h-3" />
                                    </Button>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-foreground w-16 text-right">
                                      ${(item.basePrice * item.quantity).toLocaleString()}
                                    </span>
                                    {idx >= (pal.items.findIndex(i => i.included) || pal.items.length) && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
                                        onClick={() => removeItem(pal.id, idx)}
                                      >
                                        <Minus className="w-3 h-3" />
                                      </Button>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2">
                        <Select onValueChange={(value) => {
                          const option = videoOptions.find(v => v.name === value);
                          if (option) addVideoToPackage(pal.id, option);
                        }}>
                          <SelectTrigger className="w-full bg-background border-dashed">
                            <SelectValue placeholder="+ Add video to package" />
                          </SelectTrigger>
                          <SelectContent className="bg-background z-50">
                            <SelectGroup>
                              <SelectLabel>Choose Video Type</SelectLabel>
                              {videoOptions.map((option) => (
                                <SelectItem 
                                  key={option.name} 
                                  value={option.name}
                                  className="cursor-pointer"
                                >
                                  <div className="flex justify-between items-center w-full gap-4">
                                    <span>{option.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                      {option.length} • ${option.price}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-medium text-muted-foreground">Total Package Price</span>
                        <span className="text-2xl font-bold text-primary">
                          ${total.toLocaleString()}
                          <span className="text-sm font-normal text-muted-foreground">/mo</span>
                        </span>
                      </div>

                      <Button className="w-full mt-2" size="lg" asChild>
                        <Link to="/contact">
                          Get Started with This Build
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Link>
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
