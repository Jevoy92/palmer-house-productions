import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { SocialIcon } from "react-social-icons";

export const EnhancedFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-corporate-dark text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold text-white">Palmer House Productions</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Crafting authentic stories since day one. We help businesses connect with their audience through powerful video content.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <MapPin size={16} className="mr-2" />
                <span>Studios in Bellevue, WA and Portland, OR — serving clients globally</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Mail size={16} className="mr-2" />
                <a href="mailto:info@palmerhouseproductions.com" className="hover:text-white transition-colors">
                  info@palmerhouseproductions.com
                </a>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Phone size={16} className="mr-2" />
                <a href="tel:+14257387312" className="hover:text-white transition-colors">
                  425-738-7312
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/video-packages" className="text-gray-300 hover:text-white transition-colors">
                  Video Packages
                </Link>
              </li>
              <li>
                <Link to="/services/monthly-content" className="text-gray-300 hover:text-white transition-colors">
                  Monthly Content
                </Link>
              </li>
              <li>
                <Link to="/services/group-coaching" className="text-gray-300 hover:text-white transition-colors">
                  Group Coaching
                </Link>
              </li>
              <li>
                <Link to="/services/diy-downloads" className="text-gray-300 hover:text-white transition-colors">
                  DIY Downloads
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Discovery Call
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">Locations</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/locations/bellevue-wa" className="text-gray-300 hover:text-white transition-colors">
                  Bellevue, WA
                </Link>
              </li>
              <li>
                <Link to="/locations/portland-or" className="text-gray-300 hover:text-white transition-colors">
                  Portland, OR
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Global / Remote Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Resources */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about-us" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/company/team" className="text-gray-300 hover:text-white transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/company/values" className="text-gray-300 hover:text-white transition-colors">
                  Our Values
                </Link>
              </li>
              <li>
                <Link to="/resources/reviews" className="text-gray-300 hover:text-white transition-colors">
                  Client Reviews
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">Connect With Us</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-w-none overflow-hidden">
              <SocialIcon
                url="https://www.facebook.com/profile.php?id=100092553086353"
                style={{ height: 32, width: 32 }}
                bgColor="transparent"
                fgColor="#d1d5db"
                className="hover:opacity-80 transition-opacity"
                target="_blank"
              />
              <SocialIcon
                url="https://www.instagram.com/palmerhouseproductions"
                style={{ height: 32, width: 32 }}
                bgColor="transparent"
                fgColor="#d1d5db"
                className="hover:opacity-80 transition-opacity"
                target="_blank"
              />
              <SocialIcon
                url="https://www.youtube.com/channel/UCe7_R47Klv_JdupA1exogMw"
                style={{ height: 32, width: 32 }}
                bgColor="transparent"
                fgColor="#d1d5db"
                className="hover:opacity-80 transition-opacity"
                target="_blank"
              />
              <SocialIcon
                url="https://www.linkedin.com/company/palmer-house-productions/"
                style={{ height: 32, width: 32 }}
                bgColor="transparent"
                fgColor="#d1d5db"
                className="hover:opacity-80 transition-opacity"
                target="_blank"
              />
              <SocialIcon
                url="https://x.com/palmerhouseviz"
                style={{ height: 32, width: 32 }}
                bgColor="transparent"
                fgColor="#d1d5db"
                className="hover:opacity-80 transition-opacity"
                target="_blank"
              />
              <SocialIcon
                url="https://www.pinterest.com/palmerhouseproductions/"
                style={{ height: 32, width: 32 }}
                bgColor="transparent"
                fgColor="#d1d5db"
                className="hover:opacity-80 transition-opacity"
                target="_blank"
              />
              <SocialIcon
                url="https://www.tiktok.com/@palmerhouseproductions"
                style={{ height: 32, width: 32 }}
                bgColor="transparent"
                fgColor="#d1d5db"
                className="hover:opacity-80 transition-opacity"
                target="_blank"
              />
              <SocialIcon
                url="https://www.threads.com/@palmerhouseproductions"
                style={{ height: 32, width: 32 }}
                bgColor="transparent"
                fgColor="#d1d5db"
                className="hover:opacity-80 transition-opacity"
                target="_blank"
              />
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">
                <Link to="/contact" className="hover:text-white transition-colors">
                  Get Started Today
                </Link>
              </p>
              <p className="text-gray-300">
                <a 
                  href="/sitemap.xml" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Sitemap
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} Palmer House Productions. All rights reserved. Crafting authentic stories since day one.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};