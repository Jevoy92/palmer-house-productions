import React, { useState } from 'react';
import { MetaTags } from '@/components/seo/MetaTags';
import { StructuredData } from '@/components/seo/StructuredData';

const TestPage = () => {
  const [formData, setFormData] = useState({
    employees: 50,
    trainingHours: 40,
    hourlyRate: 25,
    supportTickets: 200
  });

  const calculateROI = () => {
    const { employees, trainingHours, hourlyRate, supportTickets } = formData;
    
    // Training savings (75% reduction)
    const currentTrainingCost = employees * trainingHours * hourlyRate;
    const trainingSavings = currentTrainingCost * 0.75;
    
    // Support cost reduction (60% fewer tickets, $10 per ticket cost)
    const currentSupportCost = supportTickets * 12 * 10; // Monthly tickets * 12 months * $10 per ticket
    const supportSavings = currentSupportCost * 0.6;
    
    const totalROI = trainingSavings + supportSavings;
    
    // Update the display values
    document.getElementById('training-savings')!.textContent = `$${trainingSavings.toLocaleString()}`;
    document.getElementById('support-savings')!.textContent = `$${supportSavings.toLocaleString()}`;
    document.getElementById('total-roi')!.textContent = `$${totalROI.toLocaleString()}`;
  };

  const handleInputChange = (field: string, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <MetaTags 
        title="System Pal Test Page - Palmer House Video"
        description="Test page for System Pal video systems design"
      />
      
      <StructuredData 
        type="services"
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#00d4ff] to-[#0099ff] rounded-xl flex items-center justify-center">
                <i className="fas fa-video text-white text-lg"></i>
              </div>
              <span className="text-2xl font-bold text-gray-900">Palmer House</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <span className="text-gray-600 hover:text-[#00d4ff] transition-colors cursor-pointer">Services</span>
              <span className="text-[#00d4ff] font-medium cursor-pointer">System Pal</span>
              <span className="text-gray-600 hover:text-[#00d4ff] transition-colors cursor-pointer">Portfolio</span>
              <span className="text-gray-600 hover:text-[#00d4ff] transition-colors cursor-pointer">Pricing</span>
              <span className="text-gray-600 hover:text-[#00d4ff] transition-colors cursor-pointer">Contact</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="hidden md:block text-gray-600 hover:text-[#00d4ff] transition-colors">
                <i className="fab fa-discord text-xl"></i>
              </button>
              <button className="hidden md:block text-gray-600 hover:text-[#00d4ff] transition-colors">
                <i className="fab fa-telegram text-xl"></i>
              </button>
              <button className="bg-[#1a1a1a] text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors font-medium">
                Get Started
              </button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative h-[800px] bg-gradient-to-br from-[#00d4ff] via-[#0099ff] to-[#0066ff] overflow-hidden pt-20">
          <div className="absolute inset-0">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
              {/* Left Content */}
              <div className="flex-1 max-w-2xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <i className="fas fa-cogs text-white text-lg"></i>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <i className="fas fa-graduation-cap text-white text-lg"></i>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <i className="fas fa-question-circle text-white text-lg"></i>
                    </div>
                  </div>
                  <h2 className="text-white text-xl font-semibold mb-2">Backend Video Systems</h2>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Streamline your operations with comprehensive training, onboarding, and FAQ video systems that scale with your business growth.
                  </p>
                  <button className="mt-6 bg-white/20 text-white px-6 py-2 rounded-lg hover:bg-white/30 transition-colors">
                    Explore System Solutions
                  </button>
                </div>
              </div>
              
              {/* Center 3D Character */}
              <div className="flex-1 flex justify-center">
                <div className="relative">
                  <img 
                    className="w-80 h-80 object-contain" 
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/991c9b35a9-2fffd8bbac853f227c2d.png" 
                    alt="3D cartoon professional woman in blue business suit holding tablet, friendly smile, modern 3D render style, corporate training theme"
                  />
                  
                  {/* Floating System Info Card */}
                  <div className="absolute -top-4 -right-8 bg-white rounded-2xl p-4 shadow-2xl floating-card">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-cogs text-white text-sm"></i>
                      </div>
                      <span className="font-semibold text-gray-900">System Pal</span>
                    </div>
                    <p className="text-gray-600 text-sm">Your backend video systems specialist ready to optimize your operations</p>
                  </div>
                </div>
              </div>
              
              {/* Right Floating Cards */}
              <div className="flex-1 relative">
                {/* Training Efficiency Card */}
                <div className="absolute top-8 right-0 bg-white rounded-2xl p-6 shadow-2xl floating-card max-w-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <i className="fas fa-graduation-cap text-white text-sm"></i>
                      </div>
                      <span className="font-semibold text-gray-900">Training Efficiency</span>
                    </div>
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">Active</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">75%</div>
                  <p className="text-gray-600 text-sm">Reduction in onboarding time with video systems</p>
                </div>
                
                {/* System Cards */}
                <div className="absolute top-64 right-8 space-y-4">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-4 text-white shadow-2xl floating-card">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <i className="fas fa-play text-xs"></i>
                      </div>
                      <span className="text-sm font-medium">Training Videos</span>
                    </div>
                    <div className="text-2xl font-bold">90%</div>
                    <p className="text-xs opacity-90">Knowledge retention rate</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-4 text-white shadow-2xl floating-card">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <i className="fas fa-question text-xs"></i>
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
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="bg-white rounded-full p-2 shadow-2xl flex items-center space-x-4">
                <input 
                  type="email" 
                  placeholder="Enter your email for system consultation" 
                  className="px-6 py-3 flex-1 min-w-80 outline-none text-gray-700"
                />
                <button className="bg-[#1a1a1a] text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium">
                  Build Your System
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Headline */}
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Backend video<br/>
              <span className="text-yellow-300">systems that scale</span><br/>
              your operations
            </h1>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Calculate Your ROI</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">See how much time and money you can save with System Pal video solutions</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 shadow-lg">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-8">Investment Calculator</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Number of Employees</label>
                      <input 
                        type="number" 
                        value={formData.employees}
                        onChange={(e) => handleInputChange('employees', Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Current Training Hours per Employee</label>
                      <input 
                        type="number" 
                        value={formData.trainingHours}
                        onChange={(e) => handleInputChange('trainingHours', Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Average Hourly Rate ($)</label>
                      <input 
                        type="number" 
                        value={formData.hourlyRate}
                        onChange={(e) => handleInputChange('hourlyRate', Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Support Tickets per Month</label>
                      <input 
                        type="number" 
                        value={formData.supportTickets}
                        onChange={(e) => handleInputChange('supportTickets', Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <button 
                    onClick={calculateROI}
                    className="mt-8 w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 rounded-xl font-semibold hover:scale-105 transition-transform"
                  >
                    Calculate Savings
                  </button>
                </div>
                
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <h4 className="text-2xl font-bold text-gray-900 mb-6">Your Potential Savings</h4>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-700">Annual Training Savings</span>
                        <span id="training-savings" className="text-2xl font-bold text-blue-500">$37,500</span>
                      </div>
                      <p className="text-sm text-gray-600">75% reduction in training time</p>
                    </div>
                    
                    <div className="bg-indigo-50 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-700">Support Cost Reduction</span>
                        <span id="support-savings" className="text-2xl font-bold text-indigo-500">$24,000</span>
                      </div>
                      <p className="text-sm text-gray-600">60% fewer support tickets</p>
                    </div>
                    
                    <div className="bg-purple-50 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-700">Total Annual ROI</span>
                        <span id="total-roi" className="text-3xl font-bold text-purple-500">$61,500</span>
                      </div>
                      <p className="text-sm text-gray-600">Return on investment in first year</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <i className="fas fa-check-circle text-green-500 text-xl"></i>
                      <div>
                        <div className="font-semibold text-gray-900">System Pal pays for itself in</div>
                        <div className="text-2xl font-bold text-green-600">2.4 months</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TestPage;