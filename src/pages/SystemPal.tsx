import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
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
  ChevronUp
} from 'lucide-react';

const SystemPal = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (num: number) => {
    setOpenFAQ(openFAQ === num ? null : num);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-600 to-gray-800 text-white min-h-[500px] flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mb-4">SYSTEM PAL</div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">"Let's streamline your systems!"</h1>
                <p className="text-xl mb-8 opacity-90">Your expert for training videos, employee onboarding, and internal system documentation that actually gets used and drives results.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-gray-500 text-white hover:bg-gray-600">
                    <Link to="/contact">Book a Strategy Call</Link>
                  </Button>
                </div>
              </div>
              <div className="text-center">
                <img 
                  className="w-80 h-80 mx-auto rounded-full border-4 border-white/20" 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-3499219619cfd6454f31.png" 
                  alt="cartoon character female with red hair, gray professional outfit, holding clipboard with gears and system icons" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">What I Do Best</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">From employee training to process documentation, I help you create systems that work and videos that actually get watched.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Employee Training</h3>
                <p className="text-muted-foreground">Comprehensive training videos that reduce onboarding time and improve retention.</p>
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Process Documentation</h3>
                <p className="text-muted-foreground">Clear, step-by-step videos that document your processes and standard operating procedures.</p>
              </div>
              
              <div className="bg-green-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Learning Modules</h3>
                <p className="text-muted-foreground">Interactive learning experiences that make complex topics easy to understand and remember.</p>
              </div>
              
              <div className="bg-purple-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PlayCircle className="text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Software Tutorials</h3>
                <p className="text-muted-foreground">Screen recordings and tutorials that help teams master the tools they use daily.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-20 bg-muted/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">System Pal Packages</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Build video systems that streamline operations and reduce repetitive tasks.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Internal Assets */}
              <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-gray-500 transition-all hover:scale-105">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6">INTERNAL</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Internal Business Assets</h3>
                <div className="text-4xl font-bold text-gray-600 mb-6">$4,500</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-gray-500 h-5 w-5" />
                    <span>15 videos @ 1–2 min each</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-gray-500 h-5 w-5" />
                    <span>Onboarding & training</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-gray-500 h-5 w-5" />
                    <span>Software walkthroughs</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-gray-500 h-5 w-5" />
                    <span>Process & policy explainers</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-gray-500 h-5 w-5" />
                    <span>Culture & retention content</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-gray-500 h-5 w-5" />
                    <span>Only 4 spots available</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-gray-500 text-white hover:bg-gray-600 mb-4" size="lg">
                  <Link to="/contact">Book Now</Link>
                </Button>
                <Button variant="outline" className="w-full border-2 border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white">Learn More</Button>
              </div>
              
              {/* External Assets */}
              <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-gray-500 transition-all hover:scale-105 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gray-500 text-white px-4 py-2 rounded-full text-sm font-semibold">MOST POPULAR</div>
                </div>
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6 mt-4">EXTERNAL</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">External Business Assets</h3>
                <div className="text-4xl font-bold text-gray-600 mb-6">$4,500</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-gray-500 h-5 w-5" />
                    <span>15 videos @ 1–2 min each</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-gray-500 h-5 w-5" />
                    <span>Customer FAQ libraries</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-gray-500 h-5 w-5" />
                    <span>Product/service explainers</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-gray-500 h-5 w-5" />
                    <span>Testimonial capsules</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-gray-500 h-5 w-5" />
                    <span>Behind-the-scenes content</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-gray-500 h-5 w-5" />
                    <span>Only 5 spots available</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-gray-500 text-white hover:bg-gray-600 mb-4" size="lg">
                  <Link to="/contact">Book Now</Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-2 border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white">
                  <Link to="/contact">Strategy Call</Link>
                </Button>
              </div>
              
              {/* Advanced Package */}
              <div className="bg-background rounded-2xl p-8 text-center shadow-lg border-2 border-transparent hover:border-gray-500 transition-all hover:scale-105">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold w-fit mx-auto mb-6">ADVANCED</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Safety & Compliance</h3>
                <div className="text-4xl font-bold text-gray-600 mb-6">$10,000+</div>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="text-gray-500 h-5 w-5" />
                    <span>8–10 videos @ up to 5 min</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-gray-500 h-5 w-5" />
                    <span>Safety & compliance training</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-gray-500 h-5 w-5" />
                    <span>Sales training modules</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-gray-500 h-5 w-5" />
                    <span>Advanced software training</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-gray-500 h-5 w-5" />
                    <span>Regulatory compliance</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-gray-500 h-5 w-5" />
                    <span>Only 2 spots this quarter</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-gray-500 text-white hover:bg-gray-600 mb-4" size="lg">
                  <Link to="/contact">Get Quote</Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-2 border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white">
                  <Link to="/contact">Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">How We Work Together</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">My systematic 4-step approach ensures we create training systems that your team will actually use and love.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <MessageCircle className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Systems Audit</h3>
                <p className="text-muted-foreground">We analyze your current processes, identify gaps, and map out the optimal learning journey.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Lightbulb className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Content Design</h3>
                <p className="text-muted-foreground">I design engaging training modules that break down complex processes into digestible steps.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Video className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Production</h3>
                <p className="text-muted-foreground">Professional recording and editing that creates clear, engaging training content.</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <Rocket className="text-white h-8 w-8" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Implementation</h3>
                <p className="text-muted-foreground">Complete rollout with team training and ongoing support to ensure adoption and success.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  answer: "Yes! All packages include support periods. Foundation includes 30 days, Complete includes 90 days, and Enterprise includes ongoing maintenance options. I'm here to ensure your team adopts and succeeds with the new systems."
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
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <img 
                className="w-32 h-32 mx-auto rounded-full border-4 border-gray-200" 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-3499219619cfd6454f31.png" 
                alt="cartoon character female with red hair, gray professional outfit, holding clipboard with gears and system icons" 
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Ready to Streamline with System Pal?</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-muted-foreground">Let's create training systems that your team will actually use and love. Book a strategy call and let's turn your processes into powerful learning experiences.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <div className="text-2xl font-bold text-gray-600 mb-2">Proven Systems</div>
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
              <Button asChild size="lg" className="bg-gray-500 text-white hover:bg-gray-600">
                <Link to="/contact">Book Your Strategy Call</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-gray-500 text-gray-600 hover:bg-gray-500 hover:text-white">
                <Link to="/services/diy-downloads">View Training Samples</Link>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">🎯 This month: Get a FREE process audit with any package booking!</p>
          </div>
        </section>

        {/* Related Pals Section */}
        <section className="py-20 bg-muted/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Meet My Fellow Pals</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Need more than just training systems? Check out my fellow Palmer House Pals who can help with other aspects of your video journey.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background rounded-2xl p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                <div className="mb-6">
                  <img 
                    className="w-24 h-24 mx-auto rounded-full" 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-bb993d7dd66fd010bb42.png" 
                    alt="cartoon character female with brown hair, yellow shirt, holding phone with social media icons" 
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Reel Pal</h3>
                <p className="text-muted-foreground mb-4">Perfect for social media content and short-form videos</p>
                <Button asChild className="bg-yellow-500 text-white hover:bg-yellow-600">
                  <Link to="/reel-pal">Meet Reel Pal</Link>
                </Button>
              </div>
              
              <div className="bg-background rounded-2xl p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                <div className="mb-6">
                  <img 
                    className="w-24 h-24 mx-auto rounded-full" 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/25d8c66845-772ba728bd8c24b597ce.png" 
                    alt="cartoon character female with brown hair, teal outfit, holding growing plant with video play button" 
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Evergreen Pal</h3>
                <p className="text-muted-foreground mb-4">Ideal for long-term YouTube growth and authority building</p>
                <Button asChild className="bg-green-600 text-white hover:bg-green-700">
                  <Link to="/evergreen-pal">Meet Evergreen Pal</Link>
                </Button>
              </div>
              
              <div className="bg-background rounded-2xl p-8 text-center transition-all hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                <div className="mb-6">
                  <img 
                    className="w-24 h-24 mx-auto rounded-full" 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8f0c5b28b6-3b90b01dce247861b422.png" 
                    alt="cartoon character blonde female, red blazer, holding microphone with studio lights" 
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Spotlight Pal</h3>
                <p className="text-muted-foreground mb-4">Your go-to for cinematic brand films and premium content</p>
                <Button asChild className="bg-red-600 text-white hover:bg-red-700">
                  <Link to="/spotlight-pal">Meet Spotlight Pal</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SystemPal;