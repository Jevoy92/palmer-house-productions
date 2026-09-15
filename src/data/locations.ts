export type LocationTestimonial = { quote: string; name: string; role?: string };
export type LocationFaq = { q: string; a: string };

export type Location = {
  slug: string;
  city: string;
  state: string;
  title: string;
  subtitle: string;
  intro: string;
  heroEyebrow: string;
  localPlanning: { title: string; body: string }[];
  services: { title: string; body: string }[];
  whyLocal: { title: string; body: string }[];
  serviceAreasTitle: string;
  serviceAreas: string[];
  stats: { label: string; value: string }[];
  testimonials: LocationTestimonial[];
  faqs: LocationFaq[];
  ctaTitle: string;
  ctaSubtitle: string;
};

export const locations: Record<string, Location> = {
  "seattle-wa": {
    slug: "seattle-wa",
    city: "Seattle",
    state: "WA",
    title: "Seattle Video Production for Small Business",
    subtitle:
      "Professional, affordable video production built for Seattle small businesses. We create content systems — social reels, brand films, training libraries, and testimonials — that grow with your company.",
    intro:
      "Palmer House Productions plans and produces reusable video systems for Seattle-area businesses, including social reels, brand stories, testimonials, and training content. We film on location and shape each production day around the content your team needs to keep using.",
    heroEyebrow: "Seattle, WA",
    localPlanning: [
      {
        title: "City access",
        body: "For downtown and neighborhood shoots, we confirm loading, parking, building access, and permitted filming needs before production day.",
      },
      {
        title: "Puget Sound schedules",
        body: "When a project spans Seattle and the Eastside, we group locations and interview windows to reduce travel time and team disruption.",
      },
      {
        title: "Weather-ready production",
        body: "For outdoor scenes, we plan a practical indoor alternative or a flexible shot order around Pacific Northwest weather.",
      },
    ],
    services: [
      {
        title: "Social media reels",
        body: "Short-form content for Instagram, TikTok, LinkedIn, and YouTube Shorts.",
      },
      {
        title: "Brand storytelling",
        body: "Company culture videos that show who you are and why customers should choose you.",
      },
      {
        title: "Training & onboarding",
        body: "Video systems that scale with your team and cut down repeat questions.",
      },
      {
        title: "Customer testimonials",
        body: "Case studies and proof-driven video that builds trust and closes deals.",
      },
    ],
    whyLocal: [
      {
        title: "Built for Small Business",
        body: "Packages and workflows designed for lean teams and real budgets.",
      },
      { title: "Seattle Local", body: "On-location shoots across the Puget Sound region." },
      {
        title: "Fast Turnaround",
        body: "From strategy call to finished content in weeks, not months.",
      },
      { title: "5-Star Rated", body: "47+ five-star reviews from real Seattle-area businesses." },
    ],
    serviceAreasTitle: "Areas We Serve in the Seattle Metro",
    serviceAreas: [
      "Seattle",
      "Bellevue",
      "Redmond",
      "Kirkland",
      "Bothell",
      "Renton",
      "Kent",
      "Tacoma",
      "Everett",
      "Issaquah",
      "Mercer Island",
      "Woodinville",
      "Sammamish",
      "Federal Way",
    ],
    stats: [
      { label: "Five-star reviews", value: "47+" },
      { label: "Region covered", value: "Puget Sound" },
      { label: "Typical turnaround", value: "Weeks, not months" },
    ],
    testimonials: [
      {
        quote:
          "Jevoy and his team did an amazing job with pictures & videos of our team and stores. Our management was blown away by the quality, professionalism, and speed at which their media was produced.",
        name: "Isabella Johnstun",
        role: "Dick's Restaurant Supply",
      },
      {
        quote:
          "Jevoy and the Palmer House Team were fantastic! Jevoy has a gift of helping his clients become grounded and comfortable in front of the camera.",
        name: "Athan Seyler",
        role: "Local Guide",
      },
    ],
    faqs: [
      {
        q: "Do you only shoot in Seattle proper?",
        a: "No — we cover the whole Puget Sound region, including Bellevue, Redmond, Kirkland, Bothell, Renton, Kent, Tacoma, Everett, Issaquah, Mercer Island, Woodinville, Sammamish, and Federal Way.",
      },
      {
        q: "How fast can we get our first video system live?",
        a: "Most Seattle clients go from strategy call to finished content in a matter of weeks, not months.",
      },
      {
        q: "Is Palmer House a good fit for a small business budget?",
        a: "Yes — our packages and workflows are designed specifically for lean teams and real small-business budgets, not massive agency retainers.",
      },
    ],
    ctaTitle: "Ready to Grow Your Seattle Business with Video?",
    ctaSubtitle:
      "Book a free strategy call and we'll map out a content plan that fits your budget, your goals, and your timeline.",
  },
  "bellevue-wa": {
    slug: "bellevue-wa",
    city: "Bellevue",
    state: "WA",
    title: "Bellevue, WA Video Production",
    subtitle:
      "Video production for Bellevue startups, SaaS platforms, professional teams, and established brands throughout the Eastside and Seattle metro area.",
    intro:
      "Palmer House Productions creates Bellevue video systems for product education, team training, launches, and brand storytelling. We combine on-location production with screen capture and reusable edits so one project can support sales, onboarding, and ongoing communication.",
    heroEyebrow: "Bellevue, WA",
    localPlanning: [
      {
        title: "Office access",
        body: "For office towers and shared campuses, we confirm building approval, loading instructions, room access, and any vendor requirements in advance.",
      },
      {
        title: "Hybrid-team interviews",
        body: "We organize subject-matter expert interviews into focused windows and plan companion screen recordings for distributed teams.",
      },
      {
        title: "Eastside routing",
        body: "Projects with stops in Bellevue, Redmond, Kirkland, or Issaquah are grouped to make the production schedule easier on your team.",
      },
    ],
    services: [
      {
        title: "SaaS product demonstrations",
        body: "Clear, engaging walkthroughs that showcase your software's key features and benefits.",
      },
      {
        title: "Technical training libraries",
        body: "Complex technical concepts made accessible through structured video content.",
      },
      {
        title: "Startup pitch & brand videos",
        body: "Founder stories and company origin videos that build trust with customers and investors.",
      },
      {
        title: "Enterprise communications",
        body: "Culture, values, and knowledge-base content that reduces support tickets.",
      },
    ],
    whyLocal: [
      {
        title: "Product Demos",
        body: "Showcase your software and tech solutions with engaging demonstrations.",
      },
      {
        title: "Team Training",
        body: "Scale your team's knowledge with comprehensive training libraries.",
      },
      {
        title: "Brand Stories",
        body: "Tell your company's story and connect with your target market.",
      },
      { title: "Launch Content", body: "Launch your products and features with maximum impact." },
    ],
    serviceAreasTitle: "Areas We Serve on the Eastside",
    serviceAreas: [
      "Bellevue",
      "Redmond",
      "Kirkland",
      "Issaquah",
      "Sammamish",
      "Mercer Island",
      "Woodinville",
      "Bothell",
      "Renton",
      "Newcastle",
      "Factoria",
      "Eastgate",
    ],
    stats: [
      { label: "Focus", value: "SaaS & Startups" },
      { label: "Region covered", value: "The Eastside" },
      { label: "Specialty", value: "Enterprise training systems" },
    ],
    testimonials: [
      {
        quote:
          "The Palmer House Productions team is incredibly warm, patient, and skilled! They tailored the shoot in some very creative ways to achieve a highly professional video.",
        name: "Chelsea Power",
      },
      {
        quote:
          "Awesome experience from start to finish. He was in constant communication, detail-oriented, and provided exactly what we were looking for in our organization's marketing videos.",
        name: "Sarah Dylan Jensen",
        role: "Local Guide",
      },
    ],
    faqs: [
      {
        q: "Do you work with early-stage startups as well as enterprise tech?",
        a: "Yes — from startup pitch and brand videos to enterprise training and communications, we build systems for tech companies at every stage.",
      },
      {
        q: "Can you help with product launch content?",
        a: "Absolutely. We create product launch campaigns, investor content, and social campaigns designed to generate buzz and drive adoption.",
      },
      {
        q: "What areas around Bellevue do you cover?",
        a: "We shoot throughout the Eastside, including Redmond, Kirkland, Issaquah, Sammamish, Mercer Island, Woodinville, Bothell, Renton, Newcastle, Factoria, and Eastgate.",
      },
    ],
    ctaTitle: "Ready to Grow Your Bellevue Business with Video?",
    ctaSubtitle:
      "Book a free strategy call and we'll map out a content plan that fits your budget, your goals, and your timeline.",
  },
  "tacoma-wa": {
    slug: "tacoma-wa",
    city: "Tacoma",
    state: "WA",
    title: "Tacoma & South Sound Video Production",
    subtitle:
      "Professional video production for Tacoma small businesses and organizations. From social content to training systems, we build video that works as hard as you do.",
    intro:
      "Palmer House Productions creates on-location video systems for Tacoma and South Sound businesses, nonprofits, and organizations. We turn interviews, demonstrations, and day-to-day expertise into social, brand, testimonial, and training assets your team can reuse.",
    heroEyebrow: "Tacoma, WA",
    localPlanning: [
      {
        title: "Downtown and waterfront access",
        body: "We confirm parking, loading, room access, and audio conditions before filming at offices, venues, and public-facing locations.",
      },
      {
        title: "Industrial-site preparation",
        body: "For production floors and working facilities, we document site rules, required protective equipment, and safe camera positions with your contact.",
      },
      {
        title: "South Sound routing",
        body: "We group Tacoma, Lakewood, Puyallup, Gig Harbor, and nearby stops when a project needs more than one location.",
      },
    ],
    services: [
      {
        title: "Social media reels",
        body: "Short-form content for Instagram, TikTok, LinkedIn, and YouTube Shorts.",
      },
      {
        title: "Brand storytelling & testimonials",
        body: "Proof-driven content that builds trust for Pierce County companies.",
      },
      {
        title: "Training & onboarding videos",
        body: "Video libraries that onboard new hires and document your process.",
      },
      {
        title: "Corporate communications",
        body: "Consistent, professional communications content for your whole organization.",
      },
    ],
    whyLocal: [
      {
        title: "Built for Small Business",
        body: "Packages designed for lean Tacoma teams and real budgets.",
      },
      { title: "South Sound Local", body: "On-location shoots across Tacoma and Pierce County." },
      {
        title: "Fast Turnaround",
        body: "From strategy call to finished content in weeks, not months.",
      },
      {
        title: "5-Star Rated",
        body: "47+ five-star reviews from real Pacific Northwest businesses.",
      },
    ],
    serviceAreasTitle: "Areas We Serve in the South Sound",
    serviceAreas: [
      "Tacoma",
      "Lakewood",
      "Puyallup",
      "University Place",
      "Federal Way",
      "Gig Harbor",
      "Bonney Lake",
      "Sumner",
      "Fife",
      "Auburn",
      "Kent",
      "Olympia",
    ],
    stats: [
      { label: "Five-star reviews", value: "47+" },
      { label: "Region covered", value: "Pierce County & South Sound" },
      { label: "Typical turnaround", value: "Weeks, not months" },
    ],
    testimonials: [
      {
        quote:
          "It was my first time in a professional environment. Jevoy gave me lots of good tips through the process to make it easier. Professional, patient, and skilled team.",
        name: "James Russell",
        role: "Local Guide",
      },
      {
        quote:
          "I have done two photoshoots with Jevoy and the photos from both sessions turned out amazing. He is easy to communicate and work with.",
        name: "Quenia Tolentino",
      },
    ],
    faqs: [
      {
        q: "Do you serve businesses outside downtown Tacoma?",
        a: "Yes — whether you're a downtown Tacoma shop, a Puyallup service business, or a Pierce County organization, we come to you across the South Sound.",
      },
      {
        q: "What kind of content do you produce for Tacoma businesses?",
        a: "Social reels, brand storytelling, testimonials, training and onboarding videos, and corporate communications — all produced locally.",
      },
      {
        q: "How is Palmer House different from a big agency?",
        a: "We're a lean Pacific Northwest team — no bloated crews, no surprise invoices, just great content that moves the needle.",
      },
    ],
    ctaTitle: "Ready to Start Your Tacoma Video Project?",
    ctaSubtitle:
      "Book a free strategy call and let's build a content plan that fits your business.",
  },
  "portland-or": {
    slug: "portland-or",
    city: "Portland",
    state: "OR",
    title: "Portland, OR Video Production",
    subtitle:
      "Video production for Portland-area companies and distributed teams. We build reusable content systems — not disconnected one-off videos.",
    intro:
      "Palmer House Productions plans Portland-area video production for brand storytelling, social campaigns, customer proof, and training libraries. Our review workflow also gives distributed stakeholders a clear way to comment and approve without being in the same room.",
    heroEyebrow: "Portland, OR",
    localPlanning: [
      {
        title: "Location logistics",
        body: "We confirm loading, parking, power, ambient sound, and filming permissions for offices, shops, and public-facing spaces before the shoot.",
      },
      {
        title: "Metro-area routing",
        body: "When a project includes Portland, Beaverton, Lake Oswego, Hillsboro, or another nearby stop, we organize the day to limit backtracking.",
      },
      {
        title: "Remote review",
        body: "Distributed teams can consolidate timestamped feedback and approvals through a shared review workflow after production.",
      },
    ],
    services: [
      {
        title: "Brand storytelling & narratives",
        body: "Authentic Portland narratives that build genuine connections with your audience.",
      },
      {
        title: "Creative campaigns & social content",
        body: "Instagram reels and TikTok campaigns that capture Portland's creative energy.",
      },
      {
        title: "Training libraries & onboarding",
        body: "Comprehensive video systems that scale with your team's growth.",
      },
      {
        title: "Customer testimonials & case studies",
        body: "Proof-driven video content that builds trust and closes business.",
      },
    ],
    whyLocal: [
      {
        title: "Local Brands",
        body: "Artisanal businesses and local brands that define Portland's character.",
      },
      {
        title: "Innovation",
        body: "Creative solutions for forward-thinking companies and organizations.",
      },
      { title: "Global Reach", body: "Remote-first approach serving clients worldwide." },
      { title: "Corporate", body: "Professional corporate communications and training content." },
    ],
    serviceAreasTitle: "Areas We Serve in Oregon",
    serviceAreas: [
      "Portland",
      "Beaverton",
      "Lake Oswego",
      "Tigard",
      "Gresham",
      "Hillsboro",
      "Salem",
      "Bend",
      "Eugene",
      "Oregon City",
      "Tualatin",
      "Clackamas",
    ],
    stats: [
      { label: "Approach", value: "Remote-first" },
      { label: "Region covered", value: "Oregon & beyond" },
      { label: "Specialty", value: "Creative brand storytelling" },
    ],
    testimonials: [
      {
        quote:
          "Jevoy is amazing. He's super easy to work with. He made me very comfortable to do a shoot with. I'd highly recommend him to anyone looking for good photos for any event.",
        name: "Cynthia Scanlon",
      },
      {
        quote:
          "Jevoy is an absolute dream to work with! He has a great eye and is very knowledgeable. My photos turned out so amazing I would highly recommend him to anyone.",
        name: "Olivia Colantonio",
      },
    ],
    faqs: [
      {
        q: "Do you only work with Portland-based companies?",
        a: "No — we support Oregon brands as well as distributed teams through cloud-based review and flexible scheduling.",
      },
      {
        q: "How do you support distributed or remote teams?",
        a: "We use cloud-based review and approval workflows, flexible production timelines, and seamless coordination across time zones.",
      },
      {
        q: "What areas in Oregon do you cover?",
        a: "Portland, Beaverton, Lake Oswego, Tigard, Gresham, Hillsboro, Salem, Bend, Eugene, Oregon City, Tualatin, and Clackamas.",
      },
    ],
    ctaTitle: "Ready to Start Your Portland Video Project?",
    ctaSubtitle:
      "Book a free strategy call and let's build a content plan that fits your business.",
  },
};

export const locationList = Object.values(locations);
