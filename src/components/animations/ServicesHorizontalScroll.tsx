import { HorizontalScrollSection } from '@/components/ui/horizontal-scroll-section';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { clipPathReveal } from '@/lib/gsap';
import { useEffect, useRef } from 'react';

const services = [
  {
    title: "Content Systems",
    description: "Build repeatable video content that works across every platform",
    features: [
      "30 Reels in 30 Days",
      "Customer-facing FAQ videos",
      "Internal SOP & onboarding videos",
      "Evergreen YouTube strategy",
      "Content Calendars",
      "Social cutdowns (Reels, TikTok, Shorts)"
    ],
    color: "bg-social-orange"
  },
  {
    title: "Content Strategy", 
    description: "Strategic frameworks that amplify your founder voice",
    features: [
      "Founder Script Bundle",
      "Tone of voice guidelines",
      "Video Strategy Blueprint",
      "On-Camera Confidence training",
      "Group Coaching: The Camera-Ready Brain"
    ],
    color: "bg-social-blue"
  },
  {
    title: "Brand Identity",
    description: "Cinematic storytelling that builds authentic authority",
    features: [
      "Founder \"About Me\" films",
      "Brand story and positioning videos", 
      "Social proof and testimonial films",
      "Recruitment & culture capsules",
      "Event recaps"
    ],
    color: "bg-social-purple"
  }
];

export const ServicesHorizontalScroll = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.service-card');
    clipPathReveal(Array.from(cards), {
      trigger: sectionRef.current,
      direction: 'left',
      stagger: 0.2
    });
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-video-black text-video-white">
      <HorizontalScrollSection speed={0.8} snap={true}>
        {services.map((service, index) => (
          <div key={index} className="service-card w-full h-full flex items-center justify-center px-8">
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-8">
                <div>
                  <span className="text-sm font-semibold tracking-widest uppercase text-gray-400 mb-4 block">
                    Service {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-5xl lg:text-6xl font-bold mb-6">{service.title}</h3>
                  <p className="text-xl text-gray-300 leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>
                
                <MagneticButton 
                  variant="default"
                  className="text-lg px-8 py-4"
                  intensity={0.4}
                >
                  Learn More
                </MagneticButton>
              </div>

              {/* Features */}
              <div className={`${service.color} rounded-2xl p-8 lg:p-12`}>
                <ul className="space-y-4">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-white">
                      <svg className="mt-2 mr-4 w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </HorizontalScrollSection>
    </section>
  );
};