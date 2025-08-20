import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const CondensedClients = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Isabella Johnstun",
      role: "Client",
      company: "Wedding Photography",
      headline: "The closest thing to having an in-house creative team without actually hiring one",
      content: "Jevoy and his team did an amazing job with pictures & videos for our wedding! He was very professional and easy to work with. The turnaround time was also fantastic.",
      rating: 5,
      initials: "IJ",
      avatarColor: "bg-social-purple",
      image: "/lovable-uploads/0dda3b94-323c-47ab-beb7-c22b9c6dba45.png"
    },
    {
      name: "Athan Seyler", 
      role: "Business Owner",
      company: "Professional Services",
      headline: "They delivered exactly what we were looking for and more",
      content: "Jevoy and the Palmer House Team were fantastic! The quality of work was exceptional and the communication throughout the process was excellent.",
      rating: 5,
      initials: "AS",
      avatarColor: "bg-social-cyan",
      image: "/lovable-uploads/2537d3fc-b210-4170-93a2-d927fe38eea0.png"
    },
    {
      name: "Sarah Dylan Jensen",
      role: "Creative Director", 
      company: "Marketing Agency",
      headline: "Professional, creative, and reliable from start to finish",
      content: "Awesome experience working with Jevoy and the Palmer House team. They understood our vision perfectly and delivered outstanding results.",
      rating: 5,
      initials: "SJ",
      avatarColor: "bg-social-orange",
      image: "/lovable-uploads/825104ee-9e0a-476e-9292-fa9fafeb78e3.png"
    }
  ];

  const handleViewAllReviews = () => {
    window.location.href = '/resources/reviews';
  };

  const currentTestimonial = testimonials[activeTestimonial];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-video-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start">
        
        {/* Left Column - Header */}
        <div className="lg:col-span-1">
          <h2 className="text-7xl font-extrabold tracking-tighter mb-6 text-corporate-dark">Clients</h2>
          <p className="text-base text-corporate-gray max-w-xs">
            Real words from the people we've partnered with — honest feedback, lasting impact.
          </p>
        </div>

        {/* Right Column - Featured Testimonial */}
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row items-start gap-8">
            
            {/* Testimonial Image */}
            <div className="flex-shrink-0">
              <div className="w-[300px] h-[400px] rounded-2xl overflow-hidden video-shadow">
                <img 
                  className="w-full h-full object-cover" 
                  src={currentTestimonial.image}
                  alt={`Portrait of ${currentTestimonial.name}`}
                />
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="flex flex-col pt-4 w-full">
              
              {/* Meta Info */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-2">
                  <div className={`w-5 h-5 rounded-full ${currentTestimonial.avatarColor} flex items-center justify-center`}>
                    <span className="text-white text-[10px] font-bold">
                      {currentTestimonial.initials.toLowerCase()}
                    </span>
                  </div>
                  <span className="font-semibold text-sm tracking-wide text-corporate-dark">
                    {currentTestimonial.company.toLowerCase()}
                  </span>
                </div>
                <div className="flex space-x-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-social-orange text-social-orange" />
                  ))}
                </div>
              </div>
              
              {/* Testimonial Body */}
              <div className="flex-grow">
                <h3 className="text-3xl font-bold tracking-tight mb-6 max-w-md text-corporate-dark">
                  {currentTestimonial.headline}
                </h3>
                <p className="text-corporate-gray text-base mb-10 max-w-md">
                  {currentTestimonial.content}
                </p>
              </div>
              
              {/* Author Info */}
              <div>
                <p className="font-bold text-sm text-corporate-dark">{currentTestimonial.name}</p>
                <p className="text-corporate-gray text-sm">{currentTestimonial.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation Thumbnails */}
          <div className="mt-8 flex justify-start gap-3 pl-0 md:pl-[332px]">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === activeTestimonial 
                    ? 'border-social-orange' 
                    : 'border-transparent hover:border-social-orange/50'
                }`}
              >
                <img 
                  className={`w-full h-full object-cover transition-all duration-200 ${
                    index === activeTestimonial ? '' : 'grayscale hover:grayscale-0'
                  }`}
                  src={testimonial.image}
                  alt={`${testimonial.name} thumbnail`}
                />
              </button>
            ))}
          </div>

          {/* View All Reviews Button */}
          <div className="mt-12 pl-0 md:pl-[332px]">
            <Button 
              onClick={handleViewAllReviews}
              variant="outline"
              className="px-8 py-3 hover:scale-105 transition-all"
            >
              View All Reviews
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
        
      </div>
    </section>
  );
};