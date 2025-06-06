
import { useState } from "react";
import { ContactForm } from "./ContactForm";

export const Contact = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section id="contact" className="py-20 bg-sage-dark">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-warm-cream">Ready to Begin?</h2>
        
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-warm-orange to-transparent mx-auto mb-8"></div>
        
        <p className="text-xl text-stone-gray mb-8 leading-relaxed">
          Whether you're just launching or 10 years in, if your story matters and you're ready to tell it 
          in a way that sticks—you're in the right place.
        </p>
        
        <div className="bg-earth-brown/50 border border-earth-brown-light rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-warm-orange mb-4">Palmer House Productions</h3>
          <p className="text-lg text-stone-gray mb-6">
            Where story meets scale—and your brand takes the scenic route to unforgettable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsFormOpen(true)}
              className="px-8 py-3 bg-gradient-to-r from-warm-orange to-warm-orange-dark text-earth-brown-dark font-semibold rounded-lg hover:from-warm-orange-light hover:to-warm-orange transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
            </button>
            <button className="px-8 py-3 border border-sage text-sage font-semibold rounded-lg hover:bg-sage hover:text-earth-brown-dark transition-all duration-300">
              Schedule a Call
            </button>
          </div>
        </div>
        
        <footer className="border-t border-earth-brown-light pt-8">
          <p className="text-stone-gray">
            © 2024 Palmer House Productions. All rights reserved.
          </p>
        </footer>
      </div>

      <ContactForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </section>
  );
};
