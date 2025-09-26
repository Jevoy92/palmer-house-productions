import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import systemPalImage from '@/assets/pals/female-system-pal-knowledge-base.png';
import systemPalCircular from '@/assets/pals/female-system-pal-circular.jpg';
import reelPalHeadshot from '@/assets/pals/female-reel-pal-headshot.jpg';
import evergreenPalHeadshot from '@/assets/pals/male-evergreen-pal-headshot-3.jpg';
import spotlightPalHeadshot from '@/assets/pals/female-spotlight-pal-headshot.jpg';
import { 
  Settings, 
  Users, 
  BookOpen, 
  PlayCircle, 
  Check, 
  MessageCircle, 
  Lightbulb, 
  Video, 
  Rocket,
  ChevronDown,
  ChevronUp,
  Monitor,
  Database
} from 'lucide-react';

const SystemPal = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (num: number) => {
    setOpenFAQ(openFAQ === num ? null : num);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen relative overflow-hidden">
        {/* Static 4-Color Background Bars */}
        <div className="fixed top-0 left-0 w-full h-screen -z-10">
          <div className="w-full h-full flex">
            <div className="w-1/4 h-full bg-gradient-to-b from-orange-400 to-orange-600"></div>
            <div className="w-1/4 h-full bg-gradient-to-b from-purple-400 to-purple-600"></div>
            <div className="w-1/4 h-full bg-gradient-to-b from-green-400 to-green-600"></div>
            <div className="w-1/4 h-full bg-gradient-to-b from-blue-400 to-blue-600"></div>
          </div>
          {/* Static Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-blue-500/20"></div>
        </div>

        {/* Floating Animation Elements */}
        <div className="fixed inset-0 -z-5 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-bounce" style={{animationDuration: '3s'}}></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-300/20 rounded-full blur-lg animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-white/5 rounded-full blur-2xl animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-purple-300/10 rounded-full blur-lg animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[600px] flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100">
                <div className="bg-purple-500 text-white px-6 py-3 rounded-full text-sm font-bold w-fit mb-6 shadow-lg">🎓 SYSTEM PAL</div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">"Let's streamline your systems!"</h1>
                <p className="text-xl mb-8 text-muted-foreground">Your expert for training videos, employee onboarding, and internal system documentation that actually gets used and drives results.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-purple-500 text-white hover:bg-purple-600 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                    <Link to="/contact">🚀 Book Strategy Call</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white shadow-xl">
                    <Link to="/pals">👥 Meet All Pals</Link>
                  </Button>
                </div>
              </div>
              
              <div className="text-center relative">
                <div className="relative z-10 transform hover:scale-105 transition-all duration-500">
                  <img 
                    className="relative w-full max-w-lg mx-auto object-contain" 
                    src={systemPalImage} 
                    alt="System Pal - Your Training & Systems Expert" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">System Pal Packages</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Build video systems that streamline operations and reduce repetitive tasks.</p>
              </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Internal Assets */}
              <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-purple-500 transition-all hover:scale-105">
                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6">INTERNAL</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Internal Business Assets</h3>
                <div className="text-4xl font-bold text-purple-600 mb-6">$4,500</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-500 h-5 w-5" />
                    <span>15 videos @ 1–2 min each</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-500 h-5 w-5" />
                    <span>Onboarding & training</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-500 h-5 w-5" />
                    <span>Software walkthroughs</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-500 h-5 w-5" />
                    <span>Process & policy explainers</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-500 h-5 w-5" />
                    <span>Culture & retention content</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-500 h-5 w-5" />
                    <span>Only 4 spots available</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-purple-500 text-white hover:bg-purple-600" size="lg">
                  <Link to="/contact">Book Now</Link>
                </Button>
              </div>
              
              {/* External Assets */}
              <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-purple-500 transition-all hover:scale-105 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">MOST POPULAR</div>
                </div>
                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6 mt-4">EXTERNAL</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">External Business Assets</h3>
                <div className="text-4xl font-bold text-purple-600 mb-6">$4,500</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-500 h-5 w-5" />
                    <span>15 videos @ 1–2 min each</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-500 h-5 w-5" />
                    <span>Customer FAQ libraries</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-500 h-5 w-5" />
                    <span>Product/service explainers</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-500 h-5 w-5" />
                    <span>Testimonial capsules</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-500 h-5 w-5" />
                    <span>Behind-the-scenes content</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-500 h-5 w-5" />
                    <span>Only 5 spots available</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-purple-500 text-white hover:bg-purple-600" size="lg">
                  <Link to="/contact">Book Now</Link>
                </Button>
              </div>
              
              {/* Advanced Package */}
              <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-purple-500 transition-all hover:scale-105">
                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6">ADVANCED</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Safety & Compliance</h3>
                <div className="text-4xl font-bold text-purple-600 mb-6">$10,000+</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-500 h-5 w-5" />
                    <span>8–10 videos @ up to 5 min</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-500 h-5 w-5" />
                    <span>Safety & compliance training</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-500 h-5 w-5" />
                    <span>Sales training modules</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-500 h-5 w-5" />
                    <span>Advanced software training</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-500 h-5 w-5" />
                    <span>Regulatory compliance</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-purple-500 h-5 w-5" />
                    <span>Only 2 spots this quarter</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-purple-500 text-white hover:bg-purple-600" size="lg">
                  <Link to="/contact">Get Quote</Link>
                </Button>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">How We Work Together</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">My systematic 4-step approach ensures we create training systems that your team will actually use and love.</p>
              </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <MessageCircle className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Systems Audit</h3>
                <p className="text-muted-foreground">We analyze your current processes, identify gaps, and map out the optimal learning journey.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Lightbulb className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Content Design</h3>
                <p className="text-muted-foreground">I design engaging training modules that break down complex processes into digestible steps.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Video className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Production</h3>
                <p className="text-muted-foreground">Professional recording and editing that creates clear, engaging training content.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Rocket className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Implementation</h3>
                <p className="text-muted-foreground">Complete rollout with team training and ongoing support to ensure adoption and success.</p>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
                <p className="text-xl text-muted-foreground">Everything you need to know about working with System Pal.</p>
              </div>
            
            <div className="space-y-6">
              {[
                {
                  question: "How long does it take to implement a training system?",
                  answer: "Implementation time varies by scope. A basic training starter typically takes 2-3 weeks, while a complete system overhaul takes 6-8 weeks. Enterprise solutions are custom-timed based on your specific needs."
                },
                {
                  question: "Do you provide ongoing support after implementation?",
                  answer: "Yes! All packages include support periods. Foundation includes initial support, Complete includes extended support, and Enterprise includes ongoing maintenance options. I'm here to ensure your team adopts and succeeds with the new systems."
                },
                {
                  question: "Can you integrate with our existing learning management system?",
                  answer: "Absolutely! I work with most major LMS platforms and can also help you set up a new system if needed. The goal is to create a seamless experience that works with your existing workflow."
                },
                {
                  question: "What if our processes change after the training is created?",
                  answer: "That's completely normal! I build flexibility into all training systems and offer update packages to keep your content current as your business evolves."
                },
                {
                  question: "How do you measure training effectiveness?",
                  answer: "I include analytics and assessment tools to track completion rates, comprehension, and performance improvements. You'll get clear data on how well your team is learning and where there might be gaps."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-background rounded-2xl p-8">
                  <div 
                    className="flex justify-between items-center cursor-pointer" 
                    onClick={() => toggleFAQ(index + 1)}
                  >
                    <h3 className="text-xl font-bold text-foreground">{faq.question}</h3>
                    {openFAQ === index + 1 ? (
                      <ChevronUp className="text-muted-foreground h-6 w-6" />
                    ) : (
                      <ChevronDown className="text-muted-foreground h-6 w-6" />
                    )}
                  </div>
                  {openFAQ === index + 1 && (
                    <div className="mt-6 text-muted-foreground">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <img 
                className="w-32 h-32 mx-auto rounded-full border-4 border-purple-200 object-cover object-center" 
                src={systemPalCircular} 
                alt="System Pal - Professional female character with glasses and brown hair in business attire, representing training and knowledge management expertise" 
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Ready to Streamline with System Pal?</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-muted-foreground">Let's create training systems that your team will actually use and love. Book a strategy call and let's turn your processes into powerful learning experiences.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                <div className="text-2xl font-bold text-purple-600 mb-2">Proven Systems</div>
                <p className="text-sm text-muted-foreground">Training approaches that reduce onboarding time by up to 50%</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <div className="text-2xl font-bold text-blue-600 mb-2">Easy Adoption</div>
                <p className="text-sm text-muted-foreground">Systems designed for high engagement and team buy-in</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                <div className="text-2xl font-bold text-green-600 mb-2">Ongoing Support</div>
                <p className="text-sm text-muted-foreground">Dedicated guidance to ensure long-term success</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-purple-500 text-white hover:bg-purple-600">
                <a 
                  href="https://palmerhouseproductions.zohobookings.com/#/4740771000000078004"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Your Strategy Call
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white">
                <Link to="/services/diy-downloads">View Training Samples</Link>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">🎯 This month: Get a FREE process audit with any package booking!</p>
          </div>
        </section>

        {/* Related Pals Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Meet My Fellow Pals</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Need more than just training systems? Check out my fellow Palmer House Pals who can help with other aspects of your video journey.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-orange-500 transition-all hover:scale-105">
                  <div className="mb-6">
                    <img 
                      className="w-24 h-24 mx-auto rounded-full object-cover object-center border-4 border-orange-200" 
                      src={reelPalHeadshot} 
                      alt="Female Reel Pal - Social media content creator in orange hoodie" 
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Reel Pal</h3>
                  <p className="text-muted-foreground mb-4">Perfect for social media content and short-form videos</p>
                  <Button asChild className="bg-yellow-500 text-white hover:bg-yellow-600">
                    <Link to="/reel-pal">🎥 Meet Reel Pal</Link>
                  </Button>
                </div>
                
                <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-green-500 transition-all hover:scale-105">
                  <div className="mb-6">
                    <img 
                      className="w-24 h-24 mx-auto rounded-full object-cover object-center border-4 border-green-200" 
                      src={evergreenPalHeadshot} 
                      alt="Male Evergreen Pal - Authority building expert in blue cardigan" 
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Evergreen Pal</h3>
                  <p className="text-muted-foreground mb-4">Ideal for long-term YouTube growth and authority building</p>
                  <Button asChild className="bg-green-600 text-white hover:bg-green-700">
                    <Link to="/evergreen-pal">🌱 Meet Evergreen Pal</Link>
                  </Button>
                </div>
                
                <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-red-500 transition-all hover:scale-105">
                  <div className="mb-6">
                    <img 
                      className="w-24 h-24 mx-auto rounded-full object-cover object-center border-4 border-red-200" 
                      src={spotlightPalHeadshot} 
                      alt="Female Spotlight Pal - Cinematic production expert with purple hair" 
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Spotlight Pal</h3>
                  <p className="text-muted-foreground mb-4">Your go-to for cinematic brand films and premium content</p>
                  <Button asChild className="bg-red-600 text-white hover:bg-red-700">
                    <Link to="/spotlight-pal">🎬 Meet Spotlight Pal</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SystemPal;
