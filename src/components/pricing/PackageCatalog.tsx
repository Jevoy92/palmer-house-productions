import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PRICING_CATEGORIES, getPackagesByCategory, PRICING } from "@/lib/pricing";
import { ArrowRight, Calendar, DollarSign, Clock, Users } from "lucide-react";

export const PackageCatalog = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("brand-storytelling");

  const handlePackageSelect = (route: string) => {
    navigate(route);
  };

  const handleBookCall = () => {
    navigate("/contact?service=strategy-call");
  };

  const featuredCategories = PRICING_CATEGORIES.filter(cat => cat.featured);
  const allCategories = PRICING_CATEGORIES;

  const renderPackageCard = (packageKey: string, packageData: any, categoryId: string) => (
    <Card key={packageKey} className="bg-card border-border hover:shadow-lg transition-all duration-300 h-full">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-foreground text-lg font-semibold">{packageData.name}</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {packageData.priceRange}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm">{packageData.description}</p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Deliverables */}
          {packageData.deliverables && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">What's Included:</h4>
              <ul className="space-y-1">
                {packageData.deliverables.slice(0, 3).map((item: string, idx: number) => (
                  <li key={idx} className="text-xs text-muted-foreground flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {item}
                  </li>
                ))}
                {packageData.deliverables.length > 3 && (
                  <li className="text-xs text-muted-foreground italic">
                    +{packageData.deliverables.length - 3} more items...
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Timeline */}
          {packageData.timeline && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              Timeline: {packageData.timeline}
            </div>
          )}

          {/* CTA */}
          <Button 
            onClick={() => handlePackageSelect(packageData.route)}
            variant="outline" 
            size="sm"
            className="w-full mt-4"
          >
            View Details <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Video Production Packages
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive video solutions organized by category. From brand storytelling to industry-specific content, 
            we have packages designed to meet your unique business needs.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button onClick={handleBookCall} size="lg" className="bg-primary text-primary-foreground">
            <Calendar className="w-5 h-5 mr-2" />
            Book Strategy Call
          </Button>
          <Button 
            onClick={() => navigate("/pricing")} 
            variant="outline" 
            size="lg"
          >
            <DollarSign className="w-5 h-5 mr-2" />
            Simple Pricing
          </Button>
        </div>

        {/* Package Categories */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-12">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full mb-8">
            {allCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-xs p-2"
              >
                <span className="mr-1">{category.icon}</span>
                <span className="hidden sm:inline">{category.name.split(' ')[0]}</span>
                <span className="sm:hidden">{category.name.split(' & ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {allCategories.map((category) => {
            const packages = getPackagesByCategory(category.id);
            
            return (
              <TabsContent key={category.id} value={category.id}>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">{category.name}</h2>
                  <p className="text-muted-foreground mb-1">{category.description}</p>
                  <Badge variant="outline" className="text-sm">
                    {category.priceRange}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(packages).map(([key, pkg]) => 
                    renderPackageCard(key, pkg, category.id)
                  )}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Monthly Retainer Highlight */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 mb-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4 bg-primary text-primary-foreground">Monthly Retainer</Badge>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {PRICING.MONTHLY_RETAINER.name}
              </h3>
              <p className="text-muted-foreground mb-6">
                {PRICING.MONTHLY_RETAINER.idealFor}
              </p>
              <div className="flex items-center mb-4">
                <DollarSign className="w-5 h-5 text-primary mr-2" />
                <span className="font-semibold text-foreground">{PRICING.MONTHLY_RETAINER.priceRange}</span>
              </div>
              <Button onClick={() => navigate(PRICING.MONTHLY_RETAINER.route)} size="lg">
                Learn More <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">What's Included:</h4>
              <div className="space-y-2">
                {PRICING.MONTHLY_RETAINER.deliverables.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="flex items-start text-sm">
                    <span className="text-primary mr-2">✓</span>
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Business Bonus Pack */}
        <div className="bg-muted/30 rounded-xl p-8 mb-12">
          <div className="text-center mb-6">
            <Badge className="mb-2 bg-accent text-accent-foreground">Bonus Pack</Badge>
            <h3 className="text-xl font-bold text-foreground">{PRICING.BONUS_PACK.name}</h3>
            <p className="text-muted-foreground">Included with {PRICING.BONUS_PACK.qualifies[0]}</p>
          </div>
          
          <Accordion type="single" collapsible className="max-w-2xl mx-auto">
            <AccordionItem value="bonus-details" className="border-border">
              <AccordionTrigger className="text-foreground">
                <div className="flex items-center">
                  <span>View Bonus Items</span>
                  <Badge variant="secondary" className="ml-2">
                    Value: {PRICING.BONUS_PACK.totalValue}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-4">
                  {PRICING.BONUS_PACK.items.map((bonus, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 px-4 bg-background rounded-lg">
                      <span className="text-sm text-foreground">{bonus.item}</span>
                      <Badge variant="outline" className="text-xs">{bonus.value}</Badge>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Start Your Project?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Book a strategy call to discuss your specific needs and get a custom recommendation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleBookCall} size="lg" className="bg-primary text-primary-foreground">
              <Calendar className="w-5 h-5 mr-2" />
              Book Strategy Call
            </Button>
            <Button 
              onClick={() => navigate("/contact")} 
              variant="outline" 
              size="lg"
            >
              <Users className="w-5 h-5 mr-2" />
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};