import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone, MapPin, Twitter } from "lucide-react";

export const EnhancedFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-corporate-dark text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-display font-bold text-white">Palmer House Productions</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Crafting authentic stories since day one. We help businesses connect with their audience through powerful video content.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <MapPin size={16} className="mr-2" />
                <span>Serving clients nationwide</span>
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
                <Link to="/discovery-call" className="text-gray-300 hover:text-white transition-colors">
                  Discovery Call
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
                <Link to="/client-results" className="text-gray-300 hover:text-white transition-colors">
                  Client Results
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
            <div className="grid grid-cols-4 gap-3 max-w-[200px]">
              <a
                href="https://www.facebook.com/profile.php?id=100092553086353"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors p-2 rounded-md hover:bg-white/10"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/palmerhouseproductions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors p-2 rounded-md hover:bg-white/10"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCe7_R47Klv_JdupA1exogMw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors p-2 rounded-md hover:bg-white/10"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/palmer-house-productions/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors p-2 rounded-md hover:bg-white/10"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://x.com/palmerhouseviz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors p-2 rounded-md hover:bg-white/10"
                aria-label="Follow us on X (Twitter)"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://www.pinterest.com/palmerhouseproductions/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors p-2 rounded-md hover:bg-white/10"
                aria-label="Follow us on Pinterest"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.372 0 12s5.373 12 12 12c6.627 0 12-5.372 12-12S18.627 0 12 0zM12 2.88c1.294 0 2.357.238 3.346.762 1.35.717 2.214 2.047 2.214 3.758 0 1.81-.903 3.41-2.617 3.41-.66 0-1.26-.495-1.26-1.155 0-.66.495-1.26 1.26-1.26.495 0 .825.22.825.715 0 .33-.165.55-.44.66v.11c.33 0 .66-.275.66-.825 0-.88-.77-1.485-1.65-1.485-.77 0-1.43.385-1.43 1.32 0 1.045.66 1.8 1.65 1.8 1.43 0 2.53-1.265 2.53-2.915 0-1.375-.825-2.475-2.255-2.915-.44-.11-.935-.165-1.43-.165-2.255 0-4.07 1.815-4.07 4.07v7.37c0 1.1.825 1.98 1.925 1.98 1.1 0 1.925-.88 1.925-1.98v-7.37z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@palmerhouseproductions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors p-2 rounded-md hover:bg-white/10"
                aria-label="Follow us on TikTok"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://www.threads.com/@palmerhouseproductions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors p-2 rounded-md hover:bg-white/10"
                aria-label="Follow us on Threads"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.186 24h-.007c-5.828-.024-10.553-4.749-10.579-10.579C1.576 7.593 6.301 2.868 12.129 2.844c5.828.024 10.553 4.749 10.579 10.579-.026 5.828-4.751 10.553-10.579 10.579h-.007zm5.023-11.125c0-1.33-.488-2.494-1.452-3.458-.964-.964-2.129-1.452-3.458-1.452s-2.494.488-3.458 1.452c-.964.964-1.452 2.129-1.452 3.458 0 1.329.488 2.494 1.452 3.458.964.964 2.129 1.452 3.458 1.452s2.494-.488 3.458-1.452c.964-.964 1.452-2.129 1.452-3.458zm-2.755 0c0 .751-.268 1.402-.802 1.936-.535.535-1.185.802-1.936.802s-1.402-.268-1.936-.802c-.535-.535-.802-1.185-.802-1.936s.268-1.402.802-1.936c.535-.535 1.185-.802 1.936-.802s1.402.268 1.936.802c.535.535.802 1.185.802 1.936z"/>
                </svg>
              </a>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">
                <Link to="/contact" className="hover:text-white transition-colors">
                  Get Started Today
                </Link>
              </p>
              <p className="text-gray-300">
                <a href="/sitemap.xml" className="hover:text-white transition-colors">
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