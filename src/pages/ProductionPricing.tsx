import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Plus, Minus, ArrowRight, Sparkles } from "lucide-react";
import { MetaTags } from "@/components/seo/MetaTags";
import { useNavigate } from "react-router-dom";

type VideoCategory = {
  name: string;
  count: number;
  length: 0.5 | 1 | 3 | 5 | 10;
};

type AddOn = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  feedback?: string;
};

const autoPackages: Record<string, any> = {
  "FAQ System": {
    videos: [
      { type: "FAQ videos (60s)", count: 12, length: 1 },
      { type: "Deep-dive FAQs (5min)", count: 3, length: 5 },
      { type: "Customer intake explainer", count: 1, length: 1 },
      { type: "What to expect next clip", count: 1, length: 1 },
    ],
    includes: ["AI FAQ outline", "Library organization", "1 strategy session"],
    recommendedFor: ["System Pal"],
  },
  "Onboarding System": {
    videos: [
      { type: "Welcome video", count: 1, length: 1 },
      { type: "Process walkthrough", count: 1, length: 3 },
      { type: "First-7-days guide", count: 1, length: 3 },
      { type: "How to submit requests", count: 1, length: 1 },
      { type: "Contract/policy explainer", count: 1, length: 1 },
    ],
    includes: ["Onboarding email scripts", "Library setup", "1 strategy session"],
    recommendedFor: ["System Pal"],
  },
  "Internal Training System": {
    videos: [
      { type: "Training videos (5min)", count: 4, length: 5 },
      { type: "SOP clips (30-60s)", count: 10, length: 0.5 },
    ],
    includes: ["Tool walkthroughs", "Onboarding sequence", "Internal library setup"],
    recommendedFor: ["System Pal"],
    mostPopular: true,
  },
  "Visibility Engine": {
    videos: [
      { type: "Short-form videos (30-60s)", count: 12, length: 0.5 },
      { type: "Brand intro short", count: 1, length: 1 },
      { type: "Hook variations", count: 3, length: 0.5 },
    ],
    includes: ["AI hook bank", "Content clarity map"],
    recommendedFor: ["Reel Pal"],
    mostPopular: true,
  },
  "Authority Engine": {
    videos: [
      { type: "Long-form episodes", count: 6, length: 10 },
      { type: "Brand introduction", count: 1, length: 5 },
    ],
    includes: ["Custom thumbnails (1 per video)", "CTA scripts", "Topic map for 90 days", "SEO description guidance", "2 strategy sessions"],
    recommendedFor: ["Evergreen Pal"],
    mostPopular: true,
  },
  "Brand Narrative System": {
    videos: [
      { type: "Brand story film", count: 1, length: 5 },
      { type: "Mini-story shorts", count: 3, length: 1 },
      { type: "Website hero video", count: 1, length: 1 },
      { type: "Mission/vision capsule", count: 1, length: 1 },
      { type: "Emotional testimonial", count: 1, length: 3 },
    ],
    includes: ["Custom moodboard", "Visual identity system", "Launch assets"],
    recommendedFor: ["Spotlight Pal"],
    mostPopular: true,
  },
};

const videoCategories = [
  "Training Videos",
  "SOPs",
  "FAQs",
  "Social Clips",
  "Long-form Content",
  "Story Films",
  "Recruitment Videos",
  "Onboarding Videos",
  "Product Explainers",
];

