import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Plus, Minus } from "lucide-react";
import { MetaTags } from "@/components/seo/MetaTags";

type Problem = {
  id: number;
  text: string;
  pal: string[];
  systemType: string;
};

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
};

const problems: Problem[] = [
  { id: 1, text: "My customers keep asking the same questions", pal: ["System Pal"], systemType: "FAQ System" },
  { id: 2, text: "New clients don't know what to do next", pal: ["System Pal"], systemType: "Onboarding System" },
  { id: 3, text: "My team needs training", pal: ["System Pal"], systemType: "Internal Training System" },
  { id: 4, text: "I can't hire the right people", pal: ["System Pal", "Spotlight Pal"], systemType: "Recruitment System" },
  { id: 5, text: "Nobody knows who we are", pal: ["Reel Pal"], systemType: "Visibility Engine" },
  { id: 6, text: "My social presence is weak", pal: ["Reel Pal"], systemType: "Visibility Engine" },
  { id: 7, text: "I want YouTube to bring me leads", pal: ["Evergreen Pal"], systemType: "Authority Engine" },
  { id: 8, text: "My brand story doesn't feel premium", pal: ["Spotlight Pal"], systemType: "Brand Narrative System" },
  { id: 9, text: "I feel invisible or misunderstood", pal: ["Evergreen Pal", "Spotlight Pal"], systemType: "Authority + Brand System" },
  { id: 10, text: "I need guidance — help me build the right system", pal: ["Evergreen Pal", "Spotlight Pal"], systemType: "Custom Guided Build" },
];

const autoPackages: Record<string, any> = {
  "FAQ System": {
    videos: [
      { type: "FAQ videos (60s)", count: 12, length: 1 },
      { type: "Deep-dive FAQs (5min)", count: 3, length: 5 },
      { type: "Customer intake explainer", count: 1, length: 1 },
      { type: "What to expect next clip", count: 1, length: 1 },
    ],
    includes: ["AI FAQ outline", "Library organization", "1 strategy session"],
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
  },
  "Internal Training System": {
    videos: [
      { type: "Training videos (5min)", count: 4, length: 5 },
      { type: "SOP clips (30-60s)", count: 10, length: 0.5 },
    ],
    includes: ["Tool walkthroughs", "Onboarding sequence", "Internal library setup"],
  },
  "Visibility Engine": {
    videos: [
      { type: "Short-form videos (30-60s)", count: 12, length: 0.5 },
      { type: "Brand intro short", count: 1, length: 1 },
      { type: "Hook variations", count: 3, length: 0.5 },
    ],
    includes: ["AI hook bank", "Content clarity map"],
  },
  "Authority Engine": {
    videos: [
      { type: "Long-form episodes", count: 6, length: 10 },
      { type: "Brand introduction", count: 1, length: 5 },
    ],
    includes: ["Custom thumbnails (1 per video)", "CTA scripts", "Topic map for 90 days", "SEO description guidance", "2 strategy sessions"],
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
  },
};

const videoCategories = [
  "Training",
  "SOP",
  "FAQ",
  "Social clips",
  "Long-form episodes",
  "Story films",
  "Recruitment videos",
  "Onboarding steps",
  "Product explainers",
];

const addOns: AddOn[] = [
  { id: "strategy", name: "Extra Strategy Session", description: "Additional 90-minute strategy planning session", price: 500, category: "Strategy" },
  { id: "filming-day", name: "Extra Filming Day", description: "Full day of filming with crew and equipment", price: 2500, category: "Production" },
  { id: "travel", name: "Travel Beyond 1 Hour", description: "Per hour of travel time beyond local radius", price: 150, category: "Production" },
  { id: "rush", name: "Rush Delivery", description: "Expedited editing and delivery timeline", price: 0, category: "Editing" }, // Calculated as percentage
  { id: "aspect-ratios", name: "Additional Aspect Ratios", description: "9:16 or 1:1 versions per video", price: 75, category: "Editing" },
  { id: "captions", name: "Captioned Versions", description: "Professionally captioned versions per video", price: 50, category: "Editing" },
  { id: "thumbnails", name: "Additional Thumbnails", description: "Custom thumbnails per video", price: 100, category: "Editing" },
  { id: "library-setup", name: "Full Content Library Setup", description: "Organize everything by series, category, and folder", price: 1500, category: "Systems" },
  { id: "brand-kit", name: "Brand Kit Import", description: "Apply brand fonts/colors to all videos", price: 750, category: "Systems" },
  { id: "ai-support", name: "Additional AI Content Support", description: "Templates, scripts, and outlines", price: 300, category: "Systems" },
];

