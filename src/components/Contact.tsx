
import { useState } from "react";
import { ContactForm } from "./ContactForm";

export const Contact = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleStrategyCall = () => {
    window.open('https://calendly.com/palmerhouseproductions-info/general-strategy-call', '_blank');
  };

  return (
    <section id="contact" className="py-32 bg-corporate-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 gradient-social-1 rounded-full opacity-10 float-animation"></div>
        <div className="absolute top-40 right-20 w-32 h-32 gradient-social-2 rounded-full opacity-15 float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-48 h-48 gradient-social-3 rounded-full opacity-10 float-animation" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 gradient-social-4 rounded-full opacity-12 float-animation" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <div className="mb-16">
          <div className="inline-block px-6 py-3 gradient-social-1 rounded-full text-white font-bold text-lg mb-8 video-shadow">
            🚀 Let's Create Something Viral
          </div>
          <h2 className="text-6xl md:text-7xl font-display font-black mb-8 text-white tracking-tight">
            Ready to <span className="text-gradient-1">Dominate</span>?
          </h2>
          <p className="text-2xl text-corporate-light mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
            Your next viral moment is just one conversation away. 
            Let's turn your vision into content that converts.
          </p>
        </div>
        
        <div className="bg-video-white rounded-3xl p-12 mb-16 video-shadow-lg">
          <h3 className="text-4xl font-display font-black text-corporate-dark mb-6">Palmer House Productions</h3>
          <p className="text-xl text-corporate-gray mb-8 font-medium">
            Where viral content meets corporate results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <button 
              onClick={() => setIsFormOpen(true)}
              className="px-10 py-5 gradient-social-1 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-all duration-300 video-shadow"
            >
              Start Your Campaign 📹
            </button>
            <button 
              onClick={handleStrategyCall}
              className="px-10 py-5 border-2 border-social-purple text-social-purple font-bold text-lg rounded-2xl hover:bg-social-purple hover:text-white transition-all duration-300 video-shadow"
            >
              Book Strategy Call 📞
            </button>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-corporate-light rounded-2xl">
              <div className="w-12 h-12 gradient-social-2 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-xl">📧</span>
              </div>
              <div className="font-bold text-corporate-dark">Email Us</div>
              <div className="text-corporate-gray text-sm">information@palmerhouseproductions.com</div>
            </div>
            <div className="p-6 bg-corporate-light rounded-2xl">
              <div className="w-12 h-12 gradient-social-3 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-xl">📱</span>
              </div>
              <div className="font-bold text-corporate-dark">Call Us</div>
              <div className="text-corporate-gray text-sm">425-738-7312</div>
            </div>
            <div className="p-6 bg-corporate-light rounded-2xl">
              <div className="w-12 h-12 gradient-social-4 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-xl">⚡</span>
              </div>
              <div className="font-bold text-corporate-dark">Response Time</div>
              <div className="text-corporate-gray text-sm">Within 24 hours</div>
            </div>
          </div>
        </div>
        
        <footer className="border-t border-corporate-gray pt-8">
          <p className="text-corporate-light">
            © 2024 Palmer House Productions. All rights reserved. Making brands go viral since day one.
          </p>
        </footer>
      </div>

      <ContactForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </section>
  );
};
