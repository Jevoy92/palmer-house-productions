
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-apple-gray-2/50">
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
            <div className="flex items-center space-x-8">
              <Link to="/video-packages" className="text-apple-gray-5 hover:text-black transition-colors text-base font-medium" onClick={() => setIsOpen(false)}>
                Video Packages
              </Link>
              <Link to="/discovery-call" className="text-apple-gray-5 hover:text-black transition-colors text-base font-medium" onClick={() => setIsOpen(false)}>
                Discovery Call
              </Link>
              <Link to="/client-results" className="text-apple-gray-5 hover:text-black transition-colors text-base font-medium" onClick={() => setIsOpen(false)}>
                Client Results
              </Link>
              <Link to="/video-use-cases" className="text-apple-gray-5 hover:text-black transition-colors text-base font-medium" onClick={() => setIsOpen(false)}>
                Video Use Cases
              </Link>
              <Link to="/about-us" className="text-apple-gray-5 hover:text-black transition-colors text-base font-medium" onClick={() => setIsOpen(false)}>
                About Us
              </Link>
              <Link to="/podcast" className="text-apple-gray-5 hover:text-black transition-colors text-base font-medium" onClick={() => setIsOpen(false)}>
                Podcast
              </Link>
              <Link to="/contact" className="text-apple-gray-5 hover:text-black transition-colors text-base font-medium" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-apple-gray-5 hover:text-black focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && <div className="md:hidden bg-white border-t border-apple-gray-2">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link to="/video-packages" className="block px-3 py-2 text-apple-gray-5 hover:text-black transition-colors" onClick={() => setIsOpen(false)}>
              Video Packages
            </Link>
            <Link to="/discovery-call" className="block px-3 py-2 text-apple-gray-5 hover:text-black transition-colors" onClick={() => setIsOpen(false)}>
              Discovery Call
            </Link>
            <Link to="/client-results" className="block px-3 py-2 text-apple-gray-5 hover:text-black transition-colors" onClick={() => setIsOpen(false)}>
              Client Results
            </Link>
            <Link to="/video-use-cases" className="block px-3 py-2 text-apple-gray-5 hover:text-black transition-colors" onClick={() => setIsOpen(false)}>
              Video Use Cases
            </Link>
            <Link to="/about-us" className="block px-3 py-2 text-apple-gray-5 hover:text-black transition-colors" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
            <Link to="/podcast" className="block px-3 py-2 text-apple-gray-5 hover:text-black transition-colors" onClick={() => setIsOpen(false)}>
              Podcast
            </Link>
            <Link to="/contact" className="block px-3 py-2 text-apple-gray-5 hover:text-black transition-colors" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </div>
        </div>}
    </nav>
  );
};
