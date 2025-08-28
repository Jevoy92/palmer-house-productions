import { useState } from 'react';
import { ChevronDown, ChevronUp, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Pal } from '@/lib/palsData';
import { useNavigate } from 'react-router-dom';

interface PalCardProps {
  pal: Pal;
  isExpanded: boolean;
  onToggle: () => void;
}

export const PalCard = ({ pal, isExpanded, onToggle }: PalCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(pal.ctaUrl);
  };

  return (
    <Card className={`group transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
      isExpanded ? 'ring-2 ring-primary/20' : ''
    }`}>
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          {/* Character Image */}
          <div className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r ${pal.gradient} p-0.5 transition-all duration-300 ${
            isExpanded ? 'scale-110' : 'group-hover:scale-105'
          }`}>
            <div className="w-full h-full rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
              <img 
                src={pal.character} 
                alt={`${pal.name} character`}
                className={`w-12 h-12 object-cover transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>

          {/* Header Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-foreground truncate">
                {pal.name}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="flex-shrink-0 p-2"
                aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
              >
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
            
            <p className="text-sm text-primary font-medium mb-2">
              {pal.tagline}
            </p>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              {pal.description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Primary Services - Always Visible */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {pal.services.primary.slice(0, 3).map((service, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {service}
              </Badge>
            ))}
            {pal.services.primary.length > 3 && !isExpanded && (
              <Badge variant="outline" className="text-xs">
                +{pal.services.primary.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Quick CTA */}
        <div className="flex items-center justify-between">
          <Button 
            onClick={handleGetStarted}
            size="sm"
            className={`bg-gradient-to-r ${pal.gradient} hover:opacity-90 text-white transition-all`}
          >
            {pal.ctaText}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onToggle}
            className="text-xs"
          >
            {isExpanded ? 'Less' : 'More'} Details
          </Button>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-border animate-fade-in">
            {/* Strengths */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                Key Strengths
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {pal.strengths.map((strength, index) => (
                  <div key={index} className="flex items-center text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                    {strength}
                  </div>
                ))}
              </div>
            </div>

            {/* All Services */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-3">
                What {pal.name} Offers
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Primary Services:</p>
                  <div className="flex flex-wrap gap-2">
                    {pal.services.primary.map((service, index) => (
                      <Badge key={index} variant="default" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Also Includes:</p>
                  <div className="flex flex-wrap gap-2">
                    {pal.services.secondary.map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Packages */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Popular Packages
              </h4>
              <div className="space-y-2">
                {pal.packages.map((pkg, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
                    <span className="text-sm font-medium text-foreground">{pkg}</span>
                    <Button variant="ghost" size="sm" onClick={handleGetStarted}>
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced CTA */}
            <div className="bg-gradient-to-r from-background to-accent/10 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Ready to work with {pal.name}?
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={handleGetStarted}
                  className={`flex-1 bg-gradient-to-r ${pal.gradient} hover:opacity-90 text-white`}
                >
                  {pal.ctaText}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/contact')}
                  className="flex-1"
                >
                  Book Strategy Call
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};