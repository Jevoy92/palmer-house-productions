
import { useState } from "react";
import { ContactHeader } from "./contact/ContactHeader";
import { ProcessPreview } from "./contact/ProcessPreview";
import { ReviewsSection } from "./contact/ReviewsSection";
import { BottomCTA } from "./contact/BottomCTA";


interface ContactProps {
  autoOpenWizard?: boolean;
}

export const Contact = ({ autoOpenWizard = false }: ContactProps) => {

  const handleZohoBooking = () => {
    window.open('https://palmerhouseproductions.zohobookings.com/#/4740771000000078320', '_blank', 'noopener,noreferrer');
  };

  const handleViewAllReviews = () => {
    window.open('https://www.google.com/search?q=palmer+house+productions&oq=palmer+house+productions&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGD0yBggCEEUYPTIGCAMQRRhB0gEINTI0OWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x54905d5328d9caa5:0x5946127015c6ae31,1,,,,', '_blank');
  };

  return (
    <section id="contact" className="pt-24 pb-12 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <ContactHeader />

        <ProcessPreview />

        <ReviewsSection onViewAllReviews={handleViewAllReviews} />

        <BottomCTA 
          onStartAssessment={() => window.location.href = '/content-strategy'}
          onBookCall={handleZohoBooking}
          onComprehensiveStrategy={() => window.location.href = '/video-packages'}
        />
      </div>
    </section>
  );
};
