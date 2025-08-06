
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-apple-gray-2/50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <button 
              onClick={handleLogoClick}
              className="text-xl font-sf font-semibold text-black hover:text-apple-gray-5 transition-colors"
            >
              Palmer House Productions
            </button>
          </div>
          
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="space-x-6">
                {/* Services Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-base font-medium text-apple-gray-5 hover:text-black">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-64 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="space-y-2">
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/video-packages" 
                          className="block px-3 py-2 text-sm text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Video Packages Overview
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/services/diy-downloads" 
                          className="block px-3 py-2 text-sm text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          DIY Downloads
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/services/group-coaching" 
                          className="block px-3 py-2 text-sm text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Group Coaching
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/services/monthly-content" 
                          className="block px-3 py-2 text-sm text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Monthly Content
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Company Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-base font-medium text-apple-gray-5 hover:text-black">
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-48 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="space-y-2">
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/about-us" 
                          className="block px-3 py-2 text-sm text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          About Us
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/company/team" 
                          className="block px-3 py-2 text-sm text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Our Team
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/company/values" 
                          className="block px-3 py-2 text-sm text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Our Values
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/client-results" 
                          className="block px-3 py-2 text-sm text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Client Results
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Resources Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-base font-medium text-apple-gray-5 hover:text-black">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-48 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="space-y-2">
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/video-use-cases" 
                          className="block px-3 py-2 text-sm text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Video Use Cases
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/resources/reviews" 
                          className="block px-3 py-2 text-sm text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Client Reviews
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/faq" 
                          className="block px-3 py-2 text-sm text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          FAQ
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/discovery-call" 
                          className="block px-3 py-2 text-sm text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Discovery Call
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link 
                          to="/podcast" 
                          className="block px-3 py-2 text-sm text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Podcast
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Contact Link */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link 
                      to="/contact" 
                      className={cn(
                        "transition-colors text-base font-medium px-3 py-2",
                        isActivePath('/contact') 
                          ? "text-social-purple font-bold border-b-2 border-social-purple" 
                          : "text-apple-gray-5 hover:text-black"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-apple-gray-5 hover:text-black focus:outline-none interactive-element min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && <div id="mobile-menu" className="md:hidden bg-white border-t border-apple-gray-2 shadow-lg" role="menu">
          <div className="px-4 pt-4 pb-6 space-y-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Services Section */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-apple-gray-5 uppercase tracking-wider">Services</div>
              <div className="space-y-1">
                <Link 
                  to="/video-packages" 
                  className="block px-4 py-3 text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  Video Packages
                </Link>
                <Link 
                  to="/services/diy-downloads" 
                  className="block px-4 py-3 text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  DIY Downloads
                </Link>
                <Link 
                  to="/services/group-coaching" 
                  className="block px-4 py-3 text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  Group Coaching
                </Link>
                <Link 
                  to="/services/monthly-content" 
                  className="block px-4 py-3 text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  Monthly Content
                </Link>
              </div>
            </div>

            {/* Company Section */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-apple-gray-5 uppercase tracking-wider">Company</div>
              <div className="space-y-1">
                <Link 
                  to="/about-us" 
                  className="block px-4 py-3 text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
                <Link 
                  to="/company/team" 
                  className="block px-4 py-3 text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  Our Team
                </Link>
                <Link 
                  to="/company/values" 
                  className="block px-4 py-3 text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  Our Values
                </Link>
                <Link 
                  to="/client-results" 
                  className="block px-4 py-3 text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  Client Results
                </Link>
              </div>
            </div>

            {/* Resources Section */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-apple-gray-5 uppercase tracking-wider">Resources</div>
              <div className="space-y-1">
                <Link 
                  to="/video-use-cases" 
                  className="block px-4 py-3 text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  Video Use Cases
                </Link>
                <Link 
                  to="/resources/reviews" 
                  className="block px-4 py-3 text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  Client Reviews
                </Link>
                <Link 
                  to="/faq" 
                  className="block px-4 py-3 text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  FAQ
                </Link>
                <Link 
                  to="/discovery-call" 
                  className="block px-4 py-3 text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  Discovery Call
                </Link>
                <Link 
                  to="/podcast" 
                  className="block px-4 py-3 text-apple-gray-5 hover:text-black hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  Podcast
                </Link>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="pt-4 border-t border-apple-gray-2">
              <Link 
                to="/contact" 
                className={cn(
                  "block px-4 py-4 transition-colors font-medium rounded-lg text-center min-h-[48px] flex items-center justify-center",
                  isActivePath('/contact') 
                    ? "text-white bg-social-purple font-bold" 
                    : "text-white bg-social-purple hover:bg-social-purple/90"
                )}
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>}
    </nav>
  );
};
