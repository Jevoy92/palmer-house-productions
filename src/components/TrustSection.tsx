import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, ArrowRight } from "lucide-react";
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
        opacity: 0.2, 
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
    <section ref={sectionRef} className="w-full bg-gray-50 py-24">
      <div className="container mx-auto px-6 grid grid-cols-12 gap-8 items-start">
        {/* Large Numeral - Sticky */}
        <div ref={numeralRef} className="col-span-12 lg:col-span-3 sticky top-24">
          <h2 className="font-manrope text-[12rem] lg:text-[18rem] font-extrabold leading-none text-gray-200">0-1</h2>
        </div>

        {/* Main Content Area */}
        <div className="col-span-12 lg:col-span-9 space-y-8">
          {/* Intro Header */}
          <div className="max-w-3xl">
            {/* Company Brand */}
            <h3 className="text-xl font-medium mb-4 text-gray-900">Palmer House Productions</h3>
            
            {/* Social Proof */}
            <div className="flex items-center mb-4">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="User 1" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="User 2" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="User 3" />
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm border-2 border-white">95+</div>
              </div>
              <p className="ml-4 text-sm font-medium text-gray-600">Trusted by industry leaders</p>
            </div>
            
            {/* Star Rating */}
            <div className="flex items-center text-yellow-500 mb-6">
              <span className="text-lg">★★★★★</span>
            </div>
            
            {/* Main Headline */}
            <h3 className="text-4xl md:text-5xl font-manrope font-extrabold tracking-tighter leading-tight text-gray-900">
              We help brands grow with strategic design that's thoughtful, visually bold, and built to make an impression.
            </h3>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Testimonial Card */}
            <Card className="bg-white p-8 rounded-3xl shadow-sm relative overflow-hidden col-span-1">
              <div className="absolute -bottom-10 -right-10 text-[12rem] text-gray-100/50 z-0 font-bold">"</div>
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-4">Thoughtful design that moves the needle</h4>
                <p className="text-gray-600 mb-6 text-sm leading-6">Awesome experience from start to finish. He was in constant communication, detail-oriented and provided exactly what we were looking for in our organization's marketing videos and photos.</p>
                <div className="flex items-center">
                  <img className="w-10 h-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face" alt="Sarah Dylan Jensen" />
                  <div className="ml-3">
                    <p className="font-bold text-sm">Sarah Dylan Jensen</p>
                    <p className="text-xs text-gray-500">CEO at Sony</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Statistics Card 1 */}
            <Card className="bg-white p-8 rounded-3xl shadow-sm flex flex-col justify-between col-span-1">
              <div className="flex justify-between items-start w-full">
                <span className="text-sm font-medium text-gray-500">Fact 01</span>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                </div>
              </div>
              <div>
                <p className="text-7xl font-bold my-4" ref={firstStatRef}>49%</p>
                <p className="text-gray-600 max-w-xs text-sm">Faster revenue growth for companies using video compared to those who don't.</p>
              </div>
            </Card>

            {/* Case Study Card */}
            <Card className="bg-gray-200 p-6 rounded-3xl shadow-sm col-span-1 relative overflow-hidden min-h-[300px] flex flex-col justify-end text-white">
              <img className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop" alt="Professional video production" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="relative z-10">
                <h4 className="text-xl font-bold max-w-md">$4M raised: the strategy behind Tera's growth</h4>
                <div className="mt-4 inline-flex items-center font-semibold group cursor-pointer text-sm">
                  See case study <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Card>

            {/* Process Description Card */}
            <Card className="bg-white p-8 rounded-3xl shadow-sm col-span-1">
              <h4 className="text-xl font-bold mb-2">A streamlined process, executed with methodical care.</h4>
              <p className="text-gray-600 mb-6 text-sm leading-6">We transform underwhelming brands into standout experiences, built to reflect the quality, ambition, and greatness</p>
              <div className="inline-flex items-center font-semibold group cursor-pointer text-sm">
                Learn about our process <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>

            {/* Timeline Card */}
            <Card className="bg-white p-8 rounded-3xl shadow-sm col-span-1">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Timeline</h4>
              <p className="text-sm font-semibold mb-8">Website & branding for Sony</p>
              <div className="relative h-20">
                <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200"></div>
                <div className="absolute top-1/2 left-0 w-full flex justify-between text-xs text-gray-400 -mt-5">
                  <span>1 Week</span>
                  <span>2 Weeks</span>
                  <span>3 Weeks</span>
                </div>
                <div className="absolute top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2 bg-orange-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">Discovery</div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-300 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">Concept</div>
                <div className="absolute top-1/2 left-[85%] -translate-x-1/2 -translate-y-1/2 bg-orange-400 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">Execution</div>
              </div>
            </Card>

            {/* Statistics Card 2 */}
            <Card className="bg-white p-8 rounded-3xl shadow-sm flex flex-col justify-between col-span-1 md:col-span-2 lg:col-span-1">
              <div className="flex justify-between items-start w-full">
                <span className="text-sm font-medium text-gray-500">Fact 02</span>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                </div>
              </div>
              <div>
                <p className="text-7xl font-bold my-4" ref={secondStatRef}>$82M</p>
                <p className="text-gray-600 max-w-xs text-sm">Million hours of video are watched every single day on YouTube.</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};