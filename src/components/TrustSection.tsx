import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

export const TrustSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const numeralRef = useRef<HTMLDivElement>(null);
  const firstStatRef = useRef<HTMLDivElement>(null);
  const secondStatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const numeral = numeralRef.current;
    const firstStat = firstStatRef.current;
    const secondStat = secondStatRef.current;

    if (!section || !numeral || !firstStat || !secondStat) return;

    // Numeral reveal animation
    gsap.fromTo(numeral, 
      { 
        opacity: 0, 
        scale: 0.8,
        filter: 'blur(10px)'
      },
      { 
        opacity: 0.4, 
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        }
      }
    );

    // First stats counter animation
    ScrollTrigger.create({
      trigger: firstStat,
      start: 'top 60%',
      onEnter: () => {
        let obj = { val: 0 };
        gsap.to(obj, {
          val: 49,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            firstStat.textContent = Math.round(obj.val) + '%';
          }
        });
      }
    });

    // Second stats counter animation
    ScrollTrigger.create({
      trigger: secondStat,
      start: 'top 60%',
      onEnter: () => {
        let obj = { val: 0 };
        gsap.to(obj, {
          val: 82,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            secondStat.textContent = '$' + Math.round(obj.val) + 'M';
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white">
      {/* Numeral and Header Section - Contained */}
      <div className="py-24">
        <div className="container mx-auto px-6 grid grid-cols-12 gap-8 items-start">
          {/* Large Numeral - Sticky */}
          <div ref={numeralRef} className="col-span-12 lg:col-span-3 sticky top-24">
            <h2 className="font-manrope text-[12rem] lg:text-[18rem] font-extrabold leading-none text-gray-400">0-1</h2>
          </div>

          {/* Intro Header */}
          <div className="col-span-12 lg:col-span-9">
            <div className="max-w-3xl">
              {/* Company Brand */}
              <h3 className="text-xl font-medium mb-4 text-black">Palmer House Productions</h3>
              
              {/* Social Proof */}
              <div className="flex items-center mb-4">
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="User 1" />
                  <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="User 2" />
                  <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="User 3" />
                  <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm border-2 border-white">95+</div>
                </div>
                <p className="ml-4 text-sm font-medium text-black">Trusted by industry leaders</p>
              </div>
              
              {/* Star Rating */}
              <div className="flex items-center text-yellow-500 mb-6">
                <span className="text-lg">★★★★★</span>
              </div>
              
              {/* Main Headline */}
              <h3 className="text-4xl md:text-5xl font-manrope font-normal tracking-tighter leading-tight text-black">
                We help brands grow with strategic design that's thoughtful, visually bold, and built to make an impression.
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section - Full Width */}
      <div className="pb-24">
        <div className="px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Testimonial Card */}
            <Card className="bg-white p-12 rounded-3xl shadow-sm relative overflow-hidden col-span-1 border-0 min-h-[400px]">
              <div className="absolute -bottom-10 -right-10 text-[12rem] text-gray-100/50 z-0 font-bold">"</div>
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-4 text-black">Thoughtful design that moves the needle</h4>
                <p className="text-black mb-6 text-sm leading-6">Awesome experience from start to finish. He was in constant communication, detail-oriented and provided exactly what we were looking for in our organization's marketing videos and photos.</p>
                <div className="flex items-center">
                  <img className="w-10 h-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face" alt="Sarah Dylan Jensen" />
                  <div className="ml-3">
                    <p className="font-bold text-sm text-black">Sarah Dylan Jensen</p>
                    <p className="text-xs text-gray-500">CEO at Sony</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Statistics Card 1 */}
            <Card className="bg-white p-12 rounded-3xl shadow-sm flex flex-col justify-between col-span-1 border-0 min-h-[400px]">
              <div className="flex justify-between items-start w-full">
                <span className="text-sm font-medium text-gray-500">Fact 01</span>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <i className="fa-solid fa-arrow-trend-up text-gray-500"></i>
                </div>
              </div>
              <div>
                <p className="font-manrope text-9xl font-extrabold my-6" ref={firstStatRef}>49%</p>
                <p className="text-black max-w-xs text-sm">Faster revenue growth for companies using video compared to those who don't.</p>
              </div>
            </Card>

            {/* Case Study Card */}
            <Card className="bg-gray-200 p-12 rounded-3xl shadow-sm col-span-1 relative overflow-hidden min-h-[400px] flex flex-col justify-end text-white border-0">
              <img className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop" alt="Professional video production" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="relative z-10">
                <h4 className="text-xl font-bold max-w-md">$4M raised: the strategy behind Tera's growth</h4>
                <div className="mt-4 inline-flex items-center font-semibold group cursor-pointer text-sm">
                  See case study <i className="fa-solid fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
                </div>
              </div>
            </Card>

            {/* Combined Process and Timeline Card */}
            <Card className="bg-white p-12 rounded-3xl shadow-sm col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-8 border-0 min-h-[400px]">
              <div className="flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold mb-2 text-black">A streamlined process, executed with methodical care.</h4>
                  <p className="text-black text-sm leading-6">We transform underwhelming brands into standout experiences, built to reflect the quality, ambition, and greatness</p>
                </div>
                <div className="inline-flex items-center font-semibold group cursor-pointer text-sm text-[#FF6B49] mt-6 lg:mt-0">
                  <i className="fa-solid fa-arrow-right mr-2"></i> Learn about our process
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Timeline</h4>
                <p className="text-sm font-semibold text-gray-500 mb-6">Website & branding for Sony</p>
                <div className="relative h-32">
                  <div className="absolute bottom-6 w-full flex justify-around">
                    <div className="h-20 w-px bg-gray-200"></div>
                    <div className="h-20 w-px bg-gray-200"></div>
                    <div className="h-20 w-px bg-gray-200"></div>
                    <div className="h-20 w-px bg-gray-200"></div>
                    <div className="h-20 w-px bg-gray-200"></div>
                  </div>
                  <div className="absolute bottom-0 w-full flex justify-around text-xs text-gray-400">
                    <span>...</span>
                    <span>1 Week</span>
                    <span></span>
                    <span>2 Weeks</span>
                    <span></span>
                    <span>3 Weeks</span>
                  </div>
                  <div className="absolute top-0 left-[18%] -translate-x-1/2 bg-[#FFD1C1] text-gray-900 text-xs font-semibold px-4 py-2 rounded-full">Discovery</div>
                  <div className="absolute top-8 left-[45%] -translate-x-1/2 bg-[#FFB39E] text-gray-900 text-xs font-semibold px-4 py-2 rounded-full">Concept</div>
                  <div className="absolute top-16 left-[70%] -translate-x-1/2 bg-[#FF8F7A] text-gray-900 text-xs font-semibold px-4 py-2 rounded-full">Execution</div>
                </div>
              </div>
            </Card>

            {/* Statistics Card 2 */}
            <Card className="bg-white p-12 rounded-3xl shadow-sm flex flex-col justify-between col-span-1 md:col-span-2 lg:col-span-1 border-0 min-h-[400px]">
              <div className="flex justify-between items-start w-full">
                <span className="text-sm font-medium text-gray-500">Fact 02</span>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <i className="fa-solid fa-arrow-trend-up text-gray-500"></i>
                </div>
              </div>
              <div>
                <p className="font-manrope text-6xl md:text-7xl lg:text-8xl font-extrabold my-6" ref={secondStatRef}>$82M</p>
                <p className="text-black max-w-xs text-sm">Million hours of video are watched every single day on YouTube.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
