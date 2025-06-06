
import { useState } from "react";
import { ContactForm } from "./ContactForm";

export const Contact = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section id="contact" className="py-32 bg-black">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-sf font-semibold mb-8 text-white tracking-tight">Ready to Start?</h2>
        
        <p className="text-xl text-apple-gray-3 mb-12 leading-relaxed max-w-2xl mx-auto">
          Let's create something extraordinary together. 
          Your story deserves to be told beautifully.
        </p>
        
        <div className="bg-apple-gray-6 rounded-3xl p-12 mb-16">
          <h3 className="text-3xl font-sf font-semibold text-white mb-6">Palmer House Productions</h3>
          <p className="text-lg text-apple-gray-3 mb-8">
            Cinematic storytelling for the digital age.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsFormOpen(true)}
              className="px-8 py-4 bg-apple-blue text-white font-medium rounded-xl hover:bg-apple-blue/90 transition-all duration-200"
            >
              Get Started
            </button>
            <button className="px-8 py-4 border border-apple-gray-4 text-apple-gray-2 font-medium rounded-xl hover:bg-apple-gray-4/10 transition-all duration-200">
              Schedule a Call
            </button>
          </div>
        </div>
        
        <footer className="border-t border-apple-gray-5 pt-8">
          <p className="text-apple-gray-4">
            © 2024 Palmer House Productions. All rights reserved.
          </p>
        </footer>
      </div>

      <ContactForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </section>
  );
};
