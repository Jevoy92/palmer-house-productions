import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LOGO, COMPANY } from "@/lib/branding";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Helper function to check if a path is active
  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };
  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== '/') {
      // Navigate to home page first, then scroll to section
      navigate('/', {
        replace: true
      });
      // Use setTimeout to ensure page has loaded before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // If on home page, scroll to section immediately
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
    setIsOpen(false);
  };
  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      // Navigate to home page
      navigate('/');
    } else {
      // If already on home page, scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Handle hash navigation when component mounts or location changes
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location]);
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="relative flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <button onClick={handleLogoClick} className="flex items-center gap-3 whitespace-nowrap focus:outline-none" aria-label="Go to homepage">
              <img 
                src={LOGO.url} 
                alt={LOGO.alt} 
                className="h-8 w-auto sm:h-10 object-contain" 
              />
              <span className="hidden sm:block text-white font-extrabold tracking-tight text-base lg:text-lg">{COMPANY.name}</span>
            </button>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {/* Services Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-base font-medium text-gray-200 hover:text-social-orange transition-colors">
                  Services
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 bg-gray-900 border border-gray-700 shadow-lg rounded-md z-50" sideOffset={5}>
                  <DropdownMenuItem asChild>
                    <Link to="/video-packages" className="block px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-gray-800 rounded-md transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>
                      Video Packages
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/services/diy-downloads" className="block px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-gray-800 rounded-md transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>
                      DIY Downloads
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Company Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-base font-medium text-gray-200 hover:text-social-orange transition-colors">
                  Company
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-gray-900 border border-gray-700 shadow-lg rounded-md z-50" sideOffset={5}>
                  <DropdownMenuItem asChild>
                    <Link to="/about-us" className="block px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-gray-800 rounded-md transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>
                      About Us
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/company/team" className="block px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-gray-800 rounded-md transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>
                      Our Team
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/company/values" className="block px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-gray-800 rounded-md transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>
                      Our Values
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Resources Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-base font-medium text-gray-200 hover:text-social-orange transition-colors">
                  Resources
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-gray-900 border border-gray-700 shadow-lg rounded-md z-50" sideOffset={5}>
                  <DropdownMenuItem asChild>
                    <Link to="/blog" className="block px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-gray-800 rounded-md transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>
                      Blog
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/content-strategy" className="block px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-gray-800 rounded-md transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>
                      Content Strategy
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/video-use-cases" className="block px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-gray-800 rounded-md transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>
                      Video Use Cases
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/resources/reviews" className="block px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-gray-800 rounded-md transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>
                      Client Reviews
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/faq" className="block px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-gray-800 rounded-md transition-colors cursor-pointer" onClick={() => setIsOpen(false)}>
                      FAQ
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Contact Link */}
              <Link to="/contact" className={cn("transition-colors text-base font-medium px-3 py-2", isActivePath('/contact') ? "text-social-orange font-bold border-b-2 border-social-orange" : "text-gray-200 hover:text-social-orange")} onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-200 hover:text-white focus:outline-none interactive-element min-h-[44px] min-w-[44px] flex items-center justify-center" aria-expanded={isOpen} aria-controls="mobile-menu" aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && <div id="mobile-menu" className="md:hidden bg-gray-900 border-t border-gray-700 shadow-lg" role="menu">
          <div className="px-4 pt-4 pb-6 space-y-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Services Section */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Services</div>
              <div className="space-y-1">
                <Link to="/video-packages" className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-800 rounded-lg transition-colors min-h-[44px] flex items-center" onClick={() => setIsOpen(false)}>
                  Video Packages
                </Link>
                <Link to="/services/diy-downloads" className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-800 rounded-lg transition-colors min-h-[44px] flex items-center" onClick={() => setIsOpen(false)}>
                  DIY Downloads
                </Link>
              </div>
            </div>

            {/* Company Section */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Company</div>
              <div className="space-y-1">
                <Link to="/about-us" className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-800 rounded-lg transition-colors min-h-[44px] flex items-center" onClick={() => setIsOpen(false)}>
                  About Us
                </Link>
                <Link to="/company/team" className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-800 rounded-lg transition-colors min-h-[44px] flex items-center" onClick={() => setIsOpen(false)}>
                  Our Team
                </Link>
                <Link to="/company/values" className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-800 rounded-lg transition-colors min-h-[44px] flex items-center" onClick={() => setIsOpen(false)}>
                  Our Values
                </Link>
              </div>
            </div>

            {/* Resources Section */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Resources</div>
              <div className="space-y-1">
                <Link to="/blog" className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-800 rounded-lg transition-colors min-h-[44px] flex items-center" onClick={() => setIsOpen(false)}>
                  Blog
                </Link>
                <Link to="/content-strategy" className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-800 rounded-lg transition-colors min-h-[44px] flex items-center" onClick={() => setIsOpen(false)}>
                  Content Strategy
                </Link>
                <Link to="/video-use-cases" className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-800 rounded-lg transition-colors min-h-[44px] flex items-center" onClick={() => setIsOpen(false)}>
                  Video Use Cases
                </Link>
                <Link to="/resources/reviews" className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-800 rounded-lg transition-colors min-h-[44px] flex items-center" onClick={() => setIsOpen(false)}>
                  Client Reviews
                </Link>
                <Link to="/faq" className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-800 rounded-lg transition-colors min-h-[44px] flex items-center" onClick={() => setIsOpen(false)}>
                  FAQ
                </Link>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="pt-4 border-t border-gray-700">
              <Link to="/contact" className={cn("block px-4 py-4 transition-colors font-medium rounded-lg text-center min-h-[48px] flex items-center justify-center", isActivePath('/contact') ? "text-white bg-social-orange font-bold" : "text-white bg-social-orange hover:bg-social-orange/90")} onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </div>
          </div>
        </div>}
    </nav>;
};