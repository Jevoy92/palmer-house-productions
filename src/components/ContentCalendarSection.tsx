export const ContentCalendarSection = () => {
  const categories = [
    { label: "Product Demos", color: "text-red-400" },
    { label: "Team Stories", color: "text-pink-500" },
    { label: "Training Videos", color: "text-gray-400" },
    { label: "Testimonials", color: "text-orange-500" },
    { label: "Brand Stories", color: "text-blue-500" },
    { label: "Social Content", color: "text-purple-500" },
    { label: "Event Coverage", color: "text-orange-500" },
  ];

  const categoriesRow2 = [
    { label: "Explainer Videos", color: "text-red-300" },
    { label: "Before & After", color: "text-pink-500" },
    { label: "Client Success", color: "text-purple-500" },
    { label: "How-To Guides", color: "text-orange-500" },
    { label: "Company Culture", color: "text-blue-500" },
    { label: "Industry Insights", color: "text-red-500" },
    { label: "Behind the Scenes", color: "text-pink-500" },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div className="space-y-6">
            <p className="text-sm text-gray-600 uppercase tracking-wider">
              Strategic Video Content Production
            </p>
            
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Build Your Video Library,<br />
              <span className="block">One Shoot At A Time</span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              We capture multiple video formats in a single production day. Your brand gets a 
              content library ready to deploy across every platform—social, web, training, and more.
            </p>

            {/* Info Card */}
            <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-200 max-w-md">
              <div className="text-4xl">🎬</div>
              <div>
                <p className="text-sm font-semibold text-orange-500">
                  Maximum output, minimal effort.
                </p>
                <p className="text-sm text-gray-600">
                  One shoot day delivers weeks of content across all your channels.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              {/* iPhone Frame */}
              <div className="relative w-[280px] h-[560px] bg-black rounded-[3rem] shadow-2xl border-[8px] border-gray-800 overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-10"></div>
                
                {/* Screen Content */}
                <div className="relative h-full bg-white p-8 pt-12">
                  {/* Checklist Items */}
                  <div className="space-y-6 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="h-2 bg-gray-200 rounded flex-1"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="h-2 bg-gray-200 rounded flex-1"></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="h-2 bg-gray-200 rounded flex-1"></div>
                    </div>
                  </div>

                  {/* Content Card Placeholder */}
                  <div className="bg-gray-100 rounded-2xl h-48 mb-6"></div>

                  {/* Action Buttons */}
                  <div className="flex justify-center gap-4">
                    <button className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors">
                      <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <button className="w-16 h-16 rounded-full border-2 border-pink-300 flex items-center justify-center bg-white hover:bg-pink-50 transition-colors">
                      <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ideas Categories Section */}
        <div className="text-center space-y-8">
          <h3 className="text-3xl font-semibold">Every type of video content your business needs</h3>
          
          {/* Categories Scrolling Container */}
          <div className="space-y-4 overflow-hidden">
            <div className="overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex gap-4 min-w-max px-6 animate-scroll-right">
                {[...categories, ...categories].map((category, index) => (
                  <button
                    key={index}
                    className={`px-6 py-3 rounded-full bg-white border-2 border-gray-200 hover:border-gray-300 transition-all hover:scale-105 ${category.color} font-medium text-sm md:text-base whitespace-nowrap`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex gap-4 min-w-max px-6 animate-scroll-left">
                {[...categoriesRow2, ...categoriesRow2].map((category, index) => (
                  <button
                    key={index}
                    className={`px-6 py-3 rounded-full bg-white border-2 border-gray-200 hover:border-gray-300 transition-all hover:scale-105 ${category.color} font-medium text-sm md:text-base whitespace-nowrap`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