const ProductionPricing = () => {
  const [step, setStep] = useState(1);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [useAutoPackage, setUseAutoPackage] = useState<boolean | null>(null);
  const [customVideos, setCustomVideos] = useState<VideoCategory[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const BASE_COST_PER_MINUTE = 150;
  const MARGIN = 3.5;

  const calculateVideoPrice = (minutes: number): number => {
    return BASE_COST_PER_MINUTE * minutes * MARGIN;
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
          // Rush is 30% surcharge
          const basePrice = useAutoPackage && selectedProblem 
            ? calculateAutoPackagePrice(selectedProblem.systemType)
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
    const videoPrice = useAutoPackage && selectedProblem
      ? calculateAutoPackagePrice(selectedProblem.systemType)
      : calculateCustomBuildPrice();
    const addOnsPrice = calculateAddOnsPrice();
    setTotalPrice(videoPrice + addOnsPrice);
  }, [useAutoPackage, selectedProblem, customVideos, selectedAddOns]);

  const addCustomVideo = (category: string) => {
    setCustomVideos([...customVideos, { name: category, count: 1, length: 1 }]);
  };

  const updateCustomVideo = (index: number, field: keyof VideoCategory, value: any) => {
    const updated = [...customVideos];
    updated[index] = { ...updated[index], [field]: value };
    setCustomVideos(updated);
  };

  const removeCustomVideo = (index: number) => {
    setCustomVideos(customVideos.filter((_, i) => i !== index));
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <>
      <MetaTags 
        title="Production Pricing - Video Production Services"
        description="Custom video production pricing configurator. Build your perfect video package with transparent pricing based on your specific needs."
      />
      
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Build Your Video Production Package</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium video production, no publishing support. Pure production expertise guided by your specific business challenges.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-2 mb-12">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {s}
                </div>
                {s < 5 && <div className={`w-12 h-1 ${step > s ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Choose Problem */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>What Challenge Are You Facing?</CardTitle>
                <CardDescription>Choose the problem that best describes your current situation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {problems.map((problem) => (
                  <button
                    key={problem.id}
                    onClick={() => {
                      setSelectedProblem(problem);
                      setStep(2);
                    }}
                    className="w-full text-left p-4 rounded-lg border hover:border-primary hover:bg-accent transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-medium">{problem.text}</span>
                      <Badge variant="secondary" className="ml-2">{problem.pal.join(" + ")}</Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Step 2: Pal Assignment & Package Choice */}
          {step === 2 && selectedProblem && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Assigned Pal{selectedProblem.pal.length > 1 ? "s" : ""}</CardTitle>
                  <CardDescription>Based on your challenge, we recommend:</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedProblem.pal.map((pal) => (
                      <div key={pal} className="p-4 rounded-lg bg-accent">
                        <h3 className="font-semibold text-lg">{pal}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {pal === "System Pal" && "Internal clarity. Structure. SOPs. Training. Onboarding."}
                          {pal === "Spotlight Pal" && "Identity. Narrative. Premium brand perception."}
                          {pal === "Reel Pal" && "Momentum. Visibility. Attention."}
                          {pal === "Evergreen Pal" && "Long-form authority. YouTube. Deep teaching."}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Package Type</CardTitle>
                  <CardDescription>Select a curated auto-package or build your own custom solution</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant={useAutoPackage === true ? "default" : "outline"}
                    onClick={() => {
                      setUseAutoPackage(true);
                      setStep(3);
                    }}
                    className="w-full h-auto p-6 flex flex-col items-start"
                  >
                    <div className="font-semibold text-lg mb-2">Auto-Package (Recommended)</div>
                    <div className="text-sm opacity-90">{selectedProblem.systemType}</div>
                    <Badge className="mt-2">Most Popular</Badge>
                  </Button>

                  <Button
                    variant={useAutoPackage === false ? "default" : "outline"}
                    onClick={() => {
                      setUseAutoPackage(false);
                      setStep(3);
                    }}
                    className="w-full h-auto p-6 flex flex-col items-start"
                  >
                    <div className="font-semibold text-lg mb-2">Custom Build</div>
                    <div className="text-sm opacity-90">Configure your own package from scratch</div>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Package Details */}
          {step === 3 && selectedProblem && useAutoPackage !== null && (
            <Card>
              <CardHeader>
                <CardTitle>{useAutoPackage ? selectedProblem.systemType : "Custom Build Configurator"}</CardTitle>
                <CardDescription>
                  {useAutoPackage ? "Your curated production package" : "Build your perfect video package"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {useAutoPackage ? (
                  <>
                    {autoPackages[selectedProblem.systemType]?.videos.map((video: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{video.type}</div>
                          <div className="text-sm text-muted-foreground">Quantity: {video.count}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            ${(calculateVideoPrice(video.length) * video.count).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-semibold mb-3">Includes:</h4>
                      <ul className="space-y-2">
                        {autoPackages[selectedProblem.systemType]?.includes.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      {customVideos.map((video, idx) => (
                        <div key={idx} className="p-4 rounded-lg border space-y-3">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <input
                                type="text"
                                value={video.name}
                                onChange={(e) => updateCustomVideo(idx, "name", e.target.value)}
                                className="font-medium bg-transparent border-none outline-none"
                                placeholder="Video category"
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCustomVideo(idx)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm text-muted-foreground">Quantity</label>
                              <input
                                type="number"
                                min="1"
                                value={video.count}
                                onChange={(e) => updateCustomVideo(idx, "count", parseInt(e.target.value) || 1)}
                                className="w-full px-3 py-2 rounded-md border bg-background mt-1"
                              />
                            </div>
                            
                            <div>
                              <label className="text-sm text-muted-foreground">Length (minutes)</label>
                              <select
                                value={video.length}
                                onChange={(e) => updateCustomVideo(idx, "length", parseFloat(e.target.value) as any)}
                                className="w-full px-3 py-2 rounded-md border bg-background mt-1"
                              >
                                <option value={0.5}>30 seconds</option>
                                <option value={1}>1 minute</option>
                                <option value={3}>3 minutes</option>
                                <option value={5}>5 minutes</option>
                                <option value={10}>10 minutes</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-sm text-muted-foreground">Subtotal: </span>
                            <span className="font-semibold">
                              ${(calculateVideoPrice(video.length) * video.count).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {videoCategories.map((category) => (
                        <Button
                          key={category}
                          variant="outline"
                          size="sm"
                          onClick={() => addCustomVideo(category)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          {category}
                        </Button>
                      ))}
                    </div>
                  </>
                )}

                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(4)}>
                    Continue to Add-Ons
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Add-Ons */}
          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Enhance Your Package</CardTitle>
                <CardDescription>Select optional add-ons to customize your production experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {["Strategy", "Production", "Editing", "Systems"].map((category) => (
                  <div key={category}>
                    <h3 className="font-semibold text-lg mb-3">{category}</h3>
                    <div className="space-y-2">
                      {addOns.filter(a => a.category === category).map((addOn) => (
                        <button
                          key={addOn.id}
                          onClick={() => toggleAddOn(addOn.id)}
                          className={`w-full text-left p-4 rounded-lg border transition-colors ${
                            selectedAddOns.includes(addOn.id)
                              ? "border-primary bg-accent"
                              : "hover:border-primary/50"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="font-medium">{addOn.name}</div>
                              <div className="text-sm text-muted-foreground mt-1">{addOn.description}</div>
                            </div>
                            <div className="ml-4 font-semibold whitespace-nowrap">
                              {addOn.id === "rush" ? "+30%" : `$${addOn.price.toLocaleString()}`}
                            </div>
                          </div>
                          {selectedAddOns.includes(addOn.id) && (
                            <CheckCircle2 className="w-5 h-5 text-primary absolute top-4 right-4" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(5)}>
                    Review Summary
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 5: Summary */}
          {step === 5 && selectedProblem && (
            <Card>
              <CardHeader>
                <CardTitle>Your Production Package Summary</CardTitle>
                <CardDescription>Review your custom video production package</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground">Challenge</h3>
                    <p className="mt-1">{selectedProblem.text}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground">Assigned Pal</h3>
                    <p className="mt-1">{selectedProblem.pal.join(" + ")}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground">System Type</h3>
                    <p className="mt-1">{useAutoPackage ? selectedProblem.systemType : "Custom Build"}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3">Video Package</h3>
                    {useAutoPackage && selectedProblem ? (
                      <div className="space-y-2">
                        {autoPackages[selectedProblem.systemType]?.videos.map((video: any, idx: number) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>{video.count}x {video.type}</span>
                            <span className="font-medium">
                              ${(calculateVideoPrice(video.length) * video.count).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {customVideos.map((video, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span>{video.count}x {video.name} ({video.length === 0.5 ? "30s" : `${video.length}min`})</span>
                            <span className="font-medium">
                              ${(calculateVideoPrice(video.length) * video.count).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedAddOns.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-3">Selected Add-Ons</h3>
                        <div className="space-y-2">
                          {selectedAddOns.map((id) => {
                            const addOn = addOns.find(a => a.id === id);
                            if (!addOn) return null;
                            const price = addOn.id === "rush" 
                              ? (useAutoPackage && selectedProblem 
                                  ? calculateAutoPackagePrice(selectedProblem.systemType)
                                  : calculateCustomBuildPrice()) * 0.3
                              : addOn.price;
                            return (
                              <div key={id} className="flex justify-between text-sm">
                                <span>{addOn.name}</span>
                                <span className="font-medium">${price.toLocaleString()}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div className="bg-primary/10 p-6 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">Total Investment</span>
                      <span className="text-3xl font-bold">${totalPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Payment plans available
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(4)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={() => window.location.href = "/contact"} className="flex-1">
                    Get Started
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductionPricing;