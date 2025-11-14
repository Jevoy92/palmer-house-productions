import { MetaTags } from '@/components/seo/MetaTags';
import { Video, User, Sparkles, Maximize, MessageCircle, BookOpen, Search, Mail, Bell, ChevronLeft, ChevronRight, Heart, MoreVertical, Settings, LogOut, Plus, Layers, Inbox, ListTodo, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

declare global {
  interface Window {
    Plotly: any;
  }
}

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

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Jason';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const allTools = [
    {
      id: 'content-system-builder',
      name: 'Content System Builder',
      description: 'Turn one idea into a complete content system',
      icon: Video,
      color: 'bg-green-100',
      textColor: 'text-green-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-500',
      badge: 'VIDEO SYSTEM',
      progress: 75,
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
      mentor: 'Leonardo Samsul'
    },
    {
      id: 'series-builder',
      name: 'Series Builder',
      description: 'Build comprehensive video series',
      icon: BookOpen,
      color: 'bg-blue-100',
      textColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-500',
      badge: 'SERIES',
      progress: 40,
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      mentor: 'Bayu Salto'
    },
    {
      id: 'persona-generator',
      name: 'Persona Generator',
      description: 'Define your ideal audience and brand voice',
      icon: User,
      color: 'bg-pink-100',
      textColor: 'text-pink-600',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-500',
      badge: 'AUDIENCE',
      progress: 60,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      mentor: 'Padhang Satrio'
    },
    {
      id: 'production-assistant',
      name: 'Production Assistant',
      description: 'Streamline your pre-production workflow',
      icon: Sparkles,
      color: 'bg-purple-100',
      textColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-500',
      badge: 'PRODUCTION',
      progress: 50,
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop',
      mentor: 'Zakir Horizontal'
    },
    {
      id: 'content-maximizer',
      name: 'Content Maximizer',
      description: 'Repurpose content across all platforms',
      icon: Maximize,
      color: 'bg-orange-100',
      textColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-500',
      badge: 'MAXIMIZE',
      progress: 85,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      mentor: 'Emma Richards'
    },
    {
      id: 'engagement-responder',
      name: 'Engagement Responder',
      description: 'Automate community engagement',
      icon: MessageCircle,
      color: 'bg-indigo-100',
      textColor: 'text-indigo-600',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-500',
      badge: 'ENGAGEMENT',
      progress: 30,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      mentor: 'Sofia Chen'
    },
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.plot.ly/plotly-latest.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Plotly) {
        try {
          const data = [{
            x: ['1-10 Aug', '11-20 Aug', '21-30 Aug', '31 Aug'],
            y: [35, 48, 62, 35],
            type: 'bar',
            marker: {
              line: {
                color: 'transparent'
              }
            },
            width: [0.5, 0.5, 0.5, 0.5],
            hoverinfo: 'y'
          }] as any;

          const maxVal = Math.max(...data[0].y);
          const colors = data[0].y.map((val: number) => val === maxVal ? '#6C63FF' : '#E0DFFE');
          data[0].marker.color = colors;

          const layout = {
            margin: { l: 30, r: 20, b: 30, t: 10 },
            plot_bgcolor: '#F9FAFB',
            paper_bgcolor: '#F9FAFB',
            xaxis: {
              showgrid: false,
              zeroline: false,
              tickfont: {
                family: 'Inter, sans-serif',
                size: 12,
                color: '#6B7280'
              }
            },
            yaxis: {
              showgrid: true,
              gridcolor: '#E5E7EB',
              zeroline: false,
              tickfont: {
                family: 'Inter, sans-serif',
                size: 12,
                color: '#6B7280'
              },
              range: [0, 70]
            },
            bargap: 0.2,
            showlegend: false
          };

          const config = {
            responsive: true,
            displayModeBar: false,
            displaylogo: false
          };

          window.Plotly.newPlot('statistic-chart', data, layout, config);
        } catch(e) {
          console.error('Plotly error:', e);
        }
      }
    };
    document.head.appendChild(script);
    return () => {
      const existingScript = document.querySelector('script[src="https://cdn.plot.ly/plotly-latest.min.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <>
      <MetaTags
        title="Dashboard | Palmer House Productions Content OS"
        description="Access your video series builder, persona generator, production assistant, and more content creation tools."
        canonicalUrl="https://www.palmerhouseproductions.com/dashboard"
      />
      
      <style>{`
        .radial-progress {
          stroke-dasharray: 251.2;
          stroke-dashoffset: calc(251.2 - (251.2 * var(--progress)) / 100);
        }
      `}</style>

      <div className="min-h-screen bg-[#F0F2F5] p-4 lg:p-8">
        <div className="grid grid-cols-12 gap-6 max-w-[1600px] mx-auto">
          
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
                  <a href="#" className="flex items-center gap-4 px-4 py-3 bg-brand-purple text-white rounded-xl font-semibold">
                    <Layers className="w-5 h-5" />
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-4 px-4 py-3 text-brand-gray-dark hover:bg-brand-gray-light rounded-xl font-semibold">
                    <Inbox className="w-5 h-5" />
                    Inbox
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-4 px-4 py-3 text-brand-gray-dark hover:bg-brand-gray-light rounded-xl font-semibold">
                    <BookOpen className="w-5 h-5" />
                    Lesson
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-4 px-4 py-3 text-brand-gray-dark hover:bg-brand-gray-light rounded-xl font-semibold">
                    <ListTodo className="w-5 h-5" />
                    Task
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-4 px-4 py-3 text-brand-gray-dark hover:bg-brand-gray-light rounded-xl font-semibold">
                    <Users className="w-5 h-5" />
                    Group
                  </a>
                </li>
              </ul>

              <h2 className="text-xs text-brand-gray-dark font-semibold uppercase tracking-wider mt-10 mb-4">Quick Access</h2>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="flex items-center gap-3">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" className="w-10 h-10 rounded-full object-cover" alt="Tool" />
                    <div>
                      <p className="font-semibold text-brand-text">Video Series</p>
                      <p className="text-sm text-brand-gray-dark">Builder</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" className="w-10 h-10 rounded-full object-cover" alt="Tool" />
                    <div>
                      <p className="font-semibold text-brand-text">Persona Gen</p>
                      <p className="text-sm text-brand-gray-dark">Tool</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3">
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg" className="w-10 h-10 rounded-full object-cover" alt="Tool" />
                    <div>
                      <p className="font-semibold text-brand-text">Content Max</p>
                      <p className="text-sm text-brand-gray-dark">Tool</p>
                    </div>
                  </a>
                </li>
              </ul>
            </nav>

            <div>
              <h2 className="text-xs text-brand-gray-dark font-semibold uppercase tracking-wider mb-4">Settings</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center gap-4 px-4 py-3 text-brand-gray-dark hover:bg-brand-gray-light rounded-xl font-semibold">
                    <Settings className="w-5 h-5" />
                    Setting
                  </a>
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

          <main className="col-span-12 lg:col-span-7 bg-brand-gray-light rounded-3xl p-6 flex flex-col gap-6 overflow-y-auto max-h-[95vh]">
            <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
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
                  <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg" className="w-12 h-12 rounded-full object-cover border-2 border-white" alt="User" />
                  <span className="hidden lg:block font-semibold text-brand-text">{userName}</span>
                </div>
              </div>
            </header>

            <section className="bg-brand-purple rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute -right-10 -top-10 text-white/10">
                <Sparkles className="w-48 h-48 rotate-12" />
              </div>
              <div className="absolute left-1/2 bottom-0 text-white/10">
                <Sparkles className="w-36 h-36 -rotate-12" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-wider mb-2 relative z-10">AI Content OS</p>
              <h2 className="text-4xl font-bold max-w-md leading-tight mb-6 relative z-10">Automate Your Content Creation with AI-Powered Tools</h2>
              <button className="bg-brand-text text-white font-semibold py-3 px-6 rounded-full flex items-center gap-3 hover:bg-gray-800 transition-colors relative z-10">
                Get Started
                <ChevronRight className="w-5 h-5" />
              </button>
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allTools.slice(0, 3).map((tool) => {
                const Icon = tool.icon;
                return (
                  <div key={tool.id} className="bg-white p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 ${tool.iconBg} ${tool.iconColor} rounded-full flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-brand-gray-dark">In Progress</p>
                        <p className="font-bold text-brand-text">{tool.name.split(' ')[0]}</p>
                      </div>
                    </div>
                    <button className="text-brand-gray-dark hover:text-brand-text">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
            </section>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-brand-text">Your AI Tools</h3>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-gray-dark hover:bg-brand-purple-light">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-brand-purple rounded-full flex items-center justify-center text-white">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <div 
                      key={tool.id} 
                      className="bg-white p-4 rounded-2xl flex flex-col gap-4 cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleToolClick(tool.id)}
                    >
                      <div className="relative h-40 rounded-xl overflow-hidden">
                        <img className="w-full h-full object-cover" src={tool.image} alt={tool.name} />
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/50">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                      <span className={`text-xs font-semibold ${tool.color} ${tool.textColor} py-1 px-3 rounded-full self-start flex items-center gap-1`}>
                        <Icon className="w-3 h-3" />
                        {tool.badge}
                      </span>
                      <h4 className="font-bold text-brand-text leading-tight">{tool.name}</h4>
                      <div className="w-full bg-brand-gray-medium rounded-full h-1.5">
                        <div className="bg-brand-purple h-1.5 rounded-full" style={{ width: `${tool.progress}%` }}></div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-purple rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {tool.mentor.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-brand-text">{tool.mentor}</p>
                          <p className="text-xs text-brand-gray-dark">AI Assistant</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-brand-text">Recent Activity</h3>
                <a href="#" className="font-semibold text-brand-purple hover:underline">See All</a>
              </div>
              <div className="bg-white rounded-2xl p-4">
                <div className="grid grid-cols-10 gap-4 text-xs font-semibold text-brand-gray-dark uppercase py-2 px-4 border-b border-brand-gray-medium">
                  <div className="col-span-3">Tool</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-4">Description</div>
                  <div className="col-span-1 text-right">Action</div>
                </div>
                {allTools.slice(0, 3).map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <div key={tool.id} className="grid grid-cols-10 gap-4 items-center py-4 px-4 hover:bg-brand-gray-light rounded-lg">
                      <div className="col-span-3 flex items-center gap-3">
                        <div className={`w-10 h-10 ${tool.iconBg} ${tool.iconColor} rounded-full flex items-center justify-center`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-brand-text">{tool.name.split(' ')[0]}</p>
                          <p className="text-sm text-brand-gray-dark">Recently used</p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className={`text-xs font-semibold ${tool.color} ${tool.textColor} py-1 px-3 rounded-full`}>
                          {tool.badge}
                        </span>
                      </div>
                      <div className="col-span-4 text-brand-text font-medium">{tool.description}</div>
                      <div className="col-span-1 flex justify-end">
                        <button 
                          onClick={() => handleToolClick(tool.id)}
                          className="w-8 h-8 border border-brand-gray-medium rounded-full flex items-center justify-center text-brand-gray-dark hover:bg-brand-purple-light hover:text-brand-purple"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </main>

          <aside className="col-span-12 lg:col-span-3 bg-white rounded-3xl p-6 flex flex-col gap-6 max-h-[95vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-brand-text">Statistics</h3>
              <button className="text-brand-gray-dark hover:text-brand-text">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle className="text-brand-gray-medium" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                  <circle className="radial-progress text-brand-purple" style={{ '--progress': 32 } as React.CSSProperties} strokeWidth="8" strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" transform="rotate(-90 50 50)" />
                </svg>
                <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full object-cover border-4 border-white" alt="User" />
                <div className="absolute top-1 right-1 bg-brand-purple text-white text-xs font-bold px-2 py-1 rounded-full">32%</div>
              </div>
              <h4 className="text-xl font-bold text-brand-text">{getGreeting()} {userName} 🔥</h4>
              <p className="text-sm text-brand-gray-dark mt-1">Continue creating to achieve your goals!</p>
            </div>

            <div className="bg-brand-gray-light rounded-2xl p-4">
              <div id="statistic-chart" className="h-[180px]"></div>
            </div>

            <div className="flex-grow flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-brand-text">Top Tools</h3>
                <button className="w-8 h-8 bg-brand-purple-light text-brand-purple rounded-full flex items-center justify-center hover:bg-brand-purple hover:text-white">
                  <Plus className="w-5 h-5" />
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
                            <div className={`w-10 h-10 ${tool.iconBg} ${tool.iconColor} rounded-full flex items-center justify-center`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="absolute -bottom-1 -right-1 bg-brand-text text-white w-5 h-5 rounded-full flex items-center justify-center border-2 border-white text-xs">
                              <Plus className="w-3 h-3" />
                            </span>
                          </div>
                          <div>
                            <p className="font-bold text-brand-text">{tool.name.split(' ')[0]}</p>
                            <p className="text-sm text-brand-gray-dark">{tool.badge}</p>
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
                  See All Tools
                </button>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </>
  );
}