const addOns: AddOn[] = [
  { 
    id: "strategy", 
    name: "Extra Strategy Session", 
    description: "Additional 90-minute planning call", 
    price: 500, 
    category: "Strategy",
    feedback: "Smart move! An extra strategy session ensures your content aligns perfectly with your business goals and audience needs."
  },
  { 
    id: "filming", 
    name: "Extra Filming Day", 
    description: "Additional on-location filming day", 
    price: 2000, 
    category: "Filming",
    feedback: "Great choice! More filming days mean more diverse content and better storytelling opportunities."
  },
  { 
    id: "travel", 
    name: "Travel Beyond 1 Hour", 
    description: "Per hour beyond standard radius", 
    price: 200, 
    category: "Filming",
    feedback: "Perfect! Capturing your authentic environment adds credibility and context to your story."
  },
  { 
    id: "rush", 
    name: "Rush Delivery", 
    description: "30% surcharge for expedited timeline", 
    price: 0, 
    category: "Editing",
    feedback: "We've got you covered! Fast turnaround without compromising quality—your timeline is our priority."
  },
  { 
    id: "aspect", 
    name: "Additional Aspect Ratios", 
    description: "Export in multiple formats (per video)", 
    price: 75, 
    category: "Editing",
    feedback: "Excellent thinking! Multiple aspect ratios maximize your reach across different platforms—one video, everywhere."
  },
  { 
    id: "captions", 
    name: "Captioned Versions", 
    description: "Hardcoded captions (per video)", 
    price: 50, 
    category: "Editing",
    feedback: "Brilliant! Captions boost accessibility, engagement, and watch time—especially for mobile viewers."
  },
  { 
    id: "thumbnails", 
    name: "Additional Thumbnails", 
    description: "Extra custom thumbnails (5 pack)", 
    price: 250, 
    category: "Editing",
    feedback: "Nice! Custom thumbnails dramatically increase click-through rates and help your content stand out."
  },
  { 
    id: "library", 
    name: "Full Content Library Setup", 
    description: "Organize and tag existing assets", 
    price: 1500, 
    category: "Systems",
    feedback: "Fantastic decision! A well-organized library transforms chaos into clarity—making every asset easy to find and repurpose."
  },
  { 
    id: "brandkit", 
    name: "Brand Kit Import", 
    description: "Import and structure brand assets", 
    price: 750, 
    category: "Systems",
    feedback: "Perfect! Your brand kit ensures visual consistency across all content, building recognition and trust."
  },
  { 
    id: "ai-support", 
    name: "Additional AI Content Support", 
    description: "Extended AI assistance package", 
    price: 500, 
    category: "Systems",
    feedback: "Smart investment! AI support accelerates content creation while maintaining your unique voice and style."
  },
];

