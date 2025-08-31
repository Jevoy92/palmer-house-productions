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
  ChevronUp,
  Play,
  HelpCircle,
  GraduationCap,
  Building,
  Hospital,
  Crown
} from 'lucide-react';

const SystemPal = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [employees, setEmployees] = useState(50);
  const [trainingHours, setTrainingHours] = useState(40);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [supportTickets, setSupportTickets] = useState(200);

  const toggleFAQ = (num: number) => {
    setOpenFAQ(openFAQ === num ? null : num);
  };

  const calculateROI = () => {
    const trainingSavings = Math.round(employees * trainingHours * hourlyRate * 0.75);
    const supportSavings = Math.round(supportTickets * 12 * 10 * 0.6);
    const totalROI = trainingSavings + supportSavings;
    return { trainingSavings, supportSavings, totalROI };
  };

  const { trainingSavings, supportSavings, totalROI } = calculateROI();

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative min-h-[800px] bg-gradient-to-r from-social-cyan via-social-blue to-social-purple overflow-hidden pt-20">
          {/* Background floating elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-4 md:left-10 w-16 h-16 md:w-32 md:h-32 bg-white/10 rounded-full float-animation"></div>
            <div className="absolute top-40 right-4 md:right-20 w-12 h-12 md:w-24 md:h-24 bg-white/20 rounded-full float-animation" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-32 left-1/4 w-20 h-20 md:w-40 md:h-40 bg-white/15 rounded-full float-animation" style={{animationDelay: '4s'}}></div>
            <div className="absolute bottom-20 right-4 md:right-10 w-14 h-14 md:w-28 md:h-28 bg-white/25 rounded-full float-animation" style={{animationDelay: '1s'}}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative z-10">
            {/* Left Content */}
            <div className="flex-1 max-w-2xl">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Settings className="text-white h-6 w-6" />
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <GraduationCap className="text-white h-6 w-6" />
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <HelpCircle className="text-white h-6 w-6" />
                  </div>
                </div>
                <h2 className="text-white text-xl font-semibold mb-2">Backend Video Systems</h2>
                <p className="text-white/80 text-sm leading-relaxed">
                  Streamline your operations with comprehensive training, onboarding, and FAQ video systems that scale with your business growth.
                </p>
                <Button className="mt-6 bg-white/20 text-white hover:bg-white/30 transition-colors">
                  Explore System Solutions
                </Button>
              </div>
            </div>
            
            {/* Center 3D Character */}
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <img 
                  className="w-80 h-80 object-contain" 
                  src="/lovable-uploads/1d3c7a2a-e5cb-4900-9b76-9eadb6620973.png" 
                  alt="System Pal - professional character specializing in backend video systems"
                />
                
                {/* Floating System Info Card */}
                <div className="absolute -top-4 -right-8 bg-background rounded-2xl p-4 video-shadow-lg floating-card">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-social-blue rounded-full flex items-center justify-center">
                      <Settings className="text-white h-4 w-4" />
                    </div>
                    <span className="font-semibold text-foreground">System Pal</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Your backend video systems specialist ready to optimize your operations</p>
                </div>
              </div>
            </div>
            
            {/* Right Floating Cards */}
            <div className="flex-1 relative">
              {/* Training Efficiency Card */}
              <div className="absolute top-8 right-0 bg-background rounded-2xl p-6 video-shadow-lg floating-card max-w-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-social-blue rounded-full flex items-center justify-center">
                      <GraduationCap className="text-white h-4 w-4" />
                    </div>
                    <span className="font-semibold text-foreground">Training Efficiency</span>
                  </div>
                  <span className="bg-social-blue/10 text-social-blue px-2 py-1 rounded-full text-xs font-medium">Active</span>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">75%</div>
                <p className="text-muted-foreground text-sm">Reduction in onboarding time with video systems</p>
              </div>
              
              {/* System Cards */}
              <div className="absolute top-64 right-8 space-y-4">
                <div className="bg-gradient-to-r from-social-blue to-social-purple rounded-2xl p-4 text-white video-shadow-lg floating-card">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <Play className="h-3 w-3" />
                    </div>
                    <span className="text-sm font-medium">Training Videos</span>
                  </div>
                  <div className="text-2xl font-bold">90%</div>
                  <p className="text-xs opacity-90">Knowledge retention rate</p>
                </div>
                
                <div className="bg-gradient-to-r from-social-purple to-social-pink rounded-2xl p-4 text-white video-shadow-lg floating-card">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <HelpCircle className="h-3 w-3" />
                    </div>
                    <span className="text-sm font-medium">FAQ Systems</span>
                  </div>
                  <div className="text-2xl font-bold">60%</div>
                  <p className="text-xs opacity-90">Reduction in support tickets</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Email Signup */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-background rounded-full p-2 video-shadow-lg flex items-center space-x-4">
              <input 
                type="email" 
                placeholder="Enter your email for system consultation" 
                className="px-6 py-3 flex-1 min-w-80 outline-none text-foreground bg-transparent"
              />
              <Button className="bg-foreground text-background px-8 py-3 rounded-full hover:bg-foreground/90 font-medium">
                Build Your System
              </Button>
            </div>
          </div>
          
          {/* Main Headline */}
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Backend video<br />
              <span className="text-social-yellow">systems that scale</span><br />
              your operations
            </h1>
          </div>
        </section>

        {/* System Overview */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">System Pal Solutions</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Comprehensive backend video systems designed to streamline your operations and enhance team productivity</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Training Systems */}
              <div className="bg-gradient-to-br from-social-blue/5 to-social-purple/10 rounded-3xl p-8 video-shadow hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-gradient-to-r from-social-blue to-social-purple rounded-2xl flex items-center justify-center mb-6">
                  <GraduationCap className="text-white h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Training Systems</h3>
                <p className="text-muted-foreground mb-6">Comprehensive video training programs that accelerate learning and ensure consistent knowledge transfer.</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <Check className="text-social-blue h-4 w-4" />
                    <span>Interactive Learning Modules</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="text-social-blue h-4 w-4" />
                    <span>Progress Tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="text-social-blue h-4 w-4" />
                    <span>Certification Systems</span>
                  </li>
                </ul>
              </div>
              
              {/* Onboarding Systems */}
              <div className="bg-gradient-to-br from-social-purple/5 to-social-pink/10 rounded-3xl p-8 video-shadow hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-gradient-to-r from-social-purple to-social-pink rounded-2xl flex items-center justify-center mb-6">
                  <Users className="text-white h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Onboarding Systems</h3>
                <p className="text-muted-foreground mb-6">Streamlined onboarding experiences that get new team members productive faster than ever.</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <Check className="text-social-purple h-4 w-4" />
                    <span>Welcome Video Series</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="text-social-purple h-4 w-4" />
                    <span>Role-Specific Training</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="text-social-purple h-4 w-4" />
                    <span>Cultural Integration</span>
                  </li>
                </ul>
              </div>
              
              {/* FAQ Systems */}
              <div className="bg-gradient-to-br from-social-pink/5 to-social-yellow/10 rounded-3xl p-8 video-shadow hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-gradient-to-r from-social-pink to-social-yellow rounded-2xl flex items-center justify-center mb-6">
                  <HelpCircle className="text-white h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">FAQ Systems</h3>
                <p className="text-muted-foreground mb-6">Video-based FAQ libraries that reduce support load and provide instant answers to common questions.</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <Check className="text-social-pink h-4 w-4" />
                    <span>Searchable Video Library</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="text-social-pink h-4 w-4" />
                    <span>Auto-Generated Transcripts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="text-social-pink h-4 w-4" />
                    <span>Analytics Dashboard</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="py-20 bg-muted/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Calculate Your ROI</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">See how much time and money you can save with System Pal video solutions</p>
            </div>
            
            <div className="bg-gradient-to-br from-social-blue/5 to-social-purple/10 rounded-3xl p-12 video-shadow">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-8">Investment Calculator</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-foreground font-medium mb-2">Number of Employees</label>
                      <input 
                        type="number" 
                        value={employees}
                        onChange={(e) => setEmployees(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-social-blue focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-foreground font-medium mb-2">Current Training Hours per Employee</label>
                      <input 
                        type="number" 
                        value={trainingHours}
                        onChange={(e) => setTrainingHours(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-social-blue focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-foreground font-medium mb-2">Average Hourly Rate ($)</label>
                      <input 
                        type="number" 
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-social-blue focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-foreground font-medium mb-2">Support Tickets per Month</label>
                      <input 
                        type="number" 
                        value={supportTickets}
                        onChange={(e) => setSupportTickets(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:border-social-blue focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-background rounded-3xl p-8 video-shadow">
                  <h4 className="text-2xl font-bold text-foreground mb-6">Your Potential Savings</h4>
                  
                  <div className="space-y-6">
                    <div className="bg-social-blue/10 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">Annual Training Savings</span>
                        <span className="text-2xl font-bold text-social-blue">${trainingSavings.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">75% reduction in training time</p>
                    </div>
                    
                    <div className="bg-social-purple/10 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">Support Cost Reduction</span>
                        <span className="text-2xl font-bold text-social-purple">${supportSavings.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">60% fewer support tickets</p>
                    </div>
                    
                    <div className="bg-social-pink/10 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">Total Annual ROI</span>
                        <span className="text-3xl font-bold text-social-pink">${totalROI.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Return on investment in first year</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <Check className="text-green-500 h-6 w-6" />
                      <div>
                        <div className="font-semibold text-foreground">System Pal pays for itself in</div>
                        <div className="text-2xl font-bold text-green-600">2.4 months</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">System Pal Success Stories</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Real results from companies that transformed their operations with our video systems</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-social-blue to-social-purple rounded-3xl p-8 text-white video-shadow">
                <div className="flex items-center space-x-3 mb-6">
                  <Building className="h-6 w-6" />
                  <span className="text-lg font-semibold">TechCorp Solutions</span>
                </div>
                <div className="mb-6">
                  <div className="text-4xl font-bold mb-2">80%</div>
                  <div className="text-white/80">Faster onboarding</div>
                </div>
                <p className="text-white/80 mb-6">"System Pal reduced our new hire training from 2 weeks to 3 days while improving knowledge retention significantly."</p>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Marcus Johnson</div>
                    <div className="text-white/70 text-sm">HR Director</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-social-purple to-social-pink rounded-3xl p-8 text-white video-shadow">
                <div className="flex items-center space-x-3 mb-6">
                  <Hospital className="h-6 w-6" />
                  <span className="text-lg font-semibold">MedHealth Network</span>
                </div>
                <div className="mb-6">
                  <div className="text-4xl font-bold mb-2">65%</div>
                  <div className="text-white/80">Fewer help desk tickets</div>
                </div>
                <p className="text-white/80 mb-6">"Our FAQ video system handles most common questions automatically, freeing up our support team for complex issues."</p>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Dr. Sarah Chen</div>
                    <div className="text-white/70 text-sm">IT Manager</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-social-pink to-social-yellow rounded-3xl p-8 text-white video-shadow">
                <div className="flex items-center space-x-3 mb-6">
                  <GraduationCap className="h-6 w-6" />
                  <span className="text-lg font-semibold">EduTech Academy</span>
                </div>
                <div className="mb-6">
                  <div className="text-4xl font-bold mb-2">92%</div>
                  <div className="text-white/80">Training completion rate</div>
                </div>
                <p className="text-white/80 mb-6">"Interactive video training increased our completion rates and student satisfaction scores dramatically."</p>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">David Park</div>
                    <div className="text-white/70 text-sm">Training Director</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Pricing */}
        <section className="py-20 bg-muted/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">System Pal Packages</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Choose the perfect system solution for your organization's needs</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Starter Package */}
              <div className="bg-background rounded-3xl p-8 video-shadow hover:scale-105 transition-transform border-2 border-transparent hover:border-social-blue">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-social-blue/80 to-social-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Play className="text-white h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Starter System</h3>
                  <div className="text-4xl font-bold text-foreground mb-2">$2,497</div>
                  <div className="text-muted-foreground">one-time setup</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-3">
                    <Check className="text-social-blue h-5 w-5" />
                    <span className="text-muted-foreground">Basic training system</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-social-blue h-5 w-5" />
                    <span className="text-muted-foreground">Up to 10 training videos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-social-blue h-5 w-5" />
                    <span className="text-muted-foreground">Progress tracking</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-social-blue h-5 w-5" />
                    <span className="text-muted-foreground">Basic analytics</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-social-blue h-5 w-5" />
                    <span className="text-muted-foreground">Email support</span>
                  </li>
                </ul>
                
                <Button asChild className="w-full bg-gradient-to-r from-social-blue/80 to-social-blue text-white py-4 rounded-2xl font-semibold hover:scale-105 transition-transform">
                  <Link to="/contact">Start with Basics</Link>
                </Button>
              </div>
              
              {/* Professional Package */}
              <div className="bg-background rounded-3xl p-8 video-shadow hover:scale-105 transition-transform border-2 border-social-blue relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-social-blue text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                </div>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-social-blue to-social-purple rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="text-white h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Professional System</h3>
                  <div className="text-4xl font-bold text-foreground mb-2">$4,997</div>
                  <div className="text-muted-foreground">one-time setup</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-3">
                    <Check className="text-social-blue h-5 w-5" />
                    <span className="text-muted-foreground">Complete training system</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-social-blue h-5 w-5" />
                    <span className="text-muted-foreground">Up to 25 training videos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-social-blue h-5 w-5" />
                    <span className="text-muted-foreground">Onboarding system</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-social-blue h-5 w-5" />
                    <span className="text-muted-foreground">FAQ video library</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-social-blue h-5 w-5" />
                    <span className="text-muted-foreground">Advanced analytics</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-social-blue h-5 w-5" />
                    <span className="text-muted-foreground">Priority support</span>
                  </li>
                </ul>
                
                <Button asChild className="w-full bg-gradient-to-r from-social-blue to-social-purple text-white py-4 rounded-2xl font-semibold hover:scale-105 transition-transform">
                  <Link to="/contact">Go Professional</Link>
                </Button>
              </div>
              
              {/* Enterprise Package */}
              <div className="bg-background rounded-3xl p-8 video-shadow hover:scale-105 transition-transform border-2 border-transparent hover:border-social-purple">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-social-purple to-social-pink rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Crown className="text-white h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Enterprise System</h3>
                  <div className="text-4xl font-bold text-foreground mb-2">$9,997</div>
                  <div className="text-muted-foreground">one-time setup</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-3">
                    <Check className="text-social-purple h-5 w-5" />
                    <span className="text-muted-foreground">Complete system suite</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-social-purple h-5 w-5" />
                    <span className="text-muted-foreground">Unlimited training videos</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-social-purple h-5 w-5" />
                    <span className="text-muted-foreground">Advanced onboarding</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-social-purple h-5 w-5" />
                    <span className="text-muted-foreground">AI-powered FAQ system</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-social-purple h-5 w-5" />
                    <span className="text-muted-foreground">Custom integrations</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="text-social-purple h-5 w-5" />
                    <span className="text-muted-foreground">Dedicated support</span>
                  </li>
                </ul>
                
                <Button asChild className="w-full bg-gradient-to-r from-social-purple to-social-pink text-white py-4 rounded-2xl font-semibold hover:scale-105 transition-transform">
                  <Link to="/contact">Go Enterprise</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Process */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Implementation Process</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Our proven 4-step process ensures smooth integration of your new video systems</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-background rounded-3xl p-8 video-shadow text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-social-blue to-social-purple rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Discovery & Planning</h3>
                <p className="text-muted-foreground mb-6">We analyze your current processes and identify optimization opportunities.</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Process audit</li>
                  <li>• Stakeholder interviews</li>
                  <li>• System requirements</li>
                </ul>
              </div>
              
              <div className="bg-background rounded-3xl p-8 video-shadow text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-social-purple to-social-pink rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Content Creation</h3>
                <p className="text-muted-foreground mb-6">Professional video production tailored to your specific needs and brand.</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Script development</li>
                  <li>• Video production</li>
                  <li>• Post-production</li>
                </ul>
              </div>
              
              <div className="bg-background rounded-3xl p-8 video-shadow text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-social-pink to-social-yellow rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">System Integration</h3>
                <p className="text-muted-foreground mb-6">Seamless integration with your existing tools and workflows.</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Platform setup</li>
                  <li>• User training</li>
                  <li>• Testing & QA</li>
                </ul>
              </div>
              
              <div className="bg-background rounded-3xl p-8 video-shadow text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-social-yellow to-social-cyan rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">4</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Launch & Support</h3>
                <p className="text-muted-foreground mb-6">Full deployment with ongoing support and optimization.</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• System launch</li>
                  <li>• Performance monitoring</li>
                  <li>• Continuous optimization</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <div className="bg-muted/5 rounded-3xl p-8 video-shadow max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-foreground mb-4">Timeline: 4-6 Weeks</h3>
                <p className="text-muted-foreground mb-6">From initial consultation to full system deployment</p>
                <Button asChild className="bg-gradient-to-r from-social-blue to-social-purple text-white px-8 py-4 rounded-2xl hover:scale-105 transition-transform font-semibold">
                  <Link to="/contact">Start Implementation</Link>
                </Button>
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
        <section className="py-20 bg-gradient-to-r from-social-blue via-social-purple to-social-pink text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Scale Your Operations?</h2>
            <p className="text-xl mb-8 opacity-90">Join the companies that have already transformed their systems with backend video solutions.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">Proven Systems</div>
                <div className="text-white/80">Battle-tested processes</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">Easy Adoption</div>
                <div className="text-white/80">User-friendly interfaces</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">Ongoing Support</div>
                <div className="text-white/80">Always here to help</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="bg-white text-social-blue hover:bg-white/90">
                <Link to="/contact">Book Strategy Call</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-social-blue">
                <Link to="/video-packages">View Training Samples</Link>
              </Button>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="text-white h-6 w-6" />
                </div>
                <div>
                  <div className="text-lg font-semibold">Limited Time Offer</div>
                  <div className="text-white/80">Free process audit with any package booking</div>
                </div>
              </div>
              <p className="text-sm text-white/70">Book your strategy call this month and receive a complimentary analysis of your current systems (valued at $500).</p>
            </div>
          </div>
        </section>

        {/* Related Pals Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Meet the Other Pals</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Each Pal specializes in different aspects of video content to serve your unique needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Reel Pal */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center hover:scale-105 transition-transform video-shadow">
                <img 
                  className="w-24 h-24 mx-auto rounded-full mb-6 object-cover" 
                  src="/lovable-uploads/dcada800-4488-4970-82eb-2c356d3e789d.png" 
                  alt="Reel Pal - social media content specialist" 
                />
                <h3 className="text-2xl font-bold text-foreground mb-4">Reel Pal</h3>
                <p className="text-muted-foreground mb-6">Short-form social content and viral marketing specialist</p>
                <Button asChild variant="outline" className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white">
                  <Link to="/reel-pal">Learn More</Link>
                </Button>
              </div>
              
              {/* Evergreen Pal */}
              <div className="bg-gradient-to-br from-social-blue/5 to-social-cyan/10 rounded-2xl p-8 text-center hover:scale-105 transition-transform video-shadow">
                <img 
                  className="w-24 h-24 mx-auto rounded-full mb-6 object-cover" 
                  src="/lovable-uploads/c70f84e1-b8ab-4479-a04d-7793a76d402f.png" 
                  alt="Evergreen Pal - long-form educational content specialist" 
                />
                <h3 className="text-2xl font-bold text-foreground mb-4">Evergreen Pal</h3>
                <p className="text-muted-foreground mb-6">Long-form educational content and thought leadership specialist</p>
                <Button asChild variant="outline" className="border-social-blue text-social-blue hover:bg-social-blue hover:text-white">
                  <Link to="/evergreen-pal">Learn More</Link>
                </Button>
              </div>
              
              {/* Spotlight Pal */}
              <div className="bg-gradient-to-br from-social-purple/5 to-social-pink/10 rounded-2xl p-8 text-center hover:scale-105 transition-transform video-shadow">
                <img 
                  className="w-24 h-24 mx-auto rounded-full mb-6 object-cover" 
                  src="/lovable-uploads/c5bbccdc-e50d-4422-8661-75baebb2813c.png" 
                  alt="Spotlight Pal - premium brand content specialist" 
                />
                <h3 className="text-2xl font-bold text-foreground mb-4">Spotlight Pal</h3>
                <p className="text-muted-foreground mb-6">Premium brand storytelling and executive content specialist</p>
                <Button asChild variant="outline" className="border-social-purple text-social-purple hover:bg-social-purple hover:text-white">
                  <Link to="/spotlight-pal">Learn More</Link>
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