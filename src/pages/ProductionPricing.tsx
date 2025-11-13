import { useState } from "react";
import { MetaTags } from "@/components/seo/MetaTags";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Star, TrendingUp, Layers, Film, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BuildItem {
  name: string;
  basePrice: number;
  quantity: number;
  perUnit: boolean;
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
  missionStatement: string;
  missionSubtitle: string;
  palLabel: string;
  colorTheme: {
    primary: string;
    background: string;
    accent: string;
  };
}

const ProductionPricing = () => {
  const videoOptions: VideoOption[] = [
    { name: "1-minute video", price: 150, length: "1 min" },
    { name: "FAQ video", price: 150, length: "1 min" },
    { name: "Training video", price: 150, length: "1 min" },
    { name: "Social reel", price: 150, length: "30-60 sec" },
    { name: "Brand story", price: 150, length: "1 min" }
  ];

  const [palBuilds, setPalBuilds] = useState<PalBuildConfig[]>([
    {
      id: "reel-pal",
      name: "REEL PAL",
      subtitle: "Visibility Package",
      description: "Keep your business visible and active",
      icon: TrendingUp,
      missionStatement: "I need visibility.",
      missionSubtitle: "Short-form videos designed to keep your business active, consistent, and top-of-mind.",
      palLabel: "Guided by Reel Pal",
      colorTheme: { primary: "24 100% 60%", background: "24 100% 97%", accent: "24 100% 50%" },
      items: [
        { name: "1-minute anchor video", basePrice: 450, quantity: 1, perUnit: false },
        { name: "Short-form clips", basePrice: 150, quantity: 5, perUnit: true }
      ]
    },
    {
      id: "system-pal",
      name: "SYSTEM PAL",
      subtitle: "Training Package",
      description: "Internal clarity and operations",
      icon: Layers,
      missionStatement: "I need training content.",
      missionSubtitle: "Create internal clarity, reduce repetitive tasks, and standardize your operations.",
      palLabel: "Guided by System Pal",
      colorTheme: { primary: "215 79% 60%", background: "215 79% 97%", accent: "215 79% 50%" },
      items: [
        { name: "FAQ video", basePrice: 450, quantity: 1, perUnit: false },
        { name: "Training videos", basePrice: 150, quantity: 6, perUnit: true }
      ]
    },
    {
      id: "evergreen-pal",
      name: "EVERGREEN PAL",
      subtitle: "Authority Package",
      description: "Long-form educational content",
      icon: Star,
      missionStatement: "I need long-form authority.",
      missionSubtitle: "Build trust with educational, evergreen content that positions you as the expert.",
      palLabel: "Guided by Evergreen Pal",
      colorTheme: { primary: "158 64% 52%", background: "158 64% 97%", accent: "158 64% 42%" },
      items: [
        { name: "5-minute video", basePrice: 1050, quantity: 1, perUnit: false },
        { name: "Short clips", basePrice: 150, quantity: 2, perUnit: true }
      ]
    },
    {
      id: "spotlight-pal",
      name: "SPOTLIGHT PAL",
      subtitle: "Brand Story Package",
      description: "Cinematic brand storytelling",
      icon: Film,
      missionStatement: "I need brand story.",
      missionSubtitle: "Tell a cinematic, emotional narrative that elevates your identity and wins attention.",
      palLabel: "Guided by Spotlight Pal",
      colorTheme: { primary: "258 90% 66%", background: "258 90% 97%", accent: "258 90% 56%" },
      items: [
        { name: "Brand story video", basePrice: 450, quantity: 1, perUnit: false },
        { name: "Supporting videos", basePrice: 150, quantity: 4, perUnit: true }
      ]
    }
  ]);

  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCardSelect = (palId: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedCard(palId);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleCardClose = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedCard(null);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const updateQuantity = (palId: string, idx: number, newQty: number) => {
    if (newQty < 0) return;
    setPalBuilds(prev => prev.map(pal => 
      pal.id === palId ? { ...pal, items: pal.items.map((item, i) => i === idx ? { ...item, quantity: newQty } : item) } : pal
    ));
  };

  const addVideoToPackage = (palId: string, option: VideoOption) => {
    setPalBuilds(prev => prev.map(pal => 
      pal.id === palId ? { ...pal, items: [...pal.items, { name: option.name, basePrice: option.price, quantity: 1, perUnit: true }] } : pal
    ));
  };

  const calculateTotal = (items: BuildItem[]) => items.reduce((total, item) => total + (item.basePrice * item.quantity), 0);

  return (
    <>
      <MetaTags title="Video Production Pricing | Palmer House Productions" description="Build your perfect video production package" />
      <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: selectedCard ? `hsl(${palBuilds.find(p => p.id === selectedCard)?.colorTheme.background})` : 'hsl(var(--background))' }}>
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          {!selectedCard && (
            <div className="text-center mb-16 space-y-4 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">Choose Your Mission. Build Your System.</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Select the mission that matches your business goals, then customize your perfect video package.</p>
            </div>
          )}
          
          <div className="mb-20 relative">
            {!selectedCard ? (
              <div className="relative max-w-4xl mx-auto" style={{ minHeight: '600px' }}>
                {palBuilds.map((pal, index) => {
                  const Icon = pal.icon;
                  const isTop = index === palBuilds.length - 1;
                  return (
                    <div key={pal.id} onClick={() => handleCardSelect(pal.id)} className="absolute left-0 right-0 cursor-pointer transition-all duration-300 hover:scale-[1.02]" style={{ top: `${index * 20}px`, zIndex: index, transform: isTop ? 'scale(1)' : 'scale(0.98)', opacity: isTop ? 1 : 0.7 }}>
                      <Card className="shadow-2xl overflow-hidden border-2" style={{ borderColor: `hsl(${pal.colorTheme.primary})`, boxShadow: isTop ? `0 20px 40px -10px hsla(${pal.colorTheme.primary}, 0.3)` : undefined }}>
                        <div className="p-12 text-center space-y-6">
                          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: `hsl(${pal.colorTheme.background})` }}>
                            <Icon className="w-10 h-10" style={{ color: `hsl(${pal.colorTheme.primary})` }} />
                          </div>
                          <div className="space-y-3">
                            <h2 className="text-4xl md:text-5xl font-bold" style={{ color: `hsl(${pal.colorTheme.primary})` }}>{pal.missionStatement}</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{pal.missionSubtitle}</p>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-muted-foreground pt-4">
                            <span className="text-sm">Tap to explore</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="animate-fade-in">
                {palBuilds.filter(pal => pal.id === selectedCard).map((pal) => {
                  const Icon = pal.icon;
                  const totalPrice = calculateTotal(pal.items);
                  return (
                    <Card key={pal.id} className="max-w-5xl mx-auto shadow-2xl border-2" style={{ borderColor: `hsl(${pal.colorTheme.primary})` }}>
                      <CardHeader className="space-y-6 border-b" style={{ borderColor: `hsl(${pal.colorTheme.primary} / 0.2)` }}>
                        <div className="flex items-start justify-between">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="p-3 rounded-lg" style={{ backgroundColor: `hsl(${pal.colorTheme.background})` }}>
                                <Icon className="w-6 h-6" style={{ color: `hsl(${pal.colorTheme.primary})` }} />
                              </div>
                              <div>
                                <CardTitle className="text-3xl md:text-4xl" style={{ color: `hsl(${pal.colorTheme.primary})` }}>{pal.missionStatement}</CardTitle>
                                <p className="text-sm text-muted-foreground mt-2">{pal.palLabel}</p>
                              </div>
                            </div>
                            <p className="text-lg text-muted-foreground max-w-2xl">{pal.missionSubtitle}</p>
                          </div>
                          <Button variant="ghost" onClick={handleCardClose} className="shrink-0">← Back</Button>
                        </div>
                      </CardHeader>
                      <div className="space-y-8 p-8">
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-foreground">Your $1,500 Monthly Build</h3>
                          <div className="space-y-4">
                            {pal.items.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between gap-4 p-4 rounded-lg border">
                                <div className="flex-1">
                                  <p className="font-medium text-foreground">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">{item.perUnit ? `$${item.basePrice} each` : `$${item.basePrice} base`}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Button size="sm" variant="outline" onClick={() => updateQuantity(pal.id, idx, Math.max(0, item.quantity - 1))} disabled={item.quantity === 0}><Minus className="w-4 h-4" /></Button>
                                  <span className="w-12 text-center font-semibold text-lg text-foreground">{item.quantity}</span>
                                  <Button size="sm" variant="outline" onClick={() => updateQuantity(pal.id, idx, item.quantity + 1)}><Plus className="w-4 h-4" /></Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-medium text-foreground">Customize Your Build</label>
                          <Select onValueChange={(value) => { const option = videoOptions.find(v => v.name === value); if (option) addVideoToPackage(pal.id, option); }}>
                            <SelectTrigger><SelectValue placeholder="Add more videos" /></SelectTrigger>
                            <SelectContent><SelectGroup><SelectLabel>Video Options</SelectLabel>{videoOptions.map((option) => (<SelectItem key={option.name} value={option.name}>{option.name} - ${option.price} ({option.length})</SelectItem>))}</SelectGroup></SelectContent>
                          </Select>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between p-6 rounded-lg border-2" style={{ backgroundColor: `hsl(${pal.colorTheme.background})`, borderColor: `hsl(${pal.colorTheme.primary})` }}>
                          <div>
                            <p className="text-sm text-muted-foreground">Total Monthly Investment</p>
                            <p className="text-4xl font-bold" style={{ color: `hsl(${pal.colorTheme.primary})` }}>${totalPrice.toLocaleString()}</p>
                          </div>
                          <Badge className="text-base px-4 py-2" style={{ backgroundColor: `hsl(${pal.colorTheme.primary})`, color: 'white' }}>Per Month</Badge>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
          
          {!selectedCard && (
            <div className="text-center space-y-6 animate-fade-in">
              <h2 className="text-3xl font-bold text-foreground">Ready to Build Your System?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Choose a mission card above to get started with a customized video package.</p>
            </div>
          )}
        </div>
        
        {selectedCard && (
          <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-in-bottom">
            <div className="border-t shadow-2xl backdrop-blur-sm" style={{ backgroundColor: `hsla(${palBuilds.find(p => p.id === selectedCard)?.colorTheme.background}, 0.95)`, borderColor: `hsl(${palBuilds.find(p => p.id === selectedCard)?.colorTheme.primary} / 0.3)` }}>
              <div className="container mx-auto px-4 py-6 max-w-7xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Ready to proceed?</p>
                    <p className="text-2xl font-bold" style={{ color: `hsl(${palBuilds.find(p => p.id === selectedCard)?.colorTheme.primary})` }}>${calculateTotal(palBuilds.find(p => p.id === selectedCard)?.items || []).toLocaleString()}/month</p>
                  </div>
                  <div className="flex gap-3">
                    <Button size="lg" variant="outline" onClick={handleCardClose}>Explore Other Missions</Button>
                    <Button size="lg" asChild style={{ backgroundColor: `hsl(${palBuilds.find(p => p.id === selectedCard)?.colorTheme.primary})`, color: 'white' }} className="hover:opacity-90"><Link to="/contact">Get Started With This Build</Link></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductionPricing;
