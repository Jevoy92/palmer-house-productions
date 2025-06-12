import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const ThankYou = () => {
  useEffect(() => {
    // Google Ads conversion tracking code can be added here
    // Example: gtag('event', 'conversion', {'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL'});
    
    // Google Analytics event tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'form_submit', {
        event_category: 'Contact',
        event_label: 'Contact Form Submission'
      });
    }
    
    console.log('Conversion tracked: Contact form submission');

    // Send emails for both contact forms
    const contactFormData = localStorage.getItem('contactFormData');
    const glimpseFormData = localStorage.getItem('glimpseContactFormData');
    
    if (contactFormData) {
      sendContactEmail(JSON.parse(contactFormData));
      localStorage.removeItem('contactFormData');
    }
    
    if (glimpseFormData) {
      sendGlimpseEmail(JSON.parse(glimpseFormData));
      localStorage.removeItem('glimpseContactFormData');
    }
  }, []);

  const sendContactEmail = (formData: any) => {
    const subject = `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`;
    const body = `
New contact form submission:

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

Challenge: ${formData.challenge}
Pathway: ${formData.pathway}
Message: ${formData.message}

Referral Source: ${formData.referralSource || 'Not provided'}
Readiness: ${formData.readiness || 'Not provided'}

Submitted: ${new Date().toLocaleString()}
    `;
    
    const mailtoLink = `mailto:info@palmerhouseproductions.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };

  const sendGlimpseEmail = (formData: any) => {
    const subject = `New Glimpse Inquiry from ${formData.firstName} ${formData.lastName}`;
    const body = `
New Glimpse form submission:

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company}
Website: ${formData.website || 'Not provided'}

Current Challenge: ${formData.currentChallenge}
Timeline: ${formData.timeline}
Budget: ${formData.budget}

Submitted: ${new Date().toLocaleString()}
    `;
    
    const mailtoLink = `mailto:info@palmerhouseproductions.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-video-white to-corporate-light flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-24 h-24 gradient-social-1 rounded-full flex items-center justify-center mx-auto mb-6 video-shadow-lg">
            <CheckCircle size={48} className="text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-black text-corporate-dark mb-6">
            Thank <span className="text-gradient-1">You!</span>
          </h1>
          <p className="text-2xl text-corporate-gray mb-8 leading-relaxed">
            Your message has been sent successfully. 
            <br />
            We'll get back to you within 24 hours.
          </p>
        </div>

        <div className="bg-video-white rounded-3xl p-8 video-shadow-lg mb-8">
          <h2 className="text-3xl font-display font-bold text-corporate-dark mb-4">
            What happens next?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 gradient-social-2 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">📧</span>
              </div>
              <h3 className="font-bold text-corporate-dark mb-2">We Review</h3>
              <p className="text-corporate-gray text-sm">Your inquiry is reviewed by our team</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 gradient-social-3 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">💬</span>
              </div>
              <h3 className="font-bold text-corporate-dark mb-2">We Connect</h3>
              <p className="text-corporate-gray text-sm">Personal response within 24 hours</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 gradient-social-4 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-xl">🚀</span>
              </div>
              <h3 className="font-bold text-corporate-dark mb-2">We Create</h3>
              <p className="text-corporate-gray text-sm">Start crafting your story together</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/"
            className="px-8 py-4 gradient-social-1 text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300 video-shadow"
          >
            Back to Home
          </Link>
          <a 
            href="https://calendly.com/palmerhouseproductions-info/general-strategy-call"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-social-purple text-social-purple font-bold rounded-2xl hover:bg-social-purple hover:text-white transition-all duration-300 video-shadow"
          >
            Book Strategy Call
          </a>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
