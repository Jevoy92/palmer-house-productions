import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { SocialIcon } from "react-social-icons";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import footerCharacter from "@/assets/footer-character.png";

export const EnhancedFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-16 overflow-x-hidden">
      {/* Character Peeking Over */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-64 h-64">
        <img 
          src={footerCharacter} 
          alt="Palmer House Productions Mascot" 
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>

      {/* 4-Color Background Bars */}
      <div className="absolute inset-0 w-full h-full">
        <div className="w-full h-full flex">
          <div className="w-1/4 h-full bg-pal-orange"></div>
          <div className="w-1/4 h-full bg-pal-purple"></div>
          <div className="w-1/4 h-full bg-pal-green"></div>
          <div className="w-1/4 h-full bg-pal-blue"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Main Footer Content - White Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 video-shadow-xl mb-8">
            {/* CTA Speech Bubble */}
            <div className="text-center mb-12 -mt-8">
              <div className="inline-block bg-gradient-to-r from-pal-orange to-pal-purple text-white rounded-2xl px-8 py-6 video-shadow-lg">
                <h3 className="text-2xl font-bold mb-2">Ready to Create Amazing Video Content?</h3>
                <p className="text-white/90 mb-4">Let's bring your story to life with professional video production.</p>
                <Link 
                  to="/contact" 
                  className="inline-block bg-white text-pal-purple px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                >
                  Get Started Today
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
              {/* Company Info */}
              <div className="space-y-4 lg:col-span-1">
                <h3 className="text-xl font-display font-bold text-corporate-dark">Palmer House Productions</h3>
                <p className="text-corporate-gray text-sm leading-relaxed">
                  Crafting authentic stories since day one. We help businesses connect with their audience through powerful video content.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start text-sm text-corporate-gray">
                    <MapPin size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                    <span className="break-words">Studios in Bellevue, WA and Portland, OR — serving clients globally</span>
                  </div>
                  <div className="flex items-start text-sm text-corporate-gray">
                    <Mail size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                    <a href="mailto:info@palmerhouseproductions.com" className="hover:text-corporate-dark transition-colors break-all">
                      info@palmerhouseproductions.com
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-corporate-gray">
                    <Phone size={16} className="mr-2 flex-shrink-0" />
                    <a href="tel:+14257387312" className="hover:text-corporate-dark transition-colors">
                      425-738-7312
                    </a>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="space-y-4">
                <h4 className="font-bold text-corporate-dark">Services</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/reel-pal" className="text-corporate-gray hover:text-pal-orange transition-colors">
                      Social Content
                    </Link>
                  </li>
                  <li>
                    <Link to="/system-pal" className="text-corporate-gray hover:text-pal-purple transition-colors">
                      Training Systems
                    </Link>
                  </li>
                  <li>
                    <Link to="/evergreen-pal" className="text-corporate-gray hover:text-pal-green transition-colors">
                      Evergreen Content
                    </Link>
                  </li>
                  <li>
                    <Link to="/spotlight-pal" className="text-corporate-gray hover:text-pal-blue transition-colors">
                      Premium Production
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/diy-downloads" className="text-corporate-gray hover:text-pal-purple transition-colors">
                      DIY Downloads
                    </Link>
                  </li>
                  <li>
                    <Link to="/safety-videos" className="text-corporate-gray hover:text-pal-purple transition-colors">
                      Safety Videos
                    </Link>
                  </li>
                  <li>
                    <Link to="/startups" className="text-corporate-gray hover:text-pal-orange transition-colors">
                      Startups
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Locations */}
              <div className="space-y-4">
                <h4 className="font-bold text-corporate-dark">Locations</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/locations/bellevue-wa" className="text-corporate-gray hover:text-pal-blue transition-colors">
                      Bellevue, WA
                    </Link>
                  </li>
                  <li>
                    <Link to="/locations/portland-or" className="text-corporate-gray hover:text-pal-blue transition-colors">
                      Portland, OR
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-corporate-gray hover:text-pal-blue transition-colors">
                      Global / Remote Projects
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company & Resources */}
              <div className="space-y-4">
                <h4 className="font-bold text-corporate-dark">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/about-us" className="text-corporate-gray hover:text-pal-green transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/company/team" className="text-corporate-gray hover:text-pal-green transition-colors">
                      Our Team
                    </Link>
                  </li>
                  <li>
                    <Link to="/company/values" className="text-corporate-gray hover:text-pal-green transition-colors">
                      Our Values
                    </Link>
                  </li>
                  <li>
                    <Link to="/resources/reviews" className="text-corporate-gray hover:text-pal-green transition-colors">
                      Client Reviews
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-corporate-gray hover:text-pal-green transition-colors">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h4 className="font-bold text-corporate-dark">Connect</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-corporate-gray">
                    <Link to="/contact" className="hover:text-pal-orange transition-colors">
                      Get Started Today
                    </Link>
                  </p>
                  <p className="text-corporate-gray">
                    <a 
                      href="/sitemap.xml" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-pal-orange transition-colors"
                    >
                      Sitemap
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <NewsletterSignup />

            {/* Bottom Bar */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <p className="text-corporate-gray text-sm">
                  © {currentYear} Palmer House Productions. All rights reserved. Crafting authentic stories since day one.
                </p>
                
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex space-x-6">
                    <Link to="/privacy" className="text-corporate-gray hover:text-corporate-dark text-sm transition-colors">
                      Privacy Policy
                    </Link>
                    <Link to="/terms" className="text-corporate-gray hover:text-corporate-dark text-sm transition-colors">
                      Terms of Service
                    </Link>
                  </div>
                  
                  {/* Social Media Icons */}
                  <div className="flex gap-2">
                    <SocialIcon
                      url="https://www.facebook.com/profile.php?id=100092553086353"
                      style={{ height: 32, width: 32 }}
                      bgColor="#4267B2"
                      className="hover:opacity-80 transition-opacity"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    />
                    <SocialIcon
                      url="https://www.instagram.com/palmerhouseproductions"
                      style={{ height: 32, width: 32 }}
                      bgColor="#E4405F"
                      className="hover:opacity-80 transition-opacity"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    />
                    <SocialIcon
                      url="https://www.youtube.com/channel/UCe7_R47Klv_JdupA1exogMw"
                      style={{ height: 32, width: 32 }}
                      bgColor="#FF0000"
                      className="hover:opacity-80 transition-opacity"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                    />
                    <SocialIcon
                      url="https://www.linkedin.com/company/palmer-house-productions/"
                      style={{ height: 32, width: 32 }}
                      bgColor="#0077B5"
                      className="hover:opacity-80 transition-opacity"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    />
                    <SocialIcon
                      url="https://x.com/palmerhouseviz"
                      style={{ height: 32, width: 32 }}
                      bgColor="#000000"
                      className="hover:opacity-80 transition-opacity"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="X (Twitter)"
                    />
                    <SocialIcon
                      url="https://www.pinterest.com/palmerhouseproductions/"
                      style={{ height: 32, width: 32 }}
                      bgColor="#BD081C"
                      className="hover:opacity-80 transition-opacity"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Pinterest"
                    />
                    <SocialIcon
                      url="https://www.tiktok.com/@palmerhouseproductions"
                      style={{ height: 32, width: 32 }}
                      bgColor="#000000"
                      className="hover:opacity-80 transition-opacity"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                    />
                    <SocialIcon
                      url="https://www.threads.net/@palmerhouseproductions"
                      style={{ height: 32, width: 32 }}
                      bgColor="#000000"
                      className="hover:opacity-80 transition-opacity"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Threads"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};