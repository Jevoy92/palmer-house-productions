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
                <a href="mailto:hello@palmerhouseproductions.com" className="hover:text-white transition-colors">
                  hello@palmerhouseproductions.com
                </a>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Phone size={16} className="mr-2" />
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  (123) 456-7890
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
                  <path d="M12 0C5.373 0 0 5.372 0 12s5.373 12 12 12c6.628 0 12-5.372 12-12S18.628 0 12 0zm0 19c-.721 0-1.418-.109-2.073-.312.286-.465.713-1.227.87-1.835l.437-1.664c.229.436.895.818 1.603.818 2.111 0 3.633-1.941 3.633-4.354 0-2.312-1.888-4.042-4.316-4.042-3.021 0-4.625 2.003-4.625 4.191 0 1.062.568 2.399 1.488 2.822.151.069.232.039.268-.107.025-.101.118-.474.155-.617.049-.19.03-.257-.104-.423-.291-.364-.525-.839-.525-1.479 0-1.847 1.455-3.275 3.565-3.275 1.949 0 3.291 1.189 3.291 2.731 0 1.879-.834 3.177-1.996 3.177-.633 0-1.107-.497-.954-1.234.183-.881.537-1.831.537-2.466 0-.569-.32-.945-.985-.945-.78 0-1.406.768-1.406 1.797 0 .655.235 1.099.235 1.099s-.783 3.147-.926 3.738c-.11.454-.067.922-.044 1.371-4.317-1.963-7.33-6.298-7.33-11.315C.937 6.049 5.985.937 12 .937S23.063 6.049 23.063 12c0 5.986-5.048 11.063-11.063 11.063z"/>
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
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.5v-.003c0-3.082.85-5.933 2.487-8.468C5.838 1.205 8.592.024 12.173 0h.014c3.581.024 6.334 1.205 8.184 3.509C21.99 5.558 22.84 8.412 22.84 11.497v.003c0 3.082-.85 5.933-2.487 8.468C18.662 22.795 15.907 23.976 12.326 24h-.14zm.014-2.97c2.751-.02 4.852-.932 6.239-2.713 1.348-1.731 2.03-4.118 2.03-7.097v-.003c0-2.98-.682-5.367-2.03-7.098C16.853 2.358 14.751 1.447 12 1.467c-2.751.02-4.852.932-6.239 2.713C4.413 5.91 3.73 8.297 3.73 11.277v.003c0 2.98.683 5.367 2.031 7.097C7.148 20.138 9.249 21.05 12 21.03zm3.14-9.13c-.14 1.165-.626 2.165-1.444 2.97-.816.803-1.847 1.205-3.068 1.205-1.221 0-2.252-.403-3.068-1.206-.818-.805-1.304-1.805-1.444-2.97h9.024zm-4.512 6.225c1.94 0 3.564-.69 4.827-2.044 1.263-1.354 1.929-3.06 1.978-5.066H2.553c.049 2.006.715 3.712 1.978 5.066 1.263 1.354 2.887 2.044 4.827 2.044z"/>
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