import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const TrustSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const numeralRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const numeral = numeralRef.current;
    const stats = statsRef.current;

    if (!section || !numeral || !stats) return;

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

    // Stats counter animation
    ScrollTrigger.create({
      trigger: stats,
      start: 'top 60%',
      onEnter: () => {
        // Count up animation for the main stat
        let obj = { val: 0 };
        gsap.to(obj, {
          val: 49,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            const countElement = stats.querySelector('.count-up');
            if (countElement) {
              countElement.textContent = Math.round(obj.val) + '%';
            }
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Testimonial Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm relative col-span-1 md:col-span-1">
              <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-gray-50 rounded-full z-0"></div>
              <div className="absolute -bottom-12 -right-0 w-24 h-24 bg-gray-50 rounded-tl-full z-0 transform scale-x-[-1]"></div>
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-4 text-gray-900">Thoughtful design that moves the needle</h4>
                <p className="text-gray-600 mb-6">Awesome experience from start to finish. They were in constant communication, detail-oriented and provided exactly what we were looking for in our marketing videos and photos.</p>
                <div className="flex items-center">
                  <img className="w-12 h-12 rounded-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="Sarah Dylan Jensen" />
                  <div className="ml-4">
                    <p className="font-bold text-gray-900">Sarah Dylan Jensen</p>
                    <p className="text-sm text-gray-600">CEO at Sony</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fact Card */}
            <div ref={statsRef} className="bg-white p-8 rounded-3xl shadow-sm flex flex-col justify-center text-center">
              <div className="flex justify-between items-start w-full">
                <span className="text-sm font-medium text-gray-600">Fact 01</span>
                <span className="text-gray-300">📈</span>
              </div>
              <p className="font-manrope font-extrabold text-7xl my-4 text-gray-900 count-up">0%</p>
              <p className="text-gray-600 max-w-xs mx-auto">Faster revenue growth for companies using video compared to those who don't.</p>
            </div>

            {/* Case Study Card */}
            <div className="bg-gray-200 p-8 rounded-3xl shadow-sm col-span-1 md:col-span-2 relative overflow-hidden min-h-[300px] flex flex-col justify-end text-white">
              <img className="absolute inset-0 w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/6fa6fb3d0c-720654507815a03d9223.png" alt="portrait of a confident female entrepreneur in a modern office" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="relative z-10">
                <h4 className="text-3xl font-bold max-w-md">$4M raised: the strategy behind Tera's growth</h4>
                <span className="mt-4 inline-flex items-center font-semibold group cursor-pointer hover:translate-x-1 transition-transform">
                  See case study <span className="ml-2">→</span>
                </span>
              </div>
            </div>

            {/* Process Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <h4 className="text-xl font-bold mb-2 text-gray-900">A streamlined process, executed with methodical care.</h4>
              <p className="text-gray-600">Our systemized approach to video production ensures quality and efficiency, saving you time and money.</p>
            </div>
            
            {/* Timeline Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Timeline</h4>
              <p className="text-xl font-bold text-gray-900">Website & branding for Sony</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};