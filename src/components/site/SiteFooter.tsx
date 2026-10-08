import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { footerColumns, locations, socials, contactInfo } from "@/data/nav";
import { SiteAppearance } from "./SiteAppearance";
import { NewsletterSignup } from "./NewsletterSignup";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-intro">
          <Link to="/" className="site-footer-brand">
            Palmer House<span>Productions</span>
          </Link>
          <p>Bring an idea. Choose the help you need. Make something useful.</p>
          <div className="site-footer-contact">
            <a href={`mailto:${contactInfo.email}`}>
              {contactInfo.email}
              <ArrowUpRight size={15} aria-hidden />
            </a>
            <a href={contactInfo.phoneHref}>{contactInfo.phone}</a>
          </div>
          <NewsletterSignup />
          <SiteAppearance />
        </div>
        {footerColumns.map((column) => (
          <nav key={column.label} aria-label={column.label} className="site-footer-column">
            <h2>{column.label}</h2>
            <ul>
              {column.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="site-footer-regions">
        <span>Pacific Northwest & beyond</span>
        {locations.map((item) => (
          <Link key={item.to} to={item.to}>
            {item.label}
          </Link>
        ))}
      </div>
      <div className="site-footer-bottom">
        <p>© {new Date().getFullYear()} Palmer House Productions</p>
        <div className="site-footer-socials">
          {socials
            .filter((item) => ["Instagram", "YouTube", "LinkedIn"].includes(item.label))
            .map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
                {item.label}
                <ArrowUpRight size={12} aria-hidden />
              </a>
            ))}
        </div>
        <div>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
