
import { useState, useEffect } from "react";
import { ContactWizard } from "./ContactWizard";
import { JourneyWizard } from "./JourneyWizard";

interface ContactProps {
  autoOpenWizard?: boolean;
}

export const Contact = ({ autoOpenWizard = false }: ContactProps) => {
  const [isWizardOpen, setIsWizardOpen] = useState(autoOpenWizard);
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);

  useEffect(() => {
    if (autoOpenWizard) {
      setIsJourneyOpen(true); // Default to journey wizard
    }
  }, [autoOpenWizard]);

  const handleStrategyCall = () => {
    window.open('https://calendly.com/palmerhouseproductions-info/general-strategy-call', '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Ready to Begin?
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Your authentic story is waiting to be told. Let's turn your vision into content that resonates.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-lg p-12 mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Palmer House Productions</h2>
            <p className="text-lg text-gray-600 mb-8">
              Where authentic storytelling meets meaningful results.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={() => setIsJourneyOpen(true)}
                className="px-8 py-4 bg-purple-600 text-white font-semibold text-lg rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Start Your Journey 🗺️
              </button>
              <button 
                onClick={handleStrategyCall}
                className="px-8 py-4 border-2 border-purple-600 text-purple-600 font-semibold text-lg rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-300"
              >
                Book Strategy Call 📞
              </button>
            </div>

            {/* Alternative Option */}
            <div className="text-sm text-gray-500 mb-8">
              Prefer the detailed approach?{' '}
              <button
                onClick={() => setIsWizardOpen(true)}
                className="text-purple-600 font-medium hover:underline"
              >
                Use Full Wizard
              </button>
            </div>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-purple-600 text-2xl">📧</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm break-all">info@palmerhouseproductions.com</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-purple-600 text-2xl">📱</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">425-738-7312</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-purple-600 text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
              <p className="text-gray-600">Within 24 hours</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-500">
            © 2025 Palmer House Productions. All rights reserved. Crafting authentic stories since day one.
          </p>
        </footer>
      </div>

      <ContactWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} />
      <JourneyWizard open={isJourneyOpen} onOpenChange={setIsJourneyOpen} />
    </section>
  );
};
