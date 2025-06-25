
import { Navigation } from "@/components/Navigation";
import { Contact } from "@/components/Contact";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Contact autoOpenWizard={true} />
    </div>
  );
};

export default ContactPage;
