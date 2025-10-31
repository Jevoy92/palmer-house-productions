import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LOGO, COMPANY } from "@/lib/branding";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { usePageTransition } from '@/components/PageTransition';
export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { transitionTo } = usePageTransition();

  // Helper function to handle page transitions
  const handlePageTransition = (path: string) => {
    if (location.pathname !== path) {
      transitionTo(path);
    }
    setIsOpen(false);
  };

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
      // Navigate to home page with transition
      transitionTo('/');
    } else {
      // If already on home page, scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll effects for navigation slide animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update background state
      setIsScrolled(currentScrollY > 20);

      // Determine scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsScrollingDown(true);
      } else if (currentScrollY < lastScrollY) {
        setIsScrollingDown(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
  return <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b",
      isScrolled 
        ? "bg-background/95 backdrop-blur-xl shadow-md border-border/80" 
        : "bg-white/80 backdrop-blur-lg border-border/50"
    )} role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <button onClick={handleLogoClick} className="flex items-center gap-3 whitespace-nowrap focus:outline-none" aria-label="Go to homepage">
              <img 
                src={LOGO.url} 
                alt={LOGO.alt} 
                className="h-8 w-auto sm:h-10 object-contain" 
              />
              <span className="hidden sm:block text-foreground font-extrabold tracking-tight text-base lg:text-lg">{COMPANY.name}</span>
            </button>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center gap-4">
              {/* Sliding middle navigation */}
              <div 
                className={cn(
                  "flex items-center space-x-6 transition-all duration-500 ease-out overflow-hidden",
                  isScrollingDown 
                    ? "opacity-0 -translate-x-40 pointer-events-none absolute delay-0" 
                    : "opacity-100 translate-x-0 delay-100"
                )}
                style={{ willChange: isScrollingDown ? 'transform, opacity' : 'auto' }}
              >
                {/* Services Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Services
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 bg-background border border-border shadow-lg rounded-md z-50" sideOffset={5}>
                    <DropdownMenuItem asChild>
                      <button 
                        onClick={() => handlePageTransition('/reel-pal')}
                        className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                      >
                        Social Content
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button 
                        onClick={() => handlePageTransition('/system-pal')}
                        className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                      >
                        Training Systems
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button 
                        onClick={() => handlePageTransition('/evergreen-pal')}
                        className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                      >
                        Evergreen Content
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button 
                        onClick={() => handlePageTransition('/spotlight-pal')}
                        className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                      >
                        Premium Production
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button 
                        onClick={() => handlePageTransition('/services/diy-downloads')}
                        className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                      >
                        DIY Downloads
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button 
                        onClick={() => handlePageTransition('/safety-videos')}
                        className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                      >
                        Safety Videos
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button 
                        onClick={() => handlePageTransition('/startups')}
                        className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                      >
                        Startups
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Company Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Company
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48 bg-background border border-border shadow-lg rounded-md z-50" sideOffset={5}>
                    <DropdownMenuItem asChild>
                      <button 
                        onClick={() => handlePageTransition('/about-us')}
                        className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                      >
                        About Us
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button 
                        onClick={() => handlePageTransition('/company/team')}
                        className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                      >
                        Our Team
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button 
                        onClick={() => handlePageTransition('/company/values')}
                        className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                      >
                        Our Values
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Resources Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Resources
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48 bg-background border border-border shadow-lg rounded-md z-50" sideOffset={5}>
                    <DropdownMenuItem asChild>
                      <button 
                        onClick={() => handlePageTransition('/blog')}
                        className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                      >
                        Blog
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button 
                        onClick={() => handlePageTransition('/content-strategy')}
                        className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                      >
                        Content Strategy
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button 
                        onClick={() => handlePageTransition('/video-use-cases')}
                        className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                      >
                        Video Use Cases
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button 
                        onClick={() => handlePageTransition('/resources/reviews')}
                        className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                      >
                        Client Reviews
                      </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <button 
                        onClick={() => handlePageTransition('/faq')}
                        className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors cursor-pointer"
                      >
                        FAQ
                      </button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Meet the Pals Link */}
                <button 
                  onClick={() => handlePageTransition('/pals')}
                  className={cn("transition-colors text-base font-medium px-3 py-2", isActivePath('/pals') ? "text-social-purple font-bold border-b-2 border-social-purple" : "text-muted-foreground hover:text-foreground")}
                >
                  Meet the Pals
                </button>
              </div>

              {/* Contact Button - Always visible */}
              <button 
                onClick={() => handlePageTransition('/contact')}
                className={cn(
                  "transition-all duration-300 text-base font-medium px-4 py-2 rounded-lg",
                  isActivePath('/contact') 
                    ? "text-white bg-social-purple font-bold shadow-lg" 
                    : "text-white bg-social-purple hover:bg-social-purple/90 hover:shadow-lg hover:scale-105"
                )}
              >
                Contact
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-muted-foreground hover:text-foreground focus:outline-none interactive-element min-h-[44px] min-w-[44px] flex items-center justify-center" aria-expanded={isOpen} aria-controls="mobile-menu" aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && <div id="mobile-menu" className="md:hidden bg-background border-t border-border shadow-lg" role="menu">
          <div className="px-4 pt-4 pb-6 space-y-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Services Section */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Services</div>
              <div className="space-y-1">
                <button 
                  onClick={() => handlePageTransition('/reel-pal')}
                  className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors min-h-[44px] flex items-center"
                >
                  Social Content
                </button>
                <button 
                  onClick={() => handlePageTransition('/system-pal')}
                  className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors min-h-[44px] flex items-center"
                >
                  Training Systems
                </button>
                <button 
                  onClick={() => handlePageTransition('/evergreen-pal')}
                  className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors min-h-[44px] flex items-center"
                >
                  Evergreen Content
                </button>
                <button 
                  onClick={() => handlePageTransition('/spotlight-pal')}
                  className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors min-h-[44px] flex items-center"
                >
                  Premium Production
                </button>
                <button 
                  onClick={() => handlePageTransition('/services/diy-downloads')}
                  className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors min-h-[44px] flex items-center"
                >
                  DIY Downloads
                </button>
                <button 
                  onClick={() => handlePageTransition('/safety-videos')}
                  className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors min-h-[44px] flex items-center"
                >
                  Safety Videos
                </button>
                <button 
                  onClick={() => handlePageTransition('/startups')}
                  className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors min-h-[44px] flex items-center"
                >
                  Startups
                </button>
              </div>
            </div>

            {/* Company Section */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Company</div>
              <div className="space-y-1">
                <button 
                  onClick={() => handlePageTransition('/about-us')}
                  className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors min-h-[44px] flex items-center"
                >
                  About Us
                </button>
                <button 
                  onClick={() => handlePageTransition('/company/team')}
                  className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors min-h-[44px] flex items-center"
                >
                  Our Team
                </button>
                <button 
                  onClick={() => handlePageTransition('/company/values')}
                  className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors min-h-[44px] flex items-center"
                >
                  Our Values
                </button>
              </div>
            </div>

            {/* Resources Section */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Resources</div>
              <div className="space-y-1">
                <button 
                  onClick={() => handlePageTransition('/blog')}
                  className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors min-h-[44px] flex items-center"
                >
                  Blog
                </button>
                <button 
                  onClick={() => handlePageTransition('/content-strategy')}
                  className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors min-h-[44px] flex items-center"
                >
                  Content Strategy
                </button>
                <button 
                  onClick={() => handlePageTransition('/video-use-cases')}
                  className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors min-h-[44px] flex items-center"
                >
                  Video Use Cases
                </button>
                <button 
                  onClick={() => handlePageTransition('/resources/reviews')}
                  className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors min-h-[44px] flex items-center"
                >
                  Client Reviews
                </button>
                <button 
                  onClick={() => handlePageTransition('/faq')}
                  className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors min-h-[44px] flex items-center"
                >
                  FAQ
                </button>
              </div>
            </div>

            {/* Pals Section */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Meet the Pals</div>
              <div className="space-y-1">
                <button 
                  onClick={() => handlePageTransition('/pals')}
                  className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors min-h-[44px] flex items-center"
                >
                  Palmer House Pals
                </button>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="pt-4 border-t border-border">
              <button 
                onClick={() => handlePageTransition('/contact')}
                className={cn("block w-full px-4 py-4 transition-colors font-medium rounded-lg text-center min-h-[48px] flex items-center justify-center", isActivePath('/contact') ? "text-white bg-social-purple font-bold" : "text-white bg-social-purple hover:bg-social-purple/90")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>}
    </nav>;
};