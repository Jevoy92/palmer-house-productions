
import { Navigation } from "@/components/Navigation";
import { Contact } from "@/components/Contact";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="pt-24 pb-16 bg-video-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-3 gradient-social-3 rounded-full text-white font-bold text-lg mb-8 video-shadow">
              ✉️ Ready to Begin
            </div>
            <h1 className="text-6xl md:text-7xl font-display font-black mb-8 text-corporate-dark tracking-tight">
              Start Your <span className="text-gradient-1">Campaign</span> Today
            </h1>
            <p className="text-2xl text-corporate-gray mb-12 max-w-4xl mx-auto font-medium">
              Let's create something extraordinary together. Your story deserves to be told with clarity and impact.
            </p>
          </div>
          
          <Contact autoOpenWizard={false} />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
