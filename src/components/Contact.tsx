
import { useState } from "react";
import { ContactWizard } from "./ContactWizard";
import { ContactHeader } from "./contact/ContactHeader";
import { ProcessPreview } from "./contact/ProcessPreview";
import { ReviewsSection } from "./contact/ReviewsSection";
import { BottomCTA } from "./contact/BottomCTA";


interface ContactProps {
  autoOpenWizard?: boolean;
}

export const Contact = ({ autoOpenWizard = false }: ContactProps) => {
  const [isWizardOpen, setIsWizardOpen] = useState(autoOpenWizard);

  const handleZohoBooking = () => {
    window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078320', '_blank', 'noopener,noreferrer');
  };

  const handleViewAllReviews = () => {
    window.open('https://www.google.com/search?q=palmer+house+productions&oq=palmer+house+productions&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGD0yBggCEEUYPTIGCAMQRRhB0gEINTI0OWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x54905d5328d9caa5:0x5946127015c6ae31,1,,,,', '_blank');
  };

  return (
    <section id="contact" className="section-padding bg-white min-h-screen">
      <div className="max-w-7xl mx-auto container-padding">
        <ContactHeader />

        <ProcessPreview />

        <ReviewsSection onViewAllReviews={handleViewAllReviews} />

        <BottomCTA 
          onStartAssessment={() => window.location.href = '/content-strategy'}
          onBookCall={handleZohoBooking}
          onComprehensiveStrategy={() => setIsWizardOpen(true)}
        />
      </div>

      <ContactWizard open={isWizardOpen} onOpenChange={setIsWizardOpen} />
    </section>
  );
};
