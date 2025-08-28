import { Link } from "react-router-dom";

interface RelatedLink {
  title: string;
  href: string;
  description: string;
}

interface InternalLinkingProps {
  currentPage: string;
  relatedLinks?: RelatedLink[];
}

export const InternalLinking = ({ currentPage, relatedLinks }: InternalLinkingProps) => {
  const getDefaultLinks = (page: string): RelatedLink[] => {
    switch (page) {
      case 'services':
        return [
          { title: "Video Production Packages", href: "/pathways", description: "Explore our service packages and pricing options" },
          { title: "Video Use Cases", href: "/video-use-cases", description: "See how video can transform your business operations" },
          { title: "Client Reviews", href: "/resources/reviews", description: "Read testimonials from satisfied clients" }
        ];
      case 'about':
        return [
          { title: "Our Team", href: "/team", description: "Meet the video production experts behind Palmer House Productions" },
          { title: "Client Reviews", href: "/resources/reviews", description: "Read testimonials from satisfied clients" },
          { title: "Contact Us", href: "/contact", description: "Start your video production project today" }
        ];
      case 'packages':
        return [
          { title: "Discovery Call", href: "/discovery-call", description: "Book a free consultation to discuss your video needs" },
          { title: "Video Use Cases", href: "/video-use-cases", description: "Explore different applications for business video" },
          { title: "FAQ", href: "/faq", description: "Get answers to common video production questions" }
        ];
      default:
        return [
          { title: "Our Services", href: "/#services", description: "Professional video production services for businesses" },
          { title: "Service Packages", href: "/pathways", description: "Comprehensive video production packages" },
          { title: "Get Started", href: "/contact", description: "Begin your video production journey" }
        ];
    }
  };

  const links = relatedLinks || getDefaultLinks(currentPage);

  return (
    <section className="py-16 bg-corporate-light">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display font-black mb-8 text-corporate-dark text-center">
          Explore More
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <Link 
              key={index}
              to={link.href}
              className="group p-6 bg-white rounded-2xl video-shadow hover:video-shadow-lg transition-all duration-300 mobile-touch-target"
            >
              <h3 className="text-xl font-display font-bold mb-3 text-corporate-dark group-hover:text-gradient-1 transition-colors">
                {link.title}
              </h3>
              <p className="text-corporate-gray leading-relaxed">
                {link.description}
              </p>
              <div className="mt-4 text-sm font-bold text-gradient-1 group-hover:underline">
                Learn More →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};