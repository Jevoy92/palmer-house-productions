import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SocialIcon } from "react-social-icons";

export const EnhancedFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F5F5F5] text-corporate-dark mt-16 overflow-x-hidden">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Links */}
          <div className="col-span-1">
            <h3 className="text-xs text-gray-500 mb-4">Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-gray-600 cursor-pointer transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-gray-600 cursor-pointer transition-colors">
                  Studio
                </Link>
              </li>
              <li>
                <Link to="/video-packages" className="hover:text-gray-600 cursor-pointer transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/video-use-cases" className="hover:text-gray-600 cursor-pointer transition-colors">
                  Project single
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-gray-600 cursor-pointer transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-gray-600 cursor-pointer transition-colors">
                  News single
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-gray-600 cursor-pointer transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-gray-600 cursor-pointer transition-colors">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-gray-600 cursor-pointer transition-colors">
                  Terms of service
                </Link>
              </li>
              <li>
                <span className="hover:text-gray-600 cursor-pointer">404</span>
              </li>
            </ul>
          </div>

          {/* Get in touch */}
          <div className="col-span-1">
            <h3 className="text-xs text-gray-500 mb-4">Get in touch</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@palmerhouseproductions.com" className="hover:text-gray-600 cursor-pointer transition-colors">
                  info@palmerhouseproductions.com
                </a>
              </li>
              <li>
                <a href="tel:+14257387312" className="hover:text-gray-600 cursor-pointer transition-colors">
                  (425) 738-7312
                </a>
              </li>
              <li>
                <p>Bellevue, WA & Portland, OR</p>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4 text-gray-600">
              <SocialIcon
                url="https://www.linkedin.com/company/palmer-house-productions/"
                style={{ height: 24, width: 24 }}
                bgColor="transparent"
                fgColor="currentColor"
                className="hover:text-black cursor-pointer transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              />
              <SocialIcon
                url="https://x.com/palmerhouseviz"
                style={{ height: 24, width: 24 }}
                bgColor="transparent"
                fgColor="currentColor"
                className="hover:text-black cursor-pointer transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              />
              <SocialIcon
                url="https://www.instagram.com/palmerhouseproductions"
                style={{ height: 24, width: 24 }}
                bgColor="transparent"
                fgColor="currentColor"
                className="hover:text-black cursor-pointer transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              />
            </div>
          </div>

          {/* Subscribe */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-xl font-semibold mb-2">Subscribe</h3>
            <p className="text-gray-600 mb-6">Join our newsletter and stay updated on the latest trends in video production.</p>
            <form className="flex items-center border-b border-gray-400 pb-2">
              <input 
                type="email" 
                placeholder="E-mail" 
                className="bg-transparent w-full focus:outline-none placeholder-gray-400"
              />
              <button 
                type="submit" 
                className="bg-corporate-dark text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 hover:bg-gray-800 transition-colors"
              >
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Scrolling Marquee */}
      <div className="w-full overflow-hidden py-8 border-t border-b border-gray-200">
        <div className="flex animate-marquee">
          <div className="flex-shrink-0 flex items-center space-x-12 mx-6">
            <span className="w-16 h-px bg-corporate-dark"></span>
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase">
              Palmer House Productions<sup className="text-2xl md:text-4xl -top-8 md:-top-12">™</sup>
            </h2>
          </div>
          <div className="flex-shrink-0 flex items-center space-x-12 mx-6">
            <span className="w-16 h-px bg-corporate-dark"></span>
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase">
              Palmer House Productions<sup className="text-2xl md:text-4xl -top-8 md:-top-12">™</sup>
            </h2>
          </div>
          <div className="flex-shrink-0 flex items-center space-x-12 mx-6">
            <span className="w-16 h-px bg-corporate-dark"></span>
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase">
              Palmer House Productions<sup className="text-2xl md:text-4xl -top-8 md:-top-12">™</sup>
            </h2>
          </div>
          <div className="flex-shrink-0 flex items-center space-x-12 mx-6">
            <span className="w-16 h-px bg-corporate-dark"></span>
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase">
              Palmer House Productions<sup className="text-2xl md:text-4xl -top-8 md:-top-12">™</sup>
            </h2>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient Bar */}
      <div className="bg-gradient-to-r from-[#FF8A56] to-[#FF5A3D] p-1">
        <div className="bg-corporate-dark text-gray-400 text-xs py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
            <span>Made by Palmer House Productions</span>
            <span>Powered by Love & Creativity</span>
            <span>Last updated {new Date().toLocaleDateString()}</span>
            <span>Copyright {currentYear} Palmer House Productions. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};