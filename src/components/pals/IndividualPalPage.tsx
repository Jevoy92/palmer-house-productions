import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pal } from '@/lib/palsData';
import { ArrowLeft, CheckCircle, Users, Star, ArrowRight } from 'lucide-react';
import { OptimizedImage } from '@/components/seo/ImageOptimization';

interface IndividualPalPageProps {
  pal: Pal;
}

export const IndividualPalPage = ({ pal }: IndividualPalPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-video-white">
      {/* Back Navigation */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/pals')}
            className="flex items-center gap-2 text-corporate-gray hover:text-corporate-dark"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Pals
          </Button>
        </div>
      </div>

      {/* Hero Section - Split Layout */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Character Image */}
            <div className="order-2 lg:order-1 flex justify-center">
              <div 
                className="relative p-8 rounded-3xl shadow-2xl"
                style={{ backgroundColor: pal.colorScheme.bg }}
              >
                <OptimizedImage
                  src={pal.image}
                  alt={`${pal.name} character illustration`}
                  className="w-full max-w-md h-auto"
                  width={400}
                  height={400}
                  priority
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h1 
                  className="text-5xl lg:text-6xl font-bold mb-4"
                  style={{ color: pal.colorScheme.primary }}
                >
                  {pal.name}
                </h1>
                <h2 className="text-2xl lg:text-3xl text-corporate-gray mb-6">
                  {pal.tagline}
                </h2>
                <blockquote 
                  className="text-2xl lg:text-3xl font-medium italic mb-8 border-l-4 pl-6"
                  style={{ 
                    borderColor: pal.colorScheme.secondary,
                    color: pal.colorScheme.primary 
                  }}
                >
                  "{pal.quote}"
                </blockquote>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate(pal.ctaUrl)}
                  size="lg"
                  className="bg-gradient-to-r text-white hover:opacity-90 px-8 py-4 text-lg"
                  style={{
                    background: `linear-gradient(135deg, ${pal.colorScheme.primary}, ${pal.colorScheme.secondary})`
                  }}
                >
                  {pal.ctaText}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  onClick={() => navigate('/contact')}
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 text-lg border-2"
                  style={{ borderColor: pal.colorScheme.primary, color: pal.colorScheme.primary }}
                >
                  Book Strategy Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do Best */}
      <section className="py-16 bg-corporate-light/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-corporate-dark">
            What I Do Best
          </h2>
          
          <Card className="p-8 lg:p-12">
            <CardContent className="p-0">
              <p className="text-xl leading-relaxed text-corporate-gray">
                {pal.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* My Personality & Communication Style */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Personality */}
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-6">
                  <Star className="w-6 h-6" style={{ color: pal.colorScheme.primary }} />
                  <h3 className="text-2xl font-bold text-corporate-dark">My Personality</h3>
                </div>
                <ul className="space-y-3">
                  {pal.personality.map((trait, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: pal.colorScheme.secondary }} />
                      <span className="text-corporate-gray">{trait}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Communication Style */}
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6" style={{ color: pal.colorScheme.primary }} />
                  <h3 className="text-2xl font-bold text-corporate-dark">How I Communicate</h3>
                </div>
                <ul className="space-y-3">
                  {pal.communication.map((style, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: pal.colorScheme.secondary }} />
                      <span className="text-corporate-gray">{style}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* My Strengths & Services */}
      <section className="py-16 bg-corporate-light/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Strengths */}
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-corporate-dark">
                My Key Strengths
              </h3>
              <div className="grid gap-4">
                {pal.strengths.map((strength, index) => (
                  <Card key={index} className="p-4">
                    <CardContent className="p-0 flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: pal.colorScheme.primary }}
                      />
                      <span className="text-corporate-gray font-medium">{strength}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-corporate-dark">
                What I Offer
              </h3>
              <div className="grid gap-4">
                {pal.services.map((service, index) => (
                  <Card key={index} className="p-4">
                    <CardContent className="p-0 flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: pal.colorScheme.secondary }}
                      />
                      <span className="text-corporate-gray font-medium">{service}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For & Packages */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Perfect For */}
            <Card className="p-8">
              <CardContent className="p-0">
                <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-corporate-dark">
                  Perfect For
                </h3>
                <ul className="space-y-4">
                  {pal.perfectFor.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: pal.colorScheme.primary }} />
                      <span className="text-corporate-gray">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Popular Packages */}
            <Card className="p-8">
              <CardContent className="p-0">
                <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-corporate-dark">
                  Popular Packages
                </h3>
                <div className="space-y-4">
                  {pal.packages.map((pkg, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg border-2 border-dashed"
                      style={{ borderColor: pal.colorScheme.secondary }}
                    >
                      <span className="text-corporate-gray font-medium">{pkg}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section 
        className="py-20"
        style={{ backgroundColor: pal.colorScheme.bg }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ color: pal.colorScheme.primary }}>
            Ready to Work Together?
          </h2>
          <p className="text-xl text-corporate-gray mb-8 max-w-2xl mx-auto">
            Let's create something amazing that perfectly fits your vision and goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              onClick={() => navigate(pal.ctaUrl)}
              size="xl"
              className="text-white hover:opacity-90 px-12 py-6 text-xl"
              style={{
                background: `linear-gradient(135deg, ${pal.colorScheme.primary}, ${pal.colorScheme.secondary})`
              }}
            >
              {pal.ctaText}
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
            <Button
              onClick={() => navigate('/contact')}
              variant="outline"
              size="xl"
              className="px-12 py-6 text-xl border-2"
              style={{ borderColor: pal.colorScheme.primary, color: pal.colorScheme.primary }}
            >
              Book Strategy Call
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-corporate-gray/20">
            <p className="text-sm text-corporate-gray">
              <strong>Free Strategy Call:</strong> 30-minute consultation to understand your goals and recommend the best approach
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};