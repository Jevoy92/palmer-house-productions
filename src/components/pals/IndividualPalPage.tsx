import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pal, getPalById } from '@/lib/palsData';
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Star,
  ChevronDown,
  ChevronUp,
  Eye,
  TrendingUp,
  Award
} from 'lucide-react';
import { OptimizedImage } from '@/components/seo/ImageOptimization';

interface IndividualPalPageProps {
  pal: Pal;
}

export const IndividualPalPage = ({ pal }: IndividualPalPageProps) => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const relatedPals = [
    { id: 'system-pal', name: 'System Pal', color: 'text-social-cyan', bgClass: 'bg-social-cyan' },
    { id: 'evergreen-pal', name: 'Evergreen Pal', color: 'text-social-green', bgClass: 'bg-social-green' },
    { id: 'spotlight-pal', name: 'Spotlight Pal', color: 'text-social-purple', bgClass: 'bg-social-purple' }
  ].filter(p => p.id !== pal.id);

  return (
    <div className="min-h-screen bg-video-white">
      {/* Full-Screen Gradient Hero */}
      <section 
        className="h-[500px] flex items-center text-white relative overflow-hidden"
        style={{ background: pal.colorScheme.gradient }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div 
                className="text-sm font-semibold px-4 py-2 rounded-full w-fit mb-4"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white'
                }}
              >
                {pal.name.toUpperCase()}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                "{pal.quote}"
              </h1>
              <p className="text-xl mb-8 opacity-90 max-w-lg">
                {pal.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate('/contact')}
                  size="xl"
                  className="text-white px-8 py-4 text-lg font-semibold"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                >
                  Book a Strategy Call
                </Button>
                <Button
                  onClick={() => navigate(pal.ctaUrl)}
                  variant="outline"
                  size="xl"
                  className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-corporate-dark"
                >
                  View Portfolio
                </Button>
              </div>
            </div>
            <div className="text-center">
              <OptimizedImage
                src={pal.image}
                alt={`${pal.name} character illustration`}
                className="w-80 h-80 mx-auto rounded-full border-4 border-white/20"
                width={320}
                height={320}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark mb-6">
              What I Do Best
            </h2>
            <p className="text-xl text-corporate-gray max-w-3xl mx-auto">
              From viral TikToks to Instagram Reels that convert, I help you create content that not only looks great but actually drives results for your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pal.expertise.map((area, index) => (
              <div key={index} className={`${area.bgColor} rounded-2xl p-8 text-center`}>
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: area.iconColor.replace('text-', 'hsl(var(--') + ')' }}
                >
                  <i className={`${area.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-corporate-dark mb-4">
                  {area.title}
                </h3>
                <p className="text-corporate-gray">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-corporate-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark mb-6">
              {pal.name} Packages
            </h2>
            <p className="text-xl text-corporate-gray max-w-3xl mx-auto">
              Choose the perfect package to kickstart your social media content journey. From quick wins to comprehensive strategies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pal.packages.map((pkg, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 text-center shadow-lg relative transition-all duration-300 hover:scale-105 hover:shadow-xl"
                style={{ 
                  borderColor: pkg.popular ? pal.colorScheme.primary : 'transparent',
                  borderWidth: pkg.popular ? '2px' : '0px'
                }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div 
                      className="text-white px-4 py-2 rounded-full text-sm font-semibold"
                      style={{ backgroundColor: pal.colorScheme.primary }}
                    >
                      MOST POPULAR
                    </div>
                  </div>
                )}
                <div 
                  className="text-sm font-semibold px-4 py-2 rounded-full w-fit mx-auto mb-6"
                  style={{ 
                    backgroundColor: pal.colorScheme.primary + '20',
                    color: pal.colorScheme.primary
                  }}
                >
                  {pkg.badge}
                </div>
                <h3 className="text-2xl font-bold text-corporate-dark mb-4">
                  {pkg.name}
                </h3>
                <div 
                  className="text-4xl font-bold mb-6"
                  style={{ color: pal.colorScheme.primary }}
                >
                  {pkg.price}
                </div>
                <ul className="space-y-4 mb-8 text-left">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle 
                        className="w-5 h-5"
                        style={{ color: pal.colorScheme.primary }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mb-4 text-white font-semibold py-4"
                  style={{ backgroundColor: pal.colorScheme.primary }}
                >
                  {pkg.ctaText}
                </Button>
                <Button
                  variant="outline"
                  className="w-full font-semibold py-4"
                  style={{ 
                    borderColor: pal.colorScheme.primary,
                    color: pal.colorScheme.primary
                  }}
                >
                  {pkg.ctaSecondary}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark mb-6">
              Ready to Create Amazing Content?
            </h2>
            <p className="text-xl text-corporate-gray max-w-3xl mx-auto">
              Join the thousands of creators who have transformed their social media presence with {pal.name}'s proven strategies and engaging content solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pal.stats.map((stat, index) => (
              <div key={index} className="bg-corporate-light/30 rounded-2xl p-8 text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: stat.color.replace('text-', 'hsl(var(--') + ')' }}
                >
                  {index === 0 && <Eye className="w-8 h-8 text-white" />}
                  {index === 1 && <Users className="w-8 h-8 text-white" />}
                  {index === 2 && <TrendingUp className="w-8 h-8 text-white" />}
                  {index === 3 && <Award className="w-8 h-8 text-white" />}
                </div>
                <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <p className="text-corporate-gray">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-corporate-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark mb-6">
              How We Work Together
            </h2>
            <p className="text-xl text-corporate-gray max-w-3xl mx-auto">
              My proven 4-step process ensures we create content that not only looks amazing but drives real results for your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pal.process.map((step, index) => (
              <div key={index} className="text-center">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative"
                  style={{ backgroundColor: pal.colorScheme.primary }}
                >
                  <i className={`${step.icon} text-white text-2xl`}></i>
                  <div 
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: pal.colorScheme.secondary }}
                  >
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-corporate-dark mb-4">
                  {step.title}
                </h3>
                <p className="text-corporate-gray">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-corporate-gray">
              Everything you need to know about working with {pal.name}.
            </p>
          </div>
          
          <div className="space-y-6">
            {pal.faqs.map((faq, index) => (
              <Card key={index} className="bg-corporate-light/20">
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <CardTitle className="flex justify-between items-center">
                    <span className="text-xl font-bold text-corporate-dark">
                      {faq.question}
                    </span>
                    {openFAQ === index ? (
                      <ChevronUp className="w-6 h-6 text-corporate-gray" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-corporate-gray" />
                    )}
                  </CardTitle>
                </CardHeader>
                {openFAQ === index && (
                  <CardContent>
                    <p className="text-corporate-gray">
                      {faq.answer}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section 
        className="py-20 text-white"
        style={{ background: pal.colorScheme.gradient }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <OptimizedImage
              src={pal.image}
              alt={`${pal.name} waving`}
              className="w-32 h-32 mx-auto rounded-full border-4 border-white/20"
              width={128}
              height={128}
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Go Viral with {pal.name}?
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Let's create content that doesn't just look good—but actually grows your business. Book a strategy call and let's turn your social media into your biggest marketing asset.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold mb-2" style={{ color: pal.colorScheme.accent }}>
                500K+
              </div>
              <p className="text-sm opacity-80">Views Generated</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold mb-2" style={{ color: pal.colorScheme.accent }}>
                50+
              </div>
              <p className="text-sm opacity-80">Happy Clients</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl font-bold mb-2" style={{ color: pal.colorScheme.accent }}>
                95%
              </div>
              <p className="text-sm opacity-80">Client Satisfaction</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              onClick={() => navigate('/contact')}
              size="xl"
              className="text-white px-10 py-4 text-lg font-semibold"
              style={{ backgroundColor: pal.colorScheme.secondary }}
            >
              Book Your Strategy Call
            </Button>
            <Button
              onClick={() => navigate(pal.ctaUrl)}
              variant="outline"
              size="xl"
              className="border-2 border-white text-white px-10 py-4 text-lg font-semibold hover:bg-white hover:text-corporate-dark"
            >
              Start with DIY Kit
            </Button>
          </div>
          
          <p className="text-sm opacity-75 mt-6">
            🎉 Limited Time: Book this month and get a FREE content audit worth $300!
          </p>
        </div>
      </section>

      {/* Related Pals Section */}
      <section className="py-20 bg-corporate-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-corporate-dark mb-6">
              Meet My Fellow Pals
            </h2>
            <p className="text-xl text-corporate-gray max-w-3xl mx-auto">
              Need more than just social content? Check out my fellow Palmer House Pals who can help with other aspects of your video journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPals.map((relatedPal) => {
              const palData = getPalById(relatedPal.id);
              return (
                <Card 
                  key={relatedPal.id}
                  className="p-8 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  onClick={() => navigate(`/pals/${relatedPal.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="mb-6">
                      {palData && (
                        <OptimizedImage
                          src={palData.image}
                          alt={`${relatedPal.name} character`}
                          className="w-24 h-24 mx-auto rounded-full"
                          width={96}
                          height={96}
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-corporate-dark mb-3">
                      {relatedPal.name}
                    </h3>
                    <p className="text-corporate-gray mb-4">
                      {palData?.tagline}
                    </p>
                    <Button
                      className={`${relatedPal.bgClass} text-white px-6 py-3 font-semibold hover:opacity-90`}
                    >
                      Meet {relatedPal.name}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};