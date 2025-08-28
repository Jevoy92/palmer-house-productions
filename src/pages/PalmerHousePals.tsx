import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PALS_DATA } from '@/lib/palsData';
import { Users, ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { OptimizedImage } from '@/components/seo/ImageOptimization';
import { MetaTags } from '@/components/seo/MetaTags';

export default function PalmerHousePals() {
  const navigate = useNavigate();

  return (
    <>
      <MetaTags
        title="Meet the Palmer House Pals - Your Video Production Guides"
        description="Meet your personalized video production guides. Each Pal specializes in different video solutions to help you achieve your goals."
        keywords="video production guides, video strategy, social media video, business systems video, evergreen content, cinematic video"
      />
      <Navigation />
      
      <main className="min-h-screen bg-video-white">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="animate-fade-in">
              <div className="flex justify-center mb-8">
                <div className="flex items-center gap-4 text-primary">
                  <Zap className="w-8 h-8" />
                  <Users className="w-8 h-8" />
                  <Zap className="w-8 h-8" />
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-corporate-dark mb-6">
                Meet the 
                <span className="text-gradient-1"> Palmer House Pals</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-corporate-gray mb-8 max-w-4xl mx-auto leading-relaxed">
                Your personalized video production guides. Each Pal specializes in different types of video solutions, 
                ensuring you get exactly what you need to achieve your goals.
              </p>
              
              <Button
                onClick={() => navigate('/contact')}
                size="xl"
                className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 px-12 py-6 text-xl"
              >
                Find Your Perfect Match
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* How to Choose Section */}
        <section className="py-16 bg-corporate-light/30">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-corporate-dark mb-8">
              How to Choose Your Perfect Pal
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <CardContent className="p-0 text-center">
                  <div className="w-12 h-12 bg-social-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-corporate-dark">Think About Your Goals</h3>
                  <p className="text-corporate-gray">What do you want to achieve with video? Quick social content, business systems, or cinematic storytelling?</p>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardContent className="p-0 text-center">
                  <div className="w-12 h-12 bg-social-cyan rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-corporate-dark">Browse Each Pal</h3>
                  <p className="text-corporate-gray">Read about their personality, strengths, and what they do best to find your match.</p>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardContent className="p-0 text-center">
                  <div className="w-12 h-12 bg-social-purple rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-corporate-dark">Start Your Journey</h3>
                  <p className="text-corporate-gray">Click to explore their packages or book a strategy call to get started.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Meet the Pals Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-center text-corporate-dark mb-16">
              Choose Your Video Production Guide
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {PALS_DATA.map((pal) => (
                <Card 
                  key={pal.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate(`/pals/${pal.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2">
                      {/* Character Image */}
                      <div 
                        className="p-8 flex items-center justify-center"
                        style={{ backgroundColor: pal.colorScheme.bg }}
                      >
                        <OptimizedImage
                          src={pal.image}
                          alt={`${pal.name} character illustration`}
                          className="w-full max-w-48 h-auto group-hover:scale-105 transition-transform duration-300"
                          width={200}
                          height={200}
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="p-8 flex flex-col justify-center">
                        <h3 
                          className="text-2xl lg:text-3xl font-bold mb-2"
                          style={{ color: pal.colorScheme.primary }}
                        >
                          {pal.name}
                        </h3>
                        <p className="text-lg text-corporate-gray mb-4">
                          {pal.tagline}
                        </p>
                        
                        {/* Top 3 Strengths */}
                        <div className="space-y-2 mb-6">
                          {pal.strengths.slice(0, 3).map((strength, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: pal.colorScheme.secondary }} />
                              <span className="text-sm text-corporate-gray">{strength}</span>
                            </div>
                          ))}
                        </div>
                        
                        <Button
                          variant="outline"
                          className="mt-auto group-hover:scale-105 transition-transform duration-300"
                          style={{ borderColor: pal.colorScheme.primary, color: pal.colorScheme.primary }}
                        >
                          Meet {pal.name}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-corporate-dark mb-6">
              Still Not Sure Which Pal is Right?
            </h2>
            <p className="text-xl text-corporate-gray mb-8 max-w-2xl mx-auto">
              No problem! Book a free strategy call and we'll help you find the perfect video solution for your unique needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                onClick={() => navigate('/contact')}
                size="xl"
                className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 px-12 py-6 text-xl"
              >
                Book Free Strategy Call
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
              <Button 
                onClick={() => navigate('/video-packages')}
                variant="outline"
                size="xl"
                className="px-12 py-6 text-xl border-2 border-primary text-primary"
              >
                Browse All Packages
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-corporate-gray/20">
              <p className="text-sm text-corporate-gray">
                <strong>Free Strategy Call:</strong> 30-minute consultation to understand your goals and recommend the best approach
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}