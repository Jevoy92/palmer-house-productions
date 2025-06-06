
export const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Ready to Begin?</h2>
        
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"></div>
        
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Whether you're just launching or 10 years in, if your story matters and you're ready to tell it 
          in a way that sticks—you're in the right place.
        </p>
        
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-amber-400 mb-4">Palmer House Productions</h3>
          <p className="text-lg text-gray-300 mb-6">
            Where story meets scale—and your brand takes the scenic route to unforgettable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-semibold rounded-lg hover:from-amber-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105">
              Get Started Today
            </button>
            <button className="px-8 py-3 border border-amber-400 text-amber-400 font-semibold rounded-lg hover:bg-amber-400 hover:text-slate-950 transition-all duration-300">
              Schedule a Call
            </button>
          </div>
        </div>
        
        <footer className="border-t border-slate-700 pt-8">
          <p className="text-gray-500">
            © 2024 Palmer House Productions. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
};
