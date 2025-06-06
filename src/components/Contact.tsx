
import { useState } from "react";
import { ContactForm } from "./ContactForm";

export const Contact = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section id="contact" className="py-20 bg-deep-charcoal">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-cream-white">Ready to Begin?</h2>
        
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent-terracotta to-transparent mx-auto mb-8"></div>
        
        <p className="text-xl text-muted-gray mb-8 leading-relaxed">
          Whether you're just launching or 10 years in, if your story matters and you're ready to tell it 
          in a way that sticks—you're in the right place.
        </p>
        
        <div className="bg-warm-brown/30 border border-warm-brown rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-accent-terracotta mb-4">Palmer House Productions</h3>
          <p className="text-lg text-muted-gray mb-6">
            Where story meets scale—and your brand takes the scenic route to unforgettable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsFormOpen(true)}
              className="px-8 py-3 bg-gradient-to-r from-accent-terracotta to-warm-brown text-cream-white font-semibold rounded-lg hover:from-accent-terracotta/90 hover:to-warm-brown/90 transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
            </button>
            <button className="px-8 py-3 border border-warm-beige text-warm-beige font-semibold rounded-lg hover:bg-warm-beige hover:text-deep-charcoal transition-all duration-300">
              Schedule a Call
            </button>
          </div>
        </div>
        
        <footer className="border-t border-warm-brown pt-8">
          <p className="text-muted-gray">
            © 2024 Palmer House Productions. All rights reserved.
          </p>
        </footer>
      </div>

      <ContactForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </section>
  );
};
