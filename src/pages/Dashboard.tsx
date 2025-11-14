import { MetaTags } from '@/components/seo/MetaTags';
import { Video, User, Sparkles, Maximize, MessageCircle, Search, Mail, Bell, ChevronLeft, ChevronRight, Heart, MoreVertical, Settings, LogOut, Plus, Layers, Inbox, BookOpen, ListTodo, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LOGO } from '@/lib/branding';
import { ActivityChart } from '@/components/dashboard/ActivityChart';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleToolClick = (toolId: string) => {
    navigate(`/tools/${toolId}`);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Our 6 AI tools
  const allTools = [
    {
      id: 'content-system-builder',
      name: 'Content System Builder',
      description: 'Turn one idea into a complete content system',
      icon: Video,
      color: 'bg-pal-purple',
      badge: 'VIDEO SYSTEM',
      progress: 75,
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop'
    },
    {
      id: 'series-builder',
      name: 'Series Builder',
      description: 'Build comprehensive video series',
      icon: BookOpen,
      color: 'bg-blue-500',
      badge: 'SERIES',
      progress: 40,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop'
    },
    {
      id: 'persona-generator',
      name: 'Persona Generator',
      description: 'Define your ideal audience and brand voice',
      icon: User,
      color: 'bg-pal-blue',
      badge: 'AUDIENCE',
      progress: 60,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
    },
    {
      id: 'production-assistant',
      name: 'Production Assistant',
      description: 'Streamline your pre-production workflow',
      icon: Sparkles,
      color: 'bg-pal-green',
      badge: 'PRODUCTION',
      progress: 50,
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop'
    },
    {
      id: 'content-maximizer',
      name: 'Content Maximizer',
      description: 'Repurpose content across all platforms',
      icon: Maximize,
      color: 'bg-pal-orange',
      badge: 'MAXIMIZE',
      progress: 85,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
    },
    {
      id: 'engagement-responder',
      name: 'Engagement Responder',
      description: 'Automate community engagement',
      icon: MessageCircle,
      color: 'bg-pal-purple',
      badge: 'ENGAGEMENT',
      progress: 30,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop'
    },
  ];

  return (
    <>
      <MetaTags
        title="Dashboard | Palmer House Productions Content OS"
        description="Access your video series builder, persona generator, production assistant, and more content creation tools."
        canonicalUrl="https://www.palmerhouseproductions.com/dashboard"
      />
      
      <div className="min-h-screen bg-[#F0F2F5] p-4 lg:p-8 font-inter">
        <div className="grid grid-cols-12 gap-6 max-w-[1600px] mx-auto">
          
          {/* Left Sidebar */}
          <aside className="col-span-12 lg:col-span-2 bg-white rounded-3xl p-6 flex flex-col min-h-[95vh]">
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-brand-purple p-2 rounded-lg">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-brand-text">Palmer AI</h1>
            </div>

            <nav className="flex-grow">
              <h2 className="text-xs text-brand-gray-dark font-semibold uppercase tracking-wider mb-4">Overview</h2>
              <ul className="space-y-2">
                <li>
                  <button className="w-full flex items-center gap-4 px-4 py-3 bg-brand-purple text-white rounded-xl font-semibold">
                    <Layers className="w-5 h-5" />
                    Dashboard
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-4 px-4 py-3 text-brand-gray-dark hover:bg-brand-gray-light rounded-xl font-semibold">
                    <Inbox className="w-5 h-5" />
                    Projects
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-4 px-4 py-3 text-brand-gray-dark hover:bg-brand-gray-light rounded-xl font-semibold">
                    <BookOpen className="w-5 h-5" />
                    Library
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-4 px-4 py-3 text-brand-gray-dark hover:bg-brand-gray-light rounded-xl font-semibold">
                    <ListTodo className="w-5 h-5" />
                    Tasks
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-4 px-4 py-3 text-brand-gray-dark hover:bg-brand-gray-light rounded-xl font-semibold">
                    <Users className="w-5 h-5" />
                    Team
                  </button>
                </li>
              </ul>

              <h2 className="text-xs text-brand-gray-dark font-semibold uppercase tracking-wider mt-10 mb-4">Quick Access</h2>
              <ul className="space-y-4">
                <li>
                  <button className="w-full flex items-center gap-3 text-left" onClick={() => handleToolClick('series-builder')}>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      SB
                    </div>
                    <div>
                      <p className="font-semibold text-brand-text text-sm">Series Builder</p>
                      <p className="text-xs text-brand-gray-dark">Active</p>
                    </div>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 text-left" onClick={() => handleToolClick('persona-generator')}>
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      PG
                    </div>
                    <div>
                      <p className="font-semibold text-brand-text text-sm">Persona Gen</p>
                      <p className="text-xs text-brand-gray-dark">Recent</p>
                    </div>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 text-left" onClick={() => handleToolClick('content-maximizer')}>
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      CM
                    </div>
                    <div>
                      <p className="font-semibold text-brand-text text-sm">Maximizer</p>
                      <p className="text-xs text-brand-gray-dark">Favorite</p>
                    </div>
                  </button>
                </li>
              </ul>
            </nav>

            <div>
              <h2 className="text-xs text-brand-gray-dark font-semibold uppercase tracking-wider mb-4">Settings</h2>
              <ul className="space-y-2">
                <li>
                  <button className="w-full flex items-center gap-4 px-4 py-3 text-brand-gray-dark hover:bg-brand-gray-light rounded-xl font-semibold">
                    <Settings className="w-5 h-5" />
                    Settings
                  </button>
                </li>
                <li>
                  <button onClick={handleSignOut} className="w-full flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-semibold">
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="col-span-12 lg:col-span-7 bg-brand-gray-light rounded-3xl p-6 flex flex-col gap-6 overflow-y-auto">
            
            {/* Header with Search */}
            <header className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray-dark w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search your tools...." 
                  className="w-full bg-white rounded-full py-3 pl-12 pr-4 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
              </div>
              <div className="flex items-center gap-4">
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-gray-dark hover:bg-brand-purple-light hover:text-brand-purple">
                  <Mail className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-gray-dark hover:bg-brand-purple-light hover:text-brand-purple">
                  <Bell className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-purple to-brand-purple-dark flex items-center justify-center text-white font-bold">
                    {user?.email?.[0].toUpperCase() || 'U'}
                  </div>
                  <span className="font-semibold text-brand-text hidden md:inline">
                    {user?.email?.split('@')[0] || 'User'}
                  </span>
                </div>
              </div>
            </header>

            {/* Hero Banner */}
            <section className="bg-brand-purple rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute -right-10 -top-10 text-white/10">
                <Sparkles className="w-48 h-48 transform rotate-12" />
              </div>
              <div className="absolute left-1/2 bottom-0 text-white/10">
                <Video className="w-36 h-36 transform -rotate-12" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-wider mb-2 relative z-10">AI-Powered Tools</p>
              <h2 className="text-4xl font-bold max-w-md leading-tight mb-6 relative z-10">
                Automate Your Content Creation with Professional Tools
              </h2>
              <button 
                onClick={() => handleToolClick('series-builder')}
                className="bg-brand-text text-white font-semibold py-3 px-6 rounded-full flex items-center gap-3 hover:bg-gray-800 transition-colors relative z-10"
              >
                Start Creating
                <ChevronRight className="w-5 h-5" />
              </button>
            </section>

            {/* Progress Indicators */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allTools.slice(0, 3).map((tool) => {
                const Icon = tool.icon;
                return (
                  <div key={tool.id} className="bg-white p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleToolClick(tool.id)}>
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 ${tool.color} rounded-full flex items-center justify-center`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-brand-gray-dark">{tool.progress}% complete</p>
                        <p className="font-bold text-brand-text">{tool.name}</p>
                      </div>
                    </div>
                    <button className="text-brand-gray-dark hover:text-brand-text">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
            </section>

            {/* Continue Working - Tool Cards */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-brand-text">Continue Working</h3>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-gray-dark hover:bg-brand-purple-light">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-brand-purple rounded-full flex items-center justify-center text-white">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {allTools.slice(0, 3).map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <div 
                      key={tool.id}
                      className="bg-white p-4 rounded-2xl flex flex-col gap-4 cursor-pointer hover:shadow-xl transition-all"
                      onClick={() => handleToolClick(tool.id)}
                    >
                      <div className="relative h-40 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <img 
                          className="w-full h-full object-cover" 
                          src={tool.image} 
                          alt={tool.name}
                        />
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/50">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                      <span className={`text-xs font-semibold ${tool.color} text-white py-1 px-3 rounded-full self-start flex items-center gap-1`}>
                        <Icon className="w-3 h-3" />
                        {tool.badge}
                      </span>
                      <h4 className="font-bold text-brand-text leading-tight">{tool.name}</h4>
                      <div className="w-full bg-brand-gray-medium rounded-full h-1.5">
                        <div className="bg-brand-purple h-1.5 rounded-full" style={{ width: `${tool.progress}%` }}></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-purple to-brand-purple-dark flex items-center justify-center text-white text-xs font-bold">
                          AI
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-brand-text">AI Assistant</p>
                          <p className="text-xs text-brand-gray-dark">Palmer House</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* All Tools Table */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-brand-text">All Your Tools</h3>
                <button className="font-semibold text-brand-purple hover:underline">See All</button>
              </div>
              <div className="bg-white rounded-2xl p-4">
                <div className="grid grid-cols-10 gap-4 text-xs font-semibold text-brand-gray-dark uppercase py-2 px-4 border-b border-brand-gray-medium">
                  <div className="col-span-3">Tool Name</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-4">Description</div>
                  <div className="col-span-1 text-right">Action</div>
                </div>
                {allTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <div 
                      key={tool.id}
                      className="grid grid-cols-10 gap-4 items-center py-4 px-4 hover:bg-brand-gray-light rounded-lg cursor-pointer"
                      onClick={() => handleToolClick(tool.id)}
                    >
                      <div className="col-span-3 flex items-center gap-3">
                        <div className={`w-10 h-10 ${tool.color} rounded-full flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-brand-text">{tool.name}</p>
                          <p className="text-sm text-brand-gray-dark">Last used: 2d ago</p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className={`text-xs font-semibold ${tool.color} text-white py-1 px-3 rounded-full`}>
                          {tool.badge}
                        </span>
                      </div>
                      <div className="col-span-4 text-brand-text font-medium">{tool.description}</div>
                      <div className="col-span-1 flex justify-end">
                        <button className="w-8 h-8 border border-brand-gray-medium rounded-full flex items-center justify-center text-brand-gray-dark hover:bg-brand-purple-light hover:text-brand-purple">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </main>

          {/* Right Sidebar - Statistics */}
          <aside className="col-span-12 lg:col-span-3 bg-white rounded-3xl p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-brand-text">Statistics</h3>
              <button className="text-brand-gray-dark hover:text-brand-text">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* User Greeting with Progress Ring */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    className="text-brand-gray-medium" 
                    strokeWidth="8" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="40" 
                    cx="50" 
                    cy="50" 
                  />
                  <circle 
                    className="text-brand-purple transition-all duration-300" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="40" 
                    cx="50" 
                    cy="50"
                    strokeDasharray="251.2"
                    strokeDashoffset="170"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-brand-purple to-brand-purple-dark flex items-center justify-center text-white font-bold text-2xl border-4 border-white">
                  {user?.email?.[0].toUpperCase() || 'U'}
                </div>
                <div className="absolute top-1 right-1 bg-brand-purple text-white text-xs font-bold px-2 py-1 rounded-full">
                  32%
                </div>
              </div>
              <h4 className="text-xl font-bold text-brand-text">Good Morning! 🔥</h4>
              <p className="text-sm text-brand-gray-dark mt-1">
                Continue your content creation to achieve your target!
              </p>
            </div>

            {/* Activity Chart */}
            <div className="bg-brand-gray-light rounded-2xl p-4">
              <ActivityChart />
            </div>

            {/* Quick Stats */}
            <div className="space-y-3">
              <div className="bg-brand-gray-light p-4 rounded-xl">
                <p className="text-sm text-brand-gray-dark">Tools Active</p>
                <p className="text-2xl font-bold text-brand-text">{allTools.length}</p>
              </div>
              <div className="bg-brand-gray-light p-4 rounded-xl">
                <p className="text-sm text-brand-gray-dark">Projects Created</p>
                <p className="text-2xl font-bold text-brand-text">12</p>
              </div>
            </div>

            {/* Top Tools */}
            <div className="flex-grow flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-brand-text">Top Tools</h3>
                <button className="w-8 h-8 bg-brand-purple-light text-brand-purple rounded-full flex items-center justify-center hover:bg-brand-purple hover:text-white">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-brand-gray-light rounded-2xl p-4 flex-grow flex flex-col">
                <ul className="space-y-3 flex-grow">
                  {allTools.slice(0, 3).map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <li key={tool.id} className="flex items-center justify-between bg-white p-3 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className={`w-10 h-10 ${tool.color} rounded-full flex items-center justify-center`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                          </div>
                          <div>
                            <p className="font-bold text-brand-text text-sm">{tool.name.split(' ')[0]}</p>
                            <p className="text-xs text-brand-gray-dark">{tool.progress}% used</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleToolClick(tool.id)}
                          className="text-sm font-semibold text-brand-purple border border-brand-purple rounded-full px-4 py-1.5 hover:bg-brand-purple hover:text-white transition-colors"
                        >
                          Open
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <button className="w-full bg-brand-purple-light text-brand-purple font-semibold py-3 rounded-xl mt-4 hover:bg-brand-purple hover:text-white transition-colors">
                  View All Tools
                </button>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </>
  );
}