const ProductionPricing = () => {
  const navigate = useNavigate();
  const [selectedPal, setSelectedPal] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [customVideos, setCustomVideos] = useState<VideoCategory[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [recentAddOnFeedback, setRecentAddOnFeedback] = useState<string | null>(null);

  const calculateVideoPrice = (length: number): number => {
    const BASE_PRICE = 150;
    if (length === 0.5) return BASE_PRICE * 1;
    if (length === 1) return BASE_PRICE * 2;
    if (length === 3) return BASE_PRICE * 6;
    if (length === 5) return BASE_PRICE * 10;
    if (length === 10) return BASE_PRICE * 20;
    return 0;
  };

  const calculateAutoPackagePrice = (systemType: string): number => {
    const pkg = autoPackages[systemType];
    if (!pkg) return 0;
    
    let total = 0;
    pkg.videos.forEach((video: any) => {
      total += calculateVideoPrice(video.length) * video.count;
    });
    
    return total;
  };

  const calculateCustomBuildPrice = (): number => {
    return customVideos.reduce((total, video) => {
      return total + (calculateVideoPrice(video.length) * video.count);
    }, 0);
  };

  const calculateAddOnsPrice = (): number => {
    let total = 0;
    selectedAddOns.forEach(id => {
      const addOn = addOns.find(a => a.id === id);
      if (addOn) {
        if (addOn.id === "rush") {
          const basePrice = selectedPreset 
            ? calculateAutoPackagePrice(selectedPreset)
            : calculateCustomBuildPrice();
          total += basePrice * 0.3;
        } else {
          total += addOn.price;
        }
      }
    });
    return total;
  };

  useEffect(() => {
    let price = 0;
    if (selectedPreset) {
      price = calculateAutoPackagePrice(selectedPreset);
    } else {
      price = calculateCustomBuildPrice();
    }
    price += calculateAddOnsPrice();
    setTotalPrice(price);
  }, [selectedPreset, customVideos, selectedAddOns]);

  const updateCustomVideo = (category: string, count: number, length: 0.5 | 1 | 3 | 5 | 10) => {
    const existingIndex = customVideos.findIndex(v => v.name === category);
    
    if (count === 0) {
      setCustomVideos(customVideos.filter(v => v.name !== category));
    } else if (existingIndex >= 0) {
      const updated = [...customVideos];
      updated[existingIndex] = { name: category, count, length };
      setCustomVideos(updated);
    } else {
      setCustomVideos([...customVideos, { name: category, count, length }]);
    }
  };

  const toggleAddOn = (id: string) => {
    const isAdding = !selectedAddOns.includes(id);
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
    
    // Show feedback when adding an add-on
    if (isAdding) {
      const addon = addOns.find(a => a.id === id);
      if (addon?.feedback) {
        setRecentAddOnFeedback(addon.feedback);
        // Clear feedback after 5 seconds
        setTimeout(() => setRecentAddOnFeedback(null), 5000);
      }
    }
  };

  const palAddOns: Record<string, AddOn[]> = {
    "System Pal": addOns.filter(a => ["Strategy", "Filming", "Editing", "Systems"].includes(a.category)),
    "Spotlight Pal": addOns.filter(a => ["Strategy", "Filming", "Editing"].includes(a.category)),
    "Reel Pal": addOns.filter(a => ["Filming", "Editing"].includes(a.category)),
    "Evergreen Pal": addOns.filter(a => ["Strategy", "Filming", "Editing"].includes(a.category)),
  };

  const getPresetPrice = (systemType: string) => {
    return calculateAutoPackagePrice(systemType);
  };

  const getRecommendedPackages = (pal: string) => {
    return Object.entries(autoPackages)
      .filter(([_, pkg]) => pkg.recommendedFor?.includes(pal))
      .map(([name, pkg]) => ({ name, ...pkg }));
  };

  return (
    <div className="min-h-screen bg-background">
      <MetaTags 
        title="Production Pricing - Palmer House Productions"
        description="Configure your video production package with our pricing calculator"
      />
      
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-foreground">Build Your Perfect Package</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start with a suggested build or create your own custom solution—it's your package, your way
          </p>
        </div>

        {/* Suggested Builds Section */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 text-foreground">Suggested Builds</h2>
            <p className="text-muted-foreground">Popular configurations to inspire your custom package—click to explore and customize</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(autoPackages).map(([systemType, packageData]) => {
              const price = getPresetPrice(systemType);
              const isSelected = selectedPreset === systemType;
              
              return (
                <Card 
                  key={systemType}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    isSelected ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => {
                    setSelectedPreset(systemType);
                    setSelectedPal(null);
                    setCustomVideos([]);
                  }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl">{systemType}</CardTitle>
                      <div className="flex flex-col gap-1">
                        {isSelected && <Badge>Selected</Badge>}
                        {packageData.mostPopular && <Badge variant="secondary">Most Popular</Badge>}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-primary">${price.toLocaleString()}</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Videos Included:</h4>
                      <div className="space-y-1">
                        {packageData.videos.map((video: any, idx: number) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{video.count}x {video.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Also Includes:</h4>
                      <div className="space-y-1">
                        {packageData.includes.map((item: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <Separator className="my-16" />

        {/* Custom Build Section */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 text-foreground">Your Custom Build</h2>
            <p className="text-muted-foreground">Build exactly what you need—every package is tailored to your goals</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Builder */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pal Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>1. Choose Your Pal</CardTitle>
                  <CardDescription>Select the production approach that fits your needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {["System Pal", "Spotlight Pal", "Reel Pal", "Evergreen Pal"].map((pal) => (
                      <Button
                        key={pal}
                        variant={selectedPal === pal ? "default" : "outline"}
                        onClick={() => {
                          setSelectedPal(pal);
                          setSelectedPreset(null);
                        }}
                        className="h-auto p-4 flex flex-col items-start text-left"
                      >
                        <div className="font-semibold">{pal}</div>
                        <div className="text-xs opacity-80 mt-1">
                          {pal === "System Pal" && "Internal clarity & training"}
                          {pal === "Spotlight Pal" && "Brand narrative & premium feel"}
                          {pal === "Reel Pal" && "Social visibility & momentum"}
                          {pal === "Evergreen Pal" && "Long-form authority content"}
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Suggested Builds for Selected Pal */}
              {selectedPal && getRecommendedPackages(selectedPal).length > 0 && (
                <Card className="bg-accent/30 border-primary/20">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <CardTitle>Suggested Pathways for {selectedPal}</CardTitle>
                    </div>
                    <CardDescription>Click any option to see how it might work—then customize to your needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {getRecommendedPackages(selectedPal).map((pkg) => (
                        <div 
                          key={pkg.name}
                          className="flex items-center justify-between p-3 bg-background rounded-lg border cursor-pointer hover:border-primary transition-colors"
                          onClick={() => {
                            setSelectedPreset(pkg.name);
                            setCustomVideos([]);
                          }}
                        >
                          <div className="flex-1">
                            <div className="font-semibold flex items-center gap-2">
                              {pkg.name}
                              {pkg.mostPopular && (
                                <Badge variant="secondary" className="text-xs">Most Popular</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {pkg.videos.length} video types included
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary">${getPresetPrice(pkg.name).toLocaleString()}</div>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPreset(pkg.name);
                                setCustomVideos([]);
                              }}
                            >
                              Select <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Video Builder */}
              {selectedPal && (
                <Card>
                  <CardHeader>
                    <CardTitle>2. Select Your Videos</CardTitle>
                    <CardDescription>Choose video types and quantities—mix and match to fit your needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {videoCategories.map((category) => {
                        const existingVideo = customVideos.find((v) => v.name === category);
                        const count = existingVideo?.count || 0;
                        const length = existingVideo?.length || 1;

                        return (
                          <div key={category} className="space-y-3 p-4 border rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{category}</span>
                              <div className="flex items-center gap-3">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => count > 0 && updateCustomVideo(category, count - 1, length)}
                                  disabled={count === 0}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center font-semibold">{count}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateCustomVideo(category, count + 1, length)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            {count > 0 && (
                              <div className="flex gap-2 flex-wrap">
                                {[0.5, 1, 3, 5, 10].map((len) => (
                                  <Button
                                    key={len}
                                    size="sm"
                                    variant={length === len ? "default" : "outline"}
                                    onClick={() => updateCustomVideo(category, count, len as 0.5 | 1 | 3 | 5 | 10)}
                                  >
                                    {len === 0.5 ? "30s" : `${len}min`}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Add-Ons */}
              {selectedPal && (
                <Card>
                  <CardHeader>
                    <CardTitle>3. Add Optional Services</CardTitle>
                    <CardDescription>Enhance your package with add-ons for {selectedPal}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Feedback Message */}
                    {recentAddOnFeedback && (
                      <div className="mb-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                        <p className="text-sm text-foreground italic">
                          {recentAddOnFeedback}
                        </p>
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      {palAddOns[selectedPal]?.map((addon) => (
                        <div 
                          key={addon.id} 
                          className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedAddOns.includes(addon.id) ? 'bg-accent border-primary' : 'hover:bg-accent/50'
                          }`}
                          onClick={() => toggleAddOn(addon.id)}
                        >
                          <input
                            type="checkbox"
                            checked={selectedAddOns.includes(addon.id)}
                            onChange={() => {}}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold">{addon.name}</h3>
                              <Badge variant="outline">
                                {addon.id === "rush" ? "30% surcharge" : `$${addon.price}`}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{addon.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Price Tally - Sticky Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Your Package</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedPreset && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Package:</h4>
                      <div className="flex justify-between text-sm">
                        <span>{selectedPreset}</span>
                        <span className="font-semibold">${getPresetPrice(selectedPreset).toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  {selectedPal && !selectedPreset && customVideos.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Videos:</h4>
                      <div className="space-y-1">
                        {customVideos.map((video, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>{video.count}x {video.name}</span>
                            <span className="font-semibold">
                              ${(calculateVideoPrice(video.length) * video.count).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedAddOns.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Add-Ons:</h4>
                      <div className="space-y-1">
                        {selectedAddOns.map((id) => {
                          const addon = addOns.find((a) => a.id === id);
                          if (!addon) return null;
                          
                          let price = addon.price;
                          if (addon.id === "rush") {
                            const basePrice = selectedPreset 
                              ? calculateAutoPackagePrice(selectedPreset)
                              : calculateCustomBuildPrice();
                            price = Math.round(basePrice * 0.3);
                          }
                          
                          return (
                            <div key={id} className="flex justify-between text-sm">
                              <span>{addon.name}</span>
                              <span className="font-semibold">${price.toLocaleString()}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {(selectedPreset || customVideos.length > 0) && (
                    <>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">Total:</span>
                        <span className="text-2xl font-bold text-primary">
                          ${totalPrice.toLocaleString()}
                        </span>
                      </div>
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={() => navigate('/contact')}
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </>
                  )}

                  {!selectedPreset && !selectedPal && customVideos.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      Select a suggested build or choose a Pal to start creating your custom package
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductionPricing;
